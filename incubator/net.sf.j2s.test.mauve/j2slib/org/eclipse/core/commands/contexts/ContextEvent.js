Clazz.declarePackage ("org.eclipse.core.commands.contexts");
Clazz.load (["org.eclipse.core.commands.common.AbstractNamedHandleEvent"], "org.eclipse.core.commands.contexts.ContextEvent", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.contexts, "ContextEvent", org.eclipse.core.commands.common.AbstractNamedHandleEvent);
Clazz.makeConstructor (c$, 
function (context, definedChanged, nameChanged, descriptionChanged, parentIdChanged) {
Clazz.superConstructor (this, org.eclipse.core.commands.contexts.ContextEvent, [definedChanged, descriptionChanged, nameChanged]);
if (context == null) throw  new NullPointerException ();
this.context = context;
if (parentIdChanged) {
this.changedValues |= 8;
}}, "org.eclipse.core.commands.contexts.Context,~B,~B,~B,~B");
Clazz.defineMethod (c$, "getContext", 
function () {
return this.context;
});
Clazz.defineMethod (c$, "isParentIdChanged", 
function () {
return ((this.changedValues & 8) != 0);
});
Clazz.defineStatics (c$,
"CHANGED_PARENT_ID", 8);
});
