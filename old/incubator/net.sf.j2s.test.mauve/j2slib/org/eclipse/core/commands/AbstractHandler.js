Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (["org.eclipse.core.commands.IHandler"], "org.eclipse.core.commands.AbstractHandler", ["java.lang.NullPointerException", "java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.handlerListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "AbstractHandler", null, org.eclipse.core.commands.IHandler);
Clazz.overrideMethod (c$, "addHandlerListener", 
function (handlerListener) {
if (handlerListener == null) throw  new NullPointerException ();
if (this.handlerListeners == null) this.handlerListeners =  new java.util.ArrayList ();
if (!this.handlerListeners.contains (handlerListener)) this.handlerListeners.add (handlerListener);
}, "org.eclipse.core.commands.IHandlerListener");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "fireHandlerChanged", 
function (handlerEvent) {
if (handlerEvent == null) throw  new NullPointerException ();
if (this.handlerListeners != null) for (var i = 0; i < this.handlerListeners.size (); i++) (this.handlerListeners.get (i)).handlerChanged (handlerEvent);

}, "org.eclipse.core.commands.HandlerEvent");
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isHandled", 
function () {
return true;
});
Clazz.defineMethod (c$, "hasListeners", 
function () {
return this.handlerListeners != null;
});
Clazz.overrideMethod (c$, "removeHandlerListener", 
function (handlerListener) {
if (handlerListener == null) throw  new NullPointerException ();
if (this.handlerListeners == null) {
return ;
}if (this.handlerListeners != null) this.handlerListeners.remove (handlerListener);
if (this.handlerListeners.isEmpty ()) {
this.handlerListeners = null;
}}, "org.eclipse.core.commands.IHandlerListener");
});
