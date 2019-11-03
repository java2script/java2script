Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.IStructuredSelection"], "org.eclipse.jface.viewers.StructuredSelection", ["java.util.Arrays", "org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.elements = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "StructuredSelection", null, org.eclipse.jface.viewers.IStructuredSelection);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (elements) {
this.elements =  new Array (elements.length);
System.arraycopy (elements, 0, this.elements, 0, elements.length);
}, "~A");
Clazz.makeConstructor (c$, 
function (element) {
org.eclipse.jface.util.Assert.isNotNull (element);
this.elements = [element];
}, "~O");
Clazz.makeConstructor (c$, 
function (elements) {
org.eclipse.jface.util.Assert.isNotNull (elements);
this.elements = elements.toArray ();
}, "java.util.List");
Clazz.defineMethod (c$, "equals", 
function (o) {
if (this === o) {
return true;
}if (!(Clazz.instanceOf (o, org.eclipse.jface.viewers.StructuredSelection))) {
return false;
}var s2 = o;
if (this.isEmpty ()) {
return s2.isEmpty ();
}if (s2.isEmpty ()) {
return false;
}var myLen = this.elements.length;
if (myLen != s2.elements.length) {
return false;
}for (var i = 0; i < myLen; i++) {
if (!this.elements[i].equals (s2.elements[i])) {
return false;
}}
return true;
}, "~O");
Clazz.overrideMethod (c$, "getFirstElement", 
function () {
return this.isEmpty () ? null : this.elements[0];
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.elements == null || this.elements.length == 0;
});
Clazz.overrideMethod (c$, "iterator", 
function () {
return java.util.Arrays.asList (this.elements == null ?  new Array (0) : this.elements).iterator ();
});
Clazz.overrideMethod (c$, "size", 
function () {
return this.elements == null ? 0 : this.elements.length;
});
Clazz.overrideMethod (c$, "toArray", 
function () {
return this.elements == null ?  new Array (0) : this.elements.clone ();
});
Clazz.overrideMethod (c$, "toList", 
function () {
return java.util.Arrays.asList (this.elements == null ?  new Array (0) : this.elements);
});
Clazz.defineMethod (c$, "toString", 
function () {
return this.isEmpty () ? org.eclipse.jface.resource.JFaceResources.getString ("<empty_selection>") : this.toList ().toString ();
});
c$.EMPTY = c$.prototype.EMPTY =  new org.eclipse.jface.viewers.StructuredSelection ();
});
