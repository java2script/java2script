package swingjs.xml;

import org.w3c.dom.CharacterData;
import org.w3c.dom.DOMException;

public class JSXMLCharData extends JSXMLNode implements CharacterData {

	@Override
	public void setData(String data) throws DOMException {
		/** @j2sNative node.data = data; */		
	}

	@Override
	public String getData() throws DOMException {
		return /** @j2sNative 1 ? node.data : */ "";		
	}
	
	@Override
	public int getLength() {
		return /** @j2sNative 1 ? node.length  : */ 0;
	}

	@Override
	public String substringData(int offset, int count) throws DOMException {
		try {
			return /** @j2sNative 1 ? node.substringData(offset, count)  : */ "";			
		} catch (Throwable t) {
			throw new DOMException(DOMException.DOMSTRING_SIZE_ERR, t.toString());
		}
	}

	@Override
	public void appendData(String arg) throws DOMException {
		try {
			/** @j2sNative node.appendData(arg) */			
		} catch (Throwable t) {
			throw new DOMException(DOMException.DOMSTRING_SIZE_ERR, t.toString());
		}
	}

	@Override
	public void insertData(int offset, String arg) throws DOMException {
		try {
			/** @j2sNative node.insertData(offset, arg) */			
		} catch (Throwable t) {
			throw new DOMException(DOMException.DOMSTRING_SIZE_ERR, t.toString());
		}
	}

	@Override
	public void deleteData(int offset, int count) throws DOMException {
		try {
			/** @j2sNative node.deleteData(offset, count) */			
		} catch (Throwable t) {
			throw new DOMException(DOMException.DOMSTRING_SIZE_ERR, t.toString());
		}
	}

	@Override
	public void replaceData(int offset, int count, String arg) throws DOMException {
		try {
			/** @j2sNative node.replaceData(offset, count, arg) */			
		} catch (Throwable t) {
			throw new DOMException(DOMException.DOMSTRING_SIZE_ERR, t.toString());
		}
	}




}
