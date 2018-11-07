package javajs.api.js;

/**
 * methods in JSmol JavaScript accessed in Jmol
 */
public interface J2SObjectInterface {

	Object doAjax(String url, String postOut, Object bytesOrStringOut, Object info);

	void applyFunc(Object func, Object data);

}
