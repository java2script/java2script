(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "FourierFrame", function(){
Clazz.newInstance(this, arguments,0,C$);
}, 'a2s.Frame', ['java.awt.event.ComponentListener', 'java.awt.event.ActionListener', 'java.awt.event.AdjustmentListener', 'java.awt.event.MouseMotionListener', 'java.awt.event.MouseListener', 'java.awt.event.ItemListener', ['javajs.util.JSAudioThread','javajs.util.JSAudioThread.Owner']]);
var p$=C$.prototype;

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.winSize = null;
this.dbimage = null;
this.random = null;
this.applet = null;
this.showFormat = null;
this.useFrame = false;
this.main = null;
this.sineButton = null;
this.cosineButton = null;
this.rectButton = null;
this.fullRectButton = null;
this.triangleButton = null;
this.sawtoothButton = null;
this.squareButton = null;
this.noiseButton = null;
this.blankButton = null;
this.phaseButton = null;
this.clipButton = null;
this.resampleButton = null;
this.quantizeButton = null;
this.highPassButton = null;
this.magPhaseCheck = null;
this.soundCheck = null;
this.logCheck = null;
this.termBar = null;
this.freqBar = null;
this.magcoef = null;
this.phasecoef = null;
this.mutes = null;
this.solos = null;
this.hasSolo = null;
this.func = null;
this.maxTerms = 0;
this.selectedCoef = 0;
this.selection = 0;
this.dragX = 0;
this.dragY = 0;
this.quantizeCount = 0;
this.resampleCount = 0;
this.dragging = false;
this.freqAdjusted = false;
this.viewFunc = null;
this.viewMag = null;
this.viewPhase = null;
this.viewMutes = null;
this.viewSolos = null;
this.fft = null;
this.cv = null;
this.java2 = false;
this.showTable = null;
this.shown = false;
this.origFunc = null;
this.dfreq0 = 0;
this.buttonPressed = null;
this.playSampleCount = 0;
this.rate = 0;
this.audioBufferByteLength = 0;
this.bitsPerSample = 0;
this.nChannels = 0;
this.playFFT = null;
this.playfunc = null;
this.audioByteBuffer = null;
this.offset = 0;
this.dampCount = 0;
this.audioThread = null;
this.soundChanged = false;
this.mx = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.maxTerms = 160;
this.shown = false;
this.playSampleCount = 16384;
this.rate = 22050;
this.audioBufferByteLength = 32768;
this.bitsPerSample = 16;
this.nChannels = 1;
}, 1);

Clazz.newMeth(C$, 'getAppletInfo', function () {
return "Fourier Series by Paul Falstad";
});

Clazz.newMeth(C$, 'c$$com_falstad_Fourier', function (a) {
C$.superclazz.c$$S.apply(this, ["Fourier Series Applet v1.6d"]);
C$.$init$.apply(this);
this.applet = a;
this.useFrame = true;
}, 1);

Clazz.newMeth(C$, 'getrand$I', function (x) {
var q = this.random.nextInt();
if (q < 0) q = -q;
return q % x;
});

Clazz.newMeth(C$, 'mustShow$S', function (s) {
return this.showTable == null  || this.showTable.containsKey$O(s) ;
});

Clazz.newMeth(C$, 'doButton$S', function (s) {
var b = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Button'))).c$$S,[s]);
if (this.mustShow$S(s)) this.main.add$java_awt_Component(b);
b.addActionListener$java_awt_event_ActionListener(this);
return b;
});

Clazz.newMeth(C$, 'doCheckbox$S', function (s) {
var b = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S,[s]);
if (this.mustShow$S(s)) this.main.add$java_awt_Component(b);
try {
var param = this.applet.getParameter$S(s);
if (param != null  && param.equalsIgnoreCase$S("true") ) b.setState$Z(true);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
b.addItemListener$java_awt_event_ItemListener(this);
return b;
});

