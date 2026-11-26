'use strict';
const CACHE_NAME='studio-dronov-static-v1';
const STATIC_ASSETS=['./studio-dronov-perfil.jpg','./icon.svg','./pwa.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(STATIC_ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET')return;
 const url=new URL(request.url);if(url.origin!==self.location.origin)return;
 if(url.pathname.endsWith('.html')||url.pathname.includes('/rest/')||url.pathname.includes('/auth/')||url.pathname.includes('/storage/'))return;
 if(!/\.(?:jpg|jpeg|png|webp|svg|js|css|woff2?)$/i.test(url.pathname))return;
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
  if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy))}
  return response;
 })));
});