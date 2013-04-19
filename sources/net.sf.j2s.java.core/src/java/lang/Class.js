/******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create Nov 5, 2005
 *******/

if (window["Clazz"] == null) {
/*
 * The following *-# are used to compress the JavaScript file into small file.
 * For more details, please read /net.sf.j2s.lib/build/build.xml
 */
/*-#
 # _x_CLASS_NAME__ -> C$N
 # _x_PKG_NAME__ -> P$N
 #
 # clazzThis -> Tz
 # objThis -> To
 # clazzHost -> Hz
 # hostThis -> Th
 # hostSuper -> Sh
 # clazzFun -> Fc
 # clazzName -> Nc
 # funName -> Nf
 # funBody -> Bf
 # objType -> oT
 #  
 # qClazzName ->Nq
 #-*/
/**
 * Class Clazz. All the methods are static in this class.
 */
/* static */
Class = Clazz = function () {
};

NullObject = function () {
};

JavaObject = Object;

/* protected */
Clazz.supportsNativeObject = window["j2s.object.native"];

if (Clazz.supportsNativeObject) {
	JavaObject = function () {};
}

JavaObject.prototype.equals = function (obj) {
	return this == obj;
};

JavaObject.prototype.hashCode = function () {
	try {
		return this.toString ().hashCode ();
	} catch (e) {
		var str = ":";
		for (var s in this) {
			str += s + ":"
		}
		return str.hashCode ();
	}
};

JavaObject.prototype.getClass = function () {
	return Clazz.getClass (this);
};

JavaObject.prototype.clone = function () {
	var o = new this.constructor ();
	for (var i in this) {
		o[i] = this[i];
	}
	return o;
};

/*
 * Methods for thread in Object
 */
JavaObject.prototype.finalize = function () {};
JavaObject.prototype.notify = function () {};
JavaObject.prototype.notifyAll = function () {};
JavaObject.prototype.wait = function () {};

JavaObject.prototype.to$tring = Object.prototype.toString;
JavaObject.prototype.toString = function () {
	if (this.__CLASS_NAME__ != null) {
		return "[" + this.__CLASS_NAME__ + " object]";
	} else {
		return this.to$tring.apply (this, arguments);
	}
};

if (Clazz.supportsNativeObject) {
	/* protected */
	Clazz.extendedObjectMethods = [
			"equals", "hashCode", "getClass", "clone", "finalize", "notify", "notifyAll", "wait", "to$tring", "toString"
	];

	for (var i = 0; i < Clazz.extendedObjectMethods.length; i++) {
		var p = Clazz.extendedObjectMethods[i];
		Array.prototype[p] = JavaObject.prototype[p];
	}
	JavaObject.__CLASS_NAME__ = "Object";
	JavaObject["getClass"] = function () { return JavaObject; }; 
}

/**
 * Try to fix bug on Safari
 */
InternalFunction = Object;

/**
 * Return the class name of the given class or object.
 *
 * @param clazzHost given class or object
 * @return class name
 */
/* public */
Clazz.getClassName = function (clazzHost) {
	if (clazzHost == null) {
		/* 
		 * null is always treated as Object.
		 * But what about "undefined"?
		 */
		return "NullObject";
	}
	if (typeof clazzHost == "function") {
		var clazz = clazzHost;
		if (clazz.__CLASS_NAME__ != null) {
			if (arguments[1] != true) {
				return "Class";
			}
			/* user defined class name */
			return clazz.__CLASS_NAME__;
		}
		/*-# clazzStr -> Sc #-*/
		var clazzStr = clazz.toString ();
		var idx0 = clazzStr.indexOf ("function");
		if (idx0 == -1) {
			// For Firefox 1.5.0.1+, those HTML element are no longer
			// bound with function () { [native] } constructors
			if (clazzStr.charAt (0) == '[') {
				var clazzName = clazzStr.substring (1, clazzStr.length - 1);
				if (clazzName.indexOf ("object ") != -1) { // IE
					return clazzName.substring (7);
				}
				return clazzName;
			} else {
				return clazzStr.replace(/[^a-zA-Z0-9]/g, '');
			}
		}
		var idx1 = idx0 + 8;
		var idx2 = clazzStr.indexOf ("(", idx1);
		if (idx2 == -1) {
			return "Object";
		}
		var clazzName = clazzStr.substring (idx1, idx2)
				.replace (/^\s+/, "").replace (/\s+$/, ""); // .trim ()
		if (clazzName == "anonymous") {
			return "Function";
		} else {
			return clazzName;
		}
	} else {
		var obj = clazzHost;
		if (obj instanceof Clazz.CastedNull) {
			return obj.clazzName;
		} else {
			var objType = typeof obj;
			if (objType == "string") {
				/* 
				 * Always treat the constant string as String object.
				 * This will be compatiable with Java String instance.
				 */
				return "String";
			} else if (objType == "object") {
				if (obj.__CLASS_NAME__ != null) {
					/* user defined class name */
					return obj.__CLASS_NAME__;
				} else if (obj.constructor == null) {
					return "Object"; // For HTML Element in IE
				} else {
					if (obj.constructor.__CLASS_NAME__ == null) {
						if (obj instanceof Number) {
							return "Number";
						} else if (obj instanceof Boolean) {
							return "Boolean";
						} else if (obj instanceof Array) {
							return "Array";
						}
					}
					return Clazz.getClassName (obj.constructor, true);
				}
			} else if (objType == "number") {
				return "Number";
			} else if (objType == "boolean") {
				return "Boolean";
			}
			return Clazz.getClassName (obj.constructor, true);
		}
	}
};
/**
 * Return the class of the given class or object.
 *
 * @param clazzHost given class or object
 * @return class name
 */
/* public */
Clazz.getClass = function (clazzHost) {
	if (clazzHost == null) {
		/* 
		 * null is always treated as Object.
		 * But what about "undefined"?
		 */
		return JavaObject;
	}
	if (typeof clazzHost == "function") {
		return clazzHost;
	} else {
		var clazzName = null;
		var obj = clazzHost;
		if (obj instanceof Clazz.CastedNull) {
			clazzName = obj.clazzName;
		} else {
			var objType = typeof obj;
			if (objType == "string") {
				return String;
			} else if (typeof obj == "object") {
				/* user defined class name */
				if (obj.__CLASS_NAME__ != null) {
					clazzName = obj.__CLASS_NAME__;
				} else if (obj.constructor == null) {
					return JavaObject; // Is it safe?
				} else {
					return obj.constructor;
				}
			}
		}
		if (clazzName != null) {
			//var hostedClazz = null;
			//eval ("hostedClazz = " + clazzName + ";");
			//return hostedClazz;
			return Clazz.evalType (clazzName, true);
		} else {
			return obj.constructor;
		}
	}
};

/*
 * Be used to copy members of class
 */
/* protected */
/*-# extendsProperties -> eP #-*/
Clazz.extendsProperties = function (hostThis, hostSuper) {
	for (var o in hostSuper) {
		if (o != "b$" && o != "prototype" && o != "superClazz"
				&& o != "__CLASS_NAME__" && o != "implementz"
				&& !Clazz.checkInnerFunction (hostSuper, o)) {
			hostThis[o] = hostSuper[o];
		}
	}
};

/* private */
/*-# checkInnerFunction -> cIF #-*/
Clazz.checkInnerFunction = function (hostSuper, funName) {
	for (var k = 0; k < Clazz.innerFunctionNames.length; k++) {
		if (funName == Clazz.innerFunctionNames[k] && 
				Clazz.innerFunctions[funName] === hostSuper[funName]) {
			return true;
		}
	}
	return false;
};

/*
 * Be used to copy members of interface
 */
/* protected */
/*-# implementsProperties -> ip #-*/
Clazz.implementsProperties = function (hostThis, hostSuper) {
	for (var o in hostSuper) {
		if (o != "b$" && o != "prototype" && o != "superClazz"
				&& o != "__CLASS_NAME__" && o != "implementz") {
			if (typeof hostSuper[o] == "function") {
				/*
				 * static final member of interface may be a class, which may
				 * be function.
				 */
				if (Clazz.checkInnerFunction (hostSuper, o)) {
					continue;
				}
			}
			hostThis[o] = hostSuper[o];
			hostThis.prototype[o] = hostSuper[o];
		}
	}
	/*
	 * There is no concrete fields or methods in interfaces!
	 * Folllowing lines see non-sense!
	 * March 10, 2006
	 */
	/*
	for (var o in hostSuper.prototype) { 
		if (o != "__CLASS_NAME__") {
			hostThis.prototype[o] = hostSuper.prototype[o];
		}
	}
	*/
};

/*-# args4InheritClass -> aIC #-*/
Clazz.args4InheritClass = function () {
};
Clazz.inheritArgs = new Clazz.args4InheritClass ();

/**
 * Inherit class with "extends" keyword and also copy those static members. 
 * Example, as in Java, if NAME is a static member of ClassA, and ClassB 
 * extends ClassA then ClassB.NAME can be accessed in some ways.
 *
 * @param clazzThis child class to be extended
 * @param clazzSuper super class which is inherited from
 * @param objSuper super class instance
 */
/* protected */
/*-#
 # inheritClass -> xic 
 #
 # objSuper -> oSp
 #-*/
Clazz.inheritClass = function (clazzThis, clazzSuper, objSuper) {
	//var thisClassName = Clazz.getClassName (clazzThis);
	Clazz.extendsProperties (clazzThis, clazzSuper);
	if (Clazz.isClassUnloaded (clazzThis)) {
		// Don't change clazzThis.protoype! Keep it!
	} else if (objSuper != null) {
		// ! Unsafe of reference prototype to an instance!
		// Feb 19, 2006 --josson
		// OK for this reference to an instance, as this is anonymous instance,
		// which is not referenced elsewhere.
		// March 13, 2006
		clazzThis.prototype = objSuper; 
	} else if (clazzSuper !== Number) {
		clazzThis.prototype = new clazzSuper (Clazz.inheritArgs);
	} else { // Number
		clazzThis.prototype = new Number ();
	}
	clazzThis.superClazz = clazzSuper;
	/*
	 * Is it necessary to reassign the class name?
	 * Mar 10, 2006 --josson
	 */
	//clazzThis.__CLASS_NAME__ = thisClassName;
	clazzThis.prototype.__CLASS_NAME__ = clazzThis.__CLASS_NAME__;
};

/**
 * Implementation of Java's keyword "implements".
 * As in JavaScript there are on "implements" keyword implemented, a property
 * of "implementz" is added to the class to record the interfaces the class
 * is implemented.
 * 
 * @param clazzThis the class to implement
 * @param interfacez Array of interfaces
 */
/* public */
Clazz.implementOf = function (clazzThis, interfacez) {
	if (arguments.length >= 2) {
		if (clazzThis.implementz == null) {
			clazzThis.implementz = new Array ();
		}
		var impls = clazzThis.implementz;
		if (arguments.length == 2) {
			if (typeof interfacez == "function") {
				impls[impls.length] = interfacez;
				Clazz.implementsProperties (clazzThis, interfacez);
			} else if (interfacez instanceof Array) {
				for (var i = 0; i < interfacez.length; i++) {
					impls[impls.length] = interfacez[i];
					Clazz.implementsProperties (clazzThis, interfacez[i]);
				}
			}
		} else {
			for (var i = 1; i < arguments.length; i++) {
				impls[impls.length] = arguments[i];
				Clazz.implementsProperties (clazzThis, arguments[i]);
			}
		}
	}
};

/**
 * TODO: More should be done for interface's inheritance
 */
/* public */
Clazz.extendInterface = Clazz.implementOf;

/* protected */
/*-#
 # equalsOrExtendsLevel -> eOE 
 #
 # clazzAncestor -> anc
 #-*/
Clazz.equalsOrExtendsLevel = function (clazzThis, clazzAncestor) {
	if (clazzThis === clazzAncestor) {
		return 0;
	}
	if (clazzThis.implementz != null) {
		var impls = clazzThis.implementz;
		for (var i = 0; i < impls.length; i++) {
			var level = Clazz.equalsOrExtendsLevel (impls[i], clazzAncestor);
			if (level >= 0) {
				return level + 1;
			}
		}
	}
	return -1;
};

/* protected */
/*-#
 # getInheritedLevel -> gIL 
 #
 # clazzBase -> bs
 # clazzTarget -> tg
 #-*/
Clazz.getInheritedLevel = function (clazzTarget, clazzBase) {
	if (clazzTarget === clazzBase) {
		return 0;
	}
	var isTgtStr = (typeof clazzTarget == "string");
	var isBaseStr = (typeof clazzBase == "string");
	if ((isTgtStr && ("void" == clazzTarget || "unknown" == clazzTarget)) 
			|| (isBaseStr && ("void" == clazzBase 
					|| "unknown" == clazzBase))) {
		return -1;
	}
	/*
	 * ? The following lines are confusing
	 * March 10, 2006
	 */
	if ((isTgtStr && "NullObject" == clazzTarget) 
			|| NullObject === clazzTarget) {
		if (clazzBase !== Number && clazzBase !== Boolean
				&& clazzBase !== NullObject) {
			return 0;
		}
	}
	if (isTgtStr) {
		clazzTarget = Clazz.evalType (clazzTarget);
	}
	if (isBaseStr) {
		clazzBase = Clazz.evalType (clazzBase);
	}
	if (clazzBase == null || clazzTarget == null) {
		return -1;
	}
	var level = 0;
	var zzalc = clazzTarget; // zzalc <--> clazz
	while (zzalc !== clazzBase && level < 10) {
		/* maybe clazzBase is interface */
		if (zzalc.implementz != null) {
			var impls = zzalc.implementz;
			for (var i = 0; i < impls.length; i++) {
				var implsLevel = Clazz.equalsOrExtendsLevel (impls[i], 
						clazzBase);
				if (implsLevel >= 0) {
					return level + implsLevel + 1;
				}
			}
		}
		
		zzalc = zzalc.superClazz;
		if (zzalc == null) {
			if (clazzBase === Object || clazzBase === JavaObject) {
				/*
				 * getInheritedLevel(String, CharSequence) == 1
				 * getInheritedLevel(String, Object) == 1.5
				 * So if both #test(CharSequence) and #test(Object) existed,
				 * #test("hello") will correctly call #test(CharSequence)
				 * insted of #test(Object).
				 */
				return level + 1.5; // 1.5! Special!
			} else {
				return -1;
			}
		}
		level++;
	}
	return level;
};

/**
 * Implements Java's keyword "instanceof" in JavaScript's way.
 * As in JavaScript part of the object inheritance is implemented in only-
 * JavaScript way.
 *
 * @param obj the object to be tested
 * @param clazz the class to be checked
 * @return whether the object is an instance of the class
 */
/* public */
Clazz.instanceOf = function (obj, clazz) {
	if (obj == null) {
		return false; // return clazz == undefined; // should usually false
	}
	if (clazz == null) {
		return false;
	}
	if (obj instanceof clazz) {
		return true;
	} else {
		/*
		 * To check all the inherited interfaces.
		 */
		var clazzName = Clazz.getClassName (obj);
		return Clazz.getInheritedLevel (clazzName, clazz) >= 0;
	}
};

/**
 * Call super method of the class. 
 * The same effect as Java's expression:
 * <code> super.* () </code>
 * 
 * @param objThis host object
 * @param clazzThis class of declaring method scope. It's hard to determine 
 * which super class is right class for "super.*()" call when it's in runtime
 * environment. For example,
 * 1. ClasssA has method #run()
 * 2. ClassB extends ClassA overriding method #run() with "super.run()" call
 * 3. ClassC extends ClassB
 * 4. objC is an instance of ClassC
 * Now we have to decide which super #run() method is to be invoked. Without
 * explicit clazzThis parameter, we only know that objC.getClass() is ClassC 
 * and current method scope is #run(). We do not known we are in scope 
 * ClassA#run() or scope of ClassB#run(). if ClassB is given, Clazz can search
 * all super methods that are before ClassB and get the correct super method.
 * This is the reason why there must be an extra clazzThis parameter.
 * @param funName method name to be called
 * @param funParams Array of method parameters
 */
/* public */
Clazz.superCall = function (objThis, clazzThis, funName, funParams) {
	var fx = null;
	var i = -1;
	var clazzFun = objThis[funName];
	if (clazzFun != null) {
		if (clazzFun.claxxOwner != null) { 
			// claxxOwner is a mark for methods that is single.
			if (clazzFun.claxxOwner !== clazzThis) {
				// This is a single method, call directly!
				fx = clazzFun;
			}
		} else if (clazzFun.stacks == null && !(clazzFun.lastClaxxRef != null
					&& clazzFun.lastClaxxRef.prototype[funName] != null
					&& clazzFun.lastClaxxRef.prototype[funName].stacks != null)) { // super.toString
			fx = clazzFun;
		} else { // normal wrapped method
			var stacks = clazzFun.stacks;
			if (stacks == null) {
				stacks = clazzFun.lastClaxxRef.prototype[funName].stacks;
			}
			var length = stacks.length;
			for (i = length - 1; i >= 0; i--) {
				/*
				 * Once super call is computed precisely, there are no need 
				 * to calculate the inherited level but just an equals
				 * comparision
				 */
				//var level = Clazz.getInheritedLevel (clazzThis, stacks[i]);
				if (clazzThis === stacks[i]) { // level == 0
					if (i > 0) {
						i--;
						fx = stacks[i].prototype[funName];
					} else {
						/*
						 * Will this case be reachable?
						 * March 4, 2006
						 * Should never reach here if all things are converted
						 * by Java2Script
						 */
						fx = stacks[0].prototype[funName]["\\unknown"];
					}
					break;
				} else if (Clazz.getInheritedLevel (clazzThis, 
						stacks[i]) > 0) {
					fx = stacks[i].prototype[funName];
					break;
				}
			} // end of for loop
		} // end of normal wrapped method
	} // end of clazzFun != null
	if (fx != null) {
		/* there are members which are initialized out of the constructor */
		/*if (i == -1) {
			// unreachable
			//var oo = clazzFun.claxxOwner;
			//if (oo.superClazz == null && oo.con$truct != null) {
			//	clazzFun.claxxOwner.con$truct.apply (objThis, []);
			//}
		} else */if (i == 0 && funName == "construct") {
			var ss = clazzFun.stacks;
			if (ss != null && ss[0].superClazz == null
					&& ss[0].con$truct != null) {
				ss[0].con$truct.apply (objThis, []);
			}
		}
		/*# {$no.debug.support} >>x #*/
		if (Clazz.tracingCalling) {
			var caller = arguments.callee.caller;
			if (caller === Clazz.superConstructor) {
				caller = caller.arguments.callee.caller;
			}
			Clazz.pu$hCalling (new Clazz.callingStack (caller, clazzThis));
			var ret = fx.apply (objThis, (funParams == null) ? [] : funParams);
			Clazz.p0pCalling ();
			return ret;
		}
		/*# x<< #*/
		return fx.apply (objThis, (funParams == null) ? [] : funParams);
	} else if (funName == "construct") {
		/* there are members which are initialized out of the constructor */
		/*
		if (i == -1) {
			// should be ignore as there are codes calling con$truct in 
			// #superConstructor
		} else {
			// unreachable
			//var ss = clazzFun.stacks;
			//if (ss != null && ss[0].superClazz == null 
			//		&& ss[0].con$truct != null) {
			//	ss[0].con$truct.apply (objThis, []);
			//}
		}
		*/
		/* No super constructor! */
		return ;
	}
	throw new Clazz.MethodNotFoundException (objThis, clazzThis, funName, 
			Clazz.getParamsType (funParams).typeString);
};

/**
 * Call super constructor of the class. 
 * The same effect as Java's expression: 
 * <code> super () </code>
 */
/* public */
Clazz.superConstructor = function (objThis, clazzThis, funParams) {
	Clazz.superCall (objThis, clazzThis, "construct", funParams);
	/* If there are members which are initialized out of the constructor */
	if (clazzThis.con$truct != null) {
		clazzThis.con$truct.apply (objThis, []);
	}
};

/**
 * Class for null with a given class as to be casted.
 * This class will be used as an implementation of Java's casting way.
 * For example,
 * <code> this.call ((String) null); </code>
 */
/* protcted */
Clazz.CastedNull = function (asClazz) {
	if (asClazz != null) {
		if (asClazz instanceof String) {
			this.clazzName = asClazz;
		} else if (asClazz instanceof Function) {
			this.clazzName = Clazz.getClassName (asClazz, true);
		} else {
			this.clazzName = "" + asClazz;
		}
	} else {
		this.clazzName = "Object";
	}
	this.toString = function () {
		return null;
	};
	this.valueOf = function () {
		return null;
	};
};

/**
 * API for Java's casting null.
 * @see Clazz.CastedNull
 *
 * @param asClazz given class
 * @return an instance of class Clazz.CastedNull
 */
/* public */
Clazz.castNullAs = function (asClazz) {
	return new Clazz.CastedNull (asClazz);
};

/** 
 * MethodException will be used as a signal to notify that the method is
 * not found in the current clazz hierarchy.
 */
/* private */
Clazz.MethodException = function () {
	/*
	this.message = "The static Clazz instance can not found the method!";
	this.toString = function () {
		return this.message;
	};
	*/
};
/* protected */
Clazz.MethodNotFoundException = function () {
	this.toString = function () {
		return "MethodNotFoundException";
	};
};

/* private */
/*x-# getParamsType -> gPT #-x*/
Clazz.getParamsType = function (funParams) {
	var params = new Array ();
	params.hasCastedNull = false;
	if (funParams != null) {
		for (var i = 0; i < funParams.length; i++) {
			params[i] = Clazz.getClassName (funParams[i]);
			if (funParams[i] instanceof Clazz.CastedNull) {
				params.hasCastedNull = true;
			}
		}
	}
	if (params.length == 0) {
		params[0] = "void";
	}
	params.typeString = "\\" + params.join ('\\');
	//params.hasCastedNull = hasCastedNull;
	return params;
};
/**
 * Search the given class prototype, find the method with the same
 * method name and the same parameter signatures by the given 
 * parameters, and then run the method with the given parameters.
 *
 * @param objThis the current host object
 * @param claxxRef the current host object's class
 * @param fxName the method name
 * @param funParams the given arguments
 * @return the result of the specified method of the host object,
 * the return maybe void.
 * @throws Clazz.MethodNotFoundException if no matched method is found
 */
/* protected */
/*-# searchAndExecuteMethod -> saem #-*/
Clazz.searchAndExecuteMethod = function (objThis, claxxRef, fxName, funParams) {
	var params = Clazz.getParamsType (funParams);
	var fx = objThis[fxName];
	/*
	 * Cache last or previous matched method
	 */
	var cached = 0; // 0: no cache; 1: last matched; 2: previous matched
	if (fx.lastParams == params.typeString && fx.lastClaxxRef === claxxRef) {
		cached = 1;
	} else if (fx.prevParams == params.typeString && fx.prevClaxxRef === claxxRef) {
		cached = 2;
	}
	if (cached != 0) {
		var methodParams = null;
		if (params.hasCastedNull) {
			methodParams = new Array ();
			for (var k = 0; k < funParams.length; k++) {
				if (funParams[k] instanceof Clazz.CastedNull) {
					/*
					 * For Clazz.CastedNull instances, the type name is
					 * already used to indentified the method in Clazz#
					 * searchMethod.
					 */
					methodParams[k] = null;
				} else {
					methodParams[k] = funParams[k];
				}
			}
		} else {
			methodParams = funParams;
		}
		if (cached == 1 && fx.lastMethod != null) {
			return fx.lastMethod.apply (objThis, methodParams);
		} else if (cached == 2 && fx.prevMethod != null) {
			var f = fx.prevMethod;
			fx.prevParams = fx.lastParams;
			fx.prevClaxxRef = fx.lastClaxxRef;
			fx.prevMethod = fx.lastMethod;
			fx.lastParams = params.typeString;
			fx.lastClaxxRef = claxxRef;
			fx.lastMethod = f;
			return f.apply (objThis, methodParams);
		} else { // missed default constructor ?
			return ;
		}
	}
	fx.prevParams = fx.lastParams;
	fx.prevClaxxRef = fx.lastClaxxRef;
	fx.lastParams = params.typeString;
	fx.lastClaxxRef = claxxRef;

	var stacks = fx.stacks;
	if (stacks == null) {
		stacks = claxxRef.prototype[fxName].stacks;
	}
	var length = stacks.length;
	/*
	 * Search the inheritance stacks to get the given class' function
	 */
	var began = false; // began to search its super classes
	for (var i = length - 1; i > -1; i--) {
		//if (Clazz.getInheritedLevel (claxxRef, stacks[i]) >= 0) {
		/*
		 * No need to calculate the inherited level as there always exist a 
		 * right claxxRef in the stacks, and the inherited level of stacks
		 * are in order.
		 */
		if (began || stacks[i] === claxxRef) {
			/*
			 * First try to search method within the same class scope
			 * with stacks[i] === claxxRef
			 */
			var clazzFun = stacks[i].prototype[fxName];
			
			var ret = Clazz.tryToSearchAndExecute (objThis, clazzFun, params, 
					funParams/*, isSuper, clazzThis*/, fx);
			if (!(ret instanceof Clazz.MethodException)) {
				return ret;
			}
			/*
			 * As there are no such methods in current class, Clazz will try 
			 * to search its super class stacks. Here variable began indicates
			 * that super searchi is began, and there is no need checking
			 * <code>stacks[i] === claxxRef</code>
			 */
			began = true; 
		} // end of if
	} // end of for
	if ("construct" == fxName) {
		/*
		 * For non existed constructors, just return without throwing
		 * exceptions. In Java codes, extending Object can call super
		 * default Object#constructor, which is not defined in JS.
		 */
		return ;
	}
	// TODO: should be java.lang.NoSuchMethodException
	throw new Clazz.MethodNotFoundException (objThis, claxxRef, 
			fxName, params.typeString);
};

/*
 * Internet Explorer will result the following expression as 1, while the
 * other browser will have result of 2.
 * Consider IE will take extra CPU times on #substring(1) method, the
 * following variable is used to make optimization.
 */
/* private */
Clazz.ie$plit = "\\2".split (/\\/).length == 1;

/*# {$no.debug.support} >>x #*/
Clazz.tracingCalling = false;
/*# x<< #*/

/* private */
/*-# tryToSearchAndExecute -> tsae #-*/
Clazz.tryToSearchAndExecute = function (objThis, clazzFun, params, funParams/*, 
		isSuper, clazzThis*/, fx) {
	var methods = new Array ();
	//var xfparams = null;
	var generic = true;
	for (var fn in clazzFun) {
		//if (fn.indexOf ('\\') == 0) {
		if (fn.charCodeAt (0) == 92) { // 92 == '\\'.charCodeAt (0)
			var ps = (Clazz.ie$plit ? fn : fn.substring (1)).split (/\\/);
			if (ps.length == params.length) {
				methods[methods.length] = ps;
			}
			generic = false;
			continue;
		}
		/*
		 * When there are only one method in the class, use the funParams
		 * to identify the parameter type.
		 *
		 * AbstractCollection.remove (Object)
		 * AbstractList.remove (int)
		 * ArrayList.remove (int)
		 *
		 * Then calling #remove (Object) method on ArrayList instance will 
		 * need to search up to the AbstractCollection.remove (Object),
		 * which contains only one method.
		 */
		/*
		 * See Clazz#defineMethod --Mar 10, 2006, josson
		 */
		if (generic && fn == "funParams" && clazzFun.funParams != null) {
			//xfparams = clazzFun.funParams;
			fn = clazzFun.funParams;
			var ps = (Clazz.ie$plit ? fn : fn.substring (1)).split (/\\/);
			if (ps.length == params.length) {
				methods[0] = ps;
			}
			break;
		}
	}
	if (methods.length == 0) {
		//throw new Clazz.MethodException ();
		return new Clazz.MethodException ();
	}
	//if (methods.length == 0 && xfparams != null) {
	//	methods[0] = xfparams.substring (1);
	//}
	var method = Clazz.searchMethod (methods, params);
	if (method != null) {
		var f = null;
		if (generic) { /* Use the generic method */
			/*
			 * Will this case be reachable?
			 * March 4, 2006 josson
			 * 
			 * Reachable for calling #remove (Object) method on 
			 * ArrayList instance
			 * May 5, 2006 josson
			 */
			f = clazzFun; // call it directly
		} else {
			f = clazzFun["\\" + method];
		}
		//if (f != null) { // always not null
			var methodParams = null;
			if (params.hasCastedNull) {
				methodParams = new Array ();
				for (var k = 0; k < funParams.length; k++) {
					if (funParams[k] instanceof Clazz.CastedNull) {
						/*
						 * For Clazz.CastedNull instances, the type name is
						 * already used to indentified the method in Clazz#
						 * searchMethod.
						 */
						methodParams[k] = null;
					} else {
						methodParams[k] = funParams[k];
					}
				}
			} else {
				methodParams = funParams;
			}
			/*# {$no.debug.support} >>x #*/
			if (Clazz.tracingCalling) {
				var caller = arguments.callee.caller; // SAEM
				caller = caller.arguments.callee.caller; // Delegating
				caller = caller.arguments.callee.caller; 
				var xpushed = f.exName == "construct" 
						&& Clazz.getInheritedLevel (f.exClazz, Throwable) >= 0
						&& !Clazz.initializingException;
				if (xpushed) {
					Clazz.initializingException = true;
					// constructor is wrapped
					var xcaller = caller.arguments.callee.caller // Delegate
							.arguments.callee.caller; // last method
					var fun = xcaller.arguments.callee;
					var owner = fun.claxxReference;
					if (owner == null) {
						owner = fun.exClazz;
					}
					if (owner == null) {
						owner = fun.claxxOwner;
					}
					/*
					 * Keep the environment that Throwable instance is created
					 */
					Clazz.pu$hCalling (new Clazz.callingStack (xcaller, owner));
				}
				
				var noInnerWrapper = caller !== Clazz.instantialize 
						&& caller !== Clazz.superCall;
				if (noInnerWrapper) {
					var fun = caller.arguments.callee;
					var owner = fun.claxxReference;
					if (owner == null) {
						owner = fun.exClazz;
					}
					if (owner == null) {
						owner = fun.claxxOwner;
					}
					Clazz.pu$hCalling (new Clazz.callingStack (caller, owner));
				}
				fx.prevMethod = fx.lastMethod;
				fx.lastMethod = f;
				var ret = f.apply (objThis, methodParams);
				if (noInnerWrapper) {
					Clazz.p0pCalling ();
				}
				if (xpushed) {
					Clazz.p0pCalling ();
				}
				return ret;
			}
			/*# x<< #*/
			fx.prevMethod = fx.lastMethod;
			fx.lastMethod = f;
			return f.apply (objThis, methodParams);
		//}
	}
	//throw new Clazz.MethodException ();
	return new Clazz.MethodException ();
};

/*# {$no.debug.support} >>x #*/
Clazz.initializingException = false;
/*# x<< #*/

/**
 * Search the existed polymorphic methods to get the matched method with
 * the given parameter types.
 *
 * @param existedMethods Array of string which contains method parameters
 * @param paramTypes Array of string that is parameter type.
 * @return string of method parameters seperated by "\\"
 */
/* private */
/*-# 
 # searchMethod -> sM 
 #
 # roundOne -> rO
 # paramTypes -> pts
 #-*/
Clazz.searchMethod = function (roundOne, paramTypes) {
	/*
	var roundOne = new Array ();
	for (var i = 0; i < existedMethods.length; i++) {
		var split = existedMethods[i].split (/\\/);
		if (split.length == paramTypes.length) {
			roundOne[roundOne.length] = split;
		}
	}
	if (roundOne.length == 0) {
		return null;
	}
	var resultOne = roundOne;
	*/
	//var roundOne = existedMethods;
	/*
	 * Filter out all the fitted methods for the given parameters
	 */
	/*-# roundTwo -> rT #-*/
	var roundTwo = new Array ();
	for (var i = 0; i < roundOne.length; i++) {
		/*-# fittedLevel -> fL #-*/
		var fittedLevel = new Array ();
		var isFitted = true;
		for (var j = 0; j < roundOne[i].length; j++) {
			fittedLevel[j] = Clazz.getInheritedLevel (paramTypes[j], 
					roundOne[i][j]);
			if (fittedLevel[j] < 0) {
				isFitted = false;
				break;
			}
		}
		if (isFitted) {
			fittedLevel[paramTypes.length] = i; // Keep index for later use
			roundTwo[roundTwo.length] = fittedLevel;
		}
	}
	if (roundTwo.length == 0) {
		return null;
	}
	/*
	 * Find out the best method according to the inheritance.
	 */
	/*-# resultTwo -> rtT #-*/
	var resultTwo = roundTwo;
	var min = resultTwo[0];
	for (var i = 1; i < resultTwo.length; i++) {
		/*-# isVectorLesser -> vl #-*/
		var isVectorLesser = true;
		for (var j = 0; j < paramTypes.length; j++) {
			if (min[j] < resultTwo[i][j]) {
				isVectorLesser = false;;
				break;
			}
		}
		if (isVectorLesser) {
			min = resultTwo[i];
		}
	}
	var index = min[paramTypes.length]; // Get the previously stored index
	/*
	 * Return the method parameters' type string as indentifier of the
	 * choosen method.
	 */
	return roundOne[index].join ('\\');
};

/**
 * Generate delegating function for the given method name.
 *
 * @param claxxRef the specified class for the method
 * @funName method name of the specified method
 * @return the method delegate which will try to search the method
 * from the given class by the parameters
 */
/* private */
/*-# generateDelegatingMethod -> gDM #-*/
Clazz.generateDelegatingMethod = function (claxxRef, funName) {
	/*
	 * Delegating method.
	 * Each time the following expression will generate a new 
	 * function object.
	 */
	var delegating = function () {
			var r = arguments;
			return SAEM (this, r.callee.claxxReference, r.callee.methodName, r);
	};
	delegating.methodName = funName;
	delegating.claxxReference = claxxRef;
	return delegating;
};

SAEM = Clazz.searchAndExecuteMethod;

/* private */
Clazz.expExpandParameters = function ($0, $1) {
	if ($1 == 'N') {
		return "Number";
	} else if ($1 == 'B') {
		return "Boolean"
	} else if ($1 == 'S') {
		return "String";
	} else if ($1 == 'O') {
		return "Object";
	} else if ($1 == 'A') {
		return "Array"
	}
	return "Unknown";
};

/*
 * Other developers may need to extend this formatParameters method
 * to deal complicated situation.
 */
/* protected */
Clazz.formatParameters = function (funParams) {
	if (funParams == null || funParams.length == 0) {
		return "\\void";
	} else {
		/* 
		 * If funParams is Array, funParams.toString() will
		 * also return "*,*,..." string.
		 */
		var s = funParams; //.toString (); // Google Chrome v8native.js error
		s = s.replace (/~([NABSO])/g, Clazz.expExpandParameters);
		return s.replace (/\s+/g, "").replace (/^|,/g, "\\")
				.replace (/\$/g, "org.eclipse.s");
	}
};

/*
 * Override the existed methods which are in the same name.
 * Overriding methods is provided for the purpose that the JavaScript
 * does not need to search the whole hierarchied methods to find the
 * correct method to execute.
 * Be cautious about this method. Incorrectly using this method may
 * break the inheritance system.
 *
 * @param clazzThis host class in which the method to be defined
 * @param funName method name
 * @param funBody function object, e.g function () { ... }
 * @param funParams paramether signature, e.g ["string", "number"]
 */
/* public */
Clazz.overrideMethod = function (clazzThis, funName, funBody, funParams) {
	if (Clazz.assureInnerClass) Clazz.assureInnerClass (clazzThis, funBody);
	funBody.exName = funName;
	var fpName = Clazz.formatParameters (funParams);
	/*
	 * Replace old methods with new method. No super methods are kept.
	 */
	funBody.funParams = fpName; 
	funBody.claxxOwner = clazzThis;
	clazzThis.prototype[funName] = funBody;
	return funBody;
};

/*
 * Define method for the class with the given method name and method
 * body and method parameter signature.
 *
 * @param clazzThis host class in which the method to be defined
 * @param funName method name
 * @param funBody function object, e.g function () { ... }
 * @param funParams paramether signature, e.g ["string", "number"]
 * @return method of the given name. The method may be funBody or a wrapper
 * of the given funBody.
 */
/* public */
Clazz.defineMethod = function (clazzThis, funName, funBody, funParams) {
	if (Clazz.assureInnerClass) Clazz.assureInnerClass (clazzThis, funBody);
	funBody.exName = funName;
	var fpName = Clazz.formatParameters (funParams);
	/*
	 * For method the first time is defined, just keep it rather than
	 * wrapping into deep hierarchies!
	 */
	var f$ = clazzThis.prototype[funName];
	if (f$ == null || (f$.claxxOwner === clazzThis
			&& f$.funParams == fpName)) {
		// property "funParams" will be used as a mark of only-one method
		funBody.funParams = fpName; 
		funBody.claxxOwner = clazzThis;
		clazzThis.prototype[funName] = funBody;
		funBody.exClazz = clazzThis; // make it traceable
		return funBody;
	}
	var oldFun = null;
	var oldStacks = new Array ();
	//if (f$ != null) {
		if (f$.stacks == null) {
			/* method is not defined by Clazz.defineMethod () */
			oldFun = f$;
			if (f$.claxxOwner != null) {
				oldStacks[0] = oldFun.claxxOwner;
			}
		} else {
			oldStacks = f$.stacks;
		}
	//}
	
	//if (oldFun != null && oldFun.claxxOwner != null) {
		// oldFun is not defined by Clazz.defineMethod
		
		/*
		 * oldStacks should be "new Array ()";
		 */
		/*
		 * Here try to fix up the method into Clazz compatiable.
		 */
		//oldStacks[0] = oldFun.claxxOwner;
		/*
		if (oldFun.claxxOwner !== clazzThis) {
			if ("releaseChild" == funName) {
				error (" in here ");
			}
			oldFun.claxxOwner.prototype[funName].stacks = oldStacks;
			oldFun.claxxOwner.prototype[funName] = Clazz
					.generateDelegatingMethod (oldFun.claxxOwner, funName);
			oldFun.claxxOwner.prototype[funName][oldFun.funParams] = oldFun;
			oldFun.claxxOwner = null;
			oldFun.funParams = null;
			oldFun = null;
		}
		//*/
	//}
	/*
	 * Method that is already defined in super class will be overriden
	 * with a new proxy method with class hierarchy stored in a stack.
	 * That is to say, the super methods are lost in this class' proxy
	 * method. 
	 * When method are being called, methods defined in the new proxy 
	 * method will be searched through first. And if no method fitted,
	 * it will then try to search method in the super class stacks.
	 */
	/* method has not been defined yet */
	/* method is not defined by Clazz.defineMethod () */
	/* method is defined in super class */
	if (/*f$ == null 
			|| */f$.stacks == null 
			|| f$.claxxReference !== clazzThis) {
		/*
		 * Generate a new delegating method for the class
		 */
		f$ = clazzThis.prototype[funName] = Clazz
				.generateDelegatingMethod (clazzThis, funName);
		/*
		 * Keep the class inheritance stacks
		 */
		var arr = new Array ();
		for (var i = 0; i < oldStacks.length; i++) {
			arr[i] = oldStacks[i];
		}
		f$.stacks = arr;
	}
	var ss = f$.stacks;

	if (ss.length == 0/* || ss[ss.length - 1] !== clazzThis*/) {
		ss[ss.length] = clazzThis;
	} else {
		var existed = false;
		for (var i = ss.length - 1; i >= 0; i--) {
			if (ss[i] === clazzThis) {
				existed = true;
				break;
			}
		}
		if (!existed) {
			ss[ss.length] = clazzThis;
		}
	}

	if (oldFun != null) {
		if (oldFun.claxxOwner === clazzThis) {
			f$[oldFun.funParams] = oldFun;
			oldFun.claxxOwner = null;
			// property "funParams" will be used as a mark of only-one method
			oldFun.funParams = null; // null ? safe ? // safe for " != null"
		} else if (oldFun.claxxOwner == null) {
			/*
			 * The function is not defined Clazz.defineMethod ().
			 * Try to fixup the method ...
			 * As a matter of lost method information, I just suppose
			 * the method to be fixed is with void parameter!
			 */
			f$["\\unknown"] = oldFun;
		}
	}
	funBody.exClazz = clazzThis; // make it traceable
	f$[fpName] = funBody;
	return f$;
};

/**
 * Make constructor for the class with the given function body and parameters
 * signature.
 * 
 * @param clazzThis host class
 * @param funBody constructor body
 * @param funParams constructor parameters signature
 */
/* public */
Clazz.makeConstructor = function (clazzThis, funBody, funParams) {
	Clazz.defineMethod (clazzThis, "construct", funBody, funParams);
	if (clazzThis.con$truct != null) {
		clazzThis.con$truct.index = clazzThis.con$truct.stacks.length;
	}
	//clazzThis.con$truct = clazzThis.prototype.con$truct = null;
};

/**
 * Override constructor for the class with the given function body and
 * parameters signature.
 * 
 * @param clazzThis host class
 * @param funBody constructor body
 * @param funParams constructor parameters signature
 */
/* public */
Clazz.overrideConstructor = function (clazzThis, funBody, funParams) {
	Clazz.overrideMethod (clazzThis, "construct", funBody, funParams);
	if (clazzThis.con$truct != null) {
		clazzThis.con$truct.index = clazzThis.con$truct.stacks.length;
	}
	//clazzThis.con$truct = clazzThis.prototype.con$truct = null;
};

/*
 * all root packages. e.g. java.*, org.*, com.*
 */
/* protected */
Clazz.allPackage = new Object ();

/**
 * Will be used to keep value of whether the class is defined or not.
 */
/* protected */
Clazz.allClasses = new Object ();

Clazz.lastPackageName = null;
Clazz.lastPackage = null;

/* protected */
Clazz.unloadedClasses = new Array ();

/* public */
Clazz.isClassUnloaded = function (clzz) {
	var thisClassName = Clazz.getClassName (clzz, true);
	return Clazz.unloadedClasses[thisClassName] != null;
};

/* public */
Clazz.declarePackage = function (pkgName) {
	if (Clazz.lastPackageName == pkgName) {
		return Clazz.lastPackage;
	}
	if (pkgName != null && pkgName.length != 0) {
		var pkgFrags = pkgName.split (/\./);
		var pkg = Clazz.allPackage;
		for (var i = 0; i < pkgFrags.length; i++) {
			if (pkg[pkgFrags[i]] == null) {
				pkg[pkgFrags[i]] = { 
					__PKG_NAME__ : ((pkg.__PKG_NAME__ != null) ? 
						pkg.__PKG_NAME__ + "." + pkgFrags[i] : pkgFrags[i])
				}; 
				// pkg[pkgFrags[i]] = new Object ();
				if (i == 0) {
					// eval ...
					window[pkgFrags[i]] = pkg[pkgFrags[i]];
				}
			}
			pkg = pkg[pkgFrags[i]]
		}
		Clazz.lastPackageName = pkgName;
		Clazz.lastPackage = pkg;
		return pkg;
	}
};

/* protected */
/*x-# evalType -> eT  #-x*/
Clazz.evalType = function (typeStr, isQualified) {
	//*
	var idx = typeStr.lastIndexOf (".");
	if (idx != -1) {
		var pkgName = typeStr.substring (0, idx);
		var pkg = Clazz.declarePackage (pkgName);
		var clazzName = typeStr.substring (idx + 1);
		return pkg[clazzName];
	//*/
	/*
	var frags = typeStr.split (/\./);
	if (frags.length > 1)  {
		var type = Clazz.allPackage[frags[0]];
		for (var i = 1; i < frags.length; i++) {
			type = type[frags[i]];
		}
		return type;
	*/
	} else if (isQualified) {
		return window[typeStr];
	} else if (typeStr == "number") {
		return Number;
	} else if (typeStr == "object") {
		return JavaObject;
	} else if (typeStr == "string") {
		return String;
	} else if (typeStr == "boolean") {
		return Boolean;
	} else if (typeStr == "function") {
		return Function;
	} else if (typeStr == "void" || typeStr == "undefined"
			|| typeStr == "unknown") {
		return typeStr;
	} else if (typeStr == "NullObject") {
		return NullObject;
	} else {
		return window[typeStr];
	}
};

/**
 * Define a class or interface.
 *
 * @param qClazzName String presents the qualified name of the class
 * @param clazzFun Function of the body
 * @param clazzParent Clazz to inherit from, may be null
 * @param interfacez Clazz may implement one or many interfaces
 *   interfacez can be Clazz object or Array of Clazz objects.
 * @return Ruturn the modified Clazz object
 */
/* public */
Clazz.defineType = function (qClazzName, clazzFun, clazzParent, interfacez) {
	var cf = Clazz.unloadedClasses[qClazzName];
	if (cf != null) {
		clazzFun = cf;
	}
	var idx = qClazzName.lastIndexOf (".");
	if (idx != -1) {
		var pkgName = qClazzName.substring (0, idx);
		var pkg = Clazz.declarePackage (pkgName);
		var clazzName = qClazzName.substring (idx + 1);
		if (pkg[clazzName] != null) {
			// already defined! Should throw exception!
			return pkg[clazzName];
		}
		pkg[clazzName] = clazzFun;
	} else {
		if (window[qClazzName] != null) {
			// already defined! Should throw exception!
			return window[qClazzName];
		}
		window[qClazzName] = clazzFun;
	}
	Clazz.decorateAsType (clazzFun, qClazzName, clazzParent, interfacez);
	/*# {$no.javascript.support} >>x #*/
	var iFun = Clazz.innerFunctions;
	clazzFun.defineMethod = iFun.defineMethod;
	clazzFun.defineStaticMethod = iFun.defineStaticMethod;
	clazzFun.makeConstructor = iFun.makeConstructor;
	/*# x<< #*/
	return clazzFun;
};

Clazz.isSafari = (navigator.userAgent.indexOf ("Safari") != -1);
Clazz.isSafari4Plus = false;
if (Clazz.isSafari) {
	var ua = navigator.userAgent;
	var verIdx = ua.indexOf ("Version/");
	if (verIdx  != -1) {
		var verStr = ua.substring (verIdx + 8);
		var verNumber = parseFloat (verStr);
		Clazz.isSafari4Plus = verNumber >= 4.0;
	}
}

/* protected */
Clazz.instantialize = function (objThis, args) {
	if (args != null && args.length == 1 && args[0] != null 
			&& args[0] instanceof Clazz.args4InheritClass) {
		return ;
	}
	/*
	if (objThis.con$truct != null) {
		objThis.con$truct.apply (objThis, args);
	}
	if (objThis.construct != null) {
		objThis.construct.apply (objThis, args);
	}
	*/
	if (objThis instanceof Number) {
		objThis.valueOf = function () {
			return this;
		};
	}
	if (Clazz.isSafari4Plus) { // Fix bug of Safari 4.0+'s over-optimization
		var argsClone = new Array ();
		for (var k = 0; k < args.length; k++) {
			argsClone[k] = args[k];
		}
		args = argsClone;
	}
	var c = objThis.construct;
	if (c != null) {
		if (objThis.con$truct == null) { // no need to init fields
			c.apply (objThis, args);
		} else if (objThis.getClass ().superClazz == null) { // the base class
			objThis.con$truct.apply (objThis, []);
			c.apply (objThis, args);
		} else if ((c.claxxOwner != null 
				&& c.claxxOwner === objThis.getClass ())
				|| (c.stacks != null 
				&& c.stacks[c.stacks.length - 1] == objThis.getClass ())) {
			/*
			 * This #construct is defined by this class itself.
			 * #construct will call Clazz.superConstructor, which will
			 * call #con$truct back
			 */
			c.apply (objThis, args);
		} else { // constructor is a super constructor
			if (c.claxxOwner != null && c.claxxOwner.superClazz == null 
						&& c.claxxOwner.con$truct != null) {
				c.claxxOwner.con$truct.apply (objThis, []);
			} else if (c.stacks != null && c.stacks.length == 1
					&& c.stacks[0].superClazz == null) {
				c.stacks[0].con$truct.apply (objThis, []);
			}
			c.apply (objThis, args);
			objThis.con$truct.apply (objThis, []);
		}
	} else if (objThis.con$truct != null) {
		objThis.con$truct.apply (objThis, []);
	}
};

/**
 * Once there are other methods registered to the Function.prototype, 
 * those method names should be add to the following Array.
 */
/*
 * static final member of interface may be a class, which may
 * be function.
 */
/* protected */
/*-# innerFunctionNames -> iFN #-*/
Clazz.innerFunctionNames = [
	"equals", "hashCode", "toString", "getName", "getClassLoader", "getResourceAsStream" /*# {$no.javascript.support} >>x #*/, "defineMethod", "defineStaticMethod",
	"makeConstructor" /*# x<< #*/
];

/*
 * Static methods
 */
/*x-# innerFunctions -> inF #-x*/
Clazz.innerFunctions = {
	/*
	 * Similar to Object#equals
	 */
	equals : function (aFun) {
		return this === aFun;
	},

	hashCode : function () {
		return this.getName ().hashCode ();
	},

	toString : function () {
		return "class " + this.getName ();
	},
	
	/*
	 * Similar to Class#getName
	 */
	getName : function () {
		return Clazz.getClassName (this, true);
	},

	getClassLoader : function () {
		var clazzName = this.__CLASS_NAME__;
		var baseFolder = ClazzLoader.getClasspathFor (clazzName);
		var x = baseFolder.lastIndexOf (clazzName.replace (/\./g, "/"));
		if (x != -1) {
			baseFolder = baseFolder.substring (0, x);
		} else {
			baseFolder = ClazzLoader.getClasspathFor (clazzName, true);
		}
		var loader = ClassLoader.requireLoaderByBase (baseFolder);
		loader.getResourceAsStream = Clazz.innerFunctions.getResourceAsStream;
		return loader;
	},

	getResourceAsStream : function (name) {
		var is = null;
		if (name == null) {
			return is;
		}
		if (java.io.InputStream != null) {
			is = new java.io.InputStream ();
		} else {
			is = new JavaObject ();
			is.__CLASS_NAME__ = "java.io.InputStream";
			is.close = NullObject; // function () {};
		}
		is.read = function () { return 0; };
		name = name.replace (/\\/g, '/');
		/*-# baseFolder -> bFr #-*/
		var baseFolder = null;
		var clazzName = this.__CLASS_NAME__;
		if (arguments.length == 2 && name.indexOf ('/') != 0) { // additional argument
			name = "/" + name;
		}
		if (name.indexOf ('/') == 0) {
			//is.url = name.substring (1);
			if (arguments.length == 2) { // additional argument
				baseFolder = arguments[1];
				if (baseFolder == null) {
					baseFolder = ClazzLoader.binaryFolders[0];
				}
			} else if (window["ClazzLoader"] != null) {
				baseFolder = ClazzLoader.getClasspathFor (clazzName, true);
			}
			if (baseFolder == null || baseFolder.length == 0) {
				is.url = name.substring (1);
			} else {
				baseFolder = baseFolder.replace (/\\/g, '/');
				var length = baseFolder.length;
				var lastChar = baseFolder.charAt (length - 1);
				if (lastChar != '/') {
					baseFolder += "/";
				}
				is.url = baseFolder + name.substring (1);
			}
		} else {
			if (this.base != null) {
				baseFolder = this.base;
			} else if (window["ClazzLoader"] != null) {
				baseFolder = ClazzLoader.getClasspathFor (clazzName);
				var x = baseFolder.lastIndexOf (clazzName.replace (/\./g, "/"));
				if (x != -1) {
					baseFolder = baseFolder.substring (0, x);
				} else {
					//baseFolder = null;
					var y = -1;
					if (baseFolder.indexOf (".z.js") == baseFolder.length - 5
							&& (y = baseFolder.lastIndexOf ("/")) != -1) {
						baseFolder = baseFolder.substring (0, y + 1);
						var pkgs = clazzName.split (/\./);
						for (var k = 1; k < pkgs.length; k++) {
							var pkgURL = "/";
							for (var j = 0; j < k; j++) {
								pkgURL += pkgs[j] + "/";
							}
							if (pkgURL.length > baseFolder.length) {
								break;
							}
							if (baseFolder.indexOf (pkgURL) == baseFolder.length - pkgURL.length) {
								baseFolder = baseFolder.substring (0, baseFolder.length - pkgURL.length + 1);
								break;
							}
						}
					} else {
						baseFolder = ClazzLoader.getClasspathFor (clazzName, true);
					}
				}
			} else {
				var bins = Clazz.binaryFolders;
				if (bins != null && bins.length != 0) {
					baseFolder = bins[0];
				}
			}
			if (baseFolder == null || baseFolder.length == 0) {
				baseFolder = "bin/";
			}
			baseFolder = baseFolder.replace (/\\/g, '/');
			var length = baseFolder.length;
			var lastChar = baseFolder.charAt (length - 1);
			if (lastChar != '/') {
				baseFolder += "/";
			}
			/*
			 * FIXME: bug here for "/"
			 */
			//if (baseFolder.indexOf ('/') == 0) {
			//	baseFolder = baseFolder.substring (1);
			//}
			if (this.base != null) {
				is.url = baseFolder + name;
			} else {
				var idx = clazzName.lastIndexOf ('.');
				if (idx == -1 || this.base != null) {
					is.url = baseFolder + name;
				} else {
					is.url = baseFolder + clazzName.substring (0, idx)
							.replace (/\./g, '/') +  "/" + name;
				}
			}
		}
		return is;
	}/*# {$no.javascript.support} >>x #*/,
	
	/*
	 * For JavaScript programmers
	 */
	defineMethod : function (methodName, funBody, paramTypes) {
		Clazz.defineMethod (this, methodName, funBody, paramTypes);
	},

	/*
	 * For JavaScript programmers
	 */
	defineStaticMethod : function (methodName, funBody, paramTypes) {
		Clazz.defineMethod (this, methodName, funBody, paramTypes);
		this[methodName] = this.prototype[methodName];
	},
	
	/*
	 * For JavaScript programmers
	 */
	makeConstructor : function (funBody, paramTypes) {
		Clazz.makeConstructor (this, funBody, paramTypes);
	}
	/*# x<< #*/
};

/* private */
/*-# decorateFunction -> dF #-*/
Clazz.decorateFunction = function (clazzFun, prefix, name) {
	if (window["ClazzLoader"] != null) {
		//alert ("decorate " + name);
		ClazzLoader.checkInteractive ();
	}
	var qName = null;
	if (prefix == null) {
		// e.g. Clazz.declareInterface (null, "ICorePlugin", 
		//		org.eclipse.ui.IPlugin);
		qName = name;
		window[name] = clazzFun;
	} else if (prefix.__PKG_NAME__ != null) {
		// e.g. Clazz.declareInterface (org.eclipse.ui, "ICorePlugin", 
		//		org.eclipse.ui.IPlugin);
		qName = prefix.__PKG_NAME__ + "." + name;
		prefix[name] = clazzFun;
		if (prefix === java.lang) {
			window[name] = clazzFun;
		}
	} else {
		// e.g. Clazz.declareInterface (org.eclipse.ui.Plugin, "ICorePlugin", 
		//		org.eclipse.ui.IPlugin);
		qName = prefix.__CLASS_NAME__ + "." + name;
		prefix[name] = clazzFun;
	}
	clazzFun.__CLASS_NAME__ = qName;
	if (Clazz.supportsNativeObject) {
		for (var i = 0; i < Clazz.extendedObjectMethods.length; i++) {
			var p = Clazz.extendedObjectMethods[i];
			clazzFun.prototype[p] = JavaObject.prototype[p];
		}
	}
	clazzFun.prototype.__CLASS_NAME__ = qName;
	/*
	clazzFun.equals = Clazz.innerFunctions.equals;
	clazzFun.getName = Clazz.innerFunctions.getName;
	clazzFun.getResourceAsStream = Clazz.innerFunctions.getResourceAsStream;
	*/
	var inF = Clazz.innerFunctionNames;
	for (var i = 0; i < inF.length; i++) {
		clazzFun[inF[i]] = Clazz.innerFunctions[inF[i]];
	}

	if (window["ClazzLoader"] != null) {
		/*-# findClass -> fC #-*/
		var node = ClazzLoader.findClass (qName);
		/*-#
		 # ClazzNode.STATUS_KNOWN -> 1
		 #-*/
		if (node != null && node.status == ClazzNode.STATUS_KNOWN) {
			/*-# 
			 # updateNode -> uN 
			 #-*/
			window.setTimeout((function(nnn) {
				return function() {
					ClazzLoader.updateNode (nnn);
				};
			})(node), 1);
			/*
			 * #updateNode should be delayed! Or the class itself won't
			 * be initialized completely before marking itself as loaded.
			 */
			// ClazzLoader.updateNode (node);
		}
	}
};

/* proected */
Clazz.declareInterface = function (prefix, name, interfacez) {
	var clazzFun = function () {};
	Clazz.decorateFunction (clazzFun, prefix, name);
	if (interfacez != null) {
		Clazz.implementOf (clazzFun, interfacez);
	}
	return clazzFun;
};

/* protected */
/*-# 
 # parentClazzInstance -> pi
 # clazzParent -> pc
 #-*/
Clazz.decorateAsClass = function (clazzFun, prefix, name, clazzParent, 
		interfacez, parentClazzInstance) {
	var prefixName = null;
	if (prefix != null) {
		prefixName = prefix.__PKG_NAME__;
		if (prefixName == null) {
			prefixName = prefix.__CLASS_NAME__;
		}
	}
	var qName = (prefixName == null ? "" : prefixName + ".") + name;
	var cf = Clazz.unloadedClasses[qName];
	if (cf != null) {
		clazzFun = cf;
	}
	var qName = null;
	Clazz.decorateFunction (clazzFun, prefix, name);
	if (parentClazzInstance != null) {
		Clazz.inheritClass (clazzFun, clazzParent, parentClazzInstance);
	} else if (clazzParent != null) {
		Clazz.inheritClass (clazzFun, clazzParent);
	}
	if (interfacez != null) {
		Clazz.implementOf (clazzFun, interfacez);
	}
	return clazzFun;
};

/* public */
Clazz.declareType = function (prefix, name, clazzParent, interfacez, 
		parentClazzInstance) {
	var f = function () {
		Clazz.instantialize (this, arguments);
	};
	return Clazz.decorateAsClass (f, prefix, name, clazzParent, interfacez, 
			parentClazzInstance);
};

/* public */
Clazz.declareAnonymous = function (prefix, name, clazzParent, interfacez, 
		parentClazzInstance) {
	var f = function () {
		Clazz.prepareCallback (this, arguments);
		Clazz.instantialize (this, arguments);
	};
	return Clazz.decorateAsClass (f, prefix, name, clazzParent, interfacez, 
			parentClazzInstance);
};

/* protected */
Clazz.decorateAsType = function (clazzFun, qClazzName, clazzParent, 
		interfacez, parentClazzInstance, inheritClazzFuns) {
	clazzFun.__CLASS_NAME__ = qClazzName;
	if (Clazz.supportsNativeObject) {
		for (var i = 0; i < Clazz.extendedObjectMethods.length; i++) {
			var p = Clazz.extendedObjectMethods[i];
			clazzFun.prototype[p] = JavaObject.prototype[p];
		}
	}
	//if (qClazzName != "String" && qClazzName != "Object"
	//		&& qClazzName != "Number" && qClazzName != "Date") {
		clazzFun.prototype.__CLASS_NAME__ = qClazzName;
	//}
	clazzFun.equals = Clazz.innerFunctions.equals;
	clazzFun.getName = Clazz.innerFunctions.getName;
	if (inheritClazzFuns) {
		for (var i = 0; i < Clazz.innerFunctionNames.length; i++) {
			var methodName = Clazz.innerFunctionNames[i];
			clazzFun[methodName] = Clazz.innerFunctions[methodName];
		}
	}
	if (parentClazzInstance != null) {
		Clazz.inheritClass (clazzFun, clazzParent, parentClazzInstance);
	} else if (clazzParent != null) {
		Clazz.inheritClass (clazzFun, clazzParent);
	}
	if (interfacez != null) {
		Clazz.implementOf (clazzFun, interfacez);
	}
	return clazzFun;
};

/* sgurin: native exception detection mechanism. Only NullPointerException detected and wrapped to java excepions */
/** private utility method for creating a general regexp that can be used later  
 * for detecting a certain kind of native exceptions. use with error messages like "blabla IDENTIFIER blabla"
 * @param msg String - the error message
 * @param spliterName String, must be contained once in msg
 * spliterRegex String, a string with the regexp literal for identifying the spitter in exception further error messages.
 */
Clazz._ex_reg=function (msg, spliterName, spliterRegex) {
	if(!spliterRegex) 
		spliterRegex="[^\\s]+";	
	var idx = msg.indexOf (spliterName), 
		str = msg.substring (0, idx) + spliterRegex + msg.substring(idx + spliterName.length), 
		regexp = new RegExp("^"+str+"$");
	return regexp;
};
// reproduce NullPointerException for knowing how to detect them, and create detector function Clazz._isNPEExceptionPredicate
var $$o$$ = null;
try {
	$$o$$.hello ();
} catch (e) {
	if(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {// opera throws an exception with fixed messages like "Statement on line 23: Cannot convert undefined or null to Object Backtrace: Line....long text... " 
		var idx1 = e.message.indexOf(":"), idx2 = e.message.indexOf(":", idx1+2);
		Clazz._NPEMsgFragment = e.message.substr(idx1+1, idx2-idx1-20);
		Clazz._isNPEExceptionPredicate = function(e) {
			return e.message.indexOf(Clazz._NPEMsgFragment)!=-1;
		};
	}	
	else if(navigator.userAgent.toLowerCase().indexOf("webkit")!=-1) { //webkit, google chrome prints the property name accessed. 
		Clazz._exceptionNPERegExp = Clazz._ex_reg(e.message, "hello");
		Clazz._isNPEExceptionPredicate = function(e) {
			return Clazz._exceptionNPERegExp.test(e.message);
		};
	}
	else {// ie, firefox and others print the name of the object accessed: 
		Clazz._exceptionNPERegExp = Clazz._ex_reg(e.message, "$$o$$");
		Clazz._isNPEExceptionPredicate = function(e) {
			return Clazz._exceptionNPERegExp.test(e.message);
		};
	}		
};
/**sgurin
 * Implements Java's keyword "instanceof" in JavaScript's way **for exception objects**.
 * 
 * calls Clazz.instanceOf if e is a Java exception. If not, try to detect known native 
 * exceptions, like native NullPointerExceptions and wrap it into a Java exception and 
 * call Clazz.instanceOf again. if the native exception can't be wrapped, false is returned.
 * 
 * @param obj the object to be tested
 * @param clazz the class to be checked
 * @return whether the object is an instance of the class
 * @author: sgurin
 */
Clazz.exceptionOf=function(e, clazz) {
	if(e.__CLASS_NAME__)
		return Clazz.instanceOf(e, clazz);
	else if(Clazz._isNPEExceptionPredicate(e)) {
		//wrap to a java npe
		var jnpe=new java.lang.NullPointerException();
		for(var i in jnpe){e[i]=jnpe[i];}
		return Clazz.instanceOf(e, clazz);
	}
	else
		return false;
};

Clazz.declarePackage ("java.io");
//Clazz.declarePackage ("java.lang");
Clazz.declarePackage ("java.lang.annotation"); // java.lang
Clazz.declarePackage ("java.lang.instrument"); // java.lang
Clazz.declarePackage ("java.lang.management"); // java.lang
Clazz.declarePackage ("java.lang.reflect"); // java.lang
Clazz.declarePackage ("java.lang.ref");  // java.lang.ref
java.lang.ref.reflect = java.lang.reflect;
Clazz.declarePackage ("java.util");

/*
 * Consider these interfaces are basic!
 */
Clazz.declareInterface (java.io,"Closeable");
Clazz.declareInterface (java.io,"DataInput");
Clazz.declareInterface (java.io,"DataOutput");
Clazz.declareInterface (java.io,"Externalizable");
Clazz.declareInterface (java.io,"Flushable");
Clazz.declareInterface (java.io,"Serializable");
Clazz.declareInterface (java.lang,"Iterable");
Clazz.declareInterface (java.lang,"CharSequence");
Clazz.declareInterface (java.lang,"Cloneable");
Clazz.declareInterface (java.lang,"Appendable");
Clazz.declareInterface (java.lang,"Comparable");
Clazz.declareInterface (java.lang,"Runnable");
Clazz.declareInterface (java.util,"Comparator");

java.lang.ClassLoader = {
	__CLASS_NAME__ : "ClassLoader"
};
}
