// src/db.ts
import { drizzle } from "drizzle-orm/libsql";
import { type Client, createClient } from "@libsql/client";
import { env } from "~/env";

const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDb.client ??
  createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client);
