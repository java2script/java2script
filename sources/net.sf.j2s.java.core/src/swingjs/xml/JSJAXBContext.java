package swingjs.xml;

import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.Validator;

import swingjs.JSUtil;

public class JSJAXBContext extends JAXBContext {

	protected Class<?> javaClass;
	private Map<String, ?> properties;

	public JSJAXBContext(Class<?>[] classes, Map<String, ?> properties) {
		this.properties = properties;
		this.javaClass = classes[0]; 
	}

	public JSJAXBContext(String contextPath, ClassLoader classLoader, Map<String, ?> properties) {
		JSUtil.notImplemented("JSJAXBContext(contextPath)");
	}

	public Class<?> getjavaClass() {
		return javaClass;
	}

	@Override
	public Marshaller createMarshaller() {
		return new JSJAXBMarshaller(this);
	}

	@Override
	public Unmarshaller createUnmarshaller() {
		return new JSJAXBUnmarshaller(this);
	}

	@Override
	public Validator createValidator() throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}
	
}