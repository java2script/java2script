// j2sClazz.js 
// NOTE: updates to this file should be copied to j2sjmol.js

// latest author: Bob Hanson, St. Olaf College, hansonr@stolaf.edu

// NOTES by Bob Hanson

// Google closure compiler cannot handle Clazz.new or Clazz.super

// BH 2025.10.16 minimizing missing package.js message
// BH 2025.04.17 adds option for explicit directory for core files different from j2sPath/core
// BH 2025.03.12 adds support for writable byte[] parameters in WASM
// BH 2025.03.06 adds support for JNA+WASM, automated loading of Java native classes if WASM is available
// BH 2025.02.22 add hashCode$() for Java Integer.TYPE and related types
// BH 2025.01.31 added checks for JavaScript SyntaxError similar to other Error types
// BH 2024.11.23 implementing java.awt.Toolkit.getDefaultToolkit().getDesktopProperty("awt.multiClickInterval")
// BH 2024.06.22 adds Integer.getIngeger(String, int) (returning null)
// BH 2024.03.03 removes unnecessary loadClass("xxxx") on exceptionOf(e,"xxxx") call
// BH 2024.02.23 fixes missing Long.signum
// BH 2023.04.30 fixes issues when Info.console == window.console
// BH 2023.03.01 upgrade for Java11 String, including String.isBlank() and CharSequence.lines(String) (in Java11 this is StringRoman1.lines(byte[])
// BH 2023.02.12 upgrade for (asynchronous?) packaging
// BH 2023.01.22 fix for Double.doubleToRawLongBits missing and Float.floatToIntBits failing on NaN
// BH 2023.01.15 fix for int[2][3][] not initializing properly
// BH 2022.12.03 fix for Double.isInfinite should not be true for NaN
// BH 2022.12.03 fix for Double.parseDouble("") and new Double(NaN) should be NaN, not 0
// BH 2022.09.20 fix for Class.forName not loading static inner classes directly
// BH 2022.09.20 fix for default toString for classes using "." name not "$" name for inner classes
// BH 2022.09.15 fix for new Error() failing; just letting java.lang.Error subclass Throwable
// BH 2022.09.08 Fix new Test_Inner().getClass().getMethod("testDollar", new Class<?>[] {Test_Abstract_a.class}).getName()
// BH 2022.04.19 TypeError and ResourceError gain printStackTrace$() methods
// BH 2022.03.19 String.valueOf(Double) does not add ".0"
// BH 2022.01.17 fixes interface default method referencing own static fields
// BH 2021.12.19 adds Double -0; fixes println(Double)
// BH 2021.12.15 default encoding for String.getBytes() should be utf-8.
// BH 2021.08.16 fix for Interface initializing its subclass with static initialization
// BH 2021.07.28 String.instantialize upgraded to use TextDecoder() if possible (not in MSIE)
// BH 2021.07.20 Date.toString() format yyyy moved to end, as in Java 
// BH 2021.06.11 Number.compareTo(....) missing
// BH 2021.02.12 implements better(?) interface defaults resolution -- in order of presentation

// see earlier notes at net.sf.j2s.java.core.srcjs/js/devnotes.txt

//window["j2s.object.native"] = true;  // this is not an option

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
/*******************************************************************************
 * @author zhou renjian
 * @create Nov 5, 2005
 ******************************************************************************/
 

// encapsulating function

