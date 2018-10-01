/*
 * Copyright (c) 2003, 2006, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

package javax.xml.namespace;

import javax.xml.XMLConstants;


public class QName {
	private final String ns;
	private final String local;
	private final String pre;

	public QName(final String ns, final String local) {
		this(ns, local, XMLConstants.DEFAULT_NS_PREFIX);
	}

	public QName(String ns, String local, String prefix) {
		if (ns == null) {
			this.ns = XMLConstants.NULL_NS_URI;
		} else {
			this.ns = ns;
		}
		if (local == null) {
			throw new IllegalArgumentException("local part cannot be \"null\" when creating a QName");
		}
		this.local = local;
		if (prefix == null) {
			throw new IllegalArgumentException("prefix cannot be \"null\" when creating a QName");
		}
		this.pre = prefix;
	}

	public QName(String local) {
		this(XMLConstants.NULL_NS_URI, local, XMLConstants.DEFAULT_NS_PREFIX);
	}

	public String getNamespaceURI() {
		return ns;
	}

	public String getLocalPart() {
		return local;
	}

	public String getPrefix() {
		return pre;
	}

	public final boolean equals(Object objectToTest) {
		if (objectToTest == this) {
			return true;
		}

		if (objectToTest == null || !(objectToTest instanceof QName)) {
			return false;
		}

		QName qName = (QName) objectToTest;

		return local.equals(qName.local) && ns.equals(qName.ns);
	}

	public final int hashCode() {
		return ns.hashCode() ^ local.hashCode();
	}

	public String toString() {
		if (ns.equals(XMLConstants.NULL_NS_URI)) {
			return local;
		} else {
			return "{" + ns + "}" + local;
		}
	}

	public static QName valueOf(String qNameAsString) {

		if (qNameAsString == null) {
			throw new IllegalArgumentException("cannot create QName from \"null\" or \"\" String");
		}

		if (qNameAsString.length() == 0) {
			return new QName(XMLConstants.NULL_NS_URI, qNameAsString, XMLConstants.DEFAULT_NS_PREFIX);
		}

		if (qNameAsString.charAt(0) != '{') {
			return new QName(XMLConstants.NULL_NS_URI, qNameAsString, XMLConstants.DEFAULT_NS_PREFIX);
		}

		if (qNameAsString.startsWith("{" + XMLConstants.NULL_NS_URI + "}")) {
			throw new IllegalArgumentException("Namespace URI .equals(XMLConstants.NULL_NS_URI), " + ".equals(\""
					+ XMLConstants.NULL_NS_URI + "\"), " + "only the local part, " + "\""
					+ qNameAsString.substring(2 + XMLConstants.NULL_NS_URI.length()) + "\", " + "should be provided.");
		}

		int endOfns = qNameAsString.indexOf('}');
		if (endOfns == -1) {
			throw new IllegalArgumentException(
					"cannot create QName from \"" + qNameAsString + "\", missing closing \"}\"");
		}
		return new QName(qNameAsString.substring(1, endOfns), qNameAsString.substring(endOfns + 1),
				XMLConstants.DEFAULT_NS_PREFIX);
	}
}
