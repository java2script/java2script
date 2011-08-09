Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.ContributionItem", "org.eclipse.jface.util.IPropertyChangeListener", "$wt.SWT"], "org.eclipse.jface.action.ActionContributionItem", ["java.lang.Thread", "org.eclipse.jface.action.Action", "$.ExternalActionManager", "org.eclipse.jface.resource.ImageDescriptor", "$.JFaceResources", "$.LocalResourceManager", "org.eclipse.jface.util.Policy", "$wt.graphics.GC", "$.Point", "$wt.widgets.Button", "$.Listener", "$.MenuItem", "$.ToolItem"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mode = 0;
this.action = null;
this.actionTextListener = null;
this.imageManager = null;
this.buttonListener = null;
this.menuItemListener = null;
this.propertyListener = null;
this.toolItemListener = null;
this.widget = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "ActionContributionItem", org.eclipse.jface.action.ContributionItem);
Clazz.prepareFields (c$, function () {
this.actionTextListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ActionContributionItem$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ActionContributionItem$1", null, org.eclipse.jface.util.IPropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (event) {
this.b$["org.eclipse.jface.action.ActionContributionItem"].update (event.getProperty ());
}, "org.eclipse.jface.util.PropertyChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ActionContributionItem$1, i$, v$);
}) (this, null);
this.propertyListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ActionContributionItem$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ActionContributionItem$2", null, org.eclipse.jface.util.IPropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (event) {
this.b$["org.eclipse.jface.action.ActionContributionItem"].actionPropertyChange (event);
}, "org.eclipse.jface.util.PropertyChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ActionContributionItem$2, i$, v$);
}) (this, null);
});
c$.getUseColorIconsInToolbars = Clazz.defineMethod (c$, "getUseColorIconsInToolbars", 
function () {
return org.eclipse.jface.action.ActionContributionItem.USE_COLOR_ICONS;
});
c$.setUseColorIconsInToolbars = Clazz.defineMethod (c$, "setUseColorIconsInToolbars", 
function (useColorIcons) {
($t$ = org.eclipse.jface.action.ActionContributionItem.USE_COLOR_ICONS = useColorIcons, org.eclipse.jface.action.ActionContributionItem.prototype.USE_COLOR_ICONS = org.eclipse.jface.action.ActionContributionItem.USE_COLOR_ICONS, $t$);
}, "~B");
Clazz.makeConstructor (c$, 
function (action) {
Clazz.superConstructor (this, org.eclipse.jface.action.ActionContributionItem, [action.getId ()]);
this.action = action;
}, "org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "actionPropertyChange", 
($fz = function (e) {
if (this.isVisible () && this.widget != null) {
var display = this.widget.getDisplay ();
if (display.getThread () === Thread.currentThread ()) {
this.update (e.getProperty ());
} else {
display.asyncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ActionContributionItem$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ActionContributionItem$3", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.action.ActionContributionItem"].update (this.f$.e.getProperty ());
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ActionContributionItem$3, i$, v$);
}) (this, Clazz.cloneFinals ("e", e)));
}}}, $fz.isPrivate = true, $fz), "org.eclipse.jface.util.PropertyChangeEvent");
Clazz.defineMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, org.eclipse.jface.action.ActionContributionItem))) {
return false;
}return this.action.equals ((o).action);
}, "~O");
Clazz.defineMethod (c$, "fill", 
function (parent) {
if (this.widget == null && parent != null) {
var flags = 8;
if (this.action != null) {
if (this.action.getStyle () == 2) flags = 2;
if (this.action.getStyle () == 8) flags = 16;
}var b =  new $wt.widgets.Button (parent, flags);
b.setData (this);
b.addListener (12, this.getButtonListener ());
b.addListener (13, this.getButtonListener ());
if (this.action.getHelpListener () != null) b.addHelpListener (this.action.getHelpListener ());
this.widget = b;
this.update (null);
this.action.addPropertyChangeListener (this.propertyListener);
if (this.action != null) {
var commandId = this.action.getActionDefinitionId ();
var callback = org.eclipse.jface.action.ExternalActionManager.getInstance ().getCallback ();
if ((callback != null) && (commandId != null)) {
callback.addPropertyChangeListener (commandId, this.actionTextListener);
}}}}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
if (this.widget == null && parent != null) {
var subMenu = null;
var flags = 8;
if (this.action != null) {
var style = this.action.getStyle ();
if (style == 2) flags = 32;
 else if (style == 8) flags = 16;
 else if (style == 4) {
var mc = this.action.getMenuCreator ();
if (mc != null) {
subMenu = mc.getMenu (parent);
flags = 64;
}}}var mi = null;
if (index >= 0) mi =  new $wt.widgets.MenuItem (parent, flags, index);
 else mi =  new $wt.widgets.MenuItem (parent, flags);
this.widget = mi;
mi.setData (this);
mi.addListener (12, this.getMenuItemListener ());
mi.addListener (13, this.getMenuItemListener ());
if (this.action.getHelpListener () != null) mi.addHelpListener (this.action.getHelpListener ());
if (subMenu != null) mi.setMenu (subMenu);
this.update (null);
this.action.addPropertyChangeListener (this.propertyListener);
if (this.action != null) {
var commandId = this.action.getActionDefinitionId ();
var callback = org.eclipse.jface.action.ExternalActionManager.getInstance ().getCallback ();
if ((callback != null) && (commandId != null)) {
callback.addPropertyChangeListener (commandId, this.actionTextListener);
}}}}, "$wt.widgets.Menu,~N");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
if (this.widget == null && parent != null) {
var flags = 8;
if (this.action != null) {
var style = this.action.getStyle ();
if (style == 2) flags = 32;
 else if (style == 8) flags = 16;
 else if (style == 4) flags = 4;
}var ti = null;
if (index >= 0) ti =  new $wt.widgets.ToolItem (parent, flags, index);
 else ti =  new $wt.widgets.ToolItem (parent, flags);
ti.setData (this);
ti.addListener (13, this.getToolItemListener ());
ti.addListener (12, this.getToolItemListener ());
this.widget = ti;
this.update (null);
this.action.addPropertyChangeListener (this.propertyListener);
if (this.action != null) {
var commandId = this.action.getActionDefinitionId ();
var callback = org.eclipse.jface.action.ExternalActionManager.getInstance ().getCallback ();
if ((callback != null) && (commandId != null)) {
callback.addPropertyChangeListener (commandId, this.actionTextListener);
}}}}, "$wt.widgets.ToolBar,~N");
Clazz.defineMethod (c$, "getAction", 
function () {
return this.action;
});
Clazz.defineMethod (c$, "getButtonListener", 
($fz = function () {
if (this.buttonListener == null) {
this.buttonListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ActionContributionItem$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ActionContributionItem$4", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (event) {
switch (event.type) {
case 12:
this.b$["org.eclipse.jface.action.ActionContributionItem"].handleWidgetDispose (event);
break;
case 13:
var ew = event.widget;
if (ew != null) {
this.b$["org.eclipse.jface.action.ActionContributionItem"].handleWidgetSelection (event, (ew).getSelection ());
}break;
}
}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ActionContributionItem$4, i$, v$);
}) (this, null);
}return this.buttonListener;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getMenuItemListener", 
($fz = function () {
if (this.menuItemListener == null) {
this.menuItemListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ActionContributionItem$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ActionContributionItem$5", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (event) {
switch (event.type) {
case 12:
this.b$["org.eclipse.jface.action.ActionContributionItem"].handleWidgetDispose (event);
break;
case 13:
var ew = event.widget;
if (ew != null) {
this.b$["org.eclipse.jface.action.ActionContributionItem"].handleWidgetSelection (event, (ew).getSelection ());
}break;
}
}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ActionContributionItem$5, i$, v$);
}) (this, null);
}return this.menuItemListener;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getMode", 
function () {
return this.mode;
});
Clazz.defineMethod (c$, "getToolItemListener", 
($fz = function () {
if (this.toolItemListener == null) {
this.toolItemListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.ActionContributionItem$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "ActionContributionItem$6", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (event) {
switch (event.type) {
case 12:
this.b$["org.eclipse.jface.action.ActionContributionItem"].handleWidgetDispose (event);
break;
case 13:
var ew = event.widget;
if (ew != null) {
this.b$["org.eclipse.jface.action.ActionContributionItem"].handleWidgetSelection (event, (ew).getSelection ());
}break;
}
}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.ActionContributionItem$6, i$, v$);
}) (this, null);
}return this.toolItemListener;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "handleWidgetDispose", 
($fz = function (e) {
if (e.widget === this.widget) {
if (this.action.getStyle () == 4) {
var mc = this.action.getMenuCreator ();
if (mc != null) {
mc.dispose ();
}}this.action.removePropertyChangeListener (this.propertyListener);
if (this.action != null) {
var commandId = this.action.getActionDefinitionId ();
var callback = org.eclipse.jface.action.ExternalActionManager.getInstance ().getCallback ();
if ((callback != null) && (commandId != null)) {
callback.removePropertyChangeListener (commandId, this.actionTextListener);
}}this.widget = null;
this.disposeOldImages ();
}}, $fz.isPrivate = true, $fz), "$wt.widgets.Event");
Clazz.defineMethod (c$, "handleWidgetSelection", 
($fz = function (e, selection) {
var item = e.widget;
if (item != null) {
var style = item.getStyle ();
if ((style & (34)) != 0) {
if (this.action.getStyle () == 2) {
this.action.setChecked (selection);
}} else if ((style & 16) != 0) {
if (this.action.getStyle () == 8) {
this.action.setChecked (selection);
}} else if ((style & 4) != 0) {
if (e.detail == 4) {
if (this.action.getStyle () == 4) {
var mc = this.action.getMenuCreator ();
var ti = item;
if (mc != null) {
var m = mc.getMenu (ti.getParent ());
if (m != null) {
var b = ti.getBounds ();
var p = ti.getParent ().toDisplay ( new $wt.graphics.Point (b.x, b.y + b.height));
m.setLocation (p.x, p.y);
m.setVisible (true);
return ;
}}}}}if (this.action.isEnabled ()) {
var trace = org.eclipse.jface.util.Policy.TRACE_ACTIONS;
var ms = System.currentTimeMillis ();
if (trace) System.out.println ("Running action: " + this.action.getText ());
this.action.runWithEvent (e);
if (trace) System.out.println ((System.currentTimeMillis () - ms) + " ms to run action: " + this.action.getText ());
}}}, $fz.isPrivate = true, $fz), "$wt.widgets.Event,~B");
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.action.hashCode ();
});
Clazz.defineMethod (c$, "hasImages", 
($fz = function (actionToCheck) {
return actionToCheck.getImageDescriptor () != null || actionToCheck.getHoverImageDescriptor () != null || actionToCheck.getDisabledImageDescriptor () != null;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.action.IAction");
Clazz.defineMethod (c$, "isCommandActive", 
($fz = function () {
var actionToCheck = this.getAction ();
if (actionToCheck != null) {
var commandId = actionToCheck.getActionDefinitionId ();
var callback = org.eclipse.jface.action.ExternalActionManager.getInstance ().getCallback ();
if (callback != null) return callback.isActive (commandId);
}return true;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "isDynamic", 
function () {
if (Clazz.instanceOf (this.widget, $wt.widgets.MenuItem)) {
var itemIsCheck = (this.widget.getStyle () & 32) != 0;
var actionIsCheck = this.getAction () != null && this.getAction ().getStyle () == 2;
var itemIsRadio = (this.widget.getStyle () & 16) != 0;
var actionIsRadio = this.getAction () != null && this.getAction ().getStyle () == 8;
return (itemIsCheck != actionIsCheck) || (itemIsRadio != actionIsRadio);
}return false;
});
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return this.action != null && this.action.isEnabled ();
});
Clazz.defineMethod (c$, "isEnabledAllowed", 
function () {
if (this.getParent () == null) return true;
var value = this.getParent ().getOverrides ().getEnabled (this);
return (value == null) ? true : value.booleanValue ();
});
Clazz.defineMethod (c$, "isVisible", 
function () {
return Clazz.superCall (this, org.eclipse.jface.action.ActionContributionItem, "isVisible", []) && this.isCommandActive ();
});
Clazz.defineMethod (c$, "setMode", 
function (mode) {
this.mode = mode;
this.update ();
}, "~N");
Clazz.defineMethod (c$, "update", 
function () {
this.update (null);
});
Clazz.defineMethod (c$, "update", 
function (propertyName) {
if (this.widget != null) {
var textChanged = propertyName == null || propertyName.equals ("text");
var imageChanged = propertyName == null || propertyName.equals ("image");
var tooltipTextChanged = propertyName == null || propertyName.equals ("toolTipText");
var enableStateChanged = propertyName == null || propertyName.equals ("enabled") || propertyName.equals ("enabled");
var checkChanged = (this.action.getStyle () == 2 || this.action.getStyle () == 8) && (propertyName == null || propertyName.equals ("checked"));
if (Clazz.instanceOf (this.widget, $wt.widgets.ToolItem)) {
var ti = this.widget;
var text = this.action.getText ();
var showText = text != null && ((this.getMode () & org.eclipse.jface.action.ActionContributionItem.MODE_FORCE_TEXT) != 0 || !this.hasImages (this.action));
if (showText && text != null) {
text = org.eclipse.jface.action.Action.removeAcceleratorText (text);
text = org.eclipse.jface.action.Action.removeMnemonics (text);
}if (textChanged) {
var textToSet = showText ? text : "";
var rightStyle = (ti.getParent ().getStyle () & 131072) != 0;
if (rightStyle || !ti.getText ().equals (textToSet)) {
ti.setText (textToSet);
}}if (imageChanged) {
this.updateImages (!showText);
}if (tooltipTextChanged || textChanged) {
var toolTip = this.action.getToolTipText ();
if (!showText || toolTip != null && !toolTip.equals (text)) {
ti.setToolTipText (toolTip);
} else {
ti.setToolTipText (null);
}}if (enableStateChanged) {
var shouldBeEnabled = this.action.isEnabled () && this.isEnabledAllowed ();
if (ti.getEnabled () != shouldBeEnabled) ti.setEnabled (shouldBeEnabled);
}if (checkChanged) {
var bv = this.action.isChecked ();
if (ti.getSelection () != bv) ti.setSelection (bv);
}return ;
}if (Clazz.instanceOf (this.widget, $wt.widgets.MenuItem)) {
var mi = this.widget;
if (textChanged) {
var accelerator = 0;
var acceleratorText = null;
var updatedAction = this.getAction ();
var text = null;
accelerator = updatedAction.getAccelerator ();
var callback = org.eclipse.jface.action.ExternalActionManager.getInstance ().getCallback ();
if ((accelerator != 0) && (callback != null) && (callback.isAcceleratorInUse (accelerator))) {
accelerator = 0;
}var commandId = updatedAction.getActionDefinitionId ();
if ($WT.getPlatform ().equals ("gtk")) {
if ((callback != null) && (commandId != null)) {
var commandAccelerator = callback.getAccelerator (commandId);
if (commandAccelerator != null) {
var accelInt = callback.getAccelerator (commandId).intValue ();
if ((accelInt >= org.eclipse.jface.action.ActionContributionItem.LOWER_GTK_ACCEL_BOUND) && (accelInt <= org.eclipse.jface.action.ActionContributionItem.UPPER_GTK_ACCEL_BOUND)) {
accelerator = accelInt;
acceleratorText = callback.getAcceleratorText (commandId);
}}}}if (accelerator == 0) {
if ((callback != null) && (commandId != null)) {
acceleratorText = callback.getAcceleratorText (commandId);
}} else {
acceleratorText = org.eclipse.jface.action.Action.convertAccelerator (accelerator);
}var overrides = null;
if (this.getParent () != null) overrides = this.getParent ().getOverrides ();
if (overrides != null) text = this.getParent ().getOverrides ().getText (this);
mi.setAccelerator (accelerator);
if (text == null) text = updatedAction.getText ();
if (text == null) text = "";
 else text = org.eclipse.jface.action.Action.removeAcceleratorText (text);
if (acceleratorText == null) mi.setText (text);
 else mi.setText (text + '\t' + acceleratorText);
}if (imageChanged) this.updateImages (false);
if (enableStateChanged) {
var shouldBeEnabled = this.action.isEnabled () && this.isEnabledAllowed ();
if (mi.getEnabled () != shouldBeEnabled) mi.setEnabled (shouldBeEnabled);
}if (checkChanged) {
var bv = this.action.isChecked ();
if (mi.getSelection () != bv) mi.setSelection (bv);
}return ;
}if (Clazz.instanceOf (this.widget, $wt.widgets.Button)) {
var button = this.widget;
if (imageChanged && this.updateImages (false)) textChanged = false;
if (textChanged) {
var text = this.action.getText ();
if (text == null) text = "";
 else text = org.eclipse.jface.action.Action.removeAcceleratorText (text);
button.setText (text);
}if (tooltipTextChanged) button.setToolTipText (this.action.getToolTipText ());
if (enableStateChanged) {
var shouldBeEnabled = this.action.isEnabled () && this.isEnabledAllowed ();
if (button.getEnabled () != shouldBeEnabled) button.setEnabled (shouldBeEnabled);
}if (checkChanged) {
var bv = this.action.isChecked ();
if (button.getSelection () != bv) button.setSelection (bv);
}return ;
}}}, "~S");
Clazz.defineMethod (c$, "updateImages", 
($fz = function (forceImage) {
var parentResourceManager = org.eclipse.jface.resource.JFaceResources.getResources ();
if (Clazz.instanceOf (this.widget, $wt.widgets.ToolItem)) {
if (org.eclipse.jface.action.ActionContributionItem.USE_COLOR_ICONS) {
var image = this.action.getHoverImageDescriptor ();
if (image == null) {
image = this.action.getImageDescriptor ();
}var disabledImage = this.action.getDisabledImageDescriptor ();
if (image == null && forceImage) {
image = org.eclipse.jface.resource.ImageDescriptor.getMissingImageDescriptor ();
}var localManager =  new org.eclipse.jface.resource.LocalResourceManager (parentResourceManager);
(this.widget).setDisabledImage (disabledImage == null ? null : localManager.createImageWithDefault (disabledImage));
(this.widget).setImage (image == null ? null : localManager.createImageWithDefault (image));
this.disposeOldImages ();
this.imageManager = localManager;
return image != null;
}var image = this.action.getImageDescriptor ();
var hoverImage = this.action.getHoverImageDescriptor ();
var disabledImage = this.action.getDisabledImageDescriptor ();
if (image == null && hoverImage != null) {
image = org.eclipse.jface.resource.ImageDescriptor.createWithFlags (this.action.getHoverImageDescriptor (), 2);
} else {
if (hoverImage == null && image != null) {
hoverImage = image;
image = org.eclipse.jface.resource.ImageDescriptor.createWithFlags (this.action.getImageDescriptor (), 2);
}}if (hoverImage == null && image == null && forceImage) {
image = org.eclipse.jface.resource.ImageDescriptor.getMissingImageDescriptor ();
}var localManager =  new org.eclipse.jface.resource.LocalResourceManager (parentResourceManager);
(this.widget).setDisabledImage (disabledImage == null ? null : localManager.createImageWithDefault (disabledImage));
(this.widget).setHotImage (hoverImage == null ? null : localManager.createImageWithDefault (hoverImage));
(this.widget).setImage (image == null ? null : localManager.createImageWithDefault (image));
this.disposeOldImages ();
this.imageManager = localManager;
return image != null;
} else if (Clazz.instanceOf (this.widget, $wt.widgets.Item) || Clazz.instanceOf (this.widget, $wt.widgets.Button)) {
var image = this.action.getHoverImageDescriptor ();
if (image == null) {
image = this.action.getImageDescriptor ();
}if (image == null && forceImage) {
image = org.eclipse.jface.resource.ImageDescriptor.getMissingImageDescriptor ();
}var localManager =  new org.eclipse.jface.resource.LocalResourceManager (parentResourceManager);
if (Clazz.instanceOf (this.widget, $wt.widgets.Item)) {
(this.widget).setImage (image == null ? null : localManager.createImageWithDefault (image));
} else if (Clazz.instanceOf (this.widget, $wt.widgets.Button)) {
(this.widget).setImage (image == null ? null : localManager.createImageWithDefault (image));
}this.disposeOldImages ();
this.imageManager = localManager;
return image != null;
}return false;
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "disposeOldImages", 
($fz = function () {
if (this.imageManager != null) {
this.imageManager.dispose ();
this.imageManager = null;
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "shortenText", 
function (textValue, item) {
if (textValue == null) return null;
var gc =  new $wt.graphics.GC (item.getDisplay ());
var maxWidth = item.getImage ().getBounds ().width * 4;
if (gc.textExtent (textValue).x < maxWidth) {
gc.dispose ();
return textValue;
}for (var i = textValue.length; i > 0; i--) {
var test = textValue.substring (0, i);
test = test + "...";
if (gc.textExtent (test).x < maxWidth) {
gc.dispose ();
return test;
}}
gc.dispose ();
return textValue;
}, "~S,$wt.widgets.ToolItem");
Clazz.defineStatics (c$,
"MODE_FORCE_TEXT", 1);
c$.LOWER_GTK_ACCEL_BOUND = c$.prototype.LOWER_GTK_ACCEL_BOUND = $WT.MOD1 | $WT.MOD2 | ('A').charCodeAt (0);
c$.UPPER_GTK_ACCEL_BOUND = c$.prototype.UPPER_GTK_ACCEL_BOUND = $WT.MOD1 | $WT.MOD2 | ('F').charCodeAt (0);
Clazz.defineStatics (c$,
"ellipsis", "...",
"USE_COLOR_ICONS", true);
});
