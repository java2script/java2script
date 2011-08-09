Clazz.declarePackage ("org.eclipse.osgi.framework.internal.defaultadaptor");
Clazz.load (["java.util.Properties"], "org.eclipse.osgi.framework.internal.defaultadaptor.MetaData", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "java.lang.Boolean", "$.Long"], function () {
c$ = Clazz.decorateAsClass (function () {
this.properties = null;
this.datafile = null;
this.header = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.defaultadaptor, "MetaData");
Clazz.prepareFields (c$, function () {
this.properties =  new java.util.Properties ();
});
Clazz.makeConstructor (c$, 
function (datafile, header) {
this.datafile = datafile;
this.header = header;
}, "java.io.File,~S");
Clazz.defineMethod (c$, "get", 
function (key, def) {
return this.properties.getProperty (key, def);
}, "~S,~S");
Clazz.defineMethod (c$, "getInt", 
function (key, def) {
var result = this.get (key, null);
if (result == null) {
return def;
}try {
return Integer.parseInt (result);
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
return def;
} else {
throw nfe;
}
}
}, "~S,~N");
Clazz.defineMethod (c$, "getLong", 
function (key, def) {
var result = this.get (key, null);
if (result == null) {
return def;
}try {
return Long.parseLong (result);
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
return def;
} else {
throw nfe;
}
}
}, "~S,~N");
Clazz.defineMethod (c$, "getBoolean", 
function (key, def) {
var result = this.get (key, null);
if (result == null) {
return def;
}return Boolean.$valueOf (result).booleanValue ();
}, "~S,~B");
Clazz.defineMethod (c$, "set", 
function (key, val) {
this.properties.put (key, val);
}, "~S,~S");
Clazz.defineMethod (c$, "setInt", 
function (key, val) {
this.properties.put (key, Integer.toString (val));
}, "~S,~N");
Clazz.defineMethod (c$, "setLong", 
function (key, val) {
this.properties.put (key, Long.toString (val));
}, "~S,~N");
Clazz.defineMethod (c$, "setBoolean", 
function (key, val) {
this.properties.put (key,  new Boolean (val).toString ());
}, "~S,~B");
Clazz.defineMethod (c$, "remove", 
function (key) {
this.properties.remove (key);
}, "~S");
Clazz.defineMethod (c$, "save", 
function () {
if (!this.datafile.exists () && this.datafile.getParent () != null) {
var parent =  new java.io.File (this.datafile.getParent ());
if (!parent.exists ()) parent.mkdir ();
}var fos =  new java.io.FileOutputStream (this.datafile);
try {
this.properties.store (fos, this.header);
} finally {
fos.close ();
}
});
Clazz.defineMethod (c$, "load", 
function () {
this.properties.clear ();
if (this.datafile.exists ()) {
var fis =  new java.io.FileInputStream (this.datafile);
try {
this.properties.load (fis);
} finally {
fis.close ();
}
}});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.properties.toString ();
});
});
