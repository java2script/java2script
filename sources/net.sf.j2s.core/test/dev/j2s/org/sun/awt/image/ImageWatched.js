Clazz.declarePackage ("sun.awt.image");
Clazz.load (null, "sun.awt.image.ImageWatched", ["java.lang.ref.WeakReference"], function () {
c$ = Clazz.decorateAsClass (function () {
this.watcherList = null;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "ImageWatched");
Clazz.makeConstructor (c$, 
function () {
this.watcherList = sun.awt.image.ImageWatched.endlink;
});
Clazz.defineMethod (c$, "addWatcher", 
function (iw) {
if (iw != null && !this.isWatcher (iw)) {
this.watcherList =  new sun.awt.image.ImageWatched.WeakLink (iw, this.watcherList);
}}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "isWatcher", 
function (iw) {
return this.watcherList.isWatcher (iw);
}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "removeWatcher", 
function (iw) {
{
this.watcherList = this.watcherList.removeWatcher (iw);
}if (this.watcherList === sun.awt.image.ImageWatched.endlink) {
this.notifyWatcherListEmpty ();
}}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "isWatcherListEmpty", 
function () {
{
this.watcherList = this.watcherList.removeWatcher (null);
}return (this.watcherList === sun.awt.image.ImageWatched.endlink);
});
Clazz.defineMethod (c$, "newInfo", 
function (img, info, x, y, w, h) {
if (this.watcherList.newInfo (img, info, x, y, w, h)) {
this.removeWatcher (null);
}}, "java.awt.Image,~N,~N,~N,~N,~N");
Clazz.pu$h(c$);
c$ = Clazz.declareType (sun.awt.image.ImageWatched, "Link");
Clazz.defineMethod (c$, "isWatcher", 
function (a) {
return false;
}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "removeWatcher", 
function (a) {
return this;
}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "newInfo", 
function (a, b, c, d, e, f) {
return false;
}, "java.awt.Image,~N,~N,~N,~N,~N");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.myref = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, sun.awt.image.ImageWatched, "WeakLink", sun.awt.image.ImageWatched.Link);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, sun.awt.image.ImageWatched.WeakLink, []);
this.myref =  new java.lang.ref.WeakReference (a);
this.next = b;
}, "java.awt.image.ImageObserver,sun.awt.image.ImageWatched.Link");
Clazz.defineMethod (c$, "isWatcher", 
function (a) {
return (this.myref.get () === a || this.next.isWatcher (a));
}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "removeWatcher", 
function (a) {
var b = this.myref.get ();
if (b == null) {
return this.next.removeWatcher (a);
}if (b === a) {
return this.next;
}this.next = this.next.removeWatcher (a);
return this;
}, "java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "newInfo", 
function (a, b, c, d, e, f) {
var g = this.next.newInfo (a, b, c, d, e, f);
var h = this.myref.get ();
if (h == null) {
g = true;
} else if (h.imageUpdate (a, b, c, d, e, f) == false) {
this.myref.clear ();
g = true;
}return g;
}, "java.awt.Image,~N,~N,~N,~N,~N");
c$ = Clazz.p0p ();
c$.endlink = c$.prototype.endlink =  new sun.awt.image.ImageWatched.Link ();
});
