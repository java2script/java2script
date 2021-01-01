package test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PushbackInputStream;
import java.util.BitSet;

/**
 * test full 64-bit long/Long support in JavaScript. Also see Test_BigInt
 * 
 * Missing piece here is long div using BigInt. 
 * 
 * @author hansonr
 *
 */
public class Test_Long extends Test_ {

	static long field;

	static Long Field = Long.valueOf(0);

	int ia;
	
	int ir = 10;
	
	long a,b,c,r=10;

	Long B = Long.valueOf(1);
	
	public static void main(String[] args) {

		long j = 2, k = 10, l = 1, m = 12;

		
		// TODO
		 
		testLongMath(j, k, l);
		

		// all passing 2020.12.31 v 3.2.10 with full long support

		testDouble(j, k, l);
		testBitSet();
		testAddSubAssign();
		testFieldAccess();
		testMulDivMod(j,k,l,m);
		testAndOrNot(j,k,l,m);
		testShift();
		testToString();
		testParams(j, k++, ++l, m += 10);
		assert(j == 2 && k == 11 && l == 2 && m == 22);	
		testRollOver();
		testArray(1,j,k,m);
		testCatchInvalid();
		testStatic();
		testBoxed();
		testExtended(j,k,l,m);		

		System.out.println("Test_Long OK");
	}

	private static void testLongMath(long j, long k, long l) {
		
		k = -230842039822340L;
		l = 23942392332L;
		j = k/l;
		assert(j == -9641);
		
		j = Math.floorDiv(k, l);
		assert(j == -9642);

		
		l = -12323942392332L;
		j = k/l;
		assert(j == 18);
		
		j = Math.floorDiv(k, l);
		assert(j == 18);

	}

	private static void testFieldAccess() {
		
		
        System.out.println("test field access");

        double d = 0;
		 
		d += 450000000000L;

		long ll = 0;
		ll += 3;
		
		int ii = 0;
		ii += 4500000000L;
		
		new Test_Long().r += 450000000L;
		new Test_Long().ir += 4500000000L;
		
		Test_Long[] runs = new Test_Long[] {new Test_Long(1), new Test_Long(2)}; 
		
        long limit = 12;
        for (int i = 0; i < 2; ++i) {
            limit = (runs[i].r += limit);
        }
        assert(limit == 32 && runs[0].r == 22 && runs[1].r == 32);
        
        long lim = 120000000000L;
        int ilim = 0;
        
        ilim += lim;
        
        ilim = 0;
        
        for (int i = 0; i < 2; ++i) {
            ilim =  (runs[i].ir = (int) (runs[i].ir + lim));
        }
 
        assert(ilim == -259084278 && runs[0].ir == -259084278 && runs[1].ir == -259084278);

        runs[0].ir = runs[1].ir = 10;
        ilim = 0;
        for (int i = 0; i < 2; ++i) {
            ilim = (runs[i].ir += lim);
        }
        assert(ilim == -259084278 && runs[0].ir == -259084278 && runs[1].ir == -259084278);

		
		Test_Long TL = new Test_Long();		
		((Test_) TL).t_test = "";

		TL.b++;
		

		new Test_Long().b++;
		long t = new Test_Long().b++;
		t += new Test_Long().b++; 
		
		System.out.print(" should be 0:");
		System.out.println(new Test_Long().a);

		// TODO
		// System.out.println$J((Clazz.new_(C$).b=Long.$add(Clazz.new_(C$).b,Clazz.toLong(2.5))));
		System.out.print(" should be 2:");
		System.out.println(new Test_Long().b += 2.5);
		System.out.println(new Test_Long().ia += 2.5);
		//System.out.println$I(($I$.push(Clazz.new_(C$)),$I$[$I$.length-1]).ia=($I$.pop().ia+(2.5)|0));
		System.out.println(new Test_Long(new Test_Long().ia++).ia += 2.5);
		//System.out.println$I(($I$.push(Clazz.new_(C$.c$$I,[Clazz.new_(C$).ia++])),$I$[$I$.length-1]).ia=($I$.pop().ia+(2.5)|0));
		System.out.println(new Test_Long((int) new Test_Long().b++).ia += 2.5);
		//System.out.println$I(($I$.push(Clazz.new_(C$.c$$I,[Long.$ival(([$I$.push(Clazz.new_(C$)),$I$[$I$.length-1]).b$I$[$I$.length-1].,$I$.push(Clazz.new_(C$)),$I$[$I$.length-1]).b$I$[$I$.length-1].=Long.$inc($I$.pop().b,1)][0]))])),$I$[$I$.length-1]).ia=($I$.pop().ia+(2.5)|0));

		System.out.println(new Test_Long().b = 23);
		System.out.println(new Test_Long().b++);



		new Test_Long().ia = 178;
//		Clazz.new_(C$).ia=178;

		new Test_Long().b+=2.7;
//		(($I$.push(Clazz.new_(C$)),$I$[$I$.length-1]).b=Long.$add($I$.pop().b,Clazz.toLong(2.7)));
		new Test_Long().ia+=2.7;
//		($I$.push(Clazz.new_(C$)),$I$[$I$.length-1]).ia=($I$.pop().ia+(2.7)|0);

		new Test_Long().ia++;
	
		System.out.println(new Test_Long().ia += 2.5);
		// TODO
		// System.out.println$J((C$.newTest_Long$().c=Long.$add(C$.newTest_Long$().c,("c".$c()))));
		System.out.print(" should be 103?:");
		
		Test_Long tl;
		System.out.println((tl = newTest_Long()).c += 'd');

		System.out.println(tl.c);
		assert(tl.c == 100);
		
        System.out.println("test field access OK");
		
	}


