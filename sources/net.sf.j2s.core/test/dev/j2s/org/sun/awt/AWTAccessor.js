Clazz.declarePackage ("sun.awt");
c$ = Clazz.declareType (sun.awt, "AWTAccessor");
c$.setWindowAccessor = Clazz.defineMethod (c$, "setWindowAccessor", 
function (wa) {
sun.awt.AWTAccessor.windowAccessor = wa;
}, "sun.awt.AWTAccessor.WindowAccessor");
c$.getWindowAccessor = Clazz.defineMethod (c$, "getWindowAccessor", 
function () {
return sun.awt.AWTAccessor.windowAccessor;
});
c$.setComponentAccessor = Clazz.defineMethod (c$, "setComponentAccessor", 
function (ca) {
sun.awt.AWTAccessor.componentAccessor = ca;
}, "sun.awt.AWTAccessor.ComponentAccessor");
c$.getComponentAccessor = Clazz.defineMethod (c$, "getComponentAccessor", 
function () {
return sun.awt.AWTAccessor.componentAccessor;
});
c$.setAWTEventAccessor = Clazz.defineMethod (c$, "setAWTEventAccessor", 
function (aea) {
sun.awt.AWTAccessor.awtEventAccessor = aea;
}, "sun.awt.AWTAccessor.AWTEventAccessor");
c$.getAWTEventAccessor = Clazz.defineMethod (c$, "getAWTEventAccessor", 
function () {
return sun.awt.AWTAccessor.awtEventAccessor;
});
c$.setEventQueueAccessor = Clazz.defineMethod (c$, "setEventQueueAccessor", 
function (eqa) {
sun.awt.AWTAccessor.eventQueueAccessor = eqa;
}, "sun.awt.AWTAccessor.EventQueueAccessor");
c$.getEventQueueAccessor = Clazz.defineMethod (c$, "getEventQueueAccessor", 
function () {
return sun.awt.AWTAccessor.eventQueueAccessor;
});
Clazz.declareInterface (sun.awt.AWTAccessor, "WindowAccessor");
Clazz.declareInterface (sun.awt.AWTAccessor, "ComponentAccessor");
Clazz.declareInterface (sun.awt.AWTAccessor, "KeyboardFocusManagerAccessor");
Clazz.declareInterface (sun.awt.AWTAccessor, "AWTEventAccessor");
Clazz.declareInterface (sun.awt.AWTAccessor, "EventQueueAccessor");
Clazz.declareInterface (sun.awt.AWTAccessor, "CursorAccessor");
Clazz.declareInterface (sun.awt.AWTAccessor, "ClientPropertyKeyAccessor");
Clazz.defineStatics (c$,
"componentAccessor", null,
"windowAccessor", null,
"awtEventAccessor", null,
"eventQueueAccessor", null);
