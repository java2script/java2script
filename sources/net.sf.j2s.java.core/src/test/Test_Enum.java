package test;

import java.util.EnumSet;
import java.util.Iterator;

import javax.swing.LayoutStyle.ComponentPlacement;

@SuppressWarnings("unused")
public class Test_Enum extends Test_{

	public enum Day {
		SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY 
	}

	public enum Dates {
		D1,D2,D3,D4,D5,D6,D7,D8,D9,D10,
		D11,D12,D13,D14,D15,D16,D17,D18,D19,D20,
		D21,D22,D23,D24,D25,D26,D27,D28,D29,D30,
		D31,D32,D33,D34,D35,D36,D37,D38,D39,D40
	}

	Day day;

	public Test_Enum(Day day) {
		this.day = day;
	}

	public String tellItLikeItIs() {
		String s;
		switch (day) {
		case MONDAY:
			s = "Mondays are bad.";
			break;
		case FRIDAY:
			s = "Fridays are better.";
			break;
		case SATURDAY:
		case SUNDAY:
			s = "Weekends are best.";
			break;
		default:
			s = "Midweek days are so-so.";
			break;
		}
		System.out.println(s);
		return s;
	}

	public static void main(String[] args) {
		Day[] a = new Day[0];
 		Day[] dd = Day.values();
		for (int i = 0; i < dd.length; i++)
			System.out.println(i + " day " + dd[i]);
		System.out.println(dd.toString());
		System.out.println(Enum.valueOf(Day.class, "MONDAY").getClass().getName());
		assert(Enum.valueOf(Day.class, "MONDAY").ordinal() == 1);
		
		Test_Enum firstDay = new Test_Enum(Day.MONDAY);
		assert(firstDay.tellItLikeItIs() == "Mondays are bad.");
		Test_Enum thirdDay = new Test_Enum(Day.WEDNESDAY);
		assert(thirdDay.tellItLikeItIs() == "Midweek days are so-so.");
		Test_Enum fifthDay = new Test_Enum(Day.FRIDAY);
		assert(fifthDay.tellItLikeItIs() == "Fridays are better.");
		Test_Enum sixthDay = new Test_Enum(Day.SATURDAY);
		assert(sixthDay.tellItLikeItIs() == "Weekends are best.");
		Test_Enum seventhDay = new Test_Enum(Day.SUNDAY);
		assert(seventhDay.tellItLikeItIs() == "Weekends are best.");
		Planet.main(new String[] { "155" });
		
		EnumSet<Day> e = EnumSet.of(Day.MONDAY);
		e.add(Day.WEDNESDAY);
		e.add(Day.FRIDAY);
		
		Iterator<Day> it = e.iterator();
		
		String mwf = "";
		while (it.hasNext()) {
			mwf += it.next();
		}
		
		System.out.println(mwf);
		assert(mwf.equals("MONDAYWEDNESDAYFRIDAY"));
		
		
		EnumSet<Dates> d = EnumSet.noneOf(Dates.class);
		for (int i = 1; i < 40; i += 3)
		d.add(Dates.valueOf("D" + i));
		
		Iterator<Dates> dt = d.iterator();
		
		String d123 = "";
		while (dt.hasNext()) {
			d123 += dt.next();
		}
		
		System.out.println(d123);
		assert(d123.equals("D1D4D7D10D13D16D19D22D25D28D31D34D37"));
		
		
		System.out.println("Test_Enum OK");
	}

	public enum Planet {
		MERCURY(3.3030e+23, 2.4397e6), VENUS(4.869e+24, 6.0518e6), EARTH(5.976e+24, 6.37814e6), MARS(6.421e+23,
				3.3972e6), JUPITER(1.9e+27, 7.1492e7), SATURN(5.688e+26,
						6.0268e7), URANUS(8.686e+25, 2.5559e7), NEPTUNE(1.024e+26, 2.4746e7) {
			public double surfaceGravity() {
//				System.out.println("Neptune anonymous");
				return 0;
			}
		}, PLUTO();

		static int x = new Integer(3);

		static int y = 0;
		{
			int x = 4;
		}
		
		static {
			int x = 5;
			y = x;
		}

		private final double mass; // in kilograms
		private final double radius; // in meters

		Planet(double... mass_radius) {
			if (mass_radius.length == 2) {
				this.mass = mass_radius[0];
				this.radius = mass_radius[1];
			} else {
				this.mass = Double.POSITIVE_INFINITY;
				this.radius = 1;
			}
		}

		private double mass() {
			return mass;
		}

		private double radius() {
			return radius;
		}

		// universal gravitational constant (m3 kg-1 s-2)
		public static final double G = 6.67300E-11;

		double surfaceGravity() {
			return G * mass / (radius * radius);
		}

		double surfaceWeight(double otherMass) {
			return otherMass * surfaceGravity();
		}

		public static void main(String[] args) {
			ComponentPlacement style = javax.swing.LayoutStyle.ComponentPlacement.RELATED;
			if (args.length != 1) {
				System.err.println("Usage: java Planet <earth_weight>");
				System.exit(-1);
			}
			double earthWeight = Double.parseDouble(args[0]);
			double mass = earthWeight / EARTH.surfaceGravity();
			
			String[] answers = "58.55243035614497,140.27486047536206,155.0,58.704263525754975,392.23641645183983,165.23240851579283,140.2947159053609,0.0,Infinity".split(",");
			int i = 0;
			for (Planet p : Planet.values()) {
//				System.out.printf("Your weight on %s is %8.2f%n", p.toString(), p.surfaceWeight(mass));
				System.out.println("Your weight on " + p.toString() + " is " +  p.surfaceWeight(mass) + "==" + answers[i]);
				assert(answers[i].equals("" + p.surfaceWeight(mass)));
				i++;
			}
		}
	}
}