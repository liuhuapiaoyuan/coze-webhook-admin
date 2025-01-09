export async function uploadImage(file: File): Promise<string> {
  // 这里实现实际的图片上传逻辑
  // 返回上传后的图片URL
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      // 临时使用 Base64 作为图片URL
      // 实际项目中应该上传到对象存储服务
      resolve(reader.result as string)
    }
    reader.readAsDataURL(file)
  })
}