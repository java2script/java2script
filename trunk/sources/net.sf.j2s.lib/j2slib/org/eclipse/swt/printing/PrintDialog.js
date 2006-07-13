$_J("org.eclipse.swt.printing");
Clazz.load(["$wt.widgets.Dialog"],"$wt.printing.PrintDialog",["$wt.SWT"],function(){
c$=$_C(function(){
this.scope=0;
this.startPage=1;
this.endPage=1;
this.printToFile=false;
$_Z(this,arguments);
},$wt.printing,"PrintDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.printing.PrintDialog,[parent,style]);
this.checkSubclass();
},"$wt.widgets.Shell,~N");
$_M(c$,"getScope",
function(){
return this.scope;
});
$_M(c$,"setScope",
function(scope){
this.scope=scope;
},"~N");
$_M(c$,"getStartPage",
function(){
return this.startPage;
});
$_M(c$,"setStartPage",
function(startPage){
this.startPage=startPage;
},"~N");
$_M(c$,"getEndPage",
function(){
return this.endPage;
});
$_M(c$,"setEndPage",
function(endPage){
this.endPage=endPage;
},"~N");
$_M(c$,"getPrintToFile",
function(){
return this.printToFile;
});
$_M(c$,"setPrintToFile",
function(printToFile){
this.printToFile=printToFile;
},"~B");
$_V(c$,"checkSubclass",
function(){
var name=this.getClass().getName();
var validName=$wt.printing.PrintDialog.getName();
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return null;
});
});
