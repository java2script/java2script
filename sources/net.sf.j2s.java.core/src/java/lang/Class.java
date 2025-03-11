/*

 * Copyright 1994-2006 Sun Microsystems, Inc.  All Rights Reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Sun designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Sun in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Sun Microsystems, Inc., 4150 Network Circle, Santa Clara,
 * CA 95054 USA or visit www.sun.com if you need additional information or
 * have any questions.
 */

package java.lang;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.GenericSignatureFormatError;
import java.lang.reflect.Member;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
//import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

import sun.misc.CompoundEnumeration;
import sun.reflect.annotation.AnnotationParser;
import sun.reflect.annotation.AnnotationSupport;
import sun.reflect.annotation.AnnotationType;
import swingjs.JSUtil;

/**
 * Instances of the class {@code Class} represent classes and interfaces in a
 * running Java application. An enum is a kind of class and an annotation is a
 * kind of interface. Every array also belongs to a class that is reflected as a
 * {@code Class} object that is shared by all arrays with the same element type
 * and number of dimensions. The primitive Java types ({@code boolean},
 * {@code byte}, {@code char}, {@code short}, {@code int}, {@code long},
 * {@code float}, and {@code double}), and the keyword {@code void} are also
 * represented as {@code Class} objects.
 *
 * <p>
 * {@code Class} has no public constructor. Instead {@code Class} objects are
 * constructed automatically by the Java Virtual Machine as classes are loaded
 * and by calls to the {@code defineClass} method in the class loader.
 *
 * <p>
 * The following example uses a {@code Class} object to print the class name of
 * an object:
 *
 * <p>
 * <blockquote>
 * 
 * <pre>
 * void printClassName(Object obj) {
 * 	System.out.println("The class of " + obj + " is " + obj.getClass().getName());
 * }
 * </pre>
 * 
 * </blockquote>
 *
 * <p>
 * It is also possible to get the {@code Class} object for a named type (or for
 * void) using a class literal (JLS Section <A HREF=
 * "http://java.sun.com/docs/books/jls/second_edition/html/expressions.doc.html#251530">15.8.2</A>).
 * For example:
 *
 * <p>
 * <blockquote>
 * {@code System.out.println("The name of class Foo is: "+Foo.class.getName());}
 * </blockquote>
 *
 * @param <T>
 *            the type of the class modeled by this {@code Class} object. For
 *            example, the type of {@code String.class} is {@code
 * Class<String>}. Use {@code Class<?>} if the class being modeled is unknown.
 *
 * @author unascribed
 * @see java.lang.ClassLoader#defineClass(byte[], int, int)
 * @since JDK1.0
 */
public final class Class<T> {
	// SwingJS provide a cleaner loading sequence
	//implements Serializable, GenericDeclaration, AnnotatedElement {
    private static final int ANNOTATION = 0x00002000;
    private static final int ENUM       = 0x00004000;
//    private static final int SYNTHETIC = 0x00001000;


//	private static class JSClass {
//		public String __CLASS_NAME__;
//	}
	public Object $clazz$; //  BH SwingJS
	public String[] $methodList$; // BH see j2sClazz.js Clazz.getClass, from interface parameters
	
//	private static native void registerNatives();
//
//	static {
//		registerNatives();
//	}

	/*
	 * Constructor. Only the Java Virtual Machine creates Class objects.
	 */
	private Class() {
	}

	/**
	 * Converts the object to a string. The string representation is the string
	 * "class" or "interface", followed by a space, and then by the fully
	 * qualified name of the class in the format returned by {@code getName}. If
	 * this {@code Class} object represents a primitive type, this method
	 * returns the name of the primitive type. If this {@code Class} object
	 * represents void this method returns "void".
	 *
	 * @return a string representation of this class object.
	 */
	@Override
	public String toString() {
		return (isInterface() ? "interface " : (isPrimitive() ? "" : "class ")) + getName();
	}

	/**
	 * Returns the {@code Class} object associated with the class or interface
	 * with the given string name. Invoking this method is equivalent to:
	 *
	 * <blockquote> {@code Class.forName(className, true, currentLoader)}
	 * </blockquote>
	 *
	 * where {@code currentLoader} denotes the defining class loader of the
	 * current class.
	 *
	 * <p>
	 * For example, the following code fragment returns the runtime
	 * {@code Class} descriptor for the class named {@code java.lang.Thread}:
	 *
	 * <blockquote> {@code Class t = Class.forName("java.lang.Thread")}
	 * </blockquote>
	 * <p>
	 * A call to {@code forName("X")} causes the class named {@code X} to be
	 * initialized.
	 *
	 * @param className
	 *            the fully qualified name of the desired class.
	 * @return the {@code Class} object for the class with the specified name.
	 * @exception LinkageError
	 *                if the linkage fails
	 * @exception ExceptionInInitializerError
	 *                if the initialization provoked by this method fails
	 * @exception ClassNotFoundException
	 *                if the class cannot be located
	 */
	public static Class<?> forName(String className) throws ClassNotFoundException {
		return forName0(className, true, null);//ClassLoader.getCallerClassLoader());
	}

	/**
	 * Returns the {@code Class} object associated with the class or interface
	 * with the given string name, using the given class loader. Given the fully
	 * qualified name for a class or interface (in the same format returned by
	 * {@code getName}) this method attempts to locate, load, and link the class
	 * or interface. The specified class loader is used to load the class or
	 * interface. If the parameter {@code loader} is null, the class is loaded
	 * through the bootstrap class loader. The class is initialized only if the
	 * {@code initialize} parameter is {@code true} and if it has not been
	 * initialized earlier.
	 *
	 * <p>
	 * If {@code name} denotes a primitive type or void, an attempt will be made
	 * to locate a user-defined class in the unnamed package whose name is
	 * {@code name}. Therefore, this method cannot be used to obtain any of the
	 * {@code Class} objects representing primitive types or void.
	 *
	 * <p>
	 * If {@code name} denotes an array class, the component type of the array
	 * class is loaded but not initialized.
	 *
	 * <p>
	 * For example, in an instance method the expression:
	 *
	 * <blockquote> {@code Class.forName("Foo")} </blockquote>
	 *
	 * is equivalent to:
	 *
	 * <blockquote>
	 * {@code Class.forName("Foo", true, this.getClass().getClassLoader())}
	 * </blockquote>
	 *
	 * Note that this method throws errors related to loading, linking or
	 * initializing as specified in Sections 12.2, 12.3 and 12.4 of <em>The Java
	 * Language Specification</em>. Note that this method does not check whether
	 * the requested class is accessible to its caller.
	 *
	 * <p>
	 * If the {@code loader} is {@code null}, and a security manager is present,
	 * and the caller's class loader is not null, then this method calls the
	 * security manager's {@code checkPermission} method with a
	 * {@code RuntimePermission("getClassLoader")} permission to ensure it's ok
	 * to access the bootstrap class loader.
	 *
	 * @param name
	 *            fully qualified name of the desired class
	 * @param initialize
	 *            whether the class must be initialized
	 * @param loader
	 *            class loader from which the class must be loaded
	 * @return class object representing the desired class
	 *
	 * @exception LinkageError
	 *                if the linkage fails
	 * @exception ExceptionInInitializerError
	 *                if the initialization provoked by this method fails
	 * @exception ClassNotFoundException
	 *                if the class cannot be located by the specified class
	 *                loader
	 *
	 * @see java.lang.Class#forName(String)
	 * @see java.lang.ClassLoader
	 * @since 1.2
	 */
	public static Class<?> forName(String name, boolean initialize, ClassLoader loader) throws ClassNotFoundException {
		// if (loader == null) {
		// SecurityManager sm = System.getSecurityManager();
		// if (sm != null) {
		// ClassLoader ccl = ClassLoader.getCallerClassLoader();
		// if (ccl != null) {
		// sm.checkPermission(
		// SecurityConstants.GET_CLASSLOADER_PERMISSION);
		// }
		// }
		// }
		return forName0(name, initialize, loader);
	}

	/** Called after security checks have been made. */
	private static Class<?> forName0(String name, boolean initialize, ClassLoader loader)
			throws ClassNotFoundException {
		/**
		 * @j2sNative
		 * 
		 * return Clazz.forName(name, initialize, loader);
		 */
		{
			 return null;
		 }
	}

	/**
	 * Creates a new instance of the class represented by this {@code Class}
	 * object. The class is instantiated as if by a {@code new} expression with
	 * an empty argument list. The class is initialized if it has not already
	 * been initialized.
	 *
	 * <p>
	 * Note that this method propagates any exception thrown by the nullary
	 * constructor, including a checked exception. Use of this method
	 * effectively bypasses the compile-time exception checking that would
	 * otherwise be performed by the compiler. The
	 * {@link java.lang.reflect.Constructor#newInstance(java.lang.Object...)
	 * Constructor.newInstance} method avoids this problem by wrapping any
	 * exception thrown by the constructor in a (checked)
	 * {@link java.lang.reflect.InvocationTargetException}.
	 *
	 * @return a newly allocated instance of the class represented by this
	 *         object.
	 * @exception IllegalAccessException
	 *                if the class or its nullary constructor is not accessible.
	 * @exception InstantiationException
	 *                if this {@code Class} represents an abstract class, an
	 *                interface, an array class, a primitive type, or void; or
	 *                if the class has no nullary constructor; or if the
	 *                instantiation fails for some other reason.
	 * @exception ExceptionInInitializerError
	 *                if the initialization provoked by this method fails.
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.PUBLIC)} denies creation
	 *                of new instances of this class
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 */
	public T newInstance() throws InstantiationException, IllegalAccessException {
//		if (System.getSecurityManager() != null) {
//			checkMemberAccess(Member.PUBLIC, ClassLoader.getCallerClassLoader());
//		}
		
		@SuppressWarnings("unused")
		Object c = $clazz$;
		/**
		 * @j2sNative
	     * return new c;
		 */
		{
			return null;			
		}
//		return newInstance0();
	}

//	private T newInstance0() throws InstantiationException, IllegalAccessException {
//		// NOTE: the following code may not be strictly correct under
//		// the current Java memory model.
//
//		// Constructor lookup
//		if (cachedConstructor == null) {
//			if (this == Class.class) {
//				throw new IllegalAccessException("Can not call newInstance() on the Class for java.lang.Class");
//			}
//			try {
//				Class[] empty = {};
//				final Constructor<T> c = getConstructor0(empty, Member.DECLARED);
//				// Disable accessibility checks on the constructor
//				// since we have to do the security check here anyway
//				// (the stack depth is wrong for the Constructor's
//				// security check to work)
////				java.security.AccessController.doPrivileged(new java.security.PrivilegedAction() {
////					public Object run() {
////						c.setAccessible(true);
////						return null;
////					}
////				});
//				cachedConstructor = c;
//			} catch (NoSuchMethodException e) {
//				throw new InstantiationException(getName());
//			}
//		}
//		Constructor<T> tmpConstructor = cachedConstructor;
//		// Security check (same as in java.lang.reflect.Constructor)
//		int modifiers = tmpConstructor.getModifiers();
////		if (!Reflection.quickCheckMemberAccess(this, modifiers)) {
////			Class caller = Reflection.getCallerClass(3);
////			if (newInstanceCallerCache != caller) {
////				Reflection.ensureMemberAccess(caller, this, null, modifiers);
////				newInstanceCallerCache = caller;
////			}
////		}
//		// Run constructor
//		try {
//			return tmpConstructor.newInstance((Object[]) null);
//		} catch (InvocationTargetException e) {
////			Unsafe.getUnsafe().throwException(e.getTargetException());
//			// Not reached
//			return null;
//		}
//	}

//	private volatile transient Constructor<T> cachedConstructor;
//	private volatile transient Class newInstanceCallerCache;

	/**
	 * Determines if the specified {@code Object} is assignment-compatible with
	 * the object represented by this {@code Class}. This method is the dynamic
	 * equivalent of the Java language {@code instanceof} operator. The method
	 * returns {@code true} if the specified {@code Object} argument is non-null
	 * and can be cast to the reference type represented by this {@code Class}
	 * object without raising a {@code ClassCastException.} It returns
	 * {@code false} otherwise.
	 *
	 * <p>
	 * Specifically, if this {@code Class} object represents a declared class,
	 * this method returns {@code true} if the specified {@code Object} argument
	 * is an instance of the represented class (or of any of its subclasses); it
	 * returns {@code false} otherwise. If this {@code Class} object represents
	 * an array class, this method returns {@code true} if the specified
	 * {@code Object} argument can be converted to an object of the array class
	 * by an identity conversion or by a widening reference conversion; it
	 * returns {@code false} otherwise. If this {@code Class} object represents
	 * an interface, this method returns {@code true} if the class or any
	 * superclass of the specified {@code Object} argument implements this
	 * interface; it returns {@code false} otherwise. If this {@code Class}
	 * object represents a primitive type, this method returns {@code false}.
	 *
	 * @param obj
	 *            the object to check
	 * @return true if {@code obj} is an instance of this class
	 *
	 * @since JDK1.1
	 */
	public boolean isInstance(Object obj) {
		@SuppressWarnings("unused")
		Object c = $clazz$;
		/**
		 * @j2sNative  return Clazz.instanceOf(obj, c);
		 */
		{ 
			return false;
		}
	}

	/**
	 * Determines if the class or interface represented by this {@code Class}
	 * object is either the same as, or is a superclass or superinterface of,
	 * the class or interface represented by the specified {@code Class}
	 * parameter. It returns {@code true} if so; otherwise it returns
	 * {@code false}. If this {@code Class} object represents a primitive type,
	 * this method returns {@code true} if the specified {@code Class} parameter
	 * is exactly this {@code Class} object; otherwise it returns {@code false}.
	 *
	 * <p>
	 * Specifically, this method tests whether the type represented by the
	 * specified {@code Class} parameter can be converted to the type
	 * represented by this {@code Class} object via an identity conversion or
	 * via a widening reference conversion. See <em>The Java Language
	 * Specification</em>, sections 5.1.1 and 5.1.4 , for details.
	 *
	 * @param cls
	 *            the {@code Class} object to be checked
	 * @return the {@code boolean} value indicating whether objects of the type
	 *         {@code cls} can be assigned to objects of this class
	 * @exception NullPointerException
	 *                if the specified Class parameter is null.
	 * @since JDK1.1
	 */
	@SuppressWarnings("unused")
	public boolean isAssignableFrom(Class<?> cls) {
		if (cls == null)
			return false;
		Object a = cls.$clazz$;
		Object me = $clazz$;
		return /** @j2sNative Clazz.instanceOf(a, me) || */ false;

	}

	/**
	 * Determines if the specified {@code Class} object represents an interface
	 * type.
	 *
	 * @return {@code true} if this object represents an interface;
	 *         {@code false} otherwise.
	 */
	public boolean isInterface() {
		@SuppressWarnings("unused")
		Object me = $clazz$;
		/**
		 * @j2sNative   return me.$isInterface;
		 * 
		 */
		{
			return false;
		}
	}

	/**
	 * Determines if this {@code Class} object represents an array class.
	 *
	 * @return {@code true} if this object represents an array class;
	 *         {@code false} otherwise.
	 * @since JDK1.1
	 */
	public boolean isArray() {
		@SuppressWarnings("unused")
		Object me = $clazz$;
		/**
		 * @j2sNative    return !!me.__ARRAYTYPE;
		 */
		{
		return false;
		}
	}

