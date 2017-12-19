package javajs.api.js;

/**
 * methods in JSmol JavaScript accessed in Jmol (aka J2S) 
 */
public interface J2SObjectInterface {

  Object _doAjax(Object url, String postOut, Object bytesOrStringOut, boolean isBinary);

  void _apply(Object func, Object data);

}
