Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.core.runtime.IProgressMonitor", "$wt.widgets.Composite", "$.Layout", "org.eclipse.jface.action.StatusLineLayoutData", "org.eclipse.jface.resource.FileImageDescriptor", "$.ImageDescriptor"], "org.eclipse.jface.action.StatusLine", ["org.eclipse.jface.dialogs.ProgressIndicator", "org.eclipse.jface.resource.JFaceColors", "$.JFaceResources", "$wt.custom.CLabel", "$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.graphics.Cursor", "$.Point", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.ToolBar", "$.ToolItem"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fProgressIsVisible = false;
this.fCancelButtonIsVisible = false;
this.fCancelEnabled = false;
this.fTaskName = null;
this.fIsCanceled = false;
this.fStartTime = 0;
this.fStopButtonCursor = null;
this.fMessageText = null;
this.fMessageImage = null;
this.fErrorText = null;
this.fErrorImage = null;
this.fMessageLabel = null;
this.fProgressBarComposite = null;
this.fProgressBar = null;
this.fToolBar = null;
this.fCancelButton = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.action.StatusLine.StatusLineLayout")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.DEFAULT_DATA = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action.StatusLine, "StatusLineLayout", $wt.widgets.Layout);
Clazz.prepareFields (c$, function () {
this.DEFAULT_DATA =  new org.eclipse.jface.action.StatusLineLayoutData ();
});
Clazz.overrideMethod (c$, "computeSize", 
function (a, b, c, d) {
if (b != -1 && c != -1) return  new $wt.graphics.Point (b, c);
var e = a.getChildren ();
var f = 0;
var g = 0;
var h = 0;
for (var i = 0; i < e.length; i++) {
var j = true;
var k = e[i];
if (k === this.b$["org.eclipse.jface.action.StatusLine"].fProgressBarComposite && !this.b$["org.eclipse.jface.action.StatusLine"].fProgressIsVisible) j = false;
 else if (k === this.b$["org.eclipse.jface.action.StatusLine"].fToolBar && !this.b$["org.eclipse.jface.action.StatusLine"].fCancelButtonIsVisible) j = false;
var l = k.getLayoutData ();
if (l == null) l = this.DEFAULT_DATA;
var m = k.computeSize (l.widthHint, l.heightHint, d);
if (j) {
f += m.x;
h++;
}g = Math.max (g, m.y);
}
if (h > 0) f += (h - 1) * 3;
if (f <= 0) f = g * 4;
return  new $wt.graphics.Point (f, g);
}, "$wt.widgets.Composite,~N,~N,~B");
Clazz.overrideMethod (c$, "layout", 
function (a, b) {
if (a == null) return ;
this.b$["org.eclipse.jface.action.StatusLine"].fMessageLabel.moveAbove (null);
this.b$["org.eclipse.jface.action.StatusLine"].fToolBar.moveBelow (this.b$["org.eclipse.jface.action.StatusLine"].fMessageLabel);
this.b$["org.eclipse.jface.action.StatusLine"].fProgressBarComposite.moveBelow (this.b$["org.eclipse.jface.action.StatusLine"].fToolBar);
var c = a.getClientArea ();
var d = a.getChildren ();
var e = d.length;
var f =  Clazz.newArray (e, 0);
var g = c.height;
var h = -3;
for (var i = 0; i < e; i++) {
var j = d[i];
if (j === this.b$["org.eclipse.jface.action.StatusLine"].fProgressBarComposite && !this.b$["org.eclipse.jface.action.StatusLine"].fProgressIsVisible) continue ;if (j === this.b$["org.eclipse.jface.action.StatusLine"].fToolBar && !this.b$["org.eclipse.jface.action.StatusLine"].fCancelButtonIsVisible) continue ;var k = j.getLayoutData ();
if (k == null) k = this.DEFAULT_DATA;
var l = j.computeSize (k.widthHint, g, b).x;
f[i] = l;
h += l + 3;
}
var j = c.width - h;
f[0] += j;
var k = Math.floor (c.width / 3);
if (f[0] < k) {
j = f[0] - k;
f[0] = k;
} else {
j = 0;
}for (var l = e - 1; l >= 0 && j < 0; --l) {
var m = Math.min (f[l], -j);
f[l] -= m;
j += m + 3;
}
var m = c.x;
var n = c.y;
for (var o = 0; o < e; o++) {
var p = d[o];
if (p === this.b$["org.eclipse.jface.action.StatusLine"].fProgressBarComposite && !this.b$["org.eclipse.jface.action.StatusLine"].fProgressIsVisible || p === this.b$["org.eclipse.jface.action.StatusLine"].fToolBar && !this.b$["org.eclipse.jface.action.StatusLine"].fCancelButtonIsVisible) {
p.setBounds (m + c.width, n, f[o], g);
continue ;}p.setBounds (m, n, f[o], g);
if (f[o] > 0) m += f[o] + 3;
}
}, "$wt.widgets.Composite,~B");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "StatusLine", $wt.widgets.Composite, org.eclipse.core.runtime.IProgressMonitor);
Clazz.makeConstructor (c$, 
function (parent, style) {
Clazz.superConstructor (this, org.eclipse.jface.action.StatusLine, [parent, style]);
this.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.StatusLine$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "StatusLine$1", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (e) {
this.b$["org.eclipse.jface.action.StatusLine"].handleDispose ();
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.StatusLine$1, i$, v$);
}) (this, null));
this.setLayout (Clazz.innerTypeInstance (org.eclipse.jface.action.StatusLine.StatusLineLayout, this, null));
this.fMessageLabel =  new $wt.custom.CLabel (this, 0);
this.fProgressIsVisible = false;
this.fCancelEnabled = false;
this.fToolBar =  new $wt.widgets.ToolBar (this, 8388608);
this.fCancelButton =  new $wt.widgets.ToolItem (this.fToolBar, 8);
this.fCancelButton.setImage (org.eclipse.jface.action.StatusLine.fgStopImage.createImage ());
this.fCancelButton.setToolTipText (org.eclipse.jface.resource.JFaceResources.getString ("Cancel_Current_Operation"));
this.fCancelButton.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.StatusLine$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "StatusLine$2", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["org.eclipse.jface.action.StatusLine"].setCanceled (true);
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.StatusLine$2, i$, v$);
}) (this, null));
this.fCancelButton.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.StatusLine$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "StatusLine$3", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (e) {
var i = this.b$["org.eclipse.jface.action.StatusLine"].fCancelButton.getImage ();
if ((i != null) && (!i.isDisposed ())) i.dispose ();
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.StatusLine$3, i$, v$);
}) (this, null));
this.fProgressBarComposite =  new $wt.widgets.Composite (this, 0);
var layout =  new $wt.layout.GridLayout ();
layout.horizontalSpacing = 0;
layout.verticalSpacing = 0;
layout.marginHeight = 0;
layout.marginWidth = 0;
this.fProgressBarComposite.setLayout (layout);
this.fProgressBar =  new org.eclipse.jface.dialogs.ProgressIndicator (this.fProgressBarComposite);
this.fProgressBar.setLayoutData ( new $wt.layout.GridData (1536));
this.fStopButtonCursor =  new $wt.graphics.Cursor (this.getDisplay (), 0);
}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "beginTask", 
function (name, totalWork) {
var timestamp = System.currentTimeMillis ();
this.fStartTime = timestamp;
var animated = (totalWork == -1 || totalWork == 0);
var timer = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.StatusLine$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "StatusLine$4", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.action.StatusLine"].startTask (this.f$.timestamp, this.f$.animated);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.StatusLine$4, i$, v$);
}) (this, Clazz.cloneFinals ("timestamp", timestamp, "animated", animated));
if (this.fProgressBar == null) return ;
this.fProgressBar.getDisplay ().timerExec (500, timer);
if (!animated) {
this.fProgressBar.beginTask (totalWork);
}if (name == null) this.fTaskName = "";
 else this.fTaskName = name;
