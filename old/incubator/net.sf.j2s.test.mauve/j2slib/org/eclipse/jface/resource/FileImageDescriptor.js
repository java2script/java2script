Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ImageDescriptor"], "org.eclipse.jface.resource.FileImageDescriptor", ["java.io.BufferedInputStream", "$.FileInputStream", "$wt.graphics.ImageData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.location = null;
this.name = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "FileImageDescriptor", org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor (c$, 
function (clazz, filename) {
Clazz.superConstructor (this, org.eclipse.jface.resource.FileImageDescriptor, []);
this.location = clazz;
this.name = filename;
}, "Class,~S");
Clazz.defineMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, org.eclipse.jface.resource.FileImageDescriptor))) {
return false;
}var other = o;
if (this.location != null) {
if (!this.location.equals (other.location)) {
return false;
}} else {
if (other.location != null) {
return false;
}}return this.name.equals (other.name);
}, "~O");
Clazz.overrideMethod (c$, "getImageData", 
function () {
if (true) return  new $wt.graphics.ImageData (this.name);
var $in = this.getStream ();
var result = null;
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
($fz = function () {
var is = null;
if (this.location != null) {
is = this.location.getResourceAsStream (this.name);
} else {
try {
is =  new java.io.FileInputStream (this.name);
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
return null;
} else {
throw e;
}
}
}if (is == null) return null;
 else return  new java.io.BufferedInputStream (is);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hashCode", 
function () {
var code = this.name.hashCode ();
if (this.location != null) {
code += this.location.hashCode ();
}return code;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "FileImageDescriptor(location=" + this.location + ", name=" + this.name + ")";
});
});
