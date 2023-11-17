/*
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package java.util;

// BH 2023.11.16 StringBuilder to String for JavaScript

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.nio.charset.IllegalCharsetNameException;
import java.nio.charset.UnsupportedCharsetException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.EntityResolver;
import org.xml.sax.ErrorHandler;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

/**
 * Properties is a Hashtable where the keys and values must be Strings. Each
 * Properties can have a default Properties which specifies the default values
 * which are used if the key is not in this Properties.
 * 
 * @see Hashtable
 * @see java.lang.System#getProperties
 */
public class Properties extends Hashtable<Object,Object> {
	
	private static final long serialVersionUID = 4112578634029874840L;

    private DocumentBuilder builder = null;

    private static final String PROP_DTD_NAME 
            = "http://java.sun.com/dtd/properties.dtd";

    private static final String PROP_DTD 
            = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
            + "    <!ELEMENT properties (comment?, entry*) >"
            + "    <!ATTLIST properties version CDATA #FIXED \"1.0\" >"
            + "    <!ELEMENT comment (#PCDATA) >"
            + "    <!ELEMENT entry (#PCDATA) >"
            + "    <!ATTLIST entry key CDATA #REQUIRED >";
	
	/**
	 * The default values for this Properties.
	 */
	protected Properties defaults;

	private static final int NONE = 0, SLASH = 1, UNICODE = 2, CONTINUE = 3,
			KEY_DONE = 4, IGNORE = 5;

	/**
	 * Constructs a new Properties object.
	 */
	public Properties() {
		super();
	}

	/**
	 * Constructs a new Properties object using the specified default
	 * properties.
	 * 
	 * @param properties
	 *            the default properties
	 */
	public Properties(Properties properties) {
		defaults = properties;
	}

	private String dumpString(String buffer, String string, boolean key) {
		int i = 0;
		if (!key && i < string.length() && string.charAt(i) == ' ') {
			buffer += ("\\ "); //$NON-NLS-1$
			i++;
		}

		for (; i < string.length(); i++) {
			char ch = string.charAt(i);
			switch (ch) {
			case '\t':
				buffer += ("\\t"); //$NON-NLS-1$
				break;
			case '\n':
				buffer += ("\\n"); //$NON-NLS-1$
				break;
			case '\f':
				buffer += ("\\f"); //$NON-NLS-1$
				break;
			case '\r':
				buffer += ("\\r"); //$NON-NLS-1$
				break;
			default:
				if ("\\#!=:".indexOf(ch) >= 0 || (key && ch == ' ')) {
                    buffer += ('\\');
                }
				if (ch >= ' ' && ch <= '~') {
					buffer += (ch);
				} else {
					String hex = Integer.toHexString(ch);
					buffer += ("\\u"); //$NON-NLS-1$
					for (int j = 0; j < 4 - hex.length(); j++) {
                        buffer += ("0"); //$NON-NLS-1$
                    }
					buffer += (hex);
				}
			}
		}
		return buffer;
	}

	/**
	 * Searches for the property with the specified name. If the property is not
	 * found, look in the default properties. If the property is not found in
	 * the default properties, answer null.
	 * 
	 * @param name
	 *            the name of the property to find
	 * @return the named property value
	 */
	public String getProperty(String name) {
		Object result = get(name);
		String property = result instanceof String ? (String) result : null;
		if (property == null && defaults != null) {
			property = defaults.getProperty(name);
		}
		return property;
	}

	/**
	 * Searches for the property with the specified name. If the property is not
	 * found, look in the default properties. If the property is not found in
	 * the default properties, answer the specified default.
	 * 
	 * @param name
	 *            the name of the property to find
	 * @param defaultValue
	 *            the default value
	 * @return the named property value
	 */
	public String getProperty(String name, String defaultValue) {
		Object result = get(name);
		String property = result instanceof String ? (String) result : null;
		if (property == null && defaults != null) {
			property = defaults.getProperty(name);
		}
		if (property == null) {
            return defaultValue;
        }
		return property;
	}

	/**
	 * Lists the mappings in this Properties to the specified PrintStream in a
	 * human readable form.
	 * 
	 * @param out
	 *            the PrintStream
	 */
	public void list(PrintStream out) {
		if (out == null) {
            throw new NullPointerException();
        }
		String buffer = "";
		Enumeration<?> keys = propertyNames();
		while (keys.hasMoreElements()) {
			String key = (String) keys.nextElement();
			buffer += (key);
			buffer += ('=');
			String property = (String) get(key);
			Properties def = defaults;
			while (property == null) {
				property = (String) def.get(key);
				def = def.defaults;
			}
			if (property.length() > 40) {
				buffer += (property.substring(0, 37));
				buffer += ("..."); //$NON-NLS-1$
			} else {
                buffer += (property);
            }
			out.println(buffer.toString());
			buffer = "";
		}
	}

