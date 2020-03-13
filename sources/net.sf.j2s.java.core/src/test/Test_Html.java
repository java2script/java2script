package test;

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
				"<html><head><style type=\"text/css\">body { margin:10px 10px 10px 10px;font-size: 12 pt; font-family: Dialog }</style></head><body><b>PhET Interactive Simulations</b><br>Copyright &copy; 2004-2015 University of Colorado.<br><a href=http://phet.colorado.edu/about/licensing.php>Some rights reserved.</a><br>Visit <a href=http://phet.colorado.edu>http://phet.colorado.edu</a></body></html>");
				add(editor);
		editor.addHyperlinkListener(new HyperlinkListener() {

			@Override
			public void hyperlinkUpdate(HyperlinkEvent e) {
				System.out.println("source=" + e.getSource() 
				+ "\nsourceElement=" + e.getSourceElement() 
				+ "\neventType=" + e.getEventType() 
				+ "\ndesc=" + e.getDescription() 
				+ "\nurl=" + e.getURL() + "\n");
			}
			
		});
		HTMLDocument doc = (HTMLDocument)editor.getDocument();
		Iterator iter = doc.getIterator(HTML.Tag.A);
		while(iter.isValid()) {
			System.out.println(iter.getAttributes());
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