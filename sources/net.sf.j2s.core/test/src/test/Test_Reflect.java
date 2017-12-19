package test;

import java.lang.reflect.InvocationTargetException;

class Test_Reflect extends Test_ {

	String s;
	
	public void test(char i, String s) {
		System.out.println("testchar " + i);assert(s.equals("char"));
	}

	public void test(int i, String s) {
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
test.Test_Reflect.getMethod$S$ClassA ("test", [Character.TYPE, String]).invoke$O$OA (tr, [new Character ('K').charCodeAt (0), "char"]);
test.Test_Reflect.getMethod$S$ClassA ("test", [Character.TYPE, String]).invoke$O$OA (tr, [new Character ('K').charCodeAt (0), "char"]);
test.Test_Reflect.getMethod$S$ClassA ("test", [Integer, String]).invoke$O$OA (tr, [Integer.$valueOf (10), "Integer"]);
test.Test_Reflect.getMethod$S$ClassA ("test", [Integer.TYPE, String]).invoke$O$OA (tr, [new Integer (10), "int"]);
test.Test_Reflect.getMethod$S$ClassA ("test", [Integer.TYPE, String]).invoke$O$OA (tr, [Short.$valueOf (10), "int"]);
test.Test_Reflect.getMethod$S$ClassA ("test", [Integer.TYPE, String]).invoke$O$OA (tr, [new Short (10), "int"]);
test.Test_Reflect.getMethod$S$ClassA ("test", [Float, String]).invoke$O$OA (tr, [Float.$valueOf (10), "Float"]);
test.Test_Reflect.getMethod$S$ClassA ("test", [Float.TYPE, String]).invoke$O$OA (tr, [new Integer (10), "float"]);
test.Test_Reflect.getMethod$S$ClassA ("test", [String, Clazz.arrayType('int[]')]).invoke$O$OA (tr, ["int[]",  Clazz.newIntArray (-1, [10])]);
test.Test_Reflect.getMethod$S$ClassA ("test", [String, Clazz.arrayType('float[]')]).invoke$O$OA (tr, ["float[]",  Clazz.newFloatArray (-1, [10])]);
test.Test_Reflect.getMethod$S$ClassA ("test", [String, Clazz.arrayType('test.Test_Reflect[]')]).invoke$O$OA (tr, ["test.Test_Reflect[]",  Clazz.newArray (-1, [tr])]);
test.Test_Reflect.getMethod$S$ClassA ("test", [String, Clazz.arrayType('java.lang.String[]')]).invoke$O$OA (tr, ["String[]",  Clazz.newArray (-1, ["10"])]);
test.Test_Reflect.getMethod$S$ClassA ("test", [String, Clazz.arrayType('java.lang.String[][]')]).invoke$O$OA (tr, ["String[][]",  Clazz.newArray (-1, [ Clazz.newArray (-1, ["10"]), null])]);
test.Test_Reflect.getMethod$S$ClassA ("test", [String, Clazz.arrayType('float[][]')]).invoke$O$OA (tr, ["float[][]",  Clazz.newArray (-1, [ Clazz.newFloatArray (-1, [10]), null])]);
	 */

	public static void main(String[] args) {
		Test_Reflect tr = new Test_Reflect();
		try {
			// Field is not implemented
			
//			Field f = Test_Reflect.class.getDeclaredField("s");
//			System.out.println(f.getDeclaringClass());
			
			Test_Reflect.class.getMethod("test", char.class, String.class).invoke(tr, (char)75, "char");
			Test_Reflect.class.getMethod("test", Character.TYPE, String.class).invoke(tr, (char)75, "char");

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
			ff[0] = new float[] {10};
			String[][] ss = new String[][] {new String[] {"10"}, null};
			
			Test_Reflect.class.getMethod("test", String.class, int[].class).invoke(tr, "int[]", ii[0]);
			Test_Reflect.class.getMethod("test", String.class, float[].class).invoke(tr, "float[]", ff[0]);
			Test_Reflect.class.getMethod("test", String.class, test.Test_Reflect[].class).invoke(tr, "test.Test_Reflect[]", new test.Test_Reflect[] {tr});

			Test_Reflect.class.getMethod("test", String.class, String[].class).invoke(tr, "String[]", ss[0]);
			Test_Reflect.class.getMethod("test", String.class, String[][].class).invoke(tr, "String[][]", ss);
			Test_Reflect.class.getMethod("test", String.class, float[][].class).invoke(tr, "float[][]", ff);


			System.out.println("Test_Reflect OK");
			
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
//		} catch (NoSuchFieldException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
		}
	}

}