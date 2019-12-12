package test;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;

class Test_Map extends Test_ {
	
    private final static HashMap<String, Object> cache =
            new HashMap<String, Object>(32);

    
    private final static Hashtable<String, Object> cachet =
            new Hashtable<String, Object>(32);

  public static void main(String[] args) {
	  cache.put("test", "here");
	  cachet.put("testing", "tsting");
	  
	  assert(cache.get("test") == "here");

	  for (String e: cache.keySet()) {
		  System.out.println(e);		  
	  }
	  
	  Iterator<String> iter = cachet.keySet().iterator();
	  while (iter.hasNext()) {
		  System.out.println(iter.next());
	  }
	  
	  System.out.println(cache.size());
	  cache.put("test", null);
	  System.out.println(cache.size());
	  cache.put("test3", null);
	  cache.putIfAbsent("test3", "ok");
	  System.out.println(cache.size() + " " + cache.get("test3"));
	  
	  
	  System.out.println("Test_Map OK");
  }
	
}