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
import java.util.Map;

import swingjs.api.js.JSFunction;
import sun.reflect.annotation.AnnotationParser;

/**
 * This class must be implemented by the VM vendor. This class models a method.
 * Information about the method can be accessed, and the method can be invoked
 * dynamically.
 * 
 */
public final class Method extends AccessibleObject implements GenericDeclaration, Member {

	
	private String signature;
	private Class<?> Class_;
	
	private JSFunction $meth$; // SwingJS -- set in AnnotationParser
	boolean isAnnotation; // SwingJS -- set in AnnotationParser
	
	// This is guaranteed to be interned by the VM in the 1.4
	// reflection implementation
	private String name;
	private Class<?> returnType;
	private Class<?>[] parameterTypes;
	private Class<?>[] exceptionTypes;
	private int modifiers = PUBLIC;
    boolean isProxy;
    
//    private Annotation[]              annotations;
//    private Annotation[]              parameterAnnotations;
    private Object                    annotationDefault;
    
	/**
	 * Package-private constructor used by ReflectAccess to enable instantiation of
	 * these objects in Java code from the java.lang package via
	 * sun.reflect.LangReflectAccess.
	 */
	public Method(Class<?> declaringClass, String name, Class<?>[] paramTypes, Class<?> returnType,
			Class<?>[] checkedExceptions, int modifiers) {
		this.Class_ = declaringClass;
		int pt = name.indexOf("$");
		this.name = (pt >= 0 ? name.substring(0, pt) : name);
		this.parameterTypes = (paramTypes == null ? Class.NO_PARAMETERS : paramTypes);
		this.returnType = returnType;
		this.exceptionTypes = checkedExceptions;
		this.modifiers = modifiers;
		// modifier PUBLIC means this is from Class.java getMethods
		if (paramTypes != null && paramTypes.length == 0)
			paramTypes = null;
		this.signature = (paramTypes == Class.UNKNOWN_PARAMETERS 
				|| declaringClass.$methodList$ != null 
				|| declaringClass.isAnnotation() 
				? name : name + Class.argumentTypesToString(paramTypes));
	}

	/**
	 * Return the result of dynamically invoking the modelled method. This
	 * reproduces the effect of
	 * <code>receiver.methodName(arg1, arg2, ... , argN)</code> This method performs
	 * the following:
	 * <ul>
	 * <li>If the modelled method is static, the receiver argument is ignored.</li>
	 * <li>Otherwise, if the receiver is null, a NullPointerException is
	 * thrown.</li> If the receiver is not an instance of the declaring class of the
	 * method, an IllegalArgumentException is thrown.
	 * <li>If this Method object is enforcing access control (see AccessibleObject)
	 * and the modelled method is not accessible from the current context, an
	 * IllegalAccessException is thrown.</li>
	 * <li>If the number of arguments passed and the number of parameters do not
	 * match, an IllegalArgumentException is thrown.</li>
	 * <li>For each argument passed:
	 * <ul>
	 * <li>If the corresponding parameter type is a base type, the argument is
	 * unwrapped. If the unwrapping fails, an IllegalArgumentException is
	 * thrown.</li>
	 * <li>If the resulting argument cannot be converted to the parameter type via a
	 * widening conversion, an IllegalArgumentException is thrown.</li>
	 * </ul>
	 * <li>If the modelled method is static, it is invoked directly. If it is
	 * non-static, the modelled method and the receiver are then used to perform a
	 * standard dynamic method lookup. The resulting method is then invoked.</li>
	 * <li>If an exception is thrown during the invocation it is caught and wrapped
	 * in an InvocationTargetException. This exception is then thrown.</li>
	 * <li>If the invocation completes normally, the return value is itself
	 * returned. If the method is declared to return a base type, the return value
	 * is first wrapped. If the return type is void, null is returned.</li>
	 * </ul>
	 * 
	 * @param receiver The object on which to call the modelled method
	 * @param args     the arguments to the method
	 * @return the new, initialized, object
	 * @exception java.lang.NullPointerException if the receiver is null for a
	 *            non-static method
	 * @exception java.lang.IllegalAccessException if the modelled method is not
	 *            accessible
	 * @exception java.lang.IllegalArgumentException if an incorrect number of
	 *            arguments are passed, the receiver is incompatible with the
	 *            declaring class, or an argument could not be converted by a
	 *            widening conversion
	 * @exception java.lang.reflect.InvocationTargetException if an exception was
	 *            thrown by the invoked method
	 * @see java.lang.reflect.AccessibleObject
	 * 
	 */
	@SuppressWarnings("unused")
	public Object invoke(Object receiver, Object... args)
			throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {

		// proxy does uses this.Class_ as its receiver and ensures initialization
		boolean isProxy = this.isProxy;
		Object[] a = Class.getArgumentArray(parameterTypes, args, isProxy);
		Object c = (isProxy || isAnnotation ? receiver : Class_);
		Object m = null//$meth$
				, val = null;
		String sig = signature;
		/** 
		 * @j2sNative
		 * 
		 * !isProxy && c.$clazz$ && (c = c.$clazz$); 
		 * Clazz._initClass(c,1,1,0);
		 * m || (m = c[sig]) || (m = this.$meth$) || (m = c.prototype && c.prototype[sig]);
		 * val = (m == null ? null : m.apply(receiver,a));
		 */
				
		 if (m == null) {
		  String message = "Method " + getDeclaringClass().getName()
				  + "." + signature + " was not found";
		  throw new IllegalArgumentException(message); 
		}
		return (val == null || isProxy || isAnnotation ? val : wrap(val));
	}

