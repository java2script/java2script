Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (["org.eclipse.core.commands.common.NamedHandleObject"], "org.eclipse.core.commands.Command", ["java.lang.NullPointerException", "$.StringBuffer", "java.util.ArrayList", "org.eclipse.core.commands.CommandEvent", "$.NotHandledException", "org.eclipse.core.commands.common.NotDefinedException", "org.eclipse.core.internal.commands.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.category = null;
this.commandListeners = null;
this.executionListeners = null;
this.handler = null;
this.parameters = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "Command", org.eclipse.core.commands.common.NamedHandleObject, Comparable);
Clazz.defineMethod (c$, "addCommandListener", 
function (commandListener) {
if (commandListener == null) {
throw  new NullPointerException ("Cannot add a null command listener");
}if (this.commandListeners == null) {
this.commandListeners =  new java.util.ArrayList (1);
} else if (this.commandListeners.contains (commandListener)) {
return ;
}this.commandListeners.add (commandListener);
}, "org.eclipse.core.commands.ICommandListener");
Clazz.defineMethod (c$, "addExecutionListener", 
function (executionListener) {
if (executionListener == null) {
throw  new NullPointerException ("Cannot add a null execution listener");
}if (this.executionListeners == null) {
this.executionListeners =  new java.util.ArrayList (1);
} else if (this.executionListeners.contains (executionListener)) {
return ;
}this.executionListeners.add (executionListener);
}, "org.eclipse.core.commands.IExecutionListener");
Clazz.overrideMethod (c$, "compareTo", 
function (object) {
var castedObject = object;
var compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.category, castedObject.category);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.defined, castedObject.defined);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.description, castedObject.description);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.handler, castedObject.handler);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.id, castedObject.id);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.name, castedObject.name);
if (compareTo == 0) {
compareTo = org.eclipse.core.internal.commands.util.Util.compare (this.parameters, castedObject.parameters);
}}}}}}return compareTo;
}, "~O");
Clazz.defineMethod (c$, "define", 
function (name, description, category, parameters) {
if (name == null) {
throw  new NullPointerException ("The name of a command cannot be null");
}if (category == null) {
throw  new NullPointerException ("The category of a command cannot be null");
}var definedChanged = !this.defined;
this.defined = true;
var nameChanged = !org.eclipse.core.internal.commands.util.Util.equals (this.name, name);
this.name = name;
var descriptionChanged = !org.eclipse.core.internal.commands.util.Util.equals (this.description, description);
this.description = description;
var categoryChanged = !org.eclipse.core.internal.commands.util.Util.equals (this.category, category);
this.category = category;
var parametersChanged = !org.eclipse.core.internal.commands.util.Util.equals (this.parameters, parameters);
this.parameters = parameters;
this.fireCommandChanged ( new org.eclipse.core.commands.CommandEvent (this, categoryChanged, definedChanged, descriptionChanged, false, nameChanged, parametersChanged));
}, "~S,~S,org.eclipse.core.commands.Category,~A");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (object === this) {
return true;
}if (!(Clazz.instanceOf (object, org.eclipse.core.commands.Command))) return false;
var command = object;
return org.eclipse.core.internal.commands.util.Util.equals (this.id, command.id);
}, "~O");
Clazz.defineMethod (c$, "execute", 
function (event) {
this.firePreExecute (event);
var handler = this.handler;
if (org.eclipse.core.commands.Command.DEBUG_COMMAND_EXECUTION) {
System.out.print ("COMMANDS >>> executing ");
if (handler == null) {
System.out.print ("no handler");
} else {
System.out.print ('\'');
System.out.print (handler.getClass ().getName ());
System.out.print ("'(");
System.out.print (handler.hashCode ());
System.out.print (')');
}System.out.println ();
}if ((handler != null) && (handler.isHandled ())) {
try {
var returnValue = handler.execute (event);
this.firePostExecuteSuccess (returnValue);
return returnValue;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.ExecutionException)) {
this.firePostExecuteFailure (e);
throw e;
} else {
throw e;
}
}
}var e =  new org.eclipse.core.commands.NotHandledException ("There is no handler to execute.");
this.fireNotHandled (e);
throw e;
}, "org.eclipse.core.commands.ExecutionEvent");
Clazz.defineMethod (c$, "fireCommandChanged", 
($fz = function (commandEvent) {
if (commandEvent == null) {
throw  new NullPointerException ("Cannot fire a null event");
}if (this.commandListeners != null) {
var commandListenersSize = this.commandListeners.size ();
if (commandListenersSize > 0) {
var listeners = this.commandListeners.toArray ( new Array (commandListenersSize));
for (var i = 0; i < commandListenersSize; i++) {
var listener = listeners[i];
listener.commandChanged (commandEvent);
}
}}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.CommandEvent");
Clazz.defineMethod (c$, "fireNotHandled", 
($fz = function (e) {
if (this.executionListeners != null) {
var executionListenersSize = this.executionListeners.size ();
if (executionListenersSize > 0) {
var listeners = this.executionListeners.toArray ( new Array (executionListenersSize));
for (var i = 0; i < executionListenersSize; i++) {
var listener = listeners[i];
listener.notHandled (this.getId (), e);
}
}}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.NotHandledException");
Clazz.defineMethod (c$, "firePostExecuteFailure", 
($fz = function (e) {
if (this.executionListeners != null) {
var executionListenersSize = this.executionListeners.size ();
if (executionListenersSize > 0) {
var listeners = this.executionListeners.toArray ( new Array (executionListenersSize));
for (var i = 0; i < executionListenersSize; i++) {
var listener = listeners[i];
listener.postExecuteFailure (this.getId (), e);
}
}}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.ExecutionException");
Clazz.defineMethod (c$, "firePostExecuteSuccess", 
($fz = function (returnValue) {
if (this.executionListeners != null) {
var executionListenersSize = this.executionListeners.size ();
if (executionListenersSize > 0) {
var listeners = this.executionListeners.toArray ( new Array (executionListenersSize));
for (var i = 0; i < executionListenersSize; i++) {
var listener = listeners[i];
listener.postExecuteSuccess (this.getId (), returnValue);
}
}}}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "firePreExecute", 
($fz = function (event) {
if (this.executionListeners != null) {
var executionListenersSize = this.executionListeners.size ();
if (executionListenersSize > 0) {
var listeners = this.executionListeners.toArray ( new Array (executionListenersSize));
for (var i = 0; i < executionListenersSize; i++) {
var listener = listeners[i];
listener.preExecute (this.getId (), event);
}
}}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.ExecutionEvent");
Clazz.defineMethod (c$, "getCategory", 
function () {
if (!this.isDefined ()) {
throw  new org.eclipse.core.commands.common.NotDefinedException ("Cannot get the category from an undefined command");
}return this.category;
});
Clazz.defineMethod (c$, "getParameters", 
function () {
if (!this.isDefined ()) {
throw  new org.eclipse.core.commands.common.NotDefinedException ("Cannot get the parameters from an undefined command");
}if ((this.parameters == null) || (this.parameters.length == 0)) {
return null;
}var returnValue =  new Array (this.parameters.length);
System.arraycopy (this.parameters, 0, returnValue, 0, this.parameters.length);
return returnValue;
});
Clazz.defineMethod (c$, "isEnabled", 
function () {
if (this.handler == null) {
return false;
}return this.handler.isHandled () && this.handler.isEnabled ();
});
Clazz.defineMethod (c$, "isHandled", 
function () {
if (this.handler == null) return false;
return this.handler.isHandled ();
});
Clazz.defineMethod (c$, "removeCommandListener", 
function (commandListener) {
if (commandListener == null) {
throw  new NullPointerException ("Cannot remove a null command listener");
}if (this.commandListeners != null) {
this.commandListeners.remove (commandListener);
}}, "org.eclipse.core.commands.ICommandListener");
Clazz.defineMethod (c$, "removeExecutionListener", 
function (executionListener) {
if (executionListener == null) {
throw  new NullPointerException ("Cannot remove a null execution listener");
}if (this.executionListeners != null) {
this.executionListeners.remove (executionListener);
}}, "org.eclipse.core.commands.IExecutionListener");
Clazz.defineMethod (c$, "setHandler", 
function (handler) {
if (org.eclipse.core.internal.commands.util.Util.equals (handler, this.handler)) {
return false;
}this.handler = handler;
this.string = null;
if ((org.eclipse.core.commands.Command.DEBUG_HANDLERS) && ((org.eclipse.core.commands.Command.DEBUG_HANDLERS_COMMAND_ID == null) || (org.eclipse.core.commands.Command.DEBUG_HANDLERS_COMMAND_ID.equals (this.id)))) {
System.out.print ("HANDLERS >>> Command('" + this.id + "') has changed to ");
if (handler == null) {
System.out.println ("no handler");
} else {
System.out.print ("'");
System.out.print (handler);
System.out.println ("' as its handler");
}}this.fireCommandChanged ( new org.eclipse.core.commands.CommandEvent (this, false, false, false, true, false, false));
return true;
}, "org.eclipse.core.commands.IHandler");
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.string == null) {
var stringBuffer =  new StringBuffer ();
stringBuffer.append ("Command(");
stringBuffer.append (this.id);
stringBuffer.append (',');
stringBuffer.append (this.name);
stringBuffer.append (',');
stringBuffer.append (this.description);
stringBuffer.append (',');
stringBuffer.append (this.category);
stringBuffer.append (',');
stringBuffer.append (this.handler);
stringBuffer.append (',');
stringBuffer.append (this.parameters);
stringBuffer.append (',');
stringBuffer.append (this.defined);
stringBuffer.append (')');
this.string = stringBuffer.toString ();
}return this.string;
});
Clazz.overrideMethod (c$, "undefine", 
function () {
this.string = null;
var definedChanged = this.defined;
this.defined = false;
var nameChanged = this.name != null;
this.name = null;
var descriptionChanged = this.description != null;
this.description = null;
var categoryChanged = this.category != null;
this.category = null;
var parametersChanged = this.parameters != null;
this.parameters = null;
this.fireCommandChanged ( new org.eclipse.core.commands.CommandEvent (this, categoryChanged, definedChanged, descriptionChanged, false, nameChanged, parametersChanged));
});
Clazz.defineStatics (c$,
"DEBUG_COMMAND_EXECUTION", false,
"DEBUG_HANDLERS", false,
"DEBUG_HANDLERS_COMMAND_ID", null);
});
