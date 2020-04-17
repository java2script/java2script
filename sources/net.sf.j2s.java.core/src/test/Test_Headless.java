package test;

/**
 * See also Test_HeadlessNot
 * 
 * Use ?j2sverbose to see the difference in adding headless:true to Info{}
 * 
 * @author hansonr
 *
 */
class Test_Headless extends Test_ {

static {
	/**
	 * @j2sNative J2S.thisApplet.__Info.headless=true;
	 * 
	 */
}
	public static void main(String[] args) {
		String[] files = /** @j2sNative Clazz.ClassFilesLoaded.sort() || */null;
		String s = /** @j2sNative  files.join('\n') || */null;
		System.out.println("Hello, world! (headless) \n" + s + "\n\n" + files.length + " classes loaded");
	}

}