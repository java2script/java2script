package swingjs.xml;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.namespace.QName;

import javajs.util.PT;
import javajs.util.Rdr;
import swingjs.api.Interface;

class JSJAXBClass {

//	C$.__ANN__ = [[[null,'test.jaxb.Root_ORDERED.SomewhatComplex'],['@XmlAccessorType(XmlAccessType.FIELD)','@XmlType(name="MoreComplex",namespace="st.Olaf")']],
//	              [['id','String'],['@XmlID','@XmlElement']],
//	              [['ca','String'],['@XmlElement']],
//	              [['cb','String'],['@XmlAttribute(namespace="www.jalview.org2")']],
//	              [['bytes','byte[]'],['@XmlAttribute']]];
//	            })()

	final static int TYPE_NONE = 0;
	final static int TYPE_FIELD = 1;
	final static int TYPE_PUBLIC_MEMBER = 2;
	final static int TYPE_PROPERTY = 3;

	/**
	 * This class's accessorType. We need explicit
	 * propOrder or XmlAttribute or XmlElement.
	 * 
	 * This field is not used, because all this is determined
	 * during transpilation. BUT...
	 * Note that the Java2Script transpiler currently does not 
	 * honor package-info.java annotations for this. TODO
	 * 
	 */
	int accessorType = TYPE_PUBLIC_MEMBER;

	private boolean isMarshaller;

	private String namespace;
	
	QName qname = new QName("", "##default", "");
	QName qualifiedTypeName;

	/**
	 * for the root, null, but for fields that need unmarshalling, the field that
	 * is being filled by this unmarshalling 
	 */
	JSJAXBField tagField;

	/**
	 * from XmlType(name=""), but not used
	 */
	boolean isAnonymous; 
	
	/**
	 * XmlIDREF 
	 */
	boolean isXmlIDREF;
	JSJAXBField xmlIDField;
	
	boolean isEnum;
	
	List<String> propOrder = new ArrayList<String>();
	List<JSJAXBField> fields = new ArrayList<JSJAXBField>();
	
	private Map<String, JSJAXBField> fieldMap = new Hashtable<String, JSJAXBField>();

	/**
	 * holds the enum name/value pairs for marshaller and unmarshaller
	 */
	Map<Object, Object> enumMap;
	String enumClassType;
	
	JSJAXBField xmlValueField;
	String[] seeAlso;
	final Map<String, JSJAXBField> unmarshallerFieldMap = new Hashtable<String, JSJAXBField>();

	Class<?> javaClass; // for JavaScript debugging
	private Object javaObject;
	
	transient Object tagObject;
	
	private static String defaultNamespace;
	
	private final static Map<String, String> marshallerNamespacePrefixes = new Hashtable<String, String>();
	private final static Map<String, XmlAdapter> adapterMap = new HashMap<String, XmlAdapter>();

	static void clearStatics() {
		prefixIndex = 1;
		defaultNamespace = null;
		marshallerNamespacePrefixes.clear();
		adapterMap.clear();
	}

	JSJAXBClass(Class<?> javaClass, Object javaObject, boolean isXmlIDREF, boolean isMarshaller) {
		this.isMarshaller = isMarshaller;
		this.javaClass = javaClass;
		this.javaObject = javaObject;
		checkC$__ANN__(this, javaClass, javaObject != null || javaClass.isEnum(), isXmlIDREF);
		this.isXmlIDREF = isXmlIDREF;
	}

	/**
	 * 
	 * @param jsjaxbClass null to just check
	 * @param javaClass
	 * @param javaObject
	 * @return
	 */
	@SuppressWarnings("unused")
	static boolean checkC$__ANN__(JSJAXBClass jsjaxbClass, Class<?> javaClass, boolean haveJavaObject, boolean isXmlIDREF) {
		boolean isTop = true;
		while (javaClass != null) {

//			C$.__ANN__ = [[null,'XmlAccessorType',['@XmlAccessorType(XmlAccessType.FIELD)','@XmlType(name="MoreComplex")']],
//			              ['ca','String',['@XmlValue']],
//			              ['cb','String',['@XmlAttribute(namespace="www.jalview.org2")']],
//			              ['bytes','[array]',['@XmlAttribute']]];

			Object clazz = (/** @j2sNative javaClass.$clazz$ || */ null);
			if (clazz == null)
				break;
			Object[][][] jsdata = (/** @j2sNative clazz.__ANN__ || */ null);
			String className = (/** @j2sNative clazz.__CLASS$NAME__ || clazz.__CLASS_NAME__ || */ null);
			
			if (!isTop) {
				className = null;
			}
			if (jsdata != null) {
				if (jsjaxbClass == null)
					return true;
				jsjaxbClass.addTypeData(jsdata, clazz, haveJavaObject);
			}
			isTop = false;
			javaClass = javaClass.getSuperclass();
		}
		return false;
	}

