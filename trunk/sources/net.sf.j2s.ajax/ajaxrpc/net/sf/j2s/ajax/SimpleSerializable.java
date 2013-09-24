/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
//import java.lang.reflect.TypeVariable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Queue;
import java.util.Set;

import net.sf.j2s.annotation.J2SIgnore;
import net.sf.j2s.annotation.J2SKeep;

/**
 * @author zhou renjian
 *
 * 2006-10-11
 */
public class SimpleSerializable implements Cloneable {
	
	public static SimpleSerializable UNKNOWN = new SimpleSerializable();

	public static boolean BYTES_COMPACT_MODE = false;

	public static boolean JSON_EXPAND_MODE = true;

	public static int LATEST_SIMPLE_VERSION = 202;
	
	@J2SIgnore
	private static Object mutex = new Object();
	@J2SIgnore
	private static Map<String, Map<String, Field>> quickFields = new HashMap<String, Map<String, Field>>();
	@J2SIgnore
	private static Set<String> expiredClasses = new HashSet<String>();
	
	@J2SIgnore
	private static Object classMutex = new Object();
	@J2SIgnore
	private static Map<String, String> classNameMappings = new HashMap<String, String>();
	@J2SIgnore
	private static Map<String, String> classAliasMappings = new HashMap<String, String>();
	
	private int simpleVersion;
	
	private boolean classNameAbbrev = true;
	
	public int getSimpleVersion() {
		if (simpleVersion <= 0) {
			return 201;
		}
		return simpleVersion;
	}
	
	public void setSimpleVersion(int ver) {
		simpleVersion = ver;
		if (ver < 100) {
			simpleVersion = 201;
		} else if (simpleVersion >= 1000) {
			simpleVersion = 201;
		}
	}
	
	@J2SIgnore
	private static class DeserializeObject {
		Object object;
		int index;
		boolean error;
		
		public DeserializeObject(Object object, int index, boolean error) {
			super();
			this.object = object;
			this.index = index;
			this.error = error;
		}
		
	};
	
	@J2SIgnore
	public static void registerClassShortenName(String clazzName, String shortenName) {
		if (shortenName == null || shortenName.length() == 0) {
			System.out.println("Invalid shorten class name for " + clazzName);
			return;
		}
		String sName = classNameMappings.get(clazzName);
		if (sName != null && !sName.equals(shortenName)) {
			System.out.println("Already existed shorten name " + sName + " for " + clazzName);
		}
		String fName = classAliasMappings.get(shortenName);
		if (fName != null && !fName.equals(clazzName)) {
			System.out.println("Conficted: shorten name " + shortenName + " for " + fName + " and " + clazzName);
		}
		synchronized (classMutex) {
			classNameMappings.put(clazzName, shortenName);
			classAliasMappings.put(shortenName, clazzName);
		}
	}
	
	@J2SIgnore
	public static String getClassShortenName(String clazzName) {
		return classNameMappings.get(clazzName);
	}
	
	@J2SIgnore
	public static String getClassFullName(String clazzName) {
		return classAliasMappings.get(clazzName);
	}
	
    @J2SIgnore
	static Map<String, Field> getSerializableFields(String clazzName, Class<?> clazz, boolean forceUpdate) {
		Map<String, Field> fields = forceUpdate ? null : quickFields.get(clazzName);
		if (fields == null) {
			if (!forceUpdate) {
				if (expiredClasses.contains(clazzName)) {
					// Load class from bytes. Variable clazz may be out of date
					Object inst = SimpleClassLoader.loadSimpleInstance(clazzName);
					if (inst != null) {
						// Force updating fields in cache
						return getSerializableFields(clazzName, inst.getClass(), true);
					}
				}
			}
			fields = new HashMap<String, Field>();
			while(clazz != null && !"net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())) {
				Field[] clazzFields = clazz.getDeclaredFields();
				for (int i = 0; i < clazzFields.length; i++) {
					Field f = clazzFields[i];
					int modifiers = f.getModifiers();
					if ((modifiers & Modifier.PUBLIC) != 0
							&& (modifiers & (Modifier.TRANSIENT | Modifier.STATIC)) == 0) {
						fields.put(f.getName(), f);
					}
				}
				clazz = clazz.getSuperclass();
			}
			synchronized (mutex) {
				if (!forceUpdate) {
					if (expiredClasses.contains(clazzName)) {
						// Class already be reloaded. Do not put fields into cache.
						return fields;
					}
				}
				if (forceUpdate || quickFields.get(clazzName) == null) {
					quickFields.put(clazzName, fields);
					if (forceUpdate) {
						// Class and fields are already updated, mark it as updated
						expiredClasses.remove(clazzName);
					}
				}
			}
		}
		return fields;
	}

	/**
	 * @return
	 * 
	 * @j2sNative
var ssObjs = null;
if (arguments.length >= 2) {
	ssObjs = arguments[1];
}
if (ssObjs == null) {
	ssObjs = [this];
}
var baseChar = 'B'.charCodeAt (0);
var buffer = [];
buffer[0] = "WLL201";
var oClass = this.getClass ();
var clazz = oClass;
var clazzName = clazz.getName ();
var idx = -1;
while ((idx = clazzName.lastIndexOf ('$')) != -1) {
	if (clazzName.length > idx + 1) {
		var ch = clazzName.charCodeAt (idx + 1);
		if (ch < 48 || ch >= 58) { // not a number!
			break; // inner class
		} 
	}
	clazz = clazz.getSuperclass ();
	if (clazz == null) {
		break;
	}
	clazzName = clazz.getName ();
}
buffer[1] = clazzName;
buffer[2] = '#';
buffer[3] = "00000000$";
var headSize = buffer.join ('').length;

var fields = oClass.declared$Fields;
if (fields == null) {
	fields = [];
}
var filter = arguments[0];
var ignoring = (filter == null || filter.ignoreDefaultFields ());
var fMap = this.fieldMapping ();
for (var i = 0; i < fields.length; i++) {
	var field = fields[i];
	var name = field.name;
	if (filter != null && !filter.accept (name)) continue;
	var fName = name;
	if (fMap != null && fMap.length > 1) {
		for (var j = 0; j < fMap.length / 2; j++) {
			if (name == fMap[j + j]) {
				var newName = fMap[j + j + 1];
				if (newName != null && newName.length > 0) {
					fName = newName;
				}
				break;
			}
		}
	}
	var nameStr = String.fromCharCode (baseChar + fName.length) + fName;
	var type = field.type;
	if (type == 'F' || type == 'D' || type == 'I' || type == 'L'
			|| type == 'S' || type == 'B' || type == 'b') {
		if (ignoring && this[name] == 0
				&& (type == 'F' || type == 'D' || type == 'I'
				|| type == 'L' || type == 'S' || type == 'B')) {
			continue;
		}
		if (ignoring && this[name] == false && type == 'b') {
			continue;
		}
		buffer[buffer.length] = nameStr;
		buffer[buffer.length] = type;
		var value = null;
		if (type == 'b') {
			value = (this[name] == true) ? "1" : "0";
		} else {
			value = "" + this[name];
		}
		buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
		buffer[buffer.length] = value;
	} else if (type == 's') {
		if (ignoring && this[name] == null) {
			continue;
		}
		buffer[buffer.length] = nameStr;
		this.serializeString(buffer, this[name]);
	} else if (type == 'O') {
		if (ignoring && this[name] == null) {
			continue;
		}
		buffer[buffer.length] = nameStr;
		this.serializeObject(buffer, this[name], ssObjs);
	} else if (type.charAt (0) == 'A') {
		if (this[name] == null) {
			if (ignoring) {
				continue;
			}
			buffer[buffer.length] = nameStr;
			buffer[buffer.length] = "A"; //String.fromCharCode (baseChar - 1);
		} else {
			buffer[buffer.length] = nameStr;
			buffer[buffer.length] = type;
			var l4 = this[name].length;
			if (l4 > 52) {
				if (l4 > 0x1000000) { // 16 * 1024 * 1024
					throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
				}
				buffer[buffer.length] = "@"; //String.fromCharCode (baseChar - 2);
				var value = "" + l4;
				buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
				buffer[buffer.length] = value;
			} else {
				buffer[buffer.length] = String.fromCharCode (baseChar + l4);
			}
			var t = type.charAt (1);
			var arr = this[name];
			for (var j = 0; j < arr.length; j++) {
				if (t == 'F' || t == 'D' || t == 'I' || t == 'L'
						|| t == 'S' || t == 'B' || t == 'b') {
					var value = null;
					if (type == 'b') {
						value = (arr[j] == true) ? "1" : "0";
					} else {
						value = "" + arr[j];
					}
					buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
					buffer[buffer.length] = value;
				} else if (t == 'X') {
					this.serializeString (buffer, arr[j]);
				} else if (t == 'O') {
					this.serializeObject (buffer, arr[j], ssObjs);
				} else if (t == 'C') {
					var value = "";
					if (typeof arr[j] == 'number') {
						value += arr[j];
					} else {
						value += arr[j].charCodeAt (0);
					}
					buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
					buffer[buffer.length] = value;
				}
			}
		}
	} else if (type == 'C') {
		if (ignoring && this[name] == 0 || this[name] == '\0') {
			continue;
		}
		buffer[buffer.length] = nameStr;
		buffer[buffer.length] = type;
		var value = "";
		if (typeof this[name] == 'number') {
			value += this[name];
		} else {
			value += this[name].charCodeAt (0);
		}
		buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
		buffer[buffer.length] = value;
	}
}
var strBuf = buffer.join ('');
var size = strBuf.length; 
if (size > 0x1000000) { // 16 * 1024 * 1024
	throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
}
var sizeStr = "" + (size - headSize);
strBuf = strBuf.substring (0, headSize - sizeStr.length - 1) + sizeStr + strBuf.substring(headSize - 1);
return strBuf;
	 */
	public String serialize() {
		return serialize(null);
    }
    
    @J2SIgnore
	public String serialize(SimpleFilter filter) {
    	List<SimpleSerializable> objects = new ArrayList<SimpleSerializable>();
    	objects.add(this);
		return serialize(filter, objects);
	}

    @J2SIgnore
    static boolean isSubclassOf(Class<?> type, Class<?> superClass) {
    	if (type == null || superClass == null) {
    		return false;
    	}
    	if (type.isArray()) {
    		if (!superClass.isArray()) {
    			return false;
    		}
    		type = type.getComponentType();
    		superClass = superClass.getComponentType();
    	}
    	if (type == superClass) {
    		return true;
    	}
    	do {
    		type = type.getSuperclass();
    		if (type == superClass) {
    			return true;
    		}
    		if (type == Object.class) {
    			return false;
    		}
    	} while (type != null);
    	return false;
    }

