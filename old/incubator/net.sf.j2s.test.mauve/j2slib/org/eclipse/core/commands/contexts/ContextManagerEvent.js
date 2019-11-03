Clazz.declarePackage ("org.eclipse.core.commands.contexts");
Clazz.load (["org.eclipse.core.commands.common.AbstractBitSetEvent"], "org.eclipse.core.commands.contexts.ContextManagerEvent", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contextId = null;
this.contextManager = null;
this.previouslyActiveContextIds = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.contexts, "ContextManagerEvent", org.eclipse.core.commands.common.AbstractBitSetEvent);
Clazz.makeConstructor (c$, 
function (contextManager, contextId, contextIdAdded, activeContextsChanged, previouslyActiveContextIds) {
Clazz.superConstructor (this, org.eclipse.core.commands.contexts.ContextManagerEvent, []);
if (contextManager == null) {
throw  new NullPointerException ();
}this.contextManager = contextManager;
this.contextId = contextId;
this.previouslyActiveContextIds = previouslyActiveContextIds;
if (contextIdAdded) {
this.changedValues |= 2;
}if (activeContextsChanged) {
this.changedValues |= 1;
}}, "org.eclipse.core.commands.contexts.ContextManager,~S,~B,~B,java.util.Set");
Clazz.defineMethod (c$, "getContextId", 
function () {
return this.contextId;
});
Clazz.defineMethod (c$, "getContextManager", 
function () {
return this.contextManager;
});
Clazz.defineMethod (c$, "getPreviouslyActiveContextIds", 
function () {
return this.previouslyActiveContextIds;
});
Clazz.defineMethod (c$, "isActiveContextsChanged", 
function () {
return ((this.changedValues & 1) != 0);
});
Clazz.defineMethod (c$, "isContextChanged", 
function () {
return (this.contextId != null);
});
Clazz.defineMethod (c$, "isContextDefined", 
function () {
return (((this.changedValues & 2) != 0) && (this.contextId != null));
});
Clazz.defineStatics (c$,
"CHANGED_CONTEXT_DEFINED", 2,
"CHANGED_CONTEXTS_ACTIVE", 1);
});
