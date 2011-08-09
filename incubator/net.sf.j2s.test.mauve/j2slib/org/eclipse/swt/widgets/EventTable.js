c$=$_C(function(){
this.types=null;
this.listeners=null;
this.level=0;
$_Z(this,arguments);
},$wt.widgets,"EventTable");
$_M(c$,"hook",
function(eventType,listener){
if(this.types==null)this.types=$_A(4,0);
if(this.listeners==null)this.listeners=new Array(4);
var length=this.types.length;
var index=length-1;
while(index>=0){
if(this.types[index]!=0)break;
--index;
}
index++;
if(index==length){
var newTypes=$_A(length+4,0);
System.arraycopy(this.types,0,newTypes,0,length);
this.types=newTypes;
var newListeners=new Array(length+4);
System.arraycopy(this.listeners,0,newListeners,0,length);
this.listeners=newListeners;
}this.types[index]=eventType;
this.listeners[index]=listener;
},"~N,$wt.widgets.Listener");
$_M(c$,"hooks",
function(eventType){
if(this.types==null)return false;
for(var i=0;i<this.types.length;i++){
if(this.types[i]==eventType)return true;
}
return false;
},"~N");
$_M(c$,"sendEvent",
function(event){
if(this.types==null)return;
this.level+=this.level>=0?1:-1;
try{
for(var i=0;i<this.types.length;i++){
if(event.type==0)return;
if(this.types[i]==event.type){
var listener=this.listeners[i];
if(listener!=null)listener.handleEvent(event);
}}
}finally{
var compact=this.level<0;
this.level-=this.level>=0?1:-1;
if(compact&&this.level==0){
var index=0;
for(var i=0;i<this.types.length;i++){
if(this.types[i]!=0){
this.types[index]=this.types[i];
this.listeners[index]=this.listeners[i];
index++;
}}
for(var i=index;i<this.types.length;i++){
this.types[i]=0;
this.listeners[i]=null;
}
}}
},"$wt.widgets.Event");
$_M(c$,"size",
function(){
if(this.types==null)return 0;
var count=0;
for(var i=0;i<this.types.length;i++){
if(this.types[i]!=0)count++;
}
return count;
});
$_M(c$,"remove",
function(index){
if(this.level==0){
var end=this.types.length-1;
System.arraycopy(this.types,index+1,this.types,index,end-index);
System.arraycopy(this.listeners,index+1,this.listeners,index,end-index);
index=end;
}else{
if(this.level>0)this.level=-this.level;
}this.types[index]=0;
this.listeners[index]=null;
},"~N");
$_M(c$,"unhook",
function(eventType,listener){
if(this.types==null)return;
for(var i=0;i<this.types.length;i++){
if(this.types[i]==eventType&&this.listeners[i]===listener){
this.remove(i);
return;
}}
},"~N,$wt.widgets.Listener");
$_M(c$,"unhook",
function(eventType,listener){
if(this.types==null)return;
for(var i=0;i<this.types.length;i++){
if(this.types[i]==eventType){
if($_O(this.listeners[i],$wt.widgets.TypedListener)){
var typedListener=this.listeners[i];
if(typedListener.getEventListener()===listener){
this.remove(i);
return;
}}}}
},"~N,$wt.internal.SWTEventListener");
$_M(c$,"releaseResource",
function(){
if(this.listeners!=null){
for(var i=0;i<this.listeners.length;i++){
this.listeners[i]=null;
}
this.listeners=null;
}});
