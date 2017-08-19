package javajs.api;

import java.util.Map;

import javajs.util.OC;

public interface GenericImageEncoder {

  public boolean createImage(String type, OC out,
                             Map<String, Object> params) throws Exception;

}
