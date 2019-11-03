Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.dialogs.Dialog", "$.IPageChangeProvider", "org.eclipse.jface.preference.IPreferencePageContainer", "$wt.widgets.Layout", "org.eclipse.jface.util.ListenerList", "$wt.graphics.Point"], "org.eclipse.jface.preference.PreferenceDialog", ["org.eclipse.core.runtime.ISafeRunnable", "$.Status", "org.eclipse.jface.dialogs.DialogMessageArea", "$.IDialogConstants", "$.MessageDialog", "$.PageChangedEvent", "org.eclipse.jface.preference.PreferenceContentProvider", "$.PreferenceLabelProvider", "org.eclipse.jface.resource.ImageDescriptor", "$.JFaceResources", "org.eclipse.jface.util.Assert", "$.IPropertyChangeListener", "$.Policy", "$.SafeRunnable", "org.eclipse.jface.viewers.ISelectionChangedListener", "$.StructuredSelection", "$.TreeViewer", "$wt.custom.BusyIndicator", "$wt.events.ControlAdapter", "$.DisposeListener", "$.HelpListener", "$.SelectionAdapter", "$.ShellAdapter", "$wt.layout.FormAttachment", "$.FormData", "$.FormLayout", "$.GridData", "$.GridLayout", "$wt.widgets.Composite", "$.Label", "$.Listener", "$.Sash"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog.PageLayout")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference.PreferenceDialog, "PageLayout", $wt.widgets.Layout);
Clazz.overrideMethod (c$, "computeSize", 
function (a, b, c, d) {
if (b != -1 && c != -1) return  new $wt.graphics.Point (b, c);
var e = this.b$["org.eclipse.jface.preference.PreferenceDialog"].minimumPageSize.x;
var f = this.b$["org.eclipse.jface.preference.PreferenceDialog"].minimumPageSize.y;
var g = a.getChildren ();
for (var h = 0; h < g.length; h++) {
var i = g[h].computeSize (-1, -1, d);
e = Math.max (e, i.x);
f = Math.max (f, i.y);
}
if (this.b$["org.eclipse.jface.preference.PreferenceDialog"].currentPage != null) {
var i = this.b$["org.eclipse.jface.preference.PreferenceDialog"].currentPage.computeSize ();
e = Math.max (e, i.x);
f = Math.max (f, i.y);
}if (b != -1) e = b;
if (c != -1) f = c;
return  new $wt.graphics.Point (e, f);
}, "$wt.widgets.Composite,~N,~N,~B");
Clazz.overrideMethod (c$, "layout", 
function (a, b) {
var c = a.getClientArea ();
var d = a.getChildren ();
for (var e = 0; e < d.length; e++) {
d[e].setSize (c.width, c.height);
}
}, "$wt.widgets.Composite,~B");
c$ = Clazz.p0p ();
}
this.currentPage = null;
this.messageArea = null;
this.isHelpAvailable = false;
this.lastShellSize = null;
this.lastSuccessfulNode = null;
this.minimumPageSize = null;
this.okButton = null;
this.pageContainer = null;
this.preferenceManager = null;
this.showingError = false;
this.preferenceStore = null;
this.titleArea = null;
this.treeViewer = null;
this.pageChangedListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "PreferenceDialog", org.eclipse.jface.dialogs.Dialog, [org.eclipse.jface.preference.IPreferencePageContainer, org.eclipse.jface.dialogs.IPageChangeProvider]);
Clazz.prepareFields (c$, function () {
this.minimumPageSize =  new $wt.graphics.Point (400, 400);
this.pageChangedListeners =  new org.eclipse.jface.util.ListenerList (3);
});
Clazz.makeConstructor (c$, 
function (parentShell, manager) {
Clazz.superConstructor (this, org.eclipse.jface.preference.PreferenceDialog, [parentShell]);
this.setShellStyle (this.getShellStyle () | 16 | 1024);
this.preferenceManager = manager;
}, "$wt.widgets.Shell,org.eclipse.jface.preference.PreferenceManager");
Clazz.overrideMethod (c$, "buttonPressed", 
function (buttonId) {
switch (buttonId) {
case 0:
{
this.okPressed ();
return ;
}case 1:
{
this.cancelPressed ();
return ;
}case 17:
{
this.helpPressed ();
return ;
}}
}, "~N");
Clazz.overrideMethod (c$, "cancelPressed", 
function () {
var nodes = this.preferenceManager.getElements (0).iterator ();
while (nodes.hasNext ()) {
var node = nodes.next ();
if (this.getPage (node) != null) {
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$1", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
if (!this.b$["org.eclipse.jface.preference.PreferenceDialog"].getPage (this.f$.node).performCancel ()) return ;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$1, i$, v$);
}) (this, Clazz.cloneFinals ("node", node)));
}}
this.setReturnCode (1);
this.close ();
});
Clazz.defineMethod (c$, "clearSelectedNode", 
function () {
this.setSelectedNodePreference (null);
});
Clazz.defineMethod (c$, "close", 
function () {
var nodes = this.preferenceManager.getElements (0);
for (var i = 0; i < nodes.size (); i++) {
var node = nodes.get (i);
node.disposeResources ();
}
return Clazz.superCall (this, org.eclipse.jface.preference.PreferenceDialog, "close", []);
});
Clazz.defineMethod (c$, "configureShell", 
function (newShell) {
Clazz.superCall (this, org.eclipse.jface.preference.PreferenceDialog, "configureShell", [newShell]);
newShell.setText (org.eclipse.jface.resource.JFaceResources.getString ("PreferenceDialog.title"));
newShell.addShellListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$2", $wt.events.ShellAdapter);
Clazz.overrideMethod (c$, "shellActivated", 
function (e) {
if (this.b$["org.eclipse.jface.preference.PreferenceDialog"].lastShellSize == null) this.b$["org.eclipse.jface.preference.PreferenceDialog"].lastShellSize = this.b$["org.eclipse.jface.preference.PreferenceDialog"].getShell ().getSize ();
}, "$wt.events.ShellEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$2, i$, v$);
}) (this, null));
}, "$wt.widgets.Shell");
Clazz.defineMethod (c$, "constrainShellSize", 
function () {
Clazz.superCall (this, org.eclipse.jface.preference.PreferenceDialog, "constrainShellSize", []);
if (this.lastShellSize == null) this.lastShellSize = this.getShell ().getSize ();
});
Clazz.overrideMethod (c$, "createButtonsForButtonBar", 
function (parent) {
this.okButton = this.createButton (parent, 0, org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL, true);
this.getShell ().setDefaultButton (this.okButton);
this.createButton (parent, 1, org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL, false);
if (this.isHelpAvailable) {
this.createButton (parent, 17, org.eclipse.jface.dialogs.IDialogConstants.HELP_LABEL, false);
}}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createContents", 
function (parent) {
var control =  new Array (1);
$wt.custom.BusyIndicator.showWhile (this.getShell ().getDisplay (), (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$3", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.control[0] = Clazz.superCall (this, org.eclipse.jface.preference.PreferenceDialog$3, "createContents", [this.f$.parent]);
this.b$["org.eclipse.jface.preference.PreferenceDialog"].selectSavedItem ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$3, i$, v$);
}) (this, Clazz.cloneFinals ("control", control, "parent", parent)));
return control[0];
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createDialogArea", 
function (parent) {
var composite = Clazz.superCall (this, org.eclipse.jface.preference.PreferenceDialog, "createDialogArea", [parent]);
var parentLayout = (composite.getLayout ());
parentLayout.numColumns = 4;
parentLayout.marginHeight = 0;
parentLayout.marginWidth = 0;
parentLayout.verticalSpacing = 0;
parentLayout.horizontalSpacing = 0;
composite.setBackground (parent.getDisplay ().getSystemColor (25));
var treeControl = this.createTreeAreaContents (composite);
this.createSash (composite, treeControl);
var versep =  new $wt.widgets.Label (composite, 514);
var verGd =  new $wt.layout.GridData (1040);
versep.setLayoutData (verGd);
versep.setLayoutData ( new $wt.layout.GridData (16384, 4, false, true));
var pageAreaComposite =  new $wt.widgets.Composite (composite, 0);
pageAreaComposite.setLayoutData ( new $wt.layout.GridData (1808));
var layout =  new $wt.layout.GridLayout (1, true);
layout.marginHeight = 0;
layout.marginWidth = 0;
pageAreaComposite.setLayout (layout);
var titleComposite =  new $wt.widgets.Composite (pageAreaComposite, 0);
layout =  new $wt.layout.GridLayout ();
layout.marginHeight = 0;
layout.marginWidth = 0;
layout.verticalSpacing = 0;
layout.horizontalSpacing = 0;
titleComposite.setLayout (layout);
var titleLayoutData =  new $wt.layout.GridData (768);
titleLayoutData.horizontalIndent = 7;
titleComposite.setLayoutData (titleLayoutData);
this.createTitleArea (titleComposite);
var separator =  new $wt.widgets.Label (pageAreaComposite, 258);
separator.setLayoutData ( new $wt.layout.GridData (768));
this.pageContainer = this.createPageContainer (pageAreaComposite);
var pageContainerData =  new $wt.layout.GridData (1808);
pageContainerData.horizontalIndent = 7;
this.pageContainer.setLayoutData (pageContainerData);
var bottomSeparator =  new $wt.widgets.Label (parent, 258);
bottomSeparator.setLayoutData ( new $wt.layout.GridData (768));
return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createSash", 
function (composite, rightControl) {
var sash =  new $wt.widgets.Sash (composite, 512);
sash.setLayoutData ( new $wt.layout.GridData (1040));
sash.setBackground (composite.getDisplay ().getSystemColor (25));
sash.addListener (13, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$4", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (event) {
if (event.detail == 1) return ;
var shift = event.x - this.f$.sash.getBounds ().x;
var data = this.f$.rightControl.getLayoutData ();
var newWidthHint = data.widthHint + shift;
if (newWidthHint < 20) return ;
var computedSize = this.b$["org.eclipse.jface.preference.PreferenceDialog"].getShell ().computeSize (-1, -1);
var currentSize = this.b$["org.eclipse.jface.preference.PreferenceDialog"].getShell ().getSize ();
var customSize = !computedSize.equals (currentSize);
data.widthHint = newWidthHint;
this.b$["org.eclipse.jface.preference.PreferenceDialog"].setLastTreeWidth (newWidthHint);
this.f$.composite.layout (true);
computedSize = this.b$["org.eclipse.jface.preference.PreferenceDialog"].getShell ().computeSize (-1, -1);
if (customSize) computedSize.x = Math.max (computedSize.x, currentSize.x);
computedSize.y = Math.max (computedSize.y, currentSize.y);
if (computedSize.equals (currentSize)) return ;
this.b$["org.eclipse.jface.preference.PreferenceDialog"].setShellSize (computedSize.x, computedSize.y);
this.b$["org.eclipse.jface.preference.PreferenceDialog"].lastShellSize = this.b$["org.eclipse.jface.preference.PreferenceDialog"].getShell ().getSize ();
}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$4, i$, v$);
}) (this, Clazz.cloneFinals ("sash", sash, "rightControl", rightControl, "composite", composite)));
return sash;
}, "$wt.widgets.Composite,$wt.widgets.Control");
Clazz.defineMethod (c$, "createPageContainer", 
function (parent) {
var outer =  new $wt.widgets.Composite (parent, 0);
var outerData =  new $wt.layout.GridData (1808);
outer.setLayout ( new $wt.layout.GridLayout ());
outer.setLayoutData (outerData);
var result =  new $wt.widgets.Composite (outer, 0);
var resultData =  new $wt.layout.GridData (1808);
result.setLayout (this.getPageLayout ());
result.setLayoutData (resultData);
return result;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getPageLayout", 
function () {
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog.PageLayout, this, null);
});
Clazz.defineMethod (c$, "createTitleArea", 
function (parent) {
var margins = 2;
this.titleArea =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.FormLayout ();
layout.marginHeight = 0;
layout.marginWidth = margins;
this.titleArea.setLayout (layout);
var layoutData =  new $wt.layout.GridData (768);
layoutData.verticalAlignment = 128;
this.titleArea.setLayoutData (layoutData);
this.messageArea =  new org.eclipse.jface.dialogs.DialogMessageArea ();
this.messageArea.createContents (this.titleArea);
this.titleArea.addControlListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$5", $wt.events.ControlAdapter);
Clazz.overrideMethod (c$, "controlResized", 
function (e) {
this.b$["org.eclipse.jface.preference.PreferenceDialog"].updateMessage ();
}, "$wt.events.ControlEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$5, i$, v$);
}) (this, null));
var fontListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$6", null, org.eclipse.jface.util.IPropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (event) {
if ("org.eclipse.jface.bannerfont".equals (event.getProperty ())) this.b$["org.eclipse.jface.preference.PreferenceDialog"].updateMessage ();
if ("org.eclipse.jface.dialogfont".equals (event.getProperty ())) {
this.b$["org.eclipse.jface.preference.PreferenceDialog"].updateMessage ();
var dialogFont = org.eclipse.jface.resource.JFaceResources.getDialogFont ();
this.b$["org.eclipse.jface.preference.PreferenceDialog"].updateTreeFont (dialogFont);
var children = (this.b$["org.eclipse.jface.preference.PreferenceDialog"].buttonBar).getChildren ();
for (var i = 0; i < children.length; i++) children[i].setFont (dialogFont);

}}, "org.eclipse.jface.util.PropertyChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$6, i$, v$);
}) (this, null);
this.titleArea.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$7")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$7", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
org.eclipse.jface.resource.JFaceResources.getFontRegistry ().removeListener (this.f$.fontListener);
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$7, i$, v$);
}) (this, Clazz.cloneFinals ("fontListener", fontListener)));
org.eclipse.jface.resource.JFaceResources.getFontRegistry ().addListener (fontListener);
this.messageArea.setTitleLayoutData (this.createMessageAreaData ());
this.messageArea.setMessageLayoutData (this.createMessageAreaData ());
return this.titleArea;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createMessageAreaData", 
($fz = function () {
var messageData =  new $wt.layout.FormData ();
messageData.top =  new $wt.layout.FormAttachment (0);
messageData.bottom =  new $wt.layout.FormAttachment (100);
messageData.right =  new $wt.layout.FormAttachment (100);
messageData.left =  new $wt.layout.FormAttachment (0);
return messageData;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createTreeAreaContents", 
function (parent) {
this.treeViewer = this.createTreeViewer (parent);
this.treeViewer.setInput (this.getPreferenceManager ());
this.updateTreeFont (org.eclipse.jface.resource.JFaceResources.getDialogFont ());
this.layoutTreeAreaControl (this.treeViewer.getControl ());
return this.treeViewer.getControl ();
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createTreeViewer", 
function (parent) {
var viewer =  new org.eclipse.jface.viewers.TreeViewer (parent, 0);
this.addListeners (viewer);
viewer.setLabelProvider ( new org.eclipse.jface.preference.PreferenceLabelProvider ());
viewer.setContentProvider ( new org.eclipse.jface.preference.PreferenceContentProvider ());
return viewer;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "addListeners", 
function (viewer) {
viewer.addPostSelectionChangedListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$8")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$8", null, org.eclipse.jface.viewers.ISelectionChangedListener);
Clazz.defineMethod (c$, "handleError", 
($fz = function () {
try {
this.f$.viewer.removePostSelectionChangedListener (this);
this.b$["org.eclipse.jface.preference.PreferenceDialog"].showPageFlippingAbortDialog ();
this.b$["org.eclipse.jface.preference.PreferenceDialog"].selectCurrentPageAgain ();
this.b$["org.eclipse.jface.preference.PreferenceDialog"].clearSelectedNode ();
} finally {
this.f$.viewer.addPostSelectionChangedListener (this);
}
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "selectionChanged", 
function (event) {
var selection = this.b$["org.eclipse.jface.preference.PreferenceDialog"].getSingleSelection (event.getSelection ());
if (Clazz.instanceOf (selection, org.eclipse.jface.preference.IPreferenceNode)) {
if (!this.b$["org.eclipse.jface.preference.PreferenceDialog"].isCurrentPageValid ()) {
this.handleError ();
} else if (!this.b$["org.eclipse.jface.preference.PreferenceDialog"].showPage (selection)) {
this.handleError ();
} else {
this.b$["org.eclipse.jface.preference.PreferenceDialog"].lastSuccessfulNode = selection;
}}}, "org.eclipse.jface.viewers.SelectionChangedEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$8, i$, v$);
}) (this, Clazz.cloneFinals ("viewer", viewer)));
(viewer.getControl ()).addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$9")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$9", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetDefaultSelected", 
function (event) {
var selection = this.f$.viewer.getSelection ();
if (selection.isEmpty ()) return ;
var singleSelection = this.b$["org.eclipse.jface.preference.PreferenceDialog"].getSingleSelection (selection);
var expanded = this.f$.viewer.getExpandedState (singleSelection);
this.f$.viewer.setExpandedState (singleSelection, !expanded);
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$9, i$, v$);
}) (this, Clazz.cloneFinals ("viewer", viewer)));
viewer.getControl ().addHelpListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$10")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$10", null, $wt.events.HelpListener);
Clazz.overrideMethod (c$, "helpRequested", 
function (event) {
if (this.b$["org.eclipse.jface.preference.PreferenceDialog"].currentPage != null) {
this.b$["org.eclipse.jface.preference.PreferenceDialog"].currentPage.performHelp ();
}}, "$wt.events.HelpEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$10, i$, v$);
}) (this, null));
}, "org.eclipse.jface.viewers.TreeViewer");
Clazz.defineMethod (c$, "findNodeMatching", 
function (nodeId) {
var nodes = this.preferenceManager.getElements (1);
for (var i = nodes.iterator (); i.hasNext (); ) {
var node = i.next ();
if (node.getId ().equals (nodeId)) return node;
}
return null;
}, "~S");
Clazz.defineMethod (c$, "getLastRightWidth", 
function () {
return org.eclipse.jface.preference.PreferenceDialog.lastTreeWidth;
});
Clazz.defineMethod (c$, "getPreferenceManager", 
function () {
return this.preferenceManager;
});
Clazz.overrideMethod (c$, "getPreferenceStore", 
function () {
return this.preferenceStore;
});
Clazz.defineMethod (c$, "getSelectedNodePreference", 
function () {
return org.eclipse.jface.preference.PreferenceDialog.lastPreferenceId;
});
Clazz.defineMethod (c$, "getSingleSelection", 
function (selection) {
if (!selection.isEmpty ()) {
var structured = selection;
if (Clazz.instanceOf (structured.getFirstElement (), org.eclipse.jface.preference.IPreferenceNode)) return structured.getFirstElement ();
}return null;
}, "org.eclipse.jface.viewers.ISelection");
Clazz.defineMethod (c$, "getTreeViewer", 
function () {
return this.treeViewer;
});
Clazz.defineMethod (c$, "handleSave", 
function () {
var nodes = this.preferenceManager.getElements (0).iterator ();
while (nodes.hasNext ()) {
var node = nodes.next ();
var page = node.getPage ();
if (Clazz.instanceOf (page, org.eclipse.jface.preference.PreferencePage)) {
var store = (page).getPreferenceStore ();
if (store != null && store.needsSaving () && Clazz.instanceOf (store, org.eclipse.jface.preference.IPersistentPreferenceStore)) {
try {
(store).save ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
org.eclipse.jface.dialogs.MessageDialog.openError (this.getShell (), org.eclipse.jface.resource.JFaceResources.getString ("PreferenceDialog.saveErrorTitle"), org.eclipse.jface.resource.JFaceResources.format ("PreferenceDialog.saveErrorMessage", [page.getTitle (), e.getMessage ()]));
} else {
throw e;
}
}
}}}
});
Clazz.overrideMethod (c$, "handleShellCloseEvent", 
function () {
this.cancelPressed ();
});
Clazz.defineMethod (c$, "helpPressed", 
function () {
if (this.currentPage != null) {
this.currentPage.performHelp ();
}});
Clazz.defineMethod (c$, "isCurrentPageValid", 
function () {
if (this.currentPage == null) return true;
return this.currentPage.isValid ();
});
Clazz.defineMethod (c$, "layoutTreeAreaControl", 
function (control) {
var gd =  new $wt.layout.GridData (1040);
gd.widthHint = this.getLastRightWidth ();
gd.verticalSpan = 1;
control.setLayoutData (gd);
}, "$wt.widgets.Control");
Clazz.overrideMethod (c$, "okPressed", 
function () {
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$11")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.errorOccurred = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "PreferenceDialog$11", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.preference.PreferenceDialog"].getButton (0).setEnabled (false);
this.errorOccurred = false;
var hasFailedOK = false;
try {
var nodes = this.b$["org.eclipse.jface.preference.PreferenceDialog"].preferenceManager.getElements (0).iterator ();
while (nodes.hasNext ()) {
var node = nodes.next ();
var page = node.getPage ();
if (page != null) {
if (!page.performOk ()) {
hasFailedOK = true;
return ;
}}}
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.handleException (e);
} else {
throw e;
}
} finally {
if (hasFailedOK) return ;
if (!this.errorOccurred) this.b$["org.eclipse.jface.preference.PreferenceDialog"].handleSave ();
this.b$["org.eclipse.jface.preference.PreferenceDialog"].close ();
}
});
Clazz.overrideMethod (c$, "handleException", 
function (e) {
this.errorOccurred = true;
org.eclipse.jface.util.Policy.getLog ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.jface", 0, e.toString (), e));
this.b$["org.eclipse.jface.preference.PreferenceDialog"].clearSelectedNode ();
var message = org.eclipse.jface.resource.JFaceResources.getString ("SafeRunnable.errorMessage");
org.eclipse.jface.dialogs.MessageDialog.openError (this.b$["org.eclipse.jface.preference.PreferenceDialog"].getShell (), org.eclipse.jface.resource.JFaceResources.getString ("Error"), message);
}, "Throwable");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$11, i$, v$);
}) (this, null));
});
Clazz.defineMethod (c$, "selectCurrentPageAgain", 
function () {
if (this.lastSuccessfulNode == null) return ;
this.getTreeViewer ().setSelection ( new org.eclipse.jface.viewers.StructuredSelection (this.lastSuccessfulNode));
this.currentPage.setVisible (true);
});
Clazz.defineMethod (c$, "selectSavedItem", 
function () {
var node = this.findNodeMatching (this.getSelectedNodePreference ());
if (node == null) {
var nodes = this.preferenceManager.getRoot ().getSubNodes ();
if (nodes.length > 0) node = nodes[0];
}if (node != null) {
this.getTreeViewer ().setSelection ( new org.eclipse.jface.viewers.StructuredSelection (node), true);
this.getTreeViewer ().getControl ().setFocus ();
}});
Clazz.defineMethod (c$, "setErrorMessage", 
function (newErrorMessage) {
if (newErrorMessage == null) this.messageArea.clearErrorMessage ();
 else this.messageArea.updateText (newErrorMessage, 3);
}, "~S");
Clazz.defineMethod (c$, "setLastTreeWidth", 
($fz = function (width) {
($t$ = org.eclipse.jface.preference.PreferenceDialog.lastTreeWidth = width, org.eclipse.jface.preference.PreferenceDialog.prototype.lastTreeWidth = org.eclipse.jface.preference.PreferenceDialog.lastTreeWidth, $t$);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "setHelpAvailable", 
function (b) {
this.isHelpAvailable = b;
}, "~B");
Clazz.defineMethod (c$, "setMessage", 
function (newMessage) {
this.setMessage (newMessage, 0);
}, "~S");
Clazz.defineMethod (c$, "setMessage", 
function (newMessage, newType) {
this.messageArea.updateText (newMessage, newType);
}, "~S,~N");
Clazz.defineMethod (c$, "setMinimumPageSize", 
function (minWidth, minHeight) {
this.minimumPageSize.x = minWidth;
this.minimumPageSize.y = minHeight;
}, "~N,~N");
Clazz.defineMethod (c$, "setMinimumPageSize", 
function (size) {
this.minimumPageSize.x = size.x;
this.minimumPageSize.y = size.y;
}, "$wt.graphics.Point");
Clazz.defineMethod (c$, "setPreferenceStore", 
function (store) {
org.eclipse.jface.util.Assert.isNotNull (store);
this.preferenceStore = store;
}, "org.eclipse.jface.preference.IPreferenceStore");
Clazz.defineMethod (c$, "setSelectedNode", 
($fz = function () {
var storeValue = null;
var selection = this.getTreeViewer ().getSelection ();
if (selection.size () == 1) {
var node = selection.getFirstElement ();
storeValue = node.getId ();
}this.setSelectedNodePreference (storeValue);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setSelectedNode", 
function (pageId) {
this.setSelectedNodePreference (pageId);
}, "~S");
Clazz.defineMethod (c$, "setSelectedNodePreference", 
function (pageId) {
($t$ = org.eclipse.jface.preference.PreferenceDialog.lastPreferenceId = pageId, org.eclipse.jface.preference.PreferenceDialog.prototype.lastPreferenceId = org.eclipse.jface.preference.PreferenceDialog.lastPreferenceId, $t$);
}, "~S");
Clazz.defineMethod (c$, "setShellSize", 
($fz = function (width, height) {
var preferred = this.getShell ().getBounds ();
preferred.width = width;
preferred.height = height;
this.getShell ().setBounds (this.getConstrainedShellBounds (preferred));
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "showPage", 
function (node) {
if (node == null) return false;
if (node.getPage () == null) this.createPage (node);
if (node.getPage () == null) return false;
var newPage = this.getPage (node);
if (newPage === this.currentPage) return true;
if (this.currentPage != null) {
if (!this.currentPage.okToLeave ()) return false;
}var oldPage = this.currentPage;
this.currentPage = newPage;
this.currentPage.setContainer (this);
if (this.currentPage.getControl () == null) {
var failed = [false];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$12")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$12", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.overrideMethod (c$, "handleException", 
function (e) {
this.f$.failed[0] = true;
}, "Throwable");
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.preference.PreferenceDialog"].createPageControl (this.b$["org.eclipse.jface.preference.PreferenceDialog"].currentPage, this.b$["org.eclipse.jface.preference.PreferenceDialog"].pageContainer);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$12, i$, v$);
}) (this, Clazz.cloneFinals ("failed", failed)));
if (failed[0]) return false;
org.eclipse.jface.util.Assert.isNotNull (this.currentPage.getControl ());
}var size =  new Array (1);
var failed =  new $wt.graphics.Point (-1, -1);
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$13")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$13", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.overrideMethod (c$, "handleException", 
function (e) {
this.f$.size[0] = this.f$.failed;
}, "Throwable");
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.size[0] = this.b$["org.eclipse.jface.preference.PreferenceDialog"].currentPage.computeSize ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$13, i$, v$);
}) (this, Clazz.cloneFinals ("size", size, "failed", failed)));
if (size[0].equals (failed)) return false;
var contentSize = size[0];
var shell = this.getShell ();
var shellSize = shell.getSize ();
if (oldPage != null) {
var rect = this.pageContainer.getClientArea ();
var containerSize =  new $wt.graphics.Point (rect.width, rect.height);
var hdiff = contentSize.x - containerSize.x;
var vdiff = contentSize.y - containerSize.y;
if ((hdiff > 0 || vdiff > 0) && shellSize.equals (this.lastShellSize)) {
hdiff = Math.max (0, hdiff);
vdiff = Math.max (0, vdiff);
this.setShellSize (shellSize.x + hdiff, shellSize.y + vdiff);
this.lastShellSize = shell.getSize ();
if (this.currentPage.getControl ().getSize ().x == 0) this.currentPage.getControl ().setSize (containerSize);
} else this.currentPage.setSize (containerSize);
}var children = this.pageContainer.getChildren ();
var currentControl = this.currentPage.getControl ();
for (var i = 0; i < children.length; i++) {
if (children[i] !== currentControl) children[i].setVisible (false);
}
this.currentPage.setVisible (true);
if (oldPage != null) oldPage.setVisible (false);
this.update ();
return true;
}, "org.eclipse.jface.preference.IPreferenceNode");
Clazz.defineMethod (c$, "createPage", 
function (node) {
node.createPage ();
}, "org.eclipse.jface.preference.IPreferenceNode");
Clazz.defineMethod (c$, "getPage", 
function (node) {
return node.getPage ();
}, "org.eclipse.jface.preference.IPreferenceNode");
Clazz.defineMethod (c$, "showPageFlippingAbortDialog", 
function () {
org.eclipse.jface.dialogs.MessageDialog.openError (this.getShell (), org.eclipse.jface.resource.JFaceResources.getString ("AbortPageFlippingDialog.title"), org.eclipse.jface.resource.JFaceResources.getString ("AbortPageFlippingDialog.message"));
});
Clazz.defineMethod (c$, "update", 
function () {
this.updateTitle ();
this.updateMessage ();
this.updateButtons ();
this.setSelectedNode ();
this.firePageChanged ( new org.eclipse.jface.dialogs.PageChangedEvent (this, this.getCurrentPage ()));
});
Clazz.overrideMethod (c$, "updateButtons", 
function () {
this.okButton.setEnabled (this.isCurrentPageValid ());
});
Clazz.overrideMethod (c$, "updateMessage", 
function () {
var message = null;
var errorMessage = null;
if (this.currentPage != null) {
message = this.currentPage.getMessage ();
errorMessage = this.currentPage.getErrorMessage ();
}var messageType = 0;
if (message != null && Clazz.instanceOf (this.currentPage, org.eclipse.jface.dialogs.IMessageProvider)) messageType = (this.currentPage).getMessageType ();
if (errorMessage == null) {
if (this.showingError) {
this.showingError = false;
}} else {
message = errorMessage;
messageType = 3;
if (!this.showingError) {
this.showingError = true;
}}this.messageArea.updateText (message, messageType);
});
Clazz.overrideMethod (c$, "updateTitle", 
function () {
if (this.currentPage == null) return ;
this.messageArea.showTitle (this.currentPage.getTitle (), this.currentPage.getImage ());
});
Clazz.defineMethod (c$, "updateTreeFont", 
function (dialogFont) {
this.getTreeViewer ().getControl ().setFont (dialogFont);
}, "$wt.graphics.Font");
Clazz.defineMethod (c$, "getCurrentPage", 
function () {
return this.currentPage;
});
Clazz.defineMethod (c$, "setCurrentPage", 
function (currentPage) {
this.currentPage = currentPage;
}, "org.eclipse.jface.preference.IPreferencePage");
Clazz.defineMethod (c$, "setTreeViewer", 
function (treeViewer) {
this.treeViewer = treeViewer;
}, "org.eclipse.jface.viewers.TreeViewer");
Clazz.defineMethod (c$, "getPageContainer", 
function () {
return this.pageContainer;
});
Clazz.defineMethod (c$, "setPageContainer", 
function (pageContainer) {
this.pageContainer = pageContainer;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createPageControl", 
function (page, parent) {
page.createControl (parent);
}, "org.eclipse.jface.preference.IPreferencePage,$wt.widgets.Composite");
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
for (var i = 0; i < listeners.length; i++) {
var l = listeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferenceDialog$14")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferenceDialog$14", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.pageChanged (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferenceDialog$14, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.dialogs.PageChangedEvent");
Clazz.defineStatics (c$,
"lastPreferenceId", null,
"lastTreeWidth", 150);
c$.PREF_DLG_IMG_TITLE_ERROR = c$.prototype.PREF_DLG_IMG_TITLE_ERROR = "dialog_message_error_image";
Clazz.defineStatics (c$,
"PREF_DLG_TITLE_IMG", "preference_dialog_title_image");
{
var reg = org.eclipse.jface.resource.JFaceResources.getImageRegistry ();
reg.put ("preference_dialog_title_image", org.eclipse.jface.resource.ImageDescriptor.createFromFile (org.eclipse.jface.preference.PreferenceDialog, "images/pref_dialog_title.gif"));
}});
