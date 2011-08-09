Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.IFilter"], "org.eclipse.jface.viewers.AcceptAllFilter", null, function () {
c$ = Clazz.declareType (org.eclipse.jface.viewers, "AcceptAllFilter", null, org.eclipse.jface.viewers.IFilter);
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return org.eclipse.jface.viewers.AcceptAllFilter.singleton;
});
Clazz.overrideMethod (c$, "select", 
function (toTest) {
return true;
}, "~O");
Clazz.overrideMethod (c$, "equals", 
function (other) {
return other === this || Clazz.instanceOf (other, org.eclipse.jface.viewers.AcceptAllFilter);
}, "~O");
c$.singleton = c$.prototype.singleton =  new org.eclipse.jface.viewers.AcceptAllFilter ();
});
