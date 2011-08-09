Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["java.util.EventObject"], "org.eclipse.jface.viewers.OpenEvent", ["org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selection = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "OpenEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, selection) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.OpenEvent, [source]);
org.eclipse.jface.util.Assert.isNotNull (selection);
this.selection = selection;
}, "org.eclipse.jface.viewers.Viewer,org.eclipse.jface.viewers.ISelection");
Clazz.defineMethod (c$, "getSelection", 
function () {
return this.selection;
});
Clazz.defineMethod (c$, "getViewer", 
function () {
return this.getSource ();
});
});
