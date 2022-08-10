/*
 * Copyright (c) 2003, 2013, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package sun.reflect.annotation;

import java.lang.annotation.Annotation;
import java.lang.annotation.AnnotationFormatError;
import java.lang.reflect.Array;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * Parser for Java programming language annotations. Translates annotation byte
 * streams emitted by compiler into annotation objects.
 *
 * @author Josh Bloch
 * @since 1.5
 */
public class AnnotationParser {
	public static class JSAnnotationObject {

		// [ [var/methname, typeStr, [anName1, anName2,...]], [@code1, @code2]
		// ]

		public final static int ANNOT_DATA = 0;
		public final static int ANNOT_CODES = 1;

		public final static int DATA_NAME         = 00;
		public final static int DATA_RET_TYPE_STR = 01;
//		public final static int DATA_RET_TYPE     = 02;
		public final static int DATA_SIGNATURE    = 02;
		public final static int DATA_QNAMES       = 03;
		public final static int DATA_FIXED        = 04;

		// C$.$getAnn$ = function(){ return [
		// [[null,'test.Test_Annotation_Impl',['test.Test_Annotation']],['cl="test.Test_.class"
		// btest="true" itype="2" type="impl" iitype={"1" "2" "3" } ']],
		// [['test1','String',['test.Test_Parameter']],['']],
		// [['test2','String[]',['test.Test_Parameter']],['']],
		// [['test3','int','test.Test_Item',['test.Test_Parameter']],['','']],
		// [['M:name','String',['test.Test_Parameter']],['']]]};

		/**
		 * First record will have null field/method name if there are class-level
		 * annotations.
		 * 
		 * @param me
		 * @param isMethod 
		 * @return true if the very first element is present and null
		 */
		@SuppressWarnings("unused")
		private static Object[][] getAnnotations(String name, Object me, boolean isMethod) {
			Object[][][] __ANN__ = /** @j2sNative me.$getAnn$ && me.$getAnn$() || */
					null;
			if (__ANN__ == null)
				return null;
			int item = (isMethod ? DATA_SIGNATURE : DATA_NAME);
			// The data are just 4 long, but we add a fifth to indicate we have
			// copied all the "." items to the previous items in the list
			if (__ANN__[0][ANNOT_DATA][DATA_FIXED] == null)
				fixAnn(__ANN__);
			for (int i = 0, n = __ANN__.length; i < n; i++) {
				Object[][] rec = __ANN__[i];
				if (rec[ANNOT_DATA][item] == name)
					return rec;
			}
			return null;
		}

		private static Object[][][] fixAnn(Object[][][] __ANN__) {
			Object[] lastData = null;
			if (__ANN__ != null) {
				for (int i = 0; i < __ANN__.length; i++) {
					Object[][] o = __ANN__[i];
					Object[] data = o[ANNOT_DATA];
					if (lastData != null && data[DATA_RET_TYPE_STR] == ".") {
						data[DATA_RET_TYPE_STR] = lastData[DATA_RET_TYPE_STR];
//						data[DATA_RET_TYPE] = lastData[DATA_RET_TYPE];
					}
					lastData = data;
				}
			}
			__ANN__[0][ANNOT_DATA][DATA_FIXED] = ".";
			return __ANN__;
		}

		public static String[] getQNames(Object[][] __ANN_REC__) {
			return (String[]) __ANN_REC__[ANNOT_DATA][DATA_QNAMES];
		}

		public static String[] getAtCodes(Object[][] __ANN_REC__) {
			return (String[]) __ANN_REC__[ANNOT_CODES];
		}