	private Test_Long getMe() {
		return this;
	}

	private Long getB() {
		return B;
	}


	private static Test_Long newTest_Long() {
		return new Test_Long();
	}

	private static void testDouble(long j, long k, long l) {
		
		System.out.println("testDouble");

		double d;

		l = Double.doubleToLongBits(1);
		assert(l == 0x3ff0000000000000L);
		
		l = Double.doubleToLongBits(2);
		assert(l == 0x4000000000000000L);
		
		l = Double.doubleToLongBits(-1);
		assert(l == -4616189618054758400L);

		l = Double.doubleToLongBits(2.345819343458);
		assert(l == 4612464734360555383L);

		d = -2345771394816589578L; // -2.3457713948165898E18
		l = Double.doubleToLongBits(d);
		assert(l == -4341392055657027488L);

		l = new Double(15213443.68).longValue();
		assert(l == 15213443);

		l = new Double(-1e15).longValue();
		assert(l == -1e15);

		l = new Double(-1.999999999999999e15).longValue();
		System.out.println("l is " + l);
		assert(l ==    -1999999999999999L);

		l = new Double(-2.000000000000001e15).longValue();
		System.out.println("l is " + l);
		assert(l ==    -2000000000000001L);

		l = new Double(-1.234567890123456e15).longValue();
		System.out.println("l is " + l);
		assert(l == -1.234567890123456e15);
		
		l = new Double(1E100).longValue();
		assert(l == Long.MAX_VALUE);

		l = new Double(-1E100).longValue();
		assert(l == Long.MIN_VALUE);

		d = 1E100;
		l = (long) 1E100;
		assert(l == Long.MAX_VALUE);
	
		l = (long) d;
		assert(l == Long.MAX_VALUE);
		
		l = (long) -1E100; 
		assert(l == Long.MIN_VALUE);

		d = -1E100;
		l = (long) d;
		assert(l == Long.MIN_VALUE);
		
		l = 0;
		l += -1E100;
		assert(l == Long.MIN_VALUE);

		l = 0;
		l += 1E100;
		assert(l == Long.MAX_VALUE);

// Sorry, even with Float32Array, it doesn't seem to matter. Everything is a double.		
//		float f = Long.valueOf(l).floatValue();
//		assert(f != (double) l);
//		f += l;
//		assert(f == 2 * 9.223372E18F);
		d = Long.valueOf(l).doubleValue();
		assert(d == 9.223372036854776E18);
		
		

		// I so hate this motif...
		l = 0;
		d = 3.45;
		l += d;
		int ii = 0;
		ii += 3.45;
		
		
		assert(l == 3);
		
//		l = Double.doubleToLongBits(3.5);
//		assert(l == 4615063718147915776L);
//		
//		l = Double.doubleToRawLongBits(Double.POSITIVE_INFINITY);
//		assert(l == 0x7FF0000000000000L);
//
//
//		l = Double.doubleToLongBits(Double.NaN);
//		assert(l == 9221120237041090560L);
//
//		l = Double.doubleToRawLongBits(Double.NaN);
//		assert(l == 9221120237041090560L);

		l = Integer.valueOf(123).longValue();
		assert(l == 123);
		
		int zero = 0;
		assert (((long) Double.NaN) == zero);
		assert (((int) Double.NaN) == zero);
		assert (((long) Float.NaN) == zero);
		assert (((int) Float.NaN) == zero);
		
		d = (long) 3.8;
		assert (d == 3);
		d = (long) -3.8;
		assert (d == -3);
		l = 100000000000L;
		d = 1e14 + l;
		assert(d == 1.001e14);
		d = l + 1e14;
		assert(d == 1.001e14);
		l = 0x10000000000L;
		d = l;
		assert(d == 1.099511627776E12);
		d = l / 2;
		
		d += l;
		assert(d == 1.649267441664E12);
		d = Double.POSITIVE_INFINITY;
		l = 0;
		l += d;
		assert (l == +Long.MAX_VALUE);
		d =  9223372036854775.807;
		l = (long) d;
		assert (l == 9223372036854776L);
		l = (long) -d;
		assert (l == -9223372036854776L);

		long m;
		
		for (double di = -20; di < 20; di++) {
			l = 0;
			m = (long) (l + di / 10);
			l += di / 10;
			System.out.println(l + " " + (di / 10) + " " + m);
			assert (l == m);
		}
		for (double di = -20; di < 20; di++) {
			l = 0;
			m = (long) (l - di / 10);
			l -= di / 10;
			System.out.println(l + " " + (-di / 10) + " " + m);
			assert (l == m);
		}
		l = 0;
		l += 9E13;
		System.out.println("9E13=" + l);
		assert (l == 9e13);

		d = Integer.MAX_VALUE;
		d += 1e13;
		l = (long) +d;
		System.out.println(d + " " + l);
		assert (l == 10002147483647L && d == l);


		
		System.out.println("testDoubleOK");

	}

