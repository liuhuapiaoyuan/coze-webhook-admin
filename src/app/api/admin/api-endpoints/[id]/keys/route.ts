import { NextRequest, NextResponse } from "next/server";
import { getEndpointKeys } from "@/app/admin/api-endpoints/actions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  try {
    const result = await getEndpointKeys(params.id, {
      page,
      pageSize,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "获取密钥列表失败" },
      { status: 500 }
    );
  }
}