;(function(J2S, window, document) {

  if (J2S.clazzLoaded) return;
  J2S.clazzLoaded = true;
		
  // at least for now:

  var setWindowValue = function(a, v) { window[a] = v; }

J2S.LoadClazz = function(Clazz) {
	
Clazz.setTVer = function(ver) { // from class loading
	if (Clazz._VERSION_T.split('-')[0] != ver.split('-')[0])
		System.err.println("transpiler was " + Clazz._VERSION_T + " now " + ver + " for " + lastLoaded);
	Clazz._VERSION_T = ver;
}

var lastLoaded;
var consoleDiv = J2S.getGlobal("j2s.lib").console;

Clazz.setConsoleDiv = function(d) {
	J2S.getGlobal("j2s.lib").console = consoleDiv = d;
  };

Clazz.ClassFilesLoaded = [];

Clazz.popup = Clazz.log = Clazz.error = window.alert;

/* can be set by page JavaScript */
Clazz.defaultAssertionStatus = false;

/* can be set by page JavaScript */
Clazz._assertFunction = null;


// ////// 16 methods called from code created by the transpiler ////////

var getArrayClass = function(name){
	// "[C" "[[C"
	var n = 0;
	while (name.charAt(n) == "[") n++;
	var type = name.substring(n);
	if (type == "S")
		type = "H"; // [S is short[] in Java
	var clazz = (type.length == 1 ? primTypes[type].TYPE : Clazz._4Name(type.split(";")[0].substring(1),null,null,true)); 
	return Clazz.array(clazz,-n);
}

Clazz.array = function(baseClass, paramType, ndims, params, isClone) {
	
	if (arguments.length == 2 && paramType < 0)
		return arrayClass(baseClass, -paramType);

	var t0 = (_profileNew ? window.performance.now() : 0);

	var ret = _array.apply(null, arguments);
	
	_profileNew && addProfileNew(baseClass == -1 ? paramType.__BASECLASS : baseClass, -1);

	return ret;
}

var _array = function(baseClass, paramType, ndims, params, isClone) {
	
  // Object x = Array.newInstance(componentClass, nElements);
  // var x=Clazz.array((Clazz.array(componentClass, 3);

	
  // int[][].class Clazz.array(Integer.TYPE, -2)
  // new int[] {3, 4, 5} Clazz.array(Integer.TYPE, -1, [3, 4, 5])
  // new int[][]{new int[] {3, 4, 5}, {new int[] {3, 4, 5}}
  // Clazz.array(Integer.TYPE, -2, Clazz.array(Integer.TYPE, -1, [3, 4, 5]),
	// Clazz.array(Integer.TYPE, -1, [3, 4, 5]) )
  // new int[3] Clazz.array(Integer.TYPE, [3])
  // new int[3][3] Clazz.array(Integer.TYPE, [3, 3])
  // new int[3][] Clazz.array(Integer.TYPE, [3, null])
  // new char[3] Clazz.array(Character.TYPE, [3])
  // new String[3] Clazz.array(java.lang.String, [3])

  if (arguments[0] === -1) {
    // four-parameter option from JU.AU.arrayCopyObject;
    // truncate array using slice
    // Clazz.array(-1, array, ifirst, ilast+1)
    var a = arguments[1];
    var b = a.slice(arguments[2], arguments[3]);
    return copyArrayProps(a, b);
  }
  if (arguments.length == 2 && baseClass.BYTES_PER_ELEMENT) {
	// Clazz.array(rawInt8Array, int[] array)
	// direct transfer of __* metadata (see java.nio.ByteBuffer)
	return copyArrayProps(paramType, baseClass); 
  }
  var prim = Clazz._getParamCode(baseClass);
  var dofill = true;
  if (arguments.length < 4) {
    // one-parameter option just for convenience, same as array(String, 0)
    // two-parameter options for standard new foo[n],
    // Array.newInstance(class, length), and
    // Array.newInstance(class, [dim1, dim2, dim3....])
    // three-parameter option for (Integer.TYPE, -1, [3, 4, 5])
	var cl = arguments[0];
    var baseClass = cl.__BASECLASS || cl;
    var haveDims = (typeof arguments[1] == "number");  
    var vals = arguments[haveDims ? 2 : 1];
    var ndims = (arguments.length == 1 ? 0 : !haveDims ? vals.length : arguments[1] || 0);
    if (ndims < 0 && arguments.length == 2) {
      return arrayClass(baseClass, -ndims);
    }
    if (ndims == 0) {
      ndims = -1;
      vals = [];
    }
    if (haveDims && ndims >= -1) {
      if (ndims == -1) {
        // new int[] {3, 4, 5};
        return _array(baseClass, prim + "A", -1, vals);
      }
      // Array.newInstance(int[][].class, 3);
      

      var nElem = ndims;
      cl = baseClass;

      ndims = 0;
      while ((cl = cl.getComponentType$()) != null) {
    	  baseClass = cl;
    	  ndims++;
      }
      if (ndims > 0) {
    	  a = new Array(nElem);
          setArray(a, baseClass, prim + "A", ndims + 1);
    	  for (var i = nElem; --i >= 0;)
    		  a[i] = null;
      } else {
    	  a = _array(baseClass, prim + "A", ndims + 1, [nElem]);
      }
	  return a;
    }      
    params = vals;
    paramType = prim;
    
    for (var i = Math.abs(ndims); --i >= 0;) {
      paramType += "A";
      if (!haveDims && params[i] === null) {
        params.length--;
        dofill = false;
      }
    }
    if (haveDims) {
      // new int[][] { {0, 1, 2}, {3, 4, 5} , {3, 4, 5} , {3, 4, 5} };
      return  setArray(vals, baseClass, paramType, -ndims);
    }
  }
  if (ndims < 0) {
    params = [-1, params];
  } else {
    var initValue = null;
    if (ndims >= 1 && dofill) {
    	initValue = _initVal(prim);
    }
    var p = params; // an Int32Array
    var n = p.length;
    params = new Array(n + 1);
    for (var i = 0; i < n; i++)
    	params[i] = p[i];
    params[n] = initValue;
  }
  params.push(paramType);
  var nbits = 0;
  if (ndims != 0 && !(isClone && Array.isArray(params[1]))) {
    switch (prim) {
    case "B":
      nbits = 8;
      break; 
    case "H":
      nbits = 16;
      break;
    case "I":
      nbits = 32;
      break;
    case "F":
    case "D":
    case "J":
      nbits = 64;
      break;
    }  
  }
  return newTypedA(baseClass, params, nbits, (dofill ? ndims : -ndims), isClone);
}

var _initVal = function(p) {
    switch (p) {
    case "J":
    case "B":
    case "H": // short
    case "I":
    case "F":
    case "D":
      return 0;
    case "C": 
      return  '\0';
    case "Z":
        return  false;
    default:
    	return null;
    }
}

Clazz.assert = function(clazz, obj, tf, msg) {
  if (!clazz.$_ASSERT_ENABLED_)return;
  var ok = true;
  try {
    ok = tf.apply(obj)
    if (!ok)
      msg && (msg = msg.apply(obj));  
  } catch (e) {
    ok = false;
  }
  if (!ok) {
    doDebugger();
    if (Clazz._assertFunction) {
      return Clazz._assertFunction(clazz, obj, msg || Clazz._getStackTrace());
    }
    Clazz.load("AssertionError");
    if (msg == null)
      throw Clazz.new_(AssertionError.c$);
    else
      throw Clazz.new_(AssertionError.c$$S, [msg]);
  }
}

Clazz.clone = function(me) { 
  // BH allows @j2sNative access without super constructor
if (me.__ARRAYTYPE) {
  return appendMap(Clazz.array(me.__BASECLASS, me.__ARRAYTYPE, -1, me, true), me);
}
  me = appendMap(new me.constructor(inheritArgs), me); 
  me.__JSID__ = ++_jsid;
  return me;
}

Clazz.forName = function(name, initialize, loader, isQuiet) {
  // we need to consider loading a class from the path of the calling class.
 var cl = null;
 (typeof initialize == "undefined") && (initialize = true);
 if (loader) {
	try {
		isQuiet = true;
		var className = loader.baseClass.getName$(); // set in
														// java.lang.Class.getClassLoader$()
		var i = className.lastIndexOf(".");
		var name1 = className.substring(0, i + 1);
		name1 = (name.indexOf(name1) == 0 ? name : name1 + name);
		cl = Clazz._4Name(name1, null, null, false, initialize, true);
	} catch (e) {}
 }
 return cl || Clazz._4Name(name, null, null, false, initialize, isQuiet);
}

Clazz._setDeclared = function(name, func) {
  (name.indexOf(".") < 0) && (name = "java.lang." + name);
   Clazz.allClasses[name] = func;
}

Clazz._getDeclared = function(name) { 
	(name.indexOf(".") < 0) && (name = "java.lang." + name);
	return Clazz.allClasses[name] 
}

Clazz._isClassDefined = function(clazzName) {
	if (!clazzName) 
	return false;    /* consider null or empty name as non-defined class */
	if (Clazz.allClasses[clazzName])
	return true;
	var pkgFrags = clazzName.split (/\./);
	var pkg = null;
	for (var i = 0; i < pkgFrags.length; i++)
	if (!(pkg = (pkg ? pkg[pkgFrags[i]] : Clazz._allPackage[pkgFrags[0]]))) {
	return false;
	}
	return (pkg && (Clazz.allClasses[clazzName] = pkg));
};


Clazz.getClass = function(cl, methodList) {
  // $Class$ is the java.lang.Class object wrapper
  // $clazz$ is the unwrapped JavaScript object
  cl = getClazz(cl) || cl;
  if (cl.$Class$)
    return cl.$Class$;
  java.lang.Class || Clazz.load("java.lang.Class");
  var Class_ = cl.$Class$ = new java.lang.Class();
  Class_.$clazz$ = cl; // for arrays - a bit of a hack
  Class_.$methodList$ = methodList;
  return Class_;
}


/**
 * Implements Java's keyword "instanceof" in JavaScript's way. Also alows for
 * obj to be a class itself
 * 
 * @param obj
 *            the object to be tested
 * @param clazz
 *            the class to be checked
 * @return whether the object is an instance of the class
 */
/* public */
Clazz.instanceOf = function (obj, clazz) {
	if (obj == null)
		return false;
  // allows obj to be a class already, from arrayX.getClass().isInstance(y)
  // unwrap java.lang.Class to JavaScript clazz using $clazz$
  if (typeof clazz == "string") {
    clazz = Clazz._getDeclared(clazz);
  } 
  if (!clazz)
    return false;
  if (obj == clazz)
	return true;
    // check for object being a java.lang.Class and the other not
  if (obj.$clazz$ && !clazz.$clazz$) return (clazz == java.lang.Class);
  obj.$clazz$ && (obj = obj.$clazz$);
 if (clazz == String)
	return typeof obj == "string";
  clazz.$clazz$ && (clazz = clazz.$clazz$);
  if (obj == clazz)
    return true;
  if (obj.__ARRAYTYPE || clazz.__ARRAYTYPE) {
	if (obj.__ARRAYTYPE == clazz.__ARRAYTYPE)
		return true;
	if (clazz.__BASECLASS == Clazz._O) {
		return (!obj.__ARRAYTYPE ? Array.isArray(obj) && clazz.__NDIM == 1
		: obj.__NDIM >= clazz.__NDIM && !obj.__BASECLASS.__PRIMITIVE);
	}
      return obj.__ARRAYTYPE && clazz.__ARRAYTYPE && obj.__NDIM == clazz.__NDIM 
               && isInstanceOf(obj.__BASECLASS, clazz.__BASECLASS); 
  }
  return (obj instanceof clazz || isInstanceOf(getClassName(obj, true), clazz, true));
};

/**
 * sgurin Implements Java's keyword "instanceof" in JavaScript's way **for
 * exception objects**.
 * 
 * calls Clazz.instanceOf if e is a Java exception. If not, try to detect known
 * native exceptions, like native NullPointerExceptions and wrap it into a Java
 * exception and call Clazz.instanceOf again. if the native exception can't be
 * wrapped, false is returned.
 * 
 * @param obj
 *            the object to be tested
 * @param clazz
 *            the class to be checked
 * @return whether the object is an instance of the class
 * @author: sgurin
 */
Clazz.exceptionOf = function(e, clazz) {
  if(e.__CLASS_NAME__) {
	  if (typeof clazz == "string") {
		  var c = Clazz._getDeclared(clazz);
		  if (!c) return false;
		  clazz = c;
	  }
    return Clazz.instanceOf(e, clazz);
  }
  if (!e.getMessage) {
    e.getMessage = function() {return "" + e};
  }
  if (!e.printStackTrace$) {
    e.printStackTrace$ = function(){System.err.println$S(e + "\n" + this.stack)};
    e.printStackTrace$java_io_PrintStream = function(stream){
    	stream.println$S(e + "\n" + e.stack);
    };
    // alert(e + " try/catch path:" + Clazz._getStackTrace(-10));
  }
  if(clazz == Error) {
    if (("" + e).indexOf("Error") < 0)
      return false;
    System.err.println$O(Clazz._getStackTrace());
    return true;
    // everything here is a Java Exception, not a Java Error
  }
  return (clazz == Exception || clazz == Throwable
    || clazz == NullPointerException && _isNPEExceptionPredicate(e));
};

var initStatic = function(cl, impls) {
	if (impls) {
		for (var i = 0; i < impls.length; i++) {
			initStatic(impls[i], impls[i].implementz);
		}
	} else if (cl.superclazz) {
			initStatic(cl.superclazz);
	}
	cl.$static$ && (initStatics(cl), cl.$static$());
}

/**
 * Load a class by name or an array representing a nested list of inner classes.
 * Just finalize this class if from $clinit$.
 */
Clazz.load = function(cName, from$clinit$) {
  if (!cName)
    return null;
  var cl = cName;  
  switch (from$clinit$ || 0) {
  case 1:
    // C$.$clinit$ call to finalize all dependencies
	cl.$clinit$ = 0-cl.$clinit$;
	// -2 means v 3.2.6
	// -1 means v 3.2.5
	// NaN means original 3.2.4 function() {Clazz.load(C$, 1)};
    var ld = cl.$load$;
    setSuperclass(cl, (ld && ld[0] ? Clazz.load(ld[0]) : null));
    ld[1] && addInterface(cl, ld[1]);
    switch (cl.$clinit$) {
    case -1:
    	// done
    	break;
    case -2:
    	initClass0(cl);
    	break;    
    }
    return;
  case 2:
	// C$.$static$ to do static initialization
 	if (cl.$load$) {
        if (cl.$load$[0] && !cl.superclazz) {
        	// can happen with Clazz.new_($I(n,1)....)
          setSuperclass(cl, Clazz.load(cl.$load$[0]));
        }
 		cl.$load$ = 0;
	initStatic(cl, cl.$isInterface ? cl.implementz : 0);
  	}
	return;
  }
  // allow for nested calling: ["foo",".foo_inner1",".foo_inner2"]
  if (cName instanceof Array) {
    var cl1 = null;
    var name;
    for (var i = 0; i < cName.length; i++) {
      var cn = cName[i];
      cl1 = Clazz.load(name = (cn.indexOf(".") == 0 ? name + cn : cn));
    }
    return cl1;
  }
  // allow for a clazz itself
  if (cl.__CLASS_NAME__)
    return Clazz._initClass(cl,1,1,0);
  // standard load of class by name
  if (cName.indexOf("Thread.") == 0)
    Clazz._4Name("java.lang.Thread", null, null, true)
  if (cName.indexOf("Thread") == 0)
    cName = "java.lang." + cName;
  return Clazz._4Name(cName, null, null, true);
}

// create and $init0$
var initClass0 = function(c) {
	var fields = c.$fields$;
	var objects = fields && fields[0];
	createDefaults(c, objects, false);
	fields && initStatics(c);
}

var initStatics = function(c) {
	var statics = c.$fields$ && c.$fields$[1];
	if (statics && statics.length)
	createDefaults(c, statics, true);
}

// C$.$fields$=[
// ['I',['test3','itype'],'S',['test1'],'O',['test2','java.util.List[]','test4','test.Test_','+test5']],
// ['D',['d'],'F',['f'],'I',['itest1','itest2'],'S',['stest1']]
// ]
var createDefaults = function(c, data, isStatic) {
	var a = getFields(c, data, true);
	if (isStatic) {
		for (var i = a.length; --i >= 0;) {
			var j = a[i][0];
			if (c[j] != undefined)
				return;
			c[j] = a[i][1];
		}
		return;
	}
	c.$init0$ = function(){
			var cs = c.superclazz;
			cs && cs.$init0$ && cs.$init0$.apply(this);
			for (var i = a.length; --i >= 0;){
				this[a[i][0]] = a[i][1];
			}
		};
		
}

Clazz._getFieldNames = function(c, isStatic) {
	return (c.$fields$ ? getFields(c, c.$fields$[isStatic ? 1 : 0], 0) : []);
}

Clazz._getFieldTypes = function(c, isStatic) {
	return (c.$fields$ ? getFields(c, c.$fields$[isStatic ? 1 : 0], "types") : []);
}

var fieldTypes = "Integer;Float;Double;Character;Long;Byte;"
/**
 * Get correct default (0, '\0', null) or just return a list of names.
 */
var getFields = function(c, data, andDefaults) {
  	var a = [];
  	if (!data)
  		return a;
  	if (andDefaults == "types") {
		for (var i = 0, n = data.length; i < n; i++) {
			var type = data[i++];
			var anames = data[i];
			if (type != "O") {
				for (var j = anames.length; --j >= 0;)
				a.push(type);
				continue;
			}
			type = "String";
  			for (var j = 0, na = anames.length; j < na; j++) {
  				if (anames[j].indexOf("+") != 0) {
  					type = anames[++j];
  				}
  				a.push(type);
  			}
  			continue;
		}			
		return a;
  	} 
	if (andDefaults) {
		for (var i = 0, n = data.length; i < n; i++) {
			var type = data[i++];
			var anames = data[i];
			var defval;
			switch (type) {
			case 'S':
				defval = null;
				break;
			case 'O':
				for (var j = 0, na = anames.length; j < na; j++) {
					var name = anames[j];
					if (name.indexOf("+") == 0)
						name = name.substring(1);
					else
						j++;
					a.push([name, null]);
				}
				continue;
			case 'C':
				defval = '\0';
				break;
			case 'Z':
				defval = false;
				break;
			default:
				defval = 0;
				break;  		
			}
			for (var j = 0, na = anames.length; j < na; j++) {	
				a.push([anames[j], defval]);
			}
		}	
  		return a;
  	}
  	for (var i = 0, n = data.length; i < n; i++) {
  		var type = data[i++];
  		var anames = data[i];
  		if (type == 'O') {
			for (var j = 0, na = anames.length; j < na; j++) {
  				var name = anames[j];
  				if (name.indexOf("+") == 0)
  					name = name.substring(1);
  				else
  					j++;
  				a.push(name);
  			}				
  		} else {
			for (var j = 0, na = anames.length; j < na; j++) {	
				a.push(anames[j]);
			}
  		}
  	}	
  	return a;
}
Clazz._newCount = 0;

/**
 * Create a new instance of a class. Accepts: a string
 * Clazz.new_("java.util.Hashtable") a clazz (has .__CLASS_NAME__ and a default
 * contructor) a specific class constructor such as c$$S a constructor from a
 * one class (c, anonymous constructor) and a class to create, cl
 * 
 */
  
Clazz.new_ = function(c, args, cl) {
  if (!c)
    return new Clazz._O();

  var a = arguments;
  if (Array.isArray(c)) {
		a = [args, c];
		if (arguments.length == 3)
			a.push(cl);
		var _ = args;args = c;c = _;
	}
  var generics;
  if (c === 1) { // new for 3.2.6 {K:"java.lang.String",...}
	generics = arguments[1];
	a = [];
	c = a[0] = arguments[2];
	args = a[1] = arguments[3];
	cl = a[2] = arguments[4];
	a = a.slice(0, arguments.length - 2);
  }
  var haveArgs = !!args;
  args || (args = [[]]);
  
  Clazz._newCount++;
  
  var t0 = (_profileNew ? window.performance.now() : 0);
  
  if (c.__CLASS_NAME__ && c.c$) 
    c = c.c$;
  else if (typeof c == "string") {
	// Clazz.new_("path.className")
	// Clazz.new_("path.className","$I$O...",[3,"test"]);
	switch(arguments.length) {
	case 1:
		return Clazz.new_(Clazz.load(c));
	case 3:
		return Clazz.new_(Clazz.load(c)["c$" + args], cl)
	}
  }
    
  // an inner class will attach arguments to the arguments returned
  // Integer will be passed as is here, without c.exClazz, or cl
  var clInner = cl;
  cl = cl || c.exClazz || c;
  Clazz._initClass(cl,1,0,0); 
  // BH note: Critical here that the above is not 1,1,0;
  // static init is the responsibility of newInstance
  // or a static field or method call (which is handled
  // by the $I$(n) handler in the function initializer in
  // the newClass() call.
  var obj = new (Function.prototype.bind.apply(cl, a));
  if (args[2] != inheritArgs) {
    haveArgs && c.apply(obj, args);
    clInner && clInner.$init$.apply(obj);
  }
    
  _profileNew && addProfileNew(cl, window.performance.now() - t0);

  if (generics) {
	obj.$init$.generics = generics;
  }
  return obj;
}

Clazz._Pointer = null;

Clazz._loadWasm = function(cls, lib){
	if (cls.wasmLoaded)
		return;
	cls.wasmLoaded = true;
	var libName = lib.getName$(); // "jnainchi"	var wasmName = libName + ".wasm";
	if (J2S.wasm && J2S.wasm[libname])
		return;
	var className = cls.getName$();
	var classPath = className.substring(0, className.lastIndexOf(".") + 1).replaceAll(".", "/");
	var j2sdir = Thread.秘thisThread.getContextClassLoader$().$_$base;
	var libPath = j2sdir + classPath;
	var jsClass = cls.$clazz$;
	var m;
	Clazz._isQuietLoad = true;
	var aMethods = cls.getMethods$();
	var nameMap = {};
	var funcs = [];
	J2S.wasm || (J2S.wasm = {});
	J2S.wasm[libName] || (J2S.wasm[libName] = {});
	var getFunc = function(cls, newName, sig, ptypes, retType, fargs, fret) {
		System.out.println("Clazz.loadWasm creating J2S.wasm." + libName + "." + newName);
		return function(module) { 
			var f = [];
			f[0] = module.cwrap(newName, retType, ptypes);	
			//System.out.println(newName + " " + retType + " " + ptypes);
			J2S.wasm[libName][newName] = jsClass[newName] = jsClass[sig] = function() {
				var rgs = [];
				var ba = [];
				var pa = [];
				var getNewFunc = false;
				for (var i = arguments.length; --i >= 0;) {
					var a = arguments[i];
					if (a && a.__NDIM) {
						// we have a signature "BA" (byte[]), and the 
						// developer has passed byte[] rather than the assumed
						// String value. So we need to allocate memory for
						// the array, fill it, change the wrapping to "number" (for a pointer)
						// execute the function, and then retrieve the value. 
						// Emscripten missed this for some reason, and only reads the array 
						// but does not re-fill it. I think this is a bug. 
						ba[i] = a;
						pa[i] = module._malloc(a.length);
						module.writeArrayToMemory(ba[i], pa[i]);
						a = pa[i];
						if (ptypes[i] == "string") {
							// now we know that a byte[] is being used at runtime instead of a String, 
							// we need to recreate the wrapped function.
							// this will only happen once.
							ptypes[i] = "number";
							getNewFunc = true;
						}
					}
					rgs[i] = (fargs[i] ? fargs[i](a) : a);
				}
				if (getNewFunc) {
					f[0] = module.cwrap(newName, retType, ptypes);
				}
				var val = f[0].apply(null, rgs);
				if (ba.length) {
					for (var i = pa.length; --i >= 0;) {
						if (pa[i]) {
							// fill original array from pointer
							for (var pt = pa[i], a = ba[i], n = a.length, j = 0; j < n; j++) {
								a[j] = module.getValue(pt++);
							}
							module._free(pa[i]);
						}
					}
					
				}
				return (fret ? fret(val, module) : val);			
			}
		}
	}
	
	var argPtr = function(p) { return (p ? p.peer : 0); };
	var retPtr = function(i) { return Clazz.new_(com.sun.jna.Pointer.c$$I, [i]);};
	var retStr = function(p) { if (p < 0) return null;var ret = module.UTF8ToString(p); module._free(p);return ret;};
	var retNull = function() { return null; };
	
	for (var i = 0, n = aMethods.length; i < n; i++) {
		try {
			m = aMethods[i];
			var jsm = m.$meth$;
			if (!jsm.isNative)
				continue;
			var name = m.getName$();
			var newName = name;
			var ext = nameMap[name] || 0;
			if (ext) {
				newName += ext;
			} else {
				ext++;
			}
			nameMap[name] = ++ext;
			var sig = m.getSignature$();
			var aParams = sig.split("$");
			var ptypes = [];
			var fargs = [];
			for (var p = 1, np = aParams.length; sig != null && p <np; p++) {
				var f = null;
				var par = aParams[p];
				switch (par) {
				case "":
					// xxxx$()
					continue;
				case "com_sun_jna_Pointer":
					ptypes.push("number");
					f = argPtr;
					break;
				case "BA": // It is assumed these are strings
				case "S":
					ptypes.push("string");
					break;
				case "B":
				case "I":
				case "H":
				case "J":
				case "Z":
				case "F":
				case "D":
					ptypes.push("number");
					break;
				default:
					System.err.println("loadWasm unknown param type " + sig + " " + par);
					sig = null;
					break;
				}
				fargs.push(f);
			}
			if (sig == null)
				continue;
			var fret = null;
			var retType = "number"; 
			switch (jsm.nativeReturn) {
			case "com.sun.jna.Pointer":
				if (!Clazz._Pointer) {
					Clazz._Pointer = Clazz.load("com.sun.jna.Pointer");
				}
				fret = retPtr; 
				break;
			case "[B": // It is assumed these are strings
			case "java.lang.String":
			case "String":
				retType = "string";
			break;
			case "void":
			case "java.lang.Void":
				fret = retNull;
				retType = null;
			case "byte":
			case "int":
			case "short":
			case "long":
			case "boolean":
			case "float":
			case "double":
			break;
			default:
				System.err.println("loadWasm unknown return type for " + sig + ": " +  jsm.nativeReturn);
				sig = null;
				break;
			}
			if (sig == null)
				continue;
			funcs.push(getFunc(cls, newName, sig, ptypes, retType, fargs, fret));
		} catch (e) {
			System.err.println("loadWasm method " + m + " failed - skipped " + e);
			// something can't be translated
		}
	}
	J2S._nativeDefs || (J2S._nativeDefs = {});
	J2S._nativeDefs[libName] = funcs;	
	Clazz._isQuietLoad = false;
	J2S._wasmPath = libPath;
	var src = libPath + libName + ".js";
	var f = function(module){
		J2S._module = module;
		for (var i = 0; i < funcs.length; i++) {
			funcs[i].apply(null, [module]);
		}
		cls.wasmInitialized = true;
		J2S.wasm[libName].$ready = true;
	}
	var module = J2S[libName + "_module"]
	if (module)
		f(module);
	else
		$.getScript(src, function() {jnainchiModule().then(function(module) { f(module) })});
}

Clazz.newClass = function (prefix, name, clazz, clazzSuper, interfacez, type) { 
// if (J2S._debugCore) {
// var qualifiedName = (prefix ? (prefix.__PKG_NAME__ || prefix.__CLASS_NAME__)
// + "." : "") + name;
// checkDeclared(qualifiedName, type);
// }
  clazz || (clazz = function () {Clazz.newInstance(this,arguments,0,clazz)});  
  
  clazz.__NAME__ = name;
  // prefix class means this is an inner class, and $this$0 refers to the
	// outer class.
  // no prefix class but a super class that is an inner class, then $this$0
	// refers to its $this$0.
  // there can be a conflict here.
  prefix.__CLASS_NAME__ && (clazz.$this$0 = prefix.__CLASS_NAME__) || clazzSuper && clazzSuper.$this$0 && (clazz.$this$0 = clazzSuper.$this$0);

  
  clazz.$load$ = [clazzSuper, interfacez];
  clazz.$isEnum = clazzSuper == 'Enum';
  // get qualifed name, and for inner classes, the name to use to refer to
	// this
  // class in the synthetic reference array b$[].

  var qName, bName;
  if (!prefix) {
    // e.g. Clazz.declareInterface (null, "ICorePlugin",
	// org.eclipse.ui.IPlugin);
    qName = name;
    Clazz._setDeclared(name, clazz);
  } else if (prefix.__PKG_NAME__) {
    // e.g. Clazz.declareInterface (org.eclipse.ui, "ICorePlugin",
	// org.eclipse.ui.IPlugin);
    qName = prefix.__PKG_NAME__ + "." + name;
    prefix[name] = clazz;
    if (prefix === java.lang) {
      setWindowValue(name, clazz);
    }
  } else {
    // is an inner class
    qName = prefix.__CLASS_NAME__ + "." + name;
    bName = prefix.__CLASS_NAME__ + "$" + name;    
    prefix[name] = clazz;
  }
  
  finalizeClazz(clazz, qName, bName, type, false);

// for (var i = minimalObjNames.length; --i >= 0;) {
// var name = minimalObjNames[i];
// clazz[name] = objMethods[name];
// }
  Clazz._setDeclared(qName, clazz);
  return clazz;

};

Clazz.newEnumConst = function(vals, c, enumName, enumOrdinal, args, cl) {
	var clazzEnum = c.exClazz;
	var e = clazzEnum.$init$$ || (clazzEnum.$init$$ = clazzEnum.$init$);
	clazzEnum.$init$ = function() {e.apply(this); this.name = this.$name = enumName; this.ordinal = enumOrdinal;this.$isEnumConst = true;}
	vals.push(clazzEnum[enumName] = clazzEnum.prototype[enumName] = Clazz.new_(c, args, cl));
	}
	
Clazz.newInstance = function (objThis, args, isInner, clazz) {
  if (args && ( 
     args[0] == inheritArgs 
     || args[1] == inheritArgs 
     || args[2] == inheritArgs 
  )) {
    // Just declaring a class, not creating an instance or doing field
	// preparation.
    // That is, we are just generating the prototypes for this method using new
	// superClass()
    return;
  }

  if (objThis.__VAL0__) {
    // Integer, Long, Byte, Float, Double
    // .instantialize(val)
    objThis.valueOf = function () {
      return this;
    };
  }

  objThis.__JSID__ = ++_jsid;

  if (!isInner) {
// if (args)
	clazz && Clazz._initClass(clazz,1,1,objThis);
    if ((!args || args.length == 0) && objThis.c$) {
    // allow for direct default call "new foo()" to run with its default
	// constructor
      objThis.c$.apply(objThis);
      args && (args[2] = inheritArgs)  
    }
    return;
  }

  // inner class
  
  // args[0] = outerObject
  // args[1] = b$ array
  // args[2-n] = actual arguments
  var outerObj = shiftArray(args, 0, 1);  
  var finalVars = shiftArray(args, 0, 1);
  var haveFinals = (finalVars || outerObj && outerObj.$finals$);
  if (!outerObj || !objThis)
    return;
  var clazz1 = (outerObj.__CLASS_NAME__ || outerObj instanceof String ? getClazz(outerObj) : null);
  (!clazz1 || clazz1 == outerObj) && (outerObj = objThis);

  if (haveFinals) {
    // f$ is short for the once-chosen "$finals$"
    var of$ = outerObj.$finals$;
    objThis.$finals$ = (finalVars ? 
      (of$ ? appendMap(appendMap({}, of$), finalVars) : finalVars)
      : of$ ? of$ : null);
  }
  // BH: For efficiency: Save the b$ array with the OUTER class as $b$,
  // as its keys are properties of it and can be used again.
  var b = outerObj.$b$;
  var isNew = false;
  var innerName = getClassName(objThis, true);
  if (!b) {
    b = outerObj.b$;
    // Inner class of an inner class must inherit all outer object references.
	// Note that this
    // can cause conflicts. For example, b$["java.awt.Component"] could refer to
	// the wrong
    // object if I did this wrong.
    // 
    if (!b) {
      // the outer class is not itself an inner class - start a new map
      b = {};
      isNew = true;
    } else if (b["$ " + innerName]) {
      // this inner class is already in the map pointing to a different
		// object. Clone the map.
      b = appendMap({},b);
      isNew = true;
    }
    b[getClassName(outerObj, true)] = outerObj;
    // add all superclass references for outer object
    clazz1 && addB$Keys(clazz1, isNew, b, outerObj, objThis);
  }
  var clazz2 = (clazz.superclazz == clazz1 ? null : clazz.superclazz || null);
  if (clazz2) {
		// we have an inner object that subclasses a different object
		// clone the map and overwrite with the correct values
      b = appendMap({},b);
	addB$Keys(clazz2, true, b, objThis, objThis);
  } else if (isNew) {
	// it is new, save this map with the OUTER object as $b$
	// 12018.12.20 but only if it is clean
	outerObj.$b$ = b;	
  }
  
  // final objective: save this map for the inner object
  // add a flag to disallow any other same-class use of this map.
  b["$ " + innerName] = 1;
  objThis.b$ = b;
  clazz.$this$0 && (objThis.this$0 = b[clazz.$this$0]);
  Clazz._initClass(clazz,1,0,objThis);
};


var fixBRefs = function(cl, obj, outerObj) {
	// see Clazz.super_
	obj.b$[cl.superclazz.$this$0] = outerObj;
}

var stripJavaLang = function(s) {
	return (
			s.indexOf("java.lang.") != 0 
			|| s == "java.lang.Object"
			|| s.length > 10 && !Character.isUpperCase$C(s.charAt(10)) ? 
					s :
					s.substring(10));
};

var addB$Keys = function(clazz, isNew, b, outerObj, objThis) {
  var cl = clazz;
  do {
    var key = getClassName(cl, true);
    if (!isNew && b[key])
      break;
    setB$key(key, b, outerObj);
  if (cl.implementz) {
  	var impl = cl.implementz;
  	for (var i = impl.length; --i >= 0;) {
      var key = getClassName(impl[i], true);
      if (isNew || !b[key]) {
    	setB$key(key, b, outerObj);
      }
  	}
  }
  } while ((cl = cl.superclazz));
};

var setB$key = function(key, b, outerObj) {
    b[key] = outerObj; 
    if (key.indexOf("java.lang.") == 0)
    	b[key.substring(10)] = outerObj;
    if (key == "javax.swing.JDialog")
    	b["java.awt.Dialog"] = outerObj;
    if (key == "javax.swing.JFrame")
    	b["java.awt.Frame"] = outerObj;
};

/**
 * // arg1 is the package name // arg2 is the full class name in quotes // arg3
 * is the class definition function, C$, which is called in Clazz.new_(). //
 * arg4 is the superclass // arg5 is the superinterface(s) // arg6 is the type:
 * anonymous(1), local(2), or absent
 */

Clazz.newInterface = function (prefix, name, f, _null2, interfacez, _0) {
  var c = Clazz.newClass(prefix, name, function(){}, null, interfacez, 0);
  f && f(c); // allow for j2sNative block
  return c;
};

var __allowOverwriteClass = true;

Clazz.newMeth = function (clazzThis, funName, funBody, modifiers, nativeReturn) {

	if (!__allowOverwriteClass && clazzThis.prototype[funName]) 
		return;
	
	// modifiers: 1: static, 2: native, p3 -- private holder
  if (arguments.length == 1) {
    return Clazz.newMeth(clazzThis, 'c$', function(){
    	clazzThis.$load$ && Clazz.load(clazzThis,2);
    	Clazz.super_(clazzThis, this);
    	}, 1);
  }
  if (funName.constructor == Array) {
    // If funName is an array, we are setting aliases for generic calls.
    // For example: ['compareTo$S', 'compareTo$TK', 'compareTo$TA']
    // where K and A are generic types that are from a class<K> or class<A>
	// assignment.
    for (var i = funName.length; --i >= 0;)
      Clazz.newMeth(clazzThis, funName[i], funBody, modifiers);
    return;
  }
  
  var isNative = (modifiers == 2);
  var isStatic = (modifiers == 1 || modifiers == 2);
  var isPrivate = (typeof modifiers == "object");
  if (isPrivate) 
	clazzThis.$P$ = modifiers;
  Clazz.saemCount0++;
  funBody.exName = funName; // mark it as one of our methods
  funBody.exClazz = clazzThis; // make it traceable
  funBody.isPrivate = isPrivate;
  if (isNative) {
	  funBody.isNative = true;
	  funBody.nativeReturn = nativeReturn;
  }
	  
  var f;
  if (isStatic || funName == "c$")
    clazzThis[funName] = funBody;
  if (clazzThis.$isInterface)
	clazzThis.$hasJava8Defaults = true;
  if (isPrivate && modifiers)
	modifiers[funName] = funBody;
  else 
	clazzThis.prototype[funName] = funBody;
  return funBody; // allow static calls as though they were not static
};

Clazz.newPackage = function (pkgName) {
  Clazz._Loader && Clazz._Loader.doTODO();
  if (Clazz.lastPackageName == pkgName || !pkgName)
    return Clazz.lastPackage;
  var pkgFrags = pkgName.split (/\./);
  var pkg = Clazz._allPackage;
  for (var i = 0; i < pkgFrags.length; i++) {
    var a = pkgFrags[i];
    if (!pkg[a]) {
      pkg[a] = {  __PKG_NAME__ : (pkg.__PKG_NAME__ ? pkg.__PKG_NAME__ + "." + a : a) }
      if (i == 0) {
    	setWindowValue(a, pkg[a]);
      }
    }
    pkg = pkg[a]
  }
  Clazz.lastPackageName = pkgName;
  return Clazz.lastPackage = pkg;
};

Clazz.super_ = function(cl, obj, outerObj) {
  if (outerObj) {
	// inner class is subclassing an inner class in another class using
	// OuterClass.super()
	fixBRefs(cl, obj, outerObj);
	return;
  }

  // implicit super() call
  
  if (cl.superclazz && cl.superclazz.c$) {
    // added [] here to account for the possibility of vararg default
	// constructor
    cl.superclazz.c$.apply(obj, [[]]);
  }
  cl.$init$ && cl.$init$.apply(obj);
}

// ///////////////////////////////////////////////////////////////////

var aas = "AAA";

var arrayClasses = {};

var arrayClass = function(baseClass, ndim) {
  ndim || (ndim = 1);
  var stub = Clazz._getParamCode(baseClass);
  var key = stub + ";" + ndim;
  var ret = arrayClasses[key];
  if (ret)
	return ret;
  while (aas.length < ndim)
    aas += aas;
  var aaa = aas.substring(0, ndim);
  var o = {};
  var a = new Array(ndim);
  o.arrayType = 1;
  o.__BASECLASS = baseClass;
  o.__NDIM = ndim;
  o.__CLASS_NAME__ = o.__ARRAYTYPE = stub + aaa;
  o.__COMPONENTTYPE = (o.__NDIM == 1 ? baseClass : null);
  var oclass = Clazz.getClass(o);
  oclass.getComponentType$ = function() { 
	if (!o.__COMPONENTTYPE)
		o.__COMPONENTTYPE = arrayClass(baseClass, ndim - 1);
    return (o.__COMPONENTTYPE.__PRIMITIVE 
    		|| o.__COMPONENTTYPE.$clazz$ ? o.__COMPONENTTYPE 
    		: Clazz.getClass(o.__COMPONENTTYPE)); 
  };
  oclass.getName$ = function() {return o.__NAME || (o__NAME = (function(stub) {
    switch (stub) {
    case "O":
      stub = "Object";
      break;
    case "H": // SwingJS -> Java
    	stub = "S";
    	break;
    case "S":
      stub = "String";
      break;
    default:
      if (stub.length > 1)
        stub = baseClass.__CLASS_NAME$__ || baseClass.__CLASS_NAME__;
      break;
    }
    if (stub.indexOf(".") >= 0)
      stub = "L" + stub + ";";
    else if (stub.length > 1)
      stub = "Ljava.lang." + stub + ";";
    return aaa.replace(/A/g,"[") + stub;
  })(stub))};
  arrayClasses[key] = oclass;
  return oclass;  
}


// var supportsNativeObject = window["j2s.object.native"]; // true


// Clazz.duplicatedMethods = {};

// Clazz._preps = {}; // prepareFields functions based on class name

// BH Clazz.getProfile monitors exactly what is being delegated with SAEM,
// which could be a bottle-neck for function calling.
// This is critical for performance optimization.

var __signatures = ""; 
var profilet0;
var _profileNew = null;
var _jsid0 = 0;

Clazz.startProfiling = function(doProfile) {
  _profileNew = {};
  if (typeof doProfile == "number") {
    _jsid0 = _jsid;
    setTimeout(function() { var s = "total wall time: " + doProfile + " sec\n" + Clazz.getProfile(); console.log(s); System.out.println(s)}, doProfile * 1000);
  } else if (doProfile === false) {
	_jsid = 0;
	_profileNew = null;
  }
  return (_profileNew ? "use Clazz.getProfile() to show results" : "profiling stopped and cleared")
}

var tabN = function(n) { n = ("" + n).split(".")[0]; return "..........".substring(n.length) + n + "\t" };

Clazz.getProfile = function() {
  var s = "run  Clazz.startProfiling() first";
    
    if (_profileNew) {
      s += "\n\n Total new objects: " + (_jsid - _jsid0) + "\n";
      s += "\ncount   \texec(ms)\n";
      s += "--------\t--------\t------------------------------\n";
      totalcount = 0;
      totaltime = 0;
      var rows = [];
      for (var key in _profileNew) {
        var count = _profileNew[key][0];
        var tnano = _profileNew[key][1];
        totalcount += count;
        totaltime += Math.abs(tnano);
        rows.push(tabN(count) + tabN(Math.round(tnano)) + "\t" +key + "\n");
      }
      rows.sort();
      rows.reverse();
      s += rows.join("");
      s+= tabN(totalcount)+tabN(Math.round(totaltime)) + "\n";
    }
  _profileNew = null;
  return s; // + __signatures;
}

var addProfileNew = function(c, t) {
  var s = c.__CLASS_NAME__ || c.__PARAMCODE;
  if (t < 0) {
	s += "[]";
	t = 0;
  }
  if (J2S._traceOutput && (s.indexOf(J2S._traceOutput) >= 0 || '"' + s + '"' == J2S._traceOutput)) {
    alert(s + "\n\n" + Clazz._getStackTrace());
    doDebugger();
  }

  var p = _profileNew[s]; 
  p || (p = _profileNew[s] = [0,0]);
  p[0]++;
  p[1]+=t;
}

// /////////////////// method creation ////////////////////////////////

var doDebugger = function() { debugger }

// /////////////////////// private supporting method creation
// //////////////////////

     
 var copyArrayProps = function(a, b) {
    b.__BYTESIZE = a.__BYTESIZE;
    b.__ARRAYTYPE = a.__ARRAYTYPE;
    b.__BASECLASS = a.__BASECLASS;
    b.__NDIM = a.__NDIM;
    b.getClass$ = a.getClass$; 
    b.equals$O = a.equals$O;
    b.hashCode$ = a.hashCode$;
    return b;
 }
 
 var aHCOffset = 500000000000
 var lHCOffset = 400000000000
 var iHCOffset = 300000000000
 var sHCOffset = 200000000000
 var bHCOffset = 100000000000


 var setArray = function(vals, baseClass, paramType, ndims) {
  ndims = Math.abs(ndims);
  vals.__JSID__ = ++_jsid;
  vals.getClass$ = function () { return arrayClass(this.__BASECLASS, this.__NDIM) };
  vals.hashCode$ = function() {return System.identityHashCode$O(this, aHCOffset);}
  vals.equals$O = function (a) {return this == a; } 

  vals.reallyEquals$O = function (a) { 
    if (!a || a.__ARRAYTYPE != this.__ARRAYTYPE || a.length != this.length)
      return false;
    if (a.length == 0)
    	return true;
    if (typeof a[0] == "object") {
      for (var i = a.length; --i >= 0;)
        if ((a[i] == null) != (this[i] == null) || a[i] != null 
          && (a[i].equals$O && !a[i].equals$O(this[i]) 
            || a.equals && !a[i].equals(this[i]) || a[i] !== this[i]))
          return false;
    } else {
    	for (var i = a.length; --i >= 0;)
            if (a[i] !== this[i])
              return false;
    }
    return true;  
  }; 
  
  vals.__ARRAYTYPE = paramType; // referenced in java.lang.Class
  vals.__BASECLASS = baseClass;
  vals.__NDIM = ndims;
  return vals;
}

/**
 * in-place shift of an array by k elements, starting with element i0, resetting
 * its length in case it is arguments (which does not have the .shift() method.
 * Returns a[i0]
 */
var shiftArray = function(a, i0, k) {
  if (a == null || k > a.length)
    return null;
  k || (k == 1);
  i0 || (i0 == 0);
  var arg = a[i0];
  for (var i = i0, n = a.length - k; i < n; i++)
    a[i] = a[i + k];
  a.length -= k;
  return arg;
};

var getParamCode = Clazz._getParamCode = function(cl) {
  cl.$clazz$ && (cl = cl.$clazz$);
  return cl.__PARAMCODE || (cl.__PARAMCODE = stripJavaLang(cl.__CLASS_NAME__).replace(/\./g, '_'));
}

var newTypedA = function(baseClass, args, nBits, ndims, isClone) {
  var dim = args[0];
  if (typeof dim == "string")
    dim = dim.charCodeAt(0); // int[] a = new int['\3'] ???
  var last = args.length - 1;
  var paramType = args[last];
  var val = args[last - 1];
  if (ndims < -1 || Math.abs(ndims) > 1) {
     //array of arrays;  -2: when x[30][]
    var xargs = new Array(last--); 
    for (var i = 0; i <= last; i++)
      xargs[i] = args[i + 1];
    // SAA -> SA
    xargs[last] = paramType.substring(0, paramType.length - 1);    
    var arr = new Array(dim);
    if (args[1] != null) {
        // arg[1] is null, we set the array type but do not fill in the array
    	// otherwise, call recursively
    	for (var i = 0; i < dim; i++) {    		 
    		arr[i] = newTypedA(baseClass, xargs, nBits, ndims - (ndims < 0 ? -1 : 1)); 
    	}
    }
  } else {
    // Clazz.newIntA(new int[5][] val = null
    // Clazz.newA(5 ,null, "SA") new String[5] val = null
    // Clazz.newA(-1, ["A","B"], "SA") new String[] val = {"A", "B"}
    // Clazz.newA(3, 5, 0, "IAA") new int[3][5] (second pass, so now args = [5,
	// 0, "IA"])
    if (val == null) {
      nBits = 0;
    } else if (nBits > 0 && dim < 0) {
      // make sure this is not a character
      for (var i = val.length; --i >= 0;)
        val[i].charAt && (val[i] = val[i].$c());
      dim = val; // because we can initialize an array using new
					// Int32Array([...])
    }
    if (nBits > 0)
      ndims = 1;
    var atype;
    // dim could be a number or an array
    switch (nBits) {
    case 8:
      var arr = new Int8Array(dim);
      break;
    case 16:
      var arr = new Int16Array(dim);
      break;
    case 32:
      var arr = new Int32Array(dim);
      break;
    case 64:
      var arr = (paramType != "JA" ? new Float64Array(dim) : typeof dim == "number" ? new Array(dim).fill(0) : dim);
      break;
    default:
      nBits = 0;
      var arr;
      if (isClone) {
        arr = new Array(dim = val.length);
      } else {
        arr = (dim < 0 ? val : new Array(dim));
        if (dim > 0 && val != null)
        	arr.fill(val);
      }
      break;
    }  
    arr.__BYTESIZE = arr.BYTES_PER_ELEMENT || (nBits >> 3);
  }
  return setArray(arr, baseClass, paramType, ndims);
}


/**
 * Return the class name of the given class or object.
 * 
 * @param clazzHost
 *            given class or object
 * @return class name
 */
var getClassName = function(obj, fAsClassName) {
  if (obj == null)
    return "NullObject";
  if (obj._NULL_)
    return obj.clazzName;
  switch(typeof obj) {
  case "number":
    return "n";
  case "boolean":
    return "b";
  case "string":
    // Always treat the constant string as String object.
    // This will be compatiable with Java String instance.
    return "String";
  case "function":
    if (obj.__CLASS_NAME__)
      return (fAsClassName ? obj.__CLASS_NAME__ : "Class"); // user defined
															// class name
    var s = obj.toString();
    var idx0 = s.indexOf("function");
    if (idx0 < 0)
      return (s.charAt(0) == '[' ? extractClassName(s) : s.replace(/[^a-zA-Z0-9]/g, ''));
    var idx1 = idx0 + 8;
    var idx2 = s.indexOf ("(", idx1);
    if (idx2 < 0)
      return "Object";
    s = s.substring (idx1, idx2);
    if (s.indexOf("Array") >= 0)
      return "Array"; 
    s = s.replace (/^\s+/, "").replace (/\s+$/, "");
    return (s == "anonymous" || s == "" ? "Function" : s);
  case "object":
    if (obj.__CLASS_NAME__) // user defined class name
      return obj.__CLASS_NAME__;
    if (!obj.constructor)
      return "Object"; // For HTML Element in IE
    if (!obj.constructor.__CLASS_NAME__) {
      if (obj.__VAL0__)
        return "Number";
      if (obj instanceof Boolean)
        return "Boolean";
      if (obj instanceof Array || obj.__BYTESIZE)
        return "Array";
      if (obj instanceof ReferenceError || obj instanceof TypeError || obj instanceof SyntaxError) {
          // note that this is not technically the case.
    	  // we use this to ensure that try/catch delivers these as java.lang.Error instances
       	  return "Error";   	  
      }
      var s = obj.toString();
      // "[object Int32Array]"
      if (s.charAt(0) == '[')
        return extractClassName(s);
    }
    return getClassName(obj.constructor, true);
  }
  // some new, unidentified class
  return "Object";
};

var extractClassName = function(clazzStr) {
  // [object Int32Array]
  var clazzName = clazzStr.substring (1, clazzStr.length - 1);
  return (clazzName.indexOf("Array") >= 0 ? "Array" // BH -- for Float64Array
													// and Int32Array
    : clazzName.indexOf ("object ") >= 0 ? clazzName.substring (7) // IE
    : clazzName);
}

/**
 * Expand the shortened list of class names. For example: JU.Log, $.Display,
 * $.Decorations will be expanded to JU.Log, JU.Display, JU.Decorations where
 * "$." stands for the previous class name's package.
 * 
 * This method will be used to unwrap the required/optional classes list and the
 * ignored classes list.
 */
/* private */
var unwrapArray = function (arr) {
  if (!arr || arr.length == 0)
    return [];
  var last = null;
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i];
    if (typeof ai != "string")
      continue;
    if (ai.charAt(0) == '$') {
      if (ai.charAt(1) == '.') {
        if (!last)
          continue;
        var idx = last.lastIndexOf(".");
        if (idx != -1) {
          var prefix = last.substring (0, idx);
          arr[i] = prefix + ai.substring(1);
        }
      } else {
        arr[i] = "org.eclipse.s" + ai.substring (1);
      }
    }
    last = arr[i];
  }
  return arr;
};

/**
 * Return the JavaScript clazz of the given class or object.
 * 
 * @param clazzHost
 *            given class or object
 * @return class name
 */
var getClazz = function (clazzHost) {
  if (!clazzHost)
    return Clazz._O;  // null/undefined is always treated as Object
  if (typeof clazzHost == "function")
    return clazzHost;
  var clazzName;
  if (clazzHost._NULL_) {
    clazzName = clazzHost.clazzName;
  } else {
    switch (typeof clazzHost) {
    case "string":
      return String;
    case "object":
      if (!clazzHost.__CLASS_NAME__)
        return (clazzHost.constructor || Clazz._O);
      clazzName = clazzHost.__CLASS_NAME__;
    break;
    default:
      return clazzHost.constructor;
    }
  }
  return evalType(clazzName, true);
};

var appendMap = function(a, b) {
  if (b)
    for (var s in b) {
        a[s] = b[s];
    }
  return a;
}

var hashCode = 0;

var _jsid = 0;

// if (supportsNativeObject) { // true
  Clazz._O = function () {};
  Clazz._O.__CLASS_NAME__ = "Object";
  Clazz._O.__PARAMCODE = "O";
  Clazz._O.getClass$ = function () { return Clazz._O; }; 
// } else {
// Clazz._O = Object;
// }

/*
 * these methods are not part of Java.
 * 
 * var objMethods = { equals : function (o) { return this === o; }, hashCode :
 * function () { return this.__CLASS_NAME__.hashCode (); }, toString : function () {
 * return "class " + this.__CLASS_NAME__; } }; objMethods.equals$O =
 * objMethods.equals;
 */

// set object methods for Clazz._O and Array

  var addProto = function(proto, name, func) {
    func.exClazz = Clazz._O;
    func.exName = name;
    return proto[name] = func;
  };

// var minimalObjNames = [ "equals$", "equals$O", "hashCode$" /*"toString",*/ ];

;(function(proto) {

  addProto(proto, "equals$O", function (obj) {
    return this == obj;
  });

  addProto(proto, "hashCode$", function () {  
    return this._$hashcode || (this._$hashcode = ++hashCode)
  });

  addProto(proto, "getClass$", function () { return Clazz.getClass(this); });

  addProto(proto, "clone$", function () { return Clazz.clone(this); });

/*
 * Methods for thread in Object
 */
  addProto(proto, "finalize$", function () {});
  addProto(proto, "notify$", function () {});
  addProto(proto, "notifyAll$", function () {});
  addProto(proto, "wait$", function () {alert("Object.wait was called!" + arguments.callee.caller.toString())});
  addProto(proto, "toString$", Object.prototype.toString);
  addProto(proto, "toString", function () { return (this.__CLASS_NAME__ ? "[" + (this.__CLASS_NAME$__ || this.__CLASS_NAME__) + " object]" : this.toString$.apply(this, arguments)); });

})(Clazz._O.prototype);

var extendObjectMethodNames = [
  // all
  "equals$O", "getClass$", "clone$", "finalize$", "notify$", "notifyAll$", "wait$", 
  // not Number, Array
  "hashCode$", 
  // not String
  "toString" 
  ];

var EXT_NO_TOSTRING       = 1; // length - 1
var EXT_NO_HASHCODE       = 2; // length - 2

var extendObject = function(clazz, ext) {
  var op =Clazz._O.prototype;
  var cp = clazz.prototype;
  for (var i = extendObjectMethodNames.length - (ext || 0); --i >= 0;) {
    var p = extendObjectMethodNames[i];
    cp[p] = op[p];
  }
}

// see also
var excludeSuper = function(o) {
 return o == "b$" || o == "$this$0"
      || o == "$init$"
      || o == "$init0$"
      || o == "$static$"
      || o == "$defaults$"
      || o == "$clinit$"
      || o == "$classes$"
      || o == "$fields$"
      || o == "$load$"
      || o == "$Class$"
      || o == "$getMembers$"
      || o == "$getAnn$"
      || o == "prototype" 
      || o == "__PARAMCODE" 
      || o == "__CLASS_NAME__" 
      || o == "__CLASS_NAME$__" 
      || o == "superclazz"
      || o == "implementz"
      || o.startsWith("c$") 
}

var copyStatics = function(clazzFrom, clazzThis, isInterface) {
  for (var o in clazzFrom) {
    if (clazzThis[o] == undefined && !excludeSuper(o)) {
      clazzThis[o] = clazzFrom[o];
      if (isInterface)
        clazzThis.prototype[o] = clazzFrom[o];
    }
  }
  if (isInterface) {
	clazzFrom.$static$ && (initStatics(clazzFrom), clazzFrom.$static$());
	clazzThis.$defaults$ && clazzThis.$defaults$(clazzThis);
	for (var o in clazzFrom.prototype) {
	if (clazzThis.prototype[o] == undefined && !excludeSuper(o)) {
	clazzThis.prototype[o] = clazzFrom.prototype[o];
	}
	}
	if (clazzFrom.$defaults$) {
		__allowOverwriteClass = false;
		clazzFrom.$defaults$(clazzThis);
		__allowOverwriteClass = true;
	}
  }
}


var finalizeClazz = function(clazz, qname, bname, type, isNumber) {
  clazz.$isInterface = (type == 0);
  qname && (clazz.__CLASS_NAME__ = clazz.prototype.__CLASS_NAME__ = qname);
  bname && (clazz.__CLASS_NAME$__ = clazz.prototype.__CLASS_NAME$__ = bname);  // inner
																				// static
																				// classes
																				// use
																				// $
																				// not
																				// "."
  
  (type == 1) && (clazz.__ANON = clazz.prototype.__ANON = 1); 
  (type == 2) && (clazz.__LOCAL = clazz.prototype.__LOCAL = 1);
  
// if (!isNumber && type != 0)
// Clazz.newMeth(clazz, '$init0$', function(){var c;if ((c=clazz.superclazz) &&
// (c = c.$init0$))c.apply(this);}, 1);
  if (isNumber || type != 0)
	extendPrototype(clazz);

};

var extendPrototype = function(clazz, isPrimitive, addAll) {
  clazz.isInstance = function(o) { return Clazz.instanceOf(o, this) };
  var cp = clazz.prototype;
  var op = Clazz._O.prototype;        
  for (var i = 0; i < extendObjectMethodNames.length; i++) {
    var p = extendObjectMethodNames[i];
    if (!cp[p] || cp[p].exClazz == Clazz._O)
      addProto(cp, p, op[p]);
  }
}


Clazz.saemCount0 = 0 // methods defined

var NullObject = function () {};

var evalType = function (typeStr, isQualified) {
  if (typeStr == null)
    return null;
  var cl = (isQualified && Clazz._getDeclared(typeStr));
  if (cl)
    return cl;
  var idx = typeStr.lastIndexOf(".");
  if (idx >= 0) {
    var pkgName = typeStr.substring (0, idx);
    var pkg = Clazz.newPackage(pkgName);
    var clazzName = typeStr.substring (idx + 1);
    return pkg[clazzName];
  } 
  switch (typeStr) {
  case "string":
    return String;
  case "number":
    return Number;
  case "object":
    return Clazz._O;
  case "boolean":
    return Boolean;
  case "function":
    return Function;
  case "void":
  case "undefined":
  case "unknown":
    return typeStr;
  case "NullObject":
    return NullObject;
  default:
    return Clazz._getDeclared(typeStr);
  }
};

var equalsOrExtendsLevel = function (clazzThis, clazzAncestor) {
  while (true) {
    if (clazzThis == null)
      return false;  
    if (clazzThis === clazzAncestor)
      return true;
    if (clazzThis && clazzThis.implementz) {
      var impls = clazzThis.implementz;
      for (var i = impls.length; --i >= 0;)
        if (equalsOrExtendsLevel(impls[i], clazzAncestor))
          return true;
    }
    clazzThis = clazzThis.superclazz;
  }
  return false;
};

var knownInst = {};

var isInstanceOf = function (clazzTarget, clazzBase, isTgtStr, isBaseStr) {
  if (clazzTarget === clazzBase)
    return true;
  if (isTgtStr && ("void" == clazzTarget || "unknown" == clazzTarget))
    return false;
  if (isBaseStr && ("void" == clazzBase || "unknown" == clazzBase))
    return false;
  Clazz._initClass(clazzBase, 1)
  if (clazzTarget === (isTgtStr ? "NullObject" : NullObject)) {
    switch (clazzBase) {
    case "n":
    case "b":
      return false;
    case Number:
    case Boolean:
    case NullObject:
      break;
    default:
      return true;
    }
  } 
  var t = (isTgtStr ? clazzTarget : clazzTarget.__CLASS_NAME__ || clazzTarget.type);
  var b = (isBaseStr ? clazzBase : clazzBase.__CLASS_NAME__ || clazzBase.type);
  if (t && t == b)
	return true;
  var key = t + "|" + b;
  var val = knownInst[key];
  if (val)
	return (val == 1 ? true : false); 
  
  isTgtStr && (clazzTarget = Clazz._getDeclared(clazzTarget));
  isBaseStr && (clazzBase = Clazz._getDeclared(clazzBase));
  var ret = (clazzBase && clazzTarget && (
    clazzTarget == clazzBase 
      || clazzBase === Object 
      || clazzBase === Clazz._O
      || equalsOrExtendsLevel(clazzTarget, clazzBase)
    ));
if (t && b)
  knownInst[key] = (ret ? 1 : -1);
  return ret;
};


// ///////////////////////// Exception handling ////////////////////////////

/*
 * Use to mark that the Throwable instance is created or not.
 * 
 * Called from java.lang.Throwable, as defined in JSmolJavaExt.js
 * 
 * The underscore is important - it tells the JSmol ANT task to NOT turn this
 * into Clazz_initializingException, because coreBottom2.js does not include
 * that call, and so Google Closure Compiler does not minify it.
 * 
 */
/* public */
Clazz._initializingException = false;

/**
 * MethodException will be used as a signal to notify that the method is not
 * found in the current clazz hierarchy.
 */
/* private */
var MethodException = function () {
  this.toString = function () {
    return "j2s MethodException";
  };
};

var _isNPEExceptionPredicate;

;(function() { 
  /*
	 * sgurin: native exception detection mechanism. Only NullPointerException
	 * detected and wrapped to java excepions
	 */
  /**
	 * private utility method for creating a general regexp that can be used
	 * later for detecting a certain kind of native exceptions. use with error
	 * messages like "blabla IDENTIFIER blabla"
	 * 
	 * @param msg
	 *            String - the error message
	 * @param spliterName
	 *            String, must be contained once in msg spliterRegex String, a
	 *            string with the regexp literal for identifying the spitter in
	 *            exception further error messages.
	 */
  // reproduce NullPointerException for knowing how to detect them, and create
	// detector function Clazz._isNPEExceptionPredicate
  var $$o$$ = null;
  
  try {
    $$o$$.hello();
  } catch (e) {
    var _ex_reg = function(msg, spliterName, spliterRegex) {
      if(!spliterRegex) 
        spliterRegex="[^\\s]+";  
      var idx = msg.indexOf (spliterName), 
        str = msg.substring (0, idx) + spliterRegex + msg.substring(idx + spliterName.length), 
        regexp = new RegExp("^"+str+"$");
      return regexp;
    };
    if(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {// opera throws an
															// exception with
															// fixed messages
															// like "Statement
															// on line 23:
															// Cannot convert
															// undefined or null
															// to Object
															// Backtrace:
															// Line....long
															// text... "
      var idx1 = e.message.indexOf(":"), idx2 = e.message.indexOf(":", idx1+2);
      var _NPEMsgFragment = e.message.substr(idx1+1, idx2-idx1-20);
      _isNPEExceptionPredicate = function(e) { return e.message.indexOf(_NPEMsgFragment)!=-1; };
    }  else if(navigator.userAgent.toLowerCase().indexOf("webkit")!=-1) { // webkit,
																			// google
																			// chrome
																			// prints
																			// the
																			// property
																			// name
																			// accessed.
      var _exceptionNPERegExp = _ex_reg(e.message, "hello");
      _isNPEExceptionPredicate = function(e) { return _exceptionNPERegExp.test(e.message); };
    }  else {// ie, firefox and others print the name of the object accessed:
      var _exceptionNPERegExp = _ex_reg(e.message, "$$o$$");
      _isNPEExceptionPredicate = function(e) { return _exceptionNPERegExp.test(e.message); };
    }    
  };
})();

var getArgs = function(c) {
    var s = "";
    var args = c.arguments;
    for (var j = 0; j < args.length; j++) {
      var sa = (args[j] instanceof Object ? args[j].toString() : "" + args[j]);
      if (sa.length > 60)
        sa = sa.substring(0, 60) + "...";
      s += " args[" + j + "]=" + sa.replace(/\s+/g," ") + "\n";
    }
    return s;
}

var getSig = function(c, withParams) {
	var sig = (c.toString ? c.toString().substring(0, c.toString().indexOf("{")) : "<native method>");
    sig = " " + (c.exName ? c.exClazz.__CLASS_NAME__ + "." + c.exName  + sig.replace(/function /,""): sig) + "\n";
    if (withParams)
    	sig += getArgs(c);
    return sig;
}

Clazz._showStack = function(n) {
  if (!Clazz._stack)
	return;
  n && n < Clazz._stack.length || (n = Clazz._stack.length);
  if (!n)
	return;
  for (var i = 0; i < n; i++) {
	console.log("" + i + ":" + getSig(Clazz._stack[i], true));
  }	
  return "";
}

 
Clazz._getStackTrace = function(n) {
	Clazz._stack = [];
  // need to limit this, as JavaScript call stack may be recursive
  var haven = !!n
  haven || (n = 25);
  var showParams = (n < 0);
  if (showParams)
    n = -n;
  // updateNode and updateParents cause infinite loop here
  var estack = [];
  try {
	Clazz.failnow();
	} catch (e) {
  estack = e.stack.split("\n").reverse();
  estack.pop();
	}
  var s = "\n";
  try {
  var c = arguments.callee;
  for (var i = 0; i < n; i++) {
    if (!(c = c.caller))
      break;
    var sig = getSig(c, false);
    if (s.indexOf(sig) >= 0) {
    	s += "...";
    	break;
    } else {
    	Clazz._stack.push(c);
    	s += "" + i + sig;
        s += estack.pop() + "\n\n";
    }
    if (c == c.caller) {
      s += "<recursing>\n";
      break;
    }
    if (showParams) { 	
      s += getArgs(c);
    }
  }
  } catch(e){}  
  if (!haven)
	s += estack.join("\n");
  if (Clazz._stack.length) {
	s += "\nsee Clazz._stack";
	console.log("Clazz.stack = \n" + estack.join("\n"));
	console.log("Use Clazz._showStack() or Clazz._showStack(n) to show parameters");
  }
  return s;
}

// //////////////////////////////// package loading ///////////////////////

/*
 * all root packages. e.g. java.*, org.*, com.*
 */
Clazz._allPackage = {};


/**
 * Will be used to keep value of whether the class is defined or not.
 */
Clazz.allClasses = {};

Clazz.lastPackageName = null;
Clazz.lastPackage = null;

var unloadedClasses = [];

/**
 * used specifically for declaring prototypes using subclass.prototype = new
 * superclass(inheritArgs) without running a constructor or doing field
 * preparation.
 * 
 */ 
var inheritArgs = new (function(){return {"$J2SNOCREATE$":true}})();

// var _prepOnly = new (function(){return {"$J2SPREPONLY$":true}})();

/**
 * Inherit class with "extends" keyword and also copy those static members.
 * Example, as in Java, if NAME is a static member of ClassA, and ClassB extends
 * ClassA then ClassB.NAME can be accessed in some ways.
 * 
 * @param clazzThis
 *            child class to be extended
 * @param clazzSuper
 *            super class which is inherited from
 */
var setSuperclass = function(clazzThis, clazzSuper){

 clazzThis.superclazz = clazzSuper || Clazz._O;
  if (clazzSuper) {  
    copyStatics(clazzSuper, clazzThis, false);
    var p = clazzThis.prototype;
    if (clazzSuper == Number) {
      clazzThis.prototype = new Number();
    } else {
      clazzThis.prototype = new clazzSuper(inheritArgs);     
      if (clazzSuper == Error) {
        var pp = Throwable.prototype;
        for (var o in pp) {
          if (!pp.exClazz || pp.exClazz != Clazz._O)
            clazzThis.prototype[o] = pp[o];
        }
      }
    } 
    for (var o in p) {
      if (!p[o].exClazz || p[o].exClazz != Clazz._O)
      clazzThis.prototype[o] = p[o];
    }      
  }
  clazzThis.prototype.__CLASS_NAME__ = clazzThis.__CLASS_NAME__;
};

/**
 * Implementation of Java's keyword "implements". As in JavaScript there are on
 * "implements" keyword implemented, a property of "implementz" is added to the
 * class to record the interfaces the class is implemented.
 * 
 * @param clazzThis
 *            the class to implement
 * @param interfacez
 *            Array of interfaces
 */
var addInterface = function (clazzThis, interfacez) {
  if (interfacez instanceof Array) {
    for (var i = 0, n = interfacez.length; i < n; i++) {
      var iface = interfacez[i];
      if (iface instanceof Array) {
        var cl;
        for (var j = 0; j < iface.length; j++)
          cl = Clazz.load(iface[j]);
        iface = cl;
      }
      addInterface(clazzThis, iface);  
    }
    return;
  }
  // not an array...
  if (typeof interfacez == "string") {
    var str = interfacez;
    if (!(interfacez = Clazz.load(interfacez))) {
      alert("Missing interface: " + str);
      return;
    }
  }
  (clazzThis.implementz || (clazzThis.implementz = [])).push(interfacez);
  copyStatics(interfacez, clazzThis, true);
};


// //////////////////////// default package declarations
// ////////////////////////


/*
 * Check whether given package's classpath is setup or not. Only "java" and
 * "org.eclipse.swt" are accepted in argument.
 */
/* private */
var needPackage = function(pkg) {
  // note that false != null and true != null
  return (J2S.getGlobal(pkg + ".registered") && !classpathMap["@" + pkg]);
}

  // Make sure that packageClasspath ("java", base, true);
  // is called before any _Loader#loadClass is called.

  if (needPackage("java"))
    Clazz._Loader.loadPackage("java");

Clazz.newPackage("java.io");
Clazz.newPackage("java.lang.reflect");
Clazz.newPackage("java.util");


// NOTE: Any changes to this list must also be
// accounted for in net.sf.j2s.core.astvisitors.Java2ScriptVisitor.knownClasses
Clazz.newInterface(java.io,"Externalizable");
Clazz.newInterface(java.io,"Flushable");
Clazz.newInterface(java.io,"Serializable");
Clazz.newInterface(java.lang,"Cloneable");
Clazz.newInterface(java.lang,"Appendable");
Clazz.newInterface(java.lang,"Comparable");
Clazz.newInterface(java.lang,"Runnable");

	

;(function(){var P$=java.lang,p$1={},I$=[[0,'java.util.stream.StreamSupport','java.util.Spliterators','java.lang.CharSequence$lambda1','java.lang.CharSequence$lambda2',['java.lang.CharSequence','.LinesSpliterator']]]
,I$0=I$[0],$I$=function(i,n,m){return m?$I$(i)[n].apply(null,m):((i=(I$[i]||(I$[i]=Clazz.load(I$0[i])))),!n&&i.$load$&&Clazz.load(i,2),i)};

var C$=Clazz.newInterface(P$, "CharSequence");

C$.$classes$=[['LinesSpliterator',25]];

Clazz.newMeth(C$, 'lines$S',  function (s) {
	return $I$(1,"stream$java_util_Spliterator$Z",[Clazz.new_([s.getBytes$()],$I$(5,1).c$$BA), false]);
	}, 1);

;(function(){/*c*/var C$=Clazz.newClass(P$.CharSequence, "LinesSpliterator", function(){
	Clazz.newInstance(this, arguments[0],false,C$);
	}, null, 'java.util.Spliterator');

	C$.$clinit$=2;

	Clazz.newMeth(C$, '$init$', function () {
	},1);

	C$.$fields$=[['I',['index','fence'],'O',['value','byte[]']]]

	Clazz.newMeth(C$, 'c$$BA',  function (value) {
	C$.c$$BA$I$I.apply(this, [value, 0, value.length]);
	}, 1);

	Clazz.newMeth(C$, 'c$$BA$I$I',  function (value, start, length) {
	;C$.$init$.apply(this);
	this.value=value;
	this.index=start;
	this.fence=start + length;
	}, 1);

	Clazz.newMeth(C$, 'indexOfLineSeparator$I',  function (start) {
	for (var current=start; current < this.fence; current++) {
	var ch=this.value[current];
	if (ch == 10  || ch == 13  ) {
	return current;
	}}
	return this.fence;
	}, p$1);

	Clazz.newMeth(C$, 'skipLineSeparator$I',  function (start) {
	if (start < this.fence) {
	if (this.value[start] == 13 ) {
	var next=start + 1;
	if (next < this.fence && this.value[next] == 10  ) {
	return next + 1;
	}}return start + 1;
	}return this.fence;
	}, p$1);

	Clazz.newMeth(C$, 'next',  function () {
	var start=this.index;
	var end=p$1.indexOfLineSeparator$I.apply(this, [start]);
	this.index=p$1.skipLineSeparator$I.apply(this, [end]);
	return  String.instantialize(this.value, start, end - start);
	}, p$1);

	Clazz.newMeth(C$, 'tryAdvance$java_util_function_Consumer',  function (action) {
	if (action == null ) {
	throw Clazz.new_(Clazz.load('NullPointerException').c$$S,["tryAdvance action missing"]);
	}if (this.index != this.fence) {
	action.accept$O(p$1.next.apply(this, []));
	return true;
	}return false;
	});

	Clazz.newMeth(C$, 'forEachRemaining$java_util_function_Consumer',  function (action) {
	if (action == null ) {
	throw Clazz.new_(Clazz.load('NullPointerException').c$$S,["forEachRemaining action missing"]);
	}while (this.index != this.fence){
	action.accept$O(p$1.next.apply(this, []));
	}
	});

	Clazz.newMeth(C$, 'trySplit$',  function () {
	var half=(this.fence + this.index) >>> 1;
	var mid=p$1.skipLineSeparator$I.apply(this, [p$1.indexOfLineSeparator$I.apply(this, [half])]);
	if (mid < this.fence) {
	var start=this.index;
	this.index=mid;
	return Clazz.new_(C$.c$$BA$I$I,[this.value, start, mid - start]);
	}return null;
	});

	Clazz.newMeth(C$, 'estimateSize$',  function () {
	return this.fence - this.index + 1;
	});

	Clazz.newMeth(C$, 'characteristics$',  function () {
	return 1296;
	});

	Clazz.newMeth(C$);
	})()

C$.$defaults$ = function(C$){

Clazz.newMeth(C$, 'chars$', function () {
return $I$(1).intStream$java_util_function_Supplier$I$Z(((P$.CharSequence$lambda1||
(function(){var C$=Clazz.newClass(P$, "CharSequence$lambda1", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.util.function.Supplier', 1);

C$.$clinit$ = 1;

Clazz.newMeth(C$, '$init$', function () {}, 1);
/* lambda_E */
Clazz.newMeth(C$, 'get$', function () { return($I$(2).spliterator$java_util_PrimitiveIterator_OfInt$J$I(Clazz.new_(CharSequence$1CharIterator.$init$, [this, null]), this.b$['CharSequence'].length$(), 16));});
})()
), Clazz.new_($I$(3).$init$, [this, null])), 16464, false);
});

Clazz.newMeth(C$, 'codePoints$', function () {
return $I$(1).intStream$java_util_function_Supplier$I$Z(((P$.CharSequence$lambda2||
(function(){var C$=Clazz.newClass(P$, "CharSequence$lambda2", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.util.function.Supplier', 1);

C$.$clinit$ = 1;

Clazz.newMeth(C$, '$init$', function () {
}, 1);
/* lambda_E */
Clazz.newMeth(C$, 'get$', function () { return($I$(2).spliteratorUnknownSize$java_util_PrimitiveIterator_OfInt$I(Clazz.new_(CharSequence$1CodePointIterator.$init$, [this, null]), 16));});
})()
), Clazz.new_($I$(4).$init$, [this, null])), 16, false);
});
};;
(function(){var C$=Clazz.newClass(P$, "CharSequence$1CharIterator", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, null, [['java.util.PrimitiveIterator','java.util.PrimitiveIterator.OfInt']], 2);

C$.$clinit$ = 1;

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.cur = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.cur = 0;
}, 1);

Clazz.newMeth(C$, 'hasNext$', function () {
return this.cur < this.b$['CharSequence'].length$();
});

Clazz.newMeth(C$, 'nextInt$', function () {
if (this.hasNext$()) {
return this.b$['CharSequence'].charAt$I.apply(this.b$['CharSequence'], [this.cur++]).$c();
} else {
throw Clazz.new_(Clazz.load('java.util.NoSuchElementException'));
}});

Clazz.newMeth(C$, ['forEachRemaining$java_util_function_IntConsumer','forEachRemaining$O'], function (block) {
for (; this.cur < this.b$['CharSequence'].length$(); this.cur++) {
block.accept$I(this.b$['CharSequence'].charAt$I(this.cur).$c());
}
});

Clazz.newMeth(C$);
})()
;
;
(function(){var C$=Clazz.newClass(P$, "CharSequence$1CodePointIterator", function(){
Clazz.newInstance(this, arguments[0],true,C$);
}, null, [['java.util.PrimitiveIterator','java.util.PrimitiveIterator.OfInt']], 2);

C$.$clinit$ = 1;

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.cur = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.cur = 0;
}, 1);

Clazz.newMeth(C$, ['forEachRemaining$java_util_function_IntConsumer','forEachRemaining$O'], function (block) {
var length = this.b$['CharSequence'].length$();
var i = this.cur;
try {
while (i < length){
var c1 = this.b$['CharSequence'].charAt$I(i++);
if (!Character.isHighSurrogate$C(c1) || i >= length ) {
block.accept$I(c1.$c());
} else {
var c2 = this.b$['CharSequence'].charAt$I(i);
if (Character.isLowSurrogate$C(c2)) {
i++;
block.accept$I(Character.toCodePoint$C$C(c1, c2));
} else {
block.accept$I(c1.$c());
}}}
} finally {
this.cur=i;
}
});

Clazz.newMeth(C$, 'hasNext$', function () {
return this.cur < this.b$['CharSequence'].length$();
});

Clazz.newMeth(C$, 'nextInt$', function () {
var length = this.b$['CharSequence'].length$();
if (this.cur >= length) {
throw Clazz.new_(Clazz.load('java.util.NoSuchElementException'));
}var c1 = this.b$['CharSequence'].charAt$I.apply(this.b$['CharSequence'], [this.cur++]);
if (Character.isHighSurrogate$C(c1) && this.cur < length ) {
var c2 = this.b$['CharSequence'].charAt$I.apply(this.b$['CharSequence'], [this.cur]);
if (Character.isLowSurrogate$C(c2)) {
this.cur++;
return Character.toCodePoint$C$C(c1, c2);
}}return c1.$c();
});

Clazz.newMeth(C$);
})()
})();

