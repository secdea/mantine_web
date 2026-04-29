import { defaultCache } from "@serwist/next/worker";
import { type PrecacheEntry, Serwist, type SerwistGlobalConfig, StaleWhileRevalidate } from "serwist";

// 1. Declare the global scope for TypeScript
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    __REPLACE_ME__: any;
  }
}
declare const self: WorkerGlobalScope;

// Use it EXACTLY once here. 
// Do not use it in console.log or anywhere else.
const manifest = self.__SW_MANIFEST;

// 2. Initialize Serwist
const serwist = new Serwist({
  // Automatically populated with your static HTML/JS/CSS during build
  precacheEntries: self.__REPLACE_ME__,  // Use the local variable
  
  // Important for static exports: handles clean URLs (e.g., /about -> /about.html)
  precacheOptions: {
    directoryIndex: "index.html",
    cleanURLs: true,
  },

  // Basic lifecycle settings
  skipWaiting: true, // Forces the waiting service worker to become active
  clientsClaim: true, // Allows the service worker to take control of the page immediately
  navigationPreload: true,
  
  // Recommended default strategies for scripts and styles
  runtimeCaching: [
    {
      // Match any request for Next.js static assets
      matcher: /.*\/_next\/static\/.*/i,
      handler: new StaleWhileRevalidate(), // Check cache first, update in background
    },
    ...defaultCache,
  ],

});

serwist.addEventListeners();

// If you need to debug, use the local 'manifest' variable, 
// NOT the 'self.__SW_MANIFEST' string.
console.log("Assets precached:", manifest?.length);