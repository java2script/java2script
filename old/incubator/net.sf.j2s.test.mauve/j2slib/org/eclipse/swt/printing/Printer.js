$_J("org.eclipse.swt.printing");
$_L(["$wt.graphics.Device"],"$wt.printing.Printer",["$wt.graphics.Rectangle","$wt.printing.PrinterData"],function(){
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
return false;
},"~S");
$_M(c$,"endJob",
function(){
});
$_M(c$,"cancelJob",
function(){
});
$_M(c$,"startPage",
function(){
return false;
});
$_M(c$,"endPage",
function(){
});
$_V(c$,"getDPI",
function(){
return null;
});
$_V(c$,"getBounds",
function(){
return null;
});
$_V(c$,"getClientArea",
function(){
return null;
});
$_M(c$,"computeTrim",
function(x,y,width,height){
return new $wt.graphics.Rectangle(0,0,0,0);
},"~N,~N,~N,~N");
$_M(c$,"getPrinterData",
function(){
return this.data;
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
