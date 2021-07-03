package test;

public class Test_String2 extends Test_ {

	@SuppressWarnings("unused")
	public static void main(String[] args) {

		long t0;

		t0 = System.currentTimeMillis();
		int n = 20;

		String s = "testingtestingtesting";
		t0 = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < n; j++)
				s.replace('t', 'y');
		}
		System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t String.replace");

		t0 = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < n; j++)
				s.replaceAll("t", "y");
		}
		System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t String.replaceAll");

		// twice as fast as StringReplaceAll in java, but twice as slow in JavaScript
		t0 = System.currentTimeMillis();
		for (int i = 0; i < 10000; i++) {
			for (int j = 0; j < n; j++)
				replace2(s, 't', 'y');
		}
		System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t replace2");


//		t0 = System.currentTimeMillis();
//		for (int i = 0; i < 10000; i++) {
//			for (int j = 0; j < n; j++)
//				PT.rep(s, "t", "y");
//		}
//		System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t PT.rep");

		if (/** @j2sNative true || */
		false) {
			
//			t0 = System.currentTimeMillis();
//			for (int i = 0; i < 10000; i++) {
//				for (int j = 0; j < n; j++)
//					/** @j2sNative s.replace2$('t', 'y');*/{}
//			}
//			System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t String.replace2");

			
//			t0 = System.currentTimeMillis();
//			for (int i = 0; i < 10000; i++) {
//				for (int j = 0; j < n; j++)
//					replace(s, 't', 'y');
//			}
//			System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t replace");
//
			t0 = System.currentTimeMillis();
			Object re = /** @j2sNative new RegExp('t','gm') || */
					null;
			for (int i = 0; i < 10000; i++) {
				for (int j = 0; j < n; j++)
				/** @j2sNative s.replace(re,'y'); */
				{
				}
			}
			System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t cachedregexp");

			t0 = System.currentTimeMillis();
			for (int i = 0; i < 10000; i++) {
				for (int j = 0; j < n; j++)
				/** @j2sNative s.replace(new RegExp('t','gm'),'y'); */
				{
				}
			}
			System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t new regexp");

		}
		
		System.out.println(testN("imagepath"));
		System.out.println(testN("imagepath0"));
		System.out.println(testN("imagepath00"));
//		System.out.println(testN("imagepath123"));
//		System.out.println(testN("imagepath1234"));
//		System.out.println(testN("imagepath12345"));
		
		
		
		
		System.out.println("Test_String OK");
	}

    private static String testN(String imagePath) {
		int len = imagePath.length();
		int digits = 0;
		while (digits <= 4 && --len >= 0 && Character.isDigit(imagePath.charAt(len))) {
			digits++;
		}
		if (digits == 0) { // no number found, so load single image
			return imagePath;
		}
		String root = imagePath.substring(0, ++len);
		int n = Integer.parseInt(imagePath.substring(len));
		int limit = (int) Math.pow(10, digits);
		while (++n < limit) {
			// fill with leading zeros if nec
			String num = "000" + n;
			num = num.substring(num.length() - digits);
			imagePath = root + num;
			System.out.println(imagePath);
		}				
		return imagePath.substring(0, len) ;
	}

	public static void replace(String s, char oldChar, char newChar) {
        if (oldChar != newChar) {
            int len = s.length();
            int i = -1;
            char[] val = /** @j2sNative 1 ? s : */ null;
            
            while (++i < len) {
                if (val[i] == oldChar) {
                    break;
                }
            }
            if (i < len) {
                char buf[] = new char[len];
                for (int j = 0; j < i; j++) {
                    buf[j] = val[j];
                }
                while (i < len) {
                    char c = val[i];
                    buf[i] = (c == oldChar) ? newChar : c;
                    i++;
                }
                s = /** @j2sNative 1 ? buf.join("") : */"";
            }
        }
        //return s;
    }

    public static String replace2(String s, char oldChar, char newChar) {
        if (oldChar != newChar) {
            int i = -1, i0 = -1;
            String s1 = "";
            while ((i = s.indexOf(oldChar, i0 + 1)) >= 0) {
                    s1 += s.substring(i0 + 1, i) + newChar;
                    i0 = i;
            }
            return s1;
        }
        return s;
    }

}