const CACHE_NAME = 'grammar-game-cache-v1';

// الملفات الأساسية التي يجب تخزينها فور تثبيت التطبيق
const ASSETS_TO_CACHE = [
    './',
    './index.html'
];

// 1. حدث التثبيت (Install)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('تم فتح الذاكرة المؤقتة (Cache)');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// 2. حدث التفعيل (Activate) - لتنظيف أي نسخ قديمة من الذاكرة
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('جاري حذف الذاكرة المؤقتة القديمة:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. حدث الجلب (Fetch) - اعتراض الطلبات واستخدام الذاكرة المؤقتة للعمل بدون إنترنت
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // إذا كان الملف موجوداً في الذاكرة المؤقتة، قم بإرجاعه
            if (cachedResponse) {
                return cachedResponse;
            }
            // إذا لم يكن موجوداً، قم بجلبه من الإنترنت ثم احفظ نسخة منه
            return fetch(event.request).then((response) => {
                // تجنب حفظ الردود الخاطئة
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            }).catch(() => {
                // ماذا يحدث عند انقطاع الإنترنت وعدم وجود الملف في الذاكرة
                console.log('أنت تعمل الآن في وضع عدم الاتصال (Offline).');
            });
        })
    );
});