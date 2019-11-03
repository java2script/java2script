package net.sf.j2s.ajax;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class SimpleRPCUtils {

	/**
	 * Calculate the differences of two existed SimpleRPCRunnable objects.
	 * In Simple RPC, we only need to result differences of SimpleRPCRunnable
	 * objects. In such a way, we reduce the server traffic.
	 * 
	 * @param runnable1 original object
	 * @param runnable2 modified object
	 * @return Name set of the modified fields.
	 * 
	 * @j2sIgnore
	 */
	public static Set<String> compareDiffs(SimpleRPCRunnable runnable1, SimpleRPCRunnable runnable2) {
		Set<String> diffSet = new HashSet<String>();
		String[] ignoredFields = runnable1.fieldDiffIgnored();
		Class<?> clazzType = runnable1.getClass();
		Map<String, Field> allFields = SimpleSerializable.getSerializableFields(clazzType.getName(), clazzType);
		for (Iterator<String> itr = allFields.keySet().iterator(); itr.hasNext();) {
			String name = (String) itr.next();
			Field field = allFields.get(name);
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
			} else if (field.getType().isArray()) {
				Class<?> type = field.getType();
				if (type == int[].class) {
					if (!Arrays.equals((int[]) field1, (int[]) field2)) {
						diffSet.add(name);
					}
				} else if (type == byte[].class) {
					if (!Arrays.equals((byte[]) field1, (byte[]) field2)) {
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
				} else if (type == long[].class) {
					if (!Arrays.equals((long[]) field1, (long[]) field2)) {
						diffSet.add(name);
					}
				} else if (type == boolean[].class) {
					if (!Arrays.equals((boolean[]) field1, (boolean[]) field2)) {
						diffSet.add(name);
					}
				} else if (type == float[].class) {
					if (!Arrays.equals((float[]) field1, (float[]) field2)) {
						diffSet.add(name);
					}
				} else if (type == double[].class) {
					if (!Arrays.equals((double[]) field1, (double[]) field2)) {
						diffSet.add(name);
					}
				} else if (type == short[].class) {
					if (!Arrays.equals((short[]) field1, (short[]) field2)) {
						diffSet.add(name);
					}
				} else if (type == char[].class) {
					if (!Arrays.equals((char[]) field1, (char[]) field2)) {
						diffSet.add(name);
					}
				}
			} else {
				Class<?> type = field.getType();
				if (type.isPrimitive() || type == String.class) {
					if (!field1.equals(field2)) {
						diffSet.add(name);
					}
				} else if (SimpleSerializable.isSubclassOf(type, SimpleSerializable.class)) {
					diffSet.add(name);
				} else if (!field1.equals(field2)) {
					diffSet.add(name);
				}
			}
		}
		return diffSet;
	}

}
