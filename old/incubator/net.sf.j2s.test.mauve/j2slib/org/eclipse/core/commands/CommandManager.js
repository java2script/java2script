Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (["org.eclipse.core.commands.ICategoryListener", "$.ICommandListener", "$.IExecutionListener", "java.util.HashMap", "$.HashSet"], "org.eclipse.core.commands.CommandManager", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.ArrayList", "$.Collections", "org.eclipse.core.commands.Category", "$.Command", "$.CommandManagerEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.core.commands.CommandManager.ExecutionListener")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.CommandManager, "ExecutionListener", null, org.eclipse.core.commands.IExecutionListener);
Clazz.defineMethod (c$, "notHandled", 
function (a, b) {
if (this.b$["org.eclipse.core.commands.CommandManager"].executionListeners != null) {
var c = this.b$["org.eclipse.core.commands.CommandManager"].executionListeners.size ();
if (c > 0) {
var d = this.b$["org.eclipse.core.commands.CommandManager"].executionListeners.toArray ( new Array (c));
for (var e = 0; e < c; e++) {
var f = d[e];
f.notHandled (a, b);
}
}}}, "~S,org.eclipse.core.commands.NotHandledException");
Clazz.defineMethod (c$, "postExecuteFailure", 
function (a, b) {
if (this.b$["org.eclipse.core.commands.CommandManager"].executionListeners != null) {
var c = this.b$["org.eclipse.core.commands.CommandManager"].executionListeners.size ();
if (c > 0) {
var d = this.b$["org.eclipse.core.commands.CommandManager"].executionListeners.toArray ( new Array (c));
for (var e = 0; e < c; e++) {
var f = d[e];
f.postExecuteFailure (a, b);
}
}}}, "~S,org.eclipse.core.commands.ExecutionException");
Clazz.defineMethod (c$, "postExecuteSuccess", 
function (a, b) {
if (this.b$["org.eclipse.core.commands.CommandManager"].executionListeners != null) {
var c = this.b$["org.eclipse.core.commands.CommandManager"].executionListeners.size ();
if (c > 0) {
var d = this.b$["org.eclipse.core.commands.CommandManager"].executionListeners.toArray ( new Array (c));
for (var e = 0; e < c; e++) {
var f = d[e];
f.postExecuteSuccess (a, b);
}
}}}, "~S,~O");
Clazz.defineMethod (c$, "preExecute", 
function (a, b) {
if (this.b$["org.eclipse.core.commands.CommandManager"].executionListeners != null) {
var c = this.b$["org.eclipse.core.commands.CommandManager"].executionListeners.size ();
if (c > 0) {
var d = this.b$["org.eclipse.core.commands.CommandManager"].executionListeners.toArray ( new Array (c));
for (var e = 0; e < c; e++) {
var f = d[e];
f.preExecute (a, b);
}
}}}, "~S,org.eclipse.core.commands.ExecutionEvent");
c$ = Clazz.p0p ();
}
this.categoriesById = null;
this.commandManagerListeners = null;
this.commandsById = null;
this.definedCategoryIds = null;
this.definedCommandIds = null;
this.executionListener = null;
this.executionListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "CommandManager", null, [org.eclipse.core.commands.ICategoryListener, org.eclipse.core.commands.ICommandListener]);
Clazz.prepareFields (c$, function () {
this.categoriesById =  new java.util.HashMap ();
this.commandsById =  new java.util.HashMap ();
this.definedCategoryIds =  new java.util.HashSet ();
this.definedCommandIds =  new java.util.HashSet ();
});
Clazz.defineMethod (c$, "addCommandManagerListener", 
function (listener) {
if (listener == null) {
throw  new NullPointerException ();
}if (this.commandManagerListeners == null) {
this.commandManagerListeners =  new java.util.ArrayList (1);
} else if (!this.commandManagerListeners.contains (listener)) {
return ;
}this.commandManagerListeners.add (listener);
}, "org.eclipse.core.commands.ICommandManagerListener");
Clazz.defineMethod (c$, "addExecutionListener", 
function (listener) {
if (listener == null) {
throw  new NullPointerException ("Cannot add a null execution listener");
}if (this.executionListeners == null) {
this.executionListeners =  new java.util.ArrayList (1);
this.executionListener = Clazz.innerTypeInstance (org.eclipse.core.commands.CommandManager.ExecutionListener, this, null);
var commandItr = this.commandsById.values ().iterator ();
while (commandItr.hasNext ()) {
var command = commandItr.next ();
command.addExecutionListener (this.executionListener);
}
} else if (this.executionListeners.contains (listener)) {
return ;
}this.executionListeners.add (listener);
}, "org.eclipse.core.commands.IExecutionListener");
Clazz.overrideMethod (c$, "categoryChanged", 
function (categoryEvent) {
if (categoryEvent.isDefinedChanged ()) {
var category = categoryEvent.getCategory ();
var categoryId = category.getId ();
var categoryIdAdded = category.isDefined ();
if (categoryIdAdded) {
this.definedCategoryIds.add (categoryId);
} else {
this.definedCategoryIds.remove (categoryId);
}this.fireCommandManagerChanged ( new org.eclipse.core.commands.CommandManagerEvent (this, null, false, false, categoryId, categoryIdAdded, true));
}}, "org.eclipse.core.commands.CategoryEvent");
Clazz.overrideMethod (c$, "commandChanged", 
function (commandEvent) {
if (commandEvent.isDefinedChanged ()) {
var command = commandEvent.getCommand ();
var commandId = command.getId ();
var commandIdAdded = command.isDefined ();
if (commandIdAdded) {
this.definedCommandIds.add (commandId);
} else {
this.definedCommandIds.remove (commandId);
}this.fireCommandManagerChanged ( new org.eclipse.core.commands.CommandManagerEvent (this, commandId, commandIdAdded, true, null, false, false));
}}, "org.eclipse.core.commands.CommandEvent");
Clazz.defineMethod (c$, "fireCommandManagerChanged", 
($fz = function (commandManagerEvent) {
if (commandManagerEvent == null) throw  new NullPointerException ();
if (this.commandManagerListeners != null) {
var commandManagerListenersSize = this.commandManagerListeners.size ();
if (commandManagerListenersSize > 0) {
var listeners = this.commandManagerListeners.toArray ( new Array (commandManagerListenersSize));
for (var i = 0; i < commandManagerListenersSize; i++) {
var listener = listeners[i];
listener.commandManagerChanged (commandManagerEvent);
}
}}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.CommandManagerEvent");
Clazz.defineMethod (c$, "getCategory", 
function (categoryId) {
if (categoryId == null) throw  new NullPointerException ();
var category = this.categoriesById.get (categoryId);
if (category == null) {
category =  new org.eclipse.core.commands.Category (categoryId);
this.categoriesById.put (categoryId, category);
category.addCategoryListener (this);
}return category;
}, "~S");
Clazz.defineMethod (c$, "getCommand", 
function (commandId) {
if (commandId == null) {
throw  new NullPointerException ("A command may not have a null identifier");
}if (commandId.length < 1) {
throw  new IllegalArgumentException ("The command must not have a zero-length identifier");
}var command = this.commandsById.get (commandId);
if (command == null) {
command =  new org.eclipse.core.commands.Command (commandId);
this.commandsById.put (commandId, command);
command.addCommandListener (this);
if (this.executionListener != null) {
command.addExecutionListener (this.executionListener);
}}return command;
}, "~S");
Clazz.defineMethod (c$, "getDefinedCategoryIds", 
function () {
return java.util.Collections.unmodifiableSet (this.definedCategoryIds);
});
Clazz.defineMethod (c$, "getDefinedCommandIds", 
function () {
return java.util.Collections.unmodifiableSet (this.definedCommandIds);
});
Clazz.defineMethod (c$, "removeCommandManagerListener", 
function (listener) {
if (listener == null) {
throw  new NullPointerException ();
}if (this.commandManagerListeners == null) {
return ;
}this.commandManagerListeners.remove (listener);
if (this.commandManagerListeners.isEmpty ()) {
this.commandManagerListeners = null;
}}, "org.eclipse.core.commands.ICommandManagerListener");
Clazz.defineMethod (c$, "removeExecutionListener", 
function (listener) {
if (listener == null) {
throw  new NullPointerException ("Cannot remove a null listener");
}if (this.executionListeners == null) {
return ;
}this.executionListeners.remove (listener);
if (this.executionListeners.isEmpty ()) {
this.executionListeners = null;
var commandItr = this.commandsById.values ().iterator ();
while (commandItr.hasNext ()) {
var command = commandItr.next ();
command.removeExecutionListener (this.executionListener);
}
this.executionListener = null;
}}, "org.eclipse.core.commands.IExecutionListener");
Clazz.defineMethod (c$, "setHandlersByCommandId", 
function (handlersByCommandId) {
var commandIdItr = handlersByCommandId.keySet ().iterator ();
while (commandIdItr.hasNext ()) {
this.getCommand (commandIdItr.next ());
}
var commandItr = this.commandsById.values ().iterator ();
while (commandItr.hasNext ()) {
var command = commandItr.next ();
var commandId = command.getId ();
var value = handlersByCommandId.get (commandId);
if (Clazz.instanceOf (value, org.eclipse.core.commands.IHandler)) {
command.setHandler (value);
} else {
command.setHandler (null);
}}
}, "java.util.Map");
});
