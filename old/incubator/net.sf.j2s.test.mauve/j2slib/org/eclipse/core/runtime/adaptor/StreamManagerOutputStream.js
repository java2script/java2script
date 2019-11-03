Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (["java.io.FilterOutputStream"], "org.eclipse.core.runtime.adaptor.StreamManagerOutputStream", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.target = null;
this.manager = null;
this.outputFile = null;
this.state = 0;
this.streamSet = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor, "StreamManagerOutputStream", java.io.FilterOutputStream);
Clazz.makeConstructor (c$, 
function (out, manager, target, outputFile, state) {
Clazz.superConstructor (this, org.eclipse.core.runtime.adaptor.StreamManagerOutputStream, [out]);
this.manager = manager;
this.target = target;
this.outputFile = outputFile;
this.state = state;
}, "java.io.OutputStream,org.eclipse.core.runtime.adaptor.StreamManager,~S,java.io.File,~N");
Clazz.overrideMethod (c$, "close", 
function () {
this.manager.closeOutputStream (this);
});
Clazz.defineMethod (c$, "abort", 
function () {
this.manager.abortOutputStream (this);
});
Clazz.defineMethod (c$, "getOutputStream", 
function () {
return this.out;
});
Clazz.defineMethod (c$, "getTarget", 
function () {
return this.target;
});
Clazz.defineMethod (c$, "getOutputFile", 
function () {
return this.outputFile;
});
Clazz.defineMethod (c$, "getState", 
function () {
return this.state;
});
Clazz.defineMethod (c$, "setState", 
function (state) {
this.state = state;
}, "~N");
Clazz.defineMethod (c$, "setStreamSet", 
function (set) {
this.streamSet = set;
}, "~A");
Clazz.defineMethod (c$, "getStreamSet", 
function () {
return this.streamSet;
});
});
