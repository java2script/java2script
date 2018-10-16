package swingjs;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.Validator;
import javax.xml.bind.annotation.XmlRootElement;

@SuppressWarnings("unused")
public class JSJAXB {

	public XmlRootElement getRootElement(Class<?> c) {
		return null;
	}
	
	private XmlRootElement createRootElement(String info) {
		XmlRootElement e = null;
		String name = "##default";
		String namespace = "##default";
		/**@j2sNative 
		 	e = {name:function(){return name}, 
				namespace:function() {return namespace}
				};
		*/
		return e;		
	}
	
}