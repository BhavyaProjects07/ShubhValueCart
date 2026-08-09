import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.shubhavaluecart.in",
  appName: "Shubh Value Cart",

  webDir: "public",

  server: {
    url: "https://www.shubhavaluecart.in",
    cleartext: false,
    androidScheme: "https",

    allowNavigation: [
      "www.shubhavaluecart.in",
      "shubhavaluecart.in",
    ],
  },
};

export default config;