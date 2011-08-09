Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (["org.eclipse.core.commands.operations.LinearUndoViolationDetector"], "org.eclipse.core.commands.operations.LinearUndoEnforcer", ["org.eclipse.core.runtime.Status"], function () {
c$ = Clazz.declareType (org.eclipse.core.commands.operations, "LinearUndoEnforcer", org.eclipse.core.commands.operations.LinearUndoViolationDetector);
Clazz.overrideMethod (c$, "allowLinearRedoViolation", 
function (operation, context, history, uiInfo) {
return org.eclipse.core.runtime.Status.CANCEL_STATUS;
}, "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.commands.operations.IUndoContext,org.eclipse.core.commands.operations.IOperationHistory,org.eclipse.core.runtime.IAdaptable");
Clazz.overrideMethod (c$, "allowLinearUndoViolation", 
function (operation, context, history, uiInfo) {
return org.eclipse.core.runtime.Status.CANCEL_STATUS;
}, "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.commands.operations.IUndoContext,org.eclipse.core.commands.operations.IOperationHistory,org.eclipse.core.runtime.IAdaptable");
});
