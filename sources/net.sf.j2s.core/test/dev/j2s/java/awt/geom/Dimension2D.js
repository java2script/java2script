Clazz.declarePackage ("java.awt.geom");
c$ = Clazz.declareType (java.awt.geom, "Dimension2D", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setSize", 
function (d) {
this.setSize (d.getWidth (), d.getHeight ());
}, "java.awt.geom.Dimension2D");
