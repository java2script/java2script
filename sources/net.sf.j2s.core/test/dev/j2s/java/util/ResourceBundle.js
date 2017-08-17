Clazz.load (null, "java.util.ResourceBundle", ["java.lang.NullPointerException", "java.util.Enumeration", "$.MissingResourceException", "net.sf.j2s.ajax.HttpRequest"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "ResourceBundle");

Clazz.newMethod$(C$, '$init$', function () {
this.parent = null;
this.locale = null;
this.bundleName = null;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'getString$S', function (key) {
return this.getObject$S (key);
});

Clazz.newMethod$(C$, 'getStringArray$S', function (key) {
return this.getObject$S (key);
});

Clazz.newMethod$(C$, 'getObject$S', function (key) {
var obj = this.handleGetObject$S (key);
if (obj == null) {
if (this.parent != null) {
obj = this.parent.getObject$S (key);
}if (obj == null) throw Clazz.$new(java.util.MissingResourceException.construct$S$S$S,["Can't find resource for bundle " + this.getClass ().getName () + ", key " + key, this.getClass ().getName (), key]);
}return obj;
});

Clazz.newMethod$(C$, 'getLocale', function () {
return this.locale;
});

Clazz.newMethod$(C$, 'setParent$java_util_ResourceBundle', function (parent) {
this.parent = parent;
});

Clazz.newMethod$(C$, 'getBundle$S', function (baseName) {
return java.util.ResourceBundle.getBundleImpl$S$java_util_Locale$ClassLoader (baseName, null, null);
}, 1);

Clazz.newMethod$(C$, 'getBundle$S$java_util_Locale', function (baseName, locale) {
return java.util.ResourceBundle.getBundleImpl$S$java_util_Locale$ClassLoader (baseName, locale, null);
}, 1);

Clazz.newMethod$(C$, 'getBundle$S$java_util_Locale$ClassLoader', function (baseName, locale, loader) {
if (loader == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}return java.util.ResourceBundle.getBundleImpl$S$java_util_Locale$ClassLoader (baseName, locale, loader);
}, 1);

Clazz.newMethod$(C$, 'getBundleImpl$S$java_util_Locale$ClassLoader', function (baseName, locale, loader) {
if (baseName == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}for (var i = 0; i < java.util.ResourceBundle.caches.length; i++) {
if (java.util.ResourceBundle.caches[i].bundleName === baseName) {
return java.util.ResourceBundle.caches[i];
}}
var bundle = Clazz.$new(java.util.ResourceBundle.TextResourceBundle.construct$S,[baseName]);
java.util.ResourceBundle.caches[java.util.ResourceBundle.caches.length] = bundle;
return bundle;
}, 1);

Clazz.newMethod$(C$, 'registerBundle$S$S', function (baseName, content) {
for (var i = 0; i < java.util.ResourceBundle.caches.length; i++) {
if (java.util.ResourceBundle.caches[i].bundleName === baseName) {
return;
}}
java.util.ResourceBundle.caches[java.util.ResourceBundle.caches.length] = Clazz.$new(java.util.ResourceBundle.TextResourceBundle.construct$S$S,[baseName, content]);
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.ResourceBundle, "TextResourceBundle", java.util.ResourceBundle);

Clazz.newMethod$(C$, '$init$', function () {
this.map =  Clazz.newArray$('SA', 1, [0]);
this.keys =  Clazz.newArray$('SA', 1, [0]);
this.content = null;
this.initialized = false;
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (bundleName) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.bundleName = bundleName;
}, 1);

Clazz.newMethod$(C$, 'construct$S$S', function (bundleName, content) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.bundleName = bundleName;
this.content = content;
}, 1);

Clazz.newMethod$(C$, 'evalString$S', function (a) {
var r = new Array ();
var b = false;
var x = 0;
for (var i = 0; i < a.length; i++) {
var c = a.charAt (i);
if (b) {
if (c == 'f') r[r.length] = '\f';
else if (c == 't') r[r.length] = '\t';
else if (c == 'r') r[r.length] = '\r';
else if (c == 'n') r[r.length] = '\n';
else if (c == '\'') r[r.length] = '\'';
else if (c == '\"') r[r.length] = '\"';
else if (c == '\\') r[r.length] = '\\';
else if (c == 'u') {
r[r.length] =  eval ("\"\\u" + a.substring (i + 1, i + 5) + "\"");
i += 4;
}
x = i + 1;
b = false;
} else if (c == '\\') {
if (x != i) {
r[r.length] = a.substring (x, i);
}
b = true;
}
}
if (!b) {
r[r.length] = a.substring (x, a.length);
}
return r.join ('');
});

Clazz.newMethod$(C$, 'initBundle', function () {
if (this.initialized) {
return;
}this.initialized = true;
var a = null;
var b = this.bundleName;
if (this.content == null) {
var n = b.replace (/\./g, '/') + ".properties";
var p = Clazz.binaryFolders;
if (p == null) {
p = ["bin", "", "j2slib"];
}
var r =  new net.sf.j2s.ajax.HttpRequest ();
var x = 0;
while (a == null && x < p.length) {
var q = p[x];
if (q.length > 0 && q.lastIndexOf ("/") != q.length - 1) {
q += "/";
}
try {
r.open ("GET", q + n, false); // FIXME: using synchronized mode will freeze browser!
r.send ();
a = r.getResponseText ();
} catch (e) {
r =  new net.sf.j2s.ajax.HttpRequest ();
}
x++;
}
}if (this.content == null) {
this.content = a;
}if (this.content == null) {
return;
}var bundleLines = this.content.$plit ("\n");
for (var i = 0; i < bundleLines.length; i++) {
var trimedLine = bundleLines[i].trim ();
if (!trimedLine.startsWith$S ("#")) {
var index = trimedLine.indexOf$I ('=');
if (index != -1) {
var key = trimedLine.substring$I$I (0, index).trim ();
var value = trimedLine.substring$I (index + 1).trim ();
if (value.indexOf$I ('\\') != -1) {
value = this.evalString$S (value);
}var m = this.map;
var k = this.keys;
{
if (m[key] == null) {
k[k.length] = key;
}
m[key] = value;
}}}}
});

Clazz.newMethod$(C$, 'getKeys', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "ResourceBundle$TextResourceBundle$1", null, java.util.Enumeration);

Clazz.newMethod$(C$, '$init$', function () {
this.index = -1;
}, 1);

Clazz.newMethod$(C$, 'nextElement', function () {
this.index++;
return this.b$["java.util.ResourceBundle.TextResourceBundle"].keys[this.index];
});

Clazz.newMethod$(C$, 'hasMoreElements', function () {
return this.index < this.b$["java.util.ResourceBundle.TextResourceBundle"].keys.length - 1;
});
})()
), Clazz.$new(java.util.ResourceBundle$TextResourceBundle$1.$init$, [this, null]));
});

Clazz.newMethod$(C$, 'handleGetObject$S', function (key) {
if (!this.initialized) {
this.initBundle ();
}var m = this.map;
{
return m[key];
}return m;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
Clazz.defineStatics (C$,
"caches",  Clazz.newArray$('java_util_ResourceBundleA', 1, [0]));
})()
});

//Created 2017-08-17 10:33:18
