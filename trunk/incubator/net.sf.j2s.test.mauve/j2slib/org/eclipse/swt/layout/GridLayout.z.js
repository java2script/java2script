/* http://j2s.sf.net/ */c$=$_C(function(){
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
$_L(["$wt.widgets.Layout"],"$wt.layout.GridLayout",["$wt.graphics.Point","$wt.layout.GridData"],function(){
c$=$_C(function(){
this.numColumns=1;
this.makeColumnsEqualWidth=false;
this.marginWidth=5;
this.marginHeight=5;
this.marginLeft=0;
this.marginTop=0;
this.marginRight=0;
this.marginBottom=0;
this.horizontalSpacing=5;
this.verticalSpacing=5;
$_Z(this,arguments);
},$wt.layout,"GridLayout",$wt.widgets.Layout);
$_K(c$,
function(){
$_R(this,$wt.layout.GridLayout,[]);
});
$_K(c$,
function(numColumns,makeColumnsEqualWidth){
$_R(this,$wt.layout.GridLayout,[]);
this.numColumns=numColumns;
this.makeColumnsEqualWidth=makeColumnsEqualWidth;
},"~N,~B");
$_V(c$,"computeSize",
function(composite,wHint,hHint,flushCache){
var size=this.layout(composite,false,0,0,wHint,hHint,flushCache);
if(wHint!=-1)size.x=wHint;
if(hHint!=-1)size.y=hHint;
return size;
},"$wt.widgets.Composite,~N,~N,~B");
$_V(c$,"flushCache",
function(control){
var data=control.getLayoutData();
if(data!=null)(data).flushCache();
return true;
},"$wt.widgets.Control");
$_M(c$,"getData",
function(grid,row,column,rowCount,columnCount,first){
var control=grid[row][column];
if(control!=null){
var data=control.getLayoutData();
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
var vSpan=Math.max(1,data.verticalSpan);
var i=first?row+vSpan-1:row-vSpan+1;
var j=first?column+hSpan-1:column-hSpan+1;
if(0<=i&&i<rowCount){
if(0<=j&&j<columnCount){
if(control===grid[i][j])return data;
}}}return null;
},"~A,~N,~N,~N,~N,~B");
$_M(c$,"layout",
function(composite,flushCache){
var rect=composite.getClientArea();
this.layout(composite,true,rect.x,rect.y,rect.width,rect.height,flushCache);
},"$wt.widgets.Composite,~B");
$_M(c$,"layout",
function(composite,move,x,y,width,height,flushCache){
if(this.numColumns<1){
return new $wt.graphics.Point(this.marginLeft+this.marginWidth*2+this.marginRight,this.marginTop+this.marginHeight*2+this.marginBottom);
}var count=0;
var children=composite.getChildren();
for(var i=0;i<children.length;i++){
var control=children[i];
var data=control.getLayoutData();
if(data==null||!data.exclude){
children[count++]=children[i];
}}
for(var i=0;i<count;i++){
var child=children[i];
var data=child.getLayoutData();
if(data==null)child.setLayoutData(data=new $wt.layout.GridData());
if(flushCache)data.flushCache();
data.computeSize(child,data.widthHint,data.heightHint,flushCache);
if(data.grabExcessHorizontalSpace&&data.minimumWidth>0){
if(data.cacheWidth<data.minimumWidth){
var trim=0;
if($_O(child,$wt.widgets.Scrollable)){
var rect=(child).computeTrim(0,0,0,0);
trim=rect.width;
}else{
trim=child.getBorderWidth()*2;
}data.cacheWidth=data.cacheHeight=-1;
data.computeSize(child,Math.max(0,data.minimumWidth-trim),data.heightHint,false);
}}if(data.grabExcessVerticalSpace&&data.minimumHeight>0){
data.cacheHeight=Math.max(data.cacheHeight,data.minimumHeight);
}}
var row=0;
var column=0;
var rowCount=0;
var columnCount=this.numColumns;
var grid=$_A(4,columnCount,null);
for(var i=0;i<count;i++){
var child=children[i];
var data=child.getLayoutData();
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
var vSpan=Math.max(1,data.verticalSpan);
while(true){
var lastRow=row+vSpan;
if(lastRow>=grid.length){
var newGrid=$_A(lastRow+4,columnCount,null);
System.arraycopy(grid,0,newGrid,0,grid.length);
grid=newGrid;
}if(grid[row]==null){
grid[row]=new Array(columnCount);
}while(column<columnCount&&grid[row][column]!=null){
column++;
}
var endCount=column+hSpan;
if(endCount<=columnCount){
var index=column;
while(index<endCount&&grid[row][index]==null){
index++;
}
if(index==endCount)break;
column=index;
}if(column+hSpan>=columnCount){
column=0;
row++;
}}
for(var j=0;j<vSpan;j++){
if(grid[row+j]==null){
grid[row+j]=new Array(columnCount);
}for(var k=0;k<hSpan;k++){
grid[row+j][column+k]=child;
}
}
rowCount=Math.max(rowCount,row+vSpan);
column+=hSpan;
}
var availableWidth=width-this.horizontalSpacing*(columnCount-1)-(this.marginLeft+this.marginWidth*2+this.marginRight);
var expandCount=0;
var widths=$_A(columnCount,0);
var minWidths=$_A(columnCount,0);
var expandColumn=$_A(columnCount,false);
for(var j=0;j<columnCount;j++){
for(var i=0;i<rowCount;i++){
var data=this.getData(grid,i,j,rowCount,columnCount,true);
if(data!=null){
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
if(hSpan==1){
var w=data.cacheWidth+data.horizontalIndent;
widths[j]=Math.max(widths[j],w);
if(data.grabExcessHorizontalSpace){
if(!expandColumn[j])expandCount++;
expandColumn[j]=true;
}if(!data.grabExcessHorizontalSpace||data.minimumWidth!=0){
w=!data.grabExcessHorizontalSpace||data.minimumWidth==-1?data.cacheWidth:data.minimumWidth;
w+=data.horizontalIndent;
minWidths[j]=Math.max(minWidths[j],w);
}}}}
for(var i=0;i<rowCount;i++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
if(hSpan>1){
var spanWidth=0;
var spanMinWidth=0;
var spanExpandCount=0;
for(var k=0;k<hSpan;k++){
spanWidth+=widths[j-k];
spanMinWidth+=minWidths[j-k];
if(expandColumn[j-k])spanExpandCount++;
}
if(data.grabExcessHorizontalSpace&&spanExpandCount==0){
expandCount++;
expandColumn[j]=true;
}var w=data.cacheWidth+data.horizontalIndent-spanWidth-(hSpan-1)*this.horizontalSpacing;
if(w>0){
if(spanExpandCount==0){
widths[j]+=w;
}else{
var delta=Math.floor(w/spanExpandCount);
var remainder=w%spanExpandCount;
var last=-1;
for(var k=0;k<hSpan;k++){
if(expandColumn[j-k]){
widths[last=j-k]+=delta;
}}
if(last>-1)widths[last]+=remainder;
}}if(!data.grabExcessHorizontalSpace||data.minimumWidth!=0){
w=!data.grabExcessHorizontalSpace||data.minimumWidth==-1?data.cacheWidth:data.minimumWidth;
w+=data.horizontalIndent-spanMinWidth-(hSpan-1)*this.horizontalSpacing;
if(w>0){
if(spanExpandCount==0){
minWidths[j]+=w;
}else{
var delta=Math.floor(w/spanExpandCount);
var remainder=w%spanExpandCount;
var last=-1;
for(var k=0;k<hSpan;k++){
if(expandColumn[j-k]){
minWidths[last=j-k]+=delta;
}}
if(last>-1)minWidths[last]+=remainder;
}}}}}}
}
if(this.makeColumnsEqualWidth){
var minColumnWidth=0;
var columnWidth=0;
for(var i=0;i<columnCount;i++){
minColumnWidth=Math.max(minColumnWidth,minWidths[i]);
columnWidth=Math.max(columnWidth,widths[i]);
}
columnWidth=width==-1||expandCount==0?columnWidth:Math.max(minColumnWidth,Math.floor(availableWidth/columnCount));
for(var i=0;i<columnCount;i++){
expandColumn[i]=expandCount>0;
widths[i]=columnWidth;
}
}else{
if(width!=-1&&expandCount>0){
var totalWidth=0;
for(var i=0;i<columnCount;i++){
totalWidth+=widths[i];
}
var c=expandCount;
var delta=Math.floor((availableWidth-totalWidth)/c);
var remainder=(availableWidth-totalWidth)%c;
var last=-1;
while(totalWidth!=availableWidth){
for(var j=0;j<columnCount;j++){
if(expandColumn[j]){
if(widths[j]+delta>minWidths[j]){
widths[last=j]=widths[j]+delta;
}else{
widths[j]=minWidths[j];
expandColumn[j]=false;
c--;
}}}
if(last>-1)widths[last]+=remainder;
for(var j=0;j<columnCount;j++){
for(var i=0;i<rowCount;i++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
if(hSpan>1){
if(!data.grabExcessHorizontalSpace||data.minimumWidth!=0){
var spanWidth=0;
var spanExpandCount=0;
for(var k=0;k<hSpan;k++){
spanWidth+=widths[j-k];
if(expandColumn[j-k])spanExpandCount++;
}
var w=!data.grabExcessHorizontalSpace||data.minimumWidth==-1?data.cacheWidth:data.minimumWidth;
w+=data.horizontalIndent-spanWidth-(hSpan-1)*this.horizontalSpacing;
if(w>0){
if(spanExpandCount==0){
widths[j]+=w;
}else{
var delta2=Math.floor(w/spanExpandCount);
var remainder2=w%spanExpandCount;
var last2=-1;
for(var k=0;k<hSpan;k++){
if(expandColumn[j-k]){
widths[last2=j-k]+=delta2;
}}
if(last2>-1)widths[last2]+=remainder2;
}}}}}}
}
if(c==0)break;
totalWidth=0;
for(var i=0;i<columnCount;i++){
totalWidth+=widths[i];
}
delta=Math.floor((availableWidth-totalWidth)/c);
remainder=(availableWidth-totalWidth)%c;
last=-1;
}
}}var flush=null;
var flushLength=0;
if(width!=-1){
for(var j=0;j<columnCount;j++){
for(var i=0;i<rowCount;i++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
if(data.heightHint==-1){
var child=grid[i][j];
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
var currentWidth=0;
for(var k=0;k<hSpan;k++){
currentWidth+=widths[j-k];
}
currentWidth+=(hSpan-1)*this.horizontalSpacing-data.horizontalIndent;
if((currentWidth!=data.cacheWidth&&data.horizontalAlignment==4)||(data.cacheWidth>currentWidth)){
var trim=0;
if($_O(child,$wt.widgets.Scrollable)){
var rect=(child).computeTrim(0,0,0,0);
trim=rect.width;
}else{
trim=child.getBorderWidth()*2;
}data.cacheWidth=data.cacheHeight=-1;
data.computeSize(child,Math.max(0,currentWidth-trim),data.heightHint,false);
if(data.grabExcessVerticalSpace&&data.minimumHeight>0){
data.cacheHeight=Math.max(data.cacheHeight,data.minimumHeight);
}if(flush==null)flush=new Array(count);
flush[flushLength++]=data;
}}}}
}
}var availableHeight=height-this.verticalSpacing*(rowCount-1)-(this.marginTop+this.marginHeight*2+this.marginBottom);
expandCount=0;
var heights=$_A(rowCount,0);
var minHeights=$_A(rowCount,0);
var expandRow=$_A(rowCount,false);
for(var i=0;i<rowCount;i++){
for(var j=0;j<columnCount;j++){
var data=this.getData(grid,i,j,rowCount,columnCount,true);
if(data!=null){
var vSpan=Math.max(1,Math.min(data.verticalSpan,rowCount));
if(vSpan==1){
var h=data.cacheHeight+data.verticalIndent;
heights[i]=Math.max(heights[i],h);
if(data.grabExcessVerticalSpace){
if(!expandRow[i])expandCount++;
expandRow[i]=true;
}if(!data.grabExcessVerticalSpace||data.minimumHeight!=0){
h=!data.grabExcessVerticalSpace||data.minimumHeight==-1?data.cacheHeight:data.minimumHeight;
h+=data.verticalIndent;
minHeights[i]=Math.max(minHeights[i],h);
}}}}
for(var j=0;j<columnCount;j++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
var vSpan=Math.max(1,Math.min(data.verticalSpan,rowCount));
if(vSpan>1){
var spanHeight=0;
var spanMinHeight=0;
var spanExpandCount=0;
for(var k=0;k<vSpan;k++){
spanHeight+=heights[i-k];
spanMinHeight+=minHeights[i-k];
if(expandRow[i-k])spanExpandCount++;
}
if(data.grabExcessVerticalSpace&&spanExpandCount==0){
expandCount++;
expandRow[i]=true;
}var h=data.cacheHeight+data.verticalIndent-spanHeight-(vSpan-1)*this.verticalSpacing;
if(h>0){
if(spanExpandCount==0){
heights[i]+=h;
}else{
var delta=Math.floor(h/spanExpandCount);
var remainder=h%spanExpandCount;
var last=-1;
for(var k=0;k<vSpan;k++){
if(expandRow[i-k]){
heights[last=i-k]+=delta;
}}
if(last>-1)heights[last]+=remainder;
}}if(!data.grabExcessVerticalSpace||data.minimumHeight!=0){
h=!data.grabExcessVerticalSpace||data.minimumHeight==-1?data.cacheHeight:data.minimumHeight;
h+=data.verticalIndent-spanMinHeight-(vSpan-1)*this.verticalSpacing;
if(h>0){
if(spanExpandCount==0){
minHeights[i]+=h;
}else{
var delta=Math.floor(h/spanExpandCount);
var remainder=h%spanExpandCount;
var last=-1;
for(var k=0;k<vSpan;k++){
if(expandRow[i-k]){
minHeights[last=i-k]+=delta;
}}
if(last>-1)minHeights[last]+=remainder;
}}}}}}
}
if(height!=-1&&expandCount>0){
var totalHeight=0;
for(var i=0;i<rowCount;i++){
totalHeight+=heights[i];
}
var c=expandCount;
var delta=Math.floor((availableHeight-totalHeight)/c);
var remainder=(availableHeight-totalHeight)%c;
var last=-1;
while(totalHeight!=availableHeight){
for(var i=0;i<rowCount;i++){
if(expandRow[i]){
if(heights[i]+delta>minHeights[i]){
heights[last=i]=heights[i]+delta;
}else{
heights[i]=minHeights[i];
expandRow[i]=false;
c--;
}}}
if(last>-1)heights[last]+=remainder;
for(var i=0;i<rowCount;i++){
for(var j=0;j<columnCount;j++){
var data=this.getData(grid,i,j,rowCount,columnCount,false);
if(data!=null){
var vSpan=Math.max(1,Math.min(data.verticalSpan,rowCount));
if(vSpan>1){
if(!data.grabExcessVerticalSpace||data.minimumHeight!=0){
var spanHeight=0;
var spanExpandCount=0;
for(var k=0;k<vSpan;k++){
spanHeight+=heights[i-k];
if(expandRow[i-k])spanExpandCount++;
}
var h=!data.grabExcessVerticalSpace||data.minimumHeight==-1?data.cacheHeight:data.minimumHeight;
h+=data.verticalIndent-spanHeight-(vSpan-1)*this.verticalSpacing;
if(h>0){
if(spanExpandCount==0){
heights[i]+=h;
}else{
var delta2=Math.floor(h/spanExpandCount);
var remainder2=h%spanExpandCount;
var last2=-1;
for(var k=0;k<vSpan;k++){
if(expandRow[i-k]){
heights[last2=i-k]+=delta2;
}}
if(last2>-1)heights[last2]+=remainder2;
}}}}}}
}
if(c==0)break;
totalHeight=0;
for(var i=0;i<rowCount;i++){
totalHeight+=heights[i];
}
delta=Math.floor((availableHeight-totalHeight)/c);
remainder=(availableHeight-totalHeight)%c;
last=-1;
}
}if(move){
var gridY=y+this.marginTop+this.marginHeight;
for(var i=0;i<rowCount;i++){
var gridX=x+this.marginLeft+this.marginWidth;
for(var j=0;j<columnCount;j++){
var data=this.getData(grid,i,j,rowCount,columnCount,true);
if(data!=null){
var hSpan=Math.max(1,Math.min(data.horizontalSpan,columnCount));
var vSpan=Math.max(1,data.verticalSpan);
var cellWidth=0;
var cellHeight=0;
for(var k=0;k<hSpan;k++){
cellWidth+=widths[j+k];
}
for(var k=0;k<vSpan;k++){
cellHeight+=heights[i+k];
}
cellWidth+=this.horizontalSpacing*(hSpan-1);
var childX=gridX+data.horizontalIndent;
var childWidth=Math.min(data.cacheWidth,cellWidth);
switch(data.horizontalAlignment){
case 16777216:
case 2:
childX+=Math.max(0,Math.floor((cellWidth-data.horizontalIndent-childWidth)/2));
break;
case 131072:
case 16777224:
case 3:
childX+=Math.max(0,cellWidth-data.horizontalIndent-childWidth);
break;
case 4:
childWidth=cellWidth-data.horizontalIndent;
break;
}
cellHeight+=this.verticalSpacing*(vSpan-1);
var childY=gridY+data.verticalIndent;
var childHeight=Math.min(data.cacheHeight,cellHeight);
switch(data.verticalAlignment){
case 16777216:
case 2:
childY+=Math.max(0,Math.floor((cellHeight-data.verticalIndent-childHeight)/2));
break;
case 1024:
case 16777224:
case 3:
childY+=Math.max(0,cellHeight-data.verticalIndent-childHeight);
break;
case 4:
childHeight=cellHeight-data.verticalIndent;
break;
}
var child=grid[i][j];
if(child!=null){
child.setBounds(childX,childY,childWidth,childHeight);
}}gridX+=widths[j]+this.horizontalSpacing;
}
gridY+=heights[i]+this.verticalSpacing;
}
}for(var i=0;i<flushLength;i++){
flush[i].cacheWidth=flush[i].cacheHeight=-1;
}
var totalDefaultWidth=0;
var totalDefaultHeight=0;
for(var i=0;i<columnCount;i++){
totalDefaultWidth+=widths[i];
}
for(var i=0;i<rowCount;i++){
totalDefaultHeight+=heights[i];
}
totalDefaultWidth+=this.horizontalSpacing*(columnCount-1)+this.marginLeft+this.marginWidth*2+this.marginRight;
totalDefaultHeight+=this.verticalSpacing*(rowCount-1)+this.marginTop+this.marginHeight*2+this.marginBottom;
return new $wt.graphics.Point(totalDefaultWidth,totalDefaultHeight);
},"$wt.widgets.Composite,~B,~N,~N,~N,~N,~B");
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
if(this.numColumns!=1)string+="numColumns="+this.numColumns+" ";
if(this.makeColumnsEqualWidth)string+="makeColumnsEqualWidth="+this.makeColumnsEqualWidth+" ";
if(this.marginWidth!=0)string+="marginWidth="+this.marginWidth+" ";
if(this.marginHeight!=0)string+="marginHeight="+this.marginHeight+" ";
if(this.marginLeft!=0)string+="marginLeft="+this.marginLeft+" ";
if(this.marginRight!=0)string+="marginRight="+this.marginRight+" ";
if(this.marginTop!=0)string+="marginTop="+this.marginTop+" ";
if(this.marginBottom!=0)string+="marginBottom="+this.marginBottom+" ";
if(this.horizontalSpacing!=0)string+="horizontalSpacing="+this.horizontalSpacing+" ";
if(this.verticalSpacing!=0)string+="verticalSpacing="+this.verticalSpacing+" ";
string=string.trim();
string+="}";
return string;
});
});
