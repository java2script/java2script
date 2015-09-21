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

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.nio.charset.Charset;
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
	
	public static final SimpleSerializable UNKNOWN = new SimpleSerializable();
	
	public static final SimpleSerializable ERROR = new SimpleSerializable(); // Used to indicate that format error!
	
	@J2SIgnore
	public static SimpleFactory fallbackFactory = null;

	public static boolean BYTES_COMPACT_MODE = false;

	public static boolean JSON_EXPAND_MODE = true;

	public static int LATEST_SIMPLE_VERSION = 202;
	
	@J2SIgnore
	private static Object mutex = new Object();
	@J2SIgnore
	private static Map<Class<?>, Map<String, Field>> quickFields = new HashMap<Class<?>, Map<String, Field>>();
	
	@J2SIgnore
	private static Object classMutex = new Object();
	@J2SIgnore
	private static Map<String, String> classNameMappings = new HashMap<String, String>();
	@J2SIgnore
	private static Map<String, String> classAliasMappings = new HashMap<String, String>();
	@J2SIgnore
	private static Set<String> classMissed = new HashSet<String>();
	
	@J2SIgnore
	public static Charset UTF_8 = Charset.forName("UTF-8");
	
	@J2SIgnore
	public static Charset ISO_8859_1 = Charset.forName("ISO-8859-1");
	
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
	protected static class DeserializeObject {
		public Object object;
		public int index;
		
		public DeserializeObject(Object object, int index) {
			super();
			this.object = object;
			this.index = index;
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
	public static boolean removeMissedClassName(String clazzName) {
		synchronized (classMutex) {
			return classMissed.remove(clazzName);
		}
	}
	
	@J2SIgnore
	public static void clearAllMissedClasses() {
		synchronized (classMutex) {
			classMissed.clear();
		}
	}
	
    @J2SIgnore
	static Map<String, Field> getSerializableFields(String clazzName, Class<?> clazz) {
		Map<String, Field> fields = quickFields.get(clazz);
		if (fields == null) {
			fields = new HashMap<String, Field>();
			Class<?> oClazz = clazz;
			while (oClazz != null && !"net.sf.j2s.ajax.SimpleSerializable".equals(oClazz.getName())) {
				Field[] clazzFields = oClazz.getDeclaredFields();
				for (int i = 0; i < clazzFields.length; i++) {
					Field f = clazzFields[i];
					int modifiers = f.getModifiers();
					if ((modifiers & Modifier.PUBLIC) != 0
							&& (modifiers & (Modifier.TRANSIENT | Modifier.STATIC)) == 0) {
						fields.put(f.getName(), f);
					}
				}
				oClazz = oClazz.getSuperclass();
			}
			synchronized (mutex) {
				quickFields.put(clazz, fields);
			}
		}
		return fields;
	}

    @J2SIgnore
    public long estimateSize() {
    	return 8192;
    }

    @J2SIgnore
    public long estimateSize(SimpleFilter filter) {
    	return 8192;
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
var builder = [];
builder[0] = "WLL201";
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
builder[1] = clazzName;
builder[2] = '#';
builder[3] = "00000000$";
var headSize = builder.join ('').length;

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
		builder[builder.length] = nameStr;
		builder[builder.length] = type;
		var value = null;
		if (type == 'b') {
			value = (this[name] == true) ? "1" : "0";
		} else {
			value = "" + this[name];
		}
		builder[builder.length] = String.fromCharCode (baseChar + value.length);
		builder[builder.length] = value;
	} else if (type == 's') {
		if (ignoring && this[name] == null) {
			continue;
		}
		builder[builder.length] = nameStr;
		this.serializeString(builder, this[name]);
	} else if (type == 'O') {
		if (ignoring && this[name] == null) {
			continue;
		}
		builder[builder.length] = nameStr;
		this.serializeObject(builder, this[name], ssObjs);
	} else if (type.charAt (0) == 'A') {
		if (this[name] == null) {
			if (ignoring) {
				continue;
			}
			builder[builder.length] = nameStr;
			builder[builder.length] = "A"; //String.fromCharCode (baseChar - 1);
		} else {
			builder[builder.length] = nameStr;
			builder[builder.length] = type;
			var l4 = this[name].length;
			if (l4 > 52) {
				if (l4 > 0x1000000) { // 16 * 1024 * 1024
					throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
				}
				builder[builder.length] = "@"; //String.fromCharCode (baseChar - 2);
				var value = "" + l4;
				builder[builder.length] = String.fromCharCode (baseChar + value.length);
				builder[builder.length] = value;
			} else {
				builder[builder.length] = String.fromCharCode (baseChar + l4);
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
					builder[builder.length] = String.fromCharCode (baseChar + value.length);
					builder[builder.length] = value;
				} else if (t == 'X') {
					this.serializeString (builder, arr[j]);
				} else if (t == 'O') {
					this.serializeObject (builder, arr[j], ssObjs);
				} else if (t == 'C') {
					var value = "";
					if (typeof arr[j] == 'number') {
						value += arr[j];
					} else {
						value += arr[j].charCodeAt (0);
					}
					builder[builder.length] = String.fromCharCode (baseChar + value.length);
					builder[builder.length] = value;
				}
			}
		}
	} else if (type == 'C') {
		if (ignoring && this[name] == 0 || this[name] == '\0') {
			continue;
		}
		builder[builder.length] = nameStr;
		builder[builder.length] = type;
		var value = "";
		if (typeof this[name] == 'number') {
			value += this[name];
		} else {
			value += this[name].charCodeAt (0);
		}
		builder[builder.length] = String.fromCharCode (baseChar + value.length);
		builder[builder.length] = value;
	}
}
var strBuf = builder.join ('');
var size = strBuf.length; 
if (size > 0x1000000) { // 16 * 1024 * 1024
	throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
}
var sizeStr = "" + (size - headSize);
strBuf = strBuf.substring (0, headSize - sizeStr.length - 1) + sizeStr + strBuf.substring(headSize - 1);
return strBuf;
	 */
	public String serialize() {
    	List<SimpleSerializable> objects = new LinkedList<SimpleSerializable>();
    	objects.add(this);
		return serialize(null, objects, true);
    }
    
    @J2SIgnore
	public byte[] serializeBytes() {
    	List<SimpleSerializable> objects = new LinkedList<SimpleSerializable>();
    	objects.add(this);
		try {
			return serializeBytes(null, objects, true);
		} catch (IOException e) {
			//e.printStackTrace();
			return null;
		}
    }
    
    @J2SIgnore
	public String serialize(SimpleFilter filter) {
    	List<SimpleSerializable> objects = new LinkedList<SimpleSerializable>();
    	objects.add(this);
		return serialize(filter, objects, true);
	}

    @J2SIgnore
	public byte[] serializeBytes(SimpleFilter filter) {
    	List<SimpleSerializable> objects = new LinkedList<SimpleSerializable>();
    	objects.add(this);
		try {
			return serializeBytes(filter, objects, true);
		} catch (IOException e) {
			//e.printStackTrace();
			return null;
		}
	}
    
    @J2SIgnore
	public String serialize(SimpleFilter filter, boolean supportsCompactBytes) {
    	List<SimpleSerializable> objects = new LinkedList<SimpleSerializable>();
    	objects.add(this);
		return serialize(filter, objects, supportsCompactBytes);
	}

    @J2SIgnore
	public byte[] serializeBytes(SimpleFilter filter, boolean supportsCompactBytes) {
    	List<SimpleSerializable> objects = new LinkedList<SimpleSerializable>();
    	objects.add(this);
		try {
			return serializeBytes(filter, objects, supportsCompactBytes);
		} catch (IOException e) {
			//e.printStackTrace();
			return null;
		}
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
    	List<Type> allInterfaces = new LinkedList<Type>();
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
    
    /**
     * Don't override this method unless optimization is a necessary.
     * 
     * @param filter
     * @param ssObjs
     * @param supportsCompactBytes
     * @return
     */
    @J2SIgnore
	protected String serialize(SimpleFilter filter, List<SimpleSerializable> ssObjs, boolean supportsCompactBytes) {
		char baseChar = 'B';
		StringBuilder builder = new StringBuilder(1024);
		/*
		 * "WLL" is used to mark Simple RPC, 100 is version 1.0.0, 
		 * # is used to mark the the beginning of serialized data  
		 */
		builder.append("WLL");
		builder.append(getSimpleVersion());
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
				builder.append(shortClazzName);
			} else {
				builder.append(clazzName);
			}
		} else {
			builder.append(clazzName);
		}
		builder.append("#00000000$"); // later the number of size will be updated!
		int headSize = builder.length();

		Map<String, Field> fields = getSerializableFields(clazzName, this.getClass());
		boolean ignoring = (filter == null || filter.ignoreDefaultFields());
		String[] fMap = fieldMapping();
		boolean arrMapping = fMap != null && fMap.length >> 1 == fields.size();
		Map<String, String> fieldNameMap = !arrMapping && getSimpleVersion() >= 202 ? fieldNameMapping() : null;
		Iterator<Entry<String, Field>> itr = null;
		Entry<String, Field> entry = null;
		try {
			if (!arrMapping) {
				itr = fields.entrySet().iterator();
			}
			int m = 0;
			while (!arrMapping ? itr.hasNext() : m < fMap.length / 2 ) {
				String name = null;
				Field field = null;
				if (!arrMapping) {
					entry = (Entry<String, Field>) itr.next();
					name = entry.getKey();
					field = entry.getValue();
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
				} else {
					name = fMap[m + m];
					field = fields.get(name);
					if (filter != null && !filter.accept(name)) {
						m++;
						continue;
					}
					name = fMap[m + m + 1];
					m++;
				}
				//String nameStr = (char)(baseChar + name.length()) + name;
				Class<?> type = field.getType();
				if (type == String.class) {
					String s = (String) field.get(this);
					if (s == null && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					serializeString(builder, s);
				} else if (type == int.class) {
					int n = field.getInt(this);
					if (n == 0 && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('I');
					String value = String.valueOf(n);
					builder.append((char) (baseChar + value.length()));
					builder.append(value);
				} else if (isSubclassOf(type, SimpleSerializable.class)) {
					SimpleSerializable ssObj = (SimpleSerializable) field.get(this);
					if (ssObj == null && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					serializeObject(builder, ssObj, ssObjs, supportsCompactBytes);
				} else if (type == long.class) {
					long l = field.getLong(this);
					if (l == 0L && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('L');
					String value = String.valueOf(l);
					builder.append((char) (baseChar + value.length()));
					builder.append(value);
				} else if (type == boolean.class) {
					boolean b = field.getBoolean(this);
					if (b == false && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('b');
					builder.append('C'); // ((char) (baseChar + 1));
					builder.append(b ? '1' : '0');
				} else if (type.isArray()) { // Array ...
					if (type == byte[].class) {
						byte [] bs = (byte []) field.get(this);
						if (bs == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append(!bytesCompactMode() || !supportsCompactBytes ? "AB" : "A8");
						if (bs == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, bs.length);
							if (!bytesCompactMode() || !supportsCompactBytes) {
								for (int j = 0; j < bs.length; j++) {
									String value = String.valueOf(bs[j]);
									builder.append((char) (baseChar + value.length()));
									builder.append(value);
								}
							} else {
								builder.append(new String(bs, ISO_8859_1));
							}
						}
					} else if (type == String[].class) {
						String[] ss = (String []) field.get(this);
						if (ss == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append("AX"); // special
						if (ss == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, ss.length);
							for (int j = 0; j < ss.length; j++) {
								String s = ss[j];
								serializeString(builder, s);
							}
						}
					} else if (isSubclassOf(type, SimpleSerializable[].class)) {
						SimpleSerializable[] ss = (SimpleSerializable []) field.get(this);
						if (ss == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append("AO"); // special
						if (ss == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, ss.length);
							for (int j = 0; j < ss.length; j++) {
								SimpleSerializable s = ss[j];
								serializeObject(builder, s, ssObjs, supportsCompactBytes);
							}
						}
					} else if (type == int[].class) {
						int [] ns = (int []) field.get(this);
						if (ns == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append("AI");
						if (ns == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, ns.length);
							for (int j = 0; j < ns.length; j++) {
								String value = String.valueOf(ns[j]);
								builder.append((char) (baseChar + value.length()));
								builder.append(value);
							}
						}
					} else if (type == long[].class) {
						long [] ls = (long []) field.get(this);
						if (ls == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append("AL");
						if (ls == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, ls.length);
							for (int j = 0; j < ls.length; j++) {
								String value = String.valueOf(ls[j]);
								builder.append((char) (baseChar + value.length()));
								builder.append(value);
							}
						}
					} else if (type == boolean[].class) {
						boolean [] bs = (boolean []) field.get(this);
						if (bs == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append("Ab");
						if (bs == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, bs.length);
							for (int j = 0; j < bs.length; j++) {
								builder.append('C'); // (char) (baseChar + 1));
								builder.append(bs[j] ? '1' : '0');
							}
						}
					} else if (type == float[].class) {
						float[] fs = (float[]) field.get(this);
						if (fs == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append("AF");
						if (fs == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, fs.length);
							for (int j = 0; j < fs.length; j++) {
								String value = String.valueOf(fs[j]);
								builder.append((char) (baseChar + value.length()));
								builder.append(value);
							}
						}
					} else if (type == double[].class) {
						double [] ds = (double []) field.get(this);
						if (ds == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append("AD");
						if (ds == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, ds.length);
							for (int j = 0; j < ds.length; j++) {
								String value = String.valueOf(ds[j]);
								builder.append((char) (baseChar + value.length()));
								builder.append(value);
							}
						}
					} else if (type == short[].class) {
						short [] ss = (short []) field.get(this);
						if (ss == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append("AS");
						if (ss == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, ss.length);
							for (int j = 0; j < ss.length; j++) {
								String value = String.valueOf(ss[j]);
								builder.append((char) (baseChar + value.length()));
								builder.append(value);
							}
						}
					} else if (type == char[].class) {
						char [] cs = (char []) field.get(this);
						if (cs == null && ignoring) continue;
						builder.append((char)(baseChar + name.length()));
						builder.append(name);
						builder.append("AC");
						if (cs == null) {
							builder.append('A'); // (char) (baseChar - 1));
						} else {
							serializeLength(builder, cs.length);
							for (int j = 0; j < cs.length; j++) {
								int c = cs[j];
								String value = Integer.toString(c, 10);
								builder.append((char) (baseChar + value.length()));
								builder.append(value);
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
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('Z');
					if (isSubInterfaceOf(type, List.class)) {
						builder.append('Z');
					} else if (isSubInterfaceOf(type, Set.class)) {
						builder.append('Y');
					} else if (isSubInterfaceOf(type, Queue.class)) {
						builder.append('Q');
					} else {
						builder.append('W'); // Other collections
					}
					if (collection == null) {
						builder.append('A'); // (char) (baseChar - 1));
					} else {
						Object[] os = collection.toArray();
						serializeLength(builder, os.length);
						for (int j = 0; j < os.length; j++) {
							Object o = os[j];
							if (o == null) {
								builder.append("OA");
							} else {
								serializeArrayItem(builder, o.getClass(), o, ssObjs, supportsCompactBytes);
							}
						}
					}
				} else if (isSubInterfaceOf(type, Map.class)) {
					Map<?, ?> map = (Map<?, ?>)field.get(this);
					if (map == null && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append("YM");
					if (map == null) {
						builder.append('A'); // (char) (baseChar - 1));
					} else {
						serializeLength(builder, map.size() * 2);
						for (Iterator<?> iter = map.keySet().iterator(); iter
								.hasNext();) {
							Object key = iter.next();
							if (key == null) {
								builder.append("OA");
							} else {
								serializeArrayItem(builder, key.getClass(), key, ssObjs, supportsCompactBytes);
							}
							Object value = map.get(key);
							if (value == null) {
								builder.append("OA");
							} else {
								serializeArrayItem(builder, value.getClass(), value, ssObjs, supportsCompactBytes);
							}
						}
					}
				} else if (type.isEnum()) {
					Enum<?> e = (Enum<?>)field.get(this);
					if (e == null && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('E');
					if (e == null) {
						builder.append('A'); // (char) (baseChar - 1));
					} else {
						String value = String.valueOf(e.ordinal());
						builder.append((char) (baseChar + value.length()));
						builder.append(value);
					}
				} else if (type == float.class) {
					float f = field.getFloat(this);
					if (f == 0.0 && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('F');
					String value = String.valueOf(f);
					builder.append((char) (baseChar + value.length()));
					builder.append(value);
				} else if (type == double.class) {
					double d = field.getDouble(this);
					if (d == 0.0d && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('D');
					String value = String.valueOf(d);
					builder.append((char) (baseChar + value.length()));
					builder.append(value);
				} else if (type == short.class) {
					short s = field.getShort(this);
					if (s == 0 && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('S');
					String value = String.valueOf(s);
					builder.append((char) (baseChar + value.length()));
					builder.append(value);
				} else if (type == byte.class) {
					byte b = field.getByte(this);
					if (b == 0 && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('B');
					String value = String.valueOf(b);
					builder.append((char) (baseChar + value.length()));
					builder.append(value);
				} else if (type == char.class) {
					int c = 0 + field.getChar(this);
					if (c == 0 && ignoring) continue;
					builder.append((char)(baseChar + name.length()));
					builder.append(name);
					builder.append('C');
					String value = Integer.toString(c, 10);
					builder.append((char) (baseChar + value.length()));
					builder.append(value);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		int size = builder.length();
		if (size > 0x1000000) { // 16 * 1024 * 1024
			throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
		}
		String sizeStr = String.valueOf(size - headSize);
		builder.replace(headSize - sizeStr.length() - 1, headSize - 1, sizeStr); // update size!
		return builder.toString();
	}

    /**
     * Don't override this method unless optimization is a necessary.
     * 
     * @param filter
     * @param ssObjs
     * @param supportsCompactBytes
     * @return
     * @throws IOException
     */
    @J2SIgnore
	protected byte[] serializeBytes(SimpleFilter filter, List<SimpleSerializable> ssObjs, boolean supportsCompactBytes) throws IOException {
		char baseChar = 'B';
		ByteArrayOutputStream baos = new ByteArrayOutputStream(1024);
		DataOutputStream dos = new DataOutputStream(baos);
		/*
		 * "WLL" is used to mark Simple RPC, 100 is version 1.0.0, 
		 * # is used to mark the the beginning of serialized data  
		 */
		dos.writeBytes("WLL");
		dos.writeBytes(String.valueOf(getSimpleVersion()));
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
				dos.writeBytes(shortClazzName);
			} else {
				dos.writeBytes(clazzName);
			}
		} else {
			dos.writeBytes(clazzName);
		}
		dos.writeBytes("#00000000$"); // later the number of size will be updated!
		int headSize = dos.size();

		Map<String, Field> fields = getSerializableFields(clazzName, this.getClass());
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
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					serializeBytesString(dos, s);
				} else if (type == int.class) {
					int n = field.getInt(this);
					if (n == 0 && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('I');
					String value = String.valueOf(n);
					dos.writeByte(baseChar + value.length());
					dos.writeBytes(value);
				} else if (isSubclassOf(type, SimpleSerializable.class)) {
					SimpleSerializable ssObj = (SimpleSerializable) field.get(this);
					if (ssObj == null && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					serializeBytesObject(dos, ssObj, ssObjs, supportsCompactBytes);
				} else if (type == long.class) {
					long l = field.getLong(this);
					if (l == 0L && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('L');
					String value = String.valueOf(l);
					dos.writeByte(baseChar + value.length());
					dos.writeBytes(value);
				} else if (type == boolean.class) {
					boolean b = field.getBoolean(this);
					if (b == false && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('b');
					dos.writeByte('C'); // ((char) (baseChar + 1));
					dos.writeByte(b ? '1' : '0');
				} else if (type.isArray()) { // Array ...
					if (type == byte[].class) {
						byte [] bs = (byte []) field.get(this);
						if (bs == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes(!bytesCompactMode() || !supportsCompactBytes ? "AB" : "A8");
						if (bs == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, bs.length);
							if (!bytesCompactMode() || !supportsCompactBytes) {
								for (int j = 0; j < bs.length; j++) {
									String value = String.valueOf(bs[j]);
									dos.writeByte(baseChar + value.length());
									dos.writeBytes(value);
								}
							} else {
								dos.write(bs);
							}
						}
					} else if (type == String[].class) {
						String[] ss = (String []) field.get(this);
						if (ss == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes("AX"); // special
						if (ss == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, ss.length);
							for (int j = 0; j < ss.length; j++) {
								String s = ss[j];
								serializeBytesString(dos, s);
							}
						}
					} else if (isSubclassOf(type, SimpleSerializable[].class)) {
						SimpleSerializable[] ss = (SimpleSerializable []) field.get(this);
						if (ss == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes("AO"); // special
						if (ss == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, ss.length);
							for (int j = 0; j < ss.length; j++) {
								SimpleSerializable s = ss[j];
								serializeBytesObject(dos, s, ssObjs, supportsCompactBytes);
							}
						}
					} else if (type == int[].class) {
						int [] ns = (int []) field.get(this);
						if (ns == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes("AI");
						if (ns == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, ns.length);
							for (int j = 0; j < ns.length; j++) {
								String value = String.valueOf(ns[j]);
								dos.writeByte(baseChar + value.length());
								dos.writeBytes(value);
							}
						}
					} else if (type == long[].class) {
						long [] ls = (long []) field.get(this);
						if (ls == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes("AL");
						if (ls == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, ls.length);
							for (int j = 0; j < ls.length; j++) {
								String value = String.valueOf(ls[j]);
								dos.writeByte(baseChar + value.length());
								dos.writeBytes(value);
							}
						}
					} else if (type == boolean[].class) {
						boolean [] bs = (boolean []) field.get(this);
						if (bs == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes("Ab");
						if (bs == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, bs.length);
							for (int j = 0; j < bs.length; j++) {
								dos.writeByte('C'); // (char) (baseChar + 1));
								dos.writeByte(bs[j] ? '1' : '0');
							}
						}
					} else if (type == float[].class) {
						float[] fs = (float[]) field.get(this);
						if (fs == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes("AF");
						if (fs == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, fs.length);
							for (int j = 0; j < fs.length; j++) {
								String value = String.valueOf(fs[j]);
								dos.writeByte(baseChar + value.length());
								dos.writeBytes(value);
							}
						}
					} else if (type == double[].class) {
						double [] ds = (double []) field.get(this);
						if (ds == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes("AD");
						if (ds == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, ds.length);
							for (int j = 0; j < ds.length; j++) {
								String value = String.valueOf(ds[j]);
								dos.writeByte(baseChar + value.length());
								dos.writeBytes(value);
							}
						}
					} else if (type == short[].class) {
						short [] ss = (short []) field.get(this);
						if (ss == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes("AS");
						if (ss == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, ss.length);
							for (int j = 0; j < ss.length; j++) {
								String value = String.valueOf(ss[j]);
								dos.writeByte(baseChar + value.length());
								dos.writeBytes(value);
							}
						}
					} else if (type == char[].class) {
						char [] cs = (char []) field.get(this);
						if (cs == null && ignoring) continue;
						dos.writeByte(baseChar + name.length());
						dos.writeBytes(name);
						dos.writeBytes("AC");
						if (cs == null) {
							dos.writeByte('A'); // (char) (baseChar - 1));
						} else {
							serializeBytesLength(dos, cs.length);
							for (int j = 0; j < cs.length; j++) {
								int c = cs[j];
								String value = Integer.toString(c, 10);
								dos.writeByte(baseChar + value.length());
								dos.writeBytes(value);
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
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('Z');
					if (isSubInterfaceOf(type, List.class)) {
						dos.writeByte('Z');
					} else if (isSubInterfaceOf(type, Set.class)) {
						dos.writeByte('Y');
					} else if (isSubInterfaceOf(type, Queue.class)) {
						dos.writeByte('Q');
					} else {
						dos.writeByte('W');
					}
					if (collection == null) {
						dos.writeByte('A'); // (char) (baseChar - 1));
					} else {
						Object[] os = collection.toArray();
						serializeBytesLength(dos, os.length);
						for (int j = 0; j < os.length; j++) {
							Object o = os[j];
							if (o == null) {
								dos.writeBytes("OA");
							} else {
								serializeBytesArrayItem(dos, o.getClass(), o, ssObjs, supportsCompactBytes);
							}
						}
					}
				} else if (isSubInterfaceOf(type, Map.class)) {
					Map<?, ?> map = (Map<?, ?>)field.get(this);
					if (map == null && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeBytes("YM");
					if (map == null) {
						dos.writeByte('A'); // (char) (baseChar - 1));
					} else {
						serializeBytesLength(dos, map.size() * 2);
						for (Iterator<?> iter = map.keySet().iterator(); iter
								.hasNext();) {
							Object key = iter.next();
							if (key == null) {
								dos.writeBytes("OA");
							} else {
								serializeBytesArrayItem(dos, key.getClass(), key, ssObjs, supportsCompactBytes);
							}
							Object value = map.get(key);
							if (value == null) {
								dos.writeBytes("OA");
							} else {
								serializeBytesArrayItem(dos, value.getClass(), value, ssObjs, supportsCompactBytes);
							}
						}
					}
				} else if (type.isEnum()) {
					Enum<?> e = (Enum<?>)field.get(this);
					if (e == null && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('E');
					if (e == null) {
						dos.writeByte('A'); // (char) (baseChar - 1));
					} else {
						String value = String.valueOf(e.ordinal());
						dos.writeByte(baseChar + value.length());
						dos.writeBytes(value);
					}
				} else if (type == float.class) {
					float f = field.getFloat(this);
					if (f == 0.0 && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('F');
					String value = String.valueOf(f);
					dos.writeByte(baseChar + value.length());
					dos.writeBytes(value);
				} else if (type == double.class) {
					double d = field.getDouble(this);
					if (d == 0.0d && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('D');
					String value = String.valueOf(d);
					dos.writeByte(baseChar + value.length());
					dos.writeBytes(value);
				} else if (type == short.class) {
					short s = field.getShort(this);
					if (s == 0 && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('S');
					String value = String.valueOf(s);
					dos.writeByte(baseChar + value.length());
					dos.writeBytes(value);
				} else if (type == byte.class) {
					byte b = field.getByte(this);
					if (b == 0 && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('B');
					String value = String.valueOf(b);
					dos.writeByte(baseChar + value.length());
					dos.writeBytes(value);
				} else if (type == char.class) {
					int c = 0 + field.getChar(this);
					if (c == 0 && ignoring) continue;
					dos.writeByte(baseChar + name.length());
					dos.writeBytes(name);
					dos.writeByte('C');
					String value = Integer.toString(c, 10);
					dos.writeByte(baseChar + value.length());
					dos.writeBytes(value);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		int size = dos.size();
		if (size > 0x1000000) { // 16 * 1024 * 1024
			throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
		}
		// update size!
		String sizeStr = String.valueOf(size - headSize);
		int sizeLength = sizeStr.length();
		byte[] bytes = baos.toByteArray();
		for (int i = 0; i < sizeLength; i++) {
			bytes[headSize - sizeLength - 1 + i] = (byte) sizeStr.charAt(i);
		}
		return bytes;
	}

    @J2SIgnore
    private void serializeArrayItem(StringBuilder builder, Class<?> type, Object target, List<SimpleSerializable> ssObjs, boolean supportsCompactBytes) throws Exception {
    	char baseChar = 'B';
		if (type == String.class) {
			String s = (String) target;
			serializeString(builder, s);
		} else if (type == Integer.class) {
			int n = ((Integer) target).intValue();
			builder.append('I');
			String value = String.valueOf(n);
			builder.append((char) (baseChar + value.length()));
			builder.append(value);
		} else if (isSubclassOf(type, SimpleSerializable.class)) {
			SimpleSerializable ssObj = (SimpleSerializable) target;
			serializeObject(builder, ssObj, ssObjs, supportsCompactBytes);
		} else if (type == Long.class) {
			long l = ((Long) target).longValue();
			builder.append('L');
			String value = String.valueOf(l);
			builder.append((char) (baseChar + value.length()));
			builder.append(value);
		} else if (type == Boolean.class) {
			boolean b = ((Boolean) target).booleanValue();
			builder.append('b');
			builder.append('C'); // ((char) (baseChar + 1));
			builder.append(b ? '1' : '0');
		} else if (type.isArray()) { // Array ...
			if (type == byte[].class) {
				byte [] bs = (byte []) target;
				builder.append(!bytesCompactMode() || !supportsCompactBytes ? "AB" : "A8");
				if (bs == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, bs.length);
					if (!bytesCompactMode() || !supportsCompactBytes) {
						for (int j = 0; j < bs.length; j++) {
							String value = String.valueOf(bs[j]);
							builder.append((char) (baseChar + value.length()));
							builder.append(value);
						}
					} else {
						builder.append(new String(bs, ISO_8859_1));
					}
				}
			} else if (type == String[].class) {
				String[] ss = (String []) target;
				builder.append("AX"); // special
				if (ss == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, ss.length);
					for (int j = 0; j < ss.length; j++) {
						String s = ss[j];
						serializeString(builder, s);
					}
				}
			} else if (isSubclassOf(type, SimpleSerializable[].class)) {
				SimpleSerializable[] ss = (SimpleSerializable []) target;
				builder.append("AO"); // special
				if (ss == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, ss.length);
					for (int j = 0; j < ss.length; j++) {
						SimpleSerializable s = ss[j];
						serializeObject(builder, s, ssObjs, supportsCompactBytes);
					}
				}
			} else if (type == int[].class) {
				int [] ns = (int []) target;
				builder.append("AI");
				if (ns == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, ns.length);
					for (int j = 0; j < ns.length; j++) {
						String value = String.valueOf(ns[j]);
						builder.append((char) (baseChar + value.length()));
						builder.append(value);
					}
				}
			} else if (type == long[].class) {
				long [] ls = (long []) target;
				builder.append("AL");
				if (ls == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, ls.length);
					for (int j = 0; j < ls.length; j++) {
						String value = String.valueOf(ls[j]);
						builder.append((char) (baseChar + value.length()));
						builder.append(value);
					}
				}
			} else if (type == boolean[].class) {
				boolean [] bs = (boolean []) target;
				builder.append("Ab");
				if (bs == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, bs.length);
					for (int j = 0; j < bs.length; j++) {
						builder.append('C'); // (char) (baseChar + 1));
						builder.append(bs[j] ? '1' : '0');
					}
				}
			} else if (type == float[].class) {
				float[] fs = (float[]) target;
				builder.append("AF");
				if (fs == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, fs.length);
					for (int j = 0; j < fs.length; j++) {
						String value = String.valueOf(fs[j]);
						builder.append((char) (baseChar + value.length()));
						builder.append(value);
					}
				}
			} else if (type == double[].class) {
				double [] ds = (double []) target;
				builder.append("AD");
				if (ds == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, ds.length);
					for (int j = 0; j < ds.length; j++) {
						String value = String.valueOf(ds[j]);
						builder.append((char) (baseChar + value.length()));
						builder.append(value);
					}
				}
			} else if (type == short[].class) {
				short [] ss = (short []) target;
				builder.append("AS");
				if (ss == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, ss.length);
					for (int j = 0; j < ss.length; j++) {
						String value = String.valueOf(ss[j]);
						builder.append((char) (baseChar + value.length()));
						builder.append(value);
					}
				}
			} else if (type == char[].class) {
				char [] cs = (char []) target;
				builder.append("AC");
				if (cs == null) {
					builder.append('A'); // (char) (baseChar - 1));
				} else {
					serializeLength(builder, cs.length);
					for (int j = 0; j < cs.length; j++) {
						int c = cs[j];
						String value = Integer.toString(c, 10);
						builder.append((char) (baseChar + value.length()));
						builder.append(value);
					}
				}
			} else {
				builder.append("OA");
				// others unknown or unsupported types!
				// throw new RuntimeException("Unsupported data type in Java2Script Simple RPC!");
			}
		} else if (isSubInterfaceOf(type, Collection.class)) {
			Collection<?> collection = (Collection<?>) target;
			builder.append('Z');
			if (isSubInterfaceOf(type, List.class)) {
				builder.append('Z');
			} else if (isSubInterfaceOf(type, Set.class)) {
				builder.append('Y');
			} else if (isSubInterfaceOf(type, Queue.class)) {
				builder.append('Q');
			} else {
				builder.append('W');
			}
			if (collection == null) {
				builder.append('A'); // (char) (baseChar - 1));
			} else {
				Object[] os = collection.toArray();
				serializeLength(builder, os.length);
				for (int j = 0; j < os.length; j++) {
					Object o = os[j];
					if (o == null) {
						builder.append("OA");
					} else {
						serializeArrayItem(builder, o.getClass(), o, ssObjs, supportsCompactBytes);
					}
				}
			}
		} else if (isSubInterfaceOf(type, Map.class)) {
			Map<?, ?> map = (Map<?, ?>) target;
			builder.append("YM");
			if (map == null) {
				builder.append('A'); // (char) (baseChar - 1));
			} else {
				serializeLength(builder, map.size() * 2);
				for (Iterator<?> iter = map.keySet().iterator(); iter
						.hasNext();) {
					Object key = iter.next();
					if (key == null) {
						builder.append("OA");
					} else {
						serializeArrayItem(builder, key.getClass(), key, ssObjs, supportsCompactBytes);
					}
					Object value = map.get(key);
					if (value == null) {
						builder.append("OA");
					} else {
						serializeArrayItem(builder, value.getClass(), value, ssObjs, supportsCompactBytes);
					}
				}
			}
		} else if (type.isEnum()) {
			Enum<?> e = (Enum<?>) target;
			builder.append('E');
			if (e == null) {
				builder.append('A'); // (char) (baseChar - 1));
			} else {
				String value = String.valueOf(e.ordinal());
				builder.append((char) (baseChar + value.length()));
				builder.append(value);
			}
		} else if (type == Float.class) {
			float f = ((Float) target).floatValue();
			builder.append('F');
			String value = String.valueOf(f);
			builder.append((char) (baseChar + value.length()));
			builder.append(value);
		} else if (type == Double.class) {
			double d = ((Double) target).doubleValue();
			builder.append('D');
			String value = String.valueOf(d);
			builder.append((char) (baseChar + value.length()));
			builder.append(value);
		} else if (type == Short.class) {
			short s = ((Short) target).shortValue();
			builder.append('S');
			String value = String.valueOf(s);
			builder.append((char) (baseChar + value.length()));
			builder.append(value);
		} else if (type == Byte.class) {
			byte b = ((Byte) target).byteValue();
			builder.append('B');
			String value = String.valueOf(b);
			builder.append((char) (baseChar + value.length()));
			builder.append(value);
		} else if (type == Character.class) {
			int c = 0 + ((Character) target).charValue();
			builder.append('C');
			String value = Integer.toString(c, 10);
			builder.append((char) (baseChar + value.length()));
			builder.append(value);
		} else {
			builder.append("OA");
			// others unknown or unsupported types!
		}
    }

    @J2SIgnore
    private void serializeBytesArrayItem(DataOutputStream dos, Class<?> type, Object target, List<SimpleSerializable> ssObjs, boolean supportsCompactBytes) throws Exception {
    	char baseChar = 'B';
		if (type == String.class) {
			String s = (String) target;
			serializeBytesString(dos, s);
		} else if (type == Integer.class) {
			int n = ((Integer) target).intValue();
			dos.writeByte('I');
			String value = String.valueOf(n);
			dos.writeByte(baseChar + value.length());
			dos.writeBytes(value);
		} else if (isSubclassOf(type, SimpleSerializable.class)) {
			SimpleSerializable ssObj = (SimpleSerializable) target;
			serializeBytesObject(dos, ssObj, ssObjs, supportsCompactBytes);
		} else if (type == Long.class) {
			long l = ((Long) target).longValue();
			dos.writeByte('L');
			String value = String.valueOf(l);
			dos.writeByte(baseChar + value.length());
			dos.writeBytes(value);
		} else if (type == Boolean.class) {
			boolean b = ((Boolean) target).booleanValue();
			dos.writeByte('b');
			dos.writeByte('C'); // ((char) (baseChar + 1));
			dos.writeByte(b ? '1' : '0');
		} else if (type.isArray()) { // Array ...
			if (type == byte[].class) {
				byte [] bs = (byte []) target;
				dos.writeBytes(!bytesCompactMode() || !supportsCompactBytes ? "AB" : "A8");
				if (bs == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, bs.length);
					if (!bytesCompactMode() || !supportsCompactBytes) {
						for (int j = 0; j < bs.length; j++) {
							String value = String.valueOf(bs[j]);
							dos.writeByte(baseChar + value.length());
							dos.writeBytes(value);
						}
					} else {
						dos.write(bs);
					}
				}
			} else if (type == String[].class) {
				String[] ss = (String []) target;
				dos.writeBytes("AX"); // special
				if (ss == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, ss.length);
					for (int j = 0; j < ss.length; j++) {
						String s = ss[j];
						serializeBytesString(dos, s);
					}
				}
			} else if (isSubclassOf(type, SimpleSerializable[].class)) {
				SimpleSerializable[] ss = (SimpleSerializable []) target;
				dos.writeBytes("AO"); // special
				if (ss == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, ss.length);
					for (int j = 0; j < ss.length; j++) {
						SimpleSerializable s = ss[j];
						serializeBytesObject(dos, s, ssObjs, supportsCompactBytes);
					}
				}
			} else if (type == int[].class) {
				int [] ns = (int []) target;
				dos.writeBytes("AI");
				if (ns == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, ns.length);
					for (int j = 0; j < ns.length; j++) {
						String value = String.valueOf(ns[j]);
						dos.writeByte(baseChar + value.length());
						dos.writeBytes(value);
					}
				}
			} else if (type == long[].class) {
				long [] ls = (long []) target;
				dos.writeBytes("AL");
				if (ls == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, ls.length);
					for (int j = 0; j < ls.length; j++) {
						String value = String.valueOf(ls[j]);
						dos.writeByte(baseChar + value.length());
						dos.writeBytes(value);
					}
				}
			} else if (type == boolean[].class) {
				boolean [] bs = (boolean []) target;
				dos.writeBytes("Ab");
				if (bs == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, bs.length);
					for (int j = 0; j < bs.length; j++) {
						dos.writeByte('C'); // (char) (baseChar + 1));
						dos.writeByte(bs[j] ? '1' : '0');
					}
				}
			} else if (type == float[].class) {
				float[] fs = (float[]) target;
				dos.writeBytes("AF");
				if (fs == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, fs.length);
					for (int j = 0; j < fs.length; j++) {
						String value = String.valueOf(fs[j]);
						dos.writeByte(baseChar + value.length());
						dos.writeBytes(value);
					}
				}
			} else if (type == double[].class) {
				double [] ds = (double []) target;
				dos.writeBytes("AD");
				if (ds == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, ds.length);
					for (int j = 0; j < ds.length; j++) {
						String value = String.valueOf(ds[j]);
						dos.writeByte(baseChar + value.length());
						dos.writeBytes(value);
					}
				}
			} else if (type == short[].class) {
				short [] ss = (short []) target;
				dos.writeBytes("AS");
				if (ss == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, ss.length);
					for (int j = 0; j < ss.length; j++) {
						String value = String.valueOf(ss[j]);
						dos.writeByte(baseChar + value.length());
						dos.writeBytes(value);
					}
				}
			} else if (type == char[].class) {
				char [] cs = (char []) target;
				dos.writeBytes("AC");
				if (cs == null) {
					dos.writeByte('A'); // (char) (baseChar - 1));
				} else {
					serializeBytesLength(dos, cs.length);
					for (int j = 0; j < cs.length; j++) {
						int c = cs[j];
						String value = Integer.toString(c, 10);
						dos.writeByte(baseChar + value.length());
						dos.writeBytes(value);
					}
				}
			} else {
				dos.writeBytes("OA");
				// others unknown or unsupported types!
				// throw new RuntimeException("Unsupported data type in Java2Script Simple RPC!");
			}
		} else if (isSubInterfaceOf(type, Collection.class)) {
			Collection<?> collection = (Collection<?>) target;
			dos.writeByte('Z');
			if (isSubInterfaceOf(type, List.class)) {
				dos.writeByte('Z');
			} else if (isSubInterfaceOf(type, Set.class)) {
				dos.writeByte('Y');
			} else if (isSubInterfaceOf(type, Queue.class)) {
				dos.writeByte('Q');
			} else {
				dos.writeByte('W');
			}
			if (collection == null) {
				dos.writeByte('A'); // (char) (baseChar - 1));
			} else {
				Object[] os = collection.toArray();
				serializeBytesLength(dos, os.length);
				for (int j = 0; j < os.length; j++) {
					Object o = os[j];
					if (o == null) {
						dos.writeBytes("OA");
					} else {
						serializeBytesArrayItem(dos, o.getClass(), o, ssObjs, supportsCompactBytes);
					}
				}
			}
		} else if (isSubInterfaceOf(type, Map.class)) {
			Map<?, ?> map = (Map<?, ?>) target;
			dos.writeBytes("YM");
			if (map == null) {
				dos.writeByte('A'); // (char) (baseChar - 1));
			} else {
				serializeBytesLength(dos, map.size() * 2);
				for (Iterator<?> iter = map.keySet().iterator(); iter
						.hasNext();) {
					Object key = iter.next();
					if (key == null) {
						dos.writeBytes("OA");
					} else {
						serializeBytesArrayItem(dos, key.getClass(), key, ssObjs, supportsCompactBytes);
					}
					Object value = map.get(key);
					if (value == null) {
						dos.writeBytes("OA");
					} else {
						serializeBytesArrayItem(dos, value.getClass(), value, ssObjs, supportsCompactBytes);
					}
				}
			}
		} else if (type.isEnum()) {
			Enum<?> e = (Enum<?>) target;
			dos.writeByte('E');
			if (e == null) {
				dos.writeByte('A'); // (char) (baseChar - 1));
			} else {
				String value = String.valueOf(e.ordinal());
				dos.writeByte(baseChar + value.length());
				dos.writeBytes(value);
			}
		} else if (type == Float.class) {
			float f = ((Float) target).floatValue();
			dos.writeByte('F');
			String value = String.valueOf(f);
			dos.writeByte(baseChar + value.length());
			dos.writeBytes(value);
		} else if (type == Double.class) {
			double d = ((Double) target).doubleValue();
			dos.writeByte('D');
			String value = String.valueOf(d);
			dos.writeByte(baseChar + value.length());
			dos.writeBytes(value);
		} else if (type == Short.class) {
			short s = ((Short) target).shortValue();
			dos.writeByte('S');
			String value = String.valueOf(s);
			dos.writeByte(baseChar + value.length());
			dos.writeBytes(value);
		} else if (type == Byte.class) {
			byte b = ((Byte) target).byteValue();
			dos.writeByte('B');
			String value = String.valueOf(b);
			dos.writeByte(baseChar + value.length());
			dos.writeBytes(value);
		} else if (type == Character.class) {
			int c = 0 + ((Character) target).charValue();
			dos.writeByte('C');
			String value = Integer.toString(c, 10);
			dos.writeByte(baseChar + value.length());
			dos.writeBytes(value);
		} else {
			dos.writeBytes("OA");
			// others unknown or unsupported types!
		}
    }

    @J2SIgnore
	private void serializeLength(StringBuilder builder, int length) {
		char baseChar = 'B';
		if (length > 52) {
			if (length > 0x1000000) { // 16 * 1024 * 1024
				throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
			}
			builder.append('@'); // (char) (baseChar - 2));
			String value = String.valueOf(length);
			builder.append((char) (baseChar + value.length()));
			builder.append(value);
		} else {
			builder.append((char) (baseChar + length));
		}
	}
    
    @J2SIgnore
	private void serializeBytesLength(DataOutputStream dos, int length) throws IOException {
		char baseChar = 'B';
		if (length > 52) {
			if (length > 0x1000000) { // 16 * 1024 * 1024
				throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
			}
			dos.writeByte('@'); // (char) (baseChar - 2));
			String value = String.valueOf(length);
			dos.writeByte(baseChar + value.length());
			dos.writeBytes(value);
		} else {
			dos.writeByte(baseChar + length);
		}
	}
	
	/**
	 * @param builder
	 * @param s
	 * 
	 * @j2sNative
var baseChar = 'B'.charCodeAt (0);
if (s == null) {
	builder[builder.length] = "sA";
	// builder[builder.length] = 's';
	// builder[builder.length] = String.fromCharCode (baseChar - 1);
} else {
	var normal = /^[\t\u0020-\u007e]*$/.test(s);
	if (normal) {
		builder[builder.length] = 's';
	} else {
		builder[builder.length] = 'u';
		s = Encoding.encodeBase64 (Encoding.convert2UTF8 (s));
	}
	var l4 = s.length;
	if (l4 > 52) {
		builder[builder.length] = "@"; //String.fromCharCode (baseChar - 2);
		var value = "" + l4;
		builder[builder.length] = String.fromCharCode (baseChar + value.length);
		builder[builder.length] = l4;
	} else {
		builder[builder.length] = String.fromCharCode (baseChar + l4);
	}
	builder[builder.length] = s;
}
	 */
    @J2SKeep
	private void serializeString(StringBuilder builder, String s) {
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
				builder.append('s');
			} else {
				byte[] bytes = s.getBytes(UTF_8);
				builder.append('u');
				s = Base64.byteArrayToBase64(bytes);
				l4 = s.length();
			}
			if (l4 > 52) {
				builder.append('@'); // (char) (baseChar - 2));
				String value = String.valueOf(l4);
				builder.append((char) (baseChar + value.length()));
				builder.append(value);
			} else {
				builder.append((char) (baseChar + l4));
			}
			builder.append(s);
		} else {
			builder.append('s');
			builder.append('A'); // (char) (baseChar - 1));
		}
	}

    @J2SIgnore
	private void serializeBytesString(DataOutputStream dos, String s) throws IOException {
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
				dos.writeByte('s');
			} else {
				byte[] bytes = s.getBytes(UTF_8);
				dos.writeByte('u');
				s = Base64.byteArrayToBase64(bytes);
				l4 = s.length();
			}
			if (l4 > 52) {
				dos.writeByte('@'); // (char) (baseChar - 2));
				String value = String.valueOf(l4);
				dos.writeByte(baseChar + value.length());
				dos.writeBytes(value);
			} else {
				dos.writeByte(baseChar + l4);
			}
			dos.writeBytes(s);
		} else {
			dos.writeByte('s');
			dos.writeByte('A'); // (char) (baseChar - 1));
		}
	}

	/**
	 * @param builder
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
		builder[builder.length] = 'o';
		var value = "" + idx;
		builder[builder.length] = String.fromCharCode (baseChar + value.length);
		builder[builder.length] = value;
		return;
	}
	ssObjs[ssObjs.length] = ss;
}
builder[builder.length] = 'O';
if (ss != null) {
	var s = ss.serialize (null, ssObjs); 
	var l4 = s.length;
	if (l4 > 52) {
		builder[builder.length] = "@"; //String.fromCharCode (baseChar - 2);
		var value = "" + l4;
		builder[builder.length] = String.fromCharCode (baseChar + value.length);
		builder[builder.length] = value;
	} else {
		builder[builder.length] = String.fromCharCode (baseChar + l4);
	}
	builder[builder.length] = s;
} else {
	builder[builder.length] = "A"; //String.fromCharCode (baseChar - 1);
}
	 */
    @J2SKeep
	private void serializeObject(StringBuilder builder, SimpleSerializable ss, List<SimpleSerializable> ssObjs, boolean supportsCompactBytes) {
		char baseChar = 'B';
		if (ss != null) {
			int idx = ssObjs.indexOf(ss);
			if (idx != -1) {
				builder.append('o');
				String value = String.valueOf(idx);
				builder.append((char) (baseChar + value.length()));
				builder.append(value);
				return;
			}
			ssObjs.add(ss);
		}
		builder.append('O');
		if (ss != null) {
			ss.simpleVersion = simpleVersion;
			String s = ss.serialize(null, ssObjs, supportsCompactBytes); 
			int l4 = s.length();
			if (l4 > 52) {
				builder.append('@'); // (char) (baseChar - 2));
				String value = String.valueOf(l4);
				builder.append((char) (baseChar + value.length()));
				builder.append(value);
			} else {
				builder.append((char) (baseChar + l4));
			}
			builder.append(s);
		} else {
			builder.append('A'); // (char) (baseChar - 1));
		}
	}
    
    @J2SIgnore
	private void serializeBytesObject(DataOutputStream dos, SimpleSerializable ss, List<SimpleSerializable> ssObjs, boolean supportsCompactBytes) throws IOException {
		char baseChar = 'B';
		if (ss != null) {
			int idx = ssObjs.indexOf(ss);
			if (idx != -1) {
				dos.writeByte('o');
				String value = String.valueOf(idx);
				dos.writeByte(baseChar + value.length());
				dos.writeBytes(value);
				return;
			}
			ssObjs.add(ss);
		}
		dos.writeByte((byte) 'O');
		if (ss != null) {
			ss.simpleVersion = simpleVersion;
			String s = ss.serialize(null, ssObjs, supportsCompactBytes); 
			int l4 = s.length();
			if (l4 > 52) {
				dos.writeByte('@'); // (char) (baseChar - 2));
				String value = String.valueOf(l4);
				dos.writeByte(baseChar + value.length());
				dos.writeBytes(value);
			} else {
				dos.writeByte(baseChar + l4);
			}
			dos.writeBytes(s);
		} else {
			dos.writeByte('A'); // (char) (baseChar - 1));
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
    	List<SimpleSerializable> objects = new LinkedList<SimpleSerializable>();
    	objects.add(this);
    	return jsonSerialize(filter, objects, true, "");
    }

    @J2SIgnore
    public String jsonSerialize(SimpleFilter filter, String linePrefix) {
    	List<SimpleSerializable> objects = new LinkedList<SimpleSerializable>();
    	objects.add(this);
    	return jsonSerialize(filter, objects, linePrefix != null, linePrefix);
    }
    
    @J2SIgnore
    private String jsonSerialize(SimpleFilter filter, List<SimpleSerializable> ssObjs, boolean withFormats, String linePrefix) {
    	String prefix = linePrefix;
    	StringBuilder builder = new StringBuilder(1024);
    	if (prefix != null) {
    		//builder.append(prefix);
    		prefix += "\t";
    	}
    	builder.append('{');
    	if (withFormats) {
    		builder.append("\r\n");
    	}
    	boolean commasAppended = false;
		boolean ignoring = (filter == null || filter.ignoreDefaultFields());
		Class<?> clazzType = this.getClass();
		Map<String, Field> fieldMap = getSerializableFields(clazzType.getName(), clazzType);
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
					appendFieldName(builder, fieldName, withFormats, prefix);
					builder.append(i);
				} else if (clazz == String.class) {
					String str = (String) field.get(this);
					if (str == null && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					if (str == null) {
						builder.append("null");
					} else {
						builder.append('\"');
						builder.append(str.replaceAll("\r", "\\r")
								.replaceAll("\n", "\\n")
								.replaceAll("\t", "\\t")
								.replaceAll("\'", "\\'")
								.replaceAll("\"", "\\\""));
						builder.append('\"');
					}
				} else if (clazz == long.class) {
					long l = field.getLong(this);
					if (l == 0 && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					builder.append(l);
				} else if (clazz == boolean.class) {
					boolean b = field.getBoolean(this);
					if (b == false && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					builder.append(b);
				} else if (isSubclassOf(clazz, SimpleSerializable.class)) {
					SimpleSerializable o = (SimpleSerializable) field.get(this);
					if (o == null && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					
					int idx = -1;
					if (!this.jsonExpandMode()) {
						idx = ssObjs.indexOf(o);
					}
					if (idx != -1) {
						if (withFormats) {
							builder.append("{ \"@\" : ");
							builder.append(idx);
							builder.append(" }");
						} else {
							builder.append("{\"@\":");
							builder.append(idx);
							builder.append('}');
						}
					} else {
						ssObjs.add(o);
						builder.append(o.jsonSerialize(null, ssObjs, withFormats, prefix));
					}
				} else if (clazz.isArray()) {
					clazz = clazz.getComponentType();
					if (clazz == int.class) {
						int[] xs = (int[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
						builder.append('[');
						if (withFormats) {
							builder.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							builder.append(xs[i]);
							if (i != xs.length - 1) {
								builder.append(',');
							}
							if (withFormats) {
								builder.append(' ');
							}
						}
						builder.append(']');
					} else if (clazz == String.class) {
						String[] xs = (String[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
						builder.append('[');
						if (withFormats) {
							builder.append("\r\n");
						}
						for (int i = 0; i < xs.length; i++) {
							String str = xs[i];
							if (withFormats) {
								builder.append(prefix);
								builder.append('\t');
							}
							if (str == null) {
								builder.append("null");
							} else {
								builder.append('\"');
								builder.append(str.replaceAll("\r", "\\r")
										.replaceAll("\n", "\\n")
										.replaceAll("\t", "\\t")
										.replaceAll("\'", "\\'")
										.replaceAll("\"", "\\\""));
								builder.append('\"');
							}
							if (i != xs.length - 1) {
								builder.append(',');
							}
							if (withFormats) {
								builder.append("\r\n");
							}
						}
						if (withFormats) {
							builder.append(prefix);
						}
						builder.append(']');
					} else if (isSubclassOf(clazz, SimpleSerializable.class)) {
						SimpleSerializable[] xs = (SimpleSerializable[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
						builder.append('[');
						if (withFormats) {
							builder.append("\r\n");
						}
						for (int i = 0; i < xs.length; i++) {
							SimpleSerializable o = xs[i];
							if (withFormats) {
								builder.append(prefix);
								builder.append('\t');
							}
							if (o == null) {
								builder.append("null");
							} else {
								int idx = -1;
								if (!this.jsonExpandMode()) {
									idx = ssObjs.indexOf(o);
								}
								if (idx != -1) {
									if (withFormats) {
										builder.append("{ \"@\" : ");
										builder.append(idx);
										builder.append(" }");
									} else {
										builder.append("{\"@\":");
										builder.append(idx);
										builder.append('}');
									}
								} else {
									ssObjs.add(o);
									builder.append(o.jsonSerialize(null, ssObjs, withFormats, prefix + "\t"));
								}
							}
							if (i != xs.length - 1) {
								builder.append(',');
							}
							if (withFormats) {
								builder.append("\r\n");
							}
						}
						if (withFormats) {
							builder.append(prefix);
						}
						builder.append(']');
					} else if (clazz == long.class) {
						long[] xs = (long[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
						builder.append('[');
						if (withFormats) {
							builder.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							builder.append(xs[i]);
							if (i != xs.length - 1) {
								builder.append(',');
							}
							if (withFormats) {
								builder.append(' ');
							}
						}
						builder.append(']');
					} else if (clazz == boolean.class) {
						boolean[] xs = (boolean[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
						builder.append('[');
						if (withFormats) {
							builder.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							builder.append(xs[i]);
							if (i != xs.length - 1) {
								builder.append(',');
							}
							if (withFormats) {
								builder.append(' ');
							}
						}
						builder.append(']');
					} else if (clazz == float.class) {
						float[] xs = (float[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
						builder.append('[');
						if (withFormats) {
							builder.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							builder.append(xs[i]);
							if (i != xs.length - 1) {
								builder.append(',');
							}
							if (withFormats) {
								builder.append(' ');
							}
						}
						builder.append(']');
					} else if (clazz == double.class) {
						double[] xs = (double[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
						builder.append('[');
						if (withFormats) {
							builder.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							builder.append(xs[i]);
							if (i != xs.length - 1) {
								builder.append(',');
							}
							if (withFormats) {
								builder.append(' ');
							}
						}
						builder.append(']');
					} else if (clazz == short.class) {
						short[] xs = (short[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
						builder.append('[');
						if (withFormats) {
							builder.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							builder.append(xs[i]);
							if (i != xs.length - 1) {
								builder.append(',');
							}
							if (withFormats) {
								builder.append(' ');
							}
						}
						builder.append(']');
					} else if (clazz == byte.class) {
						byte[] xs = (byte[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
//						if (this.bytesCompactMode()) {
//							builder.append('\"');
//							builder.append(Base64.byteArrayToBase64(xs));
//							builder.append('\"');
//							if (withFormats) {
//								builder.append(".getBytes ()");
//							} else {
//								builder.append(".getBytes()");
//							}
//						} else {
							builder.append('[');
							if (withFormats) {
								builder.append(' ');
							}
							for (int i = 0; i < xs.length; i++) {
								builder.append(xs[i]);
								if (i != xs.length - 1) {
									builder.append(',');
								}
								if (withFormats) {
									builder.append(' ');
								}
							}
							builder.append(']');
//						}
					} else if (clazz == char.class) {
						char[] xs = (char[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(builder, fieldName, withFormats, prefix);
						builder.append('[');
						if (withFormats) {
							builder.append(' ');
						}
						for (int i = 0; i < xs.length; i++) {
							char c = xs[i];
							builder.append("\'");
							if (c == '\r') {
								builder.append("\\r");
							} else if (c == '\n') {
								builder.append("\\n");
							} else if (c == '\t') {
								builder.append("\\t");
							} else if (c == '\'') {
								builder.append("\\\'");
							} else if (c == '\"') {
								builder.append("\\\"");
							} else {
								builder.append(c);
							}
							builder.append('\'');
							if (i != xs.length - 1) {
								builder.append(',');
							}
							if (withFormats) {
								builder.append(' ');
							}
						}
						builder.append(']');
					} else {
						continue;
					}
				} else if (clazz.isEnum()) {
					Enum<?> e = (Enum<?>) field.get(this);
					if (e == null && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					if (e != null) {
						builder.append(e.ordinal());
					} else {
						builder.append("null");
					}
				} else if (clazz == float.class) {
					float f = field.getFloat(this);
					if (f == 0 && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					builder.append(f);
				} else if (clazz == double.class) {
					double d = field.getDouble(this);
					if (d == 0 && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					builder.append(d);
				} else if (clazz == short.class) {
					short s = field.getShort(this);
					if (s == 0 && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					builder.append(s);
				} else if (clazz == byte.class) {
					byte b = field.getByte(this);
					if (b == 0 && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					builder.append(b);
				} else if (clazz == char.class) {
					char c = field.getChar(this);
					if (c == 0 && ignoring) {
						continue;
					}
					appendFieldName(builder, fieldName, withFormats, prefix);
					builder.append('\'');
					if (c == '\r') {
						builder.append("\\r");
					} else if (c == '\n') {
						builder.append("\\n");
					} else if (c == '\t') {
						builder.append("\\t");
					} else if (c == '\'') {
						builder.append("\\\'");
					} else if (c == '\"') {
						builder.append("\\\"");
					} else {
						builder.append(c);
					}
					builder.append('\'');
				} else {
					continue;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			builder.append(',');
			if (withFormats) {
				builder.append("\r\n");
			}
			commasAppended = true;
		}
		int length = builder.length();
		if (commasAppended) {
			if (withFormats) {
				builder.delete(length - 3, length);
				if (withFormats) {
					builder.append("\r\n");
				}
			} else {
				builder.delete(length - 1, length);
			}
		}
		if (withFormats) {
			builder.append(linePrefix);
		}
    	builder.append('}');

		return builder.toString();
    }

    @J2SIgnore
	private void appendFieldName(StringBuilder builder, String fieldName,
			boolean withFormats, String prefix) {
		if (withFormats) {
			builder.append(prefix);
		}
		builder.append('\"');
		builder.append(fieldName);
		builder.append('\"');
		if (withFormats) {
			builder.append(' ');
		}
		builder.append(':');
		if (withFormats) {
			builder.append(' ');
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
	public boolean deserialize(String str) {
    	List<SimpleSerializable> ssObjs = new LinkedList<SimpleSerializable>();
    	ssObjs.add(this);
    	return deserialize(str, 0, ssObjs);
	}
	
    @J2SIgnore
	public boolean deserializeBytes(byte[] bytes) {
    	List<SimpleSerializable> ssObjs = new LinkedList<SimpleSerializable>();
    	ssObjs.add(this);
    	return deserializeBytes(bytes, 0, ssObjs);
	}
	
    @J2SIgnore
	public boolean deserialize(String str, int start) {
    	List<SimpleSerializable> ssObjs = new LinkedList<SimpleSerializable>();
    	ssObjs.add(this);
    	return deserialize(str, start, ssObjs);
	}
	
    @J2SIgnore
	public boolean deserializeBytes(byte[] bytes, int start) {
    	List<SimpleSerializable> ssObjs = new LinkedList<SimpleSerializable>();
    	ssObjs.add(this);
    	return deserializeBytes(bytes, start, ssObjs);
	}
	
    /**
     * Don't override this method unless optimization is a necessary.
     * 
     * @param str
     * @param start
     * @param ssObjs
     * @return
     */
    @J2SIgnore
	protected boolean deserialize(String str, int start, List<SimpleSerializable> ssObjs) {
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
			for (int i = last + 1; i < index; i++) {
				char c = str.charAt(i);
				if (c != '0') {
					try {
						size = Integer.parseInt(str.substring(i, index));
					} catch (NumberFormatException e) {
						throw new RuntimeException("Invalid simple format.", e);
					}
					break;
				}
			}
			// all fields are in their default values or no fields
			if (size == 0) return true;
			index++;
			// may be empty string or not enough string!
			if (index + size > end) return false;
		}
		
		Class<?> clazzType = this.getClass();
		Map<String, Field> fieldMap = getSerializableFields(clazzType.getName(), clazzType);
		int objectEnd = index + size;
		Map<String, String> fieldAliasMap = getSimpleVersion() >= 202 ? fieldAliasMapping() : null;
		String[] fMap = fieldAliasMap == null ? fieldMapping() : null;
		while (index < end && index < objectEnd) {
			char c1 = str.charAt(index++);
			int l1 = c1 - baseChar;
			if (l1 < 0 || index + l1 > end) throw new RuntimeException("Invalid simple format.");
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
							if (l3 < 0 || index + l3 > end) throw new RuntimeException("Invalid simple format.");
							l2 = Integer.parseInt(str.substring(index, index + l3));
							index += l3;
							if (l2 < 0) throw new RuntimeException("Invalid simple format.");
							if (l2 > 0x1000000) { // 16 * 1024 * 1024
								/*
								 * Some malicious string may try to allocate huge size of array!
								 * Limit the size of array here! 
								 */
								throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
							}
						}
						if (c2 == '8') { // byte[]
							if (index + l2 > end) throw new RuntimeException("Invalid simple format.");
							index += l2;
							if (field == null) {
								continue;
							}
							String byteStr = str.substring(index - l2, index);
							byte[] bs = byteStr.getBytes(ISO_8859_1);
							field.set(this, bs);
							continue;
						}
						if (c2 == 'W') {
							if (field == null) {
								continue;
							}
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
								objCollection.add(o.object);
								index = o.index;
							}
							if (field == null) {
								continue;
							}
							field.set(this, objCollection);
							continue;
						} else if (c2 == 'M') {
							Map<Object, Object> objMap = new HashMap<Object, Object>(l2);
							for (int i = 0; i < l2 / 2; i++) {
								DeserializeObject key = deserializeArrayItem(str, index, end, ssObjs);
								index = key.index;
								DeserializeObject value = deserializeArrayItem(str, index, end, ssObjs);
								index = value.index;
								objMap.put(key.object, value.object);
							}
							if (field == null) {
								continue;
							}
							field.set(this, objMap);
							continue;
						}
						String[] ss = new String[l2];
						for (int i = 0; i < l2; i++) {
							char c4 = str.charAt(index++);
							if (c2 != 'X' && c2 != 'O') { // short value string
								int l3 = c4 - baseChar;
								if (l3 > 0) {
									if (index + l3 > end) throw new RuntimeException("Invalid simple format.");
									ss[i] = str.substring(index, index + l3);
									index += l3;
								} else if (l3 == 0) {
									ss[i] = "";
								}
							} else {
								char c5 = str.charAt(index++);
								int l3 = c5 - baseChar;
								if (l3 > 0) {
									if (index + l3 > end) throw new RuntimeException("Invalid simple format.");
									ss[i] = str.substring(index, index + l3);
									index += l3;
								} else if (l3 == 0) {
									ss[i] = "";
								} else if (l3 == -2) {
									char c6 = str.charAt(index++);
									int l4 = c6 - baseChar;
									if (l4 < 0 || index + l4 > end) throw new RuntimeException("Invalid simple format.");
									int l5 = Integer.parseInt(str.substring(index, index + l4));
									index += l4;
									if (l5 < 0 || index + l5 > end) throw new RuntimeException("Invalid simple format.");
									ss[i] = str.substring(index, index + l5);
									index += l5;
								} else {
									continue;
								}
								if (c4 == 'u') {
									ss[i] = new String(Base64.base64ToByteArray(ss[i]), UTF_8);
								} else if (c4 == 'U' || c4 == 'X') {
									ss[i] = new String(ss[i].getBytes(ISO_8859_1), UTF_8);
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
					throw new RuntimeException(e);
				}
			} else {
				char c3 = str.charAt(index++);
				int l2 = c3 - baseChar;
				String s = null;
				if (l2 > 0) {
					if (index + l2 > end) throw new RuntimeException("Invalid simple format.");
					s = str.substring(index, index + l2);
					index += l2;
				} else if (l2 == 0) {
					s = "";
				} else if (l2 == -2) {
					char c4 = str.charAt(index++);
					int l3 = c4 - baseChar;
					if (l3 < 0 || index + l3 > end) throw new RuntimeException("Invalid simple format.");
					int l4 = Integer.parseInt(str.substring(index, index + l3));
					index += l3;
					if (l4 < 0 || index + l4 > end) throw new RuntimeException("Invalid simple format.");
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
						s = new String(Base64.base64ToByteArray(s), UTF_8);
						field.set(this, s);
						break;
					case 'U':
						s = new String(s.getBytes(ISO_8859_1), UTF_8);
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
					throw new RuntimeException(e);
				}
			}
		}
		return true;
	}
	
    @J2SIgnore
	protected static int bytesIndexOf(byte[] bytes, byte b, int fromIndex) {
    	int i = fromIndex;
    	int max = bytes.length;
    	for (; i < max ; i++) {
    		if (bytes[i] == b) {
    			return i;
    		}
    	}
    	return -1;
    }
    
    /**
     * Don't override this method unless optimization is a necessary.
     * 
     * @param bytes
     * @param start
     * @param ssObjs
     * @return
     */
    @J2SIgnore
	protected boolean deserializeBytes(byte[] bytes, int start, List<SimpleSerializable> ssObjs) {
		char baseChar = 'B';
		if (bytes == null || start < 0) return false;
		int end = bytes.length;
		int length = end - start;
		if (length <= 7) return false;
		if ('W' != bytes[start] || 'L' != bytes[start + 1] || 'L' != bytes[start + 2]) {
			throw new RuntimeException("Invalid simple format.");
		}
		setSimpleVersion(100 * bytes[start + 3] + 10 * bytes[start + 4] + bytes[start + 5] - '0' * 111);
		int index = bytesIndexOf(bytes, (byte) '#', start);
		if (index == -1) throw new RuntimeException("Invalid simple format.");
		index++;
		if (index >= end) return false; // may be empty string!
		
		int size = 0;
		char nextChar = (char) bytes[index];
		if (nextChar >= '0' && nextChar <= '9') {
			// have size!
			int last = index;
			index = bytesIndexOf(bytes, (byte) '$', last);
			if (index == -1) throw new RuntimeException("Invalid simple format.");
			for (int i = last + 1; i < index; i++) {
				if (bytes[i] != '0') {
					for (; i < index; i++) {
						size = ((size << 3) + (size << 1)) + (bytes[i] - '0'); // size * 10
					}
//					try {
//						size = Integer.parseInt(new String(bytes, i, index - i));
//					} catch (NumberFormatException e) {
//						throw new RuntimeException("Invalid simple format.");
//					}
					break;
				}
			}
			// all fields are in their default values or no fields
			if (size == 0) return true;
			index++;
			// may be empty string or not enough string!
			if (index + size > end) return false;
		}
		
		Class<?> clazzType = this.getClass();
		Map<String, Field> fieldMap = getSerializableFields(clazzType.getName(), clazzType);
		int objectEnd = index + size;
		Map<String, String> fieldAliasMap = getSimpleVersion() >= 202 ? fieldAliasMapping() : null;
		String[] fMap = fieldAliasMap == null ? fieldMapping() : null;
		while (index < end && index < objectEnd) {
			char c1 = (char) bytes[index++];
			int l1 = c1 - baseChar;
			if (l1 < 0 || index + l1 > end) throw new RuntimeException("Invalid simple format.");
			String fieldName = new String(bytes, index, l1);
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
			char c2 = (char) bytes[index++];
			if (c2 == 'A' || c2 == 'Z' || c2 == 'Y') {
				Field field = (Field) fieldMap.get(fieldName);
				c2 = (char) bytes[index++]; // shift c2 to next char
				char c3 = (char) bytes[index++];
				int l2 = c3 - baseChar;
				try {
					if (l2 < 0 && l2 != -2) {
						if (field == null) {
							continue;
						}
						field.set(this, null);
					} else {
						if (l2 == -2) {
							char c4 = (char) bytes[index++];
							int l3 = c4 - baseChar;
							if (l3 < 0 || index + l3 > end) throw new RuntimeException("Invalid simple format.");
							l2 = Integer.parseInt(new String(bytes, index, l3));
							index += l3;
							if (l2 < 0) throw new RuntimeException("Invalid simple format.");
							if (l2 > 0x1000000) { // 16 * 1024 * 1024
								/*
								 * Some malicious string may try to allocate huge size of array!
								 * Limit the size of array here! 
								 */
								throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
							}
						}
						if (c2 == '8') { // byte[]
							if (index + l2 > end) throw new RuntimeException("Invalid simple format.");
							index += l2;
							if (field == null) {
								continue;
							}
							byte[] bs = new byte[l2];
							System.arraycopy(bytes, index - l2, bs, 0, l2);
							field.set(this, bs);
							continue;
						}
						if (c2 == 'W') {
							if (field == null) {
								continue;
							}
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
								DeserializeObject o = deserializeBytesArrayItem(bytes, index, end, ssObjs);
								objCollection.add(o.object);
								index = o.index;
							}
							if (field == null) {
								continue;
							}
							field.set(this, objCollection);
							continue;
						} else if (c2 == 'M') {
							Map<Object, Object> objMap = new HashMap<Object, Object>(l2);
							for (int i = 0; i < l2 / 2; i++) {
								DeserializeObject key = deserializeBytesArrayItem(bytes, index, end, ssObjs);
								index = key.index;
								DeserializeObject value = deserializeBytesArrayItem(bytes, index, end, ssObjs);
								index = value.index;
								objMap.put(key.object, value.object);
							}
							if (field == null) {
								continue;
							}
							field.set(this, objMap);
							continue;
						}
						String[] ss = new String[l2];
						for (int i = 0; i < l2; i++) {
							char c4 = (char) bytes[index++];
							if (c2 != 'X' && c2 != 'O') {
								int l3 = c4 - baseChar;
								if (l3 > 0) {
									if (index + l3 > end) throw new RuntimeException("Invalid simple format.");
									if (c4 == 'u') {
										ss[i] = new String(Base64.base64ToByteArray(new String(bytes, index, l3)), UTF_8);
									} else if (c4 == 'U') { // not supported in v202
									 	ss[i] = new String(bytes, index, l3, UTF_8);
									} else {
										ss[i] = new String(bytes, index, l3); // c4 == 's' or others
									}
									index += l3;
								} else if (l3 == 0) {
									ss[i] = "";
								}
							} else { // X or O
								char c5 = (char) bytes[index++];
								int l3 = c5 - baseChar;
								if (l3 > 0) {
									if (index + l3 > end) throw new RuntimeException("Invalid simple format.");
									if (c4 == 'u') {
										ss[i] = new String(Base64.base64ToByteArray(new String(bytes, index, l3)), UTF_8);
									} else if (c4 == 'O' || c4 == 'U') {
										ss[i] = new String(bytes, index, l3, c4 == 'U' ? UTF_8 : ISO_8859_1);
									} else {
										ss[i] = new String(bytes, index, l3); // c4 == 's' or others
									}
									index += l3;
								} else if (l3 == 0) {
									ss[i] = "";
								} else if (l3 == -2) {
									char c6 = (char) bytes[index++];
									int l4 = c6 - baseChar;
									if (l4 < 0 || index + l4 > end) throw new RuntimeException("Invalid simple format.");
									int l5 = Integer.parseInt(new String(bytes, index, l4));
									index += l4;
									if (l5 < 0 || index + l5 > end) throw new RuntimeException("Invalid simple format.");
									if (c4 == 'u') {
										ss[i] = new String(Base64.base64ToByteArray(new String(bytes, index, l5)), UTF_8);
									} else if (c4 == 'O' || c4 == 'U') {
										ss[i] = new String(bytes, index, l5, c4 == 'U' ? UTF_8 : ISO_8859_1);
									} else {
										ss[i] = new String(bytes, index, l5); // c4 == 's' or others
									}
									index += l5;
								} else {
									continue;
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
					throw new RuntimeException(e);
				}
			} else {
				char c3 = (char) bytes[index++];
				int l2 = c3 - baseChar;
				String s = null;
				if (l2 > 0) {
					if (index + l2 > end) throw new RuntimeException("Invalid simple format.");
					if (c2 == 'u') {
						s = new String(Base64.base64ToByteArray(new String(bytes, index, l2)), UTF_8);
					} else if (c2 == 'U' || c2 == 'O') {
						s = new String(bytes, index, l2, c2 == 'U' ? UTF_8 : ISO_8859_1);
					} else {
						s = new String(bytes, index, l2); // c2 == 's' and others
					}
					index += l2;
				} else if (l2 == 0) {
					s = "";
				} else if (l2 == -2) {
					char c4 = (char) bytes[index++];
					int l3 = c4 - baseChar;
					if (l3 < 0 || index + l3 > end) throw new RuntimeException("Invalid simple format.");
					int l4 = Integer.parseInt(new String(bytes, index, l3));
					index += l3;
					if (l4 < 0 || index + l4 > end) throw new RuntimeException("Invalid simple format.");
					if (c2 == 'u') {
						s = new String(Base64.base64ToByteArray(new String(bytes, index, l4)), UTF_8);
					} else if (c2 == 'U' || c2 == 'O') {
						s = new String(bytes, index, l4, c2 == 'U' ? UTF_8 : ISO_8859_1);
					} else {
						s = new String(bytes, index, l4);
					}
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
						field.set(this, s);
						break;
					case 'U':
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
					throw new RuntimeException(e);
				}
			}
		}
		return true;
	}

    /**
     * Don't override this method unless optimization is a necessary.
     * 
     * @param str
     * @param index
     * @param end
     * @param ssObjs
     * @return
     */
    @J2SIgnore
    protected DeserializeObject deserializeArrayItem(String str, int index, int end, List<SimpleSerializable> ssObjs) {
    	char baseChar = 'B';
		char c2 = str.charAt(index++);
		if (c2 == 'A' || c2 == 'Z' || c2 == 'Y') {
			c2 = str.charAt(index++);
			char c3 = str.charAt(index++);
			int l2 = c3 - baseChar;
			try {
				if (l2 < 0 && l2 != -2) {
					return new DeserializeObject(null, index);
				} else {
					if (l2 == -2) {
						char c4 = str.charAt(index++);
						int l3 = c4 - baseChar;
						if (l3 < 0 || index + l3 > end) throw new RuntimeException("Invalid simple format.");
						l2 = Integer.parseInt(str.substring(index, index + l3));
						index += l3;
						if (l2 < 0) throw new RuntimeException("Invalid simple format.");
						if (l2 > 0x1000000) { // 16 * 1024 * 1024
							/*
							 * Some malicious string may try to allocate huge size of array!
							 * Limit the size of array here! 
							 */
							throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
						}
					}
					if (c2 == '8') { // byte[]
						if (index + l2 > end) throw new RuntimeException("Invalid simple format.");
						String byteStr = str.substring(index, index + l2);
						index += l2;
						byte[] bs = byteStr.getBytes(ISO_8859_1);
						return new DeserializeObject(bs, index);
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
							objCollection.add(o.object);
							index = o.index;
						}
						return new DeserializeObject(objCollection, index);
					} else if (c2 == 'M') {
						Map<Object, Object> objMap = new HashMap<Object, Object>(l2);
						for (int i = 0; i < l2 / 2; i++) {
							DeserializeObject key = deserializeArrayItem(str, index, end, ssObjs);
							index = key.index;
							DeserializeObject value = deserializeArrayItem(str, index, end, ssObjs);
							index = value.index;
							objMap.put(key.object, value.object);
						}
						return new DeserializeObject(objMap, index);
					}
					String[] ss = new String[l2];
					for (int i = 0; i < l2; i++) {
						char c4 = str.charAt(index++);
						if (c2 != 'X' && c2 != 'O') {
							int l3 = c4 - baseChar;
							if (l3 > 0) {
								if (index + l3 > end) throw new RuntimeException("Invalid simple format.");
								ss[i] = str.substring(index, index + l3);
								index += l3;
							} else if (l3 == 0) {
								ss[i] = "";
							}
						} else {
							char c5 = str.charAt(index++);
							int l3 = c5 - baseChar;
							if (l3 > 0) {
								if (index + l3 > end) throw new RuntimeException("Invalid simple format.");
								ss[i] = str.substring(index, index + l3);
								index += l3;
							} else if (l3 == 0) {
								ss[i] = "";
							} else if (l3 == -2) {
								char c6 = str.charAt(index++);
								int l4 = c6 - baseChar;
								if (l4 < 0 || index + l4 > end) throw new RuntimeException("Invalid simple format.");
								int l5 = Integer.parseInt(str.substring(index, index + l4));
								index += l4;
								if (l5 < 0 || index + l5 > end) throw new RuntimeException("Invalid simple format.");
								ss[i] = str.substring(index, index + l5);
								index += l5;
							} else {
								continue;
							}
							if (c4 == 'u') {
								ss[i] = new String(Base64.base64ToByteArray(ss[i]), UTF_8);
							} else if (c4 == 'U') {
								ss[i] = new String(ss[i].getBytes(ISO_8859_1), UTF_8);
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
						return new DeserializeObject(ns, index);
					}
					case 'X':
						return new DeserializeObject(ss, index);
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
						return new DeserializeObject(sss, index);
					}
					case 'L': {
						long[] ls = new long[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								ls[i] = Long.parseLong(ss[i]);
							}
						}
						return new DeserializeObject(ls, index);
					}
					case 'b': {
						boolean[] bs = new boolean[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null && ss[i].length() > 0) {
								char c = ss[i].charAt(0);
								bs[i] = (c == '1' || c == 't');
							}
						}
						return new DeserializeObject(bs, index);
					}
					case 'F': {
						float[] fs = new float[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								fs[i] = Float.parseFloat(ss[i]);
							}
						}
						return new DeserializeObject(fs, index);
					}
					case 'D': {
						double[] ds = new double[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								ds[i] = Double.parseDouble(ss[i]);
							}
						}
						return new DeserializeObject(ds, index);
					}
					case 'S': {
						short[] sts = new short[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								sts[i] = Short.parseShort(ss[i]);
							}
						}
						return new DeserializeObject(sts, index);
					}
					case 'B': {
						byte[] bs = new byte[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								bs[i] = Byte.parseByte(ss[i]);
							}
						}
						return new DeserializeObject(bs, index);
					}
					case 'C': {
						char[] cs = new char[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								cs[i] = (char) Integer.parseInt(ss[i]);
							}
						}
						return new DeserializeObject(cs, index);
					}
					default :
						return new DeserializeObject(null, index);
					}
				}
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		} else {
			char c3 = str.charAt(index++);
			int l2 = c3 - baseChar;
			String s = null;
			if (l2 > 0) {
				if (index + l2 > end) throw new RuntimeException("Invalid simple format.");
				s = str.substring(index, index + l2);
				index += l2;
			} else if (l2 == 0) {
				s = "";
			} else if (l2 == -2) {
				char c4 = str.charAt(index++);
				int l3 = c4 - baseChar;
				if (l3 < 0 || index + l3 > end) throw new RuntimeException("Invalid simple format.");
				int l4 = Integer.parseInt(str.substring(index, index + l3));
				index += l3;
				if (l4 < 0 || index + l4 > end) throw new RuntimeException("Invalid simple format.");
				s = str.substring(index, index + l4);
				index += l4;
			}
			try {
				switch (c2) {
				case 'I':
					return new DeserializeObject(Integer.valueOf(s), index);
				case 's':
					return new DeserializeObject(s, index);
				case 'L':
					return new DeserializeObject(Long.valueOf(s), index);
				case 'b': {
					char c = s.charAt(0);
					return new DeserializeObject(Boolean.valueOf(c == '1' || c == 't'), index);
				}
				case 'O': 
					if (s != null) {
						SimpleSerializable ss = SimpleSerializable.parseInstance(s);
						ssObjs.add(ss);
						ss.deserialize(s, 0, ssObjs);
						return new DeserializeObject(ss, index);
					} else {
						return new DeserializeObject(null, index);
					}
				case 'o': {
					int idx = Integer.parseInt(s);
					SimpleSerializable ss = null;
					if (idx < ssObjs.size()) {
						ss = ssObjs.get(idx);
					}
					return new DeserializeObject(ss, index);
				}
				case 'u':
					s = new String(Base64.base64ToByteArray(s), UTF_8);
					return new DeserializeObject(s, index);
				case 'U':
					s = new String(s.getBytes(ISO_8859_1), UTF_8);
					return new DeserializeObject(s, index);
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
						return new DeserializeObject(eo, index);
					} else {
						return new DeserializeObject(null, index);
					}
				case 'F':
					return new DeserializeObject(Float.valueOf(s), index);
				case 'D':
					return new DeserializeObject(Double.valueOf(s), index);
				case 'S':
					return new DeserializeObject(Short.valueOf(s), index);
				case 'B':
					return new DeserializeObject(Byte.valueOf(s), index);
				case 'C':
					return new DeserializeObject(Character.valueOf((char) Integer.parseInt(s)), index);
				default:
					return new DeserializeObject(null, index);
				}
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
    }

    /**
     * Don't override this method unless optimization is a necessary.
     * 
     * @param bytes
     * @param index
     * @param end
     * @param ssObjs
     * @return
     */
    @J2SIgnore
    protected DeserializeObject deserializeBytesArrayItem(byte[] bytes, int index, int end, List<SimpleSerializable> ssObjs) {
    	char baseChar = 'B';
		char c2 = (char) bytes[index++];
		if (c2 == 'A' || c2 == 'Z' || c2 == 'Y') {
			c2 = (char) bytes[index++];
			char c3 = (char) bytes[index++];
			int l2 = c3 - baseChar;
			try {
				if (l2 < 0 && l2 != -2) {
					return new DeserializeObject(null, index); // throw error?
				} else {
					if (l2 == -2) {
						char c4 = (char) bytes[index++];
						int l3 = c4 - baseChar;
						if (l3 < 0 || index + l3 > end) throw new RuntimeException("Invalid simple format.");
						l2 = Integer.parseInt(new String(bytes, index, l3));
						index += l3;
						if (l2 < 0) throw new RuntimeException("Invalid simple format.");
						if (l2 > 0x1000000) { // 16 * 1024 * 1024
							/*
							 * Some malicious string may try to allocate huge size of array!
							 * Limit the size of array here! 
							 */
							throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
						}
					}
					if (c2 == '8') { // byte[]
						if (index + l2 > end) throw new RuntimeException("Invalid simple format.");
						/*
						String byteStr = new String(bytes, index, l2, ISO_8859_1);
						index += l2;
						byte[] bs = byteStr.getBytes(ISO_8859_1);
						*/
						byte[] bs = new byte[l2];
						System.arraycopy(bytes, index, bs, 0, l2);
						index += l2;
						return new DeserializeObject(bs, index);
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
							DeserializeObject o = deserializeBytesArrayItem(bytes, index, end, ssObjs);
							objCollection.add(o.object);
							index = o.index;
						}
						return new DeserializeObject(objCollection, index);
					} else if (c2 == 'M') {
						Map<Object, Object> objMap = new HashMap<Object, Object>(l2);
						for (int i = 0; i < l2 / 2; i++) {
							DeserializeObject key = deserializeBytesArrayItem(bytes, index, end, ssObjs);
							index = key.index;
							DeserializeObject value = deserializeBytesArrayItem(bytes, index, end, ssObjs);
							index = value.index;
							objMap.put(key.object, value.object);
						}
						return new DeserializeObject(objMap, index);
					}
					String[] ss = new String[l2];
					for (int i = 0; i < l2; i++) {
						char c4 = (char) bytes[index++];
						if (c2 != 'X' && c2 != 'O') {
							int l3 = c4 - baseChar;
							if (l3 > 0) {
								if (index + l3 > end) throw new RuntimeException("Invalid simple format.");
								if (c4 == 'u') {
									ss[i] = new String(Base64.base64ToByteArray(new String(bytes, index, l3)), UTF_8);
								} else if (c4 == 'U') {
									ss[i] = new String(bytes, index, l3, UTF_8);
								} else { // c4 == 's' or others
									ss[i] = new String(bytes, index, l3);
								}
								index += l3;
							} else if (l3 == 0) {
								ss[i] = "";
							}
						} else {
							char c5 = (char) bytes[index++];
							int l3 = c5 - baseChar;
							if (l3 > 0) {
								if (index + l3 > end) throw new RuntimeException("Invalid simple format.");
								if (c4 == 'u') {
									ss[i] = new String(Base64.base64ToByteArray(new String(bytes, index, l3)), UTF_8);
								} else if (c4 == 'U' || c4 == 'O') {
									ss[i] = new String(bytes, index, l3, c4 == 'U' ? UTF_8 : ISO_8859_1);
								} else { // c4 == 's'
									ss[i] = new String(bytes, index, l3);
								}
								index += l3;
							} else if (l3 == 0) {
								ss[i] = "";
							} else if (l3 == -2) {
								char c6 = (char) bytes[index++];
								int l4 = c6 - baseChar;
								if (l4 < 0 || index + l4 > end) throw new RuntimeException("Invalid simple format.");
								int l5 = Integer.parseInt(new String(bytes, index, l4));
								index += l4;
								if (l5 < 0 || index + l5 > end) throw new RuntimeException("Invalid simple format.");
								if (c4 == 'u') {
									ss[i] = new String(Base64.base64ToByteArray(new String(bytes, index, l5)), UTF_8);
								} else if (c4 == 'U' || c4 == 'O') {
									ss[i] = new String(bytes, index, l5, c4 == 'U' ? UTF_8 : ISO_8859_1);
								} else {
									ss[i] = new String(bytes, index, l5);
								}
								index += l5;
							} else {
								continue;
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
						return new DeserializeObject(ns, index);
					}
					case 'X':
						return new DeserializeObject(ss, index);
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
						return new DeserializeObject(sss, index);
					}
					case 'L': {
						long[] ls = new long[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								ls[i] = Long.parseLong(ss[i]);
							}
						}
						return new DeserializeObject(ls, index);
					}
					case 'b': {
						boolean[] bs = new boolean[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null && ss[i].length() > 0) {
								char c = ss[i].charAt(0);
								bs[i] = (c == '1' || c == 't');
							}
						}
						return new DeserializeObject(bs, index);
					}
					case 'F': {
						float[] fs = new float[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								fs[i] = Float.parseFloat(ss[i]);
							}
						}
						return new DeserializeObject(fs, index);
					}
					case 'D': {
						double[] ds = new double[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								ds[i] = Double.parseDouble(ss[i]);
							}
						}
						return new DeserializeObject(ds, index);
					}
					case 'S': {
						short[] sts = new short[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								sts[i] = Short.parseShort(ss[i]);
							}
						}
						return new DeserializeObject(sts, index);
					}
					case 'B': {
						byte[] bs = new byte[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								bs[i] = Byte.parseByte(ss[i]);
							}
						}
						return new DeserializeObject(bs, index);
					}
					case 'C': {
						char[] cs = new char[l2];
						for (int i = 0; i < l2; i++) {
							if (ss[i] != null) {
								cs[i] = (char) Integer.parseInt(ss[i]);
							}
						}
						return new DeserializeObject(cs, index);
					}
					default :
						return new DeserializeObject(null, index);
					}
				}
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		} else {
			char c3 = (char) bytes[index++];
			int l2 = c3 - baseChar;
			String s = null;
			if (l2 > 0) {
				if (index + l2 > end) throw new RuntimeException("Invalid simple format.");
				if (c2 == 'u') {
					s = new String(Base64.base64ToByteArray(new String(bytes, index, l2)), UTF_8);
				} else if (c2 == 'U' || c2 == 'O') {
					s = new String(bytes, index, l2, c2 == 'U' ? UTF_8 : ISO_8859_1);
				} else {
					s = new String(bytes, index, l2); // c2 == 's' or others
				}
				index += l2;
			} else if (l2 == 0) {
				s = "";
			} else if (l2 == -2) {
				char c4 = (char) bytes[index++];
				int l3 = c4 - baseChar;
				if (l3 < 0 || index + l3 > end) throw new RuntimeException("Invalid simple format.");
				int l4 = Integer.parseInt(new String(bytes, index, l3));
				index += l3;
				if (l4 < 0 || index + l4 > end) throw new RuntimeException("Invalid simple format.");
				if (c2 == 'u') {
					s = new String(Base64.base64ToByteArray(new String(bytes, index, l4)), UTF_8);
				} else if (c2 == 'U' || c2 == 'O') {
					s = new String(bytes, index, l4, c2 == 'U' ? UTF_8 : ISO_8859_1);
				} else {
					s = new String(bytes, index, l4); // c2 == 's' or others
				}
				index += l4;
			}
			try {
				switch (c2) {
				case 'I':
					return new DeserializeObject(Integer.valueOf(s), index);
				case 's':
					return new DeserializeObject(s, index);
				case 'L':
					return new DeserializeObject(Long.valueOf(s), index);
				case 'b': {
					char c = s.charAt(0);
					return new DeserializeObject(Boolean.valueOf(c == '1' || c == 't'), index);
				}
				case 'O': 
					if (s != null) {
						SimpleSerializable ss = SimpleSerializable.parseInstance(s);
						ssObjs.add(ss);
						ss.deserialize(s, 0, ssObjs);
						return new DeserializeObject(ss, index);
					} else {
						return new DeserializeObject(null, index);
					}
				case 'o': {
					int idx = Integer.parseInt(s);
					SimpleSerializable ss = null;
					if (idx < ssObjs.size()) {
						ss = ssObjs.get(idx);
					}
					return new DeserializeObject(ss, index);
				}
				case 'u':
					return new DeserializeObject(s, index);
				case 'U':
					return new DeserializeObject(s, index);
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
						return new DeserializeObject(eo, index);
					} else {
						return new DeserializeObject(null, index);
					}
				case 'F':
					return new DeserializeObject(Float.valueOf(s), index);
				case 'D':
					return new DeserializeObject(Double.valueOf(s), index);
				case 'S':
					return new DeserializeObject(Short.valueOf(s), index);
				case 'B':
					return new DeserializeObject(Byte.valueOf(s), index);
				case 'C':
					return new DeserializeObject(Character.valueOf((char) Integer.parseInt(s)), index);
				default:
					return new DeserializeObject(null, index);
				}
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
    }
    
    @J2SIgnore
    public static SimpleSerializable parseInstance(Map<String, Object> properties) {
		String clazzName = (String)properties.get("class");
		if (clazzName == null) {
			return null;
		}
		String longClazzName = classAliasMappings.get(clazzName);
		if (longClazzName != null) {
			clazzName = longClazzName;
		}
		SimpleFactory fb = fallbackFactory;
		if (fb != null && classMissed.contains(clazzName)) {
			SimpleSerializable ssInst = fb.createInstance();
			if (ssInst != null) {
				return ssInst;
			}
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
		String longClazzName = classAliasMappings.get(clazzName);
		if (longClazzName != null) {
			clazzName = longClazzName;
		}
		Map<String, Field> fieldMap = getSerializableFields(clazzName, this.getClass());
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
				throw new RuntimeException(e);
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
		Map<String, Field> fields = getSerializableFields(clazz.getName(), clazz);
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
	
	@J2SIgnore
	public static SimpleSerializable parseInstance(byte[] bytes) {
		return parseInstance(bytes, 0, null);
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
	
    @J2SIgnore // Already implemented in previous method!
	public static SimpleSerializable parseInstance(byte[] bytes, int start) {
		return parseInstance(bytes, start, null);
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
	
    @J2SIgnore // Only public to Java!
    public static SimpleSerializable parseInstance(byte[] bytes, SimpleFilter filter) {
		return parseInstance(bytes, 0, filter);
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
		if (length <= 7) return null;
		if (!("WLL".equals(str.substring(start, start + 3)))) return ERROR;
		int v = 0;
		try {
			v = Integer.parseInt(str.substring(start + 3, start + 6));
		} catch (NumberFormatException e1) {
			return ERROR;
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
		SimpleFactory fb = fallbackFactory;
		if (fb != null && classMissed.contains(clazzName)) {
			SimpleSerializable ssInst = fb.createInstance();
			if (ssInst != null) {
				return ssInst;
			}
		}
		Object inst = SimpleClassLoader.loadSimpleInstance(clazzName);
		if (fb != null && inst == null) {
			synchronized (classMutex) {
				classMissed.add(clazzName);
			}
			SimpleSerializable ssInst = fb.createInstance();
			if (ssInst != null) {
				return ssInst;
			}
		}
		if (inst != null && inst instanceof SimpleSerializable) {
			SimpleSerializable ss = (SimpleSerializable) inst;
			if (v >= 202) {
				ss.classNameAbbrev = !clazzName.equals(str.substring(start + 6, index));
			}
			return ss;
		}
		return UNKNOWN;
	}
    
    @J2SIgnore // Only public to Java!
	public static SimpleSerializable parseInstance(byte[] bytes, int start, SimpleFilter filter) {
		if (bytes == null || start < 0) return null;
		int length = bytes.length - start;
		if (length <= 7) return null;
		if ('W' != bytes[start] || 'L' != bytes[start + 1] || 'L' != bytes[start + 2]) return ERROR;
		int v = 100 * bytes[start + 3] + 10 * bytes[start + 4] + bytes[start + 5] - '0' * 111;
		if (v < 0 || v > 999) return ERROR;
		int index = bytesIndexOf(bytes, (byte) '#', start);
		if (index == -1) return null;
		String clazzName = new String(bytes, start + 6, index - (start + 6));
		if (v >= 202) {
			String longClazzName = classAliasMappings.get(clazzName);
			if (longClazzName != null) {
				clazzName = longClazzName;
			}
		}
		if (filter != null) {
			if (!filter.accept(clazzName)) return null;
		}
		SimpleFactory fb = fallbackFactory;
		if (fb != null && classMissed.contains(clazzName)) {
			SimpleSerializable ssInst = fb.createInstance();
			if (ssInst != null) {
				return ssInst;
			}
		}
		Object inst = SimpleClassLoader.loadSimpleInstance(clazzName);
		if (fb != null && inst == null) {
			synchronized (classMutex) {
				classMissed.add(clazzName);
			}
			SimpleSerializable ssInst = fb.createInstance();
			if (ssInst != null) {
				return ssInst;
			}
		}
		if (inst != null && inst instanceof SimpleSerializable) {
			SimpleSerializable ss = (SimpleSerializable) inst;
			if (v >= 202) {
				ss.classNameAbbrev = !clazzName.equals(new String(bytes, start + 6, index - (start + 6)));
			}
			return ss;
		}
		return UNKNOWN;
	}
    
}
