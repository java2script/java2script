package javax.xml.namespace;

import java.util.Iterator;
public interface NamespaceContext {
    String getNamespaceURI(String prefix);
    String getPrefix(String namespaceURI);
    Iterator<String> getPrefixes(String namespaceURI);
}