	private static void testExtended(long j, long k, long l, long m) {
		
		System.out.println("test for a + b + c + .... extended");

		j = 2;
		k = 10;
		l = 1;
		m = 12;
		j = k + l + l;
		assert(j == 12);
		j = k | l | 0xFL;
		assert(j == 15);
		m = 2;
		l = k & k;
		l = k & k & m;
		assert(l == 2);
		l = 1000 % 117L % 5L %2;
		assert(l == 0);
		l = 0x10000L;
		k = 2;
		m = 3;
		l = l << k << m << 4L;
		assert(l == 33554432);

		System.out.println("test extended OK" );

	}

	private static void testBitSet() {
		System.out.println("test for long use in BitSet");
		long[] ba = new long[3];
		BitSet bs = new BitSet();
		for (int i = 0; i < 500; i+=3) {
			bs.set(i);
		}
		long[] a = bs.toLongArray();
//		for (int i = 0; i < a.length; i++) {
//			System.out.println(i + "\t" + a[i] 
//					+ "\t" + Long.toString(a[i],16)
//					+ "\t" + Long.toString(a[i],2));
//		}
		bs = BitSet.valueOf(a);
		for (int i = 0; i < 500; i+=3) {
			assert(bs.get(i) && !bs.get(i+1) && !bs.get(i+2));
		}
		System.out.println("BitSet reload from long[] OK");
	}

	private static void testMulDivMod(long j, long k, long l, long m) {

		System.out.println("test * / %");

		l = Long.MAX_VALUE;
		k = l * 2;
		assert (k == -2);

		l = 54443251L;
		k = l * l;
		assert(k == 2964067579449001L);
		k = 3487037432347L * 1134731094L * 3981743294387123456L;
		assert (k == -5624835777339115008L);
		l = 1; // factorials
		int i;
		for (i = 1; i < 21; i++) {
			l *= i;
			System.out.println(i + "\t" + l + " " + (double) l);
		}
		int ii = 10;
		l = 2000 / ii / l / l / 2 / ii;

		Integer I = Integer.valueOf(33);
		i = I++;
		i = I / 5;
		I /= 5;
		i = i / 5;

		i /= 5;

		Long L = Long.valueOf(20000);
		L /= 10;
		assert (L == 2000);
		L /= 3;
		k = k + L / 3;
		k = 3 / L;
		k = L / L;
		L = L / L;
		k = 2000;
		L = Long.valueOf(k / 3);
		assert (L == 666);
		L = L / 67;
		assert (L == 9);
		Short H = Short.valueOf((short) 14);
		H = (short) (H / 3);

		l = 2394723947293743L;
		l /= 112399L;
		assert (l == 21305562747L);
		l = 2394723432947293743L;
		l /= 239472343L;
		assert (l == 10000000012L);
		l = -2394723432947293743L;
		l /= 47293743L;
		assert (l == -50635100565L);

		System.out.println("test * / % OK");
}