	Object wrap(Object o) {
		switch (/** @j2sNative typeof o || */"") {
		case "number":
			double d = (/** @j2sNative 1 ? o : */0);
			return (d == (int) d ? Integer.valueOf((int) d) : Double.valueOf(d));
		case "boolean":
			return Boolean.valueOf(/** @j2sNative o || */false);
		}
		return o;
	}

	@Override
	public TypeVariable<Method>[] getTypeParameters() {
		return null;
	}

	/**
	 * <p>
	 * Returns the String representation of the method's declaration, including the
	 * type parameters.
	 * </p>
	 * 
	 * @return An instance of String.
	 * @since 1.5
	 */
	public String toGenericString() {
		return null;
	}

	/**
	 * <p>
	 * Gets the parameter types as an array of {@link Type} instances, in
	 * declaration order. If the method has no parameters, then an empty array is
	 * returned.
	 * </p>
	 * 
	 * @return An array of {@link Type} instances.
	 * @throws GenericSignatureFormatError         if the generic method signature
	 *                                             is invalid.
	 * @throws TypeNotPresentException             if the component type points to a
	 *                                             missing type.
	 * @throws MalformedParameterizedTypeException if the component type points to a
	 *                                             type that can't be instantiated
	 *                                             for some reason.
	 * @since 1.5
	 */
	public Type[] getGenericParameterTypes() {
		return null;
	}

	/**
	 * <p>
	 * Gets the exception types as an array of {@link Type} instances. If the method
	 * has no declared exceptions, then an empty array is returned.
	 * </p>
	 * 
	 * @return An array of {@link Type} instances.
	 * @throws GenericSignatureFormatError         if the generic method signature
	 *                                             is invalid.
	 * @throws TypeNotPresentException             if the component type points to a
	 *                                             missing type.
	 * @throws MalformedParameterizedTypeException if the component type points to a
	 *                                             type that can't be instantiated
	 *                                             for some reason.
	 * @since 1.5
	 */
	public Type[] getGenericExceptionTypes() {
		return null;
	}

	/**
	 * <p>
	 * Gets the return type as a {@link Type} instance.
	 * </p>
	 * 
	 * @return A {@link Type} instance.
	 * @throws GenericSignatureFormatError         if the generic method signature
	 *                                             is invalid.
	 * @throws TypeNotPresentException             if the component type points to a
	 *                                             missing type.
	 * @throws MalformedParameterizedTypeException if the component type points to a
	 *                                             type that can't be instantiated
	 *                                             for some reason.
	 * @since 1.5
	 */
	public Type getGenericReturnType() {
		return null;
	}

	/**
	 * <p>
	 * Gets an array of arrays that represent the annotations of the formal
	 * parameters of this method. If there are no parameters on this method, then an
	 * empty array is returned. If there are no annotations set, then and array of
	 * empty arrays is returned.
	 * </p>
	 * 
	 * @return An array of arrays of {@link Annotation} instances.
	 * @since 1.5
	 */
	public Annotation[][] getParameterAnnotations() {
		// TODO
		return null;
	}

	/**
	 * <p>
	 * Indicates whether or not this method takes a variable number argument.
	 * </p>
	 * 
	 * @return A value of <code>true</code> if a vararg is declare, otherwise
	 *         <code>false</code>.
	 * @since 1.5
	 */
	public boolean isVarArgs() {
		return false;
	}

	/**
	 * <p>
	 * Indicates whether or not this method is a bridge.
	 * </p>
	 * 
	 * @return A value of <code>true</code> if this method's a bridge, otherwise
	 *         <code>false</code>.
	 * @since 1.5
	 */
	public boolean isBridge() {
		return false;
	}

    @Override
	public boolean isSynthetic() {
        return super.isSynthetic();
    }

	/**
	 * <p>
	 * Gets the default value for the annotation member represented by this method.
	 * </p>
	 * 
	 * @return The default value or <code>null</code> if none.
	 * @throws TypeNotPresentException if the annotation is of type {@link Class}
	 *                                 and no definition can be found.
	 * @since 1.5
	 */
	public Object getDefaultValue() {
		// just the value in SwingJS
		return annotationDefault;
	}

