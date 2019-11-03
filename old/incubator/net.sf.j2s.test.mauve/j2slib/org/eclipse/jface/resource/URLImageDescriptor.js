Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ImageDescriptor"], "org.eclipse.jface.resource.URLImageDescriptor", ["java.io.BufferedInputStream", "$wt.graphics.ImageData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.url = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "URLImageDescriptor", org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor (c$, 
function (url) {
Clazz.superConstructor (this, org.eclipse.jface.resource.URLImageDescriptor, []);
this.url = url;
}, "java.net.URL");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, org.eclipse.jface.resource.URLImageDescriptor))) {
return false;
}return (o).url.equals (this.url);
}, "~O");
Clazz.overrideMethod (c$, "getImageData", 
function () {
var result = null;
var $in = this.getStream ();
if ($in != null) {
try {
result =  new $wt.graphics.ImageData ($in);
} catch (e) {
if (Clazz.instanceOf (e, $wt.SWTException)) {
if (e.code != 40) throw e;
} else {
throw e;
}
} finally {
try {
$in.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
}return result;
});
Clazz.defineMethod (c$, "getStream", 
function () {
try {
return  new java.io.BufferedInputStream (this.url.openStream ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.url.hashCode ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "URLImageDescriptor(" + this.url + ")";
});
});
