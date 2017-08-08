Clazz.declarePackage ("java.awt");
Clazz.load (["java.lang.Enum", "java.awt.Window", "java.util.ArrayList"], "java.awt.Dialog", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "$.Long", "$.Thread", "java.util.LinkedList", "java.awt.Conditional", "$.EventQueue", "$.Frame", "$.IllegalComponentStateException", "$.ModalEventFilter", "$.Toolkit", "java.awt.event.ComponentEvent", "sun.awt.AppContext", "$.PeerEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.blockedWindows = null;
this.resizable = true;
this.undecorated = false;
this.initialized = false;
this.modal = false;
this.modalityType = null;
this.title = null;
this.modalFilter = null;
this.isInHide = false;
this.isInDispose = false;
Clazz.instantialize (this, arguments);
}, java.awt, "Dialog", java.awt.Window);
Clazz.prepareFields (c$, function () {
this.blockedWindows =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, "", false);
}, "java.awt.Frame");
Clazz.makeConstructor (c$, 
function (owner, modal) {
this.construct (owner, "", modal);
}, "java.awt.Frame,~B");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "java.awt.Frame,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
this.construct (owner, title, modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Frame,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
this.construct (owner, title, modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS, gc);
}, "java.awt.Frame,~S,~B,java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, "", false);
}, "java.awt.Dialog");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "java.awt.Dialog,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
this.construct (owner, title, modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Dialog,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
this.construct (owner, title, modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS, gc);
}, "java.awt.Dialog,~S,~B,java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, null, java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Window");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Window,~S");
Clazz.makeConstructor (c$, 
function (owner, modalityType) {
this.construct (owner, null, modalityType);
}, "java.awt.Window,java.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType) {
Clazz.superConstructor (this, java.awt.Dialog, [owner]);
if ((owner != null) && !(Clazz.instanceOf (owner, java.awt.Frame)) && !(Clazz.instanceOf (owner, java.awt.Dialog))) {
throw  new IllegalArgumentException ("Wrong parent window");
}this.title = title;
this.setModalityType (modalityType);
this.initialized = true;
}, "java.awt.Window,~S,java.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType, gc) {
Clazz.superConstructor (this, java.awt.Dialog, [owner, gc]);
if ((owner != null) && !(Clazz.instanceOf (owner, java.awt.Frame)) && !(Clazz.instanceOf (owner, java.awt.Dialog))) {
throw  new IllegalArgumentException ("wrong owner window");
}this.title = title;
this.setModalityType (modalityType);
this.initialized = true;
}, "java.awt.Window,~S,java.awt.Dialog.ModalityType,java.awt.GraphicsConfiguration");
Clazz.overrideMethod (c$, "constructComponentName", 
function () {
return "dialog" + java.awt.Dialog.$nameCounter++;
});
Clazz.defineMethod (c$, "addNotify", 
function () {
{
this.getOrCreatePeer ();
if (this.parent != null) {
this.parent.addNotify ();
}Clazz.superCall (this, java.awt.Dialog, "addNotify", []);
}});
Clazz.overrideMethod (c$, "getOrCreatePeer", 
function () {
return (this.ui == null ? null : this.peer == null ? (this.peer = this.getToolkit ().createDialog (this)) : this.peer);
});
Clazz.defineMethod (c$, "isModal", 
function () {
return this.isModal_NoClientCode ();
});
Clazz.defineMethod (c$, "isModal_NoClientCode", 
function () {
return this.modalityType !== java.awt.Dialog.ModalityType.MODELESS;
});
Clazz.defineMethod (c$, "setModal", 
function (modal) {
this.modal = modal;
this.setModalityType (modal ? java.awt.Dialog.DEFAULT_MODALITY_TYPE : java.awt.Dialog.ModalityType.MODELESS);
}, "~B");
Clazz.defineMethod (c$, "getModalityType", 
function () {
return this.modalityType;
});
Clazz.defineMethod (c$, "setModalityType", 
function (type) {
if (type == null) {
type = java.awt.Dialog.ModalityType.MODELESS;
}if (!java.awt.Toolkit.getDefaultToolkit ().isModalityTypeSupported (type)) {
type = java.awt.Dialog.ModalityType.MODELESS;
}if (this.modalityType === type) {
return;
}this.checkModalityPermission (type);
this.modalityType = type;
this.modal = (this.modalityType !== java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Dialog.ModalityType");
Clazz.defineMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz.defineMethod (c$, "setTitle", 
function (title) {
var oldTitle = this.title;
{
this.title = title;
var peer = this.peer;
if (peer != null) {
peer.setTitle (title);
}}this.firePropertyChangeObject ("title", oldTitle, title);
}, "~S");
Clazz.defineMethod (c$, "conditionalShow", 
 function (toFocus, time) {
var retval;
java.awt.Window.closeSplashScreen ();
this.validate ();
if (this.visible) {
this.toFront ();
retval = false;
} else {
retval = true;
this.showSAEM ();
this.repaint ();
if (!this.isModal ()) {
java.awt.Dialog.checkShouldBeBlocked (this);
} else {
java.awt.Dialog.modalDialogs.add (this);
this.modalShow ();
}if (toFocus != null && time != null && this.isFocusable () && this.isEnabled () && !this.isModalBlocked ()) {
}if (this.isModalBlocked ()) {
this.modalBlocker.toFront ();
}for (var i = 0; i < this.ownedWindowList.size (); i++) {
var child = this.ownedWindowList.elementAt (i);
if ((child != null) && child.showWithParent) {
child.show ();
child.showWithParent = false;
}}
java.awt.Window.updateChildFocusableWindowState (this);
this.createHierarchyEvents (1400, this, this.parent, 4, java.awt.Toolkit.enabledOnToolkit (32768));
if (this.componentListener != null || (this.eventMask & 1) != 0 || java.awt.Toolkit.enabledOnToolkit (1)) {
var e =  new java.awt.event.ComponentEvent (this, 102);
java.awt.Toolkit.getEventQueue ().postEvent (e);
}}if (retval && (this.state & 1) == 0) {
this.postWindowEvent (200);
this.state |= 1;
}return retval;
}, "java.awt.Component,Long");
Clazz.defineMethod (c$, "show", 
function () {
if (!this.initialized) {
throw  new IllegalStateException ("The dialog component has not been initialized properly");
}this.repaint ();
this.beforeFirstShow = false;
if (!this.isModal ()) {
this.conditionalShow (null, null);
} else {
var time =  new Long (0);
var predictedFocusOwner = null;
try {
if (this.conditionalShow (predictedFocusOwner, time)) {
this.modalFilter = java.awt.ModalEventFilter.createFilterForDialog (this);
var pumpEventsForFilter = ((Clazz.isClassDefined ("java.awt.Dialog$1") ? 0 : java.awt.Dialog.$Dialog$1$ ()), Clazz.innerTypeInstance (java.awt.Dialog$1, this, null));
if (this.modalityType === java.awt.Dialog.ModalityType.TOOLKIT_MODAL) {
var appContext = this.getAppContext ();
var eventQueue = appContext.get (sun.awt.AppContext.EVENT_QUEUE_KEY);
var edt = eventQueue.getDispatchThread ();
edt.addEventFilter (this.modalFilter);
}this.modalityPushed ();
try {
if (java.awt.EventQueue.isDispatchThread ()) {
pumpEventsForFilter.run ();
} else {
{
java.awt.Toolkit.getEventQueue ().postEvent ( new sun.awt.PeerEvent (this, pumpEventsForFilter, 1));
while (this.windowClosingException == null) {
try {
this.getTreeLock ().wait ();
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
break;
} else {
throw e;
}
}
}
}}} finally {
this.modalityPopped ();
}
if (this.modalityType === java.awt.Dialog.ModalityType.TOOLKIT_MODAL) {
var eventQueue = this.appContext.get (sun.awt.AppContext.EVENT_QUEUE_KEY);
var edt = eventQueue.getDispatchThread ();
edt.removeEventFilter (this.modalFilter);
}if (this.windowClosingException != null) {
this.windowClosingException.fillInStackTrace ();
throw this.windowClosingException;
}}} finally {
if (predictedFocusOwner != null) {
}}
}});
Clazz.defineMethod (c$, "modalityPushed", 
function () {
});
Clazz.defineMethod (c$, "modalityPopped", 
function () {
});
Clazz.defineMethod (c$, "interruptBlocking", 
function () {
if (this.isModal ()) {
this.disposeImpl ();
} else if (this.windowClosingException != null) {
this.windowClosingException.fillInStackTrace ();
this.windowClosingException.printStackTrace ();
this.windowClosingException = null;
}});
Clazz.defineMethod (c$, "hideAndDisposePreHandler", 
 function () {
this.isInHide = true;
this.modalHide ();
if (this.modalFilter != null) {
this.modalFilter.disable ();
}java.awt.Dialog.modalDialogs.remove (this);
});
Clazz.defineMethod (c$, "hideAndDisposeHandler", 
 function () {
this.isInHide = false;
});
Clazz.defineMethod (c$, "hide", 
function () {
this.hideAndDisposePreHandler ();
Clazz.superCall (this, java.awt.Dialog, "hide", []);
if (!this.isInDispose) {
this.hideAndDisposeHandler ();
}});
Clazz.defineMethod (c$, "doDispose", 
function () {
this.isInDispose = true;
Clazz.superCall (this, java.awt.Dialog, "doDispose", []);
this.hideAndDisposeHandler ();
this.isInDispose = false;
});
Clazz.defineMethod (c$, "isResizable", 
function () {
return this.resizable;
});
Clazz.defineMethod (c$, "setResizable", 
function (resizable) {
var testvalid = false;
{
this.resizable = resizable;
var peer = this.peer;
if (peer != null) {
peer.setResizable (resizable);
testvalid = true;
}}if (testvalid) {
this.invalidateIfValid ();
}}, "~B");
Clazz.defineMethod (c$, "setUndecorated", 
function (undecorated) {
{
if (this.isDisplayable ()) {
throw  new java.awt.IllegalComponentStateException ("The dialog is displayable.");
}this.undecorated = undecorated;
}}, "~B");
Clazz.defineMethod (c$, "isUndecorated", 
function () {
return this.undecorated;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var str = Clazz.superCall (this, java.awt.Dialog, "paramString", []) + "," + this.modalityType;
if (this.title != null) {
str += ",title=" + this.title;
}return str;
});
Clazz.defineMethod (c$, "modalShow", 
function () {
var blockers =  new java.util.ArrayList ();
for (var d, $d = java.awt.Dialog.modalDialogs.iterator (); $d.hasNext () && ((d = $d.next ()) || true);) {
if (d.shouldBlock (this)) {
var w = d;
while ((w != null) && (w !== this)) {
w = (w.getOwner_NoClientCode ());
}
if ((w === this) || !this.shouldBlock (d) || (this.modalityType.compareTo (d.getModalityType ()) < 0)) {
blockers.add (d);
}}}
for (var i = 0; i < blockers.size (); i++) {
var blocker = blockers.get (i);
if (blocker.isModalBlocked ()) {
var blockerBlocker = blocker.getModalBlocker ();
if (!blockers.contains (blockerBlocker)) {
blockers.add (i + 1, blockerBlocker);
}}}
if (blockers.size () > 0) {
blockers.get (0).blockWindow (this);
}var blockersHierarchies =  new java.util.ArrayList (blockers);
var k = 0;
while (k < blockersHierarchies.size ()) {
var w = blockersHierarchies.get (k);
var ownedWindows = w.getOwnedWindows_NoClientCode ();
for (var win, $win = 0, $$win = ownedWindows; $win < $$win.length && ((win = $$win[$win]) || true); $win++) {
blockersHierarchies.add (win);
}
k++;
}
var toBlock =  new java.util.LinkedList ();
var unblockedWindows = java.awt.Window.getAllUnblockedWindows ();
for (var w, $w = unblockedWindows.iterator (); $w.hasNext () && ((w = $w.next ()) || true);) {
if (this.shouldBlock (w) && !blockersHierarchies.contains (w)) {
if ((Clazz.instanceOf (w, java.awt.Dialog)) && (w).isModal_NoClientCode ()) {
var wd = w;
if (wd.shouldBlock (this) && (java.awt.Dialog.modalDialogs.indexOf (wd) > java.awt.Dialog.modalDialogs.indexOf (this))) {
continue;
}}toBlock.add (w);
}}
this.blockWindows (toBlock);
if (!this.isModalBlocked ()) {
this.updateChildrenBlocking ();
}});
Clazz.defineMethod (c$, "modalHide", 
function () {
var save =  new java.util.ArrayList ();
var blockedWindowsCount = this.blockedWindows.size ();
for (var i = 0; i < blockedWindowsCount; i++) {
var w = this.blockedWindows.get (0);
save.add (w);
this.unblockWindow (w);
}
for (var i = 0; i < blockedWindowsCount; i++) {
var w = save.get (i);
if ((Clazz.instanceOf (w, java.awt.Dialog)) && (w).isModal_NoClientCode ()) {
var d = w;
d.modalShow ();
} else {
java.awt.Dialog.checkShouldBeBlocked (w);
}}
});
Clazz.defineMethod (c$, "shouldBlock", 
function (w) {
if (!this.isVisible_NoClientCode () || (!w.isVisible_NoClientCode () && !w.isInShow) || this.isInHide || (w === this) || !this.isModal_NoClientCode ()) {
return false;
}if ((Clazz.instanceOf (w, java.awt.Dialog)) && (w).isInHide) {
return false;
}var blockerToCheck = this;
while (blockerToCheck != null) {
var c = w;
while ((c != null) && (c !== blockerToCheck)) {
c = c.getParent_NoClientCode ();
}
if (c === blockerToCheck) {
return false;
}blockerToCheck = blockerToCheck.getModalBlocker ();
}
switch (this.modalityType) {
case java.awt.Dialog.ModalityType.MODELESS:
return false;
case java.awt.Dialog.ModalityType.DOCUMENT_MODAL:
if (w.isModalExcluded (java.awt.Dialog.ModalExclusionType.APPLICATION_EXCLUDE)) {
var c = this;
while ((c != null) && (c !== w)) {
c = c.getParent_NoClientCode ();
}
return c === w;
} else {
return this.getDocumentRoot () === w.getDocumentRoot ();
}case java.awt.Dialog.ModalityType.APPLICATION_MODAL:
return !w.isModalExcluded (java.awt.Dialog.ModalExclusionType.APPLICATION_EXCLUDE) && (this.appContext === w.appContext);
case java.awt.Dialog.ModalityType.TOOLKIT_MODAL:
return !w.isModalExcluded (java.awt.Dialog.ModalExclusionType.TOOLKIT_EXCLUDE);
}
return false;
}, "java.awt.Window");
Clazz.defineMethod (c$, "blockWindow", 
function (w) {
if (!w.isModalBlocked ()) {
w.setModalBlocked (this, true, true);
this.blockedWindows.add (w);
}}, "java.awt.Window");
Clazz.defineMethod (c$, "blockWindows", 
function (toBlock) {
var dpeer = this.peer;
if (dpeer == null) {
return;
}var it = toBlock.iterator ();
while (it.hasNext ()) {
var w = it.next ();
if (!w.isModalBlocked ()) {
w.setModalBlocked (this, true, false);
} else {
it.remove ();
}}
dpeer.blockWindows (toBlock);
this.blockedWindows.addAll (toBlock);
}, "java.util.List");
Clazz.defineMethod (c$, "unblockWindow", 
function (w) {
if (w.isModalBlocked () && this.blockedWindows.contains (w)) {
this.blockedWindows.remove (w);
w.setModalBlocked (this, false, true);
}}, "java.awt.Window");
c$.checkShouldBeBlocked = Clazz.defineMethod (c$, "checkShouldBeBlocked", 
function (w) {
{
for (var i = 0; i < java.awt.Dialog.modalDialogs.size (); i++) {
var modalDialog = java.awt.Dialog.modalDialogs.get (i);
if (modalDialog.shouldBlock (w)) {
modalDialog.blockWindow (w);
break;
}}
}}, "java.awt.Window");
Clazz.defineMethod (c$, "checkModalityPermission", 
 function (mt) {
}, "java.awt.Dialog.ModalityType");
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.Dialog, "ModalityType", Enum);
Clazz.defineEnumConstant (c$, "MODELESS", 0, []);
Clazz.defineEnumConstant (c$, "DOCUMENT_MODAL", 1, []);
Clazz.defineEnumConstant (c$, "APPLICATION_MODAL", 2, []);
Clazz.defineEnumConstant (c$, "TOOLKIT_MODAL", 3, []);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.Dialog, "ModalExclusionType", Enum);
Clazz.defineEnumConstant (c$, "NO_EXCLUDE", 0, []);
Clazz.defineEnumConstant (c$, "APPLICATION_EXCLUDE", 1, []);
Clazz.defineEnumConstant (c$, "TOOLKIT_EXCLUDE", 2, []);
c$ = Clazz.p0p ();
c$.$Dialog$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt, "Dialog$1", null, Runnable);
Clazz.defineMethod (c$, "run", 
function () {
var dispatchThread = Thread.currentThread ();
dispatchThread.pumpEventsForFilter (-1, ((Clazz.isClassDefined ("java.awt.Dialog$1$1") ? 0 : java.awt.Dialog.$Dialog$1$1$ ()), Clazz.innerTypeInstance (java.awt.Dialog$1$1, this, null)), this.b$["java.awt.Dialog"].modalFilter);
});
c$ = Clazz.p0p ();
};
c$.$Dialog$1$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt, "Dialog$1$1", null, java.awt.Conditional);
Clazz.overrideMethod (c$, "evaluate", 
function () {
{
return this.b$["java.awt.Dialog"].windowClosingException == null;
}});
c$ = Clazz.p0p ();
};
c$.modalDialogs = c$.prototype.modalDialogs =  new java.util.ArrayList ();
c$.DEFAULT_MODALITY_TYPE = c$.prototype.DEFAULT_MODALITY_TYPE = java.awt.Dialog.ModalityType.APPLICATION_MODAL;
Clazz.defineStatics (c$,
"$base", "dialog",
"$nameCounter", 0);
});
