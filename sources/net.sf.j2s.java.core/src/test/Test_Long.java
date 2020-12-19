package test;

/**
 * demonstrates that
 * 
 * @author hansonr
 *
 */
public abstract class Test_Long extends Test_ {

	static long field;
	static Long Field = Long.valueOf(0);

	static Long getLong(long l) {
		return Long.valueOf(l);
	}

	public static void main(String[] args) {

		long l;
		double d;
		Long L = Long.valueOf(10000);
		Long O, P, J, K;
		long j, k, m;
		showLong((O = ++L), 10001, L, 10001);
		showLong((J = L++), 10001, L, 10002);
		showLong((K = -L), -10002, L, 10002);
		k = ++(L);
		P = +L;
		k = -L; 
		j = L--;
		m = ++L;
		P += 3;
		field = ++Field;
		System.out.println(
				" L = " + L + " O = " + O + " J = " + J + " K = " + K + " k = " + k + " j = " + j + " m = " + m);
		j = ++k;
		k = j--;
		Character C = Character.valueOf('c');
		char ch = C++;
		assert (ch == 'c');
		ch = ++C;
		assert (ch == 'e' && C == 'e');

		long[] al = new long[] { O, J, K };
		Long[] AL = new Long[] { O, J, K };
		int i = 0;
		(al[i++])++;
		P = ((((AL[i++]))))++;
		System.out.println(O == Long.valueOf(10001));
		System.out.println(O.equals(Long.valueOf(10001)));
		System.out.println(O != Long.valueOf(10001));
		boolean b1 = false, b2 = false, b3 = false, b4;
		boolean tf = ((b1 = (K == -10002 && L == 10003 && O == 10001)) && (b2 = O.equals(Long.valueOf(10001)))
				&& (b3 = O != Long.valueOf(10001)));

		assert (tf);

		byte b = (byte) 255;
		byte c = b++;
		byte a = ++b;

		Byte B = Byte.valueOf((byte)100);
		byte[] ab = new byte[] { 1, 2, 3, 4 };
		byte[][] abc = new byte[][] { new byte[] {}, new byte[] {1, 2, 3, 4} };
		Byte[][] ABC = new Byte[][] { new Byte[] {}, new Byte[] {1, 2, 3, 4} };
		Byte[] AB = new Byte[] { 1, 2, 3, 4 };
		i = 0;
		++ab[i++];
		ab[i++]++;
		++AB[i++];
		AB[i++]++;
		
		i = 0;
		j = 1;
		abc[++i][(int) ++j] |= 0xFFFF;
		i = 0;
		j = 1;
		
		assert(abc[1][2] == -1);
		
		
		P = K;
		assert (P == K);
		
		P = +K;
		
		assert( P != K);
		
		// Long += is fine automatically unboxed and reboxed

		K++;// = B ^ (byte) 3;
		K += (byte) 5;
		L += 5;
		k += 5;
		
		assert (L == 10008);

		Boolean BT = Boolean.TRUE;
		
		BT = !BT;
		assert (BT == Boolean.FALSE);
		
		// not allowed K ~= K; 
		k = ~K; // allowed
		assert(k == 9997);
		k = -K; // allowed
		
		Integer I = Integer.valueOf(33);
		i  = I / 5;
		I /= 5;
		i = i / 5;
		
		i /= 5;
		
		L = Long.valueOf(20000);
		L /= 10;
		assert (L == 2000);
		L /= 3;
		k = L/3;
		k = 3 / L;
		k = L / L;
		L = L / L;
		k = 2000;
		L = Long.valueOf(k/3);
		assert (L == 666);		
		L = L / 67;
		assert (L == 9);		
		Short H = Short.valueOf((short) 14);
		H = (short) (H / 3);
		
		
		d = Integer.MAX_VALUE;
		d += 1e13;
		l = (long) +d;
		System.out.println(d + " " + l);
		assert(d == l);


		int ii = (int) Float.MAX_VALUE;
		assert (ii == Integer.MAX_VALUE);
		

		// TODO		
//		long bl = 0x7FFFFFFFFFFFFFFFL;
//		System.out.println(bl + " " + (bl + 1));
//		assert (bl + 1 < 0);

		System.out.println("JavaScript largest safe number " + Long.parseLong("1FFFFFFFFFFFFF", 16) + " " + 0x1FFFFFFFFFFFFFL);
		assert (Long.parseLong("1FFFFFFFFFFFFF", 16) == 0x1FFFFFFFFFFFFFL);
		d = 0x1FFFFFFFFFFFFFL;
		System.out.println((long) d);
		assert (((long) d) == /** @j2sNative 1 ? 0 : */
		0x1FFFFFFFFFFFFFL);

		k = 0x7FFFFFFFFFFFFFFFL;
		L = 0x7FFFFFFFFFFFFFFFL;
		L += 0x7FFFFFFFFFFFFFFFL;
		// note that long literals are NOT caught
		System.out.println("Largest Java Number is 9223372036854775807: " + L);

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
		System.out.println("Test_Long OK");
	}

	private static void showLong(Long ll1, long l1, Long ll2, long l2) {
		System.out.println(ll1 + "=" + l1 + " and " + ll2 + "=" + l2);
	}

}