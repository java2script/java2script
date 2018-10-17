package swingjs.xml;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.namespace.QName;

import swingjs.api.Interface;
import swingjs.api.js.DOMNode;

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

	JSJAXBField valueField;

	@SuppressWarnings("unused")
	public JSJAXBClass(Class<?> javaClass, Object javaObject) {
		checkC$__ANN__(this, javaClass, javaObject);
	}

	/**
	 * 
	 * @param jsjaxbClass null to just check
	 * @param javaClass
	 * @param javaObject
	 * @return
	 */
	private static boolean checkC$__ANN__(JSJAXBClass jsjaxbClass, Class<?> javaClass, Object javaObject) {
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
			if (jsdata != null) {
				if (jsjaxbClass == null)
					return true;
				jsjaxbClass.addTypeData(jsdata, className, javaObject);
			}
			javaClass = javaClass.getSuperclass();
		}
		return false;
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
	//	private static boolean hasNull(Object[] list) {
	//		for (int i = list.length; --i >= 0;)
	//			if (list[i] == null)
	//				return true;
	//		return false;
	//	}
	//
	//	private static boolean hasNull(List<?> list) {
	//		for (int i = list.size(); --i >= 0;)
	//			if (list.get(i) == null)
	//				return true;
	//		return false;
	//	}
	//
	
	static Map<String, XmlAdapter> adapterMap = new HashMap<String, XmlAdapter>();
	
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
	}

	JSJAXBField getFieldFromQName(String qName) {
		return bindingMap.get(qName);
	}

	boolean hasElements() {
		for (int i = 0, n = fields.size(); i < n; i++)
			if (!fields.get(i).isAttribute)
				return true;
		return false;
	}

	final static Map<String, Boolean> classMap = new Hashtable<String,Boolean>();

	static boolean isSimple(String javaClassName) {
		Boolean isSimple = true;
		try {
			if (classMap.containsKey(javaClassName))
				return classMap.get(javaClassName).booleanValue();
			isSimple = !(checkC$__ANN__(null, Class.forName(javaClassName), null));
		} catch (ClassNotFoundException e) {
		}
		classMap.put(javaClassName, Boolean.valueOf(isSimple));
		return isSimple;
	}

	public static Map<String, JSJAXBClass> knownClasses = new Hashtable<>();
	
	public static JSJAXBClass newInstance(Class<?> javaClass, Object javaObject) {
		String name = javaClass.getCanonicalName();
		JSJAXBClass jjc = knownClasses.get(name);
		if (jjc == null) {
			jjc = new JSJAXBClass(javaClass, javaObject);
			knownClasses.put(name, jjc);
			return jjc;
		}
		jjc.clear(javaObject);
		return jjc;
	}

	private void clear(Object javaObject) {
		for (int i = fields.size(); --i >= 0;) {
			fields.get(i).clear(javaObject);
		}
	}

	static XmlAdapter getAdapter(String adapterClass) {
		XmlAdapter adapter = adapterMap.get(adapterClass);
		if (adapter == null && !adapterMap.containsKey(adapterClass)) {
			adapterMap.put(adapterClass, adapter = (XmlAdapter) Interface.getInstance(adapterClass, false));
		}
		return adapter;
	}
	

}
