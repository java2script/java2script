package javajs.api;

/**
 * methods in JSmol JavaScript accessed in Jmol (aka J2S) 
 */
public interface JmolObjectInterface {

  Object _doAjax(Object url, String postOut, Object bytesOrStringOut, boolean isBinary);

  void _apply(Object func, Object data);

}
