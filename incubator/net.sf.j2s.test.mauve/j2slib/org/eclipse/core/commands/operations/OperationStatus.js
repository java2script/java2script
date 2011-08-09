Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (["org.eclipse.core.runtime.Status"], "org.eclipse.core.commands.operations.OperationStatus", null, function () {
c$ = Clazz.declareType (org.eclipse.core.commands.operations, "OperationStatus", org.eclipse.core.runtime.Status);
Clazz.defineStatics (c$,
"NOTHING_TO_REDO", 1,
"NOTHING_TO_UNDO", 2,
"OPERATION_INVALID", 3,
"DEFAULT_PLUGIN_ID", "org.eclipse.core.commands");
});
