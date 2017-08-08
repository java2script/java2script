Clazz.declarePackage ("java.security");
Clazz.load (["java.security.AccessControlContext"], "java.security.AccessController", null, function () {
c$ = Clazz.declareType (java.security, "AccessController", null, java.security.AccessControlContext);
c$.doPrivileged = Clazz.defineMethod (c$, "doPrivileged", 
function (action) {
return action.run ();
}, "java.security.PrivilegedAction");
c$.getContext = Clazz.defineMethod (c$, "getContext", 
function () {
return  new java.security.AccessController ();
});
Clazz.overrideMethod (c$, "checkPermission", 
function (perm) {
return true;
}, "~O");
c$.doPrivileged = Clazz.defineMethod (c$, "doPrivileged", 
function (action, context) {
return action.run ();
}, "java.security.PrivilegedAction,java.security.AccessControlContext");
});
