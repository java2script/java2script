Clazz.declarePackage ("org.eclipse.core.commands.contexts");
Clazz.load (["org.eclipse.core.commands.contexts.IContextListener", "java.util.HashMap", "$.HashSet"], "org.eclipse.core.commands.contexts.ContextManager", ["java.lang.NullPointerException", "java.util.Collections", "org.eclipse.core.commands.contexts.Context", "$.ContextManagerEvent", "org.eclipse.core.internal.commands.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.activeContextIds = null;
this.listeners = null;
this.contextsById = null;
this.definedContextIds = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.contexts, "ContextManager", null, org.eclipse.core.commands.contexts.IContextListener);
Clazz.prepareFields (c$, function () {
this.activeContextIds =  new java.util.HashSet ();
this.contextsById =  new java.util.HashMap ();
this.definedContextIds =  new java.util.HashSet ();
});
Clazz.defineMethod (c$, "addActiveContext", 
function (contextId) {
if (this.activeContextIds.contains (contextId)) {
return ;
}var previouslyActiveContextIds =  new java.util.HashSet (this.activeContextIds);
this.activeContextIds.add (contextId);
if (org.eclipse.core.commands.contexts.ContextManager.DEBUG) {
System.out.println ("CONTEXTS >> " + this.activeContextIds);
}this.fireContextManagerChanged ( new org.eclipse.core.commands.contexts.ContextManagerEvent (this, null, false, true, previouslyActiveContextIds));
}, "~S");
Clazz.defineMethod (c$, "addContextManagerListener", 
function (listener) {
if (listener == null) {
throw  new NullPointerException ();
}if (this.listeners == null) {
this.listeners =  new java.util.HashSet ();
}this.listeners.add (listener);
}, "org.eclipse.core.commands.contexts.IContextManagerListener");
Clazz.overrideMethod (c$, "contextChanged", 
function (contextEvent) {
if (contextEvent.isDefinedChanged ()) {
var context = contextEvent.getContext ();
var contextId = context.getId ();
var contextIdAdded = context.isDefined ();
if (contextIdAdded) {
this.definedContextIds.add (contextId);
} else {
this.definedContextIds.remove (contextId);
}this.fireContextManagerChanged ( new org.eclipse.core.commands.contexts.ContextManagerEvent (this, contextId, contextIdAdded, false, null));
}}, "org.eclipse.core.commands.contexts.ContextEvent");
Clazz.defineMethod (c$, "fireContextManagerChanged", 
($fz = function (contextManagerEvent) {
if (contextManagerEvent == null) throw  new NullPointerException ();
if (this.listeners != null) {
var listenerItr = this.listeners.iterator ();
while (listenerItr.hasNext ()) {
var listener = listenerItr.next ();
listener.contextManagerChanged (contextManagerEvent);
}
}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.contexts.ContextManagerEvent");
Clazz.defineMethod (c$, "getActiveContextIds", 
function () {
return java.util.Collections.unmodifiableSet (this.activeContextIds);
});
Clazz.defineMethod (c$, "getContext", 
function (contextId) {
if (contextId == null) throw  new NullPointerException ();
var context = this.contextsById.get (contextId);
if (context == null) {
context =  new org.eclipse.core.commands.contexts.Context (contextId);
this.contextsById.put (contextId, context);
context.addContextListener (this);
}return context;
}, "~S");
Clazz.defineMethod (c$, "getDefinedContextIds", 
function () {
return java.util.Collections.unmodifiableSet (this.definedContextIds);
});
Clazz.defineMethod (c$, "removeActiveContext", 
function (contextId) {
if (!this.activeContextIds.contains (contextId)) {
return ;
}var previouslyActiveContextIds =  new java.util.HashSet (this.activeContextIds);
this.activeContextIds.remove (contextId);
if (org.eclipse.core.commands.contexts.ContextManager.DEBUG) {
System.out.println ("CONTEXTS >> " + this.activeContextIds);
}this.fireContextManagerChanged ( new org.eclipse.core.commands.contexts.ContextManagerEvent (this, null, false, true, previouslyActiveContextIds));
}, "~S");
Clazz.defineMethod (c$, "removeContextManagerListener", 
function (listener) {
if (listener == null) {
throw  new NullPointerException ();
}if (this.listeners == null) {
return ;
}this.listeners.remove (listener);
if (this.listeners.isEmpty ()) {
this.listeners = null;
}}, "org.eclipse.core.commands.contexts.IContextManagerListener");
Clazz.defineMethod (c$, "setActiveContextIds", 
function (activeContextIds) {
if (org.eclipse.core.internal.commands.util.Util.equals (this.activeContextIds, activeContextIds)) {
return ;
}var previouslyActiveContextIds = this.activeContextIds;
if (activeContextIds != null) {
this.activeContextIds =  new java.util.HashSet ();
this.activeContextIds.addAll (activeContextIds);
} else {
this.activeContextIds = null;
}if (org.eclipse.core.commands.contexts.ContextManager.DEBUG) {
System.out.println ("CONTEXTS >> " + activeContextIds);
}this.fireContextManagerChanged ( new org.eclipse.core.commands.contexts.ContextManagerEvent (this, null, false, true, previouslyActiveContextIds));
}, "java.util.Set");
Clazz.defineStatics (c$,
"DEBUG", false);
});
