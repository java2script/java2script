/*
 * Open Source Physics software is free software as described near the bottom of this code file.
 *
 * For additional information and documentation on Open Source Physics please see:
 * <http://www.opensourcephysics.org/>
 */

package test; //org.opensourcephysics.numerics;

import java.util.function.DoubleUnaryOperator;

/**
 * Derivative defines various derivative algorithms. This class cannot be
 * subclassed or instantiated because all methods are static.
 * 
 * For testing, using java.util.function.DoubleUnaryOperator
 *
 * @author Wolfgang Christian
 */
public class Derivative {

	/**
	 * The function.
	 * 
	 */
	public static double math(double x) {
		return x * Math.log(x) * Math.sin(x) * Math.cos(x);
	}

	/**
	 * As a functional interface.
	 * 
	 */
	static DoubleUnaryOperator f = new DoubleUnaryOperator() {

		@Override
		public double applyAsDouble(double x) {
			return x * Math.log(x) * Math.sin(x) * Math.cos(x);
		}

	};

	/**
	 * First derivative wrapped to re-assign one of the two parameters.
	 * 
	 * @param f
	 * @param h
	 * @return
	 */
	static public DoubleUnaryOperator getFirstWrapped(final DoubleUnaryOperator f, final double h) {
		return new DoubleUnaryOperator() {
			@Override
			public double applyAsDouble(double x) {
				return (f.applyAsDouble(x + h) - f.applyAsDouble(x - h)) / h / 2.0;
			}

		};
	}

	static DoubleUnaryOperator wrappedFirst = getFirstWrapped(f, 0.1);

	private static void directCalc(boolean report) {
		System.gc();
		double result = 0;
		double h = 0.1;
		long t0 = System.currentTimeMillis();
		for (int i = 1; i < 1000000; i++) {
			result += (math(i + h) - math(i - h)) / h / 2;
		}
		if (report)
			System.out.println("Direct: ..........."+ result + "........" + (System.currentTimeMillis() - t0));

	}

	private static void unwrappedFI(DoubleUnaryOperator f, boolean report) {
		System.gc();
		double result = 0;
		long t0 = System.currentTimeMillis();
		double h = 0.1;
		for (int i = 1; i < 1000000; i++)
			result += (f.applyAsDouble(i + h) - f.applyAsDouble(i - h)) / h / 2.0;
		if (report)
			System.out.println("Unwrapped: ........"+ result + "................ " + (System.currentTimeMillis() - t0));
	}

	private static void wrappedFI(DoubleUnaryOperator wrappedFirst, boolean report) {
		System.gc();
		double result = 0;
		long t0 = System.currentTimeMillis();
		for (int i = 1; i < 1000000; i++)
			result += wrappedFirst.applyAsDouble(i);
		if (report)
			System.out.println("Wrapped: .........." + result + "........................" + (System.currentTimeMillis() - t0));

	}

	public static void main(String[] args) {

		System.out.println(System.getProperty("java.version") + " " + System.getProperty("os.arch"));
		unwrappedFI(f, false);
		wrappedFI(wrappedFirst, false);
		directCalc(false);

		directCalc(true);
		directCalc(true);
		directCalc(true);
		unwrappedFI(f, true);
		unwrappedFI(f, true);
		unwrappedFI(f, true);
		wrappedFI(wrappedFirst, true);
		wrappedFI(wrappedFirst, true);
		wrappedFI(wrappedFirst, true);

		directCalc(true);
		unwrappedFI(f, true);
		wrappedFI(wrappedFirst, true);
		directCalc(true);
		unwrappedFI(f, true);
		wrappedFI(wrappedFirst, true);
		directCalc(true);
		unwrappedFI(f, true);
		wrappedFI(wrappedFirst, true);

		wrappedFI(wrappedFirst, true);
		wrappedFI(wrappedFirst, true);
		wrappedFI(wrappedFirst, true);
		unwrappedFI(f, true);
		unwrappedFI(f, true);
		unwrappedFI(f, true);
		directCalc(true);
		directCalc(true);
		directCalc(true);

		wrappedFI(wrappedFirst, false);
		unwrappedFI(f, false);
		directCalc(false);

	}

}