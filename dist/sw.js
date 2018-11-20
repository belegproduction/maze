'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(["index.html", "main.css", "main.js"]);

toolbox.router.get('/images/*', toolbox.cacheFirst);

toolbox.router.get('/*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});
