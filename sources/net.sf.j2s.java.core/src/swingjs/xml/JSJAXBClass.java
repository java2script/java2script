package swingjs.xml;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.xml.namespace.QName;

class JSJAXBClass {

//		C$.__ANN__ = [
//		              [null,'XmlRootElement','@XmlRootElement(name="RootOrdered",namespace="www.jalview.org")']
//		             ,[null,'XmlAccessorType','@XmlAccessorType(XmlAccessType.FIELD)']
//		             ,[null,'XmlType','@XmlType(propOrder={"c","b","a"})']
//		            ];

	final static int TYPE_PUBLIC_MEMBER = 0;
	final static int TYPE_FIELD = 1;
	final static int TYPE_PROPERTY = 2;

	int accessorType = TYPE_PUBLIC_MEMBER;

	List<String> propOrder = new ArrayList<String>();
	List<JSJAXBField> fields = new ArrayList<JSJAXBField>();
	QName qname = new QName("","","");
	private Map<String, JSJAXBField> fieldMap = new Hashtable<String, JSJAXBField>();

	boolean isAnonymous;
	public JSJAXBField field;
    QName qualifiedTypeName;

	@SuppressWarnings("unused")
	public JSJAXBClass(Class<?> javaClass, Object javaObject) {
		boolean isTop = true;
		while (javaClass != null) {

//			C$.__ANN__ = [[null,'XmlAccessorType',['@XmlAccessorType(XmlAccessType.FIELD)','@XmlType(name="MoreComplex")']],
//			              ['ca','String',['@XmlValue']],
//			              ['cb','String',['@XmlAttribute(namespace="www.jalview.org2")']],
//			              ['bytes','[array]',['@XmlAttribute']]];

			Object clazz = (/** @j2sNative javaClass.$clazz$ || */
			null);
			if (clazz == null)
				break;
			Object[][][] jsdata = (/** @j2sNative clazz.__ANN__ || */
			null);
			String className = (/** @j2sNative clazz.__CLASS$NAME__ || clazz.__CLASS_NAME__ || */
			null);

			if (!isTop) {
				className = null;
			}
			isTop = false;
			if (jsdata != null)
				addTypeData(jsdata, className, javaObject);
			javaClass = javaClass.getSuperclass();
		}

	}

	public JSJAXBClass addTypeData(Object[][][] jsdata, String className, Object javaObject) {
		for (int i = 0; i < jsdata.length; i++) {
			JSJAXBField a = new JSJAXBField(this, jsdata[i], javaObject, fields.size(), propOrder);
			if (a.javaName == null) {
				if (qname.getLocalPart().length() == 0)
					qname = new QName(qname.getNamespaceURI(), getXmlNameFromClassName(className), qname.getPrefix());				
				isAnonymous = (qualifiedTypeName.getLocalPart().length() == 0);
			} else {
				addField(a);
			}
		}

		for (int i = propOrder.size(); --i >= 0;) {
			String prop = propOrder.get(i);
			JSJAXBField a = fieldMap.get(prop);
			// annotations may only show up in @XmlType:propOrder
			if (a == null) {
				addField(
						new JSJAXBField(this, new Object[][] { 
							new Object[] {prop, null, null, null}, 
							new Object[] { "@XmlElement" } },
								javaObject, fields.size(), null));
			}
		}
		return this;
	}

	private void addField(JSJAXBField a) {
		fields.add(a);
		fieldMap.put(a.javaName, a);
	}

	JSJAXBField getFieldFromJavaName(String javaName) {
		return fieldMap.get(javaName);
	}

	static String getXmlNameFromClassName(String className) {
		className = className.substring(className.lastIndexOf(".") + 1);
		if (className.indexOf("$") > 1) // inner static class
			className = className.substring(className.indexOf("$") + 1);
		return className;
	}

	Map<String, JSJAXBField> bindingMap = new Hashtable<String, JSJAXBField>();
	public void prepareForUnmarshalling() {
		for (int i = 0; i < fields.size(); i++) {
			JSJAXBField a = fields.get(i);
			QName q = a.qualifiedWrapName == null ? a.qualifiedName : a.qualifiedWrapName;
			String name = q.getNamespaceURI();
			if (name.length() == 0)
				name = q.getLocalPart();
			else
				name += ":" + q.getLocalPart();
			bindingMap.put(name, a);
		}
		// TODO Auto-generated method stub
		
	}

	public JSJAXBField getFieldFromQName(String qName) {
		return bindingMap.get(qName);
	}

}
