Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.PreferenceNode"], "org.eclipse.jface.preference.PreferenceManager", ["java.util.ArrayList", "$.StringTokenizer", "org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.root = null;
this.separator = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "PreferenceManager");
Clazz.prepareFields (c$, function () {
this.root =  new org.eclipse.jface.preference.PreferenceNode ("");
});
Clazz.makeConstructor (c$, 
function () {
this.construct ('.');
});
Clazz.makeConstructor (c$, 
function (separatorChar) {
this.separator =  String.instantialize ([separatorChar]);
}, "~N");
Clazz.defineMethod (c$, "addTo", 
function (path, node) {
var target = this.find (path);
if (target == null) return false;
target.add (node);
return true;
}, "~S,org.eclipse.jface.preference.IPreferenceNode");
Clazz.defineMethod (c$, "addToRoot", 
function (node) {
org.eclipse.jface.util.Assert.isNotNull (node);
this.root.add (node);
}, "org.eclipse.jface.preference.IPreferenceNode");
Clazz.defineMethod (c$, "buildSequence", 
function (node, sequence, order) {
if (order == 0) sequence.add (node);
var subnodes = node.getSubNodes ();
for (var i = 0; i < subnodes.length; i++) {
this.buildSequence (subnodes[i], sequence, order);
}
if (order == 1) sequence.add (node);
}, "org.eclipse.jface.preference.IPreferenceNode,java.util.List,~N");
Clazz.defineMethod (c$, "find", 
function (path) {
return this.find (path, this.root);
}, "~S");
Clazz.defineMethod (c$, "find", 
function (path, top) {
org.eclipse.jface.util.Assert.isNotNull (path);
var stok =  new java.util.StringTokenizer (path, this.separator);
var node = top;
while (stok.hasMoreTokens ()) {
var id = stok.nextToken ();
node = node.findSubNode (id);
if (node == null) return null;
}
if (node === top) return null;
return node;
}, "~S,org.eclipse.jface.preference.IPreferenceNode");
Clazz.defineMethod (c$, "getElements", 
function (order) {
org.eclipse.jface.util.Assert.isTrue (order == 0 || order == 1, "invalid traversal order");
var sequence =  new java.util.ArrayList ();
var subnodes = this.getRoot ().getSubNodes ();
for (var i = 0; i < subnodes.length; i++) this.buildSequence (subnodes[i], sequence, order);

return sequence;
}, "~N");
Clazz.defineMethod (c$, "getRoot", 
function () {
return this.root;
});
Clazz.defineMethod (c$, "remove", 
function (path) {
org.eclipse.jface.util.Assert.isNotNull (path);
var index = path.lastIndexOf (this.separator);
if (index == -1) return this.root.remove (path);
org.eclipse.jface.util.Assert.isTrue (index < path.length - 1, "Path can not end with a dot");
var parentPath = path.substring (0, index);
var id = path.substring (index + 1);
var parentNode = this.find (parentPath);
if (parentNode == null) return null;
return parentNode.remove (id);
}, "~S");
Clazz.defineMethod (c$, "remove", 
function (node) {
org.eclipse.jface.util.Assert.isNotNull (node);
return this.root.remove (node);
}, "org.eclipse.jface.preference.IPreferenceNode");
Clazz.defineMethod (c$, "removeAll", 
function () {
this.root =  new org.eclipse.jface.preference.PreferenceNode ("");
});
Clazz.defineStatics (c$,
"PRE_ORDER", 0,
"POST_ORDER", 1);
});
