package test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.MatchResult;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Test_Regex extends Test_ {

	public static void main(String[] args) {

		String st;
		Pattern p;
		Matcher m;

		String s;

		String formatSpecifier;
		
		// groups

		
        formatSpecifier = "%(y?x*)?";
		p = Pattern.compile(formatSpecifier);
		m = p.matcher("%d");
		m.find(0);
		System.out.println(m.groupCount());
		for (int i = 0; i <= m.groupCount();i++) {
			s = m.group(i);
			// note that in JavaScript (x*)? returns null, not (as in Java) ""
			System.out.println(i + " " + s);
		}

		

        formatSpecifier = "%(\\d+\\$)?([-#+ 0,(\\<]*)?(\\d+)?(\\.\\d+)?([tT])?([a-zA-Z%])";
		p = Pattern.compile(formatSpecifier);
		m = p.matcher("%d");
		m.find(0);
		System.out.println(m.groupCount());
		for (int i = 0; i <= m.groupCount();i++) {
			s = m.group(i);
			// note that in JavaScript ([-#+ 0,(\\<]*)? returns null, not (as in Java) ""
			System.out.println(i + " " + s);
		}

		String s0;
		s0 = "x/2 is a very excellent 1/x or x";
		s = (" " + s0 + " ").replaceAll("(\\W)x(\\W)", "$1y$2").trim();
		System.out.println(s);
		assert ("y/2 is a very excellent 1/y or y".equals(s));

		s0 = "x/2 is a very excellent 1/x or x";
		s = (" " + s0 + " ").replaceAll("(?<test1>\\W)x(?<test2>\\W)", "${test1}y${test2}").trim();
		System.out.println(s);
		assert ("y/2 is a very excellent 1/y or y".equals(s));


		formatSpecifier = "%(x*)?";
		p = Pattern.compile(formatSpecifier);
		m = p.matcher("%d");
		m.find();
		System.out.println(m.groupCount());
		for (int i = 0; i <= m.groupCount();i++) {
			s = m.group(i);
			System.out.println(i + " " + s);
		}


		

		
		
		p = Pattern.compile("(\\W)y(\\W)");
		m = p.matcher("(m*(@^2+~^2)/r+m*g*(1-y/r))*(1-y/r)");
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

		
		
		Object[] o = new Object[] { new Float(3.5), Integer.valueOf(100)};
	    s = String.format("val=%5.3f Completed %d%%.", o);
	    System.out.println(s);
	    assert(s.equals("val=3.500 Completed 100%."));


		p = Pattern.compile("(this/(?:[^/]+/)*).+\\Q.pdf\\E$");//$");
		m = p.matcher("this/is/a/test/testing.1.pdf");
		System.out.println(m.find());
		// note that go [1,n] here, not [0,n)
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
		}
		
		st = "FID for Publication/S6.zip|S6/HRMS.zip|HRMS/67563_hazh180_maxis_pos.pdf";
		p = Pattern.compile("^\\QFID for Publication/\\E(?<id>[^|/]+)\\Q.zip"
			+ "|\\E\\k<id>\\Q/HRMS.zip|\\E(?:[^/]+/)*(?<IFS0ms0representation0pdf>[^|/]+\\Q.pdf\\E)$");
		m = p.matcher(st);
		System.out.println(m.find());
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
		}


		st = "...pre-20a-b/DEPT135/3/pdata/1/procs";
		st = "...pre-20a-b/DEPT135|3/pdata/1/procs";
		p = Pattern.compile("^(?<path>.+(?:/|\\|)(?<dir>[^/]+))/pdata/[^/]+/procs$");		
		m = p.matcher(st);
		System.out.println(m.find());
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
		}

		
		
		st = "NMR DATA/product/3a-C'.mnova";
		p = Pattern.compile("^\\QNMR DATA/\\E[^|/]+\\Q/\\E(?<IFS0spec0nmr0representation0vendor0dataset>(?<IFS0spec0nmr0property0expt>(?<id>[^|/]+)\\Q-\\E[^|/]+)\\Q.mnova\\E)$");
		m = p.matcher(st);
		System.out.println(m.find());
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
		}
		
		
		
		String lipsum = "Lorem ipsum dolor sit amet ipsum";
		p = Pattern.compile("(?<g0>(?<g1>ip(?<g2>s)u)(?<g3>m))");
		m = p.matcher(lipsum);
		m.find();
		MatchResult mr = m.toMatchResult();
		m.find();
		
//		System.out.println("g0" + m.group("g0") + " " + m.start("g0") + " " + m.end("g0"));
//		System.out.println("g1" + m.group("g1") + " " + m.start("g1") + " " + m.end("g1"));
//		System.out.println("g2" + m.group("g2") + " " + m.start("g2") + " " + m.end("g2"));
		System.out.println(m.group(0) + " " + m.start() + " " + m.end());
		for (int i = 0;i <= m.groupCount(); i++) {
			System.out.println(i + " " + m.group(i) + " " + m.start(i) + " " + m.end(i));

		} 
		for (int i = 0;i <= mr.groupCount(); i++) {
			System.out.println(i + " " + mr.group(i) + " " + mr.start(i) + " " + mr.end(i));
		} 
		
		st = "{abc::now {jkl::{def::and} {ghi::then}}}";
		p = Pattern.compile("\\{([^:]+)::(.+)\\}");
		m = p.matcher(st);
		m.find();
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
		}
		
		st = "AtestB";
		p = Pattern.compile("\\QA\\E(?<IFS0nmr0param0expt>\\Q\\E.+\\Q\\E)\\QB\\E");
		m = p.matcher(st);
		m.find();
		// note that go [1,n] here, not [0,n)
		System.out.println("ID was " + m.group("IFS0nmr0param0expt"));
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
		}
		assert(m.group("IFS0nmr0param0expt").equals("test"));

		p = Pattern.compile("(?i)ID(?<id>.+) and this is id \\k<id>");
		m = p.matcher("ID1 and this is id 1");
		m.find();
		// note that go [1,n] here, not [0,n)
		System.out.println("ID was " + m.group("id"));
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
		}
		assert(m.group(1).equals("1"));

		p = Pattern.compile("ID((\\Q.\\E)(.((?<id>.+\\Q.\\E))))\\.and");
		m = p.matcher("ID.23456..and this");
		m.find();
		// note that go [1,n] here, not [0,n)
		System.out.println("ID was " + m.group("id"));
		System.out.println(m.group("id"));
		assert(m.group("id").equals("3456."));
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
		}

		
		p = Pattern.compile("(this)(.+)(is)(.+)(a)(.+)(new)(.+)(test)");
		m = p.matcher("and this is a new test here");
		m.find();
		// note that go [1,n] here, not [0,n)
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
		}

		p = Pattern.compile("([^-](?:-[^-]+)*)-(.+[.]jdf)$");//$");
		m = p.matcher("compound3-reduced-1H.jdf");
		m.find();
		// note that go [1,n] here, not [0,n)
		for (int i = 1, n = m.groupCount(); i <= n; i++) {
			System.out.println(i + "/" + n + ">"+m.group(i)+"<");
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
