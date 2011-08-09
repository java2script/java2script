$_L(null,"$wt.custom.BusyIndicator",["$wt.widgets.Display"],function(){
c$=$_T($wt.custom,"BusyIndicator");
c$.showWhile=$_M(c$,"showWhile",
function(display,runnable){
if(display==null){
display=$wt.widgets.Display.getCurrent();
if(display==null){
runnable.run();
return;
}}var busyId=new Integer($wt.custom.BusyIndicator.nextBusyId);
($t$=$wt.custom.BusyIndicator.nextBusyId++,$wt.custom.BusyIndicator.prototype.nextBusyId=$wt.custom.BusyIndicator.nextBusyId,$t$);
var cursor=display.getSystemCursor(1);
var shells=display.getShells();
for(var i=0;i<shells.length;i++){
var id=shells[i].getData("SWT BusyIndicator");
if(id==null){
shells[i].setCursor(cursor);
shells[i].setData("SWT BusyIndicator",busyId);
}}
try{
runnable.run();
}finally{
shells=display.getShells();
for(var i=0;i<shells.length;i++){
var id=shells[i].getData("SWT BusyIndicator");
if(id===busyId){
shells[i].setCursor(null);
shells[i].setData("SWT BusyIndicator",null);
}}
}
},"$wt.widgets.Display,Runnable");
$_S(c$,
"nextBusyId",1,
"BUSYID_NAME","SWT BusyIndicator",
"BUSY_CURSOR","SWT BusyIndicator Cursor");
});
