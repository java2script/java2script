Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (["org.eclipse.core.commands.common.AbstractBitSetEvent"], "org.eclipse.core.commands.HandlerEvent", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.handler = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "HandlerEvent", org.eclipse.core.commands.common.AbstractBitSetEvent);
Clazz.makeConstructor (c$, 
function (handler, enabledChanged, handledChanged) {
Clazz.superConstructor (this, org.eclipse.core.commands.HandlerEvent, []);
if (handler == null) throw  new NullPointerException ();
this.handler = handler;
if (enabledChanged) {
this.changedValues |= 1;
}if (handledChanged) {
this.changedValues |= 2;
}}, "org.eclipse.core.commands.IHandler,~B,~B");
Clazz.defineMethod (c$, "getHandler", 
function () {
return this.handler;
});
Clazz.defineMethod (c$, "isEnabledChanged", 
function () {
return ((this.changedValues & 1) != 0);
});
Clazz.defineMethod (c$, "isHandledChanged", 
function () {
return ((this.changedValues & 2) != 0);
});
Clazz.defineStatics (c$,
"CHANGED_ENABLED", 1,
"CHANGED_HANDLED", 2);
});
