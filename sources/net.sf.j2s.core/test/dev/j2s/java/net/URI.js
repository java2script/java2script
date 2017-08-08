Clazz.declarePackage ("java.net");
Clazz.load (["java.net.URL"], "java.net.URI", ["swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (java.net, "URI", java.net.URL);
Clazz.defineMethod (c$, "toURL", 
function () {
try {
return swingjs.JSToolkit.checkForJSData (this,  new java.net.URL (this.toString ()));
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
});
});
