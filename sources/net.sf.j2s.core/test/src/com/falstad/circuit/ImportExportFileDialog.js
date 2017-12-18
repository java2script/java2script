(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ImportExportFileDialog", null, null, 'com.falstad.circuit.ImportExportDialog');
C$.circuitDump = null;
C$.directory = null;
var p$=C$.prototype;

C$.$clinit$ = function() {Clazz.load(C$, 1);
C$.directory = ".";
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.cframe = null;
this.type = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_circuit_CirSim$com_falstad_circuit_ImportExportDialog_Action', function (f, type) {
C$.$init$.apply(this);
this.type = type;
this.cframe = f;
}, 1);

Clazz.newMeth(C$, 'setDump$S', function (dump) {
C$.circuitDump = dump;
});

Clazz.newMeth(C$, 'getDump', function () {
return C$.circuitDump;
});

Clazz.newMeth(C$, 'execute', function () {
var fd = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.FileDialog'))).c$$java_awt_Frame$S$I,[Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Frame')))), (this.type === (I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.circuit.ImportExportDialog').Action))).EXPORT ) ? "Save File" : "Open File", (this.type === (I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.circuit.ImportExportDialog').Action))).EXPORT ) ? 1 : 0]);
fd.setDirectory$S(C$.directory);
fd.setVisible$Z(true);
var file = fd.getFile();
var dir = fd.getDirectory();
if (dir != null ) C$.directory = dir;
if (file == null ) return;
System.err.println$S(dir + (I$[3]||(I$[3]=Clazz.load('java.io.File'))).separator + file );
if (this.type === (I$[2]||(I$[2]=Clazz.load(Clazz.load('com.falstad.circuit.ImportExportDialog').Action))).EXPORT ) {
try {
C$.writeFile$S(dir + file);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
} else {
try {
var dump = C$.readFile$S(dir + file);
C$.circuitDump = dump;
this.cframe.readSetup$S(C$.circuitDump);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
}});

Clazz.newMeth(C$, 'readFile$S', function (path) {
var stream = null;
try {
stream = Clazz.new_((I$[4]||(I$[4]=Clazz.load('java.io.FileInputStream'))).c$$java_io_File,[Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.io.File'))).c$$S,[path])]);
var fc = stream.getChannel();
var bb = fc.map$java_nio_channels_FileChannel_MapMode$J$J((I$[5]||(I$[5]=Clazz.load(Clazz.load('java.nio.channels.FileChannel').MapMode))).READ_ONLY, 0, fc.size());
return (I$[6]||(I$[6]=Clazz.load('java.nio.charset.Charset'))).forName$S("UTF-8").decode$java_nio_ByteBuffer(bb).toString();
} finally {
stream.close();
}
}, 1);

Clazz.newMeth(C$, 'writeFile$S', function (path) {
var stream = null;
try {
stream = Clazz.new_((I$[7]||(I$[7]=Clazz.load('java.io.FileOutputStream'))).c$$java_io_File,[Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.io.File'))).c$$S,[path])]);
var fc = stream.getChannel();
var bb = (I$[6]||(I$[6]=Clazz.load('java.nio.charset.Charset'))).forName$S("UTF-8").encode$S(C$.circuitDump);
fc.write$java_nio_ByteBuffer(bb);
} finally {
stream.close();
}
}, 1);

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
