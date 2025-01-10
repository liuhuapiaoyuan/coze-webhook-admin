-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApiEndpointLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "apiEndpointId" TEXT NOT NULL,
    "ip" TEXT,
    "status" TEXT NOT NULL DEFAULT 'wait',
    "cozeWebhookId" TEXT NOT NULL,
    "requestParams" TEXT NOT NULL,
    "response" TEXT,
    "duration" INTEGER,
    "apiKey" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ApiEndpointLog_apiEndpointId_fkey" FOREIGN KEY ("apiEndpointId") REFERENCES "ApiEndpoint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ApiEndpointLog_cozeWebhookId_fkey" FOREIGN KEY ("cozeWebhookId") REFERENCES "CozeWebhook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ApiEndpointLog" ("apiEndpointId", "apiKey", "cozeWebhookId", "createdAt", "duration", "id", "ip", "requestParams", "response") SELECT "apiEndpointId", "apiKey", "cozeWebhookId", "createdAt", "duration", "id", "ip", "requestParams", "response" FROM "ApiEndpointLog";
DROP TABLE "ApiEndpointLog";
ALTER TABLE "new_ApiEndpointLog" RENAME TO "ApiEndpointLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
