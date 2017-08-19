Clazz.declarePackage ("sun.awt.image");
Clazz.load (["java.lang.Thread", "$.StringBuffer"], ["sun.awt.image.FetcherInfo", "$.ImageFetcher"], ["java.util.Vector", "sun.awt.AppContext"], function () {
c$ = Clazz.declareType (sun.awt.image, "ImageFetcher", Thread);
Clazz.makeConstructor (c$, 
 function (threadGroup, index) {
Clazz.superConstructor (this, sun.awt.image.ImageFetcher, [threadGroup, "Image Fetcher " + index]);
this.setDaemon (true);
}, "ThreadGroup,~N");
c$.add = Clazz.defineMethod (c$, "add", 
function (src) {
var info = sun.awt.image.FetcherInfo.getFetcherInfo ();
{
if (!info.waitList.contains (src)) {
info.waitList.addElement (src);
if (info.numWaiting == 0 && info.numFetchers < info.fetchers.length) {
sun.awt.image.ImageFetcher.createFetchers (info);
}info.waitList.notify ();
}}}, "sun.awt.image.ImageFetchable");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (src) {
var info = sun.awt.image.FetcherInfo.getFetcherInfo ();
{
if (info.waitList.contains (src)) {
info.waitList.removeElement (src);
}}}, "sun.awt.image.ImageFetchable");
c$.isFetcher = Clazz.defineMethod (c$, "isFetcher", 
function (t) {
var info = sun.awt.image.FetcherInfo.getFetcherInfo ();
{
for (var i = 0; i < info.fetchers.length; i++) {
if (info.fetchers[i] === t) {
return true;
}}
}return false;
}, "Thread");
c$.amFetcher = Clazz.defineMethod (c$, "amFetcher", 
function () {
return sun.awt.image.ImageFetcher.isFetcher (Thread.currentThread ());
});
c$.nextImage = Clazz.defineMethod (c$, "nextImage", 
 function () {
var info = sun.awt.image.FetcherInfo.getFetcherInfo ();
{
var src = null;
var end = System.currentTimeMillis () + 5000;
while (src == null) {
while (info.waitList.size () == 0) {
var now = System.currentTimeMillis ();
if (now >= end) {
return null;
}try {
info.numWaiting++;
info.waitList.wait (end - now);
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
return null;
} else {
throw e;
}
} finally {
info.numWaiting--;
}
}
src = info.waitList.elementAt (0);
info.waitList.removeElement (src);
}
return src;
}});
Clazz.overrideMethod (c$, "run", 
function () {
var info = sun.awt.image.FetcherInfo.getFetcherInfo ();
try {
this.fetchloop ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
} finally {
{
var me = Thread.currentThread ();
for (var i = 0; i < info.fetchers.length; i++) {
if (info.fetchers[i] === me) {
info.fetchers[i] = null;
info.numFetchers--;
}}
}}
});
Clazz.defineMethod (c$, "fetchloop", 
 function () {
var me = Thread.currentThread ();
while (sun.awt.image.ImageFetcher.isFetcher (me)) {
Thread.interrupted ();
me.setPriority (8);
var src = sun.awt.image.ImageFetcher.nextImage ();
if (src == null) {
return;
}try {
src.doFetch ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Uncaught error fetching image:");
e.printStackTrace ();
} else {
throw e;
}
}
sun.awt.image.ImageFetcher.stoppingAnimation (me);
}
});
c$.startingAnimation = Clazz.defineMethod (c$, "startingAnimation", 
function () {
var info = sun.awt.image.FetcherInfo.getFetcherInfo ();
var me = Thread.currentThread ();
{
for (var i = 0; i < info.fetchers.length; i++) {
if (info.fetchers[i] === me) {
info.fetchers[i] = null;
info.numFetchers--;
me.setName ("Image Animator " + i);
if (info.waitList.size () > info.numWaiting) {
sun.awt.image.ImageFetcher.createFetchers (info);
}return;
}}
}me.setPriority (2);
me.setName ("Image Animator");
});
c$.stoppingAnimation = Clazz.defineMethod (c$, "stoppingAnimation", 
 function (me) {
var info = sun.awt.image.FetcherInfo.getFetcherInfo ();
{
var index = -1;
for (var i = 0; i < info.fetchers.length; i++) {
if (info.fetchers[i] === me) {
return;
}if (info.fetchers[i] == null) {
index = i;
}}
if (index >= 0) {
info.fetchers[index] = me;
info.numFetchers++;
me.setName ("Image Fetcher " + index);
return;
}}}, "Thread");
c$.createFetchers = Clazz.defineMethod (c$, "createFetchers", 
 function (info) {
var appContext = sun.awt.AppContext.getAppContext ();
var threadGroup = appContext.getThreadGroup ();
var fetcherThreadGroup;
try {
if (threadGroup.getParent () != null) {
fetcherThreadGroup = threadGroup;
} else {
threadGroup = Thread.currentThread ().getThreadGroup ();
var parent = threadGroup.getParent ();
while ((parent != null) && (parent.getParent () != null)) {
threadGroup = parent;
parent = threadGroup.getParent ();
}
fetcherThreadGroup = threadGroup;
}} catch (e) {
if (Clazz.exceptionOf (e, SecurityException)) {
fetcherThreadGroup = appContext.getThreadGroup ();
} else {
throw e;
}
}
var fetcherGroup = fetcherThreadGroup;
for (var i = 0; i < info.fetchers.length; i++) {
if (info.fetchers[i] == null) {
info.fetchers[i] =  new sun.awt.image.ImageFetcher (fetcherGroup, i);
info.fetchers[i].start ();
info.numFetchers++;
break;
}}
return;
}, "sun.awt.image.FetcherInfo");
Clazz.defineStatics (c$,
"HIGH_PRIORITY", 8,
"LOW_PRIORITY", 3,
"ANIM_PRIORITY", 2,
"TIMEOUT", 5000);
c$ = Clazz.decorateAsClass (function () {
this.fetchers = null;
this.numFetchers = 0;
this.numWaiting = 0;
this.waitList = null;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "FetcherInfo");
Clazz.makeConstructor (c$, 
 function () {
this.fetchers =  new Array (4);
this.numFetchers = 0;
this.numWaiting = 0;
this.waitList =  new java.util.Vector ();
});
c$.getFetcherInfo = Clazz.defineMethod (c$, "getFetcherInfo", 
function () {
var appContext = sun.awt.AppContext.getAppContext ();
{
var info = appContext.get (sun.awt.image.FetcherInfo.FETCHER_INFO_KEY);
if (info == null) {
info =  new sun.awt.image.FetcherInfo ();
appContext.put (sun.awt.image.FetcherInfo.FETCHER_INFO_KEY, info);
}return info;
}});
Clazz.defineStatics (c$,
"MAX_NUM_FETCHERS_PER_APPCONTEXT", 4);
c$.FETCHER_INFO_KEY = c$.prototype.FETCHER_INFO_KEY =  new StringBuffer ("FetcherInfo");
});
