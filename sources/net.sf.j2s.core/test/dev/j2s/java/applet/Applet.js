Clazz.declarePackage ("java.applet");
Clazz.load (["java.awt.Panel"], "java.applet.Applet", ["java.net.URL", "java.util.Locale"], function () {
c$ = Clazz.decorateAsClass (function () {
this.stub = null;
Clazz.instantialize (this, arguments);
}, java.applet, "Applet", java.awt.Panel);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.applet.Applet, []);
});
Clazz.defineMethod (c$, "setStub", 
function (stub) {
this.stub = stub;
}, "java.applet.AppletStub");
Clazz.defineMethod (c$, "isActive", 
function () {
if (this.stub != null) {
return this.stub.isActive ();
} else {
return false;
}});
Clazz.defineMethod (c$, "getDocumentBase", 
function () {
return this.stub.getDocumentBase ();
});
Clazz.defineMethod (c$, "getCodeBase", 
function () {
return this.stub.getCodeBase ();
});
Clazz.defineMethod (c$, "getParameter", 
function (name) {
return this.stub.getParameter (name);
}, "~S");
Clazz.defineMethod (c$, "getAppletContext", 
function () {
return this.stub.getAppletContext ();
});
Clazz.defineMethod (c$, "setVisible", 
function (b) {
Clazz.superCall (this, java.applet.Applet, "setVisible", [b]);
if (b) this.repaint ();
}, "~B");
Clazz.defineMethod (c$, "resize", 
function (width, height) {
var d = this.size ();
if ((d.width != width) || (d.height != height)) {
Clazz.superCall (this, java.applet.Applet, "resize", [width, height]);
if (this.stub != null) {
this.stub.appletResize (width, height);
}}}, "~N,~N");
Clazz.defineMethod (c$, "resize", 
function (d) {
this.resize (d.width, d.height);
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "showStatus", 
function (msg) {
this.getAppletContext ().showStatus (msg);
}, "~S");
Clazz.defineMethod (c$, "getImage", 
function (url) {
return this.getAppletContext ().getImage (url);
}, "java.net.URL");
Clazz.defineMethod (c$, "getImage", 
function (url, name) {
try {
return this.getImage ( new java.net.URL (url, name));
} catch (e) {
if (Clazz.exceptionOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
}, "java.net.URL,~S");
Clazz.defineMethod (c$, "getAppletInfo", 
function () {
return null;
});
Clazz.defineMethod (c$, "getLocale", 
function () {
var locale = Clazz.superCall (this, java.applet.Applet, "getLocale", []);
if (locale == null) {
return java.util.Locale.getDefault ();
}return locale;
});
Clazz.defineMethod (c$, "getParameterInfo", 
function () {
return null;
});
Clazz.defineMethod (c$, "init", 
function () {
});
Clazz.defineMethod (c$, "start", 
function () {
});
Clazz.defineMethod (c$, "stop", 
function () {
});
Clazz.defineMethod (c$, "destroy", 
function () {
});
});
