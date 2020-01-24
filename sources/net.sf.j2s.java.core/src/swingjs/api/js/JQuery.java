package swingjs.api.js;

public interface JQuery {

  JQueryObject $(Object selector);

  DOMNode parseXML(String xmlData);
  
  boolean contains(Object outer, Object inner);

  Object parseJSON(String json);

  Object data(Object node, String attr);

}
