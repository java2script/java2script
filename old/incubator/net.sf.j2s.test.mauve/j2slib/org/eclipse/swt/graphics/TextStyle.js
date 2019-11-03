c$=$_C(function(){
this.font=null;
this.foreground=null;
this.background=null;
this.underline=false;
this.strikeout=false;
$_Z(this,arguments);
},$wt.graphics,"TextStyle");
$_K(c$,
function(font,foreground,background){
this.font=font;
this.foreground=foreground;
this.background=background;
},"$wt.graphics.Font,$wt.graphics.Color,$wt.graphics.Color");
$_V(c$,"equals",
function(object){
if(object===this)return true;
if(object==null)return false;
if(!($_O(object,$wt.graphics.TextStyle)))return false;
var style=object;
if(this.foreground!=null){
if(!this.foreground.equals(style.foreground))return false;
}else if(style.foreground!=null)return false;
if(this.background!=null){
if(!this.background.equals(style.background))return false;
}else if(style.background!=null)return false;
if(this.font!=null){
if(!this.font.equals(style.font))return false;
}else if(style.font!=null)return false;
if(this.underline!=style.underline)return false;
if(this.strikeout!=style.strikeout)return false;
return true;
},"~O");
$_V(c$,"hashCode",
function(){
var hash=0;
if(this.foreground!=null)hash^=this.foreground.hashCode();
if(this.background!=null)hash^=this.background.hashCode();
if(this.font!=null)hash^=this.font.hashCode();
if(this.underline)hash^=hash;
if(this.strikeout)hash^=hash;
return hash;
});
$_V(c$,"toString",
function(){
return"TextStyle {font: "+this.font+", foreground: "+this.foreground+", background: "+this.background+", underline: "+this.underline+", strikeout: "+this.strikeout+"}";
});
