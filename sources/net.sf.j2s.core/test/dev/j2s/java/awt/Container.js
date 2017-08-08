Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.JSComponent", "java.awt.event.AWTEventListener", "java.awt.Insets"], ["java.awt.LightweightDispatcher", "$.Container"], ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "$.IllegalStateException", "JU.Lst", "java.awt.AWTEventMulticaster", "$.Dimension", "$.GraphicsCallback", "$.LayoutManager2", "$.Toolkit", "java.awt.event.ContainerEvent", "$.ContainerListener", "$.MouseEvent", "$.MouseWheelEvent", "java.awt.peer.ContainerPeer", "$.LightweightPeer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.children = null;
this.layoutMgr = null;
this.dispatcher = null;
this.focusCycleRoot = false;
this.focusTraversalPolicyProvider = false;
this.containerListener = null;
this.listeningChildren = 0;
this.listeningBoundsChildren = 0;
this.descendantsCount = 0;
this.preserveBackgroundColor = null;
this.numOfHWComponents = 0;
this.numOfLWComponents = 0;
this.modalComp = null;
this.modalAppContext = null;
Clazz.instantialize (this, arguments);
}, java.awt, "Container", java.awt.JSComponent);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.Container, []);
this.children =  new JU.Lst ();
});
Clazz.defineMethod (c$, "initializeFocusTraversalKeys", 
function () {
});
Clazz.defineMethod (c$, "getComponentCount", 
function () {
return this.countComponents ();
});
Clazz.defineMethod (c$, "countComponents", 
function () {
return this.children.size ();
});
Clazz.defineMethod (c$, "getComponent", 
function (n) {
if ((n < 0) || (n >= this.children.size ())) {
throw  new ArrayIndexOutOfBoundsException ("No such child: " + n);
}return this.children.get (n);
}, "~N");
Clazz.defineMethod (c$, "getComponents", 
function () {
return this.getComponents_NoClientCode ();
});
Clazz.defineMethod (c$, "getComponents_NoClientCode", 
function () {
return this.children.toArray (java.awt.Container.EMPTY_ARRAY);
});
Clazz.defineMethod (c$, "getInsets", 
function () {
var i = (this.peer == null ? null : (this.peer).getInsets ());
return (i == null ? java.awt.Container.NULL_INSETS : i);
});
Clazz.defineMethod (c$, "insets", 
function () {
return this.getInsets ();
});
Clazz.defineMethod (c$, "add", 
function (comp) {
return this.addImpl (comp, null, -1);
}, "java.awt.Component");
Clazz.defineMethod (c$, "add", 
function (name, comp) {
return this.addImpl (comp, name, -1);
}, "~S,java.awt.Component");
Clazz.defineMethod (c$, "add", 
function (comp, index) {
return this.addImpl (comp, null, index);
}, "java.awt.Component,~N");
Clazz.defineMethod (c$, "checkAddToSelf", 
 function (comp) {
if (Clazz.instanceOf (comp, java.awt.Container)) {
for (var cn = this; cn != null; cn = cn.parent) {
if (cn === comp) {
throw  new IllegalArgumentException ("adding container's parent to itself");
}}
}}, "java.awt.Component");
Clazz.defineMethod (c$, "checkNotAWindow", 
 function (comp) {
if (Clazz.instanceOf (comp, java.awt.Window)) {
throw  new IllegalArgumentException ("adding a window to a container");
}}, "java.awt.Component");
Clazz.defineMethod (c$, "removeDelicately", 
 function (comp, newParent, newIndex) {
var index = this.getComponentZOrder (comp);
var needRemoveNotify = java.awt.Container.isRemoveNotifyNeeded (comp, this, newParent);
if (needRemoveNotify) {
comp.removeNotify ();
}if (newParent !== this) {
if (this.layoutMgr != null) {
this.layoutMgr.removeLayoutComponent (comp);
}this.adjustListeningChildren (32768, -comp.numListening (32768));
this.adjustListeningChildren (65536, -comp.numListening (65536));
this.adjustDescendants (-(comp.countHierarchyMembers ()));
comp.parent = null;
this.children.removeItemAt (index);
this.invalidateIfValid ();
} else {
this.children.removeItemAt (index);
this.children.add (newIndex, comp);
}if (comp.parent == null) {
if (this.containerListener != null || (this.eventMask & 2) != 0 || java.awt.Toolkit.enabledOnToolkit (2)) {
var e =  new java.awt.event.ContainerEvent (this, 301, comp);
this.dispatchEvent (e);
}comp.createHierarchyEvents (1400, comp, this, 1, java.awt.Toolkit.enabledOnToolkit (32768));
if (this.peer != null && this.layoutMgr == null && this.isVisible ()) {
this.updateCursorImmediately ();
}}return needRemoveNotify;
}, "java.awt.Component,java.awt.Container,~N");
Clazz.defineMethod (c$, "canContainFocusOwner", 
function (focusOwnerCandidate) {
if (!(this.isEnabled () && this.isDisplayable () && this.isVisible () && this.isFocusable ())) {
return false;
}{
if (this.parent != null) {
return this.parent.canContainFocusOwner (focusOwnerCandidate);
}}return true;
}, "java.awt.Component");
Clazz.defineMethod (c$, "hasHeavyweightDescendants", 
function () {
return this.numOfHWComponents > 0;
});
Clazz.defineMethod (c$, "hasLightweightDescendants", 
function () {
return this.numOfLWComponents > 0;
});
Clazz.defineMethod (c$, "getHeavyweightContainer", 
function () {
if (this.peer != null && !(Clazz.instanceOf (this.peer, java.awt.peer.LightweightPeer))) {
return this;
} else {
return this.getNativeContainer ();
}});
c$.isRemoveNotifyNeeded = Clazz.defineMethod (c$, "isRemoveNotifyNeeded", 
 function (comp, oldContainer, newContainer) {
return false;
}, "java.awt.Component,java.awt.Container,java.awt.Container");
Clazz.defineMethod (c$, "setComponentZOrder", 
function (comp, index) {
{
var curParent = comp.parent;
var oldZindex = this.getComponentZOrder (comp);
if (curParent === this && index == oldZindex) {
return;
}var peerRecreated = (curParent != null) ? curParent.removeDelicately (comp, this, index) : false;
this.addDelicately (comp, curParent, index);
if (!peerRecreated && oldZindex != -1) {
comp.mixOnZOrderChanging (oldZindex, index);
}}}, "java.awt.Component,~N");
Clazz.defineMethod (c$, "reparentTraverse", 
 function (parentPeer, child) {
this.checkTreeLock ();
for (var i = 0; i < child.getComponentCount (); i++) {
var comp = child.getComponent (i);
if (comp.isLightweight ()) {
if (Clazz.instanceOf (comp, java.awt.Container)) {
this.reparentTraverse (parentPeer, comp);
}} else {
comp.getPeer ().reparent (parentPeer);
}}
}, "java.awt.peer.ContainerPeer,java.awt.Container");
Clazz.defineMethod (c$, "reparentChild", 
 function (comp) {
if (comp == null) {
return;
}if (comp.isLightweight ()) {
if (Clazz.instanceOf (comp, java.awt.Container)) {
this.reparentTraverse (this.getPeer (), comp);
}} else {
comp.getPeer ().reparent (this.getPeer ());
}}, "java.awt.Component");
Clazz.defineMethod (c$, "addDelicately", 
 function (comp, curParent, index) {
this.checkTreeLock ();
if (curParent !== this) {
if (index == -1) {
this.children.add (comp);
} else {
this.children.add (index, comp);
}comp.parent = this;
this.adjustListeningChildren (32768, comp.numListening (32768));
this.adjustListeningChildren (65536, comp.numListening (65536));
this.adjustDescendants (comp.countHierarchyMembers ());
} else {
if (index < this.children.size ()) {
this.children.set (index, comp);
}}this.invalidateIfValid ();
if (this.peer != null) {
if (comp.peer == null) {
comp.addNotify ();
} else {
var newNativeContainer = this.getHeavyweightContainer ();
var oldNativeContainer = curParent.getHeavyweightContainer ();
if (oldNativeContainer !== newNativeContainer) {
newNativeContainer.reparentChild (comp);
}if (!comp.isLightweight () && this.isLightweight ()) {
comp.relocateComponent ();
}}}if (curParent !== this) {
if (this.layoutMgr != null) {
if (Clazz.instanceOf (this.layoutMgr, java.awt.LayoutManager2)) {
(this.layoutMgr).addLayoutComponent (comp, null);
} else {
this.layoutMgr.addLayoutComponent (null, comp);
}}if (this.containerListener != null || (this.eventMask & 2) != 0 || java.awt.Toolkit.enabledOnToolkit (2)) {
var e =  new java.awt.event.ContainerEvent (this, 300, comp);
this.dispatchEvent (e);
}comp.createHierarchyEvents (1400, comp, this, 1, java.awt.Toolkit.enabledOnToolkit (32768));
} else {
comp.createHierarchyEvents (1400, comp, this, 1400, java.awt.Toolkit.enabledOnToolkit (32768));
}if (this.peer != null && this.layoutMgr == null && this.isVisible ()) {
this.updateCursorImmediately ();
}}, "java.awt.Component,java.awt.Container,~N");
Clazz.defineMethod (c$, "checkTreeLock", 
 function () {
});
Clazz.defineMethod (c$, "getComponentZOrder", 
function (comp) {
if (comp == null) {
return -1;
}{
if (comp.parent !== this) {
return -1;
}return this.children.indexOf (comp);
}}, "java.awt.Component");
Clazz.defineMethod (c$, "add", 
function (comp, constraints) {
this.addImpl (comp, constraints, -1);
}, "java.awt.Component,~O");
Clazz.defineMethod (c$, "add", 
function (comp, constraints, index) {
return this.addImpl (comp, constraints, index);
}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "addImpl", 
function (comp, constraints, index) {
return this.addImplSAEM (comp, constraints, index);
}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "addImplSAEM", 
function (comp, constraints, index) {
{
if (index > this.children.size () || (index < 0 && index != -1)) {
throw  new IllegalArgumentException ("illegal component position");
}this.checkAddToSelf (comp);
this.checkNotAWindow (comp);
if (comp.parent != null) {
comp.parent.remove (comp);
if (index > this.children.size ()) {
throw  new IllegalArgumentException ("illegal component position");
}}if (index == -1) {
this.children.add (comp);
} else {
this.children.add (index, comp);
}comp.parent = this;
this.adjustListeningChildren (32768, comp.numListening (32768));
this.adjustListeningChildren (65536, comp.numListening (65536));
this.adjustDescendants (comp.countHierarchyMembers ());
this.invalidateIfValid ();
if (this.peer != null) {
comp.addNotify ();
}if (this.layoutMgr != null) {
if (Clazz.instanceOf (this.layoutMgr, java.awt.LayoutManager2)) {
(this.layoutMgr).addLayoutComponent (comp, constraints);
} else if (Clazz.instanceOf (constraints, String)) {
this.layoutMgr.addLayoutComponent (constraints, comp);
}}if (this.containerListener != null || (this.eventMask & 2) != 0 || java.awt.Toolkit.enabledOnToolkit (2)) {
var e =  new java.awt.event.ContainerEvent (this, 300, comp);
this.dispatchEvent (e);
}comp.createHierarchyEvents (1400, comp, this, 1, java.awt.Toolkit.enabledOnToolkit (32768));
if (this.peer != null && this.layoutMgr == null && this.isVisible ()) {
this.updateCursorImmediately ();
}}return comp;
}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "checkGD", 
function (stringID) {
}, "~S");
Clazz.defineMethod (c$, "remove", 
function (index) {
this.removeInt (index);
}, "~N");
Clazz.defineMethod (c$, "removeInt", 
function (index) {
{
if (index < 0 || index >= this.children.size ()) {
throw  new ArrayIndexOutOfBoundsException (index);
}var comp = this.children.get (index);
if (this.peer != null) {
comp.removeNotify ();
}if (this.layoutMgr != null) {
this.layoutMgr.removeLayoutComponent (comp);
}this.adjustListeningChildren (32768, -comp.numListening (32768));
this.adjustListeningChildren (65536, -comp.numListening (65536));
this.adjustDescendants (-(comp.countHierarchyMembers ()));
comp.parent = null;
this.children.removeItemAt (index);
this.invalidateIfValid ();
if (this.containerListener != null || (this.eventMask & 2) != 0 || java.awt.Toolkit.enabledOnToolkit (2)) {
var e =  new java.awt.event.ContainerEvent (this, 301, comp);
this.dispatchEvent (e);
}comp.createHierarchyEvents (1400, comp, this, 1, java.awt.Toolkit.enabledOnToolkit (32768));
if (this.peer != null && this.layoutMgr == null && this.isVisible ()) {
this.updateCursorImmediately ();
}}}, "~N");
Clazz.defineMethod (c$, "remove", 
function (comp) {
this.removeChild (comp);
}, "java.awt.Component");
Clazz.defineMethod (c$, "removeChild", 
function (comp) {
{
if (comp.parent === this) {
var index = this.children.indexOf (comp);
if (index >= 0) {
this.remove (index);
}}}}, "java.awt.Component");
Clazz.defineMethod (c$, "removeAll", 
function () {
{
this.adjustListeningChildren (32768, -this.listeningChildren);
this.adjustListeningChildren (65536, -this.listeningBoundsChildren);
this.adjustDescendants (-this.descendantsCount);
while (!this.children.isEmpty ()) {
var comp = this.children.removeItemAt (this.children.size () - 1);
if (this.peer != null) {
comp.removeNotify ();
}if (this.layoutMgr != null) {
this.layoutMgr.removeLayoutComponent (comp);
}comp.parent = null;
if (this.containerListener != null || (this.eventMask & 2) != 0 || java.awt.Toolkit.enabledOnToolkit (2)) {
var e =  new java.awt.event.ContainerEvent (this, 301, comp);
this.dispatchEvent (e);
}comp.createHierarchyEvents (1400, comp, this, 1, java.awt.Toolkit.enabledOnToolkit (32768));
}
if (this.peer != null && this.layoutMgr == null && this.isVisible ()) {
this.updateCursorImmediately ();
}this.invalidateIfValid ();
}});
Clazz.defineMethod (c$, "numListening", 
function (mask) {
var superListening = this.numListeningMask (mask);
if (mask == 32768) {
return this.listeningChildren + superListening;
} else if (mask == 65536) {
return this.listeningBoundsChildren + superListening;
} else {
return superListening;
}}, "~N");
Clazz.defineMethod (c$, "adjustListeningChildren", 
function (mask, num) {
if (num == 0) return;
if ((mask & 32768) != 0) {
this.listeningChildren += num;
}if ((mask & 65536) != 0) {
this.listeningBoundsChildren += num;
}this.adjustListeningChildrenOnParent (mask, num);
}, "~N,~N");
Clazz.defineMethod (c$, "adjustDescendants", 
function (num) {
if (num == 0) return;
this.descendantsCount += num;
this.adjustDecendantsOnParent (num);
}, "~N");
Clazz.defineMethod (c$, "adjustDecendantsOnParent", 
function (num) {
if (this.parent != null) {
this.parent.adjustDescendants (num);
}}, "~N");
Clazz.defineMethod (c$, "countHierarchyMembers", 
function () {
return this.descendantsCount + 1;
});
Clazz.defineMethod (c$, "getListenersCount", 
 function (id, enabledOnToolkit) {
if (enabledOnToolkit) {
return this.descendantsCount;
}switch (id) {
case 1400:
return this.listeningChildren;
case 1401:
case 1402:
return this.listeningBoundsChildren;
default:
return 0;
}
}, "~N,~B");
Clazz.defineMethod (c$, "createHierarchyEvents", 
function (id, changed, changedParent, changeFlags, enabledOnToolkit) {
var listeners = this.getListenersCount (id, enabledOnToolkit);
for (var count = listeners, i = 0; count > 0; i++) {
count -= this.children.get (i).createHierarchyEvents (id, changed, changedParent, changeFlags, enabledOnToolkit);
}
return listeners + this.createHierEventsComp (id, changed, changedParent, changeFlags, enabledOnToolkit);
}, "~N,java.awt.Component,java.awt.Container,~N,~B");
Clazz.defineMethod (c$, "createChildHierarchyEvents", 
function (id, changeFlags, enabledOnToolkit) {
if (this.children.isEmpty ()) {
return;
}var listeners = this.getListenersCount (id, enabledOnToolkit);
for (var count = listeners, i = 0; count > 0; i++) {
count -= this.children.get (i).createHierarchyEvents (id, this, this.parent, changeFlags, enabledOnToolkit);
}
}, "~N,~N,~B");
Clazz.defineMethod (c$, "getLayout", 
function () {
return this.layoutMgr;
});
Clazz.defineMethod (c$, "setLayout", 
function (mgr) {
this.layoutMgr = mgr;
this.invalidateIfValid ();
}, "java.awt.LayoutManager");
Clazz.overrideMethod (c$, "doLayout", 
function () {
this.layout ();
});
Clazz.overrideMethod (c$, "layout", 
function () {
if (this.layoutMgr != null && this.width > 0 && this.height > 0) {
this.layoutMgr.layoutContainer (this);
}});
Clazz.overrideMethod (c$, "invalidate", 
function () {
var layoutMgr = this.layoutMgr;
if (Clazz.instanceOf (layoutMgr, java.awt.LayoutManager2)) {
var lm = layoutMgr;
lm.invalidateLayout (this);
}this.invalidateComp ();
});
Clazz.overrideMethod (c$, "validate", 
function () {
if (!this.isValid ()) {
{
if (this.peer == null) this.peer = this.getToolkit ().createComponent (this);
var n = this.children.size ();
if (!this.isValid () && this.peer != null && n > 0) {
var p = null;
if (Clazz.instanceOf (this.peer, java.awt.peer.ContainerPeer)) p = this.peer;
if (p != null) p.beginValidate ();
this.validateTree ();
if (p != null) {
p.endValidate ();
if (this.isVisible ()) this.updateCursorImmediately ();
}}}}});
Clazz.defineMethod (c$, "repackContainer", 
function () {
var newSize = this.getPreferredSize ();
if (this.peer != null) {
this.setClientSize (newSize.width, newSize.height);
}this.validate ();
});
Clazz.defineMethod (c$, "setClientSize", 
function (w, h) {
{
this.setBoundsOp (4);
this.setBounds (this.x, this.y, w, h);
}}, "~N,~N");
Clazz.defineMethod (c$, "validateTree", 
function () {
if (!this.isValid ()) {
if (Clazz.instanceOf (this.peer, java.awt.peer.ContainerPeer)) {
(this.peer).beginLayout ();
}this.doLayout ();
for (var i = 0; i < this.children.size (); i++) {
var comp = this.children.get (i);
if ((Clazz.instanceOf (comp, java.awt.Container)) && !comp.isValid ()) {
(comp).validateTree ();
} else {
comp.validate ();
}}
if (Clazz.instanceOf (this.peer, java.awt.peer.ContainerPeer)) {
(this.peer).endLayout ();
}}this.validateComponent ();
});
Clazz.defineMethod (c$, "invalidateTree", 
function () {
{
for (var i = 0; i < this.children.size (); i++) {
var comp = this.children.get (i);
if (Clazz.instanceOf (comp, java.awt.Container)) {
(comp).invalidateTree ();
} else {
comp.invalidateIfValid ();
}}
this.invalidateIfValid ();
}});
Clazz.overrideMethod (c$, "setFont", 
function (f) {
var oldfont = this.getFont ();
this.setFontComp (f);
var newfont = this.getFont ();
if (newfont !== oldfont && (oldfont == null || !oldfont.equals (newfont))) {
this.invalidateTree ();
}}, "java.awt.Font");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return this.preferredSize ();
});
Clazz.overrideMethod (c$, "preferredSize", 
function () {
var dim = this.prefSize;
if (dim == null || !(this.isPreferredSizeSet () || this.isValid ())) {
{
this.prefSize = (this.layoutMgr != null) ? this.layoutMgr.preferredLayoutSize (this) : this.prefSizeComp ();
dim = this.prefSize;
}}return (dim == null ? null :  new java.awt.Dimension (dim));
});
Clazz.overrideMethod (c$, "getMinimumSize", 
function () {
var dim = this.minSize;
if (dim == null || !(this.isMinimumSizeSet () || this.isValid ())) {
{
this.minSize = (this.layoutMgr != null) ? this.layoutMgr.minimumLayoutSize (this) : this.minimumSize ();
dim = this.minSize;
}}if (dim != null) {
return  new java.awt.Dimension (dim);
} else {
return dim;
}});
Clazz.overrideMethod (c$, "getMaximumSize", 
function () {
var dim = this.maxSize;
if (dim == null || !(this.isMaximumSizeSet () || this.isValid ())) {
{
if (Clazz.instanceOf (this.layoutMgr, java.awt.LayoutManager2)) {
var lm = this.layoutMgr;
this.maxSize = lm.maximumLayoutSize (this);
} else {
this.maxSize = this.getMaxSizeComp ();
}dim = this.maxSize;
}}if (dim != null) {
return  new java.awt.Dimension (dim);
} else {
return dim;
}});
Clazz.overrideMethod (c$, "getAlignmentX", 
function () {
var xAlign;
if (Clazz.instanceOf (this.layoutMgr, java.awt.LayoutManager2)) {
{
var lm = this.layoutMgr;
xAlign = lm.getLayoutAlignmentX (this);
}} else {
xAlign = this.getAlignmentXComp ();
}return xAlign;
});
Clazz.overrideMethod (c$, "getAlignmentY", 
function () {
var yAlign;
if (Clazz.instanceOf (this.layoutMgr, java.awt.LayoutManager2)) {
{
var lm = this.layoutMgr;
yAlign = lm.getLayoutAlignmentY (this);
}} else {
yAlign = this.getAlignmentYComp ();
}return yAlign;
});
Clazz.overrideMethod (c$, "paint", 
function (g) {
java.awt.GraphicsCallback.PaintCallback.getInstance ().runComponents (this.children.toArray (java.awt.Container.EMPTY_ARRAY), g, 2);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "update", 
function (g) {
if (this.isShowing ()) {
g.clearRect (0, 0, this.width, this.height);
this.paint (g);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintComponents", 
function (g) {
if (this.isShowing ()) {
java.awt.GraphicsCallback.PaintAllCallback.getInstance ().runComponents (this.children.toArray (java.awt.Container.EMPTY_ARRAY), g, 4);
}}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "lightweightPaint", 
function (g) {
this.lwPaintComp (g);
this.paintHeavyweightComponents (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintHeavyweightComponents", 
function (g) {
if (this.isShowing ()) {
java.awt.GraphicsCallback.PaintHeavyweightComponentsCallback.getInstance ().runComponents (this.children.toArray (java.awt.Container.EMPTY_ARRAY), g, 3);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "addContainerListener", 
function (l) {
if (l == null) {
return;
}this.containerListener = java.awt.AWTEventMulticaster.add (this.containerListener, l);
this.newEventsOnly = true;
}, "java.awt.event.ContainerListener");
Clazz.defineMethod (c$, "removeContainerListener", 
function (l) {
if (l == null) {
return;
}this.containerListener = java.awt.AWTEventMulticaster.remove (this.containerListener, l);
}, "java.awt.event.ContainerListener");
Clazz.defineMethod (c$, "getContainerListeners", 
function () {
return (this.getListeners (java.awt.event.ContainerListener));
});
Clazz.overrideMethod (c$, "getListeners", 
function (listenerType) {
var l = null;
if (listenerType === java.awt.event.ContainerListener) {
l = this.containerListener;
} else {
return this.getListenersComp (listenerType);
}return java.awt.AWTEventMulticaster.getListeners (l, listenerType);
}, "Class");
Clazz.overrideMethod (c$, "eventEnabled", 
function (e) {
var id = e.getID ();
if (id == 300 || id == 301) {
if ((this.eventMask & 2) != 0 || this.containerListener != null) {
return true;
}return false;
}return this.eventTypeEnabled (e.id);
}, "java.awt.AWTEvent");
Clazz.overrideMethod (c$, "processEvent", 
function (e) {
this.processEventCont (e);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "processEventCont", 
function (e) {
if (Clazz.instanceOf (e, java.awt.event.ContainerEvent)) {
this.processContainerEvent (e);
return;
}this.processEventComp (e);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "processContainerEvent", 
function (e) {
var listener = this.containerListener;
if (listener != null) {
switch (e.getID ()) {
case 300:
listener.componentAdded (e);
break;
case 301:
listener.componentRemoved (e);
break;
}
}}, "java.awt.event.ContainerEvent");
Clazz.overrideMethod (c$, "dispatchEventImpl", 
function (e) {
if ((this.dispatcher != null) && this.dispatcher.dispatchEvent (e)) {
e.consume ();
if (this.peer != null) {
this.peer.handleEvent (e);
}return;
}this.dispatchEventImplComp (e);
{
switch (e.getID ()) {
case 101:
break;
case 100:
break;
default:
break;
}
}}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "dispatchEventToSelf", 
function (e) {
this.dispatchEventImplComp (e);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "getMouseEventTarget", 
 function (x, y, includeSelf, filter, searchHeavyweights) {
{
if (arguments.length == 3) {
filter = java.awt.Container.MouseEventTargetFilter.FILTER;
searchHeavyWeights = false;
}
}var comp = null;
if (comp == null || comp === this) {
comp = this.getMouseEventTargetImpl (x, y, includeSelf, filter, false, searchHeavyweights);
}return comp;
}, "~N,~N,~B,java.awt.Container.EventTargetFilter,~B");
Clazz.defineMethod (c$, "getMouseEventTargetImpl", 
 function (x, y, includeSelf, filter, searchHeavyweightChildren, searchHeavyweightDescendants) {
{
for (var i = 0; i < this.children.size (); i++) {
var comp = this.children.get (i);
if (comp != null && comp.visible && ((!searchHeavyweightChildren && Clazz.instanceOf (comp.peer, java.awt.peer.LightweightPeer)) || (searchHeavyweightChildren && !(Clazz.instanceOf (comp.peer, java.awt.peer.LightweightPeer)))) && comp.contains (x - comp.x, y - comp.y)) {
if (Clazz.instanceOf (comp, java.awt.Container)) {
var child = comp;
var deeper = child.getMouseEventTarget (x - child.x, y - child.y, includeSelf, filter, searchHeavyweightDescendants);
if (deeper != null) {
return deeper;
}} else {
if (filter.accept (comp)) {
return comp;
}}}}
var isPeerOK;
var isMouseOverMe;
isPeerOK = includeSelf;
isMouseOverMe = this.contains (x, y);
if (isMouseOverMe && isPeerOK && filter.accept (this)) {
return this;
}return null;
}}, "~N,~N,~B,java.awt.Container.EventTargetFilter,~B,~B");
Clazz.defineMethod (c$, "proxyEnableEvents", 
function (events) {
if (this.parent != null) {
this.parent.proxyEnableEvents (events);
}if (this.dispatcher != null) {
this.dispatcher.enableEvents (events);
}}, "~N");
Clazz.defineMethod (c$, "deliverEvent", 
function (e) {
var comp = this.getComponentAt (e.x, e.y);
if ((comp != null) && (comp !== this)) {
e.translate (-comp.x, -comp.y);
comp.deliverEvent (e);
} else {
this.postEvent (e);
}}, "java.awt.Event");
Clazz.defineMethod (c$, "getComponentAt", 
function (x, y) {
return this.locate (x, y);
}, "~N,~N");
Clazz.overrideMethod (c$, "locate", 
function (x, y) {
return this;
}, "~N,~N");
Clazz.defineMethod (c$, "getComponentAt", 
function (p) {
return this.getComponentAt (p.x, p.y);
}, "java.awt.Point");
Clazz.defineMethod (c$, "getMousePosition", 
function (allowChildren) {
return null;
}, "~B");
Clazz.overrideMethod (c$, "isSameOrAncestorOf", 
function (comp, allowChildren) {
return this === comp || (allowChildren && this.isParentOf (comp));
}, "java.awt.Component,~B");
Clazz.defineMethod (c$, "findComponentAt", 
function (x, y) {
{
return this.findComponentAt (x, y, true);
}}, "~N,~N");
Clazz.defineMethod (c$, "findComponentAt", 
function (x, y, ignoreEnabled) {
return null;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "findComponentAt", 
function (p) {
return this.findComponentAt (p.x, p.y);
}, "java.awt.Point");
Clazz.defineMethod (c$, "addNotify", 
function () {
{
this.addNotifyComp ();
if (!(Clazz.instanceOf (this.peer, java.awt.peer.LightweightPeer))) {
this.setDispatcher ();
}for (var i = 0; i < this.children.size (); i++) {
this.children.get (i).addNotify ();
}
}});
Clazz.defineMethod (c$, "setDispatcher", 
function () {
this.dispatcher =  new java.awt.LightweightDispatcher (this);
});
Clazz.defineMethod (c$, "removeNotify", 
function () {
for (var i = this.children.size (); --i >= 0; ) {
var comp = this.children.get (i);
if (comp != null) {
comp.setAutoFocusTransferOnDisposal (false);
comp.removeNotify ();
comp.setAutoFocusTransferOnDisposal (true);
}}
if (this.dispatcher != null) {
this.dispatcher.dispose ();
this.dispatcher = null;
}this.removeNotifyComp ();
});
Clazz.defineMethod (c$, "isAncestorOf", 
function (c) {
var p;
if (c == null || ((p = c.getParent ()) == null)) {
return false;
}while (p != null) {
if (p === this) {
return true;
}p = p.getParent ();
}
return false;
}, "java.awt.Component");
Clazz.overrideMethod (c$, "paramString", 
function () {
var str = this.paramStringComp ();
var layoutMgr = this.layoutMgr;
if (layoutMgr != null) {
str += ",layout=" + layoutMgr.getClass ().getName ();
}return str;
});
Clazz.defineMethod (c$, "setFocusTraversalKeys", 
function (id, keystrokes) {
}, "~N,java.util.Set");
Clazz.defineMethod (c$, "getFocusTraversalKeys", 
function (id) {
return null;
}, "~N");
Clazz.defineMethod (c$, "areFocusTraversalKeysSet", 
function (id) {
return false;
}, "~N");
Clazz.defineMethod (c$, "isFocusCycleRoot", 
function (container) {
if (this.isFocusCycleRoot () && container === this) {
return true;
} else {
return this.isFocusCycleRootComp (container);
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "containsFocus", 
function () {
return false;
});
Clazz.defineMethod (c$, "isParentOf", 
 function (comp) {
{
while (comp != null && comp !== this && !(Clazz.instanceOf (comp, java.awt.Window))) {
comp = comp.getParent ();
}
return (comp === this);
}}, "java.awt.Component");
Clazz.defineMethod (c$, "clearMostRecentFocusOwnerOnHide", 
function () {
});
Clazz.overrideMethod (c$, "clearCurrentFocusCycleRootOnHide", 
function () {
});
Clazz.defineMethod (c$, "getTraversalRoot", 
function () {
return null;
});
Clazz.defineMethod (c$, "isFocusCycleRoot", 
function () {
return this.focusCycleRoot;
});
Clazz.defineMethod (c$, "setFocusTraversalPolicyProvider", 
function (provider) {
var oldProvider;
{
oldProvider = this.focusTraversalPolicyProvider;
this.focusTraversalPolicyProvider = provider;
}this.firePropertyChangeBool ("focusTraversalPolicyProvider", oldProvider, provider);
}, "~B");
Clazz.defineMethod (c$, "isFocusTraversalPolicyProvider", 
function () {
return this.focusTraversalPolicyProvider;
});
Clazz.defineMethod (c$, "transferFocusDownCycle", 
function () {
});
Clazz.defineMethod (c$, "preProcessKeyEvent", 
function (e) {
var parent = this.parent;
if (parent != null) {
parent.preProcessKeyEvent (e);
}}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "postProcessKeyEvent", 
function (e) {
var parent = this.parent;
if (parent != null) {
parent.postProcessKeyEvent (e);
}}, "java.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "postsOldMouseEvents", 
function () {
return true;
});
Clazz.defineMethod (c$, "applyComponentOrientation", 
function (o) {
this.applyCompOrientComp (o);
{
for (var i = 0; i < this.children.size (); i++) {
var comp = this.children.get (i);
comp.applyComponentOrientation (o);
}
}}, "java.awt.ComponentOrientation");
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
this.addPropChangeListenerComp (listener);
}, "java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (propertyName, listener) {
this.addPropChangeListComp (propertyName, listener);
}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "increaseComponentCount", 
function (c) {
if (!c.isDisplayable ()) {
throw  new IllegalStateException ("Peer does not exist while invoking the increaseComponentCount() method");
}var addHW = 0;
var addLW = 0;
if (Clazz.instanceOf (c, java.awt.Container)) {
addLW = (c).numOfLWComponents;
addHW = (c).numOfHWComponents;
}if (c.isLightweight ()) {
addLW++;
} else {
addHW++;
}for (var cont = this; cont != null; cont = cont.getContainer ()) {
cont.numOfLWComponents += addLW;
cont.numOfHWComponents += addHW;
}
}, "java.awt.Component");
Clazz.defineMethod (c$, "decreaseComponentCount", 
function (c) {
if (!c.isDisplayable ()) {
throw  new IllegalStateException ("Peer does not exist while invoking the decreaseComponentCount() method");
}var subHW = 0;
var subLW = 0;
if (Clazz.instanceOf (c, java.awt.Container)) {
subLW = (c).numOfLWComponents;
subHW = (c).numOfHWComponents;
}if (c.isLightweight ()) {
subLW++;
} else {
subHW++;
}for (var cont = this; cont != null; cont = cont.getContainer ()) {
cont.numOfLWComponents -= subLW;
cont.numOfHWComponents -= subHW;
}
}, "java.awt.Component");
Clazz.declareInterface (java.awt.Container, "EventTargetFilter");
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.Container, "MouseEventTargetFilter", null, java.awt.Container.EventTargetFilter);
Clazz.makeConstructor (c$, 
 function () {
});
Clazz.overrideMethod (c$, "accept", 
function (a) {
return (a.eventMask & 32) != 0 || (a.eventMask & 16) != 0 || (a.eventMask & 131072) != 0 || a.mouseListener != null || a.mouseMotionListener != null || a.mouseWheelListener != null;
}, "java.awt.Component");
c$.FILTER = c$.prototype.FILTER =  new java.awt.Container.MouseEventTargetFilter ();
c$ = Clazz.p0p ();
c$.EMPTY_ARRAY = c$.prototype.EMPTY_ARRAY =  new Array (0);
Clazz.defineStatics (c$,
"INCLUDE_SELF", true,
"SEARCH_HEAVYWEIGHTS", true);
c$.NULL_INSETS = c$.prototype.NULL_INSETS =  new java.awt.Insets (0, 0, 0, 0);
c$ = Clazz.decorateAsClass (function () {
this.nativeContainer = null;
this.mouseEventTarget = null;
this.targetLastEntered = null;
this.isMouseInNativeContainer = false;
this.eventMask = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "LightweightDispatcher", null, java.awt.event.AWTEventListener);
Clazz.makeConstructor (c$, 
function (nativeContainer) {
this.nativeContainer = nativeContainer;
this.mouseEventTarget = null;
this.eventMask = 0;
}, "java.awt.Container");
Clazz.defineMethod (c$, "dispose", 
function () {
this.stopListeningForOtherDrags ();
this.mouseEventTarget = null;
});
Clazz.defineMethod (c$, "enableEvents", 
function (events) {
this.eventMask |= events;
}, "~N");
Clazz.defineMethod (c$, "dispatchEvent", 
function (e) {
var ret = false;
if (Clazz.instanceOf (e, java.awt.event.MouseEvent) && (this.eventMask & 131120) != 0) {
var me = e;
ret = this.processMouseEvent (me);
}return ret;
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "isMouseGrab", 
 function (e) {
var modifiers = e.getModifiersEx ();
if (e.getID () == 501 || e.getID () == 502) {
switch (e.getButton ()) {
case 1:
modifiers ^= 1024;
break;
case 2:
modifiers ^= 2048;
break;
case 3:
modifiers ^= 4096;
break;
}
}return ((modifiers & (7168)) != 0);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "processMouseEvent", 
 function (e) {
var id = e.getID ();
var mouseOver = null;
{
mouseOver = e.bdata.jqevent && e.bdata.jqevent.target["data-component"];
}if (mouseOver == null) mouseOver = this.nativeContainer.getMouseEventTarget (e.getX (), e.getY (), true);
this.trackMouseEnterExit (mouseOver, e);
if (!this.isMouseGrab (e) && id != 500) {
this.mouseEventTarget = (mouseOver !== this.nativeContainer) ? mouseOver : null;
}if (this.mouseEventTarget != null) {
switch (id) {
case 504:
case 505:
break;
case 501:
this.retargetMouseEvent (this.mouseEventTarget, id, e);
break;
case 502:
this.retargetMouseEvent (this.mouseEventTarget, id, e);
break;
case 500:
if (mouseOver === this.mouseEventTarget) {
this.retargetMouseEvent (mouseOver, id, e);
}break;
case 503:
this.retargetMouseEvent (this.mouseEventTarget, id, e);
break;
case 506:
if (this.isMouseGrab (e)) {
this.retargetMouseEvent (this.mouseEventTarget, id, e);
}break;
case 507:
this.retargetMouseEvent (mouseOver, id, e);
break;
}
e.consume ();
}return e.isConsumed ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "trackMouseEnterExit", 
 function (targetOver, e) {
var targetEnter = null;
var id = e.getID ();
if (id != 505 && id != 506 && id != 1500 && this.isMouseInNativeContainer == false) {
this.isMouseInNativeContainer = true;
this.startListeningForOtherDrags ();
} else if (id == 505) {
this.isMouseInNativeContainer = false;
this.stopListeningForOtherDrags ();
}if (this.isMouseInNativeContainer) {
targetEnter = targetOver;
}if (this.targetLastEntered === targetEnter) {
return;
}if (this.targetLastEntered != null) {
this.retargetMouseEvent (this.targetLastEntered, 505, e);
}if (id == 505) {
e.consume ();
}if (targetEnter != null) {
this.retargetMouseEvent (targetEnter, 504, e);
}if (id == 504) {
e.consume ();
}this.targetLastEntered = targetEnter;
}, "java.awt.Component,java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "startListeningForOtherDrags", 
 function () {
});
Clazz.defineMethod (c$, "stopListeningForOtherDrags", 
 function () {
});
Clazz.overrideMethod (c$, "eventDispatched", 
function (e) {
var isForeignDrag = (Clazz.instanceOf (e, java.awt.event.MouseEvent)) && (e.id == 506) && (e.getSource () !== this.nativeContainer);
if (!isForeignDrag) {
return;
}var srcEvent = e;
var me;
{
var srcComponent = srcEvent.getComponent ();
if (!srcComponent.isShowing ()) {
return;
}var c = this.nativeContainer;
while ((c != null) && !(Clazz.instanceOf (c, java.awt.Window))) {
c = c.getParent_NoClientCode ();
}
if ((c == null) || (c).isModalBlocked ()) {
return;
}me =  new java.awt.event.MouseEvent (this.nativeContainer, 1500, srcEvent.getWhen (), srcEvent.getModifiersEx () | srcEvent.getModifiers (), srcEvent.getX (), srcEvent.getY (), srcEvent.getXOnScreen (), srcEvent.getYOnScreen (), srcEvent.getClickCount (), srcEvent.isPopupTrigger (), srcEvent.getButton ());
(srcEvent).copyPrivateDataInto (me);
}var targetOver = this.nativeContainer.getMouseEventTarget (me.getX (), me.getY (), true);
this.trackMouseEnterExit (targetOver, me);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "retargetMouseEvent", 
function (target, id, e) {
if (target == null) {
return;
}var x = e.getX ();
var y = e.getY ();
var component;
for (component = target; component != null && component !== this.nativeContainer; component = component.getParent ()) {
x -= component.x;
y -= component.y;
if ((component).uiClassID === "PopupMenuUI") break;
}
var retargeted;
if (component != null) {
if (id == 507) {
retargeted =  new java.awt.event.MouseWheelEvent (target, id, e.getWhen (), e.getModifiersEx () | e.getModifiers (), x, y, e.getXOnScreen (), e.getYOnScreen (), e.getClickCount (), e.isPopupTrigger (), (e).getScrollType (), (e).getScrollAmount (), (e).getWheelRotation ());
} else {
retargeted =  new java.awt.event.MouseEvent (target, id, e.getWhen (), e.getModifiersEx () | e.getModifiers (), x, y, e.getXOnScreen (), e.getYOnScreen (), e.getClickCount (), e.isPopupTrigger (), e.getButton ());
}(e).copyPrivateDataInto (retargeted);
if (target === this.nativeContainer) {
(target).dispatchEventToSelf (retargeted);
} else {
if (this.nativeContainer.modalComp != null) {
if ((this.nativeContainer.modalComp).isAncestorOf (target)) {
target.dispatchEvent (retargeted);
} else {
e.consume ();
}} else {
target.dispatchEvent (retargeted);
}}}}, "java.awt.Component,~N,java.awt.event.MouseEvent");
Clazz.defineStatics (c$,
"LWD_MOUSE_DRAGGED_OVER", 1500,
"MOUSE_MASK", 131120);
});
