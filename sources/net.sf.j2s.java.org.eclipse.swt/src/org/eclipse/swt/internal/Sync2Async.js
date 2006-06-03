Sync2Async = {};
Sync2Async.block = function (shell, oThis, runnable) {
shell.addDisposeListener ((function (innerThis, finalVars) {
if (!Clazz.isClassDefined ("Sync2Async$1")) {
Clazz.pu$h ();
cla$$ = Sync2Async$1 = function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (cla$$, "Sync2Async$1", null, $wt.events.DisposeListener);
Clazz.defineMethod (cla$$, "widgetDisposed", 
function (e) {
var $runnable = this.f$.runnable;
var $oThis = this.f$.oThis;
window.setTimeout (function () {
$runnable.apply ($oThis);
}, 0);
//this.f$.runnable.apply (this.f$.oThis);
}, "$wt.events.DisposeEvent");
cla$$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (Sync2Async$1, innerThis, finalVars);
}) (this, Clazz.cloneFinals ("runnable", runnable, "oThis", oThis)));
shell.getDisplay ().readAndDispatch ();
};