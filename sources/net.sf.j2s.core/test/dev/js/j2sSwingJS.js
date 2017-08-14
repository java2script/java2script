// j2sSwingJS.js 
// NOTE: updates to this file should be copies to j2sjmol.js

// latest author: Bob Hanson, St. Olaf College, hansonr@stolaf.edu

// TODO: fix Array.newInstance
// TODO: check array.clone
// TODO: check issue for static calls not showing up in requirements. 
//           How to handle static calls other class static methods?
// TODO: check issue that some static calls do not need to be put in must/optional 
// TODO: getResourceAsStream is using new java.io.BufferedInputStream and Clazz.isAB()

// NOTES by Bob Hanson

// BH 8/13/2017 8:06:48 PM rewrites Array class; adds Array.newArray(class, dimension)
// BH 8/12/2017 7:08:39 AM instanceOf fix for arrays
// BH 8/12/2017 6:23:13 AM comments out deprecated methods
// BH 8/11/2017 7:53:55 AM reflection for all 8 primitive types fixed;
// BH 8/11/2017 7:52:02 AM adding primitive Integer.TYPE, Float.TYPE classes
// BH 8/10/2017 6:51:22 AM added newA$, newByteA$, newIntA$, newDoubleA$, newArray$, var newTypedA$
// BH 8/10/2017 6:30:31 AM $newEnumConst cleaned up; implicit valueOf() and values() moved to transpiler   
// BH 8/7/2017 11:18:50 PM further testing on java.* 
// BH 8/5/2017 7:20:40 PM adds $newEnumConst, System.out.format/printf, System.err.format/printf
// BH 8/1/2017 10:52:23 AM added Clazz.super$(cl,obj)
// BH 7/31/2017 5:18:25 PM deprecated checkPrivateMethod,
// BH 7/30/2017 3:34:36 PM new  for inner classes
// BH 7/30/2017 12:01:54 AM adds Clazz.$new, .newInstance$, .newMethod$
// BH 7/12/2017 6:49:49 PM fixing int[][] a = new int[3][] -- finally!!
// BH 7/7/2017 7:10:39 AM fixes Clazz.clone for arrays
// BH 6/13/2017 11:53:42 PM fixes bug introduced 6/8/2017
// BH 6/8/2017 7:52:44 AM fixes issue that f(Number)in subclass called even if f(Float) is in superclass 
// BH 4/7/2017 10:51:07 AM fix for Math.signum(f)
// BH 3/11/2017 9:08:42 AM added this() to EventObject
// BH 1/9/2017 7:31:11 AM fix for basefolder //
// BH 1/8/2017 12:41:48 PM allowing java.io.File
// BH 1/7/2017 7:01:02 AM better error messaging in loadScript
// BH 12/21/2016 9:29:56 PM  XX.getClass().getResource() broken (since forever)
// BH 12/20/2016 1:42:06 PM allowing file caching from class loader
// BH 12/20/2016 7:49:03 AM final inner class nesting fix for $b$
//   -trouble with two similar inner classes that both extend an class that itself has inner classes that need to reference their own (different) outer class.
// BH 12/18/2016 7:16:21 AM GCC fix for trailing comma in System
// BH 12/15/2016 6:55:40 AM URL line switches:
//     -j2sdebugCode  do not use core files at all
//     -j2sdebugCore  use coreXXXX.js rather than coreXXXX.z.js and debugger if a class is defined twice
//     -j2sdebugName=java.util.Hashtable  debugger started for load or declareInterface
// BH 11/30/2016 7:17:33 AM inner class nesting fix for b$
// BH 11/27/2016 7:26:24 AM c$ final fix
// BH 11/25/2016 1:27:16 PM class.isInstance(obj) fixed
// BH 11/19/2016 10:01:22 AM better profiling with Clazz.startProfiling(seconds) 
// BH 11/14/2016 9:40:59 AM removing extraneous "sp" super-field-prep calls
// BH 11/13/2016 12:16:13 PM fixing Number.compareTo
// BH 11/10/2016 9:47:00 PM prepField work complete; added System.exit()
// BH 11/6/2016 1:17:41 PM fixing order of superclass prep
// BH 11/3/2016 7:26:11 PM fix for superclass "this" improperly referring to subclass constructor
// BH 11/1/2016 7:28:32 AM rewrite of field preparation code -- now like Java, not interleaved with constructors for subclasses
// BH 10/31/2016 6:01:16 PM fix for superclass preps not being executed (PhetGraphicsModule/Module)
// BH 10/30/2016 5:59:41 AM fix getStackTrace() for arguments that cannot be turned into a string using "" + x
// BH 10/29/2016 5:45:25 PM getClass().getClassLoader() should use full path
// BH 10/26/2016 9:35:03 AM adds Clazz._Loader.setClassPathFor(className)
// BH 10/15/2016 9:28:13 AM adds Float.floatToIntBits(f)
// BH 7/31/2016 2:56:07 PM fix for compiler error using overrideMethod for functions that contain superCall()
// BH 7/31/2016 5:56:59 AM floatToInt and floatToChar need to consider NaN
// BH 7/23/2016 6:03:20 PM work-around for new Boolean(string), since native JavaScript Boolean does not support that;
//                         uses "new Boolean" --> "Boolean.from" in build.xml
// BH 7/23/2016 8:00:43 AM added Clazz._traceOutput
// BH 7/21/2016 12:37:01 PM added note for infinite loop when a dependency file is needed but not found loading a UI file. (Clazz._isQuiet) 
// BH 7/20/2016 6:21:36 PM  class.getClassLoader().getResource(URL) does not find correct base directory
// BH 7/19/2016 11:20:03 AM static nested class instances are referenced by the Java compiler as "Outer$Inner" 
//                          and must be able to be references as such in Clazz._4Name
// BH 7/18/2016 10:21:40 PM abstract classes that have prepareFields must declare a default superconstructor
// BH 7/18/2016 10:28:47 AM adds System.nanoTime()
// BH 7/17/2016 4:19:07 PM prepareFields modified to save b$[] in outer class, not inner
//                         thus saving considerably on overhead when inner classes are created
//                         Also note that use of @j2sOverrideConstructor 
// BH 7/11/2016 11:32:29 PM adds XxxxArray.getClass()
// BH 7/7/2016 10:24:36 AM fixed Float.isInfinite(), Double.isInfinite()
// BH 7/7/2016 10:12:20 AM added Number.compare(a,b) (technically just Float and Double)
// BH 7/7/2016 7:10:09 AM note added about String and CharSequence
// BH 7/6/2016 5:30:24 PM adds Character.charCount(c)
// BH 7/6/2016 6:26:41 AM adds String.format()
// BH 7/4/2016 1:34:18 PM Frame1$Dialog1 uses wrong instance of Window in prepareCallbacks #23 
// BH 7/3/2016 3:49:29 PM tweak of delegate, replacing evaluateMethod with findMethod
// BH 6/16/2016 5:55:33 PM adds Class.isInstance(obj)
// BH 6/16/2016 3:27:50 PM adds System property java.code.version == "50" (Java 1.6)
// BH 6/16/2016 1:47:41 PM fixing java.lang.reflect.Constructor and java.lang.reflect.Method
// BH 6/15/2016 6:04:13 PM subclass of B, where B is an abstract subclass of C fails
// BH 6/15/2016 5:16:01 PM adds java.lang.Math = Math
// BH 6/15/2016 5:16:19 PM removing alert in relation to overridden private method. 
//                         more importantly would be a private xxx() between 
//                         super and sub, sub missing the function, and super having it.
// AR 6/14/2016 10:47:04 AM added java-specific Math.xxx; Math.rint fixed
// BH 6/13/2016 11:53:30 PM https://groups.google.com/forum/#!topic/java2script/mjrUxnp1VS8 interface beats class fixed
// BH 6/12/2016 10:19:41 PM ensuring Class.forName("....").newInstance() requires a default constructor
// BH 6/12/2016 5:07:22 PM complete rewrite of inheritance field preparation and constructors
// BH 6/12/2016 11:17:43 AM removing Clazz.dateToString
// BH 6/9/2016 9:40:31 AM refactoring SAEM for efficiencies
// BH 6/8/2016 4:19:55 PM "con$truct" renamed "$prepare$" and placed ahead of constructor (two places)
// BH 6/7/2016 9:29:59 PM adds updateNode check for over 100 iterations, 
//                        which is probably an error and is easily spotted

// see earlier notes at swingjs/doc/j2snotes.txt
 
