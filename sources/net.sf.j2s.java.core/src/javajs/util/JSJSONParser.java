package javajs.util;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;


/**
 * a very simple JSON parser for JSON objects that are compatible with JavaScript
 * A gross simplification of https://github.com/douglascrockford/JSON-java
 * 
 * A SUBSET of JSON with similarly to window.JSON.parse():
 * 
 * In JavaScript returns "null" for a null value, not null
 * 
 *  -- requires quoted strings for keys and values
 *  
 *  -- does not allow /xxx/ objects
 *  
 *  @author Bob Hanson
 *  
 */
public class JSJSONParser {

  private String str;
  private int index;
  private int len;
  private boolean asHashTable;

  public JSJSONParser () {
    // for reflection
  }
  
  /**
   * requires { "key":"value", "key":"value",....}
   * 
   * @param str
   * @param asHashTable TODO
   * 
   * @return Map or null
   */
  @SuppressWarnings("unchecked")
  public Map<String, Object> parseMap(String str, boolean asHashTable) {
    index = 0;
    this.asHashTable = asHashTable;
    this.str = str;
    len = str.length();
    if (getChar() != '{')
      return null;
    returnChar();
    return (Map<String, Object>) getValue(false);
  }
  
  /**
   * Could return Integer, Float, Boolean, String, Map<String, Object>, Lst<Object>, or null
   * 
   * @param str
   * @param asHashTable 
   * @return a object equivalent to the JSON string str
   * 
   */
  public Object parse(String str, boolean asHashTable) {
    index = 0;
    this.asHashTable = asHashTable;
    this.str = str;
    len = str.length();
    return getValue(false);
  }

  private char next() {
    return (index < len ? str.charAt(index++) : '\0');
  }

  private void returnChar() {
    index--;
  }

  /**
   * Get the next char in the string, skipping whitespace.
   * 
   * @throws JSONException
   * @return one character, or 0 if there are no more characters.
   */
  private char getChar() throws JSONException {
    for (;;) {
      char c = next();
      if (c == 0 || c > ' ') {
        return c;
      }
    }
  }

  /**
   * only allowing the following values:
   * 
   * {...} object
   * 
   * [...] array
   * 
   * Integer
   * 
   * Float
   * 
   * "quoted string"
   * 
   * 
   * @param isKey if we should allow {...} and [...]
   * @return a subclass of Object
   * @throws JSONException
   */
  private Object getValue(boolean isKey) throws JSONException {
    int i = index;
    char c = getChar();
    switch (c) {
    case '\0':
      return null;
    case '"':
    case '\'':
      return getString(c);
    case '{':
      if (!isKey)
        return getObject();
      c = 0;
      break;
    case '[':
      if (!isKey)
        return getArray();
      c = 0;
      break;
    default:
      // standard syntax is assumed; not checking all possible invalid keys
      // for example, "-" is not allowed in JavaScript, which is what this is for
      returnChar();
      while (c >= ' ' && "[,]{:}'\"".indexOf(c) < 0)
        c = next();
      returnChar();
      if (isKey && c != ':')
        c = 0;
      break;
    }
    if (isKey && c == 0)
      throw new JSONException("invalid key");

    String string = str.substring(i, index).trim();

    // check for the only valid simple words: true, false, null (lower case)
    // and in this case, only for 

    if (!isKey) {
      if (string.equals("true")) {
        return Boolean.TRUE;
      }
      if (string.equals("false")) {
        return Boolean.FALSE;
      }
      if (string.equals("null")) {
        return (asHashTable ? string : null);
      }
    }
    //  only numbers from here on:
    c = string.charAt(0);
    if (c >= '0' && c <= '9' || c == '-')
      try {
        if (string.indexOf('.') < 0 && string.indexOf('e') < 0
            && string.indexOf('E') < 0)
          return new Integer(string);
        // not allowing infinity or NaN
        // using float here because Jmol does not use Double
        Float d = Float.valueOf(string);
        if (!d.isInfinite() && !d.isNaN())
          return d;
      } catch (Exception e) {
      }
    // not a valid number
    System.out.println("JSON parser cannot parse " + string);
    throw new JSONException("invalid value");
  }

  private String getString(char quote) throws JSONException {
    char c;
    SB sb = null;
    int i0 = index;
    for (;;) {
      int i1 = index;
      switch (c = next()) {
      case '\0':
      case '\n':
      case '\r':
        throw syntaxError("Unterminated string");
      case '\\':
        switch (c = next()) {
        case '"':
        case '\'':
        case '\\':
        case '/':
          break;
        case 'b':
          c = '\b';
          break;
        case 't':
          c = '\t';
          break;
        case 'n':
          c = '\n';
          break;
        case 'f':
          c = '\f';
          break;
        case 'r':
          c = '\r';
          break;
        case 'u':
          int i = index;
          index += 4;
          try {
            c = (char) Integer.parseInt(str.substring(i, index), 16);
          } catch (Exception e) {
            throw syntaxError("Substring bounds error");
          }
          break;
        default:
          throw syntaxError("Illegal escape.");
        }
        break;
      default:
        if (c == quote)
          return (sb == null ? str.substring(i0, i1) : sb.toString());
        break;
      }
      if (index > i1 + 1) {
        if (sb == null) {
          sb = new SB();
          sb.append(str.substring(i0, i1));
        }
      }
      if (sb != null)
        sb.appendC(c);
    }
  }

  private Object getObject() {
    Map<String, Object> map = (asHashTable ? new Hashtable<String, Object>() : new HashMap<String, Object>());
    String key = null;
    switch (getChar()) {
    case '}':
      return map;
    case 0:
      throw new JSONException("invalid object");
    }
    returnChar();
    boolean isKey = false;
    for (;;) {
      if ((isKey = !isKey) == true)
        key = getValue(true).toString();
      else
        map.put(key, getValue(false));
      switch (getChar()) {
      case '}':
        return map;
      case ':':
        if (isKey)
          continue;
        isKey = true;
        //$FALL-THROUGH$
      case ',':
        if (!isKey)
          continue;
        //$FALL-THROUGH$
      default:
        throw syntaxError("Expected ',' or ':' or '}'");
      }
    }
  }

  private Object getArray() {
    Lst<Object> l = new Lst<Object>();
    switch (getChar()) {
    case ']':
      return l;
    case '\0':
      throw new JSONException("invalid array");
    }
    returnChar();
    boolean isNull = false;
    for (;;) {
      if (isNull) {
        l.addLast(null);
        isNull = false;
      } else {
        l.addLast(getValue(false));
      }
      switch (getChar()) {
      case ',':
        switch (getChar()) {
        case ']':
          // terminal ,
          return l;
        case ',':
          // empty value
          isNull = true;
          //$FALL-THROUGH$
        default:
          returnChar();
        }
        continue;
      case ']':
        return l;
      default:
        throw syntaxError("Expected ',' or ']'");
      }
    }
  }

  /**
   * Make a JSONException to signal a syntax error.
   * 
   * @param message
   *        The error message.
   * @return A JSONException object, suitable for throwing
   */
  public JSONException syntaxError(String message) {
    return new JSONException(message + " for " + str.substring(0, Math.min(index,  len)));
  }

}
