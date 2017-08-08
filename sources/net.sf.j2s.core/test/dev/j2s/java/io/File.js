Clazz.declarePackage ("java.io");
Clazz.load (null, "java.io.File", ["java.lang.Error", "$.NullPointerException", "java.security.AccessControlException", "java.util.ArrayList", "java.net.URI", "$.URL", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.path = null;
this.prefixLength = 0;
Clazz.instantialize (this, arguments);
}, java.io, "File", null, Comparable);
Clazz.defineMethod (c$, "getPrefixLength", 
function () {
return this.prefixLength;
});
Clazz.makeConstructor (c$, 
 function (pathname, prefixLength) {
this.path = pathname;
this.prefixLength = prefixLength;
}, "~S,~N");
Clazz.makeConstructor (c$, 
 function (child, parent) {
this.path = this.resolve (parent.path, child);
this.prefixLength = parent.prefixLength;
}, "~S,java.io.File");
Clazz.defineMethod (c$, "resolve", 
 function (path, child) {
if (!path.endsWith ("/")) path += "/";
return path + child;
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (pathname) {
this.construct (null, pathname, 0);
}, "~S");
Clazz.makeConstructor (c$, 
function (parent, child) {
this.construct (parent, child, 0);
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (parent, child) {
this.construct (parent == null ? null : parent.getPath (), child, 0);
}, "java.io.File,~S");
Clazz.makeConstructor (c$, 
function (parent, child, junk) {
if (child == null) {
throw  new NullPointerException ();
}if (parent != null) {
if (parent.equals ("")) {
this.path = this.resolve (".", child);
} else {
this.path = this.resolve (parent, child);
}} else {
this.path = this.resolve (".", child);
}this.prefixLength = this.path.lastIndexOf ("/") + 1;
}, "~S,~S,~N");
Clazz.defineMethod (c$, "getName", 
function () {
var index = this.path.lastIndexOf ('/');
if (index < this.prefixLength) return this.path.substring (this.prefixLength);
return this.path.substring (index + 1);
});
Clazz.defineMethod (c$, "getParent", 
function () {
var index = this.path.lastIndexOf ('/');
if (index < this.prefixLength) {
if ((this.prefixLength > 0) && (this.path.length > this.prefixLength)) return this.path.substring (0, this.prefixLength);
return null;
}return this.path.substring (0, index);
});
Clazz.defineMethod (c$, "getParentFile", 
function () {
var p = this.getParent ();
if (p == null) return null;
return  new java.io.File (p, this.prefixLength);
});
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "isAbsolute", 
function () {
switch (this.path.indexOf ("/")) {
case 0:
return true;
case 2:
return this.path.indexOf (":") == 1;
}
return false;
});
Clazz.defineMethod (c$, "getAbsolutePath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getAbsoluteFile", 
function () {
return this;
});
Clazz.defineMethod (c$, "getCanonicalPath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getCanonicalFile", 
function () {
return this;
});
c$.slashify = Clazz.defineMethod (c$, "slashify", 
 function (path, isDirectory) {
var p = path;
p = p.$replace ('\\', '/');
if (!p.startsWith ("/")) p = "/" + p;
if (!p.endsWith ("/") && isDirectory) p = p + "/";
return p;
}, "~S,~B");
Clazz.defineMethod (c$, "toURL", 
function () {
return swingjs.JSToolkit.checkForJSData (this,  new java.net.URL ("file", "", java.io.File.slashify (this.getAbsolutePath (), this.isDirectory ())));
});
Clazz.defineMethod (c$, "toURI", 
function () {
try {
var f = this.getAbsoluteFile ();
var sp = java.io.File.slashify (f.getPath (), f.isDirectory ());
if (!sp.startsWith ("//")) sp = "//" + sp;
return swingjs.JSToolkit.checkForJSData (this,  new java.net.URI ("file:" + sp));
} catch (x) {
if (Clazz.exceptionOf (x, java.net.MalformedURLException)) {
throw  new Error (x);
} else {
throw x;
}
}
});
Clazz.defineMethod (c$, "canRead", 
function () {
return true;
});
Clazz.defineMethod (c$, "canWrite", 
function () {
return true;
});
Clazz.defineMethod (c$, "exists", 
function () {
return true;
});
Clazz.defineMethod (c$, "isDirectory", 
function () {
return true;
});
Clazz.defineMethod (c$, "isFile", 
function () {
return true;
});
Clazz.defineMethod (c$, "list", 
function () {
throw  new java.security.AccessControlException ("access denied");
});
Clazz.defineMethod (c$, "list", 
function (filter) {
var names = this.list ();
if ((names == null) || (filter == null)) {
return names;
}var v =  new java.util.ArrayList ();
for (var i = 0; i < names.length; i++) {
if (filter.accept (this, names[i])) {
v.add (names[i]);
}}
return (v.toArray ( new Array (v.size ())));
}, "java.io.FilenameFilter");
Clazz.defineMethod (c$, "listFiles", 
function () {
var ss = this.list ();
if (ss == null) return null;
var n = ss.length;
var fs =  new Array (n);
for (var i = 0; i < n; i++) {
fs[i] =  new java.io.File (ss[i], this);
}
return fs;
});
Clazz.overrideMethod (c$, "compareTo", 
function (pathname) {
return this.getPath ().compareTo (pathname.getPath ());
}, "java.io.File");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if ((obj != null) && (Clazz.instanceOf (obj, java.io.File))) {
return this.compareTo (obj) == 0;
}return false;
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getPath ();
});
Clazz.defineStatics (c$,
"separatorChar", '/');
c$.separator = c$.prototype.separator = "/";
Clazz.defineStatics (c$,
"pathSeparatorChar", '/');
c$.pathSeparator = c$.prototype.pathSeparator = "/";
});