	JSJAXBClass addTypeData(Object[][][] jsdata, Object clazz, boolean haveJavaObject) {
		int n = (haveJavaObject ? jsdata.length : 1);
		for (int i = fields.size() == 0 ? 0 : 1; i < n; i++) {
			JSJAXBField field = new JSJAXBField(this, jsdata[i], clazz, fields.size(), propOrder);
				addField(field);
		}
//		if (isMarshaller)
//			processPropOrder(javaObject);
		return this;
	}

//	private void processPropOrder(Object javaObject) {
//		for (int i = propOrder.size(); --i >= 0;) {
//			String prop = propOrder.get(i);
//			JSJAXBField field = fieldMap.get(prop);
//			// annotations may only show up in @XmlType:propOrder
//			if (field == null) {
//				addField(new JSJAXBField(this,
//						new Object[][] { new Object[] { prop, null, null, null }, new Object[] { "@XmlElement" } },
//						null, javaObject, fields.size(), null));
//			}
//		}		
//	}

	private void addField(JSJAXBField field) {
		fields.add(field);
		if (isMarshaller && field.javaName != null)
			fieldMap.put(field.javaName, field);
	}

	JSJAXBField getFieldFromJavaNameForMarshaller(String javaName) {
		return fieldMap.get(javaName);
	}

	static String getXmlNameFromClassName(String className) {
		className = className.substring(className.lastIndexOf(".") + 1);
		if (className.indexOf("$") > 1) // inner static class
			className = className.substring(className.indexOf("$") + 1);
		return className;
	}

	private static int prefixIndex = 1;

	/**
	 * Prepend @Xml......: to the tag name to avoid internal collision when
	 * combining all annotations into one.
	 * 
	 * @param tag
	 * @return
	 */
	static String getPrefixFor(String namespace) {
		String prefix = marshallerNamespacePrefixes.get(namespace);
		if (prefix == null)
			marshallerNamespacePrefixes.put(namespace, prefix = "ns" + (++prefixIndex));
		return prefix;
	}

	static XmlAdapter getAdapter(String adapterClass) {
		XmlAdapter adapter = adapterMap.get(adapterClass);
		if (adapter == null && !adapterMap.containsKey(adapterClass)) {
			adapterMap.put(adapterClass, adapter = (XmlAdapter) Interface.getInstance(adapterClass, false));
		}
		return adapter;
	}

	void setNamespace(String namespace) {
		if (namespace == null)
			this.namespace = namespace;		
	}

	String getNamespace() {
		return namespace;
	}

	public void setQNameFromField0(QName qualifiedName) {
		String ns = qualifiedName.getNamespaceURI();
		if (ns.length() == 0) {
			if (defaultNamespace == null) {
				defaultNamespace = getDefaultNamespaceFromObjectFactory();
			}
 			qualifiedName = new QName(defaultNamespace == null ? "" : defaultNamespace, qualifiedName.getLocalPart(), "");			
		}
		qname = qualifiedName;
	}

	private String getDefaultNamespaceFromObjectFactory() {
		defaultNamespace = "";
		
//		C$._WebServiceParameterSet_QNAME=Clazz.new_(Clazz.load('javax.xml.namespace.QName').c$$S$S,["www.jalview.org/xml/wsparamset", "WebServiceParameterSet"]);
//		C$._JalviewModel_QNAME=Clazz.new_($I$(1).c$$S$S,["www.jalview.org", "JalviewModel"]);
//		C$._JalviewUserColours_QNAME=Clazz.new_($I$(1).c$$S$S,["www.jalview.org/colours", "JalviewUserColours"]);
		InputStream is = javaClass.getResourceAsStream("ObjectFactory.js");
		if (is != null) {
		  String data = Rdr.streamToUTF8String(new BufferedInputStream(is));
		  int ipt0 = data.indexOf("_" + javaClass.getSimpleName() + "_QNAME=Clazz");
		  if (ipt0 > 0)
			  data = PT.getQuotedStringAt(data, ipt0);
		  if (data != null)
			  defaultNamespace = data;
		}
		return defaultNamespace;
	}

	public Object getJavaObject() {
		return javaObject;
	}

	public void initEnum(String data) {
		enumClassType = data;
		isEnum = true;
		enumMap = new Hashtable<Object, Object>();
	}

	static boolean hasAnnotations(Object value) {
		if (value == null)
			return false;
		try {
			// Date does not have a class?
		Class<?> cl = value.getClass();
		return (/** @j2sNative (value.$clazz$ ? !!value.$clazz$.__ANN__ : cl.$clazz$ ? !!cl.$clazz$.__ANN__ : 0) || */false);
		} catch (Throwable t) {
			return false;
		}
	}

}
