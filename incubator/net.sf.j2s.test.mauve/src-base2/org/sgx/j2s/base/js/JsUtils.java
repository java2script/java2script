package org.sgx.j2s.base.js;

public class JsUtils {
	/**
	 * @j2sNative
	 * return document;
	 */
	public static native Object document();
	
	public static Object body(){
		return GET(document(), "body");
	}
	
	public static Object FUNC(Runnable r) {
		Object target = (Object) GET(r, "run");
		if(r instanceof AbstractRunnable && ((AbstractRunnable)r).getParamCount()>0) {
			target = (Object) GET(r, "run"+((AbstractRunnable)r).getParamCount());
		}
		return withContext(target, r);
	}
	/**
	 * @j2sNative
if(o==null)return "null";
var s = "{";
for(var i in o) {
	var val = null;
	try{
		val = onlyType?typeof(o[i]):o[i];
	}catch(e){val="undefined"}
	s+=","+i+" ==> "+val +"\n";
}
return s+"}";
	 */	
	public native static String dump (Object o, boolean onlyType);
	private static Object withContext(Object func, Runnable context) {
		Object wrapper=func, w2=func;
		if(context!=null) {
			if( !(context instanceof Runnable) ||
				(context instanceof Runnable && !(context instanceof AbstractRunnable)) || 
				(context instanceof AbstractRunnable && ((AbstractRunnable)context).getParamCount()==0)) {
				/**@j2sNative 
					wrapper = function() {
					    w2.call(context, []);	
					};
				 */{}	
			}
			else if(context instanceof AbstractRunnable) {
				AbstractRunnable a = (AbstractRunnable)context;
					/**
					 * @j2sNative
						wrapper = function(a1, a2, a3, a4, a5, a6) {
							var l= arguments.length-1;
							if(l<0) {
						    	w2.call(context, []);	
							}
							else {							
								w2.call(context, arguments[Math.min(0,l)], 
									arguments[Math.min(1,l)], arguments[Math.min(2,l)], 
									arguments[Math.min(3,l)], arguments[Math.min(4,l)], 
									arguments[Math.min(5,l)]);
							}
						}
					 */{}	
			}					
		}
		return wrapper;
	}
	

	/**
	 * @j2sNative
		if(jsObj==null)
			return null;
		jsObj[key]=propValue;
		return jsObj;
	 */	
	public native static Object PUT(Object jsObj, Object key, Object propValue);
	/**
	 * @j2sNative
		if(jsObj==null)
			return null;
		return jsObj[key];
	 */	
	public native static Object GET(Object jsObj, Object key);
	
	/**creates a native javascript objects. Usage: 
	 * <pre>
	 * Object o1 = OBJ(new Object[]{"attr1", 123, "attr2", false});
	 * Object o2 = OBJ(new Object[]{"attr1": 123, "attr2", o1});
	 * </pre>
	 * pass null for creating an empty object.
	 */
	public static Object OBJ(Object [] props)  {
		Object o = null;
		if(props==null || props.length % 2 != 0) {
			/**@j2sNative
			 * o={};
			 */{}
			 return o;
		}
		else {
			o=OBJ(null);
			for (int i = 0; i < props.length-1; i+=2) {	
				
				PUT(o, props[i], NATIVE(props[i+1]));			
			}
			return o;
		}
	}
	
	
	private static Object NATIVE(Object val) {
		if(val instanceof Boolean) {
			return ((Boolean) val).booleanValue();
		}
		else if(val instanceof Integer) {
			return((Integer) val).intValue();
		}
		else if(val instanceof Double) {
			return ((Float) val).doubleValue();
		}
		else if(val instanceof Float) {
			return ((Float) val).floatValue();
		}
		else if(val instanceof Character) {
			return ((Character) val).charValue();
		}
		else if(val instanceof Object[]) {
			return ARR((Object[])val);
		}
		else if( val instanceof Runnable) {
			return FUNC((Runnable) val);
		}
		else{
			//no transformation
			return val;
		}
	}

	public static Object[] ARR(Object[]arr) {
//		Object []out=new Object[arr.length];
		for (int i = 0; i < arr.length; i++) {
			Object val = arr[i];
			if(val instanceof Boolean) {
				boolean realVal = ((Boolean) val).booleanValue();
				/**@j2sNative
				 * arr[i]=realVal;
				 */{}
			}
			else if(val instanceof Integer) {
				int realVal = ((Integer) val).intValue();
				/**@j2sNative
				 * arr[i]=realVal;
				 */{}
			}
			else if(val instanceof Double) {
				double realVal = ((Float) val).doubleValue();
				/**@j2sNative
				 * arr[i]=realVal;
				 */{}
			}
			else if(val instanceof Float) {
				float realVal = ((Float) val).floatValue();
				/**@j2sNative
				 * arr[i]=realVal;
				 */{}
			}
			else if(val instanceof Character) {
				char realVal = ((Character) val).charValue();
				/**@j2sNative
				 * arr[i]=realVal;
				 */{}
			}
			else if(val instanceof Object[]) {
				Object[]realVal=ARR((Object[])val);
				/**@j2sNative
				 * arr[i]=realVal;
				 */{}
			}
			else{
				arr[i]=val;
			}
		}		
		return arr	;	
	}
	
	/**
	 * 
	 * @param func a javascript native function object
	 * @param context a javascript object used as a context in function eval
	 * @param params params to be passed to the function 
	 * @return function's returned value 
	 */
	public static Object CALL(Object func, Object context, Object[]params) {
		if(func==null||context==null)
			throw new NullPointerException();
		if(params==null)
			params=new Object[]{};
		/**
		 * @j2sNative
		 * return func.call(context, params);
		 */{return null;}		
	}
	
	
	public static void loadClasses(Class[]classes, Runnable r) {
		Object func = FUNC(r);
		
	}
	/**
	 * @j2sNative
	 * debugger;
	 */
	public native static void firebugDebug();
}
