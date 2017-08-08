Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.AWTEvent"], "java.awt.event.InputMethodEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.when = 0;
this.text = null;
this.committedCharacterCount = 0;
Clazz.instantialize (this, arguments);
}, java.awt.event, "InputMethodEvent", java.awt.AWTEvent);
Clazz.defineMethod (c$, "getText", 
function () {
return this.text;
});
Clazz.defineMethod (c$, "getCommittedCharacterCount", 
function () {
return this.committedCharacterCount;
});
Clazz.defineMethod (c$, "getWhen", 
function () {
return this.when;
});
Clazz.defineStatics (c$,
"INPUT_METHOD_FIRST", 1100,
"INPUT_METHOD_TEXT_CHANGED", 1100,
"CARET_POSITION_CHANGED", 1101,
"INPUT_METHOD_LAST", 1101);
});
