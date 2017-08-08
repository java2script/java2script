Clazz.declarePackage ("java.awt");
Clazz.load (["sun.awt.SunGraphicsCallback"], "java.awt.GraphicsCallback", null, function () {
c$ = Clazz.declareType (java.awt, "GraphicsCallback", sun.awt.SunGraphicsCallback);
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.GraphicsCallback, "PaintCallback", java.awt.GraphicsCallback);
Clazz.makeConstructor (c$, 
 function () {
Clazz.superConstructor (this, java.awt.GraphicsCallback.PaintCallback, []);
});
Clazz.overrideMethod (c$, "run", 
function (a, b) {
a.paint (b);
}, "java.awt.Component,java.awt.Graphics");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return java.awt.GraphicsCallback.PaintCallback.instance;
});
c$.instance = c$.prototype.instance =  new java.awt.GraphicsCallback.PaintCallback ();
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.GraphicsCallback, "PaintAllCallback", java.awt.GraphicsCallback);
Clazz.makeConstructor (c$, 
 function () {
Clazz.superConstructor (this, java.awt.GraphicsCallback.PaintAllCallback, []);
});
Clazz.overrideMethod (c$, "run", 
function (a, b) {
a.paintAll (b);
}, "java.awt.Component,java.awt.Graphics");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return java.awt.GraphicsCallback.PaintAllCallback.instance;
});
c$.instance = c$.prototype.instance =  new java.awt.GraphicsCallback.PaintAllCallback ();
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.GraphicsCallback, "PaintHeavyweightComponentsCallback", java.awt.GraphicsCallback);
Clazz.makeConstructor (c$, 
 function () {
Clazz.superConstructor (this, java.awt.GraphicsCallback.PaintHeavyweightComponentsCallback, []);
});
Clazz.overrideMethod (c$, "run", 
function (a, b) {
if (a.isLightweight ()) {
a.paintHeavyweightComponents (b);
} else {
a.paintAll (b);
}}, "java.awt.Component,java.awt.Graphics");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return java.awt.GraphicsCallback.PaintHeavyweightComponentsCallback.instance;
});
c$.instance = c$.prototype.instance =  new java.awt.GraphicsCallback.PaintHeavyweightComponentsCallback ();
c$ = Clazz.p0p ();
});
