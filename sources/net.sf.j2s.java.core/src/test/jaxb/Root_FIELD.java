package test.jaxb;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

// adapted source: http://blog.bdoughan.com/2011/06/using-jaxbs-xmlaccessortype-to.html

// XmlRootElement is used by the unmarshaller to find the correct class
@XmlRootElement(namespace="root.field", name="RootF")
// XmlType overrides this 
@XmlType(namespace="root.field", name="RootF")
@XmlAccessorType(XmlAccessType.FIELD)
public class Root_FIELD extends ROOT_super {

	public static boolean isCopy = false;
	static final String x = "Date";

	public Root_FIELD() {
	}

	public Root_FIELD(boolean addR1) {
		if (addR1)
			r1 = new Root_FIELD();
		date = new Date();

		lst.add("list1");
		lst.add(null);
		lst.add(new String[2]);

		hm.put("testing", "TESTING");
		hm.put("null", null);
		if (!isCopy) {
			isCopy = true;
//			r1 = new Root_FIELD();
		}
		
		NILLt = "nillable-true";


		i2 = new Integer[2];

		ia = new int[2];
		sa = new String[] { null, "s", "a", null };

		saa = new String[][] { null, new String[] { "s", "a" }, null };

		saaa = new String[][][] { null,
				new String[][] { new String[] { "s", "a" }, new String[] { "t", "b" } }, null };

		Ang = "\u212B";
		
		iii = new Integer(2);
	}

	public void validate() {
//		assert(getPropertyAng().equals("\u212B"));
		assert (iii.equals(Integer.valueOf(2)));
		System.out.println("date is " + date);
		System.out.println(PC());
		assert (PC().equals("PropertyC0"));
		System.out.println(pc());
		assert (pc().equals("getPropertyc:propertyc01"));
		System.out.println(pC());
		assert (pC().equals("getproPERtyC:propertyC01"));
		System.out.println("DEFVAL=" + DEFVAL);
		assert (DEFVAL.equals("default-value"));

		try {
			assert (getPropertyAng().getBytes("utf-8").length == 3);
		} catch (UnsupportedEncodingException e) {
		}
	}

	public void toC(String c) {
		this.c = c;
	}

	public String C() {
		return c;
	}
	
	public String PC() {
		return PropertyC;
	}

	public String pc() {
		return propertyc;
	}

	public String pC() {
		return propertyC;
	}

////////////////////////////////////////////////////

	public String s; 
	// ignored -- not initialized

	@XmlTransient
	private String D;
	// ignored - XmlTransient

	private transient int t = 3;
	// ignored - transient

	public Root_FIELD r1;
	// if initialized: <r1 pi1A="0" pi2A="0" pi3A="3">....</r1>


///// nillable /////
	
	@XmlElement(nillable=true)
	private String NILL;
    //     <NILL xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>

	@XmlElement(nillable=true)
	private String NILLt;
    //         <NILLt>nillable-true</NILLt>

	// DOES NOT WORK since our marshaller will not use "/>"
	@XmlElement(defaultValue="default-value") 
	public String DEFVAL = "defval";
	
///// arrays /////

	public Root_FIELD[] r2;
//    <r2 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
//    <r2 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>

	public Integer[] i2;
//    <i2 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
//    <i2 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>

	public int[] ia;
//    <ia>0</ia>
//    <ia>0</ia>

	public String[] sa;
//  <sa xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
//  <sa>s</sa>
//  <sa>a</sa>
//  <sa xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>

	public String[][] saa;
//  <saa xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
//  <saa>
//      <item>s</item>
//      <item>a</item>
//  </saa>
//  <saa xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>

	public String[][][] saaa;
//  <saaa xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
//  <saaa>
//      <item>
//          <item>s</item>
//          <item>a</item>
//      </item>
//      <item>
//          <item>t</item>
//          <item>b</item>
//      </item>
//  </saaa>
//  <saaa xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>

///// HashMap /////

	public HashMap<String, String> hm = new HashMap<>();
	// <hm>
	// <entry>
	// <key xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	// xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">null</key>
	// </entry>
	// <entry>
	// <key xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	// xmlns:xs="http://www.w3.org/2001/XMLSchema"
	// xsi:type="xs:string">testing</key>
	// <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	// xmlns:xs="http://www.w3.org/2001/XMLSchema"
	// xsi:type="xs:string">TESTING</value>
	// </entry>
	// </hm>

///// List /////

