Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (["org.eclipse.core.commands.common.AbstractNamedHandleEvent"], "org.eclipse.core.commands.CategoryEvent", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.category = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "CategoryEvent", org.eclipse.core.commands.common.AbstractNamedHandleEvent);
Clazz.makeConstructor (c$, 
function (category, definedChanged, descriptionChanged, nameChanged) {
Clazz.superConstructor (this, org.eclipse.core.commands.CategoryEvent, [definedChanged, descriptionChanged, nameChanged]);
if (category == null) throw  new NullPointerException ();
this.category = category;
}, "org.eclipse.core.commands.Category,~B,~B,~B");
Clazz.defineMethod (c$, "getCategory", 
function () {
return this.category;
});
});
