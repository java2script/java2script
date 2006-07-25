/* http://j2s.sf.net/ */Clazz.load(["java.lang.Throwable"],"java.lang.Error",null,function(){
c$=java.lang.Error=Error=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(c$,"Error",Throwable);

Clazz.defineMethod(Error,"getMessage",
function(){
if(typeof this.message!="undefined"){
return this.message;
}else{
return this.detailMessage;
}
});
Clazz.defineMethod(Error,"getLocalizedMessage",
function(){
return this.getMessage();
});
Clazz.defineMethod(Error,"getCause",
function(){
return(this.cause==this?null:this.cause);
});
Clazz.defineMethod(Error,"initCause",
function(cause){
if(this.cause!=this)throw new IllegalStateException("Can't overwrite cause");
if(cause==this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
},"Throwable");

Clazz.overrideMethod(Error,"toString",
function(){
var s=this.getClass().getName();
var message=this.getLocalizedMessage();
return(message!=null)?(s+": "+message):s;
});

Clazz.defineMethod(Error,"printStackTrace",
function(){
System.err.println(this.toString());

});
Clazz.defineMethod(Error,"fillInStackTrace",function(){});

Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,Error);
});
Clazz.makeConstructor(c$,
function(message){
Clazz.superConstructor(this,Error,[message]);
},"String");
Clazz.makeConstructor(c$,
function(message,cause){
Clazz.superConstructor(this,Error,[message,cause]);
},"String, Throwable");
Clazz.makeConstructor(c$,
function(cause){
Clazz.superConstructor(this,Error,[cause]);
},"Throwable");
c$.serialVersionUID=c$.prototype.serialVersionUID=4980196508277280342;
});