LoadClazz = function() {

var debugNoSwingJS = true;
if (debugNoSwingJS)alert("Note! debugNoSwingJS in j2sSwingJS.js")


// BH c$ is the ONLY global used in SwingJS now. I do not think it is necessary,
// but it is created by the compiler, and I have not found a post-compile work-around.
// It is used as a local variable in class definitions to point to the 
// current method. See Clazz.p0p and Clazz.pu$h

if (!window["j2s.clazzloaded"])
  window["j2s.clazzloaded"] = false;

if (window["j2s.clazzloaded"])return;

window["j2s.clazzloaded"] = true;

window["j2s.object.native"] = true;

 /* http://j2s.sf.net/ *//******************************************************************************
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
 


/**
 * Class Clazz. All the methods are static in this class.
 */
/* static */
/*Class = */ Clazz = {
  _isQuiet: false,
  _debugging: false,
  _nooutput: 0
};

;(function(Clazz, J2S) {

Clazz.popup = Clazz.assert = Clazz.log = Clazz.error = window.alert;

//J2S._debugCode = false;

Clazz.$new = function(c, args, cl) {
  args || (args = [[]]);
  
  var t0 = (_profileNew ? window.performance.now() : 0);
  
  if (c.__CLASS_NAME__)
    c = c.construct;
    
  // an inner class will attach arguments to the arguments returned
  // Integer will be passed as is here, without c.exClazz, or cl
  var f = new (Function.prototype.bind.apply(cl || c.exClazz || c, arguments));
  c.apply(f, args);
    
  _profileNew && addProfileNew(myclass, window.performance.now() - t0);

  return f;
}

Clazz.$newEnumConst = function (c, enumName, enumOrdinal, args, cl) {
  var o = Clazz.$new(c, args, cl);
  o.$name = enumName;
  o.$ordinal = enumOrdinal;
  var clazzEnum = c.exClazz;
  return clazzEnum[enumName] = clazzEnum.prototype[enumName] = o;
}
    
Clazz.super$ = function(cl, obj) {
  if (cl.superClazz && cl.superClazz.construct) {
    // added [] here to account for the possibility of vararg default constructor
    cl.superClazz.construct.apply(obj, [[]]);
  }
}

Clazz.newInstance$ = function (objThis, args, isInner) {
  if (args && (args[0] == _prepOnly 
  || args[0] == Clazz.inheritArgs 
  || args[1] == Clazz.inheritArgs 
  || args[2] == Clazz.inheritArgs 
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

  if (isInner) {
    // args[0] = outerObject
    // args[1] = b$ array
    // args[2-n] = actual arguments
    var outerObj = (args == null ? null : args[0]); // null for direct new xxx()  
    var finalVars = shiftArray(args, 1, 1);
    var haveFinals = (finalVars || outerObj && outerObj.$finals);
  
    if (haveFinals) {
      // f$ is short for the once-chosen "$finals"
      var of$ = outerObj.f$;
      objThis.f$ = (finalVars ? 
        (of$ ? appendMap(appendMap({}, of$), finalVars) : finalVars)
        : of$ ? of$ : null);
    }
    // hack for outer obj being WINDOW
    if (outerObj != null && outerObj != _prepOnly && outerObj.__CLASS_NAME__)    
      prepareCallback(objThis, args);      
  } else if (args && args.length == 0 && objThis.construct) {
    // allow for direct default call "new foo()" to run with its default constructor
    objThis.construct.apply(objThis);
  }

};

/**
 * in-place shift of an array by k elements, starting with element i0,
 * resetting its length in case it is arguments (which does not have the
 * .shift() method. Returns a[i0] 
 */
var shiftArray = function(a, k, i0) {
  if (a == null)
    return null;
  k || (k == 1);
  i0 || (i0 == 0);
  var arg = a[i0];
  for (var i = i0, n = a.length - k; i < n; i++)
    a[i] = a[i + k];
  a.length -= k;
  return arg;
};

/**
 * Prepare synthetic callback references b$[] for an anonymous inner class.
 * 
 * This implementation takes advantage of the fact that the inheritance of the 
 * outer object is a property of itself.    
 *
 * @param innerObj this object
 * @param args args[0] will be the outer object; args [1...] 
 *  must be shifted back to be actual calling arguments
 *  @author Bob Hanson
 */
var prepareCallback = function (innerObj, args) {
  var outerObj = args[0];
  if (outerObj == _prepOnly)return;    
  if (innerObj && outerObj && outerObj !== window) {
    // BH: For efficiency: Save the b$ array with the OUTER class as $b$, 
    // as its keys are properties of it and can be used again.
    var b = outerObj.$b$;
    var isNew = false;
    var innerName = Clazz.getClassName(innerObj, true);
    if (!b) {
      b = outerObj.b$;
      // Inner class of an inner class must inherit all outer object references. Note that this 
      // can cause conflicts. For example, b%["java.awt.Component"] could refer to the wrong
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
      var clazz = Clazz.getClass(outerObj);
      do {
        var key = Clazz.getClassName(clazz, true);
        if (!isNew && b[key])
          break;
        b[key] = outerObj; 
      } while ((clazz = clazz.superClazz));
    }
    // add a flag to disallow any other same-class use of this map.
    b["$ " + innerName] = 1;
    // it is new, save this map with the OUTER object as $b$
    if (isNew)
      outerObj.$b$ = b;
    // final objective: save this map for the inner object
    innerObj.b$ = b;
  }
  shiftArray(args, 1, 0);
};

Clazz.newMethod$ = function (clazzThis, funName, funBody, isStatic) {
  Clazz.saemCount0++;
  funBody.exName = funName;
  funBody.exClazz = clazzThis; // make it traceable
  clazzThis.prototype[funName] = funBody;
  if (isStatic || funName == "construct")
    clazzThis[funName] = funBody;
};                     

/**
 * Create an array class placeholder for reflection 
 * type is "String[][]" for instance  
 */
Clazz.arrayClass$ = function(type) {
  var o = {};
  o.arrayType = 1;
  o.__CLASS_NAME__ = o.__paramType = type;
  return o;  
}
 
Clazz.newArray$ = function(paramType, ndims, params) {
//var o =  Clazz.newArray$('IA', -1, [-1, [3, 4, 5]); --> [-1, [3, 4, 5]
//var a =  Clazz.newArray$('IA', 1, [3]); --> [3, 0]
//var p =  Clazz.newArray$('IAA', 2, [3]); --> [3, null]
//var b =  Clazz.newArray$('IAA', 2, [3, 3]); --> [3, 3, 0]
//var cp =  Clazz.newArray$('CA', 1, [3]); --> [3, '\0']
//var cq =  Clazz.newArray$('CAA', 2, [3]); --> [3, null]
//var cr =  Clazz.newArray$('CAA', 2, [3, 3]); --> [3, 3, '\0']
//var sp =  Clazz.newArray$('CA', 1, [3]); --> [3, null]
//var sq =  Clazz.newArray$('CAA', 2, [3]); --> [3, null]
//var sr =  Clazz.newArray$('CAA', 2, [3, 3]); --> [3, 3, null]

  if (paramType.__CLASS_NAME__) {
   // from Array.newArray(classType, 1, [3])
   // from Array.newArray(classType, 2, [3, 3])
    var cl = paramType;
    paramType = getParamCode(cl);
  }
  if (ndims >= 0) {
    var initValue = null;
    switch (ndims == params.length && paramType[1] == "A" ? paramType[0] : null) {
    case "B":
    case "I":
    case "L":
    case "H": // short
    case "F":
    case "D":
      initValue = 0;
      break;
    case "Z":
      initValue = false;
      break;
    case "C": 
      initValue = '\0';
      break;
    }
    params.push(initValue);
  }
  params.push(paramType);
  var arrayFunc = Clazz.newA$;
  switch (paramType[1] == "A" ? paramType[0] : null) {
  case "B":
    arrayFunc = Clazz.newByteA$;
    break;
  case "I":
  case "L":
  case "H": // short
    arrayFunc = Clazz.newIntA$;
    break;
  case "F":
  case "D":
    arrayFunc = Clazz.newDoubleA$;
    break;
  }  
  return arrayFunc.apply(null, params);
}

var getParamCode = function(cl) {
  return cl.__PARAMCODE || (cl.__PARAMCODE = cl.__CLASS_NAME__.replace(/java\.lang\./, "").replace(/\./g, '_'));
}

/**
 * Make arrays.
 *
 * @return the created Array object
 */
/* public */
Clazz.newA$ = function (a, b, c, d) {
  if (a >= 0 || arguments.length == 3) { 
    // Clazz.newA$(36,null, type)
    // Clazz.newA$(3, 0, type)
    // Clazz.newA$(3, 5, null, type)
    // Clazz.newA$(-1, ["A","B"], type)
    return newTypedA$(arguments, 0);
  }
  // truncate array using slice
  // Clazz.newA$(-1, array, ifirst, ilast+1)
  // from JU.AU;
  a = b.slice(c, d);
  a.BYTES_PER_ELEMENT = b.BYTES_PER_ELEMENT;
  a.__paramType = b.__paramType;
  return a;
};

/**
 * Make a new byte array.
 *
 * @return the created Array object
 */
Clazz.newByteA$ = function () {
  return newTypedA$(arguments, 8);
}

/**
 * Make an int, short, or long array
 *
 * @return the created Array object
 */
Clazz.newShortA$ = function () {
  return newTypedA$(arguments, 16);
}

/**
 * Make an int, short, or long array
 *
 * @return the created Array object
 */
Clazz.newIntA$ = function () {
  return newTypedA$(arguments, 32);
}

/**
 * Make a float or double array
 *
 * @return the created Array object
 */
Clazz.newDoubleA$  = function () {
  return newTypedA$(arguments, 64);
}

var newTypedA$ = function(args, nBits) {
  var dim = args[0];
  if (typeof dim == "string")
    dim = dim.charCodeAt(0); // char
  var last = args.length - 1;
  var paramType = args[last];
  var val = args[last - 1];
  if (last > 2) {
     // array of arrays
     // Clazz.newA$(3, 5, null, "SAA") // last = 3
    var xargs = new Array(last--); 
    for (var i = 0; i <= last; i++)
      xargs[i] = args[i + 1];
    // SAA -> SA
    xargs[last] = paramType.substring(0, paramType.length - 1);    
    var arr = new Array(dim);
    for (var i = 0; i < dim; i++)
      arr[i] = newTypedA$(xargs, nBits); // Call recursively
  } else {
    // Clazz.newIntA$(5, null, "IAA")    new int[5][]   val = null 
    // Clazz.newA$(5 ,null, "SA")        new String[5] val = null
    // Clazz.newA$(-1, ["A","B"], "SA")  new String[]   val = {"A", "B"}
    // Clazz.newA$(3, 5, 0, "IAA")       new int[3][5] (second pass, so now args = [5, 0, "IA"])
    if (val == null)
      nBits = 0;
    else if (nBits > 0 && dim < 0)
      dim = val; // because we can initialize an array using new Int32Array([...])
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
      var arr = (dim < 0 ? val : new Array(dim));
      nBits = 0;
      if (dim > 0 && val != null)
        for (var i = dim; --i >= 0;)
           arr[i] = val;
      break;
    }
    arr.BYTES_PER_ELEMENT = (nBits >> 3);
  }
  arr.__paramType = paramType;
  return arr;
}

try {
Clazz._debugging = (document.location.href.indexOf("j2sdebug") >= 0);
} catch (e) {
}

Clazz._traceOutput = null; // will alert in system.out.println with a message

var __debuggingBH = false;

var _globals = ["j2s.clazzloaded", "j2s.object.native"];
Clazz.setGlobal = function(a, v) {
  _globals.push(a);
  window[a] = v;
}

Clazz.getGlobals = function() {
  return _globals.sort().join("\n");
}

Clazz.setConsoleDiv = function(d) {
  window["j2s.lib"] && (window["j2s.lib"].console = d);
};

var supportsNativeObject = window["j2s.object.native"];


Clazz.duplicatedMethods = {};

//Clazz._preps = {}; // prepareFields functions based on class name

// BH Clazz.getProfile monitors exactly what is being delegated with SAEM,
// which could be a bottle-neck for function calling.
// This is critical for performance optimization.

var _profile = null;
var _profileNoOpt = false;  // setting this true will remove Bob's signature optimization

var __signatures = ""; 
var profilet0;
var _profileNew = null;
var _jsid0 = 0;

Clazz.startProfiling = function(doProfile) {
  if (typeof doProfile == "number") {
    _profileNew = (arguments[1] ? {} : null);
    _jsid0 = _jsid;
    setTimeout(function() { var s = "total wall time: " + doProfile + " sec\n" + Clazz.getProfile(); console.log(s); System.out.println(s)}, doProfile * 1000);
  }
  _profile = ((doProfile || arguments.length == 0) && self.JSON && window.performance ? {} : null);
  return (_profile ? "use Clazz.getProfile() to show results" : "profiling stopped and cleared")
}

var tabN = function(n) { n = ("" + n).split(".")[0]; return "..........".substring(n.length) + n + "\t" };

Clazz.getProfile = function() {
  var s = "run  Clazz.startProfiling() first";
  if (_profile) {
    var l = [];
    var totalcount = 0;
    var totalprep = 0;
    var totaltime = 0;
    for (var name in _profile) {
      var n = _profile[name][0];
      var t1 = _profile[name][1];
      var t2 = _profile[name][2];
      l.push(tabN(n) + tabN(t1) + tabN(t2) + name);
      totalcount += n
      totalprep += t1
      totaltime += t2
    }
    s = "\ncount   \tprep(ms)\texec(ms)\n" 
      + "--------\t--------\t--------\n" 
      + tabN(totalcount)+ tabN(totalprep)+tabN(totaltime) + "\n"
      + "--------\t--------\t--------\n" 
      + l.sort().reverse().join("\n")
      ;
    _profile = null;
    
    if (_profileNew) {
      s += "\n\n Total new objects: " + (_jsid - _jsid0) + "\n";
      s += "\ncount   \texec(ms)\n";
      s += "--------\t--------\t------------------------------\n";
      totalcount = 0;
      totaltime = 0;
      for (var key in _profileNew) {
        var count = _profileNew[key][0];
        var tnano = _profileNew[key][1];
        totalcount += count
        totaltime += tnano
        s += tabN(count) + tabN(tnano) + "\t" +key + "\n";
      }
      s+= tabN(totalcount)+tabN(totaltime) + "\n"
    }
  }
  _profileNew = null;
  return s; //+ __signatures;
}


var addProfile = function(c, f, p, t1, t2) {
  var s = c.__CLASS_NAME__ + " " + f + " ";// + JSON.stringify(p);
  if (__signatures.indexOf(s) < 0)
    __signatures += s + "\n";
  var p = _profile[s];
  p || (p = _profile[s] = [0,0,0]);
  p[0]++;
  p[1] += t1;
  p[2] += t2;
}

var addProfileNew = function(c, t) {
  var s = c.__CLASS_NAME__;
  var p = _profileNew[s]; 
  p || (p = _profileNew[s] = [0,0]);
  p[0]++;
  p[1]+=t;
}
   

/**
 * show all methods that have the same signature.
 *  
 */
Clazz.showDuplicates = function(quiet) {
  var s = "";
  var a = Clazz.duplicatedMethods;
  var n = 0;
  for (var key in a)
    if (a[key] > 1) {
      s += a[key] + "\t" + key + "\n";
      n++;
    }
  s = "Duplicates: " + n + "\n\n" + s;
  System.out.println(s);
  if (!quiet)
    alert(s);
}

/**
 * Return the class of the given class or object.
 *
 * @param clazzHost given class or object
 * @return class name
 */
/* public */
Clazz.getClass = function (clazzHost) {
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


///////////////////// method creation ////////////////////////////////

// sequence in Clazz.load function parameter:

// declarePackage
// decorateAsClass or declareType
// prepareFields
// makeConstructor
// defineMethod, overrideMethod...
// defineStatics

// c$.$StateTracker$1$ = function () {
// pu$h(self.c$);
// c$ = declareAnonymous (sun.java2d, "StateTracker$1", null, sun.java2d.StateTracker);
// overrideMethod 
// c$ = p0p ();

var doDebugger = function() { debugger }

var _declared = {};

var checkDeclared = function(name, type) {
  if (J2S._debugName && name.toLowerCase() == J2S._debugName)doDebugger();
  if (_declared[name] == type) {
    var s = (type == 1 ? "interface" : "class") +" " + name + " is defined twice. A prior core file has probably needed to load a class that is in the current core file. Check to make sure that package.js declares the first class read in jarClassPath or that BuildCompress has included all necessary files."
    System.out.println(s);
    if (J2S._debugCore)
      doDebugger();
    }
  _declared[name] = type;
}

Clazz.declareInterface = function (prefix, name, interfacez, _declareInterface) {
  var clazzFun = function () {};
  if (J2S._debugCore)
    checkDeclared((prefix.__PKG_NAME__ || prefix.__CLASS_NAME__) + "." + name, 1);
  decorateFunction(clazzFun, prefix, name);
  if (interfacez)
    implementOf(clazzFun, interfacez);
  clazzFun.$$INT$$ = clazzFun;
  return clazzFun;
};

Clazz.decorateAsClass = function (clazzFun, prefix, name, clazzParent, 
    interfacez, parentClazzInstance, _decorateAsClass) {    
  var prefixName = (prefix ? prefix.__PKG_NAME__ || prefix.__CLASS_NAME__ : null);
  var qName = (prefixName ? prefixName + "." : "") + name;
    if (Clazz._Loader._classPending[qName]) {
      delete Clazz._Loader._classPending[qName];
      Clazz._Loader._classCountOK++;
      Clazz._Loader._classCountPending--;
    }
  if (Clazz._Loader && Clazz._Loader._checkLoad) {
    Clazz._lastDecorated = prefixName + "." + name
  }
  if (unloadedClasses[qName])
    clazzFun = unloadedClasses[qName];
  decorateFunction(clazzFun, prefix, name);
  inheritClass(clazzFun, clazzParent);
  if (interfacez)
    implementOf(clazzFun, interfacez);
  return clazzFun;
};

Clazz.defineStatics = function(clazz) {
  for (var j = arguments.length, i = (j - 1) / 2; --i >= 0;) {
    var val = arguments[--j]
    var name = arguments[--j];
    clazz[name] = clazz.prototype[name] = val;
  }
};


Clazz.cloneFinals = function () {
  var o = {};
  var len = arguments.length / 2;
  for (var i = len; --i >= 0;)
    o[arguments[i + i]] = arguments[i + i + 1];
  return o;
};

Clazz.isClassDefined = function(clazzName) {
  if (!clazzName) 
    return false;    /* consider null or empty name as non-defined class */
  if (Clazz.allClasses[clazzName])
    return true;
  var pkgFrags = clazzName.split (/\./);
  var pkg = null;
  for (var i = 0; i < pkgFrags.length; i++)
    if (!(pkg = (pkg ? pkg[pkgFrags[i]] : Clazz.allPackage[pkgFrags[0]]))) {
      return false;
    }
  return (pkg && (Clazz.allClasses[clazzName] = true));
};

/**
 * Return the class name of the given class or object.
 *
 * @param clazzHost given class or object
 * @return class name
 */
/* public */
Clazz.getClassName = function(obj, fAsClassName) {
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
      if (obj instanceof Array || obj.BYTES_PER_ELEMENT)
        return "Array";
      var s = obj.toString();
      // "[object Int32Array]"
      if (s.charAt(0) == '[')
        return extractClassName(s);
    }
    return Clazz.getClassName(obj.constructor, true);
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


/*
// deprecated
Clazz.declareType = function (prefix, name, clazzSuper, interfacez, 
    superClazzInstance, _declareType) {
  var cl = Clazz.decorateAsClass (function () { 
  Clazz.instantialize (this, arguments);}, 
    prefix, name, clazzSuper, interfacez, superClazzInstance);
  if (clazzSuper)
    Clazz.makeConstructor(cl, function() {Clazz.superConstructor (this, cl, []);});
  return cl;
};

// deprecated
Clazz.prepareFields = function (clazz, fieldsFun) {
  clazz._PREP_ = fieldsFun;//Clazz._preps[clazz.__CLASS_NAME__] = fieldsFun;
  // BH even if it is overwritten, a default constructor
  // that checks for a superconstructor must be present
  // if fields such as byte[] a = new byte[30] are declared
  Clazz.makeConstructor(clazz, function() {Clazz.superConstructor (this, clazz, []);});
};

// deprecated
Clazz.makeConstructor = function (clazzThis, funBody, rawSig) {
  var f$ = Clazz.defineMethod (clazzThis, "construct", funBody, rawSig, 1);
};

// deprecated
Clazz.overrideConstructor = function (clazzThis, funBody, rawSig) {
  Clazz.overrideMethod (clazzThis, "construct", funBody, rawSig);
};

// deprecated
Clazz.declareAnonymous = function (prefix, name, clazzParent, interfacez, 
    parentClazzInstance, _declareAnonymous) {
  var f = function () {
    Clazz.prepareCallback(this, arguments);
    Clazz.instantialize (this, arguments);
  };
  var cl = Clazz.decorateAsClass (f, prefix, name, clazzParent, interfacez, 
      parentClazzInstance);
    Clazz.makeConstructor(cl, function() {Clazz.superConstructor (this, cl, []);});
  return cl;
};

// deprecated
Clazz.overrideMethod = function(clazzThis, funName, funBody, rawSig) {
  // there are problems. for example, 
  
  // Sub extends Super
  // Sub.xxx() {
  //   Super.yyy()
  // }
  
  // Super.xxx() {
  // }
  
  // Super.yyy() {
  //   super.xxx()
  // }
  
  // compiler may indicate Sub.xxx() as overrideMethod 
  // but then the stack is missing.
  
  var sig = formatSignature(rawSig);
  if (Clazz._Loader._checkLoad)
    checkDuplicate(clazzThis, funName, sig);
    
  if (Clazz.unloadClass) 
    assureInnerClass(clazzThis, funBody);
  funBody.exName = funName;  
  funBody.sigs = {sig: sig};
  funBody.overrider = clazzThis;
  return addProto(clazzThis.prototype, funName, funBody);
};

// deprecated
Clazz.defineMethod = function (clazzThis, funName, funBody, rawSig, isConstruct) {
    Clazz.saemCount0++;
  if (Clazz.unloadClass) 
    assureInnerClass(clazzThis, funBody);
  rawSig || (rawSig = "");
  funBody.exName = funName;
  funBody.sigs = {};
  var sig = formatSignature(rawSig);
  var proto = clazzThis.prototype;
  var f$ = proto[funName];
  if (Clazz._Loader._checkLoad)
    checkDuplicate(clazzThis, funName, sig);
  if (!f$ || (f$.overrider === clazzThis && f$.sigs.sig == sig)) {
    // property "sig" will be used as a mark of only-one method
    funBody.sigs.sig = sig;
    funBody.overrider = clazzThis;
    funBody.exClazz = clazzThis; // make it traceable
    return addProto(proto, funName, funBody);
  }

  funBody.exClazz = clazzThis; // make it traceable
  // we have found a duplicate
  var oldFun = null;
  var oldStack = f$.stack;
  var hadStack = (!!oldStack);
  if (!hadStack) {
    // method is not defined by Clazz.defineMethod () 
    oldFun = f$;
    oldStack = [];
    if (oldFun.overrider) {
      oldStack[0] = oldFun.overrider;
    }
  }
  // Method that is already defined in super class will be overridden
  // with a new proxy method with class hierarchy stored in a stack.
  // That is to say, the super methods are lost in this class' proxy
  // method. 
  // When method are being called, methods defined in the new proxy 
  // method will be searched through first. And if no method fitted,
  // it will then try to search method in the super class stack.
  //
  var doDelegate = (!hadStack || f$.claxxRef !== clazzThis);
  if (doDelegate) {
    //Generate a new delegating method for the class
    Clazz.saemCount1++;
       
    var delegate = function () {
      var t0 = (_profile ? window.performance.now() : 0);
      var args = [];
      for (var i = arguments.length; --i >= 0;)
        args[i] = arguments[i];
      var pTypes = getParamTypes(args);      
      var f = findMethod(this, clazzThis, args, pTypes, isConstruct);
      if (f == -1 || f == null)
        return null;
      fixNullParams(args);
      var t1 = (_profile ? window.performance.now() : 0);
      var ret = f.apply(this, args);
      _profile && addProfile(arguments.callee.claxxRef, arguments.callee.methodName, pTypes, t1 - t0, window.performance.now() - t1);            
      return (isConstruct ? f.__STACKPT__ : ret); 
    };
    delegate.claxxRef = clazzThis;
    delegate.methodName = funName;
    delegate.sigs = {};
    delegate.dsigs = {};
    f$ = addProto(proto, funName, delegate);        
    // Keep the class inheritance stack
    var a = f$.stack = [];
    for (var i = 0; i < oldStack.length; i++)
      a[i] = oldStack[i];
  }
  if (findArrayItem(f$.stack, clazzThis) < 0)
    f$.stack.push(clazzThis);  
  if (!hadStack) {
    if (oldFun.overrider === clazzThis) {
      setSignature(f$, oldFun, oldFun.sigs.sig);
      delete oldFun.sigs;
      delete oldFun.overrider;
    } else if (!oldFun.overrider) {
      // The function is not defined by Clazz.defineMethod ()
      // For example, .equals(obj)
      // In this case, we assign a "one-parameter; unknown" model, resulting in an automatic fail. 
      // TODO: check the way this works.
      setSignature(f$, oldFun, "\\void");
      f$.sigs.fparams[0] = oldFun;
    }   
  }
  setSignature(f$, funBody, sig);
  return f$;
};                     

var assureInnerClass = function (clzz, fun) {
  clzz = clzz.__CLASS_NAME__;
  if (unloadedClasses[clzz]) {
    if (clzz.indexOf("$") >= 0)
      return;
    var list = [];
    var key = clzz + "$";
    for (var s in unloadedClasses)
      if (unloadedClasses[s] && s.indexOf(key) == 0)
        list.push(s);
    if (!list.length) 
      return;
    fun = "" + fun;
    var idx1, idx2;
    if ((idx1 = fun.indexOf(key)) < 0 || (idx2 = fun.indexOf("\"", idx1 + key.length)) < 0) 
      return;
    clzz = fun.substring(idx1, idx2);
    if (!unloadedClasses[clzz] || (idx1 = fun.indexOf("{", idx2) + 1) == 0)
      return;
    if ((idx2 = fun.indexOf("(" + clzz + ",", idx1 + 3)) < 0
      || (idx2 = fun.lastIndexOf("}", idx2 - 1)) < 0)
        return;
    eval(fun.substring(idx1, idx2));
    unloadedClasses[clzz] = null;
  }
};

// deprecated
var findMethod = function(obj, clazzThis, args, pTypes, isConstruct) {
  var classTop = (isConstruct ? arguments.callee.caller.caller.exClazz || clazzThis : clazzThis);
  var dsig = classTop.__CLASS_NAME__ + pTypes.typeString;
  var dsigs = arguments.callee.caller.dsigs; // delegate.dsigs
  var f = dsigs[dsig]; 
  if (!f || _profile && _profileNoOpt) { 
    Clazz.saemCount2++;
    var claxxRef = arguments.callee.caller.claxxRef;
    var fxName = arguments.callee.caller.methodName;
    var fx = obj[fxName];
    var f = bindMethod(claxxRef, fx, fxName, args, pTypes, isConstruct ? classTop : claxxRef);
    dsigs[dsig] = (f == null ? -1 : f);
  }
  return f;
}

// deprecated
var bindMethod = function (claxxRef, fx, fxName, args, pTypes, classTop) {
  var nparams = pTypes.length; // never 0; (void) counts as 1
  var stack = fx && fx.stack || claxxRef.prototype[fxName].stack;
  
  // Search the inheritance stack [supersuper, super, this, sub,...] starting with the class containing this method
  // skip stack references in subclasses of this class
  var i;
  for (i = stack.length; --i >= 0;) {
    if (stack[i] === classTop) {
      i++;
      break;
    }
  }
  var best = null;
  var bestSig = null;
  var exact = [];
  for (var pt= -1; --i >= 0;) {
    var clazzFun = stack[i].prototype[fxName];
    var sigs = clazzFun.sigs;
    if (sigs.sig)
      setSignature(clazzFun, clazzFun, sigs.sig);
    var found = sigs.fparams[nparams];  // [[$f, ["string","int","int"]]]
    if (found && (pt = searchMethod(found, pTypes, bestSig, exact)) >= 0) {
      if (pt == found.length) {
        // best is still the best
        continue;
      }
      best = found[pt][0];
      bestSig = found[pt][1];
      best.__STACKPT__ = i;
      if (exact[0])
        return best;
    }
    // search its super class stack, looking for a better match
  }  
  return best;
};

// deprecated
var searchMethod = function(roundOne, paramTypes, bestSig, exact, debug) {
  // roundOne -  [[f$,["string","int","int"...]...]
  // Filter out all the fitted methods for the given parameters
  var roundTwo = [];
  // Note that there may be two methods with "void" 
  // since the one in slot [0] may be the default one created by
  // declareType, prepareFields, or declareAnonymous. So we must
  // count down, not up, here. 
  for (var i = roundOne.length; --i >= -1;) {
    var params;
    if (i == -1) {
      if (bestSig == null)
        break;
      params = bestSig;      
    } else {
      params = roundOne[i][1];
    }
    var fittedLevel = [];
    var isFitted = true;
    var len2 = params.length;
    var isExact = true;
    for (var j = 0; j < len2; j++) {
      var level = fittedLevel[j] = getInheritedLevel(paramTypes[j], 
          params[j], true, true);
      //if (debug)alert([paramTypes[j],fittedLevel[j],roundOne[i][j]])    
      if (level < 0) {
        isFitted = false;
        break;
      } else if (level != 0) {
        isExact = false;
      }
    }
    if (isFitted) {
      if (isExact) {
        exact[0] = 1;
        return i;
      }
      fittedLevel[paramTypes.length] = i; // Keep index for later use
      roundTwo.push(fittedLevel);
    }
  }
  if (roundTwo.length == 0)
    return -1;
  // Find out the best method according to the inheritance.
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
    if (isVectorLesser)
      min = resultTwo[i];
  }
  var index = min[paramTypes.length]; // Get the previously stored index
  //Return the method parameters' type string as indentifier of the choosen method.
  return index;
};

// deprecated
Clazz.defineEnumConstant = function (clazzEnum, enumName, enumOrdinal, initialParams, clazzEnumExt) {
  var o = (clazzEnumExt ? new clazzEnumExt() : new clazzEnum());
  // BH avoids unnecessary calls to SAEM
  o.$name = enumName;
  o.$ordinal = enumOrdinal;
  //Clazz.superConstructor (o, clazzEnum, [enumName, enumOrdinal]);
  if (initialParams && initialParams.length)
    o.construct.apply(o, initialParams);
  clazzEnum[enumName] = clazzEnum.prototype[enumName] = o;
  if (!clazzEnum["$ values"]) {
    clazzEnum["$ values"] = [] 
    clazzEnum.values = function() { return this["$ values"]; };
  }
  clazzEnum["$ values"].push(o);
};

// deprecated
Clazz.innerTypeInstance = function (clazzInner, outerObj, finalVars) {
  if (!clazzInner)
    clazzInner = arguments.callee.caller;
  var n = arguments.length - 3;
  var haveFinals = (finalVars || outerObj.$finals); 
  if (!haveFinals) {
    // actual number of arguments is arguments.length - 3;
    switch (n) {
    case 0:
      // null constructor
      return new clazzInner(outerObj);
    case 1:
      // when arguments[3] === Clazz.inheritArgs (i.e. arguments[3].$J2SNOCREATE$ == true), 
      // we have an inner class that is a subclass of another inner class, 
      // and we are simply creating a new instance, not actually running its constructor 
      return (outerObj.__CLASS_NAME__ == clazzInner.__CLASS_NAME__ 
          && arguments[3].$J2SNOCREATE$ ? outerObj : new clazzInner(outerObj, arguments[3]));
    case 2:
      return new clazzInner(outerObj, arguments[3], arguments[4]);
    case 3:
      return new clazzInner(outerObj, arguments[3], arguments[4], 
          arguments[5]);
    case 4:
      return new clazzInner(outerObj, arguments[3], arguments[4], 
          arguments[5], arguments[6]);
    case 5:
      return new clazzInner(outerObj, arguments[3], arguments[4], 
          arguments[5], arguments[6], arguments[7]);
    case 6:
      return new clazzInner(outerObj, arguments[3], arguments[4], 
          arguments[5], arguments[6], arguments[7], arguments[8]);
    case 7:
      return new clazzInner(outerObj, arguments[3], arguments[4], 
          arguments[5], arguments[6], arguments[7], arguments[8],
          arguments[9]);
    }
  }
  var obj = new clazzInner(outerObj, Clazz.inheritArgs);
  if (haveFinals) {
    // f$ is short for the once-chosen "$finals"
    var of$ = outerObj.f$;
    obj.f$ = (finalVars ? 
//      (of$ ? Object.assign({}, of$, finalVars) : finalVars)
      (of$ ? appendMap(appendMap({}, of$), finalVars) : finalVars)
      : of$ ? of$ : null);
  }
  var args = new Array(n);
  for (var i = n; --i >= 0;)
    args[i] = arguments[i + 3];
  Clazz.instantialize(obj, args);
  return obj;
};
*/
///////////////////////// private supporting method creation //////////////////////

var appendMap = function(a, b) {
  if (b)
    for (var s in b) {
        a[s] = b[s];
    }
  return a;
}

var hashCode = 0;

var NullObject = function () {};

if (supportsNativeObject) {
  Clazz._O = function () {};
  Clazz._O.__CLASS_NAME__ = "Object";
  Clazz._O.__PARAMCODE = "O";
  Clazz._O["getClass"] = function () { return Clazz._O; }; 
} else {
  Clazz._O = Object;
}

var addProto = function(proto, name, func) {
  return proto[name] = func;
};

var extendedObjectMethods = Clazz._extendedObjectMethods = [ "isInstance", "equals", "equals$O", "hashCode", "getClass", 
  "clone", "finalize", "notify", "notifyAll", "wait", "to$tring", "toString" ];


{
  var proto = Clazz._O.prototype;

  addProto(proto, "isInstance", function(c) {
    return Clazz.instanceOf(this, c);
  }),

  addProto(proto, "equals", function (obj) {
    return this == obj;
  });

  addProto(proto, "equals$O", function (obj) {
    return this == obj;
  });

  addProto(proto, "hashCode", function () {
  
    return this._$hashcode || (this._$hashcode = ++hashCode)

/*  
    try {
      return this.toString ().hashCode ();
    } catch (e) {
      var str = ":";
      for (var s in this) {
        str += s + ":"
      }
      return str.hashCode ();
    }
*/
  });

  addProto(proto, "getClass", function () { return Clazz.getClass (this); });

  addProto(proto, "clone", function () { return Clazz.clone(this); });

  // BH allows @j2sNative access without super constructor
  Clazz.clone = function(me) { 
    return appendMap(me.__paramType ? Clazz.newArray$(me.__paramType, -1, [-2, me])
     : new me.constructor(), me); 
  }
/*
 * Methods for thread in Object
 */
  addProto(proto, "finalize", function () {});
  addProto(proto, "notify", function () {});
  addProto(proto, "notifyAll", function () {});
  addProto(proto, "wait", function () {});
  addProto(proto, "to$tring", Object.prototype.toString);
  addProto(proto, "toString", function () { return (this.__CLASS_NAME__ ? "[" + this.__CLASS_NAME__ + " object]" : this.to$tring.apply(this, arguments)); });

}
    
var extendJO = Clazz._extendJO = function(c, name, isNumber) {
  if (name)
    c.__CLASS_NAME__ = c.prototype.__CLASS_NAME__ = name;
    
  if (supportsNativeObject) {

    c.isInstance = function(o) { return Clazz.instanceOf(o, this) };

    
    for (var i = 0; i < extendedObjectMethods.length; i++) {
      var p = extendedObjectMethods[i];
      addProto(c.prototype, p, Clazz._O.prototype[p]);
    }
  }
  
  if (isNumber) {
    c.equals = inF.equals;
    c.getName = inF.getName;
  }

};

var decorateAsType = function (clazzFun, qClazzName, clazzParent, 
    interfacez, parentClazzInstance, inheritClazzFuns, _decorateAsType) {
   extendJO(clazzFun, qClazzName);
  clazzFun.equals = inF.equals;
  clazzFun.getName = inF.getName;
  if (inheritClazzFuns)
    for (var i = innerNames.length, name; --i >= 0;)
      clazzFun[name = innerNames[i]] = inF[name];
  inheritClass(clazzFun, clazzParent);
  if (interfacez)
    implementOf(clazzFun, interfacez);
  return clazzFun;
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
var implementOf = Clazz._implementOf = function (clazzThis, interfacez) {
  if (arguments.length >= 2) {
    if (!clazzThis.implementz)
      clazzThis.implementz = [];
    var impls = clazzThis.implementz;
    if (arguments.length == 2) {
      if (typeof interfacez == "function") {
        impls.push(interfacez);
        copyProperties(clazzThis, interfacez);
      } else if (interfacez instanceof Array) {
        for (var i = 0; i < interfacez.length; i++) {
          impls.push(interfacez[i]);
          copyProperties(clazzThis, interfacez[i]);
        }
      }
    } else {
      for (var i = 1; i < arguments.length; i++) {
        impls.push(arguments[i]);
        copyProperties(clazzThis, arguments[i]);
      }
    }
  }
};

/*
// deprecated
Clazz.extendInterface = implementOf;

// deprecated
var getParamTypes = function (args) {
  // bh: optimization here for very common cases
  var n = args.length;
  switch (n) {
  case 0:
    var params = ["void"];
    params.typeString = "\\void";
    return params;
  case 1:
    // BH just so common
    switch (typeof args[0]) {
    case "number":
      var params = ["n"];
      params.typeString = "\\n";
      return params;
    case "boolean":
      var params = ["b"];
      params.typeString = "\\b";
      return params;
    }
  }
  var pTypes = new Array(n);
  for (var i = 0; i < n; i++)
    pTypes[i] = Clazz.getClassName(args[i]);
  pTypes.typeString = "\\" + pTypes.join ('\\');
  return pTypes;
};

// deprecated
var fixNullParams = function(args) {
  for (var i = args.length; --i >= 0;)
    args[i] && args[i]._NULL_ && (args[i] = null);
}

// deprecated
var setSignature = function(f$, funBody, sig) {
  var params = sig.substring(1).split("\\");
  var nparams = params.length;
  if (!f$.sigs)
    f$.sigs = {};
  if (!f$.sigs.fparams)
    f$.sigs.fparams = [];
  if (!f$.sigs.fparams[nparams])
    f$.sigs.fparams[nparams] = [];
  delete f$.sigs.sig;
  f$.sigs.fparams[nparams].push([funBody, params]);
}
*/

Clazz.saemCount0 = 0 // methods defined        5400 (Ripple.js)
Clazz.saemCount1 = 0 // delegates created       937
Clazz.saemCount2 = 0 // delegates bound         397
Clazz.saemCount3 = 0 // getInheritedLevels started      
Clazz.saemCount4 = 0 // getInheritedLevels checked

var evalType = function (typeStr, isQualified) {
  var idx = typeStr.lastIndexOf(".");
  if (idx >= 0) {
    var pkgName = typeStr.substring (0, idx);
    var pkg = Clazz.declarePackage (pkgName);
    var clazzName = typeStr.substring (idx + 1);
    return pkg[clazzName];
  } 
  if (isQualified)
    return window[typeStr];
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
    return window[typeStr];
  }
};

var equalsOrExtendsLevel = function (clazzThis, clazzAncestor) {
  if (clazzThis === clazzAncestor)
    return 0;
  if (clazzThis.implementz) {
    var impls = clazzThis.implementz;
    for (var i = 0; i < impls.length; i++) {
      var level = equalsOrExtendsLevel (impls[i], clazzAncestor);
      if (level >= 0) {
        return level + 1;
        }
    }
  }
  return -1;
};

/*
// deprecated
var checkDuplicate = function(clazzThis, funName, fpName) {
  var proto = clazzThis.prototype;
  var f$ = proto[funName];
  if (f$ && (f$.overrider || f$.claxxRef) === clazzThis) {
    key = clazzThis.__CLASS_NAME__ + "." + funName + fpName;
    var m = Clazz.duplicatedMethods[key];
    if (m) {
      var s = "Warning! Duplicate method found for " + key;
      System.out.println(s);
      Clazz.alert(s);
      Clazz.duplicatedMethods[key] = m + 1; 
    } else {
      Clazz.duplicatedMethods[key] = 1;
    }
  }
}

// deprecated
var formatSignature = function (rawSig) {
  return (rawSig ? rawSig.replace (/~([NABSO])/g, 
      function ($0, $1) {
        switch ($1) {
        case 'N':
          return "n";
        case 'B':
          return "b";
        case 'S':
          return "String";
        case 'O':
          return "Object";
        case 'A':
          return "Array";
        }
        return "Unknown";
      }).replace (/\s+/g, "").replace (/^|,/g, "\\").replace (/\$/g, "org.eclipse.s") : "\\void");
};
*/
/*
 * BH Clazz.getProfile monitors exactly what is being delegated with SAEM,
 * which could be a bottle-neck for function calling.
 * This is critical for performance optimization.
 */ 

/////////////////////// inner function support /////////////////////////////////

/**
 * Once there are other methods registered to the Function.prototype, 
 * those method names should be add to the following Array.
 */
/*
 * static final member of interface may be a class, which may
 * be function.
 */

var getInheritedLevel = function (clazzTarget, clazzBase, isTgtStr, isBaseStr) {
  if (clazzTarget === clazzBase)
    return 0;
//  var isTgtStr = (typeof clazzTarget == "string");
  if (isTgtStr && ("void" == clazzTarget || "unknown" == clazzTarget))
    return -1;
//  var isBaseStr = (typeof clazzBase == "string");
  if (isBaseStr && ("void" == clazzBase || "unknown" == clazzBase))
    return -1;
  if (clazzTarget === (isTgtStr ? "NullObject" : NullObject)) {
    switch (clazzBase) {
    case "n":
    case "b":
      return -1;
    case Number:
    case Boolean:
    case NullObject:
      break;
    default:
      return 0;
    }
  }  
  
  if (isTgtStr)
    clazzTarget = evalType(clazzTarget);
  if (isBaseStr)
    clazzBase = evalType(clazzBase);
  if (!clazzBase || !clazzTarget)
    return -1;
  var level = 0;
  var zzalc = clazzTarget; // zzalc <--> clazz
  while (zzalc !== clazzBase && level < 10) {
    /* maybe clazzBase is interface */
    if (zzalc.implementz) {
      var impls = zzalc.implementz;
      for (var i = 0; i < impls.length; i++) {
        var implsLevel = equalsOrExtendsLevel (impls[i], clazzBase);
        if (implsLevel >= 0)
          return level + implsLevel + 1 + (clazzBase.$$INT$$ == clazzBase ? -0.2 : 0);
      }
    }
    zzalc = zzalc.superClazz;
    if (!zzalc)
      return (clazzBase === Object || clazzBase === Clazz._O ? 
        // getInheritedLevel(String, CharSequence) == 1
        // getInheritedLevel(String, Object) == 1.5
        // So if both #test(CharSequence) and #test(Object) existed,
        // #test("hello") will correctly call #test(CharSequence)
        // instead of #test(Object).
        level + 1.5 // 1.5! Special!
      : -1);
    level++;
  }
  return level;
};

var innerNames = [
  "equals", "equals$O", "hashCode", /*"toString",*/ 
  "getName", "getCanonicalName", "getClassLoader", "getResource", 
  "getResourceAsStream", "defineMethod", "defineStaticMethod",
  "makeConstructor",  
    "getSuperclass", "isAssignableFrom", 
    "getConstructor", 
    "getDeclaredMethod", "getDeclaredMethods",
    "getMethod$S$ClassA", "getMethods",   
    "getModifiers", /*"isArray",*/ "newInstance"
];

/*
 * Static methods
 */
var inF = Clazz._inF = {
  /*
   * Similar to Object#equals
   */
   
  equals : function (aFun) {
    return this === aFun;
  },

  equals$O : function (aFun) {
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
  getCanonicalName : function () {
    return this.__CLASS_NAME__;
  },
  getClassLoader : function () {
    var clazzName = this.__CLASS_NAME__;
    var baseFolder = Clazz._Loader.getJ2SLibBase(); // getClass().getClassLoader() uses full path
    var loader = Clazz._Loader.requireLoaderByBase(baseFolder);
    loader.getResourceAsStream = inF.getResourceAsStream;
    loader.getResource = inF.getResource; // BH
    return loader;
  },

  getResource : function(name) {
    var stream = this.getResourceAsStream(name);
    return (stream ? stream.url : null);
  },

  getResourceAsStream : function(name) {
    if (!name)
      return null;
    name = name.replace (/\\/g, '/');
    var baseFolder = null;
    var fname = name;
    var clazzName = this.__CLASS_NAME__;
    if (arguments.length == 2 && name.indexOf ('/') != 0) { // additional argument
      name = "/" + name;
    }
    if (name.indexOf ('/') == 0) {
      //is.url = name.substring (1);
      if (arguments.length == 2)  // additional argument
        baseFolder = arguments[1];
      if (!baseFolder)
        baseFolder = Clazz._Loader.getJ2SLibBase();
      if (baseFolder.charAt(baseFolder.length - 1) != '/')
        baseFolder += "/";
      fname = baseFolder + name.substring (1);
    } else {
      baseFolder = Clazz._Loader.getJ2SLibBase(); // getClass().getClassLoader() uses full path
      fname = baseFolder;      
      if (this.$_$base == null) {      
        // getClass().getResource() will be here
        var pkgs = clazzName.split(".");
        var fname = baseFolder;
        if (fname.charAt(fname.length - 1) != '/')
          fname += "/";
        var map = Clazz.allPackage;
        for (var i = 0; i < pkgs.length - 1; i++) {
          if (!(map = map[pkgs[i]]))
            break;
          fname += pkgs[i] + "/";
        }
      }
      fname += name;
    }
    var url = null;
    var javapath = fname;
    try {
      if (fname.indexOf(":/") < 0) {
        var d = document.location.href.split("?")[0].split("/");
        d[d.length - 1] = fname;
        fname = d.join("/");
      }
      url = new java.net.URL(fname);
    } catch (e) {
      return null;
    }
    var fileCache = J2S._getSetJavaFileCache(null);
    var data = fileCache && fileCache.get(javapath);   
    if (!data)
      data = J2S._getFileData(fname.toString(),null,1,1);
    
    if (data == null || data == "error" || data.indexOf && data.indexOf("[Exception") == 0)
      return null;
            
    var bytes = (Clazz.isAB(data) ? data : J2S._strToBytes(data));
    var is = new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes)); 
    is.url = url;
    url._streamData = is;
    return is;
  },
  
  getSuperclass : function() { return this.superClazz; },

  isAssignableFrom : function(clazz) {  return getInheritedLevel (clazz, this) >= 0;  },

  getConstructor : function(paramTypes) { return new java.lang.reflect.Constructor (this, paramTypes || [], [], java.lang.reflect.Modifier.PUBLIC);},
/**
 * TODO: fix bug for polymorphic methods!
 */
  getMethods : function() {
    var ms = [];
    var p = this.prototype;
    for (var attr in p) {
      if (typeof p[attr] == "function" && !p[attr].__CLASS_NAME__) {
        /* there are polynormical methods. */
        ms.push(new java.lang.reflect.Method (this, attr,
            [], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC));
      }
    }
    p = this;
    for (var attr in p) {
      if (typeof p[attr] == "function" && !p[attr].__CLASS_NAME__) {
        ms.push(new java.lang.reflect.Method (this, attr,
            [], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC
            | java.lang.reflect.Modifier.STATIC));
      }
    }
    return ms;
  },

  getMethod$S$ClassA : function(name, paramTypes) {
    return Clazz.$new(java.lang.reflect.Method.construct$Class$S$ClassA$Class$ClassA$I, [this, name,
            paramTypes, java.lang.Void, [], 0]);
  },

  getModifiers : function() { return java.lang.reflect.Modifier.PUBLIC; },

  newInstance : function(a) {
    // but there is only one empty-parameter version of class.newInstance()???
    var clz = this;
    allowImplicit = false;
    var c = null;
    var n = (a == null ? 0 : a.length);
    if (n > 1) {
      alert("?? n > 1 in Clazz.newInstance")
    }
    switch(n) {
    case 0:
      c = Clazz.$new(clz);//new clz();
      break;
    case 1:
      c = new clz(a[0]);
      break;
    case 2:
      c = new clz(a[0], a[1]);
      break;
    case 3:
      c = new clz(a[0], a[1], a[2]);
      break;
    case 4:
      c = new clz(a[0], a[1], a[2], a[3]);
      break;
    default:
      var x = "new " + clz.__CLASS_NAME__ + "(";
      for (var i = 0; i < a.length; i++)
       x += (i == 0 ? "" : ",") + "a[" + i + "]";
      x += ")";
      c = eval(x);
    }
    allowImplicit = true;
    return c;
  }
};

inF.getDeclaredMethods = inF.getMethods;
inF.getDeclaredMethod = inF.getMethod;
 
for (var i = innerNames.length, name; --i >= 0;)
  Clazz._O[name = innerNames[i]] = Array[name] = inF[name];

/*
 * Copy members of interface
 */
/* private */
var copyProperties = function(clazzThis, clazzSuper) {
  for (var o in clazzSuper)
    if (o != "b$" 
        && o != "prototype" && o != "superClazz"
        && o != "__CLASS_NAME__" && o != "implementz"
        && (typeof clazzSuper[o] != "function" || !checkInnerFunction(clazzSuper, o)))
      clazzThis[o] = clazzThis.prototype[o] = clazzSuper[o];
};

/* private */
var checkInnerFunction = function (hostSuper, funName) {
  for (var k = innerNames.length; --k >= 0;)
    if (funName == innerNames[k] && 
        inF[funName] === hostSuper[funName])
      return true;
  return false;
};

//////////////////////////////// public method execution /////////////////////////

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
  // allows obj to be a class already, from arrayX.getClass().isInstance(y)
  return (obj != null && clazz && 
  (obj == clazz
    || (obj.__paramType ? obj.__paramType == clazz.__paramType 
    : obj instanceof clazz || getInheritedLevel(Clazz.getClassName(obj), clazz, true) >= 0)));
};

/*
// deprecated
Clazz.castNullAs = function (asClazz) {
  var f = new CastedNull (asClazz);
  f._NULL_ = 1;
  return f;
};
*/

//////////////////////////////// private method execution /////////////////////////
/*
// deprecated
var CastedNull = function (asClazz) {
  if (asClazz) {
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
*/

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
 * BH: used in Throwable
 *  
 */  
/* public */
Clazz._callingStackTraces = [];

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
/* private */
//var MethodNotFoundException = function () {
//  this.toString = function () {
//    return "j2s MethodNotFoundException";
//  };
//};

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
  if(e.__CLASS_NAME__)
    return Clazz.instanceOf(e, clazz);
  if (!e.getMessage) {
    e.getMessage = function() {return "" + this};
  }
  if (!e.printStackTrace) {
    e.printStackTrace = function(){};
    alert(e + " try/catch path:" + Clazz.getStackTrace(-10));
  }
  if(clazz == Error) {
    if (("" + e).indexOf("Error") < 0)
      return false;
    System.out.println (Clazz.getStackTrace());
    return true;
    // everything here is a Java Exception, not a Java Error
  }
  return (clazz == Exception || clazz == Throwable
    || clazz == NullPointerException && _isNPEExceptionPredicate(e));
};

/**
 * BH need to limit this, as JavaScript call stack may be recursive
 */ 
Clazz.getStackTrace = function(n) {
  n || (n = 25);
  // updateNode and updateParents cause infinite loop here
  var s = "\n";
  var c = arguments.callee;
  var showParams = (n < 0);
  if (showParams)
    n = -n;
  for (var i = 0; i < n; i++) {
    if (!(c = c.caller))
      break;
    var sig = (c.toString ? c.toString().substring(0, c.toString().indexOf("{")) : "<native method>");
    s += i + " " + (c.exName ? (c.overrider ? c.overrider.__CLASS_NAME__ + "."  : "") + c.exName  + sig.replace(/function /,""): sig) + "\n";
    if (c == c.caller) {
      s += "<recursing>\n";
      break;
    }
    if (showParams) {
      var args = c.arguments;
      for (var j = 0; j < args.length; j++) {
        var sa = (args[j] instanceof Object ? args[j].toString() : "" + args[j]);
        if (sa.length > 60)
          sa = sa.substring(0, 60) + "...";
        s += " args[" + j + "]=" + sa.replace(/\s+/g," ") + "\n";
      }
    }
  }
  return s;
}

////////////////////////////////// package loading ///////////////////////

/*
 * all root packages. e.g. java.*, org.*, com.*
 */
Clazz.allPackage = {};

/**
 * Will be used to keep value of whether the class is defined or not.
 */
Clazz.allClasses = {};

Clazz.lastPackageName = null;
Clazz.lastPackage = null;

var unloadedClasses = [];

/* public */
Clazz.declarePackage = function (pkgName) {

  Clazz._Loader && Clazz._Loader.doTODO();

  if (Clazz.lastPackageName == pkgName || !pkgName || pkgName.length == 0)
    return Clazz.lastPackage;
  var pkgFrags = pkgName.split (/\./);
  var pkg = Clazz.allPackage;
  for (var i = 0; i < pkgFrags.length; i++) {
    var a = pkgFrags[i];
    if (!pkg[a]) {
      pkg[a] = {  __PKG_NAME__ : (pkg.__PKG_NAME__ ? pkg.__PKG_NAME__ + "." + a : a) }
      if (i == 0) {
        // window[a] = ...
        Clazz.setGlobal(a, pkg[a]);
      }
    }
    pkg = pkg[a]
  }
  Clazz.lastPackageName = pkgName;
  return Clazz.lastPackage = pkg;
};

var isSafari = (navigator.userAgent.indexOf ("Safari") != -1);
var isSafari4Plus = false;
if (isSafari) {
  var ua = navigator.userAgent;
  var verIdx = ua.indexOf("Version/");
  if (verIdx  != -1) {
    var verStr = ua.substring(verIdx + 8);
    var verNumber = parseFloat(verStr);
    isSafari4Plus = verNumber >= 4.0;
  }
}

/**
 * used specifically for declaring prototypes using 
 *  subclass.prototype = new superclass(Clazz.inheritArgs) 
 * without  running a constructor or doing field preparation.    
 *  
 */ 
Clazz.inheritArgs = new (function(){return {"$J2SNOCREATE$":true}})();

var _prepOnly = new (function(){return {"$J2SPREPONLY$":true}})();

var _jsid = 0;

var decorateFunction = Clazz._decorateFunction = function (clazzFun, prefix, name, _decorateFunction) {
  var qName;
  if (!prefix) {
    // e.g. Clazz.declareInterface (null, "ICorePlugin", org.eclipse.ui.IPlugin);
    qName = name;
    Clazz.setGlobal(name, clazzFun);
  } else if (prefix.__PKG_NAME__) {
    // e.g. Clazz.declareInterface (org.eclipse.ui, "ICorePlugin", org.eclipse.ui.IPlugin);
    qName = prefix.__PKG_NAME__ + "." + name;
    prefix[name] = clazzFun;
    if (prefix === java.lang)
      Clazz.setGlobal(name, clazzFun);
  } else {
    // e.g. Clazz.declareInterface (org.eclipse.ui.Plugin, "ICorePlugin", org.eclipse.ui.IPlugin);
    qName = prefix.__CLASS_NAME__ + "." + name;
    prefix[name] = clazzFun;
  }
  extendJO(clazzFun, qName);
  for (var i = innerNames.length; --i >= 0;) {
    clazzFun[innerNames[i]] = inF[innerNames[i]];
  }

  if (Clazz._Loader) 
    Clazz._Loader.updateNodeForFunctionDecoration(qName);
  return;
};

/**
 * Inherit class with "extends" keyword and also copy those static members. 
 * Example, as in Java, if NAME is a static member of ClassA, and ClassB 
 * extends ClassA then ClassB.NAME can be accessed in some ways.
 *
 * @param clazzThis child class to be extended
 * @param clazzSuper super class which is inherited from
 */
var inheritClass = Clazz._inheritClass = function (clazzThis, clazzSuper, objSuper) {
  //var thisClassName = Clazz.getClassName (clazzThis);
  var stack = (clazzSuper ? (clazzSuper.__STACK__ || [clazzSuper]) : []);
  var n = stack.length;
  if (n) {
    for (var o in clazzSuper) {
      if (o != "b$" 
      && o != "prototype" 
      && o != "superClazz"
      && o.indexOf("__STACK") != 0
      && o != "_PREP_"
      && o != "__CLASS_NAME__" 
      && o != "implementz"
      && !checkInnerFunction (clazzSuper, o)) {
        clazzThis[o] = clazzSuper[o];
      }
    }
    if (unloadedClasses[Clazz.getClassName(clazzThis, true)]) {
      // Don't change clazzThis.protoype! Keep it!
    } else if (objSuper) {
      doDebugger();
      // ! Unsafe reference prototype to an instance!
      // Feb 19, 2006 --josson
      // OK for this reference to an instance, as this is anonymous instance,
      // which is not referenced elsewhere.
      // March 13, 2006
      clazzThis.prototype = objSuper; 
    } else if (clazzSuper == Number) {
      clazzThis.prototype = new Number ();
    } else {
      clazzThis.prototype = new clazzSuper (null, Clazz.inheritArgs);     
    } 
  }
  clazzThis.superClazz = clazzSuper;
  var stack1 = new Array(n + 1);
  stack1[n] = clazzThis;
  for (var i = n; --i >= 0;)
    stack1[i] = stack[i];
  clazzThis.__STACK__ = stack1;
  clazzThis.__STACKPT__ = n; 

  /*
   * Is it necessary to reassign the class name?
   * Mar 10, 2006 --josson
   */
  //clazzThis.__CLASS_NAME__ = thisClassName;
  clazzThis.prototype.__CLASS_NAME__ = clazzThis.__CLASS_NAME__;
};

/*
// deprecated
Clazz.instantialize = function (objThis, args) {

  if (args && (args[0] == _prepOnly || 
  args.length == 1 && args[0] && args[0].$J2SNOCREATE$
  || args.length == 2 && args[1] && args[1].$J2SNOCREATE$)) {
    // just declaring a class, not creating an instance or doing field preparation.
    return;
  }

  if (objThis.__VAL0__) {
    objThis.valueOf = function () {
      return this;
    };
  }

  var myclass = objThis.getClass();
  objThis.__JSID__ = ++_jsid;
  var c = objThis.construct;
  if (!c){
    // a class with just the default (null) constructor that only subclasses Object and no fields to prepare
    // For example:  java.awt.Queue (in java.awt.EventQueue.java), javax.swing.JRootPane.RootLayout 
    // we are done.
    return;
  }


  var t0 = (_profileNew ? window.performance.now() : 0);

  try{

    // obj.construct.stack is the full stack of constructors. 
     
    var stack = myclass.__STACK__; //c && c.stack);
    var inherit = Clazz.inheritArgs;
    //var n = (!stack ? -1 : stack.length - (objThis.b$ ? 0 : 1));
      
    var cn = myclass.__CLASS_NAME__
    var n = stack.length - 1;
    
    // only for the very top call to initialize myclass, call all the initializers in order 
    if (n >= 0 &&  (stack[n] === arguments.callee.caller))
      for (var i = 0; i < n; i++)
        stack[i].call(objThis, _prepOnly);
              
    // if no superclass, do field preparations (field Object instantiation) now, before the constructor
    // otherwise it will be done later, just after the superconstructor call
    // but if we are now doing the most super constructor, then we should do it.
    
    // q: what about abstract classes. How does that work? What if they do not have a constructor? 
      
    var p = (n == 0 ? myclass._PREP_ : stack[0]._PREP_);
    
//    if (n > 2 && stack[0].prototype.construct == null)debugger;
    
    p && p.apply(objThis, []);
    objThis.__PREPPED__ = 1;  
  
    // when we have a superclass and a prepareFields, 
    // the order must be:
    //  superclass-superclass-superclass-prepareFields
    //  superclass-superclass-superclass-construct
    //  superclass-superclass-prepareFields
    //  superclass-superclass-construct
    //  superclass-prepareFields
    //  superclass-construct
    //  preparefields
    //  construct

    if (isSafari4Plus) { // Fix bug of Safari 4.0+'s over-optimization
      var argsClone = [];
      for (var k = 0; k < args.length; k++) {
        argsClone[k] = args[k];
      }
      args = argsClone;
    }
    var pt = c.apply(objThis, args);
    if (n > 0)
      prepFields(objThis, myclass, pt);
    delete objThis.__PREPPT__;
  } catch (e) {
     alert("ahah2!" + e + (e.stack || Clazz.getStackTrace()));
     doDebugger()
  }
  _profileNew && addProfileNew(myclass, window.performance.now() - t0);

};

// deprecated
var prepFields = function(objThis, clazzThis, pt) {
  // pick up missed field preparations because the compiler removes 
  // constructors of the form Foo() { super() }
  // thus sending us further down the line, past where there may be
  // prepareFields calls.
  
  // pt may be null, undefined, 0, or some other number    
  // skip pt=0, as we have already done that
  try {  
    var imin = (objThis.__PREPPT__ || -1) + 1;
    var n = objThis.__PREPPT__ = clazzThis.__STACKPT__;    
    var stack = clazzThis.__STACK__;
    pt = (pt === 0 ? 1 : pt ? pt : n);
    if (pt < imin)
      pt = imin;
    for (var i = pt, p; i <= n; i++)
      (p = stack[i]._PREP_) && (i > 0 || !objThis.__PREPPED__) && p.apply(objThis, []);
  } catch (e) {
     alert("ahah3!" + e + (e.stack || Clazz.getStackTrace()));
     doDebugger()
  }
};

// deprecated
Clazz._superCount0 = 0;
// deprecated
Clazz._superCount1 = 0;

// deprecated
Clazz.superConstructor = function (objThis, clazzThis, args) {
  if (clazzThis == null) {
    doDebugger();//??
   // SwingJS insertion
    clazzThis = objThis;
  } else {
    var f = arguments.callee.caller.exMeth;
    if (f) {
      // Note that this function may be null. It is created in superCall.
      f != -1 && f(objThis, args);
      Clazz._superCount0++
    } else {
      Clazz._superCount1++
      var cn = clazzThis.__CLASS_NAME__ + " for " + objThis.__CLASS_NAME__
      f = Clazz.superCall(objThis, clazzThis, "construct", args, 1);
      f && f(objThis, args)
    }
  }
};

// deprecated
Clazz._supercallMsg = "";

// deprecated
Clazz.superCall = function (objThis, clazzThis, funName, args, isConstruct) {
  var fx = null;
  var i = -1;
  
  // this next code block sets both fx and i
      
  var clazzFun = objThis[funName];
  if (clazzFun) {
    if (clazzFun.overrider) { 
      // overrider is a mark for "@override"
      if (clazzFun.overrider.__STACKPT__ < clazzThis.__STACKPT__) {
        // This is a single method in a superclass, call directly!
        // Here the issue may be that we have:
        //
        //       [2]     Sub.b   --> Super.a       [1]
        //       [1]   Super.a   --> SuperSuper.b  [0]
        //
        // and we do not want Super.a to call Sub.b since this is a *super*Call 
        // 
        fx = clazzFun;
      } else if (!isConstruct) {// || !allowImplicit) {
        // The developer or compiler has labeled as "overrideMethod" a method xxx() that utilizes super.xxx().
        // Check the super class to see if a function by this name exists and use it. 
        // Save the found function on a stack to speed processing later.
        var superFuncs = clazzThis.superfuncs || (clazzThis.superfuncs = []);
        if ((fx = superFuncs[funName]) == null) {
          var sc = clazzThis.superClazz; 
          fx = sc && sc.prototype && sc.prototype[funName];
          var msg = "\n!!!! j2sSwingJS Clazz.overrideMethod+superCall() found for " + clazzThis.__CLASS_NAME__ + "." + funName;
          System.out.println(msg); 
          Clazz._supercallMsg += msg;
        } 
        if (fx && fx.stack)
          fx = fx.stack[fx.stack.length - 1].prototype[funName];
        superFuncs[funName] = fx;
      }
    } else if (!clazzFun.stack) { // super.toString
      fx = clazzFun;
    } else { // normal wrapped method
      var stack = clazzFun.stack;
      for (i = stack.length; --i >= 0;) {
        // Once super call is computed precisely, there are no need 
        // to calculate the inherited level but just an equals comparision
        if (clazzThis === stack[i]) { // level == 0
          break;
        } else if (getInheritedLevel(clazzThis, stack[i]) > 0) {
          i++;        
          break;
        }
      }
      switch(i) {
      case -1:
        break;
      case 0:
        // called by a class that has a Clazz.superConstructor call but actually
        // no superconstructor. -- sun.SunToolkit, javax.swing.border.EmptyBorder
        // TODO: test with ... extends Integer
        fx = stack[0].prototype[funName];
        fx = (fx.sigs.fparams ? fx.sigs.fparams[0] : null); // unknown or null
        break;
      default:                                              
        fx = stack[--i].prototype[funName];
        break;        
      }                  
    }
  }
  if (!isConstruct) {
    if (!fx) {
    //allowImplicit = true;
      var pTypes = getParamTypes(args).typeString;
      Clazz.alert (["j2sSwingJS","no class found",pTypes])
      newMethodNotFoundException(clazzThis, funName, pTypes);  
    }
    return fx.apply(objThis, args || []);
  }
  // there are instances where even though we have supplied a superConstructor call,
  // there is no super class;
  if (fx == null && clazzThis._PREP_ == null) {
    arguments.callee.caller.caller.exMeth = -1;
    return null;
  }
  return arguments.callee.caller.caller.exMeth = function(objThis, args) {
    var pt = (fx ? fx.apply(objThis, args || []) : null);
    prepFields(objThis, clazzThis, pt);
  };
};

// deprecated
var cStack = [];

// deprecated
Clazz.pu$h = function (c) {
  //c || (c = self.c$); // old style
  //c && 
  cStack.push(c);
};

// deprecated
Clazz.p0p = function () {
  return cStack.pop();
};
*/
////////////////////////// default package declarations ////////////////////////

Clazz.declarePackage ("java.io");
//Clazz.declarePackage ("java.lang");
Clazz.declarePackage ("java.lang.annotation"); // java.lang
Clazz.declarePackage ("java.lang.instrument"); // java.lang
Clazz.declarePackage ("java.lang.management"); // java.lang
Clazz.declarePackage ("java.lang.reflect"); // java.lang
Clazz.declarePackage ("java.lang.ref");  // java.lang.ref
java.lang.ref.reflect = java.lang.reflect;
Clazz.declarePackage ("java.util");
//var reflect = Clazz.declarePackage ("java.lang.reflect");
Clazz.declarePackage ("java.security");


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

// Override the Clazz.MethodNotFoundException in Class.js to give details
var newMethodNotFoundException = function (clazz, method, params) {
  var paramStr = "";
  if (params)
    paramStr = params.substring (1).replace(/\\/g, ",");
  var leadingStr = (!method || method == "construct" ? "Constructor": "Method");
  var message = leadingStr + " " + Clazz.getClassName (clazz, true) + (method ? "." 
          + method : "") + "(" + paramStr + ") was not found";
  System.out.println(message);
  console.log(message);
  throw new java.lang.NoSuchMethodException(message);        
};

//////// (int) conversions //////////

Clazz.floatToInt = function (x) {
  // asm.js-style conversion
  return x|0;
};

Clazz.floatToByte = Clazz.floatToShort = Clazz.floatToLong = Clazz.floatToInt;
Clazz.doubleToByte = Clazz.doubleToShort = Clazz.doubleToLong = Clazz.doubleToInt = Clazz.floatToInt;

Clazz.floatToChar = function (x) {
  return String.fromCharCode (isNaN(x) ? 0 : x < 0 ? Math.ceil(x) : Math.floor(x));
};

Clazz.doubleToChar = Clazz.floatToChar;



///////////////////////////////// Array additions //////////////////////////////
//
// BH: these are necessary for integer processing, especially
//
//

var getFakeArrayType = function(n, nbits) {
    var b = new Array(n);
      for (var i = 0; i < n; i++)b[i] = 0
    b.BYTES_PER_ELEMENT = nbits >> 3;
    b._fake = true;    
    return b;
} 

var arraySlice = function(istart, iend) {
  // could be Safari or could be fake
  istart || (istart = 0);
  iend || (iend = this.length);
  var b;
  if (this._fake) {    
    b = new this.constructor(iend - istart); 
    System.arraycopy(this, istart, b, 0, iend - istart); 
  } else {
    b = new this.constructor(this.buffer.slice(istart * this.BYTES_PER_ELEMENT, iend * this.BYTES_PER_ELEMENT));
  }
  b.BYTES_PER_ELEMENT = a.BYTES_PER_ELEMENT;
  b.__paramType = a.__paramType;
};

var haveInt8 = !!(self.Int8Array && self.Int8Array != Array);

if (haveInt8) {
  if (!Int8Array.prototype.sort)
    Int8Array.prototype.sort = Array.prototype.sort
  if (!Int8Array.prototype.slice)
    Int8Array.prototype.slice = function() {return arraySlice.apply(this, arguments)};
} else {
  Clazz.newByteA$ = Clazz.newIntA$;
}

Int8Array.prototype.clone = function() {
  var a = this.slice(); 
  a.BYTES_PER_ELEMENT = 1;
  a.__paramType = this.__paramType; 
  return a; 
};
Int8Array.prototype.getClass = function () { return this.constructor; };

var haveInt16 = !!(self.Int16Array && self.Int16Array != Array);

if (haveInt16) {
  if (!Int16Array.prototype.sort)
    Int16Array.prototype.sort = Array.prototype.sort
  if (!Int16Array.prototype.slice)
    Int16Array.prototype.slice = function() {return arraySlice.apply(this, arguments)};
} else {
  Clazz.newShortA$ = Clazz.newIntA$;
}

Int16Array.prototype.clone = function() {
  var a = this.slice(); 
  a.BYTES_PER_ELEMENT = 2;
  a.__paramType = this.__paramType; 
  return a; 
};
Int16Array.prototype.getClass = function () { return this.constructor; };


Clazz.haveInt32 = !!(self.Int32Array && self.Int32Array != Array);      
if (Clazz.haveInt32) {
  if (!Int32Array.prototype.sort)
    Int32Array.prototype.sort = Array.prototype.sort
} else {
  Int32Array = function(n) { return getFakeArrayType(n, 32); };
  Int32Array.prototype.sort = Array.prototype.sort
  Int32Array.prototype.toString = function(){return "[object Int32Array]"};
}
if (!Int32Array.prototype.slice)
  Int32Array.prototype.slice = function() {return arraySlice.apply(this, arguments)};
Int32Array.prototype.clone = function() { 
  var a = this.slice(); 
  a.BYTES_PER_ELEMENT = 4;
  a.__paramType = this.__paramType;
  return a; 
};
Int32Array.prototype.getClass = function () { return this.constructor; };

Clazz.haveFloat64 = !!(self.Float64Array && self.Float64Array != Array);
if (Clazz.haveFloat64) {
  if (!Float64Array.prototype.sort)
    Float64Array.prototype.sort = Array.prototype.sort
} else {
  Float64Array = function(n) { return getFakeArrayType(n, 64); };
  Float64Array.prototype.sort = Array.prototype.sort
  Float64Array.prototype.toString = function() {return "[object Float64Array]"};
// Darn! Mozilla makes this a double, not a float. It's 64-bit.
// and Safari 5.1 doesn't have Float64Array 
}
if (!Float64Array.prototype.slice)
  Float64Array.prototype.slice = function() {return arraySlice.apply(this, arguments)};
Float64Array.prototype.clone =  function() { 
  var a = this.slice(); 
  a.BYTES_PER_ELEMENT = 8;
  a.__paramType = this.__paramType; 
  return a; 
};
Float64Array.prototype.getClass = function () { return this.constructor; };

/*
// deprecated
Clazz.newArray = function (a, b, c, d) {
  if (a != -1 || arguments.length == 2) { 
    // Clazz.newArray(36,null)
    // Clazz.newArray(3, 0)
    // Clazz.newArray(-1, ["A","B"])
    // Clazz.newArray(3, 5, null)
    return newTypedArray(arguments, 0);
  }
  // truncate array using slice
  // Clazz.newArray(-1, array, ifirst, ilast+1)
  // from JU.AU; slice, ensuring BYTES_PER_ELEMENT is set correctly
  a = b.slice(c, d);
  a.BYTES_PER_ELEMENT = b.BYTES_PER_ELEMENT;
  return a;
};

var newTypedArray = function(args, nBits) {
  var dim = args[0];
  if (typeof dim == "string")
    dim = dim.charCodeAt(0); // char
  var last = args.length - 1;
  var val = args[last];
  if (last > 1) {
     // array of arrays
     // Clazz.newArray(3, 5, null)
    var xargs = new Array(last); // 2 in this case
    for (var i = 0; i < last; i++)
      xargs[i] = args[i + 1];
    var arr = new Array(dim);
    for (var i = 0; i < dim; i++)
      arr[i] = newTypedArray(xargs, nBits); // Call recursively
    return arr;
  }
  // Clazz.newIntArray(5, null)   int[][] x = new int[5][] or 
  // Clazz.newArray(36,null)
  // Clazz.newArray(3, 0)
  // Clazz.newArray(-1, ["A","B"])
  if (val == null)
    nBits = 0;
  else if (nBits > 0 && dim < 0)
    dim = val; // because we can initialize an array using new Int32Array([...])
  switch (nBits) {
  case 8:
    var arr = new Int8Array(dim);
    arr.BYTES_PER_ELEMENT = 1;
    return arr;
  case 32:
    var arr = new Int32Array(dim);
    arr.BYTES_PER_ELEMENT = 4;
    return arr;
  case 64:
    var arr = new Float64Array(dim);
    arr.BYTES_PER_ELEMENT = 8;
    return arr;
  default:
    var arr = (dim < 0 ? val : new Array(dim));
    arr.BYTES_PER_ELEMENT = 0;
    if (dim > 0 && val != null)
      for (var i = dim; --i >= 0;)
         arr[i] = val;
    return arr;
  }
}

// deprecated
Clazz.newByteArray = function () {
  return newTypedArray(arguments, 8);
}

// deprecated
Clazz.newIntArray = function () {
  return newTypedArray(arguments, 32);
}

// deprecated
Clazz.newFloatArray  = function () {
  return newTypedArray(arguments, 64);
}

// deprecated
Clazz.newDoubleArray = Clazz.newFloatArray;
// deprecated
Clazz.newLongArray = Clazz.newShortArray = Clazz.newIntArray;
// deprecated
Clazz.newCharArray = Clazz.newBooleanArray = Clazz.newArray;

// deprecated
Clazz.isAB = function(a) {
  return (a && typeof a == "object" && a.BYTES_PER_ELEMENT == 1);
}
// deprecated
Clazz.isAI = function(a) {
  return (a && typeof a == "object" && a.BYTES_PER_ELEMENT == 4);
}

// deprecated
Clazz.isAF = function(a) {
  return (a && typeof a == "object" && a.BYTES_PER_ELEMENT == 8);
}

// deprecated
Clazz.isAS = function(a) { // just checking first parameter
  return (a && typeof a == "object" && a.constructor == Array && (typeof a[0] == "string" || typeof a[0] == "undefined"));
}

// deprecated
Clazz.isAII = function(a) { // assumes non-null a[0]
  return (a && typeof a == "object" && Clazz.isAI(a[0]));
}

// deprecated
Clazz.isAFF = function(a) { // assumes non-null a[0]
  return (a && typeof a == "object" && Clazz.isAF(a[0]));
}

// deprecated
Clazz.isAFFF = function(a) { // assumes non-null a[0]
  return (a && typeof a == "object" && Clazz.isAFF(a[0]));
}

// deprecated
Clazz.isASS = function(a) {
  return (a && typeof a == "object" && Clazz.isAS(a[0]));
}

// deprecated
Clazz.isAFloat = function(a) { // just checking first parameter
  return (a && typeof a == "object" && a.constructor == Array && Clazz.instanceOf(a[0], Float));
}

// deprecated
Clazz.isAP = function(a) {
  return (a && Clazz.getClassName(a[0]) == "JU.P3");
}

// deprecated
Clazz.checkPrivateMethod = function () {
  // get both this one and the one calling it
  me = arguments.callee.caller;
  caller = arguments.callee.caller.caller;
  var stack = me.stack;
  // if their classes are the same, no issue
  var mySig = getParamTypes(arguments[0]).typeString;
  if (!me.privateNote) {
    me.privateNote = "You are seeing this note because the method " 
    + me.exName + mySig + " in class " 
    + me.exClazz.__CLASS_NAME__
    + " has a superclass method by the same name (possibly with the same parameters) that is private and "
    + " therefore might be called improperly from this class. If your "
    + " code does not run properly, or you want to make it run faster, change the name of this method to something else."
    System.out.println(me.privateNote);
  }
  return null;
};
*/

java.lang.Object = Clazz._O;

Clazz._O.getName = inF.getName;

Clazz._declared = {}
Clazz._setDeclared = function(name, func) {
   Clazz.allClasses[name] = true;
}

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

// see notes in j2s/classLoader.txt

//if (window["ClazzNode"] == null) {
/**
 * TODO:
 * Make optimization over class dependency tree.
 */


/**
 * Static class loader class
 */
Clazz._Loader = Clazz.ClazzLoader = function () {};

/**
 * Class dependency tree node
 */
/* private */
var Node = function () {
  this.parents = [];
  this.musts = [];
  this.optionals = [];
  this.declaration = null;
  this.name = null; // id
  this.path = null;
//  this.requires = null;
//  this.requiresMap = null;
  this.onLoaded = null;
  this.status = 0;
  this.random = 0.13412;
};


;(function(Clazz, _Loader) {

_Loader._checkLoad = J2S._checkLoad;
 
_Loader._TODO = [];

_Loader.doTODO = function() {
  while (_Loader._TODO.length) {
   var f = _Loader._TODO.shift();
   f();
    }
}
 
_Loader.updateNodeForFunctionDecoration = function(qName) {

  var node = findNode(qName);
  if (node && node.status == Node.STATUS_KNOWN) {
    if (node.musts.length == 0 && node.optionals.length == 0) {
      var f = function() { updateNode(node) };
      _Loader._TODO.push(f);
    } else {
      window.setTimeout(f, 1); 
    }
  }
}

Node.prototype.toString = function() {
  return this.name || this.path || "ClazzNode";
}

Node.STATUS_UNKNOWN = 0;
Node.STATUS_KNOWN = 1;
Node.STATUS_CONTENT_LOADED = 2;
Node.STATUS_MUSTS_LOADED = 3;
Node.STATUS_DECLARED = 4;
Node.STATUS_LOAD_COMPLETE = 5;

             
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
 * Class dependency tree
 */
var clazzTreeRoot = new Node();

/**
 * Used to keep the status whether a given *.js path is loaded or not.
 */
/* private */
var loadedScripts = {};

/**
 * Multiple threads are used to speed up *.js loading.
 */
/* private */
var inLoadingThreads = 0;

/**
 * Maximum of loading threads
 */
/* private */
var maxLoadingThreads = 6;

var userAgent = navigator.userAgent.toLowerCase ();
var isOpera = (userAgent.indexOf ("opera") != -1);
var isIE = (userAgent.indexOf ("msie") != -1) && !isOpera;
var isGecko = (userAgent.indexOf ("gecko") != -1);

/*
 * Opera has different loading order which will result in performance degrade!
 * So just return to single thread loading in Opera!
 *
 * FIXME: This different loading order also causes bugs in single thread!
 */
if (isOpera) {
  maxLoadingThreads = 1;
  var index = userAgent.indexOf ("opera/");
  if (index != -1) {
    var verNumber = 9.0;
    try {
      verNumber = parseFloat(userAgent.subString (index + 6));
    } catch (e) {}
    if (verNumber >= 9.6) {
      maxLoadingThreads = 6;
    }
  } 
}

/**
 * Try to be compatiable with Clazz system.
 * In original design _Loader and Clazz are independent!
 *  -- zhourenjian @ December 23, 2006
 */
var isClassdefined;
var definedClasses;

if (self.Clazz && Clazz.isClassDefined) {
  isClassDefined = Clazz.isClassDefined;
} else {
  definedClasses = {};
  isClassDefined = function (clazzName) {
    return definedClasses[clazzName] == true;
  };
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
    if (!arr[i])
      continue;
    if (arr[i].charAt (0) == '$') {
      if (arr[i].charAt (1) == '.') {
        if (!last)
          continue;
        var idx = last.lastIndexOf (".");
        if (idx != -1) {
          var prefix = last.substring (0, idx);
          arr[i] = prefix + arr[i].substring (1);
        }
      } else {
        arr[i] = "org.eclipse.s" + arr[i].substring (1);
      }
    }
    last = arr[i];
  }
  return arr;
};

/**
 * Used to keep to-be-loaded classes.
 */
/* private */
var classQueue = [];

/* private */
var classpathMap = {};

Clazz.classpathMap = classpathMap;

/* private */
var pkgRefCount = 0;

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
  if (isIndex && !isPkgDeclared && !window[pkg + ".registered"]) {
    pkgRefCount++;
    if (pkg == "java")
      pkg = "core" // JSmol -- moves java/package.js to core/package.js
    _Loader.loadClass(pkg + ".package", function () {
          if (--pkgRefCount == 0)
            runtimeLoaded();
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
 */
Clazz.loadClass = function (name, onLoaded, async) {
  if (!self.Class) {
    Class = Clazz;
    Class.forName = Clazz._4Name;
    JavaObject = Clazz._O;
    // maybe more here
  }
  return (name && _Loader.loadClass(name, onLoaded, true, async, 1));
}

/**
 * Load the given class ant its related classes.
 */
/* public */
_Loader.loadClass = function (name, onLoaded, forced, async, mode) {

  mode || (mode = 0); // BH: not implemented
  (async == null) && (async = false);
  
   if (typeof onLoaded == "boolean")
    return evalType(name);

  System.out.println("loadClass " + name)

  // Make sure that packageClasspath ("java", base, true); 
  // is called before any _Loader#loadClass is called.

  if (needPackage("java"))
    _Loader.loadPackage("java");
  if (needPackage("core"))
    _Loader.loadPackage("core");  

//  var swtPkg = "org.eclipse.swt";
//  if (name.indexOf (swtPkg) == 0 || name.indexOf ("$wt") == 0) {
//    _Loader.assurePackageClasspath (swtPkg);
//  }
//  if (name.indexOf ("junit") == 0) {
//    _Loader.assurePackageClasspath ("junit");
//  }

  // Any _Loader#loadClass calls will be queued until java.* core classes are loaded.

  _Loader.keepOnLoading = true;
  
  if (!forced && (pkgRefCount && name.lastIndexOf(".package") != name.length - 8
      || name.indexOf("java.") != 0 && !isClassDefined(runtimeKeyClass)
     )) {  
    queueBe4KeyClazz.push([name, onLoaded]);
    
    
  System.out.println("loadclass-queuing " + name+ " " + runtimeKeyClass + " "+ isClassDefined(runtimeKeyClass))

    return;    
  }
  var b;
  if ((b = isClassDefined(name)) || isClassExcluded(name)) {
    if (b && onLoaded) {
      var nn = findNode(name);
      if (!nn || nn.status >= Node.STATUS_LOAD_COMPLETE) {
        if (async) {
          window.setTimeout(onLoaded, 25);
        } else {
          onLoaded();
        }
      }
    }
    return;
  }
  var path = _Loader.getClasspathFor(name);
  var existed = loadedScripts[path];
    var qq = classQueue;
  if (!existed)
    for (var i = qq.length; --i >= 0;)
      if (qq[i].path == path || qq[i].name == name) {
        existed = true;
        break;
      }
  if (existed) {
    if (onLoaded) {
      var n = findNode(name);
      if (n) {
        if (!n.onLoaded) {
          n.onLoaded = onLoaded;
        } else if (onLoaded != n.onLoaded) {
          n.onLoaded = (function (nF, oF) { return function () { nF(); oF() };  }) (n.onLoaded, onLoaded);
        }
      }
    }
    return;
  }

  var n = (unloadedClasses[name] && findNode(name) || new Node());
  n.name = name;
  n.path = path;
  n.isPackage = (path.lastIndexOf("package.js") == path.length - 10);
  if (n.isPackage)
    Clazz._nodeDepth = 0;   
  mappingPathNameNode(path, name, n);
  n.onLoaded = onLoaded;
  n.status = Node.STATUS_KNOWN;
  var needBeingQueued = false;
  for (var i = qq.length; --i >= 0;) {
    if (qq[i].status != Node.STATUS_LOAD_COMPLETE) {
      needBeingQueued = true;
      break;
    }
  }
  
  if (n.isPackage) {//forced
    // push class to queue
    var pt = qq.length;
    for (; --pt >= 0;) {
      if (qq[pt].isPackage) 
        break;
      qq[pt + 1] = qq[pt];
    }
    qq[++pt] = n;
  } else if (needBeingQueued) {
    qq.push(n);
  }
  if (!needBeingQueued) { // can be loaded directly
    var bSave = false;
    if (onLoaded) {  
      bSave = isLoadingEntryClass;
      isLoadingEntryClass = true;
    }
    if (forced)onLoaded = null;
    addChildClassNode(clazzTreeRoot, n, true);
    loadScript(n, n.path, n.requiredBy, false, onLoaded ? function(_loadClass){ isLoadingEntryClass = bSave; onLoaded()}: null);
  }
};

/*
 * Check whether given package's classpath is setup or not.
 * Only "java" and "org.eclipse.swt" are accepted in argument.
 */
/* private */
var needPackage = function(pkg) {
  // note that false != null and true != null
  return (window[pkg + ".registered"] != null && !classpathMap["@" + pkg]);
}

/* private */
_Loader.loadPackage = function(pkg, fSuccess) {
  fSuccess || (fSuccess = null);
  window[pkg + ".registered"] = false;
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
  var base = _Loader.getClasspathFor (prefix + ".*", true);
  for (var i = 0; i < pkgs.length; i++) {
    if (window["Clazz"]) {
      Clazz.declarePackage (prefix + "." + pkgs[i]);
    }
    _Loader.loadPackageClasspath (prefix + "." + pkgs[i], base);
  }
};

/**
 * Using multiple sites to load *.js in multiple threads. Using multiple
 * sites may avoid 2 HTTP 1.1 connections recommendation limit.
 * Here is a default implementation for http://archive.java2script.org.
 * In site archive.java2script.org, there are 6 sites:
 * 1. http://archive.java2script.org or http://a.java2script.org
 * 2. http://erchive.java2script.org or http://e.java2script.org
 * 3. http://irchive.java2script.org or http://i.java2script.org
 * 4. http://orchive.java2script.org or http://o.java2script.org
 * 5. http://urchive.java2script.org or http://u.java2script.org
 * 6. http://yrchive.java2script.org or http://y.java2script.org
 */
/* protected */
  /*
_Loader.multipleSites = function (path) {
  var deltas = window["j2s.update.delta"];
  if (deltas && deltas instanceof Array && deltas.length >= 3) {
    var lastOldVersion = null;
    var lastNewVersion = null;
    for (var i = 0; i < deltas.length / 3; i++) {
      var oldVersion = deltas[i + i + i];
      if (oldVersion != "$") {
        lastOldVersion = oldVersion;
      }
      var newVersion = deltas[i + i + i + 1];
      if (newVersion != "$") {
        lastNewVersion = newVersion;
      }
      var relativePath = deltas[i + i + i + 2];
      var key = lastOldVersion + "/" + relativePath;
      var idx = path.indexOf (key);
      if (idx != -1 && idx == path.length - key.length) {
        path = path.substring (0, idx) + lastNewVersion + "/" + relativePath;
        break;
      }
    }
  }
  var length = path.length;
  if (maxLoadingThreads > 1 
      && ((length > 15 && path.substring (0, 15) == "http://archive.")
      || (length > 9 && path.substring (0, 9) == "http://a."))) {
    var index = path.lastIndexOf("/");
    if (index < length - 3) {
      var arr = ['a', 'e', 'i', 'o', 'u', 'y'];
      var c1 = path.charCodeAt (index + 1);
      var c2 = path.charCodeAt (index + 2);
      var idx = (length - index) * 3 + c1 * 5 + c2 * 7; // Hash
      return path.substring (0, 7) + arr[idx % 6] + path.substring (8);
    }
  }
  return path;
};
  */

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
      base = (window["Clazz"] && Clazz[bins] && Clazz[bins].length ? Clazz[bins][0] 
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
 * To ignore some classes.
 */
/* public */
_Loader.ignore = function () {
  var clazzes = (arguments.length == 1 && arguments[0] instanceof Array ?
      clazzes = arguments[0] : null);
  var n = (clazzes ? clazzes.length : arguments.length);
  if (!clazzes) {
    clazzes = new Array(n);
    for (var i = 0; i < n; i++)
      clazzes[i] = arguments[i];
  }
  unwrapArray(clazzes);
  for (var i = 0; i < n; i++)
    excludeClassMap["@" + clazzes[i]] = 1;
};

/**
 * The following *.script* can be overriden to indicate the 
 * status of classes loading.
 *
 * TODO: There should be a Java interface with name like INativeLoaderStatus
 */
/* public */
_Loader.onScriptLoading = function (file){};

/* public */
_Loader.onScriptLoaded = function (file, isError){};

/* public */
_Loader.onScriptInitialized = function (file){};

/* public */
_Loader.onScriptCompleted = function (file){};

/* public */
_Loader.onClassUnloaded = function (clazz){};

/**
 * After all the classes are loaded, this method will be called.
 * Should be overriden to run *.main([]).
 */
/* public */
_Loader.onGlobalLoaded = function () {};

/* public */
_Loader.keepOnLoading = true; // never set false in this code


/* private */
var mapPath2ClassNode = {};

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
  if (js.indexOf("c$") >= 0 && js.indexOf("var c$") < 0) {
    // some older J2S files are like this, without a function wrapper, so we provide that here.
    js = "(function(){var c$;" + js + "})();";
  }
  try {
  ;
    eval(js + ";//# sourceURL="+file);
  } catch (e) {      
    var s = "[Java2Script] The required class file \n\n" + file + (js.indexOf("data: no") ? 
       "\nwas not found.\n"
      : "\ncould not be loaded. Script error: " + e.message + " \n\ndata:\n\n" + js) + "\n\n" 
      + (e.stack ? e.stack : Clazz.getStackTrace());
    Clazz._lastEvalError = s;    
    if (Clazz._isQuiet) 
      return;
    Clazz.alert(s);
    throw e;
  }
  _Loader.onScriptLoaded(file, false);
}

/* private */
var failedHandles = {};

/* private */
var generateRemovingFunction = function (node) {
  return function () {
    if (node.readyState != "interactive") {
      try {
        if (node.parentNode)
          node.parentNode.removeChild (node);
      } catch (e) { }
      node = null;
    }
  };
};

/* private */
var removeScriptNode = function (n) {
  if (window["j2s.script.debugging"]) {
    return;
  }
  // lazily remove script nodes.
  window.setTimeout (generateRemovingFunction (n), 1);
};

/* public */
Clazz._4Name = function(clazzName, applet, state) {
  if (Clazz.isClassDefined(clazzName))
    return evalType(clazzName);
  if (clazzName.indexOf("$") >= 0) {
    // BH we allow Java's java.swing.JTable.$BooleanRenderer as a stand-in for java.swing.JTable.BooleanRenderer
    // when the static nested class is created using declareType  
   var name2 = clazzName.replace(/\$/g,".");
   if (Clazz.isClassDefined(name2))
    return evalType(name2);   
  }
  var f = (J2S._isAsync && applet ? applet._restoreState(clazzName, state) : null);
  if (f == 1)
    return null; // must be already being created
  if (_Loader.setLoadingMode(f ? _Loader.MODE_SCRIPT : "xhr.sync")) {
    _Loader.loadClass(clazzName, f, false, true, 1);
    return null; // this will surely throw an error, but that is OK
  }
  //alert ("Using Java reflection: " + clazzName + " for " + applet._id + " \n"+ Clazz.getStackTrace());
  _Loader.loadClass(clazzName);
  return evalType(clazzName);
};

/**
 * BH: possibly useful for debugging
 */ 
Clazz.currentPath= "";

/**
 * Load *.js by adding script elements into head. Hook the onload event to
 * load the next class in dependency tree.
 */
/* private */
var loadScript = function (node, file, why, ignoreOnload, fSuccess, _loadScript) {

  Clazz.currentPath = file;
  if (ignoreOnload)alert("WHY>>")
//BH removed  // maybe some scripts are to be loaded without needs to know onload event.
//  if (!ignoreOnload && loadedScripts[file]) {
//    _Loader.tryToLoadNext(file);
//    return;
//  }
  loadedScripts[file] = true;
  // also remove from queue
  removeArrayItem(classQueue, file);

    // forces not-found message
    isUsingXMLHttpRequest = true;
    isAsynchronousLoading = false;
  if (_Loader._checkLoad) {
    System.out.println("\t" + file + (why ? "\n -- required by " + why : "") + "  ajax=" + isUsingXMLHttpRequest + " async=" + isAsynchronousLoading)
  } 

  var file0 = file;
  if (Clazz._debugging) {
    file = file.replace(/\.z\.js/,".js");
  }

  _Loader.onScriptLoading(file);
  if (isUsingXMLHttpRequest && !isAsynchronousLoading) {
    // alert("\t" + file + (why ? "\n -- required by " + why : "") + "  ajax=" + isUsingXMLHttpRequest + " async=" + isAsynchronousLoading + " " + Clazz.getStackTrace())
    // synchronous loading
    // works in MSIE locally unless a binary file :)
    // from Jmol.api.Interface only
    var data = J2S._getFileData(file);
    try{
      evaluate(file, data);
      var node = mapPath2ClassNode["@" + file0];
      if (node.status < Node.STATUS_CONTENT_LOADED)
        node.status = Node.STATUS_CONTENT_LOADED; // BH allowing load to update the node
    }catch(e) {
      var s = ""+e;
      if (data.indexOf("Error") >= 0)
        s = data;
      if (s.indexOf("missing ] after element list")>= 0)
        s = "File not found";
      doDebugger()
      alert(s + " loading file " + file + ": " + node.name + " - " + (why ? "\n -- required by " + why : "") + " lastDecorated: " + Clazz._lastDecorated + (e.stack ? "\n\n" + e.stack : Clazz.getStackTrace()));
    }
    tryToLoadNext(file0);
    if (fSuccess) {
         fSuccess(); 
    }
    return;
  }
  
  
System.out.println("for file " + file +" fSuccess = " + (fSuccess ? fSuccess.toString() : ""))

  var info = {
    dataType:"script",
    async:true, 
    type:"GET", 
    url:file,
    success:W3CScriptOnCallback(file, false, fSuccess),
    error:W3CScriptOnCallback(file, true, fSuccess)
  };
  inLoadingThreads++;
  J2S.$ajax(info);
};

var removeArrayItem = function(arr, item) {
  var i = findArrayItem(arr, item);
  if (i >= 0) {
    var n = arr.length - 1;
    for (; i < n; i++)
      arr[i] = arr[i + 1];
    arr.length--;
    return true;
  }
}

var findArrayItem = function(arr, item) {
  if (arr && item)
    for (var i = arr.length; --i >= 0;)
      if (arr[i] === item)
        return i;
  return -1;
}


/* private */
var W3CScriptOnCallback = function (path, forError, fSuccess) {
  var s = Clazz.getStackTrace();
  // if (!fSuccess)alert("why no fSuccess?" + s)
  return function () {
  //System.out.println("returning " + (fSuccess ? fSuccess.toString() : "no function ") + s) 
    if (forError && __debuggingBH)Clazz.alert ("############ forError=" + forError + " path=" + path + " ####" + (forError ? "NOT" : "") + "LOADED###");
    if (isGecko && this.timeoutHandle)
      window.clearTimeout(this.timeoutHandle), this.timeoutHandle = null;
    if (inLoadingThreads > 0)
      inLoadingThreads--;
    //System.out.println("w3ccalback for " + path + " " + inLoadingThreads + " threads")
    this.onload = null;
    this.onerror = null;
    if (forError) 
      alert ("There was a problem loading " + path);
    _Loader.onScriptLoaded(path, true);
    var node = this;      
    var f;
    if (fSuccess)
      f = function(_W3scriptFS){removeScriptNode(node);tryToLoadNext(path, fSuccess); };
    else
      f = function(_W3script){removeScriptNode(node);tryToLoadNext(path)};
    if (loadingTimeLag >= 0)
      window.setTimeout(function() { tryToLoadNext(path, f); }, loadingTimeLag);
    else
      tryToLoadNext(path, f);
  };
};

/* private */
var isLoadingEntryClass = true;

/* private */
var besidesJavaPackage = false;

/**
 * After class is loaded, this method will be executed to check whether there
 * are classes in the dependency tree that need to be loaded.
 */
/* private */
var tryToLoadNext = function (file, fSuccess) {
  var node = mapPath2ClassNode["@" + file];
  if (!node) // maybe class tree root
    return;
  var n;
  // check for content loaded
  var clazzes = classpathMap["$" + file];
  if (clazzes) {
    for (var i = 0; i < clazzes.length; i++) {
      var name = clazzes[i];
      if (name != node.name && (n = findNode(name))) {
        if (n.status < Node.STATUS_CONTENT_LOADED) {
          n.status = Node.STATUS_CONTENT_LOADED;
          updateNode(n);
        }
      } else {
        n = new Node();
        n.name = name;
        var pp = classpathMap["#" + name];
        if (!pp) {
          alert (name + " J2S error in tryToLoadNext");
          error("Java2Script implementation error! Please report this bug!");
        }
        n.path = pp;
        mappingPathNameNode (n.path, name, n);
        n.status = Node.STATUS_CONTENT_LOADED;
         addChildClassNode(clazzTreeRoot, n, false);
        updateNode(n);        
      }
    }
  }
  if (node instanceof Array) {
    for (var i = 0; i < node.length; i++) {
      if (node[i].status < Node.STATUS_CONTENT_LOADED) {
        node[i].status = Node.STATUS_CONTENT_LOADED;
        updateNode(node[i]);
      }
    }
  } else if (node.status < Node.STATUS_CONTENT_LOADED) {
    var stillLoading = false;
    var ss = document.getElementsByTagName ("SCRIPT");
    for (var i = 0; i < ss.length; i++) {
      if (isIE) {
        if (ss[i].onreadystatechange && ss[i].onreadystatechange.path == node.path
            && ss[i].readyState == "interactive") {
          stillLoading = true;
          break;
        }
      } else if (ss[i].onload && ss[i].onload.path == node.path) {
        stillLoading = true;
        break;
      }
    } 
    if (!stillLoading) {
      node.status = Node.STATUS_CONTENT_LOADED;
      updateNode(node);
    }
  } else if (node.musts.length == 0 && node.optionals.length == 0) {
    updateNode(node);
  }
  /*
   * Maybe in #optinalLoaded inside above _Loader#updateNode calls, 
   * _Loader.keepOnLoading is set false (Already loaded the wanted
   * classes), so here check to stop.
   */
   
  if (!_Loader.keepOnLoading) // set externally
    return;

 // check for a "must" class that has content and load it
  var cq;
  var working = true;
  if ((n = findNextMustClass(Node.STATUS_KNOWN))) {
    loadClassNode(n);
    while (inLoadingThreads < maxLoadingThreads) {
      if (!(n = findNextMustClass(Node.STATUS_KNOWN)))
        break;
      loadClassNode(n); // will increase inLoadingThreads!
    }
  } else if ((cq = classQueue).length != 0) { 
    /* queue must be loaded in order! */
    n = cq.shift();
    if (!loadedScripts[n.path] 
        || cq.length != 0 
        || !isLoadingEntryClass
        || n.musts.length
        || n.optionals.length) {
      addChildClassNode(clazzTreeRoot, n, true);
      loadScript(n, n.path, n.requiredBy, false);
    } else if (isLoadingEntryClass) {
      /*
       * The first time reaching here is the time when ClassLoader
       * is trying to load entry class. Class with #main method and
       * is to be executed is called Entry Class.
       *
       * Here when loading entry class, ClassLoader should not call
       * the next following loading script. This is because, those
       * scripts will try to mark the class as loaded directly and
       * then continue to call #onLoaded callback method,
       * which results in an script error!
       */
      isLoadingEntryClass = false;
    }
  } else if ((n = findNextRequiredClass(Node.STATUS_KNOWN))) {
    loadClassNode(n);
    while (inLoadingThreads < maxLoadingThreads) {
      if (!(n = findNextRequiredClass(Node.STATUS_KNOWN)))
        break;
      loadClassNode(n); // will increase inLoadingThreads!
    }
  } else {
    working = false;
  }
  if (working || inLoadingThreads > 0)
    return;
  // 
  // now check all classes that MUST be loaded prior to initialization 
  // of some other class (static calls, extends, implements)
  // and all classes REQUIRED somewhere in that class, possibly by the constructor
  // (that is, "new xxxx()" called somewhere in code) and update them
  // that have content but are not declared already 
  var f = [findNextMustClass,findNextRequiredClass];
  var lastNode = null;
  for (var i = 0; i < 2; i++) {
    var pt = 0;
    while ((n = f[i](Node.STATUS_CONTENT_LOADED))) {
      if (i == 1 && lastNode === n) // Already existed cycle ?
        n.status = Node.STATUS_LOAD_COMPLETE;
      updateNode(n);
      lastNode = n;
      if (pt++ == 1000) {
        alert("There seems to be a problem loading " + n.name+ ". Check all imports and make sure that those files really exist. This could be a java.xxx vs java.xxx issue.\n"+Clazz._lastEvalError)
        break;
      } 
    }
  }
  // check for load cycles
  
  while (true) {
    tracks = [];
    if (!checkCycle(clazzTreeRoot, file))
      break;
  }
  
  // and update all MUST and REQUIRED classes that are declared already 
  
  for (var i = 0; i < 2; i++) {
    lastNode = null;
    while ((n = f[i](Node.STATUS_DECLARED))) {
      if (lastNode === n) 
        break;
      updateNode(lastNode = n);
    }
  }
  var done = [];
  for (var i = 0; i < 2; i++) 
    while ((n = f[i](Node.STATUS_DECLARED)))
      done.push(n), n.status = Node.STATUS_LOAD_COMPLETE;
  if (done.length) {
    for (var i = 0; i < done.length; i++)
      destroyClassNode(done[i]);
    for (var i = 0; i < done.length; i++)
      if ((f = done[i].onLoaded))
        done[i].onLoaded = null, f();
  }
  
  if (_Loader._checkLoad)  
  System.out.println("classes loaded: " + Clazz._Loader._classCountOK + "; maximum dependency depth: " + Clazz._nodeDepth);

  //System.out.println(node.name + " loaded completely" + _Loader.onGlobalLoaded + "\n\n")
  if (fSuccess) {
    //System.out.println("tryToLoadNext firing " + _Loader._classCountOK + "/" + _Loader._classCountPending + " "   + fSuccess.toString() + " " + Clazz.getStackTrace())
    fSuccess();
  } else if (_Loader._classCountPending) {
    for (var name in _Loader._classPending) {
      var n = findNode(name);
      System.out.println("class left pending " + name + " " + n);
      if (n) {
        updateNode(n);
        break;
      }
    }
  } else {
    
 // System.out.println("I think I'm done " 
  // + _Loader._classCountOK + "/" + _Loader._classCountPending + " " 
   //+ _Loader.onGlobalLoaded.toString() + " " + Clazz.getStackTrace()
 //  )
    if (_Loader._checkLoad)
      Clazz._showDone();
  }
  _Loader.onGlobalLoaded();
};

Clazz._showDone = function() {
      System.out.println("I think I'm done: " + Clazz.saemCount0 + " methods, " + Clazz.saemCount1 + " overridden, " + Clazz.saemCount2 + " processed");
      Clazz.showDuplicates(true);
}

var tracks = [];

/*
 * There are classes reference cycles. Try to detect and break those cycles.
 */
/* private */
var checkCycle = function (node, file) {
  var ts = tracks;
  var len = ts.length;
  // add this node to tracks
  ts.push(node);
  var i = len;
  for (; --i >= 0;)
    if (ts[i] === node && ts[i].status >= Node.STATUS_DECLARED) 
      break;
  if (i >= 0) {
    // this node is already in tracks, and it has been declared already
    // for each node in tracks, set its status to "LOAD_COMPLETE"
    // update all parents, remove all parents, and fire its onLoaded function
    // then clear tracks and return true (keep checking)  
    if (_Loader._checkLoad) {
      var msg = "cycle found loading " + file + " for " + node;
      System.out.println(msg);
    } 
    for (; i < len; i++) {
      var n = ts[i];
      n.status = Node.STATUS_LOAD_COMPLETE;
      destroyClassNode(n); // Same as above
      for (var k = 0; k < n.parents.length; k++)
        updateNode(n.parents[k]);
      n.parents = [];
      var f = n.onLoaded;
      if (_Loader._checkLoad) {
        var msg = "cycle setting status to LOAD_COMPLETE for " + n.name + (f ? " firing " + f.toString() : "");
        System.out.println(msg)
      } 
      if (f)
        n.onLoaded = null, f();
    }
    ts.length = 0;
    return true;
  }
  var a = [node.musts, node.optionals];
  for (var j = 0; j < 2; j++)
    for (var r = a[j], i = r.length; --i >= 0;)
      if (r[i].status == Node.STATUS_DECLARED && checkCycle(r[i], file)) 
        return true;
  // reset _tracks to its original length      
  ts.length = len;
  return false; // done 
};


_Loader._classCountPending = 0;
_Loader._classCountOK = 0;
_Loader._classPending = {};

_Loader.showPending = function() {
  var a = [];
  for (var name in _Loader._classPending) {
    var n = findNode(name);
    if (!n) {
      alert("No node for " + name);
      continue;
    }
    a.push(n);
    System.out.println(showNode("", "", n, "", 0));     
  }  
  return a;
}

var showNode = function(s, names, node, inset, level) {
  names += "--" + node.name;
  s += names + "\n";
  if (level > 5) {
    s += inset + " ...\n";
    return s;
  }
  inset += "\t";
  s += inset + "status: " + node.status + "\n";
  if (node.parents && node.parents.length && node.parents[0] && node.parents[0].name) {
    s += inset + "parents: " + node.parents.length + "\n";
    for (var i = 0; i < node.parents.length; i++) {
      s = showNode(s, names, node.parents[i], inset + "\t", level+1);
    }
    s += "\n";
  }
//  if (node.requiredBy) {
//    s += inset + "requiredBy:\n";
//    s = showNode(s, names, node.requiredBy, inset + "\t", level+1);
//    s += "\n";
//  }
  return s;    
}     

Clazz.nodeDepth = 0;
/**
 * Update the dependency tree nodes recursively.
 */
/* private */
updateNode = function(node, ulev, chain, _updateNode) {
  ulev || (ulev = 0);
  chain || (chain = "");
  ulev++;
  if (ulev > 250) // something is wrong -- we want to see why
    chain += (node == null ? "" : node.name + "\n")
  if (ulev > Clazz._nodeDepth)
    Clazz._nodeDepth = ulev;
  if (ulev % 300 == 0)alert("warning - j2sSwingJS.updatenode depth " + ulev + "\n" + chain)
  if (!node.name || node.status >= Node.STATUS_LOAD_COMPLETE) {
    destroyClassNode(node);
    return;
  }
  var ready = true;
  // check for declared and also having MUSTS
  if (node.musts.length && node.declaration) {
    for (var mustLength = node.musts.length, i = mustLength; --i >= 0;) {
      var n = node.musts[i];
      n.requiredBy = node;
      if (n.status < Node.STATUS_DECLARED && isClassDefined (n.name)) {
        var nns = []; // a stack for onLoaded events
        n.status = Node.STATUS_LOAD_COMPLETE;
        destroyClassNode(n); // Same as above
        if (n.declaration  && n.declaration.clazzList) {
          // For those classes within one *.js file, update them synchronously.
          for (var j = 0, list = n.declaration.clazzList, l = list.length; j < l; j++) {
            var nn = findNode (list[j]);
            if (nn && nn.status != Node.STATUS_LOAD_COMPLETE
                && nn !== n) {
              nn.status = n.status;
              nn.declaration = null;
              destroyClassNode(nn);
              nn.onLoaded && nns.push(nn);
            }
          }
          n.declaration = null;
        }
        // fire all onLoaded events
        if (n.onLoaded)
          nns.push(n);
        for (var j = 0; j < nns.length; j++) {
          var onLoaded = nns[j].onLoaded;
          if (onLoaded) {
            nns[j].onLoaded = null;
            onLoaded();
          }
        }
      } else {
        (n.status == Node.STATUS_CONTENT_LOADED) && updateNode(n, ulev, chain); // musts may be changed
        if (n.status < Node.STATUS_DECLARED)
          ready = false;
      }
      if (node.musts.length != mustLength) {
        // length changed -- restart!
        i = mustLength = node.musts.length;
        ready = true;
      }
    }
  }
  if (!ready)
    return;
  if (node.status < Node.STATUS_DECLARED) {
    var decl = node.declaration;
    if (decl) {
//      var vallow = allowImplicit;
//      allowImplicit = true;
      decl(), decl.executed = true;
//      allowImplicit = vallow;
    }
    if(_Loader._checkLoad) {
            if (_Loader._classPending[node.name]) {
              delete _Loader._classPending[node.name];
              _Loader._classCountOK;
              _Loader._classCountPending--;
//              System.out.println("OK " + (_Loader._classCountOK) + " FOR " + node.name)
            }
    }
    node.status = Node.STATUS_DECLARED;
    if (definedClasses)
      definedClasses[node.name] = true;
      
    _Loader.onScriptInitialized(node.path);
    if (node.declaration && node.declaration.clazzList) {
      // For those classes within one *.js file, update them synchronously.
      for (var j = 0, list = node.declaration.clazzList, l = list.length; j < l; j++) {
        var nn = findNode(list[j]);
        if (nn && nn.status != Node.STATUS_DECLARED
            && nn !== node) {
          nn.status = Node.STATUS_DECLARED;
          if (definedClasses)
            definedClasses[nn.name] = true;
          _Loader.onScriptInitialized(nn.path);
        }
      }
    }
  }
  var level = Node.STATUS_DECLARED;
  if (node.optionals.length == 0 && node.musts.length == 0
      || node.status > Node.STATUS_KNOWN && !node.declaration
      || checkStatusIs(node.musts, Node.STATUS_LOAD_COMPLETE)
          && checkStatusIs(node.optionals, Node.STATUS_LOAD_COMPLETE)) { 
    level = Node.STATUS_LOAD_COMPLETE;
    if (!doneLoading(node, level))
      return false;
      // For those classes within one *.js file, update them synchronously.
    if (node.declaration && node.declaration.clazzList) {
      for (var j = 0, list = node.declaration.clazzList, l = list.length; j < l; j++) {
        var nn = findNode(list[j]);
        if (nn && nn.status != level && nn !== node) {
          nn.declaration = null;
          if (!doneLoading(nn, level))
            return false;
        }
      }
    }
  }
  
  
  
  // _Loader.updateParents = function (node, level, _updateParents)
  if (node.parents && node.parents.length) {
    for (var i = 0; i < node.parents.length; i++) {
      var p = node.parents[i];
      if (p.status < level) 
        updateNode(p, ulev, chain, p.name);
    }
    if (level == Node.STATUS_LOAD_COMPLETE)
      node.parents = [];
  }
};

/* private */
var checkStatusIs = function(arr, status){
  for (var i = arr.length; --i >= 0;)
    if (arr[i].status < status)
      return false;
  return true;
}
/* private */
var doneLoading = function(node, level, _doneLoading) {
  node.status = level;
  _Loader.onScriptCompleted(node.path);
  
  var onLoaded = node.onLoaded;
  if (onLoaded) {
    node.onLoaded = null;
    onLoaded();
    if (!_Loader.keepOnLoading)
      return false;
  }
  
  destroyClassNode(node);
  return true;
}

/*
 * Be used to record already used random numbers. And next new random
 * number should not be in the property set.
 */
/* private */
var usedRandoms = {
  "r0.13412" : 1
};

/* private */
var getRnd = function() {
  while (true) { // get a unique random number
    var rnd = Math.random();
    var s = "r" + rnd;
    if (!usedRandoms[s])
      return (usedRandoms[s] = 1, clazzTreeRoot.random = rnd);
  }
}

/* protected */
var findNode = function(clazzName) {
  getRnd();
  return findNodeUnderNode(clazzName, clazzTreeRoot);
};

//Clazz._findNode = findNode;  BH - maybe this was for debugging

/* private */
var findNextRequiredClass = function(status) {
  getRnd();
  return findNextRequiredNode(clazzTreeRoot, status);
};

/* private */
var findNextMustClass = function(status) {
  return findNextMustNode(clazzTreeRoot, status);
};

/* private */
var findNodeUnderNode = function(clazzName, node) {
  var n;
  // node, then musts then optionals
  return (node.name == clazzName ? node 
    : (n = findNodeWithin(clazzName, node.musts))
    || (n = findNodeWithin(clazzName, node.optionals)) 
    ? n : null);
};

/* private */
var findNodeWithin = function(name, arr) {
  var rnd = clazzTreeRoot.random;
  for (var i = arr.length; --i >= 0;) {
    var n = arr[i];
    if (n.name == name)
      return n;
    if (n.random != rnd) {
      n.random = rnd;
      if ((n = findNodeUnderNode(name, n)))
        return n;
    }
  }
  return null;
}

/* private */
var checkStatus = function(n, status) {
  return (n.status == status 
      && (status != Node.STATUS_KNOWN || !loadedScripts[n.path])
      && (status == Node.STATUS_DECLARED  || !isClassDefined (n.name)));
}

/* private */
var findNextMustNode = function(node, status) {
  for (var i = node.musts.length; --i >= 0;) {
    var n = node.musts[i];
    if (checkStatus(n, status) || (n = findNextMustNode(n, status)))
      return n;  
  }
  return (checkStatus(node, status) ? node : null); 
};

/* private */
var findNextRequiredNode = function (node, status) {
  // search musts first
  // search optionals second
  // search itself last
  var n;
  return ((n = searchClassArray(node.musts, status))
    || (n = searchClassArray(node.optionals, status))
    || checkStatus(n = node, status) ? n : null);
};

/* private */
var searchClassArray = function (arr, status) {
  if (arr) {
    var rnd = clazzTreeRoot.random;
    for (var i = 0; i < arr.length; i++) {
      var n = arr[i];
      if (checkStatus(n, status))
        return n;
      if (n.random != rnd) {
        n.random = rnd; // mark as visited!
        if ((n = findNextRequiredNode(n, status)))
          return n;
      }
    }
  }
  return null;
};

/**
 * This map variable is used to mark that *.js is correctly loaded.
 * In IE, _Loader has defects to detect whether a *.js is correctly
 * loaded or not, so inner loading mark is used for detecting.
 */
/* private */
var innerLoadedScripts = {};

/**
 * This method will be called in almost every *.js generated by Java2Script
 * compiler.
 */
/* public */
var load = function (musts, name, optionals, declaration) {
  // called as name.load in Jmol
  if (name instanceof Array) {
    unwrapArray(name);
    for (var i = 0; i < name.length; i++)
      load(musts, name[i], optionals, declaration, name);
    return;
  }
  if (J2S._debugCore)
    checkDeclared(name, 2);
  if (_Loader._checkLoad) {
    if (_Loader._classPending[name]) {
      //alert("duplicate load for " + name)
    } else {
      _Loader._classPending[name] = 1;
      if (_Loader._classCountPending++ == 0)
        _Loader._classCountOK = 0;
      System.out.println("Loading class " + name);
    }
  }

//  if (clazz.charAt (0) == '$')
//    clazz = "org.eclipse.s" + clazz.substring (1);
  var node = mapPath2ClassNode["#" + name];
  if (!node) { // load called inside *.z.js?
    var n = findNode(name);
    node = (n ? n : new Node());
    node.name = name;
    node.path = classpathMap["#" + name] || "unknown";
    mappingPathNameNode(node.path, name, node);
    node.status = Node.STATUS_KNOWN;
    addChildClassNode(clazzTreeRoot, node, false);
  }
  processRequired(node, musts, true);
  if (arguments.length == 5 && declaration) {
    declaration.status = node.status;
    declaration.clazzList = arguments[4];
  }
  node.declaration = declaration;
  if (declaration) {  
    node.status = Node.STATUS_CONTENT_LOADED;
  }
  processRequired(node, optionals, false);
  if (node.musts.length == 0 && node.optionals.length == 0)
    updateNode(node);
};

/* private */
var processRequired = function(node, arr, isMust) {
  if (arr && arr.length) {
    unwrapArray(arr);
    for (var i = 0; i < arr.length; i++) {
      var name = arr[i];
      if (!name)
        continue;
      if (isClassDefined(name)
          || isClassExcluded(name))
        continue;
      var n = findNode(name);
      if (!n) {
        n = new Node();
        n.name = name;
        n.status = Node.STATUS_KNOWN;
      }
      n.requiredBy = node;
      addChildClassNode(node, n, isMust);
    }
  }
}

/*
 * Try to be compatiable of Clazz
 */
if (window["Clazz"]) {
  Clazz.load = load;
} else {
  _Loader.load = load;
}  
/**
 * Map different class to the same path! Many classes may be packed into
 * a *.z.js already.
 *
 * @path *.js path
 * @name class name
 * @node Node object
 */
/* private */
var mappingPathNameNode = function (path, name, node) {
  var map = mapPath2ClassNode;
  var keyPath = "@" + path;
  var v = map[keyPath];
  if (v) {
    if (v instanceof Array) {
      var existed = false;
      for (var i = 0; i < v.length; i++) {
        if (v[i].name == name) {
          existed = true;
          break;
        }
      }
      if (!existed)
        v.push(node);
    } else {
      map[keyPath] = [v, node];
    }
  } else {
    map[keyPath] = node;
  }
  map["#" + name] = node;
};

/* protected */
var loadClassNode = function (node) {
  var name = node.name;
  if (!isClassDefined (name) 
      && !isClassExcluded (name)) {
    var path = _Loader.getClasspathFor (name/*, true*/);
    node.path = path;
    mappingPathNameNode (path, name, node);
    if (!loadedScripts[path]) {
      loadScript(node, path, node.requiredBy, false);
      return true;
    }
  }
  return false;
};


/**
 * Used in package
/* public */
var runtimeKeyClass = _Loader.runtimeKeyClass = "java.lang.String";

/**
 * Queue used to store classes before key class is loaded.
 */
/* private */
var queueBe4KeyClazz = [];

/* private */
var J2sLibBase;

/**
 * Return J2SLib base path from existed SCRIPT src attribute.
 */
/* public */
_Loader.getJ2SLibBase = function () {
  var o = window["j2s.lib"];
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

/* private */
var runtimeLoaded = function () {
  if (pkgRefCount  || !isClassDefined(runtimeKeyClass))
    return;
  var qbs = queueBe4KeyClazz;
  for (var i = 0; i < qbs.length; i++)
    _Loader.loadClass(qbs[i][0], qbs[i][1]);
  queueBe4KeyClazz = [];
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
  else
    f = (keyClass == runtimeKeyClass ? runtimeLoaded : null);      
  _Loader.jarClasspath(zjarPath, isArr ? keyClass : [keyClass]);
  // BH note: runtimeKeyClass is java.lang.String  
  _Loader.loadClass(keyClass, f, true);
};

var NodeMap = {};
var _allNodes = [];

/**
 * The method help constructing the multiple-binary class dependency tree.
 */
/* private */
var addChildClassNode = function (parent, child, isMust) {
  var existed = false;
  var arr;
  if (isMust) {
    arr = parent.musts;
    if (!child.requiredBy)
      child.requiredBy = parent;
//    if (!parent.requiresMap){
//      parent.requires = [];
//      parent.requiresMap = {};
//    }
//    if (!parent.requiresMap[child.name]) {
//      parent.requiresMap[child.name] = 1;
//      parent.requires.push[child];
//    }
  } else {
    arr = parent.optionals;
  }
  if (!NodeMap[child.name]) {
    _allNodes.push(child)
    NodeMap[child.name]=child
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == child.name) {
      existed = true;
      break;
    }
  }
  if (!existed) {
    arr.push(child);
    if (isLoadingEntryClass 
        && child.name.indexOf("java") != 0 
        && child.name.indexOf("net.sf.j2s.ajax") != 0) {
      if (besidesJavaPackage)
        isLoadingEntryClass = false;
      besidesJavaPackage = true;
//    } else if (child.name.indexOf("org.eclipse.swt") == 0 
//        || child.name.indexOf("$wt") == 0) {
//      window["swt.lazy.loading.callback"] = swtLazyLoading;
//      if (needPackage("org.eclipse.swt"))
//        return _Loader.loadPackage("org.eclipse.swt", function() {addParentClassNode(child, parent)});
    }
  }
  addParentClassNode(child, parent);
};

/* private */
var addParentClassNode = function(child, parent) {
  if (parent.name && parent != clazzTreeRoot && parent != child)
    for (var i = 0; i < child.parents.length; i++)
      if (child.parents[i].name == parent.name)
        return;
  child.parents.push(parent);
}

/* private */
var destroyClassNode = function (node) {
  var parents = node.parents;
  if (parents)
    for (var k = parents.length; --k >= 0;)
      removeArrayItem(parents[k].musts, node) || removeArrayItem(parents[k].optionals, node);
};

/* SwingJS does not support unloading classes
_Loader.unloadClassExt = function (qClazzName) {
  if (definedClasses)
    definedClasses[qClazzName] = false;
  if (classpathMap["#" + qClazzName]) {
    var pp = classpathMap["#" + qClazzName];
    classpathMap["#" + qClazzName] = null;
    var arr = classpathMap["$" + pp];
    removeArrayItem(arr, qClazzName) && (classpathMap["$" + pp] = arr);
  }
  var n = findNode(qClazzName);
  if (n) {
    n.status = Node.STATUS_KNOWN;
    loadedScripts[n.path] = false;
  }
  var path = _Loader.getClasspathFor (qClazzName);
  loadedScripts[path] = false;
  innerLoadedScripts[path] && (innerLoadedScripts[path] = false);
  _Loader.onClassUnloaded(qClazzName);
};
*/


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
/*CLPM.initialize = function (parent) {
  bindingParent = parent;
  if (parent && !attached) {
    attached = true;
    //Clazz.addEvent (window, "unload", cleanup);
    // window.attachEvent ("onunload", cleanup);
  }
};
*/

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
  var ua = navigator.userAgent.toLowerCase();
  monitorEl.style.filter = "Alpha(Opacity=" + alpha + ")";
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
      + "z-index:" + (window["j2s.lib"].monitorZIndex || 10000) + ";background-color:#8e0000;color:yellow;" 
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

/* not used in Jmol
if (window["ClazzLoader"]) {
  _Loader.onScriptLoading = function(file) {
    CLPM.showStatus("Loading " + file + "...");
  };
  _Loader.onScriptLoaded = function(file, isError) {
    CLPM.showStatus(file + (isError ? " loading failed." : " loaded."), true);
  };
  _Loader.onGlobalLoaded = function(file) {
    CLPM.showStatus("Application loaded.", true);
  };
  _Loader.onClassUnloaded = function(clazz) {
    CLPM.showStatus("Class " + clazz + " is unloaded.", true);
  };
}
*/

})(Clazz._LoaderProgressMonitor, J2S);

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
 * TODO: provide more template of binding console window to browser.
 */
/* protected */
Con.createConsoleWindow = function (parentEl) {
  var console = document.createElement ("DIV");
  console.style.cssText = "font-family:monospace, Arial, sans-serif;";
  document.body.appendChild (console);
  return console;
};

var c160 = String.fromCharCode(160); //nbsp;
c160 += c160+c160+c160;

Con.consoleOutput = function (s, color) {
  var o = window["j2s.lib"];
  var con = (o && o.console);
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
      s = (s.length > 1 ? s.substring (0, s.length - (s.charAt (s.length - 2) == '\r' ? 2 : 1)) : "");
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
    var o = window["j2s.lib"];
    var console = o && o.console;
    if (!console || !(console = document.getElementById (console)))
      return;
    var childNodes = console.childNodes;
    for (var i = childNodes.length; --i >= 0;)
      console.removeChild (childNodes[i]);
    Con.linesCount = 0;
  } catch(e){};
};

/* public */
Clazz.alert = function (s) {
  Con.consoleOutput (s + "\r\n");
};

})(Clazz.Console);


Clazz._setDeclared("java.lang.System",
java.lang.System = System = {
  props : null, //new java.util.Properties (),
  $props : {},
  arraycopy : function (src, srcPos, dest, destPos, length) {  
    if (src !== dest || srcPos > destPos) {
      for (var i = length; --i >= 0;)
        dest[destPos++] = src[srcPos++];
    } else {
      destPos += length;
      srcPos += length;
      for (var i = length; --i >= 0;)
        src[--destPos] = src[--srcPos];
    }
  },
  
  currentTimeMillis : function () {
    return new Date ().getTime ();
  },
  exit : function() { swingjs.JSToolkit.exit() },
  gc : function() {}, // bh
  getProperties : function () {
    return System.props;
  },
  getProperty : function (key, def) {
    if (System.props)
      return System.props.getProperty (key, def);
    var v = System.$props[key];
    if (typeof v != "undefined")
      return v;
    if (key.indexOf(".") > 0) {
      v = null;    
      switch (key) {
      case "java.class.version":
        v = "50";
        break;
      case "java.version":
        v = "1.6";
        break;
      case "file.separator":
      case "path.separator":
        v = "/";
        break;        
      case "line.separator":
        v = (navigator.userAgent.indexOf("Windows") >= 0 ? "\r\n" : "\n");
        break;
      case "os.name":
      case "os.version":
        v = navigator.userAgent;
        break;
      }
      if (v)
        return System.$props[key] = v;
    }
    return (arguments.length == 1 ? null : def == null ? key : def); // BH
  },
  getSecurityManager : function() { return null },  // bh
  identityHashCode : function(obj){return obj==null ? 0 : obj._$hashcode || (obj._$hashcode = ++hashCode)},
  lineSeparator : function() { return '\n' }, // bh
  nanoTime: function() {
   return Math.round(window.performance.now() * 1e6)
  },  
  setProperties : function (props) {
    System.props = props;
  },
  setProperty : function (key, val) {
    if (!System.props)
      return System.$props[key] = val; // BH
    System.props.setProperty (key, val);
  }
  
});

;(function(Con, Sys) {

Sys.out = new Clazz._O ();
Sys.out.__CLASS_NAME__ = "java.io.PrintStream";


Sys.out.print = function (s) { 
  Con.consoleOutput (s);
};

Sys.out.printf = Sys.out.format = function (f, args) {
  Sys.out.print(String.format.apply(null, arguments));
}

Sys.out.println = function(s) {
  if (Clazz._nooutput) return;
  if (Clazz._traceOutput && s && ("" + s).indexOf(Clazz._traceOutput) >= 0)
    alert(s + "\n\n" + Clazz.getStackTrace());
  Con.consoleOutput(typeof s == "undefined" ? "\r\n" : s == null ?  s = "null\r\n" : s + "\r\n");
};

Sys.out.write = function (buf, offset, len) {
  Sys.out.print(String.instantialize(buf).substring(offset, offset+len));
};

Sys.err = new Clazz._O ();
Sys.err.__CLASS_NAME__ = "java.io.PrintStream";

Sys.err.print = function (s) { 
  Con.consoleOutput (s, "red");
};

Sys.err.printf = Sys.err.format = function (f, args) {
  Sys.out.print(String.format.apply(null, arguments));
}

Sys.err.println = function (s) {
  Con.consoleOutput (typeof s == "undefined" ? "\r\n" : s == null ?  s = "null\r\n" : s + "\r\n", "red");
};

Sys.err.write = function (buf, offset, len) {
  Sys.err.print(String.instantialize(buf).substring(offset, offset+len));
};

})(Clazz.Console, System);



// J2sJavaExt



;(function(Clazz) {

// moved here from package.js
// these classes will be created as objects prior to any others
// and are then available immediately

  Clazz._Loader.registerPackages("java", [ "io", "lang", "lang.reflect", "util" ]);

  var sJU = "java.util";

  //var sJU = "JU";  
  //Clazz._Loader.registerPackages (sJU, ["regex", "zip"]);
  //var javautil = JU;

  var javautil = java.util;

  Clazz._Loader.ignore([
    "net.sf.j2s.ajax.HttpRequest",
    sJU + ".MapEntry.Type",
    //"java.net.UnknownServiceException", // unnecessary for Jmol
    "java.lang.Runtime",
    "java.security.AccessController",
    "java.security.PrivilegedExceptionAction",
//    "java.io.File",
//    "java.io.FileInputStream",
//    "java.io.FileWriter",
//    "java.io.OutputStreamWriter",
//    sJU + ".Calendar", // bypassed in ModelCollection
//    "java.text.SimpleDateFormat", // not used
//    "java.text.DateFormat", // not used
    sJU + ".concurrent.Executors"
  ])


})(Clazz);


var c$;
})(Clazz, J2S); // requires JSmolCore.js