		/**
		 * 
		 * Create a new annotation associated with some field, method, or class. 
		 * 
		 * Overlay all the default interface methods with methods that return the 
		 * at-interface(key=value key=value) set. 
		 * 
		 * For at_interfaces - defaults - from Class.
		 * 
		 * @param cl
		 * @return
		 */
		public static Method[] createMethods(Class<? extends Annotation> cl) {
			@SuppressWarnings("unused")
			Object me = /** @j2sNative cl.$clazz$ || */
					null;
			String[][] members = /** @j2sNative me.$getMembers$ && me.$getMembers$() || */
					null;
			@SuppressWarnings("null")
			List<Method> list = new ArrayList<>(members.length);
			for (int i = members.length; --i >= 0;) {
				String[] member = members[i];
				String name = member[0];
				Class<?> retType = typeForString(member[1], false);
				Object val = member[2];

				Method method = new Method(cl, name, Class.UNKNOWN_PARAMETERS, retType, Class.NO_PARAMETERS,
						Modifier.PUBLIC);
				if (retType.isAnnotation()) {
					val = createAnnotation(retType.getName(), (String) val);
				}
				method.setDefaultValue(val);
				/**
				 * @j2sNative
				 * 
				 *   method.isAnnotation = true;
				 *   
				 * 			;(function(val, me){
				 * 					var f = me[name] = me[name + "$"] = function(){ return val };
				 *                  f.exName = name + "$";
				 *                  f.exClazz = me;
				 *                  method.$meth$ = f;
				 *  			})(val, me);
				 */
				list.add(method);
			}
			return list.toArray(new Method[list.size()]);
		}

		/**
		 * Super simple parser; allows single-level arrays only (as in annotations)
		 * 
		 * @param atData
		 * @return
		 */
		private static Map<String, Object> getJSValues(String atData) {
			Map<String, Object> map = new HashMap<>();
			if (atData.length() == 0)
				return map;
			int kpt = 0;
			int apt = -1;
			int qpt = -1;
			List<String> arrayData = new ArrayList<>();
			String key = null;
			// SwingJS will put everything in quotes
			for (int i = kpt, n = atData.length() - 1; i < n; i++) {
				char c = atData.charAt(i);
				if (qpt >= 0 && c != '"')
					continue;
				switch (c) {
				default:
					continue;
				case '"':
					if (qpt >= 0) {
						String quote = atData.substring(qpt, i);
						if (apt >= 0) {
							arrayData.add(quote);
						} else {
							map.put(key, quote);
						}
						qpt = -1;
					} else {
						qpt = i + 1;
					}
					kpt = i + 1;
					break;
				case '{':
					apt = i + 1;
					break;
				case '}':
					map.put(key, arrayData);
					apt = -1;
					kpt = i + 1;
					break;
				case '\\':
					i++;
					break;
				case '=':
					if (qpt >= 0)
						continue;
					key = atData.substring(kpt, i).trim();
					break;
				}
			}
			return map;
		}

		public static Annotation parseAnnotation(Class<? extends Annotation> annotationClass, String value) {
			// TODO Auto-generated method stub
			return null;
		}


		/**
		 * Determine the correct format from the String or String[] and then simply
		 * inject the key method into JavaScript. No proxy needed.
		 * 
		 * @param a
		 * @param key
		 * @param o    String or String[]
		 * @param type
		 * @return
		 * @throws ClassNotFoundException
		 * @throws SecurityException
		 * @throws NoSuchMethodException
		 * @throws InvocationTargetException
		 * @throws IllegalArgumentException
		 * @throws IllegalAccessException
		 * @throws InstantiationException
		 */
		private static Object setLocalAnnotationValue(Annotation a, String key, Object o, Class<?> type)
				throws ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException,
				InvocationTargetException, NoSuchMethodException, SecurityException {
			Object val = o;
			if (type == String.class) {
				// good to go
			} else if (type.isArray()) {
				if (type != String[].class) {
					// Only in JavaScript!
					List<?> ao = (List<?>) o;
					Class<?> avType = type.getComponentType();
					// create the array -- might be primitive, actually.
					Object[] av = (Object[]) Array.newInstance(avType, ao.size());
					for (int i = av.length; --i >= 0;)
						av[i] = setLocalAnnotationValue(null, null, (String) ao.get(i), avType);
					val = av;
				}
			} else if (type.isAnnotation()) {
				
				val = Class.forName(((String)val).substring(1));
			} else if (type.isEnum()) {
				val = Enum.valueOf((Class<Enum>) type, (String) val);
			} else if (type.isPrimitive()) {
				val = boxValue(val, type);
				/** @j2sNative val = val.valueOf(); */
			} else if (type == Class.class) {
				val = Class.forName(((String) val).replace(".class", ""));
			} else {
				// something else? Probably not allowed
				// What does that mean: only primitive type, String, Class, *annotation* ,
				// enumeration are permitted or 1-dimensional arrays thereof
				// doesn't seem to mean Annotation.
				val = type.getConstructor(String.class).newInstance(new Object[] { val });
			}

			/**
			 * @j2sNative
			 * 
			 * 			(function(val){
			 *  var f;
			 * 
			 *  a && (a[key] = a[key+"$"] = f = function() {return val});
			 * 
			 *  f && (f.exName = key + "$") && (f.exClazz = a);
			 * 
			 * })(val);
			 */

			return val;
		}

