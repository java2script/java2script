Clazz.declarePackage ("org.eclipse.jface.bindings");
Clazz.load (["org.eclipse.core.commands.common.AbstractNamedHandleEvent"], "org.eclipse.jface.bindings.SchemeEvent", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.scheme = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings, "SchemeEvent", org.eclipse.core.commands.common.AbstractNamedHandleEvent);
Clazz.makeConstructor (c$, 
function (scheme, definedChanged, nameChanged, descriptionChanged, parentIdChanged) {
Clazz.superConstructor (this, org.eclipse.jface.bindings.SchemeEvent, [definedChanged, descriptionChanged, nameChanged]);
if (scheme == null) throw  new NullPointerException ();
this.scheme = scheme;
if (parentIdChanged) {
this.changedValues |= 8;
}}, "org.eclipse.jface.bindings.Scheme,~B,~B,~B,~B");
Clazz.defineMethod (c$, "getScheme", 
function () {
return this.scheme;
});
Clazz.defineMethod (c$, "isParentIdChanged", 
function () {
return ((this.changedValues & 8) != 0);
});
Clazz.defineStatics (c$,
"CHANGED_PARENT_ID", 8);
});
