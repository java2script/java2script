package test;

import java.awt.Font;
import java.net.URL;

import javax.swing.JButton;
import javax.swing.JEditorPane;
import javax.swing.JFrame;
import javax.swing.event.HyperlinkEvent;
import javax.swing.event.HyperlinkListener;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLDocument;
import javax.swing.text.html.HTMLEditorKit;
import javax.swing.text.html.HTMLDocument.Iterator;

public class Test_Html extends JFrame {

	public Test_Html() {
		this.setTitle("testing HTML");
		JEditorPane editor = new JEditorPane();
		editor.setEditable(false);
		editor.setEditorKit(new HTMLEditorKit());
		HTMLDocument document = (HTMLDocument) editor.getDocument();
	    document.getStyleSheet().addRule(getBodyStyle());  	
	    document.getStyleSheet().addRule(getH1Style());  	
	    document.getStyleSheet().addRule(getH2Style()); 
		editor.setText(
				"<html>"
				+ "<head><base href=http://phet.colorado.edu>"
				+ "<style type=\"text/css\">"
				+ "body { margin:10px 10px 10px 10px;font-size: 24pt; font-family: Dialog }"
				+ "a { text-decoration:none;font-size:12pt;}"
				+ "</style>"
				+ "</head>"
				+ "<body>"
				+ "<b><h2><font color=red>PhET Interactive Simulations</font></h2></b>"
				+ "<br>Copyright &copy; 2004-2015 University of Colorado."
				+ "<br><a href=\"about/licensing.php\">Some rights reserved.</a>"
				+ "<br>Visit <a href=\".\">http://phet.colorado.edu</a>"
				+ " <a href=proxy-href>proxy</a>"
				+ "</body>"
				+ "</html>");
				add(editor);
		editor.addHyperlinkListener(new HyperlinkListener() {

			@Override
			public void hyperlinkUpdate(HyperlinkEvent e) {
				URL url = e.getURL();
				System.out.println("source=" + e.getSource() 
				+ "\nsourceElement=" + e.getSourceElement() 
				+ "\neventType=" + e.getEventType() 
				+ "\ndesc=" + e.getDescription() 
				+ "\nurl=" + url + "\n");
				if (url != null) {
				/** @j2sNative 
				 * 
				 * open(url.toString());
				 * 
				 */
				}
			}
			
		});
		HTMLDocument doc = (HTMLDocument)editor.getDocument();
		URL base = doc.getBase();
		System.out.println("Test_Html base=" + base);
		Iterator iter = doc.getIterator(HTML.Tag.A);
		while(iter.isValid()) {
			System.out.println("Test_Html a=" + iter.getAttributes());
					iter.next();
		}

		pack();
		setVisible(true);
	}

	public static void main(String[] args) {
		try {
			new Test_Html();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	  /**
	   * Returns the body style for a stylesheet.
	   * 
	   * @return the body style
	   */
	  protected static String getBodyStyle() {
			return 
					"body {\n"+ //$NON-NLS-1$
					"  font-family: Verdana, Arial, Helvetica, sans-serif;\n"+ //$NON-NLS-1$
					"  font-size: "+bodyFont.getSize()+"pt;\n"+ //$NON-NLS-1$ //$NON-NLS-2$
					"  color: #405050;\n"+ //$NON-NLS-1$
					"  background-color: #FFFFFF;\n"+ //$NON-NLS-1$
					"}\n"; //$NON-NLS-1$
	  }
	  
	  /**
	   * Returns the H1 heading style for a stylesheet.
	   * 
	   * @return the H1 heading style
	   */
	  protected static String getH1Style() {
			return 
					"h1 {\n"+ 
					"  font-size: "+h1Font.getSize()+"pt;\n"+ 
					"  text-align: center;\n"+
					"}\n"; 
	  }
	  
	  /**
	   * Returns the H2 heading style for a stylesheet.
	   * 
	   * @return the H2 heading style
	   */
	  protected static String getH2Style() {
			return 
					"h2 {\n"+
					"  font-size: "+h2Font.getSize()+"pt;\n"+ 
					"}\n"; 
	  }
	  
	  protected static Font bodyFont = new JButton().getFont().deriveFont(12f);
	  protected static Font h1Font = bodyFont.deriveFont(24f);
	  protected static Font h2Font = bodyFont.deriveFont(16f);
	  

}