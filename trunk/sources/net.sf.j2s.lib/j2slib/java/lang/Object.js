/* http://j2s.sf.net/ */java.lang.Object=Object;




Object.getName=Clazz.innerFunctions.getName;

Object.prototype.equals=function(obj){
return this==obj;
};

Object.prototype.hashCode=function(){
return this.toString().hashCode();
};

Object.prototype.getClass=function(){
return Clazz.getClass(this);
};

Object.prototype.clone=function(){
return this;
};


Object.prototype.finalize=function(){};
Object.prototype.notify=function(){};
Object.prototype.notifyAll=function(){};
Object.prototype.wait=function(){};

Object.prototype.toString=function(){
if(this.__CLASS_NAME__!=null){
return"["+this.__CLASS_NAME__+" object]";
}else{
return"[object]";
}
};
