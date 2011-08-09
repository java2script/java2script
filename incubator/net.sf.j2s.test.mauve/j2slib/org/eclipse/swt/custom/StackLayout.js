$_L(["$wt.widgets.Layout"],"$wt.custom.StackLayout",["$wt.graphics.Point"],function(){
c$=$_C(function(){
this.marginWidth=0;
this.marginHeight=0;
this.topControl=null;
$_Z(this,arguments);
},$wt.custom,"StackLayout",$wt.widgets.Layout);
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var children=composite.getChildren();
var maxWidth=0;
var maxHeight=0;
for(var i=0;i<children.length;i++){
var size=children[i].computeSize(wHint,hHint,flushCache);
maxWidth=Math.max(size.x,maxWidth);
maxHeight=Math.max(size.y,maxHeight);
}
var width=maxWidth+2*this.marginWidth;
var height=maxHeight+2*this.marginHeight;
if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
return new $wt.graphics.Point(width,height);
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
return true;
},"$wt.widgets.Control");
$_V(c$,"layout",
function(composite,flushCache){
var children=composite.getChildren();
var rect=composite.getClientArea();
rect.x+=this.marginWidth;
rect.y+=this.marginHeight;
rect.width-=2*this.marginWidth;
rect.height-=2*this.marginHeight;
for(var i=0;i<children.length;i++){
children[i].setBounds(rect);
children[i].setVisible(children[i]===this.topControl);
}
},"$wt.widgets.Composite,~B");
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
var string=this.getName()+" {";
if(this.marginWidth!=0)string+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)string+="marginHeight="+this.marginHeight+" ";
if(this.topControl!=null)string+="topControl="+this.topControl+" ";
string=string.trim();
string+="}";
return string;
});
});
