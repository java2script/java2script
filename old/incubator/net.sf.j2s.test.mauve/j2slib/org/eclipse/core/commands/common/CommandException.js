Clazz.declarePackage ("org.eclipse.core.commands.common");
Clazz.load (["java.lang.Exception"], "org.eclipse.core.commands.common.CommandException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$cause = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.common, "CommandException", Exception);
Clazz.makeConstructor (c$, 
function (message, cause) {
Clazz.superConstructor (this, org.eclipse.core.commands.common.CommandException, [message]);
this.$cause = cause;
}, "~S,Throwable");
Clazz.overrideMethod (c$, "getCause", 
function () {
return this.$cause;
});
});
