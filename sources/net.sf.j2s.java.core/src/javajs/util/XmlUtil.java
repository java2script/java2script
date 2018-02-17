/* $RCSfile$
 * $Author$
 * $Date$
 * $Revision$
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2006  The Jmol Development Team
 *
 * Contact: jmol-developers@lists.sf.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 *  02110-1301, USA.
 */

package javajs.util;

/**
 * A very simplistic XML generator
 */

public class XmlUtil {

  public XmlUtil() {
    // Jmol's PropertyManager and JvxlCoder classes use reflection 
  }
  public static void openDocument(SB data) {
    data.append("<?xml version=\"1.0\"?>\n");
  }

  public static void openTag(SB sb, String name) {
    sb.append("<").append(name).append(">\n");
  }

  public static void openTagAttr(SB sb, String name, Object[] attributes) {
    appendTagAll(sb, name, attributes, null, false, false);
    sb.append("\n");
  }

  public static void closeTag(SB sb, String name) {
    sb.append("</").append(name).append(">\n");
  }

  public static void appendTagAll(SB sb, String name,
                               Object[] attributes, Object data,
                               boolean isCdata, boolean doClose) {
    String closer = ">";
    if (name.endsWith("/")){
      name = name.substring(0, name.length() - 1);
      if (data == null) {
        closer = "/>\n";
        doClose = false;
      }
    }
    sb.append("<").append(name);
    if (attributes != null)
      for (int i = 0; i < attributes.length; i++) {
        Object o = attributes[i];
        if (o == null)
          continue;
        if (o instanceof Object[])
          for (int j = 0; j < ((Object[]) o).length; j+= 2)
          appendAttrib(sb, ((Object[]) o)[j], ((Object[]) o)[j + 1]);
        else
          appendAttrib(sb, o, attributes[++i]);
      }
    sb.append(closer);
    if (data != null) {
      if (isCdata)
        data = wrapCdata(data);
      sb.appendO(data);
    }
    if (doClose)
      closeTag(sb, name);
  }

  /**
   * wrap the string as character data, with replacements for [ noted 
   * as a list starting with * after the CDATA termination
   * 
   * @param data
   * @return      wrapped text
   */
  public static String wrapCdata(Object data) {
    String s = "" + data;
    return (s.indexOf("&") < 0 && s.indexOf("<") < 0 ? (s.startsWith("\n") ? "" : "\n") + s 
        : "<![CDATA[" + PT.rep(s, "]]>", "]]]]><![CDATA[>") + "]]>");
  }
  
  /**
   * standard <name attr="..." attr="...">data</name>"
   * 
   * @param sb
   * @param name
   * @param attributes
   * @param data
   */
  public static void appendTagObj(SB sb, String name,
                               Object[] attributes, Object data) {
    appendTagAll(sb, name, attributes, data, false, true);
  }

  /**
   * standard <name>data</name>"
   * standard <name attr="..." attr="..."></name>"
   * 
   * @param sb
   * @param name
   * @param data
   */
  public static void appendTag(SB sb, String name, Object data) {
    if (data instanceof Object[])
      appendTagAll(sb, name, (Object[]) data, null, false, true);
    else
      appendTagAll(sb, name, null, data, false, true);
  }

  /**
   * <name><![CDATA[data]]></name>"
   * 
   * will convert ]]> to ]] >
   * 
   * @param sb
   * @param name
   * @param attributes 
   * @param data
   */
  public static void appendCdata(SB sb, String name, 
                                 Object[] attributes, String data) {
    appendTagAll(sb, name, attributes, data, true, true);
  }

  /**
   * 
   * @param sb
   * @param name
   * @param value
   */
  public static void appendAttrib(SB sb, Object name, Object value) {
    if (value == null)
      return;
    
    // note: <&" are disallowed but not checked for here
    
    sb.append(" ").appendO(name).append("=\"").appendO(value).append("\"");
  }

//  /**
//   * @param s
//   * @return   unwrapped text
//   */
//  public static String unwrapCdata(String s) {
//    return (s.startsWith("<![CDATA[") && s.endsWith("]]>") ?
//        PT.rep(s.substring(9, s.length()-3),"]]]]><![CDATA[>", "]]>") : s);
//  }
//  

}
