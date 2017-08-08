Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.lang.IllegalStateException"], "java.awt.dnd.InvalidDnDOperationException", null, function () {
c$ = Clazz.declareType (java.awt.dnd, "InvalidDnDOperationException", IllegalStateException);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.dnd.InvalidDnDOperationException, [java.awt.dnd.InvalidDnDOperationException.dft_msg]);
});
Clazz.defineStatics (c$,
"dft_msg", "The operation requested cannot be performed by the DnD system since it is not in the appropriate state");
});
