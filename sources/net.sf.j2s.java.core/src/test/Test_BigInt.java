package test;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.GregorianCalendar;

import org.apache.xerces.jaxp.datatype.XMLGregorianCalendarImpl;


public class Test_BigInt extends Test_ {

	public static void main(String[] args) {

		BigDecimal e = new BigDecimal("200.05");
		System.out.println(e);
		BigDecimal f = new BigDecimal(45000);
		System.out.println(f);
		BigDecimal g = f.multiply(e);
		System.out.println(g);
		assert(g.toString().equals("9002250.00"));
		assert(f.compareTo(new BigDecimal(45000)) == 0);

		f = f.movePointLeft(3);
		System.out.println(f);
		assert(f.compareTo(new BigDecimal(45000)) == -1);
		f = new BigDecimal(45000000L);
		System.out.println(f);
		f = f.movePointLeft(6);
		System.out.println(f);
		assert(f.compareTo(new BigDecimal("4500.00")) == -1);
		assert(f.compareTo(new BigDecimal("0.00450000")) == 1);
		if (true)
			return;
		// failing: 

		g = new BigDecimal(200.05);
		
		long time = 1538673122263L;//System.currentTimeMillis();
		g = BigDecimal.valueOf(time, 3);
		System.out.println(time + " " + g);
		assert (g.toString().equals("1538673122.263"));

		
//		
//		XMLGregorianCalendarImpl cc = new XMLGregorianCalendarImpl(new GregorianCalendar());
//		
//		System.out.println(cc.toXMLFormat());
		
		BigInteger x = new BigInteger("100000000");
		BigInteger y = new BigInteger("101000000");
		BigInteger z = x.multiply(y);
		System.out.println(z);
		
		BigInteger b = BigInteger.valueOf(25);
		BigInteger c = new BigInteger("12345678901234567");//BigInteger.valueOf(2000);
		System.out.println(c);
		BigInteger d = b.add(c);
		System.out.println(d);
		System.out.println(d.toString(2));
		d = d.multiply(c);
		System.out.println(d.toString(2));
		d = d.multiply(c);
		System.out.println(d);
		System.out.println(d.toString(2));
		d = d.multiply(c);
		System.out.println(d.toString(2));

		
		test("192000000000000000000");
		BigInteger b1;
		test( "96000000000000000000");
		b1 = new BigInteger("96000000000000000000");
		System.out.println(b1.toString(10));
//		System.out.println(b1.toString(16));
//		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(2));
		System.out.println(b1.toString(10));
//		System.out.println(b1.toString(16));
//		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(2));
		System.out.println(b1.toString(10));
//		System.out.println(b1.toString(16));
//		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(2));
		System.out.println(b1.toString(10));
//		System.out.println(b1.toString(16));
//		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(2));
		System.out.println(b1.toString(10));
//		System.out.println(b1.toString(16));
//		System.out.println(b1.toString(2));
		b1 = b1.multiply(BigInteger.valueOf(5));
		System.out.println(b1.toString(10));
//		System.out.println(b1.toString(16));
//		System.out.println(b1.toString(2));
		assert b1.toString(10).equals("7680000000000000000000");
		b = BigInteger.valueOf(25);
		b1 = b1.multiply(b);
		System.out.println(b1.toString(10));
//		System.out.println(b1.toString(16));
//		System.out.println(b1.toString(2));

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
		assert (d.toString().equals("539659488879945019969144096149744253082822996305278833191693886734593196177571980115737100546042293708933808976540048777354725216"));
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
		
//		g = f.divide(e);
//		System.out.println(g);
//		assert(g.toString().equals("2.5"));
		
//		System.out.println("Test_BigInt still testing");
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
	
	private static void dumpRadixTable() {
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