	private static void testAndOrNot(long j, long k, long l, long m) {

		System.out.println("(long) and/or/xor/not test");
		
		k = Long.MAX_VALUE;
		boolean b = (k == 9995);
		b |= (++k == 11); // even if b is false, expression evaluates
		l = -9223372036854775808L;
		assert(k == l);
		k += 100;
		k |= 3333;
		l = -9223372036854772379L;
		assert (k == l);
		k ^= 0xF0F0F0F0F0F0F0FL;
		l = -8138269444283628950L;
		assert (k == l);
		k &= 0xFFFF00FF0F0F0FFFL;
		l = -8138285936958045590L;
		assert (k == l);
		k = ~k;
		l = 8138285936958045589L;
		assert (k == l);

		System.out.println("(long) and/or/xor/not test OK");
	}

	private static void testArray(long ...k) {
		
		System.out.println("(long) array test");

		Test_Long[] runs = new Test_Long[] {new Test_Long(1), new Test_Long(2)}; 
		
        long limit = 12;
        for (int i = 0; i < 2; ++i) {
            limit = (runs[i].ir += limit);
        }
        assert(limit == 32 && runs[0].ir == 22 && runs[1].ir == 32);
		
		
		long l = k[0]++ + (k[3]+=0xFF);
		assert(k[0] == 2 && k[2] == 11 && l == 278);
		//al[k[0]] = 1; // :) Hooray! Can't do this -- array access with long!

		System.out.println("(long) array test OK");


	}

	private static void testToString() {
		
		System.out.println("(long) to/from String test");

		long j = 2, k = 10;
		
		long l = 0x8000000000000000L;
		System.out.println(l + " " + "toUnsigned:" + Long.toUnsignedString(l) + " toUnsignedHex:"
				+ Long.toUnsignedString(l, 16) + " toHex:"
				 + Long.toHexString(l)
				 );
		l = 0x20000000000000L;
		System.out.println(Long.toUnsignedString(l));
		l = -1;
		String s ="";
		for (int i = 0; i < 10; i++) {
			String su =  Long.toUnsignedString(l);
			s += ("\n" + i + " " + l + " " + su + " ");
			l *= 2;
		}
		System.out.println(s);
		s = "" + j;
		s += k + " and  " + j + (j+1);
		StringBuffer sb = new StringBuffer();
		sb.append(k);
		sb.append(s);
		assert(sb.toString().equals("10210 and  23"));
		StringBuilder ssb = new StringBuilder();
		ssb.append(k);
		ssb.append(s);
		assert(ssb.toString().equals("10210 and  23"));
		
		k = Long.parseLong("" + Long.MAX_VALUE);
		assert (k == Long.MAX_VALUE);
		
		try {
		k = Long.parseLong("9223372036854775808");
		assert (false);
		} catch (NumberFormatException e) {
			assert(true);
		}
				

	
		// Test ALL POSSIBLE high-part conversions.
		// Long.MAX_VALUE is 9223372036854775807
		// SwingJS will split this into 9223*10^15 + 372036854775807
		// The only thing we have to worry about is fractions 
		// in that high part. There are only 9224 possibilities, 
		// 0000-9223. We test them here to ensure that all are
		// equivalent the the actual long number via addition.
		// Actually, this is provably true:
		// Our remainder is modulo 2^24, which is 16777216, with eight digits.
		// The fraction we will get is at a maximum 9223.xxxxxxxxxxxx
		// The key is that we must have at least 9 fractional digits of
		// precision. Total precision is 15 digits for a double. Here we 
		// have 15-4 = 11 digits of precision. plenty to be exact for 
		// modulo 16777216. 
		
		s = "372036854775807";
		j = Long.parseLong("372036854775807");
		l = 0;
		for (int i = 0; i < 9224; i++) {
			long n = j + l;
			assert(Long.parseLong(i + s) == j + l);		
			l+=1000000000000000L;
		}
		k = Long.parseLong("" + Long.MIN_VALUE);
		assert (k == Long.MIN_VALUE);

		k = Long.parseLong("7FFFFFFFFFFFFFFF", 16);
		assert (k == Long.MAX_VALUE);
		System.out.println(Long.toString(k,16));
		
		k = Long.parseLong("-145670123456701234567", 8);
		assert (k == -1834941117544872311L);
		System.out.println(Long.toString(k,8));

		k = Long.parseLong("11010101011010101010110101011010101010110000011110000110101010", 2);
		assert (k == 3844573620634509738L);
		System.out.println(Long.toString(k,2));

		System.out.println("(long) to/from String test OK");

	}

