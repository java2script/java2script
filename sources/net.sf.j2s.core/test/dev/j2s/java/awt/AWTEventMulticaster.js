Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ContainerListener", "$.FocusListener", "$.HierarchyBoundsListener", "$.HierarchyListener", "$.InputMethodListener", "$.ItemListener", "$.KeyListener", "$.MouseListener", "$.MouseMotionListener", "$.MouseWheelListener", "$.TextListener", "$.WindowFocusListener", "$.WindowListener", "$.WindowStateListener"], "java.awt.AWTEventMulticaster", ["java.lang.NullPointerException", "java.lang.reflect.Array"], function () {
c$ = Clazz.decorateAsClass (function () {
this.a = null;
this.b = null;
Clazz.instantialize (this, arguments);
}, java.awt, "AWTEventMulticaster", null, [java.awt.event.ComponentListener, java.awt.event.ContainerListener, java.awt.event.FocusListener, java.awt.event.KeyListener, java.awt.event.MouseListener, java.awt.event.MouseMotionListener, java.awt.event.WindowListener, java.awt.event.WindowFocusListener, java.awt.event.WindowStateListener, java.awt.event.ActionListener, java.awt.event.ItemListener, java.awt.event.AdjustmentListener, java.awt.event.TextListener, java.awt.event.InputMethodListener, java.awt.event.HierarchyListener, java.awt.event.HierarchyBoundsListener, java.awt.event.MouseWheelListener]);
Clazz.makeConstructor (c$, 
function (a, b) {
this.a = a;
this.b = b;
}, "java.util.EventListener,java.util.EventListener");
Clazz.defineMethod (c$, "remove", 
function (oldl) {
if (oldl === this.a) return this.b;
if (oldl === this.b) return this.a;
var a2 = java.awt.AWTEventMulticaster.removeInternal (this.a, oldl);
var b2 = java.awt.AWTEventMulticaster.removeInternal (this.b, oldl);
if (a2 === this.a && b2 === this.b) {
return this;
}return java.awt.AWTEventMulticaster.addInternal (a2, b2);
}, "java.util.EventListener");
Clazz.defineMethod (c$, "componentResized", 
function (e) {
(this.a).componentResized (e);
(this.b).componentResized (e);
}, "java.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "componentMoved", 
function (e) {
(this.a).componentMoved (e);
(this.b).componentMoved (e);
}, "java.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "componentShown", 
function (e) {
(this.a).componentShown (e);
(this.b).componentShown (e);
}, "java.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "componentHidden", 
function (e) {
(this.a).componentHidden (e);
(this.b).componentHidden (e);
}, "java.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "componentAdded", 
function (e) {
(this.a).componentAdded (e);
(this.b).componentAdded (e);
}, "java.awt.event.ContainerEvent");
Clazz.defineMethod (c$, "componentRemoved", 
function (e) {
(this.a).componentRemoved (e);
(this.b).componentRemoved (e);
}, "java.awt.event.ContainerEvent");
Clazz.defineMethod (c$, "focusGained", 
function (e) {
(this.a).focusGained (e);
(this.b).focusGained (e);
}, "java.awt.event.FocusEvent");
Clazz.defineMethod (c$, "focusLost", 
function (e) {
(this.a).focusLost (e);
(this.b).focusLost (e);
}, "java.awt.event.FocusEvent");
Clazz.defineMethod (c$, "keyTyped", 
function (e) {
(this.a).keyTyped (e);
(this.b).keyTyped (e);
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyPressed", 
function (e) {
(this.a).keyPressed (e);
(this.b).keyPressed (e);
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyReleased", 
function (e) {
(this.a).keyReleased (e);
(this.b).keyReleased (e);
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "mouseClicked", 
function (e) {
(this.a).mouseClicked (e);
(this.b).mouseClicked (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mousePressed", 
function (e) {
(this.a).mousePressed (e);
(this.b).mousePressed (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseReleased", 
function (e) {
(this.a).mouseReleased (e);
(this.b).mouseReleased (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseEntered", 
function (e) {
(this.a).mouseEntered (e);
(this.b).mouseEntered (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseExited", 
function (e) {
(this.a).mouseExited (e);
(this.b).mouseExited (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseDragged", 
function (e) {
(this.a).mouseDragged (e);
(this.b).mouseDragged (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseMoved", 
function (e) {
(this.a).mouseMoved (e);
(this.b).mouseMoved (e);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "windowOpened", 
function (e) {
(this.a).windowOpened (e);
(this.b).windowOpened (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowClosing", 
function (e) {
(this.a).windowClosing (e);
(this.b).windowClosing (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowClosed", 
function (e) {
(this.a).windowClosed (e);
(this.b).windowClosed (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowIconified", 
function (e) {
(this.a).windowIconified (e);
(this.b).windowIconified (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowDeiconified", 
function (e) {
(this.a).windowDeiconified (e);
(this.b).windowDeiconified (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowActivated", 
function (e) {
(this.a).windowActivated (e);
(this.b).windowActivated (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowDeactivated", 
function (e) {
(this.a).windowDeactivated (e);
(this.b).windowDeactivated (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowStateChanged", 
function (e) {
(this.a).windowStateChanged (e);
(this.b).windowStateChanged (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowGainedFocus", 
function (e) {
(this.a).windowGainedFocus (e);
(this.b).windowGainedFocus (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowLostFocus", 
function (e) {
(this.a).windowLostFocus (e);
(this.b).windowLostFocus (e);
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "actionPerformed", 
function (e) {
(this.a).actionPerformed (e);
(this.b).actionPerformed (e);
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "itemStateChanged", 
function (e) {
(this.a).itemStateChanged (e);
(this.b).itemStateChanged (e);
}, "java.awt.event.ItemEvent");
Clazz.defineMethod (c$, "adjustmentValueChanged", 
function (e) {
(this.a).adjustmentValueChanged (e);
(this.b).adjustmentValueChanged (e);
}, "java.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "textValueChanged", 
function (e) {
(this.a).textValueChanged (e);
(this.b).textValueChanged (e);
}, "java.awt.event.TextEvent");
Clazz.defineMethod (c$, "inputMethodTextChanged", 
function (e) {
(this.a).inputMethodTextChanged (e);
(this.b).inputMethodTextChanged (e);
}, "java.awt.event.InputMethodEvent");
Clazz.defineMethod (c$, "caretPositionChanged", 
function (e) {
(this.a).caretPositionChanged (e);
(this.b).caretPositionChanged (e);
}, "java.awt.event.InputMethodEvent");
Clazz.defineMethod (c$, "hierarchyChanged", 
function (e) {
(this.a).hierarchyChanged (e);
(this.b).hierarchyChanged (e);
}, "java.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "ancestorMoved", 
function (e) {
(this.a).ancestorMoved (e);
(this.b).ancestorMoved (e);
}, "java.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "ancestorResized", 
function (e) {
(this.a).ancestorResized (e);
(this.b).ancestorResized (e);
}, "java.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "mouseWheelMoved", 
function (e) {
(this.a).mouseWheelMoved (e);
(this.b).mouseWheelMoved (e);
}, "java.awt.event.MouseWheelEvent");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.ComponentListener,java.awt.event.ComponentListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.ContainerListener,java.awt.event.ContainerListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.FocusListener,java.awt.event.FocusListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.KeyListener,java.awt.event.KeyListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.MouseListener,java.awt.event.MouseListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.MouseMotionListener,java.awt.event.MouseMotionListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.WindowListener,java.awt.event.WindowListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.WindowStateListener,java.awt.event.WindowStateListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.WindowFocusListener,java.awt.event.WindowFocusListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.ActionListener,java.awt.event.ActionListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.ItemListener,java.awt.event.ItemListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.AdjustmentListener,java.awt.event.AdjustmentListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.TextListener,java.awt.event.TextListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.InputMethodListener,java.awt.event.InputMethodListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.HierarchyListener,java.awt.event.HierarchyListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.HierarchyBoundsListener,java.awt.event.HierarchyBoundsListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return java.awt.AWTEventMulticaster.addInternal (a, b);
}, "java.awt.event.MouseWheelListener,java.awt.event.MouseWheelListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.ComponentListener,java.awt.event.ComponentListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.ContainerListener,java.awt.event.ContainerListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.FocusListener,java.awt.event.FocusListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.KeyListener,java.awt.event.KeyListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.MouseListener,java.awt.event.MouseListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.MouseMotionListener,java.awt.event.MouseMotionListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.WindowListener,java.awt.event.WindowListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.WindowStateListener,java.awt.event.WindowStateListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.WindowFocusListener,java.awt.event.WindowFocusListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.ActionListener,java.awt.event.ActionListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.ItemListener,java.awt.event.ItemListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.AdjustmentListener,java.awt.event.AdjustmentListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.TextListener,java.awt.event.TextListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.InputMethodListener,java.awt.event.InputMethodListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.HierarchyListener,java.awt.event.HierarchyListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.HierarchyBoundsListener,java.awt.event.HierarchyBoundsListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return java.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "java.awt.event.MouseWheelListener,java.awt.event.MouseWheelListener");
c$.addInternal = Clazz.defineMethod (c$, "addInternal", 
function (a, b) {
if (a == null) return b;
if (b == null) return a;
return  new java.awt.AWTEventMulticaster (a, b);
}, "java.util.EventListener,java.util.EventListener");
c$.removeInternal = Clazz.defineMethod (c$, "removeInternal", 
function (l, oldl) {
if (l === oldl || l == null) {
return null;
} else if (Clazz.instanceOf (l, java.awt.AWTEventMulticaster)) {
return (l).remove (oldl);
} else {
return l;
}}, "java.util.EventListener,java.util.EventListener");
c$.getListenerCount = Clazz.defineMethod (c$, "getListenerCount", 
 function (l, listenerType) {
if (Clazz.instanceOf (l, java.awt.AWTEventMulticaster)) {
var mc = l;
return java.awt.AWTEventMulticaster.getListenerCount (mc.a, listenerType) + java.awt.AWTEventMulticaster.getListenerCount (mc.b, listenerType);
} else {
return listenerType.isInstance (l) ? 1 : 0;
}}, "java.util.EventListener,Class");
c$.populateListenerArray = Clazz.defineMethod (c$, "populateListenerArray", 
 function (a, l, index) {
if (Clazz.instanceOf (l, java.awt.AWTEventMulticaster)) {
var mc = l;
var lhs = java.awt.AWTEventMulticaster.populateListenerArray (a, mc.a, index);
return java.awt.AWTEventMulticaster.populateListenerArray (a, mc.b, lhs);
} else if (a.getClass ().getComponentType ().isInstance (l)) {
a[index] = l;
return index + 1;
} else {
return index;
}}, "~A,java.util.EventListener,~N");
c$.getListeners = Clazz.defineMethod (c$, "getListeners", 
function (l, listenerType) {
if (listenerType == null) {
throw  new NullPointerException ("Listener type should not be null");
}var n = java.awt.AWTEventMulticaster.getListenerCount (l, listenerType);
var result = java.lang.reflect.Array.newInstance (listenerType, n);
java.awt.AWTEventMulticaster.populateListenerArray (result, l, 0);
return result;
}, "java.util.EventListener,Class");
});
