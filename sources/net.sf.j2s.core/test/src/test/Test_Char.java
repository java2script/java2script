package test;

class Test_Char extends Test_ {

	int iA = 'A';
	char c = 'C';
	char ci = 65; 
	byte bAA = 'A'; 
	int iAB = 'A' + c; 
	String s = "test";
	
	public static void main(String[] args) {
		Test_Char t = new Test_Char();
		assert(t.iA == 65);
		assert(t.c == 'C');
		assert(t.ci == 'A');
		assert(t.bAA == 65);
		assert(t.iAB == 65 + 67);		
		Character k = new Character('K');
		assert(k == (char) 75);
		
		char c = 'C';
		int iA = 'A';
		byte bAA = 'A';
		int iAB = 'A' + c;
		
		test((char) 75);
		String s = new String("\ud800\udf84");
		c = (char) 0xdf84;
		int i = (int) c;
		c = (char) 0xd800df84;
		assert(i == 57220);
		System.out.println(s.length() + " ? " + Character.charCount(s.codePointAt(0)) + " " + Character.getName(c));
		
		assert(getIntFromChar1('c') == 99);
		assert(getIntFromChar2('c') == 99);
		
		assert(getCharacterFromChar1('c') == 'c');
		assert(getCharacterFromChar2('c') == 'c');

		assert(getCharFromCharacter1('c') == new Character('c'));
		assert(getCharFromCharacter2('c') == 'c');
		assert(getIntFromInteger(99) == 'c');
		assert(getIntegerFromInt(Integer.valueOf(99)) == 'c');
		

		char cc = 'c';
		
		assert(getCharacterFromChar1('c') == cc);
		assert(getCharacterFromChar2('c') == cc);

		assert(getCharFromCharacter1('c') == new Character(cc));
		assert(getCharFromCharacter2('c') == cc);
		assert(getIntFromInteger(99) == cc);
		assert(getIntegerFromInt(Integer.valueOf(99)) == cc);


		// testing for proper conversion to int from char in array and switch
		
		int[] ia = new int[300];
		ia[new Character('c')] = 3;
		switch (cc) {
		case 'c':
		case 'd':
		case 33:
		}

		// what about conditional expressions?
		
		int ic = (cc < 10 ? 'c' : 33);
		char ccc = (cc < 10 ? 'c' : 33);

		ic = (cc < 10 ? (int) 330 : (byte) 330);
		ic = (cc < 10 ? (byte) 330 : (int) 330);
		ic = (cc < 10 ? 33 : 'c');
		ccc = (cc < 10 ? 33 : new Character('c'));
		
//		var ic = (cc.$c() < 10  ? 'c' : String.fromCharCode(33)).$c();
//		var ccc = String.fromCharCode((cc.$c() < 10  ? 'c' : String.fromCharCode(33)).$c());
//		ic = >>=>>int-char(cc.$c() < 10  ? 33 : 'c'.$c()).$c();
//		ccc = >>=>>char-charString.fromCharCode((cc.$c() < 10  ? 33 : (Clazz.$new(Character.construct,[String.fromCharCode('c'.$c())])).charValue()).$c());

		cc = new Character('d');
		
		cc += new Character('\1');
		cc += 3 + 6 + new Character('\1');
        assert(cc == 'o');
        int ii = 3 + 6 + new Character('\1');
        assert(ii == 10);
		s = "testing" + 3;
		s = "testing" + 3 + cc + 5;
		s = "testing" + 3 + cc + 5f;
		s = "testing" + new Double(3);
		s = "testing" + new Double(3) + cc + 5;
		s = "";
		s = s + 3;
		s = s + 3.5;
		s = s + 3 + cc + 5;
		s = s + 3 + cc + 5f;
		s = s + new Double(3);
		s = s + new Double(3) + cc + 5;
		s += null;
		s += 3;
		s += 3f;
		s += 3 + cc + 5;
		s += 3 + cc + 5f;
		
		s += new Double(3);
		s += new Double(3) + cc++ + 5;
		s += new Double(3) + ++cc + 5;
		System.out.println(s = s + cc);
		int di = cc++ + 1;
		assert(s.equals("33.53o53o5.03.03.0o5null33.0119119.03.0119.0121.0q"));
		double d = 333.5;
        assert((int)d == 333);
        assert((int)-d == -333);
        assert((byte)d == 77);
        int b = 255;
        assert((byte) b == -1);
        b = 99;
        assert((char) b == 'c');

        System.out.println("Test_Char OK");
	}

	private static int getIntFromInteger(Integer i) {
		return i;
	}
		
	private static int getIntegerFromInt(int i) {
		return i;
	}
	
	private static int getIntFromChar1(char c) {
		return (int) c;
	}

	private static int getIntFromChar2(char c) {
		return c;
	}

	private static Character getCharacterFromChar1(char c) {
		return new Character(c);
	}
	
	private static Character getCharacterFromChar2(char c) {
		return c;
	}

	private static char getCharFromCharacter1(Character c) {
		return c.charValue();
	}

	private static char getCharFromCharacter2(Character c) {
		return c; 
	}

	private static void test(char c) {
		System.out.println("testing char " + c);
	}

}