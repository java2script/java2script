/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author josson smith
 *
 * 2006-10-11
 */
public class SimpleSerializable {
	
	/**
	 * @return
	 * 
	 * @j2sNative
var baseChar = 'B'.charCodeAt (0);
var buffer = [];
var fields = this.getClass ().declared$Fields;
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
return buffer.join ('');
	 */
	public String serialize() {
		char baseChar = 'B';
		StringBuffer buffer = new StringBuffer();
		Set fieldSet = new HashSet();
		Class clazz = this.getClass();
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
							// others
						}
					}
				}
			}
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
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
	var normal = /^[\u0000-\u00ff]*$/.test(s);
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
	 * 
	 * @j2sNative
var baseChar = 'B'.charCodeAt (0);
var fieldMap = [];
var fields = this.getClass ().declared$Fields;
if (fields == null) return;
for (var i = 0; i < fields.length; i++) {
	var field = fields[i];
	var name = field.name;
	fieldMap[name] = true;
}
var length = str.length;
var index = 0;
while (index < length) {
	var c1 = str.charCodeAt (index++);
	var l1 = c1 - baseChar;
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
				l2 = parseInt(str.substring(index, index + l3));
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
						var l5 = parseInt (str.substring( index, index + l4));
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
			var l4 = parseInt(str.substring(index, index + l3));
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
	 */
	public void deserialize(String str) {
		char baseChar = 'B';
		if (str == null || str.length() == 0) return;
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
		int length = str.length();
		int index = 0;
		while (index < length) {
			char c1 = str.charAt(index++);
			int l1 = c1 - baseChar;
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
							l2 = Integer.parseInt(str.substring(index, index + l3));
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
									int l5 = Integer.parseInt(str.substring(index, index + l4));
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
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (UnsupportedEncodingException e) {
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
					int l4 = Integer.parseInt(str.substring(index, index + l3));
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
				} catch (NumberFormatException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
			}
		}
	}

}
