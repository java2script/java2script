package test;

import java.io.UnsupportedEncodingException;
import java.nio.CharBuffer;

import javajs.util.Rdr;
import javajs.util.SB;

public class Test_String extends Test_ {

	public static void main(String[] args) {
		String s, sb;
		byte[] b;

		sb = new String(new byte[] { 97, 98, 99 });
		System.out.println(sb);
		assert (sb.equals("abc"));

		
		try {
			// Java will not ignore the BOM in the String constructor.	
			// It will return 0xFEFF
			b = new byte[] {(byte) 0xEF,(byte) 0xBB,(byte) 0xBF, 'A', 'B', 'C' };
			sb = new String(b, "UTF-8"); // extra char
			System.out.println((int)sb.charAt(0));
			assert((int) sb.charAt(0) == 65279);
			b = sb.getBytes("UTF-16BE");
			s = "" + b[0] + b[1] +b[2];
			System.out.println(s);
			assert(s.equals("-2-10"));
			sb = sb.substring(1);
			System.out.println(sb);
			assert(sb.equals("ABC"));

			sb = new String(new byte[] { 97, 98, 99 }, 1, 2);
			System.out.println(sb);
			assert (sb.equals("bc"));

			sb = "ab\u2520c";
			System.out.println(sb);

			b = sb.getBytes("UTF-8"); // no BOM
			s = "" + b[2] + b[3] + b[4];
			System.out.println(s);
			assert(s.equals("-30-108-96"));
			s = new String(b, "UTF-8");
			System.out.println(s);
			assert(s.equals(sb));
			
			b = sb.getBytes("UTF-16BE"); // no BOM
			s = "" + b[2] + b[3] + b[4];
			System.out.println(s);
			assert(s.equals("09837"));
			s = new String(b, "UTF-16BE");
			System.out.println(s);
			assert(s.equals(sb));

			b = sb.getBytes("UTF-16"); // includes BOM -2, -1
			s = "" + b[2] + b[3] + b[4];
			System.out.println(s);
			assert(s.equals("0970"));
			s = new String(b, "UTF-16");
			System.out.println(s);
			assert(s.equals(sb));
			System.out.println(">" + Rdr.fixUTF(b) + "<");
			
			b = sb.getBytes("UTF-16LE"); // no BOM
			s = "" + b[2] + b[3] + b[4];
			System.out.println(s);
			assert(s.equals("98032"));
			s = new String(b, "UTF-16LE");
			System.out.println(s);
			assert(s.equals(sb));
			
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		

		
		assert("abcde".indexOf(99) == 2);
		assert ("test".contentEquals(new StringBuffer("test")));
		int ii = "test\2ing".charAt(4);
		switch (ii | 'd') {
		case 'f':
			assert (true);
			break;
		case '3':
		case 3:
		default:
			assert (false);
		}

		CharBuffer cb = CharBuffer.allocate(4);
		cb.mark();
		cb.put('a');
		cb.put('b');
		cb.put('c');
		cb.reset();
		StringBuffer sbb;
		sbb = new StringBuffer("testing");
		sbb.insert(0, cb);
		System.out.println(sbb);
		assert(sbb.toString().equals("abc\0testing"));
		System.out.println(">" + cb.toString() + "<");
		cb.position(2);
		System.out.println(">" + cb.toString() + "<");
		assert(cb.toString().equals("c\0"));
		sbb = new StringBuffer("testing");
		sbb.insert(3, cb, 0, 1);
		System.out.println(sbb);
		assert(sbb.toString().equals("tescting"));
		sb = "ab\u2520c";
		System.out.println(sb);

		assert ("test".compareToIgnoreCase("Test") == 0);
		assert ("test".compareToIgnoreCase("Testing") < 0);
		assert ("test".compareToIgnoreCase("Sest") > 0);
		assert (String.CASE_INSENSITIVE_ORDER.compare("test", "Sest") > 0);

		assert ("test".length() == 4);
		CharSequence cs = "test";
		assert (cs.length() == 4);
		assert (String.valueOf(true).equals("true"));
		assert (String.valueOf(1).equals("1"));
		assert (String.valueOf(1.5).equals("1.5"));
		assert (String.valueOf(1.5f).equals("1.5"));
		assert (new Test_String().toString().equals("testing test.Test_String"));

		
//		/** @j2sNative
//		 * 
//		 * Clazz.startProfiling(10);
//		 * 
//		 */
//		
		long t0;
		int n = (/**@j2sNative 1 ? 100 : */10);
		t0 = System.currentTimeMillis();
		s = "";
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < n; j++)
				s += i;
		}
		System.out.println("\nms " + (System.currentTimeMillis() - t0) + "\t s+= len=" + s.length());
		System.out.println("java : ms 14825	 s+= len=388900");
		
