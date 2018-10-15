package test.jaxb;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

// testing a second class with the same xml name

@XmlAccessorType(XmlAccessType.FIELD)
public class Obj {
	
	@XmlElement(name = "Obj1", namespace = "www.jalview.org")
	public String obj1 =  "jaxb#Obj1";

	public Obj() {
	}

	
}