const cacheFiles = [];
const cacheVersion = '1.0.0';
cacheFiles.push('https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v27.2.1/dist/font-face.css');
cacheFiles.push('./');
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheVersion).then(cache => {
            return cache.addAll(cacheFiles);
        })
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(thisCacheName => {
                if (thisCacheName !== cacheVersion) {
                    return caches.delete(thisCacheName);
                } else {
                    return null;
                }
            }));
        })
    );

});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            if (response) {
                return response;
            }
            return fetch(e.request);
        })
    );
})