if (!window["java.registered"])
 window["java.registered"] = false;

(function (ClazzLoader) {

  if (window["java.packaged"]) return;
  window["java.packaged"] = true;

  //if (!J2S._isAsync) {
    for (var i = 0; i < J2S._coreFiles.length; i++)
      ClazzLoader.loadZJar(J2S._coreFiles[i], ClazzLoader.runtimeKeyClass);
  //}
    
ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "java/awt/geom/Point2D.js", [
  "java.awt.geom.Point2D", 
  "java.awt.geom.Point2D.Double", 
  "java.awt.geom.Point2D.Float"  
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "sun/awt/SunHints.js", [
  "sun.awt.SunHints", 
  "sun.awt.SunHints.Value", 
  "sun.awt.SunHints.Key", 
  "sun.awt.SunHints.LCDContrastKey",
  "sun.awt.SunHints.SunKey" 
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "javax/swing/text/AbstractDocument.js", [
  "javax.swing.text.AbstractDocument", 
  "javax.swing.text.AbstractDocument.UndoRedoDocumentEvent" 
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "javax/swing/UIDefaults.js", [
  "javax.swing.UIDefaults",
  "javax.swing.UIDefaults.ActiveValue",
  "javax.swing.UIDefaults.LazyValue"
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "javax/swing/Popup.js", [
  "javax.swing.Popup", 
  "javax.swing.Popup.DefaultFrame",
  "javax.swing.Popup.HeavyWeightWindow" 
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "javax/swing/text/LayeredHighlighter.js", [
  "javax.swing.text.LayeredHighlighter", 
  "javax.swing.text.LayeredHighlighter.LayerPainter" 
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "javax/swing/JComponent.js", [
  "javax.swing.JComponent", 
  "javax.swing.JComponent.KeyboardState", 
  "javax.swing.JComponent.ActionStandin", 
  "javax.swing.JComponent.IntVector" 
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "sun/util/resources/LocaleData.js", [
  "sun.util.resources.LocaleData", 
  "sun.util.resources.LocaleDataResourceBundleControl"
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "java/text/DateFormat.js", [
  "java.text.DateFormat", 
  "java.text.DateFormat.Field"
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "javax/sound/sampled/Line.js", [
  "java.text.Line.Info"
  ]);

ClazzLoader.jarClasspath (ClazzLoader.getJ2SLibBase() + "javax/sound/sampled/DataLine.js", [
  "java.text.DataLine.Info"
  ]);


}) (Clazz._Loader);
window["java.registered"] = true;
  


if (!debugNoSwingJS)
  Clazz._Loader.loadZJar(Clazz._Loader.getJ2SLibBase() + "core/coreswingjs.z.js", "swingjs.JSToolkit");




// var st =Clazz.$new(StackTraceElement.construct ???
// Clazz.newMethod$(c$,"newInstance$OA", function(args){
// Clazz.newMethod$(c$,"invoke$O$OA",

// j2sSwingJSext.js
// fully qualified names for inital class definitions
 
(function(Clazz) {

var c$;

var supportsNativeObject = true;

///////////////////////// private supporting method creation //////////////////////

var hashCode = 0;


var addProto = function(proto, name, func) {
  return proto[name] = func;
};

var declareType = function(prefix, name, clazzSuper, interfacez, superClazzInstance) {
  return Clazz.decorateAsClass(function(){}, prefix, name, clazzSuper, interfacez, superClazzInstance);
};

///////////////// special definitions of standard Java class methods ///////////

Clazz._setDeclared("java.lang.Thread",java.lang.Thread = Thread = function () {});
Clazz.newMethod$(Thread, "construct", function(){}, 1); 
Clazz.newMethod$(Thread, "currentThread", function () {
  return this.J2S_THREAD;
}, 1);
Thread.J2S_THREAD = Thread.prototype.J2S_THREAD = Clazz.$new(Thread);



// moved here from package.js
// these classes will be created as objects prior to any others
// and are then available immediately

  Clazz._Loader.registerPackages("java", [ "io", "lang", "lang.reflect", "util" ]);

  var sJU = "java.util";

  //var sJU = "JU";  
  //Clazz._Loader.registerPackages (sJU, ["regex", "zip"]);
  //var javautil = JU;

  var javautil = java.util;

  Clazz._Loader.ignore([
    "net.sf.j2s.ajax.HttpRequest",
    sJU + ".MapEntry.Type",
    //"java.net.UnknownServiceException", // unnecessary for Jmol
    "java.lang.Runtime",
    "java.security.AccessController",
    "java.security.PrivilegedExceptionAction",
//    "java.io.File",
//    "java.io.FileInputStream",
//    "java.io.FileWriter",
//    "java.io.OutputStreamWriter",
//    sJU + ".Calendar", // bypassed in ModelCollection
//    "java.text.SimpleDateFormat", // not used
//    "java.text.DateFormat", // not used
    sJU + ".concurrent.Executors"
  ])

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

//the following Math functions rely on datatypes nonexistant in javascript
Math.nextAfter||(Math.nextAfter=function(start,direction){return 0});
Math.nextUp||(Math.nextUp=function(d){return 0});
Math.ulp||(Math.ulp=function(d){return 0});
Math.getExponent||(Math.getExponent=function(d){return 0});
Math.getIEEEremainder||(Math.getIEEEremainder=function(f1,f2){return 0});
//end datatype reliant math declarations

Clazz._setDeclared("java.lang.Number", java.lang.Number=Number);
Number.prototype._numberToString=Number.prototype.toString;
if(supportsNativeObject){
  // Number and Array are special -- do not override prototype.toString -- "length - 2" here
  for (var i = 0; i < Clazz._extendedObjectMethods.length - 2; i++) {
    var p = Clazz._extendedObjectMethods[i];
    Array.prototype[p] = Clazz._O.prototype[p];
    Number.prototype[p] = Clazz._O.prototype[p];
  }
}
Number.__CLASS_NAME__="Number";
Clazz._implementOf(Number,java.io.Serializable);
Number.equals=Clazz._inF.equals;
Number.getName=Clazz._inF.getName;
Number.prototype.compareTo = function(x) { var a = this.valueOf(), b = x.valueOf(); return (a < b ? -1 : a == b ? 0 : 1) };
Number.compare = function(a,b) { return (a < b ? -1 : a == b ? 0 : 1) };

Clazz.newMethod$(Number,"shortValue",
function(){
var x = Math.round(this)&0xffff;
return (this < 0 && x > 0 ? x - 0x10000 : x);
});

Clazz.newMethod$(Number,"byteValue",
function(){
var x = Math.round(this)&0xff;
return (this < 0 && x > 0 ? x - 0x100 : x);
});

Clazz.newMethod$(Number,"intValue",
function(){
return Math.round(this)&0xffffffff;
});

Clazz.newMethod$(Number,"longValue",
function(){
return Math.round(this);
});

Clazz.newMethod$(Number,"floatValue",
function(){
return this.valueOf();
});
Clazz.newMethod$(Number,"doubleValue",
function(){
return parseFloat(this.valueOf());
});

Clazz.newMethod$(Number,"hashCode",
function(){
return this.valueOf();
});

Clazz._setDeclared("java.lang.Integer", java.lang.Integer=Integer=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});

var setJ2STypeclass = function(cl, type, paramCode) {
  cl.TYPE = {
    type:type, 
    __PARAMCODE:paramCode, 
    __PRIMITIVE:1
  };
  cl.TYPE.toString = cl.TYPE.getName = cl.TYPE.getTypeName 
    = cl.TYPE.getCanonicalName = cl.TYPE.getSimpleName = function() {return type}
}

var decorateAsNumber = function (clazzFun, qClazzName, type, PARAMCODE) {
  clazzFun.prototype.valueOf=function(){return 0;};
  clazzFun.prototype.__VAL0__ = 1;
  Clazz._extendJO(clazzFun, qClazzName, true);
  Clazz._inheritClass(clazzFun, Number);
  Clazz._implementOf(clazzFun, Comparable);
  setJ2STypeclass(clazzFun, type, PARAMCODE);
  return clazzFun;
};

decorateAsNumber(Integer, "Integer", "int", "I");

Integer.toString=Integer.prototype.toString=function(){
  if(arguments.length!=0){
    return "" + arguments[0];
  } 
  if(this===Integer){
    return "class java.lang.Integer";
  }
  return "" + this.valueOf();
};

Clazz.newMethod$(Integer, "construct", function(v){
 v == null && (v = 0);
 if (typeof v != "number")
  v = Integer.parseIntRadix(v, 10);
 this.valueOf=function(){return v;};
}, 1);

Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;
//Integer.TYPE=Integer.prototype.TYPE=Integer;


Clazz.newMethod$(Integer,"bitCount",
function(i) {
  i = i - ((i >>> 1) & 0x55555555);
  i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
  i = (i + (i >>> 4)) & 0x0f0f0f0f;
  i = i + (i >>> 8);
  i = i + (i >>> 16);
  return i & 0x3f;
});
Integer.bitCount=Integer.prototype.bitCount;

Clazz.newMethod$(Integer,"numberOfLeadingZeros",
function(i) {
 if (i == 0) return 32;
 var n = 1;
 if (i >>> 16 == 0) { n += 16; i <<= 16; }
 if (i >>> 24 == 0) { n +=  8; i <<=  8; }
 if (i >>> 28 == 0) { n +=  4; i <<=  4; }
 if (i >>> 30 == 0) { n +=  2; i <<=  2; }
 n -= i >>> 31;
 return n;
});
Integer.numberOfLeadingZeros=Integer.prototype.numberOfLeadingZeros;

Clazz.newMethod$(Integer,"numberOfTrailingZeros",
function(i) {
  if (i == 0) return 32;
  var n = 31;
  var y = i <<16; if (y != 0) { n = n -16; i = y; }
  y = i << 8; if (y != 0) { n = n - 8; i = y; }
  y = i << 4; if (y != 0) { n = n - 4; i = y; }
  y = i << 2; if (y != 0) { n = n - 2; i = y; }
  return n - ((i << 1) >>> 31);
});
Integer.numberOfTrailingZeros=Integer.prototype.numberOfTrailingZeros;

Clazz.newMethod$(Integer,"parseIntRadix",
function(s,radix){
if(s==null){
throw Clazz.$new(NumberFormatException.construct$S, ["null"]);
}if(radix<2){
throw Clazz.$new(NumberFormatException.construct$S, ["radix "+radix+" less than Character.MIN_RADIX"]);
}if(radix>36){
throw Clazz.$new(NumberFormatException.construct$S, ["radix "+radix+" greater than Character.MAX_RADIX"]);
}
if (radix == 10) {
  for (var i = s.length; --i >= 0;) {
    var c = s.charCodeAt(i);
    if (c >= 48 && c <= 57) 
      continue;
    if (i > 0 || c != 43 && c != 45)
      throw Clazz.$new(NumberFormatException.construct$S, ["Not a Number : "+s]);
  }
}
var i=parseInt(s,radix);
if(isNaN(i)){
throw Clazz.$new(NumberFormatException.construct$S, ["Not a Number : "+s]);
}
return i;
});
Integer.parseIntRadix=Integer.prototype.parseIntRadix;

Clazz.newMethod$(Integer,"parseInt",
function(s){
return Integer.parseIntRadix(s,10);
});
Integer.parseInt=Integer.prototype.parseInt;

Clazz.newMethod$(Integer,"$valueOf",
function(s){
  return Clazz.$new(Integer.construct, [s]);
});

Integer.$valueOf=Integer.prototype.$valueOf;

Clazz.newMethod$(Integer,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Integer)){
return false;
}
return s.valueOf()==this.valueOf();
});
Clazz.newMethod$(Integer,"equals$O",
function(s){
if(s==null||!Clazz.instanceOf(s,Integer)){
return false;
}
return s.valueOf()==this.valueOf();
});

Integer.toHexString=Integer.prototype.toHexString=function(d){
if(d.valueOf)d=d.valueOf();
if (d < 0) {
var b = d & 0xFFFFFF;
var c = ((d>>24)&0xFF);
return c._numberToString(16) + (b = "000000" + b._numberToString(16)).substring(b.length - 6);
}
return d._numberToString(16);};
Integer.toOctalString=Integer.prototype.toOctalString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(8);};
Integer.toBinaryString=Integer.prototype.toBinaryString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(2);};

Clazz.newMethod$(Integer,"decodeRaw", function(n){
if (n.indexOf(".") >= 0)n = "";
var i = (n.startsWith("-") ? 1 : 0);
n = n.replace(/\#/, "0x").toLowerCase();
var radix=(n.startsWith("0x", i) ? 16 : n.startsWith("0", i) ? 8 : 10);
// The general problem with parseInt is that is not strict -- ParseInt("10whatever") == 10.
// Number is strict, but Number("055") does not work, though ParseInt("055", 8) does.
// need to make sure negative numbers are negative
n = Number(n) & 0xFFFFFFFF;
return (radix == 8 ? parseInt(n, 8) : n);
}, 1);

Clazz.newMethod$(Integer,"decode", function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n) || n < Integer.MIN_VALUE|| n > Integer.MAX_VALUE)
  throw Clazz.$new(NumberFormatException.construct$S,["Invalid Integer"]);
  returnClazz.$new(Integer.construct, [n]);
}, 1);

Clazz.newMethod$(Integer,"hashCode",
function(){
return this.valueOf();
});

// Note that Long is problematic in JavaScript 

Clazz._setDeclared("java.lang.Long", java.lang.Long=Long=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});

decorateAsNumber(Long, "Long", "long", "L");
Long.toString=Long.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Long){
return"class java.lang.Long";
}
return""+this.valueOf();
};

