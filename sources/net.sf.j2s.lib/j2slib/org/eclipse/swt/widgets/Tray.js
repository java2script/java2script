$_L(["$wt.widgets.Widget","$.TrayItem"],"$wt.widgets.Tray",["$wt.widgets.Display"],function(){
c$=$_C(function(){
this.itemCount=0;
this.items=null;
$_Z(this,arguments);
},$wt.widgets,"Tray",$wt.widgets.Widget);
$_Y(c$,function(){
this.items=new Array(4);
});
$_K(c$,
function(display,style){
$_R(this,$wt.widgets.Tray,[]);
if(display==null)display=$wt.widgets.Display.getCurrent();
if(display==null)display=$wt.widgets.Display.getDefault();
this.display=display;
},"$wt.widgets.Display,~N");
$_M(c$,"createItem",
function(item,index){
if(this.itemCount==this.items.length){
var newItems=new Array(this.items.length+4);
System.arraycopy(this.items,0,newItems,0,this.items.length);
this.items=newItems;
}System.arraycopy(this.items,index,this.items,index+1,this.itemCount++ -index);
this.items[index]=item;
},"$wt.widgets.TrayItem,~N");
$_M(c$,"destroyItem",
function(item){
var index=0;
while(index<this.itemCount){
if(this.items[index]==item)break;
index++;
}
if(index==this.itemCount)return;
System.arraycopy(this.items,index+1,this.items,index,--this.itemCount-index);
this.items[this.itemCount]=null;
},"$wt.widgets.TrayItem");
$_M(c$,"getItem",
function(index){
return this.items[index];
},"~N");
$_M(c$,"getItemCount",
function(){
return this.itemCount;
});
$_M(c$,"getItems",
function(){
var result=new Array(this.itemCount);
System.arraycopy(this.items,0,result,0,result.length);
return result;
});
$_M(c$,"releaseChild",
function(){
$_U(this,$wt.widgets.Tray,"releaseChild",[]);
if(this.display.tray==this)this.display.tray=null;
});
$_M(c$,"releaseWidget",
function(){
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
if(item!=null&&!item.isDisposed()){
}}
this.items=null;
$_U(this,$wt.widgets.Tray,"releaseWidget",[]);
});
});
