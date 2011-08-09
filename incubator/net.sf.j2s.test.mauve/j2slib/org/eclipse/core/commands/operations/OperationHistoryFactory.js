Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (null, "org.eclipse.core.commands.operations.OperationHistoryFactory", ["org.eclipse.core.commands.operations.DefaultOperationHistory"], function () {
c$ = Clazz.declareType (org.eclipse.core.commands.operations, "OperationHistoryFactory");
c$.getOperationHistory = Clazz.defineMethod (c$, "getOperationHistory", 
function () {
if (org.eclipse.core.commands.operations.OperationHistoryFactory.operationHistory == null) {
($t$ = org.eclipse.core.commands.operations.OperationHistoryFactory.operationHistory =  new org.eclipse.core.commands.operations.DefaultOperationHistory (), org.eclipse.core.commands.operations.OperationHistoryFactory.prototype.operationHistory = org.eclipse.core.commands.operations.OperationHistoryFactory.operationHistory, $t$);
}return org.eclipse.core.commands.operations.OperationHistoryFactory.operationHistory;
});
c$.setOperationHistory = Clazz.defineMethod (c$, "setOperationHistory", 
function (history) {
if (org.eclipse.core.commands.operations.OperationHistoryFactory.operationHistory == null) {
($t$ = org.eclipse.core.commands.operations.OperationHistoryFactory.operationHistory = history, org.eclipse.core.commands.operations.OperationHistoryFactory.prototype.operationHistory = org.eclipse.core.commands.operations.OperationHistoryFactory.operationHistory, $t$);
}}, "org.eclipse.core.commands.operations.IOperationHistory");
Clazz.defineStatics (c$,
"operationHistory", null);
});
