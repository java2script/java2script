package test.jaxb;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

// adapted source: http://blog.bdoughan.com/2011/06/using-jaxbs-xmlaccessortype-to.html

@XmlRootElement(name = "RootSubclass", namespace = "www.jalview.org")
@XmlAccessorType(XmlAccessType.FIELD)
public class Root_subclass extends Root_FIELD {
	
	public String rootClass = "rootClass";

	public Root_subclass() {
		super();
	}


////////////////////////////////////////////////////

	
}