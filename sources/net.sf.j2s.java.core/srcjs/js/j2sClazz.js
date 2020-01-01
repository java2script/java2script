// j2sClazz.js 
// NOTE: updates to this file should be copies to j2sjmol.js

// latest author: Bob Hanson, St. Olaf College, hansonr@stolaf.edu

// NOTES by Bob Hanson

// Google closure compiler cannot handle Clazz.new or Clazz.super

// BH 2019.12.29 3.2.6 fixes Float.parseFloat$S("NaN") [and Double]
// BH 2019.12.23 3.2.6 update of System
// BH 2019.12.19 3.2.6 revision of $clinit$
// BH 2019.12.16 3.2.5.v4 adds ClassLoader static methods for system resources (just j2s/...)
// BH 2019.12.15 3.2.5.v4 Character.prototype.valueOf() missing 
// BH 2019.12.14 3.2.5.v3 Clazz._4Name initialization should be full static initialization 

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
/*******
 * @author zhou renjian
 * @create Nov 5, 2005
 *******/
 

// encapsulating function

;(function(J2S, window, document) {

  if (J2S.clazzLoaded) return;
  J2S.clazzLoaded = true;
		  
  // at least for now:

  var setWindowValue = function(a, v) { window[a] = v; }
  var getWindowValue = function(a) { return window[a] }
  
  
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


//////// 16 methods called from code created by the transpiler ////////

var getArrayClass = function(name){
	// "[C"  "[[C"
	var n = 0;
	while (name.charAt(n) == "[") n++;
	var type = name.substring(n);
	var clazz = (type.length == 1 ? primTypes[type].TYPE : Clazz._4Name(type.split(";")[0].substring(1)).$clazz$); 
	return Clazz.array(clazz,-n);
}

Clazz.array = function(baseClass, paramType, ndims, params, isClone) {
	
	var t0 = (_profileNew ? window.performance.now() : 0);

	var ret = _array.apply(null, arguments);
	
	  _profileNew && addProfileNew(baseClass, t0 - window.performance.now() - 0.01);

	return ret;
}

var _array = function(baseClass, paramType, ndims, params, isClone) {
	

  // int[][].class Clazz.array(Integer.TYPE, -2)
  // new int[] {3, 4, 5} Clazz.array(Integer.TYPE, -1, [3, 4, 5])    
  // new int[][]{new int[] {3, 4, 5}, {new int[] {3, 4, 5}} 
  //     Clazz.array(Integer.TYPE, -2, Clazz.array(Integer.TYPE, -1, [3, 4, 5]), Clazz.array(Integer.TYPE, -1, [3, 4, 5]) )    
  // new int[3]          Clazz.array(Integer.TYPE, [3])
  // new int[3][3]       Clazz.array(Integer.TYPE, [3, 3])
  // new int[3][]        Clazz.array(Integer.TYPE, [3, null])
  // new char[3]         Clazz.array(Character.TYPE, [3])
  // new String[3]       Clazz.array(java.lang.String, [3])

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
    //   Array.newInstance(class, length), and 
    //   Array.newInstance(class, [dim1, dim2, dim3....])
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
      return _array(baseClass, prim + "A", (cl.__NDIM || 0) + 1, [ndims]);
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
      switch (prim) {
      case "B":
      case "H": // short
      case "I":
      case "L":
      case "F":
      case "D":
        initValue = 0;
        break;
      case "C": 
        initValue = '\0';
        break;
      case "Z":
        initValue = false;
        break;
      }
    }
    params.push(initValue);
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
    case "L":
      nbits = 32;
      break;
    case "F":
    case "D":
      nbits = 64;
      break;
    }  
  }
  return newTypedA(baseClass, params, nbits, (dofill ? ndims : -ndims), isClone);
}