	/**
	 * Determines if the specified {@code Class} object represents a primitive
	 * type.
	 *
	 * <p>
	 * There are nine predefined {@code Class} objects to represent the eight
	 * primitive types and void. These are created by the Java Virtual Machine,
	 * and have the same names as the primitive types that they represent,
	 * namely {@code boolean}, {@code byte}, {@code char}, {@code short},
	 * {@code int}, {@code long}, {@code float}, and {@code double}.
	 *
	 * <p>
	 * These objects may only be accessed via the following public static final
	 * variables, and are the only {@code Class} objects for which this method
	 * returns {@code true}.
	 *
	 * @return true if and only if this class represents a primitive type
	 *
	 * @see java.lang.Boolean#TYPE
	 * @see java.lang.Character#TYPE
	 * @see java.lang.Byte#TYPE
	 * @see java.lang.Short#TYPE
	 * @see java.lang.Integer#TYPE
	 * @see java.lang.Long#TYPE
	 * @see java.lang.Float#TYPE
	 * @see java.lang.Double#TYPE
	 * @see java.lang.Void#TYPE
	 * @since JDK1.1
	 */
	public boolean isPrimitive() {
		/**
		 * @j2sNative   return !!this.__PRIMITIVE;
		 *
		 */
		{
			return true;
		}
	}

	/**
	 * Returns true if this {@code Class} object represents an annotation type.
	 * Note that if this method returns true, {@link #isInterface()} would also
	 * return true, as all annotation types are also interfaces.
	 *
	 * @return {@code true} if this class object represents an annotation type;
	 *         {@code false} otherwise
	 * @since 1.5
	 */
	public boolean isAnnotation() {		
		@SuppressWarnings("unused")
		Object me = $clazz$;
		/**
		 * @j2sNative  return !!me.$getMembers$;
		 *
		 */
		{
			return true;
		}
	}

	/**
	 * Returns true if and only if this class was declared as an enum in the
	 * source code.
	 *
	 * @return true if and only if this class was declared as an enum in the
	 *         source code
	 * @since 1.5
	 */
	public boolean isEnum() {
		@SuppressWarnings("unused")
		Object me = $clazz$;
		/**
		 * @j2sNative   return !!me.$isEnum;
		 * 
		 */
		{
			return false;
		}
//		// An enum must both directly extend java.lang.Enum and have
//		// the ENUM bit set; classes for specialized enum constants
//		// don't do the former.
//		return //getModifiers() & Modifier.ENUM) != 0 && 
//				this.getSuperclass() == java.lang.Enum.class;
	}


	/**
	 * Returns {@code true} if this class is a synthetic class; returns
	 * {@code false} otherwise.
	 * 
	 * @return {@code true} if and only if this class is a synthetic class as
	 *         defined by the Java Language Specification.
	 * @since 1.5
	 */
	public boolean isSynthetic() {
		return false;
//		return (getModifiers() & SYNTHETIC) != 0;
	}

	/**
	 * Returns the name of the entity (class, interface, array class, primitive
	 * type, or void) represented by this {@code Class} object, as a
	 * {@code String}.
	 *
	 * <p>
	 * If this class object represents a reference type that is not an array
	 * type then the binary name of the class is returned, as specified by the
	 * Java Language Specification, Second Edition.
	 *
	 * <p>
	 * If this class object represents a primitive type or void, then the name
	 * returned is a {@code String} equal to the Java language keyword
	 * corresponding to the primitive type or void.
	 *
	 * <p>
	 * If this class object represents a class of arrays, then the internal form
	 * of the name consists of the name of the element type preceded by one or
	 * more '{@code [}' characters representing the depth of the array nesting.
	 * The encoding of element type names is as follows:
	 *
	 * <blockquote>
	 * <table summary="Element types and encodings">
	 * <tr>
	 * <th>Element Type
	 * <th>&nbsp;&nbsp;&nbsp;
	 * <th>Encoding
	 * <tr>
	 * <td>boolean
	 * <td>&nbsp;&nbsp;&nbsp;
	 * <td align=center>Z
	 * <tr>
	 * <td>byte
	 * <td>&nbsp;&nbsp;&nbsp;
	 * <td align=center>B
	 * <tr>
	 * <td>char
	 * <td>&nbsp;&nbsp;&nbsp;
	 * <td align=center>C
	 * <tr>
	 * <td>class or interface
	 * <td>&nbsp;&nbsp;&nbsp;
	 * <td align=center>L<i>classname</i>;
	 * <tr>
	 * <td>double
	 * <td>&nbsp;&nbsp;&nbsp;
	 * <td align=center>D
	 * <tr>
	 * <td>float
	 * <td>&nbsp;&nbsp;&nbsp;
	 * <td align=center>F
	 * <tr>
	 * <td>int
	 * <td>&nbsp;&nbsp;&nbsp;
	 * <td align=center>I
	 * <tr>
	 * <td>long
	 * <td>&nbsp;&nbsp;&nbsp;
	 * <td align=center>J
	 * <tr>
	 * <td>short
	 * <td>&nbsp;&nbsp;&nbsp;
	 * <td align=center>S
	 * </table>
	 * </blockquote>
	 *
	 * <p>
	 * The class or interface name <i>classname</i> is the binary name of the
	 * class specified above.
	 *
	 * <p>
	 * Examples: <blockquote>
	 * 
	 * <pre>
	 * String.class.getName()
	 *     returns "java.lang.String"
	 * byte.class.getName()
	 *     returns "byte"
	 * (new Object[3]).getClass().getName()
	 *     returns "[Ljava.lang.Object;"
	 * (new int[3][4][5][6][7][8][9]).getClass().getName()
	 *     returns "[[[[[[[I"
	 * </pre>
	 * 
	 * </blockquote>
	 *
	 * @return the name of the class or interface represented by this object.
	 */
	public String getName() {
		if (name == null)
			name = getName0();
		return name;
	}

	// cache the name to reduce the number of calls into the VM
	private transient String name;
	private Field[] fields;
	private Class<?>[] implementz;
	private int modifiers = -1;

	private String getName0() {
		String code = "";

		/**
		 * @j2sNative
		 * 
		 * 			code = this.$clazz$.__CLASS_NAME$__ ||
		 *            this.$clazz$.__CLASS_NAME__; 
		 *            
		 *            if (code) return (code.indexOf(".") < 0 ? "java.lang." + code : code);
		 * 
		 *            code = this.$clazz$.__PARAMCODE;
		 * 
		 */

		switch (code) {
		case "S":
			code = "String";
			break;
		case "I":
			code = "Integer";
			break;
		case "H":
			code = "Short";
			break;
		case "B":
			code = "Byte";
			break;
		case "J":
			code = "Long";
			break;
		case "C":
			code = "Character";
			break;
		case "O":
			code = "Object";
			break;
		default:
			return null;
		}
		return "java.lang." + code;

	}
	
	/**
	 * Returns the class loader for the class. Some implementations may use null
	 * to represent the bootstrap class loader. This method will return null in
	 * such implementations if this class was loaded by the bootstrap class
	 * loader.
	 *
	 * <p>
	 * If a security manager is present, and the caller's class loader is not
	 * null and the caller's class loader is not the same as or an ancestor of
	 * the class loader for the class whose class loader is requested, then this
	 * method calls the security manager's {@code checkPermission} method with a
	 * {@code RuntimePermission("getClassLoader")} permission to ensure it's ok
	 * to access the class loader for the class.
	 *
	 * <p>
	 * If this object represents a primitive type or void, null is returned.
	 *
	 * @return the class loader that loaded the class or interface represented
	 *         by this object.
	 * @throws SecurityException
	 *             if a security manager exists and its {@code checkPermission}
	 *             method denies access to the class loader for the class.
	 * @see java.lang.ClassLoader
	 * @see SecurityManager#checkPermission
	 * @see java.lang.RuntimePermission
	 */
	public ClassLoader getClassLoader() {
		ClassLoader cl = getClassLoader0();
		/**
		 * @j2sNative
		 * cl.baseClass = this;
		 */
		return cl;
//		SecurityManager sm = System.getSecurityManager();
//		if (sm != null) {
//			ClassLoader ccl = ClassLoader.getCallerClassLoader();
//			if (ccl != null && ccl != cl && !cl.isAncestor(ccl)) {
//				sm.checkPermission(SecurityConstants.GET_CLASSLOADER_PERMISSION);
//			}
//		}
//		return cl;
	}

	// Package-private to allow ClassLoader access
	ClassLoader getClassLoader0() {
	    ClassLoader loader = null;
		/**
		 * getClass().getClassLoader() uses full path
		 *  
		 * @j2sNative
		 * 
		 * var baseFolder = Clazz._Loader.getJ2SLibBase(); 
		 * loader = Clazz._Loader.requireLoaderByBase(baseFolder);
		 * var me = this;
		 * loader.getResourceAsStream$S = function(s) { return me.getResourceAsStream$S(s.indexOf("/") == 0 ? s : "/" + s) };
		 * loader.getResource$S = function(s) { return me.getResource$S(s.indexOf("/") == 0 ? s : "/" + s) }; 
		 * loader.getResources$S = function(s) { return me.getResources$S(s) };
		 * loader.getParent$ = function() {return null};
		 */
	    return loader;
	}
	
	/**
	 * look first in this class's path, then in root
	 * @param name
	 * @return
	 * @throws IOException
	 */
	protected CompoundEnumeration<Enumeration<URL>> getResources(String name) throws IOException {
		URL url1 = getResource(name);
		URL url2 = (name.indexOf("/") == 0 ? null : getClassLoader().getResource(name));
		Enumeration<URL> e;
		if (url1 == null && url2 == null) {
			e = java.util.Collections.emptyEnumeration();
		} else {
			List<URL> list = new ArrayList<URL>(2);
			if (url1 != null)
				list.add(url1);
			if (url2 != null && !url2.equals(url1))
				list.add(url2);
			e = java.util.Collections.enumeration(list);
		}
		return new CompoundEnumeration((Enumeration<URL>[]) new Enumeration<?>[] { null, e });
    } 
	
	/**
	 * Returns an array of {@code TypeVariable} objects that represent the type
	 * variables declared by the generic declaration represented by this
	 * {@code GenericDeclaration} object, in declaration order. Returns an array
	 * of length 0 if the underlying generic declaration declares no type
	 * variables.
	 *
	 * @return an array of {@code TypeVariable} objects that represent the type
	 *         variables declared by this generic declaration
	 * @throws GenericSignatureFormatError
	 *             if the generic signature of this generic declaration does not
	 *             conform to the format specified in the Java Virtual Machine
	 *             Specification, 3rd edition
	 * @since 1.5
	 */
    // GenericDeclaration @Override
	public Object//TypeVariable<Class<T>>[] 
			getTypeParameters() {
//		if (getGenericSignature() != null)
//			return (TypeVariable<Class<T>>[]) getGenericInfo().getTypeParameters();
//		else
			return //(TypeVariable<Class<T>>[]) 
					new TypeVariable[0];
	}

	/** fe
	 * Returns the {@code Class} representing the superclass of the entity
	 * (class, interface, primitive type or void) represented by this
	 * {@code Class}. If this {@code Class} represents either the {@code Object}
	 * class, an interface, a primitive type, or void, then null is returned. If
	 * this object represents an array class then the {@code Class} object
	 * representing the {@code Object} class is returned.
	 *
	 * @return the superclass of the class represented by this object.
	 */
	public Class<? super T> getSuperclass() {
		/**
		 * @j2sNative
		 * 
		 * if (this.$clazz$ == java.lang.Object) return null;
		 * 
		 * 
		 * return Clazz.getClass(this.$clazz$.superclazz || java.lang.Object);
		 */
		{
		return null;
		}
	}

//	/**
//	 * Returns the {@code Type} representing the direct superclass of the entity
//	 * (class, interface, primitive type or void) represented by this
//	 * {@code Class}.
//	 *
//	 * <p>
//	 * If the superclass is a parameterized type, the {@code Type} object
//	 * returned must accurately reflect the actual type parameters used in the
//	 * source code. The parameterized type representing the superclass is
//	 * created if it had not been created before. See the declaration of
//	 * {@link java.lang.reflect.ParameterizedType ParameterizedType} for the
//	 * semantics of the creation process for parameterized types. If this
//	 * {@code Class} represents either the {@code Object} class, an interface, a
//	 * primitive type, or void, then null is returned. If this object represents
//	 * an array class then the {@code Class} object representing the
//	 * {@code Object} class is returned.
//	 *
//	 * @throws GenericSignatureFormatError
//	 *             if the generic class signature does not conform to the format
//	 *             specified in the Java Virtual Machine Specification, 3rd
//	 *             edition
//	 * @throws TypeNotPresentException
//	 *             if the generic superclass refers to a non-existent type
//	 *             declaration
//	 * @throws MalformedParameterizedTypeException
//	 *             if the generic superclass refers to a parameterized type that
//	 *             cannot be instantiated for any reason
//	 * @return the superclass of the class represented by this object
//	 * @since 1.5
//	 */
//	public Type getGenericSuperclass() {
////		if (getGenericSignature() != null) {
////			// Historical irregularity:
////			// Generic signature marks interfaces with superclass = Object
////			// but this API returns null for interfaces
////			if (isInterface())
////				return null;
////			return getGenericInfo().getSuperclass();
////		} else
//			return getSuperclass();
//	}

//	/**
//	 * Gets the package for this class. The class loader of this class is used
//	 * to find the package. If the class was loaded by the bootstrap class
//	 * loader the set of packages loaded from CLASSPATH is searched to find the
//	 * package of the class. Null is returned if no package object was created
//	 * by the class loader of this class.
//	 *
//	 * <p>
//	 * Packages have attributes for versions and specifications only if the
//	 * information was defined in the manifests that accompany the classes, and
//	 * if the class loader created the package instance with the attributes from
//	 * the manifest.
//	 *
//	 * @return the package of the class, or null if no package information is
//	 *         available from the archive or codebase.
//	 */
//	public Package getPackage() {
//		return Package.getPackage(this);
//	}