Clazz.newMethod$(Long, "construct", function(v){
  v == null && (v = 0);
  v = (typeof v == "number" ? Math.round(v) : Integer.parseIntRadix(v, 10));
  this.valueOf=function(){return v;};
}, 1);

//Long.MIN_VALUE=Long.prototype.MIN_VALUE=-0x8000000000000000;
//Long.MAX_VALUE=Long.prototype.MAX_VALUE=0x7fffffffffffffff;
//Long.TYPE=Long.prototype.TYPE=Long;

Clazz.newMethod$(Long,"parseLong",
function(s,radix){
 return Integer.parseInt(s, radix || 10);
});

Long.parseLong=Long.prototype.parseLong;

Clazz.newMethod$(Long,"$valueOf",
function(s){
return Clazz.$new(Long.construct, [s]);
});

Long.$valueOf=Long.prototype.$valueOf;
Clazz.newMethod$(Long,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Long)){
return false;
}
return s.valueOf()==this.valueOf();
});
Long.$valueOf=Long.prototype.$valueOf;
Clazz.newMethod$(Long,"equals$O",
function(s){
if(s==null||!Clazz.instanceOf(s,Long)){
return false;
}
return s.valueOf()==this.valueOf();
});
Long.toHexString=Long.prototype.toHexString=function(i){
return i.toString(16);
};
Long.toOctalString=Long.prototype.toOctalString=function(i){
return i.toString(8);
};
Long.toBinaryString=Long.prototype.toBinaryString=function(i){
return i.toString(2);
};

