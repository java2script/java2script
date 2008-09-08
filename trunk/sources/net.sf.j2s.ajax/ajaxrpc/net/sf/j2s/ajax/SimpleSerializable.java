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
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author zhou renjian
 *
 * 2006-10-11
 */
public class SimpleSerializable implements Cloneable {
	
	/**
	 * @return
	 * 
	 * @j2sNative
var baseChar = 'B'.charCodeAt (0);
var buffer = [];
buffer[0] = "WLL101";
var oClass = this.getClass();
var clazz = oClass;
var clazzName = clazz.getName();
var idx = -1;
while ((idx = clazzName.lastIndexOf('$')) != -1) {
	if (clazzName.length > idx + 1) {
		var ch = clazzName.charCodeAt (idx + 1);
		if (ch < 48 || ch >= 58) { // not a number!
			break; // inner class
		} 
	}
	clazz = clazz.getSuperclass();
	if (clazz == null) {
		break;
	}
	clazzName = clazz.getName();
}
buffer[1] = clazzName;
buffer[2] = '#';
buffer[3] = "00000000$"
var headSize = buffer.join ('').length;

var fields = oClass.declared$Fields;
if (fields == null) return "";
for (var i = 0; i < fields.length; i++) {
	var field = fields[i];
	var name = field.name;
	buffer[buffer.length] = String.fromCharCode (baseChar + name.length);
	buffer[buffer.length] = name;
	var type = field.type;
	if (type == 'F' || type == 'D' || type == 'I' || type == 'L'
			|| type == 'S' || type == 'B' || type == 'b') {
		buffer[buffer.length] = type;
		var value = "" + this[name];
		buffer[buffer.length] = String.fromCharCode (baseChar + value.length);
		buffer[buffer.length] = value;
	} else if (type == 'C') {
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
		this.serializeString(buffer, this[name]);
	} else if (type.charAt (0) == 'A') {
		buffer[buffer.length] = type;
		if (this[name] == null) {
			buffer[buffer.length] = String.fromCharCode (baseChar - 1);
		} else {
			var l4 = this[name].length;
			if (l4 > 52) {
				if (l4 > 0x4000) { // 16 * 1024
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
					var value = "" + arr[j];
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
					this.serializeString(buffer, arr[j]);
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
	
	/**
	 * @param filter
	 * @return
	 * 
	 * @j2sIgnore Only public to Java!
	 */
	public String serialize(SimpleFilter filter) {
		char baseChar = 'B';
		StringBuffer buffer = new StringBuffer();
		/*
		 * "WLL" is used to mark Simple RPC, 100 is version 1.0.0, 
		 * # is used to mark the the beginning of serialized data  
		 */
		buffer.append("WLL101");
		Class clazz = this.getClass();
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

		Set fieldSet = new HashSet();
		clazz = this.getClass();
		while(clazz != null && !"net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())) {
			Field[] fields = clazz.getDeclaredFields();
			for (int i = 0; i < fields.length; i++) {
				fieldSet.add(fields[i]);
			}
			clazz = clazz.getSuperclass();
		}
		try {
			Field[] fields = (Field []) fieldSet.toArray(new Field[0]);
			for (int i = 0; i < fields.length; i++) {
				Field field = fields[i];
				int modifiers = field.getModifiers();
				if ((modifiers & (Modifier.PUBLIC | Modifier.PROTECTED)) != 0
						&& (modifiers & Modifier.TRANSIENT) == 0
						&& (modifiers & Modifier.STATIC) == 0) {
					String name = field.getName();
					if (filter != null && !filter.accept(name)) continue;
					buffer.append((char)(baseChar + name.length()));
					buffer.append(name);
					Class type = field.getType();
					if (type == float.class) {
						buffer.append('F');
						float f = field.getFloat(this);
						String value = "" + f;
						buffer.append((char) (baseChar + value.length()));
						buffer.append(f);
					} else if (type == double.class) {
						buffer.append('D');
						double d = field.getDouble(this);
						String value = "" + d;
						buffer.append((char) (baseChar + value.length()));
						buffer.append(d);
					} else if (type == int.class) {
						buffer.append('I');
						int n = field.getInt(this);
						String value = "" + n;
						buffer.append((char) (baseChar + value.length()));
						buffer.append(n);
					} else if (type == long.class) {
						buffer.append('L');
						long l = field.getLong(this);
						String value = "" + l;
						buffer.append((char) (baseChar + value.length()));
						buffer.append(l);
					} else if (type == short.class) {
						buffer.append('S');
						short s = field.getShort(this);
						String value = "" + s;
						buffer.append((char) (baseChar + value.length()));
						buffer.append(s);
					} else if (type == byte.class) {
						buffer.append('B');
						byte b = field.getByte(this);
						String value = "" + b;
						buffer.append((char) (baseChar + value.length()));
						buffer.append(b);
					} else if (type == char.class) {
						buffer.append('C');
						int c = 0 + field.getChar(this);
						String value = "" + c;
						buffer.append((char) (baseChar + value.length()));
						buffer.append(c);
					} else if (type == boolean.class) {
						buffer.append('b');
						boolean b = field.getBoolean(this);
						String value = "" + b;
						buffer.append((char) (baseChar + value.length()));
						buffer.append(b);
					} else if (type == String.class) {
						String s = (String) field.get(this);
						serializeString(buffer, s);
					} else { // Array ...
						if (type == float[].class) {
							buffer.append("AF");
							float[] fs = (float[]) field.get(this);
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
							buffer.append("AD");
							double [] ds = (double []) field.get(this);
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
							buffer.append("AI");
							int [] ns = (int []) field.get(this);
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
							buffer.append("AL");
							long [] ls = (long []) field.get(this);
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
							buffer.append("AS");
							short [] ss = (short []) field.get(this);
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
							buffer.append("AB");
							byte [] bs = (byte []) field.get(this);
							if (bs == null) {
								buffer.append((char) (baseChar - 1));
							} else {
								serializeLength(buffer, bs.length);
								for (int j = 0; j < bs.length; j++) {
									byte b = bs[j];
									String value = "" + b;
									buffer.append((char) (baseChar + value.length()));
									buffer.append(b);
								}
							}
						} else if (type == char[].class) {
							buffer.append("AC");
							char [] cs = (char []) field.get(this);
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
							buffer.append("Ab");
							boolean [] bs = (boolean []) field.get(this);
							if (bs == null) {
								buffer.append((char) (baseChar - 1));
							} else {
								serializeLength(buffer, bs.length);
								for (int j = 0; j < bs.length; j++) {
									boolean b = bs[j];
									String value = "" + b;
									buffer.append((char) (baseChar + value.length()));
									buffer.append(b);
								}
							}
						} else if (type == String[].class) {
							buffer.append("AX"); // special
							String[] ss = (String []) field.get(this);
							if (ss == null) {
								buffer.append((char) (baseChar - 1));
							} else {
								serializeLength(buffer, ss.length);
								for (int j = 0; j < ss.length; j++) {
									String s = ss[j];
									serializeString(buffer, s);
								}
							}
						} else {
							// others unknown or unsupported types!
							throw new RuntimeException("Unsupported data type in Java2Script Simple RPC!");
						}
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

	/**
	 * @param buffer
	 * @param length
	 * 
	 * @j2sIgnore
	 */
	private void serializeLength(StringBuffer buffer, int length) {
		char baseChar = 'B';
		if (length > 52) {
			if (length > 0x4000) { // 16 * 1024
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
	 * @param str
	 * @return whether given string is deserialized as expected or not
	 * 
	 * @j2sNative
var start = 0;
if (arguments.length == 2) {
	start = arguments[1];
}
var baseChar = 'B'.charCodeAt (0);
if (str == null || start < 0) return false;
var length = str.length - start;
if (length <= 7 || str.substring(start, start + 3) != "WLL") return false;
var index = str.indexOf('#', start);
if (index == -1) return false;
index++;
if (index >= length + start) return false; // may be empty string!

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
	index++;
	if (size == 0 || size > length + start - index) return false; 
}

var fieldMap = [];
var fields = this.getClass ().declared$Fields;
if (fields == null) return false;
for (var i = 0; i < fields.length; i++) {
	var field = fields[i];
	var name = field.name;
	fieldMap[name] = true;
}
var end = index + size;
while (index < start + length && index < end) {
	var c1 = str.charCodeAt (index++);
	var l1 = c1 - baseChar;
	if (l1 < 0) return true;
	var fieldName = str.substring (index, index + l1);
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
				if (l3 < 0) return true;
				l2 = parseInt(str.substring(index, index + l3));
				if (l2 > 0x4000) { // 16 * 1024
					throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
				}
				index += l3;
			}
			var arr = new Array (l2);
			var type = c2;
			for (var i = 0; i < l2; i++) {
				var s = null;
				var c4 = str.charCodeAt (index++);
				if (c2 != 'X') {
					var l3 = c4 - baseChar;
					if (l3 > 0) {
						s = str.substring (index, index + l3);
						index += l3;
					}
				} else {
					var c5 = str.charCodeAt (index++);
					var l3 = c5 - baseChar;
					if (l3 > 0) {
						s = str.substring (index, index + l3);
						index += l3;
					} else if (l3 == -2) {
						var c6 = str.charCodeAt (index++);
						var l4 = c6 - baseChar;
						if (l4 < 0) return true;
						var l5 = parseInt (str.substring( index, index + l4));
						if (l5 < 0) return true;
						index += l4;
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
					arr[i] = (s == "true");
				} else if (type == 'X') {
					arr[i] = s;
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
			s = str.substring (index, index + l2);
			index += l2;
		} else if (l2 == -2) {
			var c4 = str.charCodeAt(index++);
			var l3 = c4 - baseChar;
			if (l3 < 0) return true;
			var l4 = parseInt(str.substring(index, index + l3));
			if (l4 < 0) return true;
			index += l3;
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
			this[fieldName] = (s == "true");
		} else if (type == 's') {
			this[fieldName] = s;
		} else if (type == 'u') {
			this[fieldName] = Encoding.readUTF8(Encoding.decodeBase64(s));
		} else if (type == 'U') {
			this[fieldName] = Encoding.readUTF8(s);
		}
	}
}
return true;
	 */
	public boolean deserialize(final String str) {
		return deserialize(str, 0);
	}
	
	/**
	 * 
	 * @param str
	 * @param start
	 * @return
	 * 
	 * @j2sIgnore
	 */
	public boolean deserialize(final String str, int start) {
		char baseChar = 'B';
		if (str == null || start < 0) return false;
		int length = str.length() - start;
		if (length <= 7 || !("WLL".equals(str.substring(start, start + 3)))) return false; // Should throw exception!
		int index = str.indexOf('#', start);
		if (index == -1) return false; // Should throw exception!
		index++;
		if (index >= length + start) return false; // may be empty string!
		
		int size = 0;
		char nextChar = str.charAt(index);
		if (nextChar >= '0' && nextChar <= '9') {
			// have size!
			int last = index;
			index = str.indexOf('$', last);
			if (index == -1) return false; // Should throw exception!
			String sizeStr = str.substring(last + 1, index);
			sizeStr = sizeStr.replaceFirst("^0+", "");
			if (sizeStr.length() != 0) {
				try {
					size = Integer.parseInt(sizeStr);
				} catch (NumberFormatException e) {
					//
				}
			}
			index++;
			// may be empty string or not enough string!
			if (size == 0 || size > length + start - index) return false; 
		}
		
		Map fieldMap = new HashMap();
		Set fieldSet = new HashSet();
		Class clazz = this.getClass();
		while(clazz != null && !"net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())) {
			Field[] fields = clazz.getDeclaredFields();
			for (int i = 0; i < fields.length; i++) {
				fieldSet.add(fields[i]);
			}
			clazz = clazz.getSuperclass();
		}
		Field[] fields = (Field []) fieldSet.toArray(new Field[0]);
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			int modifiers = field.getModifiers();
			if ((modifiers & (Modifier.PUBLIC | Modifier.PROTECTED)) != 0
					&& (modifiers & Modifier.TRANSIENT) == 0
					&& (modifiers & Modifier.STATIC) == 0) {
				String name = field.getName();
				fieldMap.put(name, field);
			}
		}
		int end = index + size;
		while (index < length + start && index < end) {
			char c1 = str.charAt(index++);
			int l1 = c1 - baseChar;
			if (l1 < 0) return true;
			String fieldName = str.substring(index, index + l1);
			index += l1;
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
							if (l3 < 0) return true;
							l2 = Integer.parseInt(str.substring(index, index + l3));
							if (l2 > 0x4000) { // 16 * 1024
								/*
								 * Some malicious string may try to allocate huge size of array!
								 * Limit the size of array here! 
								 */
								throw new RuntimeException("Array size reaches the limit of Java2Script Simple RPC!");
							}
							index += l3;
						}
						String[] ss = new String[l2];
						for (int i = 0; i < l2; i++) {
							char c4 = str.charAt(index++);
							if (c2 != 'X') {
								int l3 = c4 - baseChar;
								if (l3 > 0) {
									ss[i] = str.substring(index, index + l3);
									index += l3;
								}
							} else {
								char c5 = str.charAt(index++);
								int l3 = c5 - baseChar;
								if (l3 > 0) {
									ss[i] = str.substring(index, index + l3);
									index += l3;
								} else if (l3 == -2) {
									char c6 = str.charAt(index++);
									int l4 = c6 - baseChar;
									if (l4 < 0) return true;
									int l5 = Integer.parseInt(str.substring(index, index + l4));
									if (l5 < 0) return true;
									index += l4;
									ss[i] = str.substring(index, index + l5);
									index += l5;
								}
								if (c4 == 'u') {
									ss[i] = new String(Base64.base64ToByteArray(ss[i]), "utf-8");
								} else if (c4 == 'U') {
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
								if (ss[i] != null) {
									bs[i] = Boolean.valueOf(ss[i]).booleanValue();
								}
							}
							field.set(this, bs);
							break;
						}
						case 'X': {
							field.set(this, ss);
							break;
						}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				char c3 = str.charAt(index++);
				int l2 = c3 - baseChar;
				String s = null;
				if (l2 > 0) {
					s = str.substring(index, index + l2);
					index += l2;
				} else if (l2 == -2) {
					char c4 = str.charAt(index++);
					int l3 = c4 - baseChar;
					if (l3 < 0) return true;
					int l4 = Integer.parseInt(str.substring(index, index + l3));
					if (l4 < 0) return true;
					index += l3;
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
					case 'b':
						field.setBoolean(this, Boolean.valueOf(s).booleanValue());
						break;
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
					e.printStackTrace();
				}
			}
		}
		return true;
	}

	/**
	 * Override Object@clone, so this object can be cloned.
	 * 
	 * @j2sIgnore
	 */
	public Object clone() throws CloneNotSupportedException {
		Object clone = super.clone();
		Set fieldSet = new HashSet();
		Class clazz = this.getClass();
		while(clazz != null && !"net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())) {
			Field[] fields = clazz.getDeclaredFields();
			for (int i = 0; i < fields.length; i++) {
				fieldSet.add(fields[i]);
			}
			clazz = clazz.getSuperclass();
		}
		Field[] fields = (Field []) fieldSet.toArray(new Field[0]);
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			int modifiers = field.getModifiers();
			if ((modifiers & (Modifier.PUBLIC | Modifier.PROTECTED)) != 0
					&& (modifiers & Modifier.TRANSIENT) == 0
					&& (modifiers & Modifier.STATIC) == 0) {
				//String name = field.getName();
				Class type = field.getType();
				Object value = null;
				try {
					value = field.get(this);
				} catch (Exception e1) {
					//e1.printStackTrace();
				}
				if (value != null && type.getName().startsWith("[")) {
					if (type == float[].class) {
						float[] as = (float[]) value;
						float[] clones = new float[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					} else if (type == double[].class) {
						double[] as = (double[]) value;
						double[] clones = new double[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					} else if (type == int[].class) {
						int[] as = (int[]) value;
						int[] clones = new int[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					} else if (type == long[].class) {
						long[] as = (long[]) value;
						long[] clones = new long[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					} else if (type == short[].class) {
						short[] as = (short[]) value;
						short[] clones = new short[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					} else if (type == byte[].class) {
						byte[] as = (byte[]) value;
						byte[] clones = new byte[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					} else if (type == char[].class) {
						char[] as = (char[]) value;
						char[] clones = new char[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					} else if (type == boolean[].class) {
						boolean[] as = (boolean[]) value;
						boolean[] clones = new boolean[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					} else if (type == String[].class) {
						String[] as = (String[]) value;
						String[] clones = new String[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					} else if (type == Object[].class) {
						Object[] as = (Object[]) value;
						Object[] clones = new Object[as.length];
						for (int j = 0; j < clones.length; j++) {
							clones[j] = as[j];
						}
						try {
							field.set(clone, clones);
						} catch (Exception e) {
							//e.printStackTrace();
						}
					}
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
return null;
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
	 * 
	 * @j2sIgnore Already implemented in previous method!
	 */
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
	 * 
	 * @j2sIgnore Only public to Java!
	 */
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
	 * 
	 * @j2sIgnore Only public to Java!
	 */
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
			Class runnableClass = Class.forName(clazzName); // !!! JavaScript loading!
			if (runnableClass != null) {
				// SimpleRPCRunnale should always has default constructor
				Constructor constructor = runnableClass.getConstructor(new Class[0]);
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
}