// ////// (int) conversions //////////

// deprecated
Clazz.doubleToInt = Clazz.floatToInt = function (x) {
  // asm.js-style conversion
  return x|0;
};


// /////////////////////////////// Array additions
// //////////////////////////////
//
// BH: these are necessary for integer processing, especially
//
//

var arraySlice = function(istart, iend) {
  // could be Safari or could be fake
  istart || (istart = 0);
  iend || (iend = this.length);
  var b = new this.constructor(this.buffer.slice(istart * this.__BYTESIZE, iend * this.__BYTESIZE));
  b.__BYTESIZE = a.__BYTESIZE;
  b.__ARRAYTYPE = a.__ARRAYTYPE;
};

var setAType = function (IntXArray, nBytes, atype) {
  if (!IntXArray)
    alert("SwingJS will not work in this Browser")
  if (!IntXArray.prototype.sort)
    IntXArray.prototype.sort = Array.prototype.sort
  if (!IntXArray.prototype.slice)
    IntXArray.prototype.slice = function() {return arraySlice.apply(this, arguments)};
  IntXArray.prototype.clone$ = function() {
    return copyArrayProps(this, this.slice());
  };
}

setAType(Int8Array, 1, "BA");
setAType(Int16Array, 2, "HA");
setAType(Int32Array, 4, "IA");
setAType(Float64Array, 8, "DA");

java.lang.Object = Clazz._O;

// ////////////////////////// hotspot and unloading ////////////////////

// not implemented in SwingJS

// ////////////////////////// class loader /////////////////////////////

/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Zhou Renjian - initial API and implementation
 ******************************************************************************/
/*******************************************************************************
 * @author zhou renjian
 * @create July 10, 2006
 ******************************************************************************/

Clazz._Loader = function () {};

