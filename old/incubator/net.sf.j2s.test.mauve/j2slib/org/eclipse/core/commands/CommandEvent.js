Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (["org.eclipse.core.commands.common.AbstractNamedHandleEvent"], "org.eclipse.core.commands.CommandEvent", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.command = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "CommandEvent", org.eclipse.core.commands.common.AbstractNamedHandleEvent);
Clazz.makeConstructor (c$, 
function (command, categoryChanged, definedChanged, descriptionChanged, handledChanged, nameChanged, parametersChanged) {
Clazz.superConstructor (this, org.eclipse.core.commands.CommandEvent, [definedChanged, descriptionChanged, nameChanged]);
if (command == null) throw  new NullPointerException ();
this.command = command;
if (categoryChanged) {
this.changedValues |= 8;
}if (handledChanged) {
this.changedValues |= 16;
}if (parametersChanged) {
this.changedValues |= 32;
}}, "org.eclipse.core.commands.Command,~B,~B,~B,~B,~B,~B");
Clazz.defineMethod (c$, "getCommand", 
function () {
return this.command;
});
Clazz.defineMethod (c$, "isCategoryChanged", 
function () {
return ((this.changedValues & 8) != 0);
});
Clazz.defineMethod (c$, "isHandledChanged", 
function () {
return ((this.changedValues & 16) != 0);
});
Clazz.defineMethod (c$, "isParametersChanged", 
function () {
return ((this.changedValues & 32) != 0);
});
Clazz.defineStatics (c$,
"CHANGED_CATEGORY", 8,
"CHANGED_HANDLED", 16,
"CHANGED_PARAMETERS", 32);
});
