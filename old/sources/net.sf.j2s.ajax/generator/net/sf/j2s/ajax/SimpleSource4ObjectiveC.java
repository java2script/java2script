/*******************************************************************************
 * Copyright (c) 2012 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.j2s.ajax.SimpleSerializable;
import net.sf.j2s.ajax.annotation.SimpleComment;
import net.sf.j2s.ajax.annotation.SimpleIn;
import net.sf.j2s.ajax.annotation.SimpleInOut;
import net.sf.j2s.ajax.annotation.SimpleOut;

/**
 * 
 * @author zhourenjian
 *
 * @j2sIgnore
 */
public class SimpleSource4ObjectiveC {
	
	static String folder = "Project";
	static String author = "Author";
	static String company = "Company";
	static String constantPrefix = "C_";
	static boolean supportsARC = false;

	private static String wrapString(String s) {
		if (s == null) {
			return "";
		}
		return s.replaceAll("\r", "\\\\r")
				.replaceAll("\n", "\\\\n");
	}

	private static void generateAnnotation(Class<?> clazz, StringBuilder source) {
		Deprecated annDeprecated = clazz.getAnnotation(Deprecated.class);
		if (annDeprecated != null) {
			source.append("// [deprecated]\r\n");
			source.append("\r\n");
		}
		SimpleComment annComment = clazz.getAnnotation(SimpleComment.class);
		if (annComment != null) {
			String[] comments = annComment.value();
			if (comments != null && comments.length == 1
					&& comments[0] != null && comments[0].length() > 0) {
				source.append("// ").append(wrapString(comments[0])).append("\r\n\r\n");
			} else if (comments != null && comments.length >= 2) {
				for (int i = 0; i < comments.length; i++) {
					source.append("// ").append(wrapString(comments[i])).append("\r\n");
				}
				source.append("\r\n");
			}
		}
	}

	private static boolean generateAnnotation(Field field, boolean firstField, StringBuilder source) {
		Deprecated annDeprecated = field.getAnnotation(Deprecated.class);
		if (annDeprecated != null) {
			source.append(firstField ? "//" : "\r\n// ").append("[deprecated]");
			//source.append(annDeprecated.annotationType().getSimpleName());
		}
		SimpleIn annIn = field.getAnnotation(SimpleIn.class);
		if (annIn != null) {
			source.append(firstField && annDeprecated == null ? "//" : "\r\n// ").append("[in]");
			//source.append(annIn.annotationType().getSimpleName());
			String[] comments = annIn.value();
			if (comments != null && comments.length == 1
					&& comments[0] != null && comments[0].length() > 0) {
				source.append(": ").append(wrapString(comments[0]));
			} else if (comments != null && comments.length >= 2) {
				for (int i = 0; i < comments.length; i++) {
					source.append("\r\n// ").append(wrapString(comments[i]));
				}
			}
			source.append("\r\n");
			return true;
		}
		SimpleOut annOut = field.getAnnotation(SimpleOut.class);
		if (annOut != null) {
			source.append(firstField && annDeprecated == null ? "//" : "\r\n// ").append("[out]");
			//source.append(annOut.annotationType().getSimpleName());
			String[] comments = annOut.value();
			if (comments != null && comments.length == 1
					&& comments[0] != null && comments[0].length() > 0) {
				source.append(": ").append(wrapString(comments[0]));
			} else if (comments != null && comments.length >= 2) {
				for (int i = 0; i < comments.length; i++) {
					source.append("\r\n// ").append(wrapString(comments[i]));
				}
			}
			source.append("\r\n");
			return true;
		}
		SimpleInOut annInOut = field.getAnnotation(SimpleInOut.class);
		if (annInOut != null) {
			source.append(firstField && annDeprecated == null ? "//" : "\r\n// ").append("[in/out]");
			//source.append(annInOut.annotationType().getSimpleName());
			String[] comments = annInOut.value();
			if (comments != null && comments.length == 1
					&& comments[0] != null && comments[0].length() > 0) {
				source.append(": ").append(wrapString(comments[0]));
			} else if (comments != null && comments.length >= 2) {
				for (int i = 0; i < comments.length; i++) {
					source.append("\r\n// ").append(wrapString(comments[i]));
				}
			}
			source.append("\r\n");
			return true;
		}
		SimpleComment annComment = field.getAnnotation(SimpleComment.class);
		if (annComment != null) {
			String[] comments = annComment.value();
			if (comments != null && comments.length == 1
					&& comments[0] != null && comments[0].length() > 0) {
				source.append(firstField && annDeprecated == null ? "//" : "\r\n// ").append(wrapString(comments[0]));
			} else if (comments != null && comments.length >= 2) {
				for (int i = 0; i < comments.length; i++) {
					source.append(firstField && i == 0 && annDeprecated == null ? "//" : "\r\n// ").append(wrapString(comments[i]));
				}
			}
			source.append("\r\n");
			return true;
		}
		if (annDeprecated != null) {
			source.append("\r\n");
			return true;
		}
		return false;
	}

