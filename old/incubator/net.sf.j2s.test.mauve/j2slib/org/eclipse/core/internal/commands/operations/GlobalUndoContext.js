Clazz.declarePackage ("org.eclipse.core.internal.commands.operations");
Clazz.load (["org.eclipse.core.commands.operations.IUndoContext"], "org.eclipse.core.internal.commands.operations.GlobalUndoContext", null, function () {
c$ = Clazz.declareType (org.eclipse.core.internal.commands.operations, "GlobalUndoContext", null, org.eclipse.core.commands.operations.IUndoContext);
Clazz.overrideMethod (c$, "getLabel", 
function () {
return "Global Undo Context";
});
Clazz.overrideMethod (c$, "matches", 
function (context) {
return true;
}, "org.eclipse.core.commands.operations.IUndoContext");
});
