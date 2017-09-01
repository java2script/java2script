package swingjs.api;

import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.Document;
import javax.swing.text.DocumentFilter;

/**
 * class for all the important methods that do not involve extensive document parsing
 * 
 * @author Bob Hanson
 *
 */
public interface JSMinimalAbstractDocument extends Document {

	int getAsynchronousLoadPriority();

	void replace(int p0, int i, String content,
			AttributeSet attr) throws BadLocationException;

	void setDocumentFilter(DocumentFilter filter);

}
