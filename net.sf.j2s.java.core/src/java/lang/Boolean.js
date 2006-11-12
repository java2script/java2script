/* http://j2s.sf.net/ */
Boolean.prototype.booleanValue=function(){
return this.valueOf();
}


Boolean.TRUE=Boolean.prototype.TRUE=new Boolean(true);
Boolean.FALSE=Boolean.prototype.FALSE=new Boolean(false);