;(function(Clazz, _Loader) {

// The class loader is always accessed through Class.
// See Class.java for implementations of the methods of java.lang.ClassLoader
// such as getSystemResource and getResource

java.lang.ClassLoader = _Loader;
// BH windows-level only because it's java.lang
ClassLoader = _Loader;


_Loader.__CLASS_NAME__ = "ClassLoader";

Clazz.allClasses["java.lang.ClassLoader"] = _Loader;
_Loader.sysLoader = null;

_Loader.getSystemClassLoader$ = function() {
  return (_Loader.sysLoader ? _Loader.sysLoader : (_Loader.sysLoader = new Class().getClassLoader$()));
};


var assertionStatus = {};

_Loader.getSystemResource$S = function(name) {
	return _Loader.getSystemClassLoader$().getResource$(name);	
}

_Loader.getSystemResources$S = function(name) {
	return _Loader.getSystemClassLoader$().getResources$(name);	
}

_Loader.getSystemResourceAsStream$S = function(name) {
	return _Loader.getSystemClassLoader$().getResourceAsStream$(name);	
}

_Loader.getClassAssertionStatus$ = function(clazz) { // harmony
  var ret;
  var clazzName = clazz.__CLASS_NAME__ + ".";
  for (var c in assertionStatus) {
    if (clazzName.indexOf(c) == 0) {
      ret = assertionStatus[c];
      break;
    }
  }
  return (ret === false ? false : ret || Clazz.defaultAssertionStatus);
}

_Loader.prototype.hashCode$ = function(){return 1};


_Loader.prototype.getPackage$S = function (name) { return Clazz.new_(Clazz.load("java.lang.Package").c$$S$O, [name, Clazz._allPackage[name]]); };


_Loader.prototype.setDefaultAssertionStatus$Z = function(tf) {
  Clazz.defaultAssertionStatus = tf;
};

_Loader.prototype.clearAssertionStatus$ = function() {
  assertionStatus = {};
  Clazz.defaultAssertionStatus = false;
}

_Loader.prototype.setClassAssertionStatus$S$Z = _Loader.prototype.setPackageAssertionStatus$S$Z = function(clazzName, tf) {
  Clazz.allClasses[clazzName] && (Clazz.allClasses[clazzName].$_ASSERT_ENABLED_ = tf);
  assertionStatus[clazzName + "."] = tf;
};

_Loader.prototype.loadClass$S = function(clazzName) {
  return Clazz.forName(clazzName);
}


_Loader._checkLoad = J2S._checkLoad;
 
_Loader._TODO = [];

_Loader.doTODO = function() {
  while (_Loader._TODO.length) {
   var f = _Loader._TODO.shift();
   f();
    }
}
              
var loaders = [];

/* public */
_Loader.requireLoaderByBase = function (base) {
  for (var i = 0; i < loaders.length; i++) {
    if (loaders[i].$_$base == base) {
      return loaders[i];
    }
  }
  var loader = new _Loader ();
  loader.$_$base = base; 
  loaders.push(loader);
  return loader;
};

/**
 * 
 * Try to be compatible with Clazz system. In original design _Loader and Clazz
 * are independent! -- zhourenjian @ December 23, 2006
 */
var isClassdefined;
var definedClasses;

if (self.Clazz && Clazz._isClassDefined) {
  isClassDefined = Clazz._isClassDefined;
} else {
  definedClasses = {};
  isClassDefined = function (clazzName) {
    return definedClasses[clazzName] == true;
  };
}

/* private */
var classpathMap = Clazz.classpathMap = {};

/* public */
_Loader.loadPackageClasspath = function (pkg, base, isIndex, fSuccess, mode, pt) {
  var map = classpathMap;
  mode || (mode = 0);
  fSuccess || (fSuccess = null);
  pt || (pt = 0);

  /*
	 * In some situation, maybe, _Loader.packageClasspath ("java", ..., true);
	 * is called after other _Loader#packageClasspath, e.g. <code>
	 * _Loader.packageClasspath ("org.eclipse.swt", "...", true);
	 * _Loader.packageClasspath ("java", "...", true); </code> which is not
	 * recommended. But _Loader should try to adjust orders which requires
	 * "java" to be declared before normal _Loader #packageClasspath call before
	 * that line! And later that line should never initialize "java/package.js"
	 * again!
	 */
  var isPkgDeclared = (isIndex && map["@" + pkg]);
  if (mode == 0 && isIndex && !map["@java"] && pkg.indexOf ("java") != 0 && needPackage("java")) {
    _Loader.loadPackage("java", fSuccess ? function(_package){_Loader.loadPackageClasspath(pkg, base, isIndex, fSuccess, 1)} : null);
    if (fSuccess)
      return;
  }
  if (pkg instanceof Array) {
    unwrapArray(pkg);
    if (fSuccess) {
      if (pt < pkg.length)
        _Loader.loadPackageClasspath(pkg[pt], base, isIndex, function(_loadPackageClassPath){_Loader.loadPackageClasspath(pkg, base, isIndex, fSuccess, 1, pt + 1)}, 1);
      else
        fSuccess();
    } else {
      for (var i = 0; i < pkg.length; i++)
        _Loader.loadPackageClasspath(pkg[i], base, isIndex, null);
    }
    return;
  }
  switch (pkg) {
  case "java.*":
    pkg = "java";
    // fall through
  case "java":
    if (base) {
      // support ajax for default
      var key = "@net.sf.j2s.ajax";
      if (!map[key])
        map[key] = base;
      key = "@net.sf.j2s";
      if (!map[key])
        map[key] = base;
    }    
    break;
  case "swt":
    pkg = "org.eclipse.swt";
    break;
  case "ajax":
    pkg = "net.sf.j2s.ajax";
    break;
  case "j2s":
    pkg = "net.sf.j2s";
    break;
  default:
    if (pkg.lastIndexOf(".*") == pkg.length - 2)
      pkg = pkg.substring(0, pkg.length - 2);
    break;
  }
  if (base) // critical for multiple applets
    map["@" + pkg] = base;
  if (isIndex && !isPkgDeclared && !J2S.getGlobal(pkg + ".registered")) {
	  // the package idea has been deprecated
	  // the only package is core/package.js
    if (pkg == "java")
        pkg = (J2S.Globals["core.registered"] ? null : "core") // JSmol -- moves java/package.js to core/package.js
    // not really asynchronous
    if (pkg)
    	_Loader.loadClass(pkg + ".package", null, true, true, 1);
  }
  fSuccess && fSuccess();
};



/**
 * BH: allows user/developer to load classes even though wrapping and Google
 * Closure Compiler has not been run on the class.
 * 
 * Does initialize fully.
 * 
 * 
 * 
 */
Clazz.loadClass = function (name, onLoaded, async) {
  if (!self.Class) {
    Class = Clazz;
    Class.forName = Clazz.forName;
    // maybe more here
  }
  if (!name)
    return null;
  if (!async)
	return Clazz._4Name(name, null, null, true, true); 
  
  _Loader.loadClass(name, function() {
    var cl = Clazz._getDeclared(name);
    onLoaded(cl && Clazz._initClass(cl, 1, 1));
  }, true, async, 1);
  return true;

}

/**
 * Load the given class ant its related classes.
 */
/* public */
_Loader.loadClass = _Loader.prototype.loadClass = function (name, onLoaded, forced, async, mode) {
 
  mode || (mode = 0); // BH: not implemented
  (async == null) && (async = false);
  
   if (typeof onLoaded == "boolean")
    return evalType(name);

  // System.out.println("loadClass " + name)
  var path = _Loader.getClasspathFor(name);
  lastLoaded = name;
   Clazz.loadScript(path, name);
 }

/* private */
_Loader.loadPackage = function(pkg, fSuccess) {
  fSuccess || (fSuccess = null);
  J2S.setGlobal(pkg + ".registered", false);
  _Loader.loadPackageClasspath(pkg, 
    (_Loader.J2SLibBase || (_Loader.J2SLibBase = (_Loader.getJ2SLibBase() || "j2s/"))), 
    true, fSuccess);
};

/**
 * Register classes to a given *.z.js path, so only a single *.z.js is loaded
 * for all those classes.
 */
/* public */
_Loader.jarClasspath = function (jar, clazzes) {
  if (!(clazzes instanceof Array))
    clazzes = [clazzes];
  unwrapArray(clazzes);
  if (J2S._debugCore)
    jar = jar.replace(/\.z\./, ".")
  for (var i = clazzes.length; --i >= 0;) {
    clazzes[i] = clazzes[i].replace(/\//g,".").replace(/\.js$/g,"")
    classpathMap["#" + clazzes[i]] = jar;
  }
  classpathMap["$" + jar] = clazzes;
};

_Loader.setClasspathFor = function(clazzes) {
// Clazz._Loader.setClasspathFor("edu/colorado/phet/idealgas/model/PressureSensingBox.ChangeListener");
  if (!(clazzes instanceof Array))
    clazzes = [clazzes];
    for (var i = clazzes.length; --i >= 0;) {
      var path = clazzes[i];
      var jar = _Loader.getJ2SLibBase() + path.split(".")[0]+".js";
      path = path.replace(/\//g,".");
      classpathMap["#" + path] = jar;
      var a = classpathMap["$" + jar] || (classpathMap["$" + jar] = []);
      a.push(path);
    }
}


/**
 * Usually be used in .../package.js. All given packages will be registered to
 * the same classpath of given prefix package.
 */
/* public */
_Loader.registerPackages = function (prefix, pkgs) {
  // _Loader.checkInteractive ();
  var base = _Loader.getClasspathFor(prefix + ".*", true);
  for (var i = 0; i < pkgs.length; i++) {
      Clazz.newPackage(prefix + "." + pkgs[i]);
    _Loader.loadPackageClasspath(prefix + "." + pkgs[i], base);
  }

};

/**
 * Return the *.js path of the given class. Maybe the class is contained in a
 * *.z.js jar file.
 * 
 * @param clazz
 *            Given class that the path is to be calculated for. May be
 *            java.package, or java.lang.String
 * @param forRoot
 *            Optional argument, if true, the return path will be root of the
 *            given classs' package root path.
 * @param ext
 *            Optional argument, if given, it will replace the default ".js"
 *            extension.
 */
/* public */
_Loader.getClasspathFor = function (clazz, forRoot, ext) {
  var path = classpathMap["#" + clazz];
  if (!path || forRoot || ext) {
    var base;
    var idx;
    if (path) {
      clazz = clazz.replace(/\./g, "/");  
      if ((idx = path.lastIndexOf(clazz)) >= 0 
        || (idx = clazz.lastIndexOf("/")) >= 0 
          && (idx = path.lastIndexOf(clazz.substring(0, idx))) >= 0)
        base = path.substring(0, idx);
    } else {
      idx = clazz.length + 2;
      while ((idx = clazz.lastIndexOf(".", idx - 2)) >= 0)
        if ((base = classpathMap["@" + clazz.substring(0, idx)]))
          break;
      if (!forRoot)
        clazz = clazz.replace (/\./g, "/");  
    }
    if (base == null) {
      var bins = "binaryFolders";
      base = (Clazz[bins] && Clazz[bins].length ? Clazz[bins][0] 
        : _Loader[bins]  && _Loader[bins].length ? _Loader[bins][0]
        : "j2s");
    }
    path = (base.lastIndexOf("/") == base.length - 1 ? base : base + "/") + (forRoot ? ""
      : clazz.lastIndexOf("/*") == clazz.length - 2 ? clazz.substring(0, idx + 1)
      : clazz + (!ext ? ".js" : ext.charAt(0) != '.' ? "." + ext : ext));
  }    
  return path;// _Loader.multipleSites(path);
};

/**
 * page-customizable callbacks
 * 
 */
/* public */
_Loader.onScriptLoading = function (file){J2S._verbose && System.out.println("Classloader.onscriptloading " + file);};

/* public */
_Loader.onScriptLoaded = function (file, isError, data){};

/* public */
_Loader.onScriptInitialized = function (file){}; // not implemented

/* public */
_Loader.onScriptCompleted = function (file){}; // not implemented

/* public */
_Loader.onClassUnloaded = function (clazz){}; // not implemented

/* private */
var isClassExcluded = function (clazz) {
  return excludeClassMap["@" + clazz];
};

/* Used to keep ignored classes */
/* private */
var excludeClassMap = {};

Clazz._lastEvalError = null;

/* private */
var evaluate = function(file, js) {
  try {
	if (J2S._useEval)
		eval(js + ";//# sourceURL="+file)
	else
		new Function((J2S._strict ? '"use strict";':'')+js + ";//# sourceURL="+file)();
  } catch (e) {      
    var s = "[Java2Script] " + (
    		file.indexOf("/core/package.js") >= 0 
    		? file + " not found (ignored)"
    		: "The required class file \n\n" + file + (js.indexOf("data: no") ? 
       "\nwas not found.\n"
      : "\ncould not be loaded. Script error: " + e.message + " \n\ndata:\n\n" + js) + "\n\n" 
      + (e.stack ? e.stack : Clazz._getStackTrace()));
    Clazz._lastEvalError = s;    
    if (Clazz._isQuietLoad) 
      return;
    Clazz.alert(s);
    throw e;
  }
}

Clazz._initClass = function(c,clinit,statics,objThis) {
	var f;
	return clinit && (f=c.$clinit$) && (f === 1 || f === 2 ? Clazz.load(c,1) : f && typeof f == "function"? f() : 0),
	statics && c.$load$ && Clazz.load(c, 2),
	objThis  && (f=c.$init0$) && f.apply(objThis),
	c;
}

Clazz._getClassCount = function() {
	var n = 0;
	for (var c in Clazz.allClasses){n++};
	return n;
}

Clazz._4Name = function(clazzName, applet, state, asClazz, initialize, isQuiet) {
	// applet and state always null in SwingJS
  var cl;
  if (clazzName.indexOf("[") == 0) {
   cl = getArrayClass(clazzName);
   return (asClazz ? cl.$clazz$ : cl);
  }
  if (clazzName.indexOf(".") < 0)
    clazzName = "java.lang." + clazzName;  
  var isok = Clazz._isClassDefined(clazzName);
  if (isok && asClazz) {
    return Clazz._initClass(Clazz.allClasses[clazzName],1,1);
  } 
  if (!isok) {
    var name2 = null;
    var pt = clazzName.lastIndexOf("$");
    if (pt >= 0) {
      // BH we allow Java's java.swing.JTable.$BooleanRenderer as a stand-in
		// for java.swing.JTable.BooleanRenderer
      // when the static nested class is created using declareType
      name2 = clazzName.replace(/\$/g,".");
      if (Clazz._isClassDefined(name2)) {
        clazzName = name2;
      } else {
        cl = Clazz._4Name(clazzName.substring(0, pt), applet, state, true, initialize, isQuiet);
        cl && (clazzName = name2);	
        name2 = null;
      }
    }
    if (name2 == null) {
      var f = (J2S._isAsync && applet ? applet._restoreState(clazzName, state) : null);
      if (f == 1)
        return null; // must be already being created
      if (_Loader.setLoadingMode(f ? _Loader.MODE_SCRIPT : "xhr.sync")) {
        _Loader.loadClass(clazzName, f, false, true, 1);
        return null; // this will surely throw an error, but that is OK
      }
      // alert ("Using Java reflection: " + clazzName + " for " + applet._id +
		// " \n"+ Clazz._getStackTrace());
      _Loader.loadClass(clazzName);
    }    
  }
  cl = evalType(clazzName);
  if (!cl){
	if (isQuiet || Clazz._isQuietLoad)
		return null;
    alert(clazzName + " could not be loaded");
    doDebugger();
  }
  Clazz._setDeclared(clazzName, cl);
  // note triple== here
  Clazz._initClass(cl, initialize !== false, initialize === true);
  return (asClazz ? cl : Clazz.getClass(cl));
};

// BH: possibly useful for debugging
Clazz.currentPath= "";


Clazz.loadScript = function(file, nameForList) {

  Clazz.currentPath = file;
  // loadedScripts[file] = true;
  // also remove from queue
  // removeArrayItem(classQueue, file);

  var file0 = file;
  if (J2S._nozcore) {
    file = file.replace(/\.z\.js/,".js");
  }
  var data = "";
  try{
    _Loader.onScriptLoading(file);
    data = J2S.getFileData(file);
    evaluate(file, data);
    if (nameForList)
    	Clazz.ClassFilesLoaded.push(nameForList.replace(/\./g,"/") + ".js");
    _Loader.onScriptLoaded(file, null, data);
  }catch(e) {
	Clazz.ClassFilesLoaded.pop();
    _Loader.onScriptLoaded(file, e, data);
    var s = ""+e;
    if (data && data.indexOf("Error") >= 0)
      s = data;
    if (s.indexOf("missing ] after element list")>= 0)
      s = "File not found";
    if (file.indexOf("/j2s/core/") >= 0) {
      System.out.println(s + " loading " + file);
    } else {
     alert(s + " loading file " + file + "\n\n" + e.stack);
      doDebugger()
    
    }
  }
}

/**
 * Used in package /* public
 */
var runtimeKeyClass = _Loader.runtimeKeyClass = "java.lang.String";

/* private */
var J2sLibBase;

/**
 * Return J2SLib base path from existed SCRIPT src attribute.
 */
/* public */
_Loader.getJ2SLibBase = function () {
  var o = J2S.getGlobal("j2s.lib");
  return (o ? o.base + (o.alias == "." ? "" : (o.alias ? o.alias : (o.version ? o.version : "1.0.0")) + "/") : null);
};

/**
 * Indicate whether _Loader is loading script synchronously or asynchronously.
 */
/* private */
var isAsynchronousLoading = true;

/* private */
var isUsingXMLHttpRequest = false;

/* private */
var loadingTimeLag = -1;

_Loader.MODE_SCRIPT = 4;
_Loader.MODE_XHR = 2;
_Loader.MODE_SYNC = 1;

// Integer mode: Script 4; XHR 2; SYNC bit 1;
// async is currently ignored

/* public */
_Loader.setLoadingMode = function (mode, timeLag) {
  var async = true;
  var ajax = true;
  if (typeof mode == "string") {
    mode = mode.toLowerCase();
    if (mode.indexOf("script") >= 0)
      ajax = false;
    else
      async = (mode.indexOf("async") >=0);
    async = false; // BH
  } else {
    if (mode & _Loader.MODE_SCRIPT)
      ajax = false;
    else
      async = !(mode & _Loader.MODE_SYNC);
  }
  isUsingXMLHttpRequest = ajax;  // ignored
  isAsynchronousLoading = async;  // ignored
  loadingTimeLag = (async && timeLag >= 0 ? timeLag: -1); // ignored
  return async; // will be false
};

/*
 * Load those key *.z.js. This *.z.js will be surely loaded before other queued
 * *.js.
 */
/* public */
_Loader.loadZJar = function (zjarPath, keyClass) {
// used only by package.js for core.z.js
  var f =  null;
  var isArr = (keyClass instanceof Array);
  if (isArr)
    keyClass = keyClass[keyClass.length - 1];
// else
  // f = (keyClass == runtimeKeyClass ? runtimeLoaded : null);
  _Loader.jarClasspath(zjarPath, isArr ? keyClass : [keyClass]);
  // BH note: runtimeKeyClass is java.lang.String
  _Loader.loadClass(keyClass, null, true);
};

Clazz.binaryFolders =  _Loader.binaryFolders = [ _Loader.getJ2SLibBase() ];

})(Clazz, Clazz._Loader);

// }
/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Zhou Renjian - initial API and implementation
 ******************************************************************************/
/*******************************************************************************
 * @author zhou renjian
 * @create Jan 11, 2007
 ******************************************************************************/

Clazz._LoaderProgressMonitor = {};

;(function(CLPM, J2S) {

var fadeOutTimer = null;
var fadeAlpha = 0;
var monitorEl = null;
var lastScrollTop = 0;
var bindingParent = null;

CLPM.DEFAULT_OPACITY = (J2S && J2S._j2sLoadMonitorOpacity ? J2S._j2sLoadMonitorOpacity : 55);

/* public */
CLPM.hideMonitor = function () {
    monitorEl.style.display = "none";
}

/* public */
CLPM.showStatus = function (msg, fading) {
  if (!monitorEl) {
    createHandle ();
    if (!attached) {
      attached = true;
      // Clazz.addEvent (window, "unload", cleanup);
      // window.attachEvent ("onunload", cleanup);
    }
  }
  clearChildren(monitorEl);
  if (msg == null) {
    if (fading) {
      fadeOut();
    } else {
      CLPM.hideMonitor();
    }
    return;
  }
  
  monitorEl.appendChild(document.createTextNode ("" + msg));
  if (monitorEl.style.display == "none") {
    monitorEl.style.display = "";
  }
  setAlpha(CLPM.DEFAULT_OPACITY);
  var offTop = getFixedOffsetTop();
  if (lastScrollTop != offTop) {
    lastScrollTop = offTop;
    monitorEl.style.bottom = (lastScrollTop + 4) + "px";
  }
  if (fading) {
    fadeOut();
  }
};

/* private static */ 
var clearChildren = function (el) {
  if (!el)
    return;
  for (var i = el.childNodes.length; --i >= 0;) {
    var child = el.childNodes[i];
    if (!child)
      continue;
    if (child.childNodes && child.childNodes.length)
      clearChildren (child);
    try {
      el.removeChild (child);
    } catch (e) {};
  }
};
/* private */ 
var setAlpha = function (alpha) {
  if (fadeOutTimer && alpha == CLPM.DEFAULT_OPACITY) {
    window.clearTimeout (fadeOutTimer);
    fadeOutTimer = null;
  }
  fadeAlpha = alpha;
  // monitorEl.style.filter = "Alpha(Opacity=" + alpha + ")";
  monitorEl.style.opacity = alpha / 100.0;
};
/* private */ 
var hidingOnMouseOver = function () {
  CLPM.hideMonitor();
};

/* private */ 
var attached = false;
/* private */ 
var cleanup = function () {
  // if (monitorEl) {
  // monitorEl.onmouseover = null;
  // }
  monitorEl = null;
  bindingParent = null;
  // Clazz.removeEvent (window, "unload", cleanup);
  // window.detachEvent ("onunload", cleanup);
  attached = false;
};
/* private */ 
var createHandle = function () {
  var div = document.createElement ("DIV");
  div.id = "_Loader-status";
  div.style.cssText = "position:absolute;bottom:4px;left:4px;padding:2px 8px;"
      + "z-index:" + (J2S.getGlobal("j2s.lib").monitorZIndex || 10000) + ";background-color:#8e0000;color:yellow;" 
      + "font-family:Arial, sans-serif;font-size:10pt;white-space:nowrap;";
  div.onmouseover = hidingOnMouseOver;
  monitorEl = div;
  if (bindingParent) {
    bindingParent.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  return div;
};
/* private */ 

var fadeOut = function () {
  if (monitorEl.style.display == "none") return;
  if (fadeAlpha == CLPM.DEFAULT_OPACITY) {
    fadeOutTimer = window.setTimeout(function () {
          fadeOut();
        }, 750);
    fadeAlpha -= 5;
  } else if (fadeAlpha - 10 >= 0) {
    setAlpha(fadeAlpha - 10);
    fadeOutTimer = window.setTimeout(function () {
          fadeOut();
        }, 40);
  } else {
    monitorEl.style.display = "none";
  }
};
/* private */
var getFixedOffsetTop = function (){
  if (bindingParent) {
    var b = bindingParent;
    return b.scrollTop;
  }
  var dua = navigator.userAgent;
  var b = document.body;
  var p = b.parentNode;
  var pcHeight = p.clientHeight;
  var bcScrollTop = b.scrollTop + b.offsetTop;
  var pcScrollTop = p.scrollTop + p.offsetTop;
  return (dua.indexOf("Opera") < 0 && document.all ? (pcHeight == 0 ? bcScrollTop : pcScrollTop)
    : dua.indexOf("Gecko") < 0 ? (pcHeight == p.offsetHeight 
        && pcHeight == p.scrollHeight ? bcScrollTop : pcScrollTop) : bcScrollTop);
};

// if (window["ClazzLoader"]) {
// _Loader.onScriptLoading = function(file) {
// CLPM.showStatus("Loading " + file + "...");
// };
// _Loader.onScriptLoaded = function(file, isError) {
// CLPM.showStatus(file + (isError ? " loading failed." : " loaded."), true);
// };
// _Loader.onGlobalLoaded = function(file) {
// CLPM.showStatus("Application loaded.", true);
// };
// _Loader.onClassUnloaded = function(clazz) {
// CLPM.showStatus("Class " + clazz + " is unloaded.", true);
// };
// }

})(Clazz._LoaderProgressMonitor, J2S);

/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others. All rights reserved. This
 * program and the accompanying materials are made available under the terms of
 * the Eclipse Public License v1.0 which accompanies this distribution, and is
 * available at http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors: Zhou Renjian - initial API and implementation
 ******************************************************************************/
/*******************************************************************************
 * @author zhou renjian
 * @create Nov 5, 2005
 ******************************************************************************/

Clazz.Console = {};

;(function(Con) {
/**
 * Setting maxTotalLines to -1 will not limit the console result
 */
Con.maxTotalLines =  10000;

Con.setMaxTotalLines = function (lines) {
  Con.maxTotalLines = (lines > 0 ? lines : 999999);
}

Con.maxLatency = 40;

Con.setMaxLatency = function (latency) {
  Con.maxLatency = (latency > 0 ? latency : 40);
};

Con.pinning  = false;

Con.enablePinning = function (enabled) {
  Con.pinning = enabled;
};

Con.linesCount = 0;

Con.metLineBreak = false;


/*
 * Give an extension point so external script can create and bind the console
 * themself.
 * 
 */
Con.createConsoleWindow = function (parentEl) {
  var console = document.createElement ("DIV");
  console.style.cssText = "font-family:monospace, Arial, sans-serif;";
  document.body.appendChild (console);
  return console;
};

var c160 = String.fromCharCode(160); // nbsp;
c160 += c160+c160+c160;

Con.consoleOutput = function (s, color) {
  var con = consoleDiv;
  if (con && typeof con == "string")
    con = consoleDiv = document.getElementById(con)
  if (!con) {
    return false; // BH this just means we have turned off all console action
  }
   if (con == window.console) {
    if (color == "red")
      con.error(s);
    else
      con.log(s);
    return;
  }

	if (s == '\0') {
	con.innerHTML = "";
	con.lineCount = 0;
	return;
	}
   
  if (Con.linesCount > Con.maxTotalLines) {
    for (var i = 0; i < 1000; i++) {
      if (con && con.childNodes.length > 0) {
        con.removeChild(con.childNodes[0]);
      }
    }
    Con.linesCount = Con.maxTotalLines - 1000;
  }

  var willMeetLineBreak = false;
  s = (typeof s == "undefined" ? "" : s == null ? "null" : "" + s);
  s = s.replace (/\t/g, c160);
  if (s.length > 0)
    switch (s.charAt(s.length - 1)) {
    case '\n':
    case '\r':
      s = (s.length > 1 ? s.substring (0, s.length - (s.charAt(s.length - 2) == '\r' ? 2 : 1)) : "");
      willMeetLineBreak = true;
      break;
    }

  var lines = null;
  s = s.replace (/\t/g, c160);
  lines = s.split(/\r\n|\r|\n/g);
  for (var i = 0, last = lines.length - 1; i <= last; i++) {
    var lastLineEl = null;
    if (Con.metLineBreak || Con.linesCount == 0 
        || con.childNodes.length < 1) {
      lastLineEl = document.createElement ("DIV");
      con.appendChild (lastLineEl);
      lastLineEl.style.whiteSpace = "nowrap";
      Con.linesCount++;
    } else {
      try {
        lastLineEl = con.childNodes[con.childNodes.length - 1];
      } catch (e) {
        lastLineEl = document.createElement ("DIV");
        con.appendChild (lastLineEl);
        lastLineEl.style.whiteSpace = "nowrap";
        Con.linesCount++;
      }
    }
    var el = document.createElement ("SPAN");
    lastLineEl.appendChild (el);
    el.style.whiteSpace = "nowrap";
    if (color)
      el.style.color = color;
    var l = lines[i]
    if (l.length == 0)
      l = c160;
    el.appendChild(document.createTextNode(l));
    if (!Con.pinning)
      con.scrollTop += 100;
    Con.metLineBreak = (i != last || willMeetLineBreak);
  }

  var cssClazzName = con.parentNode.className;
  if (!Con.pinning && cssClazzName
      && cssClazzName.indexOf ("composite") != -1) {
    con.parentNode.scrollTop = con.parentNode.scrollHeight;
  }
  Con.lastOutputTime = new Date ().getTime ();
};

/*
 * Clear all contents inside the console.
 */
/* public */
Con.clear = function () {
  try {
    Con.metLineBreak = true;
    var console = consoleDiv;
    if (console == window.console || !console || typeof console == "string" && !(console = document.getElementById (console)))
      return;
    console.innerHTML = "";
    Con.linesCount = 0;
  } catch(e){};
};

/* public */
Clazz.alert = function (s) {
  Con.consoleOutput (s + "\r\n");
};

})(Clazz.Console);

var getURIField = function(name, def) {
	try {
		var ref = document.location.href.toLowerCase();
		var i = ref.indexOf(name.toLowerCase() + "=");
		if (i >= 0)
			def = (document.location.href + "&").substring(
					i + name.length + 1).split("&")[0];
	} catch (e) {
	} finally {
		return def;
	}
}

Clazz._setDeclared("java.lang.System", java.lang.System = System = {});
;(function(C$){

C$.lineSeparator = "\n";
C$.props = null;
	
C$.setIn$java_io_InputStream=function ($in) {
	C$.$in=$in;
}

C$.setOut$java_io_PrintStream=function (out) {
	C$.out=out;
	out.println = out.println$S;
	out.print = out.print$S;
}

C$.setErr$java_io_PrintStream=function (err) {
	C$.err=err;
	err.println = err.println$S;
	err.print = err.print$S;
}

C$.console$=function () {
	return null;
}

C$.inheritedChannel$=function () {
	return null;
}

C$.setSecurityManager$SecurityManager=function (s) {
}

C$.getSecurityManager$=function () {
	return null;
}

C$.currentTimeMillis$=function () {
	{
	return new Date().getTime();
}
}

C$.nanoTime$=function () {
	{
	return Math.round(window.performance.now() * 1e6);
}
}

C$.arraycopy$O$I$O$I$I=function (src, srcPos, dest, destPos, length) {

	if (src !== dest || srcPos > destPos) { for (var i = length; --i >= 0;) dest[destPos++] = src[srcPos++]; } else { destPos += length; srcPos += length; for (var i = length; --i >= 0;) src[--destPos] = src[--srcPos]; }
}

C$.identityHashCode$O=function (x, offset) {
	return x==null ? 0 : x._$hashcode || (typeof x == "string" ? x.hashCode$() : (x._$hashcode = ++hashCode + (offset || 0)));
}

C$.getProperties$=function () {
	if (C$.props == null )
		C$.props=Clazz.new_("java.util.Properties");
	for (a in sysprops)
		C$.props.put$O$O(a, sysprops[a]);
	return C$.props;
}

C$.lineSeparator$=function () {
	return C$.lineSeparator;
}

C$.setProperties$java_util_Properties=function (props) {
	C$.props = props;
}

C$.getProperty$S=function (key) {
	if (key == "java.awt.headless")
		return Clazz._isHeadless;
	C$.checkKey$S(key);
	var p = (C$.props == null ? sysprops[key] : C$.props.getProperty$S(key))
	if (p == null) {
		switch (key) {
		case "DeskTop_awt.multiClickInterval":
			// from java.awt.Toolkit.getDesktopProperty(name)
			return Integer.valueOf$I(500);
		}
	}
	return (p == null ? null : p);
}

C$.getProperty$S$S=function (key, def) {
	C$.checkKey$S(key);
	if (C$.props == null) {
		var prop = sysprops[key];
		return (prop == null ? def : prop);
	}
	return C$.props.getProperty$S$S(key, def);
}

C$.setProperty$S$S=function (key, value) {
	C$.checkKey$S(key);
	var ret;
	if (C$.props == null) {
		ret = sysprops[key];
		sysprops[key] = value;
		return ret || null;
	}
	return C$.props.setProperty$S$S(key, value);
}

C$.clearProperty$S=function (key) {
	C$.checkKey$S(key);
	return (C$.props == null ? null : C$.props.remove$O(key));
}

C$.checkKey$S=function (key) {
	if (key == null ) {
	throw Clazz.new_(Clazz.load('NullPointerException').c$$S,["key can\'t be null"]);
	}if (key.equals$O("")) {
	throw Clazz.new_(Clazz.load('IllegalArgumentException').c$$S,["key can\'t be empty"]);
	}
}

C$.getenv$S=function (name) {
	var s = J2S.getGlobal(name) || getURIField(name, null);
	return s || null;
}

var env = null;

C$.getenv$=function () {
	return env || (env = Clazz.load("java.util.Properties"));
}



C$.exit$I=function (status) {
	Clazz.loadClass("java.lang.Runtime").getRuntime$().exit$I(status | 0);
}

C$.gc$=C$.runFinalization$=C$.runFinalizersOnExit$Z=C$.load$S=C$.loadLibrary$S=C$.mapLibraryName$S=
	function (libname) {return null;}

var fixAgent = function(agent) {return "" + ((agent = agent.split(";")[0]),
		(agent + (agent.indexOf("(") >= 0 && agent.indexOf(")") < 0 ? ")" : ""))) }

	var agent = navigator.userA;
	var sysprops = {
			"file.separator" : "/",
			"line.separator" : "\n",
			"java.awt.printerjob" : "swingjs.JSPrinterJob",
			"java.class.path" : "/",
			"java.class.version" : "80",
			"java.home" : "https://.",
			"java.vendor" : "java2script/SwingJS/OpenJDK",
			"java.vendor.url" : "https://github.com/BobHanson/java2script",
			"java.version" : "1.8",
			"java.vm.name":"Java SwingJS",
			"java.vm.version" : "1.8",
			"java.specification.version" : "1.8",
			"java.io.tmpdir" : J2S.getGlobal("j2s.tmpdir"),
			"os.arch" : navigator.userAgent,
			"os.name" : fixAgent(navigator.userAgent).split("(")[0],
			"os.version": fixAgent(navigator.appVersion).replace(fixAgent(navigator.userAgent), ""),
			"path.separator" : ":",
			"user.dir" : "/TEMP/swingjs",
			"user.home" : "/TEMP/swingjs",
			"user.name" : "swingjs",
			"javax.xml.datatype.DatatypeFactory" : "swingjs.xml.JSJAXBDatatypeFactory",
			"javax.xml.bind.JAXBContextFactory" : "swingjs.xml.JSJAXBContextFactory"	
	}


})(System);

;(function(Con, Sys) {

Sys.exit$ = Sys.exit$I;

Sys.out = new Clazz._O ();
Sys.out.__CLASS_NAME__ = "java.io.PrintStream";
Sys.err = new Clazz._O ();
Sys.err.__CLASS_NAME__ = "java.io.PrintStream";

var checkTrace = function(s) {
	if (J2S._nooutput || !J2S._traceFilter && !J2S._traceOutput) return;
	if (J2S._traceFilter) {
		if ((s= "" + s).indexOf(J2S._traceFilter) < 0) 
			return;
	} else if (!(s = "" + s) || s.indexOf(J2S._traceOutput) < 0 && '"' + s + '"' != J2S._traceOutput) {
		return;
	}
	alert(s + "\n\n" + Clazz._getStackTrace());
	doDebugger();
}

var setps = function(ps, f) {

ps.flush$ = function() {}

ps.print = ps.print$ = ps.print$O = ps.print$Z = ps.print$I = ps.print$S = ps.print$C = function (s) { 
  checkTrace(s);
  f("" + s);
};

ps.print$J = function(l) {ps.print(Long.$s(l))}
ps.print$F = ps.print$D = function(f) {
	var s = "" + f; 
	ps.println(s.indexOf(".") < 0 && s.indexOf("Inf") < 0 ? s + ".0" : s);
}

ps.printf = ps.printf$S$OA = ps.format = ps.format$S$OA = function (f, args) {
  ps.print(String.format$S$OA.apply(null, arguments));
}

ps.println = ps.println$ = ps.println$Z = ps.println$I = ps.println$S = ps.println$C = ps.println$O = function(s) {
 checkTrace(s);
 f((s && s.toString ? s.toString() : "" + s)  + "\r\n");
};

ps.println$J = function(l) {ps.println(Long.$s(l))}
ps.println$F = ps.println$D = function(f) {
	var s = "" + f; 
	ps.println(s.indexOf(".") < 0 && s.indexOf("Inf") < 0 ? s + ".0" : s);
}

ps.write$I = function(ch) {
  ps.print(String.fromCharCode(ch));	
}

ps.write$BA = function (buf) {
	ps.write$BA$I$I(buf, 0, buf.length);
};

ps.write$BA$I$I = function (buf, offset, len) {
  ps.print(String.instantialize(buf, offset, len));
};

}

setps(Sys.out, function(s) {Con.consoleOutput(s)});
setps(Sys.err, function(s) {Con.consoleOutput(s, "red")});

})(Clazz.Console, System);


Clazz._Loader.registerPackages("java", [ "io", "lang", "lang.reflect", "util" ]);


// old J2S.setGlobal("java.registered", true);

// /////////////// special definitions of standard Java class methods
// ///////////

var C$, m$ = Clazz.newMeth;

Clazz._setDeclared("java.lang.Math", java.lang.Math = Math);

Math.rint || (Math.rint = function(a) {
 var b;
 return Math.round(a) + ((b = a % 1) != 0.5 && b != -0.5 ? 0 : (b = Math.round(a % 2)) > 0 ? b - 2 : b);
});

// Java 1.8

Math.abs$J = function(x) { return Long.$sign(x) < 0 ? Long.$neg(x) : Long.$dup(x); }

Math.max$J$J = function(x,y) { return Long.max$J$J(x,y); }

Math.min$J$J = function(x,y) { return Long.min$J$J(x,y); }

Math.round$D = function(x) { return Clazz.toLong(Math.round(x)); }

var arex = function(s) {
	throw Clazz.new_(Clazz.load('ArithmeticException').c$$S,[s||"integer overflow"]);
}

Math.addExact$J$J = function(x, y) {
    var r = Long.$add(x,y);
    (Long.$sign(r) != 0 && Long.$sign(x) == Long.$sign(y) && Long.$sign(x) != Long.$sign(r)) && arex();
    return r;
}

Math.subtractExact$J$J = function(x, y) {
    var r = Long.$sub(x,y);
    (Long.$sign(r) != 0 && Long.$sign(x) == Long.$sign(y) && Long.$sign(x) != Long.$sign(r)) && arex();
    return r;
}

Math.floorDiv$J$J = function(x,y) { 
	var r = Long.$div(x,y);
	return (r < 0 && Long.$ne(Long.$mul(r,y), x) ? Long.$inc(r, -1) : r);
}

Math.floorMod$J$J = function(x,y) { return Long.$sub(x, Long.$mul(Math.floorDiv(x, y), y)); }

Math.incrementExact$J = function(a) {
    (Long.$eq(a, Long_MAX_VALUE)) && arex();
    return Long.$inc(a,1);
}

Math.decrementExact$J = function(a) {
    (Long.$eq(a, Long_MIN_VALUE)) && arex();
    return Long.$inc(a,-1);
}

Math.multiplyExact$J$J = function(x, y) {
    var r = Long.$mul(x,y);
    if (Long.$sign(r) != Long.$sign(x) * Long.$sign(y)) {
    	arex();
    }
    return r;
}

Math.negateExact$J = function(a) {return Long.$neg(a);}

Math.toIntExact$J = function(value) {
    if (!Long.$eq(Long.$ival(value), value)) {
    	arex();
    }
    return value;
}

Math.addExact = function(x, y) {
    var r = x + y;
    // HD 2-12 Overflow iff both arguments have the opposite sign of the result
    if (r > Integer.MAX_VALUE || r < Integer.MIN_VALUE) {
    	arex();
    }
    return r;
}


Math.subtractExact = function(x, y) {
    var r = x - y;
    // HD 2-12 Overflow iff the arguments have different signs and
    // the sign of the result is different than the sign of x
    if (r > Integer.MAX_VALUE || r < Integer.MIN_VALUE) {
    	arex();
    }
    return r;
}

Math.multiplyExact = function(x, y) {
	var r = x * y;
    if (r > Integer.MAX_VALUE || r < Integer.MIN_VALUE) {
    	arex();
    }
    return r;
}
Math.incrementExact = function(a) {
    if (a == Integer.MAX_VALUE) {
    	arex();
    }
    return a + 1;
}

Math.decrementExact = function(a) {
    if (a == Integer.MIN_VALUE) {
    	arex();
    }
    return a - 1;
}

Math.negateExact = function(a) {return -a}

Math.floorDiv || (Math.floorDiv = function(x,y) { 
    var r = (x / y) | 0;
    if ((x ^ y) < 0 && (r * y != x)) {
        r--;
    }
    return r;
})

Math.floorMod || (Math.floorMod = function(x,y) { return x - Math.floorDiv(x, y) * y; })

// 
Math.log10||(Math.log10=function(a){return Math.log(a)/Math.E});

Math.hypot||(Math.hypot=function(x,y){return Math.sqrt(Math.pow(x,2)+Math.pow(y,2))});

Math.toDegrees||(Math.toDegrees=function(angrad){return angrad*180.0/Math.PI;});

Math.toRadians||(Math.toRadians=function(angdeg){return angdeg/180.0*Math.PI});

Math.copySign||(Math.copySign=function(mag,sign){return((sign>0?1:-1)*Math.abs(mag))});

// could use Math.sign(), but this was used to preserve cross-brower
// compatability (not in Internet Explorer)
Math.signum||(Math.signum=function(d){return(d==0.0||isNaN(d))?d:d < 0 ? -1 : 1});

Math.scalb||(Math.scalb=function(d,scaleFactor){return d*Math.pow(2,scaleFactor)});

Math.nextAfter||
(Math.nextAfter=function(start,direction){
    if (isNaN(start) || isNaN(direction))
    	return NaN;
    if (direction == start)
    	return start;
    if (start == Double.MAX_VALUE && direction == Double.POSITIVE_INFINITY)
    	return Double.POSITIVE_INFINITY;
    if (start == -Double.MAX_VALUE && direction == Double.NEGATIVE_INFINITY)
    	return Double.NEGATIVE_INFINITY;
    if (start == Double.POSITIVE_INFINITY && direction == Double.NEGATIVE_INFINITY)
    	return Double.MAX_VALUE;
    if (start == Double.NEGATIVE_INFINITY && direction == Double.POSITIVE_INFINITY)
    	return -Double.MAX_VALUE;
    if (start == 0) 
    	return (direction > 0 ? Double.MIN_VALUE : -Double.MIN_VALUE);

	geta64()[0] = start;
	var i0 = i64[0];
	var i1 = i64[1];
	var carry;
	if ((direction > start) == (start >= 0)) {
		i64[0]++;
		carry = (i64[0] == 0 ? 1 : 0);
	} else {
		i64[0]--;
		carry = (i64[0] == 4294967295 ? -1 : 0);
	} 
	if (carry)
		i64[1]+=carry;
	return a64[0];
});

Math.nextAfter$D$D = Math.nextAfter;

Math.nextAfter$F$D =function(start,direction){
    if (isNaN(start) || isNaN(direction))
    	return NaN;
    if (direction == start)
    	return start;
    if (start == Float.MAX_VALUE && direction == Float.POSITIVE_INFINITY)
    	return Float.POSITIVE_INFINITY;
    if (start == -Float.MAX_VALUE && direction == Float.NEGATIVE_INFINITY)
    	return Float.NEGATIVE_INFINITY;
    if (start == Float.POSITIVE_INFINITY && direction == Float.NEGATIVE_INFINITY)
    	return Float.MAX_VALUE;
    if (start == Float.NEGATIVE_INFINITY && direction == Float.POSITIVE_INFINITY)
    	return -Float.MAX_VALUE;
    if (start == 0 && direction < 0)
    	return -Float.MIN_VALUE;
    if (start == 0) 
    	return (direction > 0 ? Float.MIN_VALUE : -Float.MIN_VALUE);
    
    geta32()[0] = start;
	i32[0] += ((direction > start) == (start >= 0) ? 1 : -1); 
	return a32[0];
};


Math.nextUp||(Math.nextUp=function(d){ return Math.nextAfter(d, Double.POSITIVE_INFINITY); });

Math.nextUP$D=Math.nextUp;

Math.nextUp$F = function(f){ return Math.nextAfter$F$D(f, Double.NEGATIVE_INFINITY); };


Math.nextDown||(Math.nextDown=function(d){ return Math.nextAfter(d, Double.NEGATIVE_INFINITY); });

Math.nextDown$D=Math.nextDown;

Math.nextDown$F = function(f){ return Math.nextAfter$F$D(f, Double.NEGATIVE_INFINITY); };


Math.ulp||(Math.ulp=function(d){
        if (isNaN(d)) {
            return Double.NaN;
        } 
        if (isInfinite(d)) {
            return Double.POSITIVE_INFINITY;
        } 
        if (d == Double.MAX_VALUE || d == -Double.MAX_VALUE) {
            return Math.pow(2, 971);
        }
        return Math.nextUp(Math.abs(d));
});

Math.ulp$D = Math.ulp;

Math.ulp$F = function(f){
    if (isNaN(f)) {
        return Float.NaN;
    } 
    if (isInfinite(f)) {
        return Float.POSITIVE_INFINITY;
    } 
    if (f == Float.MAX_VALUE || f == -Float.MAX_VALUE) {
        return Math.pow(2, 104);
    }
    return Math.nextUp$F(Math.abs(f));
};

Math.getExponent = Math.getExponent$D = function(d) {
	geta64()[0] = d;
    return ((i64[1] & 0x7ff00000) >> 20) - 1023;
};

Math.getExponent$F=function(f){
    return ((Float.floatToRawIntBits$F(f) & 0x7f800000) >> 23) - 127;
}

Math.IEEEremainder||(Math.IEEEremainder=function (x, y) {
	if (Double.isNaN$D(x) || Double.isNaN$D(y) || Double.isInfinite$D(x) || y == 0) 
		return NaN;
	if (!Double.isInfinite$D(x) && Double.isInfinite$D(y))
		return x;
	var modxy = x % y;
	if (modxy == 0) return modxy;
	var rem = modxy - Math.abs(y) * Math.signum(x);
	if (Math.abs(rem) == Math.abs(modxy)) {
		var div = x / y;
		return (Math.abs(Math.round(div)) > Math.abs(div) ? rem : modxy);
	}
	return (Math.abs(rem) < Math.abs(modxy) ? rem : modxy);
});


Clazz._setDeclared("java.lang.Number", java.lang.Number=Number);
Number.prototype._numberToString=Number.prototype.toString;
  extendObject(Array, EXT_NO_HASHCODE);
  extendObject(Number, EXT_NO_HASHCODE);
Number.__CLASS_NAME__="Number";
addInterface(Number,java.io.Serializable);
// extendPrototype(Number, true, false);
Number.prototype.compareTo$ = Number.prototype.compareTo$Number = 
	Number.prototype.compareTo$O = Number.prototype.compareTo$Byte = Number.prototype.compareTo$Integer = 
	Number.prototype.compareTo$Short = Number.prototype.compareTo$Float = Number.prototype.compareTo$Double = 
						function(x) { var a = this.valueOf(), b = x.valueOf(); return (a < b ? -1 : a == b ? 0 : 1) };

var $b$ = new Int8Array(1);
var $s$ = new Int16Array(1);
var $i$ = new Int32Array(1);

// short forms, for the actual numbers in JavaScript
m$(Number,["byteValue"],function(){return ($b$[0] = this, $b$[0]);});
m$(Number,["shortValue"],function(){return ($s$[0] = this, $s$[0]);});
m$(Number,["intValue"],function(){return ($i$[0] = this, $i$[0]);});
m$(Number,["longValue"],function(){return Clazz.toLong(this);});

// Object values
m$(Number,["byteValue$"],function(){return this.valueOf().byteValue();});
m$(Number,["shortValue$"],function(){return this.valueOf().shortValue();});
m$(Number,["intValue$"],function(){return this.valueOf().intValue();});
m$(Number,["longValue$"],function(){return this.valueOf().longValue();});
m$(Number,["floatValue$", "doubleValue$"],function(){return this.valueOf();});
m$(Number,["longValue$"],function(){return this.valueOf().longValue();});
m$(Number,["$incr$"],function(n){return this.$box$(this.valueOf() + n);});
m$(Number,["$mul$"],function(v){return this.$box$(this.valueOf() * v);});
m$(Number,["$neg$"],function(v){return this.$box$(-this.valueOf());});
m$(Number,["$inv$"],function(v){return this.$box$(~this.valueOf());});
m$(Number,["$c"],function(v){return this.valueOf();});

Clazz.incrAN = function(A,i,n,isPost) {
	var v = A[i];
	A[i] = (v.TYPE ? v.$incr$(n) : Long.$inc(v,n));
	return (isPost ? v : A[i]);
}

Clazz._setDeclared("java.lang.Integer", java.lang.Integer=Integer=function(){
if (arguments[0] === null || typeof arguments[0] != "object")this.c$(arguments[0]);
});

var primTypes = {};

var FALSE = function() { return false };
var EMPTY_CLASSES = function() {return Clazz.array(Class, [0])};
var NULL_FUNC = function() {return null};

var setJ2STypeclass = function(cl, type, paramCode) {
// TODO -- should be a proper Java.lang.Class
  primTypes[paramCode] = cl;
  cl.TYPE = {
    isPrimitive$: function() { return true },
    type:type, 
    __PARAMCODE:paramCode, 
    __PRIMITIVE:1  // referenced in java.lang.Class
  };
  cl.TYPE.hashCode$ = function() {return type.hashCode$()};
  cl.TYPE.isArray$ = cl.TYPE.isEnum$ = cl.TYPE.isAnnotation$ = FALSE;
  cl.TYPE.toString = cl.TYPE.getName$ = cl.TYPE.getTypeName$ 
    = cl.TYPE.getCanonicalName$ = cl.TYPE.getSimpleName$ = function() {return type};
  cl.TYPE.isAssignableFrom$Class = (function(t) {return function(c) {return c == t}})(cl.TYPE);
  cl.TYPE.getSuperclass$ = cl.TYPE.getComponentType$ = NULL_FUNC;
  cl.TYPE.getInterfaces$ = EMPTY_CLASSES;
}

var decorateAsNumber = function (clazz, qClazzName, type, PARAMCODE, hcOffset) {
  clazz.prototype.valueOf=function(){return 0;};
  clazz.prototype.__VAL0__ = 1;
  if (hcOffset)
	clazz.prototype.hashCode$ = function() {return this.valueOf() + hcOffset};
  finalizeClazz(clazz, qClazzName, null, 0, true);
  extendPrototype(clazz, true, true);
  setSuperclass(clazz, Number);
  addInterface(clazz, Comparable);
  setJ2STypeclass(clazz, type, PARAMCODE);
  return clazz;
};

Clazz.toLong = function(v) {
	if (typeof v == "string") {
		v = parseInt(v);
		if (isNaN(v))
			return 0;
	}
	return (v.length ? v : v >= minLong && v <= maxLong ? v - v%1 :  v == Infinity ? LONG_MAX_VALUE : v == -Infinity ? LONG_MIN_VALUE : isNaN(v) ? 0 : toLongRMS(v - v%1));
}

var parseIntLimit = function(s,radix, min, max) {
	var v = (s == null || s.indexOf(".") >= 0 || s.startsWith("0x") ? NaN : radix === false ? parseInt(s) : parseInt(s, radix));
	if (!isNaN(v)) {
		// check for trailing garbage
		var v1 = parseInt(s + "1", radix);
		if (v1 == v)
			v = NaN;
	}
	if (isNaN(v) || v < min || v > max){
		throw Clazz.new_(NumberFormatException.c$$S, ["parsing " + s + " radix " + radix]);
	}
	return v;
}

decorateAsNumber(Integer, "Integer", "int", "I", iHCOffset);

Integer.toString=Integer.toString$I=Integer.toString$I$I=Integer.prototype.toString=function(i,radix){
	switch(arguments.length) {
	case 2:
		return i.toString(radix);
	case 1:
		return "" +i;
	case 0:
		return (this===Integer ? "class java.lang.Integer" : ""+this.valueOf());
	}
};

var minInt = Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
var maxInt = Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;
Integer.SIZE=Integer.prototype.SIZE=32;



var ints = [];
var longs = [];
var shorts = [];
var chars = {};

var minValueOf = -128;
var maxValueOf = 127;

var getCachedNumber = function(i, a, cl, c$) {
  if (a == chars) {	
	return a[i] ? a[i] : (a[i] = Clazz.new_(cl[c$], [i]));
  }
  if (i >= minValueOf && i <= maxValueOf) {
	var v = a[i - minValueOf];
	return (v ? v : a[i - minValueOf] = Clazz.new_(cl[c$], [i])); 
  }
}

m$(Integer,"c$", function(v){ // SwingJS only -- for new Integer(3)
	v || v == null || (v = 0);
	if (typeof v != "number")
		v = Integer.parseInt$S$I(v, 10);
	v = v.intValue();  
	this.valueOf=function(){return v;};
	}, 1);

m$(Integer, "c$$S", function(v){
	v = Integer.parseInt$S$I(v, 10);
	this.valueOf=function(){return v;};
	}, 1);

m$(Integer, "c$$I", function(v){
 this.valueOf=function(){return v;};
}, 1);

m$(Integer,"valueOf$S",
function(s){
	return Integer.valueOf$S$I(s, 10);
}, 1);

m$(Integer,"valueOf$S$I",
function(s, radix){
  return Integer.valueOf$I(Integer.parseInt$S$I(s, radix));
}, 1);

m$(Integer,"valueOf$I",
function(i){
  v |= 0;
  var v = getCachedNumber(i, ints, Integer, "c$$I");
  return (v ? v : Clazz.new_(Integer.c$$I, [i]));
}, 1);

m$(Integer,"parseInt$S",
function(s){
	return parseIntLimit(s, false, minInt, maxInt);
}, 1);

m$(Integer,"parseInt$S$I",
function(s,radix){
	return parseIntLimit(s, radix, minInt, maxInt);
}, 1);

m$(Integer,"getInteger$S$I",
function(ms,i){
  return Integer.valueOf$I(i);
}, 1);

m$(Integer,"highestOneBit$I",
	function(i) { 
	i |= (i >>  1);
	i |= (i >>  2);
	i |= (i >>  4);
	i |= (i >>  8);
	i |= (i >> 16);
	return i - (i >>> 1);
	}, 1);

m$(Integer,"lowestOneBit$I",
		function(i) { return i & -i;}, 1);

m$(Integer,"rotateLeft$I$I",
		function(i, distance) { return (i << distance) | (i >>> -distance); }, 1);

m$(Integer,"rotateRight$I$I",
		function(i, distance) { return (i >>> distance) | (i << -distance); }, 1);

m$(Integer,"reverse$I",
	function(i) { 
	i = (i & 0x55555555) << 1 | (i >>> 1) & 0x55555555;
	i = (i & 0x33333333) << 2 | (i >>> 2) & 0x33333333;
	i = (i & 0x0f0f0f0f) << 4 | (i >>> 4) & 0x0f0f0f0f;
	i = (i << 24) | ((i & 0xff00) << 8) |
	((i >>> 8) & 0xff00) | (i >>> 24);
    return i;}, 1);

m$(Integer,"reverseBytes$I",
	function(i) { 
		return ((i >>> 24)           ) |
	((i >>   8) &   0xFF00) |
	((i <<   8) & 0xFF0000) |
	((i << 24));
	}, 1);

m$(Integer,"signum$I", function(i){ return i < 0 ? -1 : i > 0 ? 1 : 0; }, 1);

m$(Integer,"bitCount$I",
	function(i) {
	i = i - ((i >>> 1) & 0x55555555);
	i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
	i = (i + (i >>> 4)) & 0x0f0f0f0f;
	i = i + (i >>> 8);
	i = i + (i >>> 16);
	return i & 0x3f;
	}, 1);

m$(Integer,"numberOfLeadingZeros$I",
	function(i) {
	if (i == 0) return 32;
	var n = 1;
	if (i >>> 16 == 0) { n += 16; i <<= 16; }
	if (i >>> 24 == 0) { n +=  8; i <<=  8; }
	if (i >>> 28 == 0) { n +=  4; i <<=  4; }
	if (i >>> 30 == 0) { n +=  2; i <<=  2; }
	n -= i >>> 31;
	return n;
	}, 1);

m$(Integer,"numberOfTrailingZeros$I",
	function(i) {
	if (i == 0) return 32;
	var n = 31;
	var y = i <<16; if (y != 0) { n = n - 16; i = y; }
	y = i << 8; if (y != 0) { n = n - 8; i = y; }
	y = i << 4; if (y != 0) { n = n - 4; i = y; }
	y = i << 2; if (y != 0) { n = n - 2; i = y; }
	return n - ((i << 1) >>> 31);
	}, 1);

m$(Integer,"equals$O",
function(s){
return (s instanceof Integer) && s.valueOf()==this.valueOf();
});

m$(Integer, "$box$", function(v) {
	return Integer.valueOf$I(v);
});

Integer.toHexString$I=function(d){
if (d < 0) {
var b = d & 0xFFFFFF;
var c = ((d>>24)&0xFF);
return c._numberToString(16) + (b = "000000" + b._numberToString(16)).substring(b.length - 6);
}
return d._numberToString(16);
};
Integer.toOctalString$I=function(d){return d._numberToString(8);};
Integer.toBinaryString$I=function(d){return d._numberToString(2);};

Integer.toUnsignedLong$I=function(x){return (x > 0 ? x : x + 0x100000000);};
Integer.toUnsignedString$I=function(x){return "" + Integer.toUnsignedLong$I(x);};
Integer.toUnsignedString$I$I=function(x,r){return Long.toString$J(Integer.toUnsignedLong$I(x),r);};

m$(Integer,"decodeRaw$S", function(n){
if (n.indexOf(".") >= 0)n = "";
var i = (n.startsWith("-") ? 1 : 0);
n = n.replace(/\#/, "0x").toLowerCase();
var radix=(n.startsWith("0x", i) ? 16 : n.startsWith("0", i) ? 8 : 10);
// The general problem with parseInt is that is not strict --
// ParseInt("10whatever") == 10.
// Number is strict, but Number("055") does not work, though ParseInt("055", 8)
// does.
// need to make sure negative numbers are negative
if (n == "" || radix == 10 && isNaN(+n))
	return NaN
n = (+n) & 0xFFFFFFFF;
return (radix == 8 ? parseInt(n, 8) : n);
}, 1);

m$(Integer,"decode$S", function(n){
  if (isNaN(n = Integer.decodeRaw$S(n)) || n < Integer.MIN_VALUE|| n > Integer.MAX_VALUE)
    throw Clazz.new_(NumberFormatException.c$$S,["Invalid Integer"]);
  return Clazz.new_(Integer.c$$I, [n]);
}, 1);



// Note that Long is problematic in JavaScript

Clazz._setDeclared("java.lang.Long", java.lang.Long=Long=function(){
	this.c$(arguments[0]);
});

decorateAsNumber(Long, "Long", "long", "J", lHCOffset);

Long.toString=Long.toString$J=Long.toString$J$I = Long.prototype.toString=function(i, radix){
	switch(arguments.length) {
	case 2:
		return (i.length ? Long.$s(i,radix) : i.toString(radix));
	case 0:
		if (this===Long)
			return "class java.lang.Long";
		i = this.valueOf();
		break;
	}
	return (i.length ? Long.$s(i) : "" + i);
};

	
// 64-bit long methods
// RMS [R 16 bits, M 47+1 bits, S (1/0/-1)] (for storage)
// RLH [R 16 bits, ML 24 bits, MH 24+1 bits] (for bit, * / % ops)

var JSSAFE = 9007199254740991; // can +/-1
var RBITS = 24; 
var LBITS = RBITS;
var HBITS = (64 - LBITS - RBITS); // 16
var MAXR = 1 << RBITS;
var RMASK = MAXR - 1;
var MAXL = 1 << LBITS;
var LMASK = MAXL - 1;
var MAXH = 1 << HBITS;
var HMASK = MAXH - 1;
var HSIGNB = MAXH >> 1; // 0x8000;
var MAXM = MAXL*MAXH;
var T15 = 10**15; 
var T8 = 10**8; 
var T15RD = T15/MAXR; // 5.9604644775390625
var T15RN = T15RD|0;
var T15RF = T15RD - T15RN;
var MSIGNB = 0x8000000000; // Java long min >>>24;549755813888
var MMINMAX = 0x10000000000; // Java overflow >>>24;
var LONG_MAX_VALUE = [16777215,549755813887,1];
var LONG_MIN_VALUE = [0,549755813888,-1];

var parseLong = function(s, radix, v) {
	if (v >= -JSSAFE && v <= JSSAFE)
		return v;
	var isNeg = (s.charAt(0) == '-');
	if (isNeg || s.charAt(0) == '+')
		s = s.substring(1);
	var n = s.length;
	var m = 0,r = 0;
	switch (radix) {
	case 10:
		return toLongRMS((isNeg ? "-" : "") + s,1);
	case 2:
		if (n > 64)
			return null;
		m = parseInt(s.substring(0, n - RBITS), 2); 
		r = parseInt(s.substring(n - RBITS), 2);
		break;
	case 8:
		if (n > 33)
			return null;
		// mmmmmmmmmmmmmmmmm rrrrrrrr
		m = parseInt(s.substring(0, n - RBITS/3), 8); 
		r = parseInt(s.substring(n - RBITS/3), 8); 
		break;
	case 16: 
		if (n > 16)
			return null;
		// mmmmmmmmmmmm rrrrrr
		m = parseInt(s.substring(0, n - RBITS/4), 16); 
		r = parseInt(s.substring(n - RBITS/4), 16);
		break;
	case 16: 
		if (n > 8)
			return null;
		// mmmmmmmmmmmm rrrrrr
		m = parseInt(s.substring(0, n - RBITS/8), 32); 
		r = parseInt(s.substring(n - RBITS/8), 32);
		break;
	default:
		return null;
	}
	if (m >= 0) {
		if (m >= MSIGNB) {
			if (m > MSIGNB || r != 0) {
				return null;
			}
			isNeg = true;
		}
		return [r, m, isNeg ? -1 : r == 0 && m == 0 ? 0 : 1];			
	}
	return v;
}

var toLongI2 = function(i0, i1) {
	var r = i0&0xFFFFFF; // 24
	var l = (i0>>>24) + ((i1&0xFFFF)<<8); // 24
	var h = i1>>>16; // 16
	return fromLongRLH([r,l,h]);
}

var toLongRMS = function(s0, noOver) {
	if (typeof s0 == "number") {
		if (s0 + 1 > s0 && s0 -1 < s0)
			return checkLong([Math.abs(s0), 0, s0 < 0 ? -1 : s0 > 0 ? 1 : 0]);
		
		s0 -= s0%1;
		s0 = "" + s0;
	} else if (Array.isArray(s0)) {
		return s0;
	}
	var isNeg = (s0.indexOf("-") == 0);
	var s = (isNeg ? s0.substring(1) : s0);

	// 1) Split the string into two reasonably-sized numbers
	// give l (low) the last 8 digits; h (high) can have the first 11.
	// max l will be 27 bits; max h will be 37 bits.
	// later we will add in up to 11 more bits into h.

	var pt = s.length - 15;
	var h = Number(pt <= 0 ? 0 : s.substring(0, pt));
	var l = Number(pt <= 0 ? s : s.substring(pt));


	// The task is to partition the number based on binary digits, not decimal.
	// Starting with [l,h] we want [r,m].

	// L = h * T15 + l == m*MAXR + r

	// 2) Split the low-digit part into an m part and an r part
	// using integerization |0 and modulus %.
	// l = lm*MAXR + lr

	var lm = l/MAXR|0;
	var r = l&RMASK;

	// That was the easy part.

	// For the high digits, consider that we must satisfy:
	// h*T15 = hm*MAXR + hr
	// or
	// h*(T15/MAXR) = hm + hr/MAXR
	// notice that T15/MAXR is a decimal with an
	// integer part (ti) and a fractional part (tf):
	// h*(ti + tf)
	// so h*ti = hm and h*tf*MAXR = hr
	// except hr will overflow, so we need to add its high part to hm

	// to avoid integer overflow, we divide both sides by MAXR.
	// bringing in the fractional part of the high number along
	// with the low part of the remainder digits.

	var r0 = h * T15RF; // 0.9604644775390625

	// This is our remainder, except it has almost certainly overflowed.
	// So we need to move its high part from r to m. We cannot
	// use |0 here because this one could be over 31 bits now after
	// adding in h * tf.

	var rh = Math.floor(r0)
	r += Math.floor((r0 - rh)*MAXR);

	lm += r/MAXR|0;
	r &= RMASK;

	// combining the integer high part h * ti with the overflow of the
	// lower numbers (rh and lm):

	var m = h * T15RN + rh + lm;

	// That's i;, we have m, r and s.
	
	if (!r&&!m &&(h||l) || (isNeg ? m >= MSIGNB && r > 0 : m >= MSIGNB)) {
		return (noOver ? null : isNeg ? LONG_MIN_VALUE : LONG_MAX_VALUE);
	} 
	return [r, m, !r&&!m ? 0 : isNeg ? -1 : 1];			
}

var checkLong = function(rms, limit) {
	// returns rms without cloning
	var r = rms[0];
	if (limit > 0 && (r >= -limit && r < limit))
		return rms;
	var m = rms[1];
	if (!rms[2]) {
		if (!r && !m)
			return rms;
		rms[2] = 1;
	}
	if (r < 0) {
		if (m == 0) {
			rms[0] = -r;
			rms[2] = -rms[2];
		} else {
			var rl = r%MAXR;
			var rh = (r - rl) / MAXR;
			var n = m + rh;
			if (n < 1) {
				rms[0] = -rl;
				rms[1] = -n;
				rms[2] = -rms[2];
			} else {
				rms[0] = MAXR + rl
				rms[1] = n - 1;
			}
		}					
	} else if (r >= MAXR) {
		var rl = r%MAXR;
		var rh = (r - rl) / MAXR;
		rms[0] = rl
		rms[1] += rh;
	}
	if (rms[1] >= MSIGNB) {
		if (limit >= 0) {
			return (rms[2] > 0 ? LONG_MAX_VALUE : LONG_MIN_VALUE);
		} 
		while (rms[1] > 0) {
			rms[1] -= MMINMAX;
		}
		if (rms[0] > 0) {
			rms[1]++;
			rms[0] = MAXR - rms[0];
		} 
		rms[1] = -rms[1]; 
		rms[2] = (rms[1] == MSIGNB ? -1 : -rms[2]);	
	} else if (rms[1] <= -MSIGNB) {
		return LONG_MIN_VALUE;
	}
	return rms;
}

Long.$sign = function(a) {
	return (a.length ? a[2] : Math.signum(a));
}

Long.$n = function(a) {
	return BigInt(Long.$s(a));
}

Long.$s = function(a, radix, unsigned) { 
	// todo radix
	radix || (radix = 10);
	if (!a.length) {
		if (radix == 10 && !unsigned)
			return "" + a;
		a = toLongRMS(a);
	}
	if (a[1] == 0 && !unsigned) {
		return (a[2]*a[0]).toString(radix);
	}
	var isNeg = (a[2] == -1);
	checkLong(a);
	var m = a[1];
	var r = a[0];
	var s = "";
	if (unsigned && isNeg && m < MSIGNB) {
		a = toLongRLH(a);
		r = a[0];
		m =a[1]+a[2]*MAXL;
	}
	var zeros = null;
	switch (radix) {
	case 2:  // 24
		zeros = "000000000000000000000000";
		break;
	case 4:  // 12
		zeros = "000000000000";
		break;
	case 8:
		zeros = "00000000"
		break;
	case 16:
		zeros = "000000"
		break;
	case 32:
		isNeg = false;
		m && (s = (m/0x3F).toString(32));
		var s1 = (r + ((m&0x40)<<24)).toString(32);
		s += (s.length == 0 ? s1 : longFill(s1, "00000"));
		break;
	case 10:
		var ml = m % T8;
		var mh = (m - ml)/T8;
		var ll = r + ml * MAXR;
		var l = ll % T8;
		var lh = (ll - l)/T8;
		var h = mh * MAXR + lh;
		var fl = (h == 0 ? "" : "00000000") + ll;
		s = (h != 0 ? h + fl.substring(fl.length - 8) : ll);
		break;
	}
	if (zeros) {
		isNeg = false;
		m && (s = m.toString(radix));
		var s1 = r.toString(radix);
		s += (s.length == 0 ? s1 : longFill(s1, zeros));
	}
	return (!unsigned && isNeg ? "-" : "") + s;
}

var longFill = function(s, zeros) {
	var i,n
	if ((i = s.length) == (n = zeros.length))
		return s;
	s = zeros + s;
	return s.substring(i - n, i);
}

Long.$dup=function(a,b){ 
	if (!a.length) {
		return a;
	}
	if (a[1] == 0) {
		return a[2] * a[0];
	}
	return [a[0],a[1],a[2]]; 
}

Long.$inc = function(x,n) {
	// n +/-1 only;
	var ret;
	if (!x.length) {
		ret = x + n;
		if (ret != x) {
			return ret;
		}
		x = toLongRMS(x);
	}
    return checkLong([x[2] == -1 ? x[0] - n : x[0] + n, x[1], x[2]], -1);
}

Long.$neg=function(a){ return (a.length ? checkLong([a[0],a[1],-a[2]]) : -a); }


Long.$ival=function(a){ return Long.$lval(a)|0; }

Long.$lval=function(a){ return (a.length ? a[2] * (a[0] + (a[1]%MAXR)*MAXR) : a); }

Long.$fval=function(a){ 
	geta32()[0] = (a.length ? a[2] * (a[0] + a[1]*MAXR) : a); 
	return a32[0];
}

Long.$dval=function(a){ 	
	geta64()[0] = (a.length ? a[2] * (a[0] + a[1]*MAXR) : a); 
	return a64[0];
}

var longTest = function(a,b) {
	var isna = (!a.length);
	var isnb = (!b.length);
	return (isna && isnb ? 0 : isna ? -1 : isnb ? 1 : 2);
}

var ab = [0,0];

var fixLongAB = function(a,b) {
	switch (longTest(a,b)) {
	case 0:
		return true;
	case 2:
		checkLong(a); 
		checkLong(b);
		break;
	case 1:
		checkLong(a); 
		b = toLongRMS(b);
		break;
	case -1:
		a = toLongRMS(a);
		checkLong(b);
		break;
	}
	ab[0] = a;
	ab[1] = b;
}


Long.$cmp=function(a,b, unsigned){
	if (fixLongAB(a,b)) {
		return (a < b ? -1 : a > b ? 1 : 0);
	}
	a = ab[0];b = ab[1];
	if (unsigned) {
		a = toLongRLH(a);
		b = toLongRLH(b);
		for (let i = 2; i >= 0; i--) {
			if (a[i] < b[i]) return -1;
			if (a[i] > b[i]) return 1;
		}
		return 0;
	}
	return (
		a[2] < b[2] ? -1
		: a[2] > b[2] ? 1
		: a[2] == 0 ? 0
		: a[1] < b[1] ? -a[2]
		: a[1] > b[1] ? a[2]
		: a[0] < b[0] ? -a[2]
		: a[0] > b[0] ? a[2]
		: 0
	);
}

Long.$eq=function(a,b){
	return Long.$cmp(a, b) == 0;
}

Long.$ne=function(a,b){
	return Long.$cmp(a, b) != 0;
}

Long.$ge=function(a,b){
	return Long.$cmp(a, b) >= 0;
}

Long.$gt=function(a,b){
	return Long.$cmp(a, b) > 0;
}

Long.$le=function(a,b){
	return Long.$cmp(a, b) <= 0;
}

Long.$lt=function(a,b){
	return Long.$cmp(a, b) < 0;
}


Long.$not=function(a){
	return (a.length ? checkLong([a[0]+a[2],a[1],-a[2]]) : -a - 1);
}

var m2 = [0,1,3,7
	,0xF,0x1F,0x3F,0x7F
	,0xFF,0x1FF,0x3FF,0x7FF
	,0xFFF,0x1FFF,0x3FFF,0x7FFF
	,0xFFFF,0x1FFFF,0x3FFFF,0x7FFFF
	,0xFFFFF,0x1FFFFF,0x3FFFFF,0x7FFFFF
	,0xFFFFFF
	];

Long.$sr=function(a,n){
	if (arguments.length > 2)
		return doLong(Long.$sr,arguments);
	return shiftLong(a, n, 0);
}

Long.$usr=function(a,n){
	if (arguments.length > 2)
		return doLong(Long.$usr,arguments);
	return shiftLong(a, n, 1);
}

var shiftLong = function(a, n, unsigned) {
	if (fixLongAB(a,n)) {
		if (a >= 0 && a == (a|0)) 
			return (n > 31 ? 0 : a>>n);
		if (n >= 64) 
			return (a > 0 || unsigned ? 0 : -1);
		if (n == 0)
			return a;
		a = toLongRMS(a);
	} else {
		a = ab[0];
		n = (ab[1][1] > 0 ? 64 : ab[1][0]);
	}
	if (n >= 64 || a[2] == 0) {
		return (a[2] >= 0 || unsigned ? 0 : -1);
	} else if (n == 0) {
		return Long.$dup(a);
	}
	var isNeg = (a[2] < 0);
	var a = toLongRLH(a);
	var c2,c1;
	if (isNeg && !unsigned)
		a[2] = -1&~HMASK|a[2];
	if (n >= 48) {
		a[0] = a[1] = 0;
		a[2] && (a[0] = a[2]>>(n-48),a[2] = 0);
		isNeg && !unsigned && a[0] && (a[1]=-1,a[2] = -1);
		return fromLongRLH(a);	
	} 
	if (n >= 24) {
		a[0] = a[1];
		a[1] = a[2];
		a[2] = 0;
		n -= 24;
	}
	
	a[2] && (c2=(a[2]&m2[n])<<(24-n),a[2]>>=n);
	a[1] && (c1=(a[1]&m2[n])<<(24-n),a[1]>>=n);
	c2 && (a[1] += c2);
	a[0] && (a[0]>>=n);
	c1 && (a[0] += c1);
	return fromLongRLH(a);	
}

Long.$sl = function(a, n){
	if (arguments.length > 2)
		return doLong(Long.$sl,arguments);
	if (fixLongAB(a,n)) {
		var c;
		if (a == 0 || n == 0)
			return a;
		if (n < 32 && (a < 0 ? (c = a<<n) < a : (c = a<<n) > a))
			return c;
		if (n >= 64) 
			return 0;
		a = toLongRMS(a);
	} else {
		a = ab[0];
		n = (ab[1][1] > 0 ? 64 : ab[1][0]);
	}
	if (n >= 64 || a[2] == 0) {
		return 0;
	} 
	if (n == 0) {
		return Long.$dup(a);
	}
	var a = toLongRLH(a);
	var c2,c1;
	if (n < 24) {
		a[2] && (a[2]<<=n);
		a[1] && (a[2]|=a[1]>>(24-n),a[1]<<=n);
		a[0] && (a[1]|=a[0]>>(24-n),a[0]<<=n,a[0]&=RMASK);		
	} else if (n < 48) {
		a[2] = (a[0]?a[0]>>(48-n):0);
		a[1] && (a[2]|=a[1]<<(n-24));
		a[0] && (a[1]=a[0]<<(n-24),a[0]=0);
	} else {
		a[1] = 0;
		a[2] = (a[0]?a[0]<<(n-48):0);
		a[0] = 0;
	} 
	a[1] && (a[1]&=LMASK);
	a[2] && (a[2]&=HMASK);
	return fromLongRLH(a);	
}

var addAB = function(a,b, s) {
	if (fixLongAB(a,b)) {
		var r = a + s * b;
		if (r + 1 > r && r - 1 < r)
			return r;
		ab[0] = toLongRMS(a);
		ab[1] = toLongRMS(b);		
	}
	a = ab[0];b = ab[1];
	var r,m;
	if (a[2] < 0)
		s = -s;
	r = a[0] + s * b[0] * b[2];
	m = a[1] + s * b[1] * b[2];
	if (m == 0)
		return (r == 0 ? 0 : r * (a[2] || 1));
	return checkLong([r,m,a[2]], -1);
}

Long.$add = function(a,b) {
	if (arguments.length > 2)
		return doLong(Long.$add,arguments);
	return addAB(a,b, 1);
}

Long.$sub = function(a,b) {
	if (arguments.length > 2)
		return doLong(Long.$sub,arguments);
	return addAB(a,b, -1);
}

Long.$and=function(a,b){
	if (arguments.length > 2)
		return doLong(Long.$and,arguments);
	if (fixLongAB(a,b)) {
		if (a == 0 || b == 0)
			return 0;
		if ((a|0) == a && (b|0) == b)
			return a&b;
		ab[0] = toLongRMS(a);
		ab[1] = toLongRMS(b);		
	}
	a = toLongRLH(ab[0]);b = toLongRLH(ab[1]);
	a[0] = a[0]&b[0];
	a[1] = a[1]&b[1];
	a[2] = a[2]&b[2];
	return fromLongRLH(a);	
}

Long.$or=function(a,b){ 
	if (arguments.length > 2)
		return doLong(Long.$or,arguments);
	if (fixLongAB(a,b)) {
		if (a == 0 && b == 0)
			return 0;
		if ((a|0) == a && (b|0) == b)
			return a|b;
		ab[0] = toLongRMS(a);
		ab[1] = toLongRMS(b);		
	}
	a = toLongRLH(ab[0]);b = toLongRLH(ab[1]);
	a[0] = a[0]|b[0];
	a[1] = a[1]|b[1];
	a[2] = a[2]|b[2];
	return fromLongRLH(a);	
}

Long.$xor=function(a,b){
	if (arguments.length > 2)
		return doLong(Long.$xor,arguments);
	if (fixLongAB(a,b)) {
		if (a == 0 && b == 0)
			return 0;
		if ((a|0) == a && (b|0) == b)
			return a^b;
		ab[0] = toLongRMS(a);
		ab[1] = toLongRMS(b);		
	}
	a = toLongRLH(ab[0]);b = toLongRLH(ab[1]);
	a[0] = a[0]^b[0];
	a[1] = a[1]^b[1];
	a[2] = a[2]^b[2];
	return fromLongRLH(a);	
}

Long.$mul = function(a,b){ 
	if (arguments.length > 2)
		return doLong(Long.$mul,arguments);
	if (fixLongAB(a,b)) {
		var r = a*b; 
		if (r + 1 > r && r - 1 < r)
			return r;
		ab[0] = toLongRMS(a);
		ab[1] = toLongRMS(b);		
	}
	var a = ab[0];
	var b = ab[1];
	if (a[2] == 0 || b[2] == 0)
		return 0;
	var isNeg = (a[2]*b[2] < 0);
	if (a[2] < 0)
		a = [a[0], a[1], 1];
	if (b[2] < 0)
		b = [b[0], b[1], 1];
	a = toLongRLH(a);
	b = toLongRLH(b);
	var r = a[0]*b[0];
	var c = (r-r%MAXR)/MAXR;
	var l = a[0]*b[1]+a[1]*b[0]+c;
	c = (l-l%MAXL)/MAXL;
	var h = a[0]*b[2]+a[2]*b[0]+a[1]*b[1]+c;
	a = fromLongRLH([r,l,h]);
	return (isNeg ? Long.$neg(a) : a);
}

Long.$div=function(a,b){
	if (arguments.length > 2)
		return doLong(Long.$div,arguments);
	if (fixLongAB(a,b)) {
		if (b == 0)
	    	arex("/ by zero");
		return (a/b) - (a/b)%1;
	}
	var a = ab[0];
	var b = ab[1];
	if (b[2] == 0)
    	arex("/ by zero");
	if (a[2] == 0 || b[1] > a[1] || b[1] == a[1] && b[0] > a[0])
		return 0;
	var isNeg = (a[2]*b[2] < 0);
	if (a[2] < 0)
		a = [a[0], a[1], 1];
	if (b[2] < 0)
		b = [b[0], b[1], 1];
	if (b[1] == a[1]) {
		// the result will only depend upon r, not m
		return  (isNeg ? -1 : 1)*(a[0]/b[0])|0;
	}
	var d = NaN;
	if (b[1] == 0) {
		d = b[0];
	} else {
		d = b[0] + b[1] * MAXR;
		if (d + 1 == d || d - 1 == d) {
			d = NaN;
		}
	}
	if (isNaN(d)) {
		// only from very large numbers divided by very large numbers.
		// never in BigInteger, as that is all long/int
		var bi = self.BigInt; 
		var f = (bi || Long.toUnsignedBigInteger$J);
		var m = f(MAXR);
		var aBr = f(a[0]);
		var aBm = f(a[1]);
		var bBr = f(b[0]);
		var bBm = f(b[1]);
		if (bi) {
			ret = Number((aBr + m * aBm)/(bBr + m * bBm));
		} else {
			// SwingJS aliases in BigInteger
			ret = aBr.add(m.mul(aBm)).div(bBr.add(m.mul(bBm)));
		}
		return Clazz.toLong((isNeg ? -1 : 1) * ret);
	}
	var m = a[1]/d;
	var mf = m%1;
	var r = a[0]/d + mf*MAXR;
	var rf = r%1;
	m -= mf;
	r -= rf;
	// rounding could be no more than +/-1 off
	switch (Long.$cmp(a,Long.$mul([r, m, 1],d))) {
	case 0:
		break;
	case -1:// a < b*d -- too high
		r -= 1;
		break;
	case 1:
		if (Long.$cmp(a,Long.$mul([r+1, m, 1],d)) >= 0) {
			r += 1;
		}
		break;
	}
	return checkLong([r, m, isNeg ? -1 : 1]);
}

Long.$mod=function(a,n){
	if (arguments.length > 2)
		return doLong(Long.$mod,arguments);
	if (fixLongAB(a,n)) {
		return a%n;
	}
	// a mod n = a - (a/n)*n
	return Long.sub(a,Long.mul(Long.div(a,n),n));
}

var doLong = function(f,args) {
	var a = args[0];
	for (var i = 1; i < args.length; i++) {
		a = f(a, args[i]);
	}
	return a;
}

var toLongRLH = function(rms) {
	// to [16][24][24]
	// h l r
	var r = rms[0];
	var m = rms[1];
	if (m == 0 && r == 0) {
		return [0,0,0];
	}
	var isNeg = (rms[2] == -1);
	var ml = m&LMASK;
	m = (m - ml)/MAXL;
	if (isNeg) {
		r = (~r&RMASK) + 1;
		ml = (~ml&LMASK) + (r == MAXR ? 1 : 0);   
		m = (~m&HMASK) + (ml == MAXL ? 1 : 0); 
		r &= RMASK;
		ml &= LMASK;
		m &= HMASK;
	}
	return [r,ml,m];
}

var fromLongRLH = function(rlh) {
	var isNeg = (rlh[1] < 0);
	(isNeg ? (rlh[2] = -1) : (isNeg = rlh[2] < 0 || rlh[2] >= HSIGNB)); 
	r = rlh[0]&RMASK; 
	m = ((rlh[2]&HMASK)*MAXL)+(rlh[1]&LMASK);
	if (m == 0 && r == 0) {
		return 0;
	}
	if (isNeg) {   
		r = (~r&RMASK) + 1;
		m = MAXM - m - (r == MAXR ? 0 : 1);   
		r &= RMASK;
	}
	return checkLong([r,m, !r&&!m ? 0 : isNeg ? -1 : 1]);
}

// Long.TYPE=Long.prototype.TYPE=Long;
// Note that the largest usable "Long" in JavaScript is 53 digits:

Long.MIN_VALUE=Long.prototype.MIN_VALUE=LONG_MIN_VALUE;
Long.MAX_VALUE=Long.prototype.MAX_VALUE=LONG_MAX_VALUE;

var maxLong =  0x1000000000000000000000; // ignored
var minLong = -maxLong;
Long.SIZE=Long.prototype.SIZE=64;// REALLY 53


m$(Long,["intValue","intValue$"],function(){return Long.$ival(this.valueOf());});

m$(Long,["longValue","longValue$"],function(){return this.valueOf();});

m$(Long,"c$",
function(v) {
	if (typeof v != "number" && typeof v != "object")
		v = Long.parseLong$S$I(v, 10);
 this.valueOf=function(){return v;};
}, 1);

m$(Long, "c$$J", function(v){
	this.valueOf=function(){return v;};
}, 1);

m$(Long,"c$$S",
function(v){
 var v = Long.parseLong$S$I(v, 10);
 this.valueOf=function(){return v;}; 
}, 1);

Long.compare$J$J = function(a,b) { return Long.$cmp(a,b); }

m$(Long,"compareTo$Long", function(l){return Long.$cmp(this.valueOf(), l.valueOf());});

m$(Long,"valueOf$S",
function(s){
	return Long.valueOf$S$I(s, 10);
}, 1);

m$(Long,"valueOf$S$I",
function(s, radix){
  return Long.valueOf$J(Long.parseLong$S$I(s, radix));
}, 1);

m$(Long,"valueOf$J",
function(i){
  i = Clazz.toLong(i);
  var v = (!i.length || (v = Long.$ival(i)) == Long.$lval(i) && (i = v) == i ? getCachedNumber(i, longs, Long, "c$$J") : 0);
  return (v ? v : Clazz.new_(Long.c$$J, [i]));
}, 1);

m$(Long,"hashCode$",function(){return Long.$ival(this.valueOf());});
m$(Long,"doubleValue$",function(){return Long.$dval(this.valueOf());});
m$(Long,"floatValue$",function(){return Long.$fval(this.valueOf());});


m$(Long,"parseLong$S",
function(s){
	return Long.parseLong$S$I(s,10);
}, 1);

m$(Long,"parseLong$S$I",
function(s,radix){
	var v,v0;
	if (s.indexOf("x") == 1 || isNaN(v0 = parseInt(s, radix)) || (v = parseLong(s, radix, v)) == null)
		throw Clazz.new_(NumberFormatException.c$$S, ["parsing " + s + " radix " + radix]);
	return v;
}, 1);

m$(Long,"decode$S",
function(n){
    if (n.length() == 0)
        throw new NumberFormatException("Zero length string");
	
	if (n.indexOf(".") >= 0)n = "";
	var isNeg = (n.startsWith(i));
	var i = (isNeg ? 1 : 0);
	n = n.replace(/\#/, "0x").toLowerCase();
	var radix = 10;
	if (n.startsWith("0x", i)) {
		radix = 16;
		i += 2;
	} else if (n.startsWith("0", i)) {
		i += 1;
		radix = 8;
	}
	var result;
    try {
        result = Long.valueOf$S$I(n.substring$I(i), radix);
        result = (isNeg ? Long.valueOf$J(-result.longValue$()) : result);
    } catch (e) {
        var constant = (isNeg ? "-" + n.substring(i) : n.substring$I(i));
        result = Long.valueOf$S$I(constant, radix);
    }
    return result;
}, 1);

m$(Long,"equals$O",
		function(s){
		return (s instanceof Long) && Long.$eq(s.valueOf(),this.valueOf());
});

m$(Long, "$box$", function(v) {
	return Long.valueOf$J(v.longValue$());
});

;(function(C$) {

m$(C$, 'compareUnsigned$J$J', function (x, y) {
return C$.compare$J$J(Long.$add(x,LONG_MIN_VALUE), Long.$add(y,LONG_MIN_VALUE));
}, 1);

// Long.compareUnsigned$J$J = function(a,b) { return Long.$cmp(a,b,1); }

m$(C$, 'divideUnsigned$J$J', function (dividend, divisor) {
if (Long.$lt(divisor,0 )) {
return (C$.compareUnsigned$J$J(dividend, divisor)) < 0 ? 0 : 1;
}if (Long.$gt(dividend,0 )) return Long.$div(dividend,divisor);
 else {
return C$.toUnsignedBigInteger$J(dividend).divide$java_math_BigInteger(C$.toUnsignedBigInteger$J(divisor)).longValue$();
}}, 1);

m$(C$, 'remainderUnsigned$J$J', function (dividend, divisor) {
if (Long.$gt(dividend,0 ) && Long.$gt(divisor,0 ) ) {
return Long.$mod(dividend,divisor);
} else {
if (C$.compareUnsigned$J$J(dividend, divisor) < 0) return dividend;
 else return C$.toUnsignedBigInteger$J(dividend).remainder$java_math_BigInteger(C$.toUnsignedBigInteger$J(divisor)).longValue$();
}}, 1);

m$(C$, 'highestOneBit$J', function (i) {
(i=Long.$or(i,((Long.$sr(i,1)))));
(i=Long.$or(i,((Long.$sr(i,2)))));
(i=Long.$or(i,((Long.$sr(i,4)))));
(i=Long.$or(i,((Long.$sr(i,8)))));
(i=Long.$or(i,((Long.$sr(i,16)))));
(i=Long.$or(i,((Long.$sr(i,32)))));
return Long.$sub(i,(Long.$usr(i,1)));
}, 1);

m$(C$, 'lowestOneBit$J', function (i) {
return Long.$and(i,(Long.$neg(i)));
}, 1);

m$(C$, 'numberOfLeadingZeros$J', function (i) {
if (Long.$eq(i,0 )) return 64;
var n=1;
var x=Long.$ival((Long.$usr(i,32)));
if (x == 0) {
n+=32;
x=Long.$ival(i);
}if (x >>> 16 == 0) {
n+=16;
x<<=16;
}if (x >>> 24 == 0) {
n+=8;
x<<=8;
}if (x >>> 28 == 0) {
n+=4;
x<<=4;
}if (x >>> 30 == 0) {
n+=2;
x<<=2;
}n-=x >>> 31;
return n;
}, 1);

m$(C$, 'numberOfTrailingZeros$J', function (i) {
var x;
var y;
if (Long.$eq(i,0 )) return 64;
var n=63;
y=Long.$ival(i);
if (y != 0) {
n=n - 32;
x=y;
} else x=Long.$ival((Long.$usr(i,32)));
y=x << 16;
if (y != 0) {
n=n - 16;
x=y;
}y=x << 8;
if (y != 0) {
n=n - 8;
x=y;
}y=x << 4;
if (y != 0) {
n=n - 4;
x=y;
}y=x << 2;
if (y != 0) {
n=n - 2;
x=y;
}return n - ((x << 1) >>> 31);
}, 1);

m$(C$, 'bitCount$J', function (i) {
i=Long.$sub(i,(Long.$and((Long.$usr(i,1)),[5592405,366503875925,1])));
i=Long.$add((Long.$and(i,[3355443,219902325555,1])),(Long.$and((Long.$usr(i,2)),[3355443,219902325555,1])));
i=Long.$and((Long.$add(i,(Long.$usr(i,4)))),[986895,64677154575,1]);
i=Long.$add(i,(Long.$usr(i,8)));
i=Long.$add(i,(Long.$usr(i,16)));
i=Long.$add(i,(Long.$usr(i,32)));
return Long.$ival(i) & 127;
}, 1);

m$(C$, 'rotateLeft$J$I', function (i, distance) {
return Long.$or((Long.$sl(i,distance)),(Long.$usr(i,-distance)));
}, 1);

m$(C$, 'rotateRight$J$I', function (i, distance) {
return Long.$or((Long.$usr(i,distance)),(Long.$sl(i,-distance)));
}, 1);

m$(C$, 'reverse$J', function (i) {
i=Long.$or(Long.$sl((Long.$and(i,[5592405,366503875925,1])),1),Long.$and((Long.$usr(i,1)),[5592405,366503875925,1]));
i=Long.$or(Long.$sl((Long.$and(i,[3355443,219902325555,1])),2),Long.$and((Long.$usr(i,2)),[3355443,219902325555,1]));
i=Long.$or(Long.$sl((Long.$and(i,[986895,64677154575,1])),4),Long.$and((Long.$usr(i,4)),[986895,64677154575,1]));
i=Long.$or(Long.$sl((Long.$and(i,[16711935,4278255360,1])),8),Long.$and((Long.$usr(i,8)),[16711935,4278255360,1]));
i=Long.$or((Long.$sl(i,48)),(Long.$sl((Long.$and(i,4294901760)),16)) , (Long.$and((Long.$usr(i,16)),4294901760)) , (Long.$usr(i,48)) );
return i;
}, 1);

m$(C$, 'signum$J', function (i) {
return Long.$sign(i);
//Long.$ival((Long.$or((Long.$sr(i,63)),(Long.$usr((Long.$neg(i)),63)))));
}, 1);

m$(C$, 'reverseBytes$J', function (i) {
i=Long.$or(Long.$sl((Long.$and(i,[16711935,4278255360,1])),8),Long.$and((Long.$usr(i,8)),[16711935,4278255360,1]));
return Long.$or((Long.$sl(i,48)),(Long.$sl((Long.$and(i,4294901760)),16)) , (Long.$and((Long.$usr(i,16)),4294901760)) , (Long.$usr(i,48)) );
}, 1);

m$(C$, 'sum$J$J', function (a, b) {
return Long.$add(a,b);
}, 1);

m$(C$, 'max$J$J', function (a, b) {
return (Long.$ge(a,b) ? a : b);
}, 1);

m$(C$, 'min$J$J', function (a, b) {
return (Long.$le(a,b) ? a : b);
}, 1);

Clazz.newMeth(C$, 'getLong$S', function (nm) {
	return C$.getLong$S$Long(nm, null);
}, 1);

Clazz.newMeth(C$, 'getLong$S$J', function (nm, val) {
	var result=C$.getLong$S$Long(nm, null);
	return (Long.$eq(result,null )) ? C$.valueOf$J(val) : result;
}, 1);

Clazz.newMeth(C$, 'getLong$S$Long', function (nm, val) {
	var v=null;
	try {
	v=System.getProperty$S(nm);
	} catch (e) {
	if (Clazz.exceptionOf(e,"IllegalArgumentException") || Clazz.exceptionOf(e,"NullPointerException")){
	} else {
	throw e;
	}
	}
	if (v != null ) {
	try {
	return C$.decode$S(v);
	} catch (e) {
	if (Clazz.exceptionOf(e,"NumberFormatException")){
	} else {
	throw e;
	}
	}
	}return val;
}, 1);

Clazz.newMeth(C$, 'parseUnsignedLong$S', function (s) {
	return C$.parseUnsignedLong$S$I(s, 10);
}, 1);

Clazz.newMeth(C$, 'parseUnsignedLong$S$I', function (s, radix) {
	if (s == null ) {
	throw Clazz.new_(Clazz.load('NumberFormatException').c$$S,["null"]);
	}var len=s.length$();
	if (len > 0) {
	var firstChar=s.charAt$I(0);
	if (firstChar == "-") {
	throw Clazz.new_(Clazz.load('NumberFormatException').c$$S,[String.format$S$OA("Illegal leading minus sign on unsigned string %s.", Clazz.array(java.lang.Object, -1, [s]))]);
	} else {
	if (len <= 12 || (radix == 10 && len <= 18 ) ) {
	return C$.parseLong$S$I(s, radix);
	}var first=C$.parseLong$S$I(s.substring$I$I(0, len - 1), radix);
	var second=Character.digit$C$I(s.charAt$I(len - 1), radix);
	if (second < 0) {
	throw Clazz.new_(Clazz.load('NumberFormatException').c$$S,["Bad digit at end of " + s]);
	}var result=Long.$add(Long.$mul(first,radix),second);
	if (C$.compareUnsigned$J$J(result, first) < 0) {
	throw Clazz.new_(Clazz.load('NumberFormatException').c$$S,[String.format$S$OA("String value %s exceeds range of unsigned long.", Clazz.array(java.lang.Object, -1, [s]))]);
	}return result;
	}} else {
	throw Clazz.load('NumberFormatException').forInputString$S(s);
}}, 1);


})(Long);
		
Long.toUnsignedString$J=Long.toUnsignedString$J$I = function(i,r) {
	if (i >= 0)
		return Long.toString$J$I(i,r || 10);
    switch (r || 10) {
    case 2:
        return Long.toBinaryString$J(i);
    case 4:
    	return Long.$s(j,4,1)
    case 8:
        return Long.toOctalString$J(i);
    case 16:
        return Long.toHexString$J(i);
    case 32:
    default:
        return Long.$s(i,r,1);
    }
};
Long.sum$J$J = Long.$add;
Long.toHexString$J=function(j) { return Long.$s(j,16,1)};
Long.toOctalString$J=function(j) { return Long.$s(j,8,1)};
Long.toBinaryString$J=function(j) { return Long.$s(j,2,1)};

var bi;
Long.toUnsignedBigInteger$J = function(i) {
    bi || (bi=(Clazz.load("java.math.BigInteger"), Clazz.new_(java.math.BigInteger.c$$S,["18446744073709551616"])));
    return (i >= 0 ? bi.valueOf$J(i) : bi.valueOf$J(i).add$java_math_BigInteger(bi));
}
    
Clazz._setDeclared("java.lang.Short", java.lang.Short = Short = function(){
if (arguments[0] === null || typeof arguments[0] != "object")this.c$(arguments[0]);
});
decorateAsNumber(Short, "Short", "short", "H", sHCOffset);


var minShort = Short.MIN_VALUE = Short.prototype.MIN_VALUE = -32768;
var maxShort = Short.MAX_VALUE = Short.prototype.MAX_VALUE = 32767;
Short.SIZE=Short.prototype.SIZE=16;

m$(Short,"c$", function(v){ // SwingJS only -- for new Integer(3)
	v || v == null || (v = 0);
	if (typeof v != "number")
		v = Short.parseShort$S$I(v, 10);
	this.valueOf=function(){return v;};
	}, 1);


m$(Short, "c$$H", function(v){
	this.valueOf=function(){return v;};
}, 1);


m$(Short,"c$$S",
function(v){
 var v = Short.parseShort$S$I(v, 10);
 this.valueOf=function(){return v;}; 
}, 1);


m$(Short,"valueOf$S",
function(s){
	return Short.valueOf$S$I(s, 10);
}, 1);

m$(Short,"valueOf$S$I",
function(s, radix){
  return Short.valueOf$H(Short.parseShort$S$I(s, radix));
}, 1);

m$(Short,"valueOf$H",
function(i){
  var v = getCachedNumber(i, shorts, Short, "c$$H");
  return (v ? v : Clazz.new_(Short.c$$H, [i]));
}, 1);


m$(Short,"parseShort$S",
function(s){
	return parseIntLimit(s, false, minShort, maxShort);
}, 1);

m$(Short,"parseShort$S$I",
function(s,radix){
	return parseIntLimit(s, radix, minShort, maxShort);
}, 1);


Short.toString = Short.toString$H = Short.toString$H$I = Short.prototype.toString = function (i,radix) {
	switch(arguments.length) {
	case 2:
		return i.toString(radix);
	case 1:
		return "" +i;
	case 0:
		return (this===Short ? "class java.lang.Short" : ""+this.valueOf());
	}
};


Short.toUnsignedInt$H = Short.toUnsignedLong$H = function (i) {
  return (i < 0 ? i + 0x10000 : i);
};

m$(Short, "decode$S",
function(n){
  if (isNaN(n = Integer.decodeRaw$S(n)) || n < -32768|| n > 32767)
    throw Clazz.new_(NumberFormatException.c$$S, ["Invalid Short"]);
  return Clazz.new_(Short.c$$H, [n]);
}, 1);


m$(Short, "equals$O", function(s){
	return (s instanceof Short) && s.valueOf()==this.valueOf();
});

m$(Short, "$box$", function(v) {
	return Short.valueOf$H(v.shortValue$());
});


Clazz._setDeclared("Byte", java.lang.Byte=Byte=function(){
if (arguments[0] === null || typeof arguments[0] != "object")this.c$(arguments[0]);
});
decorateAsNumber(Byte,"Byte", "byte", "B", bHCOffset);

// Byte.serialVersionUID=Byte.prototype.serialVersionUID=-7183698231559129828;
var minByte = Byte.MIN_VALUE=Byte.prototype.MIN_VALUE=-128;
var maxByte = Byte.MAX_VALUE=Byte.prototype.MAX_VALUE=127;
Byte.SIZE=Byte.prototype.SIZE=8;

m$(Byte,"c$", function(v){ // SwingJS only -- for new Integer(3)
	v || v == null || (v = 0);
	if (typeof v != "number")
		v = Byte.parseByte$S$I(v, 10);
	this.valueOf=function(){return v;};
	}, 1);


m$(Byte, "c$$B", function(v){
	this.valueOf=function(){return v;};
}, 1);

m$(Byte,"c$$S",
function(v){
 var v = Byte.parseByte$S$I(v, 10);
 this.valueOf=function(){return v;}; 
}, 1);


m$(Byte,"valueOf$S",
function(s){
	return Byte.valueOf$S$I(s, 10);
}, 1);

m$(Byte,"valueOf$S$I",
function(s, radix){
  return Byte.valueOf$B(Byte.parseByte$S$I(s, radix));
}, 1);

m$(Byte,"valueOf$B",
function(i){
  var v = getCachedNumber(i, bytes, Byte, "c$$B");
  return v;
}, 1);


Byte.toString=Byte.toString$B=Byte.toString$B$I=Byte.prototype.toString=function(i,radix){
	switch(arguments.length) {
	case 2:
		return i.toString(radix);
	case 1:
		return "" +i;
	case 0:
		return (this===Byte ? "class java.lang.Byte" : ""+this.valueOf());
	}
};

m$(Byte,"parseByte$S",
	function(s){
		return parseIntLimit(s, false, minByte, maxByte);
	}, 1);

m$(Byte,"parseByte$S$I",
	function(s,radix){
		return parseIntLimit(s, radix, minByte, maxByte);
	}, 1);

Byte.toString=Byte.toString$B=Byte.toString$B$I=Byte.prototype.toString=function(i,radix){
	switch(arguments.length) {
	case 2:
		return i.toString(radix);
	case 1:
		return "" +i;
	case 0:
		return (this===Byte ? "class java.lang.Byte" : ""+this.valueOf());
	}
};


m$(Byte, ["valueOf$S","valueOf$B","valueOf$S$I"],
function (s,radix) {
  return Clazz.new_(Byte.c$, [s, radix||10]);
}, 1);

m$(Byte,"equals$O",
function(s){
return (s instanceof Byte) && s.valueOf()==this.valueOf();
});

m$(Byte, "$box$", function(v) {
	return Byte.valueOf$B(v.byteValue$());
});

Byte.toUnsignedInt$B = Byte.toUnsignedLong$B = function (i) {
	return (i < 0 ? i + 0x100 : i);
};

m$(Byte,"decode$S",
function(n){
  if (isNaN(n = Integer.decodeRaw$S(n)) || n < -128|| n > 127)
    throw Clazz.new_(NumberFormatException.c$$S, ["Invalid Byte"]);
  return Clazz.new_(Byte.c$$B, [n]);
}, 1);

Clazz._floatToString = function(f) {
	if (f === 0) {
		return (1/f == -Infinity ? "-0.0" : "0.0");
	}
 var check57 = (Math.abs(f) >= 1e-6 && Math.abs(f) < 1e-3);
 if (check57)
	f/=1e7;
 var s = (""+f).replace('e','E');
 if (s.indexOf(".") < 0 && s.indexOf("Inf") < 0 && s.indexOf("NaN") < 0) {
   if(s.indexOf('E') < 0)
	s += ".0"; 
   else {
	s = s.replace('E', '.0E');
   }
 } 
 if (check57) {
	s = s.substring(0, s.length - 2) + (parseInt(s.substring(s.length - 2)) - 7);
	s = s.replace(".0000000000000001",".0");
 }
 return s;
}

Clazz._setDeclared("Float", java.lang.Float=Float=function(){
if (arguments[0] === null || typeof arguments[0] != "object")this.c$(arguments[0]);
});
decorateAsNumber(Float,"Float", "float", "F");

var maxFloat = 3.4028235E38;
var minFloat = -3.4028235E38;

m$(Float,"c$", function(v){
	v || v == null || v != v || (v == 0) || (v = 0);
	if (typeof v != "number") 
	v = Float.parseFloat$S(v);
	this.valueOf=function(){return v;}
	}, 1);

m$(Float, "c$$F", function(v){
	this.valueOf=function(){return v;};
}, 1);

m$(Float, "c$$S", function(v){
  v = Float.parseFloat$S(v);
 this.valueOf=function(){return v;}
}, 1);

m$(Float, "c$$D", function(v){
	  v || v != v || (v == 0) || (v = 0);
  v = (v < minFloat ? -Infinity : v > maxFloat ? Infinity : v);
 this.valueOf=function(){return v;}
}, 1);

Float.toString=Float.toString$F=Float.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Float){
return"class java.lang.Float";
}
return Clazz._floatToString(this.valueOf());
};

var a32, i32, a64, i64;

var geti32 = function() {
	return i32 || (a32 = new Float32Array(1), i32 = new Int32Array(a32.buffer));
}
var geta32 = function() {
	geti32();
	return a32;
}

geti64 = function() {
	return i64 || (a64 = new Float64Array(1), i64 = new Uint32Array(a64.buffer));
}
geta64 = function() {
	geti64();
	return a64;
}

Float.floatToIntBits$F = function(f) {
	return Float.floatToRawIntBits$F(f);
}

Float.floatToRawIntBits$F = function(f) {
	geta32()[0] = f;
	return i32[0]; 
}

Float.intBitsToFloat$I = function(i) {
	geti32()[0] = i;
	return a32[0]; 
}

Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=1.4e-45;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=3.4028235e+38;
Float.NEGATIVE_INFINITY=Float.prototype.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Float.prototype.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;

m$(Float,"parseFloat$S",
function(s){
	var v = Double.parseDouble$S(s);
	return (v < minFloat ? -Infinity : v > maxFloat ? Infinity : v);
}, 1);

m$(Float,"valueOf$S",
function(s){
return Clazz.new_(Float.c$$S, [s]);
}, 1);


m$(Float,["longValue$","longValue"],function(){return Math.floor(this.valueOf());});

m$(Float,"valueOf$D",
function(i){
return Clazz.new_(Float.c$$F, [i < minFloat ? -Infinity : i > maxFloat ? Infinity : i]);
}, 1);

m$(Float,"valueOf$F",
function(i){
return Clazz.new_(Float.c$$F, [i]);
}, 1);

m$(Float,"isNaN$F",
function(num){
return isNaN(num);
}, 1);

m$(Float,"isNaN$",
function(){
return isNaN(this.valueOf());
});

m$(Float,"isInfinite$F",
function(num){
return num == num && !Number.isFinite(num);
}, 1);

m$(Float,"isInfinite$",
function(){
	var v = this.valueOf();
return v == v && !Number.isFinite(this.valueOf());
});

m$(Float,"equals$O",
function(s){
return (s instanceof Float) && s.valueOf()==this.valueOf();
});

m$(Float, "$box$", function(v) {
	return Float.valueOf$F(v.floatValue$());
});

Clazz._setDeclared("Double", java.lang.Double=Double=function(){
  if (typeof arguments[0] == "number") {
	  this.c$$D(arguments[0]);
  } else if (arguments[0] === null || typeof arguments[0] != "object") {
	  this.c$(arguments[0]);
  }
});
decorateAsNumber(Double,"Double", "double", "D");

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=4.9e-324;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.7976931348623157e+308;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;
// Double.TYPE=Double.prototype.TYPE=Double;

Double.toString=Double.toString$D=Double.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Double){
return"class java.lang.Double";
}
return Clazz._floatToString(this.valueOf());
};

m$(Double, "c$$D", function(v){
    v || v != v || (v == 0) || (v = 0);
	this.valueOf=function(){return v;};
}, 1);

m$(Double,"c$", function(v){
	// -0 here becomes 0, from Double.valueOf(d)
  v || v == null || v != v || (v = 0);
 if (typeof v != "number") 
  v = Double.parseDouble$S(v);
 this.valueOf=function(){return v;}
}, 1);

m$(Double, ["c$$S"], function(v){
v || v == null || (v == 0) || (v = 0);
if (typeof v != "number") 
	v = Double.parseDouble$S(v);
this.valueOf=function(){return v;};
}, 1);

Double.prototype.isNaN$ = Float.prototype.isNaN$;
Double.isNaN$D = Double.prototype.isNaN$D = Float.isNaN$F;

Float.prototype.hashCode$ = function() {this._hashcode || (this._hashcode = new String("F\u79d8" + this.valueOf()).hashCode$())}
Double.prototype.hashCode$ = function() {this._hashcode || (this._hashcode = new String("D\u79d8" + this.valueOf()).hashCode$())}
Double.isInfinite$D = Double.prototype.isInfinite$D = Float.isInfinite$F;
Double.prototype.isInfinite$ = Float.prototype.isInfinite$;

m$(Double,"parseDouble$S",
function(s){
if(s == null) {
  throw Clazz.new_(NumberFormatException.c$$S, ["null"]);
}
if(s.length == 0) {
	  throw Clazz.new_(NumberFormatException.c$$S, ["empty String"]);
}
if (s.indexOf("NaN") >= 0)
	return NaN;
var v=Number(s);
if(isNaN(v)){
throw Clazz.new_(NumberFormatException.c$$S, ["Not a Number : "+s]);
}
return v;
}, 1);

m$(Double,["doubleToRawLongBits$D", "doubleToLongBits$D"],
function(d){
	geta64()[0] = d;
	return toLongI2(i64[0], i64[1]);
}, 1);

m$(Double,"valueOf$S",
function(v){
return Clazz.new_(Double.c$$S, [v]);
}, 1);

m$(Double,"valueOf$D",
function(v){
return Clazz.new_(Double.c$, [v]);
}, 1);

// Double.prototype.equals =
m$(Double,"equals$O",
function(s){
return (s instanceof Double) && s.valueOf()==this.valueOf();
});

m$(Double, "$box$", function(v) {
	return Double.valueOf$D(v.doubleValue$());
});


Clazz._setDeclared("Boolean", 
Boolean = java.lang.Boolean = Boolean || function(){
if (arguments[0] === null || typeof arguments[0] != "object")this.c$(arguments[0]);
});

extendObject(Boolean);

Boolean.__CLASS_NAME__="Boolean";
addInterface(Boolean,[java.io.Serializable,java.lang.Comparable]);
setJ2STypeclass(Boolean, "boolean", "Z");
// extendPrototype(Boolean, true, false);
Boolean.serialVersionUID=Boolean.prototype.serialVersionUID=-3665804199014368530;

m$(Boolean, ["c$", "c$$S"],
function(s){
  var b = ((typeof s == "string" ? Boolean.toBoolean(s) : s) ? true : false);
  this.valueOf=function(){return b;};
}, 1);

m$(Boolean, "c$$Z", function(v){
	this.valueOf=function(){return v;};
	}, 1);


Boolean.TRUE=Boolean.prototype.TRUE=Clazz.new_(Boolean.c$$Z, [true]);
Boolean.FALSE=Boolean.prototype.FALSE=Clazz.new_(Boolean.c$$Z, [false]);
m$(Boolean,"valueOf$S",function(s){	return("true".equalsIgnoreCase$S(s)?Boolean.TRUE:Boolean.FALSE);}, 1);

// the need is to have new Boolean(string), but that won't work with native
// Boolean
// so instead we have to do a lexical switch from "new Boolean" to
// "Boolean.from"
// note no $ here

m$(Boolean,"valueOf$Z",function(b){ return(b?Boolean.TRUE:Boolean.FALSE);}, 1);


// encoded by the transpiler for new Boolean(boolean); NOT equivalent to
// Boolean.TRUE or Boolean.FALSE
m$(Boolean,"from",
function(name){
return Clazz.new_(Boolean.c$$Z, [Boolean.toBoolean(name)]);
}, 1);

m$(Boolean,"getBoolean$S",
function(name){
var result=false;
try{
result=Boolean.toBoolean(System.getProperty$S(name));
}catch(e){
if(Clazz.instanceOf(e,IllegalArgumentException)){
}else if(Clazz.instanceOf(e,NullPointerException)){
}else{
throw e;
}
}
return result;
}, 1);

m$(Boolean,"parseBoolean$S", function(s){return Boolean.toBoolean(s);}, 1);

m$(Boolean,"toBoolean",
function(name){
return(typeof name == "string" ? name.equalsIgnoreCase$S("true") : !!name);
}, 1);


m$(Boolean,["$c","booleanValue","booleanValue$"], function(){ return this.valueOf(); });

m$(Boolean,"compare$Z$Z", function(a,b){return(a == b ? 0 : a ? 1 : -1);}, 1);

m$(Boolean,["compareTo$Boolean","compareTo$O"],
		function(b){
		return(b.valueOf() == this.valueOf() ? 0 : this.valueOf() ? 1 : -1);
		});

// Boolean.prototype.equals =
	m$(Boolean,"equals$O",
		function(obj){
		return obj instanceof Boolean && this.booleanValue()==obj.booleanValue();
		});

m$(Boolean,"hashCode$", function(){ return this.valueOf()?1231:1237;});
m$(Boolean,"hashCode$Z", function(b){ return b?1231:1237;}, 1);

m$(Boolean,"logicalAnd$Z$Z", function(a,b){return(a && b);}, 1);
m$(Boolean,"logicalOr$Z$Z", function(a,b){return(a || b);}, 1);
m$(Boolean,"logicalXor$Z$Z", function(a,b){return !!(a ^ b);}, 1);


m$(Boolean,"toString",function(){return this.valueOf()?"true":"false";});
m$(Boolean,"toString$Z",function(b){return "" + b;}, 1);


Clazz._Encoding={
  UTF8:"utf-8",   // EF BB BF
  UTF16:"utf-16", // FF FE (LE)
  ASCII:"ascii"
};

(function(E) {

	var textDecoder = (self.TextDecoder && new TextDecoder() || null);

E.guessEncoding=function(str){
return ((str.charCodeAt(0)&0xFF)==0xEF&&(str.charCodeAt(1)&0xFF)==0xBB&&(str.charCodeAt(2)&0xFF)==0xBF ? E.UTF8
  : (str.charCodeAt(0)&0xFF)==0xFF&&(str.charCodeAt(1)&0xFF)==0xFE ? E.UTF16 // LE
  : E.ASCII);
};

E.guessEncodingArray=function(a, offset){
return ((a[offset]&0xFF)==0xEF&&(a[offset + 1]&0xFF)==0xBB&&(a[offset + 2]&0xFF)==0xBF ? E.UTF8 
  : (a[offset + 0]&0xFF)==0xFF&&(a[offset + 1]&0xFF)==0xFE ? E.UTF16 : E.ASCII);
};

E.readUTF8Array=function(a, offset, length){
	// a will be an Int8Array, UTF8 only
	// TextDecoder will accept a BOM or not. Java doesn't
  var encoding=E.guessEncodingArray(a, offset);
  var startIdx=0;
  if(encoding==E.UTF8){
	startIdx=3;
  }else if(encoding==E.UTF16){
	startIdx=2;
  }
  if (textDecoder) {
	offset += startIdx;
	length -= startIdx;
	if (offset == 0 && length == a.length)
		return textDecoder.decode(a);
	var arr=new Uint8Array(length);
	for(var i = 0; i < length; i++){
		arr[i] = a[offset + i];
	}
	// Java needs to see the 0xFEFF byte mark
	var s = textDecoder.decode(arr);
	return (startIdx ? '\ufeff' + s : s);
  }
// IE only. I don't know where this comes from. Is it Java?
var arrs=new Array();
for(var i=offset + startIdx, endIdx = offset + length; i < endIdx; i++){
var charCode=a[i];
if(charCode<0x80){
arrs[arrs.length]=String.fromCharCode(charCode);
}else if(charCode>0xc0&&charCode<0xe0){
var c1=charCode&0x1f;
var c2=a[++i]&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>=0xe0){
var c1=charCode&0x0f;
var c2=a[++i]&0x3f;
var c3=a[++i]&0x3f;
var c=(c1<<12)+(c2<<6)+c3;
arrs[arrs.length]=String.fromCharCode(c);
}
}
return arrs.join('');
};


E.convert2UTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==E.UTF8){
return str;
}else if(encoding==E.UTF16){
startIdx=2;
}

var offset=0;
var arrs=new Array(offset+str.length-startIdx);

for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[offset+i-startIdx]=str.charAt(i);
}else if(charCode<=0x07ff){
var c1=0xc0+((charCode&0x07c0)>>6);
var c2=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2);
}else{
var c1=0xe0+((charCode&0xf000)>>12);
var c2=0x80+((charCode&0x0fc0)>>6);
var c3=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2)+String.fromCharCode(c3);
}
}
return arrs.join('');
};
if(!String.__PARAMCODE){

String.__PARAMCODE = "S";

Clazz._setDeclared("String", java.lang.String=String);

extendObject(String, EXT_NO_TOSTRING);
 
addInterface(String,[java.io.Serializable,CharSequence,Comparable]);

String.serialVersionUID=String.prototype.serialVersionUID=-6849794470754667710;

var formatterClass;

String.format$S$OA = function(format, args) {
  if (!formatterClass)
    formatterClass = Clazz._4Name("java.util.Formatter", null, null, true);
  var f = new formatterClass();
  return f.format$S$OA.apply(f,arguments).toString();
 };

 // Java8
 String.lastIndexOf$CA$I$I$S$I = function(source, sourceOffset, sourceCount, target, fromIndex) {
	return C$.lastIndexOf$CA$I$I$CA$I$I$I(source, sourceOffset, sourceCount, target.value, 0, target.value.length, fromIndex);
 };
 
 // Java8
 String.lastIndexOf$CA$I$I$CA$I$I$I = function(source, sourceOffset, sourceCount, target, targetOffset, targetCount, fromIndex) {
	var rightIndex=sourceCount - targetCount;
	if (fromIndex < 0) {
	return -1;
	}if (fromIndex > rightIndex) {
	fromIndex=rightIndex;
	}if (targetCount == 0) {
	return fromIndex;
	}var strLastIndex=targetOffset + targetCount - 1;
	var strLastChar=target[strLastIndex];
	var min=sourceOffset + targetCount - 1;
	var i=min + fromIndex;
	searching : while (true){
	while (i >= min && source[i] != strLastChar ){
	i--;
	}
	if (i < min) {
	return -1;
	}var j=i - 1;
	var start=j - (targetCount - 1);
	var k=strLastIndex - 1;
	while (j > start){
	if (source[j--] != target[k--]) {
	i--;
	continue searching;
	}}
	return start - sourceOffset + 1;
	}
	};

 
 String.CASE_INSENSITIVE_ORDER = {
	compare$O$O: function(s1, s2){
		if(s1==null || s2 == null)
			throw new NullPointerException();
		if(s1==s2) return 0;
		var s1=s1.toUpperCase();
		var s2=s2.toUpperCase();
		if(s1==s2) return 0;
		var s1=s1.toLowerCase();
		var s2=s2.toLowerCase();
		return (s1==s2 ? 0 : s1 > s2 ? 1 : -1);
	}
 } 
 
String.CASE_INSENSITIVE_ORDER.compare$S$S = String.CASE_INSENSITIVE_ORDER.compare$O$O;

CharSequence.$defaults$(String);
 
;(function(sp) {

	// Java-11

sp.isBlank$ = function() {
	return this.indexOfNonWhitespace$() == this.length$();	
}

sp.lines$ = function() {
	return CharSequence.lines$S(this);
}

sp.indexOfNonWhitespace$ = function() {
	return this.length - this.stripLeading$().length;
}

//sp.chars$ is implemented as CharSequence.prototype.chars$
//sp.codePoints$ is implemented as = CharSequence.prototype.codePoints$

sp.repeat$I = function(count) {
    if (count < 0) {
        throw new IllegalArgumentException("count is negative: " + count);
    }
    if (count == 1) {
        return this;
    }
    var len = this.length;
    if (len == 0 || count == 0) {
        return "";
    }
    var s = this;
    for (var i = 1; i < count; i++) {
    	s += this;
    }
    return s;
}

sp.strip$ = function() { return this.trim(); }

sp.stripLeading$ = function() { return this.trimStart ? this.trimStart() : this.trimLeft(); }

sp.stripTrailing$ = function() { return this.trimEnd ? this.trimEnd() : this.trimRight(); }

	//
sp.compareToIgnoreCase$S = function(str) { return String.CASE_INSENSITIVE_ORDER.compare$S$S(this, str);}

sp.replace$ = function(c1,c2){
  if (c1 == c2 || this.indexOf(c1) < 0) return "" + this;
  if (c1.length == 1) {
    if ("\\$.*+|?^{}()[]".indexOf(c1) >= 0)   
      c1 = "\\" + c1;
  } else {    
    c1=c1.replace(/([\\\$\.\*\+\|\?\^\{\}\(\)\[\]])/g,function($0,$1){return "\\"+$1;});
  }
  return this.replace(new RegExp(c1,"gm"),c2);
};

// fastest:
sp.replaceAll$=sp.replaceAll$S$S=sp.replaceAll$CharSequence$CharSequence=function(exp,str){
return this.replace(newRegExp(exp,"gm"),str);
};
sp.replaceFirst$S$S=function(exp,str){
return this.replace(newRegExp(exp,"m"),str);
};
sp.matches$S=function(exp){
if(exp!=null){
exp="^("+exp+")$";
}
var regExp=newRegExp(exp,"gm");
var m=this.match(regExp);
return m!=null&&m.length!=0;
};

sp.regionMatches$I$S$I$I=function(toffset,other,ooffset,len){
  return this.regionMatches$Z$I$S$I$I(false,toffset,other,ooffset,len);
}

sp.regionMatches$Z$I$S$I$I=function(ignoreCase,toffset,other,ooffset,len){
var to=toffset;
var po=ooffset;

if((ooffset<0)||(toffset<0)||(toffset>this.length-len)||
(ooffset>other.length-len)){
return false;
}
var s1=this.substring(toffset,toffset+len);
var s2=other.substring(ooffset,ooffset+len);
if(ignoreCase){
s1=s1.toLowerCase();
s2=s2.toLowerCase();
}
return s1==s2;
};

var newRegExp = function(regex, flags) {
	if (regex.indexOf("\\Q") >= 0 || regex.indexOf("(?") == 0)
		return Clazz.loadClass("java.util.regex.Pattern").getJSRegex$S$S(regex, flags);
	return new RegExp(regex, flags);
}
sp.split$S=sp.split$S$I=function(regex,limit){
var arr;
if (!limit && regex == " ") {
	arr = this.split(" ");
} else if(limit && limit > 0){
	if(limit == 1){
	arr = [this];
	} else {
		var regExp=newRegExp("("+regex+")","gm");
		var count=1;
		var s=this.replace(regExp,function($0,$1){
			count++;
			if(count==limit){
				return"@@_@@";
			}
			else if(count>limit){
				return $0;
			}else{
				return $0;
			}
		});
		regExp=new RegExp(regex,"gm");
		arr=this.split(regExp);
		if(arr.length>limit){
			arr[limit-1]=s.substring(s.indexOf("@@_@@")+5);
			arr.length=limit;
		}
	}
}else{
	arr = this.split(newRegExp(regex,"gm"));
}
while (arr[arr.length - 1] === "")
	arr.pop();
return Clazz.array(String, -1, arr);
};

var sn=function(s, prefix,toffset){
  var to=toffset;
  var po=0;
  var pc=prefix.length;
  
  if((toffset<0)||(toffset>s.length-pc)){
  return false;
  }
  while(--pc>=0){
  if(s.charAt(to++)!=prefix.charAt(po++)){
  return false;
  }
  }
  return true;
};

sp.startsWith$S=sp.startsWith$S$I=function(prefix){
if(arguments.length==1){
return sn(this,arguments[0],0);
}else if(arguments.length==2){
return sn(this,arguments[0],arguments[1]);
}else{
return false;
}
};

sp.endsWith$S=function(suffix){
return sn(this, suffix,this.length-suffix.length);
};

sp.equals$O = function(anObject){
return this.valueOf()==anObject;
};

sp.equalsIgnoreCase$S=function(anotherString){
return(anotherString==null)?false:(this==anotherString
||this.toLowerCase()==anotherString.toLowerCase());
};


sp.hash=0;

sp.hashCode$=function(){
var h=this.hash;
if(h==0){
var off=0;
var len=this.length;
for(var i=0;i<len;i++){
h=31*h+this.charCodeAt(off++);
h&=0xffffffff;
}
this.hash=h;
}
return h;
};

sp.getChars$I$I$CA$I=function(srcBegin,srcEnd,dst,dstBegin){
	getChars(this, srcBegin, srcEnd, dst, dstBegin, false);
};

sp.getChars$I$I$BA$I=function(srcBegin,srcEnd,dst,dstBegin){
	getChars(this, srcBegin, srcEnd, dst, dstBegin, true);
};

var getChars = function(s, srcBegin,srcEnd,dst,dstBegin, asBytes){
	if(srcBegin<0){
	throw new StringIndexOutOfBoundsException(srcBegin);
	}
	if(srcEnd>s.length){
	throw new StringIndexOutOfBoundsException(srcEnd);
	}
	if(srcBegin>srcEnd){
	throw new StringIndexOutOfBoundsException(srcEnd-srcBegin);
	}
	if(dst==null){
	throw new NullPointerException();
	}
	for(var i=0;i<srcEnd-srcBegin;i++){
		dst[dstBegin+i]=(asBytes ? s.charCodeAt(srcBegin+i) : s.charAt(srcBegin+i));
	}
};

// var
// charset=["utf-8","utf8","us-ascii","iso-8859-1","8859_1","gb2312","gb18030"];
var charset=["utf-8","utf8","us-ascii","iso-8859-1"]; // gb* uses GBK

sp.getBytes$I$I$BA$I=function(i0, i1, dst, dpt) {
	if (i1 == i0)
		return;
	var s = this.valueOf();
	for (var i = i0; i < i1; i++)
		dst[dpt++] = s.charCodeAt(i);
}

sp.getBytes$=sp.getBytes$S=sp.getBytes$java_nio_charset_Charset=function(){
var s=this;
var cs = (arguments.length == 1 ? arguments[0] : "utf-8").toString().toLowerCase();
 var simple=false;
 for(var i=0;i<charset.length;i++){
  if(charset[i]==cs){
   simple=true;
   break;
  }
 }
 if(!simple){
  cs = arguments[0];
  if (typeof cs == "string")
   cs = Clazz.loadClass("java.nio.charset.Charset").forName$S(cs);
  if (!cs)
	throw new java.io.UnsupportedEncodingException();
  return cs.encode$S(this.toString()).toArray$();	
 }
 if(cs=="utf-8"||cs=="utf8"){
  s=E.convert2UTF8(this);
 }
var arrs=[];
for(var i=0, ii=0;i<s.length;i++){
var c=s.charCodeAt(i);
if(c>255){
arrs[ii]=0x1a;
arrs[ii+1]=c&0xff;
arrs[ii+2]=(c&0xff00)>>8;
ii+=2;
}else{
arrs[ii]=c;
}
ii++;
}
return Clazz.array(Byte.TYPE, -1, arrs);
};

sp.contains$S = function(a) {return this.indexOf(a) >= 0}  // bh added
sp.compareTo$ = sp.compareTo$S = sp.compareTo$O = function(a){return this > a ? 1 : this < a ? -1 : 0} // bh
																										// added

sp.toCharArray$=function(){
	var result = this.split("");	
	return setArray(result, Character.TYPE, "CA", -1);
};

String.valueOf$ = String.valueOf$Z = String.valueOf$C = String.valueOf$CA 
				= String.valueOf$CA$I$I = String.valueOf$D = String.valueOf$F 
				= String.valueOf$I = String.valueOf$J = String.valueOf$O = 
function(o){
if(o=="undefined"){
return String.valueOf();
}
if(o instanceof Array){
if(arguments.length==1){
return o.join('');
}else{
var off=arguments[1];
var len=arguments[2];
var oo=new Array(len);
for(var i=0;i<len;i++){
oo[i]=o[off+i];
}
return oo.join('');
}
}
return (o != null && o.toString ? o.toString() : ""+o);
};

sp.subSequence$I$I=function(beginIndex,endIndex){
return this.substring(beginIndex,endIndex);
};

sp.contentEquals$CharSequence=sp.contentEquals$StringBuffer=function(cs){
	return cs && (cs.toString() == this);
};

sp.contains$CharSequence=function(cs){
if(cs==null)
  throw new NullPointerException();
return (this == cs || this.length > cs.length$() && this.indexOf(cs.toString()) > -1);
};

sp.contentEquals$CharSequence=function(cs){
if(cs==null)
  throw new NullPointerException();
if(this == cs)
 return true;
if(this.length!=cs.length$())
 return false;
var v=cs.getValue();
var n=this.length;
while(n-- >= 0){
  if(this.charCodeAt(n)!=v[n]){
    return false;
  }
}
return true;
};

sp.concat$S = function(s){
if(s==null){
throw new NullPointerException();
}
return this.concat(s);
};

sp.isEmpty$ = function() {
  return this.valueOf().length == 0;
}

sp.indexOf$S = sp.indexOf$S$I = sp.indexOf;
sp.lastIndexOf$S = sp.lastIndexOf;

sp.indexOf$I = function(c){
	return this.indexOf(typeof c == "string" ? c : String.fromCodePoint(c));
};

sp.indexOf$I$I = function(c, first) {
	return this.indexOf(typeof c == "string" ? c : String.fromCodePoint(c), first);
}

sp.lastIndexOf$S = sp.lastIndexOf$S$I = sp.lastIndexOf;

sp.lastIndexOf$I = function(c){
	return this.lastIndexOf(typeof c == "string" ? c : String.fromCodePoint(c));
};

sp.lastIndexOf$I$I = function(c, last) {
	return this.lastIndexOf(typeof c == "string" ? c : String.fromCodePoint(c), last);
}

sp.intern$=function(){
return this.valueOf();
};

String.copyValueOf$S=String.copyValueOf$S$I$I=sp.copyValueOf=function(){
  if(arguments.length==1){
  return String.instantialize(arguments[0]);
  }else{
  return String.instantialize(arguments[0],arguments[1],arguments[2]);
  }
};

sp.$c = function(){return this.charCodeAt(0)};

// covers for same functions in JavaScript
sp.codePointAt$I = (sp.codePointAt || sp.charCodeAt); // MSIE only
sp.charCodeAt$I = sp.charCodeAt;
sp.charAt$I = sp.charAt;
sp.substring$I = sp.substring$I$I = sp.subSequence$I$I = sp.substring;
sp.replace$C$C = sp.replace$CharSequence$CharSequence = sp.replace$;
sp.toUpperCase$ = sp.toUpperCase;
sp.toLowerCase$ = sp.toLowerCase;
sp.toLowerCase$java_util_Locale = sp.toLocaleLowerCase ? function(loc) {loc = loc.toString(); var s = this.valueOf(); return (loc ? s.toLocaleLowerCase(loc.replace(/_/g,'-')) : s.toLocaleLowerCase()) } : sp.toLowerCase;
sp.toUpperCase$java_util_Locale = sp.toLocaleUpperCase ? function(loc) {loc = loc.toString(); var s = this.valueOf(); return (loc ? s.toLocaleUpperCase(loc.replace(/_/g,'-')) : s.toLocaleUpperCase()) } : sp.toUpperCase;
sp.length$ = function() {return this.length};
sp.trim$ = function() {
  var s = this.trim();
  var j;
  if (s == "" || s.charCodeAt(j = s.length - 1) > 32 && s.charCodeAt(0) > 32) return s;
  var i = 0;
  while (i <= j && s.charCodeAt(i) <= 32)i++;
  while (j > i && s.charCodeAt(j) <= 32)j--;
  return s.substring(i, ++j);
};


// toString is always unqualified, and it is unnecessary for String


})(String.prototype);

// Note that of all these constructors, only new String("xxx") and new
// String(new String())
// return actual JavaScript String objects (as of 3.2.9.v1)

String.instantialize=function(){
var x=arguments[0];
switch (arguments.length) {
case 0:
  return new String();
case 1:
  // String(byte[] bytes)
  // String(char[] value)
  // String(StringBuffer buffer)
  // String(StringBuilder builder)
  // String(String original)
  if (x.__BYTESIZE){
    return x.length == 0 ? "" : E.readUTF8Array(x, 0, x.length).toString();
  }
  if (x instanceof Array){
	    return x.length == 0 ? "" : typeof x[0]=="number" ? E.readUTF8Array(new Uint8Array(x), 0, x.length).toString() : x.join('');
  }
  // raw JavaScript string unless new String(string)
  return (typeof x == "string" ||  x instanceof String ? new String(x) : x.toString());
case 2:  
  // String(byte[] ascii, int hibyte)
  // String(char[] value, boolean share) ???
  // String(byte[] bytes, Charset charset)
  // String(byte[] bytes, String charsetName)

  var a1=arguments[1];
  return (typeof a1=="number" ? String.instantialize(x,a1,0,x.length) 
	: typeof a1 == "boolean" ? x.join('') 
    : String.instantialize(x,0,x.length,a1.toString()));
case 3:
  // String(byte[] bytes, int offset, int length)
  // String(char[] value, int offset, int count)
  // String(int[] codePoints, int offset, int count)

  var bytes=x;
  var offset=arguments[1];
  var length=arguments[2];
  if(offset<0||length+offset>bytes.length){
	    throw new IndexOutOfBoundsException();
  }
  if (length == 0)
	  return "";
  var arr=new Array(length);
  var isChar=!!bytes[offset].length;
  if(isChar){
      for(var i=0;i<length;i++){
        arr[i]=bytes[offset+i];
      }
  }else{
      for(var i=0;i<length;i++){
        arr[i]=String.fromCharCode(bytes[offset+i]);
      }
  }
  return arr.join('');
case 4:
  // String(byte[] bytes, int offset, int length, Charset charset)
  // String(byte[] bytes, int offset, int length, String charsetName)
  // String(byte[] ascii, int hibyte, int offset, int count)

  var bytes=x;
  var cs=arguments[3];
  if(typeof cs != "number"){
    var offset=arguments[1];
    var length=arguments[2];
    if (typeof cs == "string") {
    	if (",utf8,utf-8,".indexOf("," + cs.toLowerCase() + ",") >= 0)
    		return E.readUTF8Array(bytes,offset,length).toString();
    	cs = Clazz.loadClass("java.nio.charset.Charset").forName$S(cs);
    	if (!cs)
    		throw new java.io.UnsupportedEncodingException();
    }
    return cs.decode$BA$I$I(bytes, offset, length).toString();
  }
  var count=arguments[3];
  var offset=arguments[2];
  var hibyte=arguments[1];
  var value=new Array(count);
  if(hibyte==0){
    for(var i=count;i-->0;){
      value[i]=String.fromCharCode(bytes[i+offset]&0xff);
    }
  }else{
    hibyte<<=8;
    for(var i=count;i-->0;){
      value[i]=String.fromCharCode(hibyte|(bytes[i+offset]&0xff));
    }
  }
  return value.join('');
default:
  // ????
  var s="";
  for(var i=0;i<arguments.length;i++){
    s+=arguments[i];
  }
  return s;
}
};

}

})(Clazz._Encoding);

