package test;

import java.net.URL;

import javax.swing.JEditorPane;
import javax.swing.JFrame;
import javax.swing.event.HyperlinkEvent;
import javax.swing.event.HyperlinkListener;
import javax.swing.text.AttributeSet;
import javax.swing.text.Element;
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
		editor.setText(
				"<html>"
				+ "<head><base href=http://phet.colorado.edu>"
				+ "<style type=\"text/css\">"
				+ "body { margin:10px 10px 10px 10px;font-size: 24pt; font-family: Dialog }"
				+ "a { text-decoration:none;font-size:12pt;}"
				+ "</style>"
				+ "</head>"
				+ "<body>"
				+ "<b><font color=red>PhET Interactive Simulations</font></b>"
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

}