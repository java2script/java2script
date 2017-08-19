Clazz.declarePackage ("sun.awt");
Clazz.load (["java.awt.AWTEvent", "$.ActiveEvent"], "sun.awt.ModalityEvent", ["java.lang.Error"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listener = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "ModalityEvent", java.awt.AWTEvent, java.awt.ActiveEvent);
Clazz.makeConstructor (c$, 
function (source, listener, id) {
Clazz.superConstructor (this, sun.awt.ModalityEvent, [source, id]);
this.listener = listener;
}, "~O,sun.awt.ModalityListener,~N");
Clazz.overrideMethod (c$, "dispatch", 
function () {
switch (this.getID ()) {
case 1300:
this.listener.modalityPushed (this);
break;
case 1301:
this.listener.modalityPopped (this);
break;
default:
throw  new Error ("Invalid event id.");
}
});
Clazz.defineStatics (c$,
"MODALITY_PUSHED", 1300,
"MODALITY_POPPED", 1301);
});
