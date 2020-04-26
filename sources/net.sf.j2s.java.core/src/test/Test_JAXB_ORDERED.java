package test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.FactoryConfigurationError;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

import test.jaxb.Root_ORDERED;

/**
 * tests:
 * 
 *  propOrder
 *  
 *  JAXBContext.newInstance(packageName);
 *  
 *  subclasses
 *  
 *  name={expression}
 *  
 *  arrays
 *  
 *  dates
 *  
 *  
 *  
 *  
 * @author hansonr
 *
 */
public class Test_JAXB_ORDERED extends Test_ {

	public static void main(String[] args) {
		// test read/write of own type
		readWrite(null, null);
		try {
			boolean isJS = /**@j2sNative true || */false;
			// test read/write of xml written by Java if JS; JS if Java
			String prefix = (isJS ? "/" : "src/");
			String fjs = prefix +"test/jaxb_ordered_from_JS.xml";
			String fjava = prefix + "test/jaxb_ordered_from_Java.xml";
			String outfile = isJS ? fjs : fjava;
			String infile = isJS? fjava : fjs;
			FileOutputStream fos = new FileOutputStream(outfile);
			readWrite(null, fos);
			fos.close();
			FileInputStream fis = new FileInputStream(infile);
			readWrite(fis, null);
			System.out.println("File written to " + outfile);
			System.out.println("File read from " + infile);
			fis.close();
			System.out.println("Test_JAXB_ORDERED OK");
		} catch (IOException e) {
			e.printStackTrace();
			assert(false);
		}		
	}

	/**
	 * read from a file OR write to a file
	 * 
	 * @param in
	 * @param out ignored if in is not null
	 */
	private static void readWrite(InputStream in, OutputStream out) {
		try {
			JAXBContext jc = JAXBContext.newInstance("test.jaxb");
			if (in == null) {
				Root_ORDERED root = new Root_ORDERED("test");
				Marshaller marshaller = jc.createMarshaller();
				marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
				ByteArrayOutputStream bos = new ByteArrayOutputStream();
				marshaller.marshal(root, bos);
				byte[] bytes = bos.toByteArray();
				if (out != null)
					out.write(bos.toByteArray());
				String s = new String(bytes, "UTF-8");
				System.out.println(s);
				in = new ByteArrayInputStream(s.getBytes("UTF-8"));
			}
			XMLStreamReader streamReader;
			streamReader = XMLInputFactory.newInstance().createXMLStreamReader(in);
			Unmarshaller unmarshaller = jc.createUnmarshaller();
			Root_ORDERED r = (Root_ORDERED) unmarshaller.unmarshal(streamReader, Root_ORDERED.class).getValue();
			r.validate();
		} catch (JAXBException | XMLStreamException | FactoryConfigurationError | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}