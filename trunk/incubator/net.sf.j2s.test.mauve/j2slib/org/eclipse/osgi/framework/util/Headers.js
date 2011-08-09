Clazz.declarePackage ("org.eclipse.osgi.framework.util");
Clazz.load (["java.util.Dictionary", "$.Enumeration"], "org.eclipse.osgi.framework.util.Headers", ["java.io.BufferedReader", "$.InputStreamReader", "java.lang.IllegalArgumentException", "$.StringBuffer", "$.UnsupportedOperationException", "org.eclipse.osgi.framework.internal.core.Msg", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.headers = null;
this.values = null;
this.$size = 0;
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.util.Headers.ArrayEnumeration")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.array = null;
this.cur = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.util.Headers, "ArrayEnumeration", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (a, b) {
this.array =  new Array (b);
System.arraycopy (a, 0, this.array, 0, this.array.length);
}, "~A,~N");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return this.cur < this.array.length;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
return this.array[this.cur++];
});
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.util, "Headers", java.util.Dictionary);
Clazz.makeConstructor (c$, 
function (initialCapacity) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.util.Headers);
this.headers =  new Array (initialCapacity);
this.values =  new Array (initialCapacity);
}, "~N");
Clazz.makeConstructor (c$, 
function (values) {
this.construct (values.size ());
var keys = values.keys ();
while (keys.hasMoreElements ()) {
var key = keys.nextElement ();
this.set (key, values.get (key));
}
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "keys", 
function () {
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.Headers.ArrayEnumeration, this, null, this.headers, this.$size);
});
Clazz.overrideMethod (c$, "elements", 
function () {
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.util.Headers.ArrayEnumeration, this, null, this.values, this.$size);
});
Clazz.defineMethod (c$, "getIndex", 
($fz = function (key) {
var stringKey = Clazz.instanceOf (key, String);
for (var i = 0; i < this.$size; i++) {
if (this.headers[i].equals (key)) return i;
if (stringKey && (Clazz.instanceOf (this.headers[i], String)) && (this.headers[i]).equalsIgnoreCase (key)) return i;
}
return -1;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "remove", 
($fz = function (remove) {
var removed = this.values[remove];
for (var i = remove; i < this.$size; i++) {
if (i == this.headers.length - 1) {
this.headers[i] = null;
this.values[i] = null;
} else {
this.headers[i] = this.headers[i + 1];
this.values[i] = this.values[i + 1];
}}
if (remove < this.$size) this.$size--;
return removed;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "add", 
($fz = function (header, value) {
if (this.$size == this.headers.length) {
var newHeaders =  new Array (this.headers.length + 10);
var newValues =  new Array (this.values.length + 10);
System.arraycopy (this.headers, 0, newHeaders, 0, this.headers.length);
System.arraycopy (this.values, 0, newValues, 0, this.values.length);
this.headers = newHeaders;
this.values = newValues;
}this.headers[this.$size] = header;
this.values[this.$size] = value;
this.$size++;
}, $fz.isPrivate = true, $fz), "~O,~O");
Clazz.defineMethod (c$, "get", 
function (key) {
var i = -1;
if ((i = this.getIndex (key)) != -1) return this.values[i];
return null;
}, "~O");
Clazz.defineMethod (c$, "set", 
function (key, value) {
if (Clazz.instanceOf (key, String)) key = (key).intern ();
var i = this.getIndex (key);
if (value == null) {
if (i != -1) return this.remove (i);
} else {
if (i != -1) throw  new IllegalArgumentException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.HEADER_DUPLICATE_KEY_EXCEPTION, key));
this.add (key, value);
}return null;
}, "~O,~O");
Clazz.defineMethod (c$, "size", 
function () {
return this.$size;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.$size == 0;
});
Clazz.overrideMethod (c$, "put", 
function (key, value) {
throw  new UnsupportedOperationException ();
}, "~O,~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
throw  new UnsupportedOperationException ();
}, "~O");
Clazz.defineMethod (c$, "toString", 
function () {
return (this.values.toString ());
});
c$.parseManifest = Clazz.defineMethod (c$, "parseManifest", 
function ($in) {
try {
var headers =  new org.eclipse.osgi.framework.util.Headers (10);
var br;
try {
br =  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF8"));
} catch (e) {
if (Clazz.instanceOf (e, java.io.UnsupportedEncodingException)) {
br =  new java.io.BufferedReader ( new java.io.InputStreamReader ($in));
} else {
throw e;
}
}
var header = null;
var value =  new StringBuffer (256);
var firstLine = true;
while (true) {
var line = br.readLine ();
if ((line == null) || (line.length == 0)) {
if (!firstLine) {
headers.set (header, null);
headers.set (header, value.toString ().trim ());
}break;
}if ((line.charAt (0)).charCodeAt (0) == (' ').charCodeAt (0)) {
if (firstLine) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_SPACE, line));
}value.append (line.substring (1));
continue ;}if (!firstLine) {
headers.set (header, null);
headers.set (header, value.toString ().trim ());
value.setLength (0);
}var colon = line.indexOf (':');
if (colon == -1) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_INVALID_LINE_NOCOLON, line));
}header = line.substring (0, colon).trim ();
value.append (line.substring (colon + 1));
firstLine = false;
}
return headers;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.MANIFEST_IOEXCEPTION, e);
} else {
throw e;
}
} finally {
try {
$in.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}
}, "java.io.InputStream");
});
