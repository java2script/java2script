Clazz.declarePackage ("java.awt");
Clazz.load (null, "java.awt.GraphicsEnvironment", ["swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (java.awt, "GraphicsEnvironment");
Clazz.makeConstructor (c$, 
function () {
});
c$.getLocalGraphicsEnvironment = Clazz.defineMethod (c$, "getLocalGraphicsEnvironment", 
function () {
if (java.awt.GraphicsEnvironment.localEnv == null) {
java.awt.GraphicsEnvironment.localEnv = swingjs.JSToolkit.getInstance ("swingjs.JSGraphicsEnvironment");
}return java.awt.GraphicsEnvironment.localEnv;
});
c$.isHeadless = Clazz.defineMethod (c$, "isHeadless", 
function () {
return false;
});
c$.getHeadlessProperty = Clazz.defineMethod (c$, "getHeadlessProperty", 
 function () {
return false;
});
c$.checkHeadless = Clazz.defineMethod (c$, "checkHeadless", 
function () {
});
Clazz.defineMethod (c$, "isHeadlessInstance", 
function () {
return java.awt.GraphicsEnvironment.getHeadlessProperty ();
});
Clazz.defineMethod (c$, "registerFont", 
function (font) {
return true;
}, "java.awt.Font");
Clazz.defineMethod (c$, "preferLocaleFonts", 
function () {
});
Clazz.defineMethod (c$, "preferProportionalFonts", 
function () {
});
Clazz.defineMethod (c$, "getCenterPoint", 
function () {
return null;
});
Clazz.defineStatics (c$,
"localEnv", null);
});
