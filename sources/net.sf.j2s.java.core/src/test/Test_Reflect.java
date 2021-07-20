package test;

import java.awt.Button;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class Test_Reflect extends Test_ {

	public static long ltime = System.currentTimeMillis();
	public String s = "field s";
	public int[] testing;
	public Test_ test;
	
	@Reflect
	public int[] testIntArray() {
		return new int[3];
	}
	
	public void test(char i, String s) {
		System.out.println("testchar " + i);assert(s.equals("char"));
	}

	public void test(int i, String s) {
		// note -- not testing whether this is Integer or int
		System.out.println("testint " + i);assert(s.equals("int"));
	}

	public void test(float f, String s) {
		System.out.println("testfloat " + f);assert(s.equals("float"));
	}

	public void test(Integer i, String s) {
		System.out.println("testInteger " + i);assert(s.equals("Integer"));
	}

	public void test(Float f, String s) {
		System.out.println("testFloat " + f);assert(s.equals("Float"));
	}

	public void test(String s, int... ia) {
		System.out.println("testint[] " + ia[0]);assert(s.equals("int[]"));
	}

	public void test(String s, float... fa) {
		System.out.println("testfloat[] " + fa[0]);assert(s.equals("float[]"));
	}

	public void test(String s, test.Test_Reflect[] rf) {
		System.out.println("testObject[] " + rf[0]);assert(s.equals("test.Test_Reflect[]"));
	}
	
	public void test(String s, String[] aStr) {
		System.out.println("testString[] " + aStr[0]);assert(s.equals("String[]"));
	}

	public void test(String s, String[][] aaStr) {
		System.out.println("testString[][] " + aaStr[0][0]);assert(s.equals("String[][]"));
	}

	public void test(String s, float[][] aaf) {
		System.out.println("testfloat[][] " + aaf[0][0]);assert(s.equals("float[][]"));
	}

	/*
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [Character.TYPE,
	 * String]).invoke$O$OA (tr, [new Character ('K').charCodeAt (0), "char"]);
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [Character.TYPE,
	 * String]).invoke$O$OA (tr, [new Character ('K').charCodeAt (0), "char"]);
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [Integer, String]).invoke$O$OA
	 * (tr, [Integer.$valueOf (10), "Integer"]);
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [Integer.TYPE,
	 * String]).invoke$O$OA (tr, [new Integer (10), "int"]);
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [Integer.TYPE,
	 * String]).invoke$O$OA (tr, [Short.$valueOf (10), "int"]);
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [Integer.TYPE,
	 * String]).invoke$O$OA (tr, [new Short (10), "int"]);
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [Float, String]).invoke$O$OA
	 * (tr, [Float.$valueOf (10), "Float"]); test.Test_Reflect.getMethod$S$ClassA
	 * ("test", [Float.TYPE, String]).invoke$O$OA (tr, [new Integer (10), "float"]);
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [String,
	 * Clazz.arrayType('int[]')]).invoke$O$OA (tr, ["int[]", Clazz.newIntArray (-1,
	 * [10])]); test.Test_Reflect.getMethod$S$ClassA ("test", [String,
	 * Clazz.arrayType('float[]')]).invoke$O$OA (tr, ["float[]", Clazz.newFloatArray
	 * (-1, [10])]); test.Test_Reflect.getMethod$S$ClassA ("test", [String,
	 * Clazz.arrayType('test.Test_Reflect[]')]).invoke$O$OA (tr,
	 * ["test.Test_Reflect[]", Clazz.newArray (-1, [tr])]);
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [String,
	 * Clazz.arrayType('java.lang.String[]')]).invoke$O$OA (tr, ["String[]",
	 * Clazz.newArray (-1, ["10"])]); test.Test_Reflect.getMethod$S$ClassA ("test",
	 * [String, Clazz.arrayType('java.lang.String[][]')]).invoke$O$OA (tr,
	 * ["String[][]", Clazz.newArray (-1, [ Clazz.newArray (-1, ["10"]), null])]);
	 * test.Test_Reflect.getMethod$S$ClassA ("test", [String,
	 * Clazz.arrayType('float[][]')]).invoke$O$OA (tr, ["float[][]", Clazz.newArray
	 * (-1, [ Clazz.newFloatArray (-1, [10]), null])]);
	 */

	public static void main(String[] args) {

		Method[] m = Test_Reflect.class.getDeclaredMethods();
		int iii = m.length - 1;
		System.out.println(
				m[iii].getName() + "\t" + m[iii].getReturnType().getName() 
				+ "\t" + m[iii].getReturnType().isArray());

		System.out.println("????");

		List<String> list = new ArrayList<>();
		Map.Entry<String, Integer> entry = new Map.Entry<String, Integer>() {

			@Override
			public String getKey() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Integer getValue() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public Integer setValue(Integer value) {
				// TODO Auto-generated method stub
				return null;
			}

		};
//		Method[] m = Map.Entry.class.getDeclaredMethods();
//		for (int i = 0; i < m.length; i++)
//			System.out.println(m[i].getName() + "\t" + m[i].getReturnType().getName() + "\t" + m[i].getReturnType().isArray());

		new Test_Reflect().test("int[]", new int[] { 1, 2, 3 });
		String name = "";
		try {
			Test_Path tp = (Test_Path) Class.forName(name = "test.Test_Path", true, Test_Reflect.class.getClassLoader())
					.newInstance();
			assert (tp != null);
			System.out.println("class loaded: " + tp.getClass().getName());

			Button b = (Button) Class.forName(name = "java.awt.Button", true, Test_Reflect.class.getClassLoader())
					.newInstance();
			assert (b != null);
			System.out.println("class loaded: " + b.getClass().getName());

		} catch (Throwable t) {
			System.out.println("problems loading " + name);
			t.printStackTrace();
			assert (false);
		}

		Test_Reflect tr = new Test_Reflect();

		new Test_Char();
		assert (tr instanceof Test_);
		assert (tr instanceof Test_);
		assert (!(((Test_) tr) instanceof Test_Char));

		long l = System.currentTimeMillis();
		System.out.println("time/ms to here " + (l - ltime));
		for (int i = 0; i < 10000; i++) {
			assert (!(((Test_) tr) instanceof Test_Char));
		}
		System.out.println("time/ms for 10000 instanceof " + (System.currentTimeMillis() - l));

		// Field is not implemented
//			Field f = Test_Reflect.class.getDeclaredField("s");
//			System.out.println(f.getDeclaringClass());

		try {
			Test_Reflect.class.getMethod("test", char.class, String.class).invoke(tr, (char) 75, "char");
			Test_Reflect.class.getMethod("test", Character.TYPE, String.class).invoke(tr, (char) 75, "char");

			Test_Reflect.class.getMethod("test", Integer.class, String.class).invoke(tr, Integer.valueOf(10),
					"Integer");
			Test_Reflect.class.getMethod("test", int.class, String.class).invoke(tr, 10, "int");
			Test_Reflect.class.getMethod("test", Integer.TYPE, String.class).invoke(tr, Short.valueOf((short) 10),
					"int");
			Test_Reflect.class.getMethod("test", Integer.TYPE, String.class).invoke(tr, (short) 10, "int");
			Test_Reflect.class.getMethod("test", Float.class, String.class).invoke(tr, Float.valueOf(10), "Float");
			Test_Reflect.class.getMethod("test", Float.TYPE, String.class).invoke(tr, 10, "float");

			int[][] ii = new int[2][2];
			ii[0][0] = 10;
			float[][] ff = new float[2][];
			ff[0] = new float[] { 10 };
			String[][] ss = new String[][] { new String[] { "10" }, null };

			Test_Reflect.class.getMethod("test", String.class, int[].class).invoke(tr, "int[]", ii[0]);
			Test_Reflect.class.getMethod("test", String.class, float[].class).invoke(tr, "float[]", ff[0]);
			Test_Reflect.class.getMethod("test", String.class, test.Test_Reflect[].class).invoke(tr,
					"test.Test_Reflect[]", new test.Test_Reflect[] { tr });

			Test_Reflect.class.getMethod("test", String.class, String[].class).invoke(tr, "String[]", ss[0]);
			Test_Reflect.class.getMethod("test", String.class, String[][].class).invoke(tr, "String[][]", ss);
			Test_Reflect.class.getMethod("test", String.class, float[][].class).invoke(tr, "float[][]", ff);

			try {
				// intentional failure to invoke
				Test_Reflect.class.getMethod("test", String.class, int[][][][].class).invoke(tr, "int[][][][]", ii[0]);
				assert (false);
			} catch (Exception e) {
				assert (e instanceof NoSuchMethodException);
			}
		} catch (Throwable e) {
			assert (false);
		}
		Test_Reflect t = new Test_Reflect();
		Class<? extends Test_Reflect> f = t.getClass();
		try {
			Field[] fields = f.getDeclaredFields();
			for (int i = 0; i < fields.length; i++)
				System.out.println("declaredField " + i + ": " + fields[i].getName() + " " + fields[i].get(t) + " as "
						+ fields[i].getType().getName());
			f.getField("s").set(t, "news");
			System.out.println("t.s=" + t.s);
			assert (t.s.equals("news"));
			fields = f.getFields();
			for (int i = 0; i < fields.length; i++)
				System.out.println("field " + i + ": " + fields[i].getName() + " " + fields[i].get(t));

		} catch (IllegalArgumentException | IllegalAccessException e) {
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println("Test_Reflect OK");
	}

}