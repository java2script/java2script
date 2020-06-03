package test;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

public class Test_Regex extends Test_ {

	public static void main(String[] args) {
		Map<String,Double> vars = new HashMap<>();
		vars.put("a2", Double.valueOf(2));
		vars.put("a3", Double.valueOf(3));		
		assert(eval("y+a2*x+a3", vars).equals("y+(2.0)*x+(3.0)"));
		assert(eval("y + a2*x + a3", vars).equals("y+(2.0)*x+(3.0)"));
		assert(eval("y + -a2*x + a3", vars).equals("y+-(2.0)*x+(3.0)"));
		String s = Arrays.toString(splitUnquoted("this; is \"a;test\"", ";"));
		System.out.println(s);
		assert(s.equals("[this,  is \"a;test\"]"));
		
		s = "x/2 is a very excellent 1/x or x";
		
		assert("y/2 is a very excellent 1/y or y".equals((" " +s + " ").replaceAll("(\\W)x(\\W)", "$1y$2").trim()));
		
		System.out.println(Pattern.compile("(\\W)y(\\W)").matcher("(m*(@^2+~^2)/r+m*g*(1-y/r))*(1-y/r)" ).replaceAll("$1`$2").trim());

		System.out.println(Pattern.compile("(\\W)y(\\W)").matcher(" y+ y*2 " ).replaceAll("$1`$2").trim());

		System.out.println("Test_Regex OK");
	}
	
	public static String[] splitUnquoted(final String s, final String separator) {
		// See https://stackoverflow.com/a/1757107/1919049
		return s.split(Pattern.quote(separator) +
			"(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
	}

	public static String eval(String s, Map<String, Double> vars) {
		final StringBuilder sb = new StringBuilder();
		// NB: Split general equation on potential variables, including delimiters.
		// For an explanation, see: http://stackoverflow.com/a/279337
		// BH But not all browsers can handle look-behind.
		// So we allow for ending up with \\W\\w+
		s = s.replaceAll(" ","");
		String pat = /** @j2sNative "(?=\\W)" || */ "(?<=\\w)(?=\\W)|(?<=\\W)(?=\\w)";		
		final String[] tokens = s.split(pat);
		for (String token : tokens) {
			if (token.matches("\\w+")) {
				// abc
			} else if (token.matches("\\W\\w+")) {
				// +abc
				sb.append(token.charAt(0));
				token = token.substring(1);
			} else {
				sb.append(token);
				continue;
			}
			// token might be a variable; check the vars table
			final Double value = vars.get(token);
			if (value == null) {
				sb.append(token);
			} else {
				// token *is* a variable; substitute the value!
				sb.append("(");
				sb.append(value);
				sb.append(")");
			}
		}
		System.out.println(s + " = " + sb.toString());
		return sb.toString();
	}


	class Matcher1 {
		
		int grN = 0;
		
		public String toString() {
			return group(grN);
		}
		
	}
	
	String group(int n) {
		return "" + n;
	}
}
