package org.w3c.dom;

/**
 * CDATA sections are used to escape blocks of text containing  characters 
 * that would otherwise be regarded as markup. The only  delimiter that is 
 * recognized in a CDATA section is the "]]&gt;" string  that ends the CDATA 
 * section. CDATA sections can not be  nested. The primary purpose is for 
 * including material such as XML fragments, without needing to escape all 
 * the delimiters.
 * <p>The <code>DOMString</code> attribute of the <code>Text</code> node holds 
 * the text that is contained by the CDATA section. Note that this may 
 * contain characters that need to be escaped outside of CDATA sections and 
 * that, depending on the character encoding ("charset") chosen for 
 * serialization, it may be impossible to write out some characters as part 
 * of a CDATA section.
 * <p> The <code>CDATASection</code> interface inherits the 
 * <code>CharacterData</code> interface through the <code>Text</code> 
 * interface. Adjacent <code>CDATASections</code> nodes are not merged by use 
 * of the Element.normalize() method.
 */
public interface CDATASection extends Text {
}