	private static void testParams(long j, long k, long l, long m) {
		System.out.println("(long) parameter passing as immutable reference or value test");
		j++;
		k++;
		l--;
		assert(j == 3 && k == 11 && l == 1 && m == 22);
		
		System.out.println("(long) parameter passing OK");

	}

	private static void testAddSubAssign() {

		System.out.println("(long) assignment test, no boxing");
		
		long j, l = 0, k = (l += 5) + l, m = 0;
		long q = 0;
		long p;
		int i;
		int ii = 1; 

		j = 0;
		j += 'c';
		assert (j == 99);


		k  = (l += 5) + l;
		k = +1;
		k = +ii;
		k = +k;

		boolean b = (k != 35);

		l = l - (short) 3;
		l = l - 3;
		l = l - (byte) 3;  
		l = (int) l; 
		// l = Long.$sub( Long.$sub( Long.$sub( Long.$sub(Long.$sub(Long.$add( 2 + ii, l
		// , ii , ii) , l)
		// , ii)
		// , l)
		// , ii)
		// , ii);

		l = 2 + ii + ii + 2 + ii + l + ii + ii - ii - l - ii - ii - ii - l - ii - ii;

//		l = 2 + ii + ii + 2 + ii + l + ii + ii - ii - l - ii - ii - ii - l - ii - ii;
		l = 1;
		j = ++k;
		k = j--;
		l = 1;
		k  = (l += 5) + l;
		assert(k == 12 && l == 6);
		k = 0xFFFFFFFFFFFFFFFL;
		i = (int) k;
		assert(i == -1);
		j = i;
		k += 5;
		k = k++;
		assert (k == 1152921504606846980L);

		System.out.println("(long) assignment test, no boxing OK");

	}

	private static void testRollOver() {

		System.out.println("(long) Long.MAX_VALUE, Long.MIN_VALUE roll-over test");
		
		long k;
		int i;
		Long L;
		long l;
		l = -5;
		l = 5;
		l = Long.MAX_VALUE;
		l += 5;
		System.out.println("l = Long.MAX_VALUE + 5 = " + Long.valueOf(l) + " is -9223372036854775804");
		assert(l == -9223372036854775804L);
		k = (l += 5);
		System.out.println("l += 5 = " + Long.valueOf(k) + " is -9223372036854775799");
		assert(k == -9223372036854775799L);
		l = Long.MIN_VALUE;
		l -= 5;
		System.out.println("l = Long.MIN_VALUE -= 5 = " + Long.valueOf(l) + " is 9223372036854775803");
		assert(l == 9223372036854775803L);

		long bl = 0x7FFFFFFFFFFFFFFFL;
		assert (bl + 10 < 0);

		System.out.println(
				"JavaScript largest safe number " + Long.parseLong("1FFFFFFFFFFFFF", 16) + " " + 0x1FFFFFFFFFFFFFL);
		assert (Long.parseLong("1FFFFFFFFFFFFF", 16) == 0x1FFFFFFFFFFFFFL);
		double d = 0x1FFFFFFFFFFFFFL;
		System.out.println((long) d);
		assert (((long) d) == 0x1FFFFFFFFFFFFFL);
		L = 0x7FFFFFFFFFFFFFFFL;
		System.out.println("Largest Java Number is 9223372036854775807: " + L);
		L += 0x7FFFFFFFFFFFFFFFL;
		assert(L == -2);
		L += 0x7FFFFFFFFFFFFFFFL;
		assert(L == 9223372036854775805L);
		L += 0x7FFFFFFFFFFFFFFFL;
		assert(L == -4);
		k = 10;
		k += k + (k += k);
		assert(k == 40);
		k = 0x7FFFFFFFFFFFFFFFL;
		k += k + (k += k);
		assert(k == -4);
		
		System.out.println("roll-over test OK");

	}

