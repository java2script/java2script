Clazz.declarePackage ("org.eclipse.jface.viewers");
c$ = Clazz.decorateAsClass (function () {
this.resizable = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ColumnLayoutData");
Clazz.makeConstructor (c$, 
function (resizable) {
this.resizable = resizable;
}, "~B");
