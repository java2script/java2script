Clazz.declarePackage ("org.eclipse.jface.bindings.keys");
Clazz.load (["org.eclipse.jface.bindings.Binding"], "org.eclipse.jface.bindings.keys.KeyBinding", ["java.lang.IllegalArgumentException", "$.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.keySequence = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys, "KeyBinding", org.eclipse.jface.bindings.Binding);
Clazz.makeConstructor (c$, 
function (keySequence, command, schemeId, contextId, locale, platform, windowManager, type) {
Clazz.superConstructor (this, org.eclipse.jface.bindings.keys.KeyBinding, [command, schemeId, contextId, locale, platform, windowManager, type]);
if (keySequence == null) {
throw  new NullPointerException ("The key sequence cannot be null");
}if (!keySequence.isComplete ()) {
throw  new IllegalArgumentException ("Cannot bind to an incomplete key sequence");
}if (keySequence.isEmpty ()) {
throw  new IllegalArgumentException ("Cannot bind to an empty key sequence");
}this.keySequence = keySequence;
}, "org.eclipse.jface.bindings.keys.KeySequence,org.eclipse.core.commands.ParameterizedCommand,~S,~S,~S,~S,~S,~N");
Clazz.defineMethod (c$, "getKeySequence", 
function () {
return this.keySequence;
});
Clazz.overrideMethod (c$, "getTriggerSequence", 
function () {
return this.getKeySequence ();
});
});
