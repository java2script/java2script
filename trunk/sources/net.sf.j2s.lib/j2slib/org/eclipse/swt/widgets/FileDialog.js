Clazz.load(["$wt.widgets.Dialog"],"$wt.widgets.FileDialog",null,function(){
c$=$_C(function(){
this.filterNames=null;
this.filterExtensions=null;
this.fileNames=null;
this.filterPath="";
this.fileName="";
$_Z(this,arguments);
},$wt.widgets,"FileDialog",$wt.widgets.Dialog);
$_Y(c$,function(){
this.filterNames=new Array(0);
this.filterExtensions=new Array(0);
this.fileNames=new Array(0);
});
$_K(c$,
function(parent){
this.construct(parent,32768);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
$_R(this,$wt.widgets.FileDialog,[parent,style]);
},"$wt.widgets.Shell,~N");
$_M(c$,"getFileName",
function(){
return this.fileName;
});
$_M(c$,"getFileNames",
function(){
return this.fileNames;
});
$_M(c$,"getFilterExtensions",
function(){
return this.filterExtensions;
});
$_M(c$,"getFilterNames",
function(){
return this.filterNames;
});
$_M(c$,"getFilterPath",
function(){
return this.filterPath;
});
$_M(c$,"open",
function(){
this.dialogUnimplemented();
return null;
});
$_M(c$,"setFileName",
function(string){
this.fileName=string;
},"~S");
$_M(c$,"setFilterExtensions",
function(extensions){
this.filterExtensions=extensions;
},"~A");
$_M(c$,"setFilterNames",
function(names){
this.filterNames=names;
},"~A");
$_M(c$,"setFilterPath",
function(string){
this.filterPath=string;
},"~S");
$_S(c$,
"FILTER","*.*",
"BUFFER_SIZE",32768);
});
