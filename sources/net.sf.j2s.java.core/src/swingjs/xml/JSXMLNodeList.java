package swingjs.xml;

import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class JSXMLNodeList implements NodeList {
	
	private Object list;
	
	public JSXMLNodeList(Object nodes) {
		list = nodes;
	}

	@Override
	public Node item(int index) {
		return JSXMLNode.newNode(/** @j2sNative this.list[index] || */null);
	}

	@Override
	public int getLength() {
		return /** @j2sNative this.list.length || */0;
	}

}
