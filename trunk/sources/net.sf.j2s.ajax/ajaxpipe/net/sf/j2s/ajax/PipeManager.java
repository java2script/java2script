package net.sf.j2s.ajax;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class PipeManager {
	
	private static Map<String, PipeObject> pipes = Collections
			.synchronizedMap(new HashMap<String, PipeObject>());
	
	public static String registerPipeObject(PipeObject pipe) {
		String key = SimplePipeHelper.nextPipeKey();
		while (pipes.get(key) != null) {
			key = SimplePipeHelper.nextPipeKey();;
		}
		pipes.put(key, pipe);
		return key;
	}

	public static void registerPipeObject(String key, PipeObject pipe) {
		pipes.put(key, pipe);
	}
	
	public static PipeObject unregisterPipeObject(String key) {
		return pipes.remove(key);
	}
	
	public static SimplePipeRunnable getPipe(String key) {
		PipeObject pipeObject = pipes.get(key);
		if (pipeObject == null) {
			return null;
		}
		return pipeObject.getPipe();
	}
	
	public static PipeObject getPipeObject(String key) {
		return pipes.get(key);
	}
	
}
