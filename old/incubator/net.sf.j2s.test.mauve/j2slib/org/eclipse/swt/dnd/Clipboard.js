$_L(null,"$wt.dnd.Clipboard",["java.lang.Thread","$wt.dnd.DND","$wt.widgets.Display"],function(){
c$=$_C(function(){
this.display=null;
this.refCount=0;
this.transferAgents=null;
this.data=null;
this.CFSTR_PREFERREDDROPEFFECT=0;
$_Z(this,arguments);
},$wt.dnd,"Clipboard");
$_Y(c$,function(){
this.transferAgents=new Array(0);
this.data=new Array(0);
});
$_K(c$,
function(display){
this.checkSubclass();
if(display==null){
display=$wt.widgets.Display.getCurrent();
if(display==null){
display=$wt.widgets.Display.getDefault();
}}if(display.getThread()!==Thread.currentThread()){
$wt.dnd.DND.error(22);
}this.display=display;
},"$wt.widgets.Display");
$_M(c$,"checkSubclass",
function(){
var name=this.getClass().getName();
var validName=$wt.dnd.Clipboard.getName();
if(!validName.equals(name)){
$wt.dnd.DND.error(43);
}});
$_M(c$,"checkWidget",
function(){
var display=this.display;
if(display==null)$wt.dnd.DND.error(24);
if(display.getThread()!==Thread.currentThread())$wt.dnd.DND.error(22);
if(display.isDisposed())$wt.dnd.DND.error(24);
});
$_M(c$,"clearContents",
function(){
this.clearContents(1);
});
$_M(c$,"clearContents",
function(clipboards){
this.checkWidget();
},"~N");
$_M(c$,"dispose",
function(){
if(this.isDisposed())return;
if(this.display.getThread()!==Thread.currentThread())$wt.dnd.DND.error(22);
this.display=null;
});
$_M(c$,"getContents",
function(transfer){
return this.getContents(transfer,1);
},"$wt.dnd.Transfer");
$_M(c$,"getContents",
function(transfer,clipboards){
this.checkWidget();
if(transfer==null)$wt.dnd.DND.error(4);
if((clipboards&1)==0)return null;
return null;
},"$wt.dnd.Transfer,~N");
$_M(c$,"isDisposed",
function(){
return(this.display==null);
});
$_M(c$,"setContents",
function(data,dataTypes){
this.setContents(data,dataTypes,1);
},"~A,~A");
$_M(c$,"setContents",
function(data,dataTypes,clipboards){
this.checkWidget();
if(data==null||dataTypes==null||data.length!=dataTypes.length||data.length==0){
$wt.dnd.DND.error(5);
}for(var i=0;i<data.length;i++){
if(data[i]==null||dataTypes[i]==null||!dataTypes[i].validate(data[i])){
$wt.dnd.DND.error(5);
}}
if((clipboards&1)==0)return;
this.data=data;
this.transferAgents=dataTypes;
},"~A,~A,~N");
$_M(c$,"getAvailableTypes",
function(){
return this.getAvailableTypes(1);
});
$_M(c$,"getAvailableTypes",
function(clipboards){
this.checkWidget();
if((clipboards&1)==0)return new Array(0);
return null;
},"~N");
$_M(c$,"getAvailableTypeNames",
function(){
this.checkWidget();
return null;
});
});