Clazz.newMethod$(Long,"decode",
function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n))
    throw Clazz.$new(NumberFormatException.construct$S, ["Invalid Long"]);
  return Clazz.$new(Long.construct, [n]);
}, 1);

Clazz._setDeclared("java.lang.Short", java.lang.Short = Short = function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});
decorateAsNumber(Short, "Short", "short", "H");

Clazz.newMethod$(Short, "construct",
function (v) {
 v == null && (v = 0);
 if (typeof v != "number")
  v = Integer.parseIntRadix(v, 10);
 v = v.shortValue();
 this.valueOf = function () {return v;};
}, 1);
Short.prototype.construct = Short.construct;



Short.toString = Short.prototype.toString = function () {
  if (arguments.length != 0) {
    return "" + arguments[0];
  } else if (this === Short) {
    return "class java.lang.Short"; // Short.class.toString
  }
  return "" + this.valueOf ();
};

Short.MIN_VALUE = Short.prototype.MIN_VALUE = -32768;
Short.MAX_VALUE = Short.prototype.MAX_VALUE = 32767;
//Short.TYPE = Short.prototype.TYPE = Short;

Clazz.newMethod$(Short, "parseShortRadix",
function (s, radix) {
return Integer.parseIntRadix(s, radix).shortValue();
});
Short.parseShortRadix = Short.prototype.parseShortRadix;

