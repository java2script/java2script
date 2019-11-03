Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (["org.eclipse.core.commands.operations.IOperationApprover"], "org.eclipse.core.commands.operations.LinearUndoViolationDetector", ["org.eclipse.core.runtime.Status"], function () {
c$ = Clazz.declareType (org.eclipse.core.commands.operations, "LinearUndoViolationDetector", null, org.eclipse.core.commands.operations.IOperationApprover);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "proceedRedoing", 
function (operation, history, info) {
var contexts = operation.getContexts ();
for (var i = 0; i < contexts.length; i++) {
var context = contexts[i];
if (history.getRedoOperation (context) !== operation) {
var status = this.allowLinearRedoViolation (operation, context, history, info);
if (!status.isOK ()) return status;
}}
return org.eclipse.core.runtime.Status.OK_STATUS;
}, "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.commands.operations.IOperationHistory,org.eclipse.core.runtime.IAdaptable");
Clazz.overrideMethod (c$, "proceedUndoing", 
function (operation, history, info) {
var contexts = operation.getContexts ();
for (var i = 0; i < contexts.length; i++) {
var context = contexts[i];
if (history.getUndoOperation (context) !== operation) {
var status = this.allowLinearUndoViolation (operation, context, history, info);
if (!status.isOK ()) return status;
}}
return org.eclipse.core.runtime.Status.OK_STATUS;
}, "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.commands.operations.IOperationHistory,org.eclipse.core.runtime.IAdaptable");
});
