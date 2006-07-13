$_J("org.eclipse.swt.printing");
Clazz.load(["$wt.graphics.Device"],"$wt.printing.Printer",["$wt.SWT","$wt.graphics.Rectangle","$wt.printing.PrinterData"],function(){
c$=$_C(function(){
this.handle=0;
this.data=null;
$_Z(this,arguments);
},$wt.printing,"Printer",$wt.graphics.Device);
c$.getPrinterList=$_M(c$,"getPrinterList",
function(){
return null;
});
c$.getDefaultPrinterData=$_M(c$,"getDefaultPrinterData",
function(){
return null;
});
c$.checkNull=$_M(c$,"checkNull",
function(data){
if(data==null)data=new $wt.printing.PrinterData();
if(data.driver==null||data.name==null){
var defaultPrinter=$wt.printing.Printer.getDefaultPrinterData();
data.driver=defaultPrinter.driver;
data.name=defaultPrinter.name;
}return data;
},"$wt.printing.PrinterData");
$_K(c$,
function(){
this.construct(null);
});
$_K(c$,
function(data){
$_R(this,$wt.printing.Printer,[$wt.printing.Printer.checkNull(data)]);
},"$wt.printing.PrinterData");
$_V(c$,"create",
function(deviceData){
},"$wt.graphics.DeviceData");
$_M(c$,"startJob",
function(jobName){
this.checkDevice();
return false;
},"~S");
$_M(c$,"endJob",
function(){
this.checkDevice();
});
$_M(c$,"cancelJob",
function(){
this.checkDevice();
});
$_M(c$,"startPage",
function(){
this.checkDevice();
return false;
});
$_M(c$,"endPage",
function(){
this.checkDevice();
});
$_V(c$,"getDPI",
function(){
this.checkDevice();
return null;
});
$_V(c$,"getBounds",
function(){
this.checkDevice();
return null;
});
$_V(c$,"getClientArea",
function(){
this.checkDevice();
return null;
});
$_M(c$,"computeTrim",
function(x,y,width,height){
this.checkDevice();
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N,~N,~N,~N");
$_M(c$,"getPrinterData",
function(){
return this.data;
});
$_V(c$,"checkDevice",
function(){
});
$_M(c$,"release",
function(){
$_U(this,$wt.printing.Printer,"release",[]);
this.data=null;
});
$_V(c$,"destroy",
function(){
this.handle=0;
});
});