		t0 = System.currentTimeMillis();
		StringBuffer Sb = new StringBuffer();
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < 100; j++)
				Sb.append(i);
		}
		s = Sb.toString();
		System.out.println("\nms " + (System.currentTimeMillis() - t0) + "\t one StringBuffer len=" + s.length());
		System.out.println("java : ms 91	 one StringBuffer len=3889000");

		t0 = System.currentTimeMillis();
		StringBuilder S = new StringBuilder();
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < 100; j++)
				S.append(i);
		}
		s = S.toString();
		System.out.println("\nms " + (System.currentTimeMillis() - t0) + "\t one StringBuilder len=" + s.length());
		System.out.println("java : ms 76	 one StringBuilder len=3889000");

		t0 = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			StringBuilder SB = new StringBuilder();
			for (int j = 0; j < 100; j++) {
				SB.append(i);
			}
			s = SB.toString();
		}
		System.out.println("\nms " + (System.currentTimeMillis() - t0) + "\t many StringBuilder len=" + s.length());
		System.out.println("java : ms 76	 many StringBuilder len=400");

		t0 = System.currentTimeMillis();
		SB buf = new SB();
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < 100; j++)
				buf.appendI(i);
		}
		s = buf.toString();
		System.out.println("\nms " + (System.currentTimeMillis() - t0) + "\t javajs.util.SB len=" + s.length());
		System.out.println("java : ms 85	 javajs.util.SB len=3889000");

//Output prior to optimization of AbstractStringBuilder:
//
//
// Java 
//
//				ms 2562*	 s+= len=100000
//				ms 51	 one StringBuffer len=3889000
//				ms 31	 one StringBuilder len=3889000
//				ms 31	 many StringBuilder len=400
//				ms 47	 javajs.util.SB len=3889000
//
// * n is only 10 for s+=, and only "0" is added, not i
//
// JavaScript (Firefox, developer console open):
//
//				ms 72*     s+= len=1000000	
//				ms 10945     one StringBuffer len=3889000
//				ms 11394     one StringBuilder len=3889000
//				ms 9096     many StringBuilder len=400
//				ms 230     javajs.util.SB len=3889000
//
//
// JavaScript (Firefox, developer console closed):
//
//				ms 47     s+= len=3889000	
//				ms 3069     one StringBuffer len=3889000
//				ms 3711     one StringBuilder len=3889000
//				ms 2532     many StringBuilder len=400
//				ms 120     javajs.util.SB len=3889000// JavaScript (Chrome, developer console open):
//
// JavaScript (Chrome, developer console open):
//
//				ms 110*     s+= len=1000000	
//				ms 1196     one StringBuffer len=3889000
//				ms 1059     one StringBuilder len=3889000
//				ms 1086     many StringBuilder len=400
//				ms 134     javajs.util.SB len=3889000
//
// JavaScript (Chrome, developer console closed):
//
//				ms 124     s+= len=3889000
//				ms 945     one StringBuffer len=3889000
//				ms 972     one StringBuilder len=3889000
//				ms 953     many StringBuilder len=400
//				ms 145     javajs.util.SB len=3889000		
//
// After optimization of AbstractStringBuilder, StringBuilder, and StringBuffer:
//
// JavaScript (Chrome, developer console closed):
//
//				ms 123     s+= len=3889000	
//				ms 267     one StringBuffer len=3889000
//				ms 188     one StringBuilder len=3889000
//				ms 116     many StringBuilder len=400
//				ms 139     javajs.util.SB len=3889000		
//		
// JavaScript (Firefox, developer console closed):
//
//				ms 47     s+= len=3889000	
//				ms 109     one StringBuffer len=3889000
//				ms 123     one StringBuilder len=3889000
//				ms 165     many StringBuilder len=400
//				ms 45     javajs.util.SB len=3889000
		
		
		boolean \u79d8 = true; // Mandarin "secret" 秘

		System.out.println(秘);
		
		


		System.out.println("Test_String OK");
	}

}