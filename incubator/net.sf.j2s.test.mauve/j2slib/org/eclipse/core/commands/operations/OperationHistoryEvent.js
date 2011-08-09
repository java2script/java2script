Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (null, "org.eclipse.core.commands.operations.OperationHistoryEvent", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.code = 0;
this.history = null;
this.operation = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.operations, "OperationHistoryEvent");
Clazz.makeConstructor (c$, 
function (code, history, operation) {
if (history == null) throw  new NullPointerException ();
if (operation == null) throw  new NullPointerException ();
this.code = code;
this.history = history;
this.operation = operation;
}, "~N,org.eclipse.core.commands.operations.IOperationHistory,org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "getEventType", 
function () {
return this.code;
});
Clazz.defineMethod (c$, "getHistory", 
function () {
return this.history;
});
Clazz.defineMethod (c$, "getOperation", 
function () {
return this.operation;
});
Clazz.defineStatics (c$,
"ABOUT_TO_EXECUTE", 1,
"ABOUT_TO_REDO", 2,
"ABOUT_TO_UNDO", 3,
"DONE", 4,
"OPERATION_ADDED", 5,
"OPERATION_CHANGED", 6,
"OPERATION_NOT_OK", 7,
"OPERATION_REMOVED", 8,
"REDONE", 9,
"UNDONE", 10);
});