	private static void testBoxed() {

		System.out.println("Long boxing test");
		
		Long L = Long.valueOf(10000);

		System.out.println(L);

		Long O, P, J, K;
		long j, k, m;
		int i;
		showLong((O = ++L), 10001, L, 10001);
		showLong((J = L++), 10001, L, 10002);
		showLong((K = -L), -10002, L, 10002);
		k = ++(L);
		P = +L;

		Integer II = null;
		Integer IJ = null; 
		assert(L != O);
		assert(II == IJ);
		assert(L == L);
		assert(P != L);
		assert(P.equals(L));
		assert(L != null);
		assert(null != L);
		
		k = -L;
		j = L--;
		j = k;
		m = ++L;
		P += 3;
		field = ++Field;
		System.out.println(
				" L = " + L + " O = " + O + " J = " + J + " K = " + K + " k = " + k + " j = " + j + " m = " + m);

		K++;// = B ^ (byte) 3;
		K += (byte) 5;
		L += 5;

		assert (L == 10008);

		Character C = Character.valueOf('c');
		char ch = C++;
		int ii = C++;
		assert (ch == 'c');
		ch = ++C;
		C++;
		++C;
		assert (ch == 'f' && C == 'h');

		long[] al = new long[] { O, J, K };
		Long[] AL = new Long[] { O, J, K };

		i = 0;
// TEMP
		(al[i++])++;
		P = ((((AL[i++]))))++;
		System.out.println(O == Long.valueOf(10001));
		System.out.println(O.equals(Long.valueOf(10001)));
		System.out.println(O != Long.valueOf(10001));
		boolean b1 = false, b2 = false, b3 = false, b4;
		boolean tf = ((b1 = (K == -9996 && L == 10008 && O == 10001)) && (b2 = O.equals(Long.valueOf(10001)))
				&& (b3 = O != Long.valueOf(10001)));

		assert (tf);

		byte b = (byte) 255;
		byte c = b++;
		byte a = ++b;

		Byte B = Byte.valueOf((byte) 100);
		byte[] ab = new byte[] { 1, 2, 3, 4 };
		byte[][] abc = new byte[][] { new byte[] {}, new byte[] { 1, 2, 3, 4 } };
		Byte[][] ABC = new Byte[][] { new Byte[] {}, new Byte[] { 1, 2, 3, 4 } };
		Byte[] AB = new Byte[] { 1, 2, 3, 4 };
		i = 0;
//TEMP
		++ab[i++];
		ab[i++]++;
		++AB[i++];
		AB[i++]++;

		i = 0;
		j = 1;
		abc[++i][(int) j++] += 0xFFFF;
		//abc[$l$=++i][$k$=Long.$ival(([j,j=Long.$inc(j,1)][0]))]=(abc[$l$][$k$]+(65535)|0);
		i = 0;
		j = 1;

		assert (abc[1][1] == 1);

		abc[(int)++new Test_Long().b][1]++;
		assert (abc[1][1] == 2);

		P = K;
		assert (P == K);

		P = +K;

		assert (P != K);

		// Long += is fine automatically unboxed and reboxed

		Boolean BT = Boolean.TRUE;

		BT = !BT;
		assert (BT == Boolean.FALSE);

		// not allowed K ~= K;
		k = ~K; // allowed
		assert (k == 9995);
		k = -K; // allowed

		System.out.println("Long boxing test OK");
		
	}

	private static void testStatic() {
		System.out.println("static test");
		// only works standalone
//		new Test_Static4();
//		long LY = Test_Static4.LY++;
//		new Test_Static4();
//		long ly = Test_Static4.ly++;
//		System.out.println("Test_Static.LY=" + Test_Static4.LY + " LY=" + LY);
//		assert(Test_Static4.LY == 2 &&  LY== 1);
//		System.out.println("Test_Static.ly=" + Test_Static4.ly + " ly=" + ly);
//		assert(Test_Static4.ly == 5 &&  LY== 1);
//		long ly1 = Test_Static4.ly++;
//		System.out.println("Test_Static.ly=" + Test_Static4.ly + " ly=" + ly + " ly1=" + ly1);
//		assert(Test_Static4.ly == 6 &&  LY== 1);
//		
		System.out.println("static test OK");

	}