	/**
	 * Determines the interfaces implemented by the class or interface represented
	 * by this object.
	 *
	 * <p>
	 * If this object represents a class, the return value is an array containing
	 * objects representing all interfaces implemented by the class. The order of
	 * the interface objects in the array corresponds to the order of the interface
	 * names in the {@code implements} clause of the declaration of the class
	 * represented by this object. For example, given the declaration: <blockquote>
	 * {@code class Shimmer implements FloorWax, DessertTopping { ... }}
	 * </blockquote> suppose the value of {@code s} is an instance of
	 * {@code Shimmer}; the value of the expression: <blockquote>
	 * {@code s.getClass().getInterfaces()[0]} </blockquote> is the {@code Class}
	 * object that represents interface {@code FloorWax}; and the value of:
	 * <blockquote> {@code s.getClass().getInterfaces()[1]} </blockquote> is the
	 * {@code Class} object that represents interface {@code DessertTopping}.
	 *
	 * <p>
	 * If this object represents an interface, the array contains objects
	 * representing all interfaces extended by the interface. The order of the
	 * interface objects in the array corresponds to the order of the interface
	 * names in the {@code extends} clause of the declaration of the interface
	 * represented by this object.
	 *
	 * <p>
	 * If this object represents a class or interface that implements no interfaces,
	 * the method returns an array of length 0.
	 *
	 * <p>
	 * If this object represents a primitive type or void, the method returns an
	 * array of length 0.
	 *
	 * @return an array of interfaces implemented by this class.
	 */
	@SuppressWarnings("unused")
	public Class<?>[] getInterfaces() {
		if (implementz == null) {
			Class<?>[] a = new Class<?>[0];
			Object me = $clazz$;
			Class<?>[] list = /** @j2sNative me.implementz || */null;
			if (list != null) {
				for (int i = 0, n = list.length; i < n; i++) {
					/**
					 * @j2sNative a.push(Clazz.getClass(list[i]));
					 */
				}
			}	
			implementz = a;
		}
		return implementz;
	} 


//	/**
//	 * Returns the {@code Type}s representing the interfaces directly
//	 * implemented by the class or interface represented by this object.
//	 *
//	 * <p>
//	 * If a superinterface is a parameterized type, the {@code Type} object
//	 * returned for it must accurately reflect the actual type parameters used
//	 * in the source code. The parameterized type representing each
//	 * superinterface is created if it had not been created before. See the
//	 * declaration of {@link java.lang.reflect.ParameterizedType
//	 * ParameterizedType} for the semantics of the creation process for
//	 * parameterized types.
//	 *
//	 * <p>
//	 * If this object represents a class, the return value is an array
//	 * containing objects representing all interfaces implemented by the class.
//	 * The order of the interface objects in the array corresponds to the order
//	 * of the interface names in the {@code implements} clause of the
//	 * declaration of the class represented by this object. In the case of an
//	 * array class, the interfaces {@code Cloneable} and {@code Serializable}
//	 * are returned in that order.
//	 *
//	 * <p>
//	 * If this object represents an interface, the array contains objects
//	 * representing all interfaces directly extended by the interface. The order
//	 * of the interface objects in the array corresponds to the order of the
//	 * interface names in the {@code extends} clause of the declaration of the
//	 * interface represented by this object.
//	 *
//	 * <p>
//	 * If this object represents a class or interface that implements no
//	 * interfaces, the method returns an array of length 0.
//	 *
//	 * <p>
//	 * If this object represents a primitive type or void, the method returns an
//	 * array of length 0.
//	 *
//	 * @throws GenericSignatureFormatError
//	 *             if the generic class signature does not conform to the format
//	 *             specified in the Java Virtual Machine Specification, 3rd
//	 *             edition
//	 * @throws TypeNotPresentException
//	 *             if any of the generic superinterfaces refers to a
//	 *             non-existent type declaration
//	 * @throws MalformedParameterizedTypeException
//	 *             if any of the generic superinterfaces refer to a
//	 *             parameterized type that cannot be instantiated for any reason
//	 * @return an array of interfaces implemented by this class
//	 * @since 1.5
//	 */
//	public Type[] getGenericInterfaces() {
////		if (getGenericSignature() != null)
////			return getGenericInfo().getSuperInterfaces();
////		else
//			return getInterfaces();
//	}

	/**
	 * Returns the {@code Class} representing the component type of an array. If
	 * this class does not represent an array class this method returns null.
	 *
	 * @return the {@code Class} representing the component type of this class
	 *         if this class is an array
	 * @see java.lang.reflect.Array
	 * @since JDK1.1
	 */
	public Class<?> getComponentType() {
		// Array classes have this method added via Clazz.array()
		return null;
	}

	/**
	 * Returns the Java language modifiers for this class or interface, encoded
	 * in an integer. The modifiers consist of the Java Virtual Machine's
	 * constants for {@code public}, {@code protected}, {@code private},
	 * {@code final}, {@code static}, {@code abstract} and {@code interface};
	 * they should be decoded using the methods of class {@code Modifier}.
	 *
	 * <p>
	 * If the underlying class is an array class, then its {@code public},
	 * {@code private} and {@code protected} modifiers are the same as those of
	 * its component type. If this {@code Class} represents a primitive type or
	 * void, its {@code public} modifier is always {@code true}, and its
	 * {@code protected} and {@code private} modifiers are always {@code false}.
	 * If this object represents an array class, a primitive type or void, then
	 * its {@code final} modifier is always {@code true} and its interface
	 * modifier is always {@code false}. The values of its other modifiers are
	 * not determined by this specification.
	 *
	 * <p>
	 * The modifier encodings are defined in <em>The Java Virtual Machine
	 * Specification</em>, table 4.1.
	 *
	 * @return the {@code int} representing the modifiers for this class
	 * @see java.lang.reflect.Modifier
	 * @since JDK1.1
	 */
	public int getModifiers() {
		return (modifiers >= 0 ? modifiers : Modifier.PUBLIC 
				| (isEnum() ? ENUM : isInterface() ? Modifier.INTERFACE : 0) 
				| (isAnnotation() ? ANNOTATION : 0)); 
	}

	/**
	 * From AnnotationParser.JSAnnotationObject
	 * @param m
	 */
	public void _setModifiers(int m) {
		modifiers = m;
	}
	
	/**
	 * Gets the signers of this class.
	 *
	 * @return the signers of this class, or null if there are no signers. In
	 *         particular, this method returns null if this object represents a
	 *         primitive type or void.
	 * @since JDK1.1
	 */
	public Object[] getSigners() {
		JSUtil.notImplemented(null);
		return new Object[0];
	}

	/**
	 * Set the signers of this class.
	 */
	void setSigners(Object[] signers) {
		JSUtil.notImplemented(null);
	};

//	/**
//	 * If this {@code Class} object represents a local or anonymous class within
//	 * a method, returns a {@link java.lang.reflect.Method Method} object
//	 * representing the immediately enclosing method of the underlying class.
//	 * Returns {@code null} otherwise.
//	 *
//	 * In particular, this method returns {@code null} if the underlying class
//	 * is a local or anonymous class immediately enclosed by a type declaration,
//	 * instance initializer or static initializer.
//	 *
//	 * @return the immediately enclosing method of the underlying class, if that
//	 *         class is a local or anonymous class; otherwise {@code null}.
//	 * @since 1.5
//	 */
//	public Method getEnclosingMethod() {
//		EnclosingMethodInfo enclosingInfo = getEnclosingMethodInfo();
//
//		if (enclosingInfo == null)
//			return null;
//		else {
//			if (!enclosingInfo.isMethod())
//				return null;
//
//			MethodRepository typeInfo = MethodRepository.make(enclosingInfo.getDescriptor(), getFactory());
//			Class returnType = toClass(typeInfo.getReturnType());
//			Type[] parameterTypes = typeInfo.getParameterTypes();
//			Class<?>[] parameterClasses = new Class<?>[parameterTypes.length];
//
//			// Convert Types to Classes; returned types *should*
//			// be class objects since the methodDescriptor's used
//			// don't have generics information
//			for (int i = 0; i < parameterClasses.length; i++)
//				parameterClasses[i] = toClass(parameterTypes[i]);
//
//			/*
//			 * Loop over all declared methods; match method name, number of and
//			 * type of parameters, *and* return type. Matching return type is
//			 * also necessary because of covariant returns, etc.
//			 */
//			for (Method m : enclosingInfo.getEnclosingClass().getDeclaredMethods()) {
//				if (m.getName().equals(enclosingInfo.getName())) {
//					Class<?>[] candidateParamClasses = m.getParameterTypes();
//					if (candidateParamClasses.length == parameterClasses.length) {
//						boolean matches = true;
//						for (int i = 0; i < candidateParamClasses.length; i++) {
//							if (!candidateParamClasses[i].equals(parameterClasses[i])) {
//								matches = false;
//								break;
//							}
//						}
//
//						if (matches) { // finally, check return type
//							if (m.getReturnType().equals(returnType))
//								return m;
//						}
//					}
//				}
//			}
//
//			throw new InternalError("Enclosing method not found");
//		}
//	}

//	private native Object[] getEnclosingMethod0();

//	private EnclosingMethodInfo getEnclosingMethodInfo() {
//		Object[] enclosingInfo = getEnclosingMethod0();
//		if (enclosingInfo == null)
//			return null;
//		else {
//			return new EnclosingMethodInfo(enclosingInfo);
//		}
//	}

//	private final static class EnclosingMethodInfo {
//		private Class<?> enclosingClass;
//		private String name;
//		private String descriptor;
//
//		private EnclosingMethodInfo(Object[] enclosingInfo) {
//			if (enclosingInfo.length != 3)
//				throw new InternalError("Malformed enclosing method information");
//			try {
//				// The array is expected to have three elements:
//
//				// the immediately enclosing class
//				enclosingClass = (Class<?>) enclosingInfo[0];
//				assert (enclosingClass != null);
//
//				// the immediately enclosing method or constructor's
//				// name (can be null).
//				name = (String) enclosingInfo[1];
//
//				// the immediately enclosing method or constructor's
//				// descriptor (null iff name is).
//				descriptor = (String) enclosingInfo[2];
//				assert ((name != null && descriptor != null) || name == descriptor);
//			} catch (ClassCastException cce) {
//				throw new InternalError("Invalid type in enclosing method information");
//			}
//		}
//
//		boolean isPartial() {
//			return enclosingClass == null || name == null || descriptor == null;
//		}
//
//		boolean isConstructor() {
//			return !isPartial() && "<init>".equals(name);
//		}
//
//		boolean isMethod() {
//			return !isPartial() && !isConstructor() && !"<clinit>".equals(name);
//		}
//
//		Class<?> getEnclosingClass() {
//			return enclosingClass;
//		}
//
//		String getName() {
//			return name;
//		}
//
//		String getDescriptor() {
//			return descriptor;
//		}
//
//	}

//	private static Class<?> toClass(Type o) {
////		if (o instanceof GenericArrayType)
////			return Array.newInstance(toClass(((GenericArrayType) o).getGenericComponentType()), 0).getClass();
//		return (Class<?>) o;
//	}

//	/**
//	 * If this {@code Class} object represents a local or anonymous class within
//	 * a constructor, returns a {@link java.lang.reflect.Constructor
//	 * Constructor} object representing the immediately enclosing constructor of
//	 * the underlying class. Returns {@code null} otherwise. In particular, this
//	 * method returns {@code null} if the underlying class is a local or
//	 * anonymous class immediately enclosed by a type declaration, instance
//	 * initializer or static initializer.
//	 *
//	 * @return the immediately enclosing constructor of the underlying class, if
//	 *         that class is a local or anonymous class; otherwise {@code null}.
//	 * @since 1.5
//	 */
//	public Constructor<?> getEnclosingConstructor() {
//		EnclosingMethodInfo enclosingInfo = getEnclosingMethodInfo();
//
//		if (enclosingInfo == null)
//			return null;
//		else {
//			if (!enclosingInfo.isConstructor())
//				return null;
//
//			ConstructorRepository typeInfo = ConstructorRepository.make(enclosingInfo.getDescriptor(), getFactory());
//			Type[] parameterTypes = typeInfo.getParameterTypes();
//			Class<?>[] parameterClasses = new Class<?>[parameterTypes.length];
//
//			// Convert Types to Classes; returned types *should*
//			// be class objects since the methodDescriptor's used
//			// don't have generics information
//			for (int i = 0; i < parameterClasses.length; i++)
//				parameterClasses[i] = toClass(parameterTypes[i]);
//
//			/*
//			 * Loop over all declared constructors; match number of and type of
//			 * parameters.
//			 */
//			for (Constructor c : enclosingInfo.getEnclosingClass().getDeclaredConstructors()) {
//				Class<?>[] candidateParamClasses = c.getParameterTypes();
//				if (candidateParamClasses.length == parameterClasses.length) {
//					boolean matches = true;
//					for (int i = 0; i < candidateParamClasses.length; i++) {
//						if (!candidateParamClasses[i].equals(parameterClasses[i])) {
//							matches = false;
//							break;
//						}
//					}
//
//					if (matches)
//						return c;
//				}
//			}
//
//			throw new InternalError("Enclosing constructor not found");
//		}
//	}

	/**
	 * If the class or interface represented by this {@code Class} object is a
	 * member of another class, returns the {@code Class} object representing
	 * the class in which it was declared. This method returns null if this
	 * class or interface is not a member of any other class. If this
	 * {@code Class} object represents an array class, a primitive type, or
	 * void,then this method returns null.
	 *
	 * @return the declaring class for this class
	 * @since JDK1.1
	 */
	public Class<?> getDeclaringClass() {
		JSUtil.notImplemented(null);
		return null;
	};

	// /**
	// * Returns the immediately enclosing class of the underlying class. If the
	// * underlying class is a top level class this method returns {@code null}.
	// *
	// * @return the immediately enclosing class of the underlying class
	// * @since 1.5
	// */
	// public Class<?> getEnclosingClass() {
	// // There are five kinds of classes (or interfaces):
	// // a) Top level classes
	// // b) Nested classes (static member classes)
	// // c) Inner classes (non-static member classes)
	// // d) Local classes (named classes declared within a method)
	// // e) Anonymous classes
	//
	// // JVM Spec 4.8.6: A class must have an EnclosingMethod
	// // attribute if and only if it is a local class or an
	// // anonymous class.
	// EnclosingMethodInfo enclosingInfo = getEnclosingMethodInfo();
	//
	// if (enclosingInfo == null) {
	// // This is a top level or a nested class or an inner class (a, b, or
	// // c)
	// return getDeclaringClass();
	// } else {
	// Class<?> enclosingClass = enclosingInfo.getEnclosingClass();
	// // This is a local class or an anonymous class (d or e)
	// if (enclosingClass == this || enclosingClass == null)
	// throw new InternalError("Malformed enclosing method information");
	// else
	// return enclosingClass;
	// }
	// }

	/**
	 * Returns the simple name of the underlying class as given in the source
	 * code. Returns an empty string if the underlying class is anonymous.
	 *
	 * <p>
	 * The simple name of an array is the simple name of the component type with
	 * "[]" appended. In particular the simple name of an array whose component
	 * type is anonymous is "[]".
	 *
	 * @return the simple name of the underlying class
	 * @since 1.5
	 */
	public String getSimpleName() {
		if (isArray())
			return getComponentType().getSimpleName() + "[]";
		String name = "";
		/**
		 * .name is for String, Integer, etc.
		 * 
		 * @j2sNative 
		 * 
		 * name = (this.$clazz$.__ANON ? "" : this.$clazz$.__CLASS_NAME__);
		 * name || (name = this.$clazz$.name);
		 */
		{
		}
		return name.substring(name.lastIndexOf(".") + 1);

		// String simpleName = getSimpleBinaryName();
		// if (simpleName == null) { // top level class
		// simpleName = getName();
		// return simpleName.substring(simpleName.lastIndexOf(".") + 1); //
		// strip
		// // the
		// // package
		// // name
		// }
		// // According to JLS3 "Binary Compatibility" (13.1) the binary
		// // name of non-package classes (not top level) is the binary
		// // name of the immediately enclosing class followed by a '$' followed
		// // by:
		// // (for nested and inner classes): the simple name.
		// // (for local classes): 1 or more digits followed by the simple name.
		// // (for anonymous classes): 1 or more digits.
		//
		// // Since getSimpleBinaryName() will strip the binary name of
		// // the immediatly enclosing class, we are now looking at a
		// // string that matches the regular expression "\$[0-9]*"
		// // followed by a simple name (considering the simple of an
		// // anonymous class to be the empty string).
		//
		// // Remove leading "\$[0-9]*" from the name
		// int length = simpleName.length();
		// if (length < 1 || simpleName.charAt(0) != '$')
		// throw new InternalError("Malformed class name");
		// int index = 1;
		// while (index < length && isAsciiDigit(simpleName.charAt(index)))
		// index++;
		// // Eventually, this is the empty string iff this is an anonymous
		// class
		// return simpleName.substring(index);
	}

//	/**
//	 * Character.isDigit answers {@code true} to some non-ascii digits. This one
//	 * does not.
//	 */
//	private static boolean isAsciiDigit(char c) {
//		return '0' <= c && c <= '9';
//	}

