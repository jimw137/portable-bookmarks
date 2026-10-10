// Keeps the app working offline. Only the app's own files are stored; site icons are left to the browser.
const CACHE='portable-bookmarks-v1';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=='GET')return;
  // Network first, so updates arrive straight away; the stored copy is used when offline.
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
