Clazz.declarePackage ("org.eclipse.core.commands.operations");
Clazz.load (["org.eclipse.core.commands.operations.IOperationHistory", "java.util.ArrayList", "$.Collections", "$.HashMap"], "org.eclipse.core.commands.operations.DefaultOperationHistory", ["java.lang.IllegalStateException", "org.eclipse.core.commands.ExecutionException", "org.eclipse.core.commands.operations.OperationHistoryEvent", "org.eclipse.core.internal.commands.util.Assert", "org.eclipse.core.runtime.Status"], function () {
c$ = Clazz.decorateAsClass (function () {
this.approvers = null;
this.limits = null;
this.listeners = null;
this.redoList = null;
this.undoList = null;
this.undoRedoHistoryLock = null;
this.openComposite = null;
this.openCompositeLock = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.commands.operations, "DefaultOperationHistory", null, org.eclipse.core.commands.operations.IOperationHistory);
Clazz.prepareFields (c$, function () {
this.approvers = java.util.Collections.synchronizedList ( new java.util.ArrayList ());
this.limits = java.util.Collections.synchronizedMap ( new java.util.HashMap ());
this.listeners = java.util.Collections.synchronizedList ( new java.util.ArrayList ());
this.redoList = java.util.Collections.synchronizedList ( new java.util.ArrayList ());
this.undoList = java.util.Collections.synchronizedList ( new java.util.ArrayList ());
this.undoRedoHistoryLock =  new Object ();
this.openCompositeLock =  new Object ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "add", 
function (operation) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (operation);
{
if (this.openComposite != null && this.openComposite !== operation) {
this.openComposite.add (operation);
return ;
}}if (this.checkUndoLimit (operation)) {
{
this.undoList.add (operation);
}this.notifyAdd (operation);
var contexts = operation.getContexts ();
for (var i = 0; i < contexts.length; i++) {
this.flushRedo (contexts[i]);
}
}}, "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.overrideMethod (c$, "addOperationApprover", 
function (approver) {
this.approvers.add (approver);
}, "org.eclipse.core.commands.operations.IOperationApprover");
Clazz.overrideMethod (c$, "addOperationHistoryListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.core.commands.operations.IOperationHistoryListener");
Clazz.overrideMethod (c$, "canRedo", 
function (context) {
var operation = this.getRedoOperation (context);
return (operation != null && operation.canRedo ());
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.overrideMethod (c$, "canUndo", 
function (context) {
var operation = this.getUndoOperation (context);
return (operation != null && operation.canUndo ());
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "checkRedoLimit", 
($fz = function (operation) {
var contexts = operation.getContexts ();
for (var i = 0; i < contexts.length; i++) {
var limit = this.getLimit (contexts[i]);
if (limit > 0) {
this.forceRedoLimit (contexts[i], limit - 1);
} else {
operation.removeContext (contexts[i]);
}}
return operation.getContexts ().length > 0;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "checkUndoLimit", 
($fz = function (operation) {
var contexts = operation.getContexts ();
for (var i = 0; i < contexts.length; i++) {
var limit = this.getLimit (contexts[i]);
if (limit > 0) {
this.forceUndoLimit (contexts[i], limit - 1);
} else {
operation.removeContext (contexts[i]);
}}
return operation.getContexts ().length > 0;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.overrideMethod (c$, "dispose", 
function (context, flushUndo, flushRedo, flushContext) {
if (flushContext) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_DISPOSE) {
System.out.print ("OPERATIONHISTORY >>> Flushing context ");
System.out.print (context);
System.out.println ();
}this.flushUndo (context);
this.flushRedo (context);
this.limits.remove (context);
return ;
}if (flushUndo) this.flushUndo (context);
if (flushRedo) this.flushRedo (context);
}, "org.eclipse.core.commands.operations.IUndoContext,~B,~B,~B");
Clazz.defineMethod (c$, "doRedo", 
($fz = function (monitor, info, operation) {
var status = this.getRedoApproval (operation, info);
if (status.isOK ()) {
this.notifyAboutToRedo (operation);
try {
status = operation.redo (monitor, info);
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.OperationCanceledException)) {
var e = e$$;
{
status = org.eclipse.core.runtime.Status.CANCEL_STATUS;
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.commands.ExecutionException)) {
var e = e$$;
{
this.notifyNotOK (operation);
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> ExecutionException while redoing ");
System.out.print (operation);
System.out.println ();
}throw e;
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
this.notifyNotOK (operation);
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> Exception while redoing ");
System.out.print (operation);
System.out.println ();
}throw  new org.eclipse.core.commands.ExecutionException ("While redoing the operation, an exception occurred", e);
}
} else {
throw e$$;
}
}
}if (status.isOK ()) {
var addToUndoStack = operation.canUndo ();
{
this.redoList.remove (operation);
if (addToUndoStack && this.checkUndoLimit (operation)) {
this.undoList.add (operation);
}}if (!addToUndoStack) {
operation.dispose ();
}this.notifyRedone (operation);
} else {
this.notifyNotOK (operation);
}return status;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable,org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "doUndo", 
($fz = function (monitor, info, operation) {
var status = this.getUndoApproval (operation, info);
if (status.isOK ()) {
this.notifyAboutToUndo (operation);
try {
status = operation.undo (monitor, info);
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.OperationCanceledException)) {
var e = e$$;
{
status = org.eclipse.core.runtime.Status.CANCEL_STATUS;
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.commands.ExecutionException)) {
var e = e$$;
{
this.notifyNotOK (operation);
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> ExecutionException while undoing ");
System.out.print (operation);
System.out.println ();
}throw e;
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
this.notifyNotOK (operation);
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> Exception while undoing ");
System.out.print (operation);
System.out.println ();
}throw  new org.eclipse.core.commands.ExecutionException ("While undoing the operation, an exception occurred", e);
}
} else {
throw e$$;
}
}
}if (status.isOK ()) {
var addToRedoStack = operation.canRedo ();
{
this.undoList.remove (operation);
if (addToRedoStack && this.checkRedoLimit (operation)) {
this.redoList.add (operation);
}}if (!addToRedoStack) {
operation.dispose ();
}this.notifyUndone (operation);
} else {
this.notifyNotOK (operation);
}return status;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable,org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.overrideMethod (c$, "execute", 
function (operation, monitor, info) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (operation);
if (!operation.canExecute ()) {
return org.eclipse.core.commands.operations.IOperationHistory.OPERATION_INVALID_STATUS;
}var merging = false;
{
if (this.openComposite != null) {
if (this.openComposite === operation) {
return org.eclipse.core.commands.operations.IOperationHistory.OPERATION_INVALID_STATUS;
}this.openComposite.add (operation);
merging = true;
}}if (!merging) this.notifyAboutToExecute (operation);
var status;
try {
status = operation.execute (monitor, info);
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.OperationCanceledException)) {
var e = e$$;
{
status = org.eclipse.core.runtime.Status.CANCEL_STATUS;
}
} else if (Clazz.instanceOf (e$$, org.eclipse.core.commands.ExecutionException)) {
var e = e$$;
{
this.notifyNotOK (operation);
throw e;
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
this.notifyNotOK (operation);
throw  new org.eclipse.core.commands.ExecutionException ("While executing the operation, an exception occurred", e);
}
} else {
throw e$$;
}
}
if (!merging) {
if (status.isOK ()) {
this.notifyDone (operation);
if (operation.canUndo ()) {
this.add (operation);
} else {
operation.dispose ();
}} else {
this.notifyNotOK (operation);
operation.dispose ();
}}return status;
}, "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable");
Clazz.defineMethod (c$, "filter", 
($fz = function (list, context) {
var filtered =  new java.util.ArrayList ();
var iterator = list.iterator ();
{
while (iterator.hasNext ()) {
var operation = iterator.next ();
if (operation.hasContext (context)) {
filtered.add (operation);
}}
}return filtered.toArray ( new Array (filtered.size ()));
}, $fz.isPrivate = true, $fz), "java.util.List,org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "flushRedo", 
($fz = function (context) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_DISPOSE) {
System.out.print ("OPERATIONHISTORY >>> Flushing redo history for ");
System.out.print (context);
System.out.println ();
}var filtered = this.filter (this.redoList, context);
for (var i = 0; i < filtered.length; i++) {
var operation = filtered[i];
if (context === org.eclipse.core.commands.operations.IOperationHistory.GLOBAL_UNDO_CONTEXT || operation.getContexts ().length == 1) {
this.redoList.remove (operation);
this.internalRemove (operation);
} else {
operation.removeContext (context);
}}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "flushUndo", 
($fz = function (context) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_DISPOSE) {
System.out.print ("OPERATIONHISTORY >>> Flushing undo history for ");
System.out.print (context);
System.out.println ();
}var filtered = this.filter (this.undoList, context);
for (var i = 0; i < filtered.length; i++) {
var operation = filtered[i];
if (context === org.eclipse.core.commands.operations.IOperationHistory.GLOBAL_UNDO_CONTEXT || operation.getContexts ().length == 1) {
this.undoList.remove (operation);
this.internalRemove (operation);
} else {
operation.removeContext (context);
}}
var endedComposite = null;
{
if (this.openComposite != null) {
if (this.openComposite.hasContext (context)) {
if (context === org.eclipse.core.commands.operations.IOperationHistory.GLOBAL_UNDO_CONTEXT || this.openComposite.getContexts ().length == 1) {
endedComposite = this.openComposite;
this.openComposite = null;
} else {
this.openComposite.removeContext (context);
}}}}if (endedComposite != null) {
this.notifyNotOK (endedComposite);
}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "forceRedoLimit", 
($fz = function (context, max) {
var filtered = this.filter (this.redoList, context);
var size = filtered.length;
if (size > 0) {
var index = 0;
while (size > max) {
var removed = filtered[index];
if (context === org.eclipse.core.commands.operations.IOperationHistory.GLOBAL_UNDO_CONTEXT || removed.getContexts ().length == 1) {
this.redoList.remove (removed);
this.internalRemove (removed);
} else {
removed.removeContext (context);
}size--;
index++;
}
}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoContext,~N");
Clazz.defineMethod (c$, "forceUndoLimit", 
($fz = function (context, max) {
var filtered = this.filter (this.undoList, context);
var size = filtered.length;
if (size > 0) {
var index = 0;
while (size > max) {
var removed = filtered[index];
if (context === org.eclipse.core.commands.operations.IOperationHistory.GLOBAL_UNDO_CONTEXT || removed.getContexts ().length == 1) {
this.undoList.remove (removed);
this.internalRemove (removed);
} else {
removed.removeContext (context);
}size--;
index++;
}
}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoContext,~N");
Clazz.overrideMethod (c$, "getLimit", 
function (context) {
if (!this.limits.containsKey (context)) {
return 20;
}return ((this.limits.get (context))).intValue ();
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "getRedoApproval", 
($fz = function (operation, info) {
var approverArray = this.approvers.toArray ( new Array (this.approvers.size ()));
for (var i = 0; i < approverArray.length; i++) {
var approver = approverArray[i];
var approval = approver.proceedRedoing (operation, this, info);
if (!approval.isOK ()) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_APPROVAL) {
System.out.print ("OPERATIONHISTORY >>> Redo not approved by ");
System.out.print (approver);
System.out.print ("for operation ");
System.out.print (operation);
System.out.print (approval);
System.out.println ();
}return approval;
}}
return org.eclipse.core.runtime.Status.OK_STATUS;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.runtime.IAdaptable");
Clazz.overrideMethod (c$, "getRedoHistory", 
function (context) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (context);
return this.filter (this.redoList, context);
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.overrideMethod (c$, "getRedoOperation", 
function (context) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (context);
{
for (var i = this.redoList.size () - 1; i >= 0; i--) {
var operation = this.redoList.get (i);
if (operation.hasContext (context)) {
return operation;
}}
}return null;
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "getUndoApproval", 
($fz = function (operation, info) {
var approverArray = this.approvers.toArray ( new Array (this.approvers.size ()));
for (var i = 0; i < approverArray.length; i++) {
var approver = approverArray[i];
var approval = approver.proceedUndoing (operation, this, info);
if (!approval.isOK ()) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_APPROVAL) {
System.out.print ("OPERATIONHISTORY >>> Undo not approved by ");
System.out.print (approver);
System.out.print ("for operation ");
System.out.print (operation);
System.out.print (" with status ");
System.out.print (approval);
System.out.println ();
}return approval;
}}
return org.eclipse.core.runtime.Status.OK_STATUS;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.runtime.IAdaptable");
Clazz.overrideMethod (c$, "getUndoHistory", 
function (context) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (context);
return this.filter (this.undoList, context);
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.overrideMethod (c$, "getUndoOperation", 
function (context) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (context);
{
for (var i = this.undoList.size () - 1; i >= 0; i--) {
var operation = this.undoList.get (i);
if (operation.hasContext (context)) {
return operation;
}}
}return null;
}, "org.eclipse.core.commands.operations.IUndoContext");
Clazz.defineMethod (c$, "internalRemove", 
($fz = function (operation) {
operation.dispose ();
this.notifyRemoved (operation);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyListeners", 
($fz = function (event) {
this.preNotifyOperation (event.getOperation (), event);
var listenerArray = this.listeners.toArray ( new Array (this.listeners.size ()));
for (var i = 0; i < listenerArray.length; i++) try {
listenerArray[i].historyNotification (event);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.handleNotificationException (e);
} else {
throw e;
}
}

}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.OperationHistoryEvent");
Clazz.defineMethod (c$, "notifyAboutToExecute", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> ABOUT_TO_EXECUTE ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (1, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyAboutToRedo", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> ABOUT_TO_REDO ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (2, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyAboutToUndo", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> ABOUT_TO_UNDO ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (3, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyAdd", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> OPERATION_ADDED ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (5, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyDone", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> DONE ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (4, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyNotOK", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> OPERATION_NOT_OK ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (7, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyRedone", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> REDONE ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (9, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyRemoved", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> OPERATION_REMOVED ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (8, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyUndone", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> UNDONE ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (10, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "notifyChanged", 
($fz = function (operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_NOTIFICATION) {
System.out.print ("OPERATIONHISTORY >>> OPERATION_CHANGED ");
System.out.print (operation);
System.out.println ();
}this.notifyListeners ( new org.eclipse.core.commands.operations.OperationHistoryEvent (6, this, operation));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "preNotifyOperation", 
($fz = function (operation, event) {
if (Clazz.instanceOf (operation, org.eclipse.core.commands.operations.IAdvancedUndoableOperation)) {
try {
(operation).aboutToNotify (event);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.handleNotificationException (e);
} else {
throw e;
}
}
}}, $fz.isPrivate = true, $fz), "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.commands.operations.OperationHistoryEvent");
Clazz.overrideMethod (c$, "redo", 
function (context, monitor, info) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (context);
var operation = this.getRedoOperation (context);
if (operation == null) return org.eclipse.core.commands.operations.IOperationHistory.NOTHING_TO_REDO_STATUS;
if (!operation.canRedo ()) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> Redo operation not valid - ");
System.out.print (operation);
System.out.println ();
}return org.eclipse.core.commands.operations.IOperationHistory.OPERATION_INVALID_STATUS;
}return this.doRedo (monitor, info, operation);
}, "org.eclipse.core.commands.operations.IUndoContext,org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable");
Clazz.overrideMethod (c$, "redoOperation", 
function (operation, monitor, info) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (operation);
var status;
if (operation.canRedo ()) {
status = this.getRedoApproval (operation, info);
if (status.isOK ()) {
status = this.doRedo (monitor, info, operation);
}} else {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> Redo operation not valid - ");
System.out.print (operation);
System.out.println ();
}status = org.eclipse.core.commands.operations.IOperationHistory.OPERATION_INVALID_STATUS;
}return status;
}, "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable");
Clazz.overrideMethod (c$, "removeOperationApprover", 
function (approver) {
this.approvers.remove (approver);
}, "org.eclipse.core.commands.operations.IOperationApprover");
Clazz.overrideMethod (c$, "removeOperationHistoryListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.core.commands.operations.IOperationHistoryListener");
Clazz.overrideMethod (c$, "replaceOperation", 
function (operation, replacements) {
var inUndo = false;
{
var index = this.undoList.indexOf (operation);
if (index > -1) {
inUndo = true;
this.undoList.remove (operation);
var allContexts =  new java.util.ArrayList (replacements.length);
for (var i = 0; i < replacements.length; i++) {
var opContexts = replacements[i].getContexts ();
for (var j = 0; j < opContexts.length; j++) {
allContexts.add (opContexts[j]);
}
this.undoList.add (index, replacements[i]);
}
for (var i = 0; i < allContexts.size (); i++) {
var context = allContexts.get (i);
this.forceUndoLimit (context, this.getLimit (context));
}
}}if (inUndo) {
this.internalRemove (operation);
for (var i = 0; i < replacements.length; i++) {
this.notifyAdd (replacements[i]);
}
return ;
}{
var index = this.redoList.indexOf (operation);
if (index == -1) return ;
var allContexts =  new java.util.ArrayList (replacements.length);
this.redoList.remove (operation);
for (var i = 0; i < replacements.length; i++) {
var opContexts = replacements[i].getContexts ();
for (var j = 0; j < opContexts.length; j++) {
allContexts.add (opContexts[j]);
}
this.redoList.add (index, replacements[i]);
}
for (var i = 0; i < allContexts.size (); i++) {
var context = allContexts.get (i);
this.forceRedoLimit (context, this.getLimit (context));
}
}this.internalRemove (operation);
for (var i = 0; i < replacements.length; i++) this.notifyAdd (replacements[i]);

}, "org.eclipse.core.commands.operations.IUndoableOperation,~A");
Clazz.overrideMethod (c$, "setLimit", 
function (context, limit) {
org.eclipse.core.internal.commands.util.Assert.isTrue (limit >= 0);
org.eclipse.core.internal.commands.util.Assert.isNotNull (context);
this.limits.put (context,  new Integer (limit));
this.forceUndoLimit (context, limit);
this.forceRedoLimit (context, limit);
}, "org.eclipse.core.commands.operations.IUndoContext,~N");
Clazz.overrideMethod (c$, "undo", 
function (context, monitor, info) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (context);
var operation = this.getUndoOperation (context);
if (operation == null) return org.eclipse.core.commands.operations.IOperationHistory.NOTHING_TO_UNDO_STATUS;
if (!operation.canUndo ()) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> Undo operation not valid - ");
System.out.print (operation);
System.out.println ();
}return org.eclipse.core.commands.operations.IOperationHistory.OPERATION_INVALID_STATUS;
}return this.doUndo (monitor, info, operation);
}, "org.eclipse.core.commands.operations.IUndoContext,org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable");
Clazz.overrideMethod (c$, "undoOperation", 
function (operation, monitor, info) {
org.eclipse.core.internal.commands.util.Assert.isNotNull (operation);
var status;
if (operation.canUndo ()) {
status = this.getUndoApproval (operation, info);
if (status.isOK ()) {
status = this.doUndo (monitor, info, operation);
}} else {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> Undo operation not valid - ");
System.out.print (operation);
System.out.println ();
}status = org.eclipse.core.commands.operations.IOperationHistory.OPERATION_INVALID_STATUS;
}return status;
}, "org.eclipse.core.commands.operations.IUndoableOperation,org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IAdaptable");
Clazz.overrideMethod (c$, "openOperation", 
function (operation, mode) {
{
if (this.openComposite != null && this.openComposite !== operation) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> Open operation called while another operation is open.  old: ");
System.out.print (this.openComposite);
System.out.print ("new:  ");
System.out.print (operation);
System.out.println ();
}throw  new IllegalStateException ("Cannot open an operation while one is already open");
}this.openComposite = operation;
}if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_OPENOPERATION) {
System.out.print ("OPERATIONHISTORY >>> Opening operation ");
System.out.print (this.openComposite);
System.out.println ();
}if (mode == 1) {
this.notifyAboutToExecute (this.openComposite);
}}, "org.eclipse.core.commands.operations.ICompositeOperation,~N");
Clazz.overrideMethod (c$, "closeOperation", 
function (operationOK, addToHistory, mode) {
var endedComposite = null;
{
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
if (this.openComposite == null) {
System.out.print ("OPERATIONHISTORY >>> Attempted to close operation when none was open ");
System.out.println ();
return ;
}}if (this.openComposite != null) {
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_OPENOPERATION) {
System.out.print ("OPERATIONHISTORY >>> Closing operation ");
System.out.print (this.openComposite);
System.out.println ();
}endedComposite = this.openComposite;
this.openComposite = null;
}}if (endedComposite != null) {
if (operationOK) {
if (mode == 1) this.notifyDone (endedComposite);
if (addToHistory) this.add (endedComposite);
} else {
if (mode == 1) this.notifyNotOK (endedComposite);
}}}, "~B,~B,~N");
Clazz.overrideMethod (c$, "operationChanged", 
function (operation) {
if (this.undoList.contains (operation) || this.redoList.contains (operation)) {
this.notifyChanged (operation);
}}, "org.eclipse.core.commands.operations.IUndoableOperation");
Clazz.defineMethod (c$, "handleNotificationException", 
($fz = function (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.OperationCanceledException)) return ;
if (org.eclipse.core.commands.operations.DefaultOperationHistory.DEBUG_OPERATION_HISTORY_UNEXPECTED) {
System.out.print ("OPERATIONHISTORY >>> Exception during notification callback ");
System.out.print (e);
System.out.println ();
}e.printStackTrace ();
}, $fz.isPrivate = true, $fz), "Throwable");
Clazz.defineStatics (c$,
"DEBUG_OPERATION_HISTORY_NOTIFICATION", false,
"DEBUG_OPERATION_HISTORY_UNEXPECTED", false,
"DEBUG_OPERATION_HISTORY_DISPOSE", false,
"DEBUG_OPERATION_HISTORY_OPENOPERATION", false,
"DEBUG_OPERATION_HISTORY_APPROVAL", false,
"DEFAULT_LIMIT", 20);
});
