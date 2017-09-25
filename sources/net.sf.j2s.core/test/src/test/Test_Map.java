package test;

import java.util.HashMap;

class Test_Map extends Test_ {
	
    private final static HashMap<String, Object> cache =
            new HashMap<String, Object>(32);

  public static void main(String[] args) {
	  cache.put("test", "here");
	  assert(cache.get("test") == "here");
	  System.out.println("Test_Map OK");
  }
	
}