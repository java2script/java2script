/* http://j2s.sf.net/ */
java.lang.Boolean = Boolean;
Boolean.prototype.booleanValue=function(){
return this.valueOf();
}

Boolean.prototype.parseBoolean = function(val){
	if(val == null || val.toLowerCase() == "false" || val == false){
		return false;
	}
	return true;
}

Boolean.$valueOf = Boolean.parseBoolean = Boolean.prototype.parseBoolean;

Boolean.TRUE = Boolean.prototype.TRUE = new Boolean(true);
Boolean.FALSE = Boolean.prototype.FALSE = new Boolean(false);
Boolean.TYPE = Boolean.prototype.TYPE = Boolean;


