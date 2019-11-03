Clazz.declarePackage ("org.eclipse.core.internal.boot");
Clazz.load (["org.eclipse.core.internal.boot.PlatformURLConnection"], "org.eclipse.core.internal.boot.PlatformURLBaseConnection", ["java.io.IOException", "java.net.URL", "org.eclipse.core.internal.boot.PlatformURLHandler", "org.eclipse.core.internal.runtime.Messages", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.boot, "PlatformURLBaseConnection", org.eclipse.core.internal.boot.PlatformURLConnection);
Clazz.overrideMethod (c$, "allowCaching", 
function () {
return true;
});
Clazz.overrideMethod (c$, "resolve", 
function () {
var spec = this.url.getFile ().trim ();
if (spec.startsWith ("/")) spec = spec.substring (1);
if (!spec.startsWith ("base/")) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_badVariant, this.url);
throw  new java.io.IOException (message);
}return spec.length == "base".length + 1 ? org.eclipse.core.internal.boot.PlatformURLBaseConnection.installURL :  new java.net.URL (org.eclipse.core.internal.boot.PlatformURLBaseConnection.installURL, spec.substring ("base".length + 1));
});
c$.startup = Clazz.defineMethod (c$, "startup", 
function (url) {
if (org.eclipse.core.internal.boot.PlatformURLBaseConnection.installURL != null) return ;
($t$ = org.eclipse.core.internal.boot.PlatformURLBaseConnection.installURL = url, org.eclipse.core.internal.boot.PlatformURLBaseConnection.prototype.installURL = org.eclipse.core.internal.boot.PlatformURLBaseConnection.installURL, $t$);
org.eclipse.core.internal.boot.PlatformURLHandler.register ("base", org.eclipse.core.internal.boot.PlatformURLBaseConnection);
}, "java.net.URL");
Clazz.defineStatics (c$,
"PLATFORM", "base");
c$.PLATFORM_URL_STRING = c$.prototype.PLATFORM_URL_STRING = "platform:/base/";
Clazz.defineStatics (c$,
"installURL", null);
});