    @J2SIgnore
    static boolean isSubInterfaceOf(Class<?> type, Class<?> superInterface) {
    	if (type == null || superInterface == null) {
    		return false;
    	}
    	if (type.isArray()) {
    		if (!superInterface.isArray()) {
    			return false;
    		}
    		type = type.getComponentType();
    		superInterface = superInterface.getComponentType();
    	}
    	if (type == superInterface) {
    		return true;
    	}
    	List<Type> allInterfaces = new ArrayList<Type>();
    	allInterfaces.add(type);
    	Type t = null;
    	do {
    		t = allInterfaces.remove(0);
    		if (!(t instanceof Class<?>)) {
    			continue;
    		}
    		Type[] interfaces = ((Class<?>) t).getGenericInterfaces();
    		if (interfaces != null && interfaces.length > 0) {
    			for (int i = 0; i < interfaces.length; i++) {
					Type f = interfaces[i];
					if (f instanceof ParameterizedType) {
						f = ((ParameterizedType) f).getRawType();
					}
					if (f == superInterface) {
						return true;
					}
					if (!allInterfaces.contains(f)) {
						allInterfaces.add(f);
					}
				}
    		}
    	} while (!allInterfaces.isEmpty());
    	return false;
    }
    
    @J2SIgnore
	private String serialize(SimpleFilter filter, List<SimpleSerializable> ssObjs) {
		char baseChar = 'B';
		StringBuffer buffer = new StringBuffer(1024);
		/*
		 * "WLL" is used to mark Simple RPC, 100 is version 1.0.0, 
		 * # is used to mark the the beginning of serialized data  
		 */
		buffer.append("WLL");
		buffer.append(getSimpleVersion());
		Class<?> clazz = this.getClass();
		String clazzName = clazz.getName();
		int idx = -1;
		while ((idx = clazzName.lastIndexOf('$')) != -1) {
			if (clazzName.length() > idx + 1) {
				char ch = clazzName.charAt(idx + 1);
				if (ch < '0' || ch > '9') { // not a number
					break; // inner class
				}
			}
			clazz = clazz.getSuperclass();
			if (clazz == null) {
				break; // should never happen!
			}
			clazzName = clazz.getName();
		}
		if (getSimpleVersion() >= 202 && classNameAbbrev) {
			String shortClazzName = classNameMappings.get(clazzName);
			if (shortClazzName != null) {
				buffer.append(shortClazzName);
			} else {
				buffer.append(clazzName);
			}
		} else {
			buffer.append(clazzName);
		}
		buffer.append("#00000000$"); // later the number of size will be updated!
		int headSize = buffer.length();

		Map<String, Field> fields = getSerializableFields(clazzName, this.getClass(), false);
		boolean ignoring = (filter == null || filter.ignoreDefaultFields());
		Map<String, String> fieldNameMap = getSimpleVersion() >= 202 ? fieldNameMapping() : null;
		String[] fMap = fieldNameMap == null ? fieldMapping() : null;
		try {
			for (Iterator<Entry<String, Field>> itr = fields.entrySet().iterator(); itr.hasNext();) {
				Entry<String, Field> entry = (Entry<String, Field>) itr.next();
				String name = entry.getKey();
				Field field = entry.getValue();
				if (filter != null && !filter.accept(name)) continue;
				if (fieldNameMap != null) {
					String alias = fieldNameMap.get(name);
					if (alias != null && alias.length() > 0) {
						name = alias;
					}
				} else if (fMap != null && fMap.length > 1) {
					for (int j = 0; j < fMap.length / 2; j++) {
						if (name.equals(fMap[j + j])) {
							String newName = fMap[j + j + 1];
							if (newName != null && newName.length() > 0) {
								name = newName;
							}
							break;
						}
					}
				}
				//String nameStr = (char)(baseChar + name.length()) + name;
				Class<?> type = field.getType();
				if (type == String.class) {
					String s = (String) field.get(this);
					if (s == null && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					serializeString(buffer, s);
				} else if (type == int.class) {
					int n = field.getInt(this);
					if (n == 0 && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('I');
					String value = String.valueOf(n);
					buffer.append((char) (baseChar + value.length()));
					buffer.append(value);
				} else if (isSubclassOf(type, SimpleSerializable.class)) {
					SimpleSerializable ssObj = (SimpleSerializable) field.get(this);
					if (ssObj == null && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					serializeObject(buffer, ssObj, ssObjs);
				} else if (type == long.class) {
					long l = field.getLong(this);
					if (l == 0L && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('L');
					String value = String.valueOf(l);
					buffer.append((char) (baseChar + value.length()));
					buffer.append(value);
				} else if (type == boolean.class) {
					boolean b = field.getBoolean(this);
					if (b == false && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('b');
					buffer.append('C'); // ((char) (baseChar + 1));
					buffer.append(b ? '1' : '0');
				} else if (type.isArray()) { // Array ...
					if (type == byte[].class) {
						byte [] bs = (byte []) field.get(this);
						if (bs == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append(!bytesCompactMode() ? "AB" : "A8");
						if (bs == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, bs.length);
							if (!bytesCompactMode()) {
								for (int j = 0; j < bs.length; j++) {
									String value = String.valueOf(bs[j]);
									buffer.append((char) (baseChar + value.length()));
									buffer.append(value);
								}
							} else {
								buffer.append(new String(bs, "iso-8859-1"));
							}
						}
					} else if (type == String[].class) {
						String[] ss = (String []) field.get(this);
						if (ss == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append("AX"); // special
						if (ss == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, ss.length);
							for (int j = 0; j < ss.length; j++) {
								String s = ss[j];
								serializeString(buffer, s);
							}
						}
					} else if (isSubclassOf(type, SimpleSerializable[].class)) {
						SimpleSerializable[] ss = (SimpleSerializable []) field.get(this);
						if (ss == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append("AO"); // special
						if (ss == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, ss.length);
							for (int j = 0; j < ss.length; j++) {
								SimpleSerializable s = ss[j];
								serializeObject(buffer, s, ssObjs);
							}
						}
					} else if (type == int[].class) {
						int [] ns = (int []) field.get(this);
						if (ns == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append("AI");
						if (ns == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, ns.length);
							for (int j = 0; j < ns.length; j++) {
								String value = String.valueOf(ns[j]);
								buffer.append((char) (baseChar + value.length()));
								buffer.append(value);
							}
						}
					} else if (type == long[].class) {
						long [] ls = (long []) field.get(this);
						if (ls == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append("AL");
						if (ls == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, ls.length);
							for (int j = 0; j < ls.length; j++) {
								String value = String.valueOf(ls[j]);
								buffer.append((char) (baseChar + value.length()));
								buffer.append(value);
							}
						}
					} else if (type == boolean[].class) {
						boolean [] bs = (boolean []) field.get(this);
						if (bs == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append("Ab");
						if (bs == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, bs.length);
							for (int j = 0; j < bs.length; j++) {
								buffer.append('C'); // (char) (baseChar + 1));
								buffer.append(bs[j] ? '1' : '0');
							}
						}
					} else if (type == float[].class) {
						float[] fs = (float[]) field.get(this);
						if (fs == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append("AF");
						if (fs == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, fs.length);
							for (int j = 0; j < fs.length; j++) {
								String value = String.valueOf(fs[j]);
								buffer.append((char) (baseChar + value.length()));
								buffer.append(value);
							}
						}
					} else if (type == double[].class) {
						double [] ds = (double []) field.get(this);
						if (ds == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append("AD");
						if (ds == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, ds.length);
							for (int j = 0; j < ds.length; j++) {
								String value = String.valueOf(ds[j]);
								buffer.append((char) (baseChar + value.length()));
								buffer.append(value);
							}
						}
					} else if (type == short[].class) {
						short [] ss = (short []) field.get(this);
						if (ss == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append("AS");
						if (ss == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, ss.length);
							for (int j = 0; j < ss.length; j++) {
								String value = String.valueOf(ss[j]);
								buffer.append((char) (baseChar + value.length()));
								buffer.append(value);
							}
						}
					} else if (type == char[].class) {
						char [] cs = (char []) field.get(this);
						if (cs == null && ignoring) continue;
						buffer.append((char)(baseChar + name.length()));
						buffer.append(name);
						buffer.append("AC");
						if (cs == null) {
							buffer.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(buffer, cs.length);
							for (int j = 0; j < cs.length; j++) {
								int c = cs[j];
								String value = Integer.toString(c, 10);
								buffer.append((char) (baseChar + value.length()));
								buffer.append(value);
							}
						}
					} else {
						continue; // just ignore it
						// others unknown or unsupported types!
						// throw new RuntimeException("Unsupported data type in Java2Script Simple RPC!");
					}
				} else if (isSubInterfaceOf(type, Collection.class)) {
					Collection<?> collection = (Collection<?>)field.get(this);
					if (collection == null && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('Z');
					if (isSubInterfaceOf(type, List.class)) {
						buffer.append('Z');
					} else if (isSubInterfaceOf(type, Set.class)) {
						buffer.append('Y');
					} else if (isSubInterfaceOf(type, Queue.class)) {
						buffer.append('Q');
					} else {
						buffer.append('W');
					}
					if (collection == null) {
						buffer.append('A'); // (char) (baseChar - 1));
					} else {
						Object[] os = collection.toArray();
						serializeLength(buffer, os.length);
						for (int j = 0; j < os.length; j++) {
							Object o = os[j];
							if (o == null) {
								buffer.append("OA");
							} else {
								serializeArrayItem(buffer, o.getClass(), o, ssObjs);
							}
						}
					}
				} else if (isSubInterfaceOf(type, Map.class)) {
					Map<?, ?> map = (Map<?, ?>)field.get(this);
					if (map == null && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append("YM");
					if (map == null) {
						buffer.append('A'); // (char) (baseChar - 1));
					} else {
						serializeLength(buffer, map.size() * 2);
						for (Iterator<?> iter = map.keySet().iterator(); iter
								.hasNext();) {
							Object key = iter.next();
							if (key == null) {
								buffer.append("OA");
							} else {
								serializeArrayItem(buffer, key.getClass(), key, ssObjs);
							}
							Object value = map.get(key);
							if (value == null) {
								buffer.append("OA");
							} else {
								serializeArrayItem(buffer, value.getClass(), value, ssObjs);
							}
						}
					}
				} else if (type.isEnum()) {
					Enum<?> e = (Enum<?>)field.get(this);
					if (e == null && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('E');
					if (e == null) {
						buffer.append('A'); // (char) (baseChar - 1));
					} else {
						String value = String.valueOf(e.ordinal());
						buffer.append((char) (baseChar + value.length()));
						buffer.append(value);
					}
				} else if (type == float.class) {
					float f = field.getFloat(this);
					if (f == 0.0 && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('F');
					String value = String.valueOf(f);
					buffer.append((char) (baseChar + value.length()));
					buffer.append(value);
				} else if (type == double.class) {
					double d = field.getDouble(this);
					if (d == 0.0d && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('D');
					String value = String.valueOf(d);
					buffer.append((char) (baseChar + value.length()));
					buffer.append(value);
				} else if (type == short.class) {
					short s = field.getShort(this);
					if (s == 0 && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('S');
					String value = String.valueOf(s);
					buffer.append((char) (baseChar + value.length()));
					buffer.append(value);
				} else if (type == byte.class) {
					byte b = field.getByte(this);
					if (b == 0 && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('B');
					String value = String.valueOf(b);
					buffer.append((char) (baseChar + value.length()));
					buffer.append(value);
				} else if (type == char.class) {
					int c = 0 + field.getChar(this);
					if (c == 0 && ignoring) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					buffer.append('C');
					String value = Integer.toString(c, 10);
					buffer.append((char) (baseChar + value.length()));
					buffer.append(value);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		int size = buffer.length();
		if (size > 0x1000000) { // 16 * 1024 * 1024
			throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
		}
		String sizeStr = String.valueOf(size - headSize);
		buffer.replace(headSize - sizeStr.length() - 1, headSize - 1, sizeStr); // update size!
		return buffer.toString();
	}

    @J2SIgnore
    private void serializeArrayItem(StringBuffer buffer, Class<?> type, Object target, List<SimpleSerializable> ssObjs) throws Exception {
    	char baseChar = 'B';
		if (type == String.class) {
			String s = (String) target;
			serializeString(buffer, s);
		} else if (type == Integer.class) {
			int n = ((Integer) target).intValue();
			buffer.append('I');
			String value = String.valueOf(n);
			buffer.append((char) (baseChar + value.length()));
			buffer.append(value);
		} else if (isSubclassOf(type, SimpleSerializable.class)) {
			SimpleSerializable ssObj = (SimpleSerializable) target;
			serializeObject(buffer, ssObj, ssObjs);
		} else if (type == Long.class) {
			long l = ((Long) target).longValue();
			buffer.append('L');
			String value = String.valueOf(l);
			buffer.append((char) (baseChar + value.length()));
			buffer.append(value);
		} else if (type == Boolean.class) {
			boolean b = ((Boolean) target).booleanValue();
			buffer.append('b');
			buffer.append('C'); // ((char) (baseChar + 1));
			buffer.append(b ? '1' : '0');
		} else if (type.isArray()) { // Array ...
			if (type == byte[].class) {
				byte [] bs = (byte []) target;
				buffer.append(!bytesCompactMode() ? "AB" : "A8");
				if (bs == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, bs.length);
					if (!bytesCompactMode()) {
						for (int j = 0; j < bs.length; j++) {
							String value = String.valueOf(bs[j]);
							buffer.append((char) (baseChar + value.length()));
							buffer.append(value);
						}
					} else {
						buffer.append(new String(bs, "iso-8859-1"));
					}
				}
			} else if (type == String[].class) {
				String[] ss = (String []) target;
				buffer.append("AX"); // special
				if (ss == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, ss.length);
					for (int j = 0; j < ss.length; j++) {
						String s = ss[j];
						serializeString(buffer, s);
					}
				}
			} else if (isSubclassOf(type, SimpleSerializable[].class)) {
				SimpleSerializable[] ss = (SimpleSerializable []) target;
				buffer.append("AO"); // special
				if (ss == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, ss.length);
					for (int j = 0; j < ss.length; j++) {
						SimpleSerializable s = ss[j];
						serializeObject(buffer, s, ssObjs);
					}
				}
			} else if (type == int[].class) {
				int [] ns = (int []) target;
				buffer.append("AI");
				if (ns == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, ns.length);
					for (int j = 0; j < ns.length; j++) {
						String value = String.valueOf(ns[j]);
						buffer.append((char) (baseChar + value.length()));
						buffer.append(value);
					}
				}
			} else if (type == long[].class) {
				long [] ls = (long []) target;
				buffer.append("AL");
				if (ls == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, ls.length);
					for (int j = 0; j < ls.length; j++) {
						String value = String.valueOf(ls[j]);
						buffer.append((char) (baseChar + value.length()));
						buffer.append(value);
					}
				}
			} else if (type == boolean[].class) {
				boolean [] bs = (boolean []) target;
				buffer.append("Ab");
				if (bs == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, bs.length);
					for (int j = 0; j < bs.length; j++) {
						buffer.append('C'); // (char) (baseChar + 1));
						buffer.append(bs[j] ? '1' : '0');
					}
				}
			} else if (type == float[].class) {
				float[] fs = (float[]) target;
				buffer.append("AF");
				if (fs == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, fs.length);
					for (int j = 0; j < fs.length; j++) {
						String value = String.valueOf(fs[j]);
						buffer.append((char) (baseChar + value.length()));
						buffer.append(value);
					}
				}
			} else if (type == double[].class) {
				double [] ds = (double []) target;
				buffer.append("AD");
				if (ds == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, ds.length);
					for (int j = 0; j < ds.length; j++) {
						String value = String.valueOf(ds[j]);
						buffer.append((char) (baseChar + value.length()));
						buffer.append(value);
					}
				}
			} else if (type == short[].class) {
				short [] ss = (short []) target;
				buffer.append("AS");
				if (ss == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, ss.length);
					for (int j = 0; j < ss.length; j++) {
						String value = String.valueOf(ss[j]);
						buffer.append((char) (baseChar + value.length()));
						buffer.append(value);
					}
				}
			} else if (type == char[].class) {
				char [] cs = (char []) target;
				buffer.append("AC");
				if (cs == null) {
					buffer.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(buffer, cs.length);
					for (int j = 0; j < cs.length; j++) {
						int c = cs[j];
						String value = Integer.toString(c, 10);
						buffer.append((char) (baseChar + value.length()));
						buffer.append(value);
					}
				}
			} else {
				buffer.append("OA");
				// others unknown or unsupported types!
				// throw new RuntimeException("Unsupported data type in Java2Script Simple RPC!");
			}
		} else if (isSubInterfaceOf(type, Collection.class)) {
			Collection<?> collection = (Collection<?>) target;
			buffer.append('Z');
			if (isSubInterfaceOf(type, List.class)) {
				buffer.append('Z');
			} else if (isSubInterfaceOf(type, Set.class)) {
				buffer.append('Y');
			} else if (isSubInterfaceOf(type, Queue.class)) {
				buffer.append('Q');
			} else {
				buffer.append('W');
			}
			if (collection == null) {
				buffer.append('A'); // (char) (baseChar - 1));
			} else {
				Object[] os = collection.toArray();
				serializeLength(buffer, os.length);
				for (int j = 0; j < os.length; j++) {
					Object o = os[j];
					if (o == null) {
						buffer.append("OA");
					} else {
						serializeArrayItem(buffer, o.getClass(), o, ssObjs);
					}
				}
			}
		} else if (isSubInterfaceOf(type, Map.class)) {
			Map<?, ?> map = (Map<?, ?>) target;
			buffer.append("YM");
			if (map == null) {
				buffer.append('A'); // (char) (baseChar - 1));
			} else {
				serializeLength(buffer, map.size() * 2);
				for (Iterator<?> iter = map.keySet().iterator(); iter
						.hasNext();) {
					Object key = iter.next();
					if (key == null) {
						buffer.append("OA");
					} else {
						serializeArrayItem(buffer, key.getClass(), key, ssObjs);
					}
					Object value = map.get(key);
					if (value == null) {
						buffer.append("OA");
					} else {
						serializeArrayItem(buffer, value.getClass(), value, ssObjs);
					}
				}
			}
		} else if (type.isEnum()) {
			Enum<?> e = (Enum<?>) target;
			buffer.append('E');
			if (e == null) {
				buffer.append('A'); // (char) (baseChar - 1));
			} else {
				String value = String.valueOf(e.ordinal());
				buffer.append((char) (baseChar + value.length()));
				buffer.append(value);
			}
		} else if (type == Float.class) {
			float f = ((Float) target).floatValue();
			buffer.append('F');
			String value = String.valueOf(f);
			buffer.append((char) (baseChar + value.length()));
			buffer.append(value);
		} else if (type == Double.class) {
			double d = ((Double) target).doubleValue();
			buffer.append('D');
			String value = String.valueOf(d);
			buffer.append((char) (baseChar + value.length()));
			buffer.append(value);
		} else if (type == Short.class) {
			short s = ((Short) target).shortValue();
			buffer.append('S');
			String value = String.valueOf(s);
			buffer.append((char) (baseChar + value.length()));
			buffer.append(value);
		} else if (type == Byte.class) {
			byte b = ((Byte) target).byteValue();
			buffer.append('B');
			String value = String.valueOf(b);
			buffer.append((char) (baseChar + value.length()));
			buffer.append(value);
		} else if (type == Character.class) {
			int c = 0 + ((Character) target).charValue();
			buffer.append('C');
			String value = Integer.toString(c, 10);
			buffer.append((char) (baseChar + value.length()));
			buffer.append(value);
		} else {
			buffer.append("OA");
			// others unknown or unsupported types!
		}
    }
    
    @J2SIgnore
	private void serializeLength(StringBuffer buffer, int length) {
		char baseChar = 'B';
		if (length > 52) {
			if (length > 0x1000000) { // 16 * 1024 * 1024
				throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
			}
			buffer.append('@'); // (char) (baseChar - 2));
			String value = String.valueOf(length);
			buffer.append((char) (baseChar + value.length()));
			buffer.append(value);
		} else {
			buffer.append((char) (baseChar + length));
		}
	}
	
	/**
	 * @param buffer
	 * @param s
	 * @throws UnsupportedEncodingException
	 * 
	 * @j2sNative
var baseChar = 'B'.charCodeAt (0);
if (s == null) {
	buffer[buffer.length] = "sA";
	// buffer[buffer.length] = 's';
	// buffer[buffer.length] = String.fromCharCode (baseChar - 1);
} else {
	var normal = /^[\t\u0020-\u007e]*$/.test(s);
	if (normal) {
		buffer[buffer.length] = 's';
	} else {
		buffer[buffer.length] = 'u';
		s = Encoding.encodeBase64 (Encoding.convert2UTF8 (s));
	}
	var l4 = s.length;
	if (l4 > 52) {
		buffer[buffer.length] = "@"; //String.fromCharCode (baseChar - 2);
		var value = "" + l4;
		buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
		buffer[buffer.length] = l4;
	} else {
		buffer[buffer.length] = String.fromCharCode (baseChar + l4);
	}
	buffer[buffer.length] = s;
}
	 */
    @J2SKeep
	private void serializeString(StringBuffer buffer, String s) {
		char baseChar = 'B';
		if (s != null) {
			int l4 = s.length();
			boolean needBase64 = false;
			if (!stringsASCIIEncoded()) {
				for (int i = 0; i < l4; i++) {
					char c = s.charAt(i);
					if (c > 0x7e || (c < 0x20 && c != '\t')) {
						needBase64 = true;
						break;
					}
				}
			}
			if (!needBase64) {
				buffer.append('s');
			} else {
				try {
					byte[] bytes = s.getBytes("utf-8");
					buffer.append('u');
					//s = new String(bytes, "iso-8859-1");
					s = Base64.byteArrayToBase64(bytes);
					l4 = s.length();
				} catch (UnsupportedEncodingException e) {
					buffer.append('s');
				}
			}
			if (l4 > 52) {
				buffer.append('@'); // (char) (baseChar - 2));
				String value = String.valueOf(l4);
				buffer.append((char) (baseChar + value.length()));
				buffer.append(value);
			} else {
				buffer.append((char) (baseChar + l4));
			}
			buffer.append(s);
		} else {
			buffer.append('s');
			buffer.append('A'); // (char) (baseChar - 1));
		}
	}

	/**
	 * @param buffer
	 * @param ss
	 * @param ssObjs
	 * 
	 * @j2sNative
var baseChar = 'B'.charCodeAt (0);
if (ss != null) {
	var idx = -1;
	var len = ssObjs.length;
	for (var i = 0; i < len; i++) {
		if (ssObjs[i] === ss) {
			idx = i;
			break;
		}
	}
	if (idx != -1) {
		buffer[buffer.length] = 'o';
		var value = "" + idx;
		buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
		buffer[buffer.length] = value;
		return;
	}
	ssObjs[ssObjs.length] = ss;
}
buffer[buffer.length] = 'O';
if (ss != null) {
	var s = ss.serialize (null, ssObjs); 
	var l4 = s.length;
	if (l4 > 52) {
		buffer[buffer.length] = "@"; //String.fromCharCode (baseChar - 2);
		var value = "" + l4;
		buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
		buffer[buffer.length] = value;
	} else {
		buffer[buffer.length] = String.fromCharCode (baseChar + l4);
	}
	buffer[buffer.length] = s;
} else {
	buffer[buffer.length] = "A"; //String.fromCharCode (baseChar - 1);
}
	 */
    @J2SKeep
	private void serializeObject(StringBuffer buffer, SimpleSerializable ss, List<SimpleSerializable> ssObjs) {
		char baseChar = 'B';
		if (ss != null) {
			int idx = ssObjs.indexOf(ss);
			if (idx != -1) {
				buffer.append('o');
				String value = String.valueOf(idx);
				buffer.append((char) (baseChar + value.length()));
				buffer.append(value);
				return;
			}
			ssObjs.add(ss);
		}
		buffer.append('O');
		if (ss != null) {
			ss.simpleVersion = simpleVersion;
			String s = ss.serialize(null, ssObjs); 
			int l4 = s.length();
			if (l4 > 52) {
				buffer.append('@'); // (char) (baseChar - 2));
				String value = String.valueOf(l4);
				buffer.append((char) (baseChar + value.length()));
				buffer.append(value);
			} else {
				buffer.append((char) (baseChar + l4));
			}
			buffer.append(s);
		} else {
			buffer.append('A'); // (char) (baseChar - 1));
		}
	}
    
    @J2SIgnore
    protected boolean jsonExpandMode() {
    	return JSON_EXPAND_MODE;
    }

    @J2SIgnore
    public String jsonSerialize() {
    	return jsonSerialize(null, "");
    }

    @J2SIgnore
    public String jsonSerialize(SimpleFilter filter) {
    	List<SimpleSerializable> objects = new ArrayList<SimpleSerializable>();
    	objects.add(this);
    	return jsonSerialize(filter, objects, true, "");
    }

    @J2SIgnore
    public String jsonSerialize(SimpleFilter filter, String linePrefix) {
    	List<SimpleSerializable> objects = new ArrayList<SimpleSerializable>();
    	objects.add(this);
    	return jsonSerialize(filter, objects, linePrefix != null, linePrefix);
    }
    
    @J2SIgnore
    private String jsonSerialize(SimpleFilter filter, List<SimpleSerializable> ssObjs, boolean withFormats, String linePrefix) {
    	String prefix = linePrefix;
    	StringBuffer buffer = new StringBuffer(1024);
    	if (prefix != null) {
    		//buffer.append(prefix);
    		prefix += "\t";
    	}
    	buffer.append('{');
    	if (withFormats) {
    		buffer.append("\r\n");
    	}
    	boolean commasAppended = false;
		boolean ignoring = (filter == null || filter.ignoreDefaultFields());
		Class<?> clazzType = this.getClass();
		Map<String, Field> fieldMap = getSerializableFields(clazzType.getName(), clazzType, false);
		String[] fMap = fieldMapping();
		for (Iterator<String> itr = fieldMap.keySet().iterator(); itr.hasNext();) {
			String fieldName = (String) itr.next();
			if (filter != null && !filter.accept(fieldName)) continue;
			Field field = fieldMap.get(fieldName);
			if (field == null) {
				continue;
			}
			if (fMap != null && fMap.length > 1) {
				for (int j = 0; j < fMap.length / 2; j++) {
					if (fieldName.equals(fMap[j + j])) {
						String newName = fMap[j + j + 1];
						if (newName != null && newName.length() > 0) {
							fieldName = newName;
						}
						break;
					}
				}
			}
			Class<?> clazz = field.getType();
			try {
				if (clazz == int.class) {
					int i = field.getInt(this);
					if (i == 0 && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(i);
				} else if (clazz == String.class) {
					String str = (String) field.get(this);
					if (str == null && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					if (str == null) {
						buffer.append("null");
					} else {
						buffer.append('\"');
						buffer.append(str.replaceAll("\r", "\\r")
								.replaceAll("\n", "\\n")
								.replaceAll("\t", "\\t")
								.replaceAll("\'", "\\'")
								.replaceAll("\"", "\\\""));
						buffer.append('\"');
					}
				} else if (clazz == long.class) {
					long l = field.getLong(this);
					if (l == 0 && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(l);
				} else if (clazz == boolean.class) {
					boolean b = field.getBoolean(this);
					if (b == false && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(b);
				} else if (isSubclassOf(clazz, SimpleSerializable.class)) {
					SimpleSerializable o = (SimpleSerializable) field.get(this);
					if (o == null && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					
					int idx = -1;
					if (!this.jsonExpandMode()) {
						idx = ssObjs.indexOf(o);
					}
					if (idx != -1) {
						if (withFormats) {
							buffer.append("{ \"@\" : ");
							buffer.append(idx);
							buffer.append(" }");
						} else {
							buffer.append("{\"@\":");
							buffer.append(idx);
							buffer.append('}');
						}
					} else {
						ssObjs.add(o);
						buffer.append(o.jsonSerialize(null, ssObjs, withFormats, prefix));
					}
				} else if (clazz.isArray()) {
					clazz = clazz.getComponentType();
					if (clazz == int.class) {
						int[] xs = (int[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(',');
							}
							if (withFormats) {
								buffer.append(' ');
							}
						}
						buffer.append(']');
					} else if (clazz == String.class) {
						String[] xs = (String[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append("\r\n");
						}
						for (int i = 0; i < xs.length; i++) {
							String str = xs[i];
							if (withFormats) {
								buffer.append(prefix);
								buffer.append('\t');
							}
							if (str == null) {
								buffer.append("null");
							} else {
								buffer.append('\"');
								buffer.append(str.replaceAll("\r", "\\r")
										.replaceAll("\n", "\\n")
										.replaceAll("\t", "\\t")
										.replaceAll("\'", "\\'")
										.replaceAll("\"", "\\\""));
								buffer.append('\"');
							}
							if (i != xs.length - 1) {
								buffer.append(',');
							}
							if (withFormats) {
								buffer.append("\r\n");
							}
						}
						if (withFormats) {
							buffer.append(prefix);
						}
						buffer.append(']');
					} else if (isSubclassOf(clazz, SimpleSerializable.class)) {
						SimpleSerializable[] xs = (SimpleSerializable[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append("\r\n");
						}
						for (int i = 0; i < xs.length; i++) {
							SimpleSerializable o = xs[i];
							if (withFormats) {
								buffer.append(prefix);
								buffer.append('\t');
							}
							if (o == null) {
								buffer.append("null");
							} else {
								int idx = -1;
								if (!this.jsonExpandMode()) {
									idx = ssObjs.indexOf(o);
								}
								if (idx != -1) {
									if (withFormats) {
										buffer.append("{ \"@\" : ");
										buffer.append(idx);
										buffer.append(" }");
									} else {
										buffer.append("{\"@\":");
										buffer.append(idx);
										buffer.append('}');
									}
								} else {
									ssObjs.add(o);
									buffer.append(o.jsonSerialize(null, ssObjs, withFormats, prefix + "\t"));
								}
							}
							if (i != xs.length - 1) {
								buffer.append(',');
							}
							if (withFormats) {
								buffer.append("\r\n");
							}
						}
						if (withFormats) {
							buffer.append(prefix);
						}
						buffer.append(']');
					} else if (clazz == long.class) {
						long[] xs = (long[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(',');
							}
							if (withFormats) {
								buffer.append(' ');
							}
						}
						buffer.append(']');
					} else if (clazz == boolean.class) {
						boolean[] xs = (boolean[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(',');
							}
							if (withFormats) {
								buffer.append(' ');
							}
						}
						buffer.append(']');
					} else if (clazz == float.class) {
						float[] xs = (float[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(',');
							}
							if (withFormats) {
								buffer.append(' ');
							}
						}
						buffer.append(']');
					} else if (clazz == double.class) {
						double[] xs = (double[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(',');
							}
							if (withFormats) {
								buffer.append(' ');
							}
						}
						buffer.append(']');
					} else if (clazz == short.class) {
						short[] xs = (short[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(',');
							}
							if (withFormats) {
								buffer.append(' ');
							}
						}
						buffer.append(']');
					} else if (clazz == byte.class) {
						byte[] xs = (byte[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
//						if (this.bytesCompactMode()) {
//							buffer.append('\"');
//							buffer.append(Base64.byteArrayToBase64(xs));
//							buffer.append('\"');
//							if (withFormats) {
//								buffer.append(".getBytes ()");
//							} else {
//								buffer.append(".getBytes()");
//							}
//						} else {
							buffer.append('[');
							if (withFormats) {
								buffer.append(' ');
							}
							for (int i = 0; i < xs.length; i++) {
								buffer.append(xs[i]);
								if (i != xs.length - 1) {
									buffer.append(',');
								}
								if (withFormats) {
									buffer.append(' ');
								}
							}
							buffer.append(']');
//						}
					} else if (clazz == char.class) {
						char[] xs = (char[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							char c = xs[i];
							buffer.append("\'");
							if (c == '\r') {
								buffer.append("\\r");
							} else if (c == '\n') {
								buffer.append("\\n");
							} else if (c == '\t') {
								buffer.append("\\t");
							} else if (c == '\'') {
								buffer.append("\\\'");
							} else if (c == '\"') {
								buffer.append("\\\"");
							} else {
								buffer.append(c);
							}
							buffer.append('\'');
							if (i != xs.length - 1) {
								buffer.append(',');
							}
							if (withFormats) {
								buffer.append(' ');
							}
						}
						buffer.append(']');
					} else {
						continue;
					}
				} else if (clazz.isEnum()) {
					Enum<?> e = (Enum<?>) field.get(this);
					if (e == null && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					if (e != null) {
						buffer.append(e.ordinal());
					} else {
						buffer.append("null");
					}
				} else if (clazz == float.class) {
					float f = field.getFloat(this);
					if (f == 0 && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(f);
				} else if (clazz == double.class) {
					double d = field.getDouble(this);
					if (d == 0 && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(d);
				} else if (clazz == short.class) {
					short s = field.getShort(this);
					if (s == 0 && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(s);
				} else if (clazz == byte.class) {
					byte b = field.getByte(this);
					if (b == 0 && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(b);
				} else if (clazz == char.class) {
					char c = field.getChar(this);
					if (c == 0 && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append('\'');
					if (c == '\r') {
						buffer.append("\\r");
					} else if (c == '\n') {
						buffer.append("\\n");
					} else if (c == '\t') {
						buffer.append("\\t");
					} else if (c == '\'') {
						buffer.append("\\\'");
					} else if (c == '\"') {
						buffer.append("\\\"");
					} else {
						buffer.append(c);
					}
					buffer.append('\'');
				} else {
					continue;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			buffer.append(',');
			if (withFormats) {
				buffer.append("\r\n");
			}
			commasAppended = true;
		}
		int length = buffer.length();
		if (commasAppended) {
			if (withFormats) {
				buffer.delete(length - 3, length);
				if (withFormats) {
					buffer.append("\r\n");
				}
			} else {
				buffer.delete(length - 1, length);
			}
		}
		if (withFormats) {
			buffer.append(linePrefix);
		}
    	buffer.append('}');

		return buffer.toString();
    }

    @J2SIgnore
	private void appendFieldName(StringBuffer buffer, String fieldName,
			boolean withFormats, String prefix) {
		if (withFormats) {
			buffer.append(prefix);
		}
		buffer.append('\"');
		buffer.append(fieldName);
		buffer.append('\"');
		if (withFormats) {
			buffer.append(' ');
		}
		buffer.append(':');
		if (withFormats) {
			buffer.append(' ');
		}
	}
    
	/**
	 * @param str
	 * @return whether given string is deserialized as expected or not
	 * 
	 * @j2sNative
var start = 0;
var ssObjs = null;
if (arguments.length >= 2) {
	start = arguments[1];
}
if (arguments.length >= 3) {
	ssObjs = arguments[2];
}
if (ssObjs == null) {
	ssObjs = [this];
}
var baseChar = 'B'.charCodeAt (0);
if (str == null || start < 0) return false;
var end = str.length;
var length = end - start;
if (length <= 7 || str.substring(start, start + 3) != "WLL") return false;
var index = str.indexOf('#', start);
if (index == -1) return false;
index++;
if (index >= end) return false; // may be empty string!

var size = 0;
var nextCharCode = str.charCodeAt(index);
if (nextCharCode >= 48 && nextCharCode <= 57) {
	var last = index;
	index = str.indexOf('$', last);
	if (index == -1) return false;
	var sizeStr = str.substring(last + 1, index);
	sizeStr = sizeStr.replace(/^0+/, '');
	if (sizeStr.length != 0) {
		try {
			size = parseInt(sizeStr);
		} catch (e) { }
	}
	// all fields are in their default values or no fields
	if (size == 0) return true;
	index++;
	if (index + size > end) return false; 
}

var fieldMap = [];
var fields = this.getClass ().declared$Fields;
if (fields != null) {
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];
		var name = field.name;
		fieldMap[name] = true;
	}
}
var objectEnd = index + size;
var fMap = this.fieldMapping ();
while (index < end && index < objectEnd) {
	var c1 = str.charCodeAt (index++);
	var l1 = c1 - baseChar;
	if (l1 < 0) return true;
	var fieldName = str.substring (index, index + l1);
	if (fMap != null && fMap.length > 1) {
		for (var i = 0; i < fMap.length / 2; i++) {
			if (fieldName == fMap[i + i + 1]) {
				var trueName = fMap[i + i];
				if (trueName != null && trueName.length > 0) {
					fieldName = trueName;
				}
				break;
			}
		}
	}
	var count = 0;
	while (!fieldMap[fieldName] && count++ <= 3) {
		fieldName = "$" + fieldName;
	}

	index += l1;
	var c2 = str.charAt (index++);
	if (c2 == 'A') {
		var field = fieldMap[fieldName];
		c2 = str.charAt(index++);
		var c3 = str.charCodeAt(index++);
		var l2 = c3 - baseChar;
		if (l2 < 0 && l2 != -2) {
			if (!fieldMap[fieldName]) {
				continue;
			}
			this[fieldName] = null;
		} else {
			if (l2 == -2) {
				var c4 = str.charCodeAt(index++);
				var l3 = c4 - baseChar;
				if (l3 < 0 || index + l3 > end) return true; // error
				l2 = parseInt(str.substring(index, index + l3));
				if (l2 < 0) return true; // error
				if (l2 > 0x1000000) { // 16 * 1024 * 1024
					throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
				}
				index += l3;
			}
			var arr = new Array (l2);
			var type = c2;
			for (var i = 0; i < l2; i++) {
				var s = null;
				var c4 = str.charCodeAt (index++);
				if (c2 != 'X' && c2 != 'O') {
					var l3 = c4 - baseChar;
					if (l3 > 0) {
						if (index + l3 > end) return true; // error
						s = str.substring (index, index + l3);
						index += l3;
					} else if (l3 == 0) {
						s = "";
					}
				} else {
					var c5 = str.charCodeAt (index++);
					var l3 = c5 - baseChar;
					if (l3 > 0) {
						if (index + l3 > end) return true; // error
						s = str.substring (index, index + l3);
						index += l3;
					} else if (l3 == 0) {
						s = "";
					} else if (l3 == -2) {
						var c6 = str.charCodeAt (index++);
						var l4 = c6 - baseChar;
						if (l4 < 0 || index + l4 > end) return true; // error
						var l5 = parseInt (str.substring( index, index + l4));
						index += l4;
						if (l5 < 0 || index + l5 > end) return true; // error
						s = str.substring (index, index + l5);
						index += l5;
					}
					if (c4 == 117) { // 'u'
						s = Encoding.readUTF8(Encoding.decodeBase64(s));
					} else if (c4 == 85) { // 85 'U'
						s = Encoding.readUTF8(s);
					}
				}
				if (type == 'I' || type == 'L') {
					arr[i] = parseInt (s);
				} else if (type == 'X') {
					arr[i] = s;
				} else if (type == 'O') {
					if (s != null && s.length > 0) {
						if (s.length > 3 && s.charAt (0) == 'W' && s.charAt (1) == 'L' && s.charAt (2) == 'L') {
							var ss = net.sf.j2s.ajax.SimpleSerializable.parseInstance (s);
							ssObjs[ssObjs.length] = ss;
							ss.deserialize (s, 0, ssObjs);
							arr[i] = ss;
						} else { // 'o'
							var idx = Integer.parseInt (s);
							var ss = null;
							if (idx < ssObjs.length) {
								ss = ssObjs[idx];
							}
							arr[i] = ss;
						}
					} else {
						arr[i] = null;
					}
				} else if (type == 'b') {
					arr[i] = (s.charAt (0) == '1' || s.charAt (0) == 't');
				} else if (type == 'F' || type == 'D') {
					arr[i] = parseFloat (s);
				} else if (type == 'S' || type == 'B') {
					arr[i] = parseInt (s);
				} else if (type == 'C') {
					arr[i] = String.fromCharCode (parseInt (s));
				}
			}
			if (!fieldMap[fieldName]) {
				continue;
			}
			this[fieldName] = arr;
		}
	} else {
		var c3 = str.charCodeAt (index++);
		var l2 = c3 - baseChar;
		var s = null;
		if (l2 > 0) {
			if (index + l2 > end) return true; // error
			s = str.substring (index, index + l2);
			index += l2;
		} else if (l2 == 0) {
			s = "";
		} else if (l2 == -2) {
			var c4 = str.charCodeAt(index++);
			var l3 = c4 - baseChar;
			if (l3 < 0 || index + l3 > end) return true; // error
			var l4 = parseInt(str.substring(index, index + l3));
			index += l3;
			if (l4 < 0 || index + l4 > end) return true; // error
			s = str.substring(index, index + l4);
			index += l4;
		}
		if (!fieldMap[fieldName]) {
			continue;
		}
		var type = c2;
		if (type == 'I' || type == 'L') {
			this[fieldName] = parseInt (s);
		} else if (type == 's') {
			this[fieldName] = s;
		} else if (type == 'b') {
			this[fieldName] = (s.charAt (0) == '1' || s.charAt (0) == 't');
		} else if (type == 'u') {
			this[fieldName] = Encoding.readUTF8(Encoding.decodeBase64(s));
		} else if (type == 'U') {
			this[fieldName] = Encoding.readUTF8(s);
		} else if (type == 'O') {
			var ss = net.sf.j2s.ajax.SimpleSerializable.parseInstance (s);
			ssObjs[ssObjs.length] = ss;
			ss.deserialize (s, 0, ssObjs);
			this[fieldName] = ss;
		} else if (type == 'o') {
			var idx = Integer.parseInt (s);
			var ss = null;
			if (idx < ssObjs.length) {
				ss = ssObjs[idx];
			}
			this[fieldName] = ss;
		} else if (type == 'F' || type == 'D') {
			this[fieldName] = parseFloat (s);
		} else if (type == 'S' || type == 'B') {
			this[fieldName] = parseInt (s);
		} else if (type == 'C') {
			this[fieldName] = String.fromCharCode (parseInt (s));
		}
	}
}
return true;
	 */
	public boolean deserialize(final String str) {
    	return deserialize(str, 0);
	}
	
    @J2SIgnore
	public boolean deserialize(final String str, int start) {
    	List<SimpleSerializable> ssObjs = new ArrayList<SimpleSerializable>();
    	ssObjs.add(this);
    	return deserialize(str, start, ssObjs);
	}
	
    @J2SIgnore
	private boolean deserialize(final String str, int start, List<SimpleSerializable> ssObjs) {
		char baseChar = 'B';
		if (str == null || start < 0) return false;
		int end = str.length();
		int length = end - start;
		if (length <= 7 || !("WLL".equals(str.substring(start, start + 3)))) return false; // Should throw exception!
		try {
			setSimpleVersion(Integer.parseInt(str.substring(start + 3, start + 6)));
		} catch (NumberFormatException e1) {
		}
		int index = str.indexOf('#', start);
		if (index == -1) return false; // Should throw exception!
		index++;
		if (index >= end) return false; // may be empty string!
		
		int size = 0;
		char nextChar = str.charAt(index);
		if (nextChar >= '0' && nextChar <= '9') {
			// have size!
			int last = index;
			index = str.indexOf('$', last);
			if (index == -1) return false; // Should throw exception!
			String sizeStr = null;
			for (int i = last + 1; i < index; i++) {
				char c = str.charAt(i);
				if (c != '0') {
					sizeStr = str.substring(i, index);
					break;
				}
			}
			if (sizeStr != null && sizeStr.length() != 0) {
				try {
					size = Integer.parseInt(sizeStr);
				} catch (NumberFormatException e) {
					return true; // error!
				}
			}
			// all fields are in their default values or no fields
			if (size == 0) return true;
			index++;
			// may be empty string or not enough string!
			if (index + size > end) return false;
		}
		
		Class<?> clazzType = this.getClass();
		Map<String, Field> fieldMap = getSerializableFields(clazzType.getName(), clazzType, false);
		int objectEnd = index + size;
		Map<String, String> fieldAliasMap = getSimpleVersion() >= 202 ? fieldAliasMapping() : null;
		String[] fMap = fieldAliasMap == null ? fieldMapping() : null;
		while (index < end && index < objectEnd) {
			char c1 = str.charAt(index++);
			int l1 = c1 - baseChar;
			if (l1 < 0 || index + l1 > end) return true; // error
			String fieldName = str.substring(index, index + l1);
			index += l1;
			if (fieldAliasMap != null) {
				String trueName = fieldAliasMap.get(fieldName);
				if (trueName != null && trueName.length() > 0) {
					fieldName = trueName;
				}
			} else if (fMap != null && fMap.length > 1) {
				for (int i = 0; i < fMap.length / 2; i++) {
					if (fieldName.equals(fMap[i + i + 1])) {
						String trueName = fMap[i + i];
						if (trueName != null && trueName.length() > 0) {
							fieldName = trueName;
						}
						break;
					}
				}
			}
			while (fieldName.startsWith("$")) {
				if (fieldMap.containsKey(fieldName)) {
					break;
				}
				fieldName = fieldName.substring(1);
			}
			char c2 = str.charAt(index++);
			if (c2 == 'A' || c2 == 'Z' || c2 == 'Y') {
				Field field = (Field) fieldMap.get(fieldName);
				c2 = str.charAt(index++);
				char c3 = str.charAt(index++);
				int l2 = c3 - baseChar;
				try {
					if (l2 < 0 && l2 != -2) {
						if (field == null) {
							continue;
						}
						field.set(this, null);
					} else {
						if (l2 == -2) {
							char c4 = str.charAt(index++);
							int l3 = c4 - baseChar;
							if (l3 < 0 || index + l3 > end) return true; // error
							l2 = Integer.parseInt(str.substring(index, index + l3));
							index += l3;
							if (l2 < 0) return true; // error
							if (l2 > 0x1000000) { // 16 * 1024 * 1024
								/*
								 * Some malicious string may try to allocate huge size of array!
								 * Limit the size of array here! 
								 */
								throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
							}
						}
						if (c2 == '8') { // byte[]
							if (index + l2 > end) return true; // error
							String byteStr = str.substring(index, index + l2);
							index += l2;
							if (field == null) {
								continue;
							}
							byte[] bs = byteStr.getBytes("iso-8859-1");
							field.set(this, bs);
							continue;
						}
						if (c2 == 'W') {
							field.set(this, null);
							continue;
						}
						if (c2 == 'Z' || c2 == 'Y' || c2 == 'Q') {
							Collection<Object> objCollection = null;
							if (c2 == 'Z') {
								objCollection = new ArrayList<Object>(l2);
							} else if (c2 == 'Y') {
								objCollection = new HashSet<Object>(l2);
							} else {
								objCollection = new LinkedList<Object>();
							}
							for (int i = 0; i < l2; i++) {
								DeserializeObject o = deserializeArrayItem(str, index, end, ssObjs);
								if (o == null || o.error) return true;
								objCollection.add(o.object);
								index = o.index;
							}
							field.set(this, objCollection);
							continue;
						} else if (c2 == 'M') {
							Map<Object, Object> objMap = new HashMap<Object, Object>(l2);
							for (int i = 0; i < l2 / 2; i++) {
								DeserializeObject key = deserializeArrayItem(str, index, end, ssObjs);
								if (key == null || key.error) return true;
								index = key.index;
								DeserializeObject value = deserializeArrayItem(str, index, end, ssObjs);
								if (value == null || value.error) return true;
								index = value.index;
								objMap.put(key.object, value.object);
							}
							field.set(this, objMap);
							continue;
						}
						String[] ss = new String[l2];
						for (int i = 0; i < l2; i++) {
							char c4 = str.charAt(index++);
							if (c2 != 'X' && c2 != 'O') {
								int l3 = c4 - baseChar;
								if (l3 > 0) {
									if (index + l3 > end) return true; // error
									ss[i] = str.substring(index, index + l3);
									index += l3;
								} else if (l3 == 0) {
									ss[i] = "";
								}
							} else {
								char c5 = str.charAt(index++);
								int l3 = c5 - baseChar;
								if (l3 > 0) {
									if (index + l3 > end) return true; // error
									ss[i] = str.substring(index, index + l3);
									index += l3;
								} else if (l3 == 0) {
									ss[i] = "";
								} else if (l3 == -2) {
									char c6 = str.charAt(index++);
									int l4 = c6 - baseChar;
									if (l4 < 0 || index + l4 > end) return true; // error
									int l5 = Integer.parseInt(str.substring(index, index + l4));
									index += l4;
									if (l5 < 0 || index + l5 > end) return true; // error
									ss[i] = str.substring(index, index + l5);
									index += l5;
								} else {
									continue;
								}
								if (c4 == 'u') {
									ss[i] = new String(Base64.base64ToByteArray(ss[i]), "utf-8");
								} else if (c4 == 'U') {
									ss[i] = new String(ss[i].getBytes("iso-8859-1"), "utf-8");
								} else if (c4 != 'O') {
									ss[i] = new String(ss[i].getBytes("iso-8859-1"), "utf-8");
								}
							}
						}
						if (field == null) {
							continue;
						}
						switch (c2) {
						case 'I': {
							int[] ns = new int[l2];
							for (int i = 0; i < l2; i++) {
								if (ss[i] != null) {
									ns[i] = Integer.parseInt(ss[i]);
								}
							}
							field.set(this, ns);
							break;
						}
						case 'X':
							field.set(this, ss);
							break;
						case 'O': {
							Class<?> fieldClazz = field.getType();
							SimpleSerializable[] sss = (SimpleSerializable[]) Array.newInstance(fieldClazz.getComponentType(), l2);
							for (int i = 0; i < l2; i++) {
								String s = ss[i];
								if (s != null && s.length() > 0) {
									if (s.startsWith("WLL")) {
										SimpleSerializable ssObj = SimpleSerializable.parseInstance(s);
										ssObjs.add(ssObj);
										ssObj.deserialize(s, 0, ssObjs);
										sss[i] = ssObj;
									} else { // 'o'
										int idx = Integer.parseInt(s);
										if (idx < ssObjs.size()) {
											sss[i] = ssObjs.get(idx);
										}
									}
								}
							}
							field.set(this, sss);
							break;
						}
						case 'L': {
							long[] ls = new long[l2];
							for (int i = 0; i < l2; i++) {
								if (ss[i] != null) {
									ls[i] = Long.parseLong(ss[i]);
								}
							}
							field.set(this, ls);
							break;
						}
						case 'b': {
							boolean[] bs = new boolean[l2];
							for (int i = 0; i < l2; i++) {
								if (ss[i] != null && ss[i].length() > 0) {
									char c = ss[i].charAt(0);
									bs[i] = (c == '1' || c == 't');
								}
							}
							field.set(this, bs);
							break;
						}
						case 'F': {
							float[] fs = new float[l2];
							for (int i = 0; i < l2; i++) {
								if (ss[i] != null) {
									fs[i] = Float.parseFloat(ss[i]);
								}
							}
							field.set(this, fs);
							break;
						}
						case 'D': {
							double[] ds = new double[l2];
							for (int i = 0; i < l2; i++) {
								if (ss[i] != null) {
									ds[i] = Double.parseDouble(ss[i]);
								}
							}
							field.set(this, ds);
							break;
						}
						case 'S': {
							short[] sts = new short[l2];
							for (int i = 0; i < l2; i++) {
								if (ss[i] != null) {
									sts[i] = Short.parseShort(ss[i]);
								}
							}
							field.set(this, sts);
							break;
						}
						case 'B': {
							byte[] bs = new byte[l2];
							for (int i = 0; i < l2; i++) {
								if (ss[i] != null) {
									bs[i] = Byte.parseByte(ss[i]);
								}
							}
							field.set(this, bs);
							break;
						}
						case 'C': {
							char[] cs = new char[l2];
							for (int i = 0; i < l2; i++) {
								if (ss[i] != null) {
									cs[i] = (char) Integer.parseInt(ss[i]);
								}
							}
							field.set(this, cs);
							break;
						}
						}
					}
				} catch (Exception e) {
					System.out.println("Parsing: " + str);
					e.printStackTrace();
				}
			} else {
				char c3 = str.charAt(index++);
				int l2 = c3 - baseChar;
				String s = null;
				if (l2 > 0) {
					if (index + l2 > end) return true; // error
					s = str.substring(index, index + l2);
					index += l2;
				} else if (l2 == 0) {
					s = "";
				} else if (l2 == -2) {
					char c4 = str.charAt(index++);
					int l3 = c4 - baseChar;
					if (l3 < 0 || index + l3 > end) return true; // error
					int l4 = Integer.parseInt(str.substring(index, index + l3));
					index += l3;
					if (l4 < 0 || index + l4 > end) return true; // error
					s = str.substring(index, index + l4);
					index += l4;
				}
				Field field = (Field) fieldMap.get(fieldName);
				if (field == null) {
					continue;
				}
				try {
					switch (c2) {
					case 'I':
						field.setInt(this, Integer.parseInt(s));
						break;
					case 's':
						field.set(this, s);
						break;
					case 'L':
						field.setLong(this, Long.parseLong(s));
						break;
					case 'b': {
						char c = s.charAt(0);
						field.setBoolean(this, c == '1' || c == 't');
						break;
					}
					case 'O': {
						SimpleSerializable ss = SimpleSerializable.parseInstance(s);
						ssObjs.add(ss);
						ss.deserialize(s, 0, ssObjs);
						field.set(this, ss);
						break;
					}
					case 'o': {
						int idx = Integer.parseInt(s);
						SimpleSerializable ss = null;
						if (idx < ssObjs.size()) {
							ss = ssObjs.get(idx);
						}
						field.set(this, ss);
						break;
					}
					case 'u':
						s = new String(Base64.base64ToByteArray(s), "utf-8");
						field.set(this, s);
						break;
					case 'U':
						s = new String(s.getBytes("iso-8859-1"), "utf-8");
						field.set(this, s);
						break;
					case 'E':
						if (s != null && s.length() > 0) {
							Object eo = null;
							try {
								int v = Integer.parseInt(s);
								Enum<?>[] enumConstants = (Enum<?> []) field.getType().getEnumConstants();
								for (int i = 0; i < enumConstants.length; i++) {
									if (enumConstants[i].ordinal() == v) {
										eo = enumConstants[i];
										break;
									}
								}
							} catch (Exception e) {
							}
							field.set(this, eo);
						} else {
							field.set(this, null);
						}
						break;
					case 'F':
						field.setFloat(this, Float.parseFloat(s));
						break;
					case 'D':
						field.setDouble(this, Double.parseDouble(s));
						break;
					case 'S':
						field.setShort(this, Short.parseShort(s));
						break;
					case 'B':
						field.setByte(this, Byte.parseByte(s));
						break;
					case 'C':
						field.setChar(this, (char) Integer.parseInt(s));
						break;
					}
				} catch (Exception e) {
					System.out.println("Parsing: " + s + "\r\n" + str);
					e.printStackTrace();
				}
			}
		}
		return true;
	}

    @J2SIgnore
    private DeserializeObject deserializeArrayItem(String str, int index, int end, List<SimpleSerializable> ssObjs) {
    	char baseChar = 'B';
		char c2 = str.charAt(index++);
		if (c2 == 'A' || c2 == 'Z' || c2 == 'Y') {
			c2 = str.charAt(index++);
			char c3 = str.charAt(index++);
			int l2 = c3 - baseChar;
			try {
				if (l2 < 0 && l2 != -2) {
					return new DeserializeObject(null, index, false);
				} else {
					if (l2 == -2) {
						char c4 = str.charAt(index++);
						int l3 = c4 - baseChar;
						if (l3 < 0 || index + l3 > end) return new DeserializeObject(null, index, true); // error
						l2 = Integer.parseInt(str.substring(index, index + l3));
						index += l3;
						if (l2 < 0) return new DeserializeObject(null, index, true); // error
						if (l2 > 0x1000000) { // 16 * 1024 * 1024
							/*
							 * Some malicious string may try to allocate huge size of array!
							 * Limit the size of array here! 
							 */
							throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
						}
					}
					if (c2 == '8') { // byte[]
						if (index + l2 > end) return new DeserializeObject(null, index, true); // error
						String byteStr = str.substring(index, index + l2);
						index += l2;
						byte[] bs = byteStr.getBytes("iso-8859-1");
						return new DeserializeObject(bs, index, false);
					}
					if (c2 == 'Z' || c2 == 'Y' || c2 == 'Q') {
						Collection<Object> objCollection = null;
						if (c2 == 'Z') {
							objCollection = new ArrayList<Object>(l2);
						} else if (c2 == 'Y') {
							objCollection = new HashSet<Object>(l2);
						} else {
							objCollection = new LinkedList<Object>();
						}
						for (int i = 0; i < l2; i++) {
							DeserializeObject o = deserializeArrayItem(str, index, end, ssObjs);
							if (o == null || o.error) return new DeserializeObject(null, index, true);;
							objCollection.add(o.object);
							index = o.index;
						}
						return new DeserializeObject(objCollection, index, false);
					} else if (c2 == 'M') {
						Map<Object, Object> objMap = new HashMap<Object, Object>(l2);
						for (int i = 0; i < l2 / 2; i++) {
							DeserializeObject key = deserializeArrayItem(str, index, end, ssObjs);
							if (key == null || key.error) return new DeserializeObject(null, index, true);;
							index = key.index;
							DeserializeObject value = deserializeArrayItem(str, index, end, ssObjs);
							if (value == null || value.error) return new DeserializeObject(null, index, true);;
							index = value.index;
							objMap.put(key.object, value.object);
						}
						return new DeserializeObject(objMap, index, false);
					}
					String[] ss = new String[l2];
					for (int i = 0; i < l2; i++) {
						char c4 = str.charAt(index++);
						if (c2 != 'X' && c2 != 'O') {
							int l3 = c4 - baseChar;
							if (l3 > 0) {
								if (index + l3 > end) return new DeserializeObject(null, index, true); // error
								ss[i] = str.substring(index, index + l3);
								index += l3;
							} else if (l3 == 0) {
								ss[i] = "";
							}
						} else {
							char c5 = str.charAt(index++);
							int l3 = c5 - baseChar;
							if (l3 > 0) {
								if (index + l3 > end) return new DeserializeObject(null, index, true); // error
								ss[i] = str.substring(index, index + l3);
								index += l3;
							} else if (l3 == 0) {
								ss[i] = "";
							} else if (l3 == -2) {
								char c6 = str.charAt(index++);
								int l4 = c6 - baseChar;
								if (l4 < 0 || index + l4 > end) return new DeserializeObject(null, index, true); // error
								int l5 = Integer.parseInt(str.substring(index, index + l4));
								index += l4;
								if (l5 < 0 || index + l5 > end) return new DeserializeObject(null, index, true); // error
								ss[i] = str.substring(index, index + l5);
								index += l5;
							} else {
								continue;
							}
							if (c4 == 'u') {
								ss[i] = new String(Base64.base64ToByteArray(ss[i]), "utf-8");
							} else if (c4 == 'U') {
								ss[i] = new String(ss[i].getBytes("iso-8859-1"), "utf-8");
							} else if (c4 != 'O') {
								ss[i] = new String(ss[i].getBytes("iso-8859-1"), "utf-8");
							}
						}
					}
					switch (c2) {
					case 'I': {
						int[] ns = new int[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								ns[i] = Integer.parseInt(ss[i]);
							}
						}
						return new DeserializeObject(ns, index, false);
					}
					case 'X':
						return new DeserializeObject(ss, index, false);
					case 'O': {
						SimpleSerializable[] sss = (SimpleSerializable[]) Array.newInstance(SimpleSerializable.class, l2);
						for (int i = 0; i < l2; i++) {
							String s = ss[i];
							if (s != null && s.length() > 0) {
								if (s.startsWith("WLL")) {
									SimpleSerializable ssObj = SimpleSerializable.parseInstance(s);
									ssObjs.add(ssObj);
									ssObj.deserialize(s, 0, ssObjs);
									sss[i] = ssObj;
								} else { // 'o'
									int idx = Integer.parseInt(s);
									if (idx < ssObjs.size()) {
										sss[i] = ssObjs.get(idx);
									}
								}
							}
						}
						return new DeserializeObject(sss, index, false);
					}
					case 'L': {
						long[] ls = new long[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								ls[i] = Long.parseLong(ss[i]);
							}
						}
						return new DeserializeObject(ls, index, false);
					}
					case 'b': {
						boolean[] bs = new boolean[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null && ss[i].length() > 0) {
								char c = ss[i].charAt(0);
								bs[i] = (c == '1' || c == 't');
							}
						}
						return new DeserializeObject(bs, index, false);
					}
					case 'F': {
						float[] fs = new float[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								fs[i] = Float.parseFloat(ss[i]);
							}
						}
						return new DeserializeObject(fs, index, false);
					}
					case 'D': {
						double[] ds = new double[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								ds[i] = Double.parseDouble(ss[i]);
							}
						}
						return new DeserializeObject(ds, index, false);
					}
					case 'S': {
						short[] sts = new short[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								sts[i] = Short.parseShort(ss[i]);
							}
						}
						return new DeserializeObject(sts, index, false);
					}
					case 'B': {
						byte[] bs = new byte[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								bs[i] = Byte.parseByte(ss[i]);
							}
						}
						return new DeserializeObject(bs, index, false);
					}
					case 'C': {
						char[] cs = new char[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								cs[i] = (char) Integer.parseInt(ss[i]);
							}
						}
						return new DeserializeObject(cs, index, false);
					}
					default :
						return new DeserializeObject(null, index, false);
					}
				}
			} catch (Exception e) {
				System.out.println("Parsing: " + str);
				e.printStackTrace();
			}
		} else {
			char c3 = str.charAt(index++);
			int l2 = c3 - baseChar;
			String s = null;
			if (l2 > 0) {
				if (index + l2 > end) return new DeserializeObject(null, index, true); // error
				s = str.substring(index, index + l2);
				index += l2;
			} else if (l2 == 0) {
				s = "";
			} else if (l2 == -2) {
				char c4 = str.charAt(index++);
				int l3 = c4 - baseChar;
				if (l3 < 0 || index + l3 > end) return new DeserializeObject(null, index, true); // error
				int l4 = Integer.parseInt(str.substring(index, index + l3));
				index += l3;
				if (l4 < 0 || index + l4 > end) return new DeserializeObject(null, index, true); // error
				s = str.substring(index, index + l4);
				index += l4;
			}
			try {
				switch (c2) {
				case 'I':
					return new DeserializeObject(Integer.valueOf(s), index, false);
				case 's':
					return new DeserializeObject(s, index, false);
				case 'L':
					return new DeserializeObject(Long.valueOf(s), index, false);
				case 'b': {
					char c = s.charAt(0);
					return new DeserializeObject(Boolean.valueOf(c == '1' || c == 't'), index, false);
				}
				case 'O': 
					if (s != null) {
						SimpleSerializable ss = SimpleSerializable.parseInstance(s);
						ssObjs.add(ss);
						ss.deserialize(s, 0, ssObjs);
						return new DeserializeObject(ss, index, false);
					} else {
						return new DeserializeObject(null, index, false);
					}
				case 'o': {
					int idx = Integer.parseInt(s);
					SimpleSerializable ss = null;
					if (idx < ssObjs.size()) {
						ss = ssObjs.get(idx);
					}
					return new DeserializeObject(ss, index, false);
				}
				case 'u':
					s = new String(Base64.base64ToByteArray(s), "utf-8");
					return new DeserializeObject(s, index, false);
				case 'U':
					s = new String(s.getBytes("iso-8859-1"), "utf-8");
					return new DeserializeObject(s, index, false);
				case 'E':
					if (s != null && s.length() > 0) {
						Object eo = null;
//						try {
//							int v = Integer.parseInt(s);
//							Enum<?>[] enumConstants = (Enum<?> []) field.getType().getEnumConstants();
//							for (int i = 0; i < enumConstants.length; i++) {
//								if (enumConstants[i].ordinal() == v) {
//									eo = enumConstants[i];
//									break;
//								}
//							}
//						} catch (Exception e) {
//						}
						return new DeserializeObject(eo, index, false);
					} else {
						return new DeserializeObject(null, index, false);
					}
				case 'F':
					return new DeserializeObject(Float.valueOf(s), index, false);
				case 'D':
					return new DeserializeObject(Double.valueOf(s), index, false);
				case 'S':
					return new DeserializeObject(Short.valueOf(s), index, false);
				case 'B':
					return new DeserializeObject(Byte.valueOf(s), index, false);
				case 'C':
					return new DeserializeObject(Character.valueOf((char) Integer.parseInt(s)), index, false);
				default:
					return new DeserializeObject(null, index, false);
				}
			} catch (Exception e) {
				System.out.println("Parsing: " + s + "\r\n" + str);
				e.printStackTrace();
			}
		}
		return new DeserializeObject(null, index, false);
    }
    
    @J2SIgnore
    public static SimpleSerializable parseInstance(Map<String, Object> properties) {
		String clazzName = (String)properties.get("class");
		if (clazzName == null) {
			return null;
		}
		Object inst = SimpleClassLoader.loadSimpleInstance(clazzName);
		if (inst != null && inst instanceof SimpleSerializable) {
			return (SimpleSerializable) inst;
		}
		return UNKNOWN;
    }
    
    @J2SIgnore
    public void deserialize(Map<String, Object> properties) {
		String clazzName = (String) properties.get("class");
		Map<String, Field> fieldMap = getSerializableFields(clazzName, this.getClass(), false);
		String[] fMap = fieldMapping();
		for (Iterator<String> itr = properties.keySet().iterator(); itr.hasNext();) {
			String fieldName = (String) itr.next();
			if ("class".equalsIgnoreCase(fieldName)) {
				continue;
			}
			Object o = properties.get(fieldName);
			if (fMap != null && fMap.length > 1) {
				for (int i = 0; i < fMap.length / 2; i++) {
					if (fieldName.equals(fMap[i + i + 1])) {
						String trueName = fMap[i + i];
						if (trueName != null && trueName.length() > 0) {
							fieldName = trueName;
						}
						break;
					}
				}
			}
			while (fieldName.startsWith("$")) {
				if (fieldMap.containsKey(fieldName)) {
					break;
				}
				fieldName = fieldName.substring(1);
			}
			Field field = fieldMap.get(fieldName);
			if (field == null) {
				continue;
			}
			Class<?> clazz = field.getType();
			try {
				if (clazz == int.class) {
					field.setInt(this, Integer.parseInt((String) o));
				} else if (clazz == String.class) {
					field.set(this, o);
				} else if (clazz == long.class) {
					field.setLong(this, Long.parseLong((String) o));
				} else if (clazz == boolean.class) {
					String s = (String) o;
					char c = s.length() > 0 ? s.charAt(0) : '\0';
					field.setBoolean(this, c == '1' || c == 't');
				} else if (clazz.isArray()) {
					clazz = clazz.getComponentType();
					if (o instanceof String) {
						if (clazz != byte.class) {
							continue; // not list 
						}
					}
					if (clazz == int.class) {
						List<?> list = (List<?>) o;
						int size = list.size();
						int[] xs = new int[size];
						for (int i = 0; i < xs.length; i++) {
							String s = (String) list.get(i);
							if (s != null && s.length() > 0) {
								xs[i] = Integer.parseInt(s);
							}
						}
						field.set(this, xs);
					} else if (clazz == String.class) {
						List<?> list = (List<?>) o;
						int size = list.size();
						String[] xs = new String[size];
						for (int i = 0; i < xs.length; i++) {
							String s = (String) list.get(i);
							xs[i] = s;
						}
						field.set(this, xs);
					} else if (clazz == long.class) {
						List<?> list = (List<?>) o;
						int size = list.size();
						long[] xs = new long[size];
						for (int i = 0; i < xs.length; i++) {
							String s = (String) list.get(i);
							if (s != null && s.length() > 0) {
								xs[i] = Long.parseLong(s);
							}
						}
						field.set(this, xs);
					} else if (clazz == boolean.class) {
						List<?> list = (List<?>) o;
						int size = list.size();
						boolean[] xs = new boolean[size];
						for (int i = 0; i < xs.length; i++) {
							String s = (String) list.get(i);
							if (s != null) {
								char c = s.length() > 0 ? s.charAt(0) : '\0';
								xs[i] = c == '1' || c == 't';
							}
						}
						field.set(this, xs);
					} else if (clazz == float.class) {
						List<?> list = (List<?>) o;
						int size = list.size();
						float[] xs = new float[size];
						for (int i = 0; i < xs.length; i++) {
							String s = (String) list.get(i);
							if (s != null && s.length() > 0) {
								xs[i] = Float.parseFloat(s);
							}
						}
						field.set(this, xs);
					} else if (clazz == double.class) {
						List<?> list = (List<?>) o;
						int size = list.size();
						double[] xs = new double[size];
						for (int i = 0; i < xs.length; i++) {
							String s = (String) list.get(i);
							if (s != null && s.length() > 0) {
								xs[i] = Double.parseDouble(s);
							}
						}
						field.set(this, xs);
					} else if (clazz == short.class) {
						List<?> list = (List<?>) o;
						int size = list.size();
						short[] xs = new short[size];
						for (int i = 0; i < xs.length; i++) {
							String s = (String) list.get(i);
							if (s != null && s.length() > 0) {
								xs[i] = Short.parseShort(s);
							}
						}
						field.set(this, xs);
					} else if (clazz == byte.class) {
						if (o instanceof String) {
							field.set(this, Base64.base64ToByteArray((String) o));
						} else {
							List<?> list = (List<?>) o;
							int size = list.size();
							byte[] xs = new byte[size];
							for (int i = 0; i < xs.length; i++) {
								String s = (String) list.get(i);
								if (s != null && s.length() > 0) {
									xs[i] = Byte.parseByte(s);
								}
							}
							field.set(this, xs);
						}
					} else if (clazz == char.class) {
						List<?> list = (List<?>) o;
						int size = list.size();
						char[] xs = new char[size];
						for (int i = 0; i < xs.length; i++) {
							String s = (String) list.get(i);
							if (s != null && s.length() > 0) {
								xs[i] = s.charAt(0);
							}
						}
						field.set(this, xs);
					}
				} else if (clazz.isEnum()) {
					Object eo = null;
					if (o != null && o instanceof String && ((String) o).length() > 0) {
						try {
							int v = Integer.parseInt((String) o);
							Enum<?>[] enumConstants = (Enum<?> []) clazz.getEnumConstants();
							for (int i = 0; i < enumConstants.length; i++) {
								if (enumConstants[i].ordinal() == v) {
									eo = enumConstants[i];
									break;
								}
							}
						} catch (Exception e) {
						}
					}
					field.set(this, eo);
				} else if (clazz == float.class) {
					field.setFloat(this, Float.parseFloat((String) o));
				} else if (clazz == double.class) {
					field.setDouble(this, Double.parseDouble((String) o));
				} else if (clazz == short.class) {
					field.setShort(this, Short.parseShort((String) o));
				} else if (clazz == byte.class) {
					field.setByte(this, Byte.parseByte((String) o));
				} else if (clazz == char.class) {
					field.setChar(this, (char) Integer.parseInt((String) o));
				}
			} catch (Exception e) {
				System.out.println("Parsing: " + o + " for field " + fieldName +  "\r\n");
				e.printStackTrace();
			}
		}
    }
    
    /**
     * Fields with alias names.
     * Field name -> Alias
     * @return
     */
    @J2SIgnore
    protected Map<String, String> fieldNameMapping() {
    	return null;
    }
    
    /**
     * Fields with alias names.
     * Alias -> Field name
     * @return
     */
    @J2SIgnore
    protected Map<String, String> fieldAliasMapping() {
    	return null;
    }
    
    /**
     * Fields with alias names.
     * @return
     */
    protected String[] fieldMapping() {
    	return null;
    }

    /**
     * Convert #fieldMapping into #fieldAliasMapping or #fieldNameMapping.
     * 
     * @param array, array with string in order of field, alias, field, alias ...
     * @param reversed, true for #fieldAliasMapping, false for fieldNameMapping
     * @return
     */
    @J2SIgnore
    public static Map<String, String> mappingFromArray(String[] array, boolean reversed) {
    	if (array == null || array.length <= 0) {
    		return null;
    	}
    	Map<String, String> mapping = new HashMap<String, String>(array.length);
    	for (int i = 0; i < array.length / 2; i++) {
			String name = array[i + i];
			String alias = array[i + i + 1];
			if (name == null || alias == null) {
				continue;
			}
			if (reversed) {
				mapping.put(alias, name);
			} else {
				mapping.put(name, alias);
			}
		}
    	return mapping;
    }
    
    /**
     * Fields to be ignored while differences are being calculated.
     * @return
     */
    protected String[] fieldDiffIgnored() {
    	return null;
    }

    protected boolean stringsASCIIEncoded() {
    	return false;
    }
    
    protected boolean bytesCompactMode() {
    	return BYTES_COMPACT_MODE;
    }
    
	/**
	 * Override Object@clone, so this object can be cloned.
	 */
    @J2SIgnore
	public Object clone() throws CloneNotSupportedException {
		SimpleSerializable clone = (SimpleSerializable) super.clone();
		clone.simpleVersion = simpleVersion;
		
		Class<? extends SimpleSerializable> clazz = this.getClass();
		Map<String, Field> fields = getSerializableFields(clazz.getName(), clazz, false);
		for (Iterator<Field> itr = fields.values().iterator(); itr.hasNext();) {
			Field field = (Field) itr.next();
			Class<?> type = field.getType();
			if (!type.isArray()) {
				continue; // already clone in super.clone
			}
			Object value = null;
			try {
				value = field.get(this);
			} catch (Exception e1) {
				//e1.printStackTrace();
			}
			if (value != null) {
				Object cloneArr = null;
				if (type == int[].class) {
					cloneArr = ((int[]) value).clone();
				} else if (type == byte[].class) {
					cloneArr = ((byte[]) value).clone();
				} else if (type == String[].class) {
					cloneArr = ((String[]) value).clone();
				} else if (type == Object[].class) {
					cloneArr = ((Object[]) value).clone();
				} else if (type == long[].class) {
					cloneArr = ((long[]) value).clone();
				} else if (type == boolean[].class) {
					cloneArr = ((boolean[]) value).clone();
				} else if (type == float[].class) {
					cloneArr = ((float[]) value).clone();
				} else if (type == double[].class) {
					cloneArr = ((double[]) value).clone();
				} else if (type == short[].class) {
					cloneArr = ((short[]) value).clone();
				} else if (type == char[].class) {
					cloneArr = ((char[]) value).clone();
				}
				try {
					field.set(clone, cloneArr);
				} catch (Exception e) {
					//e.printStackTrace();
				}
			}
		}
		return clone;
	}
	
	/**
	 * Get SimpleSerializable instance according to the given string. 
	 * 
	 * @param str String that is from POST data or GET query
	 * @return SimpleRPCRunnable instance. If request is bad request or 
	 * specified class name is invalid, null will be returned.
	 * 
	 * @j2sNative
var start = 0;
if (arguments.length == 2) {
	start = arguments[1];
}
if (str == null || start < 0) return null;
var length = str.length - start;
if (length <= 7 || str.substring(start, start + 3) != "WLL") return null;
var index = str.indexOf('#', start);
if (index == -1) return null;
var clazzName = str.substring(start + 6, index);
clazzName = clazzName.replace (/\$/g, '.');
var runnableClass = null;
if (Clazz.isClassDefined (clazzName)) {
	runnableClass = Clazz.evalType (clazzName);
}
if (runnableClass != null) {
	var obj = new runnableClass (Clazz.inheritArgs);
	if (obj != null && Clazz.instanceOf (obj,
			net.sf.j2s.ajax.SimpleSerializable)) {
		return obj;
	}
}
return net.sf.j2s.ajax.SimpleSerializable.UNKNOWN;
	 */
	public static SimpleSerializable parseInstance(String str) {
		return parseInstance(str, 0, null);
	}
	
	/**
	 * Get SimpleSerializable instance according to the given string, 
	 * starting from the given index. 
	 * 
	 * @param str
	 * @param start
	 * @return
	 */
    @J2SIgnore // Already implemented in previous method!
	public static SimpleSerializable parseInstance(String str, int start) {
		return parseInstance(str, start, null);
	}
	
	/**
	 * Get SimpleSerializable instance according to the given string and the filter. 
	 * 
	 * @param str String that is from POST data or GET query  
	 * @param filter SimpleFilter is used to filter out those invalid class name
	 * @return SimpleRPCRunnable instance. If request is bad request or 
	 * specified class name is invalid, null will be returned.
	 */
    @J2SIgnore // Only public to Java!
    public static SimpleSerializable parseInstance(String str, SimpleFilter filter) {
		return parseInstance(str, 0, filter);
	}
	
	/**
	 * Get SimpleSerializable instance according to the given string starting from
	 * the given index and the filter. 
	 * 
	 * @param str
	 * @param filter
	 * @return
	 */
    @J2SIgnore // Only public to Java!
	public static SimpleSerializable parseInstance(String str, int start, SimpleFilter filter) {
		if (str == null || start < 0) return null;
		int length = str.length() - start;
		if (length <= 7 || !("WLL".equals(str.substring(start, start + 3)))) return null;
		int v = 0;
		try {
			v = Integer.parseInt(str.substring(start + 3, start + 6));
		} catch (NumberFormatException e1) {
		}
		int index = str.indexOf('#', start);
		if (index == -1) return null;
		String clazzName = str.substring(start + 6, index);
		if (v >= 202) {
			String longClazzName = classAliasMappings.get(clazzName);
			if (longClazzName != null) {
				clazzName = longClazzName;
			}
		}
		if (filter != null) {
			if (!filter.accept(clazzName)) return null;
		}
		Object inst = SimpleClassLoader.loadSimpleInstance(clazzName);
		if (inst != null && inst instanceof SimpleSerializable) {
			SimpleSerializable ss = (SimpleSerializable) inst;
			if (v >= 202) {
				ss.classNameAbbrev = !clazzName.equals(str.substring(start + 6, index));
			}
			return ss;
		}
		return UNKNOWN;
	}

    @J2SIgnore
    static void removeCachedClassFields(String clazzName) {
    	synchronized (mutex) {
			// Will force update cached fields in next time retrieving fields
			quickFields.remove(clazzName);
			expiredClasses.add(clazzName);
		}
    }
    
}