Clazz.newMeth(C$, 'initFrame', function () {
var jv = System.getProperty("java.class.version");
var jvf =  new Double(jv).doubleValue();
if (jvf >= 48 ) this.java2 = true;
var state = "";
try {
var param = this.applet.getParameter$S("useFrame");
if (param != null  && param.equalsIgnoreCase$S("false") ) this.useFrame = false;
var show = this.applet.getParameter$S("show");
if (show != null ) {
this.showTable = Clazz.new_((I$[4]||(I$[4]=Clazz.load('java.util.Hashtable'))).c$$I,[10]);
var st = Clazz.new_((I$[5]||(I$[5]=Clazz.load('java.util.StringTokenizer'))).c$$S$S,[show, ","]);
while (st.hasMoreTokens()){
var s = st.nextToken();
this.showTable.put$TK$TV(s, "");
}
this.showTable.put$TK$TV("Sound", "");
}state = this.applet.getParameter$S("state");
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
if (this.useFrame) this.main = this;
 else this.main = this.applet;
this.selectedCoef = -1;
this.magcoef = Clazz.array(Double.TYPE, [this.maxTerms]);
this.phasecoef = Clazz.array(Double.TYPE, [this.maxTerms]);
this.mutes = Clazz.array(Boolean.TYPE, [this.maxTerms]);
this.solos = Clazz.array(Boolean.TYPE, [this.maxTerms]);
this.func = Clazz.array(Double.TYPE, [1025]);
this.random = Clazz.new_((I$[6]||(I$[6]=Clazz.load('java.util.Random'))));
this.fft = Clazz.new_((I$[7]||(I$[7]=Clazz.load('com.falstad.FFT'))).c$$I,[1024]);
this.main.setLayout$java_awt_LayoutManager(Clazz.new_((I$[8]||(I$[8]=Clazz.load('com.falstad.FourierLayout')))));
this.cv = Clazz.new_((I$[9]||(I$[9]=Clazz.load('com.falstad.FourierCanvas'))).c$$com_falstad_FourierFrame,[this]);
this.cv.addComponentListener$java_awt_event_ComponentListener(this);
this.cv.addMouseMotionListener$java_awt_event_MouseMotionListener(this);
this.cv.addMouseListener$java_awt_event_MouseListener(this);
this.main.add$java_awt_Component(this.cv);
this.sineButton = this.doButton$S("Sine");
this.cosineButton = this.doButton$S("Cosine");
this.triangleButton = this.doButton$S("Triangle");
this.sawtoothButton = this.doButton$S("Sawtooth");
this.squareButton = this.doButton$S("Square");
this.noiseButton = this.doButton$S("Noise");
this.phaseButton = this.doButton$S("Phase Shift");
this.clipButton = this.doButton$S("Clip");
this.resampleButton = this.doButton$S("Resample");
this.quantizeButton = this.doButton$S("Quantize");
this.rectButton = this.doButton$S("Rectify");
this.fullRectButton = this.doButton$S("Full Rectify");
this.highPassButton = this.doButton$S("High-Pass Filter");
this.blankButton = this.doButton$S("Clear");
this.soundCheck = this.doCheckbox$S("Sound");
if (!this.java2) this.remove$java_awt_Component(this.soundCheck);
this.magPhaseCheck = this.doCheckbox$S("Mag/Phase View");
this.logCheck = this.doCheckbox$S("Log View");
this.logCheck.disable();
if (this.mustShow$S("Terms")) this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Number of Terms", 0]));
this.termBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 50, 1, 1, this.maxTerms]);
this.termBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.mustShow$S("Terms")) this.main.add$java_awt_Component(this.termBar);
if (this.java2) this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S$I,["Playing Frequency", 0]));
this.freqBar = Clazz.new_((I$[11]||(I$[11]=Clazz.load('a2s.Scrollbar'))).c$$I$I$I$I$I,[0, 251, 1, -100, 500]);
this.freqBar.addAdjustmentListener$java_awt_event_AdjustmentListener(this);
if (this.java2) this.main.add$java_awt_Component(this.freqBar);
this.main.add$java_awt_Component(Clazz.new_((I$[10]||(I$[10]=Clazz.load('a2s.Label'))).c$$S,["http://www.falstad.com"]));
this.cv.setBackground$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).black);
this.cv.setForeground$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).lightGray);
this.showFormat = (I$[13]||(I$[13]=Clazz.load('java.text.NumberFormat'))).getInstance();
this.showFormat.setMaximumFractionDigits$I(5);
if (state != null ) {
if (state.equalsIgnoreCase$S("square")) this.doSquare();
 else if (state.equalsIgnoreCase$S("sine")) this.doSine();
 else if (state.equalsIgnoreCase$S("triangle")) this.doTriangle();
 else if (state.equalsIgnoreCase$S("noise")) this.doNoise();
 else if (state.equalsIgnoreCase$S("quant")) {
this.doSine();
this.doQuantize();
} else if (state.equalsIgnoreCase$S("resample")) {
this.doSine();
this.doResample();
} else if (state.equalsIgnoreCase$S("clip")) {
this.doSine();
this.doClip();
} else if (state.equalsIgnoreCase$S("rect")) {
this.doSine();
this.doRect();
} else if (state.equalsIgnoreCase$S("fullrect")) {
this.doSine();
this.doFullRect();
} else if (state.equalsIgnoreCase$S("fullsaw")) {
this.doSawtooth();
this.doFullRect();
} else if (state.equalsIgnoreCase$S("beats")) this.doBeats();
 else if (state.equalsIgnoreCase$S("loudsoft")) this.doLoudSoft();
 else this.doSawtooth();
}if (this.useFrame) {
this.resize$I$I(800, 640);
this.handleResize();
var x = this.getSize();
var screen = this.getToolkit().getScreenSize();
this.setLocation$I$I(((screen.width - x.width)/2|0), ((screen.height - x.height)/2|0));
this.show();
} else {
this.hide();
this.handleResize();
this.applet.validate();
this.cv.repaint();
}this.main.requestFocus();
});

Clazz.newMeth(C$, 'handleResize', function () {
var d = this.winSize = this.cv.getSize();
if (this.winSize.width == 0 || this.winSize.height == 0 ) return;
this.dbimage = this.cv.createImage$I$I(d.width, d.height);
var margin = 20;
var pheight = ((d.height - margin * 2)/3|0);
this.viewFunc = Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.FourierFrame').View))).c$$I$I$I$I, [this, null, 0, 0, d.width, pheight]);
var y = pheight + margin * 2;
this.viewMag = Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.FourierFrame').View))).c$$I$I$I$I, [this, null, 0, y, d.width, pheight]);
if (this.magPhaseCheck.getState()) {
this.viewMag.ymult *= 1.6;
this.viewMag.midy = this.viewMag.midy+(((this.viewMag.ymult|0)/2|0));
this.logCheck.enable();
} else {
this.logCheck.disable();
this.logCheck.setState$Z(false);
}y = y+(pheight);
this.viewPhase = Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.FourierFrame').View))).c$$I$I$I$I, [this, null, 0, y, d.width, pheight]);
var pmy = this.viewPhase.midy + (this.viewPhase.ymult|0) + 10 ;
var h = ((d.height - pmy)/2|0);
this.viewMutes = Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.FourierFrame').View))).c$$I$I$I$I, [this, null, 0, pmy, d.width, h]);
this.viewSolos = Clazz.new_((I$[14]||(I$[14]=Clazz.load(Clazz.load('com.falstad.FourierFrame').View))).c$$I$I$I$I, [this, null, 0, pmy + h, d.width, h]);
});

