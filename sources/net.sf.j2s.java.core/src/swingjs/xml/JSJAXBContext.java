package swingjs.xml;

import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.Validator;

public class JSJAXBContext extends JAXBContext {

	private Map<String, ?> properties;
	private Class<?>[] javaClasses;
	private String contextPath;

	public JSJAXBContext(Class<?>[] classes, Map<String, ?> properties) {
		this.properties = properties;
		this.javaClasses = classes;
	}

	public JSJAXBContext(String contextPath, ClassLoader classLoader, Map<String, ?> properties) {
		this.contextPath = contextPath;
		this.properties = properties;
	}

	public Class<?>[] getjavaClasses() {
		return javaClasses;
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