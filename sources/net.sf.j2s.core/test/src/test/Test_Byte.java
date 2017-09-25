package test;

class Test_Byte extends Test_ {
	
	public static void main(String[] args) {
		
		double d = 3;
		int di = 'c';
		d /= 'c';
		di /= 'c';
		assert(d == 3.0/99);
		assert(di == 1);
		di = 100;
		assert(di / 7 / 3 == 4);

		byte[] ab = new byte[10];
		ab[1] += 120;
		ab[2] = 120;
		ab[3] = 120;
		ab[0] = (byte) ((ab[1] + ab[2] + ab[3])/3); // plus and div are not byte operators.
		assert(ab[0] == 120);
		
		
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
		assert (c == 'd');
		assert (b == -1);
		assert (h == -1);
		assert (i == -1);
		b = (byte) c;
		b = (byte) 2;
		int i2 = ((byte)4000 / b / b) * 30;
		b/=2;
		b /= 0.01;
		System.out.println("Test_Byte OK");

	}
	
}