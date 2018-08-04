package test;

class Test_Byte extends Test_ {
	
	public static void main(String[] args) {
		
		// implied integer division can be done with int /=
		double d = 3;
		int di = 'c';
		d /= 'c';
		System.out.println(d);
		assert(d == 3.0/99);
		
		int i3 = 3;
		System.out.println(i3/5);
		

		// integer division must be turned back into an integer in JavaScript

		di /= 'c';
		System.out.println(1);
		assert(di == 1);

		di = 100;
        System.out.println(d/7/3);
		assert(di / 7 / 3 == 4);

		// JavaScript byte arrays require no wrapping
		
		byte[] ab = new byte[10];
		ab[1] += 120;
		ab[2] = 120;
		ab[3] = 120;
		ab[0] = (byte) ((ab[1] + ab[2] + ab[3])/3); // plus and div are not byte operators.
		System.out.println(ab[0]);
		assert(ab[0] == 120);
		
		
		// all sorts of conversions. Note that short or byte operations other than bit shifts
		// are really handled as int operations 
		int i255 = 0xFF;
		byte b = (byte) i255;
		
		b = 127;
		b += 127;
		b++;
		short sh = b;
		short sh1 = sh;
		checkShort(sh);
		short h = (short) ((i255 << 8) + 0xFF);
		int i = 0xFFFFFFFF + (byte) h;
		i = (int) h;
		char c = 'c';
		c += 1;
		System.out.println(c);
		assert (c == 'd');
		System.out.println("" + b + " " + h + " " + i);
		assert (b == -1);
		assert (h == -1);
		assert (i == -1);
		b = (byte) c;
		b = (byte) 2;
		int i2 = ((byte)4000 / b / b) * 30;
		System.out.println(i2);
		assert(i2 == -720);
		b/=2;
		b /= 0.01;
		System.out.println(b);
		assert (b == 100);
		
		// byte array pointer increment test - with character encoding
		byte[] bok = new byte[] {'a', 2, 3, 4, 5};
		b = -128;
		int pt = 0;
		bok[bok[++pt]] += 0;
		bok[bok[2]++] += 0;
		
		pt = 0; 
		bok[pt++] |= '\2';
		bok[pt++] = --b;
		assert(pt == 2 && bok[0] == 'c' && bok[1] == 127);
		bok[pt++] += b++; 
		assert(pt == 3 && bok[2] == -125 &&  b == -128);
		bok[pt++] += b++;
		assert(bok[3] == -124 && b == -127);
		
		
		// byte increment test
		b = 127; 
		i = b++;
		assert(i == 127 && b==-128);
		b = -128; 
		i = --b;
		assert(i == 127 && b==127);
		b = -128;
		i = b--;
		assert(i == -128 && b==127);
		
		b = 127;
		b++;
		assert(b==-128);		
		--b;
		assert(b==127);		
		++b;
		assert(b==-128);		
		b--;
		assert(b==127);
		
		
		// byte shift tests
		
		b = 101;
		b <<= 2;
		assert(b == -108);
		b >>= 2;
		System.out.println("((byte)101 << 2) >>2 = " + b);
		assert(b == -27);

		b = 101;
		b = (byte) (b >>> 2);
		assert(b == 25);
		b = -101;
		b = (byte) (b >>> 2);
		System.out.println("((byte)-101 >>>2 = " + b);
		assert(b == -26);
		b = -1;
		b = (byte) (b >>> 2);
		System.out.println("((byte)-1 >>>2 = " + b);
		assert(b == -1);

		// int bit shifts
		i = -1;
		i = i >>> 2;
		System.out.println("(int)-1 >>> 2 = " + i);
		assert(i == 1073741823);

		i = -1;
		i >>= 2;
		System.out.println("(int)-1 >>= 2 = " + i);
		assert(i == -1);

		i = -1;
		i >>>= 2;
		System.out.println("(int)-1 >>>= 2 = " + i);
		assert(i == 1073741823);
		
		
		// character increment test
		c = 'a';
		c++;
		c--;
		++c;
		--c;
		assert(c == 'a');

		i = c++;
		assert(i == 'a' && c == 'b');
		i = ++c;
		assert(i == 'c' && c == 'c');
		

		pt = 0;
		int p = 3;
		int[] a = new int[] {1,2,3, 4, 5};
		a[2] |= 6; 
		a[p++] |= 6;
		a[pt++] |= 2;
		a[pt++] |= 4; 
		assert(pt == 2 && a[0] == 3 && a[1] == 6);
		
		// double array check
		byte[][] aa = new byte[][] { {0, 0, 0}, {1,2,3}};
		pt = 0;
		aa[pt++][1] += 5;
		aa[pt++][1] += (int) (pt + 5.0);
		pt = 0;
		aa[1][pt++] += 5;
		aa[1][pt++] += 5;
		assert(aa[0][1] == 5);
		assert(aa[1][1] == 14);
		 
	
		byte[][][] aaa = new byte[][][] {{{0, 0, 0}, {1,2,3}, {4, 5, 6}}};
		pt = 0;
		p = 0;
		aaa[p++][pt++][1] += 5;
		aaa[0][pt++][1] += (int) (pt + 5.0);
		pt = 0;
		aaa[0][1][pt++] += 5;
		assert(aaa[0][0][1] == 5);
		assert(aaa[0][1][0] == 6);
		assert(aaa[0][1][1] == 9);
		 
 
		// boolean[] test
		boolean[] aok = new boolean[200];
		
		aok[100] |= true; 
 		
		pt = 0;
		aok[pt++] |= true;
		assert(pt == 1 && aok[0] == true);

		// char[] test
		
		char[] cok = new char[3];
		pt = 0; 
		cok[0] = '\2';
		cok[pt++] |= 'a'; 
		// cok[$j$=pt++] = String.fromCharCode((cok[$j$]).$c()| 97);
		assert(pt == 1 && cok[0] == 'c');

		// quick test for double using += directly

		double line1[] = new double[20];
		i2 = 1;
	    line1[i2+1] += Math.sin(3);
	    
	    
		System.out.println("Test_Byte OK");

	}

	private static void checkShort(short sh) {
		// TODO Auto-generated method stub
		
	}
	
}