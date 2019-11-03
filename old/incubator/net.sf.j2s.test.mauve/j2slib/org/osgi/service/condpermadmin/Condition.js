Clazz.declarePackage ("org.osgi.service.condpermadmin");
c$ = Clazz.declareInterface (org.osgi.service.condpermadmin, "Condition");
c$.TRUE = c$.prototype.TRUE =  new org.osgi.service.condpermadmin.BooleanCondition (true);
c$.FALSE = c$.prototype.FALSE =  new org.osgi.service.condpermadmin.BooleanCondition (false);
c$ = Clazz.decorateAsClass (function () {
this.satisfied = false;
Clazz.instantialize (this, arguments);
}, org.osgi.service.condpermadmin, "BooleanCondition", null, org.osgi.service.condpermadmin.Condition);
Clazz.makeConstructor (c$, 
function (satisfied) {
this.satisfied = satisfied;
}, "~B");
Clazz.overrideMethod (c$, "isPostponed", 
function () {
return false;
});
Clazz.defineMethod (c$, "isSatisfied", 
function () {
return this.satisfied;
});
Clazz.overrideMethod (c$, "isMutable", 
function () {
return false;
});
Clazz.defineMethod (c$, "isSatisfied", 
function (conds, context) {
for (var i = 0; i < conds.length; i++) {
if (!conds[i].isSatisfied ()) return false;
}
return true;
}, "~A,java.util.Dictionary");