	/**
	 * Compares the specified object to this Method and answer if they are equal.
	 * The object must be an instance of Method with the same defining class and
	 * parameter types.
	 * 
	 * @param object the object to compare
	 * @return true if the specified object is equal to this Method, false otherwise
	 * @see #hashCode
	 */
	@Override
	public boolean equals(Object object) {
		if (object != null && object instanceof Method) {
			Method other = (Method) object;
			if ((getDeclaringClass() == other.getDeclaringClass()) && (getName() == other.getName())) {
				/* Avoid unnecessary cloning */
				Class<?>[] params1 = parameterTypes;
				Class<?>[] params2 = other.parameterTypes;
				if (params1.length == params2.length) {
					for (int i = 0; i < params1.length; i++) {
						if (params1[i] != params2[i])
							return false;
					}
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Return the {@link Class} associated with the class that defined this method.
	 * 
	 * @return the declaring class
	 */
	@Override
	public Class<?> getDeclaringClass() {
		return Class_;
	}

	/**
	 * Return an array of the {@link Class} objects associated with the exceptions
	 * declared to be thrown by this method. If the method was not declared to throw
	 * any exceptions, the array returned will be empty.
	 * 
	 * @return the declared exception classes
	 */
	public Class<?>[] getExceptionTypes() {
		return exceptionTypes;
	}

	/**
	 * Return the modifiers for the modelled method. The Modifier class should be
	 * used to decode the result.
	 * 
	 * @return the modifiers
	 * @see java.lang.reflect.Modifier
	 */
	@Override
	public int getModifiers() {
		return modifiers;
	}

	/**
	 * Return the name of the modelled method.
	 * 
	 * @return the name
	 */
	@Override
	public String getName() {
		return name;
	}

	/**
	 * Return an array of the {@link Class} objects associated with the parameter
	 * types of this method. If the method was declared with no parameters, the
	 * array returned will be empty.
	 * 
	 * @return the parameter types
	 */
	public Class<?>[] getParameterTypes() {
		return (parameterTypes == Class.UNKNOWN_PARAMETERS ?
			parameterTypes = AnnotationParser.JSAnnotationObject.guessMethodParameterTypes(signature) : parameterTypes);
	}

	/**
	 * Return the {@link Class} associated with the return type of this method.
	 * 
	 * @return the return type
	 */
	public Class<?> getReturnType() {
		// SwingJS will store this as a String to avoid unnecessary class loading
		if (returnType == null || returnType instanceof Class)
			return (Class<?>) returnType;
		return (Class<?>) (returnType = AnnotationParser.JSAnnotationObject.typeForString(returnType.toString(), true));
	}


	/**
	 * SwingJS method to retrieve actual JavaScript name.
	 * 
	 * @return
	 */
	public String getSignature() {
		return (String) signature;
	}
	
	/**
	 * Answers an integer hash code for the receiver. Objects which are equal answer
	 * the same value for this method. The hash code for a Method is the hash code
	 * of the method's name.
	 * 
	 * @return the receiver's hash
	 * @see #equals
	 */
	@Override
	public int hashCode() {
		return getDeclaringClass().getName().hashCode() ^ getName().hashCode();
	}

	/**
	 * Answers a string containing a concise, human-readable description of the
	 * receiver. The format of the string is modifiers (if any) return type
	 * declaring class name '.' method name '(' parameter types, separated by ','
	 * ')' If the method throws exceptions, ' throws ' exception types, separated by
	 * ',' For example:
	 * <code>public native Object java.lang.Method.invoke(Object,Object) throws IllegalAccessException,IllegalArgumentException,InvocationTargetException</code>
	 * 
	 * @return a printable representation for the receiver
	 */
	@Override
	public String toString() {
		return Class_.getName() + "." + name;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Annotation[] getDeclaredAnnotations() {
		return AnnotationParser.toArray(declaredAnnotations());
	}

	private transient Map<Class<? extends Annotation>, Annotation> declaredAnnotations;

	private synchronized Map<Class<? extends Annotation>, Annotation> declaredAnnotations() {
		if (declaredAnnotations == null) {
				declaredAnnotations = AnnotationParser.parseAnnotations(signature, getDeclaringClass(), true);
		}
		return declaredAnnotations;
	}

	public void _setJSMethod(Object o, int modifiers) {
		$meth$ = (JSFunction) o;
		signature = /** @j2sNative	o && o.exName || */ null;
		this.modifiers |= modifiers;
	}

	public Object _getJSMethod() {
		return $meth$;
	}

	public void setDefaultValue(Object val) {
		annotationDefault = val;
	}


	@Override
	public <T extends Annotation> T getAnnotation(Class<T> annotationClass) {
		return (T) declaredAnnotations().get(annotationClass);
	}

	// from AnnotatedElement
	@Override
	public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass) {
        return getDeclaredAnnotationsByType(annotationClass);
    }

}
