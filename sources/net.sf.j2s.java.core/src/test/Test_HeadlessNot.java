package test;

/**
 * See also Test_Headless
 * 
 * @author hansonr
 *
 */
class Test_HeadlessNot extends Test_ {
 
	public static void main(String[] args) {
		String[] files = /** @j2sNative Clazz.ClassFilesLoaded.sort() || */
				new String[0];
		String s = /** @j2sNative files.join('\n') || */
				null;
		System.out.println("Hello, world! (headless==" + System.getProperty("java.awt.headless") + ")\n\nClasses:\n" + s + "\n"
				+ files.length + " classes loaded\n");
	}

}