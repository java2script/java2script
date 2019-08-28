package swingjs.xml;

import org.w3c.dom.DOMException;
import org.w3c.dom.Text;

public class JSXMLText extends JSXMLCharData implements Text {

	@Override
	public Text splitText(int offset) throws DOMException {
		try {
			return /** @j2sNative node.splitText(offset) ||*/ null;			
		} catch (Throwable t) {
			throw new DOMException(DOMException.DOMSTRING_SIZE_ERR, t.toString());
		}
		}


	@Override
	public String getNodeValue() throws DOMException {
		return /** @j2sNative 1 ? this.node.data : */ null; 
	}

	@Override
	public boolean getIsWhitespaceInElementContent() {
		return false;
	}

}
