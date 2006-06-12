Clazz.declarePackage ("java.lang.reflect");
java.lang.reflect.Array = {
	newInstance : function (type, size) {
		return new Array (size);
	}
};
Array.getComponentType = function () {
	return Object;
};
