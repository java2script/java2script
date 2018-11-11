package test;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
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

import javajs.util.Rdr;
import test.jaxb.Root_NONE;

/**
 * see notes in jaxb/Root_NONE.java
 * 
 * @author hansonr
 *
 */
@XmlRegistry
public class Test_JAXB_NONE extends Test_ {

	static {
		System.out.println("te\n\r".split("\\s").length);
	}
	
	public static void main(String[] args) {
        JAXBContext jc;
		try {
			jc = JAXBContext.newInstance(Root_NONE.class);
			 
	        Root_NONE root = new Root_NONE("test");
	        root.setPropertyAng("?");
			System.out.println("getPropertyC is " + root.getproPERtyC());
	        Marshaller marshaller = jc.createMarshaller();
	        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
	        ByteArrayOutputStream bos = new ByteArrayOutputStream();	        
	        marshaller.marshal(root, bos);
	        String s = null;
			try {
				s = new String(bos.toByteArray(), "UTF-8");
		        System.out.println(s);		       
		        
		        Unmarshaller unmarshaller = jc.createUnmarshaller();
		        
		//		Class<?> c = Test_JAXB_NONE.class;
//				InputStream ris = c.getResourceAsStream("jaxb/Root_NONE.xml");
	//			s = Rdr.streamToUTF8String(new BufferedInputStream(ris));
		        //ByteArrayInputStream ris = new ByteArrayInputStream(s.getBytes("UTF-8"));

		        System.out.println(s);		       
		        
		        ByteArrayInputStream is = new ByteArrayInputStream(s.getBytes("UTF-8"));
		        
		        
		        
		        
				Root_NONE r = (Root_NONE) unmarshaller.unmarshal(is);
				assert(r.getPropertyAng().equals("?"));
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