Clazz.newMethod$(Short, "parseShort",
function (s) {
return Short.parseShortRadix (s, 10);
});

Short.parseShort = Short.prototype.parseShort;

Clazz.newMethod$(Short, "$valueOf",
function (s) {
  return Clazz.$new(Short.construct, [s]);
});

Short.$valueOf = Short.prototype.$valueOf;
Clazz.newMethod$(Short, "equals",
function (s) {
if(s == null || !Clazz.instanceOf(s, Short) ){
  return false;
}
return s.valueOf()  == this.valueOf();
});
Short.$valueOf = Short.prototype.$valueOf;
Clazz.newMethod$(Short, "equals$O",
function (s) {
if(s == null || !Clazz.instanceOf(s, Short) ){
  return false;
}
return s.valueOf()  == this.valueOf();
});
Short.toHexString = Short.prototype.toHexString = function (i) {
  return i.toString (16);
};
Short.toOctalString = Short.prototype.toOctalString = function (i) {
  return i.toString (8);
};
Short.toBinaryString = Short.prototype.toBinaryString = function (i) {
  return i.toString (2);
};
Short.decode = Clazz.newMethod$(Short, "decode",
function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n) || n < -32768|| n > 32767)
    throw Clazz.$new(NumberFormatException.construct$S, ["Invalid Short"]);
  return Clazz.$new(Short.construct, [n]);
});

Clazz._setDeclared("java.lang.Byte", java.lang.Byte=Byte=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});
decorateAsNumber(Byte,"Byte", "byte", "B");

Clazz.newMethod$(Byte, "construct", function(v){
 if (typeof v != "number")
   v = Integer.parseIntRadix(v, 10);
 v = v.byteValue();
this.valueOf=function(){
return v;
};
}, 1);

Byte.toString=Byte.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Byte){
return"class java.lang.Byte";
}
return""+this.valueOf();
};

Byte.serialVersionUID=Byte.prototype.serialVersionUID=-7183698231559129828;
Byte.MIN_VALUE=Byte.prototype.MIN_VALUE=-128;
Byte.MAX_VALUE=Byte.prototype.MAX_VALUE=127;
Byte.SIZE=Byte.prototype.SIZE=8;
//Byte.TYPE=Byte.prototype.TYPE=Byte;

Clazz.newMethod$(Byte,"parseByteRadix",
function(s,radix){
 return Integer.parseIntRadix(s, radix).byteValue();
});
Byte.parseByteRadix=Byte.prototype.parseByteRadix;

Clazz.newMethod$(Byte,"parseByte",
function(s){
return Byte.parseByte(s,10);
});

Byte.parseByte=Byte.prototype.parseByte;

Clazz.newMethod$(Byte, "$valueOf",
function (s) {
  return Clazz.$new(Byte.construct, [s]);
});

Byte.$valueOf=Byte.prototype.$valueOf;
Clazz.newMethod$(Byte,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Byte)){
return false;
}
return s.valueOf()==this.valueOf();
});
Byte.$valueOf=Byte.prototype.$valueOf;
Clazz.newMethod$(Byte,"equals$O",
function(s){
if(s==null||!Clazz.instanceOf(s,Byte)){
return false;
}
return s.valueOf()==this.valueOf();
});
Byte.toHexString=Byte.prototype.toHexString=function(i){
return i.toString(16);
};
Byte.toOctalString=Byte.prototype.toOctalString=function(i){
return i.toString(8);
};
Byte.toBinaryString=Byte.prototype.toBinaryString=function(i){
return i.toString(2);
};
Clazz.newMethod$(Byte,"decode",
function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n) || n < -128|| n > 127)
    throw Clazz.$new(NumberFormatException.construct$S, ["Invalid Byte"]);
  return Clazz.$new(Byte.construct, [n]);
}, 1);

Clazz._floatToString = function(f) {
 var s = ""+f
 if (s.indexOf(".") < 0 && s.indexOf("e") < 0)
    s += ".0";
 return s;
}

Clazz._setDeclared("java.lang.Float", java.lang.Float=Float=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});
decorateAsNumber(Float,"Float", "float", "F");

Clazz.newMethod$(Float, "construct", function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
  v = Number(v);
 this.valueOf=function(){return v;}
}, 1);

Float.toString=Float.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Float){
return"class java.lang.Float";
}
return Clazz._floatToString(this.valueOf());
};

Clazz._a32 = null;

Float.floatToIntBits = function(f) {
var a = Clazz._a32 || (Clazz._a32 = new Float32Array(1));
a[0] = f;
return new Int32Array(a.buffer)[0]; 
}

Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=3.4028235e+38;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=1.4e-45;
Float.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;
//Float.TYPE=Float.prototype.TYPE=Float;

Clazz.newMethod$(Float,"parseFloat",
function(s){
if(s==null){
throw Clazz.$new(NumberFormatException.construct$S, ["null"]);
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var floatVal=Number(s);
if(isNaN(floatVal)){
throw Clazz.$new(NumberFormatException.construct$S, ["Not a Number : "+s]);
}
return floatVal;
});
Float.parseFloat=Float.prototype.parseFloat;

Clazz.newMethod$(Float,"$valueOf",
function(s){
return Clazz.$new(Float.construct, [s]);
});

Float.$valueOf=Float.prototype.$valueOf;

Clazz.newMethod$(Float,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
});
Float.isNaN=Float.prototype.isNaN;
Clazz.newMethod$(Float,"isInfinite",
function(num){
return !Number.isFinite(arguments.length == 1 ? num : this.valueOf());
});
Float.isInfinite=Float.prototype.isInfinite;

Clazz.newMethod$(Float,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
});
Clazz.newMethod$(Float,"equals$O",
function(s){
if(s==null||!Clazz.instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
});

Clazz._setDeclared("java.lang.Double", java.lang.Double=Double=function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});
decorateAsNumber(Double,"Double", "double", "D");
Double.toString=Double.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Double){
return"class java.lang.Double";
}
return Clazz._floatToString(this.valueOf());
};

Clazz.newMethod$(Double, "construct", function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
  v = Double.parseDouble(v);
 this.valueOf=function(){return v;};
}, 1);

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=4.9e-324;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.7976931348623157e+308;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;
//Double.TYPE=Double.prototype.TYPE=Double;

Clazz.newMethod$(Double,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
});
Double.isNaN=Double.prototype.isNaN;
Clazz.newMethod$(Double,"isInfinite",
function(num){
return!Number.isFinite(arguments.length == 1 ? num : this.valueOf());
});
Double.isInfinite=Double.prototype.isInfinite;

