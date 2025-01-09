import * as z from 'zod'

export const deviceSchema = z.object({
  serialNumber: z.string().min(1, '请输入设备序列号'),
  alias: z.string().min(1, '请输入设备别名')
})