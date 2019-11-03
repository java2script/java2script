Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.IColorProvider", "$.IFontProvider", "$.ILabelProvider", "$.IViewerLabelProvider", "$.LabelProvider", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.viewers.DecoratingLabelProvider", ["org.eclipse.jface.util.Assert", "org.eclipse.jface.viewers.LabelProviderChangedEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.provider = null;
this.decorator = null;
this.$listeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "DecoratingLabelProvider", org.eclipse.jface.viewers.LabelProvider, [org.eclipse.jface.viewers.ILabelProvider, org.eclipse.jface.viewers.IViewerLabelProvider, org.eclipse.jface.viewers.IColorProvider, org.eclipse.jface.viewers.IFontProvider]);
Clazz.prepareFields (c$, function () {
this.$listeners =  new org.eclipse.jface.util.ListenerList ();
});
Clazz.makeConstructor (c$, 
function (provider, decorator) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.DecoratingLabelProvider, []);
org.eclipse.jface.util.Assert.isNotNull (provider);
this.provider = provider;
this.decorator = decorator;
}, "org.eclipse.jface.viewers.ILabelProvider,org.eclipse.jface.viewers.ILabelDecorator");
Clazz.defineMethod (c$, "addListener", 
function (listener) {
Clazz.superCall (this, org.eclipse.jface.viewers.DecoratingLabelProvider, "addListener", [listener]);
this.provider.addListener (listener);
if (this.decorator != null) {
this.decorator.addListener (listener);
}this.$listeners.add (listener);
}, "org.eclipse.jface.viewers.ILabelProviderListener");
Clazz.defineMethod (c$, "dispose", 
function () {
this.provider.dispose ();
if (this.decorator != null) {
this.decorator.dispose ();
}});
Clazz.defineMethod (c$, "getImage", 
function (element) {
var image = this.provider.getImage (element);
if (this.decorator != null) {
var decorated = this.decorator.decorateImage (image, element);
if (decorated != null) {
return decorated;
}}return image;
}, "~O");
Clazz.defineMethod (c$, "getLabelDecorator", 
function () {
return this.decorator;
});
Clazz.defineMethod (c$, "getLabelProvider", 
function () {
return this.provider;
});
Clazz.defineMethod (c$, "getText", 
function (element) {
var text = this.provider.getText (element);
if (this.decorator != null) {
var decorated = this.decorator.decorateText (text, element);
if (decorated != null) {
return decorated;
}}return text;
}, "~O");
Clazz.defineMethod (c$, "isLabelProperty", 
function (element, property) {
if (this.provider.isLabelProperty (element, property)) return true;
if (this.decorator != null && this.decorator.isLabelProperty (element, property)) return true;
return false;
}, "~O,~S");
Clazz.defineMethod (c$, "removeListener", 
function (listener) {
Clazz.superCall (this, org.eclipse.jface.viewers.DecoratingLabelProvider, "removeListener", [listener]);
this.provider.removeListener (listener);
if (this.decorator != null) {
this.decorator.removeListener (listener);
}this.$listeners.remove (listener);
}, "org.eclipse.jface.viewers.ILabelProviderListener");
Clazz.defineMethod (c$, "setLabelDecorator", 
function (decorator) {
var oldDecorator = this.decorator;
if (oldDecorator !== decorator) {
var listenerList = this.$listeners.getListeners ();
if (oldDecorator != null) {
for (var i = 0; i < listenerList.length; ++i) {
oldDecorator.removeListener (listenerList[i]);
}
}this.decorator = decorator;
if (decorator != null) {
for (var i = 0; i < listenerList.length; ++i) {
decorator.addListener (listenerList[i]);
}
}this.fireLabelProviderChanged ( new org.eclipse.jface.viewers.LabelProviderChangedEvent (this));
}}, "org.eclipse.jface.viewers.ILabelDecorator");
Clazz.overrideMethod (c$, "updateLabel", 
function (settings, element) {
var currentDecorator = this.getLabelDecorator ();
var oldText = settings.getText ();
var decorationReady = true;
if (Clazz.instanceOf (currentDecorator, org.eclipse.jface.viewers.IDelayedLabelDecorator)) {
var delayedDecorator = currentDecorator;
if (!delayedDecorator.prepareDecoration (element, oldText)) {
decorationReady = false;
}}if (decorationReady || oldText == null || settings.getText ().length == 0) settings.setText (this.getText (element));
var oldImage = settings.getImage ();
if (decorationReady || oldImage == null) {
settings.setImage (this.getImage (element));
}if (decorationReady) this.updateForDecorationReady (settings, element);
}, "org.eclipse.jface.viewers.ViewerLabel,~O");
Clazz.defineMethod (c$, "updateForDecorationReady", 
function (settings, element) {
if (Clazz.instanceOf (this.decorator, org.eclipse.jface.viewers.IColorDecorator)) {
var colorDecorator = this.decorator;
settings.setBackground (colorDecorator.decorateBackground (element));
settings.setForeground (colorDecorator.decorateForeground (element));
}if (Clazz.instanceOf (this.decorator, org.eclipse.jface.viewers.IFontDecorator)) settings.setFont ((this.decorator).decorateFont (element));
}, "org.eclipse.jface.viewers.ViewerLabel,~O");
Clazz.defineMethod (c$, "getBackground", 
function (element) {
if (Clazz.instanceOf (this.provider, org.eclipse.jface.viewers.IColorProvider)) return (this.provider).getBackground (element);
return null;
}, "~O");
Clazz.defineMethod (c$, "getFont", 
function (element) {
if (Clazz.instanceOf (this.provider, org.eclipse.jface.viewers.IFontProvider)) return (this.provider).getFont (element);
return null;
}, "~O");
Clazz.defineMethod (c$, "getForeground", 
function (element) {
if (Clazz.instanceOf (this.provider, org.eclipse.jface.viewers.IColorProvider)) return (this.provider).getForeground (element);
return null;
}, "~O");
});
