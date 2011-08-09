Clazz.declarePackage ("org.eclipse.jface.util");
Clazz.load (["org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.util.OpenStrategy", ["java.lang.IllegalArgumentException", "$wt.events.SelectionEvent", "$wt.graphics.Point", "$wt.widgets.Listener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.eventHandler = null;
this.openEventListeners = null;
this.selectionEventListeners = null;
this.postSelectionEventListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.util, "OpenStrategy");
Clazz.prepareFields (c$, function () {
this.openEventListeners =  new org.eclipse.jface.util.ListenerList (1);
this.selectionEventListeners =  new org.eclipse.jface.util.ListenerList (1);
this.postSelectionEventListeners =  new org.eclipse.jface.util.ListenerList (1);
});
Clazz.makeConstructor (c$, 
function (control) {
this.initializeHandler (control.getDisplay ());
this.addListener (control);
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "addOpenListener", 
function (listener) {
this.openEventListeners.add (listener);
}, "org.eclipse.jface.util.IOpenEventListener");
Clazz.defineMethod (c$, "removeOpenListener", 
function (listener) {
this.openEventListeners.remove (listener);
}, "org.eclipse.jface.util.IOpenEventListener");
Clazz.defineMethod (c$, "addSelectionListener", 
function (listener) {
this.selectionEventListeners.add (listener);
}, "$wt.events.SelectionListener");
Clazz.defineMethod (c$, "removeSelectionListener", 
function (listener) {
this.selectionEventListeners.remove (listener);
}, "$wt.events.SelectionListener");
Clazz.defineMethod (c$, "addPostSelectionListener", 
function (listener) {
this.postSelectionEventListeners.add (listener);
}, "$wt.events.SelectionListener");
Clazz.defineMethod (c$, "removePostSelectionListener", 
function (listener) {
this.postSelectionEventListeners.remove (listener);
}, "$wt.events.SelectionListener");
c$.getOpenMethod = Clazz.defineMethod (c$, "getOpenMethod", 
function () {
return org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD;
});
c$.setOpenMethod = Clazz.defineMethod (c$, "setOpenMethod", 
function (method) {
if (method == 0) {
($t$ = org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD = method, org.eclipse.jface.util.OpenStrategy.prototype.CURRENT_METHOD = org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD, $t$);
return ;
}if ((method & 1) == 0) throw  new IllegalArgumentException ("Invalid open mode");
if ((method & (7)) == 0) throw  new IllegalArgumentException ("Invalid open mode");
($t$ = org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD = method, org.eclipse.jface.util.OpenStrategy.prototype.CURRENT_METHOD = org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD, $t$);
}, "~N");
c$.activateOnOpen = Clazz.defineMethod (c$, "activateOnOpen", 
function () {
return org.eclipse.jface.util.OpenStrategy.getOpenMethod () == 0;
});
Clazz.defineMethod (c$, "addListener", 
($fz = function (c) {
c.addListener (6, this.eventHandler);
c.addListener (7, this.eventHandler);
c.addListener (5, this.eventHandler);
c.addListener (3, this.eventHandler);
c.addListener (4, this.eventHandler);
c.addListener (1, this.eventHandler);
c.addListener (13, this.eventHandler);
c.addListener (14, this.eventHandler);
c.addListener (18, this.eventHandler);
c.addListener (17, this.eventHandler);
}, $fz.isPrivate = true, $fz), "$wt.widgets.Control");
Clazz.defineMethod (c$, "fireSelectionEvent", 
($fz = function (e) {
if (e.item != null && e.item.isDisposed ()) return ;
var l = this.selectionEventListeners.getListeners ();
for (var i = 0; i < l.length; i++) {
(l[i]).widgetSelected (e);
}
}, $fz.isPrivate = true, $fz), "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "fireDefaultSelectionEvent", 
($fz = function (e) {
var l = this.selectionEventListeners.getListeners ();
for (var i = 0; i < l.length; i++) {
(l[i]).widgetDefaultSelected (e);
}
}, $fz.isPrivate = true, $fz), "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "firePostSelectionEvent", 
($fz = function (e) {
if (e.item != null && e.item.isDisposed ()) return ;
var l = this.postSelectionEventListeners.getListeners ();
for (var i = 0; i < l.length; i++) {
(l[i]).widgetSelected (e);
}
}, $fz.isPrivate = true, $fz), "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "fireOpenEvent", 
($fz = function (e) {
if (e.item != null && e.item.isDisposed ()) return ;
var l = this.openEventListeners.getListeners ();
for (var i = 0; i < l.length; i++) {
(l[i]).handleOpen (e);
}
}, $fz.isPrivate = true, $fz), "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "initializeHandler", 
($fz = function (display) {
this.eventHandler = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.util.OpenStrategy$1")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.timerStarted = false;
this.mouseUpEvent = null;
this.mouseMoveEvent = null;
this.selectionPendent = null;
this.enterKeyDown = false;
this.defaultSelectionPendent = null;
this.arrowKeyDown = false;
this.count = null;
this.startTime = 0;
this.collapseOccurred = false;
this.expandOccurred = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.util, "OpenStrategy$1", null, $wt.widgets.Listener);
Clazz.prepareFields (c$, function () {
this.count =  Clazz.newArray (1, 0);
this.startTime = System.currentTimeMillis ();
});
Clazz.overrideMethod (c$, "handleEvent", 
function (e) {
if (e.type == 14) {
var event =  new $wt.events.SelectionEvent (e);
this.b$["org.eclipse.jface.util.OpenStrategy"].fireDefaultSelectionEvent (event);
if (org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD == 0) {
this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent (event);
} else {
if (this.enterKeyDown) {
this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent (event);
this.enterKeyDown = false;
this.defaultSelectionPendent = null;
} else {
this.defaultSelectionPendent = event;
}}return ;
}switch (e.type) {
case 6:
case 7:
this.mouseUpEvent = null;
this.mouseMoveEvent = null;
this.selectionPendent = null;
break;
case 5:
if ((org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD & 2) == 0) return ;
if (e.stateMask != 0) return ;
if (e.widget.getDisplay ().getFocusControl () !== e.widget) return ;
this.mouseMoveEvent = e;
var runnable =  new Array (1);
runnable[0] = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.util.OpenStrategy$1$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "OpenStrategy$1$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var time = System.currentTimeMillis ();
var diff = (time - this.b$["org.eclipse.jface.util.OpenStrategy$1"].startTime);
if (diff <= 500) {
this.f$.display.timerExec (Math.floor (diff * 2 / 3), this.f$.runnable[0]);
} else {
this.b$["org.eclipse.jface.util.OpenStrategy$1"].timerStarted = false;
this.b$["org.eclipse.jface.util.OpenStrategy$1"].setSelection (this.b$["org.eclipse.jface.util.OpenStrategy$1"].mouseMoveEvent);
}});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.util.OpenStrategy$1$2, i$, v$);
}) (this, Clazz.cloneFinals ("display", this.f$.display, "runnable", runnable));
this.startTime = System.currentTimeMillis ();
if (!this.timerStarted) {
this.timerStarted = true;
this.f$.display.timerExec (333, runnable[0]);
}break;
case 3:
this.mouseUpEvent = null;
this.arrowKeyDown = false;
break;
case 17:
this.expandOccurred = true;
break;
case 18:
this.collapseOccurred = true;
break;
case 4:
this.mouseMoveEvent = null;
if ((e.button != 1) || ((e.stateMask & -524289) != 0)) return ;
if (this.selectionPendent != null && !(this.collapseOccurred || this.expandOccurred)) {
this.mouseSelectItem (this.selectionPendent);
} else {
this.mouseUpEvent = e;
this.collapseOccurred = false;
this.expandOccurred = false;
}break;
case 1:
this.mouseMoveEvent = null;
this.mouseUpEvent = null;
this.arrowKeyDown = ((e.keyCode == 16777217) || (e.keyCode == 16777218)) && e.stateMask == 0;
if ((e.character).charCodeAt (0) == ('\u000d').charCodeAt (0)) {
if (this.defaultSelectionPendent != null) {
this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent ( new $wt.events.SelectionEvent (e));
this.enterKeyDown = false;
this.defaultSelectionPendent = null;
} else {
this.enterKeyDown = true;
}}break;
case 13:
var event =  new $wt.events.SelectionEvent (e);
this.b$["org.eclipse.jface.util.OpenStrategy"].fireSelectionEvent (event);
this.mouseMoveEvent = null;
if (this.mouseUpEvent != null) this.mouseSelectItem (event);
 else this.selectionPendent = event;
this.count[0]++;
this.f$.display.asyncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.util.OpenStrategy$1$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.util, "OpenStrategy$1$3", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
if (this.b$["org.eclipse.jface.util.OpenStrategy$1"].arrowKeyDown) {
this.f$.display.timerExec (500, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.util.OpenStrategy$1$3$4")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.id = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.util, "OpenStrategy$1$3$4", null, Runnable);
Clazz.prepareFields (c$, function () {
this.id = this.b$["org.eclipse.jface.util.OpenStrategy$1"].count[0];
});
Clazz.overrideMethod (c$, "run", 
function () {
if (this.id == this.b$["org.eclipse.jface.util.OpenStrategy$1"].count[0]) {
this.b$["org.eclipse.jface.util.OpenStrategy"].firePostSelectionEvent ( new $wt.events.SelectionEvent (this.f$.e));
if ((org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD & 4) != 0) this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent ( new $wt.events.SelectionEvent (this.f$.e));
}});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.util.OpenStrategy$1$3$4, i$, v$);
}) (this, Clazz.cloneFinals ("e", this.f$.e)));
} else {
this.b$["org.eclipse.jface.util.OpenStrategy"].firePostSelectionEvent ( new $wt.events.SelectionEvent (this.f$.e));
}});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.util.OpenStrategy$1$3, i$, v$);
}) (this, Clazz.cloneFinals ("display", this.f$.display, "e", e)));
break;
}
}, "$wt.widgets.Event");
Clazz.defineMethod (c$, "mouseSelectItem", 
function (e) {
if ((org.eclipse.jface.util.OpenStrategy.CURRENT_METHOD & 1) != 0) this.b$["org.eclipse.jface.util.OpenStrategy"].fireOpenEvent (e);
this.mouseUpEvent = null;
this.selectionPendent = null;
}, "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "setSelection", 
function (e) {
if (e == null) return ;
var w = e.widget;
if (w.isDisposed ()) return ;
var selEvent =  new $wt.events.SelectionEvent (e);
if (Clazz.instanceOf (w, $wt.widgets.Tree)) {
var tree = w;
var item = tree.getItem ( new $wt.graphics.Point (e.x, e.y));
if (item != null) tree.setSelection ([item]);
selEvent.item = item;
} else if (Clazz.instanceOf (w, $wt.widgets.Table)) {
var table = w;
var item = table.getItem ( new $wt.graphics.Point (e.x, e.y));
if (item != null) table.setSelection ([item]);
selEvent.item = item;
} else if (Clazz.instanceOf (w, $wt.custom.TableTree)) {
var table = w;
var item = table.getItem ( new $wt.graphics.Point (e.x, e.y));
if (item != null) table.setSelection ([item]);
selEvent.item = item;
} else {
return ;
}if (selEvent.item == null) return ;
this.b$["org.eclipse.jface.util.OpenStrategy"].fireSelectionEvent (selEvent);
this.b$["org.eclipse.jface.util.OpenStrategy"].firePostSelectionEvent (selEvent);
}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.util.OpenStrategy$1, i$, v$);
}) (this, Clazz.cloneFinals ("display", display));
}, $fz.isPrivate = true, $fz), "$wt.widgets.Display");
Clazz.defineStatics (c$,
"DOUBLE_CLICK", 0,
"SINGLE_CLICK", 1,
"SELECT_ON_HOVER", 2,
"ARROW_KEYS_OPEN", 4,
"NO_TIMER", 1,
"FILE_EXPLORER", 5,
"ACTIVE_DESKTOP", 3,
"TIME", 500,
"CURRENT_METHOD", 0);
});