		/**
		 * SwingJS method to parse the _at_code and create a new version of the
		 * annotation. Note that it is unncessary to use Proxy, because we can directly
		 * insert the method in JavaScript
		 * 
		 * @param qname
		 * @param atData
		 * @param declaringClass
		 * @return
		 */
		public static Annotation createAnnotation(String qname, String atData) {
			try {

				Class<? extends Annotation> annotationClass = null;
				try {
					annotationClass = (Class<? extends Annotation>) Class.forName(qname);
				} catch (NoClassDefFoundError e) {
					throw new TypeNotPresentException(qname, e);
				}
				AnnotationType type = null;
				type = AnnotationType.getInstance(annotationClass);
				Map<String, Object> values = getJSValues(atData);
				Map<String, Class<?>> memberTypes = type.memberTypes();
				Map<String, Object> memberValues = new LinkedHashMap<String, Object>(type.memberDefaults());
				// In SwingJS, we can instantiate the Annotation directly -- no need for proxy
				Annotation a = annotationClass.newInstance();
				for (Entry<String, Object> entry : memberValues.entrySet()) {
					String key = entry.getKey();
					if (values.containsKey(key)) {
						memberValues.put(key, setLocalAnnotationValue(a, key, values.get(key), memberTypes.get(key)));
					}
					Object val = memberValues.get(key);
					/**
					 * @j2sNative
					 * 
					 * a[key] = a[key + "$"] = (function(val){ return function(){return val}})(val);
					 */
				}
				aliasJS(a, "annotationType$", "annotationType");
				aliasJS(a, "equals$", "equals");
				aliasJS(a, "toString$", "toString");
				aliasJS(a, "hexCode$", "hexCode");
				
				/**
				 * @j2sNative
				 * 
				 * 
				 */
				return a;//annotationForMap(annotationClass, memberValues);
			} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | IllegalArgumentException
					| InvocationTargetException | NoSuchMethodException | SecurityException e) {
				throw new TypeNotPresentException(qname + "(" + atData + ")", e);
			}

		}

		private static void aliasJS(Object a, String newName, String oldName) {
			/**
			 * @j2sNative a[newName] = a[oldName];
			 */
			
		}

		private static Object boxValue(Object val, Class<?> type) {
			@SuppressWarnings("unused")
			String name = type.getName();
			/**
			 * @j2sNative switch(name) { case "int": val = new Integer(val); break; case
			 *            "short": val = new Short(val); break; case "long": val = new
			 *            Long(val); break; case "float": val = new Float(val); break; case
			 *            "double": val = new Double(val); break; case "byte": val = new
			 *            Byte(val); break; case "boolean": val = val && val != "false" ?
			 *            Boolean.TRUE : Boolean.FALSE; break; }
			 */
			return val;
		}

		static Map<Class<? extends Annotation>, Annotation> parseAnnotations(String name, Class<?> c,
				boolean isMethod) {
			Object[][] __ANN_REC__ = getAnnotations(name, c.$clazz$, isMethod);
			if (__ANN_REC__ == null)
				return Collections.EMPTY_MAP;
			// Raw data is in the form of C$.__ANN__, which has one record per annotated
			// type, field, or method
			Map<Class<? extends Annotation>, Annotation> result = new LinkedHashMap<Class<? extends Annotation>, Annotation>();
			// note that qnames will be one longer than atData after fixing
			String[] qnames = getQNames(__ANN_REC__);
			if (qnames != null) { // @Xml... may have no qname data
				String[] atData = getAtCodes(__ANN_REC__);
				for (int i = atData.length; --i >= 0;) {
					Annotation a = createAnnotation(qnames[i], atData[i]);
					if (a != null) {
						Class<? extends Annotation> klass = a.getClass();
//BH not implementing @retention						if (
						// AnnotationType.getInstance(klass).retention() == RetentionPolicy.RUNTIME &&
						result.put(klass, a);
//						!= null) {
//							throw new AnnotationFormatError("Duplicate annotation for class: " + klass + ": " + a);
//						}
					}
				}
			}
			return result;
		}

