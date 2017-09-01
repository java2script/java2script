package swingjs;

import java.util.Hashtable;
import java.util.Map;

import org.xml.sax.AttributeList;
import org.xml.sax.ext.Attributes2;

import swingjs.api.js.DOMNode;

/**
 * This is a minimal attribute lister; just enough to get the 
 * job done. No DTD checking. 
 * 
 * @author Bob Hanson
 *
 */
class JSSAXAttributes implements Attributes2, AttributeList {

	private DOMNode[] nodes;
	
	private Map<String, Integer> nameMap;

	private void createNameMap() {
		nameMap = new Hashtable<String, Integer>();
		for (int i =  nodes.length; --i >= 0;) {
			Integer ii = Integer.valueOf(i);
			nameMap.put(getFullName(getURI(i), getLocalName(i), null), ii);
			nameMap.put(getQName(i), ii);
		}
	}

	JSSAXAttributes(DOMNode node) {
		nodes = (DOMNode[]) DOMNode.getAttr(node, "attributes");
	}

	@Override
	public int getLength() {
		return nodes.length;
	}

	private String getAttr(int index, String key) {
		if (index < 0 || index >= nodes.length)
			return null;
		String s = (String) DOMNode.getAttr(nodes[index], key);
		return (s == null ? "" : s);
	}

	@Override
	public String getURI(int index) {
		return getAttr(index, "nameSpaceURI");
	}

	@Override
	public String getLocalName(int index) {
		return getAttr(index, "localName");
	}

	@Override
	public String getQName(int index) {
		return getAttr(index, "nodeName");
	}

// this is irrelevant:
// private final static String[] TYPES = { "CDATA", "ID", "IDREF", "IDREFS", "NMTOKEN", "NMTOKENS", "ENTITY", "ENTITIES", "NOTATION" };
// it is only indicated in the DTD  
  
	@Override
	public String getType(int index) {
		return "CDATA";
//		int i = typeIndex(index);
//		return (i < 0 ? null : TYPES[i]);
	}

//	private int typeIndex(int index) {
//		return 0;
////		try {
////			int i = Integer.parseInt(getAttr(index, "nodeType"));
////			if (i >= 0 && i < TYPES.length)
////				return i;
////		} catch (Exception e) {
////			// tough luck!
////		}
////		return -1;
//	}

	@Override
	public String getValue(int index) {
		return getAttr(index, "value");
	}

	@Override
	public int getIndex(String uri, String localName) {
		return  getIndex2(uri, localName);
	}

	public int getIndex2(String uri, String localName) {
		if (nameMap == null)
			createNameMap();
		Integer ii = nameMap.get(getFullName(uri, localName, null));
		return (ii == null ? -1 : ii.intValue());
	}
	@Override
	public int getIndex(String qName) {
		return getIndex1(qName);
	}

	public int getIndex1(String qName) {
		if (nameMap == null)
			createNameMap();
		Integer ii = nameMap.get(qName);
		return (ii == null ? -1 : ii.intValue());
	}

	@Override
	public String getType(String uri, String localName) {
		int i = getIndex2(uri, localName);
		return (i < 0 ? null : getType(i));
	}

	@Override
	public String getType(String qName) {
		int i = getIndex(qName);
		return (i < 0 ? null : getType(i));
	}

	@Override
	public String getValue(String uri, String localName) {
		int i = getIndex2(uri, localName);
		return (i < 0 ? null : getType(i));
	}

	@Override
	public String getValue(String qName) {
		int i = getIndex(qName);
		return (i < 0 ? null : getValue(i));
	}

	/// old 
	@Override
	public String getName(int i) {
		return getAttr(i, "name");
	}

	// We have no way to check the actual DTD
	
	@Override
	public boolean isDeclared(int index) {
		return false;//isDeclared0(index);
	}

	@Override
	public boolean isDeclared(String qName) {
		return false;//isDeclared0(getIndex(qName));
	}

	@Override
	public boolean isDeclared(String uri, String localName) {
		return false;//isDeclared0(getIndex2(uri,  localName));
	}

//  private boolean isDeclared0(int index) {
//  	return false;
////		return (index >= 0 && typeIndex(index) != TYPE_CDATA);
//	}

  @Override
	public boolean isSpecified(int index) {
		return false;//isSpecified0(index);
	}

	@Override
	public boolean isSpecified(String uri, String localName) {
		return false;//isSpecified0(getIndex2(uri,  localName));
	}

	@Override
	public boolean isSpecified(String qName) {
		return false;//isSpecified0(getIndex(qName));
	}

//	private boolean isSpecified0(int index) {
//		return (index >= 0 && index < nodes.length); 
//	}

	public static String getFullName(String uri, String localName, String qName) {
		return (uri == null || uri.length() == 0 ? "" : uri + "#")
				+ (qName == null || qName.length() == 0 || qName.equals(localName)
				? localName : qName);
	}



}