Clazz.newMeth(C$, 'triggerShow', function () {
if (!this.shown) this.show();
this.shown = true;
});

Clazz.newMeth(C$, 'doBeats', function () {
var x;
for (x = 0; x != 1024; x++) {
var q = (x - 512) * 0.006135923151542565;
this.func[x] = 0.5 * (Math.cos(q * 20) + Math.cos(q * 21));
}
this.func[1024] = this.func[0];
this.transform();
this.freqBar.setValue$I(-100);
});

Clazz.newMeth(C$, 'doLoudSoft', function () {
var x;
for (x = 0; x != 1024; x++) {
var q = (x - 512) * 0.006135923151542565;
this.func[x] = Math.cos(q) + 0.05 * Math.cos(q * 10);
}
this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doSawtooth', function () {
var x;
for (x = 0; x != 1024; x++) this.func[x] = (x - 512) / 512.0;

this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doTriangle', function () {
var x;
for (x = 0; x != 512; x++) {
this.func[x] = (x * 2 - 512) / 512.0;
this.func[x + 512] = ((512 - x) * 2 - 512) / 512.0;
}
this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doSine', function () {
var x;
for (x = 0; x != 1024; x++) {
this.func[x] = Math.sin((x - 512) * 0.006135923151542565);
}
this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doCosine', function () {
var x;
for (x = 0; x != 1024; x++) {
this.func[x] = Math.cos((x - 512) * 0.006135923151542565);
}
this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doRect', function () {
var x;
for (x = 0; x != 1024; x++) if (this.func[x] < 0 ) this.func[x] = 0;

this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doFullRect', function () {
var x;
for (x = 0; x != 1024; x++) if (this.func[x] < 0 ) this.func[x] = -this.func[x];

this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doHighPass', function () {
var i;
var terms = this.termBar.getValue();
for (i = 0; i != terms; i++) if (this.magcoef[i] != 0 ) {
this.magcoef[i] = 0;
break;
}
this.doSetFunc();
});

Clazz.newMeth(C$, 'doSquare', function () {
var x;
for (x = 0; x != 512; x++) {
this.func[x] = -1;
this.func[x + 512] = 1;
}
this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doNoise', function () {
var x;
var blockSize = 3;
for (x = 0; x != (1024/blockSize|0); x++) {
var q = Math.random() * 2 - 1;
var i;
for (i = 0; i != blockSize; i++) this.func[x * blockSize + i] = q;

}
this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doPhaseShift', function () {
var i;
var sh = 51;
var copyf = Clazz.array(Double.TYPE, [sh]);
for (i = 0; i != sh; i++) copyf[i] = this.func[i];

for (i = 0; i != 1024 - sh; i++) this.func[i] = this.func[i + sh];

for (i = 0; i != sh; i++) this.func[1024 - sh + i] = copyf[i];

this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doBlank', function () {
var x;
for (x = 0; x <= 1024; x++) this.func[x] = 0;

for (x = 0; x != this.termBar.getValue(); x++) this.mutes[x] = this.solos[x] = false;

this.transform();
});

Clazz.newMeth(C$, 'doSetFunc', function () {
var i;
var data = Clazz.array(Double.TYPE, [2048]);
var terms = this.termBar.getValue();
for (i = 0; i != terms; i++) {
var sgn = (i & 1) == 1 ? -1 : 1;
data[i * 2] = sgn * this.magcoef[i] * Math.cos(this.phasecoef[i]) ;
data[i * 2 + 1] = -sgn * this.magcoef[i] * Math.sin(this.phasecoef[i]) ;
}
this.fft.transform$DA$Z(data, true);
for (i = 0; i != 1024; i++) this.func[i] = data[i * 2];

this.func[1024] = this.func[0];
p$.updateSound.apply(this, []);
});

Clazz.newMeth(C$, 'doClip', function () {
var x;
var mult = 1.2;
for (x = 0; x != 1024; x++) {
this.func[x] *= mult;
if (this.func[x] > 1 ) this.func[x] = 1;
if (this.func[x] < -1 ) this.func[x] = -1;
}
this.func[1024] = this.func[0];
this.transform();
});

Clazz.newMeth(C$, 'doResample', function () {
var x;
var i;
if (this.resampleCount == 0) this.resampleCount = 32;
if (this.resampleCount == 1024) return;
for (x = 0; x != 1024; x = x+(this.resampleCount)) {
for (i = 1; i != this.resampleCount; i++) this.func[x + i] = this.func[x];

}
this.func[1024] = this.func[0];
this.transform();
this.resampleCount = this.resampleCount*(2);
});

