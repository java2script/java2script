Clazz.declarePackage ("org.eclipse.core.internal.content");
Clazz.load (["java.io.InputStream", "org.eclipse.core.internal.content.ILazySource"], "org.eclipse.core.internal.content.LazyInputStream", ["org.eclipse.core.internal.content.LowLevelIOException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.blockCapacity = 0;
this.blocks = null;
this.bufferSize = 0;
this.$in = null;
this.$mark = 0;
this.offset = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.content, "LazyInputStream", java.io.InputStream, org.eclipse.core.internal.content.ILazySource);
Clazz.prepareFields (c$, function () {
this.blocks = [];
});
Clazz.makeConstructor (c$, 
function ($in, blockCapacity) {
Clazz.superConstructor (this, org.eclipse.core.internal.content.LazyInputStream, []);
this.$in = $in;
this.blockCapacity = blockCapacity;
}, "java.io.InputStream,~N");
Clazz.defineMethod (c$, "available", 
function () {
try {
return this.bufferSize - this.offset + this.$in.available ();
} catch (ioe) {
if (Clazz.instanceOf (ioe, java.io.IOException)) {
throw  new org.eclipse.core.internal.content.LowLevelIOException (ioe);
} else {
throw ioe;
}
}
});
Clazz.defineMethod (c$, "computeBlockSize", 
($fz = function (blockIndex) {
if (blockIndex < this.blocks.length - 1) return this.blockCapacity;
var blockSize = this.bufferSize % this.blockCapacity;
return blockSize == 0 ? this.blockCapacity : blockSize;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "copyFromBuffer", 
($fz = function (userBuffer, userOffset, needed) {
var copied = 0;
var current = Math.floor (this.offset / this.blockCapacity);
while ((needed - copied) > 0 && current < this.blocks.length) {
var blockSize = this.computeBlockSize (current);
var offsetInBlock = this.offset % this.blockCapacity;
var availableInBlock = blockSize - offsetInBlock;
var toCopy = Math.min (availableInBlock, needed - copied);
System.arraycopy (this.blocks[current], offsetInBlock, userBuffer, userOffset + copied, toCopy);
copied += toCopy;
current++;
this.offset += toCopy;
}
return copied;
}, $fz.isPrivate = true, $fz), "~A,~N,~N");
Clazz.defineMethod (c$, "ensureAvailable", 
($fz = function (bytesToRead) {
var loadedBlockSize = this.blockCapacity;
while (this.bufferSize < this.offset + bytesToRead && loadedBlockSize == this.blockCapacity) {
try {
loadedBlockSize = this.loadBlock ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.eclipse.core.internal.content.LowLevelIOException (e);
} else {
throw e;
}
}
this.bufferSize += loadedBlockSize;
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getBlockCount", 
function () {
return this.blocks.length;
});
Clazz.defineMethod (c$, "getBufferSize", 
function () {
return this.bufferSize;
});
Clazz.defineMethod (c$, "getMark", 
function () {
return this.$mark;
});
Clazz.defineMethod (c$, "getOffset", 
function () {
return this.offset;
});
Clazz.overrideMethod (c$, "isText", 
function () {
return false;
});
Clazz.defineMethod (c$, "loadBlock", 
($fz = function () {
var newBlock =  Clazz.newArray (this.blockCapacity, 0);
var readCount = this.$in.read (newBlock);
if (readCount == -1) return 0;
var tmpBlocks =  Clazz.newArray (this.blocks.length + 1, 0);
System.arraycopy (this.blocks, 0, tmpBlocks, 0, this.blocks.length);
this.blocks = tmpBlocks;
this.blocks[this.blocks.length - 1] = newBlock;
return readCount;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "mark", 
function (readlimit) {
this.$mark = this.offset;
}, "~N");
Clazz.overrideMethod (c$, "markSupported", 
function () {
return true;
});
Clazz.defineMethod (c$, "read", 
function () {
this.ensureAvailable (1);
if (this.bufferSize <= this.offset) return -1;
var nextByte = 0xFF & this.blocks[Math.floor (this.offset / this.blockCapacity)][this.offset % this.blockCapacity];
this.offset++;
return nextByte;
});
Clazz.defineMethod (c$, "read", 
function (b) {
return this.read (b, 0, b.length);
}, "~A");
Clazz.defineMethod (c$, "read", 
function (b, off, len) {
this.ensureAvailable (len);
var copied = this.copyFromBuffer (b, off, len);
return copied == 0 ? -1 : copied;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "reset", 
function () {
this.offset = this.$mark;
});
Clazz.overrideMethod (c$, "rewind", 
function () {
this.$mark = 0;
this.offset = 0;
});
Clazz.overrideMethod (c$, "skip", 
function (toSkip) {
if (toSkip <= 0) return 0;
this.ensureAvailable (toSkip);
var skipped = Math.min (toSkip, this.bufferSize - this.offset);
this.offset += skipped;
return skipped;
}, "~N");
});