	/**
	 * Returns the canonical name of the underlying class as defined by the Java
	 * Language Specification. Returns null if the underlying class does not
	 * have a canonical name (i.e., if it is a local or anonymous class or an
	 * array whose component type does not have a canonical name).
	 * 
	 * @return the canonical name of the underlying class if it exists, and
	 *         {@code null} otherwise.
	 * @since 1.5
	 */
	public String getCanonicalName() {
		if (isArray()) {
			String canonicalName = getComponentType().getCanonicalName();
			if (canonicalName != null)
				return canonicalName + "[]";
			else
				return null;
		}
		if (isLocalOrAnonymousClass())
		return null;
		String name = null;
		/**
		 * @j2sNative  name = this.$clazz$.__CLASS_NAME__ || null; 
		 */
	    return name;
////		Class<?> enclosingClass = getEnclosingClass();
////		if (enclosingClass == null) { // top level class
//			return getName();
////		} else {
////			String enclosingName = enclosingClass.getCanonicalName();
////			if (enclosingName == null)
////				return null;
////			return enclosingName + "." + getSimpleName();
////		}
	}

	/**
	 * Returns {@code true} if and only if the underlying class is an anonymous
	 * class.
	 *
	 * @return {@code true} if and only if this class is an anonymous class.
	 * @since 1.5
	 */
	public boolean isAnonymousClass() {
		return "".equals(getSimpleName());
	}

	/**
	 * Returns {@code true} if and only if the underlying class is a local
	 * class.
	 *
	 * @return {@code true} if and only if this class is a local class.
	 * @since 1.5
	 */
	public boolean isLocalClass() {
		/**
		 * @j2sNative   return !!this.$clazz$.__LOCAL;
		 */
		{
		return false;
		}
//		return isLocalOrAnonymousClass() && !isAnonymousClass();
	}
//
//	/**
//	 * Returns {@code true} if and only if the underlying class is a member
//	 * class.
//	 *
//	 * @return {@code true} if and only if this class is a member class.
//	 * @since 1.5
//	 */
//	public boolean isMemberClass() {
//		return getSimpleBinaryName() != null && !isLocalOrAnonymousClass();
//	}

//	/**
//	 * Returns the "simple binary name" of the underlying class, i.e., the
//	 * binary name without the leading enclosing class name. Returns
//	 * {@code null} if the underlying class is a top level class.
//	 */
//	private String getSimpleBinaryName() {
//		Class<?> enclosingClass = getEnclosingClass();
//		if (enclosingClass == null) // top level class
//			return null;
//		// Otherwise, strip the enclosing class' name
//		try {
//			return getName().substring(enclosingClass.getName().length());
//		} catch (IndexOutOfBoundsException ex) {
//			throw new InternalError("Malformed class name");
//		}
//	}

	/**
	 * Returns {@code true} if this is a local class or an anonymous class.
	 * Returns {@code false} otherwise.
	 */
	private boolean isLocalOrAnonymousClass() {
		// JVM Spec 4.8.6: A class must have an EnclosingMethod
		// attribute if and only if it is a local class or an
		// anonymous class.
		/**
		 * @j2sNative   return !!this.$clazz$.__ISANON || !!this.$clazz$.__LOCAL;
		 */
		{
		return false;
		}
//		return getEnclosingMethodInfo() != null;
	}

	/**
	 * Returns an array containing {@code Class} objects representing all the
	 * public classes and interfaces that are members of the class represented
	 * by this {@code Class} object. This includes public class and interface
	 * members inherited from superclasses and public class and interface
	 * members declared by the class. This method returns an array of length 0
	 * if this {@code Class} object has no public member classes or interfaces.
	 * This method also returns an array of length 0 if this {@code Class}
	 * object represents a primitive type, an array class, or void.
	 *
	 * @return the array of {@code Class} objects representing the public
	 *         members of this class
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.PUBLIC)} method denies
	 *                access to the classes within this class
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Class<?>[] getClasses() {
		// be very careful not to change the stack depth of this
		// checkMemberAccess call for security reasons
		// see java.lang.SecurityManager.checkMemberAccess
//		checkMemberAccess(Member.PUBLIC, ClassLoader.getCallerClassLoader());

		// Privileged so this implementation can look at DECLARED classes,
		// something the caller might not have privilege to do. The code here
		// is allowed to look at DECLARED classes because (1) it does not hand
		// out anything other than public members and (2) public member access
		// has already been ok'd by the SecurityManager.

//		Class[] result; 
//				(Class[]) java.security.AccessController.doPrivileged(new java.security.PrivilegedAction() {
//			public Object run() {
				java.util.List<Class> list = new java.util.ArrayList();
				Class currentClass = this;
				while (currentClass != null) {
					Class[] members = currentClass.getDeclaredClasses();
					for (int i = 0; i < members.length; i++) {
						//if (Modifier.isPublic(members[i].getModifiers())) {
						// public only
							list.add(members[i]);
						//}
					}
					currentClass = currentClass.getSuperclass();
				}
//				Class[] empty = {};
			//	result = 
				
				return list.toArray(new Class[list.size()]);
//			}
//		});
//
//		return result;
	}

	/**
	 * Returns an array containing {@code Field} objects reflecting all the
	 * accessible public fields of the class or interface represented by this
	 * {@code Class} object. The elements in the array returned are not sorted
	 * and are not in any particular order. This method returns an array of
	 * length 0 if the class or interface has no accessible public fields, or if
	 * it represents an array class, a primitive type, or void.
	 *
	 * <p>
	 * Specifically, if this {@code Class} object represents a class, this
	 * method returns the public fields of this class and of all its
	 * superclasses. If this {@code Class} object represents an interface, this
	 * method returns the fields of this interface and of all its
	 * superinterfaces.
	 *
	 * <p>
	 * The implicit length field for array class is not reflected by this
	 * method. User code should use the methods of class {@code Array} to
	 * manipulate arrays.
	 *
	 * <p>
	 * See <em>The Java Language Specification</em>, sections 8.2 and 8.3.
	 *
	 * @return the array of {@code Field} objects representing the public fields
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.PUBLIC)} denies access to
	 *                the fields within this class
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Field[] getFields() throws SecurityException {
		if (fields != null)
			return fields;
	    fields = new Field[0];
	    addAllFields(fields, true);
		return fields;
	}

	private void addAllFields(Field[] fields, boolean recurse) {
	    Object cl = /** @j2sNative this.$clazz$ || */null;
	    /** @j2sNative 
	     * Clazz._initClass(cl,1,1,0);
	     */
		addFields(cl, fields, 0);
		addFields(cl, fields, Modifier.STATIC);
		if (!recurse)
			return;
		Class<? super T> c = getSuperclass();
		if (c != null)
			c.addAllFields(fields, true);
	}
	

	Map<String, Object[]> fieldAnnMap = null;
	private Field[] declaredFields;
	
	// Called by Field to get its 
	public Map<String,Object[]> getFieldAnnMap(Object cl) {
		initAnnotationsIfNecessary();
		return fieldAnnMap;
	}

	/**
	 * Returns an array containing {@code Method} objects reflecting all the
	 * public <em>member</em> methods of the class or interface represented by
	 * this {@code Class} object, including those declared by the class or
	 * interface and those inherited from superclasses and superinterfaces.
	 * Array classes return all the (public) member methods inherited from the
	 * {@code Object} class. The elements in the array returned are not sorted
	 * and are not in any particular order. This method returns an array of
	 * length 0 if this {@code Class} object represents a class or interface
	 * that has no public member methods, or if this {@code Class} object
	 * represents a primitive type or void.
	 *
	 * <p>
	 * The class initialization method {@code <clinit>} is not included in the
	 * returned array. If the class declares multiple public member methods with
	 * the same parameter types, they are all included in the returned array.
	 *
	 * <p>
	 * See <em>The Java Language Specification</em>, sections 8.2 and 8.4.
	 *
	 * @return the array of {@code Method} objects representing the public
	 *         methods of this class
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.PUBLIC)} denies access to
	 *                the methods within this class
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Method[] getMethods() throws SecurityException {
		return /*copyMethods*/(privateGetPublicMethods(true));
	}

	/**
	 * Returns an array containing {@code Constructor} objects reflecting all
	 * the public constructors of the class represented by this {@code Class}
	 * object. An array of length 0 is returned if the class has no public
	 * constructors, or if the class is an array class, or if the class reflects
	 * a primitive type or void.
	 *
	 * Note that while this method returns an array of {@code
	 * Constructor<T>} objects (that is an array of constructors from this
	 * class), the return type of this method is {@code
	 * Constructor<?>[]} and <em>not</em> {@code Constructor<T>[]} as might be
	 * expected. This less informative return type is necessary since after
	 * being returned from this method, the array could be modified to hold
	 * {@code Constructor} objects for different classes, which would violate
	 * the type guarantees of {@code Constructor<T>[]}.
	 *
	 * @return the array of {@code Constructor} objects representing the public
	 *         constructors of this class
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.PUBLIC)} denies access to
	 *                the constructors within this class
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Constructor<?>[] getConstructors() throws SecurityException {
		return /*copyMethods*/(privateGetConstructors());
//		// be very careful not to change the stack depth of this
//		// checkMemberAccess call for security reasons
//		// see java.lang.SecurityManager.checkMemberAccess
////		checkMemberAccess(Member.PUBLIC, ClassLoader.getCallerClassLoader());
//		return copyConstructors(privateGetDeclaredConstructors(true));
	}

	/**
	 * Returns a {@code Field} object that reflects the specified public member
	 * field of the class or interface represented by this {@code Class} object.
	 * The {@code name} parameter is a {@code String} specifying the simple name
	 * of the desired field.
	 *
	 * <p>
	 * The field to be reflected is determined by the algorithm that follows.
	 * Let C be the class represented by this object:
	 * <OL>
	 * <LI>If C declares a public field with the name specified, that is the
	 * field to be reflected.</LI>
	 * <LI>If no field was found in step 1 above, this algorithm is applied
	 * recursively to each direct superinterface of C. The direct
	 * superinterfaces are searched in the order they were declared.</LI>
	 * <LI>If no field was found in steps 1 and 2 above, and C has a superclass
	 * S, then this algorithm is invoked recursively upon S. If C has no
	 * superclass, then a {@code NoSuchFieldException} is thrown.</LI>
	 * </OL>
	 *
	 * <p>
	 * See <em>The Java Language Specification</em>, sections 8.2 and 8.3.
	 *
	 * @param name
	 *            the field name
	 * @return the {@code Field} object of this class specified by {@code name}
	 * @exception NoSuchFieldException
	 *                if a field with the specified name is not found.
	 * @exception NullPointerException
	 *                if {@code name} is {@code null}
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.PUBLIC)} denies access to
	 *                the field
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Field getField(String name) throws NoSuchFieldException, SecurityException {
		getFields(); 
		for (int i = fields.length; --i >= 0;) {
			if (fields[i].jsName == name)
				return fields[i];
		}
		throw new NoSuchFieldException("field " + name);
		
//		// be very careful not to change the stack depth of this
//		// checkMemberAccess call for security reasons
//		// see java.lang.SecurityManager.checkMemberAccess
////		checkMemberAccess(Member.PUBLIC, ClassLoader.getCallerClassLoader());
//		Field field = getField0(name);
//		if (field == null) {
//			throw new NoSuchFieldException(name);
//		}
//		return field;
	}

	@SuppressWarnings("null")
	private void addFields(Object cl, Field[] f, int modifiers) {				
		String[] fieldNames = /** @j2sNative Clazz._getFieldNames(cl, !!modifiers) || [] ||*/null;
		String[] types = /** @j2sNative Clazz._getFieldTypes(cl, !!modifiers) || [] ||*/null;

		for (int i = 0; i < fieldNames.length; i++) {
			addField(f, fieldNames[i], modifiers, types[i]); 
		}
	}

	boolean excludeField(String name) { 
		return (name == "prototype" 
				|| name.startsWith("__") 
				|| name.startsWith("$") && name.endsWith("$")
				|| name == "$isInterface" 
				|| name == "$isEnum" 
				|| name == "implementz");
	} 

	private void addField(Field[] fields, String name, int modifiers, String type) {
		Field f = new Field(this, name, modifiers);
		f._setTypeString(type);
		/**
		 * @j2sNative
		 * 
		 * 			fields.push(f);
		 */
	}
	/**
	 * Returns a {@code Method} object that reflects the specified public member
	 * method of the class or interface represented by this {@code Class}
	 * object. The {@code name} parameter is a {@code String} specifying the
	 * simple name of the desired method. The {@code parameterTypes} parameter
	 * is an array of {@code Class} objects that identify the method's formal
	 * parameter types, in declared order. If {@code parameterTypes} is
	 * {@code null}, it is treated as if it were an empty array.
	 *
	 * <p>
	 * If the {@code name} is "{@code <init>};"or "{@code <clinit>}" a
	 * {@code NoSuchMethodException} is raised. Otherwise, the method to be
	 * reflected is determined by the algorithm that follows. Let C be the class
	 * represented by this object:
	 * <OL>
	 * <LI>C is searched for any <I>matching methods</I>. If no matching method
	 * is found, the algorithm of step 1 is invoked recursively on the
	 * superclass of C.</LI>
	 * <LI>If no method was found in step 1 above, the superinterfaces of C are
	 * searched for a matching method. If any such method is found, it is
	 * reflected.</LI>
	 * </OL>
	 *
	 * To find a matching method in a class C:&nbsp; If C declares exactly one
	 * public method with the specified name and exactly the same formal
	 * parameter types, that is the method reflected. If more than one such
	 * method is found in C, and one of these methods has a return type that is
	 * more specific than any of the others, that method is reflected; otherwise
	 * one of the methods is chosen arbitrarily.
	 *
	 * <p>
	 * Note that there may be more than one matching method in a class because
	 * while the Java language forbids a class to declare multiple methods with
	 * the same signature but different return types, the Java virtual machine
	 * does not. This increased flexibility in the virtual machine can be used
	 * to implement various language features. For example, covariant returns
	 * can be implemented with {@linkplain java.lang.reflect.Method#isBridge
	 * bridge methods}; the bridge method and the method being overridden would
	 * have the same signature but different return types.
	 *
	 * <p>
	 * See <em>The Java Language Specification</em>, sections 8.2 and 8.4.
	 *
	 * @param name
	 *            the name of the method
	 * @param paramTypes
	 *            the list of parameters
	 * @return the {@code Method} object that matches the specified {@code name}
	 *         and {@code parameterTypes}
	 * @exception NoSuchMethodException
	 *                if a matching method is not found or if the name is
	 *                "&lt;init&gt;"or "&lt;clinit&gt;".
	 * @exception NullPointerException
	 *                if {@code name} is {@code null}
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.PUBLIC)} denies access to
	 *                the method
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Method getMethod(String name, Class<?>... paramTypes) throws NoSuchMethodException, SecurityException {
		// be very careful not to change the stack depth of this
		// checkMemberAccess call for security reasons
		// see java.lang.SecurityManager.checkMemberAccess
//		checkMemberAccess(Member.PUBLIC, ClassLoader.getCallerClassLoader());
		
		// note that we cannot check the method at this time, as it could be an interface, 
		// and interfaces will not have elaborated methods.
		
		Method m = new Method(this, name, paramTypes, null, null, Modifier.PUBLIC);
		if (!isInterface()) {
			Object o = $clazz$;
			boolean isStatic = false;
			String qname = m.getSignature();
			/**
			 * @j2sNative
			 * 
			 * if (o[qname]) {
			 *   isStatic = true;
			 *   o = o[qname];
			 * } else {
			 *     o = o.prototype && o.prototype[qname];
			 * }
			 * 
			 */
			if (o == null)
				  throw new NoSuchMethodException(getName() + "." + qname);
			m._setJSMethod(o, (isStatic ? Modifier.STATIC : 0));
		}
		return m;
