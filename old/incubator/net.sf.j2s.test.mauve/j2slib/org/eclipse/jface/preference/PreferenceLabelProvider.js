Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.viewers.LabelProvider"], "org.eclipse.jface.preference.PreferenceLabelProvider", null, function () {
c$ = Clazz.declareType (org.eclipse.jface.preference, "PreferenceLabelProvider", org.eclipse.jface.viewers.LabelProvider);
Clazz.overrideMethod (c$, "getText", 
function (element) {
return (element).getLabelText ();
}, "~O");
Clazz.overrideMethod (c$, "getImage", 
function (element) {
return (element).getLabelImage ();
}, "~O");
});
