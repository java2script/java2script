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

class JSJAXBClass implements Cloneable {

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

	private String unmarshallerDefaultNamespace;
	
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
	
	private Map<String, JSJAXBField> marshallerFieldMap = new Hashtable<String, JSJAXBField>();

	/**
	 * holds the enum name/value pairs for marshaller and unmarshaller
	 */
	Map<Object, Object> enumMap;
	String enumClassType;
	
	JSJAXBField xmlValueField;
	final Map<String, JSJAXBField> unmarshallerFieldMap = new Hashtable<String, JSJAXBField>();

	Class<?> javaClass; // for JavaScript debugging
	private Object javaObject;
	List<String> seeAlso;
	

	transient Object tagObject;
	private String createName;
	private boolean isInnerClass;
	
	private static String packageNamespace;
	private static String packageAccessorType;
	
	private final static Map<String, String> marshallerNamespacePrefixes = new Hashtable<String, String>();
	private final static Map<String, XmlAdapter> adapterMap = new HashMap<String, XmlAdapter>();

	static void clearStatics() {
		prefixIndex = 1;
		packageNamespace = null;
		packageAccessorType = null;
		marshallerNamespacePrefixes.clear();
		adapterMap.clear();
	}

	private static void getDefaultNamespaceFromPackageInfo(Class<?> javaClass) {
		if (packageNamespace != null)
			return;
		packageNamespace = "";
		InputStream is = javaClass.getResourceAsStream("_$.js");
		if (is != null) {
		  String data = Rdr.streamToUTF8String(new BufferedInputStream(is));
		  data = PT.getQuotedAttribute(data, "namespace");
		  if (data != null)
			  packageNamespace = data;
		}
	}

	JSJAXBClass(Class<?> javaClass, Object javaObject, boolean isXmlIDREF, boolean isMarshaller, QName qname) {
		this.isMarshaller = isMarshaller;
		this.javaClass = javaClass;
		isInnerClass = /** @j2sNative !!javaClass.$clazz$.__CLASS_NAME$__ || */false;
		this.javaObject = javaObject;
		this.qname = qname; // from JAXBElement constructor
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
		getDefaultNamespaceFromPackageInfo(javaClass);
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
		boolean isSuperclass = (fields.size() > 0);
		String lastClassName = null;
		for (int i = 0; i < n; i++) {
			Object[][] adata = jsdata[i];
			if (i == 0) {
				if (isSuperclass) {
					// TODO -- append to the first all missing superclass flags?
					// looking specifically for accessortype. Only if not present already.
					continue;
				} else {
					// specify accessor type
				}
			}
			if (adata[0][1].equals("."))
				adata[0][1] = lastClassName;
			else
				lastClassName = (String) adata[0][1];
			JSJAXBField field = new JSJAXBField(this, adata, clazz, fields.size(), propOrder);
			if (i == 0 || field.javaName != null)
				addField(field);
		}
//		if (isMarshaller)
//			processPropOrder(javaObject);
		return this;
	}

	public void addSeeAlso(String... javaClassName) {
		if (seeAlso == null)
			seeAlso = new ArrayList<>();
		for (int i = 0; i < javaClassName.length; i++)
		seeAlso.add(javaClassName[i]);
	}

	private void addField(JSJAXBField field) {
		fields.add(field);
		if (isMarshaller && field.javaName != null)
			marshallerFieldMap.put(field.javaName, field);
	}

	JSJAXBField getFieldFromJavaNameForMarshaller(String javaName) {
		return marshallerFieldMap.get(javaName);
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
		String prefix = (namespace.length() == 0 ? "" : marshallerNamespacePrefixes.get(namespace));
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

	void setUnmarshallerDefaultNamespace(String namespace) {
		if (namespace != null)
			this.unmarshallerDefaultNamespace = namespace;		
	}

	String getUnmarshallerDefaultNamespace() {
		return unmarshallerDefaultNamespace;
	}

	void setQName(QName qualifiedName) {
		if (qname != null && qname.getPrefix().length() > 0)
			return;
		qname = qualifiedName;
	}

	Object getJavaObject() {
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

	public JSJAXBClass clone() {
		try {
			JSJAXBClass jaxbClass = (JSJAXBClass) super.clone();
			jaxbClass.fields = new ArrayList<JSJAXBField>();
			for (int i = 0, n = fields.size(); i < n; i++) {
				jaxbClass.addField((JSJAXBField) fields.get(i).clone());
			}
			return jaxbClass;
		} catch (CloneNotSupportedException e) {
			return null;
		}
	}

	QName finalizeFieldQName(QName qName, String defaultName) {
		if (qName == null)
			qName = new QName("##default", "##default", "");
		String namespace = qName.getNamespaceURI();
		String name = qName.getLocalPart();
		if (namespace.equals("##default"))
			namespace = getDefaultNamespace();
		if (name.equals("##default"))
			name = JSJAXBClass.getXmlNameFromClassName(defaultName);
		String prefix = JSJAXBClass.getPrefixFor(namespace);
		return new QName(namespace, name, prefix);
	}

	private String getDefaultNamespace() {
		return (isInnerClass  && qualifiedTypeName != null ? qualifiedTypeName.getNamespaceURI() : packageNamespace);
	}


}
