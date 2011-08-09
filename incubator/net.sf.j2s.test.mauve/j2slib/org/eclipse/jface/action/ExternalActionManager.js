Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.bindings.IBindingManagerListener", "java.util.HashMap", "$.HashSet", "$.ResourceBundle"], "org.eclipse.jface.action.ExternalActionManager", ["java.lang.Exception", "$.NullPointerException", "java.text.MessageFormat", "org.eclipse.core.commands.ICommandListener", "$.ParameterizedCommand", "org.eclipse.core.runtime.Status", "org.eclipse.jface.bindings.keys.KeySequence", "$.SWTKeySupport", "org.eclipse.jface.util.Policy", "$.PropertyChangeEvent", "$.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.callback = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "ExternalActionManager");
Clazz.declareInterface (org.eclipse.jface.action.ExternalActionManager, "IActiveChecker");
Clazz.declareInterface (org.eclipse.jface.action.ExternalActionManager, "ICallback");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.activeChecker = null;
this.bindingManager = null;
this.bindingManagerListenerAttached = false;
this.commandManager = null;
this.loggedCommandIds = null;
this.registeredListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action.ExternalActionManager, "CommandCallback", null, [org.eclipse.jface.bindings.IBindingManagerListener, org.eclipse.jface.action.ExternalActionManager.ICallback]);
Clazz.prepareFields (c$, function () {
this.loggedCommandIds =  new java.util.HashSet ();
this.registeredListeners =  new java.util.HashMap ();
});
Clazz.makeConstructor (c$, 
function (a, b) {
this.construct (a, b, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ExternalActionManager.CommandCallback$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action.ExternalActionManager, "CommandCallback$1", null, org.eclipse.jface.action.ExternalActionManager.IActiveChecker);
Clazz.defineMethod (c$, "isActive", 
function (c) {
return true;
}, "~S");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ExternalActionManager.CommandCallback$1, i$, v$);
}) (this, null));
}, "org.eclipse.jface.bindings.BindingManager,org.eclipse.core.commands.CommandManager");
Clazz.makeConstructor (c$, 
function (a, b, c) {
if (a == null) {
throw  new NullPointerException ("The callback needs a binding manager");
}if (b == null) {
throw  new NullPointerException ("The callback needs a command manager");
}if (c == null) {
throw  new NullPointerException ("The callback needs an active callback");
}this.activeChecker = c;
this.bindingManager = a;
this.commandManager = b;
}, "org.eclipse.jface.bindings.BindingManager,org.eclipse.core.commands.CommandManager,org.eclipse.jface.action.ExternalActionManager.IActiveChecker");
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (a, b) {
this.registeredListeners.put (a, b);
if (!this.bindingManagerListenerAttached) {
this.bindingManager.addBindingManagerListener (this);
this.bindingManagerListenerAttached = true;
}}, "~S,org.eclipse.jface.util.IPropertyChangeListener");
Clazz.overrideMethod (c$, "bindingManagerChanged", 
function (a) {
if (a.isActiveBindingsChanged ()) {
var b = this.registeredListeners.entrySet ().iterator ();
while (b.hasNext ()) {
var c = b.next ();
var d = c.getKey ();
var e = this.commandManager.getCommand (d);
var f =  new org.eclipse.core.commands.ParameterizedCommand (e, null);
if (a.isActiveBindingsChangedFor (f)) {
var g = c.getValue ();
g.propertyChange ( new org.eclipse.jface.util.PropertyChangeEvent (a.getManager (), "text", null, null));
}}
}}, "org.eclipse.jface.bindings.BindingManagerEvent");
Clazz.overrideMethod (c$, "getAccelerator", 
function (a) {
var b = this.commandManager.getCommand (a);
var c =  new org.eclipse.core.commands.ParameterizedCommand (b, null);
var d = this.bindingManager.getActiveBindingsFor (c);
var e = d.length;
var f = null;
for (var g = 0; g < e; g++) {
var h = d[g];
var i = h.getTriggers ();
if (i.length == 1) {
var j = i[0];
if (Clazz.instanceOf (j, org.eclipse.jface.bindings.keys.KeyStroke)) {
f =  new Integer (org.eclipse.jface.bindings.keys.SWTKeySupport.convertKeyStrokeToAccelerator (j));
break;
}}}
return f;
}, "~S");
Clazz.overrideMethod (c$, "getAcceleratorText", 
function (a) {
var b = this.commandManager.getCommand (a);
var c =  new org.eclipse.core.commands.ParameterizedCommand (b, null);
var d = this.bindingManager.getActiveBindingsFor (c);
var e = d.length;
var f = null;
for (var g = 0; g < e; g++) {
var h = d[g];
f = h.format ();
}
return f;
}, "~S");
Clazz.overrideMethod (c$, "isAcceleratorInUse", 
function (a) {
var b = org.eclipse.jface.bindings.keys.KeySequence.getInstance (org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke (a));
return this.bindingManager.isPerfectMatch (b) || this.bindingManager.isPartialMatch (b);
}, "~N");
Clazz.overrideMethod (c$, "isActive", 
function (a) {
if (a != null) {
var b = this.commandManager.getCommand (a);
if (!b.isDefined () && (!this.loggedCommandIds.contains (a))) {
var c = java.text.MessageFormat.format (org.eclipse.jface.util.Util.translateString (org.eclipse.jface.action.ExternalActionManager.CommandCallback.RESOURCE_BUNDLE, "undefinedCommand.WarningMessage", null), [b.getId ()]);
var d =  new org.eclipse.core.runtime.Status (4, "org.eclipse.jface", 0, c,  new Exception ());
org.eclipse.jface.util.Policy.getLog ().log (d);
this.loggedCommandIds.add (a);
b.addCommandListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ExternalActionManager.CommandCallback$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action.ExternalActionManager, "CommandCallback$2", null, org.eclipse.core.commands.ICommandListener);
Clazz.overrideMethod (c$, "commandChanged", 
function (d) {
if (this.f$.b.isDefined ()) {
this.f$.b.removeCommandListener (this);
this.b$["org.eclipse.jface.action.ExternalActionManager.CommandCallback"].loggedCommandIds.remove (this.f$.a);
}}, "org.eclipse.core.commands.CommandEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ExternalActionManager.CommandCallback$2, i$, v$);
}) (this, Clazz.cloneFinals ("b", b, "a", a)));
return true;
}return this.activeChecker.isActive (a);
}return true;
}, "~S");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (a, b) {
var c = this.registeredListeners.get (a);
if (c === b) {
this.registeredListeners.remove (a);
if (this.registeredListeners.isEmpty ()) {
this.bindingManager.removeBindingManagerListener (this);
this.bindingManagerListenerAttached = false;
}}}, "~S,org.eclipse.jface.util.IPropertyChangeListener");
c$.RESOURCE_BUNDLE = c$.prototype.RESOURCE_BUNDLE = java.util.ResourceBundle.getBundle (org.eclipse.jface.action.ExternalActionManager.getName ());
c$ = Clazz.p0p ();
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
if (org.eclipse.jface.action.ExternalActionManager.instance == null) ($t$ = org.eclipse.jface.action.ExternalActionManager.instance =  new org.eclipse.jface.action.ExternalActionManager (), org.eclipse.jface.action.ExternalActionManager.prototype.instance = org.eclipse.jface.action.ExternalActionManager.instance, $t$);
return org.eclipse.jface.action.ExternalActionManager.instance;
});
Clazz.makeConstructor (c$, 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getCallback", 
function () {
return this.callback;
});
Clazz.defineMethod (c$, "setCallback", 
function (callbackToUse) {
this.callback = callbackToUse;
}, "org.eclipse.jface.action.ExternalActionManager.ICallback");
Clazz.defineStatics (c$,
"instance", null);
});
