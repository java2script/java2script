Clazz.declarePackage ("org.eclipse.jface.bindings");
Clazz.load (["org.eclipse.core.commands.common.AbstractBitSetEvent"], "org.eclipse.jface.bindings.BindingManagerEvent", ["java.lang.NullPointerException", "org.eclipse.jface.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.manager = null;
this.previousTriggersByParameterizedCommand = null;
this.scheme = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings, "BindingManagerEvent", org.eclipse.core.commands.common.AbstractBitSetEvent);
Clazz.makeConstructor (c$, 
function (manager, activeBindingsChanged, previousTriggersByParameterizedCommand, activeSchemeChanged, scheme, schemeDefined, localeChanged, platformChanged) {
Clazz.superConstructor (this, org.eclipse.jface.bindings.BindingManagerEvent, []);
if (manager == null) throw  new NullPointerException ("A binding manager event needs a binding manager");
this.manager = manager;
if (schemeDefined && (scheme == null)) {
throw  new NullPointerException ("If a scheme changed defined state, then there should be a scheme identifier");
}this.scheme = scheme;
this.previousTriggersByParameterizedCommand = previousTriggersByParameterizedCommand;
if (activeBindingsChanged) {
this.changedValues |= 1;
}if (activeSchemeChanged) {
this.changedValues |= 2;
}if (localeChanged) {
this.changedValues |= 4;
}if (platformChanged) {
this.changedValues |= 8;
}if (schemeDefined) {
this.changedValues |= 16;
}}, "org.eclipse.jface.bindings.BindingManager,~B,java.util.Map,~B,org.eclipse.jface.bindings.Scheme,~B,~B,~B");
Clazz.defineMethod (c$, "getManager", 
function () {
return this.manager;
});
Clazz.defineMethod (c$, "getScheme", 
function () {
return this.scheme;
});
Clazz.defineMethod (c$, "isActiveBindingsChanged", 
function () {
return ((this.changedValues & 1) != 0);
});
Clazz.defineMethod (c$, "isActiveBindingsChangedFor", 
function (parameterizedCommand) {
var currentBindings = this.manager.getActiveBindingsFor (parameterizedCommand);
var previousBindings;
if (this.previousTriggersByParameterizedCommand != null) {
var previousBindingCollection = this.previousTriggersByParameterizedCommand.get (parameterizedCommand);
if (previousBindingCollection == null) {
previousBindings = null;
} else {
previousBindings = previousBindingCollection.toArray ( new Array (previousBindingCollection.size ()));
}} else {
previousBindings = null;
}return !org.eclipse.jface.util.Util.equals (currentBindings, previousBindings);
}, "org.eclipse.core.commands.ParameterizedCommand");
Clazz.defineMethod (c$, "isActiveSchemeChanged", 
function () {
return ((this.changedValues & 2) != 0);
});
Clazz.defineMethod (c$, "isLocaleChanged", 
function () {
return ((this.changedValues & 4) != 0);
});
Clazz.defineMethod (c$, "isPlatformChanged", 
function () {
return ((this.changedValues & 8) != 0);
});
Clazz.defineMethod (c$, "isSchemeChanged", 
function () {
return (this.scheme != null);
});
Clazz.defineMethod (c$, "isSchemeDefined", 
function () {
return (((this.changedValues & 16) != 0) && (this.scheme != null));
});
Clazz.defineStatics (c$,
"CHANGED_ACTIVE_BINDINGS", 1,
"CHANGED_ACTIVE_SCHEME", 2,
"CHANGED_LOCALE", 4,
"CHANGED_PLATFORM", 8,
"CHANGED_SCHEME_DEFINED", 16);
});
