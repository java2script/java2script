java.lang.Object = Object;

//Clazz.decorateAsType (java.lang.Object, "Object");
//Object.__CLASS_NAME__ = "Object";

Object.getName = Clazz.innerFunctions.getName;

Object.prototype.equals = function (obj) {
	return this == obj;
};

Object.prototype.hashCode = function () {
	return this.toString ().hashCode ();
};

Object.prototype.getClass = function () {
	return Clazz.getClass (this);
};

Object.prototype.clone = function () {
	var obj = new this.constructor ();
	for (var p in this) {
		obj[p] = this[p];
	}
	return obj;
};

/*
 * Methods for thread in Object
 */
Object.prototype.finalize = function () {};
Object.prototype.notify = function () {};
Object.prototype.notifyAll = function () {};
Object.prototype.wait = function () {};

Object.prototype.toString = function () {
	if (this.__CLASS_NAME__ != null) {
		return "[" + this.__CLASS_NAME__ + " object]";
	} else {
		return "[object]";
	}
};