Clazz.newMethod$(Double,"parseDouble",
function(s){
if(s==null){
  throw Clazz.$new(NumberFormatException.construct$S, ["null"]);
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var doubleVal=Number(s);
if(isNaN(doubleVal)){
throw Clazz.$new(NumberFormatException.construct$S, ["Not a Number : "+s]);
}
return doubleVal;
});
Double.parseDouble=Double.prototype.parseDouble;

Clazz.newMethod$(Double,"$valueOf",
function(v){
return Clazz.$new(Double.construct, [v]);
});

Double.$valueOf=Double.prototype.$valueOf;

Clazz.newMethod$(Double,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
});
Clazz.newMethod$(Double,"equals$O",
function(s){
if(s==null||!Clazz.instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
});

Clazz._setDeclared("java.lang.Boolean", 
Boolean = java.lang.Boolean = Boolean || function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
});

if (supportsNativeObject) {
  for (var i = 0; i < Clazz._extendedObjectMethods.length; i++) {
    var p = Clazz._extendedObjectMethods[i];
    Boolean.prototype[p] = Clazz._O.prototype[p];
  }
}
Boolean.__CLASS_NAME__="Boolean";
Clazz._implementOf(Boolean,[java.io.Serializable,java.lang.Comparable]);
setJ2STypeclass(Boolean, "boolean", "Z");
Boolean.equals=Clazz._inF.equals;
Boolean.getName=Clazz._inF.getName;
Boolean.serialVersionUID=Boolean.prototype.serialVersionUID=-3665804199014368530;

Clazz.newMethod$(Boolean, "construct",
function(s){
  var b = ((typeof s == "string" ? Boolean.toBoolean(s) : s) ? true : false);
  this.valueOf=function(){return b;};
}, 1);

Clazz.newMethod$(Boolean,"parseBoolean",
function(s){
return Boolean.toBoolean(s);
}, 1);
Clazz.newMethod$(Boolean,"booleanValue",
function(){
return this.valueOf();
});
Clazz.newMethod$(Boolean,"$valueOf",
function(b){
return((typeof b == "string"? "true".equalsIgnoreCase(b) : b)?Boolean.TRUE:Boolean.FALSE);
}, 1);

Clazz.newMethod$(Boolean,"toString",
function(){
return this.valueOf()?"true":"false";
});
Clazz.newMethod$(Boolean,"hashCode",
function(){
return this.valueOf()?1231:1237;
});
Clazz.newMethod$(Boolean,"equals",
function(obj){
if(Clazz.instanceOf(obj,Boolean)){
return this.booleanValue()==obj.booleanValue();
}return false;
});
Clazz.newMethod$(Boolean,"equals$O",
function(obj){
if(Clazz.instanceOf(obj,Boolean)){
return this.booleanValue()==obj.booleanValue();
}return false;
});
Clazz.newMethod$(Boolean,"getBoolean",
function(name){
var result=false;
try{
result=Boolean.toBoolean(System.getProperty(name));
}catch(e){
if(Clazz.instanceOf(e,IllegalArgumentException)){
}else if(Clazz.instanceOf(e,NullPointerException)){
}else{
throw e;
}
}
return result;
}, 1);
Clazz.newMethod$(Boolean,"compareTo",
function(b){
return(b.value==this.value?0:(this.value?1:-1));
});
Clazz.newMethod$(Boolean,"toBoolean",
function(name){
return(typeof name == "string" ? name.equalsIgnoreCase("true") : !!name);
}, 1);

// the need is to have new Boolean(string), but that won't work with native Boolean
// so instead we have to do a lexical switch from "new Boolean" to "Boolean.from"
Clazz.newMethod$(Boolean,"from",
function(name){
return Clazz.$new(Boolean.construct, [typeof name == "string" ? name.equalsIgnoreCase("true") : !!name]);
}, 1);

Boolean.TRUE=Boolean.prototype.TRUE=Clazz.$new(Boolean.construct, [true]);
Boolean.FALSE=Boolean.prototype.FALSE=Clazz.$new(Boolean.construct, [false]);
//Boolean.TYPE=Boolean.prototype.TYPE=Boolean;


Clazz._Encoding={
  UTF8:"utf-8",
  UTF16:"utf-16",
  ASCII:"ascii"
};







(function(Encoding) {

Encoding.UTF8="utf-8";
Encoding.UTF16="utf-16";
Encoding.ASCII="ascii";


Encoding.guessEncoding=function(str){
if(str.charCodeAt(0)==0xEF&&str.charCodeAt(1)==0xBB&&str.charCodeAt(2)==0xBF){
return Encoding.UTF8;
}else if(str.charCodeAt(0)==0xFF&&str.charCodeAt(1)==0xFE){
return Encoding.UTF16;
}else{
return Encoding.ASCII;
}
};

Encoding.readUTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
startIdx=3;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}
var arrs=new Array();
for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[arrs.length]=str.charAt(i);
}else if(charCode>0xc0&&charCode<0xe0){
var c1=charCode&0x1f;
i++;
var c2=str.charCodeAt(i)&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>=0xe0){
var c1=charCode&0x0f;
i++;
var c2=str.charCodeAt(i)&0x3f;
i++;
var c3=str.charCodeAt(i)&0x3f;
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
Encoding.base64Chars=new Array(
'A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P',
'Q','R','S','T','U','V','W','X',
'Y','Z','a','b','c','d','e','f',
'g','h','i','j','k','l','m','n',
'o','p','q','r','s','t','u','v',
'w','x','y','z','0','1','2','3',
'4','5','6','7','8','9','+','/'
);
Encoding.encodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2;
while(index<length){
c0=str.charCodeAt(index++);
buf[buf.length]=b64[c0>>2];
if(index<length){
c1=str.charCodeAt(index++);
buf[buf.length]=b64[((c0<<4)&0x30)|(c1>>4)];
if(index<length){
c2=str.charCodeAt(index++);
buf[buf.length]=b64[((c1<<2)&0x3c)|(c2>>6)];
buf[buf.length]=b64[c2&0x3F];
}else{
buf[buf.length]=b64[((c1<<2)&0x3c)];
buf[buf.length]='=';
}
}else{
buf[buf.length]=b64[(c0<<4)&0x30];
buf[buf.length]='=';
buf[buf.length]='=';
}
}
return buf.join('');
};
Encoding.decodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var xb64=Encoding.xBase64Chars;
if(Encoding.xBase64Chars==null){
xb64=new Object();
for(var i=0;i<b64.length;i++){
xb64[b64[i]]=i;
}
Encoding.xBase64Chars=xb64;
}
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2,c3;
var c=0;
while(index<length&&c++<60000){
c0=xb64[str.charAt(index++)];
c1=xb64[str.charAt(index++)];
c2=xb64[str.charAt(index++)];
c3=xb64[str.charAt(index++)];
buf[buf.length]=String.fromCharCode(((c0<<2)&0xff)|c1>>4);
if(c2!=null){
buf[buf.length]=String.fromCharCode(((c1<<4)&0xff)|c2>>2);
if(c3!=null){
buf[buf.length]=String.fromCharCode(((c2<<6)&0xff)|c3);
}
}
}
return buf.join('');
};

if(String.prototype.$replace==null){

Clazz._setDeclared("java.lang.String", java.lang.String=String);

if(supportsNativeObject){
for(var i = 0; i < Clazz._extendedObjectMethods.length; i++) {
var p = Clazz._extendedObjectMethods[i];
if("to$tring"==p||"toString"==p||"equals"==p||"equals$O"==p||"hashCode"==p){
continue;
}
String.prototype[p]=Clazz._O.prototype[p];
}
}

// Actually, String does not implement CharSequence because it does not
// implement getSubsequence() or length(). Any use of CharSequence that
// utilizes either of these methods must explicitly check for typeof x.length
// or existance of x.subSequence.  
// classes affected include:
//   java.io.CharArrayWriter,StringWriter,Writer
//   java.lang.AbstractStringBuilder
//   java.util.regex.Matcher,Pattern
 
Clazz._implementOf(String,[java.io.Serializable,CharSequence,Comparable]);

String.__PARAMCODE = "S";
String.getName=Clazz._inF.getName;

String.serialVersionUID=String.prototype.serialVersionUID=-6849794470754667710;

// TODO: missing some methods here
var formatterClass;

if (!String.format)
 String.format = function() {
  if (!formatterClass)
    formatterClass = Class.forName("java.util.Formatter");
  var f = formatterClass.newInstance();
  return f.format.apply(f,arguments).toString();
 }

;(function(sp) {

sp.$replace$C$C=function(c1,c2){
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
sp.$generateExpFunction$S=function(str){
var arr=[];
var orders=[];
var idx=0;
arr[0]="";
var i=0;
for(;i<str.length;i++){
var ch=str.charAt(i);
if(i!=str.length-1&&ch=='\\'){ // ' ) {
i++;
var c=str.charAt(i);
if(c=='\\'){ // ' ){
arr[idx]+='\\';
}
arr[idx]+=c;
}else if(i!=str.length-1&&ch=='$'){
i++;
orders[idx]=parseInt(str.charAt(i));
idx++;
arr[idx]="";
}else if(ch=='\r'){
arr[idx]+="\\r";
}else if(ch=='\n'){
arr[idx]+="\\n";
}else if(ch=='\t'){
arr[idx]+="\\t";
}else if(ch=='\"'){
arr[idx]+="\\\"";
}else{
arr[idx]+=ch;
}
}
var funStr="f = function (";
var max=Math.max.apply({},orders);
for(i=0;i<=max;i++){
funStr+="$"+i;
if(i!=max){
funStr+=", ";
}
}
funStr+=") { return ";
for(i=0;i<arr.length-1;i++){
funStr+="\""+arr[i]+"\" + $"+orders[i]+" + ";
}
funStr+="\""+arr[i]+"\"; }";
var f=null;
eval(funStr)
return f;
};

sp.replaceAll$S$S=function(exp,str){
var regExp=new RegExp(exp,"gm");
return this.replace(regExp,this.$generateExpFunction(str));
};
sp.replaceFirst$S$S=function(exp,str){
var regExp=new RegExp(exp,"m");
return this.replace(regExp,this.$generateExpFunction(str));
};
sp.matches$S=function(exp){
if(exp!=null){
exp="^("+exp+")$";
}
var regExp=new RegExp(exp,"gm");
var m=this.match(regExp);
return m!=null&&m.length!=0;
};
sp.regionMatches$b$I$S$I$I=function(ignoreCase,toffset,
other,ooffset,len){

if(typeof ignoreCase=="number"
||(ignoreCase!=true&&ignoreCase!=false)){
len=ooffset;
ooffset=other;
other=toffset;
toffset=ignoreCase;
ignoreCase=false;
}
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



sp.$plit=function(regex,limit){
if (!limit && regex == " ")
  return this.split(regex);

if(limit!=null&&limit>0){
if(limit==1){
return this;
}
var regExp=new RegExp("("+regex+")","gm");
var count=1;
var s=this.replace(regExp,function($0,$1){
count++;
if(count==limit){
return"@@_@@";
}else if(count>limit){
return $0;
}else{
return $0;
}
});
regExp=new RegExp(regex,"gm");
var arr=this.split(regExp);
if(arr.length>limit){
arr[limit-1]=s.substring(s.indexOf("@@_@@")+5);
arr.length=limit;
}
return arr;
}else{
var regExp=new RegExp(regex,"gm");
return this.split(regExp);
}
};

if (!sp.trim)
sp.trim=function(){
return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
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

sp.startsWith$S=function(prefix){
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


sp.equals=function(anObject){
return this.valueOf()==anObject;
};

sp.equals$O=function(anObject){
return this.valueOf()==anObject;
};

sp.equalsIgnoreCase$S=function(anotherString){
return(anotherString==null)?false:(this==anotherString
||this.toLowerCase()==anotherString.toLowerCase());
};


sp.hash=0;

sp.hashCode=function(){
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

sp.getBytes=function(){
if(arguments.length==4){
return this.getChars(arguments[0],arguments[1],arguments[2],arguments[3]);
}
var s=this;
if(arguments.length==1){
var cs=arguments[0].toString().toLowerCase();
var charset=[
"utf-8","UTF8","us-ascii","iso-8859-1","8859_1","gb2312","gb18030","gbk"
];
var existed=false;
for(var i=0;i<charset.length;i++){
if(charset[i]==cs){
existed=true;
break;
}
}
if(!existed){
throw new java.io.UnsupportedEncodingException();
}
if(cs=="utf-8"||cs=="utf8"){
s=Encoding.convert2UTF8(this);
}
}
var arrs=new Array(s.length);
var c=0,ii=0;
for(var i=0;i<s.length;i++){
c=s.charCodeAt(i);
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
return arrs;
};

sp.contains$S = function(a) {return this.indexOf(a) >= 0}  // bh added
sp.compareTo$S = function(a){return this > a ? 1 : this < a ? -1 : 0} // bh added



sp.toCharArray=function(){
var result=new Array(this.length);
for(var i=0;i<this.length;i++){
result[i]=this.charAt(i);
}
return result;
};
String.value0f=String.valueOf;
// TODO: many of these
String.valueOf=function(o){
if(o=="undefined"){
return String.value0f();
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

sp.compareToIgnoreCase$S=function(str){
if(str==null){
throw new NullPointerException();
}
var s1=this.toUpperCase();
var s2=str.toUpperCase();
if(s1==s2){
return 0;
}else{
var s1=this.toLowerCase();
var s2=str.toLowerCase();
if(s1==s2){
return 0;
}else if(s1>s2){
return 1;
}else{
return-1;
}
}
};

sp.contentEquals$S=function(sb){
if(this.length!=sb.length()){
return false;
}
var v=sb.getValue();
var i=0;
var j=0;
var n=this.length;
while(n--!=0){
if(this.charCodeAt(i++)!=v[j++]){
return false;
}
}
return true;
};

sp.getChars=function(srcBegin,srcEnd,dst,dstBegin){
if(srcBegin<0){
throw new StringIndexOutOfBoundsException(srcBegin);
}
if(srcEnd>this.length){
throw new StringIndexOutOfBoundsException(srcEnd);
}
if(srcBegin>srcEnd){
throw new StringIndexOutOfBoundsException(srcEnd-srcBegin);
}
if(dst==null){
throw new NullPointerException();
}
for(var i=0;i<srcEnd-srcBegin;i++){
dst[dstBegin+i]=this.charAt(srcBegin+i);
}
};
sp.$concat=sp.concat;
sp.concat=function(s){
if(s==null){
throw new NullPointerException();
}
return this.$concat(s);
};

sp.$lastIndexOf=sp.lastIndexOf;
sp.lastIndexOf=function(s,last){
if(last!=null&&last+this.length<=0){
return-1;
}
if(last!=null){
return this.$lastIndexOf(s,last);
}else{
return this.$lastIndexOf(s);
}
};

sp.intern=function(){
return this.valueOf();
};

String.copyValueOf=sp.copyValueOf=function(){
  if(arguments.length==1){
  return String.instantialize(arguments[0]);
  }else{
  return String.instantialize(arguments[0],arguments[1],arguments[2]);
  }
};

sp.codePointAt || (sp.codePointAt = sp.charCodeAt); // Firefox only


})(String.prototype);

String.instantialize=function(){
switch (arguments.length) {
case 0:
  return new String();
case 1:
  var x=arguments[0];
  if (x.BYTES_PER_ELEMENT || x instanceof Array){
    return (x.length == 0 ? "" : typeof x[0]=="number" ? Encoding.readUTF8(String.fromCharCode.apply(null, x)) : x.join(''));
  }
  if(typeof x=="string"||x instanceof String){
    return new String(x);
  }
  if(x.__CLASS_NAME__=="StringBuffer"||x.__CLASS_NAME__=="java.lang.StringBuffer"){
    var value=x.shareValue();
    var length=x.length();
    var valueCopy=new Array(length);
    for(var i=0;i<length;i++){
      valueCopy[i]=value[i];
    }
    return valueCopy.join('')
  }
  return""+x;
case 2:  
  var x=arguments[0];
  var hibyte=arguments[1];
  if(typeof hibyte=="string"){
    return String.instantialize(x,0,x.length,hibyte);
  }
  return String.instantialize(x,hibyte,0,x.length);
case 3:
  var bytes=arguments[0];
  var offset=arguments[1];
  var length=arguments[2];
  if(arguments[2]instanceof Array){
    bytes=arguments[2];
    offset=arguments[0];
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
  var bytes=arguments[0];
  var y=arguments[3];
  if(typeof y=="string"||y instanceof String){
    var offset=arguments[1];
    var length=arguments[2];
    var arr=new Array(length);
    for(var i=0;i<length;i++){
      arr[i]=bytes[offset+i];
      if(typeof arr[i]=="number"){
        arr[i]=String.fromCharCode(arr[i]&0xff);
      }
    }
    var cs=y.toLowerCase();
    if(cs=="utf-8"||cs=="utf8"){
      return Encoding.readUTF8(arr.join(''));
    }
    return arr.join('');
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
  var s="";
  for(var i=0;i<arguments.length;i++){
    s+=arguments[i];
  }
  return s;
}
};

if(navigator.userAgent.toLowerCase().indexOf("chrome")!=-1){
  String.prototype.toString=function(){return this.valueOf();};
}

}

})(Clazz._Encoding);


c$=Clazz.decorateAsClass(function(){
if (typeof arguments[0] != "object")this.construct(arguments[0]);
},java.lang,"Character",null,[java.io.Serializable,Comparable]);
Clazz._setDeclared("java.lang.Character", java.lang.Character); 
setJ2STypeclass(Character, "char", "C");

Clazz.newMethod$(c$,"construct",
function(value){
this.value=value;
}, 1);

Clazz.newMethod$(c$,"charValue",
function(){
return this.value;
});
Clazz.newMethod$(c$,"hashCode",
function(){
return(this.value).charCodeAt(0);
});
Clazz.newMethod$(c$,"equals",
function(obj){
if(Clazz.instanceOf(obj,Character)){
return(this.value).charCodeAt(0)==((obj).charValue()).charCodeAt(0);
}return false;
});
Clazz.newMethod$(c$,"equals$O",
function(obj){
if(Clazz.instanceOf(obj,Character)){
return(this.value).charCodeAt(0)==((obj).charValue()).charCodeAt(0);
}return false;
});
Clazz.newMethod$(c$,"charCodeAt",
function(i){
return(this.value).charCodeAt(i);
});
Clazz.newMethod$(c$,"compareTo",
function(c){
return(this.value).charCodeAt(0)-(c.value).charCodeAt(0);
});
Clazz.newMethod$(c$,"toLowerCase",
function(c){
return(""+c).toLowerCase().charAt(0);
});
Clazz.newMethod$(c$,"toUpperCase",
function(c){
return(""+c).toUpperCase().charAt(0);
});
Clazz.newMethod$(c$,"isDigit",
function(c){
c = c.charCodeAt(0);
return (48 <= c && c <= 57);
}, 1);
Clazz.newMethod$(c$,"isUpperCase",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90);
}, 1);
Clazz.newMethod$(c$,"isLowerCase",
function(c){
c = c.charCodeAt(0);
return (97 <= c && c <= 122);
}, 1);
Clazz.newMethod$(c$,"isWhitespace",
function(c){
c = (c).charCodeAt(0);
return (c >= 0x1c && c <= 0x20 || c >= 0x9 && c <= 0xd || c == 0x1680
  || c >= 0x2000 && c != 0x2007 && (c <= 0x200b || c == 0x2028 || c == 0x2029 || c == 0x3000));
}, 1);
Clazz.newMethod$(c$,"isLetter",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122);
}, 1);
Clazz.newMethod$(c$,"isLetterOrDigit",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122 || 48 <= c && c <= 57);
}, 1);
Clazz.newMethod$(c$,"isSpaceChar",
function(c){
 var i = c.charCodeAt(0);
if(i==0x20||i==0xa0||i==0x1680)return true;
if(i<0x2000)return false;
return i<=0x200b||i==0x2028||i==0x2029||i==0x202f||i==0x3000;
}, 1);
Clazz.newMethod$(c$,"digit",
function(c,radix){
var i = c.charCodeAt(0);
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
Clazz.newMethod$(c$,"toString",
function(c){
if (arguments.length == 0) {
  if(this===Character){
    return"class java.lang.Character";
  }
  var buf=[this.value];
  return String.valueOf(buf);
}
return String.valueOf(c);
}, 1);
Clazz.newMethod$(c$,"charCount", function(codePoint){
  return codePoint >= 0x010000 ? 2 : 1;
}, 1);

Clazz.defineStatics(c$,
"MIN_VALUE",'\u0000',
"MAX_VALUE",'\uffff',
"MIN_RADIX",2,
"MAX_RADIX",36);
//java.lang.Character.TYPE=java.lang.Character.prototype.TYPE=java.lang.Character;

/*
// deprecated
Clazz._ArrayWrapper = function(a, type) {
 return {
   a: a,
   __CLASS_NAME__:"Array",
   superClazz: Array,
   getComponentType: function() {return type},
   instanceOf: function(o) { return  Clazz.instanceOf(type, o) },
   getName: function() { return this.__CLASS_NAME__ }
 };
}
*/

c$=declareType(java.lang.reflect,"Array");
Clazz._setDeclared("java.lang.reflect.Array", java.lang.reflect.Array) 


// TODO: fix Array.newInstance
Clazz.newMethod$(c$,"newInstance$Class$I",
function(componentType,length){
  return Clazz.newArray$(componentType, 1, [length]);
//  var a = Clazz.newArray(ldnbgh);
//  a.getClass = function() { return new Clazz._ArrayWrapper(this, componentType);};
//  a.__paramType = componentType.__paramType;
//  return a;
}, 1);

c$.newArray$Class$I = c$.newInstance$Class$I;

Clazz.newMethod$(c$,"newInstance$Class$IA",
function(componentType,dims){
  return Clazz.newArray$(componentType, dims.length, dims);
}, 1);

c$.newMultiArray$Class$IA = c$.newInstance$Class$IA;


// TODO: Only asking for problems declaring Date. This is not necessary

Clazz._setDeclared("java.util.Date", javautil.Date=Date);
//Date.TYPE="javautil.Date";
Date.__CLASS_NAME__="Date";
Clazz._implementOf(Date,[java.io.Serializable,java.lang.Comparable]);

Clazz.newMethod$(javautil.Date,"clone",
function(){
return new Date(this.getTime());
});

Clazz.newMethod$(javautil.Date,"before",
function(when){
return this.getTime()<when.getTime();
});
Clazz.newMethod$(javautil.Date,"after",
function(when){
return this.getTime()>when.getTime();
});
Clazz.newMethod$(javautil.Date,"equals$O",
function(obj){
return Clazz.instanceOf(obj,javautil.Date)&&this.getTime()==(obj).getTime();
});
Clazz.newMethod$(javautil.Date,"compareTo",
function(anotherDate){
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
});
Clazz.newMethod$(javautil.Date,"compareTo",
function(o){
return this.compareTo(o);
});
Clazz.newMethod$(javautil.Date,"hashCode",
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});


var declareType = function(prefix, name, clazzSuper, interfacez, superClazzInstance) {
  return Clazz.decorateAsClass(function(){}, prefix, name, clazzSuper, interfacez, superClazzInstance);
};

// TODO: This is not right. Why here????

c$=declareType(javautil,"EventObject",null,java.io.Serializable);
Clazz._setDeclared("java.util.EventObject", java.util.EventObject); 

Clazz.newMethod$(c$, "construct", function(source){
this.source=null;
if(arguments.length > 0  && source!=null)this.source=source;
else throw new IllegalArgumentException();
}, 1);

Clazz.newMethod$(c$,"getSource",
function(){
return this.source;
});
Clazz.newMethod$(c$,"toString",
function(){
return this.getClass().getName()+"[source="+String.valueOf(this.source)+']';
});
Clazz.declareInterface(javautil,"EventListener");

c$=Clazz.decorateAsClass(function(){
this.listener=null;
Clazz.instantialize(this,arguments);
},javautil,"EventListenerProxy",null,javautil.EventListener);
Clazz.newMethod$(c$, "construct", function(listener){
this.listener=listener;
},1);

Clazz.newMethod$(c$,"getListener",
function(){
return this.listener;
});
Clazz.declareInterface(javautil,"Iterator");

Clazz.declareInterface(javautil,"ListIterator",javautil.Iterator);
Clazz.declareInterface(javautil,"Enumeration");
Clazz.declareInterface(javautil,"Collection",Iterable);

Clazz.declareInterface(javautil,"Set",javautil.Collection);
Clazz.declareInterface(javautil,"Map");
Clazz.declareInterface(javautil.Map,"Entry");

Clazz.declareInterface(javautil,"List",javautil.Collection);

Clazz.declareInterface(javautil,"Queue",javautil.Collection);
Clazz.declareInterface(javautil,"RandomAccess");

var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "Throwable", null, java.io.Serializable);

Clazz.newMethod$(C$, 'construct', function () {
this.fillInStackTrace ();
this.detailMessage = null;
this.cause = this;
this.stackTrace = null;
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (message) {
this.fillInStackTrace ();
this.cause = this;
this.stackTrace = null;
this.detailMessage = message;
}, 1);

Clazz.newMethod$(C$, 'construct$S$Throwable', function (message, cause) {
this.fillInStackTrace ();
this.stackTrace = null;
this.detailMessage = message;
this.cause = cause;
}, 1);

Clazz.newMethod$(C$, 'construct$Throwable', function (cause) {
this.fillInStackTrace ();
this.stackTrace = null;
this.detailMessage = (cause == null ? null : cause.toString ());
this.cause = cause;
}, 1);

Clazz.newMethod$(C$, 'getMessage', function () {
{
if (typeof this.message != "undefined") {
return this.message;
}
}return this.detailMessage;
});

Clazz.newMethod$(C$, 'getLocalizedMessage', function () {
return this.getMessage ();
});

Clazz.newMethod$(C$, 'getCause', function () {
return (this.cause === this ? null : this.cause);
});

Clazz.newMethod$(C$, 'initCause$Throwable', function (cause) {
if (this.cause !== this) throw Clazz.$new(IllegalStateException.construct$S,["Can't overwrite cause"]);
if (cause === this) throw Clazz.$new(IllegalArgumentException.construct$S,["Self-causation not permitted"]);
this.cause = cause;
return this;
});

Clazz.newMethod$(C$, 'toString', function () {
var s = this.getClass ().getName ();
var message = this.getLocalizedMessage ();
return (message != null) ? (s + ": " + message) : s;
});

Clazz.newMethod$(C$, 'printStackTrace', function () {
System.err.println$O (this);
for (var i = 0; i < this.stackTrace.length; i++) {
var t = this.stackTrace[i];
var x = t.methodName.indexOf ("(");
var n = t.methodName.substring (0, x).replace (/\s+/g, "");
if (n != "construct" || t.nativeClazz == null
|| Clazz.getInheritedLevel (t.nativeClazz, Throwable) < 0) {
System.err.println (t);
}
}
});

Clazz.newMethod$(C$, 'printStackTrace$java_io_PrintStream', function (s) {
this.printStackTrace ();
});

Clazz.newMethod$(C$, 'printStackTrace$java_io_PrintWriter', function (s) {
this.printStackTrace ();
});

Clazz.newMethod$(C$, 'fillInStackTrace', function () {
debugger
this.stackTrace = new Array();
var caller = arguments.callee.caller;
var superCaller = null;
var callerList = new Array();
var index = Clazz._callingStackTraces.length - 1;
var noLooping = true;
while (index > -1 || caller != null) {
var clazzName = null;
var nativeClazz = null;
if (!noLooping || caller == Clazz.tryToSearchAndExecute || caller == Clazz.superCall || caller == null) {
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
var st =Clazz.$new(StackTraceElement.construct, [
((nativeClazz != null && nativeClazz.__CLASS_NAME__.length != 0) ?
nativeClazz.__CLASS_NAME__ : "anonymous"),
((superCaller.exName == null) ? "anonymous" : superCaller.exName),
null, -1]);
st.nativeClazz = nativeClazz;
this.stackTrace[this.stackTrace.length] = st;
for (var i = 0; i < callerList.length; i++) {
if (callerList[i] == superCaller) {
// ... stack information lost as recursive invocation existed ...
var st =Clazz.$new(StackTraceElement.construct, ["lost", "missing", null, -3]);
st.nativeClazz = null;
this.stackTrace[this.stackTrace.length] = st;
noLooping = false;
//break;
}
}
if (superCaller != null) {
callerList[callerList.length] = superCaller;
}
//caller = superCaller.arguments.callee.caller;
// Udo
caller = (superCaller && superCaller.arguments && superCaller.arguments.callee) ? superCaller.arguments.callee.caller : null;
}
Clazz.initializingException = false;
return this;
});

Clazz.newMethod$(C$, 'setStackTrace$StackTraceElementA', function (stackTrace) {
var defensiveCopy = stackTrace.clone ();
for (var i = 0; i < defensiveCopy.length; i++) if (defensiveCopy[i] == null) throw Clazz.$new(NullPointerException.construct$S,["stackTrace[" + i + "]"]);

this.stackTrace = defensiveCopy;
});

/*
c$=Clazz.decorateAsClass(function(){
},java.lang,"Throwable",null,java.io.Serializable);

Clazz.newMethod$(c$,"construct",
function(a, b){
  this.detailMessage=null;
  this.stackTrace=null;
  this.cause=this;
  this.fillInStackTrace();
  switch (arguments.length) {
  case 2:
    this.detailMessage=a;
    a = b;
    // fall through
  case 1:
   if (typeof a == "string") {
    this.detailMessage=a;
   } else {
    this.cause=a;
    this.detailMessage=(a==null?null:a.toString());
   }
  }
}, 1);

Clazz.newMethod$(c$,"getMessage",
function(){
return (this.message || this.detailMessage || this.toString());
});
Clazz.newMethod$(c$,"getLocalizedMessage",
function(){
return this.getMessage();
});
Clazz.newMethod$(c$,"getCause",
function(){
return(this.cause===this?null:this.cause);
});
Clazz.newMethod$(c$,"initCause",
function(cause){
if(this.cause!==this)throw new IllegalStateException("Can't overwrite cause");
if(cause===this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
});
Clazz.newMethod$(c$,"toString",
function(){
var s=this.getClass().getName();
var message=this.message || this.detailMessage;
return(message ? s+": "+message : s);
});
Clazz.newMethod$(c$,"printStackTrace",
function(){
System.err.println(this.getStackTrace && this.stackTrace ? this.getStackTrace() : this.message + " " + Clazz.getStackTrace());
});

Clazz.newMethod$(c$,"getStackTrace",
function(){
var s = "" + this + "\n";
if (!this.stackTrace){
debugger;
return s
}
for(var i=0;i<this.stackTrace.length;i++){
 var t=this.stackTrace[i];
  var x=t.methodName.indexOf("(");
  var n=t.methodName.substring(0,x).replace(/\s+/g,"");
  if(n!="construct"||t.nativeClazz==null
     //|| Clazz._getInheritedLevel(t.nativeClazz,Throwable)<0
     ){
        s += t + "\n";
  }
}
return s;
});


Clazz.newMethod$(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintStream");
Clazz.newMethod$(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintWriter");
Clazz.newMethod$(c$,"fillInStackTrace",
function(){
this.stackTrace=new Array();
var caller=arguments.callee.caller;
var superCaller=null;
var callerList=new Array();
var index=Clazz._callingStackTraces.length-1;
var noLooping=true;
while(index>-1||caller!=null){
var clazzName=null;
var nativeClass=null;
if(!noLooping||caller==Clazz.tryToSearchAndExecute||caller==Clazz.superCall||caller==null){
if(index<0){
break;
}
noLooping=true;
superCaller=Clazz._callingStackTraces[index].caller;
nativeClass=Clazz._callingStackTraces[index].owner;
index--;
}else{
superCaller=caller;
if(superCaller.overrider!=null){
nativeClass=superCaller.overrider;
}else if(superCaller.exClazz!=null){
nativeClass=superCaller.exClazz;
}
}
var st=new StackTraceElement(
((nativeClass!=null&&nativeClass.__CLASS_NAME__.length!=0)?
nativeClass.__CLASS_NAME__:"anonymous"),
((superCaller.exName==null)?"anonymous":superCaller.exName)
+" ("+getParamTypes(superCaller.arguments).typeString+")",
null,-1);
st.nativeClazz=nativeClass;
this.stackTrace[this.stackTrace.length]=st;
for(var i=0;i<callerList.length;i++){
if(callerList[i]==superCaller){
var st=new StackTraceElement("lost","missing",null,-3);
st.nativeClazz=null;
this.stackTrace[this.stackTrace.length]=st;
noLooping=false;

}
}
if(superCaller!=null){
callerList[callerList.length]=superCaller;
}
caller=superCaller.arguments.callee.caller;
}
Clazz._initializingException=false;
return this;
});
Clazz.newMethod$(c$,"setStackTrace",
function(stackTrace){
var defensiveCopy=stackTrace.clone();
for(var i=0;i<defensiveCopy.length;i++)if(defensiveCopy[i]==null)throw new NullPointerException("stackTrace["+i+"]");

this.stackTrace=defensiveCopy;
},"~A");


*/




c$=Clazz.decorateAsClass(function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
},java.lang,"StackTraceElement",null,java.io.Serializable);

Clazz.newMethod$(c$, "construct",function(cls,method,file,line){
if(cls==null||method==null){
throw new NullPointerException();
}this.declaringClass=cls;
this.methodName=method;
this.fileName=file;
this.lineNumber=line;
},1);

Clazz.newMethod$(c$,"equals$O",
function(obj){
if(!(Clazz.instanceOf(obj,StackTraceElement))){
return false;
}var castObj=obj;
if((this.methodName==null)||(castObj.methodName==null)){
return false;
}if(!this.getMethodName().equals(castObj.getMethodName())){
return false;
}if(!this.getClassName().equals(castObj.getClassName())){
return false;
}var localFileName=this.getFileName();
if(localFileName==null){
if(castObj.getFileName()!=null){
return false;
}}else{
if(!localFileName.equals(castObj.getFileName())){
return false;
}}if(this.getLineNumber()!=castObj.getLineNumber()){
return false;
}return true;
});
Clazz.newMethod$(c$,"getClassName",
function(){
return(this.declaringClass==null)?"<unknown class>":this.declaringClass;
});
Clazz.newMethod$(c$,"getFileName",
function(){
return this.fileName;
});
Clazz.newMethod$(c$,"getLineNumber",
function(){
return this.lineNumber;
});
Clazz.newMethod$(c$,"getMethodName",
function(){
return(this.methodName==null)?"<unknown method>":this.methodName;
});
Clazz.newMethod$(c$,"hashCode",
function(){
if(this.methodName==null){
return 0;
}return this.methodName.hashCode()^this.declaringClass.hashCode();
});
Clazz.newMethod$(c$,"isNativeMethod",
function(){
return this.lineNumber==-2;
});
Clazz.newMethod$(c$,"toString",
function(){
var buf=new StringBuilder(80);
buf.append(this.getClassName());
buf.append('.');
buf.append(this.getMethodName());
if(this.isNativeMethod()){
buf.append("(Native Method)");
}else{
var fName=this.getFileName();
if(fName==null){
buf.append("(Unknown Source)");
}else{
var lineNum=this.getLineNumber();
buf.append('(');
buf.append(fName);
if(lineNum>=0){
buf.append(':');
buf.append(lineNum);
}buf.append(')');
}}return buf.toString();
});


TypeError.prototype.getMessage || (TypeError.prototype.getMessage = function(){ return (this.message || this.toString()) + (this.getStackTrace ? this.getStackTrace() : Clazz.getStackTrace())});


Clazz.Error = Error;

declareTypeError = function (prefix, name, clazzParent, interfacez, 
    parentClazzInstance, _declareType) {
  var f = function () {
    Clazz.instantialize (this, arguments);
    return Clazz.Error();
  };
  return Clazz.decorateAsClass (f, prefix, name, clazzParent, interfacez, 
      parentClazzInstance);
};

// at least allow Error() by itself to work as before
Clazz._Error || (Clazz._Error = Error);
Clazz.decorateAsClass (function (){
return Clazz._Error();
}, java.lang, "Error", Throwable);

//c$=declareTypeError(java.lang,"Error",Throwable);

c$=declareType(java.lang,"LinkageError",Error);

c$=declareType(java.lang,"IncompatibleClassChangeError",LinkageError);

c$=declareType(java.lang,"AbstractMethodError",IncompatibleClassChangeError);

c$=declareType(java.lang,"ClassCircularityError",LinkageError);

c$=declareType(java.lang,"ClassFormatError",LinkageError);

c$=declareType(java.lang,"IllegalAccessError",IncompatibleClassChangeError);

c$=declareType(java.lang,"InstantiationError",IncompatibleClassChangeError);

c$=declareType(java.lang,"VirtualMachineError",Error);

c$=declareType(java.lang,"InternalError",VirtualMachineError);

c$=declareType(java.lang,"NoClassDefFoundError",LinkageError);

c$=declareType(java.lang,"NoSuchFieldError",IncompatibleClassChangeError);

c$=declareType(java.lang,"NoSuchMethodError",IncompatibleClassChangeError);

c$=declareType(java.lang,"OutOfMemoryError",VirtualMachineError);

c$=declareType(java.lang,"StackOverflowError",VirtualMachineError);

c$=declareType(java.lang,"UnknownError",VirtualMachineError);

c$=declareType(java.lang,"UnsatisfiedLinkError",LinkageError);

c$=declareType(java.lang,"UnsupportedClassVersionError",ClassFormatError);

c$=declareType(java.lang,"VerifyError",LinkageError);

c$=declareType(java.lang,"ThreadDeath",Error);

c$=declareType(java.lang,"Exception",Throwable);

c$=declareType(java.lang,"RuntimeException",Exception);

c$=declareType(java.lang,"ArithmeticException",RuntimeException);

c$=declareType(java.lang,"IndexOutOfBoundsException",RuntimeException);

c$=declareType(java.lang,"ArrayIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz.newMethod$(c$, "construct$I", function() {
c$.superClazz.construct$S.apply(this, ["Array index out of range: "+index]);
}, 1);

c$=declareType(java.lang,"ArrayStoreException",RuntimeException);

c$=declareType(java.lang,"ClassCastException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.ex=null;
},java.lang,"ClassNotFoundException",Exception);
Clazz.newMethod$(c$, "construct$S$Throwable", function(detailMessage,exception){
c$.superClazz.construct$S$Throwable.apply(this, arguments);
this.ex=exception;
}, 1);
Clazz.newMethod$(c$,"getException",
function(){
return this.ex;
});
Clazz.newMethod$(c$,"getCause",
function(){
return this.ex;
});

c$=declareType(java.lang,"CloneNotSupportedException",Exception);

c$=declareType(java.lang,"IllegalAccessException",Exception);

c$=declareType(java.lang,"IllegalArgumentException",RuntimeException);

c$=declareType(java.lang,"IllegalMonitorStateException",RuntimeException);

c$=declareType(java.lang,"IllegalStateException",RuntimeException);

c$=declareType(java.lang,"IllegalThreadStateException",IllegalArgumentException);

c$=declareType(java.lang,"InstantiationException",Exception);

c$=declareType(java.lang,"InterruptedException",Exception);

c$=declareType(java.lang,"NegativeArraySizeException",RuntimeException);

c$=declareType(java.lang,"NoSuchFieldException",Exception);

c$=declareType(java.lang,"NoSuchMethodException",Exception);

c$=declareType(java.lang,"NullPointerException",RuntimeException);

c$=declareType(java.lang,"NumberFormatException",IllegalArgumentException);

c$=declareType(java.lang,"SecurityException",RuntimeException);

c$=declareType(java.lang,"StringIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz.newMethod$(c$, "construct$I", function(index){
c$.superClazz.construct$S.apply(this,["String index out of range: "+index]);
}, 1);

