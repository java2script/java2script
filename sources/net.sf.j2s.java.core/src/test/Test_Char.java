package test;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Hashtable;

class Test_Char extends Test_ {

	int iA = 'A';
	char c = 'C';
	char ci = 65; 
	byte bAA = 'A'; 
	int iAB = 'A' + c;
	char uc = 0xACEA;
	
	static String s = "test";
	
    public static final char separatorChar = '/';

	public static void main(String[] args) {
		testCharToInt('A');
		assert('c' == new Character('c'));
		assert(new Character('c') == 'c');
		assert(Character.valueOf('c') == 'c');
		assert('c' == Character.valueOf('c'));
		assert(new Character('c') != Character.valueOf('c'));
		
		String octal = "\1 \02 \003 \0004 \00045";
		assert(octal.length() == 12);
		String octal1 = "\1\12\123\1234\12345";
		assert(octal1.length() == 8);
		System.out.println("octal to unicode OK");
		// OK, this next one is pretty twisted!
		int[] iii = new int[] {'s', Character.valueOf((char) (s.charAt(3) | 5)), 'u'};
		assert(iii[1] == 'u');
		Test_Char t = new Test_Char();
		char sep = separatorChar;
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
		
		// omega
		s = new String("\u03a9");
		c = s.charAt(0);
		System.out.println(s.length() + " ? " + Character.charCount(s.codePointAt(0)) + " " + Character.getName(c));
		assert(Character.getName(c).equals("GREEK CAPITAL LETTER OMEGA")); 
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
        
        
        // test enhanced for for switch of Character to char
        
        Character[] chars = new Character[] {Character.valueOf('a'), Character.valueOf('o'), Character.valueOf('k') };

        s = "";
        for (char c1 : chars) {
        	s += new Character(c1);
        }
        System.out.println(s);
        assert s.equals("aok"); // OK

        char[] chs = new char[] {'a', 'o', 'k' };

        s = "";
        for (Character c1 : chs) {
        	s += c1.charValue();
        }
        System.out.println(s);
        assert s.equals("aok"); // OK
      

        ic = 0;
        for (char c1 : chars) {
        	ic += c1;
        }
        System.out.println(ic); // OK
        assert ic == 315;      
        
        Hashtable<Character, String> ctos = new Hashtable<>(); 
        ctos.put('a', "aok");
        for (char c1 : ctos.keySet()) {
        	 String aok = ctos.get(c1); 
        	 System.out.println(aok);
        	 assert(aok == "aok");
        }
        
                

        // char to int
        int ctoi = 0;
        for (int c1 : chs) {
        	ctoi += c1;
        }
        System.out.println(ctoi); 
        assert ctoi == 315;      

               
        // Character to int
        int Ctoi = 0;
        for (int c1 : chars) {
        	Ctoi += c1;
        }
        System.out.println(Ctoi);
        assert Ctoi == 315;      
        
        
        testCharSet();
        

        System.out.println("Test_Char OK");
	}

	private static void testCharToInt(char d) {
		int[] a = new int[] {d};
		assert(a[0] == 65);
	}	

	private static void testCharSet() {
		
		String s;
		ByteBuffer b = ByteBuffer.allocate(16);
		CharBuffer fb = b.asCharBuffer();		  
        fb.put("abcdefgh");        
        assert(b.array()[5] == 'c');
        fb.position(0);
        char[] fa = new char[8];
        fb.get(fa, 0, 8);
        s = new String(fa);
		System.out.println("CharBuffer[]: " + s);
		assert(s.equals("abcdefgh"));

        try {
        	s = new String(b.array(), "utf-16");
            System.out.println("CharBuffer: " + s);
            assert(s.equals("abcdefgh"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			assert(false);
		}      
        
        String[] tests = new String[] {
        			"utf8","\u2195\u2194\u2091\u27a4","[-30, -122, -107, -30, -122, -108, -30, -126, -111, -30, -98, -92]",
        			"utf16", "\u2195\u2194\u2091\u27a4","[-2, -1, 33, -107, 33, -108, 32, -111, 39, -92]",
        			"us-ascii", "abcdefg","[97, 98, 99, 100, 101, 102, 103]",
        			"iso-8859-1", "abcdefg\u00A2\u00A3\u00A4\u00C5\u00D5", "[97, 98, 99, 100, 101, 102, 103, -94, -93, -92, -59, -43]",
        			"gb2312","\u6c49\u5b57\u5185\u7801\u6269\u5c55\u89c4\u8303", "[-70, -70, -41, -42, -60, -38, -62, -21, -64, -87, -43, -71, -71, -26, -73, -74]",
        			"gb18030",">\uFE10<\u6c49\u5b57\u5185\u7801\u6269\u5c55\u89c4\u8303", 
        				"[62, -124, 49, -126, 54, 60, -70, -70, -41, -42, -60, -38, -62, -21, -64, -87, -43, -71, -71, -26, -73, -74]",
        			"GBK", "\u6c49\u5b57\u5185\u7801\u6269\u5c55\u89c4\u8303 \u20AC", "[-70, -70, -41, -42, -60, -38, -62, -21, -64, -87, -43, -71, -71, -26, -73, -74, 32, -94, -29]"
        };
        for (int i = 0; i < tests.length;)
        	textCharSet(tests[i++], tests[i++], tests[i++]);
        // note that getBytes prepends UTF-16 code "-2, -1"
        // not so with UTF-8.

		
//		cb.position(0);
//		cb.put("OK");
//		System.out.println(b.remaining() + " " + cb.remaining() + " " + b.position() + " " + b.limit());
//		System.out.println(Arrays.toString(cb.array()));
		
		
	}

	private static void textCharSet(String name, String s0, String b0) {
		Charset cs = Charset.forName(name);
        byte[] sb = s0.getBytes(cs);        
        String s = new String(sb, cs);        
		System.out.println("testing encode/decode for " + name + " (" + cs.name() + ") using " + s0 + " =?= " + s);
		System.out.println(Arrays.toString(sb));
        assert(Arrays.toString(sb).equals(b0));
        assert(s.equals(s0));
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