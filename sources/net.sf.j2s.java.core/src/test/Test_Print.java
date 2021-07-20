package test;

import java.io.PrintWriter;
import java.io.StringWriter;

public class Test_Print {
	
	public static void main(String[] args) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		pw.println("testing 1");
		pw.println("testing 2");
		pw.println("testing 3");
		pw.format("%4$2s %3$2s %2$2s %1$2s\n", "a", "b", "c", "d"); // ->
																																// " d  c  b  a"
		pw.format("e = %+10.4f\n", Math.E); // -> "e =    +2.7183"
		pw.format("$%(,.2f\n", -6217.581); // -> "$(6,217.58)"
		pw.close();
		String s = sw.toString();
		System.out.println(s);
		assert(s.equals("testing 1\ntesting 2\ntesting 3\n d  c  b  a\ne =    +2.7183\n$(6,217.58)\n"));

		// also with a PrintStream
		
//		try {
//			File file = new File("test.txt");
//			System.out.println(file.getAbsolutePath());
//			PrintStream ps = new PrintStream(new FileOutputStream(file));
//			ps.println(file.getAbsolutePath());
//			ps.format("%4$2s %3$2s %2$2s %1$2s\n", "a", "b", "c", "d"); // -> " d  c  b  a"
//			ps.format("e = %+10.4f\n", Math.E); // -> "e =    +2.7183"
//			ps.format("$%(,.2f\n", -6217.581); // -> "$(6,217.58)"
//			ps.close();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		System.out.println("Test_Print OK");

	}

} 