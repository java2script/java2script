package net.sf.j2s.ajax;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class SimpleRPCUtils {

	/**
	 * Calculate the differences of two existed SimpleRPCRunnable objects.
	 * In Simple RPC, we only need to result differences of SimpleRPCRunnable
	 * objects. In such a way, we reduce the server traffic.
	 * 
	 * @param runnable1 original object
	 * @param runnable2 modified object
	 * @return Names of the modified fields.
	 * 
	 * @j2sIgnore
	 */
	public static String[] compareDiffs(SimpleRPCRunnable runnable1, SimpleRPCRunnable runnable2) {
		Set<String> diffSet = new HashSet<String>();
		Set<Field> fieldSet = new HashSet<Field>();
		Class<?> clazz = runnable1.getClass();
		while(clazz != null && !"net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())) {
			Field[] fields = clazz.getDeclaredFields();
			for (int i = 0; i < fields.length; i++) {
				fieldSet.add(fields[i]);
			}
			clazz = clazz.getSuperclass();
		}
		String[] ignoredFields = runnable1.fieldDiffIgnored();
		Field[] fields = fieldSet.toArray(new Field[fieldSet.size()]);
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			int modifiers = field.getModifiers();
			if ((modifiers & (Modifier.PUBLIC | Modifier.PROTECTED)) != 0
					&& (modifiers & Modifier.TRANSIENT) == 0
					&& (modifiers & Modifier.STATIC) == 0) {
				String name = field.getName();
				if (ignoredFields != null) {
					boolean ignored = false;
					for (int j = 0; j < ignoredFields.length; j++) {
						if (name.equals(ignoredFields[j])) {
							ignored = true;
							break;
						}
					}
					if (ignored) {
						continue;
					}
				}
				Object field1 = null;
				try {
					field1 = field.get(runnable1);
				} catch (IllegalArgumentException e1) {
					//e1.printStackTrace();
				} catch (IllegalAccessException e1) {
					//e1.printStackTrace();
				}
				Object field2 = null;
				try {
					field2 = field.get(runnable2);
				} catch (IllegalArgumentException e) {
					//e.printStackTrace();
				} catch (IllegalAccessException e) {
					//e.printStackTrace();
				}
				if (field1 == null) {
					if (field2 != null) {
						diffSet.add(name);
					}
				} else if (field2 == null) { // field1 != null
					diffSet.add(name);
				} else if (field1.getClass().isArray()) {
					Class<?> type = field.getType();
					if (type == float[].class) {
						if (!Arrays.equals((float[]) field1, (float[]) field2)) {
							diffSet.add(name);
						}
					} else if (type == double[].class) {
						if (!Arrays.equals((double[]) field1, (double[]) field2)) {
							diffSet.add(name);
						}
					} else if (type == int[].class) {
						if (!Arrays.equals((int[]) field1, (int[]) field2)) {
							diffSet.add(name);
						}
					} else if (type == long[].class) {
						if (!Arrays.equals((long[]) field1, (long[]) field2)) {
							diffSet.add(name);
						}
					} else if (type == short[].class) {
						if (!Arrays.equals((short[]) field1, (short[]) field2)) {
							diffSet.add(name);
						}
					} else if (type == byte[].class) {
						if (!Arrays.equals((byte[]) field1, (byte[]) field2)) {
							diffSet.add(name);
						}
					} else if (type == char[].class) {
						if (!Arrays.equals((char[]) field1, (char[]) field2)) {
							diffSet.add(name);
						}
					} else if (type == boolean[].class) {
						if (!Arrays.equals((boolean[]) field1, (boolean[]) field2)) {
							diffSet.add(name);
						}
					} else if (type == String[].class) {
						if (!Arrays.equals((String[]) field1, (String[]) field2)) {
							diffSet.add(name);
						}
					} else if (SimpleSerializable.isSubclassOf(type, SimpleSerializable[].class)) {
						diffSet.add(name);
					} else if (type == Object[].class) {
						if (!Arrays.equals((Object[]) field1, (Object[]) field2)) {
							diffSet.add(name);
						}
					}
				} else if (SimpleSerializable.isSubclassOf(field.getType(), SimpleSerializable.class)) {
					diffSet.add(name);
				} else if (!field1.equals(field2)) {
					diffSet.add(name);
				}
			}
		}
		return diffSet.toArray(new String[diffSet.size()]);
	}

}
