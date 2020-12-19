package test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Test_Regex extends Test_ {

	public static void main(String[] args) {

		
		
		
		String s;
		
		Object[] o = new Object[] { new Float(3.5), Integer.valueOf(100)};
	    s = String.format("val=%5.3f Completed %d%%.", o);
	    System.out.println(s);
	    assert(s.equals("val=3.500 Completed 100%."));

		Pattern p;
		String formatSpecifier
        = "%(\\d+\\$)?([-#+ 0,(\\<]*)?(\\d+)?(\\.\\d+)?([tT])?([a-zA-Z%])";
		Pattern fsPattern = Pattern.compile(formatSpecifier);
		Matcher fm = fsPattern.matcher("%d");
		fm.find(0);
		System.out.println(fm.groupCount());
		for (int i = 0; i < fm.groupCount();i++) {
			s = fm.group(i);
			// note that in JavaScript ([-#+ 0,(\\<]*)? returns null, not (as in Java) ""
			System.out.println(s);
		}

		System.out.println("testRE pattern def");
		s = Pattern.compile("''").matcher("ab'cd''ef'''gh''''").replaceAll("X");
		System.out.println(s);
		assert (s.equals("ab'cdXefX'ghXX"));

		System.out.println("testRE DOTALL");
		p = Pattern.compile(".*", Pattern.DOTALL);
		s = p.matcher("abc\\ndef\\n ghi").replaceAll("X");
		System.out.println(s);
		assert (s.equals("XX"));

		System.out.println("testRE string.replaceAll with inline DOTALL (?s)");
		s = "abc\ndef\n ghi".replaceAll("(?s).*", "X");
		System.out.println(s);
		assert (s.equals("XX"));

		// groups
		String s0 = "x/2 is a very excellent 1/x or x";
		s = (" " + s0 + " ").replaceAll("(\\W)x(\\W)", "$1y$2").trim();
		System.out.println(s);
		assert ("y/2 is a very excellent 1/y or y".equals(s));

		p = Pattern.compile("(\\W)y(\\W)");
		Matcher m = p.matcher("(m*(@^2+~^2)/r+m*g*(1-y/r))*(1-y/r)");
		s = m.replaceAll("$1`$2").trim();
		assert (m.groupCount() == 2);
		System.out.println(s);
		assert ("(m*(@^2+~^2)/r+m*g*(1-`/r))*(1-`/r)".equals(s));

		s = Pattern.compile("(\\W)y(\\W)").matcher(" y+ y*2 ").replaceAll("$1`$2").trim();
		System.out.println(s);
		assert ("`+ `*2".equals(s));

		Map<String, Double> vars = new HashMap<>();
		vars.put("a2", Double.valueOf(2));
		vars.put("a3", Double.valueOf(3));
		assert (eval("y+a2*x+a3", vars).equals("y+(2.0)*x+(3.0)"));
		assert (eval("y + a2*x + a3", vars).equals("y+(2.0)*x+(3.0)"));
		assert (eval("y + -a2*x + a3", vars).equals("y+-(2.0)*x+(3.0)"));


		// testing without \Q \E 
		s = Arrays.toString(splitUnquoted("this[a-z] is \"a[a-z]test\"", "[a-z]"));
		System.out.println(s);
		assert (s.equals("[, , , , [, -, ] , ,  \"a[a-z]test\"]"));

		// testing \Q \E -- caveat that quoted \Q \E is not supported
		s = Arrays.toString(splitUnquoted("this[a-z] is \"a[a-z]test\"", Pattern.quote("[a-z]")));
		System.out.println(s);
		assert (s.equals("[this,  is \"a[a-z]test\"]"));

		// testing \Q \E -- nonspecial quote
		s = Arrays.toString(splitUnquoted("this; is \"a;test\"", Pattern.quote(";")));
		System.out.println(s);
		assert (s.equals("[this,  is \"a;test\"]"));

		System.out.println("Test_Regex OK");
	}

	public static String[] splitUnquoted(final String s, final String separator) {
		// See https://stackoverflow.com/a/1757107/1919049
		String quoted = separator + "(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)";
		return s.split(quoted, -1);
	}

	public static String eval(String s, Map<String, Double> vars) {
		final StringBuilder sb = new StringBuilder();
		// NB: Split general equation on potential variables, including delimiters.
		// For an explanation, see: http://stackoverflow.com/a/279337
		// BH But not all browsers can handle look-behind.
		// So we allow for ending up with \\W\\w+
		s = s.replaceAll(" ", "");
		String pat = /** @j2sNative "(?=\\W)" || */
				"(?<=\\w)(?=\\W)|(?<=\\W)(?=\\w)";
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

}
