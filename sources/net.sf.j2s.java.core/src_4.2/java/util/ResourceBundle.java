/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package java.util;

/**
*
* Resource bundles contain locale-specific objects.
* When your program needs a locale-specific resource,
* a <code>String</code> for example, your program can load it
* from the resource bundle that is appropriate for the
* current user's locale. In this way, you can write
* program code that is largely independent of the user's
* locale isolating most, if not all, of the locale-specific
* information in resource bundles.
*
* <p>
* This allows you to write programs that can:
* <UL type=SQUARE>
* <LI> be easily localized, or translated, into different languages
* <LI> handle multiple locales at once
* <LI> be easily modified later to support even more locales
* </UL>
*
* <P>
* Resource bundles belong to families whose members share a common base 
* name, but whose names also have additional components that identify 
* their locales. For example, the base name of a family of resource 
* bundles might be "MyResources". The family should have a default 
* resource bundle which simply has the same name as its family - 
* "MyResources" - and will be used as the bundle of last resort if a
* specific locale is not supported. The family can then provide as
* many locale-specific members as needed, for example a German one
* named "MyResources_de".
*
* <P>
* Each resource bundle in a family contains the same items, but the items have
* been translated for the locale represented by that resource bundle.
* For example, both "MyResources" and "MyResources_de" may have a
* <code>String</code> that's used on a button for canceling operations.
* In "MyResources" the <code>String</code> may contain "Cancel" and in
* "MyResources_de" it may contain "Abbrechen".
*
* <P>
* If there are different resources for different countries, you
* can make specializations: for example, "MyResources_de_CH" contains objects for
* the German language (de) in Switzerland (CH). If you want to only
* modify some of the resources
* in the specialization, you can do so.
*
* <P>
* When your program needs a locale-specific object, it loads
* the <code>ResourceBundle</code> class using the
* {@link #getBundle(java.lang.String, java.util.Locale) getBundle}
* method:
* <blockquote>
* <pre>
* ResourceBundle myResources =
*      ResourceBundle.getBundle("MyResources", currentLocale);
* </pre>
* </blockquote>
*
* <P>
* Resource bundles contain key/value pairs. The keys uniquely
* identify a locale-specific object in the bundle. Here's an
* example of a <code>ListResourceBundle</code> that contains
* two key/value pairs:
* <blockquote>
* <pre>
* public class MyResources extends ListResourceBundle {
*      public Object[][] getContents() {
*              return contents;
*      }
*      static final Object[][] contents = {
*      // LOCALIZE THIS
*              {"OkKey", "OK"},
*              {"CancelKey", "Cancel"},
*      // END OF MATERIAL TO LOCALIZE
*      };
* }
* </pre>
* </blockquote>
* Keys are always <code>String</code>s.
* In this example, the keys are "OkKey" and "CancelKey".
* In the above example, the values
* are also <code>String</code>s--"OK" and "Cancel"--but
* they don't have to be. The values can be any type of object.
*
* <P>
* You retrieve an object from resource bundle using the appropriate
* getter method. Because "OkKey" and "CancelKey"
* are both strings, you would use <code>getString</code> to retrieve them:
* <blockquote>
* <pre>
* button1 = new Button(myResources.getString("OkKey"));
* button2 = new Button(myResources.getString("CancelKey"));
* </pre>
* </blockquote>
* The getter methods all require the key as an argument and return
* the object if found. If the object is not found, the getter method
* throws a <code>MissingResourceException</code>.
*
* <P>
* Besides <code>getString</code>, ResourceBundle also provides
* a method for getting string arrays, <code>getStringArray</code>,
* as well as a generic <code>getObject</code> method for any other
* type of object. When using <code>getObject</code>, you'll
* have to cast the result to the appropriate type. For example:
* <blockquote>
* <pre>
* int[] myIntegers = (int[]) myResources.getObject("intList");
* </pre>
* </blockquote>
*
* <P>
* The Java 2 platform provides two subclasses of <code>ResourceBundle</code>,
* <code>ListResourceBundle</code> and <code>PropertyResourceBundle</code>,
* that provide a fairly simple way to create resources.
* As you saw briefly in a previous example, <code>ListResourceBundle</code>
* manages its resource as a List of key/value pairs.
* <code>PropertyResourceBundle</code> uses a properties file to manage
* its resources.
*
* <p>
* If <code>ListResourceBundle</code> or <code>PropertyResourceBundle</code>
* do not suit your needs, you can write your own <code>ResourceBundle</code>
* subclass.  Your subclasses must override two methods: <code>handleGetObject</code>
* and <code>getKeys()</code>.
*
* <P>
* The following is a very simple example of a <code>ResourceBundle</code>
* subclass, MyResources, that manages two resources (for a larger number of
* resources you would probably use a <code>Hashtable</code>).
* Notice that you don't need to supply a value if 
* a "parent-level" <code>ResourceBundle</code> handles the same
* key with the same value (as for the okKey below).
* <p><strong>Example:</strong>
* <blockquote>
* <pre>
* // default (English language, United States)
* public class MyResources extends ResourceBundle {
*     public Object handleGetObject(String key) {
*         if (key.equals("okKey")) return "Ok";
*         if (key.equals("cancelKey")) return "Cancel";
*         return null;
*     }
* }
*
* // German language
* public class MyResources_de extends MyResources {
*     public Object handleGetObject(String key) {
*         // don't need okKey, since parent level handles it.
*         if (key.equals("cancelKey")) return "Abbrechen";
*         return null;
*     }
* }
* </pre>
* </blockquote>
* You do not have to restrict yourself to using a single family of
* <code>ResourceBundle</code>s. For example, you could have a set of bundles for
* exception messages, <code>ExceptionResources</code>
* (<code>ExceptionResources_fr</code>, <code>ExceptionResources_de</code>, ...),
* and one for widgets, <code>WidgetResource</code> (<code>WidgetResources_fr</code>,
* <code>WidgetResources_de</code>, ...); breaking up the resources however you like.
*
* @see ListResourceBundle
* @see PropertyResourceBundle
* @see MissingResourceException
* @since JDK1.1
* 
* @j2sOptionalImport net.sf.j2s.ajax.HttpRequest
*/
abstract public class ResourceBundle {