Clazz.assert = function(clazz, obj, tf, msg) {
  if (!clazz.$_ASSERT_ENABLED_)return;
  var ok = true;
  try {
    ok = tf.apply(obj)
    if (!ok)
      msg = msg.apply(obj);  
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
Clazz.exceptionOf = function(e, clazz) {
  if (typeof clazz == "string")
    clazz = Clazz.load(clazz);
  if(e.__CLASS_NAME__)
    return Clazz.instanceOf(e, clazz);
  if (!e.getMessage) {
    e.getMessage = function() {return "" + e};
  }
  if (!e.printStackTrace$) {
    e.printStackTrace$ = function(){System.err.println$S(e + "\n" + this.stack)};
    e.printStackTrace$java_io_PrintStream = function(stream){
    	stream.println$S(e + "\n" + e.stack);
    };
    //alert(e + " try/catch path:" + Clazz._getStackTrace(-10));
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

Clazz.forName = function(name, initialize, loader, isQuiet) {
  // we need to consider loading a class from the path of the calling class. 
 var cl = null;
 if (loader) {
	try {
		isQuiet = true;
		var className = loader.baseClass.getName$(); // set in java.lang.Class.getClassLoader$()
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
 * Implements Java's keyword "instanceof" in JavaScript's way.
 * Also alows for obj to be a class itself 
 *
 * @param obj the object to be tested
 * @param clazz the class to be checked
 * @return whether the object is an instance of the class
 */
/* public */
Clazz.instanceOf = function (obj, clazz) {
  // allows obj to be a class already, from arrayX.getClass().isInstance(y)
  // unwrap java.lang.Class to JavaScript clazz using $clazz$
  if (typeof clazz == "string") {
    clazz = Clazz._getDeclared(clazz);
  } 
  if (obj == null || !clazz)
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
  if (obj.__ARRAYTYPE || clazz.__ARRAYTYPE)
    return (obj.__ARRAYTYPE == clazz.__ARRAYTYPE 
            || obj.__ARRAYTYPE && clazz.__ARRAYTYPE && obj.__NDIM == clazz.__NDIM 
               && isInstanceOf(obj.__BASECLASS, clazz.__BASECLASS)); 
  return (obj instanceof clazz || isInstanceOf(getClassName(obj, true), clazz, true));
};

var initStatic = function(cl, impls) {
	if (impls) {
	  	for (var i = 0; i < impls.length; i++) {
	  		initStatic(impls[i], impls[i].implementz);
	  	}
	} else if (cl.superclazz) {
			initStatic(cl.superclazz);
	}
	cl.$static$ && cl.$static$();
}

/**
 * Load a class by name or an array representing a nested list of inner classes.
 * Just finalize this class if from $clinit$. 
 */
Clazz.load = function(cName, from$clinit$) {
  if (!cName)
    return null;
  if (from$clinit$ == 1) {
    // C$.$clinit$ call to finalize all dependencies
	var cl = cName;
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
  } 
  if (from$clinit$ == 2) {
	// C$.$static$ to do static initialization
 	  if (cName.$load$) {
 		cName.$load$ = 0;
	    initStatic(cName, cName.$isInterface ? cName.implementz : 0);
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
  if (cName.__CLASS_NAME__)
    return Clazz._initClass(cName,1,1,0);
  // standard load of class by name
  if (cName.indexOf("Thread.") == 0)
    Clazz._4Name("java.lang.Thread", null, null, true)
  if (cName.indexOf("Thread") == 0)
    cName = "java.lang." + cName;
  return Clazz._4Name(cName, null, null, true);
}

//create  and $init0$
var initClass0 = function(c) {
	var fields = c.$fields$;
	var objects = fields && fields[0];
	createDefaults(c, objects, false);
	if (!fields)
		return;
	var statics = fields[1];
	if (statics && statics.length)
		createDefaults(c, statics, true);
}

//C$.$fields$=[
//['I',['test3','itype'],'S',['test1'],'O',['test2','java.util.List[]','test4','test.Test_','+test5']],
//['D',['d'],'F',['f'],'I',['itest1','itest2'],'S',['stest1']]
//]
var createDefaults = function(c, data, isStatic) {
	var a = getFields(c, data, true);
	if (isStatic) {
		for (var i = a.length; --i >= 0;) {
			c[a[i][0]] = a[i][1];
		}
	} else {
		c.$init0$ = 
			//(function(cs, a) {return 
			function(){
				var cs = c.superclazz;
				cs && cs.$init0$ && cs.$init0$.apply(this);
				for (var i = a.length; --i >= 0;){
					this[a[i][0]] = a[i][1];
				}
			};
//		})(c.superclazz, a);
	}
		
}

Clazz._getFieldNames = function(c, isStatic) {
	return (c.$fields$ ? getFields(c, c.$fields$[isStatic ? 1 : 0], 0) : []);
}

Clazz._getFieldTypes = function(c, isStatic) {
	return (c.$fields$ ? getFields(c, c.$fields$[isStatic ? 1 : 0], "types") : []);
}

var fieldTypes = "Integer;Float;Double;Character;Long;Byte;"
/**
 * Get correct default (0, '\0', null) or just 
 * return a list of names.
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
 * Create a new instance of a class. 
 * Accepts:
 *   a string  Clazz.new_("java.util.Hashtable")
 *   a clazz (has .__CLASS_NAME__ and a default contructor)
 *   a specific class constructor such as c$$S
 *   a constructor from a one class (c, anonymous constructor) and a class to create, cl   
 *   
 */
  
Clazz.new_ = function(c, args, cl) {
  if (!c)
    return new Clazz._O();
  var generics;
  var a = arguments;
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
  else if (typeof c == "string")
    return Clazz.new_(Clazz.load(c));
    
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

//var C$=Clazz.newClass(P$, 
//        "Test_Local$1", 
//		function(){Clazz.newInstance(this, arguments[0],1,C$);}, 
//         Clazz.load('test.Test_Local$1ReducingSink'), null, 1);
//

Clazz.newClass = function (prefix, name, clazz, clazzSuper, interfacez, type) { 
//  if (J2S._debugCore) {
//    var qualifiedName = (prefix ? (prefix.__PKG_NAME__ || prefix.__CLASS_NAME__) + "." : "") + name;
//    checkDeclared(qualifiedName, type);
//  }
  clazz || (clazz = function () {Clazz.newInstance(this,arguments,0,clazz)});  
  
  clazz.__NAME__ = name;
  // prefix class means this is an inner class, and $this$0 refers to the outer class. 
  // no prefix class but a super class that is an inner class, then $this$0 refers to its $this$0.  
  // there can be a conflict here. 
  prefix.__CLASS_NAME__ && (clazz.$this$0 = prefix.__CLASS_NAME__) || clazzSuper && clazzSuper.$this$0 && (clazz.$this$0 = clazzSuper.$this$0);

  
  clazz.$load$ = [clazzSuper, interfacez];
  clazz.$isEnum = clazzSuper == 'Enum';
  // get qualifed name, and for inner classes, the name to use to refer to this
  // class in the synthetic reference array b$[].

  var qName, bName;
  if (!prefix) {
    // e.g. Clazz.declareInterface (null, "ICorePlugin", org.eclipse.ui.IPlugin);
    qName = name;
    Clazz._setDeclared(name, clazz);
  } else if (prefix.__PKG_NAME__) {
    // e.g. Clazz.declareInterface (org.eclipse.ui, "ICorePlugin", org.eclipse.ui.IPlugin);
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

//  for (var i = minimalObjNames.length; --i >= 0;) {
//    var name = minimalObjNames[i]; 
//    clazz[name] = objMethods[name];
//  }
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
    // Just declaring a class, not creating an instance or doing field preparation.
    // That is, we are just generating the prototypes for this method using new superClass()
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
//	  if (args)
	clazz && Clazz._initClass(clazz,1,1,objThis);
    if ((!args || args.length == 0) && objThis.c$) {
    // allow for direct default call "new foo()" to run with its default constructor
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
  var clazz1 = getClazz(outerObj);
  if (clazz1 == outerObj) {
    outerObj = objThis;
  }

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
    // Inner class of an inner class must inherit all outer object references. Note that this 
    // can cause conflicts. For example, b$["java.awt.Component"] could refer to the wrong
    // object if I did this wrong.
    // 
    if (!b) {
      // the outer class is not itself an inner class - start a new map
      b = {};
      isNew = true;
    } else if (b["$ " + innerName]) {
      // this inner class is already in the map pointing to a different object. Clone the map.
      b = appendMap({},b);
      isNew = true;
    }
    // add all superclass references for outer object
    addB$Keys(clazz1, isNew, b, outerObj, objThis);
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


var addB$Keys = function(clazz, isNew, b, outerObj, objThis) {
  var cl = clazz;
  do {
    var key = getClassName(cl, true);
    if (!isNew && b[key])
      break;
    b[key] = outerObj; 
    if (key.indexOf("java.lang.") == 0)
    	b[key.substring(10)] = outerObj;
  if (cl.implementz) {
  	var impl = cl.implementz;
  	for (var i = impl.length; --i >= 0;) {
      var key = getClassName(impl[i], true);
      if (isNew || !b[key]) {
        b[key] = outerObj; 
	    if (key.indexOf("java.lang.") == 0)
	    	b[key.substring(10)] = outerObj;
      }
  	}
  }
  } while ((cl = cl.superclazz));
};


/**
		// arg1 is the package name
		// arg2 is the full class name in quotes
		// arg3 is the class definition function, C$, which is called in Clazz.new_().
		// arg4 is the superclass
		// arg5 is the superinterface(s)
		// arg6 is the type:  anonymous(1), local(2), or absent
*/

Clazz.newInterface = function (prefix, name, _null1, _null2, interfacez, _0) {
  return Clazz.newClass(prefix, name, function(){}, null, interfacez, 0);
};

// An interesting idea, but too complicated, and probably not that effective anyway.
//var lambdaCache = {};
//Clazz.newLambda = function(fc, m, lambdaType) {
//	var key = (fc.__CLASS_NAME__ || fc) + "." + (m||0) + "." + lambdaType;
//	var ret = lambdaCache[key];
//	if (ret)
//		return ret;
//    // creates a new functional interface
//	// fc is either an executable method from i -> fc() or a class or object from Class::meth
//	// m is the method name
//	// lambdaType is 'S', 'F', 'C', or 'P' (Supplier, Function, Consumer, or Predicate)
//	// note that we should be taking into account Boolean,Int,Double,Long here, and
//	// we are not fully elaborating the classes. For example getClass() does not work here.
//	var fAction;
//	if (m) { // Lambda_M
//		var g = fc[m];
//		var f = g||fc.prototype[m];
//		fAction = function(t) {return f.apply(f == g ? fc : t,[t])};		
//	} else { // Lambda_E, Lambda_S, Lambda_C, Lambda_T
//		fAction = fc;
//	}	
//	switch(lambdaType) {
//	case 'S': 
//		ret =  {get$: fAction,
//			__CLASS_NAME__:"java_util_function_Supplier"
//		};
//		// this is a rough-in
//		ret.getAsBoolean$ = ret.getAsDouble$ = ret.getAsInt$ = ret.getAsLong$ = ret.get$;
//		break;
//	case 'C':
//		ret =  {accept$: fAction, 
//				andThen$java_util_function_Function: function(after) { 
//					if (!after) throw new NullPointerException(); 
//					return function(t,u) { fAction(t,u); after.accept$(t,u);}
//				}, 
//			__CLASS_NAME__:"java_util_function_Consumer"
//		};
//		break;
//	case 'F':
//		ret = {
//				apply$: fAction, 
//				andThen$java_util_function_Function: function(after) { 
//					if (!after) throw new NullPointerException(); 
//					return function(t,u) { return after.apply$(fAction(t,u));}
//				}, 
//				compose$java_util_function_Function: function(before) {
//					if (!before) throw new NullPointerException(); 
//					return function(t,u) { return fAction(before.apply$(t,u));}		
//				},
//				identity$: function(t) { return t},
//				__CLASS_NAME__:"java_util_function_Function"
//			};
//		break;
//	case 'P':
//		ret =  {test$: fAction, 
//			and$java_util_function_predicate: function(other) {
//				if (!other) throw new NullPointerException(); 
//				return function(t,u) { return fAction(t,u) && other.test$(t,u);}
//			},
//			or$java_util_function_predicate: function(other) {
//				if (!other) throw new NullPointerException(); 
//				return function(t,u) { return fAction(t,u) || other.test$(t,u);}
//			},
//			negate$: function() {
//				return function(t,u) { return !fAction(t,u) }	
//			},
//			isEqual$O: function(target) {
//				return function(t) { return (target == null) == (t == null)
//					&& (t == null  || t.equals$O(target));}
//			},
//			__CLASS_NAME__:"java_util_function_Predicate"
//		};
//		break;
//	}
//	
//	return lambdaCache[key] = ret;
//};

var __allowOverwriteClass = true;

Clazz.newMeth = function (clazzThis, funName, funBody, modifiers) {

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
    // where K and A are generic types that are from a class<K> or class<A> assignment.    
    for (var i = funName.length; --i >= 0;)
      Clazz.newMeth(clazzThis, funName[i], funBody, modifiers);
    return;
  }
  
  var isStatic = (modifiers == 1 || modifiers == 2);
  var isPrivate = (typeof modifiers == "object");
  if (isPrivate) 
	clazzThis.$P$ = modifiers;
  Clazz.saemCount0++;
  funBody.exName = funName; // mark it as one of our methods
  funBody.exClazz = clazzThis; // make it traceable
  funBody.isPrivate = isPrivate;
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

Clazz.super_ = function(cl, obj) {
  if (cl.superclazz && cl.superclazz.c$) {
    // added [] here to account for the possibility of vararg default constructor
    cl.superclazz.c$.apply(obj, [[]]);
  }
  cl.$init$ && cl.$init$.apply(obj);
}

/////////////////////////////////////////////////////////////////////

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
    return o.__COMPONENTTYPE 
      || (o.__COMPONENTTYPE = arrayClass(baseClass, ndim - 1)); 
  };
  oclass.getName$ = function() {return o.__NAME || (o__NAME = (function() {
    switch (stub) {
    case "O":
      stub = "Object";
      break;
    case "S":
      stub = "String";
      break;
    default:
      if (stub.length > 1)
        stub = baseClass.__CLASS_NAME__;
      break;
    }
    if (stub.indexOf(".") >= 0)
      stub = "L" + stub + ";";
    else if (stub.length > 1)
      stub = "Ljava.lang." + stub + ";";
    return aaa.replace(/A/g,"[") + stub;
  })())};
  arrayClasses[key] = oclass;  
  return oclass;  
}


//var supportsNativeObject = window["j2s.object.native"]; // true


//Clazz.duplicatedMethods = {};

//Clazz._preps = {}; // prepareFields functions based on class name

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
  return s; //+ __signatures;
}

var addProfileNew = function(c, t) {
  var s = c.__CLASS_NAME__ || c.__PARAMCODE;
  if (t < 0)
	  s += "[]";
  var p = _profileNew[s]; 
  p || (p = _profileNew[s] = [0,0]);
  p[0]++;
  p[1]+=t;
}

///////////////////// method creation ////////////////////////////////

var doDebugger = function() { debugger }

///////////////////////// private supporting method creation //////////////////////

     
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
 
 var setArray = function(vals, baseClass, paramType, ndims) {
  ndims = Math.abs(ndims);
  vals.getClass$ = function () { return arrayClass(this.__BASECLASS, this.__NDIM) };
  vals.hashCode$ = function() {return this.toString().hashCode$()}

  vals.equals$O = function (a) { 
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
 * in-place shift of an array by k elements, starting with element i0,
 * resetting its length in case it is arguments (which does not have the
 * .shift() method. Returns a[i0] 
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
  return cl.__PARAMCODE || (cl.__PARAMCODE = cl.__CLASS_NAME__.replace(/java\.lang\./, "").replace(/\./g, '_'));
}

var newTypedA = function(baseClass, args, nBits, ndims, isClone) {
  var dim = args[0];
  if (typeof dim == "string")
    dim = dim.charCodeAt(0); // int[] a = new int['\3'] ???
  var last = args.length - 1;
  var paramType = args[last];
  var val = args[last - 1];
  if (ndims > 1) {
     // array of arrays
    var xargs = new Array(last--); 
    for (var i = 0; i <= last; i++)
      xargs[i] = args[i + 1];
    // SAA -> SA
    xargs[last] = paramType.substring(0, paramType.length - 1);    
    var arr = new Array(dim);
    for (var i = 0; i < dim; i++)
      arr[i] = newTypedA(baseClass, xargs, nBits, ndims - 1); // Call recursively
  } else {
    // Clazz.newIntA(new int[5][]   val = null 
    // Clazz.newA(5 ,null, "SA")        new String[5] val = null
    // Clazz.newA(-1, ["A","B"], "SA")  new String[]   val = {"A", "B"}
    // Clazz.newA(3, 5, 0, "IAA")       new int[3][5] (second pass, so now args = [5, 0, "IA"])
    if (val == null) {
      nBits = 0;
    } else if (nBits > 0 && dim < 0) {
      // make sure this is not a character
      for (var i = val.length; --i >= 0;)
        val[i].charAt && (val[i] = val[i].$c());
      dim = val; // because we can initialize an array using new Int32Array([...])
    }
    if (nBits > 0)
      ndims = 1;
    var atype;
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
      var arr = new Float64Array(dim);
      break;
    default:
      nBits = 0;
      var arr;
      if (isClone) {
        arr = new Array(dim = val.length);
      } else {
        arr = (dim < 0 ? val : new Array(dim));
        if (dim > 0 && val != null)
          for (var i = dim; --i >= 0;)
             arr[i] = val;
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
 * @param clazzHost given class or object
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
      return (fAsClassName ? obj.__CLASS_NAME__ : "Class"); // user defined class name
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
  return (clazzName.indexOf("Array") >= 0 ? "Array" // BH -- for Float64Array and Int32Array
    : clazzName.indexOf ("object ") >= 0 ? clazzName.substring (7) // IE
    : clazzName);
}

/**
 * Expand the shortened list of class names.
 * For example:
 * JU.Log, $.Display, $.Decorations
 * will be expanded to 
 * JU.Log, JU.Display, JU.Decorations
 * where "$." stands for the previous class name's package.
 *
 * This method will be used to unwrap the required/optional classes list and 
 * the ignored classes list.
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
 * @param clazzHost given class or object
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

//if (supportsNativeObject) { // true
  Clazz._O = function () {};
  Clazz._O.__CLASS_NAME__ = "Object";
  Clazz._O.__PARAMCODE = "O";
  Clazz._O.getClass$ = function () { return Clazz._O; }; 
//} else {
//  Clazz._O = Object;
//}

/*
 * these methods are not part of Java.
 *  
var objMethods = {
  equals : function (o) { return this === o; },
  hashCode : function () { return this.__CLASS_NAME__.hashCode (); },
  toString : function () { return "class " + this.__CLASS_NAME__; } 
};
objMethods.equals$O = objMethods.equals;
 */

// set object methods for Clazz._O and Array

  var addProto = function(proto, name, func) {
    func.exClazz = Clazz._O;
    func.exName = name;
    return proto[name] = func;
  };

//var minimalObjNames = [ "equals$", "equals$O", "hashCode$" /*"toString",*/  ];   

;(function(proto) {

//  for (var i = minimalObjNames.length, name; --i >= 0;) {
//    name = minimalObjNames[i];
//    objMethods[name].exClazz = Clazz._O;
//    objMethods[name].exName = name;
//    Clazz._O[name = objNames[i]] = Array[name] = objMethods[name];
//  }
  
//  addProto(proto, "isInstance", function(c) {
//    return Clazz.instanceOf(this, c);
//  }),
//
//  addProto(proto, "equals", function (obj) {
//    return this == obj;
//  });

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
  addProto(proto, "toString", function () { return (this.__CLASS_NAME__ ? "[" + this.__CLASS_NAME__ + " object]" : this.toString$.apply(this, arguments)); });

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

//var checkObjectMethods = function (hostSuper, funName) {
//  for (var k = objNames.length; --k >= 0;)
//    if (funName == objNames[k] && objMethods[funName] === hostSuper[funName])
//      return true;
//  return false;
//};

// see also 
var excludeSuper = function(o) {
 return o == "b$" || o == "$this$0"
      || o == "$init$"
      || o == "$init0$"
      || o == "$static$"
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
	  for (var o in clazzFrom.prototype) {
	    if (clazzThis.prototype[o] == undefined && !excludeSuper(o)) {
	        clazzThis.prototype[o] = clazzFrom.prototype[o];
	    }
	  }
	  __allowOverwriteClass = false;
	  if (clazzFrom.$defaults$)
		  clazzFrom.$defaults$(clazzThis);
	  __allowOverwriteClass = true;
  }
}


var finalizeClazz = function(clazz, qname, bname, type, isNumber) {
  clazz.$isInterface = (type == 0);
  qname && (clazz.__CLASS_NAME__ = clazz.prototype.__CLASS_NAME__ = qname);
  bname && (clazz.__CLASS_NAME$__ = clazz.prototype.__CLASS_NAME$__ = bname);  // inner static classes use $ not "."
  
  (type == 1) && (clazz.__ANON = clazz.prototype.__ANON = 1); 
  (type == 2) && (clazz.__LOCAL = clazz.prototype.__LOCAL = 1);
  
//  if (!isNumber && type != 0)
//    Clazz.newMeth(clazz, '$init0$', function(){var c;if ((c=clazz.superclazz) && (c = c.$init0$))c.apply(this);}, 1);
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


/////////////////////////// Exception handling ////////////////////////////

/*
 * Use to mark that the Throwable instance is created or not.
 * 
 * Called from java.lang.Throwable, as defined in JSmolJavaExt.js
 * 
 * The underscore is important - it tells the JSmol ANT task to NOT 
 * turn this into Clazz_initializingException, because coreBottom2.js does 
 * not include that call, and so Google Closure Compiler does not minify it.
 *        
 */
/* public */
Clazz._initializingException = false;

/** 
 * MethodException will be used as a signal to notify that the method is
 * not found in the current clazz hierarchy.
 */
/* private */
var MethodException = function () {
  this.toString = function () {
    return "j2s MethodException";
  };
};

var _isNPEExceptionPredicate;

;(function() { 
  /* sgurin: native exception detection mechanism. Only NullPointerException detected and wrapped to java excepions */
  /** private utility method for creating a general regexp that can be used later  
   * for detecting a certain kind of native exceptions. use with error messages like "blabla IDENTIFIER blabla"
   * @param msg String - the error message
   * @param spliterName String, must be contained once in msg
   * spliterRegex String, a string with the regexp literal for identifying the spitter in exception further error messages.
   */
  // reproduce NullPointerException for knowing how to detect them, and create detector function Clazz._isNPEExceptionPredicate
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
    if(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {// opera throws an exception with fixed messages like "Statement on line 23: Cannot convert undefined or null to Object Backtrace: Line....long text... " 
      var idx1 = e.message.indexOf(":"), idx2 = e.message.indexOf(":", idx1+2);
      var _NPEMsgFragment = e.message.substr(idx1+1, idx2-idx1-20);
      _isNPEExceptionPredicate = function(e) { return e.message.indexOf(_NPEMsgFragment)!=-1; };
    }  else if(navigator.userAgent.toLowerCase().indexOf("webkit")!=-1) { //webkit, google chrome prints the property name accessed. 
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
  //  need to limit this, as JavaScript call stack may be recursive
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

////////////////////////////////// package loading ///////////////////////

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
 * used specifically for declaring prototypes using 
 *  subclass.prototype = new superclass(inheritArgs) 
 * without  running a constructor or doing field preparation.    
 *  
 */ 
var inheritArgs = new (function(){return {"$J2SNOCREATE$":true}})();

//var _prepOnly = new (function(){return {"$J2SPREPONLY$":true}})();

/**
 * Inherit class with "extends" keyword and also copy those static members. 
 * Example, as in Java, if NAME is a static member of ClassA, and ClassB 
 * extends ClassA then ClassB.NAME can be accessed in some ways.
 *
 * @param clazzThis child class to be extended
 * @param clazzSuper super class which is inherited from
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
        for (o in pp) {
          if (!pp.exClazz || pp.exClazz != Clazz._O)
            clazzThis.prototype[o] = pp[o];
        }
      }
    } 
    for (o in p) {
      if (!p[o].exClazz || p[o].exClazz != Clazz._O)
      clazzThis.prototype[o] = p[o];
    }      
  }
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
var addInterface = function (clazzThis, interfacez) {
  if (interfacez instanceof Array) {
    for (var i = interfacez.length; --i >= 0;) {
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


////////////////////////// default package declarations ////////////////////////


/*
 * Check whether given package's classpath is setup or not.
 * Only "java" and "org.eclipse.swt" are accepted in argument.
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
//       accounted for in net.sf.j2s.core.astvisitors.Java2ScriptVisitor.knownClasses
Clazz.newInterface(java.io,"Externalizable");
Clazz.newInterface(java.io,"Flushable");
Clazz.newInterface(java.io,"Serializable");
Clazz.newInterface(java.lang,"Cloneable");
Clazz.newInterface(java.lang,"Appendable");
Clazz.newInterface(java.lang,"Comparable");
Clazz.newInterface(java.lang,"Runnable");



(function(){var P$=java.lang,I$=[[0,'java.util.stream.StreamSupport','java.util.Spliterators','java.lang.CharSequence$lambda1','java.lang.CharSequence$lambda2']],$I$=function(i){return I$[i]||(I$[i]=Clazz.load(I$[0][i]))};
var C$=Clazz.newInterface(P$, "CharSequence");
C$.$defaults$ = function(C$){

Clazz.newMeth(C$, 'chars$', function () {
return $I$(1).intStream$java_util_function_Supplier$I$Z(((P$.CharSequence$lambda1||
(function(){var C$=Clazz.newClass(P$, "CharSequence$lambda1", function(){Clazz.newInstance(this, arguments[0],1,C$);}, null, 'java.util.function.Supplier', 1);

C$.$clinit$ = 1;

Clazz.newMeth(C$, '$init$', function () {}, 1);
/*lambda_E*/
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
/*lambda_E*/
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

Clazz.newMeth(C$, ['forEachRemaining$java_util_function_IntConsumer','forEachRemaining$TT_CONS'], function (block) {
for (; this.cur < this.b$['CharSequence'].length$(); this.cur++) {
block.accept$(this.b$['CharSequence'].charAt$I(this.cur).$c());
}
});

Clazz.newMeth(C$);
})()
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

Clazz.newMeth(C$, ['forEachRemaining$java_util_function_IntConsumer','forEachRemaining$TT_CONS'], function (block) {
var length = this.b$['CharSequence'].length$();
var i = this.cur;
try {
while (i < length){
var c1 = this.b$['CharSequence'].charAt$I(i++);
if (!Character.isHighSurrogate$C(c1) || i >= length ) {
block.accept$(c1.$c());
} else {
var c2 = this.b$['CharSequence'].charAt$I(i);
if (Character.isLowSurrogate$C(c2)) {
i++;
block.accept$(Character.toCodePoint$C$C(c1, c2));
} else {
block.accept$(c1.$c());
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

//////// (int) conversions //////////

// deprecated
Clazz.doubleToInt = Clazz.floatToInt = function (x) {
  // asm.js-style conversion
  return x|0;
};


///////////////////////////////// Array additions //////////////////////////////
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

//////////////////////////// hotspot and unloading ////////////////////

// not implemented in SwingJS

//////////////////////////// class loader /////////////////////////////

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
 * @create July 10, 2006
 *******/

Clazz._Loader = function () {};

;(function(Clazz, _Loader) {

// The class loader is always accessed through Class.
// See Class.java for implementations of the methods of java.lang.ClassLoader such as getSystemResource and getResource

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
 * Try to be compatible with Clazz system.
 * In original design _Loader and Clazz are independent!
 *  -- zhourenjian @ December 23, 2006
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
   * In some situation, maybe,
   * _Loader.packageClasspath ("java", ..., true);
   * is called after other _Loader#packageClasspath, e.g.
   * <code>
   * _Loader.packageClasspath ("org.eclipse.swt", "...", true);
   * _Loader.packageClasspath ("java", "...", true);
   * </code>
   * which is not recommended. But _Loader should try to adjust orders
   * which requires "java" to be declared before normal _Loader
   * #packageClasspath call before that line! And later that line
   * should never initialize "java/package.js" again!
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
    //pkgRefCount++;
    if (pkg == "java")
      pkg = "core" // JSmol -- moves java/package.js to core/package.js
    _Loader.loadClass(pkg + ".package", function () {
          //if (--pkgRefCount == 0)
            //runtimeLoaded();
          //fSuccess && fSuccess();
        }, true, true, 1);
    return;
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

  //System.out.println("loadClass " + name)
  var path = _Loader.getClasspathFor(name);
  lastLoaded = name;
  Clazz.ClassFilesLoaded.push(name.replace(/\./g,"/") + ".js");
    Clazz.loadScript(path);//(n, n.path, n.requiredBy, false, onLoaded ? function(_loadClass){ isLoadingEntryClass = bSave; onLoaded()}: null);
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
//   Clazz._Loader.setClasspathFor("edu/colorado/phet/idealgas/model/PressureSensingBox.ChangeListener");
  if (!(clazzes instanceof Array))
    clazzes = [clazzes];
    for (var i = clazzes.length; --i >= 0;) {
      path = clazzes[i];
      var jar = _Loader.getJ2SLibBase() + path.split(".")[0]+".js";
      path = path.replace(/\//g,".");
      classpathMap["#" + path] = jar;
      var a = classpathMap["$" + jar] || (classpathMap["$" + jar] = []);
      a.push(path);
    }
}


/**
 * Usually be used in .../package.js. All given packages will be registered
 * to the same classpath of given prefix package.
 */
/* public */
_Loader.registerPackages = function (prefix, pkgs) {
  //_Loader.checkInteractive ();
  var base = _Loader.getClasspathFor(prefix + ".*", true);
  for (var i = 0; i < pkgs.length; i++) {
      Clazz.newPackage(prefix + "." + pkgs[i]);
    _Loader.loadPackageClasspath(prefix + "." + pkgs[i], base);
  }

};

/**
 * Return the *.js path of the given class. Maybe the class is contained
 * in a *.z.js jar file.
 * @param clazz Given class that the path is to be calculated for. May
 * be java.package, or java.lang.String
 * @param forRoot Optional argument, if true, the return path will be root
 * of the given classs' package root path.
 * @param ext Optional argument, if given, it will replace the default ".js"
 * extension.
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
  return path;//_Loader.multipleSites(path);
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
    var s = "[Java2Script] The required class file \n\n" + file + (js.indexOf("data: no") ? 
       "\nwas not found.\n"
      : "\ncould not be loaded. Script error: " + e.message + " \n\ndata:\n\n" + js) + "\n\n" 
      + (e.stack ? e.stack : Clazz._getStackTrace());
    Clazz._lastEvalError = s;    
    if (Clazz._isQuietLoad) 
      return;
    Clazz.alert(s);
    throw e;
  }
}

Clazz._initClass = function(c,clinit,status,objThis) {
	var f;
	return clinit && (f=c.$clinit$) && (f === 1 || f === 2 ? Clazz.load(c,1) : f && typeof f == "function"? f() : 0),
	status && c.$load$ && Clazz.load(c, 2),
	objThis  && (f=c.$init0$) && f.apply(objThis),
	c;
}

Clazz._4Name = function(clazzName, applet, state, asClazz, initialize, isQuiet) {
  if (clazzName.indexOf("[") == 0)
	return getArrayClass(clazzName);
  if (clazzName.indexOf(".") < 0)
    clazzName = "java.lang." + clazzName;  
  var isok = Clazz._isClassDefined(clazzName);
  if (isok && asClazz) {
    return Clazz._initClass(Clazz.allClasses[clazzName],1,1);
  } 
  if (!isok) {
    var name2 = null;
    if (clazzName.indexOf("$") >= 0) {
      // BH we allow Java's java.swing.JTable.$BooleanRenderer as a stand-in for java.swing.JTable.BooleanRenderer
      // when the static nested class is created using declareType  
      name2 = clazzName.replace(/\$/g,".");
      if (Clazz._isClassDefined(name2)) {
        clazzName = name2;
      } else {
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
      //alert ("Using Java reflection: " + clazzName + " for " + applet._id + " \n"+ Clazz._getStackTrace());
      _Loader.loadClass(clazzName);
    }    
  }
  var cl = evalType(clazzName);
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


Clazz.loadScript = function(file) {

  Clazz.currentPath = file;
  //loadedScripts[file] = true;
  // also remove from queue
  //removeArrayItem(classQueue, file);

  var file0 = file;
  if (Clazz._nozcore) {
    file = file.replace(/\.z\.js/,".js");
  }
  var data = "";
  try{
    _Loader.onScriptLoading(file);
    data = J2S.getFileData(file);
    evaluate(file, data);
    _Loader.onScriptLoaded(file, null, data);
  }catch(e) {
    _Loader.onScriptLoaded(file, e, data);
    var s = ""+e;
    if (data.indexOf("Error") >= 0)
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
 * Used in package
/* public */
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
 * Indicate whether _Loader is loading script synchronously or 
 * asynchronously.
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

/**
 * String mode:
 * asynchronous modes:
 * async(...).script, async(...).xhr, async(...).xmlhttprequest,
 * script.async(...), xhr.async(...), xmlhttprequest.async(...),
 * script
 * 
 * synchronous modes:
 * sync(...).xhr, sync(...).xmlhttprequest,
 * xhr.sync(...), xmlhttprequest.sync(...),
 * xmlhttprequest, xhr
 *                                                    
 * Integer mode:
 * Script 4; XHR 2; SYNC bit 1; 
 */
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
  isUsingXMLHttpRequest = ajax;
  isAsynchronousLoading = async;
  loadingTimeLag = (async && timeLag >= 0 ? timeLag: -1);
  return async;
};

/*
 * Load those key *.z.js. This *.z.js will be surely loaded before other 
 * queued *.js.
 */
/* public */
_Loader.loadZJar = function (zjarPath, keyClass) {
// used only by package.js for core.z.js
  var f =  null;
  var isArr = (keyClass instanceof Array);
  if (isArr)
    keyClass = keyClass[keyClass.length - 1];
//  else
  //  f = (keyClass == runtimeKeyClass ? runtimeLoaded : null);      
  _Loader.jarClasspath(zjarPath, isArr ? keyClass : [keyClass]);
  // BH note: runtimeKeyClass is java.lang.String  
  _Loader.loadClass(keyClass, null, true);
};

Clazz.binaryFolders =  _Loader.binaryFolders = [ _Loader.getJ2SLibBase() ];

})(Clazz, Clazz._Loader);

//}
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
 * @create Jan 11, 2007
 *******/

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
      //Clazz.addEvent (window, "unload", cleanup);
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
  //monitorEl.style.filter = "Alpha(Opacity=" + alpha + ")";
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
  //if (monitorEl) {
  //  monitorEl.onmouseover = null;
  //}
  monitorEl = null;
  bindingParent = null;
  //Clazz.removeEvent (window, "unload", cleanup);
  //window.detachEvent ("onunload", cleanup);
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

//if (window["ClazzLoader"]) {
//  _Loader.onScriptLoading = function(file) {
//    CLPM.showStatus("Loading " + file + "...");
//  };
//  _Loader.onScriptLoaded = function(file, isError) {
//    CLPM.showStatus(file + (isError ? " loading failed." : " loaded."), true);
//  };
//  _Loader.onGlobalLoaded = function(file) {
//    CLPM.showStatus("Application loaded.", true);
//  };
//  _Loader.onClassUnloaded = function(clazz) {
//    CLPM.showStatus("Class " + clazz + " is unloaded.", true);
//  };
//}

})(Clazz._LoaderProgressMonitor, J2S);

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

var c160 = String.fromCharCode(160); //nbsp;
c160 += c160+c160+c160;

Con.consoleOutput = function (s, color) {
  var con = consoleDiv;
  if (!con) {
    return false; // BH this just means we have turned off all console action
  }
  if (con == window.console) {
    if (color == "red")
      con.err(s);
    else
      con.log(s);
    return;
  }
  if (con && typeof con == "string")
    con = document.getElementById(con)
  if (Con.linesCount > Con.maxTotalLines) {
    for (var i = 0; i < Con.linesCount - Con.maxTotalLines; i++) {
      if (con && con.childNodes.length > 0) {
        con.removeChild (con.childNodes[0]);
      }
    }
    Con.linesCount = Con.maxTotalLines;
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
    if (!console || !(console = document.getElementById (console)))
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
		"os.arch" : navigator.userAgent,
		"os.name" : navigator.userAgent,
		"os.version": navigator.userAgent,
		"path.separator" : ":",
		"user.dir" : "https://.",
		"user.home" : "https://.",
		"user.name" : "user",
		"javax.xml.datatype.DatatypeFactory" : "swingjs.xml.JSJAXBDatatypeFactory",
		"javax.xml.bind.JAXBContextFactory" : "swingjs.xml.JSJAXBContextFactory"	
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
}

C$.setErr$java_io_PrintStream=function (err) {
	C$.err=err;
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

C$.identityHashCode$O=function (x) {
	return x==null ? 0 : x._$hashcode || (x._$hashcode = ++hashCode);
}

C$.getProperties$=function () {
	if (C$.props == null )
		C$.props=Clazz.new_("java.util.Properties");
	for (a in sysprops)
		C$.props.put$TK$TV(a, sysprops[a]);
	return C$.props;
}

C$.lineSeparator$=function () {
	return C$.lineSeparator;
}

C$.setProperties$java_util_Properties=function (props) {
	C$.props = props;
}

C$.getProperty$S=function (key) {
	C$.checkKey$S(key);
	return (C$.props == null ? sysprops[key] : C$.props.getProperty$S(key));
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

})(System);

;(function(Con, Sys) {

Sys.exit$ = Sys.exit$I;

Sys.out = new Clazz._O ();
Sys.out.__CLASS_NAME__ = "java.io.PrintStream";
Sys.err = new Clazz._O ();
Sys.err.__CLASS_NAME__ = "java.io.PrintStream";

Sys.setOut$java_io_PrintStream = function(ps) {
  System.out = ps;
};

Sys.setErr$java_io_PrintStream = function(ps) {
  System.err = ps;
};

var checkTrace = function(s) {
	  if (J2S._nooutput || J2S._traceFilter && s.indexOf(J2S._traceFilter) < 0) return;
	  if (!J2S._traceFilter && J2S._traceOutput && s && 
			  (("" + s).indexOf(J2S._traceOutput) >= 0 || '"' + s + '"' == J2S._traceOutput)) {
	    alert(s + "\n\n" + Clazz._getStackTrace());
	    doDebugger();
	  }
}

var setps = function(ps, f) {

ps.print = ps.print$O = ps.print$Z = ps.print$I = ps.println$J = ps.print$S = ps.print$C = ps.print = function (s) { 
  checkTrace(s);
  f(s);
};

ps.printf = ps.printf$S$OA = ps.format = ps.format$S$OA = function (f, args) {
  ps.print(String.format$S$OA.apply(null, arguments));
}

ps.flush$ = function() {}

ps.println = ps.println$ = ps.println$O = ps.println$Z = ps.println$I = ps.println$J = ps.println$S = ps.println$C = function(s) {
 s = (typeof s == "undefined" ? "" : "" + s);
 checkTrace(s);
 s = (typeof s == "undefined" ? "\r\n" : s == null ?  s = "null\r\n" : s + "\r\n");
  f(s);
};

ps.println$F = ps.println$D = function(f) {var s = "" + f; ps.println(s.indexOf(".") < 0 && s.indexOf("Inf") < 0 ? s + ".0" : s)};

ps.write$BA$I$I = function (buf, offset, len) {
  ps.print(String.instantialize(buf).substring(offset, offset+len));
};

}

setps(Sys.out, function(s) {Con.consoleOutput(s)});
setps(Sys.err, function(s) {Con.consoleOutput(s, "red")});

})(Clazz.Console, System);


Clazz._Loader.registerPackages("java", [ "io", "lang", "lang.reflect", "util" ]);


J2S.setGlobal("java.registered", true);

///////////////// special definitions of standard Java class methods ///////////

var C$, m$ = Clazz.newMeth;

Clazz._setDeclared("java.lang.Math", java.lang.Math = Math);

Math.rint || (Math.rint = function(a) {
 var b;
 return Math.round(a) + ((b = a % 1) != 0.5 && b != -0.5 ? 0 : (b = Math.round(a % 2)) > 0 ? b - 2 : b);
});

Math.log10||(Math.log10=function(a){return Math.log(a)/Math.E});

Math.hypot||(Math.hypot=function(x,y){return Math.sqrt(Math.pow(x,2)+Math.pow(y,2))});

Math.toDegrees||(Math.toDegrees=function(angrad){return angrad*180.0/Math.PI;});

Math.toRadians||(Math.toRadians=function(angdeg){return angdeg/180.0*Math.PI});

Math.copySign||(Math.copySign=function(mag,sign){return((sign>0?1:-1)*Math.abs(mag))});

//could use Math.sign(), but this was used to preserve cross-brower compatability (not in Internet Explorer)
Math.signum||(Math.signum=function(d){return(d==0.0||isNaN(d))?d:d < 0 ? -1 : 1});

Math.scalb||(Math.scalb=function(d,scaleFactor){return d*Math.pow(2,scaleFactor)});

//var 
a64 = null, a32 = null, i32 = null, i64 = null;

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

	if (!a64) {
		a64 = new Float64Array(1);
		i64 = new Uint32Array(a64.buffer);
	}
	a64[0] = start;
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
    
	if (!i32) {
		a32 = new Float32Array(1);
		i32 = new Int32Array(a32.buffer);
	}
	a32[0] = start;
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
	if (!a64) {
		a64 = new Float64Array(1);
		i64 = new Uint32Array(a64.buffer);
	}
	a64[0] = d;
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
//extendPrototype(Number, true, false);
Number.prototype.compareTo$ = Number.prototype.compareTo$Number = Number.prototype.compareTo$TT = function(x) { var a = this.valueOf(), b = x.valueOf(); return (a < b ? -1 : a == b ? 0 : 1) };

var $b$ = new Int8Array(1);
var $s$ = new Int16Array(1);
var $i$ = new Int32Array(1);

// short forms, for the actual numbers in JavaScript
m$(Number,["byteValue"],function(){return ($b$[0] = this, $b$[0]);});
m$(Number,["shortValue"],function(){return ($s$[0] = this, $s$[0]);});
m$(Number,["intValue"],function(){return ($i$[0] = this, $i$[0]);});
m$(Number,["longValue"],function(){return (this|0);});

// Object values
m$(Number,["byteValue$"],function(){return this.valueOf().byteValue();});
m$(Number,["shortValue$"],function(){return this.valueOf().shortValue();});
m$(Number,["intValue$"],function(){return this.valueOf().intValue();});
m$(Number,["longValue$"],function(){return this.valueOf().longValue();});
m$(Number,["floatValue$", "doubleValue$", "hashCode$"],function(){return this.valueOf();});

Clazz._setDeclared("java.lang.Integer", java.lang.Integer=Integer=function(){
if (typeof arguments[0] != "object")this.c$(arguments[0]);
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
  cl.TYPE.isArray$ = cl.TYPE.isEnum$ = cl.TYPE.isAnnotation$ = FALSE;
  cl.TYPE.toString = cl.TYPE.getName$ = cl.TYPE.getTypeName$ 
    = cl.TYPE.getCanonicalName$ = cl.TYPE.getSimpleName$ = function() {return type};
  cl.TYPE.isAssignableFrom$Class = (function(t) {return function(c) {return c == t}})(cl.TYPE);
  cl.TYPE.getSuperclass$ = NULL_FUNC;
  cl.TYPE.getInterfaces$ = EMPTY_CLASSES;
}

var decorateAsNumber = function (clazz, qClazzName, type, PARAMCODE) {
  clazz.prototype.valueOf=function(){return 0;};
  clazz.prototype.__VAL0__ = 1;
  finalizeClazz(clazz, qClazzName, null, 0, true);
  extendPrototype(clazz, true, true);
  setSuperclass(clazz, Number);
  addInterface(clazz, Comparable);
  setJ2STypeclass(clazz, type, PARAMCODE);
  return clazz;
};

decorateAsNumber(Integer, "Integer", "int", "I");

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

m$(Integer, ["c$", "c$$S", "c$$I"], function(v){
 v == null && (v = 0);
 if (typeof v != "number")
  v = Integer.parseInt$S$I(v, 10);
 v = v.intValue();  
 this.valueOf=function(){return v;};
}, 1);


Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;
//Integer.TYPE=Integer.prototype.TYPE=Integer;

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

Integer.reverseBytes = m$(Integer,"reverseBytes$I",
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
	  var y = i <<16; if (y != 0) { n = n -16; i = y; }
	  y = i << 8; if (y != 0) { n = n - 8; i = y; }
	  y = i << 4; if (y != 0) { n = n - 4; i = y; }
	  y = i << 2; if (y != 0) { n = n - 2; i = y; }
	  return n - ((i << 1) >>> 31);
	}, 1);

var radixChar = "0123456789abcdefghijklmnopqrstuvwxyz";

m$(Integer,"parseInt$S$I",
function(s,radix){
 var v = parseInt(s, radix);
 if (isNaN(v)){
	throw Clazz.new_(NumberFormatException.c$$S, ["parsing " + s + " radix " + radix]);
 }
return v;
}, 1);

m$(Integer,["parseInt$S"],
function(s,radix){
return Integer.parseInt$S$I(s, radix || 10);
}, 1);

m$(Integer,["valueOf$S","valueOf$I"],
function(s, radix){
  return Clazz.new_(Integer.c$, [s]);
}, 1);

m$(Integer,["valueOf$S$I"],
function(s, radix){
  return Integer.parseInt$S$I(s, radix || 10);
}, 1);

m$(Integer,"equals$O",
function(s){
return (s instanceof Integer) && s.valueOf()==this.valueOf();
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

m$(Integer,"decodeRaw$S", function(n){
if (n.indexOf(".") >= 0)n = "";
var i = (n.startsWith("-") ? 1 : 0);
n = n.replace(/\#/, "0x").toLowerCase();
var radix=(n.startsWith("0x", i) ? 16 : n.startsWith("0", i) ? 8 : 10);
// The general problem with parseInt is that is not strict -- ParseInt("10whatever") == 10.
// Number is strict, but Number("055") does not work, though ParseInt("055", 8) does.
// need to make sure negative numbers are negative
if (n == "")
 return NaN
n = Number(n) & 0xFFFFFFFF;
return (radix == 8 ? parseInt(n, 8) : n);
}, 1);

m$(Integer,"decode$S", function(n){
  if (isNaN(n = Integer.decodeRaw$S(n)) || n < Integer.MIN_VALUE|| n > Integer.MAX_VALUE)
    throw Clazz.new_(NumberFormatException.c$$S,["Invalid Integer"]);
  return Clazz.new_(Integer.c$, [n]);
}, 1);

m$(Integer,"hashCode$",
function(){
return this.valueOf();
});


// Note that Long is problematic in JavaScript 

Clazz._setDeclared("java.lang.Long", java.lang.Long=Long=function(){
if (typeof arguments[0] != "object")this.c$(arguments[0]);
});

decorateAsNumber(Long, "Long", "long", "L");
Long.toString=Long.toString$J=Long.toString$J$I = Long.prototype.toString=function(i, radix){
	switch(arguments.length) {
	case 2:
		return i.toString(radix);
	case 1:
		return "" +i;
	case 0:
		return (this===Long ? "class java.lang.Long" : ""+this.valueOf());
	}
};

m$(Long, ["c$", "c$$S", "c$$J"], function(v){
  v == null && (v = 0);
  v = (typeof v == "number" ? Math.round(v) : Integer.parseInt$S$I(v, 10));
  this.valueOf=function(){return v;};
}, 1);

//Long.MIN_VALUE=Long.prototype.MIN_VALUE=-0x8000000000000000;
//Long.MAX_VALUE=Long.prototype.MAX_VALUE=0x7fffffffffffffff;
//Long.TYPE=Long.prototype.TYPE=Long;

m$(Long,["parseLong$S", "parseLong$S$I"],
function(s,radix){
 return Integer.parseInt$S$I(s, radix || 10);
}, 1);

m$(Long,["valueOf$S","valueOf$J","valueOf$S$I"],
function(s, radix){
return Clazz.new_(Long.c$, [s, radix||10]);
}, 1);

m$(Long,"equals$O",
function(s){
return (s instanceof Long) && s.valueOf()==this.valueOf();
}, 1);

Long.toHexString$J=function(i){
return i.toString(16);
};
Long.toOctalString$J=function(i){
return i.toString(8);
};
Long.toBinaryString$J=function(i){
return i.toString(2);
};

m$(Long,"decode$S",
function(n){
  if (isNaN(n = Integer.decodeRaw$S(n)))
    throw Clazz.new_(NumberFormatException.c$$S, ["Invalid Long"]);
  return Clazz.new_(Long.c$, [n]);
}, 1);


Long.sum$J$J = Integer.sum$I$I;

m$(Long,"signum$J", function(i){ return i < 0 ? -1 : i > 0 ? 1 : 0; }, 1);

Clazz._setDeclared("java.lang.Short", java.lang.Short = Short = function(){
if (typeof arguments[0] != "object")this.c$(arguments[0]);
});
decorateAsNumber(Short, "Short", "short", "H");

m$(Short, ["c$", "c$$S", "c$$H"],
function (v,radix) {
 v == null && (v = 0);
 if (typeof v != "number")
  v = Integer.parseInt$S$I(v, radix||10);
 v = v.shortValue();
 this.valueOf = function () {return v;};
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

Short.MIN_VALUE = Short.prototype.MIN_VALUE = -32768;
Short.MAX_VALUE = Short.prototype.MAX_VALUE = 32767;
//Short.TYPE = Short.prototype.TYPE = Short;

m$(Short, ["parseShort$S", "parseShort$S$I"],function (s, radix) {
return Integer.parseInt$S$I(s, radix || 10).shortValue();
}, 1);

m$(Short, ["valueOf$S","valueOf$H","valueOf$S$I"],
function (s,radix) {
  return Clazz.new_(Short.c$, [s,radix||10]);
}, 1);

m$(Short, "equals$O",
function (s) {
return (s instanceof Short) && s.valueOf() == this.valueOf();
});

Short.toHexString$H = function (i) {
  return i.toString(16);
};
Short.toOctalString$H = function (i) {
  return i.toString(8);
};
Short.toBinaryString$H = function (i) {
  return i.toString (2);
};

m$(Short, "decode$S",
function(n){
  if (isNaN(n = Integer.decodeRaw$S(n)) || n < -32768|| n > 32767)
    throw Clazz.new_(NumberFormatException.c$$S, ["Invalid Short"]);
  return Clazz.new_(Short.c$, [n]);
}, 1);

Clazz._setDeclared("Byte", java.lang.Byte=Byte=function(){
if (typeof arguments[0] != "object")this.c$(arguments[0]);
});
decorateAsNumber(Byte,"Byte", "byte", "B");

m$(Byte, ["c$", "c$$S", "c$$B"], function(v,radix){
 if (typeof v != "number")
   v = Integer.parseInt$S$I(v, radix||10);
 v = v.byteValue();
this.valueOf=function(){return v;};
this.byteValue = function(){return v};
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

Byte.serialVersionUID=Byte.prototype.serialVersionUID=-7183698231559129828;
Byte.MIN_VALUE=Byte.prototype.MIN_VALUE=-128;
Byte.MAX_VALUE=Byte.prototype.MAX_VALUE=127;
Byte.SIZE=Byte.prototype.SIZE=8;
//Byte.TYPE=Byte.prototype.TYPE=Byte;

m$(Byte,["parseByte$S", "parseByte$S$I"],
function(s,radix){
 return Integer.parseInt$S$I(s, radix || 10).byteValue$();
}, 1);

m$(Byte, ["valueOf$S","valueOf$B","valueOf$S$I"],
function (s,radix) {
  return Clazz.new_(Byte.c$, [s, radix||10]);
}, 1);

m$(Byte,"equals$O",
function(s){
return (s instanceof Byte) && s.valueOf()==this.valueOf();
});

Byte.toHexString$B=function(i){return i.toString(16);};
Byte.toOctalString$B=function(i){return i.toString(8);};
Byte.toBinaryString$B=function(i){return i.toString(2);};

m$(Byte,"decode$S",
function(n){
  if (isNaN(n = Integer.decodeRaw$S(n)) || n < -128|| n > 127)
    throw Clazz.new_(NumberFormatException.c$$S, ["Invalid Byte"]);
  return Clazz.new_(Byte.c$, [n]);
}, 1);

Clazz._floatToString = function(f) {
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
if (typeof arguments[0] != "object")this.c$(arguments[0]);
});
decorateAsNumber(Float,"Float", "float", "F");

m$(Float, ["c$", "c$$S", "c$$F", "c$$D"], function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
  v = Number(v);
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

var a32, i32;

Float.floatToIntBits$F = function(f) {
	if (isNaN(f))
		return 
	return Float.floatToRawIntBits$F(f);
}

Float.floatToRawIntBits$F = function(f) {
	i32 || (a32 = new Float32Array(1), i32 = new Int32Array(a32.buffer));
	a32[0] = f;
	return i32[0]; 
}

Float.intBitsToFloat$I = function(i) {
	i32 || (a32 = new Float32Array(1), i32 = new Int32Array(a32.buffer));
	i32[0] = i;
	return a32[0]; 
}

Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=1.4e-45;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=3.4028235e+38;
Float.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;
//Float.TYPE=Float.prototype.TYPE=Float;

m$(Float,"parseFloat$S",
function(s){
if(s==null){
throw Clazz.new_(NumberFormatException.c$$S, ["null"]);
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
if (s == "NaN")
	return NaN;
var floatVal=Number(s);
if(isNaN(floatVal)){
throw Clazz.new_(NumberFormatException.c$$S, ["Not a Number : "+s]);
}
return floatVal;
}, 1);

m$(Float,["valueOf$S","valueOf$F"],
function(s){
return Clazz.new_(Float.c$, [s]);
}, 1);

Float.isNaN$F = m$(Float,"isNaN$",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
});

Float.isInfinite$F = m$(Float,"isInfinite$",
function(num){
return !Number.isFinite(arguments.length == 1 ? num : this.valueOf());
});

m$(Float,"equals$O",
function(s){
return (s instanceof Float) && s.valueOf()==this.valueOf();
});

Clazz._setDeclared("Double", java.lang.Double=Double=function(){
if (typeof arguments[0] != "object")this.c$(arguments[0]);
});
decorateAsNumber(Double,"Double", "double", "D");
Double.toString=Double.toString$D=Double.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Double){
return"class java.lang.Double";
}
return Clazz._floatToString(this.valueOf());
};

m$(Double, ["c$", "c$$S", "c$$D"], function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
  v = Double.parseDouble$S(v);
 this.valueOf=function(){return v;};
}, 1);

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=4.9e-324;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.7976931348623157e+308;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;
//Double.TYPE=Double.prototype.TYPE=Double;

Double.isNaN$D = m$(Double,"isNaN$",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
});

Float.prototype.hashCode$ = Double.prototype.hashCode$ = function() {("" + this.valueOf()).hashCode$()}
Double.isInfinite$D = m$(Double,"isInfinite$",
function(num){
return!Number.isFinite(arguments.length == 1 ? num : this.valueOf());
});

m$(Double,"parseDouble$S",
function(s){
if(s==null){
  throw Clazz.new_(NumberFormatException.c$$S, ["null"]);
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
if (s == "NaN")
	return NaN;
var doubleVal=Number(s);
if(isNaN(doubleVal)){
throw Clazz.new_(NumberFormatException.c$$S, ["Not a Number : "+s]);
}
return doubleVal;
}, 1);

m$(Double,["valueOf$S","valueOf$D"],
function(v){
return Clazz.new_(Double.c$, [v]);
}, 1);

Double.prototype.equals = m$(Double,"equals$O",
function(s){
return (s instanceof Double) && s.valueOf()==this.valueOf();
});

Clazz._setDeclared("Boolean", 
Boolean = java.lang.Boolean = Boolean || function(){
if (typeof arguments[0] != "object")this.c$(arguments[0]);
});

extendObject(Boolean);

Boolean.__CLASS_NAME__="Boolean";
addInterface(Boolean,[java.io.Serializable,java.lang.Comparable]);
setJ2STypeclass(Boolean, "boolean", "Z");
//extendPrototype(Boolean, true, false);
Boolean.serialVersionUID=Boolean.prototype.serialVersionUID=-3665804199014368530;

m$(Boolean, ["c$", "c$$S", "c$$Z"],
function(s){
  var b = ((typeof s == "string" ? Boolean.toBoolean(s) : s) ? true : false);
  this.valueOf=function(){return b;};
}, 1);

m$(Boolean,["booleanValue","booleanValue$"], function(){ return this.valueOf(); });

m$(Boolean,"compare$Z$Z", function(a,b){return(a == b ? 0 : a ? 1 : -1);}, 1);

m$(Boolean,["compareTo$Boolean","compareTo$TT"],
		function(b){
		return(b.valueOf() == this.valueOf() ? 0 : this.valueOf() ? 1 : -1);
		});

Boolean.prototype.equals = m$(Boolean,"equals$O",
		function(obj){
		return obj instanceof Boolean && this.booleanValue()==obj.booleanValue();
		});

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

m$(Boolean,"hashCode$", function(){ return this.valueOf()?1231:1237;});
m$(Boolean,"hashCode$Z", function(b){ return b?1231:1237;}, 1);

m$(Boolean,"logicalAnd$Z$Z", function(a,b){return(a && b);}, 1);
m$(Boolean,"logicalOr$Z$Z", function(a,b){return(a || b);}, 1);
m$(Boolean,"logicalXor$Z$Z", function(a,b){return !!(a ^ b);}, 1);

m$(Boolean,"parseBoolean$S", function(s){return Boolean.toBoolean(s);}, 1);

m$(Boolean,"toString",function(){return this.valueOf()?"true":"false";});
m$(Boolean,"toString$Z",function(b){return "" + b;}, 1);

m$(Boolean,"valueOf$S",function(s){	return("true".equalsIgnoreCase$S(s)?Boolean.TRUE:Boolean.FALSE);}, 1);
m$(Boolean,"valueOf$Z",function(b){ return(b?Boolean.TRUE:Boolean.FALSE);}, 1);

//the need is to have new Boolean(string), but that won't work with native Boolean
//so instead we have to do a lexical switch from "new Boolean" to "Boolean.from"
//note no $ here

m$(Boolean,"toBoolean",
function(name){
return(typeof name == "string" ? name.equalsIgnoreCase$S("true") : !!name);
}, 1);

m$(Boolean,"from",
function(name){
return Boolean.toBoolean(name) ? Boolean.TRUE : Boolean.FALSE;
}, 1);

Boolean.TRUE=Boolean.prototype.TRUE=Clazz.new_(Boolean.c$, [true]);
Boolean.FALSE=Boolean.prototype.FALSE=Clazz.new_(Boolean.c$, [false]);


Clazz._Encoding={
  UTF8:"utf-8",
  UTF16:"utf-16",
  ASCII:"ascii"
};

(function(Encoding) {

Encoding.guessEncoding=function(str){
return (str.charCodeAt(0)==0xEF&&str.charCodeAt(1)==0xBB&&str.charCodeAt(2)==0xBF ? Encoding.UTF8
  : str.charCodeAt(0)==0xFF&&str.charCodeAt(1)==0xFE ? Encoding.UTF16 
  : Encoding.ASCII);
};

Encoding.guessEncodingArray=function(a, offset){
return (a[offset]==0xEF&&a[offset + 1]==0xBB&&a[offset + 2]==0xBF ? Encoding.UTF8 
  : a[offset + 0]==0xFF&&a[offset + 1]==0xFE ? Encoding.UTF16 : Encoding.ASCII);
};

Encoding.readUTF8Array=function(a, offset, length){
if (arguments.length == 1) {
  offset = 0;
  length = a.length;
}
var encoding=Encoding.guessEncodingArray(a);
var startIdx=0;
if(encoding==Encoding.UTF8){
startIdx=3;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}
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


Encoding.convert2UTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
return str;
}else if(encoding==Encoding.UTF16){
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

 
 String.CASE_INSENSITIVE_ORDER = {
	 compare$: function(s1, s2){
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
 
String.CASE_INSENSITIVE_ORDER.compare$S$S = String.CASE_INSENSITIVE_ORDER.compare$;

CharSequence.$defaults$(String);
 
;(function(sp) {

sp.compareToIgnoreCase$S = function(str) { return String.CASE_INSENSITIVE_ORDER.compare$S$S(this, str);}

sp.replace$=function(c1,c2){
  if (c1 == c2 || this.indexOf (c1) < 0) return "" + this;
  if (c1.length == 1) {
    if ("\\$.*+|?^{}()[]".indexOf(c1) >= 0)   
      c1 = "\\" + c1;
  } else {    
    c1=c1.replace(/([\\\$\.\*\+\|\?\^\{\}\(\)\[\]])/g,function($0,$1){
      return "\\"+$1;
    });
  }
  return this.replace(new RegExp(c1,"gm"),c2);
};

sp.replaceAll$S$S=sp.replaceAll$CharSequence$CharSequence=function(exp,str){
var regExp=new RegExp(exp,"gm");
return this.replace(regExp,str);
};
sp.replaceFirst$S$S=function(exp,str){
var regExp=new RegExp(exp,"m");
return this.replace(regExp,str);
};
sp.matches$S=function(exp){
if(exp!=null){
exp="^("+exp+")$";
}
var regExp=new RegExp(exp,"gm");
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

sp.split$S=sp.split$S$I=function(regex,limit){
var arr;
if (!limit && regex == " ") {
	arr = this.split(" ");
} else if(limit && limit > 0){
	if(limit == 1){
	  arr = [this];
	} else {
		var regExp=new RegExp("("+regex+")","gm");
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
	var regExp=new RegExp(regex,"gm");
	arr = this.split(regExp);
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

//var charset=["utf-8","utf8","us-ascii","iso-8859-1","8859_1","gb2312","gb18030"];
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
if(arguments.length==1){
 var cs=arguments[0].toString().toLowerCase();
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
  s=Encoding.convert2UTF8(this);
 }
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
sp.compareTo$ = sp.compareTo$S = sp.compareTo$TT = function(a){return this > a ? 1 : this < a ? -1 : 0} // bh added

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
return""+o;
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


//sp.chars$ = CharSequence.prototype.chars$;
//sp.codePoints$ = CharSequence.prototype.codePoints$;

// toString is always unqualified, and it is unnecessary for String


})(String.prototype);

/*
String(byte[] bytes)
String(char[] value)
String(StringBuffer buffer)
String(StringBuilder builder)
String(String original)

String(byte[] ascii, int hibyte)
String(byte[] bytes, Charset charset)
String(byte[] bytes, String charsetName)

String(byte[] bytes, int offset, int length)
String(char[] value, int offset, int count)
String(int[] codePoints, int offset, int count)

String(byte[] bytes, int offset, int length, Charset charset)
String(byte[] bytes, int offset, int length, String charsetName)
String(byte[] ascii, int hibyte, int offset, int count)
*/

var textDecoder = null;

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
  if (x.__BYTESIZE || x instanceof Array){
    return (x.length == 0 ? "" : typeof x[0]=="number" ? Encoding.readUTF8Array(x) : x.join(''));
  }
  return x.toString();
case 2:  
  // String(byte[] ascii, int hibyte)
  // String(byte[] bytes, Charset charset)
  // String(byte[] bytes, String charsetName)

  var hibyte=arguments[1];
  return (typeof hibyte=="number" ? String.instantialize(x,hibyte,0,x.length) 
	: self.TextDecoder && (textDecoder || (textDecoder = new TextDecoder())) && arguments[1].toString().toUpperCase() == "UTF-8" ? textDecoder.decode(arguments[0])
	: String.instantialize(x,0,x.length,hibyte));
case 3:
  // String(byte[] bytes, int offset, int length)
  // String(char[] value, int offset, int count)
  // String(int[] codePoints, int offset, int count)

  var bytes=x;
  var offset=arguments[1];
  var length=arguments[2];
  if(arguments[2]instanceof Array){
    // ???
    bytes=arguments[2];
    offset=x;
    length=arguments[1];
  }
  var arr=new Array(length);
  if(offset<0||length+offset>bytes.length){
    throw new IndexOutOfBoundsException();
  }
  if(length>0){
    var isChar=(bytes[offset].length!=null);
    if(isChar){
      for(var i=0;i<length;i++){
        arr[i]=bytes[offset+i];
      }
    }else{
      for(var i=0;i<length;i++){
        arr[i]=String.fromCharCode(bytes[offset+i]);
      }
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
    	if (",utf8,utf-8,utf_8,".indexOf("," + cs + ",") >= 0)
    		return Encoding.readUTF8Array(bytes,offset,length);
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

String.join$CharSequence$CharSequenceA = function(sep,array) {
 var ret = "";
 var s = "";
 for (var i = 0; i < array.length; i++) {
	 ret += s + array[i].toString();
	 s || (s = sep);	 
 }
 return ret;
}

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
if (typeof arguments[0] != "object")this.c$(arguments[0]);
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

m$(C$,"valueOf$C",function(c){return Clazz.new_(Character.c$, [c]);},1);

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
m$(C$,"charCodeAt$I",
function(i){
return(this.value).charCodeAt(i);
});

m$(C$,["compareTo$C","compareTo$","compareTo$TT"],
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

//A character may be part of a Java identifier if any of the following are true:
//
//    it is a letter
//    it is a currency symbol (such as '$')
//    it is a connecting punctuation character (such as '_')
//    it is a digit
//    it is a numeric letter (such as a Roman numeral character)
//    it is a combining mark
//    it is a non-spacing mark
//    isIdentifierIgnorable returns true for the character 
    
    
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
Long.compare$J$J =
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

// NOTE THAT java.util.Date, like java.lang.Math, is unqualified by the transpiler -- this is NOT necessary

Clazz._setDeclared("java.util.Date", java.util.Date=Date);
//Date.TYPE="java.util.Date";
Date.__CLASS_NAME__="Date";
addInterface(Date,[java.io.Serializable,java.lang.Comparable]);

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
m$(java.util.Date,["compareTo","compareTo$java_util_Date","compareTo$","compareTo$TT","compareTo$O"],
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
dp.toGMTString$ = dp.toGMTString;
dp.toLocaleString$ = dp.toLocaleString = dp.toLocaleDateString;
dp.UTC$ = dp.UTC;


	
})(Date.prototype);

/*
 Java8 classes have default methods
Clazz.newInterface(java.util,"Iterator");

Clazz.newInterface(java.util,"ListIterator",java.util.Iterator);
Clazz.newInterface(java.util,"Enumeration");
Clazz.newInterface(java.util,"Collection",Iterable);

Clazz.newInterface(java.util,"Set",java.util.Collection);
Clazz.newInterface(java.util,"Map");
Clazz.newInterface(java.util.Map,"Entry");

Clazz.newInterface(java.util,"List",java.util.Collection);

Clazz.newInterface(java.util,"Queue",java.util.Collection);
Clazz.newInterface(java.util,"RandomAccess");
*/

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

m$(C$, 'getMessage$', function () {return this.message || this.detailMessage});

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

var printStackTrace = function(e, ps) {
ps.println$O("" + e);
if (!e.stackTrace){
  ps.println$O(e.stack);
  return;
}
for (var i = 0; i < e.stackTrace.length; i++) {
var t = e.stackTrace[i];
if (t.nativeClazz == null || isInstanceOf(t.nativeClazz, Throwable) < 0) {
 ps.println$O(t);
}
}
// from a JavaScript error 
e.stack && ps.println$O(e.stack);
}

m$(C$, ['printStackTrace$java_io_PrintStream','printStackTrace$java_io_PrintWriter'], function (stream) {
  printStackTrace(this, stream);
});

Clazz.newMeth(C$, 'fillInStackTrace$', function () {
this.stackTrace = Clazz.array(StackTraceElement);
try {
var caller = arguments.callee.caller;
var superCaller = null;
var callerList = [];
var index = 0;
while (index < 20 && caller != null) {
  index++;
  var clazzName = null;
  var nativeClazz = null;
  superCaller = caller;
  if (superCaller.exClazz != null) {
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
 s += "(Unknown Source)";
}else{
var lineNum=this.getLineNumber$();
s += '(' + fName;
if(lineNum>=0){
 s += ':' + lineNum;
}
 s += ')';
}}return s;
});


TypeError.prototype.getMessage$ || (TypeError.prototype.getMessage$ = TypeError.prototype.getLocalizedMessage$ 
			= function(){ return (this.stack ? this.stack : this.message || this.toString()) + (this.getStackTrace ? this.getStackTrace$() : Clazz._getStackTrace())});
TypeError.prototype.printStackTrace$ = function(){System.out.println(this + "\n" + this.stack)};
TypeError.prototype.printStackTrace$java_io_PrintStream = function(stream){stream.println$S(this + "\n" + this.stack);};
TypeError.prototype.printStackTrace$java_io_PrintWriter = function(printer){printer.println$S(this + "\n" + this.stack);};
Clazz.Error = Error;

var declareType = function(prefix, name, clazzSuper, interfacez) {
  var cl = Clazz.newClass(prefix, name, null, clazzSuper, interfacez);
  if (clazzSuper)
    setSuperclass(cl, clazzSuper);
  return cl;
};

// at least allow Error() by itself to work as before
Clazz._Error || (Clazz._Error = Error);
//setSuperclass(Clazz._Error, Throwable);

var setEx = function(C$) {
 C$.$clinit$ = 1;
 m$(C$, "c$", function() { C$.superclazz.c$.apply(this, []);}, 1);
 m$(C$, "c$$S", function(detailMessage){C$.superclazz.c$$S.apply(this,[detailMessage]);},1);
 m$(C$, "c$$Throwable", function(exception){C$.superclazz.c$$Throwable.apply(this, arguments);}, 1);
 m$(C$, "c$$S$Throwable", function(detailMessage,exception){C$.superclazz.c$$S$Throwable.apply(this, arguments);
}, 1);

 return C$;
}

;(function() {
var C$ = Clazz.newClass(java.lang, "Error", function (){
var err = Clazz._Error();
return err;
}, Throwable);
setEx(C$);
})();

var newEx = function(prefix, name, clazzSuper) {
  return setEx(declareType(prefix, name, clazzSuper));
}

newEx(java.lang,"Exception",Throwable);

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
newEx(java.lang,"NumberFormatException",IllegalArgumentException);
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

C$=Clazz.newClass(java.io,"InterruptedIOException",function(){
this.bytesTransferred=0;
},java.io.IOException);


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


C$=Clazz.newClass(java.io,"OptionalDataException",function(){
this.eof=false;
this.length=0;
},java.io.ObjectStreamException);

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
//java.lang.Void.TYPE=java.lang.Void;
//java.lang.V

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

// Constructor, Field, Method all moved back to their original class js; no need to have those here


//  if (needPackage("core"))
  //  _Loader.loadPackage("core");  


//Clazz._Loader.loadZJar(Clazz._Loader.getJ2SLibBase() + "core/coreswingjs.z.js", "swingjs.JSUtil");

  //if (!J2S._isAsync) {
if (!J2S._loadcore || J2S._coreFiles.length == 0) {
	if (J2S._verbose)System.out.println("Clazz: No core files to load -- check Info.core"); 
} else {  
  J2S.onClazzLoaded && J2S.onClazzLoaded(1, "Clazz loaded; loading J2S._coreFiles " + J2S._coreFiles.length);
  for (var i = 0; i < J2S._coreFiles.length; i++) {
	Clazz.loadScript(J2S._coreFiles[i]);
  }
  J2S.onClazzLoaded && J2S.onClazzLoaded(2, "Clazz loaded; core files loaded");
}

}
})(J2S, window, document); 
