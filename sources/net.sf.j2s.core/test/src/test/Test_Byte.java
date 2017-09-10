package test;

class Test_Byte {
	
	public static void main(String[] args) {
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
		b/=((byte)1000 / b / b) * 30;
		b /= 100;
		System.out.println("Test_Byte OK");

	}
	
}