Clazz.newMeth(C$, 'doQuantize', function () {
var x;
if (this.quantizeCount == 0) {
this.quantizeCount = 8;
this.origFunc = Clazz.array(Double.TYPE, [1024]);
System.arraycopy(this.func, 0, this.origFunc, 0, 1024);
}for (x = 0; x != 1024; x++) {
this.func[x] = Math.round(this.origFunc[x] * this.quantizeCount) / this.quantizeCount;
}
this.func[1024] = this.func[0];
this.transform();
this.quantizeCount = (this.quantizeCount/(2)|0);
});

Clazz.newMeth(C$, 'getFreq', function () {
var freq = 27.5 * Math.exp(this.freqBar.getValue() * 0.004158883084 * 2 );
this.dfreq0 = (((freq * 16384.0 / 22050)|0)) * 2;
return 22050 * this.dfreq0 / 32768.0;
});

Clazz.newMeth(C$, 'transform', function () {
var x;
var y;
var data = Clazz.array(Double.TYPE, [2048]);
var i;
for (i = 0; i != 1024; i++) data[i * 2] = this.func[i];

this.fft.transform$DA$Z(data, false);
var epsilon = 1.0E-5;
var mult = 0.001953125;
for (y = 0; y != this.maxTerms; y++) {
var acoef = data[y * 2] * mult;
var bcoef = -data[y * 2 + 1] * mult;
if ((y & 1) == 1) acoef = -acoef;
 else bcoef = -bcoef;
if (acoef < epsilon  && acoef > -epsilon  ) acoef = 0;
if (bcoef < epsilon  && bcoef > -epsilon  ) bcoef = 0;
if (y == 0) {
this.magcoef[0] = acoef / 2;
this.phasecoef[0] = 0;
} else {
this.magcoef[y] = Math.sqrt(acoef * acoef + bcoef * bcoef);
this.phasecoef[y] = Math.atan2(-bcoef, acoef);
}}
p$.updateSound.apply(this, []);
});

Clazz.newMeth(C$, 'centerString$java_awt_Graphics$S$I', function (g, s, y) {
var fm = g.getFontMetrics();
g.drawString$S$I$I(s, ((this.winSize.width - fm.stringWidth$S(s))/2|0), y);
});

