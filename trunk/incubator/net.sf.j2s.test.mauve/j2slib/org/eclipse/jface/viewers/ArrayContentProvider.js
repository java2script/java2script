Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.IStructuredContentProvider"], "org.eclipse.jface.viewers.ArrayContentProvider", null, function () {
c$ = Clazz.declareType (org.eclipse.jface.viewers, "ArrayContentProvider", null, org.eclipse.jface.viewers.IStructuredContentProvider);
Clazz.overrideMethod (c$, "getElements", 
function (inputElement) {
if (Clazz.instanceOf (inputElement, Array)) return inputElement;
if (Clazz.instanceOf (inputElement, java.util.Collection)) return (inputElement).toArray ();
return  new Array (0);
}, "~O");
Clazz.overrideMethod (c$, "inputChanged", 
function (viewer, oldInput, newInput) {
}, "org.eclipse.jface.viewers.Viewer,~O,~O");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
});