	/**
	 * Lists the mappings in this Properties to the specified PrintWriter in a
	 * human readable form.
	 * 
	 * @param writer
	 *            the PrintWriter
	 */
	public void list(PrintWriter writer) {
		if (writer == null) {
            throw new NullPointerException();
        }
		String buffer = "";
		Enumeration<?> keys = propertyNames();
		while (keys.hasMoreElements()) {
			String key = (String) keys.nextElement();
			buffer += (key);
			buffer += ('=');
			String property = (String) get(key);
			Properties def = defaults;
			while (property == null) {
				property = (String) def.get(key);
				def = def.defaults;
			}
			if (property.length() > 40) {
				buffer += (property.substring(0, 37));
				buffer += ("..."); //$NON-NLS-1$
			} else {
                buffer += (property);
            }
			writer.println(buffer.toString());
			buffer = "";
		}
	}

	/**
	 * Loads properties from the specified InputStream. The properties are of
	 * the form <code>key=value</code>, one property per line.
	 * 
	 * @param in
	 *            the input stream
	 * @throws IOException
	 * 
	 * @j2sNative
	 */
	public synchronized void load(InputStream in) throws IOException {
		int mode = NONE, unicode = 0, count = 0;
		char nextChar, buf[] = new char[40];
		int offset = 0, keyLength = -1;
		boolean firstChar = true;
		byte[] inbuf = new byte[256];
		int inbufCount = 0, inbufPos = 0;

		while (true) {
			if (inbufPos == inbufCount) {
				if ((inbufCount = in.read(inbuf, 0, inbuf.length)) == -1) {
                    break;
                }
				inbufPos = 0;
			}
			nextChar = (char) (inbuf[inbufPos++] & 0xff);

			if (offset == buf.length) {
				char[] newBuf = new char[buf.length * 2];
				System.arraycopy(buf, 0, newBuf, 0, offset);
				buf = newBuf;
			}
			if (mode == UNICODE) {
//				int digit = Character.digit(nextChar, 16);
				int digit = 0;
				if (nextChar >= '0' && nextChar <= '9') {
					digit = nextChar - '0';
				} else if (nextChar >= 'a' && nextChar <= 'f') {
					digit = (nextChar - 'a') + 10;
				} else {
					digit = (nextChar - 'A') + 10;
					if (digit < 10 || digit > 15) {
						digit = -1;
					}
				}
				if (digit >= 0) {
					unicode = (unicode << 4) + digit;
					if (++count < 4) {
                        continue;
                    }
				}
				mode = NONE;
				buf[offset++] = (char) unicode;
				if (nextChar != '\n') {
                    continue;
                }
			}
			if (mode == SLASH) {
				mode = NONE;
				switch (nextChar) {
				case '\r':
					mode = CONTINUE; // Look for a following \n
					continue;
				case '\n':
					mode = IGNORE; // Ignore whitespace on the next line
					continue;
				case 'b':
					nextChar = '\b';
					break;
				case 'f':
					nextChar = '\f';
					break;
				case 'n':
					nextChar = '\n';
					break;
				case 'r':
					nextChar = '\r';
					break;
				case 't':
					nextChar = '\t';
					break;
				case 'u':
					mode = UNICODE;
					unicode = count = 0;
					continue;
				}
			} else {
				switch (nextChar) {
				case '#':
				case '!':
					if (firstChar) {
						while (true) {
							if (inbufPos == inbufCount) {
								if ((inbufCount = in.read(inbuf, 0, inbuf.length)) == -1) {
									inbufPos = -1;
									break;
								}
								inbufPos = 0;
							}
							nextChar = (char) inbuf[inbufPos++]; // & 0xff
																	// not
																	// required
							if (nextChar == '\r' || nextChar == '\n') {
                                break;
                            }
						}
						continue;
					}
					break;
				case '\n':
					if (mode == CONTINUE) { // Part of a \r\n sequence
						mode = IGNORE; // Ignore whitespace on the next line
						continue;
					}
				// fall into the next case
				case '\r':
					mode = NONE;
					firstChar = true;
					if (offset > 0) {
						if (keyLength == -1) {
							keyLength = offset;
						}
						String temp = new String(buf, 0, offset);
						put(temp.substring(0, keyLength), temp
								.substring(keyLength));
					}
					keyLength = -1;
					offset = 0;
					continue;
				case '\\':
					if (mode == KEY_DONE) {
						keyLength = offset;
					}
					mode = SLASH;
					continue;
				case ':':
				case '=':
					if (keyLength == -1) { // if parsing the key
						mode = NONE;
						keyLength = offset;
						continue;
					}
					break;
				}
				if (Character.isWhitespace(nextChar)) {
					if (mode == CONTINUE) {
                        mode = IGNORE;
                    }
					// if key length == 0 or value length == 0
					if (offset == 0 || offset == keyLength || mode == IGNORE) {
                        continue;
                    }
					if (keyLength == -1) { // if parsing the key
						mode = KEY_DONE;
						continue;
					}
				}
				if (mode == IGNORE || mode == CONTINUE) {
                    mode = NONE;
                }
			}
			firstChar = false;
			if (mode == KEY_DONE) {
				keyLength = offset;
				mode = NONE;
			}
			buf[offset++] = nextChar;
		}
		if (keyLength >= 0) {
			String temp = new String(buf, 0, offset);
			put(temp.substring(0, keyLength), temp.substring(keyLength));
		}
	}