Clazz.newMeth(C$, 'updateFourier$java_awt_Graphics', function (realg) {
if (this.winSize == null  || this.winSize.width == 0  || this.dbimage == null  ) return;
var g = this.dbimage.getGraphics();
var gray1 = Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).c$$I$I$I,[76, 76, 76]);
var gray2 = Clazz.new_((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).c$$I$I$I,[127, 127, 127]);
g.setColor$java_awt_Color(this.cv.getBackground());
g.fillRect$I$I$I$I(0, 0, this.winSize.width, this.winSize.height);
g.setColor$java_awt_Color(this.cv.getForeground());
var i;
var ox = -1;
var oy = -1;
var midy = this.viewFunc.midy;
var periodWidth = this.viewFunc.periodWidth;
var ymult = this.viewFunc.ymult;
for (i = -1; i <= 1; i++) {
g.setColor$java_awt_Color((i == 0) ? gray2 : gray1);
g.drawLine$I$I$I$I(0, midy + (i * (ymult|0)), this.winSize.width, midy + (i * (ymult|0)));
}
for (i = 2; i <= 4; i++) {
g.setColor$java_awt_Color((i == 3) ? gray2 : gray1);
g.drawLine$I$I$I$I((periodWidth * i/2|0), midy - (ymult|0), (periodWidth * i/2|0), midy + (ymult|0));
}
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
if (!(this.dragging && this.selection != 1 )) {
for (i = 0; i != 1025; i++) {
var x = (periodWidth * i/1024|0);
var y = midy - ((ymult * this.func[i])|0);
if (ox != -1) {
g.drawLine$I$I$I$I(ox, oy, x, y);
g.drawLine$I$I$I$I(ox + periodWidth, oy, x + periodWidth, y);
g.drawLine$I$I$I$I(ox + periodWidth * 2, oy, x + periodWidth * 2, y);
}ox = x;
oy = y;
}
}var terms = this.termBar.getValue();
if (!(this.dragging && this.selection == 1 )) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).red);
ox = -1;
for (i = 0; i != 1025; i++) {
var x = (periodWidth * i/1024|0);
var j;
var dy = 0;
for (j = 0; j != terms; j++) {
dy += this.magcoef[j] * Math.cos(0.006135923151542565 * (i - 512) * j  + this.phasecoef[j]);
}
var y = midy - ((ymult * dy)|0);
if (ox != -1) {
g.drawLine$I$I$I$I(ox, oy, x, y);
g.drawLine$I$I$I$I(ox + periodWidth, oy, x + periodWidth, y);
g.drawLine$I$I$I$I(ox + periodWidth * 2, oy, x + periodWidth * 2, y);
}ox = x;
oy = y;
}
}var texty = this.viewFunc.height + 10;
if (this.selectedCoef != -1) {
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow);
ox = -1;
var phase = this.phasecoef[this.selectedCoef];
var x;
var n = this.selectedCoef * 2 * 3.141592653589793  / periodWidth;
var dx = (periodWidth/2|0);
var mag = this.magcoef[this.selectedCoef];
if (!this.magPhaseCheck.getState()) {
if (this.selection == 2) {
mag *= -Math.sin(phase);
phase = -1.5707963267948966;
} else {
mag *= Math.cos(phase);
phase = 0;
}}ymult *= mag;
if (!this.dragging) {
for (i = 0; i != 1025; i++) {
x = (periodWidth * i/1024|0);
var dy = Math.cos(0.006135923151542565 * (i - 512) * this.selectedCoef  + phase);
var y = midy - ((ymult * dy)|0);
if (ox != -1) {
g.drawLine$I$I$I$I(ox, oy, x, y);
g.drawLine$I$I$I$I(ox + periodWidth, oy, x + periodWidth, y);
g.drawLine$I$I$I$I(ox + periodWidth * 2, oy, x + periodWidth * 2, y);
}ox = x;
oy = y;
}
}if (this.selectedCoef > 0 && this.java2 ) {
var f = ((this.getFreq() * this.selectedCoef)|0);
this.centerString$java_awt_Graphics$S$I(g, f + ((f > 11025) ? " Hz (filtered)" : " Hz"), texty);
}if (this.selectedCoef != -1) {
var harm;
if (this.selectedCoef == 0) harm = this.showFormat.format$D(mag) + "";
 else {
var func = "cos";
if (!this.magPhaseCheck.getState() && this.selection == 2 ) func = "sin";
if (this.selectedCoef == 1) harm = this.showFormat.format$D(mag) + " " + func + "(x" ;
 else harm = this.showFormat.format$D(mag) + " " + func + "(" + this.selectedCoef + "x" ;
if (!this.magPhaseCheck.getState() || phase == 0  ) harm += ")";
 else {
harm += (phase < 0 ) ? " - " : " + ";
harm += this.showFormat.format$D(Math.abs(phase)) + ")";
}if (this.logCheck.getState()) {
this.showFormat.setMaximumFractionDigits$I(2);
harm += "   (" + this.showFormat.format$D(20 * Math.log(mag) / Math.log(10)) + " dB)" ;
this.showFormat.setMaximumFractionDigits$I(5);
}}this.centerString$java_awt_Graphics$S$I(g, harm, texty + 15);
}}if (this.selectedCoef == -1 && this.freqAdjusted  && this.java2 ) {
var f = (this.getFreq()|0);
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow);
this.centerString$java_awt_Graphics$S$I(g, f + " Hz", texty);
}this.freqAdjusted = false;
var termWidth = this.getTermWidth();
ymult = this.viewMag.ymult;
midy = this.viewMag.midy;
g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
if (this.magPhaseCheck.getState()) {
this.centerString$java_awt_Graphics$S$I(g, "Magnitudes", this.viewMag.labely);
this.centerString$java_awt_Graphics$S$I(g, "Phases", this.viewPhase.labely);
g.setColor$java_awt_Color(gray2);
g.drawLine$I$I$I$I(0, midy, this.winSize.width, midy);
g.setColor$java_awt_Color(gray1);
g.drawLine$I$I$I$I(0, midy - (ymult|0), this.winSize.width, midy - (ymult|0));
var dotSize = termWidth - 3;
for (i = 0; i != terms; i++) {
var t = termWidth * i + (termWidth/2|0);
var y = midy - ((this.showMag$I(i) * ymult)|0);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow : (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(t, midy, t, y);
g.fillOval$I$I$I$I(t - (dotSize/2|0), y - (dotSize/2|0), dotSize, dotSize);
}
ymult = this.viewPhase.ymult;
midy = this.viewPhase.midy;
for (i = -2; i <= 2; i++) {
g.setColor$java_awt_Color((i == 0) ? gray2 : gray1);
g.drawLine$I$I$I$I(0, midy + ((i * (ymult|0))/2|0), this.winSize.width, midy + ((i * (ymult|0))/2|0));
}
ymult /= 3.141592653589793;
for (i = 0; i != terms; i++) {
var t = termWidth * i + (termWidth/2|0);
var y = midy - ((this.phasecoef[i] * ymult)|0);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow : (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(t, midy, t, y);
g.fillOval$I$I$I$I(t - (dotSize/2|0), y - (dotSize/2|0), dotSize, dotSize);
}
} else {
this.centerString$java_awt_Graphics$S$I(g, "Sines", this.viewMag.labely);
this.centerString$java_awt_Graphics$S$I(g, "Cosines", this.viewPhase.labely);
g.setColor$java_awt_Color(gray2);
g.drawLine$I$I$I$I(0, midy, this.winSize.width, midy);
g.setColor$java_awt_Color(gray1);
g.drawLine$I$I$I$I(0, midy - (ymult|0), this.winSize.width, midy - (ymult|0));
g.drawLine$I$I$I$I(0, midy + (ymult|0), this.winSize.width, midy + (ymult|0));
var dotSize = termWidth - 3;
for (i = 1; i != terms; i++) {
var t = termWidth * i + (termWidth/2|0);
var y = midy + ((this.magcoef[i] * Math.sin(this.phasecoef[i]) * ymult )|0);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow : (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(t, midy, t, y);
g.fillOval$I$I$I$I(t - (dotSize/2|0), y - (dotSize/2|0), dotSize, dotSize);
}
ymult = this.viewPhase.ymult;
midy = this.viewPhase.midy;
for (i = -2; i <= 2; i = i+(2)) {
g.setColor$java_awt_Color((i == 0) ? gray2 : gray1);
g.drawLine$I$I$I$I(0, midy + ((i * (ymult|0))/2|0), this.winSize.width, midy + ((i * (ymult|0))/2|0));
}
for (i = 0; i != terms; i++) {
var t = termWidth * i + (termWidth/2|0);
var y = midy - ((this.magcoef[i] * Math.cos(this.phasecoef[i]) * ymult )|0);
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow : (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
g.drawLine$I$I$I$I(t, midy, t, y);
g.fillOval$I$I$I$I(t - (dotSize/2|0), y - (dotSize/2|0), dotSize, dotSize);
}
}var basef = this.getFreq();
if (this.viewMutes.height > 8) {
var f = Clazz.new_((I$[15]||(I$[15]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 0, this.viewMutes.height]);
g.setFont$java_awt_Font(f);
var fm = g.getFontMetrics();
for (i = 1; i != terms; i++) {
if (basef * i > 11025 ) break;
var t = termWidth * i + (termWidth/2|0);
var y = this.viewMutes.y + fm.getAscent();
g.setColor$java_awt_Color(i == this.selectedCoef ? (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).yellow : (I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).white);
if (this.hasSolo && !this.solos[i] ) g.setColor$java_awt_Color((I$[12]||(I$[12]=Clazz.load('java.awt.Color'))).gray);
var pm = "-";
if (this.mutes[i]) pm = "M";
var w = fm.stringWidth$S(pm);
g.drawString$S$I$I(pm, t - (w/2|0), y);
y = this.viewSolos.y + fm.getAscent();
pm = "-";
if (this.solos[i]) pm = "S";
w = fm.stringWidth$S(pm);
g.drawString$S$I$I(pm, t - (w/2|0), y);
}
}realg.drawImage$java_awt_Image$I$I$java_awt_image_ImageObserver(this.dbimage, 0, 0, this);
});

Clazz.newMeth(C$, 'showMag$I', function (n) {
var m = this.magcoef[n];
if (!this.logCheck.getState() || n == 0 ) return m;
m = Math.log(m) / 6.0 + 1;
return (m < 0 ) ? 0 : m;
});

Clazz.newMeth(C$, 'getMagValue$D', function (m) {
if (!this.logCheck.getState()) return m;
if (m == 0 ) return 0;
return Math.exp(6 * (m - 1));
});

Clazz.newMeth(C$, 'getTermWidth', function () {
var terms = this.termBar.getValue();
var termWidth = (this.winSize.width/terms|0);
var maxTermWidth = (this.winSize.width/30|0);
if (termWidth > maxTermWidth) termWidth = maxTermWidth;
if (termWidth > 12) termWidth = 12;
termWidth = termWidth&(-2);
return termWidth;
});

Clazz.newMeth(C$, 'edit$java_awt_event_MouseEvent', function (e) {
p$.resetAudio.apply(this, []);
if (this.selection == 0) return;
var x = e.getX();
var y = e.getY();
switch (this.selection) {
case 2:
this.editMag$I$I(x, y);
break;
case 1:
this.editFunc$I$I(x, y);
break;
case 3:
this.editPhase$I$I(x, y);
break;
case 4:
this.editMutes$java_awt_event_MouseEvent$I$I(e, x, y);
break;
case 5:
this.editSolos$java_awt_event_MouseEvent$I$I(e, x, y);
break;
}
this.quantizeCount = this.resampleCount = 0;
});

Clazz.newMeth(C$, 'editMag$I$I', function (x, y) {
if (this.selectedCoef == -1) return;
var ymult = this.viewMag.ymult;
var midy = this.viewMag.midy;
var coef = -(y - midy) / ymult;
if (this.magPhaseCheck.getState()) {
if (this.selectedCoef > 0) {
if (coef < 0 ) coef = 0;
coef = this.getMagValue$D(coef);
} else if (coef < -1 ) coef = -1;
if (coef > 1 ) coef = 1;
if (this.magcoef[this.selectedCoef] == coef ) return;
this.magcoef[this.selectedCoef] = coef;
} else {
var c = this.selectedCoef;
if (c == 0) return;
var m2 = this.magcoef[c] * Math.cos(this.phasecoef[c]);
if (coef > 1 ) coef = 1;
if (coef < -1 ) coef = -1;
var m1 = coef;
this.magcoef[c] = Math.sqrt(m1 * m1 + m2 * m2);
this.phasecoef[c] = Math.atan2(-m1, m2);
}p$.updateSound.apply(this, []);
this.cv.repaint();
});

Clazz.newMeth(C$, 'editFunc$I$I', function (x, y) {
if (this.dragX == x) {
this.editFuncPoint$I$I(x, y);
this.dragY = y;
} else {
var x1 = (x < this.dragX) ? x : this.dragX;
var y1 = (x < this.dragX) ? y : this.dragY;
var x2 = (x > this.dragX) ? x : this.dragX;
var y2 = (x > this.dragX) ? y : this.dragY;
this.dragX = x;
this.dragY = y;
for (x = x1; x <= x2; x++) {
y = y1 + ((y2 - y1) * (x - x1)/(x2 - x1)|0);
this.editFuncPoint$I$I(x, y);
}
}});

Clazz.newMeth(C$, 'editFuncPoint$I$I', function (x, y) {
var midy = this.viewFunc.midy;
var periodWidth = this.viewFunc.periodWidth;
var ymult = this.viewFunc.ymult;
var lox = ((x % periodWidth) * 1024/periodWidth|0);
var hix = ((((x % periodWidth) + 1) * 1024/periodWidth|0)) - 1;
var val = (midy - y) / ymult;
if (val > 1 ) val = 1;
if (val < -1 ) val = -1;
for (; lox <= hix; lox++) this.func[lox] = val;

this.func[1024] = this.func[0];
this.cv.repaint();
});

Clazz.newMeth(C$, 'editPhase$I$I', function (x, y) {
if (this.selectedCoef == -1) return;
var ymult = this.viewPhase.ymult;
var midy = this.viewPhase.midy;
var coef = -(y - midy) / ymult;
if (this.magPhaseCheck.getState()) {
coef *= 3.141592653589793;
if (coef < -3.141592653589793 ) coef = -3.141592653589793;
if (coef > 3.141592653589793 ) coef = 3.141592653589793;
if (this.phasecoef[this.selectedCoef] == coef ) return;
this.phasecoef[this.selectedCoef] = coef;
} else {
var c = this.selectedCoef;
var m1 = -this.magcoef[c] * Math.sin(this.phasecoef[c]);
if (coef > 1 ) coef = 1;
if (coef < -1 ) coef = -1;
var m2 = coef;
this.magcoef[c] = Math.sqrt(m1 * m1 + m2 * m2);
this.phasecoef[c] = Math.atan2(-m1, m2);
p$.updateSound.apply(this, []);
}this.cv.repaint();
});

Clazz.newMeth(C$, 'editMutes$java_awt_event_MouseEvent$I$I', function (e, x, y) {
if (e.getID() != 501) return;
if (this.selectedCoef == -1) return;
this.mutes[this.selectedCoef] = !this.mutes[this.selectedCoef];
this.cv.repaint();
});

Clazz.newMeth(C$, 'editSolos$java_awt_event_MouseEvent$I$I', function (e, x, y) {
if (e.getID() != 501) return;
if (this.selectedCoef == -1) return;
this.solos[this.selectedCoef] = !this.solos[this.selectedCoef];
var terms = this.termBar.getValue();
this.hasSolo = false;
var i;
for (i = 0; i != terms; i++) if (this.solos[i]) {
this.hasSolo = true;
break;
}
this.cv.repaint();
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.cv.repaint();
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
this.handleResize();
this.cv.repaint$J(100);
});

Clazz.newMeth(C$, 'actionPerformed$java_awt_event_ActionEvent', function (e) {
this.pressButton$O(e.getSource());
});

Clazz.newMeth(C$, 'pressButton$O', function (b) {
p$.resetAudio.apply(this, []);
this.buttonPressed = b;
if (b === this.triangleButton ) {
this.doTriangle();
this.cv.repaint();
}if (b === this.sineButton ) {
this.doSine();
this.cv.repaint();
}if (b === this.cosineButton ) {
this.doCosine();
this.cv.repaint();
}if (b === this.rectButton ) {
this.doRect();
this.cv.repaint();
}if (b === this.fullRectButton ) {
this.doFullRect();
this.cv.repaint();
}if (b === this.squareButton ) {
this.doSquare();
this.cv.repaint();
}if (b === this.highPassButton ) {
this.doHighPass();
this.cv.repaint();
}if (b === this.noiseButton ) {
this.doNoise();
this.cv.repaint();
}if (b === this.phaseButton ) {
this.doPhaseShift();
this.cv.repaint();
}if (b === this.blankButton ) {
this.doBlank();
this.cv.repaint();
}if (b === this.sawtoothButton ) {
this.doSawtooth();
this.cv.repaint();
}if (b === this.clipButton ) {
this.doClip();
this.cv.repaint();
}if (b === this.quantizeButton ) {
this.doQuantize();
this.cv.repaint();
} else this.quantizeCount = 0;
if (b === this.resampleButton ) {
this.doResample();
this.cv.repaint();
} else this.resampleCount = 0;
});

Clazz.newMeth(C$, 'itemStateChanged$java_awt_event_ItemEvent', function (e) {
var c = e.getItemSelectable();
if (c === this.soundCheck ) {
if (!this.soundCheck.getState()) {
if (this.audioThread != null ) {
p$.resetAudio.apply(this, []);
this.audioThread = null;
return;
}}if (this.audioThread == null ) {
p$.createAudioThread.apply(this, []);
this.audioThread.start();
if (this.buttonPressed != null ) this.pressButton$O(this.buttonPressed);
}} else if (c === this.magPhaseCheck ) {
this.handleResize();
}this.cv.repaint();
});

Clazz.newMeth(C$, 'adjustmentValueChanged$java_awt_event_AdjustmentEvent', function (e) {
p$.resetAudio.apply(this, []);
if (e.getSource() === this.termBar ) {
p$.updateSound.apply(this, []);
this.cv.repaint();
}if (e.getSource() === this.freqBar ) {
this.freqAdjusted = true;
p$.updateSound.apply(this, []);
this.cv.repaint();
}});

Clazz.newMeth(C$, 'mouseDragged$java_awt_event_MouseEvent', function (e) {
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseMoved$java_awt_event_MouseEvent', function (e) {
var x = e.getX();
var y = e.getY();
this.dragX = x;
this.dragY = y;
var oldCoef = this.selectedCoef;
this.selectedCoef = -1;
this.selection = 0;
var oldsel = this.selection;
if (this.viewFunc.contains$I$I(x, y)) this.selection = 1;
 else {
var termWidth = this.getTermWidth();
this.selectedCoef = (x/termWidth|0);
if (this.selectedCoef > this.termBar.getValue()) this.selectedCoef = -1;
if (this.selectedCoef != -1) {
if (this.viewMag.contains$I$I(x, y)) this.selection = 2;
 else if (this.viewMutes.contains$I$I(x, y)) this.selection = 4;
 else if (this.viewSolos.contains$I$I(x, y)) this.selection = 5;
 else if (this.viewPhase.contains$I$I(x, y)) this.selection = 3;
}}if (this.selectedCoef != oldCoef || oldsel != this.selection ) this.cv.repaint();
});

Clazz.newMeth(C$, 'mouseClicked$java_awt_event_MouseEvent', function (e) {
if (e.getClickCount() == 2 && this.selectedCoef != -1  && this.selection != 4  && this.selection != 5 ) {
var i;
for (i = 0; i != this.termBar.getValue(); i++) {
this.phasecoef[i] = 0;
if (this.selectedCoef != i) this.magcoef[i] = 0;
}
this.magcoef[this.selectedCoef] = 1;
if (!this.magPhaseCheck.getState()) this.phasecoef[this.selectedCoef] = (this.selection == 2) ? -1.5707963267948966 : 0;
this.doSetFunc();
this.cv.repaint();
}});

Clazz.newMeth(C$, 'mouseEntered$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mouseExited$java_awt_event_MouseEvent', function (e) {
});

Clazz.newMeth(C$, 'mousePressed$java_awt_event_MouseEvent', function (e) {
this.mouseMoved$java_awt_event_MouseEvent(e);
if ((e.getModifiers() & 4) != 0 && this.selectedCoef != -1 ) {
this.termBar.setValue$I(this.selectedCoef + 1);
this.cv.repaint();
}if ((e.getModifiers() & 16) == 0) return;
this.dragging = true;
this.edit$java_awt_event_MouseEvent(e);
});

Clazz.newMeth(C$, 'mouseReleased$java_awt_event_MouseEvent', function (e) {
if ((e.getModifiers() & 16) == 0) return;
this.dragging = false;
if (this.selection == 1) this.transform();
 else if (this.selection != 0) this.doSetFunc();
this.cv.repaint();
});

Clazz.newMeth(C$, 'handleEvent$java_awt_Event', function (ev) {
if (ev.id == 201) {
if (this.applet == null ) this.dispose();
 else this.applet.destroyFrame();
return true;
}return C$.superclazz.prototype.handleEvent$java_awt_Event.apply(this, [ev]);
});

Clazz.newMeth(C$, 'checkSoundStatus', function () {
return (this.soundCheck.getState() && P$.Fourier.ogf != null  );
});

Clazz.newMeth(C$, 'resetAudio', function () {
if (this.audioThread != null ) this.audioThread.resetAudio();
});

Clazz.newMeth(C$, 'createAudioThread', function () {
this.audioByteBuffer = Clazz.array(Byte.TYPE, [32768]);
this.audioThread = Clazz.new_((I$[16]||(I$[16]=Clazz.load('javajs.util.JSAudioThread'))).c$$javajs_util_JSAudioThread_Owner$javax_sound_sampled_AudioFormat$BA,[this, Clazz.new_((I$[17]||(I$[17]=Clazz.load('javax.sound.sampled.AudioFormat'))).c$$F$I$I$Z$Z,[22050, 16, 1, true, true]), this.audioByteBuffer]);
});

Clazz.newMeth(C$, 'updateSound', function () {
this.soundChanged = true;
});

Clazz.newMeth(C$, 'fillAudioBuffer', function () {
if (this.playfunc == null  || this.soundChanged ) {
this.soundChanged = false;
this.playfunc = Clazz.array(Double.TYPE, [32768]);
var i;
var terms = this.termBar.getValue();
var bstep = 2 * 3.141592653589793 * this.getFreq()  / 22050;
var mx = 0.2;
for (i = 1; i != terms; i++) {
if (this.hasSolo && !this.solos[i] ) continue;
if (this.mutes[i]) continue;
var dfreq = this.dfreq0 * i;
if (dfreq >= 16384) break;
var sgn = (i & 1) == 1 ? -1 : 1;
this.playfunc[dfreq] = sgn * this.magcoef[i] * Math.cos(this.phasecoef[i]) ;
this.playfunc[dfreq + 1] = -sgn * this.magcoef[i] * Math.sin(this.phasecoef[i]) ;
}
if (this.playFFT == null ) this.playFFT = Clazz.new_((I$[7]||(I$[7]=Clazz.load('com.falstad.FFT'))).c$$I,[16384]);
this.playFFT.transform$DA$Z(this.playfunc, true);
for (i = 0; i != 16384; i++) mx = Math.max(mx, Math.abs(this.playfunc[i * 2]));

var mult = 32767 / mx;
for (i = 0; i != 16384; i++) {
var x = ($s$[0] = ((this.playfunc[i * 2] * mult)|0), $s$[0]);
this.audioByteBuffer[i * 2] = ((((x/256|0))|0)|0);
this.audioByteBuffer[i * 2 + 1] = (((x & 255)|0)|0);
}
}return 32768;
});

Clazz.newMeth(C$, 'audioThreadExiting', function () {
this.audioThread = null;
});
var $s$ = new Int16Array(1);
;
(function(){var C$=Clazz.newClass(P$.FourierFrame, "View", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, 'java.awt.Rectangle');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.midy = 0;
this.labely = 0;
this.ymult = 0;
this.periodWidth = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I', function (x, y, w, h) {
C$.superclazz.c$$I$I$I$I.apply(this, [x, y, w, h]);
C$.$init$.apply(this);
this.midy = y + (h/2|0);
this.ymult = 0.6 * h / 2;
this.periodWidth = (w/3|0);
this.labely = this.midy - 5 - (h * 3/8|0) ;
}, 1);

Clazz.newMeth(C$);
})()

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:06
