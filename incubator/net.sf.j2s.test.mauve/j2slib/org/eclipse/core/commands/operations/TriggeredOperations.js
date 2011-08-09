Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (["org.eclipse.core.commands.operations.AbstractOperation", "$.IAdvancedUndoableOperation", "$.ICompositeOperation", "java.util.ArrayList"], "org.eclipse.core.commands.operations.TriggeredOperations", ["org.eclipse.core.commands.operations.IOperationHistory", "org.eclipse.core.runtime.Status"], function () {
c$ = Clazz.decorateAsClass (function () {
this.triggeringOperation = null;
this.history = null;
this.children = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.operations, "TriggeredOperations", org.eclipse.core.commands.operations.AbstractOperation, [org.eclipse.core.commands.operations.ICompositeOperation, org.eclipse.core.commands.operations.IAdvancedUndoableOperation]);
Clazz.prepareFields (c$, function () {
this.children =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function (operation, history) {
Clazz.superConstructor (this, org.eclipse.core.commands.operations.TriggeredOperations, [operation.getLabel ()]);
this.triggeringOperation = operation;
this.recomputeContexts ();
this.history = history;
}, "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.commands.operations.IOperationHistory");
Clazz.overrideMethod (c$, "add", 
function (operation) {
this.children.add (operation);
var contexts = operation.getContexts ();
for (var i = 0; i < contexts.length; i++) {
if (!this.hasContext (contexts[i])) {
this.addContext (contexts[i]);
}}
}, "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.overrideMethod (c$, "remove", 
function (operation) {
if (operation === this.triggeringOperation) {
this.triggeringOperation = null;
var childrenToRestore =  new java.util.ArrayList (this.children);
this.children =  new java.util.ArrayList (0);
this.recomputeContexts ();
operation.dispose ();
this.history.replaceOperation (this, childrenToRestore.toArray ( new Array (childrenToRestore.size ())));
} else {
this.children.remove (operation);
operation.dispose ();
this.recomputeContexts ();
}}, "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "removeContext", 
function (context) {
if (this.triggeringOperation != null && this.triggeringOperation.hasContext (context)) {
if (this.triggeringOperation.getContexts ().length == 1) {
this.remove (this.triggeringOperation);
return ;
}this.triggeringOperation.removeContext (context);
this.recomputeContexts ();
}var toBeRemoved =  new java.util.ArrayList ();
for (var i = 0; i < this.children.size (); i++) {
var child = this.children.get (i);
if (child.hasContext (context)) {
if (child.getContexts ().length == 1) {
toBeRemoved.add (child);
} else {
child.removeContext (context);
this.recomputeContexts ();
}}}
for (var i = 0; i < toBeRemoved.size (); i++) {
this.remove (toBeRemoved.get (i));
}
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "execute", 
function (monitor, info) {
if (this.triggeringOperation != null) {
this.history.openOperation (this, 1);
try {
var status = this.triggeringOperation.execute (monitor, info);
this.history.closeOperation (status.isOK (), false, 1);
return status;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.ExecutionException)) {
this.history.closeOperation (false, false, 1);
throw e;
} else {
throw e;
}
}
}return org.eclipse.core.commands.operations.IOperationHistory.OPERATION_INVALID_STATUS;
}, "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable");
Clazz.defineMethod (c$, "redo", 
function (monitor, info) {
if (this.triggeringOperation != null) {
this.history.openOperation (this, 3);
var childrenToRestore =  new java.util.ArrayList (this.children);
try {
this.removeAllChildren ();
var status = this.triggeringOperation.redo (monitor, info);
if (!status.isOK ()) {
this.children = childrenToRestore;
}this.history.closeOperation (status.isOK (), false, 3);
return status;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.ExecutionException)) {
this.children = childrenToRestore;
this.history.closeOperation (false, false, 3);
throw e;
} else {
throw e;
}
}
}return org.eclipse.core.commands.operations.IOperationHistory.OPERATION_INVALID_STATUS;
}, "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable");
Clazz.defineMethod (c$, "undo", 
function (monitor, info) {
if (this.triggeringOperation != null) {
this.history.openOperation (this, 2);
var childrenToRestore =  new java.util.ArrayList (this.children);
try {
this.removeAllChildren ();
var status = this.triggeringOperation.undo (monitor, info);
if (!status.isOK ()) {
this.children = childrenToRestore;
}this.history.closeOperation (status.isOK (), false, 2);
return status;
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.commands.ExecutionException)) {
this.children = childrenToRestore;
this.history.closeOperation (false, false, 2);
throw e;
} else {
throw e;
}
}
}return org.eclipse.core.commands.operations.IOperationHistory.OPERATION_INVALID_STATUS;
}, "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable");
Clazz.defineMethod (c$, "canUndo", 
function () {
if (this.triggeringOperation != null) {
return this.triggeringOperation.canUndo ();
}return false;
});
Clazz.defineMethod (c$, "canExecute", 
function () {
if (this.triggeringOperation != null) {
return this.triggeringOperation.canExecute ();
}return false;
});
Clazz.defineMethod (c$, "canRedo", 
function () {
if (this.triggeringOperation != null) {
return this.triggeringOperation.canRedo ();
}return false;
});
Clazz.defineMethod (c$, "dispose", 
function () {
for (var i = 0; i < this.children.size (); i++) {
((this.children.get (i))).dispose ();
}
if (this.triggeringOperation != null) {
this.triggeringOperation.dispose ();
}});
Clazz.defineMethod (c$, "recomputeContexts", 
($fz = function () {
var allContexts =  new java.util.ArrayList ();
if (this.triggeringOperation != null) {
var contexts = this.triggeringOperation.getContexts ();
for (var i = 0; i < contexts.length; i++) allContexts.add (contexts[i]);

}for (var i = 0; i < this.children.size (); i++) {
var contexts = (this.children.get (i)).getContexts ();
for (var j = 0; j < contexts.length; j++) {
if (!allContexts.contains (contexts[j])) {
allContexts.add (contexts[j]);
}}
}
this.contexts = allContexts;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "removeAllChildren", 
($fz = function () {
var nonTriggers = this.children.toArray ( new Array (this.children.size ()));
for (var i = 0; i < nonTriggers.length; i++) {
this.children.remove (nonTriggers[i]);
nonTriggers[i].dispose ();
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getTriggeringOperation", 
function () {
return this.triggeringOperation;
});
Clazz.defineMethod (c$, "getAffectedObjects", 
function () {
if (Clazz.instanceOf (this.triggeringOperation, org.eclipse.core.commands.operations.IAdvancedUndoableOperation)) return (this.triggeringOperation).getAffectedObjects ();
return null;
});
Clazz.defineMethod (c$, "aboutToNotify", 
function (event) {
if (Clazz.instanceOf (this.triggeringOperation, org.eclipse.core.commands.operations.IAdvancedUndoableOperation)) (this.triggeringOperation).aboutToNotify (event);
}, "org.eclipse.core.commands.operations.OperationHistoryEvent");
Clazz.defineMethod (c$, "computeUndoableStatus", 
function (monitor) {
if (Clazz.instanceOf (this.triggeringOperation, org.eclipse.core.commands.operations.IAdvancedUndoableOperation)) try {
return (this.triggeringOperation).computeUndoableStatus (monitor);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.OperationCanceledException)) {
return org.eclipse.core.runtime.Status.CANCEL_STATUS;
} else {
throw e;
}
}
return org.eclipse.core.runtime.Status.OK_STATUS;
}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "computeRedoableStatus", 
function (monitor) {
if (Clazz.instanceOf (this.triggeringOperation, org.eclipse.core.commands.operations.IAdvancedUndoableOperation)) try {
return (this.triggeringOperation).computeRedoableStatus (monitor);
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.OperationCanceledException)) {
return org.eclipse.core.runtime.Status.CANCEL_STATUS;
} else {
throw e;
}
}
return org.eclipse.core.runtime.Status.OK_STATUS;
}, "org.eclipse.core.runtime.IProgressMonitor");
});
