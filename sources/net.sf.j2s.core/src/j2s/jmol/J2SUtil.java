package j2s.jmol;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.eclipse.core.runtime.Assert;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
import org.eclipse.jdt.core.dom.TagElement;

/**
 * A utility class holding several static "Helper" classes as well as shared
 * static methods.
 * 
 * 
 * @author Bob Hanson
 * 
 *   2023.11.27
 *
 */
class J2SUtil {

	/**
	 * FinalVariable that is used to record variable state, which will provide
	 * information for compiler to decide the generated name in *.js.
	 * 
	 * @author zhou renjian
	 *
	 *         2006-12-6
	 */
	static class FinalVariable {

		/**
		 * Level of the block
		 */
		int blockLevel;

		/**
		 * Final variable may be in a very deep anonymous class
		 */
		String methodScope;

		/**
		 * Variable name that is defined in Java sources
		 */
		String variableName;

		/**
		 * Variable name that is to be generated in the compiled *.js
		 */
		String toVariableName;

		public FinalVariable(int blockLevel, String variableName, String methodScope) {
			super();
			this.blockLevel = blockLevel;
			this.variableName = variableName;
			this.methodScope = methodScope;
		}

		public String toString() {
			return variableName + ":" + variableName;
		}

		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + blockLevel;
			result = prime * result + ((methodScope == null) ? 0 : methodScope.hashCode());
			result = prime * result + ((toVariableName == null) ? 0 : toVariableName.hashCode());
			result = prime * result + ((variableName == null) ? 0 : variableName.hashCode());
			return result;
		}

		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			final FinalVariable other = (FinalVariable) obj;
			if (blockLevel != other.blockLevel)
				return false;
			if (methodScope == null) {
				if (other.methodScope != null)
					return false;
			} else if (!methodScope.equals(other.methodScope))
				return false;
			if (toVariableName == null) {
				if (other.toVariableName != null)
					return false;
			} else if (!toVariableName.equals(other.toVariableName))
				return false;
			if (variableName == null) {
				if (other.variableName != null)
					return false;
			} else if (!variableName.equals(other.variableName))
				return false;
			return true;
		}
	}

	static class VariableHelper {

		/**
		 * List of variables that are declared as final.
		 */
		protected List<FinalVariable> finalVars = new ArrayList<>();

		/**
		 * Final variables only make senses (need "this.f$[...]") inside anonymous
		 * class.
		 */
		protected boolean isFinalSensible = true;

		/**
		 * Normal (non-final) variables may be affected by final variable names.
		 */
		protected List<FinalVariable> normalVars = new ArrayList<>();

		/**
		 * Only those final variables that are referenced inside anonymous class need to
		 * be passed into anonymous class.
		 */
		protected List<FinalVariable> visitedVars = new ArrayList<>();

		protected String getVariableName(String name) {
			for (int i = normalVars.size() - 1; i >= 0; i--) {
				FinalVariable var = normalVars.get(i);
				if (name.equals(var.variableName)) {
					return var.toVariableName;
				}
			}
			return name;
		}

	}

	/**
	 * The MethodRferenceASTVisitor is used to find out those private methods that
	 * are never referenced.
	 * 
	 * BH removed j2sKeep because it is not used in 4.2 Java or Jmol
	 * 
	 * @author zhou renjian 2006-5-1
	 */
	public static class MethodReferenceASTVisitor extends ASTVisitor {

		private boolean isReferenced;
		private String methodSignature;

		private MethodReferenceASTVisitor(String methodSignature) {
			this.methodSignature = methodSignature.replaceAll("%?<[^>]+>", "");
		}

		private static Set<String> methodSet;
		private static Map<String, String> pmMap;
		static {
			pmMap = new HashMap<String, String>();
			methodSet = new HashSet<String>();
			register("java.lang.String", "length", "length");
			register("java.lang.CharSequence", "length", "length");
			register("java.lang.String", "replace", "~replace");
			register("java.lang.String", "split", "~plit");
		}

		protected static boolean isMethodRegistered(String methodName) {
			return methodSet.contains(methodName);
		}

		private static void register(String className, String methodName, String propertyName) {
			pmMap.put(className + "." + methodName, propertyName);
			methodSet.add(methodName);
		}

		protected static String translate(String className, String methodName) {
			return pmMap.get(className + "." + methodName);
		}

		/**
		 * Check whether the given method can be defined by "Clazz.overrideMethod" or
		 * not.
		 * 
		 * @param node
		 * @return
		 */
		protected static boolean canAutoOverride(MethodDeclaration node) {
			boolean isOK2AutoOverriding = false;
			IMethodBinding methodBinding = node.resolveBinding();
			if (methodBinding != null && testForceOverriding(methodBinding)) {
				IMethodBinding superMethod = findMethodDeclarationInHierarchy(methodBinding.getDeclaringClass(),
						methodBinding);
				if (superMethod != null) {
					ASTNode parentRoot = node.getParent();
					while (parentRoot != null && !(parentRoot instanceof AbstractTypeDeclaration)) {
						parentRoot = parentRoot.getParent();
					}
					if (parentRoot != null) {
						isOK2AutoOverriding = !MethodReferenceASTVisitor.checkReference(parentRoot,
								superMethod.getKey());
					}
				}
			}
			return isOK2AutoOverriding;
		}

		/**
		 * Find the declaration of a method in the type hierarchy denoted by the given
		 * type. Returns <code>null</code> if no such method exists. If the method is
		 * defined in more than one super type only the first match is returned. First
		 * the implemented interfaces are examined and then the super class.
		 * 
		 * @param type          The type to search the method in
		 * @param methodBinding The binding of the method to find
		 * @return the method binding representing the overridden method, or
		 *         <code>null</code>
		 */
		private static IMethodBinding findMethodDeclarationInHierarchy(ITypeBinding type,
				IMethodBinding methodBinding) {
			ITypeBinding[] interfaces = type.getInterfaces();
			for (int i = 0; i < interfaces.length; i++) {
				ITypeBinding curr = interfaces[i];
				IMethodBinding method = findOverriddenMethodInType(curr, methodBinding);
				if (method != null)
					return method;
				method = findMethodDeclarationInHierarchy(interfaces[i], methodBinding);
				if (method != null)
					return method;
			}
			ITypeBinding superClass = type.getSuperclass();
			if (superClass != null) {
				IMethodBinding method = findOverriddenMethodInType(superClass, methodBinding);
				if (method != null)
					return method;

				method = findMethodDeclarationInHierarchy(superClass, methodBinding);
				if (method != null)
					return method;
			}
			return null;
		}

		/**
		 * Finds the method in the given <code>type</code> that is overridden by the
		 * specified <code>method<code>.
		 * Returns <code>null</code> if no such method exits.
		 * 
		 * @param type   The type to search the method in
		 * @param method The specified method that would override the result
		 * @return the method binding of the method that is overridden by the specified
		 *         <code>method<code>, or <code>null</code>
		 */
		private static IMethodBinding findOverriddenMethodInType(ITypeBinding type, IMethodBinding method) {
			if (type.isPrimitive())
				return null;
			IMethodBinding[] methods = type.getDeclaredMethods();
			for (int i = 0; i < methods.length; i++) {
				if (isSubsignature(method, methods[i]))
					return methods[i];
			}
			return null;
		}

		private static boolean testForceOverriding(IMethodBinding method) {
			if (method == null) {
				return true;
			}
			String methodName = method.getName();
			ITypeBinding classInHierarchy = method.getDeclaringClass();
			do {
				IMethodBinding[] methods = classInHierarchy.getDeclaredMethods();
				int count = 0;
				IMethodBinding superMethod = null;
				for (int i = 0; i < methods.length; i++) {
					if (methodName.equals(methods[i].getName())) {
						count++;
						superMethod = methods[i];
					}
				}
				if (count > 1 || count == 1 && superMethod != null && (!isSubsignature(method, superMethod)
						|| (superMethod.getModifiers() & Modifier.PRIVATE) != 0)) {
					return false;
				}
				classInHierarchy = classInHierarchy.getSuperclass();
			} while (classInHierarchy != null);
			return true;
		}

		/**
		 * @param overriding overriding method (m1)
		 * @param overridden overridden method (m2)
		 * @return <code>true</code> iff the method <code>m1</code> is a subsignature of
		 *         the method <code>m2</code>. This is one of the requirements for m1 to
		 *         override m2. Accessibility and return types are not taken into
		 *         account. Note that subsignature is <em>not</em> symmetric!
		 */
		private static boolean isSubsignature(IMethodBinding overriding, IMethodBinding overridden) {
			if (!overriding.getName().equals(overridden.getName()))
				return false;

			ITypeBinding[] m1Params = overriding.getParameterTypes();
			ITypeBinding[] m2Params = overridden.getParameterTypes();
			if (m1Params.length != m2Params.length)
				return false;

			ITypeBinding[] m1TypeParams = overriding.getTypeParameters();
			ITypeBinding[] m2TypeParams = overridden.getTypeParameters();
			if (m1TypeParams.length != m2TypeParams.length && m1TypeParams.length != 0) // non-generic m1 can override a
																						// generic m2
				return false;

			if (m2TypeParams.length != 0) {
				// Note: this branch does not 100% adhere to the spec and may report some false
				// positives.
				// Full compliance would require major duplication of compiler code.

				// Compare type parameter bounds:
				for (int i = 0; i < m1TypeParams.length; i++) {
					// loop over m1TypeParams, which is either empty, or equally long as
					// m2TypeParams
					Set<ITypeBinding> m1Bounds = getTypeBoundsForSubsignature(m1TypeParams[i]);
					Set<ITypeBinding> m2Bounds = getTypeBoundsForSubsignature(m2TypeParams[i]);
					if (!m1Bounds.equals(m2Bounds))
						return false;
				}
				// Compare parameter types:
				if (equals(m2Params, m1Params))
					return true;
				for (int i = 0; i < m1Params.length; i++) {
					ITypeBinding m1Param = m1Params[i];
					if (containsTypeVariables(m1Param))
						m1Param = m1Param.getErasure(); // try to achieve effect of "rename type variables"
					else if (m1Param.isRawType())
						m1Param = m1Param.getTypeDeclaration();
					if (!(J2SUtil.areBindingsEqual(m1Param, m2Params[i].getErasure()))) // can erase m2
						return false;
				}
				return true;

			}
			if (equals(m1Params, m2Params))
				return true;
			for (int i = 0; i < m1Params.length; i++) {
				ITypeBinding m1Param = m1Params[i];
				if (m1Param.isRawType())
					m1Param = m1Param.getTypeDeclaration();
				if (!(J2SUtil.areBindingsEqual(m1Param, m2Params[i].getErasure()))) // can erase m2
					return false;
			}
			return true;
		}

		private static boolean containsTypeVariables(ITypeBinding type) {
			if (type.isTypeVariable())
				return true;
			if (type.isArray())
				return containsTypeVariables(type.getElementType());
			if (type.isCapture())
				return containsTypeVariables(type.getWildcard());
			if (type.isParameterizedType())
				return containsTypeVariables(type.getTypeArguments());
			if (type.isTypeVariable())
				return containsTypeVariables(type.getTypeBounds());
			if (type.isWildcardType() && type.getBound() != null)
				return containsTypeVariables(type.getBound());
			return false;
		}

		private static boolean containsTypeVariables(ITypeBinding[] types) {
			for (int i = 0; i < types.length; i++)
				if (containsTypeVariables(types[i]))
					return true;
			return false;
		}

		/**
		 * Checks if the two arrays of bindings have the same length and their elements
		 * are equal. Uses <code>Bindings.equals(IBinding, IBinding)</code> to compare.
		 * 
		 * @param b1 the first array of bindings. Must not be <code>null</code>.
		 * @param b2 the second array of bindings.
		 * @return boolean
		 */
		private static boolean equals(IBinding[] b1, IBinding[] b2) {
			Assert.isNotNull(b1);
			if (b1 == b2)
				return true;
			if (b2 == null)
				return false;
			if (b1.length != b2.length)
				return false;
			for (int i = 0; i < b1.length; i++) {
				if (!J2SUtil.areBindingsEqual(b1[i], b2[i]))
					return false;
			}
			return true;
		}

		private static Set<ITypeBinding> getTypeBoundsForSubsignature(ITypeBinding typeParameter) {
			ITypeBinding[] typeBounds = typeParameter.getTypeBounds();
			int count = typeBounds.length;
			if (count == 0)
				return Collections.emptySet();

			Set<ITypeBinding> result = new HashSet<ITypeBinding>(typeBounds.length);
			for (int i = 0; i < typeBounds.length; i++) {
				ITypeBinding bound = typeBounds[i];
				if ("java.lang.Object".equals(typeBounds[0].getQualifiedName())) //$NON-NLS-1$
					continue;
				else if (containsTypeVariables(bound))
					result.add(bound.getErasure()); // try to achieve effect of "rename type variables"
				else if (bound.isRawType())
					result.add(bound.getTypeDeclaration());
				else
					result.add(bound);
			}
			return result;
		}

		protected static boolean checkReference(ASTNode node, String methodSignature) {
			MethodReferenceASTVisitor methodRefVisitor = new MethodReferenceASTVisitor(methodSignature);
			methodRefVisitor.isReferenced = false;
			node.accept(methodRefVisitor);
			return methodRefVisitor.isReferenced;
		}

		public boolean visit(MethodDeclaration node) {
			if (getJ2STag(node, "@j2sIgnore") != null) {
				return false;
			}
			return super.visit(node);
		}

		public boolean visit(ClassInstanceCreation node) {
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			if (constructorBinding != null) {
				String key = constructorBinding.getKey();
				if (key != null) {
					key = key.replaceAll("%?<[^>]+>", "");
				}
				if (methodSignature.equals(key)) {
					isReferenced = true;
					return false;
				}
			}
			return super.visit(node);
		}

		public boolean visit(ConstructorInvocation node) {
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			String key = constructorBinding.getKey();
			if (key != null) {
				key = key.replaceAll("%?<[^>]+>", "");
			}
			if (methodSignature.equals(key)) {
				isReferenced = true;
				return false;
			}
			return super.visit(node);
		}

		public boolean visit(EnumConstantDeclaration node) {
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			String key = constructorBinding.getKey();
			if (key != null) {
				key = key.replaceAll("%?<[^>]+>", "");
			}
			if (methodSignature.equals(key)) {
				isReferenced = true;
				return false;
			}
			return super.visit(node);
		}

		public boolean visit(MethodInvocation node) {
			IMethodBinding methodBinding = node.resolveMethodBinding();
			if (methodBinding != null) {
				String key = methodBinding.getKey();
				if (key != null) {
					key = key.replaceAll("%?<[^>]+>", "");
				}
				if (methodSignature.equals(key)) {
					isReferenced = true;
					return false;
				}
			}
			return super.visit(node);
		}

		public boolean visit(SuperMethodInvocation node) {
			IMethodBinding methodBinding = node.resolveMethodBinding();
			String key = null;
			if (methodBinding != null) {
				key = methodBinding.getKey();
				if (key != null) {
					key = key.replaceAll("%?<[^>]+>", "");
				}
			}
			if (methodSignature.equals(key)) {
				isReferenced = true;
				return false;
			}
			return super.visit(node);
		}

	}

	/**
	 * 
	 * @author zhou renjian
	 *
	 *         2006-12-3
	 */
	static class TypeHelper {

		private String thisClassName = "";

		public String getClassName() {
			return thisClassName;
		}

		public void setClassName(String className) {
			thisClassName = className;
		}

		public String getFullClassName(String thisPackageName) {
			return (thisPackageName != null && thisPackageName.length() != 0 && !"java.lang".equals(thisPackageName)
					? thisPackageName + '.' + thisClassName
					: thisClassName);
		}
	}

	final static String[] preDeclaredPackages = { //
			"java.lang", // publicfinal refactoring -- Helpers to inner static classes
			"java.lang.ref", //
			"java.lang.ref.reflect", //
			"java.lang.reflect", //
			"java.lang.annotation", //
			"java.io", //
			"java.util" //
	};

	/*
	 * IE passes the following: pubic,protected,private,static,package,
	 * implements,prototype,fasle,throws,label
	 * 
	 * Firefox passes the following: pubic,prototype,fasle,label
	 * 
	 * The following does not contains all the reserved keywords:
	 * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:
	 * Reserved_Words
	 * 
	 * abstract, boolean, break, byte, case, catch, char, class, const, continue,
	 * debugger, default, delete, do, double, else, enum, export, extends, false,
	 * final, finally, float, for, function, goto, if, implements, import, in,
	 * instanceof, int, interface, long, native, new, null, package, private,
	 * protected, public, return, short, static, super, switch, synchronized, this,
	 * throw, throws, transient, true, try, typeof, var, void, volatile, while,
	 * with,
	 * 
	 */
	private final static String[] keywords = new String[] { "class", "for", "while", "do",
			"in", "return", "function", "var", "class", "pubic", "protected", "private", "new", "delete", "static",
			"package", "import", "extends", "implements", "instanceof", "typeof", "void", "if", "this", "super",
			"prototype", "else", "break", "true", "fasle", "try", "catch", "throw", "throws", "continue", "switch",
			"default", "case", "export", "import", "const", /* "label", */"with", "arguments", "valueOf" };

	private J2SUtil() {
		// No instance
	}

	/**
	 * Check for given tag in JavaDoc or annotations.
	 * 
	 * @param node
	 * @return
	 */
	static Object getJ2STag(BodyDeclaration node, String tagName) {
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List<?> tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if (tagName.equals(tagEl.getTagName())) {
						return tagEl;
					}
				}
			}
		}
		List<?> modifiers = node.modifiers();
		String tag = null;
		for (Iterator<?> iter = modifiers.iterator(); iter.hasNext();) {
			Object obj = iter.next();
			if (obj instanceof Annotation) {
				Annotation annotation = (Annotation) obj;
				String qName = annotation.getTypeName().getFullyQualifiedName();
				int idx = qName.indexOf("J2S");
				if (idx >= 0) {
					if (tag == null)
						tag = tagName.substring(4); // drop @j2s
					if (qName.indexOf(tag, idx) == idx + 3) {
						return annotation;
					}
				}
			}
		}
		return null;
	}

	/**
	 * 
	 * Dependency and Legacy
	 * 
	 * @param qName
	 * @return
	 */
	static String removeBrackets(String qName) {
		if (qName == null) {
			return qName;
		}
		int length = qName.length();
		StringBuffer buf = new StringBuffer();
		int ltCount = 0;
		for (int i = 0; i < length; i++) {
			char c = qName.charAt(i);
			if (c == '<') {
				ltCount++;
			} else if (c == '>') {
				ltCount--;
			}
			if (ltCount == 0 && c != '>') {
				buf.append(c);
			}
		}
		qName = buf.toString().trim();
		return qName;
	}

	/**
	 * Discard generic type from the given full class name. There are no generic
	 * types in JavaScript.
	 * 
	 * Dependency and Legacy
	 * 
	 * @param name
	 * @return
	 */
	static String discardGenericType(String name) {
		return (name == null ? null : removeBrackets(name));
	}

	/**
	 * Returns <code>true</code> if the given type is a super type of a candidate.
	 * <code>true</code> is returned if the two type bindings are identical (TODO)
	 * 
	 * Dependency and Legacy
	 * 
	 * @param possibleSuperType the type to inspect
	 * @param type              the type whose super types are looked at
	 * @return <code>true</code> iff <code>possibleSuperType</code> is a super type
	 *         of <code>type</code> or is equal to it
	 */
	static boolean isSuperType(ITypeBinding possibleSuperType, ITypeBinding type) {
		if (type.isArray() || type.isPrimitive()) {
			return false;
		}
		if (areBindingsEqual(type, possibleSuperType)) {
			return true;
		}
		ITypeBinding superClass = type.getSuperclass();
		if (superClass != null) {
			if (isSuperType(possibleSuperType, superClass)) {
				return true;
			}
		}

		if (possibleSuperType.isInterface()) {
			ITypeBinding[] superInterfaces = type.getInterfaces();
			for (int i = 0; i < superInterfaces.length; i++) {
				if (isSuperType(possibleSuperType, superInterfaces[i])) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Checks if the two bindings are equals. First an identity check is made an
	 * then the key of the bindings are compared.
	 * 
	 * @param b1 first binding treated as <code>this</code>. So it must not be
	 *           <code>null</code>
	 * @param b2 the second binding.
	 * @return boolean
	 */
	static boolean areBindingsEqual(IBinding b1, IBinding b2) {
		boolean isEqualTo = b1.isEqualTo(b2);
		if (!isEqualTo && b1 instanceof ITypeBinding && b2 instanceof ITypeBinding) {
			ITypeBinding bb1 = (ITypeBinding) b1;
			ITypeBinding bb2 = (ITypeBinding) b2;
			String bb1Name = bb1.getBinaryName();
			if (bb1Name != null) {
				isEqualTo = bb1Name.equals(bb2.getBinaryName());
			}
		}
		return isEqualTo;
	}

	static boolean checkKeywordViolation(String name) {
		for (int i = 0; i < keywords.length; i++) {
			if (keywords[i].equals(name)) {
				return true;
			}
		}
		return false;
	}

	static String assureQualifiedName(String name) {
		if (name == null || name.length() == 0) {
			return name;
		}
		String[] packages = null;
		boolean existedKeyword = false;
		for (int i = 0; i < keywords.length; i++) {
			if (name.indexOf(keywords[i]) != -1) {
				if (packages == null) {
					packages = name.split("\\.");
				}
				for (int j = 0; j < packages.length; j++) {
					if (keywords[i].equals(packages[j])) {
						packages[j] = "[\"" + packages[j] + "\"]";
						existedKeyword = true;
					}
				}
			}
		}
		if (!existedKeyword || packages == null)
			return name;
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < packages.length; i++) {
			if (packages[i].charAt(0) == '[') {
				if (i == 0) {
					sb.append("window");
				}
				sb.append(packages[i]);
			} else {
				if (i != 0) {
					sb.append('.');
				}
				sb.append(packages[i]);
			}
		}
		return sb.toString();
	}

}