String.copyValueOf$CA$I$I = function(data,offset,count) {
 var s = "";
 for (var pt = offset, n = offset+count;pt < n;pt++)s += data[pt];
 return s;
}
String.copyValueOf$CA = function(data) {
 return sp.copyValueOf$CA$I$I(data, 0, data.length);
}

// Java8
String.join$CharSequence$CharSequenceA = function(sep,array) {
 var ret = "";
 var s = "";
 for (var i = 0; i < array.length; i++) {
	ret += s + array[i].toString();
	s || (s = sep);	
 }
 return ret;
}

// Java8
String.join$CharSequence$Iterable = function(sep,iterable) {
 var ret = "";
 var s = "";
 var iter = iterable.iterator$();
 while (iter.hasNext$()) {
	ret += s + iter.next$().toString();
	s || (s = sep);	
 }
 return ret;
}
 
var C$=Clazz.newClass(java.lang,"Character",function(){
if (arguments[0] === null || typeof arguments[0] != "object")this.c$(arguments[0]);
},null,[java.io.Serializable,Comparable]);
Clazz._setDeclared("Character", java.lang.Character); 
setJ2STypeclass(Character, "char", "C");

var unicode_txt="";

m$(C$,"getName$I",
function(codePoint){
	if (!unicode_txt) {
		try {
			unicode_txt = J2S.getFileData(ClassLoader.getClasspathFor("java.lang",1)  + "org/unicode/public/unidata/NamesList.txt");
		} catch (e) {
			return "??";
		}
	}
	var code = "0000" + Integer.toHexString$I(codePoint);
	code = code.substring(code.length - 4).toUpperCase();
	var pt = unicode_txt.indexOf("\n" + code + "\t");
	if (pt < 1)
		return "\\u" + code;
	var pt1 = unicode_txt.indexOf("\n", pt + 1);
	return (pt1 < 0 ? "??" : unicode_txt.substring(pt + 6, pt1));
}, 1);