	private static void testShift() {

		System.out.println("(long) bit-shift test");
		
		long j,k,l;
		j = 17;
		j >>>= 32;
		assert(j == 0);
		j = 17;
		j >>>= 2;
		assert(j == 4);
		j = -17;
		j >>>= 2;
		assert(j == 4611686018427387899L);
		
		// Three ranges of shift: 0-24, 25-48, and 49+
		
		j = -0x101010101010101L;
		l = j>>50;
		assert(l == -0x101010101010101L>>50);
		l = j>>40;
		assert(l == -0x101010101010101L>>40);
		l = j>>10;
		assert(l == -0x101010101010101L>>10);
		l = j>>>50;
		assert(l == -0x101010101010101L>>>50);
		l = j>>>40;
		assert(l == -0x101010101010101L>>>40);
		l = j>>>10;
		assert(l == -0x101010101010101L>>>10);

		l = j<<50;
		assert(l == -0x101010101010101L<<50);
		l = j<<40;
		assert(l == -0x101010101010101L<<40);
		l = j<<10;
		assert(l == -0x101010101010101L<<10);

		
		
		k = l = 20;
		k = k >> 3;
		l <<= 3;
		assert (k == 2);
		assert (l == 160);
		j = 0x800000000000L;
		k = l = -j;
		k = k >> 3;
		assert (k == -17592186044416L);
		l <<= 3;
		assert (l==-1125899906842624L);
		l <<= 3;
		assert (l==-9007199254740992L);
		l <<= 3;
		assert (l==-72057594037927936L);
		k = -j;
		k = k >>> 3;
		assert (k == 2305825417027649536L);
		k = j >> 3;
		assert (k == 0x100000000000L);
		l = j << 3;
		assert (l == 1125899906842624L);
		k = j >> 30L;
		assert (k == 131072);
		l = 1234556890 << 30L;
		assert (l == -2147483648);
		j = 0x100000000000000L;
		k = j >> 54L;
		assert (k == 4);
		l = j << 54L;
		assert (l == 0);
		j = 0x4512345678123456L;
		k = j >> 54L;
		assert (k ==276);
		j = -0x4512345678123456L;
		k = j >> 54L;
		assert (k ==-277);
		l = 1L<<62;
		l <<= 1;
		assert (l == -9223372036854775808L);
		l >>>= 1;
		assert (l == 4611686018427387904L);
		
		
		j = 0xFFFF0000FFFF00L;
		int i = 3;
		j &= ~(3L << i);
		assert(j == 72056494543077120L);
		j = j << i;
		assert(j == 576451956344616960L);
		j |= 1L << i;
		System.out.println(j);
		assert(j == 576451956344616968L);
		j = ~j;
		System.out.println(j);
		assert(j == -576451956344616969L);
		j = ~j;
		System.out.println(j);
		assert(j == 576451956344616968L);
		j = ~j;
		System.out.println(j);
		assert(j == -576451956344616969L);
		Long L = j;
		k = L << 4;
		assert(k == -9223231301513871504L);

		System.out.println("(long) bit-shift test OK");

	}

	private static void testCatchInvalid() {

		System.out.println("Long invalid Long.valueOf test");
		
		long l;
		// Can't do this in Java:
		try {
			l = Long.valueOf("0xFFFFF");
			assert (false);
		} catch (NumberFormatException e) {
		}

		try {
			l = Long.parseLong("0xFFFFF", 16);
			assert (false);
		} catch (NumberFormatException e) {
		}

		try {
			l = Long.parseLong("0xFFFFF");
			assert (false);
		} catch (NumberFormatException e) {
		}

		System.out.println("Long invalid Long.valueOf test OK");

	}

	private static void showLong(Long ll1, long l1, Long ll2, long l2) {
		System.out.println(ll1 + "=" + l1 + " and " + ll2 + "=" + l2);
	}

	Object in;

	
	  private void unread(byte[] bb, int len, int n) throws IOException {
		  int i = (int) (field+=3);
		  long l = (field++);
		  l = --field;
		  b++;
		  b--;
		  --b;
		  ++b;
		  b+=3;
		  b-=3;
		  
		  l = (++field);
			  ((PushbackInputStream) in).unread(bb, len - n, n);
			  ((ByteArrayInputStream) in).pos -= n;
	  }

	public Test_Long(int i) {
		this.ia += i;
	}

	public Test_Long() {
		// TODO Auto-generated constructor stub
	}

	static Long getLong(long l) {
		return Long.valueOf(l);
	}


}