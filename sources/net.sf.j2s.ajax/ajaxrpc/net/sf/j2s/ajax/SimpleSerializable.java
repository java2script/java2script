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
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

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

	@J2SIgnore
	private static Map<String, Map<String, Field>> quickFields = new HashMap<String, Map<String, Field>>();

    @J2SIgnore
	private Map<String, Field> getSerializableFields(String clazzName) {
		Class<?> clazz;
		Map<String, Field> fields = quickFields.get(clazzName);
		if (fields == null) {
			fields = new HashMap<String, Field>();
			clazz = this.getClass();
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
			quickFields.put(clazzName, fields);
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
			buffer[buffer.length] = String.fromCharCode (baseChar - 1);
		} else {
			buffer[buffer.length] = nameStr;
			buffer[buffer.length] = type;
			var l4 = this[name].length;
			if (l4 > 52) {
				if (l4 > 0x1000000) { // 16 * 1024 * 1024
					throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
				}
				buffer[buffer.length] = String.fromCharCode (baseChar - 2);
				var value = "" + l4;
				buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
				buffer[buffer.length] = l4;
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
				} else if (t == 'C') {
					var value = "";
					if (typeof arr[j] == 'number') {
						value += arr[j];
					} else {
						value += arr[j].charCodeAt (0);
					}
					buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
					buffer[buffer.length] = value;
				} else if (t == 'X') {
					this.serializeString (buffer, arr[j]);
				} else if (t == 'O') {
					this.serializeObject (buffer, arr[j], ssObjs);
				}
			}
		}
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
    		Type[] interfaces = ((Class<?>) t).getGenericInterfaces();
    		if (interfaces != null && interfaces.length > 0) {
    			for (int i = 0; i < interfaces.length; i++) {
					Type f = interfaces[i];
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
		StringBuffer buffer = new StringBuffer();
		/*
		 * "WLL" is used to mark Simple RPC, 100 is version 1.0.0, 
		 * # is used to mark the the beginning of serialized data  
		 */
		buffer.append("WLL201");
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
		buffer.append(clazzName);
		buffer.append('#');
		buffer.append("00000000$"); // later the number of size will be updated!
		int headSize = buffer.length();

		Map<String, Field> fields = getSerializableFields(clazzName);
		boolean ignoring = (filter == null || filter.ignoreDefaultFields());
		String[] fMap = fieldMapping();
		try {
			for (Iterator<Field> itr = fields.values().iterator(); itr.hasNext();) {
				Field field = (Field) itr.next();
				String name = field.getName();
				if (filter != null && !filter.accept(name)) continue;
				if (fMap != null && fMap.length > 1) {
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
				String nameStr = (char)(baseChar + name.length()) + name;
				Class<?> type = field.getType();
				if (type == float.class) {
					float f = field.getFloat(this);
					if (f == 0.0 && ignoring) continue;
					buffer.append(nameStr);
					buffer.append('F');
					String value = "" + f;
					buffer.append((char) (baseChar + value.length()));
					buffer.append(f);
				} else if (type == double.class) {
					double d = field.getDouble(this);
					if (d == 0.0d && ignoring) continue;
					buffer.append(nameStr);
					buffer.append('D');
					String value = "" + d;
					buffer.append((char) (baseChar + value.length()));
					buffer.append(d);
				} else if (type == int.class) {
					int n = field.getInt(this);
					if (n == 0 && ignoring) continue;
					buffer.append(nameStr);
					buffer.append('I');
					String value = "" + n;
					buffer.append((char) (baseChar + value.length()));
					buffer.append(n);
				} else if (type == long.class) {
					long l = field.getLong(this);
					if (l == 0L && ignoring) continue;
					buffer.append(nameStr);
					buffer.append('L');
					String value = "" + l;
					buffer.append((char) (baseChar + value.length()));
					buffer.append(l);
				} else if (type == short.class) {
					short s = field.getShort(this);
					if (s == 0 && ignoring) continue;
					buffer.append(nameStr);
					buffer.append('S');
					String value = "" + s;
					buffer.append((char) (baseChar + value.length()));
					buffer.append(s);
				} else if (type == byte.class) {
					byte b = field.getByte(this);
					if (b == 0 && ignoring) continue;
					buffer.append(nameStr);
					buffer.append('B');
					String value = "" + b;
					buffer.append((char) (baseChar + value.length()));
					buffer.append(b);
				} else if (type == char.class) {
					int c = 0 + field.getChar(this);
					if (c == 0 && ignoring) continue;
					buffer.append(nameStr);
					buffer.append('C');
					String value = "" + c;
					buffer.append((char) (baseChar + value.length()));
					buffer.append(c);
				} else if (type == boolean.class) {
					boolean b = field.getBoolean(this);
					if (b == false && ignoring) continue;
					buffer.append(nameStr);
					buffer.append('b');
					String value = b ? "1" : "0";
					buffer.append((char) (baseChar + value.length()));
					buffer.append(value);
				} else if (type == String.class) {
					String s = (String) field.get(this);
					if (s == null && ignoring) continue;
					buffer.append(nameStr);
					serializeString(buffer, s);
				} else if (isSubclassOf(type, SimpleSerializable.class)) {
					SimpleSerializable ssObj = (SimpleSerializable) field.get(this);
					if (ssObj == null && ignoring) continue;
					buffer.append(nameStr);
					serializeObject(buffer, ssObj, ssObjs);
				} else { // Array ...
					if (type == float[].class) {
						float[] fs = (float[]) field.get(this);
						if (fs == null && ignoring) continue;
						buffer.append(nameStr);
						buffer.append("AF");
						if (fs == null) {
							buffer.append((char) (baseChar - 1));
						} else {
							serializeLength(buffer, fs.length);
							for (int j = 0; j < fs.length; j++) {
								float f = fs[j]; 
								String value = "" + f;
								buffer.append((char) (baseChar + value.length()));
								buffer.append(f);
							}
						}
					} else if (type == double[].class) {
						double [] ds = (double []) field.get(this);
						if (ds == null && ignoring) continue;
						buffer.append(nameStr);
						buffer.append("AD");
						if (ds == null) {
							buffer.append((char) (baseChar - 1));
						} else {
							serializeLength(buffer, ds.length);
							for (int j = 0; j < ds.length; j++) {
								double d = ds[j];
								String value = "" + d;
								buffer.append((char) (baseChar + value.length()));
								buffer.append(d);
							}
						}
					} else if (type == int[].class) {
						int [] ns = (int []) field.get(this);
						if (ns == null && ignoring) continue;
						buffer.append(nameStr);
						buffer.append("AI");
						if (ns == null) {
							buffer.append((char) (baseChar - 1));
						} else {
							serializeLength(buffer, ns.length);
							for (int j = 0; j < ns.length; j++) {
								int n = ns[j]; 
								String value = "" + n;
								buffer.append((char) (baseChar + value.length()));
								buffer.append(n);
							}
						}
					} else if (type == long[].class) {
						long [] ls = (long []) field.get(this);
						if (ls == null && ignoring) continue;
						buffer.append(nameStr);
						buffer.append("AL");
						if (ls == null) {
							buffer.append((char) (baseChar - 1));
						} else {
							serializeLength(buffer, ls.length);
							for (int j = 0; j < ls.length; j++) {
								long l = ls[j];
								String value = "" + l;
								buffer.append((char) (baseChar + value.length()));
								buffer.append(l);
							}
						}
					} else if (type == short[].class) {
						short [] ss = (short []) field.get(this);
						if (ss == null && ignoring) continue;
						buffer.append(nameStr);
						buffer.append("AS");
						if (ss == null) {
							buffer.append((char) (baseChar - 1));
						} else {
							serializeLength(buffer, ss.length);
							for (int j = 0; j < ss.length; j++) {
								short s = ss[j];
								String value = "" + s;
								buffer.append((char) (baseChar + value.length()));
								buffer.append(s);
							}
						}
					} else if (type == byte[].class) {
						byte [] bs = (byte []) field.get(this);
						if (bs == null && ignoring) continue;
						buffer.append(nameStr);
						buffer.append(!bytesCompactMode() ? "AB" : "A8");
						if (bs == null) {
							buffer.append((char) (baseChar - 1));
						} else {
							serializeLength(buffer, bs.length);
							if (!bytesCompactMode()) {
								for (int j = 0; j < bs.length; j++) {
									byte b = bs[j];
									String value = "" + b;
									buffer.append((char) (baseChar + value.length()));
									buffer.append(b);
								}
							} else {
								buffer.append(new String(bs, "iso-8859-1"));
							}
						}
					} else if (type == char[].class) {
						char [] cs = (char []) field.get(this);
						if (cs == null && ignoring) continue;
						buffer.append(nameStr);
						buffer.append("AC");
						if (cs == null) {
							buffer.append((char) (baseChar - 1));
						} else {
							serializeLength(buffer, cs.length);
							for (int j = 0; j < cs.length; j++) {
								int c = cs[j];
								String value = "" + c;
								buffer.append((char) (baseChar + value.length()));
								buffer.append(c);
							}
						}
					} else if (type == boolean[].class) {
						boolean [] bs = (boolean []) field.get(this);
						if (bs == null && ignoring) continue;
						buffer.append(nameStr);
						buffer.append("Ab");
						if (bs == null) {
							buffer.append((char) (baseChar - 1));
						} else {
							serializeLength(buffer, bs.length);
							for (int j = 0; j < bs.length; j++) {
								boolean b = bs[j];
								String value = b ? "1" : "0";
								buffer.append((char) (baseChar + value.length()));
								buffer.append(value);
							}
						}
					} else if (type == String[].class) {
						String[] ss = (String []) field.get(this);
						if (ss == null && ignoring) continue;
						buffer.append(nameStr);
						buffer.append("AX"); // special
						if (ss == null) {
							buffer.append((char) (baseChar - 1));
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
						buffer.append(nameStr);
						buffer.append("AO"); // special
						if (ss == null) {
							buffer.append((char) (baseChar - 1));
						} else {
							serializeLength(buffer, ss.length);
							for (int j = 0; j < ss.length; j++) {
								SimpleSerializable s = ss[j];
								serializeObject(buffer, s, ssObjs);
							}
						}
					} else {
						continue; // just ignore it
						// others unknown or unsupported types!
						// throw new RuntimeException("Unsupported data type in Java2Script Simple RPC!");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		int size = buffer.length();
		if (size > 0x1000000) { // 16 * 1024 * 1024
			throw new RuntimeException("Data size reaches the limit of Java2Script Simple RPC!");
		}
		String sizeStr = "" + (size - headSize);
		buffer.replace(headSize - sizeStr.length() - 1, headSize - 1, sizeStr); // update size!
		return buffer.toString();
	}

    @J2SIgnore
	private void serializeLength(StringBuffer buffer, int length) {
		char baseChar = 'B';
		if (length > 52) {
			if (length > 0x1000000) { // 16 * 1024 * 1024
				throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
			}
			buffer.append((char) (baseChar - 2));
			String value = "" + length;
			buffer.append((char) (baseChar + value.length()));
			buffer.append(length);
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
	buffer[buffer.length] = 's';
	buffer[buffer.length] = String.fromCharCode (baseChar - 1);
} else {
	var normal = /^[\r\n\t\u0020-\u007e]*$/.test(s);
	if (normal) {
		buffer[buffer.length] = 's';
	} else {
		buffer[buffer.length] = 'u';
		s = Encoding.encodeBase64 (Encoding.convert2UTF8 (s));
	}
	var l4 = s.length;
	if (l4 > 52) {
		buffer[buffer.length] = String.fromCharCode (baseChar - 2);
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
	private void serializeString(StringBuffer buffer, String s) throws UnsupportedEncodingException {
		char baseChar = 'B';
		if (s != null) {
			byte[] bytes = s.getBytes("utf-8");
			if (s.length() != bytes.length) {
				buffer.append('u');
				//s = new String(bytes, "iso-8859-1");
				s = Base64.byteArrayToBase64(bytes);
			} else {
				buffer.append('s');
			}
			int l4 = s.length();
			if (l4 > 52) {
				buffer.append((char) (baseChar - 2));
				String value = "" + l4;
				buffer.append((char) (baseChar + value.length()));
				buffer.append(l4);
			} else {
				buffer.append((char) (baseChar + l4));
			}
			buffer.append(s);
		} else {
			buffer.append('s');
			buffer.append((char) (baseChar - 1));
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
		var s = "" + idx;
		var l4 = s.length;
		buffer[buffer.length] = String.fromCharCode (baseChar + l4);
		buffer[buffer.length] = s;
		return;
	}
	ssObjs[ssObjs.length] = ss;
}
buffer[buffer.length] = 'O';
if (ss != null) {
	var s = ss.serialize (null, ssObjs); 
	var l4 = s.length;
	if (l4 > 52) {
		buffer[buffer.length] = String.fromCharCode (baseChar - 2);
		var value = "" + l4;
		buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
		buffer[buffer.length] = l4;
	} else {
		buffer[buffer.length] = String.fromCharCode (baseChar + l4);
	}
	buffer[buffer.length] = s;
} else {
	buffer[buffer.length] = String.fromCharCode (baseChar - 1);
}
	 */
    @J2SKeep
	private void serializeObject(StringBuffer buffer, SimpleSerializable ss, List<SimpleSerializable> ssObjs) {
		char baseChar = 'B';
		if (ss != null) {
			int idx = ssObjs.indexOf(ss);
			if (idx != -1) {
				buffer.append('o');
				String s = "" + idx;
				int l4 = s.length();
				buffer.append((char) (baseChar + l4));
				buffer.append(s);
				return;
			}
			ssObjs.add(ss);
		}
		buffer.append('O');
		if (ss != null) {
			String s = ss.serialize(null, ssObjs); 
			int l4 = s.length();
			if (l4 > 52) {
				buffer.append((char) (baseChar - 2));
				String value = "" + l4;
				buffer.append((char) (baseChar + value.length()));
				buffer.append(l4);
			} else {
				buffer.append((char) (baseChar + l4));
			}
			buffer.append(s);
		} else {
			buffer.append((char) (baseChar - 1));
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
    	StringBuffer buffer = new StringBuffer();
    	if (prefix != null) {
    		//buffer.append(prefix);
    		prefix += "\t";
    	}
    	buffer.append("{");
    	if (withFormats) {
    		buffer.append("\r\n");
    	}
    	boolean commasAppended = false;
		boolean ignoring = (filter == null || filter.ignoreDefaultFields());
		Map<String, Field> fieldMap = getSerializableFields(this.getClass().getName());
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
				if (clazz == float.class) {
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
				} else if (clazz == int.class) {
					int i = field.getInt(this);
					if (i == 0 && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(i);
				} else if (clazz == long.class) {
					long l = field.getLong(this);
					if (l == 0 && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(l);
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
					buffer.append("\'");
				} else if (clazz == boolean.class) {
					boolean b = field.getBoolean(this);
					if (b == false && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					buffer.append(b);
				} else if (clazz == String.class) {
					String str = (String) field.get(this);
					if (str == null && ignoring) {
						continue;
					}
					appendFieldName(buffer, fieldName, withFormats, prefix);
					if (str == null) {
						buffer.append("null");
					} else {
						buffer.append("\"");
						buffer.append(str.replaceAll("\r", "\\r")
								.replaceAll("\n", "\\n")
								.replaceAll("\t", "\\t")
								.replaceAll("\'", "\\'")
								.replaceAll("\"", "\\\""));
						buffer.append("\"");
					}
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
							buffer.append("}");
						}
					} else {
						ssObjs.add(o);
						buffer.append(o.jsonSerialize(null, ssObjs, withFormats, prefix));
					}
				} else if (clazz.isArray()) {
					clazz = clazz.getComponentType();
					if (clazz == float.class) {
						float[] xs = (float[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(" ");
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(",");
							}
							if (withFormats) {
								buffer.append(" ");
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
							buffer.append(" ");
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(",");
							}
							if (withFormats) {
								buffer.append(" ");
							}
						}
						buffer.append(']');
					} else if (clazz == int.class) {
						int[] xs = (int[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(" ");
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(",");
							}
							if (withFormats) {
								buffer.append(" ");
							}
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
							buffer.append(" ");
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(",");
							}
							if (withFormats) {
								buffer.append(" ");
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
							buffer.append(" ");
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(",");
							}
							if (withFormats) {
								buffer.append(" ");
							}
						}
						buffer.append(']');
					} else if (clazz == byte.class) {
						byte[] xs = (byte[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						if (this.bytesCompactMode()) {
							buffer.append('\"');
							buffer.append(Base64.byteArrayToBase64(xs));
							buffer.append('\"');
							if (withFormats) {
								buffer.append(".getBytes ()");
							} else {
								buffer.append(".getBytes()");
							}
						} else {
							buffer.append('[');
							if (withFormats) {
								buffer.append(" ");
							}
							for (int i = 0; i < xs.length; i++) {
								buffer.append(xs[i]);
								if (i != xs.length - 1) {
									buffer.append(",");
								}
								if (withFormats) {
									buffer.append(" ");
								}
							}
							buffer.append(']');
						}
					} else if (clazz == char.class) {
						char[] xs = (char[]) field.get(this);
						if (xs == null && ignoring) {
							continue;
						}
						appendFieldName(buffer, fieldName, withFormats, prefix);
						buffer.append('[');
						if (withFormats) {
							buffer.append(" ");
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
							buffer.append("\'");
							if (i != xs.length - 1) {
								buffer.append(",");
							}
							if (withFormats) {
								buffer.append(" ");
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
							buffer.append(" ");
						}
						for (int i = 0; i < xs.length; i++) {
							buffer.append(xs[i]);
							if (i != xs.length - 1) {
								buffer.append(",");
							}
							if (withFormats) {
								buffer.append(" ");
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
								buffer.append("\"");
								buffer.append(str.replaceAll("\r", "\\r")
										.replaceAll("\n", "\\n")
										.replaceAll("\t", "\\t")
										.replaceAll("\'", "\\'")
										.replaceAll("\"", "\\\""));
								buffer.append("\"");
							}
							if (i != xs.length - 1) {
								buffer.append(",");
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
										buffer.append("}");
									}
								} else {
									ssObjs.add(o);
									buffer.append(o.jsonSerialize(null, ssObjs, withFormats, prefix + "\t"));
								}
							}
							if (i != xs.length - 1) {
								buffer.append(",");
							}
							if (withFormats) {
								buffer.append("\r\n");
							}
						}
						if (withFormats) {
							buffer.append(prefix);
						}
						buffer.append(']');
					} else {
						continue;
					}
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
    	buffer.append("}");

		return buffer.toString();
    }

    @J2SIgnore
	private void appendFieldName(StringBuffer buffer, String fieldName,
			boolean withFormats, String prefix) {
		if (withFormats) {
			buffer.append(prefix);
		}
		buffer.append(fieldName);
		if (withFormats) {
			buffer.append(" ");
		}
		buffer.append(':');
		if (withFormats) {
			buffer.append(" ");
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
				if (type == 'F' || type == 'D') {
					arr[i] = parseFloat (s);
				} else if (type == 'I' || type == 'L'
						|| type == 'S' || type == 'B') {
					arr[i] = parseInt (s);
				} else if (type == 'C') {
					arr[i] = String.fromCharCode (parseInt (s));
				} else if (type == 'b') {
					arr[i] = (s.charAt (0) == '1' || s.charAt (0) == 't');
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
		if (type == 'F' || type == 'D') {
			this[fieldName] = parseFloat (s);
		} else if (type == 'I' || type == 'L'
				|| type == 'S' || type == 'B') {
			this[fieldName] = parseInt (s);
		} else if (type == 'C') {
			this[fieldName] = String.fromCharCode (parseInt (s));
		} else if (type == 'b') {
			this[fieldName] = (s.charAt (0) == '1' || s.charAt (0) == 't');
		} else if (type == 's') {
			this[fieldName] = s;
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
		
		Map<String, Field> fieldMap = getSerializableFields(this.getClass().getName());
		int objectEnd = index + size;
		String[] fMap = fieldMapping();
		while (index < end && index < objectEnd) {
			char c1 = str.charAt(index++);
			int l1 = c1 - baseChar;
			if (l1 < 0 || index + l1 > end) return true; // error
			String fieldName = str.substring(index, index + l1);
			index += l1;
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
			char c2 = str.charAt(index++);
			if (c2 == 'A') {
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
								} else {
									ss[i] = new String(ss[i].getBytes("iso-8859-1"), "utf-8");
								}
							}
						}
						if (field == null) {
							continue;
						}
						switch (c2) {
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
						case 'X':
							field.set(this, ss);
							break;
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
					case 'F':
						field.setFloat(this, Float.parseFloat(s));
						break;
					case 'D':
						field.setDouble(this, Double.parseDouble(s));
						break;
					case 'I':
						field.setInt(this, Integer.parseInt(s));
						break;
					case 'L':
						field.setLong(this, Long.parseLong(s));
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
					case 's':
						field.set(this, s);
						break;
					case 'u':
						s = new String(Base64.base64ToByteArray(s), "utf-8");
						field.set(this, s);
						break;
					case 'U':
						s = new String(s.getBytes("iso-8859-1"), "utf-8");
						field.set(this, s);
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
    public static SimpleSerializable parseInstance(Map<String, Object> properties) {
		Class<?> runnableClass = null;
		String clazzName = (String)properties.get("class");
		try {
			runnableClass = Class.forName(clazzName); // !!! JavaScript loading!
			if (runnableClass != null) {
				// SimpleRPCRunnale should always has default constructor
				Constructor<?> constructor = runnableClass.getConstructor(new Class[0]);
				Object obj = constructor.newInstance(new Object[0]);
				if (obj != null && obj instanceof SimpleSerializable) {
					return (SimpleSerializable) obj;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
    }
    
    @J2SIgnore
    public void deserialize(Map<String, Object> properties) {
		String clazzName = (String) properties.get("class");
		Map<String, Field> fieldMap = getSerializableFields(clazzName);
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
				if (clazz == float.class) {
					field.setFloat(this, Float.parseFloat((String) o));
				} else if (clazz == double.class) {
					field.setDouble(this, Double.parseDouble((String) o));
				} else if (clazz == int.class) {
					field.setInt(this, Integer.parseInt((String) o));
				} else if (clazz == long.class) {
					field.setLong(this, Long.parseLong((String) o));
				} else if (clazz == short.class) {
					field.setShort(this, Short.parseShort((String) o));
				} else if (clazz == byte.class) {
					field.setByte(this, Byte.parseByte((String) o));
				} else if (clazz == char.class) {
					field.setChar(this, (char) Integer.parseInt((String) o));
				} else if (clazz == boolean.class) {
					String s = (String) o;
					char c = s.length() > 0 ? s.charAt(0) : '\0';
					field.setBoolean(this, c == '1' || c == 't');
				} else if (clazz == String.class) {
					field.set(this, o);
				} else if (clazz.isArray()) {
					clazz = clazz.getComponentType();
					if (o instanceof String) {
						if (clazz != byte.class) {
							continue; // not list 
						}
					}
					if (clazz == float.class) {
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
					} else if (clazz == int.class) {
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
					} else if (clazz == String.class) {
						List<?> list = (List<?>) o;
						int size = list.size();
						String[] xs = new String[size];
						for (int i = 0; i < xs.length; i++) {
							String s = (String) list.get(i);
							xs[i] = s;
						}
						field.set(this, xs);
					}
				}
			} catch (Exception e) {
				System.out.println("Parsing: " + o + " for field " + fieldName +  "\r\n");
				e.printStackTrace();
			}
		}
    }
    
    /**
     * Fields with alias names.
     * @return
     */
    protected String[] fieldMapping() {
    	return null;
    }

    /**
     * Fields to be ignored while differences are being calculated.
     * @return
     */
    protected String[] fieldDiffIgnored() {
    	return null;
    }
    
    protected boolean bytesCompactMode() {
    	return BYTES_COMPACT_MODE;
    }
    
	/**
	 * Override Object@clone, so this object can be cloned.
	 */
    @J2SIgnore
	public Object clone() throws CloneNotSupportedException {
		Object clone = super.clone();
		
		Map<String, Field> fields = this.getSerializableFields(this.getClass().getName());
		for (Iterator<Field> itr = fields.values().iterator(); itr.hasNext();) {
			Field field = (Field) itr.next();
			Class<?> type = field.getType();
			Object value = null;
			try {
				value = field.get(this);
			} catch (Exception e1) {
				//e1.printStackTrace();
			}
			if (value != null && type.getName().startsWith("[")) {
				Object cloneArr = null;
				if (type == float[].class) {
					float[] as = (float[]) value;
					float[] clones = new float[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
				} else if (type == double[].class) {
					double[] as = (double[]) value;
					double[] clones = new double[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
				} else if (type == int[].class) {
					int[] as = (int[]) value;
					int[] clones = new int[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
				} else if (type == long[].class) {
					long[] as = (long[]) value;
					long[] clones = new long[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
				} else if (type == short[].class) {
					short[] as = (short[]) value;
					short[] clones = new short[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
				} else if (type == byte[].class) {
					byte[] as = (byte[]) value;
					byte[] clones = new byte[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
				} else if (type == char[].class) {
					char[] as = (char[]) value;
					char[] clones = new char[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
				} else if (type == boolean[].class) {
					boolean[] as = (boolean[]) value;
					boolean[] clones = new boolean[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
				} else if (type == String[].class) {
					String[] as = (String[]) value;
					String[] clones = new String[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
				} else if (type == Object[].class) {
					Object[] as = (Object[]) value;
					Object[] clones = new Object[as.length];
					for (int j = 0; j < clones.length; j++) {
						clones[j] = as[j];
					}
					cloneArr = clones;
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
		int index = str.indexOf('#', start);
		if (index == -1) return null;
		String clazzName = str.substring(start + 6, index);
		if (filter != null) {
			if (!filter.accept(clazzName)) return null;
		}
		try {
			Class<?> runnableClass = Class.forName(clazzName); // !!! JavaScript loading!
			if (runnableClass != null) {
				// SimpleRPCRunnale should always has default constructor
				Constructor<?> constructor = runnableClass.getConstructor(new Class[0]);
				Object obj = constructor.newInstance(new Object[0]);
				if (obj != null && obj instanceof SimpleSerializable) {
					return (SimpleSerializable) obj;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return UNKNOWN;
	}
}
