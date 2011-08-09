Clazz.declarePackage ("org.eclipse.core.commands.common");
Clazz.load (["org.eclipse.core.commands.common.HandleObject"], "org.eclipse.core.commands.common.NamedHandleObject", ["org.eclipse.core.commands.common.NotDefinedException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.description = null;
this.name = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.common, "NamedHandleObject", org.eclipse.core.commands.common.HandleObject);
Clazz.defineMethod (c$, "getDescription", 
function () {
if (!this.isDefined ()) {
throw  new org.eclipse.core.commands.common.NotDefinedException ("Cannot get a description from an undefined object.");
}return this.description;
});
Clazz.defineMethod (c$, "getName", 
function () {
if (!this.isDefined ()) {
throw  new org.eclipse.core.commands.common.NotDefinedException ("Cannot get the name from an undefined object.");
}return this.name;
});
});
