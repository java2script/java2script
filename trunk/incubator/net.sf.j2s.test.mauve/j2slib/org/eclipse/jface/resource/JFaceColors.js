Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (null, "org.eclipse.jface.resource.JFaceColors", ["org.eclipse.jface.resource.JFaceResources"], function () {
c$ = Clazz.declareType (org.eclipse.jface.resource, "JFaceColors");
c$.getBannerBackground = Clazz.defineMethod (c$, "getBannerBackground", 
function (display) {
return display.getSystemColor (25);
}, "$wt.widgets.Display");
c$.getBannerForeground = Clazz.defineMethod (c$, "getBannerForeground", 
function (display) {
return display.getSystemColor (24);
}, "$wt.widgets.Display");
c$.getErrorBackground = Clazz.defineMethod (c$, "getErrorBackground", 
function (display) {
return display.getSystemColor (22);
}, "$wt.widgets.Display");
c$.getErrorBorder = Clazz.defineMethod (c$, "getErrorBorder", 
function (display) {
return display.getSystemColor (17);
}, "$wt.widgets.Display");
c$.getErrorText = Clazz.defineMethod (c$, "getErrorText", 
function (display) {
return org.eclipse.jface.resource.JFaceResources.getColorRegistry ().get ("ERROR_COLOR");
}, "$wt.widgets.Display");
c$.getHyperlinkText = Clazz.defineMethod (c$, "getHyperlinkText", 
function (display) {
return org.eclipse.jface.resource.JFaceResources.getColorRegistry ().get ("HYPERLINK_COLOR");
}, "$wt.widgets.Display");
c$.getActiveHyperlinkText = Clazz.defineMethod (c$, "getActiveHyperlinkText", 
function (display) {
return org.eclipse.jface.resource.JFaceResources.getColorRegistry ().get ("ACTIVE_HYPERLINK_COLOR");
}, "$wt.widgets.Display");
c$.clearColor = Clazz.defineMethod (c$, "clearColor", 
function (colorName) {
}, "~S");
c$.disposeColors = Clazz.defineMethod (c$, "disposeColors", 
function () {
});
c$.setColors = Clazz.defineMethod (c$, "setColors", 
function (control, foreground, background) {
if (foreground != null) control.setForeground (foreground);
if (background != null) control.setBackground (background);
}, "$wt.widgets.Control,$wt.graphics.Color,$wt.graphics.Color");
});