//		/**
//		 * @j2sNative 
//		 * 
//		 *     return Clazz.new_(Clazz.load('java.lang.reflect.Method').c$$Class$S$ClassA$Class$ClassA$I, [this, name,
//		 *     	                    paramTypes, java.lang.Void, [], 0]);
//		 */
//		{
//			return null;
//		}
//
//
//		
//		
//		Method method = getMethod0(name, parameterTypes);
//		if (method == null) {
//			throw new NoSuchMethodException(getName() + "." + name + argumentTypesToString(parameterTypes));
//		}
//		return method;
	}

	/**
	 * Returns a {@code Constructor} object that reflects the specified public
	 * constructor of the class represented by this {@code Class} object. The
	 * {@code parameterTypes} parameter is an array of {@code Class} objects
	 * that identify the constructor's formal parameter types, in declared
	 * order.
	 *
	 * If this {@code Class} object represents an inner class declared in a
	 * non-static context, the formal parameter types include the explicit
	 * enclosing instance as the first parameter.
	 *
	 * <p>
	 * The constructor to reflect is the public constructor of the class
	 * represented by this {@code Class} object whose formal parameter types
	 * match those specified by {@code parameterTypes}.
	 *
	 * @param parameterTypes
	 *            the parameter array
	 * @return the {@code Constructor} object of the public constructor that
	 *         matches the specified {@code parameterTypes}
	 * @exception NoSuchMethodException
	 *                if a matching method is not found.
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.PUBLIC)} denies access to
	 *                the constructor
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Constructor<T> getConstructor(Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException {
		return new Constructor(this, parameterTypes, new Class<?>[0], Member.PUBLIC);
	}

	/**
	 * Returns an array of {@code Class} objects reflecting all the classes and
	 * interfaces declared as members of the class represented by this
	 * {@code Class} object. This includes public, protected, default (package)
	 * access, and private classes and interfaces declared by the class, but
	 * excludes inherited classes and interfaces. This method returns an array
	 * of length 0 if the class declares no classes or interfaces as members, or
	 * if this {@code Class} object represents a primitive type, an array class,
	 * or void.
	 *
	 * @return the array of {@code Class} objects representing all the declared
	 *         members of this class
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.DECLARED)} denies access
	 *                to the declared classes within this class
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Class<?>[] getDeclaredClasses() throws SecurityException {
//		// be very careful not to change the stack depth of this
//		// checkMemberAccess call for security reasons
//		// see java.lang.SecurityManager.checkMemberAccess
////		checkMemberAccess(Member.DECLARED, ClassLoader.getCallerClassLoader());
		return getDeclaredClasses0();
	}

	/**
	 * Returns an array of {@code Field} objects reflecting all the fields
	 * declared by the class or interface represented by this {@code Class}
	 * object. This includes public, protected, default (package) access, and
	 * private fields, but excludes inherited fields. The elements in the array
	 * returned are not sorted and are not in any particular order. This method
	 * returns an array of length 0 if the class or interface declares no
	 * fields, or if this {@code Class} object represents a primitive type, an
	 * array class, or void.
	 *
	 * <p>
	 * See <em>The Java Language Specification</em>, sections 8.2 and 8.3.
	 *
	 * @return the array of {@code Field} objects representing all the declared
	 *         fields of this class
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.DECLARED)} denies access
	 *                to the declared fields within this class
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Field[] getDeclaredFields() throws SecurityException {
		if (declaredFields != null)
			return declaredFields;
		declaredFields = new Field[0];
	    addAllFields(declaredFields, false);
		return declaredFields;
	}

	/**
	 * Returns an array of {@code Method} objects reflecting all the methods
	 * declared by the class or interface represented by this {@code Class}
	 * object. This includes public, protected, default (package) access, and
	 * private methods, but excludes inherited methods. The elements in the
	 * array returned are not sorted and are not in any particular order. This
	 * method returns an array of length 0 if the class or interface declares no
	 * methods, or if this {@code Class} object represents a primitive type, an
	 * array class, or void. The class initialization method {@code <clinit>} is
	 * not included in the returned array. If the class declares multiple public
	 * member methods with the same parameter types, they are all included in
	 * the returned array.
	 *
	 * <p>
	 * See <em>The Java Language Specification</em>, section 8.2.
	 *
	 * @return the array of {@code Method} objects representing all the declared
	 *         methods of this class
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.DECLARED)} denies access
	 *                to the declared methods within this class
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Method[] getDeclaredMethods() throws SecurityException {
		return /*copyMethods*/(privateGetPublicMethods(false));
//		// be very careful not to change the stack depth of this
//		// checkMemberAccess call for security reasons
//		// see java.lang.SecurityManager.checkMemberAccess
////		checkMemberAccess(Member.DECLARED, ClassLoader.getCallerClassLoader());
//		return copyMethods(privateGetDeclaredMethods(false));
	}

	/**
	 * Returns an array of {@code Constructor} objects reflecting all the
	 * constructors declared by the class represented by this {@code Class}
	 * object. These are public, protected, default (package) access, and
	 * private constructors. The elements in the array returned are not sorted
	 * and are not in any particular order. If the class has a default
	 * constructor, it is included in the returned array. This method returns an
	 * array of length 0 if this {@code Class} object represents an interface, a
	 * primitive type, an array class, or void.
	 *
	 * <p>
	 * See <em>The Java Language Specification</em>, section 8.2.
	 *
	 * @return the array of {@code Constructor} objects representing all the
	 *         declared constructors of this class
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.DECLARED)} denies access
	 *                to the declared constructors within this class
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Constructor<?>[] getDeclaredConstructors() throws SecurityException {
		return getConstructors();
		
		// TODO 
		
//		// be very careful not to change the stack depth of this
//		// checkMemberAccess call for security reasons
//		// see java.lang.SecurityManager.checkMemberAccess
////		checkMemberAccess(Member.DECLARED, ClassLoader.getCallerClassLoader());
//		return copyConstructors(privateGetDeclaredConstructors(false));
	}

	/**
	 * Returns a {@code Field} object that reflects the specified declared field
	 * of the class or interface represented by this {@code Class} object. The
	 * {@code name} parameter is a {@code String} that specifies the simple name
	 * of the desired field. Note that this method will not reflect the
	 * {@code length} field of an array class.
	 *
	 * @param name
	 *            the name of the field
	 * @return the {@code Field} object for the specified field in this class
	 * @exception NoSuchFieldException
	 *                if a field with the specified name is not found.
	 * @exception NullPointerException
	 *                if {@code name} is {@code null}
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.DECLARED)} denies access
	 *                to the declared field
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Field getDeclaredField(String name) throws NoSuchFieldException, SecurityException {
		return getField(name);
//		// be very careful not to change the stack depth of this
//		// checkMemberAccess call for security reasons
//		// see java.lang.SecurityManager.checkMemberAccess
////		checkMemberAccess(Member.DECLARED, ClassLoader.getCallerClassLoader());
//		Field field = searchFields(privateGetDeclaredFields(false), name);
//		if (field == null) {
//			throw new NoSuchFieldException(name);
//		}
//		return field;
	}

	/**
	 * Returns a {@code Method} object that reflects the specified declared
	 * method of the class or interface represented by this {@code Class}
	 * object. The {@code name} parameter is a {@code String} that specifies the
	 * simple name of the desired method, and the {@code parameterTypes}
	 * parameter is an array of {@code Class} objects that identify the method's
	 * formal parameter types, in declared order. If more than one method with
	 * the same parameter types is declared in a class, and one of these methods
	 * has a return type that is more specific than any of the others, that
	 * method is returned; otherwise one of the methods is chosen arbitrarily.
	 * If the name is "&lt;init&gt;"or "&lt;clinit&gt;" a
	 * {@code NoSuchMethodException} is raised.
	 *
	 * @param name
	 *            the name of the method
	 * @param parameterTypes
	 *            the parameter array
	 * @return the {@code Method} object for the method of this class matching
	 *         the specified name and parameters
	 * @exception NoSuchMethodException
	 *                if a matching method is not found.
	 * @exception NullPointerException
	 *                if {@code name} is {@code null}
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.DECLARED)} denies access
	 *                to the declared method
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Method getDeclaredMethod(String name, Class<?>... parameterTypes)
			throws NoSuchMethodException, SecurityException {
		return getMethod(name, parameterTypes);
//		// be very careful not to change the stack depth of this
//		// checkMemberAccess call for security reasons
//		// see java.lang.SecurityManager.checkMemberAccess
////		checkMemberAccess(Member.DECLARED, ClassLoader.getCallerClassLoader());
//		Method method = searchMethods(privateGetDeclaredMethods(false), name, parameterTypes);
//		if (method == null) {
//			throw new NoSuchMethodException(getName() + "." + name + argumentTypesToString(parameterTypes));
//		}
//		return method;
	}

	/**
	 * Returns a {@code Constructor} object that reflects the specified
	 * constructor of the class or interface represented by this {@code Class}
	 * object. The {@code parameterTypes} parameter is an array of {@code Class}
	 * objects that identify the constructor's formal parameter types, in
	 * declared order.
	 *
	 * If this {@code Class} object represents an inner class declared in a
	 * non-static context, the formal parameter types include the explicit
	 * enclosing instance as the first parameter.
	 *
	 * @param parameterTypes
	 *            the parameter array
	 * @return The {@code Constructor} object for the constructor with the
	 *         specified parameter list
	 * @exception NoSuchMethodException
	 *                if a matching method is not found.
	 * @exception SecurityException
	 *                If a security manager, <i>s</i>, is present and any of the
	 *                following conditions is met:
	 *
	 *                <ul>
	 *
	 *                <li>invocation of {@link SecurityManager#checkMemberAccess
	 *                s.checkMemberAccess(this, Member.DECLARED)} denies access
	 *                to the declared constructor
	 *
	 *                <li>the caller's class loader is not the same as or an
	 *                ancestor of the class loader for the current class and
	 *                invocation of {@link SecurityManager#checkPackageAccess
	 *                s.checkPackageAccess()} denies access to the package of
	 *                this class
	 *
	 *                </ul>
	 *
	 * @since JDK1.1
	 */
	public Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)
			throws NoSuchMethodException, SecurityException {
		return getConstructor(parameterTypes);
		// TODO
//		// be very careful not to change the stack depth of this
//		// checkMemberAccess call for security reasons
//		// see java.lang.SecurityManager.checkMemberAccess
////		checkMemberAccess(Member.DECLARED, ClassLoader.getCallerClassLoader());
//		return getConstructor0(parameterTypes, Member.DECLARED);
	}

	/**
	 * Finds a resource with a given name. The rules for searching resources
	 * associated with a given class are implemented by the defining
	 * {@linkplain ClassLoader class loader} of the class. This method delegates
	 * to this object's class loader. If this object was loaded by the bootstrap
	 * class loader, the method delegates to
	 * {@link ClassLoader#getSystemResourceAsStream}.
	 *
	 * <p>
	 * Before delegation, an absolute resource name is constructed from the
	 * given resource name using this algorithm:
	 *
	 * <ul>
	 *
	 * <li>If the {@code name} begins with a {@code '/'}
	 * (<tt>'&#92;u002f'</tt>), then the absolute name of the resource is the
	 * portion of the {@code name} following the {@code '/'}.
	 *
	 * <li>Otherwise, the absolute name is of the following form:
	 *
	 * <blockquote> {@code modified_package_name/name} </blockquote>
	 *
	 * <p>
	 * Where the {@code modified_package_name} is the package name of this
	 * object with {@code '/'} substituted for {@code '.'}
	 * (<tt>'&#92;u002e'</tt>).
	 *
	 * </ul>
	 *
	 * @param name
	 *            name of the desired resource
	 * @return A {@link java.io.InputStream} object or {@code null} if no
	 *         resource with this name is found
	 * @throws NullPointerException
	 *             If {@code name} is {@code null}
	 * @since JDK1.1
	 */
	
	@SuppressWarnings({ "unused" })
	public InputStream getResourceAsStream(String name) {
		// allows an optional second argument to be a base directory in JavaScript 
		// "System" class loader will not have this.$clazz$
		String clazzName = /** @j2sNative this.$clazz$ && (this.$clazz$.__CLASS_NAME$__ ||  this.$clazz$.__CLASS_NAME__)||*/ "";
		if (clazzName == "" && !name.startsWith("/"))
			name = "/" + name;
	    Object data = null;
	    if (name == null || URL.class == null)
	    	return null;
	    name = name.replace('\\','/');
	    String baseFolder = null;
	    String fname= name;
	    URL url = null;
		if (name.startsWith(File.temporaryDirectory)) {
			data = JSUtil.getCachedFileData(name,  true);
			if (data == null)
				return null;
		} else {
		/**
		 * @j2sNative
	    if (arguments.length == 2 && name.indexOf ('/') != 0) { // additional argument
	      name = "/" + name;
	    }
	    if (name.indexOf ('/') == 0) {
	      if (arguments.length == 2)  // additional argument
	        baseFolder = arguments[1];
	      if (!baseFolder)
	        baseFolder = Clazz._Loader.getJ2SLibBase();
	      if (baseFolder.charAt(baseFolder.length - 1) != '/')
	        baseFolder += "/";
	      fname = baseFolder + name.substring (1);
	    } else {
	      baseFolder = Clazz._Loader.getJ2SLibBase(); // getClass().getClassLoader() uses full path
	      fname = baseFolder;      
	      if (this.$_$base == null) {      
	        // getClass().getResource() will be here
	        var pkgs = clazzName.split(".");
	        if (fname.charAt(fname.length - 1) != '/')
	          fname += "/";
	        var map = Clazz._allPackage;
	        for (var i = 0; i < pkgs.length - 1; i++) {
	          if (!(map = map[pkgs[i]]))
	            break;
	          fname += pkgs[i] + "/";
	        }
	      }
	      fname += name;
	    }
	    var javapath = fname;
	    try {
//	      if (fname.indexOf(":/") < 0) {
//	        var d = document.location.href.split("#")[0].split("?")[0].split("/");
//        	d[d.length - 1] = fname;
//        	fname = d.join("/");
//	      }
	      Clazz.load("java.net.URL");
	      url = Clazz.new_(java.net.URL.c$$S,["file:/" + fname]);
	    } catch (e) {
	      return null;
	    }
	    var fileCache = J2S.getSetJavaFileCache(null);
	    data = fileCache && fileCache.get$O(javapath); 
	    */
		}
	    if (data == null)
	      data = JSUtil.J2S.getFileData(fname.toString(),null,true,true);
	    /**
	     * @j2sNative
	     * 
	    if (data == null || data == Boolean.FALSE || data == "error" || data.indexOf && data.indexOf("[Exception") == 0)
	      return null;
	            
	    var bytes = (data.__BYTESIZE == 1 ? data : J2S._strToBytes(data));
	    Clazz.load("java.io.BufferedInputStream");
	    Clazz.load("java.io.ByteArrayInputStream");
	    var is = Clazz.new_(java.io.BufferedInputStream.c$$java_io_InputStream, [Clazz.new_(java.io.ByteArrayInputStream.c$$BA, [bytes])]); 
	    is.url = url;
	    url._streamData = bytes;
	    return is;
		 */
		{
			return null;
		}
//		
//		name = resolveName(name);
//		ClassLoader cl = getClassLoader0();
//		if (cl == null) {
//			// A system class.
//			return ClassLoader.getSystemResourceAsStream(name);
//		}
//		return cl.getResourceAsStream(name);
	}

	/**
	 * Finds a resource with a given name. The rules for searching resources
	 * associated with a given class are implemented by the defining
	 * {@linkplain ClassLoader class loader} of the class. This method delegates
	 * to this object's class loader. If this object was loaded by the bootstrap
	 * class loader, the method delegates to
	 * {@link ClassLoader#getSystemResource}.
	 *
	 * <p>
	 * Before delegation, an absolute resource name is constructed from the
	 * given resource name using this algorithm:
	 *
	 * <ul>
	 *
	 * <li>If the {@code name} begins with a {@code '/'}
	 * (<tt>'&#92;u002f'</tt>), then the absolute name of the resource is the
	 * portion of the {@code name} following the {@code '/'}.
	 *
	 * <li>Otherwise, the absolute name is of the following form:
	 *
	 * <blockquote> {@code modified_package_name/name} </blockquote>
	 *
	 * <p>
	 * Where the {@code modified_package_name} is the package name of this
	 * object with {@code '/'} substituted for {@code '.'}
	 * (<tt>'&#92;u002e'</tt>).
	 *
	 * </ul>
	 *
	 * @param name
	 *            name of the desired resource
	 * @return A {@link java.net.URL} object or {@code null} if no resource with
	 *         this name is found
	 * @since JDK1.1
	 */
	public URL getResource(String name) {
		/**
		 * @j2sNative
		 * 
		 * 			var stream = this.getResourceAsStream$S(name); 
		 *          return(stream ? stream.url : null);
		 * 
		 */
		{
			return null;
		}
//		name = resolveName(name);
//		ClassLoader cl = getClassLoader0();
//		if (cl == null) {
//			// A system class.
//			return ClassLoader.getSystemResource(name);
//		}
//		return cl.getResource(name);
	}

