/* http://j2s.sf.net/ */
Boolean.prototype.booleanValue=function(){
return this.valueOf();
}

Boolean.prototype.parseBoolean = function(val){
	if(val == "false" || val == false){
		return false;
	}
	return true;
}

Boolean.$valueOf = Boolean.parseBoolean = Boolean.prototype.parseBoolean;

Boolean.TRUE=Boolean.prototype.TRUE=new Boolean(true);
Boolean.FALSE=Boolean.prototype.FALSE=new Boolean(false);



