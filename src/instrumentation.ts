export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@/service/admin.service").then(({ AdminService }) => {
      return AdminService.createDefaultAdmin();
    });

    await import("pino");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
  }
}
