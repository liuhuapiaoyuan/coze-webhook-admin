import { DeviceService } from "@/service/device.service";
import { DeviceCard } from "../../app/admin/devices/card";

export async function DeviceList() {
  const { data: devices } = await DeviceService.getDevices();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  );
}
