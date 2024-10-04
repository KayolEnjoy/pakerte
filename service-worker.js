const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    './', 
    './index.html', 
    './manifest.json', 
    './logo192.png', 
    './logo512.png', 
    // Tambahkan asset lain yang perlu dicache
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files');
                return cache.addAll(CACHE_ASSETS);
            })
    );
});

// Fetch from Cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Removing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
