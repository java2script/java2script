Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.AbstractGroupMarker"], "org.eclipse.jface.action.Separator", ["$wt.widgets.MenuItem", "$.ToolItem"], function () {
c$ = Clazz.declareType (org.eclipse.jface.action, "Separator", org.eclipse.jface.action.AbstractGroupMarker);
Clazz.defineMethod (c$, "fill", 
function (menu, index) {
if (index >= 0)  new $wt.widgets.MenuItem (menu, 2, index);
 else  new $wt.widgets.MenuItem (menu, 2);
}, "$wt.widgets.Menu,~N");
Clazz.defineMethod (c$, "fill", 
function (toolbar, index) {
if (index >= 0)  new $wt.widgets.ToolItem (toolbar, 2, index);
 else  new $wt.widgets.ToolItem (toolbar, 2);
}, "$wt.widgets.ToolBar,~N");
Clazz.overrideMethod (c$, "isSeparator", 
function () {
return true;
});
});