    /**
     * The parent bundle of this bundle.
     * The parent bundle is searched by {@link #getObject getObject}
     * when this bundle does not contain a particular resource.
     */
    protected ResourceBundle parent = null;

    /**
     * The locale for this bundle.
     */
    private Locale locale = null;
    
    String bundleName = null;
    
    private static ResourceBundle[] caches = new ResourceBundle[0];

    /**
     * Sole constructor.  (For invocation by subclass constructors, typically
     * implicit.)
     */
	public ResourceBundle() {
	}

    /**
     * Gets a string for the given key from this resource bundle or one of its parents.
     * Calling this method is equivalent to calling
     * <blockquote>
     * <code>(String) {@link #getObject(java.lang.String) getObject}(key)</code>.
     * </blockquote>
     *
     * @param key the key for the desired string
     * @exception NullPointerException if <code>key</code> is <code>null</code>
     * @exception MissingResourceException if no object for the given key can be found
     * @exception ClassCastException if the object found for the given key is not a string
     * @return the string for the given key
     */
    public final String getString(String key) {
        return (String) getObject(key);
    }

    /**
     * Gets a string array for the given key from this resource bundle or one of its parents.
     * Calling this method is equivalent to calling
     * <blockquote>
     * <code>(String[]) {@link #getObject(java.lang.String) getObject}(key)</code>.
     * </blockquote>
     *
     * @param key the key for the desired string array
     * @exception NullPointerException if <code>key</code> is <code>null</code>
     * @exception MissingResourceException if no object for the given key can be found
     * @exception ClassCastException if the object found for the given key is not a string array
     * @return the string array for the given key
     */
    public final String[] getStringArray(String key) {
        return (String[]) getObject(key);
    }

    /**
     * Gets an object for the given key from this resource bundle or one of its parents.
     * This method first tries to obtain the object from this resource bundle using
     * {@link #handleGetObject(java.lang.String) handleGetObject}.
     * If not successful, and the parent resource bundle is not null,
     * it calls the parent's <code>getObject</code> method.
     * If still not successful, it throws a MissingResourceException.
     *
     * @param key the key for the desired object
     * @exception NullPointerException if <code>key</code> is <code>null</code>
     * @exception MissingResourceException if no object for the given key can be found
     * @return the object for the given key
     */
    public final Object getObject(String key) {
        Object obj = handleGetObject(key);
        if (obj == null) {
            if (parent != null) {
                obj = parent.getObject(key);
            }
            if (obj == null)
                throw new MissingResourceException("Can't find resource for bundle "
                                                   +this.getClass().getName()
                                                   +", key "+key,
                                                   this.getClass().getName(),
                                                   key);
        }
        return obj;
    }

    /**
     * Returns the locale of this resource bundle. This method can be used after a
     * call to getBundle() to determine whether the resource bundle returned really
     * corresponds to the requested locale or is a fallback.
     *
     * @return the locale of this resource bundle
     */
    public Locale getLocale() {
        return locale;
    }

