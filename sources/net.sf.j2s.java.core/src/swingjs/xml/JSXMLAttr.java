package swingjs.xml;

import org.w3c.dom.Attr;
import org.w3c.dom.DOMException;
import org.w3c.dom.Element;

public class JSXMLAttr extends JSXMLNode implements Attr {

	@Override
	public String getName() {
		return /** @j2sNative 1 ? this.name : */"";
	}

	@Override
	public boolean getSpecified() {
		return /** @j2sNative 1 ? this.specified : */false;
	}

	@Override
	public String getValue() {
		return /** @j2sNative 1 ? this.value : */"";
	}

	@Override
	public void setValue(String value) throws DOMException {
		/** @j2sNative this.value = value */;
	}

	@Override
	public Element getOwnerElement() {
		return (Element) newNode(/** @j2sNative this.ownerElement || */null);
	}

}
