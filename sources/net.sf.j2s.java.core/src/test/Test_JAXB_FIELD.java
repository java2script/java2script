package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

import test.jaxb.ObjectFactory;
import test.jaxb.Root_FIELD;
import test.jaxb.Root_NONE;
import test.jaxb.Root_ORDERED;

public class Test_JAXB_FIELD extends Test_ {

	public static void main(String[] args) {
        JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(Root_ORDERED.class, Root_FIELD.class);
			
			long x = 1234567899123456L;
			int y = (int) x;
			Date d = new Date(1373360175539L);
			System.out.println(d);
			
	        Root_FIELD root = new Root_FIELD(false);
			System.out.println("c is " + root.C());
			System.out.println("getPropertyC is " + root.getPropertyC());
			System.out.println("DEFVAL is " + root.DEFVAL);
	        Marshaller marshaller = jc.createMarshaller();
	        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
	        ByteArrayOutputStream bos = new ByteArrayOutputStream();	        
//	        marshaller.marshal(createRootModel(root), bos);
	        marshaller.marshal(new ObjectFactory().createRootField(root), bos);
	        String s = null;
			try {
				s = new String(bos.toByteArray(), "UTF-8");
		        System.out.println(s);
		        Unmarshaller unmarshaller = jc.createUnmarshaller();
		        ByteArrayInputStream is = new ByteArrayInputStream(s.getBytes("UTF-8"));
				Root_FIELD r = (Root_FIELD) unmarshaller.unmarshal(is);
				assert(r.getPropertyAng().equals("\u212B"));
				System.out.println("date is " + r.date);
				System.out.println("PropertyC is " + r.PC());
				System.out.println("propertyc is " + r.pc());
				System.out.println("propertyC is " + r.pC());
				System.out.println("getPropertyAng[].length is " + r.getPropertyAng().getBytes("utf-8").length);
				System.out.println("DEFVAL is " + r.DEFVAL);
				
//
//				Class<?> c = Test_JAXB_FIELD.class;
//				InputStream ris = c.getResourceAsStream("jaxb/Root_FIELD.xml");
//		        ByteArrayInputStream ris = new ByteArrayInputStream(s.getBytes("UTF-8"));

 			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			
	        System.out.println("Test_JAXB_FIELD OK");
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 
    }
}