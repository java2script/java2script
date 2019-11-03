Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["java.lang.Exception"], "org.eclipse.core.runtime.CoreException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.status = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "CoreException", Exception);
Clazz.makeConstructor (c$, 
function (status) {
Clazz.superConstructor (this, org.eclipse.core.runtime.CoreException, [status.getMessage ()]);
this.status = status;
}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "getStatus", 
function () {
return this.status;
});
Clazz.defineMethod (c$, "printStackTrace", 
function () {
this.printStackTrace (System.err);
});
Clazz.defineMethod (c$, "printStackTrace", 
function (output) {
{
if (this.status.getException () != null) {
output.print (this.getClass ().getName () + "[" + this.status.getCode () + "]: ");
this.status.getException ().printStackTrace (output);
} else Clazz.superCall (this, org.eclipse.core.runtime.CoreException, "printStackTrace", [output]);
}}, "java.io.PrintStream");
Clazz.defineMethod (c$, "printStackTrace", 
function (output) {
{
if (this.status.getException () != null) {
output.print (this.getClass ().getName () + "[" + this.status.getCode () + "]: ");
this.status.getException ().printStackTrace (output);
} else Clazz.superCall (this, org.eclipse.core.runtime.CoreException, "printStackTrace", [output]);
}}, "java.io.PrintWriter");
});