this.setMessage (this.fTaskName);
}, "~S,~N");
Clazz.overrideMethod (c$, "done", 
function () {
this.fStartTime = 0;
if (this.fProgressBar != null) {
this.fProgressBar.sendRemainingWork ();
this.fProgressBar.done ();
}this.setMessage (null);
this.hideProgress ();
});
Clazz.defineMethod (c$, "getProgressMonitor", 
function () {
return this;
});
Clazz.defineMethod (c$, "handleDispose", 
function () {
this.fStopButtonCursor.dispose ();
this.fStopButtonCursor = null;
this.fProgressBar.dispose ();
this.fProgressBar = null;
});
Clazz.defineMethod (c$, "hideProgress", 
function () {
if (this.fProgressIsVisible && !this.isDisposed ()) {
this.fProgressIsVisible = false;
this.fCancelEnabled = false;
this.fCancelButtonIsVisible = false;
if (this.fToolBar != null && !this.fToolBar.isDisposed ()) this.fToolBar.setVisible (false);
if (this.fProgressBarComposite != null && !this.fProgressBarComposite.isDisposed ()) this.fProgressBarComposite.setVisible (false);
this.layout ();
}});
Clazz.overrideMethod (c$, "internalWorked", 
function (work) {
if (!this.fProgressIsVisible) {
if (System.currentTimeMillis () - this.fStartTime > 500) this.showProgress ();
}if (this.fProgressBar != null) {
this.fProgressBar.worked (work);
}}, "~N");
Clazz.overrideMethod (c$, "isCanceled", 
function () {
return this.fIsCanceled;
});
Clazz.defineMethod (c$, "isCancelEnabled", 
function () {
return this.fCancelEnabled;
});
Clazz.overrideMethod (c$, "setCanceled", 
function (b) {
this.fIsCanceled = b;
if (this.fCancelButton != null) this.fCancelButton.setEnabled (!b);
}, "~B");
Clazz.defineMethod (c$, "setCancelEnabled", 
function (enabled) {
this.fCancelEnabled = enabled;
if (this.fProgressIsVisible && !this.fCancelButtonIsVisible && enabled) {
this.showButton ();
this.layout ();
}if (this.fCancelButton != null && !this.fCancelButton.isDisposed ()) this.fCancelButton.setEnabled (enabled);
}, "~B");
Clazz.defineMethod (c$, "setErrorMessage", 
function (message) {
this.setErrorMessage (null, message);
}, "~S");
Clazz.defineMethod (c$, "setErrorMessage", 
function (image, message) {
this.fErrorText = this.trim (message);
this.fErrorImage = image;
this.updateMessageLabel ();
}, "$wt.graphics.Image,~S");
Clazz.defineMethod (c$, "setFont", 
function (font) {
Clazz.superCall (this, org.eclipse.jface.action.StatusLine, "setFont", [font]);
var children = this.getChildren ();
for (var i = 0; i < children.length; i++) {
children[i].setFont (font);
}
}, "$wt.graphics.Font");
Clazz.defineMethod (c$, "setMessage", 
function (message) {
this.setMessage (null, message);
}, "~S");
Clazz.defineMethod (c$, "setMessage", 
function (image, message) {
this.fMessageText = this.trim (message);
this.fMessageImage = image;
this.updateMessageLabel ();
}, "$wt.graphics.Image,~S");
Clazz.overrideMethod (c$, "setTaskName", 
function (name) {
this.fTaskName = name;
}, "~S");
Clazz.defineMethod (c$, "showButton", 
function () {
if (this.fToolBar != null && !this.fToolBar.isDisposed ()) {
this.fToolBar.setVisible (true);
this.fToolBar.setEnabled (true);
this.fToolBar.setCursor (this.fStopButtonCursor);
this.fCancelButtonIsVisible = true;
}});
Clazz.defineMethod (c$, "showProgress", 
function () {
if (!this.fProgressIsVisible && !this.isDisposed ()) {
this.fProgressIsVisible = true;
if (this.fCancelEnabled) this.showButton ();
if (this.fProgressBarComposite != null && !this.fProgressBarComposite.isDisposed ()) this.fProgressBarComposite.setVisible (true);
this.layout ();
}});
Clazz.defineMethod (c$, "startTask", 
function (timestamp, animated) {
if (!this.fProgressIsVisible && this.fStartTime == timestamp) {
this.showProgress ();
if (animated) {
if (this.fProgressBar != null && !this.fProgressBar.isDisposed ()) {
this.fProgressBar.beginAnimatedTask ();
}}}}, "~N,~B");
Clazz.overrideMethod (c$, "subTask", 
function (name) {
var text;
if (this.fTaskName.length == 0) text = name;
 else text = org.eclipse.jface.resource.JFaceResources.format ("Set_SubTask", [this.fTaskName, name]);
this.setMessage (text);
}, "~S");
Clazz.defineMethod (c$, "trim", 
function (message) {
if (message == null) return null;
var cr = message.indexOf ('\r');
var lf = message.indexOf ('\n');
if (cr == -1 && lf == -1) return message;
var len;
if (cr == -1) len = lf;
 else if (lf == -1) len = cr;
 else len = Math.min (cr, lf);
return message.substring (0, len);
}, "~S");
Clazz.defineMethod (c$, "updateMessageLabel", 
function () {
if (this.fMessageLabel != null && !this.fMessageLabel.isDisposed ()) {
var display = this.fMessageLabel.getDisplay ();
if ((this.fErrorText != null && this.fErrorText.length > 0) || this.fErrorImage != null) {
this.fMessageLabel.setForeground (org.eclipse.jface.resource.JFaceColors.getErrorText (display));
this.fMessageLabel.setText (this.fErrorText);
this.fMessageLabel.setImage (this.fErrorImage);
} else {
this.fMessageLabel.setForeground (display.getSystemColor (21));
this.fMessageLabel.setText (this.fMessageText == null ? "" : this.fMessageText);
this.fMessageLabel.setImage (this.fMessageImage);
}}});
Clazz.overrideMethod (c$, "worked", 
function (work) {
this.internalWorked (work);
}, "~N");
Clazz.defineStatics (c$,
"GAP", 3,
"DELAY_PROGRESS", 500);
c$.fgStopImage = c$.prototype.fgStopImage = org.eclipse.jface.resource.ImageDescriptor.createFromFile (org.eclipse.jface.action.StatusLine, "images/stop.gif");
{
org.eclipse.jface.resource.JFaceResources.getImageRegistry ().put ("org.eclipse.jface.parts.StatusLine.stopImage", org.eclipse.jface.action.StatusLine.fgStopImage);
}});
