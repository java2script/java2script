Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.ContributionItem"], "org.eclipse.jface.action.ControlContribution", ["org.eclipse.jface.util.Assert", "$wt.widgets.ToolItem"], function () {
c$ = Clazz.declareType (org.eclipse.jface.action, "ControlContribution", org.eclipse.jface.action.ContributionItem);
Clazz.defineMethod (c$, "computeWidth", 
function (control) {
return control.computeSize (-1, -1, true).x;
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "fill", 
function (parent) {
this.createControl (parent);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
org.eclipse.jface.util.Assert.isTrue (false, "Can't add a control to a menu");
}, "$wt.widgets.Menu,~N");
Clazz.defineMethod (c$, "fill", 
function (parent, index) {
var control = this.createControl (parent);
var ti =  new $wt.widgets.ToolItem (parent, 2, index);
ti.setControl (control);
ti.setWidth (this.computeWidth (control));
}, "$wt.widgets.ToolBar,~N");
});
