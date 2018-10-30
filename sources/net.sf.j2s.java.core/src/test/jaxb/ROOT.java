package test.jaxb;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "Root", namespace = "www.jalview.org")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"root"})
public class ROOT {
	boolean root = true;

}
