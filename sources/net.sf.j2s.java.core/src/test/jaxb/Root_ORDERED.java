package test.jaxb;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlIDREF;
import javax.xml.bind.annotation.XmlList;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.bind.annotation.adapters.HexBinaryAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;


// adapted source: http://blog.bdoughan.com/2011/06/using-jaxbs-xmlaccessortype-to.html

@XmlSeeAlso({test.jaxb2.Obj.class, test.jaxb.Obj.class})
@XmlRootElement(namespace="root.ordered", name="RootO")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
//		"qname",
		"position",
		"iii",
		"IFArray", "IFList",
		"hm","hm2",
		"type",
		"cx",
		"list0",
		"creationDate",
	    "c",
	    "b",
	    "a",
	    "id",
//	    "cxa",
	    "slist",
	    "bytes64",
	    "byteshex",
	    "ilist",
	    "Ilist",
	    "list",
	    "bi","bd",
	    "f","f2","f3","f4","f6","Ilist2","f5",
	    "extraElem", "date"
	})
public class Root_ORDERED {

	
	public Root_ORDERED() {
	  // for unmarshalling only	
	}
	
	public Root_ORDERED(String name) {

		// set up all the fields for testing
		
		ok = "ok";

		id = "id#1";

		hm.put("testing", "TESTING");
		hm.put("null", null); 
		hm.put("map",  new SomewhatComplex("map"));
		
		slist = new String[] {"a", "b" , null};
		
		ilist = new int[] {1,2,3};
		
		Ilist = new Integer[] {null, Integer.valueOf(2), null};
		
		Ilist2 = new Integer[] {null, Integer.valueOf(2), null};
		
		f5 = new Object[] { 1.25f, new test.jaxb.Obj() };

		position = new BigInteger("12345678910");
		
		IFArray = new Object[] {Integer.valueOf(2) , Float.valueOf(2.1f) };

		IFList = new ArrayList<>();
		IFList.add(Integer.valueOf(2));
		IFList.add(Float.valueOf(2.1f));
		id = name;
		type = CustomerType.NEW_CUSTOMER;	
		list0 = new ArrayList<Object>();
		list0.add(new SomewhatComplex("List"));
		list0.add(new String("list0[1]"));
		list0.add(new String("list0[2]"));
		bi = new BigInteger("1234567890123456789012345");
		f = new float[] {1.2f};
		list.add("TESTING");
		list.add("null"); 
		list.add(new SomewhatComplex("idList#1"));
		list.add(Boolean.TRUE);
		list.add(Byte.valueOf((byte)1));
		list.add(Short.valueOf((short)2));
		list.add(Integer.valueOf(3));
		list.add(Long.valueOf(4));
		list.add(Float.valueOf(6.6f));
		list.add(Double.valueOf(8.9));
		list.add(new BigInteger("12345678910111213141516")); 
		// fails in JAXB-Java: list.add(new int[] {3, 5, 7, 9});
		
		hm2 = new HashMap<>();
		hm2.put(Integer.valueOf(-1), "V1");
		hm2.put(Integer.valueOf(-2), null); 
		hm2.put(Integer.valueOf(-3), "V3");
		
		extraAttr = "more&amp;";
		extraElem = "more&amp;";
		bd = new BigDecimal("123.456");	
		f2 = 1.2f;
		f3 = new Float[] {1.2f};
		f4 = 1.3f;
		f6 = new Integer(3);
		byteshex = new byte[] {(byte) 100, (byte) 101};
		bytes64 = new byte[] {(byte) 100, (byte) 101};
		a = "a";
		b = "b";
		c = "c";
		
		date = new Date("10/20/2018");
		
		cx = new SomewhatComplex("#??");
		((SomewhatComplex) cx).bytes[0] = 99;

		setCreationDate(now());
		
		// TODO
		//qname = new QName("namespace", "name", "prefix");
		//     <ns4:qname xmlns:prefix="namespace">prefix:name</ns4:qname>

	}

	private static XMLGregorianCalendar now() {
		try {
			return DatatypeFactory.newInstance().newXMLGregorianCalendar(new GregorianCalendar());
		} catch (DatatypeConfigurationException e) {
			return null;
		}
	}

	public void validate() {
		System.out.println("Root_ORDERED validating...");
		System.out.println(getCreationDate());
//		assert(qname.getPrefix().equals("prefix"));
//		assert(qname.getLocalPart().equals("name"));
//		assert(qname.getNamespaceURI().equals("namespace"));
		assert(id.equals("test"));
		assert(position.toString().equals("12345678910"));
		assert(extraAttr.equals("more&amp;"));
		assert(extraElem.equals("more&amp;"));
		assert(bd.equals(new BigDecimal("123.456")));	
		assert(f2 == 1.2f);
		assert(f3[0] == 1.2f);
		assert(f4 == 1.3f);
		assert(f5[0].equals(Float.valueOf(1.25f)));
		assert(f6.equals(new Integer(3)));
		assert(byteshex[0] == 100 && byteshex[1] == 101);
		assert(bytes64[0] == 100 && bytes64[1] == 101);
		assert(a.equals("a"));
		assert(b.equals("b"));
		assert(c.equals("c"));
		assert(hm.containsKey("null") && hm.get("null") == null);

		assert(getCreationDate().toString().indexOf("T") < 0 && getCreationDate().toString().indexOf("0") > 0);
		assert(((test.jaxb.Obj) f5[1]).obj1.equals("jaxb#Obj1"));
		// note that if @xmlIDREF is indicated, then cx will be null
		// that is, never set when unmarshalling
		assert(((SomewhatComplex) cx).bytes[0] == 99);
		assert(((SomewhatComplex) cx).id.equals("id##??"));
		assert(type == Root_ORDERED.CustomerType.NEW_CUSTOMER);
		assert(IFArray[0].equals(Integer.valueOf(2)) && IFArray[1].equals(Float.valueOf(2.1f)));
		assert(IFList.get(0).equals(Integer.valueOf(2)) && IFList.get(1).equals(Float.valueOf(2.1f)));

		
		System.out.println(date);
		assert(date.equals(new Date("10/20/2018")));
	}

//	private QName qname;
	
