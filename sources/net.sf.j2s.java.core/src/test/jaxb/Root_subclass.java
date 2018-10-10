package test.jaxb;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

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