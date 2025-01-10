import { db } from "@/lib/db";

export class ApiEndpointsService {
  /**
   * Retrieves an API endpoint by its ID
   * @param {string} id - The unique identifier of the API endpoint
   * @returns {Promise<Object>} A promise that resolves to an object containing the API endpoint data and its path
   * @throws {Error} If the API endpoint is not found
   */
  static async getApiendpoint(id: string) {
    const apiEndpoint = await db.apiEndpoint.findUnique({
      where: { id },
      include: {
        cozeWebhook: true,
      },
    });

    if (!apiEndpoint) {
      throw new Error("API endpoint not found");
    }

    const path =
      apiEndpoint.type === "openaiLike"
        ? "/api/v1/chat/completion"
        : `/api/${apiEndpoint.id}`;

    return {
      ...apiEndpoint,
      path,
    };
  }
}