m$(C$,"valueOf$C",function(c){
        return (c <= '\u007F' ? getCachedNumber(c, chars, Character, "c$$C")
        		: Clazz.new_(Character.c$$C, [c]));
},1);

C$.prototype.$c = function(){return this.value.charCodeAt(0)};


m$(C$,["c$", "c$$C"],
function(value){
this.value=value;
this.valueOf=function(){return value};
}, 1);

m$(C$,["charValue", "charValue$"],
function(){
return this.value;
});

m$(C$,"hashCode$",
function(){
return(this.value).charCodeAt(0);
});
m$(C$,"equals$O",
function(obj){
if(Clazz.instanceOf(obj,Character)){
return this.value.charCodeAt(0)==obj.value.charCodeAt(0);
}return false;
});

m$(C$, "$box$", function(c) {
	return Character.valueOf$C(typeof c == "string" ? c : String.fromCharCode(c));
});

m$(C$, "$incr$",function(n){return this.$box$(this.value.charCodeAt(0) + n);});


m$(C$,"charCodeAt$I",
function(i){
return(this.value).charCodeAt(i);
});
m$(C$,"isValidCodePoint$I",
function(i){
	try {
	String.fromCodePoint(i);
	return true;
	} catch(e) {
	return false;
	}
});

m$(C$,["compareTo$C","compareTo$","compareTo$O"],
function(c){
return(this.value).charCodeAt(0)-(c.value).charCodeAt(0);
});
m$(C$,"toLowerCase$C",
function(c){
return(""+c).toLowerCase().charAt(0);
}, 1);
m$(C$,"toTitleCase$C",
function(c){
  return Character.toUpperCase$C(c);
}, 1);
m$(C$,"toUpperCase$C",
function(c){
return(""+c).toUpperCase().charAt(0);
}, 1);
m$(C$,"toLowerCase$I",
function(i){
return String.fromCodePoint(i).toLowerCase().codePointAt(0);
}, 1);
m$(C$,"toTitleCase$I",
function(i){
return String.fromCodePoint(i).toTitleCase().codePointAt(0);
}, 1);
m$(C$,"toUpperCase$I",
function(i){
return String.fromCodePoint(i).toUpperCase().codePointAt(0);
}, 1);
m$(C$,["isDigit$C","isDigit$I"],
function(c){
	if (typeof c == "string")
		c = c.charCodeAt(0);
return (48 <= c && c <= 57);
}, 1);

