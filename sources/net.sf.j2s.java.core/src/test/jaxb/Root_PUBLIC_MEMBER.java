package test.jaxb;

import java.util.Date;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

// adapted source: http://blog.bdoughan.com/2011/06/using-jaxbs-xmlaccessortype-to.html

// "Root" here would conflict with Root_FIELD 
@XmlRootElement(name = "RootP", namespace = "www.jalview.org")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
//@XmlType(propOrder = {
//	    "D",
//	    "a",
//	    "date",
//	    "propertyC",
//	    "b",
//	    "c",
//	    "publ"
//	})
public class Root_PUBLIC_MEMBER {

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

	private Root_FIELD r1;
	// ignored - private

	String Ang = "\u212B";
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

	private String a;
	// ignored as private
	public String getA() {
	//  <a>getA</a>
		return "getA";
	}
	public void setA(String a) {
		this.a = "setA";
	}

	public String b = "b";
//  <b>b</b>
   String getPropertyB() {
// ignored -- not public
	   System.out.println("getPropertyB()");
		return "getPropertyB:" + b;
	}
	public void setPropertyB(String b) {
		   System.out.println("setPropertyB()");
		this.b = b;
	}

	private String c = "c0";
//  <c>c</c>
	private String getC() {
		// ignored - private
		return "getC";
	}
	private void setC(String c) {
		this.c = "setC";
	}

	@XmlTransient
	public String d = "d_";
//  <d>getD</d>
	private String getD() {
		return "getD:" + d;
	}
	@XmlElement
	public void setD(String d) {
		// ignored -- getD is not public
		System.out.println("setD:" + d);
		this.d = "setD";
	}

	public Date date = new Date();
//<date>2018-09-30T05:44:03.162-05:00</date>

///// capitalization tests /////
	
	private String PropertyCpriv = "PropertyCpriv";
	// ignored for PUBLIC_MEMBER
	
	private String PropertyC = "PC0";
	// ignored for PUBLIC_MEMBER
	
	@XmlTransient
	private String propertyC = "pC0";
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
	private String propertyc = "pc0";
//	public String getpropertyc() {
//	// (at end)
//    // <propertyc>getpropertyc</propertyc>
//		return "getpropertyc:" + propertyc;
//	}
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