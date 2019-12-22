/* Copyright 1998, 2005 The Apache Software Foundation or its licensors, as applicable
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package java.lang.reflect;

import java.lang.annotation.Annotation;

/**
 * This class must be implemented by the VM vendor. This class is the superclass
 * of all member reflect classes (Field, Constructor, Method). AccessibleObject
 * provides the ability to toggle access checks for these objects. By default
 * accessing a member (for example, setting a field or invoking a method) checks
 * the validity of the access (for example, invoking a private method from
 * outside the defining class is prohibited) and throws IllegalAccessException
 * if the operation is not permitted. If the accessible flag is set to true,
 * these checks are omitted. This allows privileged applications such as Java
 * Object Serialization, inspectors, and debuggers to have complete access to
 * objects.
 * 
 * @see Field
 * @see Constructor
 * @see Method
 * @see ReflectPermission
 * @since 1.2
 */
public abstract class AccessibleObject implements AnnotatedElement {
	// BH SwingJS made abstract to let Field, Method, and Constructor handle AnnotatedElement interface by themselves
	static final Object[] emptyArgs = new Object[0];

	/**
	 * AccessibleObject constructor. AccessibleObjects can only be created by
	 * the Virtual Machine.
	 */
	protected AccessibleObject() {
		super();
	}

	boolean accessible = true;
	
	/**
	 * Returns the value of the accessible flag. This is false if access checks
	 * are performed, true if they are skipped.
	 * 
	 * @return the value of the accessible flag
	 */
	public boolean isAccessible() {
		return accessible;
	}

	/**
	 * Attempts to set the value of the accessible flag for all the objects in
	 * the array provided. Only one security check is performed. Setting this
	 * flag to false will enable access checks, setting to true will disable
	 * them. If there is a security manager, checkPermission is called with a
	 * ReflectPermission("suppressAccessChecks").
	 * 
	 * @param objects
	 *            the accessible objects
	 * @param flag
	 *            the new value for the accessible flag
	 * @see #setAccessible(boolean)
	 * @see ReflectPermission
	 * @throws SecurityException
	 *             if the request is denied
	 */
	public static void setAccessible(AccessibleObject[] objects, boolean flag)
			throws SecurityException {
		return;
	}

	/**
	 * Attempts to set the value of the accessible flag. Setting this flag to
	 * false will enable access checks, setting to true will disable them. If
	 * there is a security manager, checkPermission is called with a
	 * ReflectPermission("suppressAccessChecks").
	 * 
	 * @param flag
	 *            the new value for the accessible flag
	 * @see ReflectPermission
	 * @throws SecurityException
	 *             if the request is denied
	 */
	public void setAccessible(boolean flag) throws SecurityException {
		accessible = flag;
	}
    
//    /**
//     * @throws NullPointerException {@inheritDoc}
//     * @since 1.5
//     */
//    public <T extends Annotation> T getAnnotation(Class<T> annotationClass) {
//        throw new AssertionError("All subclasses should override this method");
//    }
//
//    /**
//     * {@inheritDoc}
//     * @throws NullPointerException {@inheritDoc}
//     * @since 1.5
//     */
//    @Override
//    public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass) {
//        return AnnotatedElement.super.isAnnotationPresent(annotationClass);
//    }

//   /**
//     * @throws NullPointerException {@inheritDoc}
//     * @since 1.8
//     */
//    @Override
//    public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass) {
//    	// superclass version is only for Class
//        throw new AssertionError("All subclasses should override this method");
//    }
//
    /**
     * @since 1.5
     */
    @Override
	public Annotation[] getAnnotations() {
        return getDeclaredAnnotations();
    }

    /**
     * @throws NullPointerException {@inheritDoc}
     * @since 1.8
     */
    //@Override
    public <T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass) {
        // Only annotations on classes are inherited, for all other
        // objects getDeclaredAnnotation is the same as
        // getAnnotation.
        return getAnnotation(annotationClass);
    }

    /**
     * @throws NullPointerException {@inheritDoc}
     * @since 1.8
     */
    @Override
    public <T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass) {
        // Only annotations on classes are inherited, for all other
        // objects getDeclaredAnnotationsByType is the same as
        // getAnnotationsByType.
        return getAnnotationsByType(annotationClass);
    }

//    /**
//     * @since 1.5
//     */
//    public Annotation[] getDeclaredAnnotations()  {
//        throw new AssertionError("All subclasses should override this method");
//    }
//
//
	static Object[] marshallArguments(@SuppressWarnings("rawtypes") Class[] parameterTypes, Object[] args)
			throws IllegalArgumentException {
		return null;
	}

	void invokeV(Object receiver, Object args[])
			throws InvocationTargetException {
		return;
	}

	Object invokeL(Object receiver, Object args[])
			throws InvocationTargetException {
		return null;
	}

	int invokeI(Object receiver, Object args[])
			throws InvocationTargetException {
		return 0;
	}

	long invokeJ(Object receiver, Object args[])
			throws InvocationTargetException {
		return 0L;
	}

	float invokeF(Object receiver, Object args[])
			throws InvocationTargetException {
		return 0.0F;
	}

	double invokeD(Object receiver, Object args[])
			throws InvocationTargetException {
		return 0.0D;
	}

	
	@Override
	public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass) {
        return getAnnotation(annotationClass) != null;
    }


	// SwingJS not implemented:
	
//	/*native*/ Class<?>[] getParameterTypesImpl() {return null;}
//
//	/*native*/ int getModifiers() {return Member.PUBLIC;}
//
//	/*native*/ Class<?>[] getExceptionTypesImpl(){return null;}
//
//	/*native*/ String getSignature() {return "__FIELD__";}
//
//	/*native*/ boolean checkAccessibility(Class<?> senderClass, Object receiver) {return true;}
//
//	static /*native*/ void initializeClass(Class<?> clazz) {}
//
	/**
	 * Answer the class at depth. Notes: 1) This method operates on the defining
	 * classes of methods on stack. NOT the classes of receivers. 2) The item at
	 * index zero describes the caller of this method.
	 */
	static final /*native*/ Class<?> getStackClass(int depth) {return null;}

	public boolean isSynthetic() {
		// TODO Auto-generated method stub
		return false;
	};
	

}
