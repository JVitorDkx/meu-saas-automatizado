// Fallback values for Railway deployment
const DEFAULT_OAUTH_URL = "https://api.manus.im";
const DEFAULT_APP_ID = "railway-deployment";

export const ENV = {
  appId: process.env.VITE_APP_ID ?? process.env.RAILWAY_ENVIRONMENT_NAME ? DEFAULT_APP_ID : "",
  cookieSecret: process.env.JWT_SECRET ?? "railway-secret-key",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? DEFAULT_OAUTH_URL,
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "https://api.manus.im",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};

// Log configuration for debugging
if (process.env.NODE_ENV === "production") {
  console.log("[ENV] Production mode detected");
  console.log("[ENV] Database configured:", !!ENV.databaseUrl);
  console.log("[ENV] OAuth URL:", ENV.oAuthServerUrl);
}
