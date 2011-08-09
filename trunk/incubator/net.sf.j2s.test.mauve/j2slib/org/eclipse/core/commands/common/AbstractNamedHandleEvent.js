Clazz.declarePackage ("org.eclipse.core.commands.common");
Clazz.load (["org.eclipse.core.commands.common.AbstractBitSetEvent"], "org.eclipse.core.commands.common.AbstractNamedHandleEvent", null, function () {
c$ = Clazz.declareType (org.eclipse.core.commands.common, "AbstractNamedHandleEvent", org.eclipse.core.commands.common.AbstractBitSetEvent);
Clazz.makeConstructor (c$, 
function (definedChanged, descriptionChanged, nameChanged) {
Clazz.superConstructor (this, org.eclipse.core.commands.common.AbstractNamedHandleEvent, []);
if (definedChanged) {
this.changedValues |= 1;
}if (descriptionChanged) {
this.changedValues |= 2;
}if (nameChanged) {
this.changedValues |= 4;
}}, "~B,~B,~B");
Clazz.defineMethod (c$, "isDefinedChanged", 
function () {
return ((this.changedValues & 1) != 0);
});
Clazz.defineMethod (c$, "isDescriptionChanged", 
function () {
return ((this.changedValues & 2) != 0);
});
Clazz.defineMethod (c$, "isNameChanged", 
function () {
return ((this.changedValues & 4) != 0);
});
Clazz.defineStatics (c$,
"CHANGED_DEFINED", 1,
"CHANGED_DESCRIPTION", 2,
"CHANGED_NAME", 4,
"LAST_USED_BIT", 4);
});
