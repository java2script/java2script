Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (null, "org.eclipse.jface.viewers.ViewerSorter", ["java.text.Collator", "java.util.Arrays"], function () {
c$ = Clazz.decorateAsClass (function () {
this.collator = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ViewerSorter");
Clazz.makeConstructor (c$, 
function () {
this.construct (java.text.Collator.getInstance ());
});
Clazz.makeConstructor (c$, 
function (collator) {
this.collator = collator;
}, "java.text.Collator");
Clazz.defineMethod (c$, "category", 
function (element) {
return 0;
}, "~O");
Clazz.defineMethod (c$, "compare", 
function (viewer, e1, e2) {
var cat1 = this.category (e1);
var cat2 = this.category (e2);
if (cat1 != cat2) return cat1 - cat2;
var name1;
var name2;
if (viewer == null || !(Clazz.instanceOf (viewer, org.eclipse.jface.viewers.ContentViewer))) {
name1 = e1.toString ();
name2 = e2.toString ();
} else {
var prov = (viewer).getLabelProvider ();
if (Clazz.instanceOf (prov, org.eclipse.jface.viewers.ILabelProvider)) {
var lprov = prov;
name1 = lprov.getText (e1);
name2 = lprov.getText (e2);
} else {
name1 = e1.toString ();
name2 = e2.toString ();
}}if (name1 == null) name1 = "";
if (name2 == null) name2 = "";
return this.collator.compare (name1, name2);
}, "org.eclipse.jface.viewers.Viewer,~O,~O");
Clazz.defineMethod (c$, "getCollator", 
function () {
return this.collator;
});
Clazz.defineMethod (c$, "isSorterProperty", 
function (element, property) {
return false;
}, "~O,~S");
Clazz.defineMethod (c$, "sort", 
function (viewer, elements) {
java.util.Arrays.sort (elements, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.ViewerSorter$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "ViewerSorter$1", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return this.b$["org.eclipse.jface.viewers.ViewerSorter"].compare (this.f$.viewer, a, b);
}, "~O,~O");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.ViewerSorter$1, i$, v$);
}) (this, Clazz.cloneFinals ("viewer", viewer)));
}, "org.eclipse.jface.viewers.Viewer,~A");
});
