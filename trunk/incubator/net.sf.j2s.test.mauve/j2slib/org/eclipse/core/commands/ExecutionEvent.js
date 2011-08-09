Clazz.declarePackage ("org.eclipse.core.commands");
Clazz.load (null, "org.eclipse.core.commands.ExecutionEvent", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.applicationContext = null;
this.parameters = null;
this.trigger = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands, "ExecutionEvent");
Clazz.makeConstructor (c$, 
function (parameters, trigger, applicationContext) {
if (parameters == null) {
throw  new NullPointerException ("An execution event must have a non-null map of parameters");
}this.parameters = parameters;
this.trigger = trigger;
this.applicationContext = applicationContext;
}, "java.util.Map,~O,~O");
Clazz.defineMethod (c$, "getApplicationContext", 
function () {
return this.applicationContext;
});
Clazz.defineMethod (c$, "getParameter", 
function (parameterName) {
return this.parameters.get (parameterName);
}, "~S");
Clazz.defineMethod (c$, "getParameters", 
function () {
return this.parameters;
});
Clazz.defineMethod (c$, "getTrigger", 
function () {
return this.trigger;
});
});
