package test;

import java.util.Properties;

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
		
		System.out.println(getCharacterFromChar1('c') == 'c');
		System.out.println(getCharacterFromChar2('c') == 'c');

		System.out.println(getCharFromCharacter1('c') == 'c');
		System.out.println(getCharFromCharacter2('c') == 'c');
				
		System.out.println(getIntFromInteger(99) == 'c');

		System.out.println(getIntegerFromInt(Integer.valueOf(99)) == 'c');
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