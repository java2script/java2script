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
		double d5 = 5;
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
		System.out.println("Test_Byte OK");

	}
	
}