    /**
     * Sets the parent bundle of this bundle.
     * The parent bundle is searched by {@link #getObject getObject}
     * when this bundle does not contain a particular resource.
     *
     * @param parent this bundle's parent bundle.
     */
    protected void setParent( ResourceBundle parent ) {
        this.parent = parent;
    }

    /**
     * Gets a resource bundle using the specified base name, the default locale,
     * and the caller's class loader. Calling this method is equivalent to calling
     * <blockquote>
     * <code>getBundle(baseName, Locale.getDefault(), this.getClass().getClassLoader())</code>,
     * </blockquote>
     * except that <code>getClassLoader()</code> is run with the security
     * privileges of <code>ResourceBundle</code>.
     * See {@link #getBundle(java.lang.String, java.util.Locale, java.lang.ClassLoader) getBundle}
     * for a complete description of the search and instantiation strategy.
     *
     * @param baseName the base name of the resource bundle, a fully qualified class name
     * @exception java.lang.NullPointerException
     *     if <code>baseName</code> is <code>null</code>
     * @exception MissingResourceException
     *     if no resource bundle for the specified base name can be found
     * @return a resource bundle for the given base name and the default locale
     */
    public static final ResourceBundle getBundle(String baseName)
    {
    	return getBundleImpl(baseName, null, null);
    }

    /**
     * Gets a resource bundle using the specified base name and locale,
     * and the caller's class loader. Calling this method is equivalent to calling
     * <blockquote>
     * <code>getBundle(baseName, locale, this.getClass().getClassLoader())</code>,
     * </blockquote>
     * except that <code>getClassLoader()</code> is run with the security
     * privileges of <code>ResourceBundle</code>.
     * See {@link #getBundle(java.lang.String, java.util.Locale, java.lang.ClassLoader) getBundle}
     * for a complete description of the search and instantiation strategy.
     *
     * @param baseName the base name of the resource bundle, a fully qualified class name
     * @param locale the locale for which a resource bundle is desired
     * @exception java.lang.NullPointerException
     *     if <code>baseName</code> or <code>locale</code> is <code>null</code>
     * @exception MissingResourceException
     *     if no resource bundle for the specified base name can be found
     * @return a resource bundle for the given base name and locale
     */
    public static final ResourceBundle getBundle(String baseName,
                                                         Locale locale)
    {
        return getBundleImpl(baseName, locale, null);
    }

