$_L(["$wt.widgets.Canvas"],"$wt.custom.AnimatedProgress",["$wt.events.ControlAdapter","$.DisposeListener","$.PaintListener","$wt.graphics.GC","$.Point","$.Rectangle"],function(){
c$=$_C(function(){
this.active=false;
this.showStripes=false;
this.value=0;
this.orientation=256;
this.showBorder=false;
$_Z(this,arguments);
},$wt.custom,"AnimatedProgress",$wt.widgets.Canvas);
$_K(c$,
function(parent,style){
$_R(this,$wt.custom.AnimatedProgress,[parent,$wt.custom.AnimatedProgress.checkStyle(style)]);
if((style&512)!=0){
this.orientation=512;
}this.showBorder=(style&2048)!=0;
this.addControlListener((($_D("$wt.custom.AnimatedProgress$1")?0:org.eclipse.swt.custom.AnimatedProgress.$AnimatedProgress$1$()),$_N($wt.custom.AnimatedProgress$1,this,null)));
this.addPaintListener((($_D("$wt.custom.AnimatedProgress$2")?0:org.eclipse.swt.custom.AnimatedProgress.$AnimatedProgress$2$()),$_N($wt.custom.AnimatedProgress$2,this,null)));
this.addDisposeListener((($_D("$wt.custom.AnimatedProgress$3")?0:org.eclipse.swt.custom.AnimatedProgress.$AnimatedProgress$3$()),$_N($wt.custom.AnimatedProgress$3,this,null)));
},"$wt.widgets.Composite,~N");
c$.checkStyle=$_M(c$,"checkStyle",
($fz=function(style){
var mask=0;
return style&mask;
},$fz.isPrivate=true,$fz),"~N");
$_M(c$,"clear",
function(){
if(this.active)this.stop();
this.showStripes=false;
this.redraw();
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=null;
if(this.orientation==256){
size=new $wt.graphics.Point(160,18);
}else{
size=new $wt.graphics.Point(18,160);
}if(wHint!=-1)size.x=wHint;
if(hHint!=-1)size.y=hHint;
return size;
},"~N,~N,~B");
$_M(c$,"drawBevelRect",
($fz=function(gc,x,y,w,h,topleft,bottomright){
gc.setForeground(topleft);
gc.drawLine(x,y,x+w-1,y);
gc.drawLine(x,y,x,y+h-1);
gc.setForeground(bottomright);
gc.drawLine(x+w,y,x+w,y+h);
gc.drawLine(x,y+h,x+w,y+h);
},$fz.isPrivate=true,$fz),"$wt.graphics.GC,~N,~N,~N,~N,$wt.graphics.Color,$wt.graphics.Color");
$_M(c$,"paint",
function(event){
var gc=event.gc;
var disp=this.getDisplay();
var rect=this.getClientArea();
gc.fillRectangle(rect);
if(this.showBorder){
this.drawBevelRect(gc,rect.x,rect.y,rect.width-1,rect.height-1,disp.getSystemColor(18),disp.getSystemColor(20));
}this.paintStripes(gc);
},"$wt.events.PaintEvent");
$_M(c$,"paintStripes",
function(gc){
if(!this.showStripes)return;
var rect=this.getClientArea();
rect=new $wt.graphics.Rectangle(rect.x+2,rect.y+2,rect.width-4,rect.height-4);
gc.setLineWidth(2);
gc.setClipping(rect);
var color=this.getDisplay().getSystemColor(26);
gc.setBackground(color);
gc.fillRectangle(rect);
gc.setForeground(this.getBackground());
var step=12;
var foregroundValue=this.value==0?step-2:this.value-2;
if(this.orientation==256){
var y=rect.y-1;
var w=rect.width;
var h=rect.height+2;
for(var i=0;i<w;i+=step){
var x=i+foregroundValue;
gc.drawLine(x,y,x,h);
}
}else{
var x=rect.x-1;
var w=rect.width+2;
var h=rect.height;
for(var i=0;i<h;i+=step){
var y=i+foregroundValue;
gc.drawLine(x,y,w,y);
}
}if(this.active){
this.value=(this.value+2)%step;
}},"$wt.graphics.GC");
$_M(c$,"start",
function(){
if(this.active)return;
this.active=true;
this.showStripes=true;
var display=this.getDisplay();
var timer=new Array(1);
timer[0]=(($_D("$wt.custom.AnimatedProgress$4")?0:org.eclipse.swt.custom.AnimatedProgress.$AnimatedProgress$4$()),$_N($wt.custom.AnimatedProgress$4,this,$_F("display",display,"timer",timer)));
display.timerExec(70,timer[0]);
});
$_M(c$,"stop",
function(){
this.active=false;
});
c$.$AnimatedProgress$1$=function(){
$_H();
c$=$_W($wt.custom,"AnimatedProgress$1",$wt.events.ControlAdapter);
$_V(c$,"controlResized",
function(e){
this.b$["$wt.custom.AnimatedProgress"].redraw();
},"$wt.events.ControlEvent");
c$=$_P();
};
c$.$AnimatedProgress$2$=function(){
$_H();
c$=$_W($wt.custom,"AnimatedProgress$2",null,$wt.events.PaintListener);
$_V(c$,"paintControl",
function(e){
this.b$["$wt.custom.AnimatedProgress"].paint(e);
},"$wt.events.PaintEvent");
c$=$_P();
};
c$.$AnimatedProgress$3$=function(){
$_H();
c$=$_W($wt.custom,"AnimatedProgress$3",null,$wt.events.DisposeListener);
$_V(c$,"widgetDisposed",
function(e){
this.b$["$wt.custom.AnimatedProgress"].stop();
},"$wt.events.DisposeEvent");
c$=$_P();
};
c$.$AnimatedProgress$4$=function(){
$_H();
c$=$_W($wt.custom,"AnimatedProgress$4",null,Runnable);
$_V(c$,"run",
function(){
if(!this.b$["$wt.custom.AnimatedProgress"].active)return;
var gc=new $wt.graphics.GC(this.b$["$wt.custom.AnimatedProgress"]);
this.b$["$wt.custom.AnimatedProgress"].paintStripes(gc);
gc.dispose();
this.f$.display.timerExec(70,this.f$.timer[0]);
});
c$=$_P();
};
$_S(c$,
"SLEEP",70,
"$DEFAULT_WIDTH",160,
"$DEFAULT_HEIGHT",18);
});
