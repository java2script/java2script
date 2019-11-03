c$=$_C(function(){
this.target=null;
this.x=0;
this.y=0;
this.leftButtonHold=false;
this.event=null;
this.type=0;
$_Z(this,arguments);
},$wt.internal.dnd,"HTMLEventWrapper");
$_K(c$,
function(event){
this.event=event;
this.wrapEvent(event);
},"~O");
$_M(c$,"wrapEvent",
function(a){
var e=a;
this.target=null;
this.x=0;
this.y=0;
this.leftButtonHold=true;
this.event=null;
this.type=0;


if(!e||(window["O$"]!=null&&O$.isIE)){
e=window.event;
this.stopPropagation=function(){
this.event.cancelBubble=true;
};
this.preventDefault=function(){
this.event.returnValue=false;
};
}else{
this.stopPropagation=function(){
this.event.stopPropagation();
};
this.preventDefault=function(){
this.event.preventDefault();
};
}
this.event=e;
this.type=e.type;
if(e.target){
this.target=e.target;
}else if(e.srcElement){
this.target=e.srcElement;
}
if(e.pageX||e.pageY){
this.x=e.pageX;
this.y=e.pageY;
}else if(e.clientX||e.clientY){
this.x=e.clientX+document.body.scrollLeft;
this.y=e.clientY+document.body.scrollTop;
}
if(e.which){
this.leftButtonHold=(e.which==1);
if(e.which==19||e.which==65536||e.which>8){
this.leftButtonHold=(org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton==1);
}else{
org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton=e.which;
}
}else if(e.button){
this.leftButtonHold=(e.button==1);
}
},"~O");
$_M(c$,"stopPropagation",
function(){
});
$_M(c$,"preventDefault",
function(){
});

org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton=0;
