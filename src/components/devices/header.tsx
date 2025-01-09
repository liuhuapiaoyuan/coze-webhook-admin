import { CreateDevice } from "../../app/admin/devices/create-button";

export function DeviceHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">设备管理</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          管理已激活的设备和分配数字人
        </p>
      </div>
      <CreateDevice />
    </div>
  );
}