m$(C$,["isISOControl$C", "isISOControl$I"],
function(c){
if (typeof c == "string")
  c = c.charCodeAt(0);
return (c < 0x1F || 0x7F <= c && c <= 0x9F);
}, 1);


m$(C$,"isAlphabetic$I", function(c){return Character.isLetter$I(c)}, 1);

// A character may be part of a Java identifier if any of the following are
// true:
//
// it is a letter
// it is a currency symbol (such as '$')
// it is a connecting punctuation character (such as '_')
// it is a digit
// it is a numeric letter (such as a Roman numeral character)
// it is a combining mark
// it is a non-spacing mark
// isIdentifierIgnorable returns true for the character
    
    
m$(C$,["isJavaIdentifierStart$C","isJavaIdentifierStart$I"],
		function(c){
	if (typeof c == "string")
		c = c.charCodeAt(0);
	// letter, $, _,
	return Character.isLetter$I(c) || c == 0x24 || c == 0x5F
		}, 1);


m$(C$,["isJavaIdentifierPart$C","isJavaIdentifierPart$I"],
		function(c){
	if (typeof c == "string")
		c = c.charCodeAt(0);
	// letter, digit $, _,
	return Character.isLetterOrDigit$I(c) || c == 0x24 || c == 0x5F
		}, 1);


