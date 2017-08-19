Clazz.declarePackage ("sun.awt");
Clazz.load (["java.awt.AWTEvent"], "sun.awt.UngrabEvent", null, function () {
c$ = Clazz.declareType (sun.awt, "UngrabEvent", java.awt.AWTEvent);
Clazz.makeConstructor (c$, 
function (source) {
Clazz.superConstructor (this, sun.awt.UngrabEvent, [source, 1998]);
}, "java.awt.Component");
Clazz.overrideMethod (c$, "toString", 
function () {
return "sun.awt.UngrabEvent[" + this.getSource () + "]";
});
Clazz.defineStatics (c$,
"UNGRAB_EVENT_ID", 1998);
});
