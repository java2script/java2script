Clazz.declarePackage ("sun.awt");
Clazz.load (null, "sun.awt.PaintEventDispatcher", ["java.awt.Rectangle", "java.awt.event.PaintEvent"], function () {
c$ = Clazz.declareType (sun.awt, "PaintEventDispatcher");
c$.setPaintEventDispatcher = Clazz.defineMethod (c$, "setPaintEventDispatcher", 
function (dispatcher) {
{
sun.awt.PaintEventDispatcher.dispatcher = dispatcher;
}}, "sun.awt.PaintEventDispatcher");
c$.getPaintEventDispatcher = Clazz.defineMethod (c$, "getPaintEventDispatcher", 
function () {
{
if (sun.awt.PaintEventDispatcher.dispatcher == null) {
sun.awt.PaintEventDispatcher.dispatcher =  new sun.awt.PaintEventDispatcher ();
}return sun.awt.PaintEventDispatcher.dispatcher;
}});
Clazz.defineMethod (c$, "createPaintEvent", 
function (target, x, y, w, h) {
return  new java.awt.event.PaintEvent (target, 800,  new java.awt.Rectangle (x, y, w, h));
}, "java.awt.Component,~N,~N,~N,~N");
Clazz.defineMethod (c$, "shouldDoNativeBackgroundErase", 
function (c) {
return true;
}, "java.awt.Component");
Clazz.defineMethod (c$, "queueSurfaceDataReplacing", 
function (c, r) {
return false;
}, "java.awt.Component,Runnable");
Clazz.defineStatics (c$,
"dispatcher", null);
});
