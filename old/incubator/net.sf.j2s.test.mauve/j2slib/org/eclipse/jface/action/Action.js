Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.IAction", "java.lang.Boolean", "org.eclipse.jface.action.IMenuCreator", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.action.Action", ["java.lang.StringBuffer", "java.util.HashMap", "$.StringTokenizer", "org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.PropertyChangeEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listeners = null;
this.text = null;
this.description = null;
this.id = null;
this.actionDefinitionId = null;
this.toolTipText = null;
this.helpListener = null;
this.image = null;
this.hoverImage = null;
this.disabledImage = null;
this.value = null;
this.accelerator = 0;
this.enabled = true;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "Action", null, org.eclipse.jface.action.IAction);
Clazz.prepareFields (c$, function () {
this.listeners =  new org.eclipse.jface.util.ListenerList (3);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (text) {
this.construct ();
this.setText (text);
}, "~S");
Clazz.makeConstructor (c$, 
function (text, image) {
this.construct (text);
this.setImageDescriptor (image);
}, "~S,org.eclipse.jface.resource.ImageDescriptor");
Clazz.makeConstructor (c$, 
function (text, style) {
this.construct (text);
switch (style) {
case 1:
this.value = "PUSH_BTN";
break;
case 2:
this.value = org.eclipse.jface.action.Action.VAL_TOGGLE_BTN_OFF;
break;
case 4:
this.value = org.eclipse.jface.action.Action.VAL_DROP_DOWN_MENU;
break;
case 8:
this.value = org.eclipse.jface.action.Action.VAL_RADIO_BTN_OFF;
break;
}
}, "~S,~N");
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (listener) {
this.listeners.add (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
c$.convertLocalizedAccelerator = Clazz.defineMethod (c$, "convertLocalizedAccelerator", 
($fz = function (acceleratorText) {
var accelerator = 0;
var stok =  new java.util.StringTokenizer (acceleratorText, "+");
var keyCode = -1;
var hasMoreTokens = stok.hasMoreTokens ();
while (hasMoreTokens) {
var token = stok.nextToken ();
hasMoreTokens = stok.hasMoreTokens ();
if (hasMoreTokens) {
var modifier = org.eclipse.jface.action.Action.findLocalizedModifier (token);
if (modifier != 0) {
accelerator |= modifier;
} else {
return 0;
}} else {
keyCode = org.eclipse.jface.action.Action.findLocalizedKeyCode (token);
}}
if (keyCode != -1) {
accelerator |= keyCode;
}return accelerator;
}, $fz.isPrivate = true, $fz), "~S");
c$.convertAccelerator = Clazz.defineMethod (c$, "convertAccelerator", 
function (acceleratorText) {
var accelerator = 0;
var stok =  new java.util.StringTokenizer (acceleratorText, "+");
var keyCode = -1;
var hasMoreTokens = stok.hasMoreTokens ();
while (hasMoreTokens) {
var token = stok.nextToken ();
hasMoreTokens = stok.hasMoreTokens ();
if (hasMoreTokens) {
var modifier = org.eclipse.jface.action.Action.findModifier (token);
if (modifier != 0) {
accelerator |= modifier;
} else {
return 0;
}} else {
keyCode = org.eclipse.jface.action.Action.findKeyCode (token);
}}
if (keyCode != -1) {
accelerator |= keyCode;
}return accelerator;
}, "~S");
c$.convertAccelerator = Clazz.defineMethod (c$, "convertAccelerator", 
function (keyCode) {
var modifier = org.eclipse.jface.action.Action.getModifierString (keyCode);
var fullKey;
if (modifier.equals ("")) {
fullKey = org.eclipse.jface.action.Action.findKeyString (keyCode);
} else {
fullKey = modifier + "+" + org.eclipse.jface.action.Action.findKeyString (keyCode);
}return fullKey;
}, "~N");
c$.getModifierString = Clazz.defineMethod (c$, "getModifierString", 
($fz = function (keyCode) {
var modString = "";
if ((keyCode & 262144) != 0) {
modString = org.eclipse.jface.action.Action.findModifierString (keyCode & 262144);
}if ((keyCode & 65536) != 0) {
if (modString.equals ("")) {
modString = org.eclipse.jface.action.Action.findModifierString (keyCode & 65536);
} else {
modString = modString + "+" + org.eclipse.jface.action.Action.findModifierString (keyCode & 65536);
}}if ((keyCode & 131072) != 0) {
if (modString.equals ("")) {
modString = org.eclipse.jface.action.Action.findModifierString (keyCode & 131072);
} else {
modString = modString + "+" + org.eclipse.jface.action.Action.findModifierString (keyCode & 131072);
}}if ((keyCode & 4194304) != 0) {
if (modString.equals ("")) {
modString = org.eclipse.jface.action.Action.findModifierString (keyCode & 4194304);
} else {
modString = modString + "+" + org.eclipse.jface.action.Action.findModifierString (keyCode & 4194304);
}}return modString;
}, $fz.isPrivate = true, $fz), "~N");
c$.extractAcceleratorText = Clazz.defineMethod (c$, "extractAcceleratorText", 
($fz = function (text) {
var index = text.lastIndexOf ('\t');
if (index == -1) index = text.lastIndexOf ('@');
if (index >= 0) return text.substring (index + 1);
return null;
}, $fz.isPrivate = true, $fz), "~S");
c$.findKeyCode = Clazz.defineMethod (c$, "findKeyCode", 
function (token) {
if (org.eclipse.jface.action.Action.keyCodes == null) org.eclipse.jface.action.Action.initKeyCodes ();
token = token.toUpperCase ();
var i = org.eclipse.jface.action.Action.keyCodes.get (token);
if (i != null) return i.intValue ();
if (token.length == 1) return token.charAt (0);
return -1;
}, "~S");
c$.findLocalizedKeyCode = Clazz.defineMethod (c$, "findLocalizedKeyCode", 
($fz = function (token) {
if (org.eclipse.jface.action.Action.localizedKeyCodes == null) org.eclipse.jface.action.Action.initLocalizedKeyCodes ();
token = token.toUpperCase ();
var i = org.eclipse.jface.action.Action.localizedKeyCodes.get (token);
if (i != null) return i.intValue ();
if (token.length == 1) return token.charAt (0);
return -1;
}, $fz.isPrivate = true, $fz), "~S");
c$.findKeyString = Clazz.defineMethod (c$, "findKeyString", 
function (keyCode) {
if (org.eclipse.jface.action.Action.keyStrings == null) org.eclipse.jface.action.Action.initKeyStrings ();
var i = keyCode & -4653057;
var integer =  new Integer (i);
var result = org.eclipse.jface.action.Action.keyStrings.get (integer);
if (result != null) return result;
result =  String.instantialize ([String.fromCharCode (i)]);
return result;
}, "~N");
c$.findModifier = Clazz.defineMethod (c$, "findModifier", 
function (token) {
token = token.toUpperCase ();
if (token.equals ("CTRL")) return 262144;
if (token.equals ("SHIFT")) return 131072;
if (token.equals ("ALT")) return 65536;
if (token.equals ("COMMAND")) return 4194304;
return 0;
}, "~S");
c$.findLocalizedModifier = Clazz.defineMethod (c$, "findLocalizedModifier", 
($fz = function (token) {
if (org.eclipse.jface.action.Action.LOCALIZED_CTRL == null) org.eclipse.jface.action.Action.initLocalizedModifiers ();
token = token.toUpperCase ();
if (token.equals (org.eclipse.jface.action.Action.LOCALIZED_CTRL)) return 262144;
if (token.equals (org.eclipse.jface.action.Action.LOCALIZED_SHIFT)) return 131072;
if (token.equals (org.eclipse.jface.action.Action.LOCALIZED_ALT)) return 65536;
if (token.equals (org.eclipse.jface.action.Action.LOCALIZED_COMMAND)) return 4194304;
return 0;
}, $fz.isPrivate = true, $fz), "~S");
c$.initLocalizedModifiers = Clazz.defineMethod (c$, "initLocalizedModifiers", 
($fz = function () {
($t$ = org.eclipse.jface.action.Action.LOCALIZED_CTRL = org.eclipse.jface.resource.JFaceResources.getString ("Ctrl").toUpperCase (), org.eclipse.jface.action.Action.prototype.LOCALIZED_CTRL = org.eclipse.jface.action.Action.LOCALIZED_CTRL, $t$);
($t$ = org.eclipse.jface.action.Action.LOCALIZED_SHIFT = org.eclipse.jface.resource.JFaceResources.getString ("Shift").toUpperCase (), org.eclipse.jface.action.Action.prototype.LOCALIZED_SHIFT = org.eclipse.jface.action.Action.LOCALIZED_SHIFT, $t$);
($t$ = org.eclipse.jface.action.Action.LOCALIZED_ALT = org.eclipse.jface.resource.JFaceResources.getString ("Alt").toUpperCase (), org.eclipse.jface.action.Action.prototype.LOCALIZED_ALT = org.eclipse.jface.action.Action.LOCALIZED_ALT, $t$);
($t$ = org.eclipse.jface.action.Action.LOCALIZED_COMMAND = org.eclipse.jface.resource.JFaceResources.getString ("Command").toUpperCase (), org.eclipse.jface.action.Action.prototype.LOCALIZED_COMMAND = org.eclipse.jface.action.Action.LOCALIZED_COMMAND, $t$);
}, $fz.isPrivate = true, $fz));
c$.findModifierString = Clazz.defineMethod (c$, "findModifierString", 
function (keyCode) {
if (keyCode == 262144) return org.eclipse.jface.resource.JFaceResources.getString ("Ctrl");
if (keyCode == 65536) return org.eclipse.jface.resource.JFaceResources.getString ("Alt");
if (keyCode == 131072) return org.eclipse.jface.resource.JFaceResources.getString ("Shift");
if (keyCode == 4194304) return org.eclipse.jface.resource.JFaceResources.getString ("Command");
return null;
}, "~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (!this.listeners.isEmpty ()) {
this.firePropertyChange ( new org.eclipse.jface.util.PropertyChangeEvent (this, propertyName, oldValue, newValue));
}}, "~S,~O,~O");
Clazz.defineMethod (c$, "firePropertyChange", 
function (event) {
var list = this.listeners.getListeners ();
for (var i = 0; i < list.length; ++i) {
(list[i]).propertyChange (event);
}
}, "org.eclipse.jface.util.PropertyChangeEvent");
Clazz.overrideMethod (c$, "getAccelerator", 
function () {
return this.accelerator;
});
Clazz.overrideMethod (c$, "getActionDefinitionId", 
function () {
return this.actionDefinitionId;
});
Clazz.overrideMethod (c$, "getDescription", 
function () {
if (this.description != null) return this.description;
return this.getToolTipText ();
});
Clazz.overrideMethod (c$, "getDisabledImageDescriptor", 
function () {
return this.disabledImage;
});
Clazz.overrideMethod (c$, "getHelpListener", 
function () {
return this.helpListener;
});
Clazz.overrideMethod (c$, "getHoverImageDescriptor", 
function () {
return this.hoverImage;
});
Clazz.overrideMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.overrideMethod (c$, "getImageDescriptor", 
function () {
return this.image;
});
Clazz.overrideMethod (c$, "getMenuCreator", 
function () {
if (this.value === org.eclipse.jface.action.Action.VAL_DROP_DOWN_MENU) return null;
if (Clazz.instanceOf (this.value, org.eclipse.jface.action.IMenuCreator)) return this.value;
return null;
});
Clazz.overrideMethod (c$, "getStyle", 
function () {
if (this.value === "PUSH_BTN" || this.value == null) return 1;
if (this.value === org.eclipse.jface.action.Action.VAL_TOGGLE_BTN_ON || this.value === org.eclipse.jface.action.Action.VAL_TOGGLE_BTN_OFF) return 2;
if (this.value === org.eclipse.jface.action.Action.VAL_RADIO_BTN_ON || this.value === org.eclipse.jface.action.Action.VAL_RADIO_BTN_OFF) return 8;
if (Clazz.instanceOf (this.value, org.eclipse.jface.action.IMenuCreator)) return 4;
return 1;
});
Clazz.overrideMethod (c$, "getText", 
function () {
return this.text;
});
Clazz.overrideMethod (c$, "getToolTipText", 
function () {
return this.toolTipText;
});
c$.initKeyCodes = Clazz.defineMethod (c$, "initKeyCodes", 
($fz = function () {
($t$ = org.eclipse.jface.action.Action.keyCodes =  new java.util.HashMap (40), org.eclipse.jface.action.Action.prototype.keyCodes = org.eclipse.jface.action.Action.keyCodes, $t$);
org.eclipse.jface.action.Action.keyCodes.put ("BACKSPACE",  new Integer (8));
org.eclipse.jface.action.Action.keyCodes.put ("TAB",  new Integer (9));
org.eclipse.jface.action.Action.keyCodes.put ("RETURN",  new Integer (13));
org.eclipse.jface.action.Action.keyCodes.put ("ENTER",  new Integer (13));
org.eclipse.jface.action.Action.keyCodes.put ("ESCAPE",  new Integer (27));
org.eclipse.jface.action.Action.keyCodes.put ("ESC",  new Integer (27));
org.eclipse.jface.action.Action.keyCodes.put ("DELETE",  new Integer (127));
org.eclipse.jface.action.Action.keyCodes.put ("SPACE",  new Integer (' '.charCodeAt (0)));
org.eclipse.jface.action.Action.keyCodes.put ("ARROW_UP",  new Integer (16777217));
org.eclipse.jface.action.Action.keyCodes.put ("ARROW_DOWN",  new Integer (16777218));
org.eclipse.jface.action.Action.keyCodes.put ("ARROW_LEFT",  new Integer (16777219));
org.eclipse.jface.action.Action.keyCodes.put ("ARROW_RIGHT",  new Integer (16777220));
org.eclipse.jface.action.Action.keyCodes.put ("PAGE_UP",  new Integer (16777221));
org.eclipse.jface.action.Action.keyCodes.put ("PAGE_DOWN",  new Integer (16777222));
org.eclipse.jface.action.Action.keyCodes.put ("HOME",  new Integer (16777223));
org.eclipse.jface.action.Action.keyCodes.put ("END",  new Integer (16777224));
org.eclipse.jface.action.Action.keyCodes.put ("INSERT",  new Integer (16777225));
org.eclipse.jface.action.Action.keyCodes.put ("F1",  new Integer (16777226));
org.eclipse.jface.action.Action.keyCodes.put ("F2",  new Integer (16777227));
org.eclipse.jface.action.Action.keyCodes.put ("F3",  new Integer (16777228));
org.eclipse.jface.action.Action.keyCodes.put ("F4",  new Integer (16777229));
org.eclipse.jface.action.Action.keyCodes.put ("F5",  new Integer (16777230));
org.eclipse.jface.action.Action.keyCodes.put ("F6",  new Integer (16777231));
org.eclipse.jface.action.Action.keyCodes.put ("F7",  new Integer (16777232));
org.eclipse.jface.action.Action.keyCodes.put ("F8",  new Integer (16777233));
org.eclipse.jface.action.Action.keyCodes.put ("F9",  new Integer (16777234));
org.eclipse.jface.action.Action.keyCodes.put ("F10",  new Integer (16777235));
org.eclipse.jface.action.Action.keyCodes.put ("F11",  new Integer (16777236));
org.eclipse.jface.action.Action.keyCodes.put ("F12",  new Integer (16777237));
}, $fz.isPrivate = true, $fz));
c$.initLocalizedKeyCodes = Clazz.defineMethod (c$, "initLocalizedKeyCodes", 
($fz = function () {
($t$ = org.eclipse.jface.action.Action.localizedKeyCodes =  new java.util.HashMap (40), org.eclipse.jface.action.Action.prototype.localizedKeyCodes = org.eclipse.jface.action.Action.localizedKeyCodes, $t$);
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Backspace").toUpperCase (),  new Integer (8));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Tab").toUpperCase (),  new Integer (9));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Return").toUpperCase (),  new Integer (13));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Enter").toUpperCase (),  new Integer (13));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Escape").toUpperCase (),  new Integer (27));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Esc").toUpperCase (),  new Integer (27));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Delete").toUpperCase (),  new Integer (127));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Space").toUpperCase (),  new Integer (' '.charCodeAt (0)));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Arrow_Up").toUpperCase (),  new Integer (16777217));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Arrow_Down").toUpperCase (),  new Integer (16777218));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Arrow_Left").toUpperCase (),  new Integer (16777219));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Arrow_Right").toUpperCase (),  new Integer (16777220));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Page_Up").toUpperCase (),  new Integer (16777221));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Page_Down").toUpperCase (),  new Integer (16777222));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Home").toUpperCase (),  new Integer (16777223));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("End").toUpperCase (),  new Integer (16777224));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("Insert").toUpperCase (),  new Integer (16777225));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F1").toUpperCase (),  new Integer (16777226));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F2").toUpperCase (),  new Integer (16777227));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F3").toUpperCase (),  new Integer (16777228));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F4").toUpperCase (),  new Integer (16777229));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F5").toUpperCase (),  new Integer (16777230));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F6").toUpperCase (),  new Integer (16777231));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F7").toUpperCase (),  new Integer (16777232));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F8").toUpperCase (),  new Integer (16777233));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F9").toUpperCase (),  new Integer (16777234));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F10").toUpperCase (),  new Integer (16777235));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F11").toUpperCase (),  new Integer (16777236));
org.eclipse.jface.action.Action.localizedKeyCodes.put (org.eclipse.jface.resource.JFaceResources.getString ("F12").toUpperCase (),  new Integer (16777237));
}, $fz.isPrivate = true, $fz));
c$.initKeyStrings = Clazz.defineMethod (c$, "initKeyStrings", 
($fz = function () {
($t$ = org.eclipse.jface.action.Action.keyStrings =  new java.util.HashMap (40), org.eclipse.jface.action.Action.prototype.keyStrings = org.eclipse.jface.action.Action.keyStrings, $t$);
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (8), org.eclipse.jface.resource.JFaceResources.getString ("Backspace"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (9), org.eclipse.jface.resource.JFaceResources.getString ("Tab"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (13), org.eclipse.jface.resource.JFaceResources.getString ("Return"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (13), org.eclipse.jface.resource.JFaceResources.getString ("Enter"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (27), org.eclipse.jface.resource.JFaceResources.getString ("Escape"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (27), org.eclipse.jface.resource.JFaceResources.getString ("Esc"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (127), org.eclipse.jface.resource.JFaceResources.getString ("Delete"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (' '.charCodeAt (0)), org.eclipse.jface.resource.JFaceResources.getString ("Space"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777217), org.eclipse.jface.resource.JFaceResources.getString ("Arrow_Up"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777218), org.eclipse.jface.resource.JFaceResources.getString ("Arrow_Down"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777219), org.eclipse.jface.resource.JFaceResources.getString ("Arrow_Left"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777220), org.eclipse.jface.resource.JFaceResources.getString ("Arrow_Right"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777221), org.eclipse.jface.resource.JFaceResources.getString ("Page_Up"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777222), org.eclipse.jface.resource.JFaceResources.getString ("Page_Down"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777223), org.eclipse.jface.resource.JFaceResources.getString ("Home"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777224), org.eclipse.jface.resource.JFaceResources.getString ("End"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777225), org.eclipse.jface.resource.JFaceResources.getString ("Insert"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777226), org.eclipse.jface.resource.JFaceResources.getString ("F1"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777227), org.eclipse.jface.resource.JFaceResources.getString ("F2"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777228), org.eclipse.jface.resource.JFaceResources.getString ("F3"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777229), org.eclipse.jface.resource.JFaceResources.getString ("F4"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777230), org.eclipse.jface.resource.JFaceResources.getString ("F5"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777231), org.eclipse.jface.resource.JFaceResources.getString ("F6"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777232), org.eclipse.jface.resource.JFaceResources.getString ("F7"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777233), org.eclipse.jface.resource.JFaceResources.getString ("F8"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777234), org.eclipse.jface.resource.JFaceResources.getString ("F9"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777235), org.eclipse.jface.resource.JFaceResources.getString ("F10"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777236), org.eclipse.jface.resource.JFaceResources.getString ("F11"));
org.eclipse.jface.action.Action.keyStrings.put ( new Integer (16777237), org.eclipse.jface.resource.JFaceResources.getString ("F12"));
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "isChecked", 
function () {
return this.value === org.eclipse.jface.action.Action.VAL_TOGGLE_BTN_ON || this.value === org.eclipse.jface.action.Action.VAL_RADIO_BTN_ON;
});
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz.overrideMethod (c$, "isHandled", 
function () {
return true;
});
c$.removeAcceleratorText = Clazz.defineMethod (c$, "removeAcceleratorText", 
function (text) {
var index = text.lastIndexOf ('\t');
if (index == -1) index = text.lastIndexOf ('@');
if (index >= 0) return text.substring (0, index);
return text;
}, "~S");
c$.removeMnemonics = Clazz.defineMethod (c$, "removeMnemonics", 
function (text) {
var index = text.indexOf ('&');
if (index == -1) {
return text;
}var len = text.length;
var sb =  new StringBuffer (len);
var lastIndex = 0;
while (index != -1) {
if (index == len - 1) {
break;
}if ((text.charAt (index + 1)).charCodeAt (0) == ('&').charCodeAt (0)) {
++index;
}if (index > 0 && (text.charAt (index - 1)).charCodeAt (0) == ('(').charCodeAt (0) && text.length >= index + 3 && (text.charAt (index + 2)).charCodeAt (0) == (')').charCodeAt (0)) {
sb.append (text.substring (lastIndex, index - 1));
index += 3;
} else {
sb.append (text.substring (lastIndex, index));
++index;
}lastIndex = index;
index = text.indexOf ('&', index);
}
if (lastIndex < len) {
sb.append (text.substring (lastIndex, len));
}return sb.toString ();
}, "~S");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (listener) {
this.listeners.remove (listener);
}, "org.eclipse.jface.util.IPropertyChangeListener");
Clazz.overrideMethod (c$, "run", 
function () {
});
Clazz.overrideMethod (c$, "runWithEvent", 
function (event) {
this.run ();
}, "$wt.widgets.Event");
Clazz.overrideMethod (c$, "setActionDefinitionId", 
function (id) {
this.actionDefinitionId = id;
}, "~S");
Clazz.overrideMethod (c$, "setChecked", 
function (checked) {
var newValue = null;
if (this.value == null || this.value === org.eclipse.jface.action.Action.VAL_TOGGLE_BTN_ON || this.value === org.eclipse.jface.action.Action.VAL_TOGGLE_BTN_OFF) {
newValue = checked ? org.eclipse.jface.action.Action.VAL_TOGGLE_BTN_ON : org.eclipse.jface.action.Action.VAL_TOGGLE_BTN_OFF;
} else if (this.value === org.eclipse.jface.action.Action.VAL_RADIO_BTN_ON || this.value === org.eclipse.jface.action.Action.VAL_RADIO_BTN_OFF) {
newValue = checked ? org.eclipse.jface.action.Action.VAL_RADIO_BTN_ON : org.eclipse.jface.action.Action.VAL_RADIO_BTN_OFF;
} else {
return ;
}if (newValue !== this.value) {
this.value = newValue;
if (checked) this.firePropertyChange ("checked", Boolean.FALSE, Boolean.TRUE);
 else this.firePropertyChange ("checked", Boolean.TRUE, Boolean.FALSE);
}}, "~B");
Clazz.overrideMethod (c$, "setDescription", 
function (text) {
if ((this.description == null && text != null) || (this.description != null && text == null) || (this.description != null && text != null && !text.equals (this.description))) {
var oldDescription = this.description;
this.description = text;
this.firePropertyChange ("description", oldDescription, this.description);
}}, "~S");
Clazz.overrideMethod (c$, "setDisabledImageDescriptor", 
function (newImage) {
if (this.disabledImage !== newImage) {
var oldImage = this.disabledImage;
this.disabledImage = newImage;
this.firePropertyChange ("image", oldImage, newImage);
}}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.overrideMethod (c$, "setEnabled", 
function (enabled) {
if (enabled != this.enabled) {
var oldVal = this.enabled ? Boolean.TRUE : Boolean.FALSE;
var newVal = enabled ? Boolean.TRUE : Boolean.FALSE;
this.enabled = enabled;
this.firePropertyChange ("enabled", oldVal, newVal);
}}, "~B");
Clazz.overrideMethod (c$, "setHelpListener", 
function (listener) {
this.helpListener = listener;
}, "$wt.events.HelpListener");
Clazz.overrideMethod (c$, "setHoverImageDescriptor", 
function (newImage) {
if (this.hoverImage !== newImage) {
var oldImage = this.hoverImage;
this.hoverImage = newImage;
this.firePropertyChange ("image", oldImage, newImage);
}}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.overrideMethod (c$, "setId", 
function (id) {
this.id = id;
}, "~S");
Clazz.overrideMethod (c$, "setImageDescriptor", 
function (newImage) {
if (this.image !== newImage) {
var oldImage = this.image;
this.image = newImage;
this.firePropertyChange ("image", oldImage, newImage);
}}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.overrideMethod (c$, "setMenuCreator", 
function (creator) {
if (this.value == null) {
this.value = creator;
return ;
}if (Clazz.instanceOf (this.value, org.eclipse.jface.action.IMenuCreator)) this.value = creator == null ? org.eclipse.jface.action.Action.VAL_DROP_DOWN_MENU : creator;
}, "org.eclipse.jface.action.IMenuCreator");
Clazz.overrideMethod (c$, "setText", 
function (text) {
var oldText = this.text;
var oldAccel = this.accelerator;
this.text = text;
if (text != null) {
var acceleratorText = org.eclipse.jface.action.Action.extractAcceleratorText (text);
if (acceleratorText != null) {
var newAccelerator = org.eclipse.jface.action.Action.convertLocalizedAccelerator (acceleratorText);
if (newAccelerator > 0) {
this.setAccelerator (newAccelerator);
}}}if (!(this.accelerator == oldAccel && (oldText == null ? this.text == null : oldText.equals (this.text)))) {
this.firePropertyChange ("text", oldText, this.text);
}}, "~S");
Clazz.overrideMethod (c$, "setToolTipText", 
function (toolTipText) {
var oldToolTipText = this.toolTipText;
if (!(oldToolTipText == null ? toolTipText == null : oldToolTipText.equals (toolTipText))) {
this.toolTipText = toolTipText;
this.firePropertyChange ("toolTipText", oldToolTipText, toolTipText);
}}, "~S");
Clazz.overrideMethod (c$, "setAccelerator", 
function (keycode) {
this.accelerator = keycode;
}, "~N");
Clazz.defineMethod (c$, "notifyResult", 
function (success) {
this.firePropertyChange ("result", null, success ? Boolean.TRUE : Boolean.FALSE);
}, "~B");
Clazz.defineStatics (c$,
"VAL_PUSH_BTN", "PUSH_BTN");
c$.VAL_RADIO_BTN_ON = c$.prototype.VAL_RADIO_BTN_ON =  new Integer (1);
c$.VAL_RADIO_BTN_OFF = c$.prototype.VAL_RADIO_BTN_OFF =  new Integer (0);
c$.VAL_TOGGLE_BTN_ON = c$.prototype.VAL_TOGGLE_BTN_ON = Boolean.TRUE;
c$.VAL_TOGGLE_BTN_OFF = c$.prototype.VAL_TOGGLE_BTN_OFF = Boolean.FALSE;
c$.VAL_DROP_DOWN_MENU = c$.prototype.VAL_DROP_DOWN_MENU = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.Action$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.action, "Action$1", null, org.eclipse.jface.action.IMenuCreator);
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "getMenu", 
function (parent) {
return null;
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "getMenu", 
function (parent) {
return null;
}, "$wt.widgets.Menu");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.Action$1, i$, v$);
}) (this, null);
Clazz.defineStatics (c$,
"keyCodes", null,
"localizedKeyCodes", null,
"LOCALIZED_CTRL", null,
"LOCALIZED_SHIFT", null,
"LOCALIZED_ALT", null,
"LOCALIZED_COMMAND", null,
"keyStrings", null);
});
