Clazz.declarePackage ("java.awt");
Clazz.load (["java.lang.Enum"], "java.awt.Desktop", ["swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (java.awt, "Desktop");
Clazz.makeConstructor (c$, 
 function () {
});
c$.getDesktop = Clazz.defineMethod (c$, "getDesktop", 
function () {
if (java.awt.Desktop.desktop == null) {
java.awt.Desktop.desktop =  new java.awt.Desktop ();
}return java.awt.Desktop.desktop;
});
c$.isDesktopSupported = Clazz.defineMethod (c$, "isDesktopSupported", 
function () {
return true;
});
Clazz.defineMethod (c$, "isSupported", 
function (action) {
switch (action) {
case java.awt.Desktop.Action.BROWSE:
return true;
default:
return false;
}
}, "java.awt.Desktop.Action");
Clazz.defineMethod (c$, "open", 
function (file) {
}, "java.io.File");
Clazz.defineMethod (c$, "edit", 
function (file) {
}, "java.io.File");
Clazz.defineMethod (c$, "print", 
function (file) {
}, "java.io.File");
Clazz.defineMethod (c$, "browse", 
function (uri) {
swingjs.JSToolkit.showWebPage (uri.toURL ());
}, "java.net.URI");
Clazz.defineMethod (c$, "mail", 
function () {
});
Clazz.defineMethod (c$, "mail", 
function (mailtoURI) {
}, "java.net.URI");
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.Desktop, "Action", Enum);
Clazz.defineEnumConstant (c$, "OPEN", 0, []);
Clazz.defineEnumConstant (c$, "EDIT", 1, []);
Clazz.defineEnumConstant (c$, "PRINT", 2, []);
Clazz.defineEnumConstant (c$, "MAIL", 3, []);
Clazz.defineEnumConstant (c$, "BROWSE", 4, []);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"desktop", null);
});