//	/** protection domain returned when the internal domain is null */
//	private static java.security.ProtectionDomain allPermDomain;
//
//	/**
//	 * Returns the {@code ProtectionDomain} of this class. If there is a
//	 * security manager installed, this method first calls the security
//	 * manager's {@code checkPermission} method with a
//	 * {@code RuntimePermission("getProtectionDomain")} permission to ensure
//	 * it's ok to get the {@code ProtectionDomain}.
//	 *
//	 * @return the ProtectionDomain of this class
//	 *
//	 * @throws SecurityException
//	 *             if a security manager exists and its {@code checkPermission}
//	 *             method doesn't allow getting the ProtectionDomain.
//	 *
//	 * @see java.security.ProtectionDomain
//	 * @see SecurityManager#checkPermission
//	 * @see java.lang.RuntimePermission
//	 * @since 1.2
//	 */
//	public java.security.ProtectionDomain getProtectionDomain() {
//		SecurityManager sm = System.getSecurityManager();
//		if (sm != null) {
//			sm.checkPermission(SecurityConstants.GET_PD_PERMISSION);
//		}
//		java.security.ProtectionDomain pd = getProtectionDomain0();
//		if (pd == null) {
//			if (allPermDomain == null) {
//				java.security.Permissions perms = new java.security.Permissions();
//				perms.add(SecurityConstants.ALL_PERMISSION);
//				allPermDomain = new java.security.ProtectionDomain(null, perms);
//			}
//			pd = allPermDomain;
//		}
//		return pd;
//	}

//	/**
//	 * Returns the ProtectionDomain of this class.
//	 */
//	private native java.security.ProtectionDomain getProtectionDomain0();
//
//	/**
//	 * Set the ProtectionDomain for this class. Called by
//	 * ClassLoader.defineClass.
//	 */
//	native void setProtectionDomain0(java.security.ProtectionDomain pd);
//
	/*
	 * Return the Virtual Machine's Class object for the named primitive type.
	 */
	public static Class<?> getPrimitiveOrStringClass(String name) {
		switch (name) {
		case "S":
		case "String":
			return String.class;
		case "Z":
		case "boolean":
			return Boolean.TYPE;
		case "B":
		case "byte":
			return Byte.TYPE;
		case "C":
		case "char":
			return Character.TYPE;
		case "H":
		case "short":
			return Short.TYPE;
		case "I":
		case "int":
			return Integer.TYPE;
		case "J":
		case "long":
			return Long.TYPE;
		case "F":
		case "float":
		    return Float.TYPE;
		case "D":
		case "double":
			return Double.TYPE;
		case "O":
			return Object.class;
		default:
			return null;					
		}
	}
	

//	/*
//	 * Check if client is allowed to access members. If access is denied, throw
//	 * a SecurityException.
//	 *
//	 * Be very careful not to change the stack depth of this checkMemberAccess
//	 * call for security reasons. See
//	 * java.lang.SecurityManager.checkMemberAccess.
//	 *
//	 * <p> Default policy: allow all clients access with normal Java access
//	 * control.
//	 */
//	private void checkMemberAccess(int which, ClassLoader ccl) {
//		SecurityManager s = System.getSecurityManager();
//		if (s != null) {
//			s.checkMemberAccess(this, which);
//			ClassLoader cl = getClassLoader0();
//			if ((ccl != null) && (ccl != cl) && ((cl == null) || !cl.isAncestor(ccl))) {
//				String name = this.getName();
//				int i = name.lastIndexOf('.');
//				if (i != -1) {
//					s.checkPackageAccess(name.substring(0, i));
//				}
//			}
//		}
//	}

//	/**
//	 * Add a package name prefix if the name is not absolute Remove leading "/"
//	 * if name is absolute
//	 */
//	private String resolveName(String name) {
//		if (name == null) {
//			return name;
//		}
//		if (!name.startsWith("/")) {
//			Class c = this;
//			while (c.isArray()) {
//				c = c.getComponentType();
//			}
//			String baseName = c.getName();
//			int index = baseName.lastIndexOf('.');
//			if (index != -1) {
//				name = baseName.substring(0, index).replace('.', '/') + "/" + name;
//			}
//		} else {
//			name = name.substring(1);
//		}
//		return name;
//	}

	/**
	 * Reflection support.
	 */

	// Caches for certain reflective results
//	private static boolean useCaches = true;
//	private volatile transient SoftReference declaredFields;
//	private volatile transient SoftReference publicFields;
//	private volatile transient SoftReference declaredMethods;
//	private volatile transient SoftReference publicMethods;
//	private volatile transient SoftReference declaredConstructors;
//	private volatile transient SoftReference publicConstructors;
//	// Intermediate results for getFields and getMethods
//	private volatile transient SoftReference declaredPublicFields;
//	private volatile transient SoftReference declaredPublicMethods;

//	// Incremented by the VM on each call to JVM TI RedefineClasses()
//	// that redefines this class or a superclass.
//	private volatile transient int classRedefinedCount = 0;
//
//	// Value of classRedefinedCount when we last cleared the cached values
//	// that are sensitive to class redefinition.
//	private volatile transient int lastRedefinedCount = 0;
//
//	// Clears cached values that might possibly have been obsoleted by
//	// a class redefinition.
//	private void clearCachesOnClassRedefinition() {
//		if (lastRedefinedCount != classRedefinedCount) {
//			declaredFields = publicFields = declaredPublicFields = null;
//			declaredMethods = publicMethods = declaredPublicMethods = null;
//			declaredConstructors = publicConstructors = null;
//			annotations = declaredAnnotations = null;
//
//			// Use of "volatile" (and synchronization by caller in the case
//			// of annotations) ensures that no thread sees the update to
//			// lastRedefinedCount before seeing the caches cleared.
//			// We do not guard against brief windows during which multiple
//			// threads might redundantly work to fill an empty cache.
//			lastRedefinedCount = classRedefinedCount;
//		}
//	}

//	// Generic signature handling
//	private native String getGenericSignature();
//
//	// Generic info repository; lazily initialized
//	private transient ClassRepository genericInfo;
//
//	// accessor for factory
//	private GenericsFactory getFactory() {
//		// create scope and factory
//		return CoreReflectionFactory.make(this, ClassScope.make(this));
//	}

//	// accessor for generic info repository
//	private ClassRepository getGenericInfo() {
//		// lazily initialize repository if necessary
//		if (genericInfo == null) {
//			// create and cache generic info repository
//			genericInfo = ClassRepository.make(getGenericSignature(), getFactory());
//		}
//		return genericInfo; // return cached repository
//	}

//	// Annotations handling
//	private native byte[] getRawAnnotations();

//	native ConstantPool getConstantPool();

	//
	//
	// java.lang.reflect.Field handling
	//
	//
//
//	// Returns an array of "root" fields. These Field objects must NOT
//	// be propagated to the outside world, but must instead be copied
//	// via ReflectionFactory.copyField.
//	private Field[] privateGetDeclaredFields(boolean publicOnly) {
//		checkInitted();
//		Field[] res = null;
//		if (useCaches) {
//			clearCachesOnClassRedefinition();
//			if (publicOnly) {
//				if (declaredPublicFields != null) {
//					res = (Field[]) declaredPublicFields.get();
//				}
//			} else {
//				if (declaredFields != null) {
//					res = (Field[]) declaredFields.get();
//				}
//			}
//			if (res != null)
//				return res;
//		}
//		// No cached value available; request value from VM
//		res = Reflection.filterFields(this, getDeclaredFields0(publicOnly));
//		if (useCaches) {
//			if (publicOnly) {
//				declaredPublicFields = new SoftReference(res);
//			} else {
//				declaredFields = new SoftReference(res);
//			}
//		}
//		return res;
//	}

//	// Returns an array of "root" fields. These Field objects must NOT
//	// be propagated to the outside world, but must instead be copied
//	// via ReflectionFactory.copyField.
//	private Field[] privateGetPublicFields(Set traversedInterfaces) {
//		checkInitted();
//		Field[] res = null;
//		if (useCaches) {
//			clearCachesOnClassRedefinition();
//			if (publicFields != null) {
//				res = (Field[]) publicFields.get();
//			}
//			if (res != null)
//				return res;
//		}
//
//		// No cached value available; compute value recursively.
//		// Traverse in correct order for getField().
//		List fields = new ArrayList();
//		if (traversedInterfaces == null) {
//			traversedInterfaces = new HashSet();
//		}
//
//		// Local fields
//		Field[] tmp = privateGetDeclaredFields(true);
//		addAll(fields, tmp);
//
//		// Direct superinterfaces, recursively
//		Class[] interfaces = getInterfaces();
//		for (int i = 0; i < interfaces.length; i++) {
//			Class c = interfaces[i];
//			if (!traversedInterfaces.contains(c)) {
//				traversedInterfaces.add(c);
//				addAll(fields, c.privateGetPublicFields(traversedInterfaces));
//			}
//		}
//
//		// Direct superclass, recursively
//		if (!isInterface()) {
//			Class c = getSuperclass();
//			if (c != null) {
//				addAll(fields, c.privateGetPublicFields(traversedInterfaces));
//			}
//		}
//
//		res = new Field[fields.size()];
//		fields.toArray(res);
//		if (useCaches) {
//			publicFields = new SoftReference(res);
//		}
//		return res;
//	}
//
//	private static void addAll(Collection c, Field[] o) {
//		for (int i = 0; i < o.length; i++) {
//			c.add(o[i]);
//		}
//	}

//	//
//	//
//	// java.lang.reflect.Constructor handling
//	//
//	//
//
//	// Returns an array of "root" constructors. These Constructor
//	// objects must NOT be propagated to the outside world, but must
//	// instead be copied via ReflectionFactory.copyConstructor.
//	private Constructor[] privateGetDeclaredConstructors(boolean publicOnly) {
////		checkInitted();
//		Constructor[] res = null;
//		if (useCaches) {
//			clearCachesOnClassRedefinition();
//			if (publicOnly) {
//				if (publicConstructors != null) {
//					res = (Constructor[]) publicConstructors.get();
//				}
//			} else {
//				if (declaredConstructors != null) {
//					res = (Constructor[]) declaredConstructors.get();
//				}
//			}
//			if (res != null)
//				return res;
//		}
//		// No cached value available; request value from VM
//		if (isInterface()) {
//			res = new Constructor[0];
//		} else {
//			res = getDeclaredConstructors0(publicOnly);
//		}
//		if (useCaches) {
//			if (publicOnly) {
//				publicConstructors = new SoftReference(res);
//			} else {
//				declaredConstructors = new SoftReference(res);
//			}
//		}
//		return res;
//	}

	//
	//
	// java.lang.reflect.Method handling
	//
	//

