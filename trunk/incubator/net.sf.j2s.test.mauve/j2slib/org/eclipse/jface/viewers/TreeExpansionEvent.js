Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["java.util.EventObject"], "org.eclipse.jface.viewers.TreeExpansionEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.element = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "TreeExpansionEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, element) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.TreeExpansionEvent, [source]);
this.element = element;
}, "org.eclipse.jface.viewers.AbstractTreeViewer,~O");
Clazz.defineMethod (c$, "getElement", 
function () {
return this.element;
});
Clazz.defineMethod (c$, "getTreeViewer", 
function () {
return this.source;
});
});
