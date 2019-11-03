Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (null, "org.eclipse.core.internal.runtime.URLTool", ["java.net.URL", "java.util.Vector", "org.eclipse.core.internal.runtime.Assert"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.runtime, "URLTool");
c$.appendTrailingSlash = Clazz.defineMethod (c$, "appendTrailingSlash", 
function (url) {
var file = url.getFile ();
if (file.endsWith ("/")) return url;
try {
return  new java.net.URL (url.getProtocol (), url.getHost (), url.getPort (), file + "/");
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
org.eclipse.core.internal.runtime.Assert.isTrue (false, "internal error");
} else {
throw e;
}
}
return null;
}, "java.net.URL");
c$.getChild = Clazz.defineMethod (c$, "getChild", 
function (parent, member) {
var file = parent.getFile ();
if (!file.endsWith ("/")) file = file + "/";
try {
return  new java.net.URL (parent.getProtocol (), parent.getHost (), parent.getPort (), file + member);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
org.eclipse.core.internal.runtime.Assert.isTrue (false, "internal error");
} else {
throw e;
}
}
return null;
}, "java.net.URL,~S");
c$.getElements = Clazz.defineMethod (c$, "getElements", 
function (url) {
var result =  new java.util.Vector (5);
var lastElement = null;
while ((lastElement = org.eclipse.core.internal.runtime.URLTool.getLastElement (url)) != null) {
result.insertElementAt (lastElement, 0);
url = org.eclipse.core.internal.runtime.URLTool.getParent (url);
}
return result;
}, "java.net.URL");
c$.getLastElement = Clazz.defineMethod (c$, "getLastElement", 
function (url) {
var file = url.getFile ();
var len = file.length;
if (len == 0 || len == 1 && (file.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) return null;
var lastSlashIndex = -1;
for (var i = len - 2; lastSlashIndex == -1 && i >= 0; --i) {
if ((file.charAt (i)).charCodeAt (0) == ('/').charCodeAt (0)) lastSlashIndex = i;
}
var isDirectory = (file.charAt (len - 1)).charCodeAt (0) == ('/').charCodeAt (0);
if (lastSlashIndex == -1) {
if (isDirectory) {
return file.substring (0, len - 1);
} else {
return file;
}} else {
if (isDirectory) {
return file.substring (lastSlashIndex + 1, len - 1);
} else {
return file.substring (lastSlashIndex + 1, len);
}}}, "java.net.URL");
c$.getParent = Clazz.defineMethod (c$, "getParent", 
function (url) {
var file = url.getFile ();
var len = file.length;
if (len == 0 || len == 1 && (file.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) return null;
var lastSlashIndex = -1;
for (var i = len - 2; lastSlashIndex == -1 && i >= 0; --i) {
if ((file.charAt (i)).charCodeAt (0) == ('/').charCodeAt (0)) lastSlashIndex = i;
}
if (lastSlashIndex == -1) file = "";
 else file = file.substring (0, lastSlashIndex + 1);
try {
url =  new java.net.URL (url.getProtocol (), url.getHost (), url.getPort (), file);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
org.eclipse.core.internal.runtime.Assert.isTrue (false, e.getMessage ());
} else {
throw e;
}
}
return url;
}, "java.net.URL");
c$.getRoot = Clazz.defineMethod (c$, "getRoot", 
function (urlString) {
return org.eclipse.core.internal.runtime.URLTool.getRoot ( new java.net.URL (urlString));
}, "~S");
c$.getRoot = Clazz.defineMethod (c$, "getRoot", 
function (url) {
try {
return  new java.net.URL (url.getProtocol (), url.getHost (), url.getPort (), "/");
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
org.eclipse.core.internal.runtime.Assert.isTrue (false, "internal error");
} else {
throw e;
}
}
return null;
}, "java.net.URL");
c$.removeTrailingSlash = Clazz.defineMethod (c$, "removeTrailingSlash", 
function (url) {
var file = url.getFile ();
if (file.endsWith ("/")) {
file = file.substring (0, file.length - 1);
try {
return  new java.net.URL (url.getProtocol (), url.getHost (), url.getPort (), file);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
org.eclipse.core.internal.runtime.Assert.isTrue (false, e.getMessage ());
} else {
throw e;
}
}
} else {
return url;
}return null;
}, "java.net.URL");
c$.urlsOverlap = Clazz.defineMethod (c$, "urlsOverlap", 
function (url1, url2) {
if (!org.eclipse.core.internal.runtime.URLTool.getRoot (url1).equals (org.eclipse.core.internal.runtime.URLTool.getRoot (url2))) {
return false;
}var elements1 = org.eclipse.core.internal.runtime.URLTool.getElements (url1);
var elements2 = org.eclipse.core.internal.runtime.URLTool.getElements (url2);
for (var i = 0; i < elements1.size () && i < elements2.size (); ++i) {
var element1 = elements1.elementAt (i);
var element2 = elements2.elementAt (i);
if (!element1.equals (element2)) {
return false;
}}
return true;
}, "java.net.URL,java.net.URL");
});
