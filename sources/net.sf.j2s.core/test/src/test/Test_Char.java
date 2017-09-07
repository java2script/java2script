package test;

class Test_Char {

	public static void main(String[] args) {
		System.out.println("'K'=" + (char) 75 + " Character('K')=" + new Character('K'));
		test((char) 75);
		String s = new String("\ud800\udf84");
		char c = (char) 0xdf84;
		int i = (int) c;
		c = (char) 0xd800df84;
		System.out.println(i == 57220);
		System.out.println(s.length() + " " + Character.charCount(s.codePointAt(0)) + " " + Character.getName(c));
		
		System.out.println(getIntFromChar1('c') == 99);
		System.out.println(getIntFromChar2('c') == 99);
//		System.out.println$Z(test.Test_Char.getIntFromChar1$C('c') == 99);
//		System.out.println$Z(test.Test_Char.getIntFromChar2$C('c') == 99);
		
		System.out.println(getCharacterFromChar1('c') == 'c');
		System.out.println(getCharacterFromChar2('c') == 'c');
//		System.out.println$Z(((test.Test_Char.getCharacterFromChar1$C('c'))).charValue () === 99);
//		System.out.println$Z(((test.Test_Char.getCharacterFromChar2$C('c'))).charValue () === 99);

		System.out.println(getCharFromCharacter1('c') == new Character('c'));
		System.out.println(getCharFromCharacter2('c') == 'c');
//		System.out.println$Z((test.Test_Char.getCharFromCharacter1$Character(99)).charCodeAt (0) == ((Clazz.$new(Character.construct,['c']))).charValue ());
//		System.out.println$Z(test.Test_Char.getCharFromCharacter2$Character(99) == 'c');
				
		System.out.println(getIntFromInteger(99) == 'c');
//		System.out.println$Z(test.Test_Char.getIntFromInteger$Integer(new Integer ((99))) == 99);
		System.out.println(getIntegerFromInt(Integer.valueOf(99)) == 'c');
//		System.out.println$Z(test.Test_Char.getIntegerFromInt$I(((Integer.$valueOf(99))).intValue ()) == 99);
		
		System.out.println(new Double(3) > new Double(1));
		System.out.println(new Double(3) <= new Float(5));
//		System.out.println$Z((( new Double(3))).doubleValue () > (( new Double(1))).doubleValue ());
//		System.out.println$Z((( new Double(3))).doubleValue () <= (( new Float(5))).floatValue ());

		char cc = 'c';
		cc = new Character('d');
		cc += new Character('\1');
		cc += 3 + 6 + new Character('\1');
        System.out.println(cc == 'o');
        int ii = 3 + 6 + new Character('\1');
        System.out.println(ii == 10);
		double d = 3;
		int di = 'c';
		d /= 'c';
		di /= 'c';
		System.out.println(d == 3.0/99);
		System.out.println(di == 1);
		di = 100;
		System.out.println(di / 7 / 3 == 4);
		
		// TODO check for String + Double/Float --> String + ... .toString()
		// and change to String + double/float --> String + new
		// Double/Float(...).toString()

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
		s += new Double(3) + cc + 5;
		System.out.println(s);
		System.out.println(s.equals("33.53o53o5.03.03.0o5null33.0119119.03.0119.0"));

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