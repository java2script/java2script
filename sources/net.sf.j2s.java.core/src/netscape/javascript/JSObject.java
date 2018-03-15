/*
 * Copyright (c) 2002-2015 Gargoyle Software Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package netscape.javascript;

import java.applet.Applet;
import java.applet.AppletContext;

/**
 * 
 * BH: Adapted for SwingJS: 
 * 
 * getWindow(applet) returns a JSObject with this.obj = applet.getAppletContext().html5Applet._window
 * 
 * Object returns are one of [null, Boolean, Double, String, JSObject (from "object" type)]
 * 
 * 
 * Stub for the JSException. This is part of the Applet LiveConnect simulation.
 *
 * @version $Revision: 9837 $
 * @author Ronald Brill
 */
public class JSObject {

	@SuppressWarnings("unused")
	private Object obj; // html5Applet._window, for instance;
	
	public JSObject() {
	}

	/**
	 * @param jsFuncName
	 *            the paramString
	 * @param params
	 *            the paramArrayOfObject
	 * @return result Object
	 * @throws JSException
	 *             in case or error
	 */
	public Object call(String jsFuncName, Object[] params) throws JSException {
		Object ret = null;
		try {
			if (params == null)
				params = new Object[0];
			for (int i = params.length; --i >= 0;) {
				params[i] = unfixObject(params[i]);
			}
				
			/**
			 * @j2sNative
			 * 
			 * 			ret = this.obj[jsFuncName].apply(this.obj, params);
			 * 
			 */
		} catch (Throwable t) {
			throw new JSException("" + t + " evaluating " + jsFuncName);
		}
		return fixObject(ret);
	}

	private Object unfixObject(Object o) {
		Object ret = o;
		if (o == null) {
			return null;
		} else if (o instanceof Number) {
			/**
			 * @j2sNative
			 * 
			 * return o.doubleValue();
			 */
		} else if (o instanceof Boolean) {
			/**
			 * @j2sNative
			 * 
			 * return o.BooleanValue();
			 */
		} else if (o instanceof JSObject) {
			return ((JSObject) o).obj;
		}
		return ret;
		
	}
	
    @SuppressWarnings("null")
	private Object fixObject(Object ret) {
    	if (ret == null)
    		return  null;

    	String type = null;
    	/**
    	 * @j2sNative
    	 * 
    	 * type = typeof ret;
    	 */
        
        switch (type) {
        case "number":
        	return Double.valueOf("" + ret);
        case "boolean":
        	return Boolean.valueOf("" + ret);
        default:
        	JSObject jsobject = new JSObject();
        	jsobject.obj = ret;
        	return jsobject;
        }
	}

	/**
     *
     * @param paramString the paramString
     * @return result Object
     * @throws JSException in case or error
     */
    public Object eval(String params) throws JSException {
		Object ret = null;
		try {
			/**
			 * @j2sNative
			 * 
			 * 
			 * 			ret = this.obj.eval(params);
			 * 
			 */
		} catch (Throwable t) {
			throw new JSException("" + t + " evaluating " + params);
		}
		return fixObject(ret);
    }

    /**
     *
     * @param paramString the paramString
     * @return result Object
     * @throws JSException in case or error
     */
    public Object getMember(String name) throws JSException {
		Object ret = null;
		try {
			/**
			 * @j2sNative
			 * 
			 * 
			 * 			ret = this.obj[name];
			 * 
			 */
		} catch (Throwable t) {
			throw new JSException("" + t + " getMember " + name);
		}
		return fixObject(ret);
    }

    /**
     * @param name the paramString
     * @param value the paramObject
     * @throws JSException in case or error
     */
    public void setMember(String name,  Object value) throws JSException {
		try {
			/**
			 * @j2sNative
			 * 
			 * 
			 * 			this.obj[name] = value;
			 * 
			 */
		} catch (Throwable t) {
			throw new JSException("" + t + " setMember " + name + " " + value);
		}
    }

    /**
     *
     * @param paramString the paramString
     * @throws JSException in case or error
     */
    public void removeMember(String name) throws JSException {
		try {
			/**
			 * @j2sNative
			 * 
			 * 
			 * 			delete this.obj[name];
			 * 
			 */
		} catch (Throwable t) {
			throw new JSException("" + t + " removeMember " + name);
		}
    }

    /**
     *
     * @param index
     * @return result Object
     * @throws JSException in case or error
     */
    public Object getSlot(int index) throws JSException {
      Object ret = null;
		try {
      /**
       * @j2sNative
       * 
       * return this.obj[index];
       * 
       */
      return fixObject(ret);
		} catch (Throwable t) {
			throw new JSException("" + t + " getSlot");
		}
    }

    /**
     *
     * @param index the paramInt
     * @param val the paramObject
     * @throws JSException in case or error
     */
    public void setSlot(int index, Object val) throws JSException {
		try {
        /**
         * @j2sNative
         * 
         *  this.obj[index] = val;
         * 
         */
		} catch (Throwable t) {
			throw new JSException("" + t + " setSlot");
		}
    }

    /**
     * Empty stub.
     *
     * @param applet the paramApplet
     * @return result Object
     * @throws JSException in case or error
     */
    public static JSObject getWindow(Applet applet) throws JSException {
    	JSObject jsobject = new JSObject();
		@SuppressWarnings("unused")
		AppletContext context = applet.getAppletContext();
		jsobject.obj = /** @j2sNative context.html5Applet._window || */ null;
		return jsobject;
    }
}