	/**
	 * Answers all of the property names that this Properties contains.
	 * 
	 * @return an Enumeration containing the names of all properties
	 */
	public Enumeration<?> propertyNames() {
		if (defaults == null) {
            return keys();
        }

		Hashtable<Object, Object> set = new Hashtable<Object, Object>(defaults.size() + size());
		Enumeration<?> keys = defaults.propertyNames();
		while (keys.hasMoreElements()) {
			set.put(keys.nextElement(), set);
		}
		keys = keys();
		while (keys.hasMoreElements()) {
			set.put(keys.nextElement(), set);
		}
		return set.keys();
	}

	/**
	 * Saves the mappings in this Properties to the specified OutputStream,
	 * putting the specified comment at the beginning. The output from this
	 * method is suitable for being read by the load() method.
	 * 
	 * @param out
	 *            the OutputStream
	 * @param comment
	 *            the comment
	 * 
	 * @exception ClassCastException
	 *                when the key or value of a mapping is not a String
	 * 
	 * @deprecated Does not throw an IOException, use store()
	 */
	@Deprecated
    public void save(OutputStream out, String comment) {
		try {
			store(out, comment);
		} catch (IOException e) {
		}
	}

	/**
	 * Maps the specified key to the specified value. If the key already exists,
	 * the old value is replaced. The key and value cannot be null.
	 * 
	 * @param name
	 *            the key
	 * @param value
	 *            the value
	 * @return the old value mapped to the key, or null
	 */
	public synchronized Object setProperty(String name, String value) {
		return put(name, value);
	}

	private static String lineSeparator;

	/**
	 * Stores the mappings in this Properties to the specified OutputStream,
	 * putting the specified comment at the beginning. The output from this
	 * method is suitable for being read by the load() method.
	 * 
	 * @param out
	 *            the OutputStream
	 * @param comment
	 *            the comment
	 * @throws IOException 
	 * 
	 * @exception ClassCastException
	 *                when the key or value of a mapping is not a String
	 * 
	 * @j2sNative
	 */
	public synchronized void store(OutputStream out, String comment)
			throws IOException {
		if (lineSeparator == null) {
//			lineSeparator = AccessController
//					.doPrivileged(new PriviAction<String>("line.separator")); //$NON-NLS-1$
			lineSeparator = "\r\n"; //$NON-NLS-1$
        }

        String buffer = "";
		OutputStreamWriter writer = new OutputStreamWriter(out, "ISO8859_1"); //$NON-NLS-1$
		if (comment != null) {
            writer.write("#"); //$NON-NLS-1$
            writer.write(comment);
			writer.write(lineSeparator); 
        }
        writer.write("#"); //$NON-NLS-1$
        writer.write(new Date().toString());
        writer.write(lineSeparator); 

		for (Map.Entry<Object, Object> entry : entrySet()) {
			String key = (String) entry.getKey();
			buffer = dumpString(buffer, key, true);
			buffer += ('=');
			dumpString(buffer, (String) entry.getValue(), false);
			buffer += (lineSeparator);
			writer.write(buffer);
			buffer = "";
		}
		writer.flush();
	}

