package test;

import java.util.Date;
import java.text.SimpleDateFormat;

strictfp class Test_Date extends Test_{
	
	public static void main(String[] args) {

//		1741542116297
//		03/9/25
//		03-09-2025 17:41:56
//		0309251741
//		
//		1741542116297
//		03/9/25
//		03-09-2025 12:41:56
//		0309251241
		long t = 1741542116297L;
		Date d = new Date( "07/10/96 12:00 AM GMT");
		System.out.println(d);
		String s;

		s = new SimpleDateFormat("M/d/yy h:mm").format(d.getTime()).toString();
		System.out.println(s);

		System.out.println(d.getTime());
		
		s = new SimpleDateFormat("MM-dd-yy-hh-mm").format(d).toString();
		System.out.println(s);

		s = new SimpleDateFormat("MM-dd-yy-HH-mm").format(d).toString();
		System.out.println(s);

		s = new SimpleDateFormat("MM-dd-yy-kk-mm").format(d).toString();
		System.out.println(s);

		d = new Date( "07/10/96 7:00 AM");
		System.out.println(d);
		
		System.out.println(d.getTime());
		
		s = new SimpleDateFormat("M-d-yyyy-hh-mm").format(d).toString();
		System.out.println(s);

		s = new SimpleDateFormat("M-d-yy-HH-mm").format(d).toString();
		System.out.println(s);

		s = new SimpleDateFormat("MM-dd-yy-kk-mm").format(d).toString();
		System.out.println(s);

		
		d = new Date( "07/10/96 7:18 AM");
		System.out.println(d);
		
		
		s = new SimpleDateFormat("M/d/yy h:mm").format(d.getTime()).toString();
		System.out.println(s);
		s = new SimpleDateFormat("MM-dd-yyyy hh:mm:ss").format(d).toString();
		System.out.println(s);
		s = new SimpleDateFormat("MMddyyhhmm").format(d).toString();
		System.out.println(s);

	}

	
}