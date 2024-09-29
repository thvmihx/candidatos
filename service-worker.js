const CACHE_NAME = 'pwa-cache-v1';
const URLS_TO_CACHE = [
'/',
  '/index.html',
  'css/style.css',
  'js/main.js',
  '/manifest.json',
  '/candidatos.json',
  '/images/facebook.svg', 
  '/images/instagram.svg',
  '/images/logo.jpeg',
  '/images/icon.png' 
];
//quando e feito pela primeira vez a instalação
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(URLS_TO_CACHE);
            })
            .catch(error => {
                console.error('Falha ao adicionar arquivos ao cache:', error);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Retorna do cache
                }
                // Caso não esteja no cache, faz a requisição na rede
                return fetch(event.request)
                    .catch(() => {
                        // Fallback em caso de falha na rede
                        return new Response('O recurso solicitado não está disponível.');
                    });
            })
    );
});
