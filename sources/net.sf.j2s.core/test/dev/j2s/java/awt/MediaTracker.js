Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.image.ImageObserver"], ["java.awt.MediaEntry", "$.ImageMediaEntry", "$.MediaTracker"], null, function () {
c$ = Clazz.decorateAsClass (function () {
this.target = null;
this.head = null;
Clazz.instantialize (this, arguments);
}, java.awt, "MediaTracker", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function (comp) {
this.target = comp;
}, "java.awt.Component");
Clazz.defineMethod (c$, "addImage", 
function (image, id) {
this.addImage (image, id, -1, -1);
}, "java.awt.Image,~N");
Clazz.defineMethod (c$, "addImage", 
function (image, id, w, h) {
this.head = java.awt.MediaEntry.insert (this.head,  new java.awt.ImageMediaEntry (this, image, id, w, h));
}, "java.awt.Image,~N,~N,~N");
Clazz.defineMethod (c$, "checkAll", 
function () {
return this.checkAll (false, true);
});
Clazz.defineMethod (c$, "checkAll", 
function (load) {
return this.checkAll (load, true);
}, "~B");
Clazz.defineMethod (c$, "checkAll", 
 function (load, verify) {
var cur = this.head;
var done = true;
while (cur != null) {
if ((cur.getStatus (load, verify) & 14) == 0) {
done = false;
}cur = cur.next;
}
return done;
}, "~B,~B");
Clazz.defineMethod (c$, "isErrorAny", 
function () {
var cur = this.head;
while (cur != null) {
if ((cur.getStatus (false, true) & 4) != 0) {
return true;
}cur = cur.next;
}
return false;
});
Clazz.defineMethod (c$, "getErrorsAny", 
function () {
var cur = this.head;
var numerrors = 0;
while (cur != null) {
if ((cur.getStatus (false, true) & 4) != 0) {
numerrors++;
}cur = cur.next;
}
if (numerrors == 0) {
return null;
}var errors =  new Array (numerrors);
cur = this.head;
numerrors = 0;
while (cur != null) {
if ((cur.getStatus (false, false) & 4) != 0) {
errors[numerrors++] = cur.getMedia ();
}cur = cur.next;
}
return errors;
});
Clazz.defineMethod (c$, "waitForAll", 
function () {
this.waitForAll (0);
});
Clazz.defineMethod (c$, "waitForAll", 
function (ms) {
var end = System.currentTimeMillis () + ms;
var first = true;
while (true) {
var status = this.statusAll (first, first);
if ((status & 1) == 0) {
return (status == 8);
}first = false;
var timeout;
if (ms == 0) {
timeout = 0;
} else {
timeout = end - System.currentTimeMillis ();
if (timeout <= 0) {
return false;
}}this.wait (timeout);
}
}, "~N");
Clazz.defineMethod (c$, "statusAll", 
function (load) {
return this.statusAll (load, true);
}, "~B");
Clazz.defineMethod (c$, "statusAll", 
 function (load, verify) {
var cur = this.head;
var status = 0;
while (cur != null) {
status = status | cur.getStatus (load, verify);
cur = cur.next;
}
return status;
}, "~B,~B");
Clazz.defineMethod (c$, "checkID", 
function (id) {
return this.checkID (id, false, true);
}, "~N");
Clazz.defineMethod (c$, "checkID", 
function (id, load) {
return this.checkID (id, load, true);
}, "~N,~B");
Clazz.defineMethod (c$, "checkID", 
 function (id, load, verify) {
var cur = this.head;
var done = true;
while (cur != null) {
if (cur.getID () == id && (cur.getStatus (load, verify) & 14) == 0) {
done = false;
}cur = cur.next;
}
return done;
}, "~N,~B,~B");
Clazz.defineMethod (c$, "isErrorID", 
function (id) {
var cur = this.head;
while (cur != null) {
if (cur.getID () == id && (cur.getStatus (false, true) & 4) != 0) {
return true;
}cur = cur.next;
}
return false;
}, "~N");
Clazz.defineMethod (c$, "getErrorsID", 
function (id) {
var cur = this.head;
var numerrors = 0;
while (cur != null) {
if (cur.getID () == id && (cur.getStatus (false, true) & 4) != 0) {
numerrors++;
}cur = cur.next;
}
if (numerrors == 0) {
return null;
}var errors =  new Array (numerrors);
cur = this.head;
numerrors = 0;
while (cur != null) {
if (cur.getID () == id && (cur.getStatus (false, false) & 4) != 0) {
errors[numerrors++] = cur.getMedia ();
}cur = cur.next;
}
return errors;
}, "~N");
Clazz.defineMethod (c$, "waitForID", 
function (id) {
this.waitForID (id, 0);
}, "~N");
Clazz.defineMethod (c$, "waitForID", 
function (id, ms) {
var end = System.currentTimeMillis () + ms;
var first = true;
while (true) {
var status = this.statusID (id, first, first);
if ((status & 1) == 0) {
return (status == 8);
}first = false;
var timeout;
if (ms == 0) {
timeout = 0;
} else {
timeout = end - System.currentTimeMillis ();
if (timeout <= 0) {
return false;
}}this.wait (timeout);
}
}, "~N,~N");
Clazz.defineMethod (c$, "statusID", 
function (id, load) {
return this.statusID (id, load, true);
}, "~N,~B");
Clazz.defineMethod (c$, "statusID", 
 function (id, load, verify) {
var cur = this.head;
var status = 0;
while (cur != null) {
if (cur.getID () == id) {
status = status | cur.getStatus (load, verify);
}cur = cur.next;
}
return status;
}, "~N,~B,~B");
Clazz.defineMethod (c$, "removeImage", 
function (image) {
var cur = this.head;
var prev = null;
while (cur != null) {
var next = cur.next;
if (cur.getMedia () === image) {
if (prev == null) {
this.head = next;
} else {
prev.next = next;
}cur.cancel ();
} else {
prev = cur;
}cur = next;
}
this.notifyAll ();
}, "java.awt.Image");
Clazz.defineMethod (c$, "removeImage", 
function (image, id) {
var cur = this.head;
var prev = null;
while (cur != null) {
var next = cur.next;
if (cur.getID () == id && cur.getMedia () === image) {
if (prev == null) {
this.head = next;
} else {
prev.next = next;
}cur.cancel ();
} else {
prev = cur;
}cur = next;
}
this.notifyAll ();
}, "java.awt.Image,~N");
Clazz.defineMethod (c$, "removeImage", 
function (image, id, width, height) {
var cur = this.head;
var prev = null;
while (cur != null) {
var next = cur.next;
if (cur.getID () == id && Clazz.instanceOf (cur, java.awt.ImageMediaEntry) && (cur).matches (image, width, height)) {
if (prev == null) {
this.head = next;
} else {
prev.next = next;
}cur.cancel ();
} else {
prev = cur;
}cur = next;
}
this.notifyAll ();
}, "java.awt.Image,~N,~N,~N");
Clazz.defineMethod (c$, "setDone", 
function () {
this.notifyAll ();
});
Clazz.defineStatics (c$,
"LOADING", 1,
"ABORTED", 2,
"ERRORED", 4,
"COMPLETE", 8,
"DONE", (14));
c$ = Clazz.decorateAsClass (function () {
this.tracker = null;
this.ID = 0;
this.next = null;
this.status = 0;
this.cancelled = false;
Clazz.instantialize (this, arguments);
}, java.awt, "MediaEntry");
Clazz.makeConstructor (c$, 
function (mt, id) {
this.tracker = mt;
this.ID = id;
}, "java.awt.MediaTracker,~N");
c$.insert = Clazz.defineMethod (c$, "insert", 
function (head, me) {
var cur = head;
var prev = null;
while (cur != null) {
if (cur.ID > me.ID) {
break;
}prev = cur;
cur = cur.next;
}
me.next = cur;
if (prev == null) {
head = me;
} else {
prev.next = me;
}return head;
}, "java.awt.MediaEntry,java.awt.MediaEntry");
Clazz.defineMethod (c$, "getID", 
function () {
return this.ID;
});
Clazz.defineMethod (c$, "cancel", 
function () {
this.cancelled = true;
});
Clazz.defineMethod (c$, "getStatus", 
function (doLoad, doVerify) {
if (doLoad && ((this.status & 13) == 0)) {
this.status = (this.status & -3) | 1;
this.startLoad ();
}return this.status;
}, "~B,~B");
Clazz.defineMethod (c$, "setStatus", 
function (flag) {
{
this.status = flag;
}this.tracker.setDone ();
}, "~N");
Clazz.defineStatics (c$,
"LOADING", 1,
"ABORTED", 2,
"ERRORED", 4,
"COMPLETE", 8,
"LOADSTARTED", (13),
"DONE", (14));
c$ = Clazz.decorateAsClass (function () {
this.image = null;
this.width = 0;
this.height = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "ImageMediaEntry", java.awt.MediaEntry, [java.awt.image.ImageObserver, java.io.Serializable]);
Clazz.makeConstructor (c$, 
function (mt, img, c, w, h) {
Clazz.superConstructor (this, java.awt.ImageMediaEntry, [mt, c]);
this.image = img;
this.width = w;
this.height = h;
}, "java.awt.MediaTracker,java.awt.Image,~N,~N,~N");
Clazz.defineMethod (c$, "matches", 
function (img, w, h) {
return (this.image === img && this.width == w && this.height == h);
}, "java.awt.Image,~N,~N");
Clazz.overrideMethod (c$, "getMedia", 
function () {
return this.image;
});
Clazz.defineMethod (c$, "getStatus", 
function (doLoad, doVerify) {
if (doVerify) {
var flags = this.tracker.target.checkImage (this.image, this.width, this.height, null);
var s = this.parseflags (flags);
if (s == 0) {
if ((this.status & (12)) != 0) {
this.setStatus (2);
}} else if (s != this.status) {
this.setStatus (s);
}}return Clazz.superCall (this, java.awt.ImageMediaEntry, "getStatus", [doLoad, doVerify]);
}, "~B,~B");
Clazz.overrideMethod (c$, "startLoad", 
function () {
if (this.tracker.target.prepareImage (this.image, this.width, this.height, this)) {
this.setStatus (8);
}});
Clazz.defineMethod (c$, "parseflags", 
function (infoflags) {
if ((infoflags & 64) != 0) {
return 4;
} else if ((infoflags & 128) != 0) {
return 2;
} else if ((infoflags & (48)) != 0) {
return 8;
}return 0;
}, "~N");
Clazz.overrideMethod (c$, "imageUpdate", 
function (img, infoflags, x, y, w, h) {
if (this.cancelled) {
return false;
}var s = this.parseflags (infoflags);
if (s != 0 && s != this.status) {
this.setStatus (s);
}return ((this.status & 1) != 0);
}, "java.awt.Image,~N,~N,~N,~N,~N");
});
