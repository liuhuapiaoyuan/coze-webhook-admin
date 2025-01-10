export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@/service/admin.service").then(({ AdminService }) => {
      return AdminService.createDefaultAdmin();
    });

    await import("pino");
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { scheduler } = await import("@/lib/schedule");
    const { ApiEndpointsService } = await import(
      "@/service/api-endpoints.service"
    );
    const isDebug = process.env.NODE_ENV === "development";
    scheduler.start();
    scheduler.addTask({
      id: "auto-collection-last-video",
      // 实际上是一分钟刷新一次
      cronExpression: isDebug ? "*/5 * * * * *" : "* */11 * * * *",
      action: () => {
        return ApiEndpointsService.markFailedLogs();
      },
    });
  }
  if (process.env.NEXT_RUNTIME === "edge") {
  }
}