//	// Returns an array of "root" methods. These Method objects must NOT
//	// be propagated to the outside world, but must instead be copied
//	// via ReflectionFactory.copyMethod.
//	private Method[] privateGetDeclaredMethods(boolean publicOnly) {
//		checkInitted();
//		Method[] res = null;
//		if (useCaches) {
//			clearCachesOnClassRedefinition();
//			if (publicOnly) {
//				if (declaredPublicMethods != null) {
//					res = (Method[]) declaredPublicMethods.get();
//				}
//			} else {
//				if (declaredMethods != null) {
//					res = (Method[]) declaredMethods.get();
//				}
//			}
//			if (res != null)
//				return res;
//		}
//		// No cached value available; request value from VM
//		res = Reflection.filterMethods(this, getDeclaredMethods0(publicOnly));
//		if (useCaches) {
//			if (publicOnly) {
//				declaredPublicMethods = new SoftReference(res);
//			} else {
//				declaredMethods = new SoftReference(res);
//			}
//		}
//		return res;
//	}

	static class MethodArray {
		private Method[] methods;
		private int length;

		MethodArray() {
			methods = new Method[20];
			length = 0;
		}

		void add(Method m) {
			if (length == methods.length) {
				methods = Arrays.copyOf(methods, 2 * methods.length);
			}
			methods[length++] = m;
		}

		void addAll(Method[] ma) {
			for (int i = 0; i < ma.length; i++) {
				add(ma[i]);
			}
		}

		void addAll(MethodArray ma) {
			for (int i = 0; i < ma.length(); i++) {
				add(ma.get(i));
			}
		}

		void addIfNotPresent(Method newMethod) {
			for (int i = 0; i < length; i++) {
				Method m = methods[i];
				if (m == newMethod || (m != null && m.equals(newMethod))) {
					return;
				}
			}
			add(newMethod);
		}

		void addAllIfNotPresent(MethodArray newMethods) {
			for (int i = 0; i < newMethods.length(); i++) {
				Method m = newMethods.get(i);
				if (m != null) {
					addIfNotPresent(m);
				}
			}
		}

		int length() {
			return length;
		}

		Method get(int i) {
			return methods[i];
		}

		void removeByNameAndSignature(Method toRemove) {
			for (int i = 0; i < length; i++) {
				Method m = methods[i];
				if (m != null 
						//&& m.getReturnType() == toRemove.getReturnType() 
						&& m.getName() == toRemove.getName()
						&& arrayContentsEq(m.getParameterTypes(), toRemove.getParameterTypes())) {
					methods[i] = null;
				}
			}
		}

		void compactAndTrim() {
			int newPos = 0;
			// Get rid of null slots
			for (int pos = 0; pos < length; pos++) {
				Method m = methods[pos];
				if (m != null) {
					if (pos != newPos) {
						methods[newPos] = m;
					}
					newPos++;
				}
			}
			if (newPos != methods.length) {
				methods = Arrays.copyOf(methods, newPos);
			}
		}

		Method[] getArray() {
			return methods;
		}
	}

	private Method[] $members$;

	// Returns an array of "root" methods. These Method objects must NOT
	// be propagated to the outside world, but must instead be copied
	// via ReflectionFactory.copyMethod.
	private Method[] privateGetPublicMethods(boolean isAll) {
		if (isAnnotation()) {
			if ($members$ == null) {
				$members$ = AnnotationParser.JSAnnotationObject.createMethods((Class<? extends Annotation>) this);
			}
			return $members$;
		}

		// TODO this is a nightmare.
		Method[] ms;
		if ($methodList$ != null) {
			// interface hack
			ms = new Method[$methodList$.length];
			for (int i = ms.length; --i >= 0;) {
				String name = $methodList$[i];
				boolean isNative = (/** @j2sNative this.$clazz$[o.exName].isNative ||*/ false);
				ms[i] = new Method(this, name, null, Void.class, null, getMods(isNative));
			}
			return ms;
		}

		ms = new Method[0];
		String attr = null;
		Object o = null;
		boolean isNative = false;
		// JUST $xxxx... names: o.exName.indexOf("$") != 0
		/**
		 * @j2sNative
		 * 
		 * 
		 * 			var p = this.$clazz$.prototype;
		 * 
		 *            for (attr in p) { o = p[attr]; if (
		 *            typeof o == "function" 
		 *            && o.exName 
		 *            && !o.__CLASS_NAME__ 
		 *            && o != this.$clazz$[attr] 
		 *            && (isAll || o.exClazz == this.$clazz$)
		 *            && !o.exName.startsWith("c$")
		 *            ) { 		 
		 *            isNative = o.isNative;
		 */
		

		Method m = new Method(this, attr, UNKNOWN_PARAMETERS, Void.class, NO_PARAMETERS, getMods(isNative));
		m._setJSMethod(o, Modifier.PUBLIC);
		/**
		 * @j2sNative
		 * 
		 * 			ms.push(m);
		 * }} 
		 *            p = this.$clazz$; 
		 *            for (attr in p) { o = p[attr];if (
		 *            typeof o == "function" 
		 *            && o.exName && !o.__CLASS_NAME__ 
		 *            && (isAll || o.exClazz == this.$clazz$)
		 *            && o.exName.indexOf("$") != 0
		 *            && !o.exName.startsWith("c$")
		 *            ) {
		 *            isNative = o.isNative;
		 */
		// NOT $xxxx... names: o.exName.indexOf("$") != 0
		m = new Method(this, attr, UNKNOWN_PARAMETERS, Void.class, NO_PARAMETERS, getMods(isNative));
		m._setJSMethod(o, Modifier.STATIC);
		/**
		 * @j2sNative
		 * 
		 * 			ms.push(m);
		 * }}
		 */

	    return ms; 

//		checkInitted();
//		Method[] res = null;
//		if (useCaches) {
//			clearCachesOnClassRedefinition();
//			if (publicMethods != null) {
//				res = (Method[]) publicMethods.get();
//			}
//			if (res != null)
//				return res;
//		}
//
//		// No cached value available; compute value recursively.
//		// Start by fetching public declared methods
//		MethodArray methods = new MethodArray();
//		{
//			Method[] tmp = privateGetDeclaredMethods(true);
//			methods.addAll(tmp);
//		}
//		// Now recur over superclass and direct superinterfaces.
//		// Go over superinterfaces first so we can more easily filter
//		// out concrete implementations inherited from superclasses at
//		// the end.
//		MethodArray inheritedMethods = new MethodArray();
//		Class[] interfaces = getInterfaces();
//		for (int i = 0; i < interfaces.length; i++) {
//			inheritedMethods.addAll(interfaces[i].privateGetPublicMethods());
//		}
//		if (!isInterface()) {
//			Class c = getSuperclass();
//			if (c != null) {
//				MethodArray supers = new MethodArray();
//				supers.addAll(c.privateGetPublicMethods());
//				// Filter out concrete implementations of any
//				// interface methods
//				for (int i = 0; i < supers.length(); i++) {
//					Method m = supers.get(i);
//					if (m != null && !Modifier.isAbstract(m.getModifiers())) {
//						inheritedMethods.removeByNameAndSignature(m);
//					}
//				}
//				// Insert superclass's inherited methods before
//				// superinterfaces' to satisfy getMethod's search
//				// order
//				supers.addAll(inheritedMethods);
//				inheritedMethods = supers;
//			}
//		}
//		// Filter out all local methods from inherited ones
//		for (int i = 0; i < methods.length(); i++) {
//			Method m = methods.get(i);
//			inheritedMethods.removeByNameAndSignature(m);
//		}
//		methods.addAllIfNotPresent(inheritedMethods);
//		methods.compactAndTrim();
//		res = methods.getArray();
//		if (useCaches) {
//			publicMethods = new SoftReference(res);
//		}
//		return res;
	}

	private int getMods(boolean isNative) {
		int mods = Modifier.PUBLIC;
		if (isNative)
			mods |= Modifier.NATIVE;
		return mods;
	}

    
	
	public Constructor[] $constructors$;


	// Returns an array of "root" methods. These Method objects must NOT
	// be propagated to the outside world, but must instead be copied
	// via ReflectionFactory.copyMethod.
	private Constructor[] privateGetConstructors() {
		Constructor[] ms;
		if ($constructors$ != null) {
			// interface hack
			ms = new Constructor[$constructors$.length];
			for (int i = ms.length; --i >= 0;) {
				ms[i] = new Constructor(this, $constructors$[i].getParameterTypes(), null, java.lang.reflect.Modifier.PUBLIC);
			}
			return ms;
		}

		ms = new Constructor[0];
		String attr = null;
		Object o = null;
		/**
		 * @j2sNative
		 * 
		 * 
		 * 			var p = this.$clazz$;
		 * 
		 *            for (attr in p) { o = p[attr]; if (
		 *            typeof o == "function" 
		 *            && o.exName && o.exName.startsWith("c$")
		 *            && !o.__CLASS_NAME__ 
		 *            && (o.exClazz == this.$clazz$)
		 *            ) { 
		 */
		
		Constructor m = new Constructor(this, UNKNOWN_PARAMETERS, null, Modifier.PUBLIC);
		m._setJSMethod(o, Modifier.PUBLIC);

		/**
		 * @j2sNative
		 * 
		 * 			ms.push(m);
		 * }}
		 */

	    return ms;
	}
	
//	//
//	// Helpers for fetchers of one field, method, or constructor
//	//
//
//	private Field searchFields(Field[] fields, String name) {
//		String internedName = name.intern();
//		for (int i = 0; i < fields.length; i++) {
//			if (fields[i].getName() == internedName) {
//				return getReflectionFactory().copyField(fields[i]);
//			}
//		}
//		return null;
//	}
//
//	private Field getField0(String name) throws NoSuchFieldException {
//		// Note: the intent is that the search algorithm this routine
//		// uses be equivalent to the ordering imposed by
//		// privateGetPublicFields(). It fetches only the declared
//		// public fields for each class, however, to reduce the number
//		// of Field objects which have to be created for the common
//		// case where the field being requested is declared in the
//		// class which is being queried.
//		Field res = null;
//		// Search declared public fields
//		if ((res = searchFields(privateGetDeclaredFields(true), name)) != null) {
//			return res;
//		}
//		// Direct superinterfaces, recursively
//		Class[] interfaces = getInterfaces();
//		for (int i = 0; i < interfaces.length; i++) {
//			Class c = interfaces[i];
//			if ((res = c.getField0(name)) != null) {
//				return res;
//			}
//		}
//		// Direct superclass, recursively
//		if (!isInterface()) {
//			Class c = getSuperclass();
//			if (c != null) {
//				if ((res = c.getField0(name)) != null) {
//					return res;
//				}
//			}
//		}
//		return null;
//	}

//	private static Method searchMethods(Method[] methods, String name, Class[] parameterTypes) {
//		Method res = null;
//		String internedName = name.intern();
//		for (int i = 0; i < methods.length; i++) {
//			Method m = methods[i];
//			if (m.getName() == internedName && arrayContentsEq(parameterTypes, m.getParameterTypes())
//					&& (res == null || res.getReturnType().isAssignableFrom(m.getReturnType())))
//				res = m;
//		}
//
//		return (res == null ? res : getReflectionFactory().copyMethod(res));
//	}

//	private Method getMethod0(String name, Class[] parameterTypes) {
//		// Note: the intent is that the search algorithm this routine
//		// uses be equivalent to the ordering imposed by
//		// privateGetPublicMethods(). It fetches only the declared
//		// public methods for each class, however, to reduce the
//		// number of Method objects which have to be created for the
//		// common case where the method being requested is declared in
//		// the class which is being queried.
//		Method res = null;
//		// Search declared public methods
//		if ((res = searchMethods(privateGetDeclaredMethods(true), name, parameterTypes)) != null) {
//			return res;
//		}
//		// Search superclass's methods
//		if (!isInterface()) {
//			Class c = getSuperclass();
//			if (c != null) {
//				if ((res = c.getMethod0(name, parameterTypes)) != null) {
//					return res;
//				}
//			}
//		}
//		// Search superinterfaces' methods
//		Class[] interfaces = getInterfaces();
//		for (int i = 0; i < interfaces.length; i++) {
//			Class c = interfaces[i];
//			if ((res = c.getMethod0(name, parameterTypes)) != null) {
//				return res;
//			}
//		}
//		// Not found
//		return null;
//	}
//
//	private Constructor<T> getConstructor0(Class[] parameterTypes, int which) throws NoSuchMethodException {
//		Constructor[] constructors = privateGetDeclaredConstructors((which == Member.PUBLIC));
//		for (int i = 0; i < constructors.length; i++) {
//			if (arrayContentsEq(parameterTypes, constructors[i].getParameterTypes())) {
//				return getReflectionFactory().copyConstructor(constructors[i]);
//			}
//		}
//		throw new NoSuchMethodException(getName() + ".<init>" + argumentTypesToString(parameterTypes));
//	}

	//
	// Other helpers and base implementation
	//

	private static boolean arrayContentsEq(Object[] a1, Object[] a2) {
		if (a1 == null) {
			return a2 == null || a2.length == 0;
		}

		if (a2 == null) {
			return a1.length == 0;
		}

		if (a1.length != a2.length) {
			return false;
		}

		for (int i = 0; i < a1.length; i++) {
			if (a1[i] != a2[i]) {
				return false;
			}
		}

		return true;
	}

//	private static Field[] copyFields(Field[] arg) {
//		Field[] out = new Field[arg.length];
//		ReflectionFactory fact = getReflectionFactory();
//		for (int i = 0; i < arg.length; i++) {
//			out[i] = fact.copyField(arg[i]);
//		}
//		return out;
//	}

//	private static Method[] copyMethods(Method[] arg) {
//		Method[] out = new Method[arg.length];
//		ReflectionFactory fact = getReflectionFactory();
//		for (int i = 0; i < arg.length; i++) {
//			out[i] = fact.copyMethod(arg[i]);
//		}
//		return out;
//	}

//	private static Constructor[] copyConstructors(Constructor[] arg) {
//		Constructor[] out = new Constructor[arg.length];
//		ReflectionFactory fact = getReflectionFactory();
//		for (int i = 0; i < arg.length; i++) {
//			out[i] = fact.copyConstructor(arg[i]);
//		}
//		return out;
//	}
//
//	private native Field[] getDeclaredFields0(boolean publicOnly);
//
//	private native Method[] getDeclaredMethods0(boolean publicOnly);
//
//	private native Constructor[] getDeclaredConstructors0(boolean publicOnly);
//
	private //native 
	Class[] getDeclaredClasses0() {
		return AnnotationParser.JSAnnotationObject.getDeclaredClasses(this.$clazz$);
	}
//
//	private static String argumentTypesToString(Class[] argTypes) {
//		StringBuilder buf = new StringBuilder();
//		buf.append("(");
//		if (argTypes != null) {
//			for (int i = 0; i < argTypes.length; i++) {
//				if (i > 0) {
//					buf.append(", ");
//				}
//				Class c = argTypes[i];
//				buf.append((c == null) ? "null" : c.getName());
//			}
//		}
//		buf.append(")");
//		return buf.toString();
//	}

	/**
	 * Java2Script style here
	 * 
	 * @param parameterTypes
	 * @return
	 */
	public static String argumentTypesToString(Class<?>[] parameterTypes) {
		if (parameterTypes == null)
			return "$";
		String s = "";
			for (int i = 0; i < parameterTypes.length; i++)
				s += "$" + /** @j2sNative Clazz._getParamCode(parameterTypes[i]) || */null;
		return s;
	}
	
//	/** use serialVersionUID from JDK 1.1 for interoperability */
//	private static final long serialVersionUID = 3206093459760846163L;
//
//	/**
//	 * Class Class is special cased within the Serialization Stream Protocol.
//	 *
//	 * A Class instance is written initially into an ObjectOutputStream in the
//	 * following format:
//	 * 
//	 * <pre>
//	 *      {@code TC_CLASS} ClassDescriptor
//	 *      A ClassDescriptor is a special cased serialization of
//	 *      a {@code java.io.ObjectStreamClass} instance.
//	 * </pre>
//	 * 
//	 * A new handle is generated for the initial time the class descriptor is
//	 * written into the stream. Future references to the class descriptor are
//	 * written as references to the initial class descriptor instance.
//	 *
//	 * @see java.io.ObjectStreamClass
//	 */
//	private static final ObjectStreamField[] serialPersistentFields = new ObjectStreamField[0];

	public static final Class<?>[] NO_PARAMETERS = new Class<?>[0];
	public static final Class<?>[] UNKNOWN_PARAMETERS = new Class<?>[0];