    /**
     * Gets a resource bundle using the specified base name, locale, and class loader.
     *
     * <p>
     * Conceptually, <code>getBundle</code> uses the following strategy for locating and instantiating
     * resource bundles:
     * <p>
     * <code>getBundle</code> uses the base name, the specified locale, and the default
     * locale (obtained from {@link java.util.Locale#getDefault() Locale.getDefault})
     * to generate a sequence of <em>candidate bundle names</em>.
     * If the specified locale's language, country, and variant are all empty
     * strings, then the base name is the only candidate bundle name.
     * Otherwise, the following sequence is generated from the attribute
     * values of the specified locale (language1, country1, and variant1)
     * and of the default locale (language2, country2, and variant2):
     * <ul>
     * <li> baseName + "_" + language1 + "_" + country1 + "_" + variant1
     * <li> baseName + "_" + language1 + "_" + country1
     * <li> baseName + "_" + language1
     * <li> baseName + "_" + language2 + "_" + country2 + "_" + variant2
     * <li> baseName + "_" + language2 + "_" + country2
     * <li> baseName + "_" + language2
     * <li> baseName
     * </ul>
     * <p>
     * Candidate bundle names where the final component is an empty string are omitted.
     * For example, if country1 is an empty string, the second candidate bundle name is omitted.
     *
     * <p>
     * <code>getBundle</code> then iterates over the candidate bundle names to find the first
     * one for which it can <em>instantiate</em> an actual resource bundle. For each candidate
     * bundle name, it attempts to create a resource bundle:
     * <ul>
     * <li>
     * First, it attempts to load a class using the candidate bundle name.
     * If such a class can be found and loaded using the specified class loader, is assignment
     * compatible with ResourceBundle, is accessible from ResourceBundle, and can be instantiated,
     * <code>getBundle</code> creates a new instance of this class and uses it as the <em>result
     * resource bundle</em>.
     * <li>
     * Otherwise, <code>getBundle</code> attempts to locate a property resource file.
     * It generates a path name from the candidate bundle name by replacing all "." characters
     * with "/" and appending the string ".properties".
     * It attempts to find a "resource" with this name using
     * {@link java.lang.ClassLoader#getResource(java.lang.String) ClassLoader.getResource}.
     * (Note that a "resource" in the sense of <code>getResource</code> has nothing to do with
     * the contents of a resource bundle, it is just a container of data, such as a file.)
     * If it finds a "resource", it attempts to create a new
     * {@link PropertyResourceBundle} instance from its contents.
     * If successful, this instance becomes the <em>result resource bundle</em>.
     * </ul>
     *
     * <p>
     * If no result resource bundle has been found, a <code>MissingResourceException</code>
     * is thrown.
     *
     * <p>
     * Once a result resource bundle has been found, its parent chain is instantiated.
     * <code>getBundle</code> iterates over the candidate bundle names that can be
     * obtained by successively removing variant, country, and language
     * (each time with the preceding "_") from the bundle name of the result resource bundle.
     * As above, candidate bundle names where the final component is an empty string are omitted.
     * With each of the candidate bundle names it attempts to instantiate a resource bundle, as
     * described above.
     * Whenever it succeeds, it calls the previously instantiated resource
     * bundle's {@link #setParent(java.util.ResourceBundle) setParent} method
     * with the new resource bundle, unless the previously instantiated resource
     * bundle already has a non-null parent.
     *
     * <p>
     * Implementations of <code>getBundle</code> may cache instantiated resource bundles
     * and return the same resource bundle instance multiple times. They may also
     * vary the sequence in which resource bundles are instantiated as long as the
     * selection of the result resource bundle and its parent chain are compatible with
     * the description above.
     *
     * <p>
     * The <code>baseName</code> argument should be a fully qualified class name. However, for
     * compatibility with earlier versions, Sun's Java 2 runtime environments do not verify this,
     * and so it is possible to access <code>PropertyResourceBundle</code>s by specifying a
     * path name (using "/") instead of a fully qualified class name (using ".").
     *
     * <p>
     * <strong>Example:</strong> The following class and property files are provided:
     * MyResources.class, MyResources_fr_CH.properties, MyResources_fr_CH.class,
     * MyResources_fr.properties, MyResources_en.properties, MyResources_es_ES.class.
     * The contents of all files are valid (that is, public non-abstract subclasses of ResourceBundle for
     * the ".class" files, syntactically correct ".properties" files).
     * The default locale is <code>Locale("en", "GB")</code>.
     * <p>
     * Calling <code>getBundle</code> with the shown locale argument values instantiates
     * resource bundles from the following sources:
     * <ul>
     * <li>Locale("fr", "CH"): result MyResources_fr_CH.class, parent MyResources_fr.properties, parent MyResources.class
     * <li>Locale("fr", "FR"): result MyResources_fr.properties, parent MyResources.class
     * <li>Locale("de", "DE"): result MyResources_en.properties, parent MyResources.class
     * <li>Locale("en", "US"): result MyResources_en.properties, parent MyResources.class
     * <li>Locale("es", "ES"): result MyResources_es_ES.class, parent MyResources.class
     * </ul>
     * The file MyResources_fr_CH.properties is never used because it is hidden by
     * MyResources_fr_CH.class.
     *
     * <p>
     *
     * @param baseName the base name of the resource bundle, a fully qualified class name
     * @param locale the locale for which a resource bundle is desired
     * @param loader the class loader from which to load the resource bundle
     * @exception java.lang.NullPointerException
     *     if <code>baseName</code>, <code>locale</code>, or <code>loader</code> is <code>null</code>
     * @exception MissingResourceException
     *     if no resource bundle for the specified base name can be found
     * @return a resource bundle for the given base name and locale
     * @since 1.2
     */
    public static ResourceBundle getBundle(String baseName, Locale locale,
                                           ClassLoader loader)
    {
        if (loader == null) {
            throw new NullPointerException();
        }
        return getBundleImpl(baseName, locale, loader);
    }

    private static ResourceBundle getBundleImpl(String baseName, Locale locale,
	            ClassLoader loader)
	{
		if (baseName == null) {
			throw new NullPointerException();
		}
		
		for (int i = 0; i < caches.length; i++) {
			if (caches[i].bundleName == baseName) {
				return caches[i];
			}
		}
		TextResourceBundle bundle = new TextResourceBundle(baseName);
		caches[caches.length] = bundle;
		return bundle;
	}
    
    /*
     * This method will be called from native JavaScript
     */
    protected static void registerBundle(String baseName, String content) {
		for (int i = 0; i < caches.length; i++) {
			if (caches[i].bundleName == baseName) {
				return ;
			}
		}
		caches[caches.length] = new TextResourceBundle(baseName, content);
    }
    
