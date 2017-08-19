Clazz.declarePackage ("sun.awt");
Clazz.load (["java.lang.Enum", "java.awt.event.FocusEvent"], "sun.awt.CausedFocusEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.cause = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "CausedFocusEvent", java.awt.event.FocusEvent);
Clazz.defineMethod (c$, "getCause", 
function () {
return this.cause;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "java.awt.FocusEvent[" + Clazz.superCall (this, sun.awt.CausedFocusEvent, "paramString", []) + ",cause=" + this.cause + "] on " + this.getSource ();
});
Clazz.makeConstructor (c$, 
function (source, id, temporary, opposite, cause) {
Clazz.superConstructor (this, sun.awt.CausedFocusEvent, [source, id, temporary, opposite]);
if (cause == null) {
cause = sun.awt.CausedFocusEvent.Cause.UNKNOWN;
}this.cause = cause;
}, "java.awt.Component,~N,~B,java.awt.Component,sun.awt.CausedFocusEvent.Cause");
c$.retarget = Clazz.defineMethod (c$, "retarget", 
function (e, newSource) {
if (e == null) return null;
return  new sun.awt.CausedFocusEvent (newSource, e.getID (), e.isTemporary (), e.getOppositeComponent (), (Clazz.instanceOf (e, sun.awt.CausedFocusEvent)) ? (e).getCause () : sun.awt.CausedFocusEvent.Cause.RETARGETED);
}, "java.awt.event.FocusEvent,java.awt.Component");
Clazz.pu$h(c$);
c$ = Clazz.declareType (sun.awt.CausedFocusEvent, "Cause", Enum);
Clazz.defineEnumConstant (c$, "UNKNOWN", 0, []);
Clazz.defineEnumConstant (c$, "MOUSE_EVENT", 1, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL", 2, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL_UP", 3, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL_DOWN", 4, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL_FORWARD", 5, []);
Clazz.defineEnumConstant (c$, "TRAVERSAL_BACKWARD", 6, []);
Clazz.defineEnumConstant (c$, "MANUAL_REQUEST", 7, []);
Clazz.defineEnumConstant (c$, "AUTOMATIC_TRAVERSE", 8, []);
Clazz.defineEnumConstant (c$, "ROLLBACK", 9, []);
Clazz.defineEnumConstant (c$, "NATIVE_SYSTEM", 10, []);
Clazz.defineEnumConstant (c$, "ACTIVATION", 11, []);
Clazz.defineEnumConstant (c$, "CLEAR_GLOBAL_FOCUS_OWNER", 12, []);
Clazz.defineEnumConstant (c$, "RETARGETED", 13, []);
c$ = Clazz.p0p ();
});
