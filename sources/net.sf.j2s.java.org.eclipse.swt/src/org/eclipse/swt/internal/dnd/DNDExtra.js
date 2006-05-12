var methods = ["onmousedown", "onmouseup", "onmousemove",
		"onkeyup", "onselectstart"];
for (var i = 0; i < methods.length; i++) {
	org.eclipse.swt.internal.dnd.DNDUtils["$" + methods[i]] =
			org.eclipse.swt.internal.dnd.DNDUtils[methods[i]];
}
org.eclipse.swt.internal.dnd.DNDUtils.bindFunctionWith = function (aFun, obj) {
	var xFun = null;
	eval ("xFun = " + aFun + ";");
	return (function (yFun, o) {
		return function (e) {
			return yFun (e, o);
		}
	}) (xFun, obj);
};
org.eclipse.swt.internal.dnd.HTMLEventWrapper.prototype.wrapEvent = null;
org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton = 0;
Clazz.defineMethod (org.eclipse.swt.internal.dnd.HTMLEventWrapper, "wrapEvent",
function (e) {
	this.target = null;
	this.x = 0;
	this.y = 0;
	this.leftButtonHold = true;
	this.event = null;
	this.type = 0;

	/*
	 * See more about Event properties at 
	 * http://www.quirksmode.org/js/events_properties.html
	 */
	if (!e) {
		e = window.event;
		this.stopPropagation = function () {
			this.event.cancelBubble = true;
		};
		this.preventDefault = function () {
			this.event.returnValue = false;
		};
	} else {
		this.stopPropagation = function () {
			this.event.stopPropagation ();
		};
		this.preventDefault = function () {
			this.event.preventDefault ();
		};
	}
	this.event = e;
	this.type = e.type;
	if (e.target) {
		this.target = e.target;
	} else if (e.srcElement) {
		this.target = e.srcElement;
	}
	if (e.pageX || e.pageY) {
		this.x = e.pageX;
		this.y = e.pageY;
	} else if (e.clientX || e.clientY) {
		this.x = e.clientX + document.body.scrollLeft;
		this.y = e.clientY + document.body.scrollTop;
	}

	if (e.which) {
		this.leftButtonHold = (e.which == 1);
		if (e.which == 19 || e.which == 65536 || e.which > 8) {
			this.leftButtonHold = (org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton == 1);
		} else {
			org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton = e.which;
		}
	} else if (e.button) {
		this.leftButtonHold = (e.button == 1);
	}
}, "Object");