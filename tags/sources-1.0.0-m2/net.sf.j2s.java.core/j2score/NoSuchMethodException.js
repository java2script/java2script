/*******
 * Copyright ognize.com (2005).
 *
 * API for Script Oriented Web Architecture
 *
 * @author josson smith
 * @create Oct 27, 2005
 *******/

function MethodNotFoundException (obj, clazz, method, params) {
	this.id = "MethodNotFoundException";
	var paramStr = "";
	var s = new Array ();
	if (params != null) {
		paramStr = params.substring (1).replace (/\\/g, ",");
	}
	var leadingStr = "";
	if (method != null && method != "construct") {
		leadingStr = "Method";
	} else {
		leadingStr = "Constructor";
	}
	this.message = leadingStr + " " + Clazz.getClassName (clazz) + "." 
					+ method + "(" + paramStr + ") is not found!";
	this.toString = function () {
		return this.id + ":" + this.message;
	}
}