	public List<Object> lst = new ArrayList<>();
//    <lst xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">list1</lst>
//    <lst xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
//    <lst xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns4="http://jaxb.dev.java.net/array" xsi:type="ns4:stringArray">
//        <item xsi:nil="true"/>
//        <item xsi:nil="true"/>
//    </lst>

	public String Ang;
	// <Ang>[3 bytes here]</Ang>
	public String getPropertyAng() {
		return Ang;
	}
	public void setPropertyAng(String a) {
		Ang = a;
	}


	public int pi1, pi2, pi3 = 3;
//  <pi1>0</pi1>
//  <pi2>0</pi2>
//  <pi3>3</pi3>

	@XmlAttribute
	public int pi1a, pi2a, pi3a = 3;
//<ns2:Root xmlns:ns2="www.jalview.org" pi1A="0" pi2A="0" pi3A="3">

	public boolean b1;
//     <b1>false</b1>

	public String a;
//  <a>a</a>
	public String getA() {
	// ignored for FIELD
		return "getA";
	}
	public void setA(String a) {
		this.a = "getA";
	}

	public String b;
//  <b>b</b>
	private String getPropertyB() {
// ignored -- private
		return "getPropertyB";
	}
	public void setPropertyB(String b) {
		this.b = b;
	}

	private String c = "c0";
//  <c>c</c>
	private String getC() {
		// ignored for FIELD
		return "getC";
	}

	private void setC(String c) {
		this.c = "setC";
	}

	private String d = "d_";
//  <d>d_</d>
	public String getD() {
		return "getD";
	}

	public void setD(String d) {
		D = "setD";
	}

	public Date date;
//<date>2018-09-30T05:44:03.162-05:00</date>

///// capitalization tests /////
	
	private String PropertyCpriv = "PropertyCpriv";
	//     <PropertyCpriv>PropertyCpriv</PropertyCpriv>
		
	private String PropertyC = "PropertyC0";
    //    <PropertyC>PropertyC0</PropertyC>
	
	
	@XmlElement(type=Integer.class, namespace="testing",name="what", nillable=true)
	private Object iii;

	@XmlTransient
	private String propertyC = "propertyC0";
	@XmlElement
	public String getproPERtyC() {
//	    <proPERtyC>?</proPERtyC>
// (at end)
		return "getproPERtyC:" + propertyC + "1";
	}
	public void setproPERtyC(String c) {
		propertyC = c;
		System.out.println("setProPERtyC:" + c);
	}
	public String getPropertyC() {
// ignored because other has @XmlElement
		return "getPropertyC:" + propertyC + "1";
	}
	public void setPropertyC(String c) {
		propertyC = c;
		System.out.println("setPropertyC:" + c);
	}

	@XmlTransient
	private String propertyc = "propertyc0";
	public String getpropertyc() {
	// (at end)
    // <propertyc>getpropertyc</propertyc>
		return "getpropertyc:" + propertyc;
	}
	public void setpropertyc(String c) {
		propertyc = c;
		System.out.println("setpropertyc:" + c);
	}
	@XmlElement
	public String getPropertyc() {
		return "getPropertyc:" + propertyc + 1;
	}
	public void setPropertyc(String c) {
		propertyc = c;
		System.out.println("setPropertyc:" + c);
	}
	

	
///// no field, just get/is/Set
	// after fields, before properties
    // must be flagged with @XmlElement

	@XmlElement
	public boolean isB2() {
		//         <b2>true</b2>
		// after fields, before properties
		return true;
	}
	public void setB2(boolean b) {
	}

	@XmlElement
	public boolean getB3() {
		//         <b2>true</b2>
		// after fields, before properties
		return true;
	}
	public void setB3(boolean b) {
	}

	@XmlElement
	public String getAToBe() {
		//  <AToBe>getAtoBe</AToBe>
		return "getAtoBe";
	}
	public void setAToBe(String a) {
		this.a = a;
	}
	@XmlElement
	public String getPropertyAToBe() {
    //  <propertyAToBe>getPropertyAtoB</propertyAToBe>
		return "getPropertyAtoB";
	}
	public void setPropertyAToBe(String a) {
		this.a = a;
	}

	
}