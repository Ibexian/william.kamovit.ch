!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=9)}({9:function(e,n){self.addEventListener("install",function(e){var n=["/","/img/galaxy_starfield.png","/img/logo.png","/img/terraformed.png","/img/marsbump1k.jpg","/img/marsmap1k.jpg","/js/app.bundle.js","/js/index.bundle.js","/css/index.css"];e.waitUntil(caches.open("kamovitch-static-v2").then(function(e){return e.addAll(n)}))}),self.addEventListener("fetch",function(e){console.log(e.response),e.respondWith(caches.match(e.request).then(function(n){return n?(console.log(n),n):fetch(e.request)}))})}});