Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (["org.eclipse.core.commands.operations.IUndoContext"], "org.eclipse.core.commands.operations.UndoContext", null, function () {
c$ = Clazz.declareType (org.eclipse.core.commands.operations, "UndoContext", null, org.eclipse.core.commands.operations.IUndoContext);
Clazz.overrideMethod (c$, "getLabel", 
function () {
return "";
});
Clazz.overrideMethod (c$, "matches", 
function (context) {
return context === this;
}, "org.eclipse.core.commands.operations.IUndoContext");
});
