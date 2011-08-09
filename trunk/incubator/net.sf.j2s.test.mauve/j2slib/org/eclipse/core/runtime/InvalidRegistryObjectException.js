Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["java.lang.RuntimeException"], "org.eclipse.core.runtime.InvalidRegistryObjectException", null, function () {
c$ = Clazz.declareType (org.eclipse.core.runtime, "InvalidRegistryObjectException", RuntimeException);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.core.runtime.InvalidRegistryObjectException, ["Invalid registry object"]);
});
Clazz.defineStatics (c$,
"MESSAGE", "Invalid registry object");
});