c$=declareType(java.lang,"UnsupportedOperationException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.target=null;
},java.lang.reflect,"InvocationTargetException",Exception);
Clazz.newMethod$(c$, "construct$Throwable", function(exception){
c$.superClazz.construct$Throwable.apply(this, arguments);
this.target=exception;
}, 1);
Clazz.newMethod$(c$, "construct$Throwable$S", function(exception,detailMessage){
c$.superClazz.construct$S$Throwable.apply(this,[detailMessage,exception]);
this.target=exception;
}, 1);
Clazz.newMethod$(c$,"getTargetException",
function(){
return this.target;
});
Clazz.newMethod$(c$,"getCause",
function(){
return this.target;
});

c$=Clazz.decorateAsClass(function(){
this.undeclaredThrowable=null;
},java.lang.reflect,"UndeclaredThrowableException",RuntimeException);

Clazz.newMethod$(c$, "construct$Throwable", function(exception){
c$.superClazz.construct$Throwable.apply(this, arguments);
this.undeclaredThrowable=exception;
this.initCause(exception);
},1);

Clazz.newMethod$(c$, "construct$Throwable$S", function(exception,detailMessage){
c$.superClazz.construct$S.apply(this,[detailMessage]);
this.undeclaredThrowable=exception;
this.initCause(exception);
},1);

Clazz.newMethod$(c$,"getUndeclaredThrowable",
function(){
return this.undeclaredThrowable;
});
Clazz.newMethod$(c$,"getCause",
function(){
return this.undeclaredThrowable;
});

c$=declareType(java.io,"IOException",Exception);
c$=declareType(java.io,"CharConversionException",java.io.IOException);
c$=declareType(java.io,"EOFException",java.io.IOException);
c$=declareType(java.io,"ObjectStreamException",java.io.IOException);

c$=declareType(java.io,"FileNotFoundException",java.io.IOException);
c$=Clazz.decorateAsClass(function(){
this.bytesTransferred=0;
},java.io,"InterruptedIOException",java.io.IOException);

c$=Clazz.decorateAsClass(function(){
this.classname=null;
Clazz.instantialize(this,arguments);
},java.io,"InvalidClassException",java.io.ObjectStreamException);

Clazz.newMethod$(c$, "construct$S$S", function(className,detailMessage){
c$.superClazz.construct$S.apply(this,[detailMessage]);
this.classname=className;
},1);

Clazz.newMethod$(c$,"getMessage",
function(){
var msg=Clazz.superCall(this,java.io.InvalidClassException,"getMessage",[]);
if(this.classname!=null){
msg=this.classname+';' + ' '+msg;
}return msg;
});

c$=declareType(java.io,"InvalidObjectException",java.io.ObjectStreamException);
c$=declareType(java.io,"NotActiveException",java.io.ObjectStreamException);
c$=declareType(java.io,"NotSerializableException",java.io.ObjectStreamException);

c$=Clazz.decorateAsClass(function(){
this.eof=false;
this.length=0;
},java.io,"OptionalDataException",java.io.ObjectStreamException);

c$=declareType(java.io,"StreamCorruptedException",java.io.ObjectStreamException);
c$=declareType(java.io,"SyncFailedException",java.io.IOException);
c$=declareType(java.io,"UnsupportedEncodingException",java.io.IOException);

c$=declareType(java.io,"UTFDataFormatException",java.io.IOException);

c$=Clazz.decorateAsClass(function(){
this.detail=null;
},java.io,"WriteAbortedException",java.io.ObjectStreamException);

Clazz.newMethod$(c$, "construct$S$Throwable", function(detailMessage, rootCause){
c$.superClazz.construct$S.apply(this,[detailMessage]);
this.detail=rootCause;
this.initCause(rootCause);
}, 1);

Clazz.newMethod$(c$,"getMessage",
function(){
var msg=c$.superClazz.getMessage.apply(this);
return (this.detail ? msg + "; "+this.detail.toString() : msg);
});
Clazz.newMethod$(c$,"getCause",
function(){
return this.detail;
});

c$=declareType(javautil,"ConcurrentModificationException",RuntimeException);

Clazz.newMethod$(c$, "construct", function(detailMessage, rootCause){
Clazz.super$(c$, this);
}, 1);

c$=declareType(javautil,"EmptyStackException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.className=null;
this.key=null;
},javautil,"MissingResourceException",RuntimeException);

Clazz.newMethod$(c$, "construct$S$S$S", function(detailMessage,className,resourceName){
c$.superClazz.construct$S.apply(this,[detailMessage]);
this.className=className;
this.key=resourceName;
}, 1);
Clazz.newMethod$(c$,"getClassName",
function(){
return this.className;
});
Clazz.newMethod$(c$,"getKey",
function(){
return this.key;
});

c$=declareType(javautil,"NoSuchElementException",RuntimeException);
c$=declareType(javautil,"TooManyListenersException",Exception);

c$=declareType(java.lang,"Void");
//Clazz.defineStatics(c$,
//"TYPE",null);
//{
//java.lang.Void.TYPE=java.lang.Void;
//}
Clazz.declareInterface(java.lang.reflect,"GenericDeclaration");
Clazz.declareInterface(java.lang.reflect,"AnnotatedElement");

c$=declareType(java.lang.reflect,"AccessibleObject",null,java.lang.reflect.AnnotatedElement);
Clazz.newMethod$(c$, "construct",function(){
}, 1);
Clazz.newMethod$(c$,"isAccessible",
function(){
return false;
});
Clazz.newMethod$(c$,"setAccessible",
function(objects,flag){
return;
},1);
Clazz.newMethod$(c$,"setAccessible",
function(flag){
return;
});
Clazz.newMethod$(c$,"isAnnotationPresent",
function(annotationType){
return false;
});
Clazz.newMethod$(c$,"getDeclaredAnnotations",
function(){
return new Array(0);
});
Clazz.newMethod$(c$,"getAnnotations",
function(){
return new Array(0);
});
Clazz.newMethod$(c$,"getAnnotation",
function(annotationType){
return null;
});
Clazz.newMethod$(c$,"marshallArguments",
function(parameterTypes,args){
return null;
}, 1);
Clazz.newMethod$(c$,"invokeV",
function(receiver,args){
return;
});
Clazz.newMethod$(c$,"invokeL",
function(receiver,args){
return null;
});
Clazz.newMethod$(c$,"invokeI",
function(receiver,args){
return 0;
});
Clazz.newMethod$(c$,"invokeJ",
function(receiver,args){
return 0;
});
Clazz.newMethod$(c$,"invokeF",
function(receiver,args){
return 0.0;
});
Clazz.newMethod$(c$,"invokeD",
function(receiver,args){
return 0.0;
});
c$.emptyArgs=c$.prototype.emptyArgs=new Array(0);
Clazz.declareInterface(java.lang.reflect,"InvocationHandler");
c$=Clazz.declareInterface(java.lang.reflect,"Member");
Clazz.defineStatics(c$,
"PUBLIC",0,
"DECLARED",1);

c$=declareType(java.lang.reflect,"Modifier");

Clazz.newMethod$(c$, "construct", function(){}, 1);

Clazz.newMethod$(c$,"isAbstract",
function(modifiers){
return((modifiers&1024)!=0);
}, 1);
Clazz.newMethod$(c$,"isFinal",
function(modifiers){
return((modifiers&16)!=0);
}, 1);
Clazz.newMethod$(c$,"isInterface",
function(modifiers){
return((modifiers&512)!=0);
}, 1);
Clazz.newMethod$(c$,"isNative",
function(modifiers){
return((modifiers&256)!=0);
}, 1);
Clazz.newMethod$(c$,"isPrivate",
function(modifiers){
return((modifiers&2)!=0);
}, 1);
Clazz.newMethod$(c$,"isProtected",
function(modifiers){
return((modifiers&4)!=0);
}, 1);
Clazz.newMethod$(c$,"isPublic",
function(modifiers){
return((modifiers&1)!=0);
}, 1);
Clazz.newMethod$(c$,"isStatic",
function(modifiers){
return((modifiers&8)!=0);
}, 1);
Clazz.newMethod$(c$,"isStrict",
function(modifiers){
return((modifiers&2048)!=0);
}, 1);
Clazz.newMethod$(c$,"isSynchronized",
function(modifiers){
return((modifiers&32)!=0);
}, 1);
Clazz.newMethod$(c$,"isTransient",
function(modifiers){
return((modifiers&128)!=0);
}, 1);
Clazz.newMethod$(c$,"isVolatile",
function(modifiers){
return((modifiers&64)!=0);
}, 1);
Clazz.newMethod$(c$,"toString",
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
Clazz.defineStatics(c$,
"PUBLIC",0x1,
"PRIVATE",0x2,
"PROTECTED",0x4,
"STATIC",0x8,
"FINAL",0x10,
"SYNCHRONIZED",0x20,
"VOLATILE",0x40,
"TRANSIENT",0x80,
"NATIVE",0x100,
"INTERFACE",0x200,
"ABSTRACT",0x400,
"STRICT",0x800,
"BRIDGE",0x40,
"VARARGS",0x80,
"SYNTHETIC",0x1000,
"ANNOTATION",0x2000,
"ENUM",0x4000);


var newMethodNotFoundException = function (clazz, method) {
  var message = "Method " + Clazz.getClassName (clazz, true) + (method ? "." 
          + method : "") + " was not found";
  System.out.println(message);
  console.log(message);
  throw Clazz.$new(java.lang.NoSuchMethodException.construct$S, [message]);        
};

c$=Clazz.decorateAsClass(function(){
this.clazz=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"Constructor",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);

Clazz.newMethod$(c$, "construct$Class$ClassA$ClassA$I", function(declaringClass,parameterTypes,checkedExceptions,modifiers){
Clazz.super$(c$, this);
this.clazz=declaringClass;
this.parameterTypes=parameterTypes;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
}, 1);
Clazz.newMethod$(c$,"getTypeParameters",
function(){
return null;
});
Clazz.newMethod$(c$,"toGenericString",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz.newMethod$(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz.newMethod$(c$,"isVarArgs",
function(){
return false;
});
Clazz.newMethod$(c$,"isSynthetic",
function(){
return false;
});
Clazz.newMethod$(c$,"equals$O",
function(object){
if(object!=null&&Clazz.instanceOf(object,java.lang.reflect.Constructor)){
var other=object;
if(this.getDeclaringClass()===other.getDeclaringClass()){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
});
Clazz.newMethod$(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz.newMethod$(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz.newMethod$(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz.newMethod$(c$,"getName",
function(){
return this.getDeclaringClass().getName();
});
Clazz.newMethod$(c$,"getParameterTypes",
function(){
return this.parameterTypes;
});
Clazz.newMethod$(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode();
});
Clazz.newMethod$(c$,"newInstance$OA", function(args){







var a = (args ? new Array(args.length) : null);
if (args) {
  for (var i = args.length; --i >= 0;) {
    a[i] = (this.parameterTypes[i] == Number ? args[i].valueOf() : args[i]);
  }
}
var instance=new this.clazz(null, Clazz.inheritArgs);
if (instance == null)
  newMethodNotFoundException(this.clazz, "construct", getParamTypes(a).typeString);  
Clazz.instantialize(instance,a);
return instance;
});
Clazz.newMethod$(c$,"toString",
function(){
return null;
});

c$=declareType(java.lang.reflect,"Field",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
Clazz.newMethod$(c$,"isSynthetic",
function(){
return false;
});
Clazz.newMethod$(c$,"toGenericString",
function(){
return null;
});
Clazz.newMethod$(c$,"isEnumConstant",
function(){
return false;
});
Clazz.newMethod$(c$,"getGenericType",
function(){
return null;
});
Clazz.newMethod$(c$,"equals$O",
function(object){
return false;
});
Clazz.newMethod$(c$,"getDeclaringClass",
function(){
return null;
});
Clazz.newMethod$(c$,"getName",
function(){
return null;
});
Clazz.newMethod$(c$,"getType",
function(){
return null;
});
Clazz.newMethod$(c$,"hashCode",
function(){
return 0;
});
Clazz.newMethod$(c$,"toString",
function(){
return null;
});

c$=Clazz.decorateAsClass(function(){
this.clazz=null;
this.name=null;
this.returnType=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
},java.lang.reflect,"Method",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
Clazz.newMethod$(c$, "construct$Class$S$ClassA$Class$ClassA$I", function(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers){
Clazz.super$(c$, this);
this.clazz=declaringClass;
this.name=name;
this.parameterTypes=parameterTypes;
this.returnType=returnType;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
}, 1);
Clazz.newMethod$(c$,"getTypeParameters",
function(){
return null;
});
Clazz.newMethod$(c$,"toGenericString",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz.newMethod$(c$,"getGenericReturnType",
function(){
return null;
});
Clazz.newMethod$(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz.newMethod$(c$,"isVarArgs",
function(){
return false;
});
Clazz.newMethod$(c$,"isBridge",
function(){
return false;
});
Clazz.newMethod$(c$,"isSynthetic",
function(){
return false;
});
Clazz.newMethod$(c$,"getDefaultValue",
function(){
return null;
});
Clazz.newMethod$(c$,"equals$O",
function(object){
if(object!=null&&Clazz.instanceOf(object,java.lang.reflect.Method)){
var other=object;
if((this.getDeclaringClass()===other.getDeclaringClass())&&(this.getName()===other.getName())){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
});
Clazz.newMethod$(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz.newMethod$(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz.newMethod$(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz.newMethod$(c$,"getName",
function(){
return this.name;
});
Clazz.newMethod$(c$,"getParameterTypes",
function(){
return this.parameterTypes; 
});
Clazz.newMethod$(c$,"getReturnType",
function(){
return this.returnType;
});
Clazz.newMethod$(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode()^this.getName().hashCode();
});
Clazz.newMethod$(c$,"invoke$O$OA",
function(receiver,args){
var name0 = this.getName();
var name = name0;
var types = this.parameterTypes;
var a = (args ? new Array(args.length) : null);
for (var i = 0; i < types.length; i++) {
  var t = types[i];
  var paramCode = getParamCode(t);
  a[i] = (t.__PRIMITIVE && args[i].valueOf ? args[i].valueOf() : args[i]);
  name += "$" + paramCode;
}

var m=this.clazz.prototype[name] || this.clazz[name];
if (m == null)
  newMethodNotFoundException(this.clazz, name);  
return m.apply(receiver,a);
});
Clazz.newMethod$(c$,"toString",
function(){
return null;
});

})(Clazz);

}; // called by external application 


