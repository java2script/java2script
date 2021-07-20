package test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;

import sun.util.calendar.AbstractCalendar;
import sun.util.calendar.Gregorian;

public class Test_Calendar extends Test_ {


	public static void main(String[] args) {
		// default Date string:
		// Java will use the locale and current time zone, ending in year
		//		Sun Mar 10 16:05:00 CST 1996
		//		Tue Jul 20 08:28:53 CDT 2021
		// SwingJS will always return GMT-xxxx dates, with year before the time
		//		Sun Mar 10 1996 17:05:00 GMT-0600
		//		Tue Jul 20 2021 08:38:48 GMT-0500
		try {
			Date d;
			TimeZone tz = TimeZone.getDefault();
			Calendar c = Calendar.getInstance(tz);
			c.setTime(new Date("1/1/2021"));
			assert(c.get(Calendar.DST_OFFSET) == 0);
			c.setTime(new Date("7/7/2021"));
			assert(c.get(Calendar.DST_OFFSET) == 3600000);
			
			// check that 2:00 to 3:00 AM on Mar 14, 2021 are the same time
			// "CDT" and "EST" are ignored here because 
			// the default format is just MM/dd/yyyy hh:mm a
			Date d2 = new SimpleDateFormat().parse("03/14/2021 3:00 AM CDT");
			System.out.println(d2);
			d = new SimpleDateFormat().parse("03/14/2021 2:00 AM EST");
			System.out.println(d);
			assert((
					d2.getTime() - d.getTime())/1000 == 0);
			d = new SimpleDateFormat().parse("03/10/96 4:05 PM CDT");
			System.out.println(d);
			d = new SimpleDateFormat("yyyyMMdd").parse("20210721");			
			System.out.println(d);
			d = new SimpleDateFormat("yyyyMMdd hh:mm z")
					.parse("202110721 4:10 PDT");			
			System.out.println(d);
			d = new SimpleDateFormat("hh:mm a MM/dd/yy")
					.parse("3:30 pm 7/10/04");			
			System.out.println(d);
			System.out.println(new Date());
		} catch (ParseException e) {
			e.printStackTrace();
			assert(false);
		}
		System.out.println("Test_Calendar OK");
	}

}