m$(C$,["isLetter$C", "isLetter$I"],
function(c){
if (typeof c == "string")
  c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122);
}, 1);
m$(C$,["isLetterOrDigit$C","isLetterOrDigit$I"],
function(c){
if (typeof c == "string")
  c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122 || 48 <= c && c <= 57);
}, 1);
m$(C$,["isLowerCase$C","isLowerCase$I"],
function(c){
if (typeof c == "string")
    c = c.charCodeAt(0);
return (97 <= c && c <= 122);
}, 1);
m$(C$,"isSpace$C",
function(c){
 var i = c.charCodeAt(0);
 return (i==0x20||i==0x9||i==0xA||i==0xC||i==0xD);
}, 1);
m$(C$,["isSpaceChar$C","isSpaceChar$I"],
function(c){
 var i = (typeof c == "string" ? c.charCodeAt(0) : c);
if(i==0x20||i==0xa0||i==0x1680)return true;
if(i<0x2000)return false;
return i<=0x200b||i==0x2028||i==0x2029||i==0x202f||i==0x3000;
}, 1);
m$(C$,["isTitleCase$C","isTitleCase$I"],
function(c){
  return Character.isUpperCase$C(c);
}, 1);
m$(C$,["isUpperCase$C","isUpperCase$I"],
function(c){
if (typeof c == "string")
  c = c.charCodeAt(0);
return (65 <= c && c <= 90);
}, 1);
m$(C$,["isWhitespace$C","isWhitespace$I"],
function(c){
if (typeof c == "string")
 c = c.charCodeAt(0);
return (c >= 0x1c && c <= 0x20 || c >= 0x9 && c <= 0xd || c == 0x1680
  || c >= 0x2000 && c != 0x2007 && (c <= 0x200b || c == 0x2028 || c == 0x2029 || c == 0x3000));
}, 1);
m$(C$,"isSurrogate$C", function(c) {
	c = c.charCodeAt(0);
	return c >= 0xd800 && c < 0xe000;
	
}, 1);
m$(C$,"isHighSurrogate$C", function(c) {
	c = c.charCodeAt(0);
	return c >= 0xd800 && c < 0xdc00;
	
}, 1);
m$(C$,"isLowSurrogate$C", function(c) {
	c = c.charCodeAt(0);
	return c >= 0xdc00 && c < 0xe000;
	
}, 1);

m$(C$,["digit$C$I","digit$I$I"],
function(c,radix){
var i = (typeof c == "string" ? c.charCodeAt(0) : c);
if(radix >= 2 && radix <= 36){
  if(i < 128){
    var result = -1;
    if(48 <= i && i <= 57){
    result = i - 48;
    }else if(97 <= i && i <= 122){
    result = i - 87;
    }else if(65 <= i && i <= 90){
    result=i-(55);
    }
    return (result < radix ? result : -1);
  }
}
return -1;
}, 1);

m$(C$,"toString$C", function(c) {
	return c;
}, 1);

m$(C$,"toString",
function(c){
if (arguments.length == 0) {
  if(this===Character){
    return"class java.lang.Character";
  }
  var buf=[this.value];
  return String.valueOf$(buf);
}
return String.valueOf$(c);
}, 1);
m$(C$,"charCount$I", function(codePoint){
  return codePoint >= 0x010000 ? 2 : 1;
}, 1);


Integer.compare$I$I = 
Byte.compare$B$B =
Short.compare$H$H =
Float.compare$F$F =
Double.compare$D$D = function(a,b) { return (a < b ? -1 : a == b ? 0 : 1) };

Integer.prototype.objectValue$ = 
Byte.prototype.objectValue$ = 
Short.prototype.objectValue$ = 
Long.prototype.objectValue$ =  
Float.prototype.objectValue$ = 
Boolean.prototype.objectValue$ = 
Double.prototype.objectValue$ =  function() {return this.valueOf()};

Character.prototype.objectValue$ = function() { return this.value };

Character.prototype.intValue$  = function() { return this.value.codePointAt(0) };

Integer.min$I$I = Long.min$J$J = Float.min$F$F = Double.min$D$D = 	function(a,b) { return Math.min(a,b); };

Integer.max$I$I = Long.max$J$J = Float.max$F$F = Double.max$D$D = 	function(a,b) { return Math.max(a,b); };

Integer.sum$I$I = Long.sum$J$J = Float.sum$F$F = Double.sum$D$D = 		function(a,b) { return a + b; };


// TODO: Only asking for problems declaring Date. This is not necessary

// NOTE THAT java.util.Date, like java.lang.Math, is unqualified by the
// transpiler -- this is NOT necessary

;(function() {

Clazz._setDeclared("java.util.Date", java.util.Date=Date);
// Date.TYPE="java.util.Date";
Date.__CLASS_NAME__="Date";
addInterface(Date,[java.io.Serializable,java.lang.Comparable]);

Date.parse$S = Date.parse;

m$(java.util.Date, ["c$", "c$$S", "c$$J"], function(t) {
  this.setTime$J(typeof t == "string" ? Date.parse(t) : t ? t : System.currentTimeMillis$())
}, 1);

m$(java.util.Date, ["getClass$", "getClass"], function () { return Clazz.getClass(this); }, 1);

m$(java.util.Date,["clone$","clone"],
function(){
return new Date(this.getTime());
});

m$(java.util.Date,["before", "before$java_util_Date"],
function(when){
return this.getTime()<when.getTime();
});
m$(java.util.Date,["after", "after$java_util_Date"],
function(when){
return this.getTime()>when.getTime();
});

m$(java.util.Date,["equals","equals$O"],
function(obj){
return Clazz.instanceOf(obj,java.util.Date)&&this.getTime()==(obj).getTime();
});
m$(java.util.Date,["compareTo","compareTo$java_util_Date","compareTo$","compareTo$O","compareTo$O"],
function(anotherDate){
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
});
m$(java.util.Date,["hashCode","hashCode$"],
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});

Date.prototype.toString$ = Date.prototype.toString$$ = Date.prototype.toString;
m$(java.util.Date,"toString",
function(){
var a = this.toString$().split(" ");
// Sun Mar 10 1996 17:05:00 GMT-0600 (Central Daylight Time) -> Sun Mar 10
// 16:05:00 CST 1996
return a[0] + " " + a[1] + " " + a[2] + " " + a[4] + " " + a[5] + " " + a[3];
// return this.toString$().split("(")[0].trim();
});
})();

var notImplemented = function(why) {return function() {System.err.println(why + " has not been implemented.")}};

;(function(dp){
dp.from$java_time_Instant = notImplemented("Date.from(java.time.Instant)");
dp.setInstant$ = notImplemented("Date.toInstant()");

dp.getDate$ = dp.getDate;
dp.getDay$ = dp.getDay;
dp.getHours$ = dp.getHours;
dp.getMinutes$ = dp.getMinutes;
dp.getMonth$ = dp.getMonth;
dp.getSeconds$ = dp.getSeconds;
dp.getTime$ = dp.getTime;
dp.getTimeZoneOffset$ = dp.getTimeZoneOffset;
dp.getYear$ = dp.getYear;
dp.parse$S = dp.parse;
dp.setDate$I = dp.setDate;
dp.setHours$I = dp.setHours;
dp.setMinutes$I = dp.setMinutes;
dp.setMonth$I = dp.setMonth;
dp.setSeconds$I = dp.setSeconds;
dp.setTime$J = dp.setTime;
dp.setYear$I = dp.setYear;
dp.toGMTString$ = dp.toUTCString || dp.toGMTString;
dp.toLocaleString$ = dp.toLocaleString = dp.toLocaleDateString;
dp.UTC$ = dp.UTC;


	
})(Date.prototype);

var printStackTrace = function(e, ps) {
	  ps.println$O("" + e);
	  if (e.stackTrace){
		 for (var i = 0; i < e.stackTrace.length; i++) {
		  var t = e.stackTrace[i];
		  if (t.nativeClazz == null || !isInstanceOf(t.nativeClazz, Throwable)) {
		   ps.println$O(t);
		  }
	     }
	  }
	  if (e.stack) {
		  var S = e.stack.split("\n");
		  for (var i = 0; i < S.length; i++) {
			  if (S[i].indexOf("__startAppletJS") >= 0)
				  break;
			  ps.println$O(S[i]);	  
		  }
	  }
}

var C$ = Clazz.newClass(java.lang, "Throwable", function () {
Clazz.newInstance(this, arguments);
}, null, java.io.Serializable);

m$(C$, 'c$', function () {
this.fillInStackTrace$();
this.detailMessage = this.stack;
this.cause = this;
}, 1);

m$(C$, 'c$$S', function (message) {
this.fillInStackTrace$();
this.cause = this;
this.detailMessage = message;
}, 1);

m$(C$, 'c$$S$Throwable', function (message, cause) {
this.fillInStackTrace$();
this.detailMessage = message;
this.cause = cause;
}, 1);

m$(C$, 'c$$Throwable', function (cause) {
this.fillInStackTrace$();
this.detailMessage = (cause == null ? this.stack : cause.toString ());
this.cause = cause;
}, 1);

m$(C$, 'getMessage$', function () {return this.message || this.detailMessage || null});

m$(C$, 'getLocalizedMessage$', function () {
return this.getMessage$();
});

m$(C$, 'getCause$', function () {
return (this.cause === this ? null : this.cause);
});

m$(C$, 'initCause$Throwable', function (cause) {
if (this.cause !== this) throw Clazz.new_(IllegalStateException.c$$S,["Can't overwrite cause"]);
if (cause === this) throw Clazz.new_(IllegalArgumentException.c$$S,["Self-causation not permitted"]);
this.cause = cause;
return this;
});

m$(C$, 'toString', function () {
var s = this.getClass$().getName$();
var message = this.getLocalizedMessage$();
return (message != null) ? (s + ": " + message) : s;
});

m$(C$, 'getStackTrace$', function () {
return this.stackTrace;
});

m$(C$, 'printStackTrace$', function () {
	printStackTrace(this, System.err);
});

m$(C$, 'printStackTrace$java_io_PrintWriter', function (writer) {
	printStackTrace(this, writer);
});

m$(C$, ['printStackTrace$java_io_PrintStream','printStackTrace$java_io_PrintWriter'], function (stream) {
  printStackTrace(this, stream);
});

Clazz.newMeth(C$, 'fillInStackTrace$', function () {
this.stackTrace = Clazz.array(StackTraceElement);
try {
var caller = arguments.callee.caller;
var i = 0;
while (caller.caller && caller.caller.name != "__loadClazz") {
	caller = caller.caller;
	if (++i > 2 && caller.exClazz || caller == Clazz.load)
		break;
}
var superCaller = null;
var callerList = [];
var index = 0;
while (index < 20 && caller != null) {
  index++;
  var clazzName = null;
  var nativeClazz = null;
  superCaller = caller;
  if (superCaller.exClazz == null) {
	  if (superCaller.j2sname ==  "__START_APPLET__")
		  break;
  } else {
    nativeClazz = superCaller.exClazz;
  }
  var st =Clazz.new_(StackTraceElement.c$, [
    ((nativeClazz != null && nativeClazz.__CLASS_NAME__.length != 0) ?
    nativeClazz.__CLASS_NAME__ : "anonymous"),
    ((superCaller.exName == null) ? "anonymous" : superCaller.exName),
    null, -1]);    
  st.nativeClazz = nativeClazz;
  this.stackTrace.push(st);
  for (var i = 0; i < callerList.length; i++) {
    if (callerList[i] == superCaller) {
      // ... stack Information lost as recursive invocation existed ...
      var st =Clazz.new_(StackTraceElement.c$, ["lost", "missing", null, -3]);
      st.nativeClazz = null;
      this.stackTrace.push(st);
      index = 100;
      break;
    }
  }
  if (superCaller != null) {
    callerList.push(superCaller);
  }
  caller = (superCaller && superCaller.arguments && superCaller.arguments.callee) ? superCaller.arguments.callee.caller : null;
}
} catch (e) {};

Clazz.initializingException = false;
return this;
});

Clazz.newMeth(C$, 'setStackTrace$StackTraceElementA', function (stackTrace) {
var defensiveCopy = stackTrace.clone$();
for (var i = 0; i < defensiveCopy.length; i++) if (defensiveCopy[i] == null) throw Clazz.new_(NullPointerException.c$$S,["stackTrace[" + i + "]"]);

this.stackTrace = defensiveCopy;
});

C$=Clazz.newClass(java.lang,"StackTraceElement",function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
},null,java.io.Serializable);

m$(C$, "c$",function(cls,method,file,line){
if(cls==null||method==null){
throw new NullPointerException();
}this.declaringClass=cls;
this.methodName=method;
this.fileName=file;
this.lineNumber=line;
},1);

m$(C$,"equals$O",
function(obj){
if(!(Clazz.instanceOf(obj,StackTraceElement))){
return false;
}var castObj=obj;
if((this.methodName==null)||(castObj.methodName==null)){
return false;
}if(!this.getMethodName$().equals(castObj.getMethodName$())){
return false;
}if(!this.getClassName$().equals(castObj.getClassName$())){
return false;
}var localFileName=this.getFileName$();
if(localFileName==null){
if(castObj.getFileName$()!=null){
return false;
}}else{
if(!localFileName.equals(castObj.getFileName$())){
return false;
}}if(this.getLineNumber$()!=castObj.getLineNumber$()){
return false;
}return true;
});
m$(C$,"getClassName$",
function(){
return(this.declaringClass==null)?"<unknown class>":this.declaringClass;
});
m$(C$,"getFileName$",
function(){
return this.fileName;
});
m$(C$,"getLineNumber$",
function(){
return this.lineNumber;
});
m$(C$,"getMethodName$",
function(){
return(this.methodName==null)?"<unknown method>":this.methodName;
});
m$(C$,"hashCode$",
function(){
if(this.methodName==null){
return 0;
}return this.methodName.hashCode$()^this.declaringClass.hashCode();
});
m$(C$,"isNativeMethod$",
function(){
return this.lineNumber==-2;
});
m$(C$,"toString",
function(){
var s = this.getClassName$() + "." + this.getMethodName$();
if(this.isNativeMethod$()){
 s += "(Native Method)";
}else{
var fName=this.getFileName$();
if(fName==null){
 //s += "(Unknown Source)";
}else{
var lineNum=this.getLineNumber$();
s += '(' + fName;
if(lineNum>=0){
 s += ':' + lineNum;
}
 s += ')';
}}return s;
});


TypeError.prototype.getMessage$ || (
		
SyntaxError.prototype.getMessage$ 
  = ReferenceError.prototype.getMessage$ 
  = TypeError.prototype.getMessage$ 
  = SyntaxError.prototype.getLocalizedMessage$ 
  = ReferenceError.prototype.getLocalizedMessage$ 
  = TypeError.prototype.getLocalizedMessage$ 
			= function(){ return (this.stack ? this.stack : this.message || this.toString()) + (this.getStackTrace ? this.getStackTrace$() : Clazz._getStackTrace())});

TypeError.prototype.getStackTrace$ 
= SyntaxError.prototype.getStackTrace$ 
= ReferenceError.prototype.getStackTrace$ 
= function() { return Clazz._getStackTrace() }
TypeError.prototype.printStackTrace$ 
= SyntaxError.prototype.printStackTrace$ 
= ReferenceError.prototype.printStackTrace$ 
= function() { printStackTrace(this,System.err) }
ReferenceError.prototype.printStackTrace$java_io_PrintStream 
= TypeError.prototype.printStackTrace$java_io_PrintStream 
= SyntaxError.prototype.printStackTrace$java_io_PrintStream 
= function(stream){stream.println$S(this + "\n" + this.stack);};
ReferenceError.prototype.printStackTrace$java_io_PrintWriter 
= TypeError.prototype.printStackTrace$java_io_PrintWriter 
= SyntaxError.prototype.printStackTrace$java_io_PrintWriter 
= function(printer){printer.println$S(this + "\n" + this.stack);};

Clazz.Error = Error;

var declareType = function(prefix, name, clazzSuper, interfacez) {
  var cl = Clazz.newClass(prefix, name, null, clazzSuper, interfacez);
  if (clazzSuper)
    setSuperclass(cl, clazzSuper);
  return cl;
};

// at least allow Error() by itself to work as before
Clazz._Error || (Clazz._Error = Error);
// setSuperclass(Clazz._Error, Throwable);

var setEx = function(C$) {
 C$.$clinit$ = 1;
 m$(C$, "c$", function() { C$.superclazz.c$.apply(this, []);}, 1);
 m$(C$, "c$$S", function(detailMessage){C$.superclazz.c$$S.apply(this,[detailMessage]);},1);
 m$(C$, "c$$Throwable", function(exception){C$.superclazz.c$$Throwable.apply(this, arguments);}, 1);
 m$(C$, "c$$S$Throwable", function(detailMessage,exception){C$.superclazz.c$$S$Throwable.apply(this, arguments);
}, 1);

 return C$;
}

/*
;(function() {
var C$ = Clazz.newClass(java.lang, "Error", function (){
return Clazz._Error();
}, Throwable);
setEx(C$);
})();
*/
var newEx = function(prefix, name, clazzSuper) {
  return setEx(declareType(prefix, name, clazzSuper));
}

newEx(java.lang,"Exception",Throwable);
newEx(java.lang,"Error",Throwable);

newEx(java.lang,"RuntimeException",Exception);
newEx(java.lang,"IllegalArgumentException",RuntimeException);
newEx(java.lang,"LinkageError",Error);
newEx(java.lang,"VirtualMachineError",Error);
newEx(java.lang,"IncompatibleClassChangeError",LinkageError);

newEx(java.lang,"AbstractMethodError",IncompatibleClassChangeError);
newEx(java.lang,"ArithmeticException",RuntimeException);
newEx(java.lang,"ArrayStoreException",RuntimeException);
newEx(java.lang,"ClassCircularityError",LinkageError);
newEx(java.lang,"ClassFormatError",LinkageError);
newEx(java.lang,"CloneNotSupportedException",Exception);
newEx(java.lang,"ReflectiveOperationException",Exception);
newEx(java.lang,"IllegalAccessError",IncompatibleClassChangeError);
newEx(java.lang,"IllegalAccessException",ReflectiveOperationException);
newEx(java.lang,"IllegalMonitorStateException",RuntimeException);
newEx(java.lang,"IllegalStateException",RuntimeException);
newEx(java.lang,"IllegalThreadStateException",IllegalArgumentException);
newEx(java.lang,"IndexOutOfBoundsException",RuntimeException);
newEx(java.lang,"InstantiationError",IncompatibleClassChangeError);
newEx(java.lang,"InstantiationException",ReflectiveOperationException);
newEx(java.lang,"InternalError",VirtualMachineError);
newEx(java.lang,"InterruptedException",Exception);
newEx(java.lang,"NegativeArraySizeException",RuntimeException);
newEx(java.lang,"NoClassDefFoundError",LinkageError);
newEx(java.lang,"NoSuchFieldError",IncompatibleClassChangeError);
newEx(java.lang,"NoSuchFieldException",ReflectiveOperationException);
newEx(java.lang,"NoSuchMethodException",ReflectiveOperationException);
newEx(java.lang,"NoSuchMethodError",IncompatibleClassChangeError);
newEx(java.lang,"NullPointerException",RuntimeException);

;(function(){

var C$=Clazz.newClass(java.lang, "NumberFormatException", null, 'IllegalArgumentException');

C$.$clinit$=2;

Clazz.newMeth(C$, '$init$', function () {
},1);

Clazz.newMeth(C$, 'c$', function () {
;C$.superclazz.c$.apply(this,[]);C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$S', function (s) {
;C$.superclazz.c$$S.apply(this,[s]);C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'forInputString$S', function (s) {
return Clazz.new_(C$.c$$S,["For input string: \"" + s + "\"" ]);
}, 1);
})();

newEx(java.lang,"OutOfMemoryError",VirtualMachineError);
newEx(java.lang,"SecurityException",RuntimeException);
newEx(java.lang,"StackOverflowError",VirtualMachineError);
newEx(java.lang,"ThreadDeath",Error);
newEx(java.lang,"UnknownError",VirtualMachineError);
newEx(java.lang,"UnsatisfiedLinkError",LinkageError);
newEx(java.lang,"UnsupportedClassVersionError",ClassFormatError);
newEx(java.lang,"UnsupportedOperationException",RuntimeException);
newEx(java.lang,"VerifyError",LinkageError);

newEx(java.lang,"ClassCastException",RuntimeException);

;(function() {
var C$=Clazz.newClass(java.lang,"ClassNotFoundException",function(){this.ex=null;},Exception);
m$(C$, "c$$S$Throwable", function(detailMessage,exception){
C$.superclazz.c$$S$Throwable.apply(this, arguments);
this.ex=exception;
}, 1);
m$(C$,"getException$",
function(){
return this.ex;
});
m$(C$,"getCause$",
function(){
return this.ex;
});
})();

;(function() {
var C$=newEx(java.lang,"StringIndexOutOfBoundsException",IndexOutOfBoundsException);
m$(C$, "c$$I", function(index){
C$.superclazz.c$$S.apply(this,["String index out of range: "+index]);
}, 1);
})();

;(function() {
var C$=Clazz.newClass(java.lang.reflect,"InvocationTargetException",function(){this.target=null;},ReflectiveOperationException);
C$.$clinit$ = 2;
m$(C$, "c$$Throwable", function(exception){
C$.superclazz.c$$Throwable.apply(this, arguments);
this.target=exception;
}, 1);
m$(C$, "c$$Throwable$S", function(exception,detailMessage){
C$.superclazz.c$$S$Throwable.apply(this,[detailMessage,exception]);
this.target=exception;
}, 1);
m$(C$,"getTargetException$",
function(){
return this.target;
});
m$(C$,"getCause$",
function(){
return this.target;
});
})()

;(function(){
var C$=Clazz.newClass(java.lang.reflect,"UndeclaredThrowableException",function(){this.undeclaredThrowable=null;},RuntimeException);
C$.$clinit$ = 2;
m$(C$, "c$$Throwable", function(exception){
Clazz.super_(C$, this);
C$.superclazz.c$$Throwable.apply(this, arguments);
this.undeclaredThrowable=exception;
this.initCause(exception);
},1);
m$(C$, "c$$Throwable$S", function(exception,detailMessage){
C$.superclazz.c$$S.apply(this,[detailMessage]);
this.undeclaredThrowable=exception;
this.initCause(exception);
},1);
m$(C$,"getUndeclaredThrowable$",
function(){
return this.undeclaredThrowable;
});
m$(C$,"getCause$",
function(){
return this.undeclaredThrowable;
});
})();

newEx(java.io,"IOException",Exception);
newEx(java.io,"CharConversionException",java.io.IOException);
newEx(java.io,"EOFException",java.io.IOException);
newEx(java.io,"FileNotFoundException",java.io.IOException);
newEx(java.io,"ObjectStreamException",java.io.IOException);
newEx(java.io,"SyncFailedException",java.io.IOException);
newEx(java.io,"UnsupportedEncodingException",java.io.IOException);
newEx(java.io,"UTFDataFormatException",java.io.IOException);

newEx(java.io,"InvalidObjectException",java.io.ObjectStreamException);
newEx(java.io,"NotActiveException",java.io.ObjectStreamException);
newEx(java.io,"NotSerializableException",java.io.ObjectStreamException);
newEx(java.io,"StreamCorruptedException",java.io.ObjectStreamException);

;(function() {
var C$=Clazz.newClass(java.io,"InterruptedIOException",function(){
this.bytesTransferred=0;
},java.io.IOException);
})();


;(function() {
var C$=Clazz.newClass(java.io,"InvalidClassException",function(){
this.classname=null;
},java.io.ObjectStreamException);

m$(C$, "c$$S$S", function(className,detailMessage){
C$.superclazz.c$$S.apply(this,[detailMessage]);
this.classname=className;
},1);

m$(C$,"getMessage$",
function(){
var msg=C$.superclazz.getMessage$.apply(this, []);
if(this.classname!=null){
msg=this.classname+';' + ' '+msg;
}return msg;
});
})();


;(function(){
var C$=Clazz.newClass(java.io,"OptionalDataException",function(){
this.eof=false;
this.length=0;
},java.io.ObjectStreamException);
})();

;(function() {
var C$=Clazz.newClass(java.io,"WriteAbortedException",function(){
this.detail=null;
},java.io.ObjectStreamException);

m$(C$, "c$$S$Throwable", function(detailMessage, rootCause){
C$.superclazz.c$$S.apply(this,[detailMessage]);
this.detail=rootCause;
this.initCause(rootCause);
}, 1);

m$(C$,"getMessage$",
function(){
var msg=C$.superclazz.getMessage.apply(this);
return (this.detail ? msg + "; "+this.detail.toString() : msg);
});
m$(C$,"getCause$",
function(){
return this.detail;
});
})();

newEx(java.util,"EmptyStackException",RuntimeException);
newEx(java.util,"NoSuchElementException",RuntimeException);
newEx(java.util,"TooManyListenersException",Exception);


;(function(){
var C$=newEx(java.util,"ConcurrentModificationException",RuntimeException);
m$(C$, "c$", function(detailMessage, rootCause){
Clazz.super_(C$, this);
}, 1);
})();

;(function(){
var C$=Clazz.newClass(java.util,"MissingResourceException",function(){
this.className=null;
this.key=null;
},RuntimeException);
C$.$clinit$ = 1;
m$(C$, "c$$S$S$S", function(detailMessage,className,resourceName){
Clazz.super_(C$, this);
C$.superclazz.c$$S.apply(this,[detailMessage]);
this.className=className;
this.key=resourceName;
}, 1);
m$(C$,"getClassName$",
function(){
return this.className;
});
m$(C$,"getKey$",
function(){
return this.key;
});
})();

declareType(java.lang,"Void");
setJ2STypeclass(java.lang.Void, "void", "V");
// java.lang.Void.TYPE=java.lang.Void;
// java.lang.V

Clazz.newInterface(java.lang.reflect,"GenericDeclaration");

Clazz.newInterface(java.lang.reflect,"InvocationHandler");

C$=Clazz.newInterface(java.lang.reflect,"Member");

C$=declareType(java.lang.reflect,"Modifier");
m$(C$, "c$", function(){}, 1);

m$(C$,"isAbstract$I",
function(modifiers){
return((modifiers&1024)!=0);
}, 1);
m$(C$,"isFinal$I",
function(modifiers){
return((modifiers&16)!=0);
}, 1);
m$(C$,"isInterface$I",
function(modifiers){
return((modifiers&512)!=0);
}, 1);
m$(C$,"isNative$I",
function(modifiers){
return((modifiers&256)!=0);
}, 1);
m$(C$,"isPrivate$I",
function(modifiers){
return((modifiers&2)!=0);
}, 1);
m$(C$,"isProtected$I",
function(modifiers){
return((modifiers&4)!=0);
}, 1);
m$(C$,"isPublic$I",
function(modifiers){
return((modifiers&1)!=0);
}, 1);
m$(C$,"isStatic$I",
function(modifiers){
return((modifiers&8)!=0);
}, 1);
m$(C$,"isStrict$I",
function(modifiers){
return((modifiers&2048)!=0);
}, 1);
m$(C$,"isSynchronized$I",
function(modifiers){
return((modifiers&32)!=0);
}, 1);
m$(C$,"isTransient$I",
function(modifiers){
return((modifiers&128)!=0);
}, 1);
m$(C$,"isVolatile$I",
function(modifiers){
return((modifiers&64)!=0);
}, 1);
m$(C$,"toString",
function(modifiers){
var sb=new Array(0);
if(java.lang.reflect.Modifier.isPublic(modifiers))sb[sb.length]="public";
if(java.lang.reflect.Modifier.isProtected(modifiers))sb[sb.length]="protected";
if(java.lang.reflect.Modifier.isPrivate(modifiers))sb[sb.length]="private";
if(java.lang.reflect.Modifier.isAbstract(modifiers))sb[sb.length]="abstract";
if(java.lang.reflect.Modifier.isStatic(modifiers))sb[sb.length]="static";
if(java.lang.reflect.Modifier.isFinal(modifiers))sb[sb.length]="final";
if(java.lang.reflect.Modifier.isTransient(modifiers))sb[sb.length]="transient";
if(java.lang.reflect.Modifier.isVolatile(modifiers))sb[sb.length]="volatile";
if(java.lang.reflect.Modifier.isSynchronized(modifiers))sb[sb.length]="synchronized";
if(java.lang.reflect.Modifier.isNative(modifiers))sb[sb.length]="native";
if(java.lang.reflect.Modifier.isStrict(modifiers))sb[sb.length]="strictfp";
if(java.lang.reflect.Modifier.isInterface(modifiers))sb[sb.length]="interface";
if(sb.length>0){
return sb.join(" ");
}return"";
}, 1);

var newMethodNotFoundException = function (clazz, method) {
  var message = "Method " + getClassName(clazz, true) + (method ? "." 
          + method : "") + " was not found";
  System.out.println(message);
  console.log(message);
  throw Clazz.new_(java.lang.NoSuchMethodException.c$$S, [message]);        
};

// if (needPackage("core"))
  // _Loader.loadPackage("core");


// Clazz._Loader.loadZJar(Clazz._Loader.getJ2SLibBase() +
// "core/coreswingjs.z.js", "swingjs.JSUtil");

  // if (!J2S._isAsync) {
if (!J2S._loadcore || J2S._coreFiles.length == 0) {
	if (J2S._verbose)System.out.println("Clazz: No core files to load -- check Info.core"); 
} else {  
  J2S.onClazzLoaded && J2S.onClazzLoaded(1, "Clazz loaded; loading J2S._coreFiles " + J2S._coreFiles.length);
  for (var i = 0; i < J2S._coreFiles.length; i++) {
	Clazz.loadScript(J2S._coreFiles[i]);
  }
  J2S.onClazzLoaded && J2S.onClazzLoaded(2, "Clazz loaded; core files loaded");
}

} // LoadClazz
})(J2S, window, document); 
