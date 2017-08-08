Clazz.declarePackage ("java.awt");
c$ = Clazz.declareType (java.awt, "PrintJob");
Clazz.overrideMethod (c$, "finalize", 
function () {
this.end ();
});
