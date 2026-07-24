import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.shubhavaluecart.in",
  appName: "Shubh Value Cart",

  // Keep this; it won't actually be used because server.url takes precedence
  webDir: "public",

  server: {
    url: "https://www.shubhavaluecart.in",
    cleartext: false,
    androidScheme: "https",
  },
};

export default config;