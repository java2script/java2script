Clazz.declarePackage ("java.util");
c$ = Clazz.decorateAsClass (function () {
this.lock = null;
this.state = 0;
this.nextExecutionTime = 0;
this.period = 0;
Clazz.instantialize (this, arguments);
}, java.util, "TimerTask", null, Runnable);
Clazz.prepareFields (c$, function () {
this.lock =  new Clazz._O ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "cancel", 
function () {
{
var result = (this.state == 1);
this.state = 3;
return result;
}});
Clazz.defineMethod (c$, "scheduledExecutionTime", 
function () {
{
return (this.period < 0 ? this.nextExecutionTime + this.period : this.nextExecutionTime - this.period);
}});
Clazz.defineStatics (c$,
"VIRGIN", 0,
"SCHEDULED", 1,
"EXECUTED", 2,
"CANCELLED", 3);
