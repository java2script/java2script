Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.ColumnLayoutData"], "org.eclipse.jface.viewers.ColumnWeightData", ["org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.minimumWidth = 0;
this.weight = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ColumnWeightData", org.eclipse.jface.viewers.ColumnLayoutData);
Clazz.makeConstructor (c$, 
function (weight) {
this.construct (weight, true);
}, "~N");
Clazz.makeConstructor (c$, 
function (weight, minimumWidth) {
this.construct (weight, minimumWidth, true);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (weight, minimumWidth, resizable) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.ColumnWeightData, [resizable]);
org.eclipse.jface.util.Assert.isTrue (weight >= 0);
org.eclipse.jface.util.Assert.isTrue (minimumWidth >= 0);
this.weight = weight;
this.minimumWidth = minimumWidth;
}, "~N,~N,~B");
Clazz.makeConstructor (c$, 
function (weight, resizable) {
this.construct (weight, 20, resizable);
}, "~N,~B");
Clazz.defineStatics (c$,
"MINIMUM_WIDTH", 20);
});
