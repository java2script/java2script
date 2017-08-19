Clazz.declarePackage ("sun.awt");
Clazz.load (["java.lang.SecurityManager"], "sun.awt.AWTSecurityManager", null, function () {
c$ = Clazz.declareType (sun.awt, "AWTSecurityManager", SecurityManager);
Clazz.defineMethod (c$, "getAppContext", 
function () {
return null;
});
});
