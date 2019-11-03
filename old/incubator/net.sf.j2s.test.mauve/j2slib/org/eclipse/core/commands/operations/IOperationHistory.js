Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (["org.eclipse.core.commands.operations.OperationStatus", "org.eclipse.core.internal.commands.operations.GlobalUndoContext"], "org.eclipse.core.commands.operations.IOperationHistory", null, function () {
c$ = Clazz.declareInterface (org.eclipse.core.commands.operations, "IOperationHistory");
Clazz.defineStatics (c$,
"EXECUTE", 1,
"UNDO", 2,
"REDO", 3);
c$.GLOBAL_UNDO_CONTEXT = c$.prototype.GLOBAL_UNDO_CONTEXT =  new org.eclipse.core.internal.commands.operations.GlobalUndoContext ();
c$.NOTHING_TO_REDO_STATUS = c$.prototype.NOTHING_TO_REDO_STATUS =  new org.eclipse.core.commands.operations.OperationStatus (1, org.eclipse.core.commands.operations.OperationStatus.DEFAULT_PLUGIN_ID, 1, "No operation to redo", null);
c$.NOTHING_TO_UNDO_STATUS = c$.prototype.NOTHING_TO_UNDO_STATUS =  new org.eclipse.core.commands.operations.OperationStatus (1, org.eclipse.core.commands.operations.OperationStatus.DEFAULT_PLUGIN_ID, 2, "No operation to undo", null);
c$.OPERATION_INVALID_STATUS = c$.prototype.OPERATION_INVALID_STATUS =  new org.eclipse.core.commands.operations.OperationStatus (4, org.eclipse.core.commands.operations.OperationStatus.DEFAULT_PLUGIN_ID, 3, "Operation is not valid", null);
});
