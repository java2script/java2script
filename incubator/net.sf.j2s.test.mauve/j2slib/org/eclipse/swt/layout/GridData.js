c$=$_C(function(){
this.verticalAlignment=2;
this.horizontalAlignment=1;
this.widthHint=-1;
this.heightHint=-1;
this.horizontalIndent=0;
this.verticalIndent=0;
this.horizontalSpan=1;
this.verticalSpan=1;
this.grabExcessHorizontalSpace=false;
this.grabExcessVerticalSpace=false;
this.minimumWidth=0;
this.minimumHeight=0;
this.exclude=false;
this.cacheWidth=-1;
this.cacheHeight=-1;
this.defaultWhint=0;
this.defaultHhint=0;
this.defaultWidth=-1;
this.defaultHeight=-1;
this.currentWhint=0;
this.currentHhint=0;
this.currentWidth=-1;
this.currentHeight=-1;
$_Z(this,arguments);
},$wt.layout,"GridData");
$_K(c$,
function(){
});
$_K(c$,
function(style){
if((style&2)!=0)this.verticalAlignment=1;
if((style&4)!=0)this.verticalAlignment=2;
if((style&16)!=0)this.verticalAlignment=4;
if((style&8)!=0)this.verticalAlignment=3;
if((style&32)!=0)this.horizontalAlignment=1;
if((style&64)!=0)this.horizontalAlignment=2;
if((style&256)!=0)this.horizontalAlignment=4;
if((style&128)!=0)this.horizontalAlignment=3;
this.grabExcessHorizontalSpace=(style&512)!=0;
this.grabExcessVerticalSpace=(style&1024)!=0;
},"~N");
$_K(c$,
function(horizontalAlignment,verticalAlignment,grabExcessHorizontalSpace,grabExcessVerticalSpace){
this.construct(horizontalAlignment,verticalAlignment,grabExcessHorizontalSpace,grabExcessVerticalSpace,1,1);
},"~N,~N,~B,~B");
$_K(c$,
function(horizontalAlignment,verticalAlignment,grabExcessHorizontalSpace,grabExcessVerticalSpace,horizontalSpan,verticalSpan){
this.horizontalAlignment=horizontalAlignment;
this.verticalAlignment=verticalAlignment;
this.grabExcessHorizontalSpace=grabExcessHorizontalSpace;
this.grabExcessVerticalSpace=grabExcessVerticalSpace;
this.horizontalSpan=horizontalSpan;
this.verticalSpan=verticalSpan;
},"~N,~N,~B,~B,~N,~N");
$_K(c$,
function(width,height){
this.widthHint=width;
this.heightHint=height;
},"~N,~N");
$_M(c$,"computeSize",
function(control,wHint,hHint,flushCache){
if(this.cacheWidth!=-1&&this.cacheHeight!=-1)return;
if(wHint==this.widthHint&&hHint==this.heightHint){
if(this.defaultWidth==-1||this.defaultHeight==-1||wHint!=this.defaultWhint||hHint!=this.defaultHhint){
var size=control.computeSize(wHint,hHint,flushCache);
this.defaultWhint=wHint;
this.defaultHhint=hHint;
this.defaultWidth=size.x;
this.defaultHeight=size.y;
}this.cacheWidth=this.defaultWidth;
this.cacheHeight=this.defaultHeight;
return;
}if(this.currentWidth==-1||this.currentHeight==-1||wHint!=this.currentWhint||hHint!=this.currentHhint){
var size=control.computeSize(wHint,hHint,flushCache);
this.currentWhint=wHint;
this.currentHhint=hHint;
this.currentWidth=size.x;
this.currentHeight=size.y;
}this.cacheWidth=this.currentWidth;
this.cacheHeight=this.currentHeight;
},"$wt.widgets.Control,~N,~N,~B");
$_M(c$,"flushCache",
function(){
this.cacheWidth=this.cacheHeight=-1;
this.defaultWidth=this.defaultHeight=-1;
this.currentWidth=this.currentHeight=-1;
});
$_M(c$,"getName",
function(){
var string=this.getClass().getName();
var index=string.lastIndexOf('.');
if(index==-1)return string;
return string.substring(index+1,string.length);
});
$_V(c$,"toString",
function(){
var hAlign="";
switch(this.horizontalAlignment){
case 4:
hAlign="SWT.FILL";
break;
case 1:
hAlign="SWT.BEGINNING";
break;
case 16384:
hAlign="SWT.LEFT";
break;
case 16777224:
hAlign="SWT.END";
break;
case 3:
hAlign="GridData.END";
break;
case 131072:
hAlign="SWT.RIGHT";
break;
case 16777216:
hAlign="SWT.CENTER";
break;
case 2:
hAlign="GridData.CENTER";
break;
default:
hAlign="Undefined "+this.horizontalAlignment;
break;
}
var vAlign="";
switch(this.verticalAlignment){
case 4:
vAlign="SWT.FILL";
break;
case 1:
vAlign="SWT.BEGINNING";
break;
case 128:
vAlign="SWT.TOP";
break;
case 16777224:
vAlign="SWT.END";
break;
case 3:
vAlign="GridData.END";
break;
case 1024:
vAlign="SWT.BOTTOM";
break;
case 16777216:
vAlign="SWT.CENTER";
break;
case 2:
vAlign="GridData.CENTER";
break;
default:
vAlign="Undefined "+this.verticalAlignment;
break;
}
var string=this.getName()+" {";
string+="horizontalAlignment="+hAlign+" ";
if(this.horizontalIndent!=0)string+="horizontalIndent="+this.horizontalIndent+" ";
if(this.horizontalSpan!=1)string+="horizontalSpan="+this.horizontalSpan+" ";
if(this.grabExcessHorizontalSpace)string+="grabExcessHorizontalSpace="+this.grabExcessHorizontalSpace+" ";
if(this.widthHint!=-1)string+="widthHint="+this.widthHint+" ";
if(this.minimumWidth!=0)string+="minimumWidth="+this.minimumWidth+" ";
string+="verticalAlignment="+vAlign+" ";
if(this.verticalIndent!=0)string+="verticalIndent="+this.verticalIndent+" ";
if(this.verticalSpan!=1)string+="verticalSpan="+this.verticalSpan+" ";
if(this.grabExcessVerticalSpace)string+="grabExcessVerticalSpace="+this.grabExcessVerticalSpace+" ";
if(this.heightHint!=-1)string+="heightHint="+this.heightHint+" ";
if(this.minimumHeight!=0)string+="minimumHeight="+this.minimumHeight+" ";
if(this.exclude)string+="exclude="+this.exclude+" ";
string=string.trim();
string+="}";
return string;
});
$_S(c$,
"BEGINNING",1,
"CENTER",2,
"END",3,
"FILL",4,
"VERTICAL_ALIGN_BEGINNING",2,
"VERTICAL_ALIGN_CENTER",4,
"VERTICAL_ALIGN_END",8,
"VERTICAL_ALIGN_FILL",16,
"HORIZONTAL_ALIGN_BEGINNING",32,
"HORIZONTAL_ALIGN_CENTER",64,
"HORIZONTAL_ALIGN_END",128,
"HORIZONTAL_ALIGN_FILL",256,
"GRAB_HORIZONTAL",512,
"GRAB_VERTICAL",1024,
"FILL_VERTICAL",1040,
"FILL_HORIZONTAL",768,
"FILL_BOTH",1808);
