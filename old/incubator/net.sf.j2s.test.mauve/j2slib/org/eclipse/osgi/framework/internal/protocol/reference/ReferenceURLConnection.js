Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol.reference");
Clazz.load (["java.net.URLConnection"], "org.eclipse.osgi.framework.internal.protocol.reference.ReferenceURLConnection", ["java.io.File", "$.FileNotFoundException", "org.eclipse.osgi.framework.adaptor.FilePath", "org.eclipse.osgi.framework.internal.core.ReferenceInputStream"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reference = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.protocol.reference, "ReferenceURLConnection", java.net.URLConnection);
Clazz.overrideMethod (c$, "connect", 
function () {
if (!this.connected) {
var file =  new java.io.File (this.url.getPath ().substring (5));
var ref;
if (!file.isAbsolute ()) {
var installPath = this.getInstallPath ();
if (installPath != null) file = org.eclipse.osgi.framework.internal.protocol.reference.ReferenceURLConnection.makeAbsolute (installPath, file);
}ref = file.toURL ();
if (!file.exists ()) throw  new java.io.FileNotFoundException (file.toString ());
this.reference = ref;
}});
Clazz.overrideMethod (c$, "getDoInput", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getDoOutput", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getInputStream", 
function () {
if (!this.connected) {
this.connect ();
}return  new org.eclipse.osgi.framework.internal.core.ReferenceInputStream (this.reference);
});
Clazz.defineMethod (c$, "getInstallPath", 
($fz = function () {
var installURL = System.getProperty ("osgi.install.area");
if (installURL == null) return null;
if (!installURL.startsWith ("file:")) return null;
return installURL.substring (5);
}, $fz.isPrivate = true, $fz));
c$.makeAbsolute = Clazz.defineMethod (c$, "makeAbsolute", 
($fz = function (base, relative) {
if (relative.isAbsolute ()) return relative;
return  new java.io.File ( new org.eclipse.osgi.framework.adaptor.FilePath (base + relative.getPath ()).toString ());
}, $fz.isPrivate = true, $fz), "~S,java.io.File");
});
