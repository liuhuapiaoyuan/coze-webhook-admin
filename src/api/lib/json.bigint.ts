import Elysia from "elysia";

export function JSONBigInt({ response }: { response: unknown }) {
  if (response instanceof Response) {
    return response;
  }

  if (typeof response === "object" && response !== null) {
    return new Response(
      JSON.stringify(response, (_, v) =>
        typeof v === "bigint" ? Number(v.toString()) : v
      ),
      {
        headers: {
          "Content-Type": `application/json; charset=utf-8`,
        },
      }
    );
  }
}

export function jsonBigInt() {
  return new Elysia({ name: "jsonBigInt" }).mapResponse(
    { as: "global" },
    JSONBigInt
  );
  // .onBeforeHandle({ as: "global" }, ({ body }) => {
  //   console.log("body", body);
  // });
}
