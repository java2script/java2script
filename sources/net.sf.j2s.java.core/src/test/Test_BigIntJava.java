package test;

import test.math.BigDecimal;
import test.math.BigInteger;


public class Test_BigIntJava extends Test_ {

	public static void main(String[] args) {

		BigInteger x = new BigInteger("100000000");
		BigInteger y = new BigInteger("101000000");
		BigInteger z = x.multiply(y);
		System.out.println(z);
		if (true) return;
		

		System.out.println(3 + 0x80000000 < 0);
		
//		dumpRadixTable64();
//		dumpRadixTable48();
//		dumpRadixTable32();
//		dumpRadixTable24();
//		if (true) return;

		
		BigInteger b = BigInteger.valueOf(25);
		BigInteger c = new BigInteger("12345678901234567");//BigInteger.valueOf(2000);
		System.out.println(c);
		BigInteger d = b.add(c);
//		System.out.println(d);
//		System.out.println(d.toString(2));
		d = d.multiply(c);
		System.out.println(d.toString(2));
		if (true) return;
//		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d.toString(2));
//		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d.toString(2));

		
		System.out.println(3 + 0x80000000 < 0);
//		dumpRadixTable48();

		// multiply
		
		BigInteger m;
		// SwingJS integerizes long values, so we have to build them from ints:
		//		m = BigInteger.valueOf((long) Math.pow(2, 40)); 
		m = BigInteger.valueOf((long) Math.pow(2, 20) * (long) Math.pow(2, 20)); 
		System.out.println(m);		


		System.out.println("A x B");
				
		m = new BigInteger("11");
		m = m.multiply(m);
		System.out.println(m);
		m = m.multiply(m);
		System.out.println(m);
		m = m.multiply(m);
		System.out.println(m);
		m = m.multiply(m);
		System.out.println(m);
		m = m.multiply(m);
		System.out.println(m);
		

		// and, or, andNot, negate, abs 
		
		System.out.println("A & B");
		m = BigInteger.valueOf((long) Math.pow(2, 45)); 
		System.out.println(m);		
		b = BigInteger.valueOf((long)Math.pow(2, 15));
		System.out.println(b);		
		m = BigInteger.valueOf((long) Math.pow(2, 24)); 
		System.out.println(m);		
		m = BigInteger.valueOf((long) Math.pow(2, 26)); 
		System.out.println(m);		
		m = BigInteger.valueOf((long) Math.pow(2, 28)); 
		System.out.println(m);		
		m = BigInteger.valueOf((long) Math.pow(2, 45)); 
		System.out.println(m);		
		m = BigInteger.valueOf((long) Math.pow(2, 46)); 
		System.out.println(m);		
		m = BigInteger.valueOf((long) Math.pow(2, 47)); 
		System.out.println(m);		
		m = BigInteger.valueOf((long) Math.pow(2, 48)); 
		System.out.println(m);		
		m = BigInteger.valueOf(0x567890123456L); // 
		BigInteger m1 = m.and(b);
		System.out.println(m1);		
		m1 = m.or(b);
		System.out.println(m1);		
		m1 = m.andNot(b);
		System.out.println(m1);		
		m1 = m.negate();
		System.out.println(m1);		
		m1 = m.negate().abs();
		System.out.println(m1);		
		m = m.setBit(133);
		System.out.println(m);
		m = m.clearBit(133);
		System.out.println(m);		
//		if (true)return;
		
		
		test("192000000000000000000");
		BigInteger b1;
		test( "96000000000000000000");
		b1 = new BigInteger("96000000000000000000");
		System.out.println(b1.toString(10));
		System.out.println(b1.toString(16));
		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(2));
		System.out.println(b1.toString(10));
		System.out.println(b1.toString(16));
		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(2));
		System.out.println(b1.toString(10));
		System.out.println(b1.toString(16));
		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(2));
		System.out.println(b1.toString(10));
		System.out.println(b1.toString(16));
		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(2));
		System.out.println(b1.toString(10));
		System.out.println(b1.toString(16));
		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(5));
		System.out.println(b1.toString(10));
		System.out.println(b1.toString(16));
		System.out.println(b1.toString(2));
		assert b1.toString(10).equals("7680000000000000000000");
		b = BigInteger.valueOf(25);
		b1 = b1.multiply(b);
		System.out.println(b1.toString(10));
		System.out.println(b1.toString(16));
		System.out.println(b1.toString(2));

		d = d.multiply(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		assert(d.toString().equals("1"));
		
//		BigDecimal e = new BigDecimal(20000);
//		BigDecimal f = new BigDecimal(45000);
//		BigDecimal g = f.divide(e);
//		System.out.println(g);
//		System.out.println(g);
		
		
		
		// OK through 48000000000000
//		d = d.multiply(c);
//		System.out.println(d);
//		d = d.multiply(c);
//		System.out.println(d);
		System.out.println("Test_BigInt OK");
	}

	private static void test(String s) {
//		dumpBytes(BigInteger.valueOf(3));
//		dumpBytes(3);
//		dumpBytes(BigInteger.valueOf(30));
//		dumpBytes(30);
//		dumpBytes(BigInteger.valueOf(300));
//		dumpBytes(300);
//		dumpBytes(BigInteger.valueOf(3000));
//		dumpBytes(3000);
//		dumpBytes(BigInteger.valueOf(30000));
//		dumpBytes(30000);
//		dumpBytes(BigInteger.valueOf(300000));
//		dumpBytes(300000);
		System.out.println(s);
		BigInteger b = new BigInteger(s);
		System.out.println("bigint b = ");
		dumpBytes(b);
		System.out.println(b);
		System.out.println(b.toString(16));
		System.out.println("///");
	}
	
	private static void dumpRadixTable64() {
		long max = 0x7FFFFFFFFFFFFFFFL;
		for (int n = 2; n <= 36; n++) {
			int pow = 0;
			long v, val = 0;
			for (int p = 0; (v = (long) Math.pow(n, p)) < max && v > 0; p++) {
				pow = p;
				val = v;
			}
			System.out.println("// " + n + "\t" + pow + "\t" + Long.toHexString(val));
		}
	}

	private static void dumpRadixTable24() {
		int max = 0xFFFFFF;
		String s1 = "";
		String s2 = "";
		for (int n = 2; n <= 36; n++) {
			int pow = 0;
			long v, val = 0;
			for (int p = 0; (v = (int) Math.pow(n, p)) <= max; p++) {
				pow = p;
				val = v;
			}
			System.out.println("// " + n + "\t" + pow + "\t" + Long.toHexString(val));
			s1 += "/* " + n + " */ " + pow + ", ";
			s2 += "/* " + n + " */ 0x" + Long.toHexString(val) + ", \n";		
		}
		System.out.println(s1);
		System.out.println(s2);
	}

	private static void dumpRadixTable32() {
		long max = 0x7FFFFFFFL;
		String s1 = "";
		String s2 = "";
		for (int n = 2; n <= 36; n++) {
			int pow = 0;
			long v, val = 0;
			for (int p = 0; (v = (long) Math.pow(n, p)) <= max && v > 0; p++) {
				pow = p;
				val = v;
			}
			System.out.println("// " + n + "\t" + pow + "\t" + Long.toHexString(val));
			s1 += "/* " + n + " */ " + pow + ", ";
			s2 += "/* " + n + " */ 0x" + Long.toHexString(val) + ", \n";		
		}
		System.out.println(s1);
		System.out.println(s2);
	}

	private static void dumpRadixTable48() {
		long max = 0xFFFFFFFFFFFFL;
		String s1 = "";
		String s2 = "";
		for (int n = 2; n <= 36; n++) {
			int pow = 0;
			long v, val = 0;
			for (int p = 0; (v = (long) Math.pow(n, p)) <= max && v > 0; p++) {
				pow = p;
				val = v;
			}
			System.out.println("// " + n + "\t" + pow + "\t" + Long.toHexString(val));
			s1 += "/* " + n + " */ " + pow + ", ";
			s2 += "/* " + n + " */ valueOf(0x" + Long.toHexString(val / (1L<<32)) + ",0x" + Long.toHexString(val % (1L<<32)) + "), \n";		
		}
		System.out.println(s1);
		System.out.println(s2);
	}

	private static void dumpBytes(BigInteger b) {
		byte[] bb = b.toByteArray();
		System.out.println(b + " " + b.bitCount() + "  "+ b.bitLength());
		for (int i = 0, j = 0; i < bb.length; i++, j += 8) {
			int bi = bb[i];
			if (bi < 0)
				bi = 256 + bi;
			String s = "00000000" + Integer.toBinaryString(bi);
			System.out.print(s.substring(s.length() - 8) + (j == 24 ? "\n" : " "));
		}
		System.out.println("\n");

		// TODO Auto-generated method stub
		
	}

	private static void dumpBytes(long l) {
		String s = "0000000000000000000000000000000000000000000000000000000000000000000000" + Long.toBinaryString(l);
		s = s.substring(s.length() - 64);
		for (int j = 0; j < 64; j += 8)
			System.out.print(s.substring(j, j+8) + (j == 24 ? "\n" : " "));
		System.out.println("\n");
	}
}

