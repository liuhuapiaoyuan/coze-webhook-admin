import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioOption {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  sublabel?: string;
}

interface RadioDemoProps {
  options: RadioOption[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * RadioDemo 组件
 *
 * 这个组件展示一组自定义的单选卡片。
 * 每个卡片包含一个图标、标签、子标签（可选）和描述。
 *
 * @param {RadioDemoProps} props - 组件属性
 * @param {RadioOption[]} props.options - 单选选项数组
 * @param {string} [props.defaultValue] - 默认选中的值
 * @param {function} [props.onChange] - 选择改变时的回调函数
 */
export function RadioCardChoose({
  value,
  options,
  defaultValue,
  onChange,
}: RadioDemoProps) {
  return (
    <RadioGroup
      className="gap-2"
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChange}
    >
      {options.map((option, index) => (
        <div
          key={option.value}
          className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
        >
          <RadioGroupItem
            value={option.value}
            id={`radio-${index}`}
            aria-describedby={`radio-${index}-description`}
            className="order-1 after:absolute after:inset-0"
          />
          <div className="flex grow items-start gap-3">
            {option.icon}
            <div className="grid grow gap-2">
              <Label htmlFor={`radio-${index}`}>
                {option.label}{" "}
                {option.sublabel && (
                  <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                    ({option.sublabel})
                  </span>
                )}
              </Label>
              <p
                id={`radio-${index}-description`}
                className="text-xs text-muted-foreground"
              >
                {option.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}

export type { RadioOption, RadioDemoProps };
