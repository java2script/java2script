Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.InputEvent"], "java.awt.event.KeyEvent", ["java.lang.IllegalArgumentException", "$.StringBuilder", "java.awt.Toolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isProxyActive = false;
this.keyCode = 0;
this.keyChar = '\0';
this.keyLocation = 0;
Clazz.instantialize (this, arguments);
}, java.awt.event, "KeyEvent", java.awt.event.InputEvent);
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, keyCode, keyChar, keyLocation) {
Clazz.superConstructor (this, java.awt.event.KeyEvent, [source, id, when, modifiers]);
if (id == 400) {
if (keyChar == '\uffff') {
throw  new IllegalArgumentException ("invalid keyChar");
}if (keyCode != 0) {
throw  new IllegalArgumentException ("invalid keyCode");
}if (keyLocation != 0) {
throw  new IllegalArgumentException ("invalid keyLocation");
}}this.keyCode = keyCode;
this.keyChar = keyChar;
if ((keyLocation < 0) || (keyLocation > 4)) {
throw  new IllegalArgumentException ("invalid keyLocation");
}this.keyLocation = keyLocation;
if ((this.getModifiers () != 0) && (this.getModifiersEx () == 0)) {
this.setNewModifiers ();
} else if ((this.getModifiers () == 0) && (this.getModifiersEx () != 0)) {
this.setOldModifiers ();
}}, "java.awt.Component,~N,~N,~N,~N,~S,~N");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, keyCode, keyChar) {
this.construct (source, id, when, modifiers, keyCode, keyChar, 0);
}, "java.awt.Component,~N,~N,~N,~N,~S");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, keyCode) {
this.construct (source, id, when, modifiers, keyCode, String.fromCharCode (keyCode));
}, "java.awt.Component,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getKeyCode", 
function () {
return this.keyCode;
});
Clazz.defineMethod (c$, "setKeyCode", 
function (keyCode) {
this.keyCode = keyCode;
}, "~N");
Clazz.defineMethod (c$, "getKeyChar", 
function () {
return this.keyChar;
});
Clazz.defineMethod (c$, "setKeyChar", 
function (keyChar) {
this.keyChar = keyChar;
}, "~S");
Clazz.defineMethod (c$, "setModifiers", 
function (modifiers) {
this.modifiers = modifiers;
if ((this.getModifiers () != 0) && (this.getModifiersEx () == 0)) {
this.setNewModifiers ();
} else if ((this.getModifiers () == 0) && (this.getModifiersEx () != 0)) {
this.setOldModifiers ();
}}, "~N");
Clazz.defineMethod (c$, "getKeyLocation", 
function () {
return this.keyLocation;
});
c$.getKeyText = Clazz.defineMethod (c$, "getKeyText", 
function (keyCode) {
if (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90) {
return String.valueOf (String.fromCharCode (keyCode));
}switch (keyCode) {
case 10:
return java.awt.Toolkit.getProperty ("AWT.enter", "Enter");
case 8:
return java.awt.Toolkit.getProperty ("AWT.backSpace", "Backspace");
case 9:
return java.awt.Toolkit.getProperty ("AWT.tab", "Tab");
case 3:
return java.awt.Toolkit.getProperty ("AWT.cancel", "Cancel");
case 12:
return java.awt.Toolkit.getProperty ("AWT.clear", "Clear");
case 65312:
return java.awt.Toolkit.getProperty ("AWT.compose", "Compose");
case 19:
return java.awt.Toolkit.getProperty ("AWT.pause", "Pause");
case 20:
return java.awt.Toolkit.getProperty ("AWT.capsLock", "Caps Lock");
case 27:
return java.awt.Toolkit.getProperty ("AWT.escape", "Escape");
case 32:
return java.awt.Toolkit.getProperty ("AWT.space", "Space");
case 33:
return java.awt.Toolkit.getProperty ("AWT.pgup", "Page Up");
case 34:
return java.awt.Toolkit.getProperty ("AWT.pgdn", "Page Down");
case 35:
return java.awt.Toolkit.getProperty ("AWT.end", "End");
case 36:
return java.awt.Toolkit.getProperty ("AWT.home", "Home");
case 37:
return java.awt.Toolkit.getProperty ("AWT.left", "Left");
case 38:
return java.awt.Toolkit.getProperty ("AWT.up", "Up");
case 39:
return java.awt.Toolkit.getProperty ("AWT.right", "Right");
case 40:
return java.awt.Toolkit.getProperty ("AWT.down", "Down");
case 65368:
return java.awt.Toolkit.getProperty ("AWT.begin", "Begin");
case 16:
return java.awt.Toolkit.getProperty ("AWT.shift", "Shift");
case 17:
return java.awt.Toolkit.getProperty ("AWT.control", "Control");
case 18:
return java.awt.Toolkit.getProperty ("AWT.alt", "Alt");
case 157:
return java.awt.Toolkit.getProperty ("AWT.meta", "Meta");
case 65406:
return java.awt.Toolkit.getProperty ("AWT.altGraph", "Alt Graph");
case 44:
return java.awt.Toolkit.getProperty ("AWT.comma", "Comma");
case 46:
return java.awt.Toolkit.getProperty ("AWT.period", "Period");
case 47:
return java.awt.Toolkit.getProperty ("AWT.slash", "Slash");
case 59:
return java.awt.Toolkit.getProperty ("AWT.semicolon", "Semicolon");
case 61:
return java.awt.Toolkit.getProperty ("AWT.equals", "Equals");
case 91:
return java.awt.Toolkit.getProperty ("AWT.openBracket", "Open Bracket");
case 92:
return java.awt.Toolkit.getProperty ("AWT.backSlash", "Back Slash");
case 93:
return java.awt.Toolkit.getProperty ("AWT.closeBracket", "Close Bracket");
case 106:
return java.awt.Toolkit.getProperty ("AWT.multiply", "NumPad *");
case 107:
return java.awt.Toolkit.getProperty ("AWT.add", "NumPad +");
case 108:
return java.awt.Toolkit.getProperty ("AWT.separator", "NumPad ,");
case 109:
return java.awt.Toolkit.getProperty ("AWT.subtract", "NumPad -");
case 110:
return java.awt.Toolkit.getProperty ("AWT.decimal", "NumPad .");
case 111:
return java.awt.Toolkit.getProperty ("AWT.divide", "NumPad /");
case 127:
return java.awt.Toolkit.getProperty ("AWT.delete", "Delete");
case 144:
return java.awt.Toolkit.getProperty ("AWT.numLock", "Num Lock");
case 145:
return java.awt.Toolkit.getProperty ("AWT.scrollLock", "Scroll Lock");
case 524:
return java.awt.Toolkit.getProperty ("AWT.windows", "Windows");
case 525:
return java.awt.Toolkit.getProperty ("AWT.context", "Context Menu");
case 112:
return java.awt.Toolkit.getProperty ("AWT.f1", "F1");
case 113:
return java.awt.Toolkit.getProperty ("AWT.f2", "F2");
case 114:
return java.awt.Toolkit.getProperty ("AWT.f3", "F3");
case 115:
return java.awt.Toolkit.getProperty ("AWT.f4", "F4");
case 116:
return java.awt.Toolkit.getProperty ("AWT.f5", "F5");
case 117:
return java.awt.Toolkit.getProperty ("AWT.f6", "F6");
case 118:
return java.awt.Toolkit.getProperty ("AWT.f7", "F7");
case 119:
return java.awt.Toolkit.getProperty ("AWT.f8", "F8");
case 120:
return java.awt.Toolkit.getProperty ("AWT.f9", "F9");
case 121:
return java.awt.Toolkit.getProperty ("AWT.f10", "F10");
case 122:
return java.awt.Toolkit.getProperty ("AWT.f11", "F11");
case 123:
return java.awt.Toolkit.getProperty ("AWT.f12", "F12");
case 61440:
return java.awt.Toolkit.getProperty ("AWT.f13", "F13");
case 61441:
return java.awt.Toolkit.getProperty ("AWT.f14", "F14");
case 61442:
return java.awt.Toolkit.getProperty ("AWT.f15", "F15");
case 61443:
return java.awt.Toolkit.getProperty ("AWT.f16", "F16");
case 61444:
return java.awt.Toolkit.getProperty ("AWT.f17", "F17");
case 61445:
return java.awt.Toolkit.getProperty ("AWT.f18", "F18");
case 61446:
return java.awt.Toolkit.getProperty ("AWT.f19", "F19");
case 61447:
return java.awt.Toolkit.getProperty ("AWT.f20", "F20");
case 61448:
return java.awt.Toolkit.getProperty ("AWT.f21", "F21");
case 61449:
return java.awt.Toolkit.getProperty ("AWT.f22", "F22");
case 61450:
return java.awt.Toolkit.getProperty ("AWT.f23", "F23");
case 61451:
return java.awt.Toolkit.getProperty ("AWT.f24", "F24");
case 154:
return java.awt.Toolkit.getProperty ("AWT.printScreen", "Print Screen");
case 155:
return java.awt.Toolkit.getProperty ("AWT.insert", "Insert");
case 156:
return java.awt.Toolkit.getProperty ("AWT.help", "Help");
case 192:
return java.awt.Toolkit.getProperty ("AWT.backQuote", "Back Quote");
case 222:
return java.awt.Toolkit.getProperty ("AWT.quote", "Quote");
case 224:
return java.awt.Toolkit.getProperty ("AWT.up", "Up");
case 225:
return java.awt.Toolkit.getProperty ("AWT.down", "Down");
case 226:
return java.awt.Toolkit.getProperty ("AWT.left", "Left");
case 227:
return java.awt.Toolkit.getProperty ("AWT.right", "Right");
case 128:
return java.awt.Toolkit.getProperty ("AWT.deadGrave", "Dead Grave");
case 129:
return java.awt.Toolkit.getProperty ("AWT.deadAcute", "Dead Acute");
case 130:
return java.awt.Toolkit.getProperty ("AWT.deadCircumflex", "Dead Circumflex");
case 131:
return java.awt.Toolkit.getProperty ("AWT.deadTilde", "Dead Tilde");
case 132:
return java.awt.Toolkit.getProperty ("AWT.deadMacron", "Dead Macron");
case 133:
return java.awt.Toolkit.getProperty ("AWT.deadBreve", "Dead Breve");
case 134:
return java.awt.Toolkit.getProperty ("AWT.deadAboveDot", "Dead Above Dot");
case 135:
return java.awt.Toolkit.getProperty ("AWT.deadDiaeresis", "Dead Diaeresis");
case 136:
return java.awt.Toolkit.getProperty ("AWT.deadAboveRing", "Dead Above Ring");
case 137:
return java.awt.Toolkit.getProperty ("AWT.deadDoubleAcute", "Dead Double Acute");
case 138:
return java.awt.Toolkit.getProperty ("AWT.deadCaron", "Dead Caron");
case 139:
return java.awt.Toolkit.getProperty ("AWT.deadCedilla", "Dead Cedilla");
case 140:
return java.awt.Toolkit.getProperty ("AWT.deadOgonek", "Dead Ogonek");
case 141:
return java.awt.Toolkit.getProperty ("AWT.deadIota", "Dead Iota");
case 142:
return java.awt.Toolkit.getProperty ("AWT.deadVoicedSound", "Dead Voiced Sound");
case 143:
return java.awt.Toolkit.getProperty ("AWT.deadSemivoicedSound", "Dead Semivoiced Sound");
case 150:
return java.awt.Toolkit.getProperty ("AWT.ampersand", "Ampersand");
case 151:
return java.awt.Toolkit.getProperty ("AWT.asterisk", "Asterisk");
case 152:
return java.awt.Toolkit.getProperty ("AWT.quoteDbl", "Double Quote");
case 153:
return java.awt.Toolkit.getProperty ("AWT.Less", "Less");
case 160:
return java.awt.Toolkit.getProperty ("AWT.greater", "Greater");
case 161:
return java.awt.Toolkit.getProperty ("AWT.braceLeft", "Left Brace");
case 162:
return java.awt.Toolkit.getProperty ("AWT.braceRight", "Right Brace");
case 512:
return java.awt.Toolkit.getProperty ("AWT.at", "At");
case 513:
return java.awt.Toolkit.getProperty ("AWT.colon", "Colon");
case 514:
return java.awt.Toolkit.getProperty ("AWT.circumflex", "Circumflex");
case 515:
return java.awt.Toolkit.getProperty ("AWT.dollar", "Dollar");
case 516:
return java.awt.Toolkit.getProperty ("AWT.euro", "Euro");
case 517:
return java.awt.Toolkit.getProperty ("AWT.exclamationMark", "Exclamation Mark");
case 518:
return java.awt.Toolkit.getProperty ("AWT.invertedExclamationMark", "Inverted Exclamation Mark");
case 519:
return java.awt.Toolkit.getProperty ("AWT.leftParenthesis", "Left Parenthesis");
case 520:
return java.awt.Toolkit.getProperty ("AWT.numberSign", "Number Sign");
case 45:
return java.awt.Toolkit.getProperty ("AWT.minus", "Minus");
case 521:
return java.awt.Toolkit.getProperty ("AWT.plus", "Plus");
case 522:
return java.awt.Toolkit.getProperty ("AWT.rightParenthesis", "Right Parenthesis");
case 523:
return java.awt.Toolkit.getProperty ("AWT.underscore", "Underscore");
case 24:
return java.awt.Toolkit.getProperty ("AWT.final", "Final");
case 28:
return java.awt.Toolkit.getProperty ("AWT.convert", "Convert");
case 29:
return java.awt.Toolkit.getProperty ("AWT.noconvert", "No Convert");
case 30:
return java.awt.Toolkit.getProperty ("AWT.accept", "Accept");
case 31:
return java.awt.Toolkit.getProperty ("AWT.modechange", "Mode Change");
case 21:
return java.awt.Toolkit.getProperty ("AWT.kana", "Kana");
case 25:
return java.awt.Toolkit.getProperty ("AWT.kanji", "Kanji");
case 240:
return java.awt.Toolkit.getProperty ("AWT.alphanumeric", "Alphanumeric");
case 241:
return java.awt.Toolkit.getProperty ("AWT.katakana", "Katakana");
case 242:
return java.awt.Toolkit.getProperty ("AWT.hiragana", "Hiragana");
case 243:
return java.awt.Toolkit.getProperty ("AWT.fullWidth", "Full-Width");
case 244:
return java.awt.Toolkit.getProperty ("AWT.halfWidth", "Half-Width");
case 245:
return java.awt.Toolkit.getProperty ("AWT.romanCharacters", "Roman Characters");
case 256:
return java.awt.Toolkit.getProperty ("AWT.allCandidates", "All Candidates");
case 257:
return java.awt.Toolkit.getProperty ("AWT.previousCandidate", "Previous Candidate");
case 258:
return java.awt.Toolkit.getProperty ("AWT.codeInput", "Code Input");
case 259:
return java.awt.Toolkit.getProperty ("AWT.japaneseKatakana", "Japanese Katakana");
case 260:
return java.awt.Toolkit.getProperty ("AWT.japaneseHiragana", "Japanese Hiragana");
case 261:
return java.awt.Toolkit.getProperty ("AWT.japaneseRoman", "Japanese Roman");
case 262:
return java.awt.Toolkit.getProperty ("AWT.kanaLock", "Kana Lock");
case 263:
return java.awt.Toolkit.getProperty ("AWT.inputMethodOnOff", "Input Method On/Off");
case 65481:
return java.awt.Toolkit.getProperty ("AWT.again", "Again");
case 65483:
return java.awt.Toolkit.getProperty ("AWT.undo", "Undo");
case 65485:
return java.awt.Toolkit.getProperty ("AWT.copy", "Copy");
case 65487:
return java.awt.Toolkit.getProperty ("AWT.paste", "Paste");
case 65489:
return java.awt.Toolkit.getProperty ("AWT.cut", "Cut");
case 65488:
return java.awt.Toolkit.getProperty ("AWT.find", "Find");
case 65482:
return java.awt.Toolkit.getProperty ("AWT.props", "Props");
case 65480:
return java.awt.Toolkit.getProperty ("AWT.stop", "Stop");
}
if (keyCode >= 96 && keyCode <= 105) {
var numpad = java.awt.Toolkit.getProperty ("AWT.numpad", "NumPad");
var c = String.fromCharCode (keyCode - 96 + 48);
return numpad + "-" + c;
}var unknown = java.awt.Toolkit.getProperty ("AWT.unknown", "Unknown");
return unknown + " keyCode: 0x" + Integer.toString (keyCode, 16);
}, "~N");
c$.getKeyModifiersText = Clazz.defineMethod (c$, "getKeyModifiersText", 
function (modifiers) {
var buf =  new StringBuilder ();
if ((modifiers & 4) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.meta", "Meta"));
buf.append ("+");
}if ((modifiers & 2) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.control", "Ctrl"));
buf.append ("+");
}if ((modifiers & 8) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.alt", "Alt"));
buf.append ("+");
}if ((modifiers & 1) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.shift", "Shift"));
buf.append ("+");
}if ((modifiers & 32) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.altGraph", "Alt Graph"));
buf.append ("+");
}if ((modifiers & 16) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.button1", "Button1"));
buf.append ("+");
}if (buf.length () > 0) {
buf.setLength (buf.length () - 1);
}return buf.toString ();
}, "~N");
Clazz.defineMethod (c$, "isActionKey", 
function () {
switch (this.keyCode) {
case 36:
case 35:
case 33:
case 34:
case 38:
case 40:
case 37:
case 39:
case 65368:
case 226:
case 224:
case 227:
case 225:
case 112:
case 113:
case 114:
case 115:
case 116:
case 117:
case 118:
case 119:
case 120:
case 121:
case 122:
case 123:
case 61440:
case 61441:
case 61442:
case 61443:
case 61444:
case 61445:
case 61446:
case 61447:
case 61448:
case 61449:
case 61450:
case 61451:
case 154:
case 145:
case 20:
case 144:
case 19:
case 155:
case 24:
case 28:
case 29:
case 30:
case 31:
case 21:
case 25:
case 240:
case 241:
case 242:
case 243:
case 244:
case 245:
case 256:
case 257:
case 258:
case 259:
case 260:
case 261:
case 262:
case 263:
case 65481:
case 65483:
case 65485:
case 65487:
case 65489:
case 65488:
case 65482:
case 65480:
case 156:
case 524:
case 525:
return true;
}
return false;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var str =  new StringBuilder (100);
switch (this.id) {
case 401:
str.append ("KEY_PRESSED");
break;
case 402:
str.append ("KEY_RELEASED");
break;
case 400:
str.append ("KEY_TYPED");
break;
default:
str.append ("unknown type");
break;
}
str.append (",keyCode=").append ("" + this.keyCode);
str.append (",keyText=").append (java.awt.event.KeyEvent.getKeyText (this.keyCode));
str.append (",keyChar=");
switch (this.keyChar) {
case '\b':
str.append (java.awt.event.KeyEvent.getKeyText (8));
break;
case '\t':
str.append (java.awt.event.KeyEvent.getKeyText (9));
break;
case '\n':
str.append (java.awt.event.KeyEvent.getKeyText (10));
break;
case '\u0018':
str.append (java.awt.event.KeyEvent.getKeyText (3));
break;
case '\u001b':
str.append (java.awt.event.KeyEvent.getKeyText (27));
break;
case '\u007f':
str.append (java.awt.event.KeyEvent.getKeyText (127));
break;
case '\uffff':
str.append (java.awt.Toolkit.getProperty ("AWT.undefined", "Undefined"));
str.append (" keyChar");
break;
default:
str.append ("'").append ("" + this.keyChar).append ("'");
break;
}
if (this.getModifiers () != 0) {
str.append (",modifiers=").append (java.awt.event.KeyEvent.getKeyModifiersText (this.modifiers));
}if (this.getModifiersEx () != 0) {
str.append (",extModifiers=").append (java.awt.event.InputEvent.getModifiersExText (this.modifiers));
}str.append (",keyLocation=");
switch (this.keyLocation) {
case 0:
str.append ("KEY_LOCATION_UNKNOWN");
break;
case 1:
str.append ("KEY_LOCATION_STANDARD");
break;
case 2:
str.append ("KEY_LOCATION_LEFT");
break;
case 3:
str.append ("KEY_LOCATION_RIGHT");
break;
case 4:
str.append ("KEY_LOCATION_NUMPAD");
break;
default:
str.append ("KEY_LOCATION_UNKNOWN");
break;
}
return str.toString ();
});
Clazz.defineMethod (c$, "setNewModifiers", 
 function () {
if ((this.modifiers & 1) != 0) {
this.modifiers |= 64;
}if ((this.modifiers & 8) != 0) {
this.modifiers |= 512;
}if ((this.modifiers & 2) != 0) {
this.modifiers |= 128;
}if ((this.modifiers & 4) != 0) {
this.modifiers |= 256;
}if ((this.modifiers & 32) != 0) {
this.modifiers |= 8192;
}if ((this.modifiers & 16) != 0) {
this.modifiers |= 1024;
}});
Clazz.defineMethod (c$, "setOldModifiers", 
 function () {
if ((this.modifiers & 64) != 0) {
this.modifiers |= 1;
}if ((this.modifiers & 512) != 0) {
this.modifiers |= 8;
}if ((this.modifiers & 128) != 0) {
this.modifiers |= 2;
}if ((this.modifiers & 256) != 0) {
this.modifiers |= 4;
}if ((this.modifiers & 8192) != 0) {
this.modifiers |= 32;
}if ((this.modifiers & 1024) != 0) {
this.modifiers |= 16;
}});
Clazz.defineStatics (c$,
"KEY_FIRST", 400,
"KEY_LAST", 402,
"KEY_TYPED", 400,
"KEY_PRESSED", 401,
"KEY_RELEASED", 402,
"VK_ENTER", '\n',
"VK_BACK_SPACE", '\b',
"VK_TAB", '\t',
"VK_CANCEL", 0x03,
"VK_CLEAR", 0x0C,
"VK_SHIFT", 0x10,
"VK_CONTROL", 0x11,
"VK_ALT", 0x12,
"VK_PAUSE", 0x13,
"VK_CAPS_LOCK", 0x14,
"VK_ESCAPE", 0x1B,
"VK_SPACE", 0x20,
"VK_PAGE_UP", 0x21,
"VK_PAGE_DOWN", 0x22,
"VK_END", 0x23,
"VK_HOME", 0x24,
"VK_LEFT", 0x25,
"VK_UP", 0x26,
"VK_RIGHT", 0x27,
"VK_DOWN", 0x28,
"VK_COMMA", 0x2C,
"VK_MINUS", 0x2D,
"VK_PERIOD", 0x2E,
"VK_SLASH", 0x2F,
"VK_0", 0x30,
"VK_1", 0x31,
"VK_2", 0x32,
"VK_3", 0x33,
"VK_4", 0x34,
"VK_5", 0x35,
"VK_6", 0x36,
"VK_7", 0x37,
"VK_8", 0x38,
"VK_9", 0x39,
"VK_SEMICOLON", 0x3B,
"VK_EQUALS", 0x3D,
"VK_A", 0x41,
"VK_B", 0x42,
"VK_C", 0x43,
"VK_D", 0x44,
"VK_E", 0x45,
"VK_F", 0x46,
"VK_G", 0x47,
"VK_H", 0x48,
"VK_I", 0x49,
"VK_J", 0x4A,
"VK_K", 0x4B,
"VK_L", 0x4C,
"VK_M", 0x4D,
"VK_N", 0x4E,
"VK_O", 0x4F,
"VK_P", 0x50,
"VK_Q", 0x51,
"VK_R", 0x52,
"VK_S", 0x53,
"VK_T", 0x54,
"VK_U", 0x55,
"VK_V", 0x56,
"VK_W", 0x57,
"VK_X", 0x58,
"VK_Y", 0x59,
"VK_Z", 0x5A,
"VK_OPEN_BRACKET", 0x5B,
"VK_BACK_SLASH", 0x5C,
"VK_CLOSE_BRACKET", 0x5D,
"VK_NUMPAD0", 0x60,
"VK_NUMPAD1", 0x61,
"VK_NUMPAD2", 0x62,
"VK_NUMPAD3", 0x63,
"VK_NUMPAD4", 0x64,
"VK_NUMPAD5", 0x65,
"VK_NUMPAD6", 0x66,
"VK_NUMPAD7", 0x67,
"VK_NUMPAD8", 0x68,
"VK_NUMPAD9", 0x69,
"VK_MULTIPLY", 0x6A,
"VK_ADD", 0x6B,
"VK_SEPARATER", 0x6C,
"VK_SEPARATOR", 108,
"VK_SUBTRACT", 0x6D,
"VK_DECIMAL", 0x6E,
"VK_DIVIDE", 0x6F,
"VK_DELETE", 0x7F,
"VK_NUM_LOCK", 0x90,
"VK_SCROLL_LOCK", 0x91,
"VK_F1", 0x70,
"VK_F2", 0x71,
"VK_F3", 0x72,
"VK_F4", 0x73,
"VK_F5", 0x74,
"VK_F6", 0x75,
"VK_F7", 0x76,
"VK_F8", 0x77,
"VK_F9", 0x78,
"VK_F10", 0x79,
"VK_F11", 0x7A,
"VK_F12", 0x7B,
"VK_F13", 0xF000,
"VK_F14", 0xF001,
"VK_F15", 0xF002,
"VK_F16", 0xF003,
"VK_F17", 0xF004,
"VK_F18", 0xF005,
"VK_F19", 0xF006,
"VK_F20", 0xF007,
"VK_F21", 0xF008,
"VK_F22", 0xF009,
"VK_F23", 0xF00A,
"VK_F24", 0xF00B,
"VK_PRINTSCREEN", 0x9A,
"VK_INSERT", 0x9B,
"VK_HELP", 0x9C,
"VK_META", 0x9D,
"VK_BACK_QUOTE", 0xC0,
"VK_QUOTE", 0xDE,
"VK_KP_UP", 0xE0,
"VK_KP_DOWN", 0xE1,
"VK_KP_LEFT", 0xE2,
"VK_KP_RIGHT", 0xE3,
"VK_DEAD_GRAVE", 0x80,
"VK_DEAD_ACUTE", 0x81,
"VK_DEAD_CIRCUMFLEX", 0x82,
"VK_DEAD_TILDE", 0x83,
"VK_DEAD_MACRON", 0x84,
"VK_DEAD_BREVE", 0x85,
"VK_DEAD_ABOVEDOT", 0x86,
"VK_DEAD_DIAERESIS", 0x87,
"VK_DEAD_ABOVERING", 0x88,
"VK_DEAD_DOUBLEACUTE", 0x89,
"VK_DEAD_CARON", 0x8a,
"VK_DEAD_CEDILLA", 0x8b,
"VK_DEAD_OGONEK", 0x8c,
"VK_DEAD_IOTA", 0x8d,
"VK_DEAD_VOICED_SOUND", 0x8e,
"VK_DEAD_SEMIVOICED_SOUND", 0x8f,
"VK_AMPERSAND", 0x96,
"VK_ASTERISK", 0x97,
"VK_QUOTEDBL", 0x98,
"VK_LESS", 0x99,
"VK_GREATER", 0xa0,
"VK_BRACELEFT", 0xa1,
"VK_BRACERIGHT", 0xa2,
"VK_AT", 0x0200,
"VK_COLON", 0x0201,
"VK_CIRCUMFLEX", 0x0202,
"VK_DOLLAR", 0x0203,
"VK_EURO_SIGN", 0x0204,
"VK_EXCLAMATION_MARK", 0x0205,
"VK_INVERTED_EXCLAMATION_MARK", 0x0206,
"VK_LEFT_PARENTHESIS", 0x0207,
"VK_NUMBER_SIGN", 0x0208,
"VK_PLUS", 0x0209,
"VK_RIGHT_PARENTHESIS", 0x020A,
"VK_UNDERSCORE", 0x020B,
"VK_WINDOWS", 0x020C,
"VK_CONTEXT_MENU", 0x020D,
"VK_FINAL", 0x0018,
"VK_CONVERT", 0x001C,
"VK_NONCONVERT", 0x001D,
"VK_ACCEPT", 0x001E,
"VK_MODECHANGE", 0x001F,
"VK_KANA", 0x0015,
"VK_KANJI", 0x0019,
"VK_ALPHANUMERIC", 0x00F0,
"VK_KATAKANA", 0x00F1,
"VK_HIRAGANA", 0x00F2,
"VK_FULL_WIDTH", 0x00F3,
"VK_HALF_WIDTH", 0x00F4,
"VK_ROMAN_CHARACTERS", 0x00F5,
"VK_ALL_CANDIDATES", 0x0100,
"VK_PREVIOUS_CANDIDATE", 0x0101,
"VK_CODE_INPUT", 0x0102,
"VK_JAPANESE_KATAKANA", 0x0103,
"VK_JAPANESE_HIRAGANA", 0x0104,
"VK_JAPANESE_ROMAN", 0x0105,
"VK_KANA_LOCK", 0x0106,
"VK_INPUT_METHOD_ON_OFF", 0x0107,
"VK_CUT", 0xFFD1,
"VK_COPY", 0xFFCD,
"VK_PASTE", 0xFFCF,
"VK_UNDO", 0xFFCB,
"VK_AGAIN", 0xFFC9,
"VK_FIND", 0xFFD0,
"VK_PROPS", 0xFFCA,
"VK_STOP", 0xFFC8,
"VK_COMPOSE", 0xFF20,
"VK_ALT_GRAPH", 0xFF7E,
"VK_BEGIN", 0xFF58,
"VK_UNDEFINED", 0x0,
"CHAR_UNDEFINED", String.fromCharCode (0xFFFF),
"KEY_LOCATION_UNKNOWN", 0,
"KEY_LOCATION_STANDARD", 1,
"KEY_LOCATION_LEFT", 2,
"KEY_LOCATION_RIGHT", 3,
"KEY_LOCATION_NUMPAD", 4);
});
