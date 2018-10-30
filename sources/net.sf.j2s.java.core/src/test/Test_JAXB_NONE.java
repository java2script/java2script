package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

import test.jaxb.Root_NONE;

/**
 * see notes in jaxb/Root_NONE.java
 * 
 * @author hansonr
 *
 */
@XmlRegistry
public class Test_JAXB_NONE extends Test_ {

//	Java read out:
//	getPropertyC is =getproPERtyC:propertyC01
//	getAToBe
//	getAToBe
//	getAToBe
//	isB2()
//	getB3()
//	private!getC
//	private!getC
//	private!getC
//	getPropertyAToBe
//	getPropertyAToBe
//	getPropertyAToBe
//
//	<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//	<ns2:RootNone xmlns:ns2="www.jalview.org" ang="?" pi1A="0" pi2A="0" pi3A="3">
//	    <propertyC>propertyC0</propertyC>
//	    <AToBe>getAtoBe</AToBe>
//	    <b2>true</b2>
//	    <b3>true</b3>
//	    <c>getC</c>
//	    <propertyAToBe>getPropertyAtoB</propertyAToBe>
//	    <propc>=getproPERtyC:propertyC01</propc>
//	    <propertyc>=getpropertyc:propertyC0</propertyc>
//	</ns2:RootNone>
//	
//	setAToBe:getAtoBe
//	setB2()
//	setB3()
//	private!setC
//	setPropertyAToBe:getPropertyAtoB
//	setProPERtyC:=getproPERtyC:propertyC01
//	setpropertyc:=getpropertyc:propertyC0
//	getPropertyAng[].length is 3
//	Test_JAXB_NONE OK

//  JavaScript read out:
//	getPropertyC is =getproPERtyC:propertyC01
//	private!getC
//	isB2()
//	getB3()
//	getAToBe
//	getPropertyAToBe
//
//	<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//	<ns2:RootNone xmlns="www.jalview.org" xmlns:ns2="www.jalview.org" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" Ang="&#8491;" pi1a="0" pi2a="0" pi3a="3">
//	<propertyC>propertyC0</propertyC>
//	<c>getC</c>
//	<propc>=getproPERtyC:propertyC01</propc>
//	<propertyc>=getpropertyc:propertyC0</propertyc>
//	<b2>true</b2>
//	<b3>true</b3>
//	<aToBe>getAtoBe</aToBe>
//	<propertyAToBe>=getPropertyAtoB</propertyAToBe>
//	</ns2:RootNone>
//	private!setC
//	setProPERtyC:=getproPERtyC:propertyC01
//	setpropertyc:=getpropertyc:propertyC0
//	setB2()
//	setB3()
//	setAToBe:getAtoBe
//	setPropertyAToBe:=getPropertyAtoB
//	getPropertyAng[].length is 3
//	Test_JAXB_NONE OK

    @XmlElementDecl(namespace = "www.jalview.org", name = "Root")
    public static JAXBElement<Root_NONE> createRootModel(Root_NONE value) {
        return new JAXBElement<Root_NONE>(new QName("www.jalview.org", "Root"), Root_NONE.class, null, value);
    }

	public static void main(String[] args) {
        JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(Root_NONE.class);
			 
	        Root_NONE root = new Root_NONE("test");
			System.out.println("getPropertyC is " + root.getproPERtyC());
	        Marshaller marshaller = jc.createMarshaller();
	        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
	        ByteArrayOutputStream bos = new ByteArrayOutputStream();	        
//	        marshaller.marshal(createRootModel(root), bos);
	        marshaller.marshal(root, bos);
	        String s = null;
			try {
				s = new String(bos.toByteArray(), "UTF-8");
		        System.out.println(s);
		        Unmarshaller unmarshaller = jc.createUnmarshaller();
		        ByteArrayInputStream is = new ByteArrayInputStream(s.getBytes("UTF-8"));
				Root_NONE r = (Root_NONE) unmarshaller.unmarshal(is);
				assert(r.getPropertyAng().equals("\u212B"));
				System.out.println("getPropertyAng[].length is " + r.getPropertyAng().getBytes("utf-8").length);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
	        System.out.println("Test_JAXB_NONE OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 
    }
}