	@SuppressWarnings("deprecation")
	public static String generateHeaderFromInterface(Class<?> interfaceClazz) {
		StringBuilder source = new StringBuilder();
		
		String clazzName = interfaceClazz.getName();
		String simpleClazzName = clazzName;
		int idx = clazzName.lastIndexOf('.');
		if (idx != -1) {
			simpleClazzName = clazzName.substring(idx + 1);
		}
		Date date = new Date();
		source.append("//\r\n");
		source.append("//  ").append(simpleClazzName).append(".h\r\n");
		source.append("//  ").append(folder).append("\r\n");
		source.append("//\r\n");
		source.append("//  Generated by Java2Script.\r\n");
		source.append("//  Copyright (c) ").append(date.getYear() + 1900).append(" ").append(company).append(". All rights reserved.\r\n");
		source.append("//\r\n");
		source.append("\r\n");
		
		generateAnnotation(interfaceClazz, source);
		
		int index = 0;
		SourceUtils.insertLineComment(source, "", index++, true);
		
		Class<?> superClazz = interfaceClazz.getSuperclass();
		if (superClazz != null) {
			String superClazzName = superClazz.getName();
			String simpleSuperClazzName = superClazzName;
			idx = superClazzName.lastIndexOf('.');
			if (idx != -1) {
				simpleSuperClazzName = superClazzName.substring(idx + 1);
			}
			
			source.append("#import \"").append(simpleSuperClazzName).append(".h\"\r\n");
			source.append("\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);
		}
		
		boolean gotStaticFinalFields = false;
		Field[] clazzFields = interfaceClazz.getDeclaredFields();
		
		for (int i = 0; i < clazzFields.length; i++) {
			Field f = clazzFields[i];
			int modifiers = f.getModifiers();
			if ((modifiers & (Modifier.PUBLIC/* | Modifier.PROTECTED*/)) != 0
					&& (modifiers & Modifier.STATIC) != 0 && (modifiers & Modifier.FINAL) != 0) {
				generateAnnotation(f, !gotStaticFinalFields, source);
				source.append("#define ");
				if (constantPrefix != null && constantPrefix.length() > 0) {
					source.append(constantPrefix);
				}
				source.append(simpleClazzName.toUpperCase()).append("_").append(f.getName()).append(" ");
				Class<?> type = f.getType();
				if (type == int.class) {
					try {
						source.append("" + f.getInt(interfaceClazz));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == long.class) {
					try {
						source.append(f.getLong(interfaceClazz) + "L");
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == short.class) {
					try {
						source.append("" + f.getShort(interfaceClazz));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == byte.class) {
					try {
						source.append("" + f.getByte(interfaceClazz));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == char.class) {
					try {
						source.append("\'" + f.getChar(interfaceClazz) + "\'");
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == float.class) {
					try {
						source.append("" + f.getFloat(interfaceClazz));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == double.class) {
					try {
						source.append("" + f.getDouble(interfaceClazz));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == boolean.class) {
					try {
						if (f.getBoolean(interfaceClazz)) {
							source.append("true");
						} else {
							source.append("false");
						}
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == String.class) {
					try {
						source.append("@\"").append(f.get(interfaceClazz)).append("\"");
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else {
					System.out.println("Not supporting type " + type + " for field " + f.getName());
				}
				source.append("\r\n");
				gotStaticFinalFields = true;
			}
		}
		
		if (gotStaticFinalFields) {
			source.append("\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);
		}

		return source.toString();
	}

	@SuppressWarnings("deprecation")
	public static String generateHeaderFromObject(SimpleSerializable s) {
		StringBuilder source = new StringBuilder();
		
		Class<?> clazz = s.getClass();
		String clazzName = clazz.getName();
		String simpleClazzName = clazzName;
		int idx = clazzName.lastIndexOf('.');
		if (idx != -1) {
			simpleClazzName = clazzName.substring(idx + 1);
		}
		Date date = new Date();
		source.append("//\r\n");
		source.append("//  ").append(simpleClazzName).append(".h\r\n");
		source.append("//  ").append(folder).append("\r\n");
		source.append("//\r\n");
		source.append("//  Generated by Java2Script.\r\n");
		source.append("//  Copyright (c) ").append(date.getYear() + 1900).append(" ").append(company).append(". All rights reserved.\r\n");
		source.append("//\r\n");
		source.append("\r\n");
		
		generateAnnotation(s.getClass(), source);
		
		int index = 0;
		SourceUtils.insertLineComment(source, "", index++, true);

		Class<?> superClazz = s.getClass().getSuperclass();
		String superClazzName = superClazz.getName();
		String simpleSuperClazzName = superClazzName;
		idx = superClazzName.lastIndexOf('.');
		if (idx != -1) {
			simpleSuperClazzName = superClazzName.substring(idx + 1);
		}
		source.append("#import \"").append(simpleSuperClazzName).append(".h\"\r\n");
		source.append("\r\n");

		Type[] interfaces = s.getClass().getGenericInterfaces();
		if (interfaces != null && interfaces.length > 0) {
			boolean generatedImports = false;
			for (int i = 0; i < interfaces.length; i++) {
				Class<?> t = (Class<?>) interfaces[i];
				if (!SimpleSerializable.isSubInterfaceOf(t, ISimpleConstant.class)) {
					continue;
				}
				String typeName = t.getName();
				String simpleTypeName = typeName;
				idx = simpleTypeName.lastIndexOf('.');
				if (idx != -1) {
					simpleTypeName = simpleTypeName.substring(idx + 1);
				}
				
				source.append("#import \"").append(simpleTypeName).append(".h\"\r\n");
				generatedImports = true;
			}
			if (generatedImports) {
				source.append("\r\n");
			}
		}

		boolean gotStaticFinalFields = false;
		Field[] clazzFields = clazz.getDeclaredFields();
		
		List<Field> fields = new ArrayList<Field>();
		for (int i = 0; i < clazzFields.length; i++) {
			Field f = clazzFields[i];
			int modifiers = f.getModifiers();
			if ((modifiers & (Modifier.PUBLIC/* | Modifier.PROTECTED*/)) != 0
					&& (modifiers & (Modifier.TRANSIENT | Modifier.STATIC)) == 0) {
				fields.add(f);
			}
		}

		boolean hasMoreImports = false;
		Set<String> importedClasses = new HashSet<String>();
		for (Iterator<Field> itr = fields.iterator(); itr.hasNext();) {
			Field field = (Field) itr.next();
			Class<?> type = field.getType();
			
			if (SimpleSerializable.isSubclassOf(type, SimpleSerializable.class)
					|| SimpleSerializable.isSubclassOf(type, SimpleSerializable[].class)) {
				hasMoreImports = true;
				String typeName = type.isArray() ? type.getComponentType().getSimpleName() : type.getSimpleName();
				if (!importedClasses.contains(typeName)) {
					source.append("#import \"").append(typeName).append(".h\"\r\n");
					importedClasses.add(typeName);
				}
			}
		}
		if (hasMoreImports) {
			source.append("\r\n");
		}
		
		boolean defineAppended = false; 
		for (int i = 0; i < clazzFields.length; i++) {
			Field f = clazzFields[i];
			int modifiers = f.getModifiers();
			if ((modifiers & (Modifier.PUBLIC/* | Modifier.PROTECTED*/)) != 0
					&& (modifiers & Modifier.STATIC) != 0 && (modifiers & Modifier.FINAL) != 0) {
				if (!defineAppended) {
					SourceUtils.insertLineComment(source, "", index++, true);
				}
				generateAnnotation(f, !defineAppended, source);
				defineAppended = true;
				source.append("#define ");
				if (constantPrefix != null && constantPrefix.length() > 0) {
					source.append(constantPrefix);
				}
				source.append(simpleClazzName.toUpperCase()).append("_").append(f.getName()).append(" ");
				Class<?> type = f.getType();
				if (type == int.class) {
					try {
						source.append(f.getInt(s.getClass()));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == long.class) {
					try {
						source.append(f.getLong(s.getClass()) + "L");
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == short.class) {
					try {
						source.append(f.getShort(s.getClass()));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == byte.class) {
					try {
						source.append(f.getByte(s.getClass()));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == char.class) {
					try {
						source.append("\'").append(f.getChar(s.getClass())).append("\'");
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == float.class) {
					try {
						source.append(f.getFloat(s.getClass()));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == double.class) {
					try {
						source.append(f.getDouble(s.getClass()));
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == boolean.class) {
					try {
						if (f.getBoolean(s.getClass())) {
							source.append("true");
						} else {
							source.append("false");
						}
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else if (type == String.class) {
					try {
						source.append("@\"").append(f.get(s.getClass())).append("\"");
					} catch (Throwable e) {
						e.printStackTrace();
					}
				} else {
					System.out.println("Not supporting type " + type + " for field " + f.getName());
				}
				source.append("\r\n");
				gotStaticFinalFields = true;
			}
		}
		
		if (gotStaticFinalFields) {
			source.append("\r\n");
		}
		if (!defineAppended) {
			index++;
		}
		SourceUtils.insertLineComment(source, "", index++, true);

		//if (s instanceof SimpleSerializable && !(s instanceof SimpleRPCRunnable)) {
			source.append("@protocol ").append(simpleClazzName).append("\r\n\r\n");		
			SourceUtils.insertLineComment(source, "", index++, true);
			source.append("@end\r\n\r\n");		
			SourceUtils.insertLineComment(source, "", index++, true);
		//}
		source.append("@interface ").append(simpleClazzName).append(" : ").append(simpleSuperClazzName);
		SourceUtils.insertBlockComment(source, index++);
		source.append("{\r\n");
		source.append("\r\n");		
		SourceUtils.insertLineComment(source, "\t", index++, true);

		for (Iterator<Field> itr = fields.iterator(); itr.hasNext();) {
			Field field = (Field) itr.next();
			String name = field.getName();
			Class<?> type = field.getType();

			source.append("\t");
			if (type == int.class) {
				source.append("int ");
			} else if (type == long.class) {
				source.append("long long ");
			} else if (type == short.class) {
				source.append("short ");
			} else if (type == byte.class) {
				source.append("int ");
			} else if (type == char.class) {
				source.append("int ");
			} else if (type == double.class) {
				source.append("double ");
			} else if (type == float.class) {
				source.append("float ");
			} else if (type == boolean.class) {
				source.append("BOOL ");
			} else if (type == String.class) {
				source.append("NSString *");
			} else if (SimpleSerializable.isSubclassOf(type, SimpleSerializable.class)) {
				source.append(type.getSimpleName());
				source.append(" *");
			} else if (type == byte[].class) {
				if (s.bytesCompactMode()) {
					source.append("NSData *");
				} else {
					source.append("NSMutableArray<NSNumber> *");
				}
			} else if (type == String[].class) {
				source.append("NSMutableArray<NSString> *");
			} else if (SimpleSerializable.isSubclassOf(type, SimpleSerializable[].class)) {
				//if (!SimpleSerializable.isSubclassOf(type, SimpleRPCRunnable[].class)) {
					source.append("NSMutableArray<").append(type.getComponentType().getSimpleName()).append("> *");
				//} else {
				//	source.append("NSMutableArray *");
				//}
			} else if (type == int[].class || type == long[].class || type == double[].class
					|| type == short[].class || type == char[].class
					|| type == float[].class || type == boolean[].class) {
				source.append("NSMutableArray<NSNumber> *");
			} else {
				System.out.println("Unsupported type " + type);
			}
			source.append(name);
			source.append(";\r\n");
		}
		
		source.append("\r\n");
		SourceUtils.insertLineComment(source, "\t", index++, true);
		source.append("}\r\n");
		source.append("\r\n");
		SourceUtils.insertLineComment(source, "", index++, true);

		boolean firstField = true;
		for (Iterator<Field> itr = fields.iterator(); itr.hasNext();) {
			Field field = (Field) itr.next();
			String name = field.getName();
			Class<?> type = field.getType();
			
			generateAnnotation(field, firstField, source);
			firstField = false;
			source.append("@property (nonatomic");
			if (type == int.class) {
				source.append(") int ");
			} else if (type == long.class) {
				source.append(") long long ");
			} else if (type == short.class) {
				source.append(") short ");
			} else if (type == byte.class) {
				source.append(") int ");
			} else if (type == char.class) {
				source.append(") int ");
			} else if (type == double.class) {
				source.append(") double ");
			} else if (type == float.class) {
				source.append(") float ");
			} else if (type == boolean.class) {
				source.append(") BOOL ");
			} else if (type == String.class) {
				source.append(", ").append(!supportsARC ? "retain" : "strong").append(") NSString *");
			} else if (SimpleSerializable.isSubclassOf(type, SimpleSerializable.class)) {
				source.append(", ").append(!supportsARC ? "retain" : "strong").append(") ").append(type.getSimpleName()).append(" *");
			} else if (type == byte[].class) {
				if (s.bytesCompactMode()) {
					source.append(", ").append(!supportsARC ? "retain" : "strong").append(") NSData *");
				} else {
					source.append(", ").append(!supportsARC ? "retain" : "strong").append(") NSMutableArray<NSNumber> *");
				}
			} else if (type == String[].class) {
				source.append(", ").append(!supportsARC ? "retain" : "strong").append(") NSMutableArray<NSString> *");
			} else if (SimpleSerializable.isSubclassOf(type, SimpleSerializable[].class)) {
				//if (!SimpleSerializable.isSubclassOf(type, SimpleRPCRunnable[].class)) {
					source.append(", ").append(!supportsARC ? "retain" : "strong").append(") NSMutableArray<").append(type.getComponentType().getSimpleName()).append("> *");
				//} else {
				//	source.append(", ").append(!supportsARC ? "retain" : "strong").append(") NSMutableArray *");
				//}
			} else if (type == int[].class || type == long[].class || type == double[].class
					|| type == short[].class || type == char[].class
					|| type == float[].class || type == boolean[].class || type == String[].class
					|| SimpleSerializable.isSubclassOf(type, SimpleSerializable[].class)) {
				source.append(", ").append(!supportsARC ? "retain" : "strong").append(") NSMutableArray<NSNumber> *");
			} else {
				System.out.println("Unsupported type " + type);
			}
			source.append(name);
			source.append(";\r\n");
		}

		source.append("\r\n");
		SourceUtils.insertLineComment(source, "", index++, true);
		source.append("- (NSString *) className;\r\n");
		source.append("- (NSMutableArray *) fields;\r\n");
		source.append("\r\n");
		SourceUtils.insertLineComment(source, "", index++, true);
		source.append("@end\r\n");

		return source.toString();
	}
	
	@SuppressWarnings("deprecation")
	public static String generateImplementation(SimpleSerializable s) {
		StringBuilder source = new StringBuilder();
		
		Class<?> clazz = s.getClass();
		String clazzName = clazz.getName();
		String simpleClazzName = clazzName;
		int idx = clazzName.lastIndexOf('.');
		if (idx != -1) {
			simpleClazzName = clazzName.substring(idx + 1);
		}
		Date date = new Date();
		source.append("//\r\n");
		source.append("//  ").append(simpleClazzName).append(".m\r\n");
		source.append("//  ").append(folder).append("\r\n");
		source.append("//\r\n");
		source.append("//  Generated by Java2Script.\r\n");
		source.append("//  Copyright (c) ").append(date.getYear() + 1900).append(" ").append(company).append(". All rights reserved.\r\n");
		source.append("//\r\n");
		source.append("\r\n");
		int index = 0;
		SourceUtils.insertLineComment(source, "", index++, true);

		source.append("#import \"").append(simpleClazzName).append(".h\"\r\n");
		source.append("\r\n");
		SourceUtils.insertLineComment(source, "", index++, true);
		
		source.append("@implementation ").append(simpleClazzName).append("\r\n");
		source.append("\r\n");		
		SourceUtils.insertLineComment(source, "", index++, true);

		Set<String> j2sIgnoredFileds = new HashSet<String>();
		
		List<Field> fields = new ArrayList<Field>();
		Field[] clazzFields = clazz.getDeclaredFields();
		for (int i = 0; i < clazzFields.length; i++) {
			Field f = clazzFields[i];
			int modifiers = f.getModifiers();
			if ((modifiers & (Modifier.PUBLIC/* | Modifier.PROTECTED*/)) != 0
					&& (modifiers & (Modifier.TRANSIENT | Modifier.STATIC)) == 0) {
				fields.add(f);
				if ((modifiers & Modifier.PROTECTED) != 0) {
					j2sIgnoredFileds.add(f.getName());
				}
			}
		}

		boolean needDealloc = false;
		for (Iterator<Field> itr = fields.iterator(); itr.hasNext();) {
			Field field = (Field) itr.next();
			String name = field.getName();
			Class<?> type = field.getType();
			
			if (type == String.class|| SimpleSerializable.isSubclassOf(type, SimpleSerializable.class)) {
				needDealloc = true;
			} else if (type == int[].class || type == long[].class || type == double[].class
					|| type == short[].class || type == byte[].class || type == char[].class
					|| type == float[].class || type == boolean[].class || type == String[].class
					|| SimpleSerializable.isSubclassOf(type, SimpleSerializable[].class)) {
				needDealloc = true;
			}
			
			source.append("@synthesize ").append(name).append(";\r\n");
		}
		
		source.append("\r\n");
		SourceUtils.insertLineComment(source, "", index++, true);
		source.append("- (NSString *) className {\r\n");
		SourceUtils.insertLineComment(source, "\t", index++, false);
		source.append("\treturn @\"").append(clazzName).append("\";\r\n");
		SourceUtils.insertLineComment(source, "\t", index++, false);
		source.append("}\r\n");
		source.append("\r\n");
		source.append("- (NSMutableArray *) fields {\r\n");
		source.append("\tNSMutableArray *arr = [super fields];\r\n");
		SourceUtils.insertLineComment(source, "\t", index++, false);
		
		s.setSimpleVersion(SimpleSerializable.LATEST_SIMPLE_VERSION);
		String[] fieldMapping = s.fieldMapping();
		if (fieldMapping != null) {
			Map<String, Field> allFields = SimpleSerializable.getSerializableFields(clazzName, clazz);
			for (Iterator<String> itr = allFields.keySet().iterator(); itr.hasNext();) {
				String name = itr.next();
				boolean existed = false;
				for (int i = 0; i < fieldMapping.length / 2; i++) {
					String fName = fieldMapping[i + i];
					//String sName = fieldMapping[i + i + 1];
					if (fName.equals(name)) {
						existed = true;
						break;
					}
				}
				if (!existed) {
					System.err.println("[ERROR] Class " + clazzName + " field mappings does not contains field " + name);
					break;
				}
			}
			Set<String> names = new HashSet<String>();
			for (int i = 0; i < fieldMapping.length / 2; i++) {
				String fName = fieldMapping[i + i];
				String sName = fieldMapping[i + i + 1];
				if (names.contains(sName)) {
					System.err.println("[ERROR] Class " + clazzName + " field mappings shorten name " + sName + " duplicatedd.");
				}
				names.add(sName);
				boolean existed = false;
				for (Iterator<String> itr = allFields.keySet().iterator(); itr.hasNext();) {
					String name = itr.next();
					if (fName.equals(name)) {
						existed = true;
						break;
					}
				}
				if (!existed) {
					System.err.println("[ERROR] Class " + clazzName + " field mappings contains non-field " + fName);
					break;
				}
			}
		}
		for (Iterator<Field> itr = fields.iterator(); itr.hasNext();) {
			Field field = (Field) itr.next();
			String name = field.getName();
			if (j2sIgnoredFileds.contains(name)) {
				System.out.println("Ignoring ..." + name);
				continue;
			}
			Class<?> type = field.getType();
			
			source.append("\t[arr addObject:[SimpleField makeField:@\"").append(name).append("\" withType:SimpleFieldType");
			if (type == int.class) {
				source.append("Int");
			} else if (type == long.class) {
				source.append("Long");
			} else if (type == short.class) {
				source.append("Short");
			} else if (type == byte.class) {
				source.append("Byte");
			} else if (type == char.class) {
				source.append("Char");
			} else if (type == double.class) {
				source.append("Double");
			} else if (type == float.class) {
				source.append("Float");
			} else if (type == boolean.class) {
				source.append("Boolean");
			} else if (type == String.class) {
				source.append("String");
			} else if (SimpleSerializable.isSubclassOf(type, SimpleSerializable.class)) {
				source.append("Object");
			} else if (type == int[].class) {
				source.append("IntArray");
			} else if (type == long[].class) {
				source.append("LongArray");
			} else if (type == short[].class) {
				source.append("ShortArray");
			} else if (type == byte[].class) {
				if (s.bytesCompactMode()) {
					source.append("ByteData");
				} else {
					source.append("ByteArray");
				}
			} else if (type == char[].class) {
				source.append("CharArray");
			} else if (type == float[].class) {
				source.append("FloatArray");
			} else if (type == double[].class) {
				source.append("DoubleArray");
			} else if (type == boolean[].class) {
				source.append("BooleanArray");
			} else if (type == String[].class) {
				source.append("StringArray");
			} else if (SimpleSerializable.isSubclassOf(type, SimpleSerializable[].class)) {
				source.append("ObjectArray");
			} else {
				System.out.println("Unsupported type " + type);
			}
			if (fieldMapping != null) {
				for (int i = 0; i < fieldMapping.length / 2; i++) {
					String fieldName = fieldMapping[i + i];
					String fieldAlias = fieldMapping[i + i + 1];
					if (name.equals(fieldName)) {
						source.append(" withAlias:@\"");
						source.append(fieldAlias);
						source.append("\"");
						break;
					}
				}
			}
			source.append("]];\r\n");
		}
		SourceUtils.insertLineComment(source, "\t", index++, false);
		source.append("\treturn arr;\r\n");
		source.append("}\r\n");
		source.append("\r\n");

		if (needDealloc && !supportsARC) {
			source.append("- (void) dealloc {\r\n");
			SourceUtils.insertLineComment(source, "\t", index++, false);
			for (Iterator<Field> itr = fields.iterator(); itr.hasNext();) {
				Field field = (Field) itr.next();
				String name = field.getName();
				Class<?> type = field.getType();
				
				if (type == String.class || SimpleSerializable.isSubclassOf(type, SimpleSerializable.class)
						|| type == int[].class || type == long[].class || type == double[].class
						|| type == short[].class || type == byte[].class || type == char[].class
						|| type == float[].class || type == boolean[].class || type == String[].class
						|| SimpleSerializable.isSubclassOf(type, SimpleSerializable[].class)) {
					source.append("\tself.");
					source.append(name);
					source.append(" = nil;\r\n");
				}
			}
			SourceUtils.insertLineComment(source, "\t", index++, false);
			source.append("\t[super dealloc];\r\n");
			source.append("}\r\n");
			source.append("\r\n");
		} else if (needDealloc) {
			index++;
			index++;
			source.append("\r\n");
		}
		SourceUtils.insertLineComment(source, "", index++, true);

		source.append("@end\r\n");

		return source.toString();
	}

	/**
	 * @param args
	 */
	@SuppressWarnings("deprecation")
	public static void main(String[] args) {
		if (args == null || args.length < 2 + 3) {
			System.out.println("Usage: " + SimpleSource4ObjectiveC.class.getName() + "[--arc] <sources folder> <author> <orgization or company> <constant prefix> <factory name> <class> [class ...]");
			return;
		}
		int indexStarting = 0;
		if ("--arc".equals(args[0])) {
			supportsARC = true;
			indexStarting = 1;
		}
		String targetFolder = args[indexStarting];
		File f = new File(targetFolder);
		if (f.exists()) {
			if (!f.isDirectory()) {
				System.out.println("Target folder " + f.getAbsolutePath() + " is not a folder.");
				return;
			}
		} else {
			boolean ok = f.mkdirs();
			if (!ok) {
				System.out.println("Failed to create target folder " + f.getAbsolutePath() + ".");
				return;
			}
		}
		folder = f.getName();
		author = args[indexStarting + 1];
		company = args[indexStarting + 2]; 
		constantPrefix = args[indexStarting + 3];
		
		String factoryClazz = args[indexStarting + 4];
		int classStartingIndex = indexStarting + 5;
		for (int i = classStartingIndex; i < args.length; i++) {
			String j2sSimpleClazz = args[i];
			try {
				Class<?> clazz = Class.forName(j2sSimpleClazz);
				if (clazz.isInterface()) {
					String simpleName = j2sSimpleClazz;
					int idx = j2sSimpleClazz.lastIndexOf('.');
					if (idx != -1) {
						simpleName = j2sSimpleClazz.substring(idx + 1);
					}
					String hSource = generateHeaderFromInterface(clazz);
					SourceUtils.updateSourceContent(new File(targetFolder, simpleName + ".h"), hSource);
					System.out.println(new File(targetFolder, simpleName + ".h").getAbsolutePath());
					continue;
				}
				Object inst = clazz.newInstance();
				if (inst instanceof SimpleSerializable) {
					SimpleSerializable s = (SimpleSerializable) inst;
					
					String simpleName = j2sSimpleClazz;
					int idx = j2sSimpleClazz.lastIndexOf('.');
					if (idx != -1) {
						simpleName = j2sSimpleClazz.substring(idx + 1);
					}
					String hSource = generateHeaderFromObject(s);
					SourceUtils.updateSourceContent(new File(targetFolder, simpleName + ".h"), hSource);
					System.out.println(new File(targetFolder, simpleName + ".h").getAbsolutePath());
					String mSource = generateImplementation(s);
					SourceUtils.updateSourceContent(new File(targetFolder, simpleName + ".m"), mSource);
					System.out.println(new File(targetFolder, simpleName + ".m").getAbsolutePath());
				}
			} catch (Throwable e) {
				System.out.println("Failed to generate source for " + j2sSimpleClazz);
				e.printStackTrace();
			}
		}
		
		String simpleClazzName = factoryClazz;
		int idx = factoryClazz.lastIndexOf('.');
		if (idx != -1) {
			simpleClazzName = factoryClazz.substring(idx + 1);
		}
		
		{
			StringBuilder source = new StringBuilder();
			Date date = new Date();
			source.append("//\r\n");
			source.append("//  ").append(simpleClazzName).append(".h\r\n");
			source.append("//  ").append(folder).append("\r\n");
			source.append("//\r\n");
			source.append("//  Generated by Java2Script.\r\n");
			source.append("//  Copyright (c) ").append(date.getYear() + 1900).append(" ").append(company).append(". All rights reserved.\r\n");
			source.append("//\r\n");
			source.append("\r\n");
			int index = 0;
			SourceUtils.insertLineComment(source, "", index++, true);
			
			source.append("#import \"SimpleFactory.h\"\r\n");
			source.append("\r\n");

			for (int i = classStartingIndex; i < args.length; i++) {
				String j2sSimpleClazz = args[i];
				try {
					Class<?> clazz = Class.forName(j2sSimpleClazz);
					if (clazz.isInterface()) {
						continue;
					}
					Object inst = clazz.newInstance();
					if (inst instanceof SimpleSerializable) {
						if (!(inst instanceof SimpleRPCRunnable)) {
							String simpleName = j2sSimpleClazz;
							idx = j2sSimpleClazz.lastIndexOf('.');
							if (idx != -1) {
								simpleName = j2sSimpleClazz.substring(idx + 1);
							}
							
							source.append("#import \"").append(simpleName).append(".h\"\r\n");
						}
					}
				} catch (Throwable e) {
					e.printStackTrace();
				}
			}
			source.append("\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);
			source.append("@interface ").append(simpleClazzName).append(" : SimpleFactory");
			SourceUtils.insertBlockComment(source, index++);
			source.append("{\r\n\r\n");
			SourceUtils.insertLineComment(source, "\t", index++, true);
			source.append("}\r\n\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);
			source.append("- (id) createInstanceByClassName:(NSString *) className;\r\n");
			source.append("- (NSString *) getClassShortenName:(NSString *) className;\r\n");
			source.append("- (NSString *) getClassFullName:(NSString *) className;\r\n");
			source.append("\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);
			source.append("@end\r\n");
			SourceUtils.updateSourceContent(new File(targetFolder, simpleClazzName + ".h"), source.toString());
		}
		
		
		{
			StringBuilder source = new StringBuilder();
			Date date = new Date();
			source.append("//\r\n");
			source.append("//  ").append(simpleClazzName).append(".m\r\n");
			source.append("//  ").append(folder).append("\r\n");
			source.append("//\r\n");
			source.append("//  Generated by Java2Script.\r\n");
			source.append("//  Copyright (c) ").append(date.getYear() + 1900).append(" ").append(company).append(". All rights reserved.\r\n");
			source.append("//\r\n");
			source.append("\r\n");
			int index = 0;
			SourceUtils.insertLineComment(source, "", index++, true);
			
			source.append("#import \"").append(simpleClazzName).append(".h\"\r\n");
			source.append("\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);
			
			source.append("@implementation ").append(simpleClazzName).append("\r\n");
			source.append("\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);
			source.append("- (id) createInstanceByClassName:(NSString *) className {\r\n");
			SourceUtils.insertLineComment(source, "\t", index++, false);

			for (int i = classStartingIndex; i < args.length; i++) {
				String j2sSimpleClazz = args[i];
				try {
					Class<?> clazz = Class.forName(j2sSimpleClazz);
					if (clazz.isInterface()) {
						continue;
					}
					Object inst = clazz.newInstance();
					if (inst instanceof SimpleSerializable) {
						if (!(inst instanceof SimpleRPCRunnable)) {
							String simpleName = j2sSimpleClazz;
							idx = j2sSimpleClazz.lastIndexOf('.');
							if (idx != -1) {
								simpleName = j2sSimpleClazz.substring(idx + 1);
							}
							
							source.append("\tif ([className compare:@\"").append(j2sSimpleClazz).append("\"] == 0) {\r\n");
							if (!supportsARC) {
								source.append("\t\treturn [[[").append(simpleName).append(" alloc] init] autorelease];\r\n");
							} else {
								source.append("\t\treturn [[").append(simpleName).append(" alloc] init];\r\n");
							}
							source.append("\t}\r\n");
						}
					}
				} catch (Throwable e) {
					e.printStackTrace();
				}
			}
			SourceUtils.insertLineComment(source, "\t", index++, false);
			source.append("\treturn nil;\r\n");
			source.append("}\r\n");
			source.append("\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);
			source.append("- (id) getClassShortenName:(NSString *) className {\r\n");
			SourceUtils.insertLineComment(source, "\t", index++, false);

			for (int i = classStartingIndex; i < args.length; i++) {
				String j2sSimpleClazz = args[i];
				try {
					Class<?> clazz = Class.forName(j2sSimpleClazz);
					if (clazz.isInterface()) {
						continue;
					}
					Object inst = clazz.newInstance();
					if (inst instanceof SimpleSerializable) {
						String shortenName = SimpleSerializable.getClassShortenName(j2sSimpleClazz);
						if (shortenName != null) {
							source.append("\tif ([className compare:@\"").append(j2sSimpleClazz).append("\"] == 0) {\r\n");
							source.append("\t\treturn @\"").append(shortenName).append("\";\r\n");
							source.append("\t}\r\n");
						}
					}
				} catch (Throwable e) {
					e.printStackTrace();
				}
			}
			SourceUtils.insertLineComment(source, "\t", index++, false);
			source.append("\treturn nil;\r\n");
			source.append("}\r\n");
			source.append("\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);
			source.append("- (id) getClassFullName:(NSString *) className {\r\n");
			SourceUtils.insertLineComment(source, "\t", index++, false);

			for (int i = classStartingIndex; i < args.length; i++) {
				String j2sSimpleClazz = args[i];
				try {
					Class<?> clazz = Class.forName(j2sSimpleClazz);
					if (clazz.isInterface()) {
						continue;
					}
					Object inst = clazz.newInstance();
					if (inst instanceof SimpleSerializable) {
						String shortenName = SimpleSerializable.getClassShortenName(j2sSimpleClazz);
						if (shortenName != null) {
							source.append("\tif ([className compare:@\"").append(shortenName).append("\"] == 0) {\r\n");
							source.append("\t\treturn @\"").append(j2sSimpleClazz).append("\";\r\n");
							source.append("\t}\r\n");
						}
					}
				} catch (Throwable e) {
					e.printStackTrace();
				}
			}
			SourceUtils.insertLineComment(source, "\t", index++, false);
			source.append("\treturn nil;\r\n");
			source.append("}\r\n");
			source.append("\r\n");
			SourceUtils.insertLineComment(source, "", index++, true);

			source.append("@end\r\n");
			
			SourceUtils.updateSourceContent(new File(targetFolder, simpleClazzName + ".m"), source.toString());
		}

	}

}
