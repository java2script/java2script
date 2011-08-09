Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.IToolBarManager", "$.SubContributionManager"], "org.eclipse.jface.action.SubToolBarManager", null, function () {
c$ = Clazz.declareType (org.eclipse.jface.action, "SubToolBarManager", org.eclipse.jface.action.SubContributionManager, org.eclipse.jface.action.IToolBarManager);
Clazz.defineMethod (c$, "getParentToolBarManager", 
function () {
return this.getParent ();
});
Clazz.defineMethod (c$, "update", 
function (force) {
this.getParentToolBarManager ().update (force);
}, "~B");
});