	@XmlElement
    @XmlSchemaType(name = "xs:unsignedLong") // ignored by JAXB?
    private BigInteger position;

	@XmlElements({
			@XmlElement(name="int", type = Integer.class),
			@XmlElement(name="float", type = Float.class)
		})
	public Object[] IFArray;

	@XmlElements({
		@XmlElement(name="intlist", type = Integer.class),
		@XmlElement(name="floatlist", type = Float.class)
	})
	public List<Object> IFList;

	@XmlElement(type=Integer.class, namespace="testing",name="what", nillable=true)
	private Object iii = Integer.valueOf(3);

	@XmlElementWrapper(name="hm1")
	public HashMap<String, Object> hm = new HashMap<>();

	@XmlElementWrapper(name="hm2")
	public HashMap<Object, String> hm2;

	

    List<Object> list0; 
	
	BigInteger bi;
	
	BigDecimal bd;
	
	float[] f; 

	float f2;

	Float[] f3; 

	Float f4;

	Object f6;
	
	
	@XmlAccessorType(XmlAccessType.FIELD)
	@XmlType(name="MoreComplex",namespace="st.Olaf")
		public static class SomewhatComplex {
	

		public SomewhatComplex() {
			System.out.println("new somewhatcomplex");
			
		}
		
		public SomewhatComplex(String id) {
			this.id = "id#" + id;
			ca = "c\"<>b& \u212B";
			cb = "c\"<>b& \u212B";			
			bytes = new byte[] {(byte) 100, (byte) 101};
		}
	
		@XmlID
		@XmlElement
		public String id = "id#SC1";
		
		//@XmlValue
		@XmlElement
		String ca; 
	
		@XmlAttribute(namespace="www.jalview.org2")
		String cb;

		@XmlAttribute
		public byte[] bytes;

	}

	private final static String x = "date";
	
    @XmlElement(namespace="")
    @XmlSchemaType(name=x)
    protected XMLGregorianCalendar creationDate;

    @XmlAttribute
    private Date date;

    @XmlElementWrapper(name="list1")
	public List<Object> list = new ArrayList<>();

	// does not work in JAXB: @XmlSchemaType(name="hexBinary")
	@XmlJavaTypeAdapter(HexBinaryAdapter.class)
	@XmlAttribute
	byte[] byteshex;

	@XmlAttribute
	@XmlSchemaType(name="base64Binary")
	byte[] bytes64;

	//@XmlIDREF
	//@XmlElement(namespace="www.jalview.org3")
	public SomewhatComplex cx;
	
//
//	@XmlElement(namespace="www.jalview.org3")
//	public SomewhatComplex[] cxa = new SomewhatComplex[] { new SomewhatComplex("1"),  new SomewhatComplex("2")};

	final static String strMore = "more";

	@XmlAttribute(name=strMore+"Attr")
	private String extraAttr;

	@XmlElement(name=strMore+"Elem")
	private String extraElem;

	@XmlAttribute(name="nil")
	private String nil = null;
	
	@XmlElement
	private String a,b,c;
	
	@XmlAttribute
	private String ok = "ok";

	@XmlID
	@XmlAttribute
	public String id = "id#1";
	
//	@XmlElementWrapper(name="slists")
	@XmlElement(name="s",nillable=true)
	Object[] slist;
	
	@XmlList
	@XmlElement(name="i")
	int[] ilist;
	
	@XmlList
	@XmlElement(name="I",nillable=true)
	Integer[] Ilist;
	
	@XmlElement(name="I2",nillable=true)
	Integer[] Ilist2;
	
	@XmlElement
	public
	Object[] f5;

    /**
     * Gets the value of the creationDate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getCreationDate() {
        return creationDate;
    }

    /**
     * Sets the value of the creationDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setCreationDate(XMLGregorianCalendar value) {
        this.creationDate = value;
    }

    @XmlAttribute
	public CustomerType type; 
    
    @XmlType(name = "st")
    static class St {
    	
    }
    
    @XmlEnum(String.class)
    public enum CustomerType { 
    	@XmlEnumValue("promo")
    	PROMO_CUSTOMER, 
    	@XmlEnumValue("cust")
    	NEW_CUSTOMER, 
    	@XmlEnumValue("vip")
    	VIP, 
    	@XmlEnumValue("norm")
    	NORMAL
    	}

}