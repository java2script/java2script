c$=$_C(function(){
this.style=0;
this.parent=null;
this.title=null;
this.dialogShell=null;
this.dialogReturn=null;
$_Z(this,arguments);
},$wt.widgets,"Dialog");
c$.addDialog=$_M(c$,"addDialog",
function(dialog){
if($wt.widgets.Dialog.activeDialogs==null){
($t$=$wt.widgets.Dialog.activeDialogs=new Array(3),$wt.widgets.Dialog.prototype.activeDialogs=$wt.widgets.Dialog.activeDialogs,$t$);
}var length=$wt.widgets.Dialog.activeDialogs.length;
for(var i=0;i<length;i++){
if($wt.widgets.Dialog.activeDialogs[i]===dialog){
return;
}}
for(var i=0;i<length;i++){
if($wt.widgets.Dialog.activeDialogs[i]==null){
$wt.widgets.Dialog.activeDialogs[i]=dialog;
return;
}}
var newActiveDialogs=new Array(length+3);
System.arraycopy($wt.widgets.Dialog.activeDialogs,0,newActiveDialogs,0,length);
$wt.widgets.Dialog.activeDialogs[length]=dialog;
},"$wt.widgets.Dialog");
c$.removeDialog=$_M(c$,"removeDialog",
function(dialog){
if($wt.widgets.Dialog.activeDialogs==null){
return;
}var length=$wt.widgets.Dialog.activeDialogs.length;
for(var i=0;i<length;i++){
if($wt.widgets.Dialog.activeDialogs[i]===dialog){
$wt.widgets.Dialog.activeDialogs[i]=null;
return;
}}
},"$wt.widgets.Dialog");
c$.checkExistedDialogs=$_M(c$,"checkExistedDialogs",
function(shell){
if($wt.widgets.Dialog.activeDialogs==null){
return;
}for(var i=0;i<$wt.widgets.Dialog.activeDialogs.length;i++){
var dialog=$wt.widgets.Dialog.activeDialogs[i];
if(dialog!=null&&dialog.parent===shell){
dialog.dialogShell.bringToTop();
}}
},"$wt.widgets.Shell");
c$.isDialog=$_M(c$,"isDialog",
function(shell){
if($wt.widgets.Dialog.activeDialogs==null){
return false;
}for(var i=0;i<$wt.widgets.Dialog.activeDialogs.length;i++){
var dialog=$wt.widgets.Dialog.activeDialogs[i];
if(dialog!=null&&dialog.dialogShell===shell){
return true;
}}
return false;
},"$wt.widgets.Shell");
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
this.checkParent(parent);
this.parent=parent;
this.style=style;
this.title="";
},"$wt.widgets.Shell,~N");
$_M(c$,"checkParent",
function(parent){
if(parent==null)this.error(4);
},"$wt.widgets.Shell");
$_M(c$,"error",
function(code){
throw"SWT.error ("+code+")";
},"~N");
$_M(c$,"getParent",
function(){
return this.parent;
});
$_M(c$,"getStyle",
function(){
return this.style;
});
$_M(c$,"getText",
function(){
return this.title;
});
$_M(c$,"setText",
function(string){
if(string==null)this.error(4);
this.title=string;
},"~S");
$_S(c$,
"activeDialogs",null);

DialogSync2Async={};
DialogSync2Async.block=function(dialog,oThis,runnable){
if(dialog==null)return;
org.eclipse.swt.widgets.Dialog.addDialog(dialog);
dialog.open();
var shell=dialog.dialogShell;
if(shell==null)return;
shell.addDisposeListener((function(i$,v$){
if(!$_D("DialogSync2Async$1")){
$_H();
c$=DialogSync2Async$1=function(){
$_B(this,arguments);
$_Z(this,arguments);
};
Clazz.decorateAsType(c$,"DialogSync2Async$1",null,$wt.events.DisposeListener);
$_M(c$,"widgetDisposed",
function(e){
org.eclipse.swt.widgets.Dialog.removeDialog(dialog);
var $runnable=this.f$.runnable;
var $oThis=this.f$.oThis;
window.setTimeout(function(){
$runnable.apply($oThis);
},0);

},"$wt.events.DisposeEvent");
c$=$_P();
}
return $_N(DialogSync2Async$1,i$,v$);
})(this,$_F("runnable",runnable,"oThis",oThis)));
shell.getDisplay().readAndDispatch();
};
