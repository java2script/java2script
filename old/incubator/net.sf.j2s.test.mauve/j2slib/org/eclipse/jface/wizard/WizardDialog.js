Clazz.declarePackage ("org.eclipse.jface.wizard");
Clazz.load (["org.eclipse.jface.dialogs.IPageChangeProvider", "$.TitleAreaDialog", "org.eclipse.jface.wizard.IWizardContainer2", "$wt.widgets.Layout", "java.util.ArrayList", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.wizard.WizardDialog", ["java.lang.Boolean", "java.util.HashMap", "org.eclipse.jface.dialogs.ControlEnableState", "$.IDialogConstants", "$.MessageDialog", "$.PageChangedEvent", "org.eclipse.jface.operation.ModalContext", "org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.Assert", "$.SafeRunnable", "org.eclipse.jface.wizard.ProgressMonitorPart", "$wt.custom.BusyIndicator", "$wt.events.HelpListener", "$.SelectionAdapter", "$wt.graphics.Cursor", "$.Point", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Button", "$.Composite", "$.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.wizard = null;
this.createdWizards = null;
this.nestedWizards = null;
this.currentPage = null;
this.activeRunningOperations = 0;
this.pageMessage = null;
this.pageMessageType = 0;
this.pageDescription = null;
this.progressMonitorPart = null;
this.waitCursor = null;
this.arrowCursor = null;
this.windowClosingDialog = null;
this.backButton = null;
this.nextButton = null;
this.finishButton = null;
this.cancelButton = null;
this.helpButton = null;
this.cancelListener = null;
this.isMovingToPreviousPage = false;
this.pageContainer = null;
this.pageContainerLayout = null;
this.pageWidth = -1;
this.pageHeight = -1;
this.lockedUI = false;
this.pageChangedListeners = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.wizard.WizardDialog.PageContainerFillLayout")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.marginWidth = 5;
this.marginHeight = 5;
this.minimumWidth = 0;
this.minimumHeight = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.wizard.WizardDialog, "PageContainerFillLayout", $wt.widgets.Layout);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, org.eclipse.jface.wizard.WizardDialog.PageContainerFillLayout, []);
this.marginWidth = a;
this.marginHeight = b;
this.minimumWidth = c;
this.minimumHeight = d;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "computeSize", 
function (a, b, c, d) {
if (b != -1 && c != -1) return  new $wt.graphics.Point (b, c);
var e = null;
var f = a.getChildren ();
if (f.length > 0) {
e =  new $wt.graphics.Point (0, 0);
for (var g = 0; g < f.length; g++) {
var h = f[g].computeSize (b, c, d);
e.x = Math.max (e.x, h.x);
e.y = Math.max (e.y, h.y);
}
e.x = e.x + 2 * this.marginWidth;
e.y = e.y + 2 * this.marginHeight;
} else {
var g = a.getClientArea ();
e =  new $wt.graphics.Point (g.width, g.height);
}e.x = Math.max (e.x, this.minimumWidth);
e.y = Math.max (e.y, this.minimumHeight);
if (b != -1) e.x = b;
if (c != -1) e.y = c;
return e;
}, "$wt.widgets.Composite,~N,~N,~B");
Clazz.defineMethod (c$, "getClientArea", 
function (a) {
var b = a.getClientArea ();
b.x = b.x + this.marginWidth;
b.y = b.y + this.marginHeight;
b.width = b.width - 2 * this.marginWidth;
b.height = b.height - 2 * this.marginHeight;
return b;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "layout", 
function (a, b) {
var c = this.getClientArea (a);
var d = a.getChildren ();
for (var e = 0; e < d.length; e++) {
d[e].setBounds (c);
}
}, "$wt.widgets.Composite,~B");
Clazz.defineMethod (c$, "layoutPage", 
function (a) {
a.setBounds (this.getClientArea (a.getParent ()));
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "setPageLocation", 
function (a) {
a.setLocation (this.marginWidth, this.marginHeight);
}, "$wt.widgets.Control");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.wizard, "WizardDialog", org.eclipse.jface.dialogs.TitleAreaDialog, [org.eclipse.jface.wizard.IWizardContainer2, org.eclipse.jface.dialogs.IPageChangeProvider]);
Clazz.prepareFields (c$, function () {
this.createdWizards =  new java.util.ArrayList ();
this.nestedWizards =  new java.util.ArrayList ();
this.pageContainerLayout = Clazz.innerTypeInstance (org.eclipse.jface.wizard.WizardDialog.PageContainerFillLayout, this, null, 5, 5, 300, 225);
this.pageChangedListeners =  new org.eclipse.jface.util.ListenerList (3);
});
Clazz.makeConstructor (c$, 
function (parentShell, newWizard) {
Clazz.superConstructor (this, org.eclipse.jface.wizard.WizardDialog, [parentShell]);
this.setShellStyle (64 | 32 | 2048 | 65536 | 16 | org.eclipse.jface.window.Window.getDefaultOrientation ());
this.setWizard (newWizard);
this.cancelListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.wizard.WizardDialog$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.wizard, "WizardDialog$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["org.eclipse.jface.wizard.WizardDialog"].cancelPressed ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.wizard.WizardDialog$1, i$, v$);
}) (this, null);
}, "$wt.widgets.Shell,org.eclipse.jface.wizard.IWizard");
Clazz.defineMethod (c$, "aboutToStart", 
($fz = function (enableCancelButton) {
var savedState = null;
if (this.getShell () != null) {
var focusControl = this.getShell ().getDisplay ().getFocusControl ();
if (focusControl != null && focusControl.getShell () !== this.getShell ()) focusControl = null;
var needsProgressMonitor = this.wizard.needsProgressMonitor ();
this.cancelButton.removeSelectionListener (this.cancelListener);
var d = this.getShell ().getDisplay ();
this.waitCursor =  new $wt.graphics.Cursor (d, 1);
this.setDisplayCursor (this.waitCursor);
this.arrowCursor =  new $wt.graphics.Cursor (d, 0);
this.cancelButton.setCursor (this.arrowCursor);
savedState = this.saveUIState (needsProgressMonitor && enableCancelButton);
if (focusControl != null) savedState.put ("focusControl", focusControl);
if (needsProgressMonitor) {
this.progressMonitorPart.attachToCancelComponent (this.cancelButton);
this.progressMonitorPart.setVisible (true);
}}return savedState;
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "backPressed", 
function () {
var page = this.currentPage.getPreviousPage ();
if (page == null) return ;
this.isMovingToPreviousPage = true;
this.showPage (page);
});
Clazz.overrideMethod (c$, "buttonPressed", 
function (buttonId) {
switch (buttonId) {
case 17:
{
this.helpPressed ();
break;
}case 14:
{
this.backPressed ();
break;
}case 15:
{
this.nextPressed ();
break;
}case 16:
{
this.finishPressed ();
break;
}}
}, "~N");
Clazz.defineMethod (c$, "calculatePageSizeDelta", 
($fz = function (page) {
var pageControl = page.getControl ();
if (pageControl == null) return  new $wt.graphics.Point (0, 0);
var contentSize = pageControl.computeSize (-1, -1, true);
var rect = this.pageContainerLayout.getClientArea (this.pageContainer);
var containerSize =  new $wt.graphics.Point (rect.width, rect.height);
return  new $wt.graphics.Point (Math.max (0, contentSize.x - containerSize.x), Math.max (0, contentSize.y - containerSize.y));
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.wizard.IWizardPage");
Clazz.overrideMethod (c$, "cancelPressed", 
function () {
if (this.activeRunningOperations <= 0) {
this.setReturnCode (1);
this.close ();
} else {
this.cancelButton.setEnabled (false);
}});
Clazz.defineMethod (c$, "close", 
function () {
if (this.okToClose ()) return this.hardClose ();
return false;
});
Clazz.defineMethod (c$, "configureShell", 
function (newShell) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog, "configureShell", [newShell]);
newShell.addHelpListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.wizard.WizardDialog$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.wizard, "WizardDialog$2", null, $wt.events.HelpListener);
Clazz.overrideMethod (c$, "helpRequested", 
function (event) {
if (this.b$["org.eclipse.jface.wizard.WizardDialog"].currentPage != null) {
this.b$["org.eclipse.jface.wizard.WizardDialog"].currentPage.performHelp ();
}}, "$wt.events.HelpEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.wizard.WizardDialog$2, i$, v$);
}) (this, null));
}, "$wt.widgets.Shell");
Clazz.defineMethod (c$, "createButtonBar", 
function (parent) {
var composite = Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog, "createButtonBar", [parent]);
(composite.getLayout ()).makeColumnsEqualWidth = false;
return composite;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "createButtonsForButtonBar", 
function (parent) {
if (this.wizard.isHelpAvailable ()) {
this.helpButton = this.createButton (parent, 17, org.eclipse.jface.dialogs.IDialogConstants.HELP_LABEL, false);
}if (this.wizard.needsPreviousAndNextButtons ()) this.createPreviousAndNextButtons (parent);
this.finishButton = this.createButton (parent, 16, org.eclipse.jface.dialogs.IDialogConstants.FINISH_LABEL, true);
this.cancelButton = this.createCancelButton (parent);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createCancelButton", 
($fz = function (parent) {
(parent.getLayout ()).numColumns++;
var button =  new $wt.widgets.Button (parent, 8);
button.setText (org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL);
this.setButtonLayoutData (button);
button.setFont (parent.getFont ());
button.setData ( new Integer (1));
button.addSelectionListener (this.cancelListener);
return button;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getButton", 
function (id) {
if (id == 1) return this.cancelButton;
return Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog, "getButton", [id]);
}, "~N");
Clazz.defineMethod (c$, "createContents", 
function (parent) {
this.wizard.addPages ();
var contents = Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog, "createContents", [parent]);
this.createPageControls ();
this.showStartingPage ();
return contents;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createDialogArea", 
function (parent) {
var composite = Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog, "createDialogArea", [parent]);
this.pageContainer = this.createPageContainer (composite);
var gd =  new $wt.layout.GridData (1808);
gd.widthHint = this.pageWidth;
gd.heightHint = this.pageHeight;
this.pageContainer.setLayoutData (gd);
this.pageContainer.setFont (parent.getFont ());
var pmlayout =  new $wt.layout.GridLayout ();
pmlayout.numColumns = 1;
this.progressMonitorPart = this.createProgressMonitorPart (composite, pmlayout);
this.progressMonitorPart.setLayoutData ( new $wt.layout.GridData (768));
this.progressMonitorPart.setVisible (false);
var separator =  new $wt.widgets.Label (composite, 258);
separator.setLayoutData ( new $wt.layout.GridData (768));
org.eclipse.jface.dialogs.Dialog.applyDialogFont (this.progressMonitorPart);
return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createProgressMonitorPart", 
function (composite, pmlayout) {
return (function (i$, arg0, arg1, arg2, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.wizard.WizardDialog$3")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.currentTask = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.wizard, "WizardDialog$3", org.eclipse.jface.wizard.ProgressMonitorPart);
Clazz.defineMethod (c$, "setBlocked", 
function (reason) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog$3, "setBlocked", [reason]);
if (!this.b$["org.eclipse.jface.wizard.WizardDialog"].lockedUI) org.eclipse.jface.dialogs.Dialog.getBlockedHandler ().showBlocked (this.getShell (), this, reason, this.currentTask);
}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "clearBlocked", 
function () {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog$3, "clearBlocked", []);
if (!this.b$["org.eclipse.jface.wizard.WizardDialog"].lockedUI) org.eclipse.jface.dialogs.Dialog.getBlockedHandler ().clearBlocked ();
});
Clazz.defineMethod (c$, "beginTask", 
function (name, totalWork) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog$3, "beginTask", [name, totalWork]);
this.currentTask = name;
}, "~S,~N");
Clazz.defineMethod (c$, "setTaskName", 
function (name) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog$3, "setTaskName", [name]);
this.currentTask = name;
}, "~S");
Clazz.defineMethod (c$, "subTask", 
function (name) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog$3, "subTask", [name]);
if (this.currentTask == null) this.currentTask = name;
}, "~S");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.wizard.WizardDialog$3, i$, v$, arg0, arg1, arg2);
}) (this, composite, pmlayout, -1, null);
}, "$wt.widgets.Composite,$wt.layout.GridLayout");
Clazz.defineMethod (c$, "createPageContainer", 
($fz = function (parent) {
var result =  new $wt.widgets.Composite (parent, 0);
result.setLayout (this.pageContainerLayout);
return result;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createPageControls", 
($fz = function () {
this.wizard.createPageControls (this.pageContainer);
var pages = this.wizard.getPages ();
for (var i = 0; i < pages.length; i++) {
var page = pages[i];
if (page.getControl () != null) page.getControl ().setVisible (false);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createPreviousAndNextButtons", 
($fz = function (parent) {
(parent.getLayout ()).numColumns++;
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.numColumns = 0;
layout.marginWidth = 0;
layout.marginHeight = 0;
layout.horizontalSpacing = 0;
layout.verticalSpacing = 0;
composite.setLayout (layout);
var data =  new $wt.layout.GridData (68);
composite.setLayoutData (data);
composite.setFont (parent.getFont ());
this.backButton = this.createButton (composite, 14, org.eclipse.jface.dialogs.IDialogConstants.BACK_LABEL, false);
this.nextButton = this.createButton (composite, 15, org.eclipse.jface.dialogs.IDialogConstants.NEXT_LABEL, false);
return composite;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createWizardClosingDialog", 
($fz = function () {
var result =  new org.eclipse.jface.dialogs.MessageDialog (this.getShell (), org.eclipse.jface.resource.JFaceResources.getString ("WizardClosingDialog.title"), null, org.eclipse.jface.resource.JFaceResources.getString ("WizardClosingDialog.message"), 3, [org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL], 0);
return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "finishPressed", 
function () {
if (this.wizard.performFinish ()) {
for (var i = 0; i < this.nestedWizards.size () - 1; i++) {
(this.nestedWizards.get (i)).performFinish ();
}
this.setReturnCode (0);
this.hardClose ();
}});
Clazz.overrideMethod (c$, "getCurrentPage", 
function () {
return this.currentPage;
});
Clazz.defineMethod (c$, "getProgressMonitor", 
function () {
return this.progressMonitorPart;
});
Clazz.defineMethod (c$, "getWizard", 
function () {
return this.wizard;
});
Clazz.defineMethod (c$, "hardClose", 
($fz = function () {
for (var i = 0; i < this.createdWizards.size (); i++) {
var createdWizard = this.createdWizards.get (i);
createdWizard.dispose ();
createdWizard.setContainer (null);
}
return Clazz.superCall (this, org.eclipse.jface.wizard.WizardDialog, "close", []);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "helpPressed", 
function () {
if (this.currentPage != null) {
this.currentPage.performHelp ();
}});
Clazz.defineMethod (c$, "nextPressed", 
function () {
var page = this.currentPage.getNextPage ();
if (page == null) {
return ;
}this.showPage (page);
});
Clazz.defineMethod (c$, "okToClose", 
($fz = function () {
if (this.activeRunningOperations > 0) {
{
this.windowClosingDialog = this.createWizardClosingDialog ();
}this.windowClosingDialog.open ();
{
this.windowClosingDialog = null;
}return false;
}return this.wizard.performCancel ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "restoreEnableState", 
($fz = function (w, h, key) {
if (w != null) {
var b = h.get (key);
if (b != null) w.setEnabled (b.booleanValue ());
}}, $fz.isPrivate = true, $fz), "$wt.widgets.Control,java.util.Map,~S");
Clazz.defineMethod (c$, "restoreUIState", 
($fz = function (state) {
this.restoreEnableState (this.backButton, state, "back");
this.restoreEnableState (this.nextButton, state, "next");
this.restoreEnableState (this.finishButton, state, "finish");
this.restoreEnableState (this.cancelButton, state, "cancel");
this.restoreEnableState (this.helpButton, state, "help");
var pageValue = state.get ("page");
if (pageValue != null) (pageValue).restore ();
}, $fz.isPrivate = true, $fz), "java.util.Map");
Clazz.overrideMethod (c$, "run", 
function (fork, cancelable, runnable) {
var state = null;
if (this.activeRunningOperations == 0) state = this.aboutToStart (fork && cancelable);
this.activeRunningOperations++;
try {
if (!fork) this.lockedUI = true;
org.eclipse.jface.operation.ModalContext.run (runnable, fork, this.getProgressMonitor (), this.getShell ().getDisplay ());
this.lockedUI = false;
} finally {
this.activeRunningOperations--;
if (state != null) this.stopped (state);
}
}, "~B,~B,org.eclipse.jface.operation.IRunnableWithProgress");
Clazz.defineMethod (c$, "saveEnableStateAndSet", 
($fz = function (w, h, key, enabled) {
if (w != null) {
h.put (key,  new Boolean (w.getEnabled ()));
w.setEnabled (enabled);
}}, $fz.isPrivate = true, $fz), "$wt.widgets.Control,java.util.Map,~S,~B");
Clazz.defineMethod (c$, "saveUIState", 
($fz = function (keepCancelEnabled) {
var savedState =  new java.util.HashMap (10);
this.saveEnableStateAndSet (this.backButton, savedState, "back", false);
this.saveEnableStateAndSet (this.nextButton, savedState, "next", false);
this.saveEnableStateAndSet (this.finishButton, savedState, "finish", false);
this.saveEnableStateAndSet (this.cancelButton, savedState, "cancel", keepCancelEnabled);
this.saveEnableStateAndSet (this.helpButton, savedState, "help", false);
if (this.currentPage != null) savedState.put ("page", org.eclipse.jface.dialogs.ControlEnableState.disable (this.currentPage.getControl ()));
return savedState;
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "setDisplayCursor", 
($fz = function (c) {
var shells = this.getShell ().getDisplay ().getShells ();
for (var i = 0; i < shells.length; i++) shells[i].setCursor (c);

}, $fz.isPrivate = true, $fz), "$wt.graphics.Cursor");
Clazz.defineMethod (c$, "setMinimumPageSize", 
function (minWidth, minHeight) {
org.eclipse.jface.util.Assert.isTrue (minWidth >= 0 && minHeight >= 0);
this.pageContainerLayout.minimumWidth = minWidth;
this.pageContainerLayout.minimumHeight = minHeight;
}, "~N,~N");
Clazz.defineMethod (c$, "setMinimumPageSize", 
function (size) {
this.setMinimumPageSize (size.x, size.y);
}, "$wt.graphics.Point");
Clazz.defineMethod (c$, "setPageSize", 
function (width, height) {
this.pageWidth = width;
this.pageHeight = height;
}, "~N,~N");
Clazz.defineMethod (c$, "setPageSize", 
function (size) {
this.setPageSize (size.x, size.y);
}, "$wt.graphics.Point");
Clazz.defineMethod (c$, "setWizard", 
function (newWizard) {
this.wizard = newWizard;
this.wizard.setContainer (this);
if (!this.createdWizards.contains (this.wizard)) {
this.createdWizards.add (this.wizard);
this.nestedWizards.add (this.wizard);
if (this.pageContainer != null) {
this.createPageControls ();
this.updateSizeForWizard (this.wizard);
this.pageContainer.layout (true);
}} else {
var size = this.nestedWizards.size ();
if (size >= 2 && this.nestedWizards.get (size - 2) === this.wizard) this.nestedWizards.remove (size - 1);
 else this.nestedWizards.add (this.wizard);
}}, "org.eclipse.jface.wizard.IWizard");
Clazz.overrideMethod (c$, "showPage", 
function (page) {
if (page == null || page === this.currentPage) {
return ;
}if (!this.isMovingToPreviousPage) page.setPreviousPage (this.currentPage);
 else this.isMovingToPreviousPage = false;
if (this.getContents () == null) this.updateForPage (page);
 else {
var finalPage = page;
$wt.custom.BusyIndicator.showWhile (this.getContents ().getDisplay (), (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.wizard.WizardDialog$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.wizard, "WizardDialog$4", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.wizard.WizardDialog"].updateForPage (this.f$.finalPage);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.wizard.WizardDialog$4, i$, v$);
}) (this, Clazz.cloneFinals ("finalPage", finalPage)));
}}, "org.eclipse.jface.wizard.IWizardPage");
Clazz.defineMethod (c$, "updateForPage", 
($fz = function (page) {
if (this.wizard !== page.getWizard ()) this.setWizard (page.getWizard ());
if (page.getControl () == null) {
page.createControl (this.pageContainer);
org.eclipse.jface.util.Assert.isNotNull (page.getControl ());
this.updateSize (page);
}var oldPage = this.currentPage;
this.currentPage = page;
this.currentPage.setVisible (true);
if (oldPage != null) oldPage.setVisible (false);
this.update ();
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.wizard.IWizardPage");
Clazz.defineMethod (c$, "showStartingPage", 
($fz = function () {
this.currentPage = this.wizard.getStartingPage ();
if (this.currentPage == null) {
return ;
}if (this.currentPage.getControl () == null) {
this.currentPage.createControl (this.pageContainer);
org.eclipse.jface.util.Assert.isNotNull (this.currentPage.getControl ());
}this.currentPage.setVisible (true);
this.update ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "stopped", 
($fz = function (savedState) {
if (this.getShell () != null) {
if (this.wizard.needsProgressMonitor ()) {
this.progressMonitorPart.setVisible (false);
this.progressMonitorPart.removeFromCancelComponent (this.cancelButton);
}var state = savedState;
this.restoreUIState (state);
this.cancelButton.addSelectionListener (this.cancelListener);
this.setDisplayCursor (null);
this.cancelButton.setCursor (null);
this.waitCursor.dispose ();
this.waitCursor = null;
this.arrowCursor.dispose ();
this.arrowCursor = null;
var focusControl = state.get ("focusControl");
if (focusControl != null) focusControl.setFocus ();
}}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "update", 
function () {
this.updateWindowTitle ();
this.updateTitleBar ();
this.updateButtons ();
this.firePageChanged ( new org.eclipse.jface.dialogs.PageChangedEvent (this, this.getCurrentPage ()));
});
Clazz.overrideMethod (c$, "updateButtons", 
function () {
var canFlipToNextPage = false;
var canFinish = this.wizard.canFinish ();
if (this.backButton != null) this.backButton.setEnabled (this.currentPage.getPreviousPage () != null);
if (this.nextButton != null) {
canFlipToNextPage = this.currentPage.canFlipToNextPage ();
this.nextButton.setEnabled (canFlipToNextPage);
}this.finishButton.setEnabled (canFinish);
if (canFlipToNextPage && !canFinish) this.getShell ().setDefaultButton (this.nextButton);
 else this.getShell ().setDefaultButton (this.finishButton);
});
Clazz.defineMethod (c$, "updateDescriptionMessage", 
($fz = function () {
this.pageDescription = this.currentPage.getDescription ();
if (this.pageMessage == null) this.setMessage (this.currentPage.getDescription ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "updateMessage", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
if (this.currentPage == null) return ;
this.pageMessage = this.currentPage.getMessage ();
if (this.pageMessage != null && Clazz.instanceOf (this.currentPage, org.eclipse.jface.dialogs.IMessageProvider)) this.pageMessageType = (this.currentPage).getMessageType ();
 else this.pageMessageType = 0;
if (this.pageMessage == null) this.setMessage (this.pageDescription);
 else this.setMessage (this.pageMessage, this.pageMessageType);
this.setErrorMessage (this.currentPage.getErrorMessage ());
});
Clazz.defineMethod (c$, "setShellSize", 
($fz = function (width, height) {
var size = this.getShell ().getBounds ();
size.height = height;
size.width = width;
this.getShell ().setBounds (this.getConstrainedShellBounds (size));
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "updateSize", 
function (page) {
if (page == null || page.getControl () == null) return ;
this.updateSizeForPage (page);
this.pageContainerLayout.layoutPage (page.getControl ());
}, "org.eclipse.jface.wizard.IWizardPage");
Clazz.defineMethod (c$, "updateSize", 
function () {
this.updateSize (this.currentPage);
});
Clazz.defineMethod (c$, "updateSizeForPage", 
($fz = function (page) {
var delta = this.calculatePageSizeDelta (page);
if (delta.x > 0 || delta.y > 0) {
var shell = this.getShell ();
var shellSize = shell.getSize ();
this.setShellSize (shellSize.x + delta.x, shellSize.y + delta.y);
this.constrainShellSize ();
}}, $fz.isPrivate = true, $fz), "org.eclipse.jface.wizard.IWizardPage");
Clazz.defineMethod (c$, "updateSizeForWizard", 
($fz = function (sizingWizard) {
var delta =  new $wt.graphics.Point (0, 0);
var pages = sizingWizard.getPages ();
for (var i = 0; i < pages.length; i++) {
var pageDelta = this.calculatePageSizeDelta (pages[i]);
delta.x = Math.max (delta.x, pageDelta.x);
delta.y = Math.max (delta.y, pageDelta.y);
}
if (delta.x > 0 || delta.y > 0) {
var shell = this.getShell ();
var shellSize = shell.getSize ();
this.setShellSize (shellSize.x + delta.x, shellSize.y + delta.y);
}}, $fz.isPrivate = true, $fz), "org.eclipse.jface.wizard.IWizard");
Clazz.overrideMethod (c$, "updateTitleBar", 
function () {
var s = null;
if (this.currentPage != null) s = this.currentPage.getTitle ();
if (s == null) s = "";
this.setTitle (s);
if (this.currentPage != null) this.setTitleImage (this.currentPage.getImage ());
this.updateDescriptionMessage ();
this.updateMessage ();
});
Clazz.overrideMethod (c$, "updateWindowTitle", 
function () {
if (this.getShell () == null) return ;
var title = this.wizard.getWindowTitle ();
if (title == null) title = "";
this.getShell ().setText (title);
});
Clazz.overrideMethod (c$, "getSelectedPage", 
function () {
return this.getCurrentPage ();
});
Clazz.overrideMethod (c$, "addPageChangedListener", 
function (listener) {
this.pageChangedListeners.add (listener);
}, "org.eclipse.jface.dialogs.IPageChangedListener");
Clazz.overrideMethod (c$, "removePageChangedListener", 
function (listener) {
this.pageChangedListeners.remove (listener);
}, "org.eclipse.jface.dialogs.IPageChangedListener");
Clazz.defineMethod (c$, "firePageChanged", 
function (event) {
var listeners = this.pageChangedListeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
var l = listeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.wizard.WizardDialog$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.wizard, "WizardDialog$5", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.pageChanged (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.wizard.WizardDialog$5, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.dialogs.PageChangedEvent");
Clazz.defineStatics (c$,
"WIZ_IMG_ERROR", "dialog_title_error_image",
"FOCUS_CONTROL", "focusControl");
});
