package test.jaxb;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

// testing a second class with the same xml name

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name="objclass",namespace="stolaf.edu")
public class Obj {
	
	@XmlElement(name = "Obj1", namespace = "www.jalview.org")
	public String obj1 =  "jaxb#Obj1";

	@XmlAttribute
	private String id = "jaxb2.obj";
	
	public Obj() {
	}

	
}