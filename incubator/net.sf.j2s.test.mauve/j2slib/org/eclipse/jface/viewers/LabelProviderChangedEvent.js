Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["java.util.EventObject"], "org.eclipse.jface.viewers.LabelProviderChangedEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.elements = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "LabelProviderChangedEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, elements) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.LabelProviderChangedEvent, [source]);
this.elements = elements;
}, "org.eclipse.jface.viewers.IBaseLabelProvider,~A");
Clazz.makeConstructor (c$, 
function (source, element) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.LabelProviderChangedEvent, [source]);
this.elements =  new Array (1);
this.elements[0] = element;
}, "org.eclipse.jface.viewers.IBaseLabelProvider,~O");
Clazz.defineMethod (c$, "getElement", 
function () {
if (this.elements == null || this.elements.length == 0) return null;
 else return this.elements[0];
});
Clazz.defineMethod (c$, "getElements", 
function () {
if (this.elements == null) return null;
 else return this.elements;
});
});
