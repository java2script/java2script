package test;

import java.lang.reflect.Array;
import java.util.Arrays;

import javajs.util.AU;

class Test_Array extends Test_ {

	static Object ax1 =new int[2][]; 
	static Object ax = new int[2][3][];


	static int[] i0 = new int[0];
	static Object ono = new Class<?>[0];

	static Object c33def2b = new int[][] { { 0, 1, 2 }, { 3, 4, 5 }, { 3, 4, 5 }, { 3, 4, 5 } };

	
	static int y;
	static {
		
		
		int[][] ia = (int[][])c33def2b;
		int[][] ib = ia.clone();
		assert("[[I".equals(ib.getClass().getName()));
		
		int x = 3;
		y = x;
		Test_Array[] a = new Test_Array[3];
	}
	
	
	static Object oo = Array.newInstance(Test_Array[].class, 0);

	static Object tType3__ = Array.newInstance(Test_Array[][].class, 3);
	static Object oType3__ = Array.newInstance(Object[][].class, 3);
	static Object sType3__ = Array.newInstance(String[][].class, 3);
	static Object iType3__ = Array.newInstance(int[][].class, 3);
	static Object iType3_ = Array.newInstance(int[].class, 3);
	static Object iType3 = Array.newInstance(Integer.TYPE, 3);
	static Object iType123_ = Array.newInstance(Integer.TYPE, 1, 2, 3);
	static Object fType123_ = Array.newInstance(Float.TYPE, 1, 2, 3);
	static Object i3def = new int[] { 3, 4, 5 };
	static Object i3 = new int[3];
	static Object i3_ = new int[3][];
	static Object i33 = new int[3][3];
	static Object s3 = new String[3];
	static Object s3_ = new String[3][];
	static Object s33 = new String[3][3];
	static Object c3 = new char[3];
	static Object c3_ = new char[3][];
	static Object c33 = new char[3][3];
	static Object c33__ = new char[3][3][][];
	static Object c33_ = new char[3][3][];
	static Object c33def = new int[][] { new int[] { 3, 4, 5 }, null };
	static Object c33def2 = new int[][] { new int[] { 0, 1, 2 }, new int[] { 3, 4, 5 } };
	static Object c222def = new int[][][] {
			{ { 0, 1, 2 }, { 3, 4, 5 }, { 0, 1, 2 }, { 3, 4, 5 }, { 0, 1, 2 }, { 3, 4, 5 } },
			{ { 0, 1, 2 }, { 3, 4, 5 }, { 0, 1, 2 }, { 3, 4, 5 }, { 0, 1, 2 }, { 3, 4, 5 } } };

	public static void main(String[] args) {
			char cc = Character.valueOf('c');
			byte b = Byte.valueOf((byte)3); 
			char[] chs = new char[] {65, 'B', cc, Character.valueOf('c')};
			int[] ints = new int[] {1,2, 'a', 3, b + 1}; // NOT "3".charAt(0)};
			short[] shorts = new short[] {1,2, 'a', +3};
			long[] longs = new long[] {1,2, 'a', 3}; 
			float[] floats = new float[] {1,2, 'a', 3};
			double[] dbls = new double[] {1,2, 'a', 3};
			byte[] by  = new byte[] { 0, 'a', 'b', 'c' + 2, b  }; 
			byte[][] by2  = new byte[][] { {0, 'd'}, {'b', 'c' + 1} }; 
			System.out.println(Arrays.toString(by));
			
			int[] a = new int[] {1,2,3};
			int i = 2, jj;
			a[--i] *= a[i + 1];
//			a[--i] = a[jj = i] + a[i + 1];
			System.out.println(Arrays.toString(a));
			a[i--] = a[i] + a[i + 1];
			System.out.println(Arrays.toString(a));
		Object[][] oaa = new Object[2][];
		

		// Object[][] is Object[]
		if (oaa instanceof Object[]) {
			System.out.println("OK");
		} else {
			assert(false);
		}

		// Object[][] is not Object[][][]
		if (oaa instanceof Object[][][]) {
			assert(false);
		} else {
			System.out.println("OK");
		}

		// String[][] is Object[]
		if (s3_ instanceof Object[]) {
			System.out.println("OK");
		} else {
			assert(false);
		}

		// String[][] is Object[][]
		if (s3_ instanceof Object[][]) {
			System.out.println("OK");
		} else {
			assert(false);
		}

		// int[] is not Object[]
		if (i3 instanceof Object[]) {
			assert(false);
		} else {
			System.out.println("OK");
		}

		if (s3 instanceof Object[][]) {
			assert(false);
		} else {
			System.out.println("OK");
		}

    	try {
			System.out.println(Class.forName("[C").getName());
			System.out.println(((new test.Test_Array[0]).getClass().getName()));
			System.out.println(Class.forName("[Ltest.Test_Array;").getName());
			assert(Class.forName("[C").getName().equals("[C"));
			assert(Class.forName("[Ltest.Test_Array;").getName().equals("[Ltest.Test_Array;"));
		} catch (ClassNotFoundException e1) {
			assert(false);
		}
    			
		char[] ca = new char[] { '1', '2', '3', '4' };

		Class<?> c = i3.getClass().getComponentType();
		int[] i3b = (int[]) Array.newInstance(c, 5);

		int hc = i3.hashCode();

		System.out.println(hc);
		assert (i3.getClass().getComponentType().getName() == "int");
		assert (i33.getClass().getComponentType().getName() == "[I");
		assert (i33.getClass().getComponentType().getName() == "[I");
		assert (i33.getClass().getComponentType().getComponentType().getName() == "int");
		assert (tType3__.getClass().getComponentType().getName().equals("[[L" + Test_Array.class.getName() + ";"));
		assert ((i3 instanceof int[]));
		assert ((i3b instanceof int[]));
		assert ((iType3 instanceof int[]));
		assert ((i3_ instanceof int[][]));
		assert ((i33 instanceof int[][]));
		assert ((iType3_ instanceof int[][]));
		assert (!(i33 instanceof int[]));
		assert ((new int[2][])[0] == null);
		assert ((new int[2][3][])[0][0] == null);
		assert(((int[][])i33)[0][0] == 0);
		assert(((char[][][][])c33__)[0][0] == null);
		int[] ii3 = new int[] { 1, 2, 3 };
		ii3[Integer.valueOf(2)] = 1;
		int j = ii3[Integer.valueOf(2)];
		Integer iI = Integer.valueOf(2);
		double[] da = new double[3];
		System.out.println(da[iI]);
		assert (ii3[2] == 1 && j == 1);
		
		float[] fa = new float[] {1.234456f};
		
		da = AU.asDoubleA(fa);

		assert (da[0] == 1.234456);
		
		// this next will fail in Java and be OK in JavaScript
		// assert(1.234456f == 1.234556);

		assert (da instanceof double[]);

		fa = AU.asFloatA(da);
		
		assert (fa instanceof float[]);

		System.out.println("Test_Array OK");
	}


}