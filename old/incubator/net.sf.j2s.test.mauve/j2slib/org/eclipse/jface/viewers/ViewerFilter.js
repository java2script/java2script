Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (null, "org.eclipse.jface.viewers.ViewerFilter", ["java.util.ArrayList"], function () {
c$ = Clazz.declareType (org.eclipse.jface.viewers, "ViewerFilter");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "filter", 
function (viewer, parent, elements) {
var size = elements.length;
var out =  new java.util.ArrayList (size);
for (var i = 0; i < size; ++i) {
var element = elements[i];
if (this.select (viewer, parent, element)) out.add (element);
}
return out.toArray ();
}, "org.eclipse.jface.viewers.Viewer,~O,~A");
Clazz.defineMethod (c$, "isFilterProperty", 
function (element, property) {
return false;
}, "~O,~S");
});
