$_L(["$wt.internal.CloneableCompatibility"],"$wt.custom.StyleRange",["java.lang.StringBuffer"],function(){
c$=$_C(function(){
this.start=0;
this.length=0;
this.foreground=null;
this.background=null;
this.fontStyle=0;
this.underline=false;
this.strikeout=false;
$_Z(this,arguments);
},$wt.custom,"StyleRange",null,$wt.internal.CloneableCompatibility);
$_K(c$,
function(){
});
$_K(c$,
function(start,length,foreground,background){
this.start=start;
this.length=length;
this.foreground=foreground;
this.background=background;
},"~N,~N,$wt.graphics.Color,$wt.graphics.Color");
$_K(c$,
function(start,length,foreground,background,fontStyle){
this.start=start;
this.length=length;
this.foreground=foreground;
this.background=background;
this.fontStyle=fontStyle;
},"~N,~N,$wt.graphics.Color,$wt.graphics.Color,~N");
$_V(c$,"equals",
function(object){
var style;
if(object===this)return true;
if($_O(object,$wt.custom.StyleRange))style=object;
else return false;
if(this.start!=style.start)return false;
if(this.length!=style.length)return false;
return this.similarTo(style);
},"~O");
$_V(c$,"hashCode",
function(){
var code=this.start+this.length;
if(this.foreground!=null)code+=this.foreground.hashCode();
if(this.background!=null)code+=this.background.hashCode();
return code+this.fontStyle;
});
$_M(c$,"isUnstyled",
function(){
if(this.foreground!=null)return false;
if(this.background!=null)return false;
if(this.fontStyle!=0)return false;
if(this.underline)return false;
if(this.strikeout)return false;
return true;
});
$_M(c$,"similarTo",
function(style){
if(this.foreground!=null){
if(!this.foreground.equals(style.foreground))return false;
}else if(style.foreground!=null)return false;
if(this.background!=null){
if(!this.background.equals(style.background))return false;
}else if(style.background!=null)return false;
if(this.fontStyle!=style.fontStyle)return false;
if(this.underline!=style.underline)return false;
if(this.strikeout!=style.strikeout)return false;
return true;
},"$wt.custom.StyleRange");
$_V(c$,"clone",
function(){
var style=new $wt.custom.StyleRange(this.start,this.length,this.foreground,this.background,this.fontStyle);
style.underline=this.underline;
style.strikeout=this.strikeout;
return style;
});
$_V(c$,"toString",
function(){
var buf=new StringBuffer();
buf.append(this.start+","+this.length+" fg:"+this.foreground+" bg:"+this.background+" fStyle:");
switch(this.fontStyle){
case 1:
buf.append("bold");
break;
case 2:
buf.append("italic");
break;
case 3:
buf.append("bold-italic");
break;
default:
buf.append("normal");
}
if(this.underline)buf.append(" underline");
if(this.strikeout)buf.append(" strikeout");
return buf.toString();
});
});
