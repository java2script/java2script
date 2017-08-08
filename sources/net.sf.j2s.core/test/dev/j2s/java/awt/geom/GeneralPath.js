Clazz.declarePackage ("java.awt.geom");
Clazz.load (["java.awt.geom.Path2D"], "java.awt.geom.GeneralPath", null, function () {
c$ = Clazz.declareType (java.awt.geom, "GeneralPath", java.awt.geom.Path2D.Float);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.GeneralPath, [1, 20]);
});
Clazz.makeConstructor (c$, 
function (rule) {
Clazz.superConstructor (this, java.awt.geom.GeneralPath, [rule, 20]);
}, "~N");
Clazz.makeConstructor (c$, 
function (s) {
Clazz.superConstructor (this, java.awt.geom.GeneralPath, [s, null]);
}, "java.awt.Shape");
Clazz.makeConstructor (c$, 
function (windingRule, pointTypes, numTypes, pointCoords, numCoords) {
Clazz.superConstructor (this, java.awt.geom.GeneralPath, []);
this.windingRule = windingRule;
this.pointTypes = pointTypes;
this.numTypes = numTypes;
this.floatCoords = pointCoords;
this.numCoords = numCoords;
}, "~N,~A,~N,~A,~N");
});
