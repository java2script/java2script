$_L(["$wt.widgets.Control"],"$wt.widgets.Button",["java.lang.Character","$wt.graphics.Point","$wt.internal.RunnableCompatibility","$wt.internal.browser.OS","$wt.widgets.TypedListener"],function(){
c$=$_C(function(){
this.text="";
this.textSizeCached=false;
this.textWidthCached=0;
this.textHeightCached=0;
this.lastColor=null;
this.hasImage=false;
this.image=null;
this.image2=null;
this.imageList=null;
this.ignoreMouse=false;
this.btnText=null;
this.btnHandle=null;
$_Z(this,arguments);
},$wt.widgets,"Button",$wt.widgets.Control);
$_M(c$,"_setImage",
function(image){
},"$wt.graphics.Image");
$_M(c$,"addSelectionListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(13,typedListener);
this.addListener(14,typedListener);
},"$wt.events.SelectionListener");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Widget.checkBits(style,8,4,32,16,2,0);
if((style&(10))!=0){
return $wt.widgets.Widget.checkBits(style,16777216,16384,131072,0,0,0);
}if((style&(48))!=0){
return $wt.widgets.Widget.checkBits(style,16384,131072,16777216,0,0,0);
}if((style&4)!=0){
style|=524288;
return $wt.widgets.Widget.checkBits(style,128,1024,16384,131072,0,0);
}return style;
},"~N");
$_M(c$,"click",
function(){
this.ignoreMouse=true;
this.ignoreMouse=false;
});
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var border=this.getBorderWidth();
var width=0;
var height=0;
if((this.style&4)!=0){
if((this.style&(1152))!=0){
width+=16;
height+=16;
}else{
width+=16;
height+=16;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
}var extra=0;
if(!this.hasImage){
if(this.text==null||this.text.length==0){
height+=O$.getStringStyledHeight(".","button-default",null);
}else{
if(!this.textSizeCached||changed){
var string=this.text.replaceAll("[\r\n]+","");
var cssSize=O$.getStringStyledSize(string,"button-default",this.handle.style.cssText);
this.textSizeCached=true;
this.textWidthCached=cssSize.x;
this.textHeightCached=cssSize.y;
}width=this.textWidthCached;
height=this.textHeightCached;
if((this.style&(48))!=0){
width-=5;
}extra=Math.max(8,height);
}}else{
if(this.image!=null){
if(this.image.width==0&&this.image.height==0){
if(this.image.url!=null&&this.image.url.length!=0){
var img=new Image();
img.src=this.image.url;
this.image.width=img.width;
this.image.height=img.height;
width+=img.width;
height=Math.max(img.height,height);
}else{
width+=16;
height=Math.max(16,height);
}}else{
width+=this.image.width;
height=Math.max(this.image.height,height);
}extra=8;
}}if((this.style&(48))!=0){
width+=13+extra;
height=Math.max(height,16);
}if((this.style&(10))!=0){
width+=12;
height+=10;
}if(wHint!=-1)width=wHint;
if(hHint!=-1)height=hHint;
width+=border*2;
height+=border*2;
return new $wt.graphics.Point(width,height);
},"~N,~N,~B");
$_V(c$,"enableWidget",
function(enabled){
this.btnHandle.disabled=!enabled;
var cssName=this.handle.className;
if(cssName==null)cssName="";
var key="button-disabled";
var idx=cssName.indexOf(key);
if(!enabled){
if(idx==-1){
this.handle.className+=" "+key;
}}else{
if(idx!=-1){
this.handle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}},"~B");
$_M(c$,"getAlignment",
function(){
if((this.style&4)!=0){
if((this.style&128)!=0)return 128;
if((this.style&1024)!=0)return 1024;
if((this.style&16384)!=0)return 16384;
if((this.style&131072)!=0)return 131072;
return 128;
}if((this.style&16384)!=0)return 16384;
if((this.style&16777216)!=0)return 16777216;
if((this.style&131072)!=0)return 131072;
return 16384;
});
$_V(c$,"getBorderWidth",
function(){
if((this.style&2048)!=0){
return 2;
}return 0;
});
$_M(c$,"getDefault",
function(){
if((this.style&8)==0)return false;
return false;
});
$_M(c$,"getImage",
function(){
return this.image;
});
$_V(c$,"getNameText",
function(){
return this.getText();
});
$_M(c$,"getSelection",
function(){
if((this.style&(50))==0)return false;
if((this.style&2)!=0){
return(this.btnHandle.className!=null&&this.btnHandle.className.indexOf("button-selected")!=-1);
}else if((this.style&(48))!=0){
return this.btnHandle.checked;
}return false;
});
$_M(c$,"getText",
function(){
if((this.style&4)!=0)return"";
return this.text;
});
$_V(c$,"isEnabled",
function(){
return!this.btnHandle.disabled;
});
$_V(c$,"mnemonicHit",
function(ch){
if(!this.setFocus())return false;
if((this.style&16)==0)this.click();
return true;
},"~N");
$_V(c$,"mnemonicMatch",
function(key){
var mnemonic=this.findMnemonic(this.getText());
if((mnemonic).charCodeAt(0)==('\0').charCodeAt(0))return false;
return(Character.toUpperCase(key)).charCodeAt(0)==(Character.toUpperCase(mnemonic)).charCodeAt(0);
},"~N");
$_M(c$,"releaseHandle",
function(){
if(this.btnText!=null){
O$.destroyHandle(this.btnText);
this.btnText=null;
}if(this.btnHandle!=null){
O$.destroyHandle(this.btnHandle);
this.btnHandle=null;
}$_U(this,$wt.widgets.Button,"releaseHandle",[]);
});
$_M(c$,"releaseWidget",
function(){
$_U(this,$wt.widgets.Button,"releaseWidget",[]);
if(this.imageList!=null)this.imageList.dispose();
this.imageList=null;
if(this.image2!=null)this.image2.dispose();
this.image2=null;
this.text=null;
this.image=null;
});
$_M(c$,"removeSelectionListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(13,listener);
this.eventTable.unhook(14,listener);
},"$wt.events.SelectionListener");
$_M(c$,"selectRadio",
function(){
var children=this.parent._getChildren();
for(var i=0;i<children.length;i++){
var child=children[i];
if(this!=child)child.setRadioSelection(false);
}
this.setSelection(true);
});
$_M(c$,"setAlignment",
function(alignment){
if((this.style&4)!=0){
if((this.style&(148608))==0)return;
this.style&=-148609;
this.style|=alignment&(148608);
this.updateArrowStyle();
var cx=this.width;
var cy=this.height;
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}this.updateArrowSize(cx,cy);
return;
}if((alignment&(16924672))==0)return;
this.style&=-16924673;
this.style|=alignment&(16924672);
if((this.style&(10))!=0){
var handleStyle=null;
if((this.style&(48))!=0){
handleStyle=this.btnText.style;
}else{
handleStyle=this.btnHandle.style;
}if((this.style&16384)!=0){
this.btnText.style.textAlign="left";
handleStyle.backgroundPosition="left center";
}if((this.style&16777216)!=0){
this.btnText.style.textAlign="center";
handleStyle.backgroundPosition="center center";
}else if((this.style&131072)!=0){
this.btnText.style.textAlign="right";
handleStyle.backgroundPosition="right center";
}}},"~N");
$_M(c$,"setDefault",
function(value){
if((this.style&8)==0)return;
if(value){
try{
this.handle.focus();
}catch(e){
if($_O(e,Error)){
}else{
throw e;
}
}
}},"~B");
$_M(c$,"setFixedFocus",
function(){
if((this.style&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setFixedFocus",[]);
});
$_M(c$,"setImage",
function(image){
if((this.style&4)!=0)return;
this.image=image;
this.hasImage=true;
if(this.image.handle==null&&this.image.url!=null&&this.image.url.length!=0){
O$.clearChildren(this.btnText);
this.btnText.style.display="";
this.btnText.style.paddingTop="";
this.btnHandle.parentNode.style.bottom="";
this.btnHandle.parentNode.style.top="";
this.btnHandle.style.top="";
this.btnText.parentNode.style.position="";
this.btnText.parentNode.style.top="";
var handleStyle=null;
if((this.style&(48))!=0){
handleStyle=this.btnText.style;
var img=new Image();
img.src=this.image.url;
this.image.width=img.width;
this.image.height=img.height;
handleStyle.display="block";
handleStyle.marginLeft=(16)+"px";
handleStyle.paddingTop=this.image.height+"px";
}else{
handleStyle=this.btnHandle.style;
}if(image.url.toLowerCase().endsWith(".png")&&handleStyle.filter!=null){
handleStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
}else{
handleStyle.backgroundRepeat="no-repeat";
var bgXPos="center";
if((this.style&(48))!=0){
if((this.style&131072)!=0){
bgXPos="right";
}else if((this.style&16777216)!=0){
bgXPos="center";
}else{
bgXPos="left";
}}handleStyle.backgroundPosition=bgXPos+" center";
handleStyle.backgroundImage="url(\"" + this.image.url + "\")";
}}},"$wt.graphics.Image");
$_V(c$,"setRadioFocus",
function(){
if((this.style&16)==0||!this.getSelection())return false;
return this.setFocus();
});
$_M(c$,"setRadioSelection",
function(value){
if((this.style&16)==0)return false;
if(this.getSelection()!=value){
this.setSelection(value);
this.postEvent(13);
}return true;
},"~B");
$_M(c$,"setSavedFocus",
function(){
if((this.style&16)!=0&&!this.getSelection())return false;
return $_U(this,$wt.widgets.Button,"setSavedFocus",[]);
});
$_M(c$,"setSelection",
function(selected){
if((this.style&(50))==0)return;
if((this.style&2)!=0){
var cssName=this.btnHandle.className;
if(cssName==null)cssName="";
var key="button-selected";
var idx=cssName.indexOf(key);
if(selected){
if(idx==-1){
this.btnHandle.className+=" "+key;
}}else{
if(idx!=-1){
this.btnHandle.className=cssName.substring(0,idx)+cssName.substring(idx+key.length);
}}}else if((this.style&(48))!=0){
this.btnHandle.checked=selected;
}},"~B");
$_M(c$,"setText",
function(string){
if((this.style&4)!=0)return;
if(string!=this.text){
this.textSizeCached=false;
}O$.clearChildren(this.btnText);
if(this.hasImage){
this.btnText.style.backgroundImage="";
if(O$.isIE&&this.image.url!=null&&this.image.url.toLowerCase().endsWith(".png")&&this.btnText.style.filter!=null){
this.btnText.style.filter="";
}}this.text=string;
this.hasImage=false;
string=string.replaceAll("(&(&))|([\r\n]+)","$2");
var idx=string.indexOf('&');
if(idx==-1){
this.btnText.appendChild(d$.createTextNode(string));
}else{
this.btnText.appendChild(d$.createTextNode(string.substring(0,idx)));
var underline=d$.createElement("SPAN");
underline.appendChild(d$.createTextNode(string.substring(idx+1,idx+2)));
underline.className="button-text-mnemonics";
this.btnText.appendChild(underline);
this.btnText.appendChild(d$.createTextNode(string.substring(idx+2)));
}},"~S");
$_V(c$,"SetWindowPos",
function(hWnd,hWndInsertAfter,X,Y,cx,cy,uFlags){
if((this.style&2048)!=0){
cx-=4;
cy-=4;
}if((this.style&4)!=0){
this.updateArrowSize(cx,cy);
}if((this.style&(48))!=0){
var h=0;
if(!this.hasImage){
if(this.textSizeCached){
this.btnText.style.display="block";
if(this.textHeightCached<13){
this.btnText.style.paddingTop=(Math.floor((13-this.textHeightCached)/2))+"px";
this.btnHandle.parentNode.style.bottom="0";
this.btnHandle.parentNode.style.top="0";
this.btnHandle.style.top="0";
}else{
this.btnText.style.paddingTop="0";
}}h=this.textHeightCached;
}else{
h=this.image.height;
}h=Math.max(16,h);
if(h<cy){
this.btnText.parentNode.style.position="relative";
this.btnText.parentNode.style.top=(Math.floor((cy-h)/2))+"px";
}}var el=hWnd;
el.style.left=X+"px";
el.style.top=Y+"px";
el.style.width=(cx>0?cx:0)+"px";
el.style.height=(cy>0?cy:0)+"px";
return true;
},"~O,~O,~N,~N,~N,~N,~N");
$_M(c$,"updateArrowSize",
($fz=function(cx,cy){
var xx=Math.floor(Math.min(cx,cy)/3);
var s=this.btnText.style;
s.borderWidth=(xx>0?xx:0)+"px";
if((this.style&16384)!=0){
s.borderLeftWidth="0";
}else if((this.style&131072)!=0){
s.borderRightWidth="0";
}else if((this.style&128)!=0){
s.borderTopWidth="0";
}else if((this.style&1024)!=0){
if(xx>1){
s.borderWidth=(xx-1)+"px";
}s.borderBottomWidth="0";
}else{
s.borderTopWidth="0";
}var x=Math.floor(cy/6);
xx=Math.floor(cy/3);
s.position="relative";
if((this.style&(147456))!=0){
s.top=(x-3)+"px";
if((this.style&131072)!=0){
s.left="1px";
}}else{
if((this.style&128)!=0){
s.top=(xx-3)+"px";
}else if((this.style&1024)!=0){
s.top=(xx-2)+"px";
}}if(O$.isMozilla&&!O$.isFirefox){
if((this.style&128)!=0){
s.left="-2px";
}else if((this.style&1024)!=0){
s.left="-1px";
}}if(O$.isFirefox){
if((this.style&(147456))!=0){
s.top="-2px";
if((this.style&131072)!=0){
s.left="1px";
}}else{
if((this.style&128)!=0){
s.left="-2px";
s.top="-1px";
}else if((this.style&1024)!=0){
s.left="-1px";
s.top="-1px";
}}}},$fz.isPrivate=true,$fz),"~N,~N");
$_M(c$,"setCursor",
function(cursor){
if(this.handle!=null){
this.handle.style.cursor=cursor.handle;
}},"$wt.graphics.Cursor");
$_V(c$,"createHandle",
function(){
this.handle=d$.createElement("DIV");
var cssName="button-default";
if((this.style&2048)!=0){
cssName+=" button-border";
}if((this.style&8388608)!=0){
cssName+=" button-flat";
}this.handle.className=cssName;
if(this.parent!=null){
var parentHandle=this.parent.containerHandle();
if(parentHandle!=null){
parentHandle.appendChild(this.handle);
}}if((this.style&(48))!=0){
var btnEl=d$.createElement("DIV");
this.handle.appendChild(btnEl);
var btnWrapperEl=d$.createElement("DIV");
btnWrapperEl.className="button-input-wrapper";
btnEl.appendChild(btnWrapperEl);
this.btnHandle=d$.createElement("INPUT");
if((this.style&32)!=0){
btnEl.className="button-check";
this.btnHandle.type="checkbox";
}else{
btnEl.className="button-radio";
this.btnHandle.type="radio";
}btnWrapperEl.appendChild(this.btnHandle);
this.btnText=d$.createElement("DIV");
this.btnText.className="button-text";
btnEl.appendChild(this.btnText);
}else{
this.btnHandle=d$.createElement("BUTTON");
this.handle.appendChild(this.btnHandle);
this.btnText=d$.createElement("DIV");
this.btnHandle.appendChild(this.btnText);
if((this.style&2)!=0){
this.btnHandle.className="button-toggle";
}else if((this.style&4)!=0){
this.btnHandle.className="button-arrow";
this.updateArrowStyle();
}else{
this.btnHandle.className="button-push";
}}this.btnHandle.onmouseover=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Button$1")){
$_H();
c$=$_W($wt.widgets,"Button$1",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var cssName=" button-hover";
var idx=this.b$["$wt.widgets.Button"].btnHandle.className.indexOf(cssName);
if(idx==-1){
this.b$["$wt.widgets.Button"].btnHandle.className=this.b$["$wt.widgets.Button"].btnHandle.className+cssName;
}});
c$=$_P();
}
return $_N($wt.widgets.Button$1,i$,v$);
})(this,null));
this.btnHandle.onmouseout=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Button$2")){
$_H();
c$=$_W($wt.widgets,"Button$2",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
var cssName=" button-hover";
var idx=this.b$["$wt.widgets.Button"].btnHandle.className.indexOf(cssName);
if(idx!=-1){
this.b$["$wt.widgets.Button"].btnHandle.className=this.b$["$wt.widgets.Button"].btnHandle.className.substring(0,idx)+this.b$["$wt.widgets.Button"].btnHandle.className.substring(cssName.length+idx);
}});
c$=$_P();
}
return $_N($wt.widgets.Button$2,i$,v$);
})(this,null));
this.hookSelection();
});
$_M(c$,"updateArrowStyle",
($fz=function(){
if((this.style&16384)!=0){
this.btnText.className="button-arrow-left";
}else if((this.style&131072)!=0){
this.btnText.className="button-arrow-right";
}else if((this.style&128)!=0){
this.btnText.className="button-arrow-up";
}else if((this.style&1024)!=0){
this.btnText.className="button-arrow-down";
}else{
this.btnText.className="button-arrow-up";
}},$fz.isPrivate=true,$fz));
$_V(c$,"hookSelection",
function(){
var eventHandler=$_Q((function(i$,v$){
if(!$_D("org.eclipse.swt.widgets.Button$3")){
$_H();
c$=$_W($wt.widgets,"Button$3",$wt.internal.RunnableCompatibility);
$_V(c$,"run",
function(){
if(!this.b$["$wt.widgets.Button"].isEnabled()){
this.toReturn(false);
return;
}if((this.b$["$wt.widgets.Button"].style&(34))!=0){
var e=this.getEvent();
if((this.b$["$wt.widgets.Button"].style&32)!=0){
if(e.srcElement!=this.b$["$wt.widgets.Button"].btnHandle){
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}}else{
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}}else{
if((this.b$["$wt.widgets.Button"].style&16)!=0){
if((this.b$["$wt.widgets.Button"].parent.getStyle()&4194304)!=0){
this.b$["$wt.widgets.Button"].setSelection(!this.b$["$wt.widgets.Button"].getSelection());
}else{
this.b$["$wt.widgets.Button"].selectRadio();
}}}this.b$["$wt.widgets.Button"].postEvent(13);
});
c$=$_P();
}
return $_N($wt.widgets.Button$3,i$,v$);
})(this,null));
this.handle.onclick=this.handle.ondblclick=eventHandler;
if((this.style&(48))!=0){
this.btnText.onclick=eventHandler;
}});
$_S(c$,
"CHECK_WIDTH",13,
"CHECK_HEIGHT",13,
"ICON_WIDTH",128,
"ICON_HEIGHT",128);
});