	/**
	 * @param in
	 * @throws IOException
	 * @throws InvalidPropertiesFormatException
	 * 
	 * @j2sNative
	 */
    public synchronized void loadFromXML(InputStream in) 
            throws IOException, InvalidPropertiesFormatException {
        if (in == null) {
            throw new NullPointerException();
        }
        
        if (builder == null) {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setValidating(true);
            
            try {
                builder = factory.newDocumentBuilder();
            } catch (ParserConfigurationException e) {
                throw new Error(e);
            }
            
            builder.setErrorHandler(new ErrorHandler() {
                public void warning(SAXParseException e) throws SAXException {
                    throw e;
                }

                public void error(SAXParseException e) throws SAXException {
                    throw e;
                }

                public void fatalError(SAXParseException e) throws SAXException {
                    throw e;
                }
            });
            
            builder.setEntityResolver(new EntityResolver() {
                public InputSource resolveEntity(String publicId, String systemId)
                        throws SAXException, IOException {
                    if (systemId.equals(PROP_DTD_NAME)) {
                        InputSource result = new InputSource(new StringReader(
                                PROP_DTD));
                        result.setSystemId(PROP_DTD_NAME);
                        return result;
                    }
                    throw new SAXException(
                            "Invalid DOCTYPE declaration: " + systemId);
                }
            });
        }
        
        try {
            Document doc = builder.parse(in);
            NodeList entries = doc.getElementsByTagName("entry"); 
            if (entries == null) {
                return;
            }
            int entriesListLength = entries.getLength();
            
            for (int i = 0; i < entriesListLength; i++) {
                Element entry = (Element) entries.item(i);
                String key = entry.getAttribute("key");
                String value = entry.getTextContent();
                
                /*
                 * key != null & value != null
                 * but key or(and) value can be empty String
                 */
                put(key, value);
            }
        } catch (IOException e) {
            throw e;
        } catch (SAXException e) {
            throw new InvalidPropertiesFormatException(e);
        }
    }

    /**
     * @param os
     * @param comment
     * @throws IOException
     * 
     * @j2sNative
     */
    public void storeToXML(OutputStream os, String comment) 
            throws IOException {
        storeToXML(os, comment, "UTF-8");
    }
    
    /**
     * @param os
     * @param comment
     * @param encoding
     * @throws IOException
     * 
     * @j2sNative
     */
    public synchronized void storeToXML(OutputStream os, String comment,
            String encoding) throws IOException {

        if (os == null || encoding == null) {
            throw new NullPointerException();
        }
        
        /*
         * We can write to XML file using encoding parameter but note that some
         * aliases for encodings are not supported by the XML parser. Thus we
         * have to know canonical name for encoding used to store data in XML
         * since the XML parser must recognize encoding name used to store data.
         */
        
        String encodingCanonicalName;
        try {
            encodingCanonicalName = Charset.forName(encoding).name();
        } catch (IllegalCharsetNameException e) {
            System.out.println("Warning: encoding name " + encoding
                    + " is illegal, using UTF-8 as default encoding");
            encodingCanonicalName = "UTF-8";
        } catch (UnsupportedCharsetException e) {
            System.out.println("Warning: encoding " + encoding
                    + " is not supported, using UTF-8 as default encoding");
            encodingCanonicalName = "UTF-8";
        }

        PrintStream printStream = new PrintStream(os, false, encodingCanonicalName);
        
        printStream.print("<?xml version=\"1.0\" encoding=\"");
        printStream.print(encodingCanonicalName);
        printStream.println("\"?>");
        
        printStream.print("<!DOCTYPE properties SYSTEM \"");
        printStream.print(PROP_DTD_NAME);
        printStream.println("\">");
        
        printStream.println("<properties>");
        
        if (comment != null) {
            printStream.print("<comment>");
            printStream.print(substitutePredefinedEntries(comment));
            printStream.println("</comment>");
        }

        for (Map.Entry<Object, Object> entry : entrySet()) {
            String keyValue = (String) entry.getKey();
            String entryValue = (String) entry.getValue();
            printStream.print("<entry key=\"");
            printStream.print(substitutePredefinedEntries(keyValue));
            printStream.print("\">");
            printStream.print(substitutePredefinedEntries(entryValue));
            printStream.println("</entry>");
        }
        printStream.println("</properties>");
        printStream.flush();
    }
    
    private String substitutePredefinedEntries(String s) {
        
        /*
         * substitution for predefined character entities
         * to use them safely in XML
         */
        return s.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("\u0027", "&apos;")
            .replaceAll("\"", "&quot;");
    }	
}
