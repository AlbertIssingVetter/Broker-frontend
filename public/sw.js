const cacheFiles = [];
const cacheVersion = '1.0.0';
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
                console.log('response found for ', e.request.url)
                return response;
            } else if (e.request.url.includes('/api/') || e.request.url.includes('sw.js') || e.request.url.includes('/admin')) {
                console.log('response not found for ', e.request.url)
                return fetch(e.request);
            } else {
                return caches.match(new Request("/")).then(responseHomePage => {
                    if (responseHomePage) {
                        console.log('response not found and get homepage for', e.request.url)
                        return responseHomePage;
                    } else {
                        console.log('response not found and home page not cached for', e.request.url)
                        return fetch(e.request);
                    }
                });
            }
        })
    );
})
