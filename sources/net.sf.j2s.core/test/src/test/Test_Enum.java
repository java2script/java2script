package test;

@SuppressWarnings("unused")
public class Test_Enum {

	public enum Day {
		SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY 
	}

	
	Day day;

	public Test_Enum(Day day) {
		this.day = day;
	}

	public void tellItLikeItIs() {
		switch (day) {
		case MONDAY:
			System.out.println("Mondays are bad.");
			break;

		case FRIDAY:
			System.out.println("Fridays are better.");
			break;

		case SATURDAY:
		case SUNDAY:
			System.out.println("Weekends are best.");
			break;

		default:
			System.out.println("Midweek days are so-so.");
			break;
		}
	}

	public static void main(String[] args) {
		
		Day[] d = Day.values();
		for (int i = 0; i < d.length; i++)
			System.out.println(i + " day " + d[i]);
		
		Test_Enum firstDay = new Test_Enum(Day.MONDAY);
		firstDay.tellItLikeItIs();
		Test_Enum thirdDay = new Test_Enum(Day.WEDNESDAY);
		thirdDay.tellItLikeItIs();
		Test_Enum fifthDay = new Test_Enum(Day.FRIDAY);
		fifthDay.tellItLikeItIs();
		Test_Enum sixthDay = new Test_Enum(Day.SATURDAY);
		sixthDay.tellItLikeItIs();
		Test_Enum seventhDay = new Test_Enum(Day.SUNDAY);
		seventhDay.tellItLikeItIs();
		Planet.main(new String[] { "155" });
		
	}

	public enum Planet {
		MERCURY(3.303e+23, 2.4397e6), VENUS(4.869e+24, 6.0518e6), EARTH(5.976e+24, 6.37814e6), MARS(6.421e+23,
				3.3972e6), JUPITER(1.9e+27, 7.1492e7), SATURN(5.688e+26,
						6.0268e7), URANUS(8.686e+25, 2.5559e7), NEPTUNE(1.024e+26, 2.4746e7) {
			public double surfaceGravity() {
//				System.out.println("Neptune anonymous");
				return 0;
			}
		}, PLUTO();

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
			if (args.length != 1) {
				System.err.println("Usage: java Planet <earth_weight>");
				System.exit(-1);
			}
			double earthWeight = Double.parseDouble(args[0]);
			double mass = earthWeight / EARTH.surfaceGravity();
			
			for (Planet p : Planet.values())
//				System.out.printf("Your weight on %s is %8.2f%n", p.toString(), p.surfaceWeight(mass));
				System.out.println("Your weight on " + p.toString() + " is " +  p.surfaceWeight(mass));
		}
	}
}