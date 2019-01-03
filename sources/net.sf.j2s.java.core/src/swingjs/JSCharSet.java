package swingjs;

import sun.nio.cs.StandardCharsets;


/**
 * to date, just a static class for resolving aliases
 * 
 * @author hansonr
 *
 */
public class JSCharSet {

	private static String[][] aliases;
	
	public static String lookupName(String charsetName) {
		if (aliases == null) {
			String sep = ";";
			String[][] sets = StandardCharsets.SWINGJS_ALIASES;
			aliases = new String[sets.length][2];
			for (int i = sets.length; --i >= 0;)
				aliases[i] = new String[] { sets[i][0], (sep + /** @j2sNative sets[i].join(";") + */ sep).toLowerCase() }; 			
		}
		String key = ";" + charsetName.toLowerCase() + ";";
		for (int i = 0, n = aliases.length; i < n; i++) {
			if (aliases[i][1].indexOf(key) >= 0) {
				return aliases[i][0];
			}
		}		
		return null;
	}

}
