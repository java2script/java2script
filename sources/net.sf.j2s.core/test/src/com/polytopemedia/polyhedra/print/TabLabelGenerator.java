package com.polytopemedia.polyhedra.print;

public class TabLabelGenerator {
	private int nextLabel = 0;
	private String get() {
		return toString(nextLabel);
	}

	public String getAndBump() {
		String rtn = get();
		bump();
		return rtn;
	}
	
	private static String digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	private static String toString(int num) {
		if (num < 0) return toString(-num);
		if (num == 0) {
			return digits.charAt(0)+"";
		}
		String rtn = "";
		int numDigits = digits.length(); 
		while (num > 0) {
			rtn = digits.charAt(num % numDigits) + rtn;
			num /= numDigits;
		}
		return rtn;
	}
	private void bump() {
		nextLabel++;
	}
}
