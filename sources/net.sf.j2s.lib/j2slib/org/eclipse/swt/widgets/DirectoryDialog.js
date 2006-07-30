$_L(["$wt.widgets.Dialog"],"$wt.widgets.DirectoryDialog",null,function(){
c$=$_C(function(){
this.message="";
this.filterPath="";
this.directoryPath=null;
$_Z(this,arguments);
},$wt.widgets,"DirectoryDialog",$wt.widgets.Dialog);
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.DirectoryDialog,[parent,style]);
},"$wt.widgets.Shell,~N");
$_M(c$,"getFilterPath",
function(){
return this.filterPath;
});
$_M(c$,"getMessage",
function(){
return this.message;
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return this.directoryPath;
});
$_M(c$,"setFilterPath",
function(string){
this.filterPath=string;
},"~S");
$_M(c$,"setMessage",
function(string){
if(string==null)this.error(4);
this.message=string;
},"~S");
});
