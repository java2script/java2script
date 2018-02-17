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

/**
 * Stub for the JSException. This is part of the Applet
 * LiveConnect simulation.
 *
 * TODO: we have to evaluate if it is possible to use plugin.jar from jdk
 *
 * @version $Revision: 9837 $
 * @author Ronald Brill
 */
public class JSObject {

	/**
	 * Empty stub.
	 *
	 * @param jsFuncName
	 *            the paramString
	 * @param params
	 *            the paramArrayOfObject
	 * @return result Object
	 * @throws JSException
	 *             in case or error
	 */
	public Object call(final String jsFuncName, final Object[] params) throws JSException {

		Object ret = null;
		try {
			/**
			 * @j2sNative
			 * 
			 * 
			 * 			ret = self[jsFuncName].apply(null, params);
			 * 
			 */
		} catch (Throwable t) {
			throw new JSException("" + t + " evaluating " + jsFuncName);
		}
		return fixObject(ret);
	}

    @SuppressWarnings("null")
	private Object fixObject(Object ret) {
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
    		return ret;
        }
	}

	/**
     * Empty stub.
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
			 * 			ret = eval(params);
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
			 * 			ret = self[name];
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
    public void setMember(final String name, final Object value) throws JSException {
		try {
			/**
			 * @j2sNative
			 * 
			 * 
			 * 			self[name] = value;
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
    public void removeMember(final String name) throws JSException {
		try {
			/**
			 * @j2sNative
			 * 
			 * 
			 * 			delete self[name];
			 * 
			 */
		} catch (Throwable t) {
			throw new JSException("" + t + " removeMember " + name);
		}
    }

    /**
     * Empty stub.
     *
     * @param paramInt the paramInt
     * @return result Object
     * @throws JSException in case or error
     */
    public Object getSlot(final int paramInt) throws JSException {
        throw new RuntimeException("Not yet implemented (netscape.javascript.JSObject.getSlot(int)).");
    }

    /**
     * Empty stub.
     *
     * @param paramInt the paramInt
     * @param paramObject the paramObject
     * @throws JSException in case or error
     */
    public void setSlot(final int paramInt, final Object paramObject) throws JSException {
        throw new RuntimeException("Not yet implemented (netscape.javascript.JSObject.setSlot(int, Object)).");
    }

    /**
     * Empty stub.
     *
     * @param paramApplet the paramApplet
     * @return result Object
     * @throws JSException in case or error
     */
    public static JSObject getWindow(Applet paramApplet) throws JSException {
    	/**
    	 * @j2sNative
    	 * 
    	 *  return self;
    	 *  
    	 */
    	{
    	return null;
    	}
    }
}
