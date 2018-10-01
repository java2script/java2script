package javax.xml.bind;

import swingjs.JSJAXBMarshaller;

/**
 * just a sketch
 * 
 * @author hansonr
 *
 */
public class JAXBContext {

	public JAXBContext(Class<?>[] javaClass) {
		this.javaClass = javaClass[0];
	}
	
	public static JAXBContext newInstance(Class<?>... c) throws JAXBException {
		return new JAXBContext(c);
	}

	public Marshaller createMarshaller() {
		return new JSJAXBMarshaller(this);
	}

	public Unmarshaller createUnmarshaller() {
		return new JSJAXBMarshaller(this);
	}

}
