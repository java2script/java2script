Clazz.declarePackage ("org.eclipse.jface.commands");
Clazz.load (["org.eclipse.core.commands.AbstractHandler"], "org.eclipse.jface.commands.ActionHandler", ["java.lang.NullPointerException", "$.StringBuffer", "org.eclipse.core.commands.ExecutionException", "$.HandlerEvent", "org.eclipse.jface.util.IPropertyChangeListener", "$wt.widgets.Event"], function () {
c$ = Clazz.decorateAsClass (function () {
this.action = null;
this.propertyChangeListener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.commands, "ActionHandler", org.eclipse.core.commands.AbstractHandler);
Clazz.makeConstructor (c$, 
function (action) {
Clazz.superConstructor (this, org.eclipse.jface.commands.ActionHandler, []);
if (action == null) throw  new NullPointerException ();
this.action = action;
}, "org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "addHandlerListener", 
function (handlerListener) {
if (!this.hasListeners ()) {
this.attachListener ();
}Clazz.superCall (this, org.eclipse.jface.commands.ActionHandler, "addHandlerListener", [handlerListener]);
}, "org.eclipse.core.commands.IHandlerListener");
Clazz.defineMethod (c$, "attachListener", 
($fz = function () {
if (this.propertyChangeListener == null) {
this.propertyChangeListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.commands.ActionHandler$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.commands, "ActionHandler$1", null, org.eclipse.jface.util.IPropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (propertyChangeEvent) {
var property = propertyChangeEvent.getProperty ();
this.b$["org.eclipse.jface.commands.ActionHandler"].fireHandlerChanged ( new org.eclipse.core.commands.HandlerEvent (this.b$["org.eclipse.jface.commands.ActionHandler"], "enabled".equals (property), "handled".equals (property)));
}, "org.eclipse.jface.util.PropertyChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.commands.ActionHandler$1, i$, v$);
}) (this, null);
}this.action.addPropertyChangeListener (this.propertyChangeListener);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "detachListener", 
($fz = function () {
this.action.removePropertyChangeListener (this.propertyChangeListener);
this.propertyChangeListener = null;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "dispose", 
function () {
if (this.hasListeners ()) {
this.action.removePropertyChangeListener (this.propertyChangeListener);
}});
Clazz.overrideMethod (c$, "execute", 
function (event) {
if ((this.action.getStyle () == 2) || (this.action.getStyle () == 8)) this.action.setChecked (!this.action.isChecked ());
var trigger = event.getTrigger ();
try {
if (Clazz.instanceOf (trigger, $wt.widgets.Event)) {
this.action.runWithEvent (trigger);
} else {
this.action.runWithEvent ( new $wt.widgets.Event ());
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
throw  new org.eclipse.core.commands.ExecutionException ("While executing the action, an exception occurred", e);
} else {
throw e;
}
}
return null;
}, "org.eclipse.core.commands.ExecutionEvent");
Clazz.defineMethod (c$, "getAction", 
function () {
return this.action;
});
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return this.action.isEnabled ();
});
Clazz.overrideMethod (c$, "isHandled", 
function () {
return this.action.isHandled ();
});
Clazz.defineMethod (c$, "removeHandlerListener", 
function (handlerListener) {
Clazz.superCall (this, org.eclipse.jface.commands.ActionHandler, "removeHandlerListener", [handlerListener]);
if (!this.hasListeners ()) {
this.detachListener ();
}}, "org.eclipse.core.commands.IHandlerListener");
Clazz.overrideMethod (c$, "toString", 
function () {
var buffer =  new StringBuffer ();
buffer.append ("ActionHandler(action=");
buffer.append (this.action);
buffer.append (')');
return buffer.toString ();
});
});
