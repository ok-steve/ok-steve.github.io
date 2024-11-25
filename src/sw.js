/**
 * Globals
 */

const CACHE_VERSION = "v3";

const CACHE_NAMES = {
  CONTENT: "content",
  MEDIA: "media",
  STATIC: "static",
};

const OFFLINE_ASSETS = {
  CONTENT: "./offline.html",
  MEDIA: "./public/img/icon.svg",
};

const STATIC_ASSETS = [
  ...Object.values(OFFLINE_ASSETS),
  "./public/img/apple-touch-icon.png",
  "./public/img/favicon.ico",
  "./public/img/icon-192.png",
  "./public/img/icon-512.png",
  "./public/print.css",
  "./public/style.css",
  "./public/script.js",
  "./index.html",
  "./",
];

/**
 * Utility functions
 */

function openCache(cacheName) {
  return caches.open(`${CACHE_VERSION}-${cacheName}`);
}

function getCacheKey(request) {
  const acceptHeader = request.headers.get("Accept");

  if (acceptHeader.indexOf("text/html") !== -1) {
    return CACHE_NAMES.CONTENT;
  }

  if (acceptHeader.indexOf("image") !== -1) {
    return CACHE_NAMES.MEDIA;
  }

  return CACHE_NAMES.STATIC;
}

function shouldHandleFetch(request) {
  const url = new URL(request.url);

  const criteria = [
    // Is GET request
    request.method === "GET",
    // Request is to the same origin
    url.origin === self.location.origin,
  ];

  return criteria.reduce((prev, curr) => prev && curr);
}

async function staleWhileRevalidate(cacheName, request) {
  const cache = await openCache(cacheName);
  const cachedResponse = await cache.match(request);

  // Don't block cached response by waiting for promise to fulfill.
  const fetchedResponse = fetch(request).then((networkResponse) => {
    cache.put(request, networkResponse.clone());

    return networkResponse;
  });

  return cachedResponse || fetchedResponse;
}

function offlineResponse(cacheName) {
  if (cacheName === CACHE_NAMES.MEDIA) {
    return caches.match(OFFLINE_ASSETS.MEDIA);
  }

  if (cacheName === CACHE_NAMES.CONTENT) {
    return caches.match(OFFLINE_ASSETS.CONTENT);
  }

  return undefined;
}

/**
 * Install event
 */

async function onInstall() {
  const cache = await openCache(CACHE_NAMES.STATIC);

  return cache.addAll(STATIC_ASSETS);
}

/**
 * Activate event
 */

async function onActivate() {
  const keys = await caches.keys();
  const cachesToDelete = keys.filter((key) => !key.startsWith(CACHE_VERSION))

  return Promise.all(cachesToDelete.map((key) => caches.delete(key)));
}

/**
 * Fetch event
 */

async function onFetch(request) {
  const cacheName = getCacheKey(request);

  return staleWhileRevalidate(cacheName, request)
    .catch(() => offlineResponse(cacheName));
}

/**
 * Event listeners
 */

self.addEventListener("install", (e) => {
  e.waitUntil(onInstall().finally(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(onActivate().finally(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  if (!shouldHandleFetch(e.request)) {
    return;
  }

  e.respondWith(onFetch(e.request));
});
