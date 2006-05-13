/*=j2s=
#Java2Script Configuration
#Sun Jan 16 00:50:30 CST 2006
j2s.resources.list=console.css,java/lang/Class.js,java/io/Serializable.js,java/lang/CharSequence.js,java/lang/Cloneable.js,java/lang/Comparable.js,java/lang/Runnable.js,java/util/Comparator.js,java/lang/Enum.js,java/lang/Object.js,java/lang/String.js,java/lang/StringBuffer.js,java/lang/Number.js,java/lang/Integer.js,java/lang/Long.js,java/lang/Float.js,java/lang/Double.js,java/lang/ThreadGroup.js,java/lang/Thread.js,java/util/Date.js,java/util/Iterator.js,java/util/ListIterator.js,java/util/Enumeration.js,java/util/Collection.js,java/util/Set.js,java/util/Map.js,java/util/List.js,java/util/RandomAccess.js,java/util/AbstractCollection.js,java/util/AbstractSet.js,java/util/AbstractMap.js,java/util/AbstractList.js,java/util/ArrayList.js,java/util/HashMap.js,java/util/HashSet.js,java/util/Dictionary.js,java/util/Hashtable.js,java/util/Properties.js,java/util/Vector.js,java/util/Stack.js,java/util/EventObject.js,java/util/EventListener.js,java/util/EventListenerProxy.js
=*/
/******************************************************************************
 * Copyright (c) 2005-2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Web:
 *     http://j2s.sourceforge.net/
 *     http://sourceforge.net/projects/j2s/
 * Contributors:
 *     ognize.com - initial API and implementation
 *****************************************************************************/
/*******
 * @author josson smith
 * @create Nov 5, 2005
 *******/
 
/**
 * Class Clazz. All the methods are static in this class.
 */
/* static */
function Clazz () {
};

function NullObject () {
};

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
			/* user defined class name */
			return clazz.__CLASS_NAME__;
		}
		var clazzStr = clazz.toString ();
		var idx0 = clazzStr.indexOf ("function");
		if (idx0 == -1) {
			// For Firefox 1.5.0.1+, those HTML element are no longer
			// bound with function () { [native] } constructors
			if (clazzStr.charAt (0) == '[') {
				return clazzStr.substring (1, clazzStr.length - 1);
			} else {
				return clazzStr.replace(/[^a-zA-Z0-9]/g, '');
			}
		}
		var idx1 = idx0 + 8;
		var idx2 = clazzStr.indexOf ("(", idx1);
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
				} else {
					return Clazz.getClassName (obj.constructor);
				}
			} else if (objType == "number") {
				return "Number";
			} else if (objType == "boolean") {
				return "Boolean";
			}
			return Clazz.getClassName (obj.constructor);
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
		return Object;
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
Clazz.extendsProperties = function (hostThis, hostSuper) {
	for (var o in hostSuper) {
		if (o != "prototype" && o != "superClazz"
				&& o != "__CLASS_NAME__" && o != "implementz"
				&& !Clazz.checkInnerFunction (hostSuper, o)) {
			hostThis[o] = hostSuper[o];
		}
	}
};

/* private */
Clazz.checkInnerFunction = function (hostSuper, funName) {
	for (var k = 0; k < Clazz.innerFunctionNames.length; k++) {
		if (funName == Clazz.innerFunctionNames[k] && 
				Clazz.innerFunctions[funName] == hostSuper[funName]) {
			return true;
		}
	}
	return false;
};

/*
 * Be used to copy members of interface
 */
