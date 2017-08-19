Clazz.declarePackage ("sun.awt.image");
Clazz.load (["sun.awt.image.InputStreamImageSource"], "sun.awt.image.URLImageSource", ["java.net.URL"], function () {
c$ = Clazz.decorateAsClass (function () {
this.url = null;
this.conn = null;
this.actualHost = null;
this.actualPort = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "URLImageSource", sun.awt.image.InputStreamImageSource);
Clazz.makeConstructor (c$, 
function (u) {
Clazz.superConstructor (this, sun.awt.image.URLImageSource, []);
this.url = u;
}, "java.net.URL");
Clazz.makeConstructor (c$, 
function (href) {
this.construct ( new java.net.URL (null, href));
}, "~S");
Clazz.makeConstructor (c$, 
function (u, uc) {
this.construct (u);
this.conn = uc;
}, "java.net.URL,java.net.URLConnection");
Clazz.makeConstructor (c$, 
function (uc) {
this.construct (uc.getURL (), uc);
}, "java.net.URLConnection");
Clazz.overrideMethod (c$, "checkSecurity", 
function (context, quiet) {
if (this.actualHost != null) {
try {
var security = System.getSecurityManager ();
if (security != null) {
security.checkConnect (this.actualHost, this.actualPort, context);
}} catch (e) {
if (Clazz.exceptionOf (e, SecurityException)) {
if (!quiet) {
throw e;
}return false;
} else {
throw e;
}
}
}return true;
}, "~O,~B");
Clazz.defineMethod (c$, "getDecoder", 
function () {
return null;
});
});
