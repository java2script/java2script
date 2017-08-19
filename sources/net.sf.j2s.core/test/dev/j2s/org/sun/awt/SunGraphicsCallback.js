Clazz.declarePackage ("sun.awt");
Clazz.load (null, "sun.awt.SunGraphicsCallback", ["java.awt.Container", "$.Graphics2D", "sun.awt.Graphics2Delegate"], function () {
c$ = Clazz.declareType (sun.awt, "SunGraphicsCallback");
Clazz.defineMethod (c$, "constrainGraphics", 
function (g, bounds) {
g.clipRect (0, 0, bounds.width, bounds.height);
}, "java.awt.Graphics,java.awt.Rectangle");
Clazz.defineMethod (c$, "runOneComponent", 
function (comp, bounds, g, clip, weightFlags) {
if (comp == null || !comp.isVisible ()) {
return;
}var lightweight = true;
if ((lightweight && (weightFlags & 2) == 0) || (!lightweight && (weightFlags & 1) == 0)) {
return;
}if (bounds == null) {
bounds = comp.getBounds ();
}if (clip == null || clip.intersects (bounds)) {
var cg = g.create ();
try {
cg.setFont (comp.getFont ());
cg.setColor (comp.getForeground ());
if (Clazz.instanceOf (cg, java.awt.Graphics2D)) {
(cg).setBackground (comp.getBackground ());
} else if (Clazz.instanceOf (cg, sun.awt.Graphics2Delegate)) {
(cg).setBackground (comp.getBackground ());
}this.run (comp, cg);
} finally {
cg.dispose ();
}
}}, "java.awt.Component,java.awt.Rectangle,java.awt.Graphics,java.awt.Shape,~N");
Clazz.defineMethod (c$, "runComponents", 
function (comps, g, weightFlags) {
var ncomponents = comps.length;
var clip = g.getClip ();
for (var i = ncomponents - 1; i >= 0; i--) {
this.runOneComponent (comps[i], null, g, clip, weightFlags);
}
}, "~A,java.awt.Graphics,~N");
Clazz.pu$h(c$);
c$ = Clazz.declareType (sun.awt.SunGraphicsCallback, "PaintHeavyweightComponentsCallback", sun.awt.SunGraphicsCallback);
Clazz.makeConstructor (c$, 
 function () {
Clazz.superConstructor (this, sun.awt.SunGraphicsCallback.PaintHeavyweightComponentsCallback, []);
});
Clazz.overrideMethod (c$, "run", 
function (a, b) {
if (!a.isLightweight ()) {
a.paintAll (b);
} else if (Clazz.instanceOf (a, java.awt.Container)) {
this.runComponents ((a).getComponents (), b, 3);
}}, "java.awt.Component,java.awt.Graphics");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return sun.awt.SunGraphicsCallback.PaintHeavyweightComponentsCallback.instance;
});
c$.instance = c$.prototype.instance =  new sun.awt.SunGraphicsCallback.PaintHeavyweightComponentsCallback ();
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"HEAVYWEIGHTS", 0x1,
"LIGHTWEIGHTS", 0x2,
"TWO_PASSES", 0x4);
});
