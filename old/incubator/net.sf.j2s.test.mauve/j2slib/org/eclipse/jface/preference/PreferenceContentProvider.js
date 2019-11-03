Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.viewers.ITreeContentProvider"], "org.eclipse.jface.preference.PreferenceContentProvider", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.manager = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "PreferenceContentProvider", null, org.eclipse.jface.viewers.ITreeContentProvider);
Clazz.overrideMethod (c$, "dispose", 
function () {
this.manager = null;
});
Clazz.defineMethod (c$, "findParent", 
($fz = function (parent, target) {
if (parent.getId ().equals (target.getId ())) return null;
var found = parent.findSubNode (target.getId ());
if (found != null) return parent;
var children = parent.getSubNodes ();
for (var i = 0; i < children.length; i++) {
found = this.findParent (children[i], target);
if (found != null) return found;
}
return null;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.preference.IPreferenceNode,org.eclipse.jface.preference.IPreferenceNode");
Clazz.overrideMethod (c$, "getChildren", 
function (parentElement) {
return (parentElement).getSubNodes ();
}, "~O");
Clazz.overrideMethod (c$, "getElements", 
function (inputElement) {
return this.getChildren ((inputElement).getRoot ());
}, "~O");
Clazz.overrideMethod (c$, "getParent", 
function (element) {
var targetNode = element;
var root = this.manager.getRoot ();
return this.findParent (root, targetNode);
}, "~O");
Clazz.overrideMethod (c$, "hasChildren", 
function (element) {
return this.getChildren (element).length > 0;
}, "~O");
Clazz.overrideMethod (c$, "inputChanged", 
function (viewer, oldInput, newInput) {
this.manager = newInput;
}, "org.eclipse.jface.viewers.Viewer,~O,~O");
Clazz.defineMethod (c$, "setManager", 
function (manager) {
this.manager = manager;
}, "org.eclipse.jface.preference.PreferenceManager");
});
