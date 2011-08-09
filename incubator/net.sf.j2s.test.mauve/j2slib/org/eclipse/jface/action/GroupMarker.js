Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.AbstractGroupMarker"], "org.eclipse.jface.action.GroupMarker", null, function () {
c$ = Clazz.declareType (org.eclipse.jface.action, "GroupMarker", org.eclipse.jface.action.AbstractGroupMarker);
Clazz.overrideMethod (c$, "isVisible", 
function () {
return false;
});
});
