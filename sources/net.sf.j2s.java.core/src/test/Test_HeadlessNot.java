package test;

/**
 * See also Test_Headless
 * 
 * @author hansonr
 *
 */
class Test_HeadlessNot extends Test_ {
 
	public static void main(String[] args) {
		String[] files = /** @j2sNative Clazz.ClassFilesLoaded.sort() || */null;
		String s = /** @j2sNative  files.join('\n') || */null;
		System.out.println("Hello, world! (not headless) \n" + s + "\n\n" + files.length + " classes loaded");
	}

}