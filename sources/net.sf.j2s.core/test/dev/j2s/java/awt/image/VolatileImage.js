Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.Image", "$.Transparency"], "java.awt.image.VolatileImage", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.transparency = 3;
Clazz.instantialize (this, arguments);
}, java.awt.image, "VolatileImage", java.awt.Image, java.awt.Transparency);
Clazz.overrideMethod (c$, "getSource", 
function () {
return this.getSnapshot ().getSource ();
});
Clazz.overrideMethod (c$, "getGraphics", 
function () {
return this.createGraphics ();
});
Clazz.overrideMethod (c$, "getTransparency", 
function () {
return this.transparency;
});
Clazz.defineStatics (c$,
"IMAGE_OK", 0,
"IMAGE_RESTORED", 1,
"IMAGE_INCOMPATIBLE", 2);
});