		public static Class<?> typeForString(String name, boolean allowNull) {
			String s = name;
			int dim = 0;
			while (s.endsWith("[]")) {
				dim++;
				s = s.substring(0, s.length() - 2);
			}
			Class<?> c = null;
			if (s.indexOf(".") < 0) {
				c = Class.getPrimitiveOrStringClass(s);
			}
			try {
				if (c == null)
					c = Class.forName(s);
				if (dim > 0) {
					while (--dim >= 0) {
						c = Array.newInstance(c, 0).getClass();
					}
				}
				return c;
			} catch (ClassNotFoundException e) {
				if (allowNull)
					return null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				try {
					throw e;
				} catch (ClassNotFoundException e1) {
				}
			}
			return null;
		}

		@SuppressWarnings("unused")
		public static Class[] getDeclaredClasses(Object clazz) {
			String myName = /** @j2sNative clazz.__CLASS_NAME__ || */null;
			// C$.$classes$=[['Singleton',8],['Test_Class_Inner',8],['B',0],['C',8]]
			Object[][] data = /** @j2sNative clazz.$classes$ || */ null;
			Class[] classes = new Class[0];
			if (data != null) {
				for (int i = 0; i < data.length; i++) {
					String name = (String) data[i][0];
					int modifiers = /** @j2sNative data[i][1] || */0;
					Class<?> cl = typeForString(myName + "." + name, false);
					cl._setModifiers(modifiers);
					/** @j2sNative classes.push(cl); */
				}
			}
			return classes;
		}

		@SuppressWarnings("null")
		public static Class<?>[] guessMethodParameterTypes(String signature) {
			if (signature.startsWith("c$$"))
				signature = signature.substring(2);
			String[] args = /** @j2sNative signature.split("$") || */
					null;
			Class<?>[] classes = new Class<?>[args.length == 2 && args[1] == "" ? 0 : args.length - 1];
			for (int i = 0; i < classes.length; i++) {
				String param = args[i + 1];
				String arrays = "";
				int len = param.length();
				while (len > 1 && param.endsWith("A")) {
					arrays += "[]";
					param = param.substring(0, --len);
				}
				param += arrays;
				// in case we have __ initially due to non-packaged classes being put in package
				// _.
				param = param.substring(0, 1) + param.substring(1).replace('_', '.');
				classes[i] = typeForString(param, true);
				if (classes[i] == null) {
					classes[i] = Object.class;
					System.err.println("JSAnnotationObject - method parameter typing failed for " + signature);
				}
			}
			return classes;
		}
	}

	/**
	 * Parses the annotations described by the specified byte array. resolving
	 * constant references in the specified constant pool. The array must contain an
	 * array of annotations as described in the RuntimeVisibleAnnotations_attribute:
	 *
	 * u2 num_annotations; annotation annotations[num_annotations];
	 * @param isMethod TODO
	 * @param __ANN__
	 * 
	 * @throws AnnotationFormatError if an annotation is found to be malformed.
	 */
	public static Map<Class<? extends Annotation>, Annotation> parseAnnotations(String name, Class<?> c, boolean isMethod) {
		return JSAnnotationObject.parseAnnotations(name, c, isMethod);
	}

	/**
	 * Returns an annotation of the given type backed by the given member -> value
	 * map.
	 */
	public static Annotation annotationForMap(final Class<? extends Annotation> type,
			final Map<String, Object> memberValues) {
		return (Annotation) Proxy.newProxyInstance(type.getClassLoader(), new Class<?>[] { type },
				new AnnotationInvocationHandler(type, memberValues));
	}

	private static final Annotation[] EMPTY_ANNOTATION_ARRAY = new Annotation[0];

	public static Annotation[] toArray(Map<Class<? extends Annotation>, Annotation> annotations) {
		return annotations.values().toArray(EMPTY_ANNOTATION_ARRAY);
	}

	public static Annotation[] getEmptyAnnotationArray() {
		return EMPTY_ANNOTATION_ARRAY;
	}


}
