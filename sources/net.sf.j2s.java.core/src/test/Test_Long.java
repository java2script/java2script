package test;

/**
 * demonstrates that
 * 
 * @author hansonr
 *
 */
public abstract class Test_Long extends Test_ {

	public static void main(String[] args) {

		long l;
		double d;
		
		
		d = Integer.MAX_VALUE;
		d += 1e13;
		l = (long) d;
		System.out.println(d + " " + l);
		assert(false);
		
		
		int ii = (int) Float.MAX_VALUE;
		assert (ii == Integer.MAX_VALUE);
		assert (Long.parseLong("1FFFFFFFFFFFFF", 16) == 0x1FFFFFFFFFFFFFL);
		d = 0x1FFFFFFFFFFFFFL;
		System.out.println((long) d);
		// note that long literals are NOT caught
		System.out.println(0x1FFFFFFFFFFFFFL);
		assert (((long) d) == /** @j2sNative 1 ? 0 : */
		0x1FFFFFFFFFFFFFL);

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

		// Eclipse compilation checker is incorrect!
		assert (((long) Double.NaN) == 0);
		assert (((int) Double.NaN) == 0);
		assert (((long) Float.NaN) == 0);
		assert (((int) Float.NaN) == 0);
		d = (long) 3.8;
		assert (d == 3);
		d = (long) -3.8;
		assert (d == -3);

		long m;
		for (double i = -20; i < 20; i++) {
			l = 0;
			m = (long) (l + i / 10);
			l += i / 10;
			System.out.println(l + " " + (i / 10) + " " + m);
			assert (l == m);
		}
		for (double i = -20; i < 20; i++) {
			l = 0;
			m = (long) (l - i / 10);
			l -= i / 10;
			System.out.println(l + " " + (-i / 10) + " " + m);
			assert (l == m);
		}
		l = 0;
		l += 9E13;
		System.out.println("9E13=" + l);

		assert (l == 9e13);
		System.out.println("Test_Long OK");
	}

}