package test.jaxb;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "Root_super", namespace = "www.jalview.org")
@XmlAccessorType(XmlAccessType.FIELD)
// J2S can only do the following if subclasses also have propOrder
// @XmlType(propOrder = {"root"})
public class ROOT_super {
	boolean root = true;

}
