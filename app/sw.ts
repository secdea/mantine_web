import { defaultCache } from "@serwist/next/worker";
import { type PrecacheEntry, Serwist, type SerwistGlobalConfig } from "serwist";

// 1. Declare the global scope for TypeScript
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}
declare const self: WorkerGlobalScope;

// 2. Initialize Serwist
const serwist = new Serwist({
  // Automatically populated with your static HTML/JS/CSS during build
  precacheEntries: self.__SW_MANIFEST,
  
  // Important for static exports: handles clean URLs (e.g., /about -> /about.html)
  precacheOptions: {
    directoryIndex: "index.html",
    cleanURLs: true,
  },
  
  // Basic lifecycle settings
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  
  // Recommended default strategies for scripts and styles
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
