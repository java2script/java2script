Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.ColumnLayoutData"], "org.eclipse.jface.viewers.ColumnPixelData", ["org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.width = 0;
this.addTrim = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ColumnPixelData", org.eclipse.jface.viewers.ColumnLayoutData);
Clazz.makeConstructor (c$, 
function (widthInPixels) {
this.construct (widthInPixels, true, false);
}, "~N");
Clazz.makeConstructor (c$, 
function (widthInPixels, resizable) {
this.construct (widthInPixels, resizable, false);
}, "~N,~B");
Clazz.makeConstructor (c$, 
function (widthInPixels, resizable, addTrim) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.ColumnPixelData, [resizable]);
org.eclipse.jface.util.Assert.isTrue (widthInPixels >= 0);
this.width = widthInPixels;
this.addTrim = addTrim;
}, "~N,~B,~B");
});
