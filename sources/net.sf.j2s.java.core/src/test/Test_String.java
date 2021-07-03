package test;

import java.io.UnsupportedEncodingException;
import java.nio.CharBuffer;

import javajs.util.SB;

public class Test_String extends Test_ {

	public static void main(String[] args) {

		System.out.println("abcde".indexOf(99));
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

		CharBuffer cb = CharBuffer.allocate(10);
		cb.mark();
		cb.put('a');
		cb.put('b');
		cb.put('c');

		String sb = new String(new byte[] { 97, 98, 99 });
		System.out.println(sb);
		assert (sb.equals("abc"));

		StringBuffer sbb;
		sbb = new StringBuffer("testing");
		sbb.insert(0, cb);

		System.out.println(sbb);
		System.out.println(">" + cb.toString() + "<");
		cb.reset();
		System.out.println(">" + cb.toString() + "<");
		sbb = new StringBuffer("testing");
		sbb.insert(0, cb);

		System.out.println(sbb);

		sb = "ab\u2520c";
		try {
			byte[] b = sb.getBytes("UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
		String s = "";
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < n; j++)
				s += i;
		}
		System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t s+= len=" + s.length());

		t0 = System.currentTimeMillis();
		StringBuffer Sb = new StringBuffer();
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < 100; j++)
				Sb.append(i);
		}
		s = Sb.toString();
		System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t one StringBuffer len=" + s.length());

		t0 = System.currentTimeMillis();
		StringBuilder S = new StringBuilder();
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < 100; j++)
				S.append(i);
		}
		s = S.toString();
		System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t one StringBuilder len=" + s.length());

		t0 = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			StringBuilder SB = new StringBuilder();
			for (int j = 0; j < 100; j++) {
				SB.append(i);
			}
			s = SB.toString();
		}
		System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t many StringBuilder len=" + s.length());


		t0 = System.currentTimeMillis();
		SB b = new SB();
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < 100; j++)
				b.appendI(i);
		}
		s = b.toString();
		System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t javajs.util.SB len=" + s.length());

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