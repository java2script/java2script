Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (null, "org.eclipse.core.commands.CommandManagerEvent", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.categoryId = null;
this.changedValues = 0;
this.commandId = null;
this.commandManager = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "CommandManagerEvent");
Clazz.makeConstructor (c$, 
function (commandManager, commandId, commandIdAdded, commandIdChanged, categoryId, categoryIdAdded, categoryIdChanged) {
if (commandManager == null) {
throw  new NullPointerException ("An event must refer to its command manager");
}if (commandIdChanged && (commandId == null)) {
throw  new NullPointerException ("If the list of defined commands changed, then the added/removed command must be mentioned");
}if (categoryIdChanged && (categoryId == null)) {
throw  new NullPointerException ("If the list of defined categories changed, then the added/removed category must be mentioned");
}this.commandManager = commandManager;
this.commandId = commandId;
this.categoryId = categoryId;
var changedValues = 0;
if (categoryIdChanged && categoryIdAdded) {
changedValues |= 1;
}if (commandIdChanged && commandIdAdded) {
changedValues |= 2;
}this.changedValues = changedValues;
}, "org.eclipse.core.commands.CommandManager,~S,~B,~B,~S,~B,~B");
Clazz.defineMethod (c$, "getCategoryId", 
function () {
return this.categoryId;
});
Clazz.defineMethod (c$, "getCommandId", 
function () {
return this.commandId;
});
Clazz.defineMethod (c$, "getCommandManager", 
function () {
return this.commandManager;
});
Clazz.defineMethod (c$, "isCategoryChanged", 
function () {
return (this.categoryId != null);
});
Clazz.defineMethod (c$, "isCategoryDefined", 
function () {
return (((this.changedValues & 1) != 0) && (this.categoryId != null));
});
Clazz.defineMethod (c$, "isCommandChanged", 
function () {
return (this.commandId != null);
});
Clazz.defineMethod (c$, "isCommandDefined", 
function () {
return (((this.changedValues & 2) != 0) && (this.commandId != null));
});
Clazz.defineStatics (c$,
"CHANGED_CATEGORY_DEFINED", 1,
"CHANGED_COMMAND_DEFINED", 2);
});
