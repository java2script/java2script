Clazz.declarePackage ("org.eclipse.jface.wizard");
Clazz.load (["org.eclipse.jface.wizard.WizardPage", "java.util.ArrayList"], "org.eclipse.jface.wizard.WizardSelectionPage", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.selectedNode = null;
this.selectedWizardNodes = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.wizard, "WizardSelectionPage", org.eclipse.jface.wizard.WizardPage);
Clazz.prepareFields (c$, function () {
this.selectedWizardNodes =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function (pageName) {
Clazz.superConstructor (this, org.eclipse.jface.wizard.WizardSelectionPage, [pageName]);
this.setPageComplete (false);
}, "~S");
Clazz.defineMethod (c$, "addSelectedNode", 
($fz = function (node) {
if (node == null) return ;
if (this.selectedWizardNodes.contains (node)) return ;
this.selectedWizardNodes.add (node);
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.wizard.IWizardNode");
Clazz.overrideMethod (c$, "canFlipToNextPage", 
function () {
return this.selectedNode != null;
});
Clazz.overrideMethod (c$, "dispose", 
function () {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardSelectionPage, "dispose", []);
for (var i = 0; i < this.selectedWizardNodes.size (); i++) {
(this.selectedWizardNodes.get (i)).dispose ();
}
});
Clazz.overrideMethod (c$, "getNextPage", 
function () {
if (this.selectedNode == null) return null;
var isCreated = this.selectedNode.isContentCreated ();
var wizard = this.selectedNode.getWizard ();
if (wizard == null) {
this.setSelectedNode (null);
return null;
}if (!isCreated) wizard.addPages ();
return wizard.getStartingPage ();
});
Clazz.defineMethod (c$, "getSelectedNode", 
function () {
return this.selectedNode;
});
Clazz.defineMethod (c$, "setSelectedNode", 
function (node) {
this.addSelectedNode (node);
this.selectedNode = node;
if (this.isCurrentPage ()) this.getContainer ().updateButtons ();
}, "org.eclipse.jface.wizard.IWizardNode");
});