//	/**
//	 * Returns the assertion status that would be assigned to this class if it
//	 * were to be initialized at the time this method is invoked. If this class
//	 * has had its assertion status set, the most recent setting will be
//	 * returned; otherwise, if any package default assertion status pertains to
//	 * this class, the most recent setting for the most specific pertinent
//	 * package default assertion status is returned; otherwise, if this class is
//	 * not a system class (i.e., it has a class loader) its class loader's
//	 * default assertion status is returned; otherwise, the system class default
//	 * assertion status is returned.
//	 * <p>
//	 * Few programmers will have any need for this method; it is provided for
//	 * the benefit of the JRE itself. (It allows a class to determine at the
//	 * time that it is initialized whether assertions should be enabled.) Note
//	 * that this method is not guaranteed to return the actual assertion status
//	 * that was (or will be) associated with the specified class when it was (or
//	 * will be) initialized.
//	 *
//	 * @return the desired assertion status of the specified class.
//	 * @see java.lang.ClassLoader#setClassAssertionStatus
//	 * @see java.lang.ClassLoader#setPackageAssertionStatus
//	 * @see java.lang.ClassLoader#setDefaultAssertionStatus
//	 * @since 1.4
//	 */
//	public boolean desiredAssertionStatus() {
//		ClassLoader loader = getClassLoader();
//		// If the loader is null this is a system class, so ask the VM
//		if (loader == null)
//			return desiredAssertionStatus0(this);
//
//		synchronized (loader) {
//			// If the classloader has been initialized with
//			// the assertion directives, ask it. Otherwise,
//			// ask the VM.
//			return (loader.classAssertionStatus == null ? desiredAssertionStatus0(this)
//					: loader.desiredAssertionStatus(getName()));
//		}
//	}

//	// Retrieves the desired assertion status of this class from the VM
//	private static native boolean desiredAssertionStatus0(Class clazz);

//	// Fetches the factory for reflective objects
//	private static ReflectionFactory getReflectionFactory() {
//		if (reflectionFactory == null) {
//			reflectionFactory = (ReflectionFactory) java.security.AccessController
//					.doPrivileged(new sun.reflect.ReflectionFactory.GetReflectionFactoryAction());
//		}
//		return reflectionFactory;
//	}
//
//	private static ReflectionFactory reflectionFactory;
//
	// To be able to query system properties as soon as they're available
//	private static boolean initted = false;

//	private static void checkInitted() {
//		if (initted)
//			return;
//		AccessController.doPrivileged(new PrivilegedAction() {
//			public Object run() {
//				// Tests to ensure the system properties table is fully
//				// initialized. This is needed because reflection code is
//				// called very early in the initialization process (before
//				// command-line arguments have been parsed and therefore
//				// these user-settable properties installed.) We assume that
//				// if System.out is non-null then the System class has been
//				// fully initialized and that the bulk of the startup code
//				// has been run.
//
//				if (System.out == null) {
//					// java.lang.System not yet fully initialized
//					return null;
//				}
//
//				String val = System.getProperty("sun.reflect.noCaches");
//				if (val != null && val.equals("true")) {
//					useCaches = false;
//				}
//
//				initted = true;
//				return null;
//			}
//		});
//	}

	/**
	 * Returns the elements of this enum class or null if this Class object does
	 * not represent an enum type.
	 *
	 * @return an array containing the values comprising the enum class
	 *         represented by this Class object in the order they're declared,
	 *         or null if this Class object does not represent an enum type
	 * @since 1.5
	 */
	public T[] getEnumConstants() {
		return getEnumConstantsShared();
		// java2script - we do not clone
//		return (values != null) ? values.clone() : null;
	}

	/**
	 * Returns the elements of this enum class or null if this Class object does
	 * not represent an enum type; identical to getEnumConstantsShared except
	 * that the result is uncloned, cached, and shared by all callers.
	 */
	T[] getEnumConstantsShared() {
		if (enumConstants == null) {
			if (isEnum())
			   enumConstants = /** @j2sNative this.$clazz$.values$() || */ null;
//			try {
//				final Method values = getMethod("values");
//				java.security.AccessController.doPrivileged(new java.security.PrivilegedAction() {
//					public Object run() {
//						values.setAccessible(true);
//						return null;
//					}
//				});
////				enumConstants = (T[]) values.invoke(null, null); // BH  added ", null"
//			}
//			// These can happen when users concoct enum-like classes
//			// that don't comply with the enum spec.
//			catch (InvocationTargetException ex) {
//				return null;
//			} catch (NoSuchMethodException ex) {
//				return null;
//			} catch (IllegalAccessException ex) {
//				return null;
//			}
		}
		return enumConstants;
	}

	private volatile transient T[] enumConstants = null;

	/**
	 * Returns a map from simple name to enum constant. This package-private
	 * method is used internally by Enum to implement public static <T extends
	 * Enum<T>> T valueOf(Class<T>, String) efficiently. Note that the map is
	 * returned by this method is created lazily on first use. Typically it
	 * won't ever get created.
	 */
	@SuppressWarnings("rawtypes")
	Map<String, T> enumConstantDirectory() {
		if (enumConstantDirectory == null) {
			T[] universe = getEnumConstantsShared();
			if (universe == null)
				throw new IllegalArgumentException(getName() + " is not an enum type");
			Map<String, T> m = new HashMap<String, T>(2 * universe.length);
			for (T constant : universe)
				m.put(((Enum) constant).name(), constant);
			enumConstantDirectory = m;
		}
		return enumConstantDirectory;
	}

	
	private volatile transient Map<String, T> enumConstantDirectory = null;
	private AnnotationData annotationData;

	/**
	 * Casts an object to the class or interface represented by this
	 * {@code Class} object.
	 *
	 * @param obj
	 *            the object to be cast
	 * @return the object after casting, or null if obj is null
	 *
	 * @throws ClassCastException
	 *             if the object is not null and is not assignable to the type
	 *             T.
	 *
	 * @since 1.5
	 */
	public T cast(Object obj) {
		if (obj != null && !isInstance(obj))
			throw new ClassCastException(cannotCastMsg(obj));
		return (T) obj;
	}

	private String cannotCastMsg(Object obj) {
		return "Cannot cast " + obj.getClass().getName() + " to " + getName();
	}

	/**
	 * Casts this {@code Class} object to represent a subclass of the class
	 * represented by the specified class object. Checks that that the cast is
	 * valid, and throws a {@code ClassCastException} if it is not. If this
	 * method succeeds, it always returns a reference to this class object.
	 *
	 * <p>
	 * This method is useful when a client needs to "narrow" the type of a
	 * {@code Class} object to pass it to an API that restricts the
	 * {@code Class} objects that it is willing to accept. A cast would generate
	 * a compile-time warning, as the correctness of the cast could not be
	 * checked at runtime (because generic types are implemented by erasure).
	 *
	 * @return this {@code Class} object, cast to represent a subclass of the
	 *         specified class object.
	 * @throws ClassCastException
	 *             if this {@code Class} object does not represent a subclass of
	 *             the specified class (here "subclass" includes the class
	 *             itself).
	 * @since 1.5
	 */
	public <U> Class<? extends U> asSubclass(Class<U> clazz) {
		if (clazz.isAssignableFrom(this))
			return (Class<? extends U>) this;
		else
			throw new ClassCastException(this.toString());
	}

    /**
     * @throws NullPointerException {@inheritDoc}
     * @since 1.5
     */
    // AnnotationElement @Override
	public <A extends Annotation> A getAnnotation(Class<A> annotationClass) {
        Objects.requireNonNull(annotationClass);
		initAnnotationsIfNecessary();
        return (annotations == null ? null : (A) annotations.get(annotationClass));
	}

	/**
	 * @since 1.5
	 */
    // AnnotationElement @Override
	public Annotation[] getAnnotations() {
		initAnnotationsIfNecessary();
		return annotations.values().toArray(AnnotationParser.getEmptyAnnotationArray());
	}

    // AnnotationElement @Override
    @SuppressWarnings("hiding")
	public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass) {
        Objects.requireNonNull(annotationClass);
        AnnotationData annotationData = annotationData();
        return AnnotationSupport.getAssociatedAnnotations(annotationData.declaredAnnotations,
                                                          this,
                                                          annotationClass);
    }

    private AnnotationData annotationData() {
     //   while (true) { // retry loop
            AnnotationData annotationData = this.annotationData;
//            int classRedefinedCount = this.classRedefinedCount;
            if (annotationData != null 
//            		&&
//                annotationData.redefinedCount == classRedefinedCount
            		) {
                return annotationData;
            }
            // null or stale annotationData -> optimistically create new instance
            return annotationData = createAnnotationData(0);//classRedefinedCount);
     //   }
    }

    private AnnotationData createAnnotationData(int classRedefinedCount) {
        Map<Class<? extends Annotation>, Annotation> declaredAnnotations =
            AnnotationParser.parseAnnotations(null, this, false);
        Class<?> superClass = getSuperclass();
        Map<Class<? extends Annotation>, Annotation> annotations = null;
        if (superClass != null) {
            Map<Class<? extends Annotation>, Annotation> superAnnotations =
                superClass.annotationData().annotations;
            for (Map.Entry<Class<? extends Annotation>, Annotation> e : superAnnotations.entrySet()) {
                Class<? extends Annotation> annotationClass = e.getKey();
                if (AnnotationType.getInstance(annotationClass).isInherited()) {
                    if (annotations == null) { // lazy construction
                        annotations = new LinkedHashMap<>((Math.max(
                                declaredAnnotations.size(),
                                Math.min(12, declaredAnnotations.size() + superAnnotations.size())
                            ) * 4 + 2) / 3
                        );
                    }
                    annotations.put(annotationClass, e.getValue());
                }
            }
        }
        if (annotations == null) {
            // no inherited annotations -> share the Map with declaredAnnotations
            annotations = declaredAnnotations;
        } else {
            // at least one inherited annotation -> declared may override inherited
            annotations.putAll(declaredAnnotations);
        }
        return new AnnotationData(annotations, declaredAnnotations, classRedefinedCount);
    }

    // Annotation types cache their internal (AnnotationType) form

    private volatile transient AnnotationType annotationType;

	public void setAnnotationResult(AnnotationType type) {
		// SwingJS added
		annotationType = type;	
	}

//    boolean casAnnotationType(AnnotationType oldType, AnnotationType newType) {
//        return Atomic.casAnnotationType(this, oldType, newType);
//    }

    Class<? extends Annotation> annotationType() {
    	return (isAnnotation() ? (Class<? extends Annotation>) this : null);
    }

	//
    public AnnotationType getAnnotationType() {
    	// SwingJS was package-private
        return annotationType;
    }

    Map<Class<? extends Annotation>, Annotation> getDeclaredAnnotationMap() {
        return annotationData().declaredAnnotations;
    }

	/**
	 * @since 1.5
	 */
    // AnnotationElement @Override
	public Annotation[] getDeclaredAnnotations() {
		initAnnotationsIfNecessary();
		return declaredAnnotations.values().toArray(AnnotationParser.getEmptyAnnotationArray());
	}

//	// Annotations cache
	private transient Map<Class<? extends Annotation>, Annotation> annotations;
	private transient Map<Class<? extends Annotation>, Annotation> declaredAnnotations;

	private synchronized void initAnnotationsIfNecessary() {
//		clearCachesOnClassRedefinition(); // not allowing redefinition in SwingJS
		if (annotations != null)
			return;
		declaredAnnotations = AnnotationParser.parseAnnotations(null, this, false);
		Class<?> superClass = getSuperclass();
		if (superClass == null) {
			annotations = declaredAnnotations;
		} else {
			annotations = new HashMap<>();
			superClass.initAnnotationsIfNecessary();
			for (Map.Entry<Class<? extends Annotation>, Annotation>  e : superClass.annotations.entrySet()) {
				Class annotationClass = e.getKey();
				if (AnnotationType.getInstance(annotationClass).isInherited())
					annotations.put(annotationClass, e.getValue());
			}
			annotations.putAll(declaredAnnotations);
		}
	}

	void setAnnotationType(AnnotationType type) {
		annotationType = type;
	}

	@SuppressWarnings("null")
	@Override
	public int hashCode() {
		String name = null;
		/**
		 * @j2sNative
		 * 
		 * name = this.$clazz$.__CLASS_NAME__ || this.$clazz$.toString();
		 */
		return name.hashCode();
	}
	
	@Override
	public boolean equals(Object o) {
		/**
		 * @j2sNative
		 * 
		 * return o && o.__CLASS_NAME__ == "java.lang.Class" && o.$clazz$ == this.$clazz$; 
		 * 
		 */
		{
		return false;
		}
	}

	/**
	 * A SwingJS method for Constructor and Method
	 * 
	 * @param types
	 * @param args
	 * @param isProxy
	 * @return
	 */
	public static Object[] getArgumentArray(Class<?>[] types, Object[] args, boolean isProxy) {
		Object[] a = new Object[args == null ? 0 : args.length];
		if (args != null && (types != null || isProxy))
		      for (int i = args.length; --i >= 0;)
		    	  a[i] = (isProxy ? args[i] : /** @j2sNative (types[i].__PRIMITIVE && args[i].valueOf ? args[i].valueOf() : args[i]) || */ null);
		return a;
	}

    public Package getPackage() {
        return Package.getPackage(this);
    }

	public static Class<?> getJ2SSuperclassFor(Class<?> cl) {
		Class<?> c = null;
		/**
		 * 
		 * @j2sNative
		 * 
		 * 			c = cl.getSuperclass$ && cl.getSuperclass$();
		 */
		{
			cl.getSuperclass();
		}
		if (c == null && cl != Object.class) {
			c = Object.class;
		}
		return c;
	}

    // annotation data that might get invalidated when JVM TI RedefineClasses() is called
    private static class AnnotationData {
        final Map<Class<? extends Annotation>, Annotation> annotations;
        final Map<Class<? extends Annotation>, Annotation> declaredAnnotations;

        // Value of classRedefinedCount when we created this AnnotationData instance
        //final int redefinedCount;

        AnnotationData(Map<Class<? extends Annotation>, Annotation> annotations,
                       Map<Class<? extends Annotation>, Annotation> declaredAnnotations,
                       int redefinedCount) {
            this.annotations = annotations;
            this.declaredAnnotations = declaredAnnotations;
          //  this.redefinedCount = redefinedCount;
        }
    }

    // SwingJS from AnnotatedElement
    @SuppressWarnings("hiding")
	public <T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass) {
        Objects.requireNonNull(annotationClass);
        // Loop over all directly-present annotations looking for a matching one
        for (Annotation annotation : getDeclaredAnnotations()) {
            if (annotationClass.equals(annotation.annotationType())) {
                // More robust to do a dynamic cast at runtime instead
                // of compile-time only.
                return annotationClass.cast(annotation);
            }
        }
        return null;
    }
    
    // SwingJS from AnnotatedElement
    @SuppressWarnings("hiding")
	public <T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass) {
        Objects.requireNonNull(annotationClass);
        return AnnotationSupport.
            getDirectlyAndIndirectlyPresent(Arrays.stream(getDeclaredAnnotations()).
                                            collect(Collectors.toMap(Annotation::annotationType,
                                                                     Function.identity(),
                                                                     ((first,second) -> first),
                                                                     LinkedHashMap::new)),
                                            annotationClass);
    }
    
    // SwingJS from AnnotatedElement
	public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass) {
		if (annotationClass == null)
			throw new NullPointerException();
		return getAnnotation(annotationClass) != null;
	}


}
