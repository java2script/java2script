package test;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import test.jaxb.Employee;

public class Test_JAXB extends Test_ {

	public static void main(String[] args) {
	    JAXBContext contextObj;
		try {
			contextObj = JAXBContext.newInstance(Employee.class);
		    Marshaller marshallerObj = contextObj.createMarshaller();  
		    marshallerObj.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		  
		    Employee emp1=new Employee(1,"Vimal Jaiswal",50000);  

		    marshallerObj.marshal(emp1, System.out);  
			System.out.println("Test_JAXB OK");
		   
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
	}

}