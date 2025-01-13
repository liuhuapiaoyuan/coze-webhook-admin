"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface FormField {
  name: string;
  type: string;
  description: string;
  fields?: FormField[]; // 用于 Object 和 Array 类型的子字段
}

export const FormFieldType: z.ZodTypeAny = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string(),

  fields: z.optional(z.array(z.lazy(() => FormFieldType))),
});

interface DynamicFormFieldsProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

export const fieldTypes = [
  { value: "String", label: "String" },
  { value: "Array<String>", label: "Array<String>" },
  { value: "Array<Object>", label: "Array<Object>" },
  { value: "Object", label: "Object" },
  { value: "Boolean", label: "Boolean" },
  { value: "Number", label: "Number" },
] as const;

export function DynamicFormFields({
  fields,
  onChange,
  level = 0,
}: DynamicFormFieldsProps & { level?: number }) {
  const handleFieldChange = (
    index: number,
    key: keyof FormField,
    value: string | FormField[]
  ) => {
    const newFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    onChange(newFields);
  };

  const addField = (parentIndex?: number) => {
    if (typeof parentIndex === "number") {
      const newFields = [...fields];
      newFields[parentIndex].fields = [
        ...(newFields[parentIndex].fields || []),
        { name: "", type: "String", description: "" },
      ];
      onChange(newFields);
    } else {
      onChange([...fields, { name: "", type: "String", description: "" }]);
    }
  };

  const removeField = (index: number, parentIndex?: number) => {
    if (typeof parentIndex === "number") {
      const newFields = [...fields];
      newFields[parentIndex].fields = newFields[parentIndex].fields?.filter(
        (_, i) => i !== index
      );
      onChange(newFields);
    } else {
      onChange(fields.filter((_, i) => i !== index));
    }
  };

  const renderField = (
    field: FormField,
    index: number,
    parentIndex?: number
  ) => (
    <Card
      key={`${parentIndex}-${index}`}
      className={cn(
        "p-6 shadow-md transition-shadow duration-300 hover:shadow-lg",
        level > 0 && "border-l-4 border-blue-500"
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <FormItem className="flex-1">
            <FormLabel className="text-sm font-semibold">字段名称</FormLabel>
            <FormControl>
              <Input
                value={field.name}
                onChange={(e) =>
                  handleFieldChange(
                    typeof parentIndex === "number" ? parentIndex : index,
                    "name",
                    e.target.value
                  )
                }
                placeholder="请输入字段名称"
                className="mt-1"
              />
            </FormControl>
          </FormItem>

          <FormItem className="flex-1">
            <FormLabel className="text-sm font-semibold">字段类型</FormLabel>
            <Select
              value={field.type}
              onValueChange={(value) =>
                handleFieldChange(
                  typeof parentIndex === "number" ? parentIndex : index,
                  "type",
                  value
                )
              }
            >
              <FormControl>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="选择字段类型" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {fieldTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>

          <FormItem className="flex-1">
            <FormLabel className="text-sm font-semibold">字段描述</FormLabel>
            <FormControl>
              <Input
                value={field.description}
                onChange={(e) =>
                  handleFieldChange(
                    typeof parentIndex === "number" ? parentIndex : index,
                    "description",
                    e.target.value
                  )
                }
                placeholder="请输入字段描述"
                className="mt-1"
              />
            </FormControl>
          </FormItem>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mt-8 text-red-500 hover:bg-red-100 hover:text-red-700"
            onClick={() => removeField(index, parentIndex)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>

        {(field.type === "Object" ||
          field.type.startsWith("Array<Object>")) && (
          <div className="ml-6 border-l-2 border-gray-200 pl-6">
            <DynamicFormFields
              fields={field.fields || []}
              onChange={(newFields) =>
                handleFieldChange(index, "fields", newFields)
              }
              level={level + 1}
            />
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {fields.map((field, index) => renderField(field, index))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-4 w-full lg:w-auto"
        onClick={() => addField()}
      >
        <Plus className="mr-2 h-4 w-4" />
        添加字段
      </Button>
    </div>
  );
}
