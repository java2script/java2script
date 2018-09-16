package test;

class Test_Math extends Test_ {

// Java output:
//
//			rem(3.0/2.0) = -1.0 == -1.0
//			rem(4.0/2.0) = 0.0 == 0.0
//			rem(10.0/3.0) = 1.0 == 1.0
//			rem(11.0/3.0) = -1.0 == -1.0
//			rem(27.0/4.0) = -1.0 == -1.0
//			rem(28.0/5.0) = -2.0 == -2.0
//			rem(17.8/4.0) = 1.8000000000000007 == 1.8000000000000007
//			rem(17.8/4.1) = 1.4000000000000021 == 1.4000000000000021
//			rem(-16.3/4.1) = 0.09999999999999787 == 0.09999999999999787
//			rem(17.8/-4.1) = 1.4000000000000021 == 1.4000000000000021
//			rem(-17.8/-4.1) = -1.4000000000000021 == -1.4000000000000021
//			rem(NaN/5.0) = NaN == NaN
//			rem(5.0/NaN) = NaN == NaN
//			rem(Infinity/Infinity) = NaN == NaN
//			rem(Infinity/5.0) = NaN == NaN
//			rem(28.0/0.0) = NaN == NaN
//			rem(28.0/Infinity) = 28.0 == 28.0
//			rem(1.7976931348623157E308/4.1) = 1.4678815408981212 == 1.4678815408981212
//			rem(4.1/1.7976931348623157E308) = 4.1 == 4.1

	public static void main(String[] args) {
		ShowRemainders(3, 2, -1);
		ShowRemainders(4, 2, 0);
		ShowRemainders(10, 3, 1);
		ShowRemainders(11, 3, -1);
		ShowRemainders(27, 4, -1);
		ShowRemainders(28, 5, -2);
		// the agreement here is with Java, not MSDN.net
		ShowRemainders(17.8, 4, 1.8000000000000007);
		ShowRemainders(17.8, 4.1, 1.4000000000000021);
		ShowRemainders(-16.3, 4.1, 0.09999999999999787);
		ShowRemainders(17.8, -4.1, 1.4000000000000021);
		ShowRemainders(-17.8, -4.1, -1.4000000000000021);
		// If either argument is NaN, or the first argument is infinite, or the second
		// argument is positive zero or negative zero, then the result is NaN.
		ShowRemainders(Double.NaN, 5, Double.NaN);
		ShowRemainders(5, Double.NaN, Double.NaN);
		ShowRemainders(1.0 / 0, 1.0 / 0, Double.NaN);
		ShowRemainders(1.0 / 0, 5, Double.NaN);
		ShowRemainders(28, 0, Double.NaN);
		// If the first argument is finite and the second argument is infinite,
		// then the result is the same as the first argument.
		ShowRemainders(28, 1.0 / 0, 28);
		// How about max value?
		ShowRemainders(Double.MAX_VALUE, 4.1, 1.4678815408981212);
		ShowRemainders(4.1, Double.MAX_VALUE, 4.1);
		System.out.println("Test_Math OK");
	}

	private static void ShowRemainders(double number1, double number2, double val) {
		double ieeeRemainder = Math.IEEEremainder(number1, number2);
		System.out.println("rem(" + number1 + "/" + number2 + ") = " + ieeeRemainder + " == " + val);
		assert (Double.isNaN(ieeeRemainder) ? Double.isNaN(val) : ieeeRemainder == val);
	}
}
