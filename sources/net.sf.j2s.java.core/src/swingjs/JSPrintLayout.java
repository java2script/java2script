package swingjs;

/**
 * <code>PrintLayout</code> class stores all the information needed from the
 * <code>PrintLayoutDialog</code>
 */

public class JSPrintLayout {
	
	public JSPrintLayout() {
			 asPDF = true;
//			 pd.setDefaultPrintOptions(this);					 
	}
	public int imageableX = 0;
	public int imageableY = 0;
	public int paperHeight = (int) (Math.min(11f, 11.69f) * 72);
	public int paperWidth = (int) (Math.min(8.5f, 8.27f) * 72);
	public int imageableHeight = paperHeight;
	public int imageableWidth = paperWidth;

	/**
	 * The paper orientation ("portrait" or "landscape")
	 */
	public String layout = "portrait";

	public Object paper;
	
	public boolean asPDF = true;
	
}