/* protected */
Clazz.implementsProperties = function (hostThis, hostSuper) {
	for (var o in hostSuper) {
		if (o != "prototype" && o != "superClazz"
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
/* public */
Clazz.inheritClass = function (clazzThis, clazzSuper, objSuper) {
	//var thisClassName = Clazz.getClassName (clazzThis);
	Clazz.extendsProperties (clazzThis, clazzSuper);
	if (objSuper != null) {
		// ! Unsafe of refrence prototype to an instance!
		// Feb 19, 2006 --josson
		// OK for this refrence to an instance, as this is anonymous instance,
		// which is not referenced elsewhere.
		// March 13, 2006
		clazzThis.prototype = objSuper; 
	} else if (clazzSuper != Number) {
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
Clazz.equalsOrExtendsLevel = function (clazzThis, clazzAncestor) {
	if (clazzThis == clazzAncestor) {
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
/*
Clazz.getClassNameEvalStr = function (clazzVarName, clazzName) {
	var innerTypes = new Array (
		"number", "string", "function", "object", "array", "boolean"
	);
	for (var i = 0; i < innerTypes.length; i++) {
		if (innerTypes[i] == clazzName) {
			return clazzVarName + " = " 
					+ clazzName.substring (0, 1).toUpperCase ()
					+ clazzName.substring (1) + ";";
		}
	}
	return clazzVarName + " = " + clazzName + ";";
};
*/

/* protected */
Clazz.getInheritedLevel = function (clazzTarget, clazzBase) {
	if (clazzTarget == clazzBase) {
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
			|| NullObject == clazzTarget) {
		if (clazzBase != Number && clazzBase != Boolean
				&& clazzBase != NullObject) {
			return 0;
		}
	}
	if (isTgtStr) {
		//eval (Clazz.getClassNameEvalStr ("clazzTarget", clazzTarget));
		clazzTarget = Clazz.evalType (clazzTarget);
	}
	if (isBaseStr) {
		//eval (Clazz.getClassNameEvalStr ("clazzBase", clazzBase));
		clazzBase = Clazz.evalType (clazzBase);
	}
	if (clazzBase == null || clazzTarget == null) {
		return -1;
	}
	var level = 0;
	var zzalc = clazzTarget; // zzalc <--> clazz
	while (zzalc != clazzBase && level < 10) {
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
			if (clazzBase == Object) {
				return level + 1;
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
		return clazz == undefined; // should usually false
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
 * @param clazzThis host object's class. Can not get the class me by host 
 * object. Because the clazzThis is used as one signal for the JavaScript
 * to determine which class is the super.* method calling.
 * For example, class B extends A, and override the method run() with a 
 * supper.run () call. And class C extends B. And then instance of C 
 * invokes the run method will have objThis of C. Now objThis#getClassName
 * is "C", so clazzThis can not be detected when run method is invoked. So
 * it's necessary to declare clazzThis as a parameter in Clazz.superCall.
 * @param funName method name to be called
 * @param funParams Array of method parameters
 */
/* public */
Clazz.superCall = function (objThis, clazzThis, funName, funParams) {
	var fx = null;
	var clazzFun = objThis[funName];
	if (clazzFun != null) {
		if (clazzFun.claxxOwner != null) { 
			// claxxOwner is a mark for methods that is single.
			if (clazzFun.claxxOwner != clazzThis) {
				// This is a single method, call directly!
				fx = clazzFun;
			}
		} else { // normal wrapped method
			var stacks = clazzFun.stacks;
			var length = stacks.length;
			for (var i = length - 1; i >= 0; i--) {
				/*
				 * Once super call is computed precisely, there are no need 
				 * to calculate the inherited level but just an equals
				 * comparision
				 */
				//var level = Clazz.getInheritedLevel (clazzThis, stacks[i]);
				if (clazzThis == stacks[i]) { // level == 0
					if (i > 0) {
						fx = stacks[i - 1].prototype[funName];
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
		if (Clazz.tracingCalling) {
			var caller = arguments.callee.caller;
			if (caller == Clazz.superConstructor) {
				caller = caller.arguments.callee.caller;
			}
			Clazz.pu$hCalling (new Clazz.callingStack (caller, clazzThis));
			var ret = fx.apply (objThis, (funParams == null) ? [] : funParams);
			Clazz.p0pCalling ();
			return ret;
		}
		return fx.apply (objThis, (funParams == null) ? [] : funParams);
	} else if (funName == "construct") {
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
			this.clazzName = Clazz.getClassName (asClazz);
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
 * method name and the same parameter signatures with the given 
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
Clazz.searchAndExecuteMethod = function (objThis, claxxRef, fxName, funParams) {
	var params = Clazz.getParamsType (funParams);
	var stacks = objThis[fxName].stacks;
	var length = stacks.length;
	/*
	 * Search the inheritance stacks to get the given class' function
	 */
	var began = false;
	for (var i = length - 1; i > -1; i--) {
		//if (Clazz.getInheritedLevel (claxxRef, stacks[i]) >= 0) {
		/*
		 * No need to calculate the inherited level as there always exist a 
		 * right claxxRef in the stacks, and the inherited level of stacks
		 * are in order.
		 */
		if (began || stacks[i] == claxxRef) {
			/*
			 * First try to search method within the same class scope
			 * with stacks[i] == claxxRef
			 */
			var clazzFun = stacks[i].prototype[fxName];
			// March 10, 2006
			// clazzFun should always be not null
			// May 6, 2006
			//if (clazzFun == null) {
			//}
			
			/*
			 * Maybe try and catch may require more CPU times.
			 * I am not sure yet.
			 * May 6, 2006
			 */
			//try {
			//	return Clazz.tryToSearchAndExecute (objThis, clazzFun, params, 
			//			funParams/*, isSuper, clazzThis*/);
			//} catch (e) {
			//	if (!(e instanceof Clazz.MethodException)) {
			//		throw e;
			//	}
			//}
			
			var ret = Clazz.tryToSearchAndExecute (objThis, clazzFun, params, 
					funParams/*, isSuper, clazzThis*/);
			if (!(ret instanceof Clazz.MethodException)) {
				return ret;
			}
			/*
			 * the following search after began is true is super calling.
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

var fNullCount = 0;

/*
 * Internet Explorer will result the following expression as 1, while the
 * other browser will have result of 2.
 * Consider IE will take extra CPU times on #substring(1) method, the
 * following variable is used to make optimization.
 */
/* private */
Clazz.ie$plit = "\\2".split (/\\/).length == 1;

Clazz.tracingCalling = false;

/* private */
Clazz.tryToSearchAndExecute = function (objThis, clazzFun, params, funParams/*, 
		isSuper, clazzThis*/) {
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
				
				var noInnerWrapper = caller != Clazz.instantialize 
						&& caller != Clazz.superCall;
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
				var ret = f.apply (objThis, methodParams);
				if (noInnerWrapper) {
					Clazz.p0pCalling ();
				}
				if (xpushed) {
					Clazz.p0pCalling ();
				}
				return ret;
			}
			return f.apply (objThis, methodParams);
		//}
	}
	//throw new Clazz.MethodException ();
	return new Clazz.MethodException ();
};

Clazz.initializingException = false;

/**
 * Search the existed polynomial methods to get the matched method with
 * the given parameter types.
 *
 * @param existedMethods Array of string which contains method parameters
 * @param paramTypes Array of string that is parameter type.
 * @return string of method parameters seperated by "\\"
 */
/* private */
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
	var roundTwo = new Array ();
	for (var i = 0; i < roundOne.length; i++) {
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
	var resultTwo = roundTwo;
	var min = resultTwo[0];
	for (var i = 1; i < resultTwo.length; i++) {
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
	return roundOne[index].join ('\\');
	/*
	var params = resultOne[index];
	var methodParams = "";
	for (var i = 0; i < params.length; i++) {
		methodParams += params[i];
		if (i != params.length - 1) {
			methodParams += "\\";
		}
	}
	*/
	/*
	 * Return the method parameters' type string as indentifier of the
	 * choosen method.
	 */
	//return methodParams;
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

/*
 * Other developers may need to extend this formatParameters method
 * to deal complicated situation.
 */
/* protected */
Clazz.formatParameters = function (funParams) {
	if (funParams != null && funParams.length != 0) {
		/* 
		 * If funParams is Array, funParams.toString() will
		 * also return "*,*,..." string.
		 */
		/*
		var paramStr = funParams.toString ().replace (/\s/g, "");
		if (paramStr.length != 0) {
			//var params = paramStr.split (/,/);
			//fpName += "\\" + params.join ('\\');
			fpName = "\\" + paramStr.replace (/,/g, "\\");
		} else {
			fpName += "\\void";
		}
		*/
		/*
		if (typeof funParams == "string") {
			fpName = "\\" + funParams.replace (/\s*,\s+/g, "\\");
		} else {
			fpName = "\\" + funParams.join ("\\");
		}
		*/
		return "\\" + funParams.toString ().replace (/\s+/g, "").replace (/,/g, "\\");
	} else {
		return "\\void";
	}
};
/*
 * Override the existed methods which are in the same name.
 * Overriding methods is provided for the purpose that the JavaScript
 * does not need to search the whole hirarchied methods to find the
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
	funBody.exName = funName;
	var fpName = Clazz.formatParameters (funParams);
	/*
	 * For method the first time is defined, just keep it rather than
	 * wrapping into deep hierarchies!
	 */
	// property "funParams" will be used as a mark of only-one method
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
	funBody.exName = funName;
	var fpName = Clazz.formatParameters (funParams);
	/*
	 * For method the first time is defined, just keep it rather than
	 * wrapping into deep hierarchies!
	 */
	var f$ = clazzThis.prototype[funName];
	if (f$ == null) {
		//*
		// property "funParams" will be used as a mark of only-one method
		funBody.funParams = fpName; 
		funBody.claxxOwner = clazzThis;
		clazzThis.prototype[funName] = funBody;
		funBody.exClazz = clazzThis; // make it traceable
		return funBody;
		// */
	} else if (f$.claxxOwner == clazzThis
			&& f$.funParams == fpName) {
		return f$;
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
		if (oldFun.claxxOwner != clazzThis) {
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
			|| f$.claxxReference != clazzThis) {
		/*
		 * Generate a new delegating method for the class
		 */
		f$ = clazzThis.prototype[funName] = Clazz
				.generateDelegatingMethod (clazzThis, funName);
		/*
		 * March 10, 2006
		 */
		/*
		f$ = clazzThis.prototype[funName] = (function (claxxRef, methodName) {
			var proxy = function () {
				return Clazz.searchAndExecuteMethod (this, claxxRef, 
					methodName, arguments);
			};
			proxy.claxxReference = claxxRef;
			return proxy;
		}) (clazzThis, funName);
		//*/
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

	if (ss.length == 0/* || ss[ss.length - 1] != clazzThis*/) {
		ss[ss.length] = clazzThis;
	} else {
		var existed = false;
		for (var i = ss.length - 1; i >= 0; i--) {
			if (ss[i] == clazzThis) {
				existed = true;
				break;
			}
		}
		if (!existed) {
			ss[ss.length] = clazzThis;
		}
	}

	if (oldFun != null) {
		if (oldFun.claxxOwner == clazzThis) {
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
	var funName = "construct";
	Clazz.defineMethod (clazzThis, funName, funBody, funParams);
};

/* protected */
Clazz.allPackage = new Object ();

Clazz.lastPackageName = null;
Clazz.lastPackage = null;

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
		return Object;
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
	var iFun = Clazz.innerFunctions;
	clazzFun.defineMethod = iFun.defineMethod;
	clazzFun.defineStaticMethod = iFun.defineStaticMethod;
	clazzFun.makeConstructor = iFun.makeConstructor;
	return clazzFun;
};

/* protected */
Clazz.instantialize = function (objThis, args) {
	if (args != null && args.length == 1 && args[0] != null 
			&& args[0] instanceof Clazz.args4InheritClass) {
		return ;
	}
	if (objThis.construct != null) {
		objThis.construct.apply (objThis, args);
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
Clazz.innerFunctionNames = [
	"equals", "getName", "defineMethod", "defineStaticMethod",
	"makeConstructor"
];

/*
 * Static methods
 */
Clazz.innerFunctions = {
	/*
	 * Similar to Object#equals
	 */
	equals : function (aFun) {
		return this == aFun;
	},

	/*
	 * Similar to Class#getName
	 */
	getName : function () {
		return Clazz.getClassName (this);
	},

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
};

/* private */
Clazz.decorateFunction = function (clazzFun, prefix, name) {
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
		if (prefix == java.lang) {
			window[name] = clazzFun;
		}
	} else {
		// e.g. Clazz.declareInterface (org.eclipse.ui.Plugin, "ICorePlugin", 
		//		org.eclipse.ui.IPlugin);
		qName = prefix.__CLASS_NAME__ + "." + name;
		prefix[name] = clazzFun;
	}
	clazzFun.__CLASS_NAME__ = qName;
	clazzFun.prototype.__CLASS_NAME__ = qName;
	clazzFun.equals = Clazz.innerFunctions.equals;
	clazzFun.getName = Clazz.innerFunctions.getName;
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
Clazz.decorateAsClass = function (clazzFun, prefix, name, clazzParent, 
		interfacez, clazzParentInstance) {
	var qName = null;
	Clazz.decorateFunction (clazzFun, prefix, name);
	if (clazzParentInstance != null) {
		Clazz.inheritClass (clazzFun, clazzParent, clazzParentInstance);
	} else if (clazzParent != null) {
		Clazz.inheritClass (clazzFun, clazzParent);
	}
	if (interfacez != null) {
		Clazz.implementOf (clazzFun, interfacez);
	}
	return clazzFun;
};

/* protected */
Clazz.decorateAsType = function (clazzFun, qClazzName, clazzParent, 
		interfacez, clazzParentInstance) {
	clazzFun.__CLASS_NAME__ = qClazzName;
	//if (qClazzName != "String" && qClazzName != "Object"
	//		&& qClazzName != "Number" && qClazzName != "Date") {
		clazzFun.prototype.__CLASS_NAME__ = qClazzName;
	//}
	clazzFun.equals = Clazz.innerFunctions.equals;
	clazzFun.getName = Clazz.innerFunctions.getName;
	/*
	for (var i = 0; i < Clazz.innerFunctionNames.length; i++) {
		var methodName = Clazz.innerFunctionNames[i];
		clazzFun[methodName] = Clazz.innerFunctions[methodName];
	}
	*/
	if (clazzParentInstance != null) {
		Clazz.inheritClass (clazzFun, clazzParent, clazzParentInstance);
	} else if (clazzParent != null) {
		Clazz.inheritClass (clazzFun, clazzParent);
	}
	if (interfacez != null) {
		Clazz.implementOf (clazzFun, interfacez);
	}
	return clazzFun;
};

Clazz.declarePackage ("java.lang");
/******************************************************************************
 * Copyright (c) 2005-2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Web:
 *     http://j2s.sourceforge.net/
 *     http://sourceforge.net/projects/j2s/
 * Contributors:
 *     ognize.com - initial API and implementation
 *****************************************************************************/
/*******
 * @author josson smith
 * @create March 10, 2006
 *******/

/**
 * Once ClassExt.js is part of Class.js.
 * In order to make the Class.js as small as possible, part of its content
 * is moved into this ClassExt.js.
 *
 * See also http://j2s.sourceforge.net/j2sclazz/
 */
 
/**
 * Clazz.MethodNotFoundException is used to notify the developer about calling
 * methods with incorrect parameters.
 */
/* protected */
// Override the Clazz.MethodNotFoundException in Class.js to give details
Clazz.MethodNotFoundException = function (obj, clazz, method, params) {
	var paramStr = "";
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
		return "MethodNotFoundException:" + this.message;
	}
};

/**
 * Prepare callback for instance of anonymous Class.
 * For example for the callback:
 *     this.callbacks.MyEditor.sayHello();
 *
 * @param objThis the host object for callback
 * @param args arguments object. args[0] will be classThisObj -- the "this"
 * object to be hooked
 * 
 * Attention: parameters should not be null!
 */
/* protected */
Clazz.prepareCallback = function (objThis, args) {
	var classThisObj = args[0];
	if (objThis != null && classThisObj != null && classThisObj != window) {
		var obs = objThis["callbacks"];
		if (obs == null) {
			obs = new Array ();
			objThis["callbacks"] = obs;
		}
		var className = Clazz.getClassName (classThisObj);
		//if (obs[className] == null) { /* == null make no sense! */
			//obs[className] = classThisObj;
			obs[className.replace (/org\.eclipse\.swt\./, "$wt.")] = classThisObj;
			var clazz = Clazz.getClass (classThisObj);
			while (clazz.superClazz != null) {
				clazz = clazz.superClazz;
				//obs[Clazz.getClassName (clazz)] = classThisObj;
				obs[Clazz.getClassName (clazz)
						.replace (/org\.eclipse\.swt\./, "$wt.")] = classThisObj;
			}
		//}
		var cbs = classThisObj["callbacks"];
		if (cbs != null && cbs instanceof Array) {
			for (var s in cbs) {
				if (s != "length") {
					obs[s] = cbs[s];
				}
			}
		}
	}
	// Shift the arguments
	for (var i = 0; i < args.length - 1; i++) {
		args[i] = args[i + 1];
	}
	args.length--;
	// arguments will be returned!
};

/**
 * Construct instance of the given inner class.
 *
 * @param classInner given inner class, alway with name like "*$*"
 * @param objThis this instance which can be used to call back.
 * @param finalVars final variables which the inner class may use
 * @return the constructed object
 *
 * @see Clazz#cloneFinals
 */
/* public */
Clazz.innerTypeInstance = function (clazzInner, objThis, finalVars) {
	var obj = null;
	/*if (arguments.length == 2) {
		obj = new clazzInner (objThis);
	} else */if (arguments.length == 3) {
		obj = new clazzInner (objThis);
	} else if (arguments.length == 4) {
		obj = new clazzInner (objThis, arguments[3]);
	} else if (arguments.length == 5) {
		obj = new clazzInner (objThis, arguments[3], arguments[4]);
	} else if (arguments.length == 6) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5]);
	} else if (arguments.length == 7) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5], arguments[6]);
	} else if (arguments.length == 8) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5], arguments[6], arguments[7]);
	} else if (arguments.length == 9) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5], arguments[6], arguments[7], arguments[8]);
	} else if (arguments.length == 10) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5], arguments[6], arguments[7], arguments[8],
				arguments[9]);
	} else {
		/*
		 * Should construct instance manually.
		 */
		obj = new clazzInner ();
		if (obj.construct == null) {
			throw new String ("No support anonymous class constructor with " 
					+ "more than 7 parameters.");
		}
		var args = new Array ();
		for (var i = 3; i < arguments.length; i++) {
			args[i - 3] = arguments[i];
		}
		obj.construct.apply (obj, args);
	}
	if (finalVars != null && objThis.$finals == null) {
		obj.$finals = finalVars;
	} else if (finalVars == null && objThis.$finals != null) {
		obj.$finals = objThis.$finals;
	} else if (finalVars != null && objThis.$finals != null) {
		var o = new Object ();
		for (var attr in objThis.$finals) {
			o[attr] = objThis.$finals[attr];
		}
		for (var attr in finalVars) {
			o[attr] = finalVars[attr];
		}
		obj.$finals = o;
	}
	//Clazz.prepareCallback (obj, objThis);
	return obj;
};

/**
 * Clone variables whose modifier is "final".
 * Usage: var o = Clazz.cloneFinals ("name", name, "age", age);
 *
 * @return Object with all final variables
 */
/* protected */
Clazz.cloneFinals = function () {
	var o = new Object ();
	var length = arguments.length / 2;
	for (var i = 0; i < length; i++) {
		o[arguments[i + i]] = arguments[i + i + 1];
	}
	return o;
};

/* public */
Clazz.isClassDefined = Clazz.isDefinedClass = function (clazzName) {
	if (clazzName != null && clazzName.length != 0) {
		var pkgFrags = clazzName.split (/\./);
		var pkg = null;
		for (var i = 0; i < pkgFrags.length; i++) {
			if (pkg == null) {
				if (Clazz.allPackage[pkgFrags[0]] == null) {
					//error (clazzName + " / " + false);
					return false;
				}
				pkg = Clazz.allPackage[pkgFrags[0]];
			} else {
				if (pkg[pkgFrags[i]] == null) {
					//error (clazzName + " / " + false);
					return false;
				}
				pkg = pkg[pkgFrags[i]]
			}
		}
		//error (clazzName + " / " + (pkg != null));
		return pkg != null;
	} else {
		/* consider null or empty name as non-defined class */
		return false;
	}
};
/**
 * Define the enum constant.
 * @param classEnum enum type
 * @param enumName enum constant
 * @param enumOrdinal enum ordinal
 * @param initialParams enum constant constructor parameters
 * @return return defined enum constant
 */
/* public */
Clazz.defineEnumConstant = function (clazzEnum, enumName, enumOrdinal, initialParams, clazzEnumExt) {
	var o = null;
	if (clazzEnumExt != null) {
		o = new clazzEnumExt ();
	} else {
		o = new clazzEnum ();
	}
	Clazz.superConstructor (o, clazzEnum, [enumName, enumOrdinal]);
	if (initialParams != null && initialParams.length != 0) {
		o.construct.apply (o, initialParams);
	}
	clazzEnum[enumName] = o;
	clazzEnum.prototype[enumName] = o;
	return o;
};

/**
 * Make arrays.
 *
 * @return the created Array object
 */
/* public */
Clazz.newArray  = function () {
	var args = arguments;
	if (arguments.length == 1) {
		if (arguments[0] instanceof Array) {
			args = arguments[0];
		}
	}
	if (args.length <= 1) {
		return new Array ();
	} else if (args.length == 2) {
		var dim = args[0];
		if (typeof dim == "string") {
			dim = dim.charCodeAt (0); // char
		}
		var val = args[1];
		var arr = new Array (dim);
		for (var i = 0; i < dim; i++) {
			arr[i] = val;
		}
		return arr;
	} else {
		var dim = args[0];
		if (typeof dim == "string") {
			dim = dim.charCodeAt (0); // char
		}
		var len = args.length - 1;
		var xargs = new Array (len);
		for (var i = 0; i < len; i++) {
			xargs[i] = args[i + 1];
		}
		var arr = new Array (dim);
		for (var i = 0; i < dim; i++) {
			// Call recursively!
			arr[i] = Clazz.newArray (xargs);
		}
		return arr;
	}
};

/**
 * Make the RunnableCompatiability instance as a JavaScript function.
 *
 * @param jsr Instance of RunnableCompatiability
 * @return JavaScript function instance represents the method run of jsr.
 */
/* public */
Clazz.makeFunction = function (jsr) {
	return function (e) {
		if (e == null) {
			e = window.event;
		}
		if (jsr.setEvent != null) {
			jsr.setEvent (e);
		}
		jsr.run ();
		if (e != null) {
			// Is it correct to stopPropagation here? --Feb 19, 2006
			e.cancelBubble = true;
			if (e.stopPropagation) {
				e.stopPropagation();
			}
		}
		if (jsr.returnSet == 1) {
			return jsr.returnNumber;
		} else if (jsr.returnSet == 2) {
			return jsr.returnBoolean;
		} else if (jsr.returnSet == 3) {
			return jsr.returnObject;
		}
	};
};

/* protected */
Clazz.defineStatics = function (clazz) {
	for (var i = 0; i < (arguments.length - 1) / 2; i++) {
		var name = arguments[i + i + 1];
		clazz[name] = clazz.prototype[name] = arguments[i + i + 2];
	}
};

/*
 * Get the caller method for those methods that are wrapped by 
 * Clazz.searchAndExecuteMethod.
 *
 * @param args caller method's arguments
 * @return caller method, null if there is not wrapped by 
 * Clazz.searchAndExecuteMethod or is called directly.
 */
/* protected */
Clazz.getMixedCallerMethod = function (args) {
	var o = new Object ();
	var argc = args.callee.caller; // Clazz.tryToSearchAndExecute
	if (argc == null) return null;
	if (argc != Clazz.tryToSearchAndExecute) { // inherited method's apply
		argc = argc.arguments.callee.caller;
		if (argc == null) return null;
	}
	if (argc != Clazz.tryToSearchAndExecute) return null;
	argc = argc.arguments.callee.caller; // Clazz.searchAndExecuteMethod
	if (argc == null || argc != Clazz.searchAndExecuteMethod) return null;
	o.claxxRef = argc.arguments[1];
	o.fxName = argc.arguments[2];
	o.paramTypes = Clazz.getParamsType (argc.arguments[3]);
	argc = argc.arguments.callee.caller; // Clazz.generateDelegatingMethod
	if (argc == null) return null;
	argc = argc.arguments.callee.caller; // the private method's caller
	if (argc == null) return null;
	o.caller = argc;
	return o;
};

/*
 * Check and return super private method.
 * In order make private methods be executed correctly, some extra javascript
 * must be inserted into the beggining of the method body of the non-private 
 * methods that with the same method signature as following:
 * <code>
 *			var $private = Clazz.checkPrivateMethod (arguments);
 *			if ($private != null) {
 *				return $private.apply (this, arguments);
 *			}
 * </code>
 * Be cautious about this. The above codes should be insert by Java2Script
 * compiler or with double checks to make sure things work correctly.
 *
 * @param args caller method's arguments
 * @return private method if there are private method fitted for the current 
 * calling environment
 */
/* protected */
Clazz.checkPrivateMethod = function (args) {
	var m = Clazz.getMixedCallerMethod (args);
	if (m == null) return null;
	var callerFx = m.claxxRef.prototype[m.caller.exName];
	if (callerFx == null) return null; // may not be in the class hierarchies
	var ppFun = null;
	if (callerFx.claxxOwner != null) {
		ppFun = callerFx.claxxOwner.prototype[m.fxName];
	} else {
		var stacks = callerFx.stacks;
		for (var i = stacks.length - 1; i >= 0; i--) {
			var fx = stacks[i].prototype[m.caller.exName];
			if (fx == m.caller) {
				ppFun = stacks[i].prototype[m.fxName];
			} else if (fx != null) {
				for (var fn in fx) {
					if (fn.indexOf ('\\') == 0 && fx[fn] == m.caller) {
						ppFun = stacks[i].prototype[m.fxName];
						break;
					}
				}
			}
			if (ppFun != null) {
				break;
			}
		}
	}
	if (ppFun != null && ppFun.claxxOwner == null) {
		ppFun = ppFun["\\" + m.paramTypes];
	}
	if (ppFun != null && ppFun.isPrivate && ppFun != args.callee) {
		return ppFun;
	}
	return null;
};
var $fz = null; // for private method declaration
var cla$$ = null;
Clazz.cla$$$tack = new Array ();
Clazz.pu$h = function () {
	if (cla$$ != null) {
		Clazz.cla$$$tack[Clazz.cla$$$tack.length] = cla$$;
	}
};
Clazz.p0p = function () {
	if (Clazz.cla$$$tack.length > 0) {
		var clazz = Clazz.cla$$$tack[Clazz.cla$$$tack.length - 1];
		Clazz.cla$$$tack.length--;
		return clazz;
	} else {
		return null;
	}
};

/*
 * Option to switch on/off of stack traces.
 */
/* protect */
Clazz.tracingCalling = false;

/*
 * Use to mark that the Throwable instance is created or not.
 */
/* private */
Clazz.initializingException = false;

/* private */
Clazz.callingStack = function (caller, owner) {
	this.caller = caller;
	this.owner = owner;
};
Clazz.callingStackTraces = new Array ();
Clazz.pu$hCalling = function (stack) {
	Clazz.callingStackTraces[Clazz.callingStackTraces.length] = stack;
};
Clazz.p0pCalling = function () {
	var length = Clazz.callingStackTraces.length;
	if (length > 0) {
		var stack = Clazz.callingStackTraces[length - 1];
		Clazz.callingStackTraces.length--;
		return stack;
	} else {
		return null;
	}
};


$_J=Clazz.declarePackage;$_C=Clazz.decorateAsClass;$_Z=Clazz.instantialize;$_I=Clazz.declareInterface;$_D=Clazz.isClassDefined;$_H=Clazz.pu$h;$_P=Clazz.p0p;$_B=Clazz.prepareCallback;$_N=Clazz.innerTypeInstance;$_K=Clazz.makeConstructor;$_U=Clazz.superCall;$_R=Clazz.superConstructor;$_M=Clazz.defineMethod;$_V=Clazz.overrideMethod;$_S=Clazz.defineStatics;$_E=Clazz.defineEnumConstant;$_F=Clazz.cloneFinals;$_A=Clazz.newArray;$_O=Clazz.instanceOf;$_G=Clazz.inheritArgs;$_X=Clazz.checkPrivateMethod;

$_J ("java.io");
$_I (java.io, "Serializable");
$_I (java.lang, "CharSequence");
$_I (java.lang, "Cloneable");
$_I (java.lang, "Comparable");
$_I (java.lang, "Runnable");
$_J ("java.util");
$_I (java.util, "Comparator");
Clazz.declarePackage ("java.lang");
cla$$ = java.lang.Enum = Enum = function () {
this.$name = null;
this.$ordinal = 0;
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (cla$$, "Enum", null, [Comparable, java.io.Serializable]);
Clazz.defineMethod (cla$$, "name", 
function () {
return this.$name;
});
Clazz.defineMethod (cla$$, "ordinal", 
function () {
return this.$ordinal;
});
Clazz.makeConstructor (cla$$, 
function (name, ordinal) {
this.$name = name;
this.$ordinal = ordinal;
}, "String, Number");
Clazz.defineMethod (cla$$, "toString", 
function () {
return this.$name;
});
Clazz.defineMethod (cla$$, "equals", 
function (other) {
return this == other;
}, "Object");
Clazz.defineMethod (cla$$, "hashCode", 
function () {
return System.identityHashCode (this);
});
Clazz.defineMethod (cla$$, "clone", 
function () {
throw  new CloneNotSupportedException ();
});
Clazz.defineMethod (cla$$, "compareTo", 
function (o) {
var other = o;
var self = this;
if (self.getClass () != other.getClass () && self.getDeclaringClass () != other.getDeclaringClass ()) throw  new ClassCastException ();
return self.ordinal - other.ordinal;
}, "E");
Clazz.defineMethod (cla$$, "getDeclaringClass", 
function () {
var clazz = this.getClass ();
var zuper = clazz.getSuperclass ();
return (zuper == Enum) ? clazz : zuper;
});
Clazz.defineMethod (Enum, "$valueOf", 
function (enumType, name) {
	return enumType.$valueOf (name);
}, "Object, String"); /* "Class, String" */
Clazz.defineMethod (Enum, "$valueOf", 
function (name) {
if (name == null) throw  new NullPointerException ("Name is null");
var vals = this.values ();
for (var i = 0; i < vals.length; i++) {
	if (name == vals[i].name ()) {
		return vals[i];
	}
}
throw  new IllegalArgumentException ("No enum const " + enumType + "." + name);
}, "String");
Enum.$valueOf = Enum.prototype.$valueOf;
Clazz.defineMethod (Enum, "values", 
function () {
	if (this.$ALL$ENUMS != null) {
		return this.$ALL$ENUMS;
	}
	this.$ALL$ENUMS = new Array ();
	var clazzThis = this.getClass ();
	for (var e in clazzThis) {
		if (clazzThis[e] != null && clazzThis[e].__CLASS_NAME__ != null 
				&& e != "prototype"
				&& Clazz.instanceOf (clazzThis[e], clazzThis)) {
			this.$ALL$ENUMS[this.$ALL$ENUMS.length] = clazzThis[e];
		}
	}
	return this.$ALL$ENUMS;
});
Enum.values = Enum.prototype.values;

/*******
 * Copyright ognize.com (2005).
 *
 * @author josson smith
 * @create Nov 5, 2005
 *******/

var maxTotalLines =	1000;
var linesCount = 0;
var metLineBreak = false;

var splitNeedFixed = "\n".split (/\n/).length != 2; // IE

function splitIntoLineByR (s) {
	var arr = new Array ();
	var i = 0;
	var last = -1;
	while (true) {
		i = s.indexOf ('\r', last + 1);
		if (i != -1) {
			arr[arr.length] = s.substring (last + 1, i);
			last = i;
			if (last + 1 == s.length) {
				arr[arr.length] = "";
				break;
			}
		} else {
			arr[arr.length] = s.substring (last + 1);
			break;
		}
	}
	return arr;
}
function splitIntoLines (s) {
	var arr = new Array ();
	if (s == null) {
		return arr;
	}
	var i = 0;
	var last = -1;
	while (true) {
		i = s.indexOf ('\n', last + 1);
		var str = null;
		if (i != -1) {
			if (i > 0 && s.charAt (i - 1) == '\r') {
				str = s.substring (last + 1, i - 1);
			} else {
				str = s.substring (last + 1, i);
			}
			last = i;
		} else {
			str = s.substring (last + 1);
		}
		var rArr = splitIntoLineByR (str);
		for (var k = 0; k < rArr.length; k++) {
			arr[arr.length] = rArr[k];
		}
		if (i == -1) {
			break;
		} else if (last + 1 == s.length) {
			arr[arr.length] = "";
			break;
		}
	}
	return arr;
}
var consoleBuffer = new Array ();
function loopConsole () {
	if (consoleBuffer.length == 0) {
		return ;
	}
	var console = document.getElementById ("_console_");;
	if (console == null) {
		if (document.body == null) {
			window.setTimeout ("loopConsole ();", 100);
			return ;
		}
	}
	consoleOutput ();
}
function consoleOutput (s, color, isBuffered) {
	var console = document.getElementById ("_console_");;
	if (console == null) {
		if (document.body == null) {
			consoleBuffer[consoleBuffer.length] = {
				message: s,
				color: color
			};
			window.setTimeout ("loopConsole ();", 100);
			return false;
		} else {
			console = document.createElement ("div");
			console.id = "_console_";
			console.className = "consolewindow";
			document.body.appendChild (console);
		}
	}
	if (!isBuffered && consoleBuffer.length != 0) {
		for (var i = 0; i < consoleBuffer.length; i++) {
			var o = consoleBuffer[i];
			consoleOutput (o.message, o.color, true);
		}
		consoleBuffer = new Array ();
	}
	if (typeof s == "undefined") {
		s = "";
	} else if (s == null) {
		s = "null";
	} else {
		s = "" + s;
	}
	if (linesCount > maxTotalLines) {
		//popupAlert (linesCount - maxTotalLines);
		for (var i = 0; i < linesCount - maxTotalLines; i++) {
			//if (console.childNodes.length > 0) {
				console.removeChild (console.childNodes[0]);
			//}
		}
		linesCount = maxTotalLines;
	}
	var willMeetLineBreak = false;
	if (s.length > 0) {
		var lastChar = s.charAt (s.length - 1);
		if (lastChar == '\n') {
			if (s.length > 1) {
				var preLastChar = s.charAt (s.length - 2);
				if (preLastChar == '\r') {
					s = s.substring (0, s.length - 2);
				} else {
					s = s.substring (0, s.length - 1);
				}
			} else {
				s = "";
			}
			willMeetLineBreak = true;
		} else if (lastChar == '\r') {
			s = s.substring (0, s.length - 1);
			willMeetLineBreak = true;
		}
	}

	var lines = null;
	if (splitNeedFixed) {
		try {
		lines = splitIntoLines (s);
		} catch (e) {
			popupAlert (e.message);
		}
	} else {
		lines = s.split (/\r\n|\r|\n/g);
	}
	for (var i = 0; i < lines.length; i++) {
		var lastLineEl = null;
		if (metLineBreak || linesCount == 0 || console.childNodes.length < 1) {
			lastLineEl = document.createElement ("DIV");
			console.appendChild (lastLineEl);
			lastLineEl.style.whiteSpace = "nowrap";
			linesCount++;
		} else {
			try {
				lastLineEl = console.childNodes[console.childNodes.length - 1];
			} catch (e) {
				lastLineEl = document.createElement ("DIV");
				console.appendChild (lastLineEl);
				lastLineEl.style.whiteSpace = "nowrap";
				linesCount++;
			}
		}
		var el = document.createElement ("SPAN");
		lastLineEl.appendChild (el);
		el.style.whiteSpace = "nowrap";
		if (color != null) {
			el.style.color = color;
		}
		if (lines[i].length == 0) {
			lines[i] = String.fromCharCode (160);
			//el.style.height = "1em";
		}
		el.appendChild (document.createTextNode (lines[i]));
		console.scrollTop += 100;
		
		if (i != lines.length - 1) {
			metLineBreak = true;
		} else {
			metLineBreak = willMeetLineBreak;
		}
	}
};

window.popupAlert = window.alert;

window.alert = function (s) {
	consoleOutput (s + "\r\n");
};

window.error = function (s) {
	consoleOutput (s + "\r\n", "red");
};

window.log = function (s) {
	consoleOutput (s + "\r\n", "yellow");
};

window.assert = function () {
	var b = true;
	if (arguments.length == 1) {
		b = arguments[0];
	} else if (arguments.length == 2) {
		var x1 = arguments[0];
		var x2 = arguments[1];
		b = (x1 == x2);
	} else {
		var x1 = arguments[0];
		var x2 = arguments[1];
		var delta = arguments[2];
		b = Math.abs (x1 - x2) < Math.abs (delta);
	}
	if (b) {
		consoleOutput ("Passed\r\n", "green");
	} else {
		if (arguments.length >= 2) {
			consoleOutput ("Failed: expecting " + arguments[1] 
					+ ", but " + arguments[0] + " !\r\n", "red");
		} else {
			consoleOutput ("Failed\r\n", "red");
		}
	}
};


System = new Object ();

System.arraycopy = function (src, srcPos, dest, destPos, length) {
	for (var i = 0; i < length; i++) {
		dest[destPos + i] = src[srcPos + i];
	}
};

System.out = new Object ();

System.out.print = function (s) { 
	consoleOutput (s);
};

System.out.println = function (s) {
	if (typeof s == "undefined") {
		s = "\r\n";
	} else if (s == null) {
		s = "null\r\n";
	} else {
		s = s + "\r\n";
	}
	consoleOutput (s);
};
System.out.printf = function (format, args) {
	if (format == null || format.length == 0) {
		return ;
	}
	var xargs = new Array ();
	if (arguments.length != 2) {
		for (var i = 1; i < arguments.length; i++) {
			xargs[i - 1] = arguments[i];
		}
	} else if (arguments[1] instanceof Array) {
		xargs = arguments[1];
	} else {
		xargs = [args];
	}
	
	var index = 0;
	var str = format.replace (/%(\d+\$)?([-#+ 0,\(<]*)?(\d+)?(\.\d+)?([tT])?([a-zA-Z%])/g, 
		function ($0, $1, $2, $3, $4, $5, $6) {
			var o = null;
			if ($1 != null && $1.length != 0) {
				var i = parseInt ($1) - 1;
				o = xargs[i];
			} else if ($2 != null && $2.length != 0) {
				o = xargs[index - 1];
			} else if ($5 != null && $5.length != 0) {
				o = System.out.formatTime (xargs[index], $6);
				index++;
			} else if ($6 == "n") {
				o = "\r\n";
			} else if ($6 == "%") {
				o = "%";
			} else {
				o = xargs[index];
				index++;
			}
			return o.toString ();
		});
	this.print (str);
};
System.out.formatTime = function (t, p) {
	var o = t;
	if (p == "H") {
		o = "" + t.getHours ();
		if (o.lenght < 2) {
			o = "0" + o;
		}
	} else if (p == "I") {
		o = "" + (t.getHours () % 12);
		if (o.lenght < 2) {
			o = "0" + o;
		}
	} else if (p == "k") {
		o = "" + t.getHours ();
	} else if (p == "l") {
		o = "" + (t.getHours () % 12);
	} else if (p == "M") {
		o = "" + t.getMinutes ();
		if (o.lenght < 2) {
			o = "0" + o;
		}
	} else if (p == "S") {
		o = "" + t.getSeconds ();
		if (o.lenght < 2) {
			o = "0" + o;
		}
	} else if (p == "L") {
		o = "000";
	} else if (p == "N") {
		o = "000000000";
	} else if (p == "k") {
		o = (t.getHours () > 12) ? "pm" : "am";
	} else if (p == "z") {
		o = "+0800";
	// ... More ...
	}
	return o;
};

System.err = new Object ();

System.err.print = function (s) { 
	consoleOutput (s, "red");
};

System.err.println = function (s) {
	if (typeof s == "undefined") {
		s = "\r\n";
	} else if (s == null) {
		s = "null\r\n";
	} else {
		s = s + "\r\n";
	}
	consoleOutput (s, "red");
};

System.err.printf = System.out.printf;Clazz.declarePackage ("java.lang");
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
	return this;
};

Object.prototype.finalize = function () {
};

Object.prototype.notify = function () {
};

Object.prototype.notifyAll = function () {
};

Object.prototype.wait = function () {
};

Object.prototype.toString = function () {
	if (this.__CLASS_NAME__ != null) {
		return "[" + this.__CLASS_NAME__ + " object]";
	} else {
		return "[object]";
	}
};
Encoding = new Object();
Encoding.UTF8 = "utf-8";
Encoding.UTF16 = "utf-16";
Encoding.ASCII = "ascii";

/* protected */
Encoding.guessEncoding = function (str) {
	if (str.charCodeAt(0) == 0xEF && str.charCodeAt(1) == 0xBB && str.charCodeAt(2) == 0xBF) {
		return Encoding.UTF8;
	} else if (str.charCodeAt(0) == 0xFF && str.charCodeAt(1) == 0xFE) {
		return Encoding.UTF16;
	} else {
		return Encoding.ASCII;
	}
};
/* public */
Encoding.readUTF8 = function (str) {
	var encoding = this.guessEncoding(str);
	var startIdx = 0;
	if (encoding == Encoding.UTF8) {
		startIdx = 3;
	} else if (encoding == Encoding.UTF16) {
		startIdx = 2;
	}
	var arrs = new Array();
	for (var i = startIdx; i < str.length; i++) {
		var charCode = str.charCodeAt(i);
		if (charCode < 0x80) {
			arrs[arrs.length] = str.charAt(i);
		} else if (charCode > 0xc0 && charCode <= 0xe0) {
			var c1 = charCode & 0x1f;
			i++;
			var c2 = str.charCodeAt(i) & 0x3f;
			var c = (c1 << 6) + c2;
			arrs[arrs.length] = String.fromCharCode(c);
		} else if (charCode > 0xe0) {
			var c1 = charCode & 0x0f;
			i++;
			var c2 = str.charCodeAt(i) & 0x3f;
			i++;
			var c3 = str.charCodeAt(i) & 0x3f;
			var c = (c1 << 12) + (c2 << 6) + c3;
			arrs[arrs.length] = String.fromCharCode(c);
		}
	}
	return arrs.join ('');
};
/* public */
Encoding.convert2UTF8 = function (str) {
	var encoding = this.guessEncoding(str);
	var startIdx = 0;
	if (encoding == Encoding.UTF8) {
		return str;
	} else if (encoding == Encoding.UTF16) {
		startIdx = 2;
	}
	
	var offset = 0;
	var arrs = new Array(offset + str.length - startIdx);
	/*
	arrs[0] = String.fromCharCode(0xEF).charAt(0);
	arrs[1] = String.fromCharCode(0xBB).charAt(0);
	arrs[2] = String.fromCharCode(0xBF).charAt(0);
	*/
	for (var i = startIdx; i < str.length; i++) {
		var charCode = str.charCodeAt(i);
		if (charCode < 0x80) {
			arrs[offset + i - startIdx] = str.charAt(i);
		} else if (charCode < 0x07ff) { //(charCode > 0xc0 && charCode < 0xe0) {
			var c1 = 0xc0 + ((charCode & 0x07c0) >> 6);
			var c2 = 0x80 + (charCode & 0x003f);
			arrs[offset + i - startIdx] = String.fromCharCode(c1) + String.fromCharCode(c2);
		} else {
			var c1 = 0xe0 + ((charCode & 0xf000) >> 12);
			var c2 = 0x80 + ((charCode & 0x0fc0) >> 6);
			var c3 = 0x80 + (charCode & 0x003f);
			arrs[offset + i - startIdx] = String.fromCharCode(c1) + String.fromCharCode(c2) + String.fromCharCode(c3);
		}
	}
	return arrs.join ('');
};
Clazz.declarePackage ("java.lang");
java.lang.String = String;
//Clazz.decorateAsType (String, "String", null, [java.io.Serializable, CharSequence, Comparable]);
Clazz.implementOf (String, [java.io.Serializable, CharSequence, Comparable]);
//Number.equals = Clazz.innerFunctions.equals;
String.getName = Clazz.innerFunctions.getName;

String.serialVersionUID = String.prototype.serialVersionUID = -6849794470754667710;

String.prototype.trim = function () {
	var len = this.length;
	var st = 0;

	while ((st < len) && (this.charAt (st) <= ' ')) {
	    st++;
	}
	while ((st < len) && (this.charAt (len - 1) <= ' ')) {
	    len--;
	}
	return ((st > 0) || (len < len)) ? this.substring (st, len) : this;
};

String.prototype.trim = function () {
	return this.replace (/^\s+/g, '').replace (/\s+$/g, '');
};

/* private */
String.prototype.startsWith_string_number = function (prefix, toffset) {
	var to = toffset;
	var po = 0;
	var pc = prefix.length;
	// Note: toffset might be near -1>>>1.
	if ((toffset < 0) || (toffset > this.length - pc)) {
	    return false;
	}
	while (--pc >= 0) {
	    if (this.charAt (to++) != prefix.charAt (po++)) {
	        return false;
	    }
	}
	return true;
};

String.prototype.startsWith = function (prefix) { /* prefix, toffset */
	if (arguments.length == 1) {
		return this.startsWith_string_number (arguments[0], 0);
	} else if (arguments.length == 2) {
		return this.startsWith_string_number (arguments[0], arguments[1]);
	} else {
		return false;
	}
};

String.prototype.endsWith = function (suffix) {
	return this.startsWith (suffix, this.length - suffix.length);
};

String.prototype.equals = function (anObject) {
	return this == anObject;
};

String.prototype.equalsIgnoreCase = function (anotherString) {
	return this == anotherString 
			|| this.toLowerCase () == anotherString.toLowerCase ();
};

/* private */
String.prototype.hash = 0;

String.prototype.hashCode = function () {
	var h = this.hash;
	if (h == 0) {
		var off = 0;
		var len = this.length;
		for (var i = 0; i < len; i++) {
			h = 31*h + this.charCodeAt (off++);
			h &= 0xffffffff;
		}
		this.hash = h;
	}
    return h;
};

String.prototype.getBytes = function () {
	var utf8Str = Encoding.convert2UTF8 (this);
	var arrs = new Array (utf8Str.length);
	for (var i = 0; i < utf8Str.length; i++) {
		arrs[i] = utf8Str.charCodeAt (i);
	}
	return arrs;
};

String.prototype.compareTo = function (anotherString) {
	var len1 = this.length;
	var len2 = anotherString.length;
	var n = Math.min (len1, len2);
	var k = 0;
    while (k < n) {
		var c1 = this.charCodeAt (k);
		var c2 = anotherString.charCodeAt (k);
		if (c1 != c2) {
			return c1 - c2;
		}
		k++;
	}
	return len1 - len2;
};

String.prototype.toCharArray = function () {
	var result = new Array (this.length);
	for (var i = 0; i < this.length; i++) {
		result[i] = this.charAt (i);
	}
	return result;
};

String.valueOf = function (o) {
	return "" + o;
};

String.prototype.subSequence = function (beginIndex, endIndex) {
	return this.substring(beginIndex, endIndex);
};

String.prototype.compareToIgnoreCase = function (str) {
	if (this == str) {
		return 0;
	} else if (this > str) {
		return 1;
	} else {
		return -1;
	}
};

String.prototype.contentEquals = function (sb) {
	if (this.length != sb.length ()) {
		return false;
	}
	var v = sb.getValue ();
	var i = 0;
	var j = 0;
	var n = count;
	while (n-- != 0) {
		if (this.charCodeAt (i++) != v[j++]) {
			return false;
		}
	}
	return true;
};

String.prototype.getChars = function (srcBegin, srcEnd, dst, dstBegin) {
	if (srcBegin < 0) {
		throw new StringIndexOutOfBoundsException(srcBegin);
	}
	if (srcEnd > this.length) {
		throw new StringIndexOutOfBoundsException(srcEnd);
	}
	if (srcBegin > srcEnd) {
		throw new StringIndexOutOfBoundsException(srcEnd - srcBegin);
	}
	for (var i = 0; i < srcEnd - srcBegin; i++) {
		dst[dstBegin + i] = this.charAt (srcBegin + i);
	}
};

String.indexOf = function (source, sourceOffset, sourceCount,
		target, targetOffset, targetCount, fromIndex) {
	if (fromIndex >= sourceCount) {
		return (targetCount == 0 ? sourceCount : -1);
	}
	if (fromIndex < 0) {
		fromIndex = 0;
	}
	if (targetCount == 0) {
		return fromIndex;
	}

	var first  = target[targetOffset];
	var i = sourceOffset + fromIndex;
	var max = sourceOffset + (sourceCount - targetCount);

	startSearchForFirstChar:
	while (true) {
		/* Look for first character. */
		while (i <= max && source[i] != first) {
			i++;
		}
		if (i > max) {
			return -1;
		}

		/* Found first character, now look at the rest of v2 */
		var j = i + 1;
		var end = j + targetCount - 1;
		var k = targetOffset + 1;
		while (j < end) {
			if (source[j++] != target[k++]) {
				i++;
				/* Look for str's first char again. */
				continue startSearchForFirstChar;
			}
		}
		return i - sourceOffset;	/* Found whole string. */
	}
};

String.instantialize = function () {
	if (arguments.length == 0) {
		return new String ();
	} else if (arguments.length == 1) {
		var x = arguments[0];
		if (typeof x == "string" || x instanceof String) {
			return new String (x);
		} else if (x instanceof Array) {
			if (x.length > 0 && typeof x[0] == "number") {
				var arr = new Array (x.length);
				for (var i = 0; i < x.length; i++) {
					arr[i] = String.fromCharCode (x[i] & 0xff);
				}
				return Encoding.readUTF8 (arr.join (''));
			}
			return x.join ('');
		} else if (x.__CLASS_NAME__ == "StringBuffer") {
            x.setShared();
            var value = x.getValue();
			var length = x.length ();
			var valueCopy = new Array (length);
			for (var i = 0; i < length; i++) {
				valueCopy[i] = value[i];
			}
			return valueCopy.join ('')
			//return x.value.join ('');
		} else {
			return "" + x;
		}
	} else if (arguments.length == 2) {
		var x = arguments[0];
		var y = arguments[1];
		return String.instantialize (x, 0, x.length, y);
	} else if (arguments.length == 3) {
		var bytes = arguments[0];
		var offset = arguments[1];
		var length = arguments[2];
		var arr = new Array (length);
		for (var i = 0; i < length; i++) {
			arr[i] = bytes[offset + i];
		}
		return arr.join ('');
	} else if (arguments.length == 4) {
		var bytes = arguments[0];
		var y = arguments[3];
		if (typeof y == "string" || y instanceof String) {
			var offset = arguments[1];
			var length = arguments[2];
			var arr = new Array (length);
			for (var i = 0; i < length; i++) {
				arr[i] = bytes[offset + i];
				if (typeof arr[i] == "number") {
					arr[i] = String.fromCharCode (arr[i] & 0xff);
				}
			}
			if (y.toLowerCase () == "utf-8") {
				return Encoding.readUTF8 (arr.join (''));
			} else {
				return arr.join ('');
			}
		} else {
			var value = new Array (count);

			if (hibyte == 0) {
				for (var i = count ; i-- > 0 ;) {
					value[i] = String.fromCharCode (ascii[i + offset] & 0xff);
				}
			} else {
				hibyte <<= 8;
				for (var i = count ; i-- > 0 ;) {
					value[i] = String.fromCharCode (hibyte | (ascii[i + offset] & 0xff));
				}
			}
			return value.join ('');
		}
	} else {
		var s = "";
		for (var i = 0; i < arguments.length; i++) {
		s += arguments[i];
		}
		return s;
	}
};
cla$$ = $_C (function () {
this.value = null;
this.count = 0;
this.shared = false;
$_Z (this, arguments);
}, java.lang, "StringBuffer", null, [java.io.Serializable, CharSequence]);
$_K (cla$$, 
function () {
this.construct (16);
});
$_K (cla$$, 
function (length) {
this.value =  $_A (length, '\0');
this.shared = false;
}, "Number");
$_K (cla$$, 
function (str) {
this.construct (str.length + 16);
this.append (str);
}, "String");
$_V (cla$$, "length", 
function () {
return this.count;
});
$_M (cla$$, "capacity", 
function () {
return this.value.length;
});
$_M (cla$$, "copy", 
($fz = function () {
var newValue =  $_A (this.value.length, '\0');
System.arraycopy (this.value, 0, newValue, 0, this.count);
this.value = newValue;
this.shared = false;
}, $fz.isPrivate = true, $fz));
$_M (cla$$, "ensureCapacity", 
function (minimumCapacity) {
if (minimumCapacity > this.value.length) {
this.expandCapacity (minimumCapacity);
}}, "Number");
$_M (cla$$, "expandCapacity", 
($fz = function (minimumCapacity) {
var newCapacity = (this.value.length + 1) * 2;
if (newCapacity < 0) {
newCapacity = Integer.MAX_VALUE;
} else if (minimumCapacity > newCapacity) {
newCapacity = minimumCapacity;
}var newValue =  $_A (newCapacity, '\0');
System.arraycopy (this.value, 0, newValue, 0, this.count);
this.value = newValue;
this.shared = false;
}, $fz.isPrivate = true, $fz), "Number");
$_M (cla$$, "setLength", 
function (newLength) {
if (newLength < 0) {
throw  new StringIndexOutOfBoundsException (newLength);
}if (newLength > this.value.length) {
this.expandCapacity (newLength);
}if (this.count < newLength) {
if (this.shared) this.copy ();
for (; this.count < newLength; this.count++) {
this.value[this.count] = '\0';
}
} else {
this.count = newLength;
if (this.shared) {
if (newLength > 0) {
this.copy ();
} else {
this.value =  $_A (16, '\0');
this.shared = false;
}}}}, "Number");
$_V (cla$$, "charAt", 
function (index) {
if ((index < 0) || (index >= this.count)) {
throw  new StringIndexOutOfBoundsException (index);
}return this.value[index];
}, "Number");
$_M (cla$$, "getChars", 
function (srcBegin, srcEnd, dst, dstBegin) {
if (srcBegin < 0) {
throw  new StringIndexOutOfBoundsException (srcBegin);
}if ((srcEnd < 0) || (srcEnd > this.count)) {
throw  new StringIndexOutOfBoundsException (srcEnd);
}if (srcBegin > srcEnd) {
throw  new StringIndexOutOfBoundsException ("srcBegin > srcEnd");
}System.arraycopy (this.value, srcBegin, dst, dstBegin, srcEnd - srcBegin);
}, "Number,Number,Array,Number");
$_M (cla$$, "setCharAt", 
function (index, ch) {
if ((index < 0) || (index >= this.count)) {
throw  new StringIndexOutOfBoundsException (index);
}if (this.shared) this.copy ();
this.value[index] = ch;
}, "Number,Number");
$_M (cla$$, "append", 
function (obj) {
return this.append (String.valueOf (obj));
}, "Object");
$_M (cla$$, "append", 
function (str) {
if (str == null) {
str = String.valueOf (str);
}var len = str.length;
var newcount = this.count + len;
if (newcount > this.value.length) this.expandCapacity (newcount);
str.getChars (0, len, this.value, this.count);
this.count = newcount;
return this;
}, "String");
$_M (cla$$, "append", 
function (sb) {
if (sb == null) {
sb = StringBuffer.NULL;
}var len = sb.length ();
var newcount = this.count + len;
if (newcount > this.value.length) this.expandCapacity (newcount);
sb.getChars (0, len, this.value, this.count);
this.count = newcount;
return this;
}, "StringBuffer");
$_M (cla$$, "append", 
function (str) {
var len = str.length;
var newcount = this.count + len;
if (newcount > this.value.length) this.expandCapacity (newcount);
System.arraycopy (str, 0, this.value, this.count, len);
this.count = newcount;
return this;
}, "Array");
$_M (cla$$, "append", 
function (str, offset, len) {
var newcount = this.count + len;
if (newcount > this.value.length) this.expandCapacity (newcount);
System.arraycopy (str, offset, this.value, this.count, len);
this.count = newcount;
return this;
}, "Array,Number,Number");
$_M (cla$$, "append", 
function (b) {
if (b) {
var newcount = this.count + 4;
if (newcount > this.value.length) this.expandCapacity (newcount);
this.value[this.count++] = 't';
this.value[this.count++] = 'r';
this.value[this.count++] = 'u';
this.value[this.count++] = 'e';
} else {
var newcount = this.count + 5;
if (newcount > this.value.length) this.expandCapacity (newcount);
this.value[this.count++] = 'f';
this.value[this.count++] = 'a';
this.value[this.count++] = 'l';
this.value[this.count++] = 's';
this.value[this.count++] = 'e';
}return this;
}, "Boolean");
$_M (cla$$, "append", 
function (c) {
var newcount = this.count + 1;
if (newcount > this.value.length) this.expandCapacity (newcount);
this.value[this.count++] = c;
return this;
}, "Number");
$_M (cla$$, "append", 
function (i) {
this.append ("" + i);
return this;
}, "Number");
$_M (cla$$, "append", 
function (l) {
this.append ("" + l);
return this;
}, "Number");
$_M (cla$$, "append", 
function (f) {
this.append ("" + f);
return this;
}, "Number");
$_M (cla$$, "append", 
function (d) {
this.append ("" + d);
return this;
}, "Number");
$_M (cla$$, "$delete", 
function (start, end) {
if (start < 0) throw  new StringIndexOutOfBoundsException (start);
if (end > this.count) end = this.count;
if (start > end) throw  new StringIndexOutOfBoundsException ();
var len = end - start;
if (len > 0) {
if (this.shared) this.copy ();
System.arraycopy (this.value, start + len, this.value, start, this.count - end);
this.count -= len;
}return this;
}, "Number,Number");
$_M (cla$$, "deleteCharAt", 
function (index) {
if ((index < 0) || (index >= this.count)) throw  new StringIndexOutOfBoundsException ();
if (this.shared) this.copy ();
System.arraycopy (this.value, index + 1, this.value, index, this.count - index - 1);
this.count--;
return this;
}, "Number");
$_M (cla$$, "replace", 
function (start, end, str) {
if (start < 0) throw  new StringIndexOutOfBoundsException (start);
if (end > this.count) end = this.count;
if (start > end) throw  new StringIndexOutOfBoundsException ();
var len = str.length;
var newCount = this.count + len - (end - start);
if (newCount > this.value.length) this.expandCapacity (newCount);
 else if (this.shared) this.copy ();
System.arraycopy (this.value, end, this.value, start + len, this.count - end);
str.getChars (0, len, this.value, start);
this.count = newCount;
return this;
}, "Number,Number,String");
$_M (cla$$, "substring", 
function (start) {
return this.substring (start, this.count);
}, "Number");
$_V (cla$$, "subSequence", 
function (start, end) {
return this.substring (start, end);
}, "Number,Number");
$_M (cla$$, "substring", 
function (start, end) {
if (start < 0) throw  new StringIndexOutOfBoundsException (start);
if (end > this.count) throw  new StringIndexOutOfBoundsException (end);
if (start > end) throw  new StringIndexOutOfBoundsException (end - start);
return  String.instantialize (this.value, start, end - start);
}, "Number,Number");
$_M (cla$$, "insert", 
function (index, str, offset, len) {
if ((index < 0) || (index > this.count)) throw  new StringIndexOutOfBoundsException ();
if ((offset < 0) || (offset + len < 0) || (offset + len > str.length)) throw  new StringIndexOutOfBoundsException (offset);
if (len < 0) throw  new StringIndexOutOfBoundsException (len);
var newCount = this.count + len;
if (newCount > this.value.length) this.expandCapacity (newCount);
 else if (this.shared) this.copy ();
System.arraycopy (this.value, index, this.value, index + len, this.count - index);
System.arraycopy (str, offset, this.value, index, len);
this.count = newCount;
return this;
}, "Number,Array,Number,Number");
$_M (cla$$, "insert", 
function (offset, obj) {
return this.insert (offset, String.valueOf (obj));
}, "Number,Object");
$_M (cla$$, "insert", 
function (offset, str) {
if ((offset < 0) || (offset > this.count)) {
throw  new StringIndexOutOfBoundsException ();
}if (str == null) {
str = String.valueOf (str);
}var len = str.length;
var newcount = this.count + len;
if (newcount > this.value.length) this.expandCapacity (newcount);
 else if (this.shared) this.copy ();
System.arraycopy (this.value, offset, this.value, offset + len, this.count - offset);
str.getChars (0, len, this.value, offset);
this.count = newcount;
return this;
}, "Number,String");
$_M (cla$$, "insert", 
function (offset, str) {
if ((offset < 0) || (offset > this.count)) {
throw  new StringIndexOutOfBoundsException ();
}var len = str.length;
var newcount = this.count + len;
if (newcount > this.value.length) this.expandCapacity (newcount);
 else if (this.shared) this.copy ();
System.arraycopy (this.value, offset, this.value, offset + len, this.count - offset);
System.arraycopy (str, 0, this.value, offset, len);
this.count = newcount;
return this;
}, "Number,Array");
$_M (cla$$, "insert", 
function (offset, b) {
return this.insert (offset, String.valueOf (b));
}, "Number,Boolean");
$_M (cla$$, "insert", 
function (offset, c) {
var newcount = this.count + 1;
if (newcount > this.value.length) this.expandCapacity (newcount);
 else if (this.shared) this.copy ();
System.arraycopy (this.value, offset, this.value, offset + 1, this.count - offset);
this.value[offset] = c;
this.count = newcount;
return this;
}, "Number,Number");
$_M (cla$$, "insert", 
function (offset, i) {
return this.insert (offset, String.valueOf (i));
}, "Number,Number");
$_M (cla$$, "insert", 
function (offset, l) {
return this.insert (offset, String.valueOf (l));
}, "Number,Number");
$_M (cla$$, "insert", 
function (offset, f) {
return this.insert (offset, String.valueOf (f));
}, "Number,Number");
$_M (cla$$, "insert", 
function (offset, d) {
return this.insert (offset, String.valueOf (d));
}, "Number,Number");
$_M (cla$$, "indexOf", 
function (str) {
return this.indexOf (str, 0);
}, "String");
$_M (cla$$, "indexOf", 
function (str, fromIndex) {
return String.indexOf (this.value, 0, this.count, str.toCharArray (), 0, str.length, fromIndex);
}, "String,Number");
$_M (cla$$, "lastIndexOf", 
function (str) {
return this.lastIndexOf (str, this.count);
}, "String");
$_M (cla$$, "lastIndexOf", 
function (str, fromIndex) {
return String.lastIndexOf (this.value, 0, this.count, str.toCharArray (), 0, str.length, fromIndex);
}, "String,Number");
$_M (cla$$, "reverse", 
function () {
if (this.shared) this.copy ();
var n = this.count - 1;
for (var j = (n - 1) >> 1; j >= 0; --j) {
var temp = this.value[j];
this.value[j] = this.value[n - j];
this.value[n - j] = temp;
}
return this;
});
$_V (cla$$, "toString", 
function () {
return  String.instantialize (this);
});
$_M (cla$$, "setShared", 
function () {
this.shared = true;
});
$_M (cla$$, "getValue", 
function () {
return this.value;
});
$_S (cla$$,
"serialVersionUID", 3388685877147921107);
cla$$.NULL = cla$$.prototype.NULL =  new StringBuffer ("null");
Clazz.declarePackage ("java.lang");
java.lang.Number = Number;
//Clazz.decorateAsType (Number, "Number", null, java.io.Serializable);
Number.__CLASS_NAME__ = "Number";
Clazz.implementOf (Number, java.io.Serializable);
Number.equals = Clazz.innerFunctions.equals;
Number.getName = Clazz.innerFunctions.getName;

Number.serialVersionUID = Number.prototype.serialVersionUID = -8742448824652078965;

Clazz.defineMethod (Number, "shortValue", 
function () {
return Math.round (this) & 0xffff;
});

Clazz.defineMethod (Number, "byteValue", 
function () {
return Math.round (this) & 0xff;
});

Clazz.defineMethod (Number, "intValue", 
function () {
return Math.round (this) & 0xffffffff;
});

Clazz.defineMethod (Number, "longValue", 
function () {
return Math.round (this);
});

Clazz.defineMethod (Number, "floatValue", 
function () {
return this;
});

Clazz.defineMethod (Number, "doubleValue", 
function () {
return this;
});

Clazz.defineMethod (Number, "hashCode", 
function () {
return this.valueOf ();
});
Clazz.declarePackage ("java.lang");
java.lang.Integer = Integer = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Integer, "Integer", Number, Comparable);
Integer.prototype.valueOf = function () { return 0; };
Integer.prototype.toString = function () {
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Integer, 
function () {
this.valueOf = function () {
	return 0;
};
});
Clazz.makeConstructor (Integer, 
function (value) {
var v = Math.round (value) & 0xffffffff;
this.valueOf = function () {
	return v;
};
}, "Number");
Clazz.makeConstructor (Integer, 
function (s) {
var value = Integer.parseInt (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");
Integer.serialVersionUID = Integer.prototype.serialVersionUID = 1360826667806852920;
Integer.MIN_VALUE = Integer.prototype.MIN_VALUE = -0x80000000;
Integer.MAX_VALUE = Integer.prototype.MAX_VALUE = 0x7fffffff;

Clazz.defineMethod (Integer, "parseInt", 
function (s, radix) {
if (s == null) {
throw  new NumberFormatException ("null");
}if (radix < 2) {
throw  new NumberFormatException ("radix " + radix + " less than Character.MIN_RADIX");
}if (radix > 36) {
throw  new NumberFormatException ("radix " + radix + " greater than Character.MAX_RADIX");
}
return parseInt (s, radix);
}, "String, Number");
Integer.parseInt = Integer.prototype.parseInt;
Clazz.defineMethod (Integer, "parseInt", 
function (s) {
return Integer.parseInt (s, 10);
}, "String");
Integer.parseInt = Integer.prototype.parseInt;
Clazz.declarePackage ("java.lang");
java.lang.Long = Long = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Long, "Long", Number, Comparable);
Long.prototype.valueOf = function () { return 0; };
Integer.prototype.toString = function () {
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Long, 
function () {
this.valueOf = function () {
	return 0;
};
});
Clazz.makeConstructor (Long, 
function (value) {
var v = Math.round (value);
this.valueOf = function () {
	return v;
};
}, "Number");
Clazz.makeConstructor (Long, 
function (s) {
var value = Long.parseLong (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");
Long.serialVersionUID = Long.prototype.serialVersionUID = 4290774380558885855;
Long.MIN_VALUE = Long.prototype.MIN_VALUE = -0x8000000000000000;
Long.MAX_VALUE = Long.prototype.MAX_VALUE = 0x7fffffffffffffff;

Clazz.defineMethod (Long, "parseLong", 
function (s, radix) {
if (s == null) {
throw  new NumberFormatException ("null");
}if (radix < 2) {
throw  new NumberFormatException ("radix " + radix + " less than Character.MIN_RADIX");
}if (radix > 36) {
throw  new NumberFormatException ("radix " + radix + " greater than Character.MAX_RADIX");
}
return parseInt (s, radix);
}, "String, Number");
Long.parseLong = Long.prototype.parseLong;
Clazz.defineMethod (Long, "parseLong", 
function (s) {
return Long.parseLong (s, 10);
}, "String");
Long.parseLong = Long.prototype.parseLong;
Clazz.declarePackage ("java.lang");
java.lang.Float = Float = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Float, "Float", Number, Comparable);
Float.prototype.valueOf = function () { return 0; };
Integer.prototype.toString = function () {
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Float, 
function () {
this.valueOf = function () {
	return 0.0;
};
});
Clazz.makeConstructor (Float, 
function (value) {
this.valueOf = function () {
	return value;
};
}, "Number");
Clazz.makeConstructor (Float, 
function (s) {
var value = Float.parseFloat (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");
Float.serialVersionUID = Float.prototype.serialVersionUID = -2671257302660747028;
Float.MIN_VALUE = Float.prototype.MIN_VALUE = 3.4028235e+38;
Float.MAX_VALUE = Float.prototype.MAX_VALUE = 1.4e-45;
Float.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Float.NaN = Number.NaN;

Clazz.defineMethod (Float, "parseFloat", 
function (s) {
if (s == null) {
throw  new NumberFormatException ("null");
}
return parseFloat (s);
}, "String");
Float.parseFloat = Float.prototype.parseFloat;
Clazz.defineMethod (Float, "isNaN", 
function (num) {
return isNaN (num);
}, "Number");
Float.isNaN = Float.prototype.isNaN;

Clazz.declarePackage ("java.lang");
java.lang.Double = Double = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Double, "Double", Number, Comparable);
Double.prototype.valueOf = function () { return 0; };
Integer.prototype.toString = function () {
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Double, 
function () {
this.valueOf = function () {
	return 0.0;
};
});
Clazz.makeConstructor (Double, 
function (value) {
this.valueOf = function () {
	return value;
};
}, "Number");
Clazz.makeConstructor (Double, 
function (s) {
var value = Double.parseDouble (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");

Double.serialVersionUID = Double.prototype.serialVersionUID = -9172774392245257468;
Double.MIN_VALUE = Double.prototype.MIN_VALUE = 3.4028235e+38;
Double.MAX_VALUE = Double.prototype.MAX_VALUE = 1.4e-45;
Double.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Double.NaN = Number.NaN;

Clazz.defineMethod (Double, "parseDouble", 
function (s) {
if (s == null) {
throw  new NumberFormatException ("null");
}
return parseFloat (s);
}, "String");
Double.parseDouble = Double.prototype.parseDouble;

Clazz.declarePackage ("java.util");
java.util.Date = Date;
Clazz.decorateAsType (java.util.Date, "java.util.Date", null, [java.io.Serializable, Cloneable, Comparable]);

Clazz.defineMethod (java.util.Date, "clone", 
function () {
return new Date (this.getTime ());
});

Clazz.defineMethod (java.util.Date, "before", 
function (when) {
return this.getTime () < when.getTime ();
}, "java.util.Date");
Clazz.defineMethod (java.util.Date, "after", 
function (when) {
return this.getTime () > when.getTime ();
}, "java.util.Date");
Clazz.defineMethod (java.util.Date, "equals", 
function (obj) {
return Clazz.instanceOf (obj, java.util.Date) && this.getTime () == (obj).getTime ();
}, "Object");
Clazz.defineMethod (java.util.Date, "compareTo", 
function (anotherDate) {
var thisTime = this.getTime ();
var anotherTime = anotherDate.getTime ();
return (thisTime < anotherTime ? -1 : (thisTime == anotherTime ? 0 : 1));
}, "java.util.Date");
Clazz.defineMethod (java.util.Date, "compareTo", 
function (o) {
return this.compareTo (o);
}, "Object");
Clazz.defineMethod (java.util.Date, "hashCode", 
function () {
var ht = this.getTime ();
return parseInt (ht) ^ parseInt ((ht >> 32));
});

cla$$ = $_C (function () {
this.detailMessage = null;
this.cause = this;
this.stackTrace = null;
$_Z (this, arguments);
}, java.lang, "Throwable", null, java.io.Serializable);
$_K (cla$$, 
function () {
this.fillInStackTrace ();
});
$_K (cla$$, 
function (message) {
this.fillInStackTrace ();
this.detailMessage = message;
}, "String");
$_K (cla$$, 
function (message, cause) {
this.fillInStackTrace ();
this.detailMessage = message;
this.cause = cause;
}, "String,Throwable");
$_K (cla$$, 
function (cause) {
this.fillInStackTrace ();
this.detailMessage = (cause == null ? null : cause.toString ());
this.cause = cause;
}, "Throwable");
$_M (cla$$, "getMessage", 
function () {
return this.detailMessage;
});
$_M (cla$$, "getLocalizedMessage", 
function () {
return this.getMessage ();
});
$_M (cla$$, "getCause", 
function () {
return (this.cause == this ? null : this.cause);
});
$_M (cla$$, "initCause", 
function (cause) {
if (this.cause != this) throw  new IllegalStateException ("Can't overwrite cause");
if (cause == this) throw  new IllegalArgumentException ("Self-causation not permitted");
this.cause = cause;
return this;
}, "Throwable");
$_V (cla$$, "toString", 
function () {
var s = this.getClass ().getName ();
var message = this.getLocalizedMessage ();
return (message != null) ? (s + ": " + message) : s;
});
$_M (cla$$, "printStackTrace", 
function () {
System.err.println (this);
for (var i = 0; i < this.stackTrace.length; i++) {
var st = this.stackTrace[i];
var idx = st.methodName.indexOf ("(");
var mName = st.methodName.substring (0, idx).replace (/\s+/g, "");
if (mName != "construct" || st.nativeClazz == null
|| Clazz.getInheritedLevel (st.nativeClazz, Throwable) < 0) {
System.err.println (this.stackTrace[i]);
}
}
});
$_M (cla$$, "printStackTrace", 
function (s) {
this.printStackTrace ();
}, "java.io.PrintStream");
$_M (cla$$, "printStackTrace", 
function (s) {
this.printStackTrace ();
}, "java.io.PrintWriter");
$_M (cla$$, "fillInStackTrace", 
function () {
this.stackTrace = new Array ();
var caller = arguments.callee.caller;
var superCaller = null;
var callerList = new Array ();
var index = Clazz.callingStackTraces.length - 1;
var noLooping = true;
while (index > -1 || caller != null) {
var clazzName = null;
var nativeClazz = null;
if (!noLooping || caller == Clazz.tryToSearchAndExecute || caller == $_U || caller == null) {
if (index < 0) {
break;
}
noLooping = true;
superCaller = Clazz.callingStackTraces[index].caller;
nativeClazz = Clazz.callingStackTraces[index].owner;
index--;
} else {
superCaller = caller;
if (superCaller.claxxOwner != null) {
nativeClazz = superCaller.claxxOwner;
} else if (superCaller.exClazz != null) {
nativeClazz = superCaller.exClazz;
}
}
var st = new StackTraceElement ();
st.nativeClazz = nativeClazz;
st.declaringClass = (nativeClazz != null
&& nativeClazz.__CLASS_NAME__.length != 0) ?
nativeClazz.__CLASS_NAME__ : "anonymous";
st.methodName = ((superCaller.exName == null) ? "anonymous" : superCaller.exName)
+ " (" + Clazz.getParamsType (superCaller.arguments) + ")";
st.fileName = null;
st.lineNumber = -1;
this.stackTrace[this.stackTrace.length] = st;
for (var i = 0; i < callerList.length; i++) {
if (callerList[i] == superCaller) {
// ... stack information lost as recursive invocation existed ...
var st = new StackTraceElement ();
st.nativeClazz = null;
st.declaringClass = "lost";
st.methodName = "missing";
st.fileName = null;
st.lineNumber = -3;
this.stackTrace[this.stackTrace.length] = st;
noLooping = false;
//break;
}
}
if (superCaller != null) {
callerList[callerList.length] = superCaller;
}
caller = superCaller.arguments.callee.caller;
}
Clazz.initializingException = false;
return this;
});
$_M (cla$$, "setStackTrace", 
function (stackTrace) {
var defensiveCopy = stackTrace.clone ();
for (var i = 0; i < defensiveCopy.length; i++) if (defensiveCopy[i] == null) throw  new NullPointerException ("stackTrace[" + i + "]");

this.stackTrace = defensiveCopy;
}, "Array");
$_S (cla$$,
"serialVersionUID", -3042686055658047285);
cla$$ = $_C (function () {
this.declaringClass = null;
this.methodName = null;
this.fileName = null;
this.lineNumber = 0;
$_Z (this, arguments);
}, java.lang, "StackTraceElement", null, java.io.Serializable);
$_M (cla$$, "getFileName", 
function () {
return this.fileName;
});
$_M (cla$$, "getLineNumber", 
function () {
return this.lineNumber;
});
$_M (cla$$, "getClassName", 
function () {
return this.declaringClass;
});
$_M (cla$$, "getMethodName", 
function () {
return this.methodName;
});
$_M (cla$$, "isNativeMethod", 
function () {
return this.lineNumber == -2;
});
$_V (cla$$, "toString", 
function () {
if (this.lineNumber == -3) {
return "... stack information lost as recursive invocation existed ...";
}return this.getClassName () + "." + this.methodName;
});
$_M (cla$$, "equals", 
function (obj) {
if (obj == this) return true;
if (!($_O (obj, StackTraceElement))) return false;
var e = obj;
return e.declaringClass.equals (this.declaringClass) && e.lineNumber == this.lineNumber && StackTraceElement.eq (this.methodName, e.methodName) && StackTraceElement.eq (this.fileName, e.fileName);
}, "Object");
cla$$.eq = $_M (cla$$, "eq", 
($fz = function (a, b) {
return a == b || (a != null && a.equals (b));
}, $fz.isPrivate = true, $fz), "Object,Object");
$_V (cla$$, "hashCode", 
function () {
var result = 31 * this.declaringClass.hashCode () + this.methodName.hashCode ();
result = 31 * result + (this.fileName == null ? 0 : this.fileName.hashCode ());
result = 31 * result + this.lineNumber;
return result;
});
$_S (cla$$,
"serialVersionUID", 6992337162326171013);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.lang, "Exception", Throwable);
$_K (cla$$, 
function () {
$_R (this, Exception);
});
$_K (cla$$, 
function (message) {
$_R (this, Exception, [message]);
}, "String");
$_K (cla$$, 
function (message, cause) {
$_R (this, Exception, [message, cause]);
}, "String,Throwable");
$_K (cla$$, 
function (cause) {
$_R (this, Exception, [cause]);
}, "Throwable");
$_S (cla$$,
"serialVersionUID", -3387516993124229948);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.lang, "Error", Throwable);
$_K (cla$$, 
function () {
$_R (this, Error);
});
$_K (cla$$, 
function (message) {
$_R (this, Error, [message]);
}, "String");
$_K (cla$$, 
function (message, cause) {
$_R (this, Error, [message, cause]);
}, "String,Throwable");
$_K (cla$$, 
function (cause) {
$_R (this, Error, [cause]);
}, "Throwable");
$_S (cla$$,
"serialVersionUID", 4980196508277280342);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.lang, "RuntimeException", Exception);
$_K (cla$$, 
function () {
$_R (this, RuntimeException);
});
$_K (cla$$, 
function (message) {
$_R (this, RuntimeException, [message]);
}, "String");
$_K (cla$$, 
function (message, cause) {
$_R (this, RuntimeException, [message, cause]);
}, "String,Throwable");
$_K (cla$$, 
function (cause) {
$_R (this, RuntimeException, [cause]);
}, "Throwable");
$_S (cla$$,
"serialVersionUID", -7034897190745766939);
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.lang, "NullPointerException", RuntimeException);
$_K (cla$$, 
function () {
$_R (this, NullPointerException);
});
$_K (cla$$, 
function (s) {
$_R (this, NullPointerException, [s]);
}, "String");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.lang, "IllegalArgumentException", RuntimeException);
$_K (cla$$, 
function () {
$_R (this, IllegalArgumentException);
});
$_K (cla$$, 
function (s) {
$_R (this, IllegalArgumentException, [s]);
}, "String");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.lang, "Error", Throwable);
$_K (cla$$, 
function () {
$_R (this, Error);
});
$_K (cla$$, 
function (message) {
$_R (this, Error, [message]);
}, "String");
$_K (cla$$, 
function (message, cause) {
$_R (this, Error, [message, cause]);
}, "String,Throwable");
$_K (cla$$, 
function (cause) {
$_R (this, Error, [cause]);
}, "Throwable");
$_S (cla$$,
"serialVersionUID", 4980196508277280342);
cla$$ = $_C (function () {
this.parent = null;
this.name = null;
this.maxPriority = 0;
$_Z (this, arguments);
}, java.lang, "ThreadGroup");
$_K (cla$$, 
function () {
this.name = "system";
this.maxPriority = Thread.MAX_PRIORITY;
});
$_K (cla$$, 
function (name) {
this.construct (Thread.currentThread ().getThreadGroup (), name);
}, "String");
$_K (cla$$, 
function (parent, name) {
if (parent == null) {
throw  new NullPointerException ();
}this.name = name;
this.parent = parent;
this.maxPriority = Thread.MAX_PRIORITY;
}, "ThreadGroup,String");
$_M (cla$$, "getName", 
function () {
return this.name;
});
$_M (cla$$, "getParent", 
function () {
return this.parent;
});
$_M (cla$$, "getMaxPriority", 
function () {
return this.maxPriority;
});
cla$$ = $_C (function () {
this.target = null;
this.group = null;
this.name = null;
this.priority = 0;
$_Z (this, arguments);
}, java.lang, "Thread", null, Runnable);
cla$$.currentThread = $_M (cla$$, "currentThread", 
function () {
if (Thread.J2S_THREAD == null) {
($t$ = Thread.J2S_THREAD =  new Thread (), Thread.prototype.J2S_THREAD = Thread.J2S_THREAD, $t$);
}return Thread.J2S_THREAD;
});
cla$$.sleep = $_M (cla$$, "sleep", 
function (millis) {
alert ("Thread.sleep is not implemented in Java2Script!");
}, "Number");
$_K (cla$$, 
function () {
});
$_K (cla$$, 
function (target) {
this.init (null, target, "Thread-" +  new java.util.Date ().getTime () + Math.random (), 0);
}, "Runnable");
$_K (cla$$, 
function (group, target) {
this.init (group, target, "Thread-" +  new java.util.Date ().getTime () + Math.random (), 0);
}, "ThreadGroup,Runnable");
$_K (cla$$, 
function (name) {
this.init (null, null, name, 0);
}, "String");
$_K (cla$$, 
function (group, name) {
this.init (group, null, name, 0);
}, "ThreadGroup,String");
$_K (cla$$, 
function (target, name) {
this.init (null, target, name, 0);
}, "Runnable,String");
$_K (cla$$, 
function (group, target, name) {
this.init (group, target, name, 0);
}, "ThreadGroup,Runnable,String");
$_K (cla$$, 
function (group, target, name, stackSize) {
this.init (group, target, name, stackSize);
}, "ThreadGroup,Runnable,String,Number");
$_M (cla$$, "init", 
($fz = function (g, target, name, stackSize) {
if (g == null) {
g =  new ThreadGroup ();
}this.group = g;
this.target = target;
this.name = name;
this.priority = Thread.NORM_PRIORITY;
}, $fz.isPrivate = true, $fz), "ThreadGroup,Runnable,String,Number");
$_M (cla$$, "start", 
function () {
window.setTimeout ((function (runnable) {
return function () {
runnable.run ();
};
}) (this), 0);
});
$_M (cla$$, "run", 
function () {
if (this.target != null) {
this.target.run ();
}});
$_M (cla$$, "setPriority", 
function (newPriority) {
if (newPriority > Thread.MAX_PRIORITY || newPriority < Thread.MIN_PRIORITY) {
throw  new IllegalArgumentException ();
}this.priority = newPriority;
}, "Number");
$_M (cla$$, "getPriority", 
function () {
return this.priority;
});
$_M (cla$$, "setName", 
function (name) {
this.name = name;
}, "String");
$_M (cla$$, "getName", 
function () {
return String.valueOf (this.name);
});
$_M (cla$$, "getThreadGroup", 
function () {
return this.group;
});
$_V (cla$$, "toString", 
function () {
var group = this.getThreadGroup ();
if (group != null) {
return "Thread[" + this.getName () + "," + this.getPriority () + "," + group.getName () + "]";
} else {
return "Thread[" + this.getName () + "," + this.getPriority () + "," + "" + "]";
}});
$_S (cla$$,
"MIN_PRIORITY", 1,
"NORM_PRIORITY", 5,
"MAX_PRIORITY", 10,
"J2S_THREAD", null);
$_J ("java.util");
$_I (java.util, "Iterator");
$_J ("java.util");
$_I (java.util, "ListIterator", java.util.Iterator);
$_J ("java.util");
$_I (java.util, "Enumeration");
$_J ("java.util");
$_I (java.util, "Collection");
$_J ("java.util");
$_I (java.util, "Set", java.util.Collection);
$_J ("java.util");
$_I (java.util, "Map");
$_I (java.util.Map, "Entry");
$_J ("java.util");
$_I (java.util, "List", java.util.Collection);
$_J ("java.util");
$_I (java.util, "RandomAccess");
$_J ("java.util");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.util, "AbstractCollection", null, java.util.Collection);
$_K (cla$$, 
function () {
});
$_V (cla$$, "isEmpty", 
function () {
return this.size () == 0;
});
$_M (cla$$, "contains", 
function (o) {
var e = this.iterator ();
if (o == null) {
while (e.hasNext ()) if (e.next () == null) return true;

} else {
while (e.hasNext ()) if (o.equals (e.next ())) return true;

}return false;
}, "Object");
$_M (cla$$, "toArray", 
function () {
var result =  new Array (this.size ());
var e = this.iterator ();
for (var i = 0; e.hasNext (); i++) result[i] = e.next ();

return result;
});
$_M (cla$$, "toArray", 
function (a) {
var size = this.size ();
if (a.length < size) a = java.lang.reflect.Array.newInstance (a.getClass ().getComponentType (), size);
var it = this.iterator ();
for (var i = 0; i < size; i++) a[i] = it.next ();

if (a.length > size) a[size] = null;
return a;
}, "Array");
$_V (cla$$, "add", 
function (o) {
throw  new UnsupportedOperationException ();
}, "Object");
$_V (cla$$, "remove", 
function (o) {
var e = this.iterator ();
if (o == null) {
while (e.hasNext ()) {
if (e.next () == null) {
e.remove ();
return true;
}}
} else {
while (e.hasNext ()) {
if (o.equals (e.next ())) {
e.remove ();
return true;
}}
}return false;
}, "Object");
$_V (cla$$, "containsAll", 
function (c) {
var e = c.iterator ();
while (e.hasNext ()) if (!this.contains (e.next ())) return false;

return true;
}, "java.util.Collection");
$_V (cla$$, "addAll", 
function (c) {
var modified = false;
var e = c.iterator ();
while (e.hasNext ()) {
if (this.add (e.next ())) modified = true;
}
return modified;
}, "java.util.Collection");
$_V (cla$$, "removeAll", 
function (c) {
var modified = false;
var e = this.iterator ();
while (e.hasNext ()) {
if (c.contains (e.next ())) {
e.remove ();
modified = true;
}}
return modified;
}, "java.util.Collection");
$_V (cla$$, "retainAll", 
function (c) {
var modified = false;
var e = this.iterator ();
while (e.hasNext ()) {
if (!c.contains (e.next ())) {
e.remove ();
modified = true;
}}
return modified;
}, "java.util.Collection");
$_V (cla$$, "clear", 
function () {
var e = this.iterator ();
while (e.hasNext ()) {
e.next ();
e.remove ();
}
});
$_V (cla$$, "toString", 
function () {
var buf =  new StringBuffer ();
buf.append ("[");
var i = this.iterator ();
var hasNext = i.hasNext ();
while (hasNext) {
var o = i.next ();
buf.append (o == this ? "(this Collection)" : String.valueOf (o));
hasNext = i.hasNext ();
if (hasNext) buf.append (", ");
}
buf.append ("]");
return buf.toString ();
});
$_J ("java.util");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.util, "AbstractSet", java.util.AbstractCollection, java.util.Set);
$_K (cla$$, 
function () {
$_R (this, java.util.AbstractSet, []);
});
$_V (cla$$, "equals", 
function (o) {
if (o == this) return true;
if (!($_O (o, java.util.Set))) return false;
var c = o;
if (c.size () != this.size ()) return false;
try {
return this.containsAll (c);
} catch (e) {
if ($_O (e, ClassCastException)) {
return false;
} else if ($_O (e, NullPointerException)) {
return false;
} else {
throw e;
}
}
}, "Object");
$_V (cla$$, "hashCode", 
function () {
var h = 0;
var i = this.iterator ();
while (i.hasNext ()) {
var obj = i.next ();
if (obj != null) h += obj.hashCode ();
}
return h;
});
$_V (cla$$, "removeAll", 
function (c) {
var modified = false;
if (this.size () > c.size ()) {
for (var i = c.iterator (); i.hasNext (); ) modified = new Boolean (modified | this.remove (i.next ()));

} else {
for (var i = this.iterator (); i.hasNext (); ) {
if (c.contains (i.next ())) {
i.remove ();
modified = true;
}}
}return modified;
}, "java.util.Collection");
$_J ("java.util");
cla$$ = $_C (function () {
this.$keySet = null;
this.$values = null;
$_Z (this, arguments);
}, java.util, "AbstractMap", null, java.util.Map);
Clazz.pu$h ();
cla$$ = $_C (function () {
this.key = null;
this.value = null;
$_Z (this, arguments);
}, java.util.AbstractMap, "SimpleEntry", null, java.util.Map.Entry);
$_K (cla$$, 
function (key, value) {
this.key = key;
this.value = value;
}, "Object,Object");
$_K (cla$$, 
function (e) {
this.key = e.getKey ();
this.value = e.getValue ();
}, "java.util.Map.Entry");
$_M (cla$$, "getKey", 
function () {
return this.key;
});
$_M (cla$$, "getValue", 
function () {
return this.value;
});
$_V (cla$$, "setValue", 
function (value) {
var oldValue = this.value;
this.value = value;
return oldValue;
}, "Object");
$_V (cla$$, "equals", 
function (o) {
if (!($_O (o, java.util.Map.Entry))) return false;
var e = o;
return java.util.AbstractMap.SimpleEntry.eq (this.key, e.getKey ()) && java.util.AbstractMap.SimpleEntry.eq (this.value, e.getValue ());
}, "Object");
$_V (cla$$, "hashCode", 
function () {
var v;
return ((this.key == null) ? 0 : this.key.hashCode ()) ^ ((this.value == null) ? 0 : this.value.hashCode ());
});
$_V (cla$$, "toString", 
function () {
return this.key + "=" + this.value;
});
cla$$.eq = $_M (cla$$, "eq", 
($fz = function (o1, o2) {
return (o1 == null ? o2 == null : o1.equals (o2));
}, $fz.isPrivate = true, $fz), "Object,Object");
cla$$ = $_P ();
$_K (cla$$, 
function () {
});
$_M (cla$$, "size", 
function () {
return this.entrySet ().size ();
});
$_V (cla$$, "isEmpty", 
function () {
return this.size () == 0;
});
$_V (cla$$, "containsValue", 
function (value) {
var i = this.entrySet ().iterator ();
if (value == null) {
while (i.hasNext ()) {
var e = i.next ();
if (e.getValue () == null) return true;
}
} else {
while (i.hasNext ()) {
var e = i.next ();
if (value.equals (e.getValue ())) return true;
}
}return false;
}, "Object");
$_M (cla$$, "containsKey", 
function (key) {
var i = this.entrySet ().iterator ();
if (key == null) {
while (i.hasNext ()) {
var e = i.next ();
if (e.getKey () == null) return true;
}
} else {
while (i.hasNext ()) {
var e = i.next ();
if (key.equals (e.getKey ())) return true;
}
}return false;
}, "Object");
$_M (cla$$, "get", 
function (key) {
var i = this.entrySet ().iterator ();
if (key == null) {
while (i.hasNext ()) {
var e = i.next ();
if (e.getKey () == null) return e.getValue ();
}
} else {
while (i.hasNext ()) {
var e = i.next ();
if (key.equals (e.getKey ())) return e.getValue ();
}
}return null;
}, "Object");
$_V (cla$$, "put", 
function (key, value) {
throw  new UnsupportedOperationException ();
}, "Object,Object");
$_V (cla$$, "remove", 
function (key) {
var i = this.entrySet ().iterator ();
var correctEntry = null;
if (key == null) {
while (correctEntry == null && i.hasNext ()) {
var e = i.next ();
if (e.getKey () == null) correctEntry = e;
}
} else {
while (correctEntry == null && i.hasNext ()) {
var e = i.next ();
if (key.equals (e.getKey ())) correctEntry = e;
}
}var oldValue = null;
if (correctEntry != null) {
oldValue = correctEntry.getValue ();
i.remove ();
}return oldValue;
}, "Object");
$_V (cla$$, "putAll", 
function (t) {
var i = t.entrySet ().iterator ();
while (i.hasNext ()) {
var e = i.next ();
this.put (e.getKey (), e.getValue ());
}
}, "java.util.Map");
$_V (cla$$, "clear", 
function () {
this.entrySet ().clear ();
});
$_V (cla$$, "keySet", 
function () {
if (this.$keySet == null) {
this.$keySet = (function (innerThis, finalVars) {
if (!$_D ("java.util.AbstractMap$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util, "AbstractMap$1", java.util.AbstractSet);
$_M (cla$$, "iterator", 
function () {
return (function (innerThis, finalVars) {
if (!$_D ("java.util.AbstractMap$1$2")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
this.i = this.callbacks["java.util.AbstractMap"].entrySet ().iterator ();
$_Z (this, arguments);
}, java.util, "AbstractMap$1$2", null, java.util.Iterator);
$_M (cla$$, "hasNext", 
function () {
return this.i.hasNext ();
});
$_M (cla$$, "next", 
function () {
return (this.i.next ()).getKey ();
});
$_M (cla$$, "remove", 
function () {
this.i.remove ();
});
cla$$ = $_P ();
}
return $_N (java.util.AbstractMap$1$2, innerThis, finalVars);
}) (this, null);
});
$_M (cla$$, "size", 
function () {
return this.callbacks["java.util.AbstractMap"].size ();
});
$_V (cla$$, "contains", 
function (k) {
return this.callbacks["java.util.AbstractMap"].containsKey (k);
}, "Object");
cla$$ = $_P ();
}
return $_N (java.util.AbstractMap$1, innerThis, finalVars);
}) (this, null);
}return this.$keySet;
});
$_V (cla$$, "values", 
function () {
if (this.$values == null) {
this.$values = (function (innerThis, finalVars) {
if (!$_D ("java.util.AbstractMap$3")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util, "AbstractMap$3", java.util.AbstractCollection);
$_V (cla$$, "iterator", 
function () {
return (function (innerThis, finalVars) {
if (!$_D ("java.util.AbstractMap$3$4")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
this.i = this.callbacks["java.util.AbstractMap"].entrySet ().iterator ();
$_Z (this, arguments);
}, java.util, "AbstractMap$3$4", null, java.util.Iterator);
$_M (cla$$, "hasNext", 
function () {
return this.i.hasNext ();
});
$_M (cla$$, "next", 
function () {
return (this.i.next ()).getValue ();
});
$_M (cla$$, "remove", 
function () {
this.i.remove ();
});
cla$$ = $_P ();
}
return $_N (java.util.AbstractMap$3$4, innerThis, finalVars);
}) (this, null);
});
$_V (cla$$, "size", 
function () {
return this.callbacks["java.util.AbstractMap"].size ();
});
$_V (cla$$, "contains", 
function (v) {
return this.callbacks["java.util.AbstractMap"].containsValue (v);
}, "Object");
cla$$ = $_P ();
}
return $_N (java.util.AbstractMap$3, innerThis, finalVars);
}) (this, null);
}return this.$values;
});
$_V (cla$$, "equals", 
function (o) {
if (o == this) return true;
if (!($_O (o, java.util.Map))) return false;
var t = o;
if (t.size () != this.size ()) return false;
try {
var i = this.entrySet ().iterator ();
while (i.hasNext ()) {
var e = i.next ();
var key = e.getKey ();
var value = e.getValue ();
if (value == null) {
if (!(t.get (key) == null && t.containsKey (key))) return false;
} else {
if (!value.equals (t.get (key))) return false;
}}
} catch (e) {
if ($_O (e, ClassCastException)) {
return false;
} else if ($_O (e, NullPointerException)) {
return false;
} else {
throw e;
}
}
return true;
}, "Object");
$_V (cla$$, "hashCode", 
function () {
var h = 0;
var i = this.entrySet ().iterator ();
while (i.hasNext ()) h += i.next ().hashCode ();

return h;
});
$_V (cla$$, "toString", 
function () {
var buf =  new StringBuffer ();
buf.append ("{");
var i = this.entrySet ().iterator ();
var hasNext = i.hasNext ();
while (hasNext) {
var e = (i.next ());
var key = e.getKey ();
var value = e.getValue ();
buf.append ((key == this ? "(this Map)" : key) + "=" + (value == this ? "(this Map)" : value));
hasNext = i.hasNext ();
if (hasNext) buf.append (", ");
}
buf.append ("}");
return buf.toString ();
});
$_M (cla$$, "clone", 
function () {
var result = $_U (this, java.util.AbstractMap, "clone", []);
result.$keySet = null;
result.$values = null;
return result;
});
$_J ("java.util");
cla$$ = $_C (function () {
if (!$_D ("java.util.AbstractList.Itr")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
this.cursor = 0;
this.lastRet = -1;
this.expectedModCount = this.callbacks["java.util.AbstractList"].modCount;
$_Z (this, arguments);
}, java.util.AbstractList, "Itr", null, java.util.Iterator);
$_V (cla$$, "hasNext", 
function () {
return this.cursor != this.callbacks["java.util.AbstractList"].size ();
});
$_V (cla$$, "next", 
function () {
this.checkForComodification ();
try {
var next = this.callbacks["java.util.AbstractList"].get (this.cursor);
this.lastRet = this.cursor++;
return next;
} catch (e) {
if ($_O (e, IndexOutOfBoundsException)) {
this.checkForComodification ();
throw  new java.util.NoSuchElementException ();
} else {
throw e;
}
}
});
$_V (cla$$, "remove", 
function () {
if (this.lastRet == -1) throw  new IllegalStateException ();
this.checkForComodification ();
try {
this.callbacks["java.util.AbstractList"].remove (this.lastRet);
if (this.lastRet < this.cursor) this.cursor--;
this.lastRet = -1;
this.expectedModCount = this.callbacks["java.util.AbstractList"].modCount;
} catch (e) {
if ($_O (e, IndexOutOfBoundsException)) {
throw  new java.util.ConcurrentModificationException ();
} else {
throw e;
}
}
});
$_M (cla$$, "checkForComodification", 
function () {
if (this.callbacks["java.util.AbstractList"].modCount != this.expectedModCount) throw  new java.util.ConcurrentModificationException ();
});
cla$$ = $_P ();
}
if (!$_D ("java.util.AbstractList.ListItr")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.AbstractList, "ListItr", java.util.AbstractList.Itr, java.util.ListIterator, $_N (java.util.AbstractList.Itr, this, null, $_G));
$_K (cla$$, 
function (index) {
$_R (this, java.util.AbstractList.ListItr, []);
this.cursor = index;
}, "Number");
$_V (cla$$, "hasPrevious", 
function () {
return this.cursor != 0;
});
$_V (cla$$, "previous", 
function () {
this.checkForComodification ();
try {
var i = this.cursor - 1;
var previous = this.callbacks["java.util.AbstractList"].get (i);
this.lastRet = this.cursor = i;
return previous;
} catch (e) {
if ($_O (e, IndexOutOfBoundsException)) {
this.checkForComodification ();
throw  new java.util.NoSuchElementException ();
} else {
throw e;
}
}
});
$_V (cla$$, "nextIndex", 
function () {
return this.cursor;
});
$_V (cla$$, "previousIndex", 
function () {
return this.cursor - 1;
});
$_V (cla$$, "set", 
function (o) {
if (this.lastRet == -1) throw  new IllegalStateException ();
this.checkForComodification ();
try {
this.callbacks["java.util.AbstractList"].set (this.lastRet, o);
this.expectedModCount = this.callbacks["java.util.AbstractList"].modCount;
} catch (e) {
if ($_O (e, IndexOutOfBoundsException)) {
throw  new java.util.ConcurrentModificationException ();
} else {
throw e;
}
}
}, "Object");
$_V (cla$$, "add", 
function (o) {
this.checkForComodification ();
try {
this.callbacks["java.util.AbstractList"].add (this.cursor++, o);
this.lastRet = -1;
this.expectedModCount = this.callbacks["java.util.AbstractList"].modCount;
} catch (e) {
if ($_O (e, IndexOutOfBoundsException)) {
throw  new java.util.ConcurrentModificationException ();
} else {
throw e;
}
}
}, "Object");
cla$$ = $_P ();
}
this.modCount = 0;
$_Z (this, arguments);
}, java.util, "AbstractList", java.util.AbstractCollection, java.util.List);
$_K (cla$$, 
function () {
$_R (this, java.util.AbstractList, []);
});
$_M (cla$$, "add", 
function (o) {
this.add (this.size (), o);
return true;
}, "Object");
$_V (cla$$, "set", 
function (index, element) {
throw  new UnsupportedOperationException ();
}, "Number,Object");
$_M (cla$$, "add", 
function (index, element) {
throw  new UnsupportedOperationException ();
}, "Number,Object");
$_M (cla$$, "remove", 
function (index) {
throw  new UnsupportedOperationException ();
}, "Number");
$_V (cla$$, "indexOf", 
function (o) {
var e = this.listIterator ();
if (o == null) {
while (e.hasNext ()) if (e.next () == null) return e.previousIndex ();

} else {
while (e.hasNext ()) if (o.equals (e.next ())) return e.previousIndex ();

}return -1;
}, "Object");
$_V (cla$$, "lastIndexOf", 
function (o) {
var e = this.listIterator (this.size ());
if (o == null) {
while (e.hasPrevious ()) if (e.previous () == null) return e.nextIndex ();

} else {
while (e.hasPrevious ()) if (o.equals (e.previous ())) return e.nextIndex ();

}return -1;
}, "Object");
$_V (cla$$, "clear", 
function () {
this.removeRange (0, this.size ());
});
$_M (cla$$, "addAll", 
function (index, c) {
var modified = false;
var e = c.iterator ();
while (e.hasNext ()) {
this.add (index++, e.next ());
modified = true;
}
return modified;
}, "Number,java.util.Collection");
$_V (cla$$, "iterator", 
function () {
return $_N (java.util.AbstractList.Itr, this, null);
});
$_M (cla$$, "listIterator", 
function () {
return this.listIterator (0);
});
$_M (cla$$, "listIterator", 
function (index) {
if (index < 0 || index > this.size ()) throw  new IndexOutOfBoundsException ("Index: " + index);
return $_N (java.util.AbstractList.ListItr, this, null, index);
}, "Number");
$_V (cla$$, "subList", 
function (fromIndex, toIndex) {
return ($_O (this, java.util.RandomAccess) ?  new java.util.RandomAccessSubList (this, fromIndex, toIndex) :  new java.util.SubList (this, fromIndex, toIndex));
}, "Number,Number");
$_V (cla$$, "equals", 
function (o) {
if (o == this) return true;
if (!($_O (o, java.util.List))) return false;
var e1 = this.listIterator ();
var e2 = (o).listIterator ();
while (e1.hasNext () && e2.hasNext ()) {
var o1 = e1.next ();
var o2 = e2.next ();
if (!(o1 == null ? o2 == null : o1.equals (o2))) return false;
}
return !(e1.hasNext () || e2.hasNext ());
}, "Object");
$_V (cla$$, "hashCode", 
function () {
var hashCode = 1;
var i = this.iterator ();
while (i.hasNext ()) {
var obj = i.next ();
hashCode = 31 * hashCode + (obj == null ? 0 : obj.hashCode ());
}
return hashCode;
});
$_M (cla$$, "removeRange", 
function (fromIndex, toIndex) {
var it = this.listIterator (fromIndex);
for (var i = 0, n = toIndex - fromIndex; i < n; i++) {
it.next ();
it.remove ();
}
}, "Number,Number");
cla$$ = $_C (function () {
this.l = null;
this.offset = 0;
this.$size = 0;
this.expectedModCount = 0;
$_Z (this, arguments);
}, java.util, "SubList", java.util.AbstractList);
$_K (cla$$, 
function (list, fromIndex, toIndex) {
$_R (this, java.util.SubList, []);
if (fromIndex < 0) throw  new IndexOutOfBoundsException ("fromIndex = " + fromIndex);
if (toIndex > list.size ()) throw  new IndexOutOfBoundsException ("toIndex = " + toIndex);
if (fromIndex > toIndex) throw  new IllegalArgumentException ("fromIndex(" + fromIndex + ") > toIndex(" + toIndex + ")");
this.l = list;
this.offset = fromIndex;
this.$size = toIndex - fromIndex;
this.expectedModCount = this.l.modCount;
}, "java.util.AbstractList,Number,Number");
$_M (cla$$, "set", 
function (index, element) {
this.rangeCheck (index);
this.checkForComodification ();
return this.l.set (index + this.offset, element);
}, "Number,Object");
$_M (cla$$, "get", 
function (index) {
this.rangeCheck (index);
this.checkForComodification ();
return this.l.get (index + this.offset);
}, "Number");
$_V (cla$$, "size", 
function () {
this.checkForComodification ();
return this.$size;
});
$_M (cla$$, "add", 
function (index, element) {
if (index < 0 || index > this.$size) throw  new IndexOutOfBoundsException ();
this.checkForComodification ();
this.l.add (index + this.offset, element);
this.expectedModCount = this.l.modCount;
this.$size++;
this.modCount++;
}, "Number,Object");
$_M (cla$$, "remove", 
function (index) {
this.rangeCheck (index);
this.checkForComodification ();
var result = this.l.remove (index + this.offset);
this.expectedModCount = this.l.modCount;
this.$size--;
this.modCount++;
return result;
}, "Number");
$_M (cla$$, "removeRange", 
function (fromIndex, toIndex) {
this.checkForComodification ();
this.l.removeRange (fromIndex + this.offset, toIndex + this.offset);
this.expectedModCount = this.l.modCount;
this.$size -= (toIndex - fromIndex);
this.modCount++;
}, "Number,Number");
$_M (cla$$, "addAll", 
function (c) {
return this.addAll (this.$size, c);
}, "java.util.Collection");
$_M (cla$$, "addAll", 
function (index, c) {
if (index < 0 || index > this.$size) throw  new IndexOutOfBoundsException ("Index: " + index + ", Size: " + this.$size);
var cSize = c.size ();
if (cSize == 0) return false;
this.checkForComodification ();
this.l.addAll (this.offset + index, c);
this.expectedModCount = this.l.modCount;
this.$size += cSize;
this.modCount++;
return true;
}, "Number,java.util.Collection");
$_V (cla$$, "iterator", 
function () {
return this.listIterator ();
});
$_M (cla$$, "listIterator", 
function (index) {
this.checkForComodification ();
if (index < 0 || index > this.$size) throw  new IndexOutOfBoundsException ("Index: " + index + ", Size: " + this.$size);
return (function (innerThis, finalVars) {
if (!$_D ("java.util.SubList$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
this.i = this.callbacks["java.util.SubList"].l.listIterator (index + this.callbacks["java.util.SubList"].offset);
$_Z (this, arguments);
}, java.util, "SubList$1", null, java.util.ListIterator);
$_V (cla$$, "hasNext", 
function () {
return this.nextIndex () < this.callbacks["java.util.SubList"].$size;
});
$_M (cla$$, "next", 
function () {
if (this.hasNext ()) return this.i.next ();
 else throw  new java.util.NoSuchElementException ();
});
$_V (cla$$, "hasPrevious", 
function () {
return this.previousIndex () >= 0;
});
$_M (cla$$, "previous", 
function () {
if (this.hasPrevious ()) return this.i.previous ();
 else throw  new java.util.NoSuchElementException ();
});
$_M (cla$$, "nextIndex", 
function () {
return this.i.nextIndex () - this.callbacks["java.util.SubList"].offset;
});
$_M (cla$$, "previousIndex", 
function () {
return this.i.previousIndex () - this.callbacks["java.util.SubList"].offset;
});
$_M (cla$$, "remove", 
function () {
this.i.remove ();
this.callbacks["java.util.SubList"].expectedModCount = this.callbacks["java.util.SubList"].l.modCount;
this.callbacks["java.util.SubList"].$size--;
this.callbacks["java.util.SubList"].modCount++;
});
$_M (cla$$, "set", 
function (o) {
this.i.set (o);
}, "Object");
$_M (cla$$, "add", 
function (o) {
this.i.add (o);
this.callbacks["java.util.SubList"].expectedModCount = this.callbacks["java.util.SubList"].l.modCount;
this.callbacks["java.util.SubList"].$size++;
this.callbacks["java.util.SubList"].modCount++;
}, "Object");
cla$$ = $_P ();
}
return $_N (java.util.SubList$1, innerThis, finalVars);
}) (this, null);
}, "Number");
$_V (cla$$, "subList", 
function (fromIndex, toIndex) {
return  new java.util.SubList (this, fromIndex, toIndex);
}, "Number,Number");
$_M (cla$$, "rangeCheck", 
($fz = function (index) {
if (index < 0 || index >= this.$size) throw  new IndexOutOfBoundsException ("Index: " + index + ",Size: " + this.$size);
}, $fz.isPrivate = true, $fz), "Number");
$_M (cla$$, "checkForComodification", 
($fz = function () {
if (this.l.modCount != this.expectedModCount) throw  new java.util.ConcurrentModificationException ();
}, $fz.isPrivate = true, $fz));
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.util, "RandomAccessSubList", java.util.SubList, java.util.RandomAccess);
$_K (cla$$, 
function (list, fromIndex, toIndex) {
$_R (this, java.util.RandomAccessSubList, [list, fromIndex, toIndex]);
}, "java.util.AbstractList,Number,Number");
$_V (cla$$, "subList", 
function (fromIndex, toIndex) {
return  new java.util.RandomAccessSubList (this, fromIndex, toIndex);
}, "Number,Number");
$_J ("java.util");
cla$$ = $_C (function () {
this.elementData = null;
this.$size = 0;
$_Z (this, arguments);
}, java.util, "ArrayList", java.util.AbstractList, [java.util.List, java.util.RandomAccess, Cloneable, java.io.Serializable]);
$_K (cla$$, 
function (initialCapacity) {
$_R (this, java.util.ArrayList);
if (initialCapacity < 0) throw  new IllegalArgumentException ("Illegal Capacity: " + initialCapacity);
this.elementData =  new Array (initialCapacity);
}, "Number");
$_K (cla$$, 
function () {
this.construct (10);
});
$_K (cla$$, 
function (c) {
$_R (this, java.util.ArrayList, []);
this.$size = c.size ();
this.elementData =  new Array (parseInt (Math.min (Math.floor ((this.$size * 110) / 100), Integer.MAX_VALUE)));
c.toArray (this.elementData);
}, "java.util.Collection");
$_M (cla$$, "trimToSize", 
function () {
this.modCount++;
var oldCapacity = this.elementData.length;
if (this.$size < oldCapacity) {
var oldData = this.elementData;
this.elementData =  new Array (this.$size);
System.arraycopy (oldData, 0, this.elementData, 0, this.$size);
}});
$_M (cla$$, "ensureCapacity", 
function (minCapacity) {
this.modCount++;
var oldCapacity = this.elementData.length;
if (minCapacity > oldCapacity) {
var oldData = this.elementData;
var newCapacity = Math.floor ((oldCapacity * 3) / 2) + 1;
if (newCapacity < minCapacity) newCapacity = minCapacity;
this.elementData =  new Array (newCapacity);
System.arraycopy (oldData, 0, this.elementData, 0, this.$size);
}}, "Number");
$_V (cla$$, "size", 
function () {
return this.$size;
});
$_V (cla$$, "isEmpty", 
function () {
return this.$size == 0;
});
$_V (cla$$, "contains", 
function (elem) {
return this.indexOf (elem) >= 0;
}, "Object");
$_V (cla$$, "indexOf", 
function (elem) {
if (elem == null) {
for (var i = 0; i < this.$size; i++) if (this.elementData[i] == null) return i;

} else {
for (var i = 0; i < this.$size; i++) if (elem.equals (this.elementData[i])) return i;

}return -1;
}, "Object");
$_V (cla$$, "lastIndexOf", 
function (elem) {
if (elem == null) {
for (var i = this.$size - 1; i >= 0; i--) if (this.elementData[i] == null) return i;

} else {
for (var i = this.$size - 1; i >= 0; i--) if (elem.equals (this.elementData[i])) return i;

}return -1;
}, "Object");
$_M (cla$$, "clone", 
function () {
try {
var v = $_U (this, java.util.ArrayList, "clone", []);
v.elementData =  new Array (this.$size);
System.arraycopy (this.elementData, 0, v.elementData, 0, this.$size);
v.modCount = 0;
return v;
} catch (e) {
if ($_O (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
$_M (cla$$, "toArray", 
function () {
var result =  new Array (this.$size);
System.arraycopy (this.elementData, 0, result, 0, this.$size);
return result;
});
$_M (cla$$, "toArray", 
function (a) {
if (a.length < this.$size) a = java.lang.reflect.Array.newInstance (a.getClass ().getComponentType (), this.$size);
System.arraycopy (this.elementData, 0, a, 0, this.$size);
if (a.length > this.$size) a[this.$size] = null;
return a;
}, "Array");
$_V (cla$$, "get", 
function (index) {
this.RangeCheck (index);
return this.elementData[index];
}, "Number");
$_V (cla$$, "set", 
function (index, element) {
this.RangeCheck (index);
var oldValue = this.elementData[index];
this.elementData[index] = element;
return oldValue;
}, "Number,Object");
$_M (cla$$, "add", 
function (o) {
this.ensureCapacity (this.$size + 1);
this.elementData[this.$size++] = o;
return true;
}, "Object");
$_M (cla$$, "add", 
function (index, element) {
if (index > this.$size || index < 0) throw  new IndexOutOfBoundsException ("Index: " + index + ", Size: " + this.$size);
this.ensureCapacity (this.$size + 1);
System.arraycopy (this.elementData, index, this.elementData, index + 1, this.$size - index);
this.elementData[index] = element;
this.$size++;
}, "Number,Object");
$_M (cla$$, "remove", 
function (index) {
this.RangeCheck (index);
this.modCount++;
var oldValue = this.elementData[index];
var numMoved = this.$size - index - 1;
if (numMoved > 0) System.arraycopy (this.elementData, index + 1, this.elementData, index, numMoved);
this.elementData[--this.$size] = null;
return oldValue;
}, "Number");
$_V (cla$$, "clear", 
function () {
this.modCount++;
for (var i = 0; i < this.$size; i++) this.elementData[i] = null;

this.$size = 0;
});
$_M (cla$$, "addAll", 
function (c) {
var a = c.toArray ();
var numNew = a.length;
this.ensureCapacity (this.$size + numNew);
System.arraycopy (a, 0, this.elementData, this.$size, numNew);
this.$size += numNew;
return numNew != 0;
}, "java.util.Collection");
$_M (cla$$, "addAll", 
function (index, c) {
if (index > this.$size || index < 0) throw  new IndexOutOfBoundsException ("Index: " + index + ", Size: " + this.$size);
var a = c.toArray ();
var numNew = a.length;
this.ensureCapacity (this.$size + numNew);
var numMoved = this.$size - index;
if (numMoved > 0) System.arraycopy (this.elementData, index, this.elementData, index + numNew, numMoved);
System.arraycopy (a, 0, this.elementData, index, numNew);
this.$size += numNew;
return numNew != 0;
}, "Number,java.util.Collection");
$_V (cla$$, "removeRange", 
function (fromIndex, toIndex) {
this.modCount++;
var numMoved = this.$size - toIndex;
System.arraycopy (this.elementData, toIndex, this.elementData, fromIndex, numMoved);
var newSize = this.$size - (toIndex - fromIndex);
while (this.$size != newSize) this.elementData[--this.$size] = null;

}, "Number,Number");
$_M (cla$$, "RangeCheck", 
($fz = function (index) {
if (index >= this.$size) throw  new IndexOutOfBoundsException ("Index: " + index + ", Size: " + this.$size);
}, $fz.isPrivate = true, $fz), "Number");
$_S (cla$$,
"serialVersionUID", 8683452581122892189);
$_J ("java.util");
cla$$ = $_C (function () {
this.table = null;
this.$size = 0;
this.threshold = 0;
this.$loadFactor = 0;
this.modCount = 0;
if (!$_D ("java.util.HashMap.HashIterator")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
this.$next = null;
this.expectedModCount = 0;
this.index = 0;
this.current = null;
$_Z (this, arguments);
}, java.util.HashMap, "HashIterator", null, java.util.Iterator);
$_K (cla$$, 
function () {
this.expectedModCount = this.callbacks["java.util.HashMap"].modCount;
var t = this.callbacks["java.util.HashMap"].table;
var i = t.length;
var n = null;
if (this.callbacks["java.util.HashMap"].$size != 0) {
while (i > 0 && (n = t[--i]) == null) ;
}this.$next = n;
this.index = i;
});
$_V (cla$$, "hasNext", 
function () {
return this.$next != null;
});
$_M (cla$$, "nextEntry", 
function () {
if (this.callbacks["java.util.HashMap"].modCount != this.expectedModCount) throw  new java.util.ConcurrentModificationException ();
var e = this.$next;
if (e == null) throw  new java.util.NoSuchElementException ();
var n = e.next;
var t = this.callbacks["java.util.HashMap"].table;
var i = this.index;
while (n == null && i > 0) n = t[--i];

this.index = i;
this.$next = n;
return this.current = e;
});
$_V (cla$$, "remove", 
function () {
if (this.current == null) throw  new IllegalStateException ();
if (this.callbacks["java.util.HashMap"].modCount != this.expectedModCount) throw  new java.util.ConcurrentModificationException ();
var k = this.current.key;
this.current = null;
this.callbacks["java.util.HashMap"].removeEntryForKey (k);
this.expectedModCount = this.callbacks["java.util.HashMap"].modCount;
});
cla$$ = $_P ();
}
if (!$_D ("java.util.HashMap.ValueIterator")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.HashMap, "ValueIterator", java.util.HashMap.HashIterator, null, $_N (java.util.HashMap.HashIterator, this, null, $_G));
$_V (cla$$, "next", 
function () {
return this.nextEntry ().value;
});
cla$$ = $_P ();
}
if (!$_D ("java.util.HashMap.KeyIterator")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.HashMap, "KeyIterator", java.util.HashMap.HashIterator, null, $_N (java.util.HashMap.HashIterator, this, null, $_G));
$_V (cla$$, "next", 
function () {
return this.nextEntry ().getKey ();
});
cla$$ = $_P ();
}
if (!$_D ("java.util.HashMap.EntryIterator")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.HashMap, "EntryIterator", java.util.HashMap.HashIterator, null, $_N (java.util.HashMap.HashIterator, this, null, $_G));
$_V (cla$$, "next", 
function () {
return this.nextEntry ();
});
cla$$ = $_P ();
}
this.$entrySet = null;
if (!$_D ("java.util.HashMap.KeySet")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.HashMap, "KeySet", java.util.AbstractSet);
$_V (cla$$, "iterator", 
function () {
return this.callbacks["java.util.HashMap"].newKeyIterator ();
});
$_V (cla$$, "size", 
function () {
return this.callbacks["java.util.HashMap"].$size;
});
$_V (cla$$, "contains", 
function (o) {
return this.callbacks["java.util.HashMap"].containsKey (o);
}, "Object");
$_V (cla$$, "remove", 
function (o) {
return this.callbacks["java.util.HashMap"].removeEntryForKey (o) != null;
}, "Object");
$_V (cla$$, "clear", 
function () {
this.callbacks["java.util.HashMap"].clear ();
});
cla$$ = $_P ();
}
if (!$_D ("java.util.HashMap.Values")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.HashMap, "Values", java.util.AbstractCollection);
$_V (cla$$, "iterator", 
function () {
return this.callbacks["java.util.HashMap"].newValueIterator ();
});
$_V (cla$$, "size", 
function () {
return this.callbacks["java.util.HashMap"].$size;
});
$_V (cla$$, "contains", 
function (o) {
return this.callbacks["java.util.HashMap"].containsValue (o);
}, "Object");
$_V (cla$$, "clear", 
function () {
this.callbacks["java.util.HashMap"].clear ();
});
cla$$ = $_P ();
}
if (!$_D ("java.util.HashMap.EntrySet")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.HashMap, "EntrySet", java.util.AbstractSet);
$_V (cla$$, "iterator", 
function () {
return this.callbacks["java.util.HashMap"].newEntryIterator ();
});
$_V (cla$$, "contains", 
function (o) {
if (!($_O (o, java.util.Map.Entry))) return false;
var e = o;
var candidate = this.callbacks["java.util.HashMap"].getEntry (e.getKey ());
return candidate != null && candidate.equals (e);
}, "Object");
$_V (cla$$, "remove", 
function (o) {
return this.callbacks["java.util.HashMap"].removeMapping (o) != null;
}, "Object");
$_V (cla$$, "size", 
function () {
return this.callbacks["java.util.HashMap"].$size;
});
$_V (cla$$, "clear", 
function () {
this.callbacks["java.util.HashMap"].clear ();
});
cla$$ = $_P ();
}
$_Z (this, arguments);
}, java.util, "HashMap", java.util.AbstractMap, [java.util.Map, Cloneable, java.io.Serializable]);
Clazz.pu$h ();
cla$$ = $_C (function () {
this.key = null;
this.value = null;
this.hash = 0;
this.next = null;
$_Z (this, arguments);
}, java.util.HashMap, "Entry", null, java.util.Map.Entry);
$_K (cla$$, 
function (h, k, v, n) {
this.value = v;
this.next = n;
this.key = k;
this.hash = h;
}, "Number,Object,Object,java.util.HashMap.Entry");
$_M (cla$$, "getKey", 
function () {
return java.util.HashMap.unmaskNull (this.key);
});
$_M (cla$$, "getValue", 
function () {
return this.value;
});
$_V (cla$$, "setValue", 
function (newValue) {
var oldValue = this.value;
this.value = newValue;
return oldValue;
}, "Object");
$_V (cla$$, "equals", 
function (o) {
if (!($_O (o, java.util.Map.Entry))) return false;
var e = o;
var k1 = this.getKey ();
var k2 = e.getKey ();
if (k1 == k2 || (k1 != null && k1.equals (k2))) {
var v1 = this.getValue ();
var v2 = e.getValue ();
if (v1 == v2 || (v1 != null && v1.equals (v2))) return true;
}return false;
}, "Object");
$_V (cla$$, "hashCode", 
function () {
return (this.key == java.util.HashMap.NULL_KEY ? 0 : this.key.hashCode ()) ^ (this.value == null ? 0 : this.value.hashCode ());
});
$_V (cla$$, "toString", 
function () {
return this.getKey () + "=" + this.getValue ();
});
$_M (cla$$, "recordAccess", 
function (m) {
}, "java.util.HashMap");
$_M (cla$$, "recordRemoval", 
function (m) {
}, "java.util.HashMap");
cla$$ = $_P ();
$_K (cla$$, 
function (initialCapacity, loadFactor) {
$_R (this, java.util.HashMap, []);
if (initialCapacity < 0) throw  new IllegalArgumentException ("Illegal initial capacity: " + initialCapacity);
if (initialCapacity > java.util.HashMap.MAXIMUM_CAPACITY) initialCapacity = java.util.HashMap.MAXIMUM_CAPACITY;
if (loadFactor <= 0 || Float.isNaN (loadFactor)) throw  new IllegalArgumentException ("Illegal load factor: " + loadFactor);
var capacity = 1;
while (capacity < initialCapacity) capacity <<= 1;

this.$loadFactor = loadFactor;
this.threshold = parseInt ((capacity * loadFactor));
this.table =  new Array (capacity);
this.init ();
}, "Number,Number");
$_K (cla$$, 
function (initialCapacity) {
this.construct (initialCapacity, java.util.HashMap.DEFAULT_LOAD_FACTOR);
}, "Number");
$_K (cla$$, 
function () {
$_R (this, java.util.HashMap, []);
this.$loadFactor = java.util.HashMap.DEFAULT_LOAD_FACTOR;
this.threshold = parseInt ((java.util.HashMap.DEFAULT_INITIAL_CAPACITY * java.util.HashMap.DEFAULT_LOAD_FACTOR));
this.table =  new Array (java.util.HashMap.DEFAULT_INITIAL_CAPACITY);
this.init ();
});
$_K (cla$$, 
function (m) {
this.construct (Math.max (parseInt ((m.size () / java.util.HashMap.DEFAULT_LOAD_FACTOR)) + 1, java.util.HashMap.DEFAULT_INITIAL_CAPACITY), java.util.HashMap.DEFAULT_LOAD_FACTOR);
this.putAllForCreate (m);
}, "java.util.Map");
$_M (cla$$, "init", 
function () {
});
cla$$.maskNull = $_M (cla$$, "maskNull", 
function (key) {
return (key == null ? java.util.HashMap.NULL_KEY : key);
}, "Object");
cla$$.unmaskNull = $_M (cla$$, "unmaskNull", 
function (key) {
return (key == java.util.HashMap.NULL_KEY ? null : key);
}, "Object");
cla$$.hash = $_M (cla$$, "hash", 
function (x) {
var h = x.hashCode ();
h += ~(h << 9);
h ^= (h >>> 14);
h += (h << 4);
h ^= (h >>> 10);
return h;
}, "Object");
cla$$.eq = $_M (cla$$, "eq", 
function (x, y) {
return x == y || x.equals (y);
}, "Object,Object");
cla$$.indexFor = $_M (cla$$, "indexFor", 
function (h, length) {
return h & (length - 1);
}, "Number,Number");
$_M (cla$$, "size", 
function () {
return this.$size;
});
$_V (cla$$, "isEmpty", 
function () {
return this.$size == 0;
});
$_V (cla$$, "get", 
function (key) {
var k = java.util.HashMap.maskNull (key);
var hash = java.util.HashMap.hash (k);
var i = java.util.HashMap.indexFor (hash, this.table.length);
var e = this.table[i];
while (true) {
if (e == null) return e;
if (e.hash == hash && java.util.HashMap.eq (k, e.key)) return e.value;
e = e.next;
}
}, "Object");
$_V (cla$$, "containsKey", 
function (key) {
var k = java.util.HashMap.maskNull (key);
var hash = java.util.HashMap.hash (k);
var i = java.util.HashMap.indexFor (hash, this.table.length);
var e = this.table[i];
while (e != null) {
if (e.hash == hash && java.util.HashMap.eq (k, e.key)) return true;
e = e.next;
}
return false;
}, "Object");
$_M (cla$$, "getEntry", 
function (key) {
var k = java.util.HashMap.maskNull (key);
var hash = java.util.HashMap.hash (k);
var i = java.util.HashMap.indexFor (hash, this.table.length);
var e = this.table[i];
while (e != null && !(e.hash == hash && java.util.HashMap.eq (k, e.key))) e = e.next;

return e;
}, "Object");
$_V (cla$$, "put", 
function (key, value) {
var k = java.util.HashMap.maskNull (key);
var hash = java.util.HashMap.hash (k);
var i = java.util.HashMap.indexFor (hash, this.table.length);
for (var e = this.table[i]; e != null; e = e.next) {
if (e.hash == hash && java.util.HashMap.eq (k, e.key)) {
var oldValue = e.value;
e.value = value;
e.recordAccess (this);
return oldValue;
}}
this.modCount++;
this.addEntry (hash, k, value, i);
return null;
}, "Object,Object");
$_M (cla$$, "putForCreate", 
($fz = function (key, value) {
var k = java.util.HashMap.maskNull (key);
var hash = java.util.HashMap.hash (k);
var i = java.util.HashMap.indexFor (hash, this.table.length);
for (var e = this.table[i]; e != null; e = e.next) {
if (e.hash == hash && java.util.HashMap.eq (k, e.key)) {
e.value = value;
return ;
}}
this.createEntry (hash, k, value, i);
}, $fz.isPrivate = true, $fz), "Object,Object");
$_M (cla$$, "putAllForCreate", 
function (m) {
for (var i = m.entrySet ().iterator (); i.hasNext (); ) {
var e = i.next ();
this.putForCreate (e.getKey (), e.getValue ());
}
}, "java.util.Map");
$_M (cla$$, "resize", 
function (newCapacity) {
var oldTable = this.table;
var oldCapacity = oldTable.length;
if (oldCapacity == java.util.HashMap.MAXIMUM_CAPACITY) {
this.threshold = Integer.MAX_VALUE;
return ;
}var newTable =  new Array (newCapacity);
this.transfer (newTable);
this.table = newTable;
this.threshold = parseInt ((newCapacity * this.$loadFactor));
}, "Number");
$_M (cla$$, "transfer", 
function (newTable) {
var src = this.table;
var newCapacity = newTable.length;
for (var j = 0; j < src.length; j++) {
var e = src[j];
if (e != null) {
src[j] = null;
do {
var next = e.next;
var i = java.util.HashMap.indexFor (e.hash, newCapacity);
e.next = newTable[i];
newTable[i] = e;
e = next;
} while (e != null);
}}
}, "Array");
$_V (cla$$, "putAll", 
function (m) {
var numKeysToBeAdded = m.size ();
if (numKeysToBeAdded == 0) return ;
if (numKeysToBeAdded > this.threshold) {
var targetCapacity = parseInt ((numKeysToBeAdded / this.$loadFactor + 1));
if (targetCapacity > java.util.HashMap.MAXIMUM_CAPACITY) targetCapacity = java.util.HashMap.MAXIMUM_CAPACITY;
var newCapacity = this.table.length;
while (newCapacity < targetCapacity) newCapacity <<= 1;

if (newCapacity > this.table.length) this.resize (newCapacity);
}for (var i = m.entrySet ().iterator (); i.hasNext (); ) {
var e = i.next ();
this.put (e.getKey (), e.getValue ());
}
}, "java.util.Map");
$_V (cla$$, "remove", 
function (key) {
var e = this.removeEntryForKey (key);
return (e == null ? e : e.value);
}, "Object");
$_M (cla$$, "removeEntryForKey", 
function (key) {
var k = java.util.HashMap.maskNull (key);
var hash = java.util.HashMap.hash (k);
var i = java.util.HashMap.indexFor (hash, this.table.length);
var prev = this.table[i];
var e = prev;
while (e != null) {
var next = e.next;
if (e.hash == hash && java.util.HashMap.eq (k, e.key)) {
this.modCount++;
this.$size--;
if (prev == e) this.table[i] = next;
 else prev.next = next;
e.recordRemoval (this);
return e;
}prev = e;
e = next;
}
return e;
}, "Object");
$_M (cla$$, "removeMapping", 
function (o) {
if (!($_O (o, java.util.Map.Entry))) return null;
var entry = o;
var k = java.util.HashMap.maskNull (entry.getKey ());
var hash = java.util.HashMap.hash (k);
var i = java.util.HashMap.indexFor (hash, this.table.length);
var prev = this.table[i];
var e = prev;
while (e != null) {
var next = e.next;
if (e.hash == hash && e.equals (entry)) {
this.modCount++;
this.$size--;
if (prev == e) this.table[i] = next;
 else prev.next = next;
e.recordRemoval (this);
return e;
}prev = e;
e = next;
}
return e;
}, "Object");
$_V (cla$$, "clear", 
function () {
this.modCount++;
var tab = this.table;
for (var i = 0; i < tab.length; i++) tab[i] = null;

this.$size = 0;
});
$_V (cla$$, "containsValue", 
function (value) {
if (value == null) return this.containsNullValue ();
var tab = this.table;
for (var i = 0; i < tab.length; i++) for (var e = tab[i]; e != null; e = e.next) if (value.equals (e.value)) return true;


return false;
}, "Object");
$_M (cla$$, "containsNullValue", 
($fz = function () {
var tab = this.table;
for (var i = 0; i < tab.length; i++) for (var e = tab[i]; e != null; e = e.next) if (e.value == null) return true;


return false;
}, $fz.isPrivate = true, $fz));
$_M (cla$$, "clone", 
function () {
var result = null;
try {
result = $_U (this, java.util.HashMap, "clone", []);
} catch (e) {
if ($_O (e, CloneNotSupportedException)) {
} else {
throw e;
}
}
result.table =  new Array (this.table.length);
result.$entrySet = null;
result.modCount = 0;
result.$size = 0;
result.init ();
result.putAllForCreate (this);
return result;
});
$_M (cla$$, "addEntry", 
function (hash, key, value, bucketIndex) {
this.table[bucketIndex] =  new java.util.HashMap.Entry (hash, key, value, this.table[bucketIndex]);
if (this.$size++ >= this.threshold) this.resize (2 * this.table.length);
}, "Number,Object,Object,Number");
$_M (cla$$, "createEntry", 
function (hash, key, value, bucketIndex) {
this.table[bucketIndex] =  new java.util.HashMap.Entry (hash, key, value, this.table[bucketIndex]);
this.$size++;
}, "Number,Object,Object,Number");
$_M (cla$$, "newKeyIterator", 
function () {
return $_N (java.util.HashMap.KeyIterator, this, null);
});
$_M (cla$$, "newValueIterator", 
function () {
return $_N (java.util.HashMap.ValueIterator, this, null);
});
$_M (cla$$, "newEntryIterator", 
function () {
return $_N (java.util.HashMap.EntryIterator, this, null);
});
$_V (cla$$, "keySet", 
function () {
var ks = this.$keySet;
return (ks != null ? ks : (this.$keySet = $_N (java.util.HashMap.KeySet, this, null)));
});
$_V (cla$$, "values", 
function () {
var vs = this.$values;
return (vs != null ? vs : (this.$values = $_N (java.util.HashMap.Values, this, null)));
});
$_M (cla$$, "entrySet", 
function () {
var es = this.$entrySet;
return (es != null ? es : (this.$entrySet = $_N (java.util.HashMap.EntrySet, this, null)));
});
$_M (cla$$, "capacity", 
function () {
return this.table.length;
});
$_M (cla$$, "loadFactor", 
function () {
return this.$loadFactor;
});
$_S (cla$$,
"DEFAULT_INITIAL_CAPACITY", 16,
"MAXIMUM_CAPACITY", 1 << 30,
"DEFAULT_LOAD_FACTOR", 0.75);
cla$$.NULL_KEY = cla$$.prototype.NULL_KEY =  new Object ();
$_S (cla$$,
"serialVersionUID", 362498820763181265);
$_J ("java.util");
cla$$ = $_C (function () {
this.map = null;
$_Z (this, arguments);
}, java.util, "HashSet", java.util.AbstractSet, [java.util.Set, Cloneable, java.io.Serializable]);
$_K (cla$$, 
function () {
$_R (this, java.util.HashSet, []);
this.map =  new java.util.HashMap ();
});
$_K (cla$$, 
function (c) {
$_R (this, java.util.HashSet, []);
this.map =  new java.util.HashMap (Math.max (parseInt ((c.size () / .75)) + 1, 16));
this.addAll (c);
}, "java.util.Collection");
$_K (cla$$, 
function (initialCapacity, loadFactor) {
$_R (this, java.util.HashSet, []);
this.map =  new java.util.HashMap (initialCapacity, loadFactor);
}, "Number,Number");
$_K (cla$$, 
function (initialCapacity) {
$_R (this, java.util.HashSet, []);
this.map =  new java.util.HashMap (initialCapacity);
}, "Number");
$_K (cla$$, 
function (initialCapacity, loadFactor, dummy) {
$_R (this, java.util.HashSet, []);
this.map =  new java.util.LinkedHashMap (initialCapacity, loadFactor);
}, "Number,Number,Boolean");
$_M (cla$$, "iterator", 
function () {
return this.map.keySet ().iterator ();
});
$_V (cla$$, "size", 
function () {
return this.map.size ();
});
$_V (cla$$, "isEmpty", 
function () {
return this.map.isEmpty ();
});
$_V (cla$$, "contains", 
function (o) {
return this.map.containsKey (o);
}, "Object");
$_V (cla$$, "add", 
function (o) {
return this.map.put (o, java.util.HashSet.PRESENT) == null;
}, "Object");
$_V (cla$$, "remove", 
function (o) {
return this.map.remove (o) == java.util.HashSet.PRESENT;
}, "Object");
$_V (cla$$, "clear", 
function () {
this.map.clear ();
});
$_M (cla$$, "clone", 
function () {
try {
var newSet = $_U (this, java.util.HashSet, "clone", []);
newSet.map = this.map.clone ();
return newSet;
} catch (e) {
if ($_O (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
$_S (cla$$,
"serialVersionUID", -5024744406713321676);
cla$$.PRESENT = cla$$.prototype.PRESENT =  new Object ();
$_J ("java.util");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.util, "Dictionary");
$_K (cla$$, 
function () {
});
$_J ("java.util");
cla$$ = $_C (function () {
this.table = null;
this.count = 0;
this.threshold = 0;
this.loadFactor = 0;
this.modCount = 0;
this.$keySet = null;
this.$entrySet = null;
this.$values = null;
if (!$_D ("java.util.Hashtable.KeySet")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.Hashtable, "KeySet", java.util.AbstractSet);
$_V (cla$$, "iterator", 
function () {
return this.callbacks["java.util.Hashtable"].getIterator (java.util.Hashtable.KEYS);
});
$_V (cla$$, "size", 
function () {
return this.callbacks["java.util.Hashtable"].count;
});
$_V (cla$$, "contains", 
function (o) {
return this.callbacks["java.util.Hashtable"].containsKey (o);
}, "Object");
$_V (cla$$, "remove", 
function (o) {
return this.callbacks["java.util.Hashtable"].remove (o) != null;
}, "Object");
$_V (cla$$, "clear", 
function () {
this.callbacks["java.util.Hashtable"].clear ();
});
cla$$ = $_P ();
}
if (!$_D ("java.util.Hashtable.EntrySet")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.Hashtable, "EntrySet", java.util.AbstractSet);
$_V (cla$$, "iterator", 
function () {
return this.callbacks["java.util.Hashtable"].getIterator (java.util.Hashtable.ENTRIES);
});
$_V (cla$$, "contains", 
function (o) {
if (!($_O (o, java.util.Map.Entry))) return false;
var entry = o;
var key = entry.getKey ();
var tab = this.callbacks["java.util.Hashtable"].table;
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % tab.length;
for (var e = tab[index]; e != null; e = e.next) if (e.hash == hash && e.equals (entry)) return true;

return false;
}, "Object");
$_V (cla$$, "remove", 
function (o) {
if (!($_O (o, java.util.Map.Entry))) return false;
var entry = o;
var key = entry.getKey ();
var tab = this.callbacks["java.util.Hashtable"].table;
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % tab.length;
for (var e = tab[index], prev = null; e != null; prev = e, e = e.next) {
if (e.hash == hash && e.equals (entry)) {
this.callbacks["java.util.Hashtable"].modCount++;
if (prev != null) prev.next = e.next;
 else tab[index] = e.next;
this.callbacks["java.util.Hashtable"].count--;
e.value = null;
return true;
}}
return false;
}, "Object");
$_V (cla$$, "size", 
function () {
return this.callbacks["java.util.Hashtable"].count;
});
$_V (cla$$, "clear", 
function () {
this.callbacks["java.util.Hashtable"].clear ();
});
cla$$ = $_P ();
}
if (!$_D ("java.util.Hashtable.ValueCollection")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
$_Z (this, arguments);
}, java.util.Hashtable, "ValueCollection", java.util.AbstractCollection);
$_V (cla$$, "iterator", 
function () {
return this.callbacks["java.util.Hashtable"].getIterator (java.util.Hashtable.VALUES);
});
$_V (cla$$, "size", 
function () {
return this.callbacks["java.util.Hashtable"].count;
});
$_V (cla$$, "contains", 
function (o) {
return this.callbacks["java.util.Hashtable"].containsValue (o);
}, "Object");
$_V (cla$$, "clear", 
function () {
this.callbacks["java.util.Hashtable"].clear ();
});
cla$$ = $_P ();
}
if (!$_D ("java.util.Hashtable.Enumerator")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
this.table = this.callbacks["java.util.Hashtable"].table;
this.index = this.table.length;
this.entry = null;
this.lastReturned = null;
this.type = 0;
this.iterator = false;
this.expectedModCount = this.callbacks["java.util.Hashtable"].modCount;
$_Z (this, arguments);
}, java.util.Hashtable, "Enumerator", null, [java.util.Enumeration, java.util.Iterator]);
$_K (cla$$, 
function (type, iterator) {
this.type = type;
this.iterator = iterator;
}, "Number,Boolean");
$_V (cla$$, "hasMoreElements", 
function () {
var e = this.entry;
var i = this.index;
var t = this.table;
while (e == null && i > 0) {
e = t[--i];
}
this.entry = e;
this.index = i;
return e != null;
});
$_V (cla$$, "nextElement", 
function () {
var et = this.entry;
var i = this.index;
var t = this.table;
while (et == null && i > 0) {
et = t[--i];
}
this.entry = et;
this.index = i;
if (et != null) {
var e = this.lastReturned = this.entry;
this.entry = e.next;
return this.type == java.util.Hashtable.KEYS ? e.key : (this.type == java.util.Hashtable.VALUES ? e.value : e);
}throw  new java.util.NoSuchElementException ("Hashtable Enumerator");
});
$_V (cla$$, "hasNext", 
function () {
return this.hasMoreElements ();
});
$_V (cla$$, "next", 
function () {
if (this.callbacks["java.util.Hashtable"].modCount != this.expectedModCount) throw  new java.util.ConcurrentModificationException ();
return this.nextElement ();
});
$_V (cla$$, "remove", 
function () {
if (!this.iterator) throw  new UnsupportedOperationException ();
if (this.lastReturned == null) throw  new IllegalStateException ("Hashtable Enumerator");
if (this.callbacks["java.util.Hashtable"].modCount != this.expectedModCount) throw  new java.util.ConcurrentModificationException ();
{
var tab = this.callbacks["java.util.Hashtable"].table;
var index = (this.lastReturned.hash & 0x7FFFFFFF) % tab.length;
for (var e = tab[index], prev = null; e != null; prev = e, e = e.next) {
if (e == this.lastReturned) {
this.callbacks["java.util.Hashtable"].modCount++;
this.expectedModCount++;
if (prev == null) tab[index] = e.next;
 else prev.next = e.next;
this.callbacks["java.util.Hashtable"].count--;
this.lastReturned = null;
return ;
}}
throw  new java.util.ConcurrentModificationException ();
}});
cla$$ = $_P ();
}
$_Z (this, arguments);
}, java.util, "Hashtable", java.util.Dictionary, [java.util.Map, Cloneable, java.io.Serializable]);
Clazz.pu$h ();
cla$$ = $_C (function () {
this.hash = 0;
this.key = null;
this.value = null;
this.next = null;
$_Z (this, arguments);
}, java.util.Hashtable, "Entry", null, java.util.Map.Entry);
$_K (cla$$, 
function (hash, key, value, next) {
this.hash = hash;
this.key = key;
this.value = value;
this.next = next;
}, "Number,Object,Object,java.util.Hashtable.Entry");
$_V (cla$$, "clone", 
function () {
return  new java.util.Hashtable.Entry (this.hash, this.key, this.value, (this.next == null ? null : this.next.clone ()));
});
$_M (cla$$, "getKey", 
function () {
return this.key;
});
$_M (cla$$, "getValue", 
function () {
return this.value;
});
$_V (cla$$, "setValue", 
function (value) {
if (value == null) throw  new NullPointerException ();
var oldValue = this.value;
this.value = value;
return oldValue;
}, "Object");
$_V (cla$$, "equals", 
function (o) {
if (!($_O (o, java.util.Map.Entry))) return false;
var e = o;
return (this.key == null ? e.getKey () == null : this.key.equals (e.getKey ())) && (this.value == null ? e.getValue () == null : this.value.equals (e.getValue ()));
}, "Object");
$_V (cla$$, "hashCode", 
function () {
return this.hash ^ (this.value == null ? 0 : this.value.hashCode ());
});
$_M (cla$$, "toString", 
function () {
return this.key.toString () + "=" + this.value.toString ();
});
cla$$ = $_P ();
Clazz.pu$h ();
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.util.Hashtable, "EmptyEnumerator", null, java.util.Enumeration);
$_K (cla$$, 
function () {
});
$_V (cla$$, "hasMoreElements", 
function () {
return false;
});
$_V (cla$$, "nextElement", 
function () {
throw  new java.util.NoSuchElementException ("Hashtable Enumerator");
});
cla$$ = $_P ();
Clazz.pu$h ();
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.util.Hashtable, "EmptyIterator", null, java.util.Iterator);
$_K (cla$$, 
function () {
});
$_V (cla$$, "hasNext", 
function () {
return false;
});
$_V (cla$$, "next", 
function () {
throw  new java.util.NoSuchElementException ("Hashtable Iterator");
});
$_V (cla$$, "remove", 
function () {
throw  new IllegalStateException ("Hashtable Iterator");
});
cla$$ = $_P ();
$_K (cla$$, 
function (initialCapacity, loadFactor) {
$_R (this, java.util.Hashtable, []);
if (initialCapacity < 0) throw  new IllegalArgumentException ("Illegal Capacity: " + initialCapacity);
if (loadFactor <= 0 || Float.isNaN (loadFactor)) throw  new IllegalArgumentException ("Illegal Load: " + loadFactor);
if (initialCapacity == 0) initialCapacity = 1;
this.loadFactor = loadFactor;
this.table =  new Array (initialCapacity);
this.threshold = parseInt ((initialCapacity * loadFactor));
}, "Number,Number");
$_K (cla$$, 
function (initialCapacity) {
this.construct (initialCapacity, 0.75);
}, "Number");
$_K (cla$$, 
function () {
this.construct (11, 0.75);
});
$_K (cla$$, 
function (t) {
this.construct (Math.max (2 * t.size (), 11), 0.75);
this.putAll (t);
}, "java.util.Map");
$_M (cla$$, "size", 
function () {
return this.count;
});
$_V (cla$$, "isEmpty", 
function () {
return this.count == 0;
});
$_V (cla$$, "keys", 
function () {
return this.getEnumeration (java.util.Hashtable.KEYS);
});
$_V (cla$$, "elements", 
function () {
return this.getEnumeration (java.util.Hashtable.VALUES);
});
$_M (cla$$, "contains", 
function (value) {
if (value == null) {
throw  new NullPointerException ();
}var tab = this.table;
for (var i = tab.length; i-- > 0; ) {
for (var e = tab[i]; e != null; e = e.next) {
if (e.value.equals (value)) {
return true;
}}
}
return false;
}, "Object");
$_V (cla$$, "containsValue", 
function (value) {
return this.contains (value);
}, "Object");
$_M (cla$$, "containsKey", 
function (key) {
var tab = this.table;
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % tab.length;
for (var e = tab[index]; e != null; e = e.next) {
if ((e.hash == hash) && e.key.equals (key)) {
return true;
}}
return false;
}, "Object");
$_M (cla$$, "get", 
function (key) {
var tab = this.table;
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % tab.length;
for (var e = tab[index]; e != null; e = e.next) {
if ((e.hash == hash) && e.key.equals (key)) {
return e.value;
}}
return null;
}, "Object");
$_M (cla$$, "rehash", 
function () {
var oldCapacity = this.table.length;
var oldMap = this.table;
var newCapacity = oldCapacity * 2 + 1;
var newMap =  new Array (newCapacity);
this.modCount++;
this.threshold = parseInt ((newCapacity * this.loadFactor));
this.table = newMap;
for (var i = oldCapacity; i-- > 0; ) {
for (var old = oldMap[i]; old != null; ) {
var e = old;
old = old.next;
var index = (e.hash & 0x7FFFFFFF) % newCapacity;
e.next = newMap[index];
newMap[index] = e;
}
}
});
$_V (cla$$, "put", 
function (key, value) {
if (value == null) {
throw  new NullPointerException ();
}var tab = this.table;
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % tab.length;
for (var e = tab[index]; e != null; e = e.next) {
if ((e.hash == hash) && e.key.equals (key)) {
var old = e.value;
e.value = value;
return old;
}}
this.modCount++;
if (this.count >= this.threshold) {
this.rehash ();
tab = this.table;
index = (hash & 0x7FFFFFFF) % tab.length;
}var e =  new java.util.Hashtable.Entry (hash, key, value, tab[index]);
tab[index] = e;
this.count++;
return null;
}, "Object,Object");
$_V (cla$$, "remove", 
function (key) {
var tab = this.table;
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % tab.length;
for (var e = tab[index], prev = null; e != null; prev = e, e = e.next) {
if ((e.hash == hash) && e.key.equals (key)) {
this.modCount++;
if (prev != null) {
prev.next = e.next;
} else {
tab[index] = e.next;
}this.count--;
var oldValue = e.value;
e.value = null;
return oldValue;
}}
return null;
}, "Object");
$_V (cla$$, "putAll", 
function (t) {
var i = t.entrySet ().iterator ();
while (i.hasNext ()) {
var e = i.next ();
this.put (e.getKey (), e.getValue ());
}
}, "java.util.Map");
$_V (cla$$, "clear", 
function () {
var tab = this.table;
this.modCount++;
for (var index = tab.length; --index >= 0; ) tab[index] = null;

this.count = 0;
});
$_M (cla$$, "clone", 
function () {
try {
var t = $_U (this, java.util.Hashtable, "clone", []);
t.table =  new Array (this.table.length);
for (var i = this.table.length; i-- > 0; ) {
t.table[i] = (this.table[i] != null) ? this.table[i].clone () : null;
}
t.$keySet = null;
t.$entrySet = null;
t.$values = null;
t.modCount = 0;
return t;
} catch (e) {
if ($_O (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
$_M (cla$$, "toString", 
function () {
var max = this.size () - 1;
var buf =  new StringBuffer ();
var it = this.entrySet ().iterator ();
buf.append ("{");
for (var i = 0; i <= max; i++) {
var e = (it.next ());
var key = e.getKey ();
var value = e.getValue ();
buf.append ((key == this ? "(this Map)" : key) + "=" + (value == this ? "(this Map)" : value));
if (i < max) buf.append (", ");
}
buf.append ("}");
return buf.toString ();
});
$_M (cla$$, "getEnumeration", 
($fz = function (type) {
if (this.count == 0) {
return java.util.Hashtable.emptyEnumerator;
} else {
return $_N (java.util.Hashtable.Enumerator, this, null, type, false);
}}, $fz.isPrivate = true, $fz), "Number");
$_M (cla$$, "getIterator", 
($fz = function (type) {
if (this.count == 0) {
return java.util.Hashtable.emptyIterator;
} else {
return $_N (java.util.Hashtable.Enumerator, this, null, type, true);
}}, $fz.isPrivate = true, $fz), "Number");
$_V (cla$$, "keySet", 
function () {
if (this.$keySet == null) this.$keySet = java.util.Collections.synchronizedSet ($_N (java.util.Hashtable.KeySet, this, null), this);
return this.$keySet;
});
$_M (cla$$, "entrySet", 
function () {
if (this.$entrySet == null) this.$entrySet = java.util.Collections.synchronizedSet ($_N (java.util.Hashtable.EntrySet, this, null), this);
return this.$entrySet;
});
$_V (cla$$, "values", 
function () {
if (this.$values == null) this.$values = java.util.Collections.synchronizedCollection ($_N (java.util.Hashtable.ValueCollection, this, null), this);
return this.$values;
});
$_V (cla$$, "equals", 
function (o) {
if (o == this) return true;
if (!($_O (o, java.util.Map))) return false;
var t = o;
if (t.size () != this.size ()) return false;
try {
var i = this.entrySet ().iterator ();
while (i.hasNext ()) {
var e = i.next ();
var key = e.getKey ();
var value = e.getValue ();
if (value == null) {
if (!(t.get (key) == null && t.containsKey (key))) return false;
} else {
if (!value.equals (t.get (key))) return false;
}}
} catch (e) {
if ($_O (e, ClassCastException)) {
return false;
} else if ($_O (e, NullPointerException)) {
return false;
} else {
throw e;
}
}
return true;
}, "Object");
$_V (cla$$, "hashCode", 
function () {
var h = 0;
if (this.count == 0 || this.loadFactor < 0) return h;
this.loadFactor = -this.loadFactor;
var tab = this.table;
for (var i = 0; i < tab.length; i++) for (var e = tab[i]; e != null; e = e.next) h += e.key.hashCode () ^ e.value.hashCode ();


this.loadFactor = -this.loadFactor;
return h;
});
$_S (cla$$,
"serialVersionUID", 1421746759512286392,
"KEYS", 0,
"VALUES", 1,
"ENTRIES", 2);
cla$$.emptyEnumerator = cla$$.prototype.emptyEnumerator =  new java.util.Hashtable.EmptyEnumerator ();
cla$$.emptyIterator = cla$$.prototype.emptyIterator =  new java.util.Hashtable.EmptyIterator ();
$_J ("java.util");
cla$$ = $_C (function () {
this.defaults = null;
$_Z (this, arguments);
}, java.util, "Properties", java.util.Hashtable);
$_K (cla$$, 
function () {
this.construct (null);
});
$_K (cla$$, 
function (defaults) {
$_R (this, java.util.Properties, []);
this.defaults = defaults;
}, "java.util.Properties");
$_M (cla$$, "setProperty", 
function (key, value) {
return this.put (key, value);
}, "String,String");
$_M (cla$$, "load", 
function (inStream) {
var $in =  new java.io.BufferedReader ( new java.io.InputStreamReader (inStream, "8859_1"));
while (true) {
var line = $in.readLine ();
if (line == null) return ;
if (line.length > 0) {
var len = line.length;
var keyStart;
for (keyStart = 0; keyStart < len; keyStart++) if (java.util.Properties.whiteSpaceChars.indexOf (line.charAt (keyStart)) == -1) break;

if (keyStart == len) continue ;var firstChar = line.charAt (keyStart);
if (((firstChar).charCodeAt (0) != ('#').charCodeAt (0)) && ((firstChar).charCodeAt (0) != ('!').charCodeAt (0))) {
while (this.continueLine (line)) {
var nextLine = $in.readLine ();
if (nextLine == null) nextLine = "";
var loppedLine = line.substring (0, len - 1);
var startIndex;
for (startIndex = 0; startIndex < nextLine.length; startIndex++) if (java.util.Properties.whiteSpaceChars.indexOf (nextLine.charAt (startIndex)) == -1) break;

nextLine = nextLine.substring (startIndex, nextLine.length);
line =  String.instantialize (loppedLine + nextLine);
len = line.length;
}
var separatorIndex;
for (separatorIndex = keyStart; separatorIndex < len; separatorIndex++) {
var currentChar = line.charAt (separatorIndex);
if ((currentChar).charCodeAt (0) == ('\\').charCodeAt (0)) separatorIndex++;
 else if (java.util.Properties.keyValueSeparators.indexOf (currentChar) != -1) break;
}
var valueIndex;
for (valueIndex = separatorIndex; valueIndex < len; valueIndex++) if (java.util.Properties.whiteSpaceChars.indexOf (line.charAt (valueIndex)) == -1) break;

if (valueIndex < len) if (java.util.Properties.strictKeyValueSeparators.indexOf (line.charAt (valueIndex)) != -1) valueIndex++;
while (valueIndex < len) {
if (java.util.Properties.whiteSpaceChars.indexOf (line.charAt (valueIndex)) == -1) break;
valueIndex++;
}
var key = line.substring (keyStart, separatorIndex);
var value = (separatorIndex < len) ? line.substring (valueIndex, len) : "";
key = this.loadConvert (key);
value = this.loadConvert (value);
this.put (key, value);
}}}
}, "java.io.InputStream");
$_M (cla$$, "continueLine", 
($fz = function (line) {
var slashCount = 0;
var index = line.length - 1;
while ((index >= 0) && ((line.charAt (index--)).charCodeAt (0) == ('\\').charCodeAt (0))) slashCount++;

return (slashCount % 2 == 1);
}, $fz.isPrivate = true, $fz), "String");
$_M (cla$$, "loadConvert", 
($fz = function (theString) {
var aChar;
var len = theString.length;
var outBuffer =  new StringBuffer (len);
for (var x = 0; x < len; ) {
aChar = theString.charAt (x++);
if ((aChar).charCodeAt (0) == ('\\').charCodeAt (0)) {
aChar = theString.charAt (x++);
if ((aChar).charCodeAt (0) == ('u').charCodeAt (0)) {
var value = 0;
for (var i = 0; i < 4; i++) {
aChar = theString.charAt (x++);
switch (aChar) {
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
value = (value << 4) + (aChar).charCodeAt (0) - ('0').charCodeAt (0);
break;
case 'a':
case 'b':
case 'c':
case 'd':
case 'e':
case 'f':
value = (value << 4) + 10 + (aChar).charCodeAt (0) - ('a').charCodeAt (0);
break;
case 'A':
case 'B':
case 'C':
case 'D':
case 'E':
case 'F':
value = (value << 4) + 10 + (aChar).charCodeAt (0) - ('A').charCodeAt (0);
break;
default:
throw  new IllegalArgumentException ("Malformed \\uxxxx encoding.");
}
}
outBuffer.append (String.fromCharCode (value));
} else {
if ((aChar).charCodeAt (0) == ('t').charCodeAt (0)) aChar = '\t';
 else if ((aChar).charCodeAt (0) == ('r').charCodeAt (0)) aChar = '\r';
 else if ((aChar).charCodeAt (0) == ('n').charCodeAt (0)) aChar = '\n';
 else if ((aChar).charCodeAt (0) == ('f').charCodeAt (0)) aChar = '\f';
outBuffer.append (aChar);
}} else outBuffer.append (aChar);
}
return outBuffer.toString ();
}, $fz.isPrivate = true, $fz), "String");
$_M (cla$$, "saveConvert", 
($fz = function (theString, escapeSpace) {
var len = theString.length;
var outBuffer =  new StringBuffer (len * 2);
for (var x = 0; x < len; x++) {
var aChar = theString.charAt (x);
switch (aChar) {
case ' ':
if (x == 0 || escapeSpace) outBuffer.append ('\\');
outBuffer.append (' ');
break;
case '\\':
outBuffer.append ('\\');
outBuffer.append ('\\');
break;
case '\t':
outBuffer.append ('\\');
outBuffer.append ('t');
break;
case '\n':
outBuffer.append ('\\');
outBuffer.append ('n');
break;
case '\r':
outBuffer.append ('\\');
outBuffer.append ('r');
break;
case '\f':
outBuffer.append ('\\');
outBuffer.append ('f');
break;
default:
if (((aChar).charCodeAt (0) < 0x0020) || ((aChar).charCodeAt (0) > 0x007e)) {
outBuffer.append ('\\');
outBuffer.append ('u');
outBuffer.append (java.util.Properties.toHex (((aChar).charCodeAt (0) >> 12) & 0xF));
outBuffer.append (java.util.Properties.toHex (((aChar).charCodeAt (0) >> 8) & 0xF));
outBuffer.append (java.util.Properties.toHex (((aChar).charCodeAt (0) >> 4) & 0xF));
outBuffer.append (java.util.Properties.toHex ((aChar).charCodeAt (0) & 0xF));
} else {
if (java.util.Properties.specialSaveChars.indexOf (aChar) != -1) outBuffer.append ('\\');
outBuffer.append (aChar);
}}
}
return outBuffer.toString ();
}, $fz.isPrivate = true, $fz), "String,Boolean");
$_M (cla$$, "save", 
function (out, header) {
try {
this.store (out, header);
} catch (e) {
if ($_O (e, java.io.IOException)) {
} else {
throw e;
}
}
}, "java.io.OutputStream,String");
$_M (cla$$, "store", 
function (out, header) {
var awriter;
awriter =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (out, "8859_1"));
if (header != null) java.util.Properties.writeln (awriter, "#" + header);
java.util.Properties.writeln (awriter, "#" +  new java.util.Date ().toString ());
for (var e = this.keys (); e.hasMoreElements (); ) {
var key = e.nextElement ();
var val = this.get (key);
key = this.saveConvert (key, true);
val = this.saveConvert (val, false);
java.util.Properties.writeln (awriter, key + "=" + val);
}
awriter.flush ();
}, "java.io.OutputStream,String");
cla$$.writeln = $_M (cla$$, "writeln", 
($fz = function (bw, s) {
bw.write (s);
bw.newLine ();
}, $fz.isPrivate = true, $fz), "java.io.BufferedWriter,String");
$_M (cla$$, "getProperty", 
function (key) {
var oval = $_U (this, java.util.Properties, "get", [key]);
var sval = ($_O (oval, String)) ? oval : null;
return ((sval == null) && (this.defaults != null)) ? this.defaults.getProperty (key) : sval;
}, "String");
$_M (cla$$, "getProperty", 
function (key, defaultValue) {
var val = this.getProperty (key);
return (val == null) ? defaultValue : val;
}, "String,String");
$_M (cla$$, "propertyNames", 
function () {
var h =  new java.util.Hashtable ();
this.enumerate (h);
return h.keys ();
});
$_M (cla$$, "list", 
function (out) {
out.println ("-- listing properties --");
var h =  new java.util.Hashtable ();
this.enumerate (h);
for (var e = h.keys (); e.hasMoreElements (); ) {
var key = e.nextElement ();
var val = h.get (key);
if (val.length > 40) {
val = val.substring (0, 37) + "...";
}out.println (key + "=" + val);
}
}, "java.io.PrintStream");
$_M (cla$$, "list", 
function (out) {
out.println ("-- listing properties --");
var h =  new java.util.Hashtable ();
this.enumerate (h);
for (var e = h.keys (); e.hasMoreElements (); ) {
var key = e.nextElement ();
var val = h.get (key);
if (val.length > 40) {
val = val.substring (0, 37) + "...";
}out.println (key + "=" + val);
}
}, "java.io.PrintWriter");
$_M (cla$$, "enumerate", 
($fz = function (h) {
if (this.defaults != null) {
this.defaults.enumerate (h);
}for (var e = this.keys (); e.hasMoreElements (); ) {
var key = e.nextElement ();
h.put (key, this.get (key));
}
}, $fz.isPrivate = true, $fz), "java.util.Hashtable");
cla$$.toHex = $_M (cla$$, "toHex", 
($fz = function (nibble) {
return java.util.Properties.hexDigit[(nibble & 0xF)];
}, $fz.isPrivate = true, $fz), "Number");
$_S (cla$$,
"serialVersionUID", 4112578634029874840,
"keyValueSeparators", "=: \t\r\n\f",
"strictKeyValueSeparators", "=:",
"specialSaveChars", "=: \t\r\n\f#!",
"whiteSpaceChars", " \t\r\n\f",
"hexDigit", ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']);
$_J ("java.util");
cla$$ = $_C (function () {
this.elementData = null;
this.elementCount = 0;
this.capacityIncrement = 0;
$_Z (this, arguments);
}, java.util, "Vector", java.util.AbstractList, [java.util.List, java.util.RandomAccess, Cloneable, java.io.Serializable]);
$_K (cla$$, 
function (initialCapacity, capacityIncrement) {
$_R (this, java.util.Vector);
if (initialCapacity < 0) throw  new IllegalArgumentException ("Illegal Capacity: " + initialCapacity);
this.elementData =  new Array (initialCapacity);
this.capacityIncrement = capacityIncrement;
}, "Number,Number");
$_K (cla$$, 
function (initialCapacity) {
this.construct (initialCapacity, 0);
}, "Number");
$_K (cla$$, 
function () {
this.construct (10);
});
$_K (cla$$, 
function (c) {
$_R (this, java.util.Vector, []);
this.elementCount = c.size ();
this.elementData =  new Array (parseInt (Math.min (Math.floor ((this.elementCount * 110) / 100), Integer.MAX_VALUE)));
c.toArray (this.elementData);
}, "java.util.Collection");
$_M (cla$$, "copyInto", 
function (anArray) {
System.arraycopy (this.elementData, 0, anArray, 0, this.elementCount);
}, "Array");
$_M (cla$$, "trimToSize", 
function () {
this.modCount++;
var oldCapacity = this.elementData.length;
if (this.elementCount < oldCapacity) {
var oldData = this.elementData;
this.elementData =  new Array (this.elementCount);
System.arraycopy (oldData, 0, this.elementData, 0, this.elementCount);
}});
$_M (cla$$, "ensureCapacity", 
function (minCapacity) {
this.modCount++;
this.ensureCapacityHelper (minCapacity);
}, "Number");
$_M (cla$$, "ensureCapacityHelper", 
($fz = function (minCapacity) {
var oldCapacity = this.elementData.length;
if (minCapacity > oldCapacity) {
var oldData = this.elementData;
var newCapacity = (this.capacityIncrement > 0) ? (oldCapacity + this.capacityIncrement) : (oldCapacity * 2);
if (newCapacity < minCapacity) {
newCapacity = minCapacity;
}this.elementData =  new Array (newCapacity);
System.arraycopy (oldData, 0, this.elementData, 0, this.elementCount);
}}, $fz.isPrivate = true, $fz), "Number");
$_M (cla$$, "setSize", 
function (newSize) {
this.modCount++;
if (newSize > this.elementCount) {
this.ensureCapacityHelper (newSize);
} else {
for (var i = newSize; i < this.elementCount; i++) {
this.elementData[i] = null;
}
}this.elementCount = newSize;
}, "Number");
$_M (cla$$, "capacity", 
function () {
return this.elementData.length;
});
$_V (cla$$, "size", 
function () {
return this.elementCount;
});
$_V (cla$$, "isEmpty", 
function () {
return this.elementCount == 0;
});
$_M (cla$$, "elements", 
function () {
return (function (innerThis, finalVars) {
if (!$_D ("java.util.Vector$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
this.count = 0;
$_Z (this, arguments);
}, java.util, "Vector$1", null, java.util.Enumeration);
$_V (cla$$, "hasMoreElements", 
function () {
return this.count < this.callbacks["java.util.Vector"].elementCount;
});
$_V (cla$$, "nextElement", 
function () {
{
if (this.count < this.callbacks["java.util.Vector"].elementCount) {
return this.callbacks["java.util.Vector"].elementData[this.count++];
}}throw  new java.util.NoSuchElementException ("Vector Enumeration");
});
cla$$ = $_P ();
}
return $_N (java.util.Vector$1, innerThis, finalVars);
}) (this, null);
});
$_V (cla$$, "contains", 
function (elem) {
return this.indexOf (elem, 0) >= 0;
}, "Object");
$_M (cla$$, "indexOf", 
function (elem) {
return this.indexOf (elem, 0);
}, "Object");
$_M (cla$$, "indexOf", 
function (elem, index) {
if (elem == null) {
for (var i = index; i < this.elementCount; i++) if (this.elementData[i] == null) return i;

} else {
for (var i = index; i < this.elementCount; i++) if (elem.equals (this.elementData[i])) return i;

}return -1;
}, "Object,Number");
$_M (cla$$, "lastIndexOf", 
function (elem) {
return this.lastIndexOf (elem, this.elementCount - 1);
}, "Object");
$_M (cla$$, "lastIndexOf", 
function (elem, index) {
if (index >= this.elementCount) throw  new IndexOutOfBoundsException (index + " >= " + this.elementCount);
if (elem == null) {
for (var i = index; i >= 0; i--) if (this.elementData[i] == null) return i;

} else {
for (var i = index; i >= 0; i--) if (elem.equals (this.elementData[i])) return i;

}return -1;
}, "Object,Number");
$_M (cla$$, "elementAt", 
function (index) {
if (index >= this.elementCount) {
throw  new ArrayIndexOutOfBoundsException (index + " >= " + this.elementCount);
}return this.elementData[index];
}, "Number");
$_M (cla$$, "firstElement", 
function () {
if (this.elementCount == 0) {
throw  new java.util.NoSuchElementException ();
}return this.elementData[0];
});
$_M (cla$$, "lastElement", 
function () {
if (this.elementCount == 0) {
throw  new java.util.NoSuchElementException ();
}return this.elementData[this.elementCount - 1];
});
$_M (cla$$, "setElementAt", 
function (obj, index) {
if (index >= this.elementCount) {
throw  new ArrayIndexOutOfBoundsException (index + " >= " + this.elementCount);
}this.elementData[index] = obj;
}, "Object,Number");
$_M (cla$$, "removeElementAt", 
function (index) {
this.modCount++;
if (index >= this.elementCount) {
throw  new ArrayIndexOutOfBoundsException (index + " >= " + this.elementCount);
} else if (index < 0) {
throw  new ArrayIndexOutOfBoundsException (index);
}var j = this.elementCount - index - 1;
if (j > 0) {
System.arraycopy (this.elementData, index + 1, this.elementData, index, j);
}this.elementCount--;
this.elementData[this.elementCount] = null;
}, "Number");
$_M (cla$$, "insertElementAt", 
function (obj, index) {
this.modCount++;
if (index > this.elementCount) {
throw  new ArrayIndexOutOfBoundsException (index + " > " + this.elementCount);
}this.ensureCapacityHelper (this.elementCount + 1);
System.arraycopy (this.elementData, index, this.elementData, index + 1, this.elementCount - index);
this.elementData[index] = obj;
this.elementCount++;
}, "Object,Number");
$_M (cla$$, "addElement", 
function (obj) {
this.modCount++;
this.ensureCapacityHelper (this.elementCount + 1);
this.elementData[this.elementCount++] = obj;
}, "Object");
$_M (cla$$, "removeElement", 
function (obj) {
this.modCount++;
var i = this.indexOf (obj);
if (i >= 0) {
this.removeElementAt (i);
return true;
}return false;
}, "Object");
$_M (cla$$, "removeAllElements", 
function () {
this.modCount++;
for (var i = 0; i < this.elementCount; i++) this.elementData[i] = null;

this.elementCount = 0;
});
$_M (cla$$, "clone", 
function () {
try {
var v = $_U (this, java.util.Vector, "clone", []);
v.elementData =  new Array (this.elementCount);
System.arraycopy (this.elementData, 0, v.elementData, 0, this.elementCount);
v.modCount = 0;
return v;
} catch (e) {
if ($_O (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
$_M (cla$$, "toArray", 
function () {
var result =  new Array (this.elementCount);
System.arraycopy (this.elementData, 0, result, 0, this.elementCount);
return result;
});
$_M (cla$$, "toArray", 
function (a) {
if (a.length < this.elementCount) a = java.lang.reflect.Array.newInstance (a.getClass ().getComponentType (), this.elementCount);
System.arraycopy (this.elementData, 0, a, 0, this.elementCount);
if (a.length > this.elementCount) a[this.elementCount] = null;
return a;
}, "Array");
$_V (cla$$, "get", 
function (index) {
if (index >= this.elementCount) throw  new ArrayIndexOutOfBoundsException (index);
return this.elementData[index];
}, "Number");
$_V (cla$$, "set", 
function (index, element) {
if (index >= this.elementCount) throw  new ArrayIndexOutOfBoundsException (index);
var oldValue = this.elementData[index];
this.elementData[index] = element;
return oldValue;
}, "Number,Object");
$_M (cla$$, "add", 
function (o) {
this.modCount++;
this.ensureCapacityHelper (this.elementCount + 1);
this.elementData[this.elementCount++] = o;
return true;
}, "Object");
$_M (cla$$, "remove", 
function (o) {
return this.removeElement (o);
}, "Object");
$_M (cla$$, "add", 
function (index, element) {
this.insertElementAt (element, index);
}, "Number,Object");
$_M (cla$$, "remove", 
function (index) {
this.modCount++;
if (index >= this.elementCount) throw  new ArrayIndexOutOfBoundsException (index);
var oldValue = this.elementData[index];
var numMoved = this.elementCount - index - 1;
if (numMoved > 0) System.arraycopy (this.elementData, index + 1, this.elementData, index, numMoved);
this.elementData[--this.elementCount] = null;
return oldValue;
}, "Number");
$_V (cla$$, "clear", 
function () {
this.removeAllElements ();
});
$_V (cla$$, "containsAll", 
function (c) {
return $_U (this, java.util.Vector, "containsAll", [c]);
}, "java.util.Collection");
$_M (cla$$, "addAll", 
function (c) {
this.modCount++;
var a = c.toArray ();
var numNew = a.length;
this.ensureCapacityHelper (this.elementCount + numNew);
System.arraycopy (a, 0, this.elementData, this.elementCount, numNew);
this.elementCount += numNew;
return numNew != 0;
}, "java.util.Collection");
$_V (cla$$, "removeAll", 
function (c) {
return $_U (this, java.util.Vector, "removeAll", [c]);
}, "java.util.Collection");
$_V (cla$$, "retainAll", 
function (c) {
return $_U (this, java.util.Vector, "retainAll", [c]);
}, "java.util.Collection");
$_M (cla$$, "addAll", 
function (index, c) {
this.modCount++;
if (index < 0 || index > this.elementCount) throw  new ArrayIndexOutOfBoundsException (index);
var a = c.toArray ();
var numNew = a.length;
this.ensureCapacityHelper (this.elementCount + numNew);
var numMoved = this.elementCount - index;
if (numMoved > 0) System.arraycopy (this.elementData, index, this.elementData, index + numNew, numMoved);
System.arraycopy (a, 0, this.elementData, index, numNew);
this.elementCount += numNew;
return numNew != 0;
}, "Number,java.util.Collection");
$_V (cla$$, "equals", 
function (o) {
return $_U (this, java.util.Vector, "equals", [o]);
}, "Object");
$_V (cla$$, "hashCode", 
function () {
return $_U (this, java.util.Vector, "hashCode", []);
});
$_M (cla$$, "toString", 
function () {
return $_U (this, java.util.Vector, "toString", []);
});
$_V (cla$$, "subList", 
function (fromIndex, toIndex) {
return java.util.Collections.synchronizedList ($_U (this, java.util.Vector, "subList", [fromIndex, toIndex]), this);
}, "Number,Number");
$_V (cla$$, "removeRange", 
function (fromIndex, toIndex) {
this.modCount++;
var numMoved = this.elementCount - toIndex;
System.arraycopy (this.elementData, toIndex, this.elementData, fromIndex, numMoved);
var newElementCount = this.elementCount - (toIndex - fromIndex);
while (this.elementCount != newElementCount) this.elementData[--this.elementCount] = null;

}, "Number,Number");
$_S (cla$$,
"serialVersionUID", -2767605614048989439);
$_J ("java.util");
cla$$ = $_C (function () {
$_Z (this, arguments);
}, java.util, "Stack", java.util.Vector);
$_K (cla$$, 
function () {
$_R (this, java.util.Stack, []);
});
$_M (cla$$, "push", 
function (item) {
this.addElement (item);
return item;
}, "Object");
$_M (cla$$, "pop", 
function () {
var obj;
var len = this.size ();
obj = this.peek ();
this.removeElementAt (len - 1);
return obj;
});
$_M (cla$$, "peek", 
function () {
var len = this.size ();
if (len == 0) throw  new java.util.EmptyStackException ();
return this.elementAt (len - 1);
});
$_M (cla$$, "empty", 
function () {
return this.size () == 0;
});
$_M (cla$$, "search", 
function (o) {
var i = this.lastIndexOf (o);
if (i >= 0) {
return this.size () - i;
}return -1;
}, "Object");
$_S (cla$$,
"serialVersionUID", 1224463164541339165);
$_J ("java.util");
cla$$ = $_C (function () {
this.parent = null;
this.locale = null;
this.bundleName = null;
$_Z (this, arguments);
}, java.util, "ResourceBundle");
Clazz.pu$h ();
cla$$ = $_C (function () {
this.map =  new Array (0);
this.keys =  new Array (0);
this.content = null;
this.initialized = false;
$_Z (this, arguments);
}, java.util.ResourceBundle, "TextResourceBundle", java.util.ResourceBundle);
$_K (cla$$, 
function (bundleName) {
$_R (this, java.util.ResourceBundle.TextResourceBundle, []);
this.bundleName = bundleName;
}, "String");
$_K (cla$$, 
function (bundleName, content) {
$_R (this, java.util.ResourceBundle.TextResourceBundle, []);
this.bundleName = bundleName;
this.content = content;
}, "String,String");
$_M (cla$$, "evalString", 
function (s) {
var arr = new Array ();
var lastIndex = 0;
var inScope = false;
for (var i = 0; i < s.length; i++) {
var ch = s.charAt (i);
if (inScope) {
if (ch == 'f') arr[arr.length] = '\f';
else if (ch == 't') arr[arr.length] = '\t';
else if (ch == 'r') arr[arr.length] = '\r';
else if (ch == 'n') arr[arr.length] = '\n';
else if (ch == '\'') arr[arr.length] = '\'';
else if (ch == '\"') arr[arr.length] = '\"';
else if (ch == '\\') arr[arr.length] = '\\';
else if (ch == 'u') {
arr[arr.length] =  eval ("\"\\u" + s.substring (i + 1, i + 5) + "\"");
i += 4;
}
lastIndex = i + 1;
inScope = false;
} else if (ch == '\\') {
if (lastIndex != i) {
arr[arr.length] = s.substring (lastIndex, i);
}
inScope = true;
}
}
if (!inScope) {
arr[arr.length] = s.substring (lastIndex, s.length);
}
return arr.join ('');
}, "String");
$_M (cla$$, "initBundle", 
($fz = function () {
if (this.initialized) {
return ;
}this.initialized = true;
if (this.content == null) {
var bundlePath = this.bundleName.replace (/\./g, '/') + ".properties";
var paths = ["bin/", "", "j2slib/"];
var request =  new ajax.HttpRequest ();
var index = 0;
while (this.content == null && index < paths.length) {
request.open ("GET", paths[index] + bundlePath, false);
try {
request.send ();
this.content = request.getResponseText ();
} catch (e) {
request =  new ajax.HttpRequest ();
}
index++;
}
}if (this.content == null) {
return ;
}var bundleLines = this.content.split ("\n");
for (var i = 0; i < bundleLines.length; i++) {
var trimedLine = bundleLines[i].trim ();
if (!trimedLine.startsWith ("#")) {
var index = trimedLine.indexOf ('=');
if (index != -1) {
var key = trimedLine.substring (0, index).trim ();
var value = trimedLine.substring (index + 1).trim ();
{
if (this.map[key] == null) {
this.keys[this.keys.length] = key;
}
if (value.indexOf ('\\') != -1) {
value = this.evalString (value);
}
this.map[key] = value;
}}}}
}, $fz.isPrivate = true, $fz));
$_V (cla$$, "getKeys", 
function () {
return (function (innerThis, finalVars) {
if (!$_D ("java.util.ResourceBundle.TextResourceBundle$1")) {
Clazz.pu$h ();
cla$$ = $_C (function () {
$_B (this, arguments);
this.index = -1;
$_Z (this, arguments);
}, java.util.ResourceBundle, "TextResourceBundle$1", null, java.util.Enumeration);
$_V (cla$$, "nextElement", 
function () {
this.index++;
return this.callbacks["java.util.ResourceBundle.TextResourceBundle"].keys[this.index];
});
$_V (cla$$, "hasMoreElements", 
function () {
return this.index < this.callbacks["java.util.ResourceBundle.TextResourceBundle"].keys.length - 1;
});
cla$$ = $_P ();
}
return $_N (java.util.ResourceBundle.TextResourceBundle$1, innerThis, finalVars);
}) (this, null);
});
$_V (cla$$, "handleGetObject", 
function (key) {
if (!this.initialized) {
this.initBundle();
}
return this.map[key];
}, "String");
cla$$ = $_P ();
$_K (cla$$, 
function () {
});
$_M (cla$$, "getString", 
function (key) {
return this.getObject (key);
}, "String");
$_M (cla$$, "getStringArray", 
function (key) {
return this.getObject (key);
}, "String");
$_M (cla$$, "getObject", 
function (key) {
var obj = this.handleGetObject (key);
if (obj == null) {
if (this.parent != null) {
obj = this.parent.getObject (key);
}if (obj == null) throw  new java.util.MissingResourceException ("Can't find resource for bundle " + this.getClass ().getName () + ", key " + key, this.getClass ().getName (), key);
}return obj;
}, "String");
$_M (cla$$, "getLocale", 
function () {
return this.locale;
});
$_M (cla$$, "setParent", 
function (parent) {
this.parent = parent;
}, "java.util.ResourceBundle");
cla$$.getBundle = $_M (cla$$, "getBundle", 
function (baseName) {
return java.util.ResourceBundle.getBundleImpl (baseName, null, null);
}, "String");
cla$$.getBundle = $_M (cla$$, "getBundle", 
function (baseName, locale) {
return java.util.ResourceBundle.getBundleImpl (baseName, locale, null);
}, "String,java.util.Locale");
cla$$.getBundle = $_M (cla$$, "getBundle", 
function (baseName, locale, loader) {
if (loader == null) {
throw  new NullPointerException ();
}return java.util.ResourceBundle.getBundleImpl (baseName, locale, loader);
}, "String,java.util.Locale,ClassLoader");
cla$$.getBundleImpl = $_M (cla$$, "getBundleImpl", 
($fz = function (baseName, locale, loader) {
if (baseName == null) {
throw  new NullPointerException ();
}for (var i = 0; i < java.util.ResourceBundle.caches.length; i++) {
if (java.util.ResourceBundle.caches[i].bundleName == baseName) {
return java.util.ResourceBundle.caches[i];
}}
var bundle =  new java.util.ResourceBundle.TextResourceBundle (baseName);
java.util.ResourceBundle.caches[java.util.ResourceBundle.caches.length] = bundle;
return bundle;
}, $fz.isPrivate = true, $fz), "String,java.util.Locale,ClassLoader");
cla$$.registerBundle = $_M (cla$$, "registerBundle", 
function (baseName, content) {
for (var i = 0; i < java.util.ResourceBundle.caches.length; i++) {
if (java.util.ResourceBundle.caches[i].bundleName == baseName) {
return ;
}}
java.util.ResourceBundle.caches[java.util.ResourceBundle.caches.length] =  new java.util.ResourceBundle.TextResourceBundle (baseName, content);
}, "String,String");
cla$$.caches = cla$$.prototype.caches =  new Array (0);
Clazz.declarePackage ("java.lang.reflect");
java.lang.reflect.Array = {
	newInstance : function (type, size) {
		return new Array (size);
	}
};
Array.getComponentType = function () {
	return Object;
};
$_J ("java.util");
cla$$ = $_C (function () {
this.source = null;
$_Z (this, arguments);
}, java.util, "EventObject", null, java.io.Serializable);
$_K (cla$$, 
function (source) {
if (source == null) throw  new IllegalArgumentException ("null source");
this.source = source;
}, "Object");
$_M (cla$$, "getSource", 
function () {
return this.source;
});
$_V (cla$$, "toString", 
function () {
return this.getClass ().getName () + "[source=" + this.source + "]";
});
$_J ("java.util");
$_I (java.util, "EventListener");
$_J ("java.util");
cla$$ = $_C (function () {
this.listener = null;
$_Z (this, arguments);
}, java.util, "EventListenerProxy", null, java.util.EventListener);
$_K (cla$$, 
function (listener) {
this.listener = listener;
}, "java.util.EventListener");
$_M (cla$$, "getListener", 
function () {
return this.listener;
});