    /**
     * Gets an object for the given key from this resource bundle.
     * Returns null if this resource bundle does not contain an
     * object for the given key.
     *
     * @param key the key for the desired object
     * @exception NullPointerException if <code>key</code> is <code>null</code>
     * @return the object for the given key, or null
     */
    protected abstract Object handleGetObject(String key);

    /**
     * Returns an enumeration of the keys.
     *
     */
    public abstract Enumeration getKeys();

    private static class TextResourceBundle extends ResourceBundle {
    	
    	//private Map map = new HashMap();
    	private String[] map = new String[0];
    	
    	private String[] keys = new String[0];
    	
    	private String content = null;
    	
    	private boolean initialized = false;
    	
		public TextResourceBundle(String bundleName) {
			this.bundleName = bundleName; 
		}
		
		public TextResourceBundle(String bundleName, String content) {
			this.bundleName = bundleName;
			this.content = content;
		}
		/**
		 * @param a
		 * @return
		 * @j2sNative
var r = new Array ();
var b = false;
var x = 0;
for (var i = 0; i < a.length; i++) {
	var c = a.charAt (i);
	if (b) {
		if (c == 'f') r[r.length] = '\f';
		else if (c == 't') r[r.length] = '\t';
		else if (c == 'r') r[r.length] = '\r';
		else if (c == 'n') r[r.length] = '\n';
		else if (c == '\'') r[r.length] = '\'';
		else if (c == '\"') r[r.length] = '\"';
		else if (c == '\\') r[r.length] = '\\';
		else if (c == 'u') {
			r[r.length] =  eval ("\"\\u" + a.substring (i + 1, i + 5) + "\"");
			i += 4;
		}
		x = i + 1;
		b = false;
	} else if (c == '\\') {
 		if (x != i) {
 			r[r.length] = a.substring (x, i);
	 	}
 		b = true;
	 }
}
if (!b) {
	r[r.length] = a.substring (x, a.length);
}
return r.join (''); 
		 */
		native String evalString(String a);
		
		private void initBundle() {
			if (initialized) {
				return ;
			}
			initialized = true;
			String a = null;
			String b = this.bundleName;
			if (content == null) 
			/**
			 * Load the content from URL specified by given bundle name
			 * @j2sNative
			var n = b.replace (/\./g, '/') + ".properties";
			var p = Clazz.binaryFolders;
			if (p == null) {
				p = ["bin", "", "j2slib"];
			}
			var r =  new net.sf.j2s.ajax.HttpRequest ();
			var x = 0;
			while (a == null && x < p.length) {
				var q = p[x];
				if (q.length > 0 && q.lastIndexOf ("/") != q.length - 1) {
					q += "/";
				}
				try {
					r.open ("GET", q + n, false); // FIXME: using synchronized mode will freeze browser!
					r.send ();
					a = r.getResponseText ();
				} catch (e) {
					r =  new net.sf.j2s.ajax.HttpRequest ();
				}
				x++;
			}
			 */
			{
				content = b; // nonsense codes
			}
			if (content == null) {
				content = a;
			}
			if (content == null) {
				return ;
			}
			String[] bundleLines = content.split ("\n");
			for (int i = 0; i < bundleLines.length; i++) {
				String trimedLine = bundleLines[i].trim();
				if (!trimedLine.startsWith("#")) {
					int index = trimedLine.indexOf('=');
					if (index != -1) {
						String key = trimedLine.substring(0, index).trim();
						String value = trimedLine.substring(index + 1).trim();
						if (value.indexOf ('\\') != -1) {
							value = this.evalString (value);
						}
						String[] m = this.map;
						String[] k = this.keys;
						/**
						 * @j2sNative
						 * if (m[key] == null) {
						 * k[k.length] = key;
						 * }
						 * m[key] = value;
						 */
						{
							//keys[keys.length] = key;
							//map.put(key, value);
							map[0] = key;
							map[1] = value;
							k[0] = key; // nonsense code to prevent IDE's warning
							m[0] = value;
						}
					}
				}
			}
		}

		public Enumeration getKeys() {
			return new Enumeration() {
				int index = -1;
				public Object nextElement() {
					index++;
					return keys[index];
				}
			
				public boolean hasMoreElements() {
					return index < keys.length - 1;
				}
			};
			//return new Vector(map.keySet()).elements();
		}

		protected Object handleGetObject(String key) {
			if (!this.initialized) {
				this.initBundle();
			}
			String[] m = this.map; 
			/**
			 * @j2sNative
			return m[key];
			 */ 
			{}
			//return map.get(key);
			return m; // Should never reach here in JS
		}
    	
    }
}
