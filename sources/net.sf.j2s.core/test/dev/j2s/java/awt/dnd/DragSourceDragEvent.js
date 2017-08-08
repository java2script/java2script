Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.awt.dnd.DragSourceEvent"], "java.awt.dnd.DragSourceDragEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.targetActions = 0;
this.dropAction = 0;
this.gestureModifiers = 0;
this.invalidModifiers = false;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DragSourceDragEvent", java.awt.dnd.DragSourceEvent);
Clazz.makeConstructor (c$, 
function (dsc, dropAction, action, modifiers) {
Clazz.superConstructor (this, java.awt.dnd.DragSourceDragEvent, [dsc]);
this.targetActions = action;
this.gestureModifiers = modifiers;
this.dropAction = dropAction;
if ((modifiers & -16384) != 0) {
this.invalidModifiers = true;
} else if ((this.getGestureModifiers () != 0) && (this.getGestureModifiersEx () == 0)) {
this.setNewModifiers ();
} else if ((this.getGestureModifiers () == 0) && (this.getGestureModifiersEx () != 0)) {
this.setOldModifiers ();
} else {
this.invalidModifiers = true;
}}, "java.awt.dnd.DragSourceContext,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (dsc, dropAction, action, modifiers, x, y) {
Clazz.superConstructor (this, java.awt.dnd.DragSourceDragEvent, [dsc, x, y]);
this.targetActions = action;
this.gestureModifiers = modifiers;
this.dropAction = dropAction;
if ((modifiers & -16384) != 0) {
this.invalidModifiers = true;
} else if ((this.getGestureModifiers () != 0) && (this.getGestureModifiersEx () == 0)) {
this.setNewModifiers ();
} else if ((this.getGestureModifiers () == 0) && (this.getGestureModifiersEx () != 0)) {
this.setOldModifiers ();
} else {
this.invalidModifiers = true;
}}, "java.awt.dnd.DragSourceContext,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getTargetActions", 
function () {
return this.targetActions;
});
Clazz.defineMethod (c$, "getGestureModifiers", 
function () {
return this.invalidModifiers ? this.gestureModifiers : this.gestureModifiers & 63;
});
Clazz.defineMethod (c$, "getGestureModifiersEx", 
function () {
return this.invalidModifiers ? this.gestureModifiers : this.gestureModifiers & 16320;
});
Clazz.defineMethod (c$, "getUserAction", 
function () {
return this.dropAction;
});
Clazz.defineMethod (c$, "getDropAction", 
function () {
return this.targetActions & this.getDragSourceContext ().getSourceActions ();
});
Clazz.defineMethod (c$, "setNewModifiers", 
 function () {
if ((this.gestureModifiers & 16) != 0) {
this.gestureModifiers |= 1024;
}if ((this.gestureModifiers & 8) != 0) {
this.gestureModifiers |= 2048;
}if ((this.gestureModifiers & 4) != 0) {
this.gestureModifiers |= 4096;
}if ((this.gestureModifiers & 1) != 0) {
this.gestureModifiers |= 64;
}if ((this.gestureModifiers & 2) != 0) {
this.gestureModifiers |= 128;
}if ((this.gestureModifiers & 32) != 0) {
this.gestureModifiers |= 8192;
}});
Clazz.defineMethod (c$, "setOldModifiers", 
 function () {
if ((this.gestureModifiers & 1024) != 0) {
this.gestureModifiers |= 16;
}if ((this.gestureModifiers & 2048) != 0) {
this.gestureModifiers |= 8;
}if ((this.gestureModifiers & 4096) != 0) {
this.gestureModifiers |= 4;
}if ((this.gestureModifiers & 64) != 0) {
this.gestureModifiers |= 1;
}if ((this.gestureModifiers & 128) != 0) {
this.gestureModifiers |= 2;
}if ((this.gestureModifiers & 8192) != 0) {
this.gestureModifiers |= 32;
}});
Clazz.defineStatics (c$,
"JDK_1_3_MODIFIERS", 63,
"JDK_1_4_MODIFIERS", 16320);
});
