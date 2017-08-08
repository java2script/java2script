Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.EventFilter"], "java.awt.ModalEventFilter", ["java.awt.Component", "$.Dialog", "$.Window", "sun.awt.ModalExclude"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modalDialog = null;
this.disabled = false;
Clazz.instantialize (this, arguments);
}, java.awt, "ModalEventFilter", null, java.awt.EventFilter);
Clazz.makeConstructor (c$, 
function (modalDialog) {
this.modalDialog = modalDialog;
this.disabled = false;
}, "java.awt.Dialog");
Clazz.defineMethod (c$, "getModalDialog", 
function () {
return this.modalDialog;
});
Clazz.overrideMethod (c$, "acceptEvent", 
function (event) {
if (this.disabled || !this.modalDialog.isVisible ()) {
return java.awt.EventFilter.FilterAction.ACCEPT;
}var eventID = event.getID ();
if ((eventID >= 500 && eventID <= 507) || (eventID >= 1001 && eventID <= 1001) || eventID == 201) {
var o = event.getSource ();
if (Clazz.instanceOf (o, sun.awt.ModalExclude)) {
} else if (Clazz.instanceOf (o, java.awt.Component)) {
var c = o;
while ((c != null) && !(Clazz.instanceOf (c, java.awt.Window))) {
c = c.getParent_NoClientCode ();
}
if (c != null) {
return this.acceptWindow (c);
}}}return java.awt.EventFilter.FilterAction.ACCEPT;
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "disable", 
function () {
this.disabled = true;
});
Clazz.defineMethod (c$, "compareTo", 
function (another) {
var anotherDialog = another.getModalDialog ();
var c = this.modalDialog;
while (c != null) {
if (c === anotherDialog) {
return 1;
}c = c.getParent_NoClientCode ();
}
c = anotherDialog;
while (c != null) {
if (c === this.modalDialog) {
return -1;
}c = c.getParent_NoClientCode ();
}
var blocker = this.modalDialog.getModalBlocker ();
while (blocker != null) {
if (blocker === anotherDialog) {
return -1;
}blocker = blocker.getModalBlocker ();
}
blocker = anotherDialog.getModalBlocker ();
while (blocker != null) {
if (blocker === this.modalDialog) {
return 1;
}blocker = blocker.getModalBlocker ();
}
return this.modalDialog.getModalityType ().compareTo (anotherDialog.getModalityType ());
}, "java.awt.ModalEventFilter");
c$.createFilterForDialog = Clazz.defineMethod (c$, "createFilterForDialog", 
function (modalDialog) {
switch (modalDialog.getModalityType ()) {
case java.awt.Dialog.ModalityType.DOCUMENT_MODAL:
return  new java.awt.ModalEventFilter.DocumentModalEventFilter (modalDialog);
case java.awt.Dialog.ModalityType.APPLICATION_MODAL:
return  new java.awt.ModalEventFilter.ApplicationModalEventFilter (modalDialog);
case java.awt.Dialog.ModalityType.TOOLKIT_MODAL:
return  new java.awt.ModalEventFilter.ToolkitModalEventFilter (modalDialog);
}
return null;
}, "java.awt.Dialog");
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.appContext = null;
Clazz.instantialize (this, arguments);
}, java.awt.ModalEventFilter, "ToolkitModalEventFilter", java.awt.ModalEventFilter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, java.awt.ModalEventFilter.ToolkitModalEventFilter, [a]);
this.appContext = a.appContext;
}, "java.awt.Dialog");
Clazz.overrideMethod (c$, "acceptWindow", 
function (a) {
if (a.isModalExcluded (java.awt.Dialog.ModalExclusionType.TOOLKIT_EXCLUDE)) {
return java.awt.EventFilter.FilterAction.ACCEPT;
}if (a.appContext !== this.appContext) {
return java.awt.EventFilter.FilterAction.REJECT;
}while (a != null) {
if (a === this.modalDialog) {
return java.awt.EventFilter.FilterAction.ACCEPT_IMMEDIATELY;
}a = a.getOwner ();
}
return java.awt.EventFilter.FilterAction.REJECT;
}, "java.awt.Window");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.appContext = null;
Clazz.instantialize (this, arguments);
}, java.awt.ModalEventFilter, "ApplicationModalEventFilter", java.awt.ModalEventFilter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, java.awt.ModalEventFilter.ApplicationModalEventFilter, [a]);
this.appContext = a.appContext;
}, "java.awt.Dialog");
Clazz.overrideMethod (c$, "acceptWindow", 
function (a) {
if (a.isModalExcluded (java.awt.Dialog.ModalExclusionType.APPLICATION_EXCLUDE)) {
return java.awt.EventFilter.FilterAction.ACCEPT;
}if (a.appContext === this.appContext) {
while (a != null) {
if (a === this.modalDialog) {
return java.awt.EventFilter.FilterAction.ACCEPT_IMMEDIATELY;
}a = a.getOwner ();
}
return java.awt.EventFilter.FilterAction.REJECT;
}return java.awt.EventFilter.FilterAction.ACCEPT;
}, "java.awt.Window");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.documentRoot = null;
Clazz.instantialize (this, arguments);
}, java.awt.ModalEventFilter, "DocumentModalEventFilter", java.awt.ModalEventFilter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, java.awt.ModalEventFilter.DocumentModalEventFilter, [a]);
this.documentRoot = a.getDocumentRoot ();
}, "java.awt.Dialog");
Clazz.overrideMethod (c$, "acceptWindow", 
function (a) {
if (a.isModalExcluded (java.awt.Dialog.ModalExclusionType.APPLICATION_EXCLUDE)) {
var b = this.modalDialog.getOwner ();
while (b != null) {
if (b === a) {
return java.awt.EventFilter.FilterAction.REJECT;
}b = b.getOwner ();
}
return java.awt.EventFilter.FilterAction.ACCEPT;
}while (a != null) {
if (a === this.modalDialog) {
return java.awt.EventFilter.FilterAction.ACCEPT_IMMEDIATELY;
}if (a === this.documentRoot) {
return java.awt.EventFilter.FilterAction.REJECT;
}a = a.getOwner ();
}
return java.awt.EventFilter.FilterAction.ACCEPT;
}, "java.awt.Window");
c$ = Clazz.p0p ();
});
