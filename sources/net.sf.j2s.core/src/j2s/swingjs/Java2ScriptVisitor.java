/*******************************************************************************
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * 
://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/
package j2s.swingjs;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.dom.*;
import org.eclipse.jdt.core.dom.PrimitiveType.Code;

import j2s.CorePlugin;

// TODO: superclass inheritance for JAXB XmlAccessorType
// TODO: Transpiler bug allows static String name, but JavaScript function().name is read-only and will be "clazz"

//BH 2025.03.21 -- 5.0.1-v7 adds @j2sAlias with no name as "strip $"; multiple signatures distinguished with multiple $ appended, starting with "$$"
//BH 2025.03.21 -- 5.0.1-v7 adds @j2sExport equivalent to @j2sAlias for all public methods
//BH 2025.03.05 -- 5.0.1-v6 adds native interface methods for WASM
//BH 2025.02.22 -- 5.0.1-v5 fixes Iterable<IAtom> AtomIterator::new missing [this,null] in generator  
//BH 2024.07.14 -- 5.0.1-v4 fixes numerical array initializer using characters ['a','b',...], but not new int[] { "test".charAt(3) }
//BH 2024.02.22 -- 5.0.1-v3 fixes long extension issue causing MutableBitInteger to miscalculate subtraction(no change in version #)
//BH 2023.11.27 -- 5.0.1-v2 final refactoring and creatiton of J2SUtil
//BH 2023.11.21 -- 5.0.1-v2 adds Java8 syntaxes for try and switch; removes dependency for instanceOf and exception checking
//BH 2023.11.09 -- 5.0.1-v1 merges Jmol legacy (.j2sjmol) with Java8//11 (.j2s)
//BH 2023.03.29 -- 3.3.1-v7 fixes outer static method call from within lambda expression. 
//BH 2023.02.09 -- 3.3.1.v6 fixes j2s.excluded.paths needing /src/xxxx
//BH 2022.06.27 -- 3.3.1-v5 fixes missing method annotations
//BH 2022.01.17 -- 3.3.1-v4 fixes default interface methods referencing their own static fields
//BH 2021.01.14 -- 3.3.1-v3 fixes missing finals for nested () -> {...}
//BH 2021.01.03 -- 3.3.1-v2 adds @j2sAsync adds async for function - experimental
//BH 2020.12.31 -- 3.3.1-v1 64-bit long implemented; adds "@j2sNoLongExact" for classes only, not methods
//BH 2020.12.19 -- 3.2.10-v1 preliminary work for 64-bit long 
//BH 2020.12.14 -- 3.2.9-v1s fix for Boolean |= boolean and related boxing 
//BH 2020.12.06 -- 3.2.9-v1r fix for (long) double using |0 
//BH 2020.11.20 -- 3.2.9-v1q fix for  new ImmutableCollections.ListN<>(E...) should use Object[] 
//BH 2020.08.03 -- 3.2.9-v1p fix for boxing boolean should be Boolean.valueOf$, not new Boolean
//BH 2020.08.01 -- 3.2.9-v1o fix for lambda expressions too static
//BH 2020.07.08 -- 3.2.9-v1n fix for try with resources and adds option varOrLet
//BH 2020.07.04 -- 3.2.9-v1m fix for X.super.y() in anonymous class
//BH 2020.06.22 -- 3.2.9-v1k fix for varargs not proper qualified arrays
//BH 2020.06.17 -- 3.2.9-v1j fix for functional interface this::privateMethod
//BH 2020.05.01 -- 3.2.9-v1i fix for nested lambda methods
//BH 2020.04.26 -- 3.2.9-v1h fix for inner classes of interfaces duplicated; fix for api.js inner class method names unqualified
//BH 2020.04.15 -- 3.2.9-v1g fix for qualified super() in inner classes using Class.super_ call (Tracker)
//BH 2020.04.05 -- 3.2.9-v1f (Boolean ? ...) not unboxed
//BH 2020.03.21 -- 3.2.9-v1e better v1c 
//BH 2020.03.20 -- 3.2.9-v1d proper check for new String("x") == "x" (should be false), but new integer(3) == 3 (true) 
//BH 2020.03.20 -- 3.2.9-v1c more efficient static call from 3.2.9-v1a 
//BH 2020.02.26 -- 3.2.9-v1b allows (byte) = (byte) to not use |0 
//BH 2020.02.20 -- 3.2.9-v1a order of 1st two parameters in new_ should be reversed
//BH 2020.02.18 -- 3.2.8-v2 fixes no-argument call to varargs constructor
//BH 2020.02.18 -- 3.2.8-v2 fixes import static missing $I$ defs
//BH 2020.02.05 -- 3.2.8-v1 reworking of functional interfaces; no longer unqualified
//BH 2020.01.31 -- 3.2.7-v5 'L' used instead of 'J' in $fields$
//BH 2020.01.31 -- 3.2.7-v5 java.lang.reflect.* should not be truncated to reflect.*
//BH 2020.01.16 -- 3.2.7-v4 replaces extends java.awt.Component and javax.swing.JComponent 
//BH 2020.01.12 -- 3.2.7-v3 fixes JAXB annotation marshalling for 3.2.7 
//BH 2020.01.11 -- 3.2.7-v3 corrects and rewrites synthetic bridge creation with much cleaner heap usage 
//BH 2020.01.09 -- 3.2.7-v2 introduces @j2sAlias as a way of adding a custom method name, as in exports. 
//BH 2020.01.08 -- 3.2.7-v1 sets generic references to their erasures; adds implicit synthetic default methods to interfaces 

//	Note: There was a limitation discovered in relation to Spliterators. Specifically, 
//	Spliterators$EmptySpliterator$OfInt (OfLong, OfDouble, etc) did not have the 
//	the method tryAdvance(IntConsumer consumer). This was due to the fact that
//	interface Spliterator$OfInt.tryAdvance(C consumer) overrides interface Spliterator$ofPrimitive.tryAdvance(C action)
//	but does not have the same signature.
//	Java handles this with a synthetic bridge in Spliterators$EmptySpliterator$OfInt, which maps
//	java.util.Spliterators$EmptySpliterator$OfInt.tryAdvance(IntConsumer)
//	to Spliterator.OfInt.tryAdvance(Object):
//	
//	public bridge synthetic boolean tryAdvance(java.util.function.IntConsumer arg0);
//	0  aload_0 [this]
//	1  aload_1 [arg0]
//	2  checkcast java.lang.Object [18]
//	5  invokevirtual java.util.Spliterators$EmptySpliterator$OfInt.tryAdvance(java.lang.Object) : boolean [20]
//	8  ireturn
//
//	 But, actually, we can do one better. All that was necessary was to add to the $defaults$ function of
//	 the Spliterator$OfInt interface an alias that equates tryAdvace$java_util_function_IntConsumer 
//	 to tryAdvance$O:
//	
//		C$.$defaults$ = function(C$){
//		  ...
//		  C$.prototype['tryAdvance$java_util_function_IntConsumer']=C$.prototype['tryAdvance$O'];
//		};
//
//  In this way, any implementing class gets that synthetic bridge method. Ta-DA!

// BH 2020.01.05 -- 3.2.6-v2 fixes synthetic methods missing for generics
// BH 2020.01.03 -- 3.2.6-v1 fixes for $__T and some synthetic methods missing
// BH 2020.01.01 3.2.6-v1 fixes for generic varargs with only one parameter
// BH 2019.12.19 3.2.6-v0 C$.$clinit$=2 adds C$.$fields$, Clazz._getFields
// BH 2019.11.20 3.2.5-v1 fix and refactoring for FINAL $finals$ fix throughout java.util.stream

// NOTE: All of the original (complicated and only partially working) nested block-counting code in 
// relation to final variable use and declaration has been removed. It is replaced by a simple method 
// that tracks use of this.$final$ within a class block using a HashSet and then uses that 
// HashSet as the basis for the {a:a,b:this.$finals$.b} mapping listFinalVariables.
// This fixed all of the stream issues. See Test_Local, Test_java8, Test_Class.

// BH 2019.12.15 3.2.5-v4 fix for <? extends Byte> not getting name for boxing 
// BH 2019.12.15 3.2.5-v4 fix for local class within anonymous class not getting name 
// BH 2019.12.12 3.2.5-v3 fix for enums == null in annotations
// BH 2019.12.07 3.2.5-v3 fix for lambda expression with $$ must not be cached
// BH 2019.12.06 3.2.5-v2 fix for try(resources) not closing those
// BH 2019.11.18 3.2.5-v0 fix for anonymous subclass of a local class not handling finals
// BH 2019.11.18 3.2.5-v0 fix for main method that throws exception not generating html test 
// BH 2019.11.18 3.2.5-v0 fix for lambda expressions in classes with annotations
// BH 2019.11.12 3.2.5-v0 fix for string literals with \n \nn \nnn octals, but "use strict" does not allow for this.
// BH 2019.11.12 3.2.5-v0 fix for static object being created before initialization is complete.
// BH 2019.11.12 3.2.5-v0 proper semantic versioning

// NOTE: The changes in 3.2.5-v0 are backward-compatible with .js files made from earlier versions.
// But files created with 3.2.5-v0 cannot be run using older SwingJS runtimes.
// NOTE: Initializing version 3.2.5-v0 requires starting Eclipse with the -clean option if 
// the plugin as in Eclipse has the "3.2.4" version still affixed.

// Case of org.biojava.bio.symbol.Location interface creating a static reference 
// to [RangeLocation extends AbstractRangeLocation] during the instantiation
// of [PointLocation extends AbstractRangeLocation], causing RangeLocation to 
// not pull in AbstractRangeLocation's interface methods, since that was all
// happening before AbstractRangeLocation's initialization was complete.
//
//Location      static RangeLocation rloc = new RangeLocation()
//  AbstractLocation
//      AbstractRangeLocation
//           PointLocation 
//           RangeLocation
//           
// Basically, a RangeLocation object was created that did not have 
// AbstractRangeLocation's prototype methods. 
//
// The primary design issue here was that we did not recognize that class
// dependency (superclass and interface) loading must fully precede execution
// of <clinit>, where static fields are fully initialized. Obviously Java does this,
// as in Java all dependencies must be present before compiling can occur. 
// The solution was to carry out the class loading first, and only when necessary 
// (class access via a reference to a static field or method, or during 
// superclass/interface instantiation.
//               
// BH 2019.10.18 fix for "P$.licationShutdownHooks" missing first three letters "app"
// BH 2019.09.07 adds optimization for lambda methods that do not have finals
// BH 2019.08.29 fix for boxing of binary representation 0b01... (Google Closure Compiler bug)
// BH 2019.05.13 fix for Math.getExponent, ulp, nextDown, nextUp, nextAfter needing qualification
// BH 2019.05.13 fix for Function reference in   new Foo()::test(...)
// BH 2019.04.03 fix for @j2sIgnore not including {}
// note to self: It is an annoyance that Eclipse does not recognize an annotation edit
//               as a need to recompile automatically
// TODO: Create a j2s configuration tag "j2s.jaxb.packages= package;package;package..."
//       that will direct the transpiler to create __ANN__ in any class within this package. 
/**
 * 
 * @author zhou renjian 2006-12-3
 * @author Bob Hanson 2017-2020
 *
 * 
 *
 */
public class Java2ScriptVisitor extends ASTVisitor {

	// 3.2.4:
	// C$.$clinit$ -- runs Clazz.load(cl,1) for getting dependencies
	// C$ static defaults included in class loading code
	// C$.$init0$ -- object defaults from within Clazz.newInstance, before any
	// constructors
	// C$.$init$ -- object declarations from the constructor, just after any super()
	// call or whenever there is no this() call
	// C$.__ANN__ [[[...]]] annotation references, without types
	// no @interface
	// no field value typing
	// no member return value typing

	// 3.2.5:
	// C$.$clinit$ = 1 -- tells Clazz to use C$.$statics$
	// C$ static defaults included in class loading code
	// C$.$static$ -- static declarations; once only; processed later by
	// Clazz.load(cl,2)
	// C$.$init0$ -- object defaults from within Clazz.newInstance, before any
	// constructors
	// C$.$init$ -- object declarations from the constructor, just after any super()
	// call or whenever there is no this() call
	// C$.__ANN__ [[[...]]] annotation references without types
	// no @interface
	// no field value typing
	// no member return value typing

	// 3.2.6:
	// C$.$clinit$ = 2 tells Clazz to use $fields$
	// C$.$fields$ = [[static][object]];referenced by Clazz.getFields()
	// C$.$init$ -- object declarations from the constructor, just after any super()
	// call or whenever there is no this() call
	// C$.$static$ and C$.$init0$ created dynamically
	// C$.$getMembers$ -- for @interface
	// C$.$getAnn$ -- return annotation references, with types
	// java.lang.Class can use C$.$fields$ to get field types for reflection

	static final String VERSION = CorePlugin.VERSION;

	private static final int NOT_LAMBDA = 0;
	private static final int LAMBDA_METHOD = 1;
	private static final int LAMBDA_CREATION = 3;
	private static final int LAMBDA_EXPRESSION = 5;

	private final static int METHOD_NOTSPECIAL = 0;
	private final static int METHOD_LITERAL = 1;
	private final static int METHOD_LAMBDA_M = 2;
	private final static int METHOD_LAMBDA_C = 3;

	private final static int METHOD_CONSTRUCTOR = 4;
	private final static int METHOD_INDEXOF = 8;
	private final static int METHOD_ISQUALIFIED = 16;

	private static final int NOT_LOCAL = 0;
	private static final int REALLY_LOCAL_CLASS = 1;
	private static final int ANON_CLASS = 2;
	private static final int LAMBDA_UNWRAPPED = 4;
	private static final int LAMBDA_WRAPPED = 8;

	private final static String CHARCODEAT0 = ".$c()";

	private static final String NULL_PACKAGE = "_";

	private final static int CHECK_J2S_IGNORE_ONLY = 1;
	private final static int CHECK_ANNOTATIONS_ONLY = 2;
	private final static int CHECK_J2S_IGNORE_AND_ANNOTATIONS = 3;

	static final int ANNOTATION_TYPE_UNKNOWN = 0;
	final static int JAXB_TYPE_NONE = 1;
	final static int JAXB_TYPE_FIELD = 2;
	final static int JAXB_TYPE_PUBLIC_MEMBER = 3;
	final static int JAXB_TYPE_PROPERTY = 4;
	static final int JAXB_TYPE_ENUM = 5;
	static final int JAXB_TYPE_UNSPECIFIED = 6;
	// UNSPECIFIED indicates that some @Xml... annotation was used, but
	// no XMLAccesorType was indicated for the class, so
	// this must be determined at run time based on the package. In this case we
	// introduce the !XMLPublic(true|false) annotation into C$.__ANN__ so that at
	// least we know whether this field is public or not. This is then a flag to the
	// marshaller to filter fields based on whether we are using PUBLIC_MEMBER or
	// not from the package or superclass. Could work. Not tested.

	// The main problem here is that we don't necessarily know if this is JAXB or
	// not

	static final int NOT_JAXB = 0x10;

	static Map<String, String> htClassReplacements;
	static List<String> lstPackageReplacements;

	private static List<String> global_lstMethodsDeclared;
	private static Map<String, String> global_htMethodsCalled;
	private static boolean global_logAllCalls;

	private static Map<String, String> htStringLiteralCache = new Hashtable<>();

	/**
	 * includes @j2sDebug blocks; from j2s.compiler.mode=debug in .j2s
	 * 
	 */
	static boolean global_j2sFlag_isDebugging = false;

	/**
	 * list of annotations to ignore or null to ignore ALL
	 * 
	 */
	private static String global_ignoredAnnotations = Java2ScriptSwingJSCompiler.J2S_COMPILER_IGNORED_ANNOTATIONS_DEFAULT;

	public static void setDebugging(boolean isDebugging) {
		global_j2sFlag_isDebugging = isDebugging;
	}

	static boolean global_j2sFlag_exact_long = true;

	public boolean isLongExact() {
		return !class_noLongExact && global_j2sFlag_exact_long;
	}

	public static void setExactLong(boolean doHandle) {
		global_j2sFlag_exact_long = doHandle;
	}

	static boolean global_j2sFlag_allow_async_thread = true;

	public boolean allowAsyncThread() {
		return global_j2sFlag_allow_async_thread;
	}

	public static void setAllowAsyncThread(boolean tf) {
		global_j2sFlag_allow_async_thread = tf;
	}

	public static void setAnnotating(String ignoredAnnotations) {
		global_ignoredAnnotations = (ignoredAnnotations == null ? null : ";" + ignoredAnnotations + ";");
	}

	public static void startCleanBuild() {
		htStringLiteralCache = new Hashtable<>();
	}

	/**
	 * annotations collected for a class
	 */
	private List<ClassAnnotation> class_annotations;
	private int xml_annotationType = ANNOTATION_TYPE_UNKNOWN;

	private IJavaProject global_project;

	/**
	 * multipurpose flag for testing development ideas.
	 * 
	 */
	private boolean global_testing;
	// make private fields properties of p1$ ?
	// the problem only shows up with a2s subclasses of Swing components
	// because they could declare the same private variable and not get
	// caught by the compiler, since they do not subclass that class.
	//
	// possible issues:
	// 1) We may have changed some awt, sun, and javax fields from private to public
	// 2) Is there an issue with inner classes referencing outer-class private
	// fields?

	private String package_name;

	/**
	 * track the names for I$$[...]
	 */
	private StringBuffer package_includes = new StringBuffer();

	/**
	 * map class names to I$$[] index
	 * 
	 */
	private Map<String, Integer> package_htIncludeNames = new Hashtable<>();

	/**
	 * I$$[] index counter
	 * 
	 */
	private int[] package_includeCount = new int[1];

	/**
	 * "final or effectively final" variable stashes
	 * 
	 */
	private Map<IVariableBinding, String> package_htFinalVarToJ2sName = new Hashtable<>();
	private Map<String, Set<IVariableBinding>> package_htClassKeyToVisitedFinalVars = new Hashtable<>();
	private Set<IVariableBinding> class_visitedFinalVars = new HashSet<IVariableBinding>();

	/**
	 * a flag to indicate that the expression being evaluated is an ArrayAccess type
	 * and so must be integerized with |0
	 */
	private boolean temp_processingArrayIndex;

	// the three key elements of any class

	private String class_fullName = ""; // test.Test_
	private String class_fullNameBra = ""; // test.Test_<
	private String class_shortName = ""; // Test_
	private ITypeBinding class_typeBinding;
	private boolean class_isAnonymousOrLocal;
	private boolean class_noLongExact;

	/**
	 * default constructor found by visit(MethodDeclaration)
	 */
	private boolean class_haveDefaultConstructor;

	/**
	 * Set the three key elements for the current class. Called only by
	 * addClassOrInterface.
	 * 
	 * @param className
	 * @param binding
	 */
	private void setClassAndBinding(String className, ITypeBinding binding) {
		class_typeBinding = binding;
		class_shortName = className;
		class_fullName = package_name + '.' + class_shortName;
		class_fullNameBra = class_fullName + "<";
	}

	private Java2ScriptVisitor setInnerGlobals(Java2ScriptVisitor parent, ASTNode node) {
		package_name = parent.package_name;
		package_htIncludeNames = parent.package_htIncludeNames;
		package_includeCount = parent.package_includeCount;
		package_includes = parent.package_includes;
		package_haveStaticArgsReversal = parent.package_haveStaticArgsReversal;
		package_mapBlockJavadoc = parent.package_mapBlockJavadoc;

		// final and effectively final references

		package_htFinalVarToJ2sName = parent.package_htFinalVarToJ2sName;
		package_htClassKeyToVisitedFinalVars = parent.package_htClassKeyToVisitedFinalVars;

		package_outerFinalKey = parent.package_outerFinalKey;

		// flag for wrapping lambda Class::method syntax with $$ function

		class_localType = parent.class_localType;

		class_noLongExact = parent.class_noLongExact;

		// xml annotations are handled a little differently -- one per top level

		this$0Name = parent.class_fullName;
		innerNode = node;

		return this;
	}

	private ASTNode innerNode;
	private String this$0Name;

//	private static IType appletType;  // do we care?

	public Java2ScriptVisitor() {
		// default constructor is necessary for addClassOrInterface

		// TODO how to compare a type with a subclass of JApplet?
		// this would be useful for automatically aliasing public methods
//		try {
//			appletType = project.findType("javax.swing.JApplet");
//		} catch (JavaModelException e) {
//			logErr("Java2ScriptVisitor could not find javax.swing.JApplet");
//		}
	}

	public Java2ScriptVisitor setProject(IJavaProject project, boolean testing) {
		this.global_testing = testing;
		this.global_project = project;
		return this;
	}

	public String getMyPackageName() {
		return package_name;
	}

	/**
	 * Buffer that keeps all compiled *.js.
	 */
	StringBuffer buffer = new StringBuffer();

	private char getLastCharInBuffer() {
		return (buffer.length() == 0 ? '\0' : buffer.charAt(buffer.length() - 1));
	}

	private final static int FIELD_INFO_OBJECT = 0;
	private final static int FIELD_INFO_STATIC = 1;
	private final static int FIELD_BOOLEAN = 0;
	private final static int FIELD_BYTE = 1;
	private final static int FIELD_CHAR = 2;
	private final static int FIELD_DOUBLE = 3;
	private final static int FIELD_FLOAT = 4;
	private final static int FIELD_INT = 5;
	private final static int FIELD_LONG = 6;
	private final static int FIELD_SHORT = 7;
	private final static int FIELD_STRING = 8;
	private final static int FIELD_OTHER = 9;
	private final static int FIELD_COUNT = 10;

	// order above can be changed, but typeCode order must then be adapted

	private final static String typeCodes = "ZBCDFIJHSO";

	private class FieldInfo {
		@SuppressWarnings("unchecked")
		private List<String>[][] fields = new ArrayList[2][FIELD_COUNT];

		private String lastType = null;

		FieldInfo() {
		}

		void add$fields$() {
			StringBuffer buf = buffer;
			buf.append("\nC$.$fields$=[");
			for (int i = 0; i < 2; i++) {
				List<String>[] fieldData = fields[i];
				int lastType = -1;
				for (lastType = FIELD_COUNT; --lastType >= 0;)
					if (fieldData[lastType] != null)
						break;
				// Skip statics if there are none
				if (i == 1 && lastType < 0)
					break;
				buf.append(i == 0 ? "[" : "\n,[");
				String sep = "'";
				for (int j = 0; j <= lastType; j++) {
					List<String> list = fieldData[j];
					if (list == null)
						continue;
					buf.append(sep).append(typeCodes.charAt(j)).append("',[");
					for (int k = 0; k < list.size(); k++) {
						buf.append(k == 0 ? "'" : ",'").append(list.get(k)).append("'");
					}
					sep = ",'";
					buf.append("]");
				}
				buf.append("]");
			}
			buf.append("]\n");
		}

		@SuppressWarnings("null")
		void addField(boolean isStatic, String name, IVariableBinding v, int tpt) {
			int fpt = (isStatic ? FIELD_INFO_STATIC : FIELD_INFO_OBJECT);
			List<String>[] fieldData = fields[fpt];
			String typeName = null;
			if (tpt < 0) {
				typeName = j2sNonPrimitiveName(v.getType(), false);
				tpt = (typeName.equals("String") ? FIELD_STRING : FIELD_OTHER);
			}
			List<String> lst = fieldData[tpt];
			if (lst == null)
				lst = fieldData[tpt] = new ArrayList<String>();
			if (tpt == FIELD_OTHER) {
				if (typeName.equals(lastType)) {
					lst.add("+" + name);
				} else {
					lst.add(name);
					lst.add(lastType = typeName);
				}
			} else {
				lst.add(name);
			}
		}

		int getPrimitiveDefaultType(Code code) {
			switch (code.toString()) {
			case "boolean":
				return FIELD_BOOLEAN;
			case "byte":
				return FIELD_BYTE;
			case "char":
				return FIELD_CHAR;
			case "double":
				return FIELD_DOUBLE;
			case "float":
				return FIELD_FLOAT;
			case "int":
				return FIELD_INT;
			case "long":
				return FIELD_LONG;
			case "short":
				return FIELD_SHORT;
			default:
				return -1;
			}
		}

	}

	private FieldInfo fieldInfo;
	private boolean haveFields;

	private ArrayList<String> applets, apps;

	private boolean isUserApplet;

	private int class_localType = NOT_LOCAL;

	/**
	 * flag to indicate that we need the $I$(i,n,m) definition.
	 */
	private boolean[] package_haveStaticArgsReversal = new boolean[] { false };

	private int b$count;

	private IMethodBinding meth_current;

	private String package_outerFinalKey;

	private String package_currentFinalKey;

	/**
	 * This flag turns off C$ for interfaces, instead pointing to themselves.
	 */
	private int class_defpt = -1;

	private void addApplication() {
		if (apps == null)
			apps = new ArrayList<String>();
		apps.add(class_fullName);
	}

	private boolean checkAddApplet(ITypeBinding binding) {
		if (Modifier.isAbstract(binding.getModifiers()))
			return false;
		// IType bound = (IType) binding.getJavaElement();
		// How to compare this with JApplet?
		// ITypeBinding b = binding;
		while ((binding = binding.getSuperclass()) != null) {
			String name = binding.getQualifiedName();
			if ("javax.swing.JApplet".equals(name) || "java.applet.Applet".equals(name)) {
				if (applets == null)
					applets = new ArrayList<String>();
				applets.add(class_fullName);
				return true;
			}
			if (name.startsWith("java.") || name.startsWith("javax"))
				return false;
		}
		return false;
	}

	public ArrayList<String> getAppList(boolean isApplets) {
		return (isApplets ? applets : apps);
	}

	public boolean visit(CompilationUnit node) {
		resetPrivateVars();
		return true;
	}

	public boolean visit(PackageDeclaration node) {
		setMapJavaDoc(node);
		List<?> annotations = node.annotations();
		if (annotations != null && annotations.size() > 0) {
			for (int i = 0; i < annotations.size(); i++)
				addAnnotation((Annotation) annotations.get(i), node, CHECK_ANNOTATIONS_ONLY);
			if (xml_annotationType == ANNOTATION_TYPE_UNKNOWN)
				xml_annotationType = JAXB_TYPE_PUBLIC_MEMBER;
		}
		setPackage(node.getName().toString());
		return false;
	}

	// public boolean visit(AnonymousClassDeclaration node)
	// anonymous will never come through here. It will be routed directly to
	// addClassOrInterface

	/**
	 * Set the package name and start the package header
	 * 
	 * @param packageName package name or null to check to see if this is a
	 *                    top-level window. applet
	 * 
	 */
	private void setPackage(String packageName) {
		if (packageName == null) {
			if (package_name != null)
				return;
			packageName = NULL_PACKAGE;
		}
		package_name = packageName;
		package_includes = new StringBuffer();
		buffer.append("var P$=");
		if (NameMapper.isJ2sClazzPackage(package_name)) {
			buffer.append(packageName);
		} else {
			buffer.append("Clazz.newPackage(\"").append(packageName).append("\")");
		}
		buffer.append(",I$=[];\n");
	}

	public boolean visit(AssertStatement node) {
		buffer.append("Clazz.assert(C$, this, function(){return ");
		addExpressionAsTargetType(node.getExpression(), Boolean.TYPE, "r", null);
		Expression msg = node.getMessage();
		if (msg != null) {
			buffer.append("}, function(){return ");
			msg.accept(this);
		}
		buffer.append("});\n");
		trailingBuffer.hasAssert = true;
		return false;
	}

	/**
	 * Only specially process blocks if they are method declarations. Never process
	 * these for constructors.
	 */

	public boolean visit(Block node) {
		buffer.append("{\n");
		ASTNode parent = node.getParent();
		if (parent instanceof TypeDeclaration) {
			// Javadoc javadoc = ((TypeDeclaration) parent).getJavadoc();

		} else if (parent instanceof MethodDeclaration && !((MethodDeclaration) parent).isConstructor()
				|| parent instanceof Initializer) {
			Javadoc javadoc = ((BodyDeclaration) parent).getJavadoc();
			if (javadoc != null) {
				List<Javadoc> list = new ArrayList<Javadoc>();
				list.add(javadoc);
				return !NativeDoc.addJ2sJavadocs(buffer, list, false);
			}
		}
		return true;
	}

	public void endVisit(Block node) {
		// look for trailing j2sNative block just before the end of a block
		getJ2sJavadoc(node, DOC_ADD_POST);
		buffer.append("}");
	}

	public boolean visit(BreakStatement node) {
		buffer.append("break");
		addLabel(node.getLabel(), false);
		return false;
	}

	/**
	 * top-level new Foo() inner static new Foo.Bar()
	 * 
	 * lambda expression Runnable r2 = () -> System. out.println("Hello world
	 * two!");
	 * 
	 * new MouseListener() {...}
	 * 
	 */
	public boolean visit(ClassInstanceCreation node) {
		AnonymousClassDeclaration anonDeclare = node.getAnonymousClassDeclaration();
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding == null)
			return false;

		if (binding.isLocal()) {
			String ourName = getUnreplacedJavaClassNameQualified(binding);
			// method-local classes or anonymous classes
			// includes anonymous, despite JLS spec that anonymous classes are not local
			processLocalInstance(node, anonDeclare, binding, binding, ourName, NOT_LAMBDA,
					anonDeclare == null ? REALLY_LOCAL_CLASS : ANON_CLASS);
			return false;
		}
		IMethodBinding constructorMethodBinding = node.resolveConstructorBinding();
		if (binding.isTopLevel() || isStatic(binding)) {
			// standard new Foo() or new ClassX.Foo()
			addConstructor(binding,
					// node.getType(),
					constructorMethodBinding, node.arguments(), -1);
		} else {
			// inner nonstatic class
			addInnerTypeInstance(node, binding, binding, getUnreplacedJavaClassNameQualified(binding),
					node.getExpression(),
					(constructorMethodBinding == null ? null : constructorMethodBinding.getMethodDeclaration()), null,
					null);
		}
		return false;
	}

	private void addConstructor(ITypeBinding javaClass,
			// Type type,
			IMethodBinding constructorMethodBinding, List<?> arguments, int lambdaArity) {
		String javaClassName = getUnreplacedJavaClassNameQualified(javaClass);
		if ("java.lang.Object".equals(javaClassName)) {
			buffer.append(" Clazz.new_()");
			return;
		}
		String finalQualifiedClassName = getFinalJ2SClassName(javaClassName, FINAL_RAW);
		String prefix = null, postfix = null;
		int pt = -1, pt1 = -1;
		boolean isDefault = false;
		if ("String".equals(finalQualifiedClassName)) {
			// special treatment for String -- see j2sSwingJS.js
			buffer.append(" String.instantialize(");
		} else if (NameMapper.isOneOf(finalQualifiedClassName, NameMapper.noConstructorNames)) {
			// look out for java.lang.Integer and the like -- just pass it
			// directly
			// Replace new Boolean with Boolean.from because new
			// Boolean("false") returns true in JavaScript.
			// JavaScript considers any string to be true while java only
			// considers the string "true" to be true
			if (finalQualifiedClassName.equals("Boolean"))
				buffer.append(" Boolean.from(");
			else
				buffer.append(" new ").append(finalQualifiedClassName).append("(");
		} else {
			pt = openNew(javaClass, javaClassName, null, constructorMethodBinding,
					lambdaArity >= 0 ? METHOD_LAMBDA_C : METHOD_NOTSPECIAL);
			pt1 = buffer.length();
			isDefault = (arguments != null && arguments.isEmpty() && !constructorMethodBinding.isVarargs());
			prefix = ",[";
			postfix = "]";
		}
		if (lambdaArity >= 0) {
			buffer.append(",[");
			String params = getLambdaParamList(constructorMethodBinding, lambdaArity);
			// javaClass cannot be a lambda expression, because this is Xxxx::new
			String key = javaClass.getKey();
			String finals = listFinalVariables(package_htClassKeyToVisitedFinalVars.get(key), package_outerFinalKey);
			// for Lambda_C we need [this,null], because maybe there are finals expressed
			// elsewhere
			// if (finals != null) {
			buffer.append("this,").append(finals);
			if (params.length() > 0)
				buffer.append(",");
			// }
			buffer.append(params).append("]");
		} else if (!isDefault) {
			IMethodBinding constructorMethodDeclaration = (constructorMethodBinding == null ? null
					: constructorMethodBinding.getMethodDeclaration());
			addMethodParameterList(arguments, constructorMethodDeclaration, prefix, postfix, METHOD_CONSTRUCTOR);
			checkStaticParams2(pt, pt1, true);
		}
		buffer.append(")");
	}

	/**
	 * 3.2.9.v1c
	 * 
	 * Static method invocations must process parameters before initializing the
	 * method's class if any parameter either calls a method or defines a static
	 * variable. We do this by changing
	 * 
	 * $I$(3).xxxx(x,y,z)
	 * 
	 * to
	 * 
	 * $I$(3,"xxxx",[x,y,z])
	 * 
	 * In addition, for constructors, Clazz.new_ needs to have the parameters as the
	 * first parameter and the constructor method as the second parameter:
	 * 
	 * Clazz.new_([args],constr)
	 * 
	 * The method invocation has not been closed at this point.
	 * 
	 * @param pt  start of method name
	 * @param pt1 end of method name
	 */
	private void checkStaticParams2(int pt, int pt1, boolean isConstructor) {
		String args;
		// must switch from Clazz.new_($I$(3).xxxx,[x,y,z] to
		// Clazz.new([x,y,z],$I$(3).xxxx
		// ............................^pt........^pt1
		// must switch from $I$(3).xxxx(x,y,z to $I$(3,"xxxx",[x,y,z])
		// .................fffffffffff
		// .................^pt..^fpt..^pt1
		if (pt1 == pt || buffer.charAt(pt) != '$'
				|| (args = buffer.substring(pt1 + 1)).indexOf("(") < 0 && args.indexOf("=") < 0)
			return;
		String f = buffer.substring(pt, pt1);
		buffer.setLength(pt);
		if (isConstructor) {
			buffer.append(args).append(",").append(f);
		} else {
			package_haveStaticArgsReversal[0] = true;
			int fpt = f.indexOf(")");
			buffer.append(f.substring(0, fpt)).append(",\"").append(f.substring(fpt + 2)).append("\",[").append(args)
					.append("]");
		}
	}

	/**
	 * Start a new Clazz.new_(cl,[args],innerClass) call for class creation or inner
	 * classes and adds the construtor reference.
	 * 
	 * Starting in 3.2.9 we allow for the more correct sequence of
	 * ([args],cl,innerClass) since then it is certain that the arguments will be
	 * processed prior to static initialization (Java <clinit>) of cl. Clazz.new_
	 * will use Array.isArray() to check that order, since cl itself cannot be an
	 * array.
	 * 
	 * @param javaClassName            the class name to use if there is no
	 *                                 anonymous class name
	 * @param anonJavaName             the name of the anonymous class or lambda
	 *                                 class that has just been defined
	 * @param constructorMethodBinding the specified constructor for this
	 *                                 instantiation
	 * @param specialType              METHOD_LAMBDA_C or METHOD_NOTSPECIAL
	 * 
	 * @return buffer pt to the first parameter of Clazz.new_
	 */
	private int openNew(ITypeBinding javaClass, String javaClassName, String anonJavaName,
			IMethodBinding constructorMethodBinding, int specialType) {
		buffer.append("Clazz.new_(");
		int pt = buffer.length();
		String finalQualifiedName;
		if (anonJavaName == null) {
			// not inner
			finalQualifiedName = getFinalJ2SClassName(javaClassName, FINAL_PC);
			if (!finalQualifiedName.equals("C$"))
				finalQualifiedName = getFinalJ2SClassNameQualifier(null, javaClass, javaClassName,
						FINAL_ESCAPECACHE | FINAL_NEW);
		} else {
			// use the lambda name directly without caching or changing.
			finalQualifiedName = getFinalJ2SClassName(anonJavaName, FINAL_P);
		}
		if (constructorMethodBinding == null) {
			// an interface instance, so no constructor
			buffer.append(finalQualifiedName + ".$init$");
		} else {
			String qName = getFinalMethodNameWith$Params(finalQualifiedName + ".c$", constructorMethodBinding, null,
					false, specialType);
			// if no parameters, we just give the name of the class, not the constructor
			buffer.append(qName.endsWith(".c$") ? finalQualifiedName : qName);
		}
		return pt;
	}

	/**
	 * Construct the class name from a Type.
	 * 
	 * @param type
	 * @return
	 */
	private String getClassJavaNameForType(Type type) {
		if (type instanceof QualifiedType) {
			QualifiedType qualType = (QualifiedType) type;
			return getClassJavaNameForType(qualType.getQualifier()) + "." + qualType.getName().getIdentifier();
		}
		if (type instanceof ArrayType)
			return getClassJavaNameForType(((ArrayType) type).getElementType());
		if (type instanceof ParameterizedType)
			return getClassJavaNameForType(((ParameterizedType) type).getType());
		if (type instanceof SimpleType) {
			ITypeBinding binding = ((SimpleType) type).resolveBinding();
			return getUnreplacedJavaClassNameQualified(binding);
		}

		// PrimitiveType
		// WildcardType
		// other types?
		return null;
	}

	/**
	 * Runnable r = new Runnable(){public void run(){System. out.println("OK");}};
	 * 
	 * or
	 * 
	 * Runnable r = () -> System. out.println("OK");
	 * 
	 * a class definition and an instantiation at the same time. "
	 * 
	 * @param node
	 * @param anonymousClassDeclaration
	 * @param binding
	 * @param javaInnerClassName        includes method-local class names and
	 *                                  anonymous class names
	 * @param isLambda
	 * @param isClassTrulyLocal
	 * 
	 * @return anonymous name only if there are no finals
	 */
	private String processLocalInstance(ASTNode node, ASTNode anonymousClassDeclaration, ITypeBinding binding,
			ITypeBinding innerSuperClass, String javaInnerClassName, int lambdaType, int localType) {

		// In the case of local classes, the declaration is dissociated from the
		// instantiation, so we need to cache the final string "{m:m,b:b,...}" at
		// creation time and recover it here.
		int b$count0 = b$count;

		boolean isStatic = true;

		IMethodBinding constructorDeclaration;
		String anonymousSuperclassName;
		String anonName;

		if (lambdaType == NOT_LAMBDA) {
			// anonymous class

			IMethodBinding constructorBinding = ((ClassInstanceCreation) node).resolveConstructorBinding();
			anonymousSuperclassName = getUnreplacedJavaClassNameSuperNoBrackets(binding);
			if (anonymousSuperclassName != null)
				innerSuperClass = binding.getSuperclass();
			constructorDeclaration = (constructorBinding == null || anonymousSuperclassName == null ? null
					: constructorBinding.getMethodDeclaration());
			// force direct .$init$() call rather than .c$()
			// only if the anonymous instance is for an interface
			anonName = (constructorDeclaration == null ? javaInnerClassName : null);
		} else {
			// force .$init$() call rather than .c$() for lambda classes
			anonName = getMyJavaClassNameLambda(true);
			lambdaCount--;
			constructorDeclaration = null;
			anonymousSuperclassName = null;
		}

		String oldKey = package_outerFinalKey;
		String oldCurrent = package_currentFinalKey;
		package_outerFinalKey = package_currentFinalKey;
		package_currentFinalKey = (anonName == null ? binding.getKey() : anonName);
		// key is placement of this
		if (localType != REALLY_LOCAL_CLASS) {
			// lambda and anonymous classes are defined inline.

			isStatic = addInnerDeclaration(anonymousClassDeclaration == null ? node : anonymousClassDeclaration,
					binding, lambdaType, false, null, anonName);
		}

		int oldLocalType = class_localType;
		class_localType = localType;
		addInnerTypeInstance(node, binding, innerSuperClass, javaInnerClassName, null, constructorDeclaration,
				anonymousSuperclassName, anonName);
		package_outerFinalKey = oldKey;
		package_currentFinalKey = oldCurrent;
		class_localType = oldLocalType;
		if (lambdaType != LAMBDA_METHOD && localType != REALLY_LOCAL_CLASS) {
			buffer.append(")"); // end of line (..., ...)
		}
		if (!isStatic || anonName == null)
			return null;
		Set<IVariableBinding> set = package_htClassKeyToVisitedFinalVars.get(anonName);
		boolean canBeReused = (set == null || set.isEmpty() && b$count == b$count0);
		return (canBeReused ? anonName : null);
	}

	/**
	 * Add the class declaration for inner, local, and lambda classes.
	 * 
	 * @param node
	 * @param declaration
	 * @param binding
	 * @param lambdaType
	 * @param isTrulyLocal     not anonymous and not lambda -- private to a method
	 * @param bodyDeclarations
	 */
	private boolean addInnerDeclaration(ASTNode node, ITypeBinding binding, int lambdaType, boolean isTrulyLocal,
			List<?> bodyDeclarations, String anonName) {

		boolean isStatic = true;
		boolean wasAnonymous = class_isAnonymousOrLocal;
		String key = (anonName == null ? binding.getKey() : anonName);
		class_isAnonymousOrLocal = true;

		Set<IVariableBinding> lastVisitedVars = class_visitedFinalVars;
		Set<IVariableBinding> myVisitedVars = class_visitedFinalVars = new HashSet<>();
		this.package_currentFinalKey = key;
		package_htClassKeyToVisitedFinalVars.put(key, myVisitedVars);
		if (lambdaType != NOT_LAMBDA) {
			isStatic = addClassOrInterface(node, binding, null, 'm', false);
			if (lambdaType == LAMBDA_METHOD)
				buffer.append("); return ");
			else
				buffer.append(", ");
		} else if (isTrulyLocal) {
			// This is the second pass (class already defined) for a class
			// defined within a method.
			this.package_currentFinalKey = key = class_fullName;
			package_htClassKeyToVisitedFinalVars.put(class_fullName, myVisitedVars);
			addClassOrInterface(node, binding, bodyDeclarations, 'l', false);
		} else {
			buffer.append("(");
			ITypeBinding superclass = binding.getSuperclass();
			if (superclass != null) {
				// anonymous subclass of local must get visited finals for local superclass.
				// This was a critical find.
				Set<IVariableBinding> superfinals = (superclass.isLocal()
						? package_htClassKeyToVisitedFinalVars.get(superclass.getKey())
						: null);
				if (superfinals != null)
					myVisitedVars.addAll(superfinals);
			}
			addClassOrInterface(node, binding, ((AnonymousClassDeclaration) node).bodyDeclarations(), 'a', false);
			buffer.append(", ");
		}
		class_visitedFinalVars = lastVisitedVars;
		class_isAnonymousOrLocal = wasAnonymous;
		return isStatic;
	}

	/**
	 * Generated final variable list for anonymous class creation. Update the
	 * lastVisitedVars list
	 * 
	 * @param visitedVars          the list of all variables that have been visited
	 *                             as final for this class or any of its inner
	 *                             classes
	 * @param allowFinalsInListing allow this.$final$ for values in the array
	 *                             listing that is passed to Clazz.new_; will be
	 *                             false for lambda expressions
	 * @return
	 */
	private String listFinalVariables(Set<IVariableBinding> visitedVars, String key) {
		if (visitedVars == null || visitedVars.size() == 0)
			return null;
		StringBuffer buf = new StringBuffer();
		int n = 0;
		buf.append("{");
		for (Iterator<IVariableBinding> iter = visitedVars.iterator(); iter.hasNext();) {
			IVariableBinding v = iter.next();
			if (n++ > 0)
				buf.append(',');
			String j2sName = package_htFinalVarToJ2sName.get(v);
			boolean isFinal = key != null && (meth_current != v.getDeclaringMethod());
			if (isFinal && key != null) {
				this.package_htClassKeyToVisitedFinalVars.get(package_outerFinalKey).add(v);
			}
			buf.append(j2sName).append(':').append(isFinal ? "this.$finals$." : "").append(j2sName);
		}
		buf.append("}");
		return buf.toString();
	}

	public boolean visit(ConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		List<?> arguments = node.arguments();
		buffer.append(getFinalMethodNameWith$Params("C$.c$", constructorBinding, null, false, METHOD_NOTSPECIAL))
				.append(".apply(this");
		IMethodBinding methodDeclaration = (constructorBinding == null ? null
				: constructorBinding.getMethodDeclaration());
		addMethodParameterList(arguments, methodDeclaration, ", [", "]", METHOD_CONSTRUCTOR);
		buffer.append(");\n");
		return false;
	}

	public boolean visit(ContinueStatement node) {
		buffer.append("continue");
		addLabel(node.getLabel(), false);
		return false;
	}

	/**
	 * break foo; continue foo; foo: for/while/do
	 * 
	 * $var: ....
	 * 
	 * @param label
	 * @param isDefining
	 */
	private void addLabel(SimpleName label, boolean isDefining) {
		if (label != null) {
			buffer.append(' ');
			buffer.append(NameMapper.getJavaScriptCollisionIdentifier(label.getIdentifier(), true));
		}
		buffer.append(isDefining ? " : " : ";\n");
	}

	public boolean visit(DoStatement node) {
		buffer.append("do ");
		node.getBody().accept(this);
		buffer.append(" while (");
		node.getExpression().accept(this);
		buffer.append(");\n");
		return false;
	}

	public boolean visit(EmptyStatement node) {
		buffer.append(";");
		return false;
	}

	public boolean visit(EnhancedForStatement node) {
		// for (Integer v : ...)
		SimpleName name = node.getParameter().getName();
		ITypeBinding vtype = name.resolveTypeBinding();
		buffer.append("for (" + varOrLet);
		String varName = acceptPossiblyFinalVar(name);
		appendReplaceV(", $V = ", "V", varName, null, null);
		Expression exp = node.getExpression();
		ITypeBinding eType = exp.resolveTypeBinding();
		ITypeBinding arrayType = eType.getComponentType();

		if (arrayType == null) {
			exp.accept(this);
			appendReplaceV(".iterator$(); $V.hasNext$()&&((V=", "V", varName, null, null);
			appendReplaceV("($V.next$())", "V", varName, vtype, eType);
			appendReplaceV("),1);", "V", varName, null, null);
		} else {
			appendReplaceV("0, $$V = ", "V", varName, null, null);
			exp.accept(this);
			appendReplaceV("; $V<$$V.length&&((V=", "V", varName, null, null);
			appendReplaceV("($$V[$V])", "V", varName, vtype, arrayType);
			appendReplaceV("),1);$V++", "V", varName, null, null);
		}
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\n");
		return false;
	}

	/**
	 * For enhanced FOR only.
	 * 
	 * allow for primitive boxing or unboxing. See test.Test_Chars.java
	 * 
	 * @param template
	 * @param v
	 * @param varName
	 * @param vType
	 * @param eType
	 */
	private void appendReplaceV(String template, String v, String varName, ITypeBinding vType, ITypeBinding eType) {
		String s = template.replace(v, varName);
		if (vType != eType) {
			if (vType.isPrimitive()) {
				if (eType.isPrimitive()) {
					// this is a conversion of an char[] to an int -- the only
					// possibility allowed, I think
					s += CHARCODEAT0;
				} else {
					// So we know the expression is boxed -- Character, for
					// example
					// Character does not use .objectValue, but we implement it
					// here
					if (vType.getName().equals("int"))
						s += ".intValue$()";
					else
						s += ".objectValue$()";
				}
			} else if (eType.isPrimitive()) {
				// So we know the expression is unboxed -- char, for example
				s = "new " + NameMapper.getPrimitiveTYPE(eType.getName()) + s;
			}
		}
		buffer.append(s);
	}

	public boolean visit(EnumConstantDeclaration node) {
		// see addEnumConstants
		return false;
	}

	public boolean visit(EnumDeclaration node) {
		setPackage(null);
		addClassOrInterface(node, node.resolveBinding(), node.bodyDeclarations(), 'e', false);
		return false;
	}

	public boolean visit(ExpressionStatement node) {
		// System.out.println("ES " + node);
		// parent of Assignment, Pre/PostfixExpression
		// ES d=Long.valueOf(l).doubleValue();
		// ES l=0;
		// ES d=3.45;
		// ES l+=d;
		// ES ii+=3.45;
		// ES l=Integer.valueOf(123).longValue();
		// ES d=(long)3.8;
		return true;
	}

	public void endVisit(ExpressionStatement node) {
		buffer.append(";\n");
	}

	@SuppressWarnings("unchecked")
	public boolean visit(ForStatement node) {

		buffer.append("for (");
		visitList(node.initializers(), ", ");
		buffer.append("; ");
		Expression expression = node.getExpression();
		if (expression != null) {
			expression.accept(this);
		}
		buffer.append("; ");
		visitList(node.updaters(), ", ");
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\n");
		return false;
	}

	public boolean visit(IfStatement node) {
		buffer.append("if (");
		appendBoxingNode(node.getExpression(), false, null, false, false);
		buffer.append(") ");
		node.getThenStatement().accept(this);
		Statement ifElse = node.getElseStatement();
		if (ifElse != null) {
			buffer.append(" else ");
			ifElse.accept(this);
		}
		return false;
	}

	/**
	 * {....}
	 * 
	 */
	public boolean visit(Initializer node) {
		// handled by addClassOrInterface
		return false;
	}

	/**
	 * out: while/for/do...
	 * 
	 */
	public boolean visit(LabeledStatement node) {
		addLabel(node.getLabel(), true);
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(MethodDeclaration node) {
		// handled in addClassorInterface
		return false;
	}

	private final static int METHOD_$_QUALIFIED = 1;
	private final static int METHOD_UNQUALIFIED = 2;
	private final static int METHOD_FULLY_QUALIFIED = 4;
	private final static int METHOD_FULLY_QUALIFIED_JUST_ONE = 8 + 4;
	private static final int METHOD_ADD_GENERIC = 16;

	private static final String varOrLet = "var ";

	private static final long JAVASCRIPT_MAX_LONG = 0x1FFFFFFFFFFFFFL;

	/**
	 * Called by visit(MethodDeclaration) as well as addLambdaMethod().
	 * 
	 * @param mnode will be null for a lambda method or expression
	 * @param mBinding
	 * @param parameters
	 * @param body
	 * @param isConstructor
	 * @param abstractMethodList to fill if not constructor, static, private,
	 *                           abstract or lambda method or parameterless
	 * @param lambdaType
	 * @param exportNames
	 */
	@SuppressWarnings("null")
	private void processMethodDeclaration(MethodDeclaration mnode, IMethodBinding mBinding, List<ASTNode> parameters,
			ASTNode body, boolean isConstructor, List<IMethodBinding> abstractMethodList, int lambdaType,
			HashMap<String, String> exportNames, boolean exportAll) {

		boolean isAsync = (mnode != null && NativeDoc.hasJ2STag(mnode.getJavadoc(), "@j2sAsync"));

		int mods = mBinding.getModifiers();
		ITypeBinding mClass = mBinding.getDeclaringClass();

		boolean isNative = Modifier.isNative(mods);
		boolean isPublic = Modifier.isPublic(mods);
		boolean isPrivate = !isPublic && !isConstructor && isPrivate(mBinding);
		boolean isStatic = isStatic(mBinding);
		boolean isAbstract = (body == null && !isNative && lambdaType == NOT_LAMBDA);
		boolean addGeneric = (!isPrivate && !isConstructor && isSynthesizable(mBinding));
		int qualification = METHOD_FULLY_QUALIFIED;

		if (isUserApplet && lambdaType == NOT_LAMBDA && !isConstructor && !isStatic && isPublic)
			qualification |= METHOD_UNQUALIFIED;

		if (addGeneric) {
			qualification |= METHOD_ADD_GENERIC;
			if (isAbstract && abstractMethodList != null) {
				abstractMethodList.add(mBinding);
			}
		}
		if (isAbstract) {
			// allows us to catalog method names for an interface or abstract class
			return;
		}
		// An alias is an added name that serves as another option
		// for the method. For example, just "suppressHydrogens" rather than
		// "suppressHydrogens$org_openscience_cdk_interfaces_IAtomContainer"
		// This is particularly useful for classes that are expected to be called
		// directly by JavaScript. 
		String alias = (mnode == null ? null : getJ2SAliasName(mnode));
		if (exportAll && isPublic && mnode != null && alias == null) {
			alias = "";
		}
		String quotedFinalNameOrArray = getMethodNameWithSyntheticBridgeForDeclaration(mBinding, isConstructor,
				qualification, lambdaType, alias, exportNames, exportAll);
		boolean isMain = (isStatic && isPublic && mBinding.getName().equals("main")
				&& mBinding.getKey().indexOf(";.main([Ljava/lang/String;)V") >= 0);
		if (isMain) {
			log(">>>main found for " + class_fullName);
			addApplication();
		}
		if (!isPrivate)
			logMethodDeclared(quotedFinalNameOrArray);
		if (isConstructor && (quotedFinalNameOrArray.equals("'c$'")
				|| mBinding.isVarargs() && mBinding.getParameterTypes().length == 1))
			class_haveDefaultConstructor = true; // in case we are not qualifying
		// names here
		if (isAsync)
			log("J2S async function " + mBinding.getDeclaringClass().getBinaryName() + "." + quotedFinalNameOrArray);
		buffer.append("\nClazz.newMeth(C$, ").append(quotedFinalNameOrArray)
				.append(", " + (isAsync ? "async" : "") + " function (");

		IMethodBinding prevMethod = meth_current;
		meth_current = mBinding;

		if (parameters == null)
			// lambda method
			buffer.append(getLambdaParamList(mBinding, -1));
		else
			visitList(parameters, ", ");

		buffer.append(") ");
		if (lambdaType != NOT_LAMBDA) {
			addLambdaBody(body, mBinding.getReturnType());
			if (body == null)
				return;
		} else if (isConstructor) {
			@SuppressWarnings("unchecked")
			List<ASTNode> statements = ((Block) body).statements();
			ASTNode firstStatement;
			if (statements.size() == 0 || !((firstStatement = statements.get(0)) instanceof SuperConstructorInvocation)
					&& !(firstStatement instanceof ConstructorInvocation)) {
				buffer.append("{\n");
				String superclassName = getUnreplacedJavaClassNameSuperNoBrackets(mClass);
				if (superclassName == null) {
					addCallInit();
				} else {
					addSuperConstructor(null, null);
				}
				visitList(statements, "");
				endVisit((Block) body);
			} else {
				body.accept(this);
			}
		} else if (body == null) {
			// not a constructor and no body -- native
			buffer.append("{\n");
			if (isNative) {
				buffer.append("alert('native method must be replaced! " + mBinding.getName() + "');\n");
				log("native: " + mBinding.getName());
			}
			buffer.append("}\n");
		} else {
			body.accept(this);
		}
		meth_current = prevMethod;
		if (isStatic || isConstructor) {
			buffer.append(", ").append(isNative ? 2 : 1);
			if (isNative) {
				ITypeBinding ret = mBinding.getReturnType();
				buffer.append(", \"" + getUnreplacedJavaClassNameQualified(ret) + "\"");
			}
		} else if (isPrivate) {
			buffer.append(", " + getPrivateVar(mClass, false));
		}
		buffer.append(");\n");

	}

	private boolean isSynthesizable(IMethodBinding mBinding) {
		ITypeBinding[] types = mBinding.getParameterTypes();
		for (int i = types.length; --i >= 0;) {
			ITypeBinding type = types[i];
			if (type.isArray() || !type.isPrimitive() && !type.getQualifiedName().equals("java.lang.Object"))// &&
																												// !type.isTypeVariable())
				return true;
		}
		return false;
	}

	/**
	 * Accept the SimpleName to add it to the buffer, and to get its final form.
	 * Then create a package_finalVars entry for this name if it is final or
	 * effectively final.
	 * 
	 * @param name
	 * @return the final form of the name
	 */
	private String acceptPossiblyFinalVar(SimpleName name) {
		int pt = buffer.length();
		name.accept(this);
		return buffer.substring(pt);
	}

	private static boolean isFinalOrEffectivelyFinal(IBinding binding) {
		return Modifier.isFinal(binding.getModifiers())
				|| binding instanceof IVariableBinding && ((IVariableBinding) binding).isEffectivelyFinal();
	}

	public boolean visit(MethodInvocation node) {
		addMethodInvocation(node.getName(), node.arguments(), node.resolveMethodBinding(), node.getExpression(), -1);
		return false;
	}

	/**
	 * Called by visit(MethodDeclaration) as well as addLambdaMethod().
	 * 
	 * @param javaQualifier
	 * @param arguments
	 * @param mBinding
	 * @param expression
	 * @param lambdaArity
	 */
	private boolean addMethodInvocation(SimpleName javaQualifier, List<?> arguments, IMethodBinding mBinding,
			Expression expression, int lambdaArity) {
		if (javaQualifier == null) {
			// not possible?
			dumpStack("addMethodInvocation null simpleJavaName " + mBinding + " " + expression + " " + lambdaArity);
		}
		String methodName = mBinding.getName();
		ITypeBinding declaringClass = mBinding.getDeclaringClass();
		boolean isAsyncSleep = allowAsyncThread() && declaringClass.getName().equals("java.lang.Thread")
				&& methodName.equals("sleep");
		boolean isStatic = isStatic(mBinding);
		boolean isPrivate = isPrivate(mBinding);
		boolean isPrivateAndNotStatic = isPrivate && !isStatic;
		String privateVar = (isPrivateAndNotStatic ? getPrivateVar(declaringClass, false) : null);
		boolean doLogMethodCalled = (!isPrivate && global_htMethodsCalled != null);
		boolean needBname = (!isStatic && (lambdaArity < 0
				&& (expression == null
						? !areEqual(declaringClass, class_typeBinding)
								&& !class_typeBinding.isAssignmentCompatible(declaringClass)
						: expression instanceof ThisExpression && ((ThisExpression) expression).getQualifier() != null)
				|| class_localType == LAMBDA_EXPRESSION));

		String bname = (needBname ? getThisRefOrSyntheticReference(javaQualifier, declaringClass, null) : null);
		// add the qualifier
		int pt = buffer.length();
		String declaringClassJavaClassName = getUnreplacedJavaClassNameQualified(declaringClass);

		if (isPrivateAndNotStatic) {
			// note that the following expression will not work if the method is private:
			// (b ? classA : classB).method()
			// because we don't know at compile time which class is being run.
			buffer.append(privateVar).append(".");
		} else if (lambdaArity >= 0) {
			doLogMethodCalled = false;
		} else if (expression == null) {
			doLogMethodCalled = false;
			if (bname != null) {
				buffer.append(bname).append(".");
			} else if (!isStatic) {
				buffer.append("this.");
			} else if (isMyClass(declaringClass.getQualifiedName())) {
				buffer.append("C$.");
			} else if (isAsyncSleep) {
				buffer.append("await Clazz.Thread.");
			} else {
				buffer.append(getFinalClazzLoadI$Reference(declaringClass, null, true, false)).append(".");

			}
		} else {
			appendFinalMethodQualifier(expression, declaringClass, bname,
					(isStatic && !isPrivate ? FINAL_ESCAPECACHE : FINAL_CACHE) | (isStatic ? FINAL_STATIC : 0));
			buffer.append(".");
		}
		int ptlog = buffer.length() - 1;

		// check for special Clazz.array or Clazz.forName
		// as well as special treatment for String.indexOf and String.lastIndexOf

		boolean isSpecialMethod = false;
		boolean isIndexOf = false;
		if (lambdaArity < 0 && !isPrivateAndNotStatic) {
			String j2sName = NameMapper.getJ2SFinalMapClazzMethod(declaringClassJavaClassName, methodName);
			if (j2sName != null) {
				isSpecialMethod = true;
				// overwrite qualifier
				buffer.setLength(pt);
				buffer.append(j2sName);
				doLogMethodCalled = false;
				bname = null;
			} else if (declaringClassJavaClassName.equals("java.lang.String")
					&& (methodName.equals("indexOf") || methodName.equals("lastIndexOf"))) {
				// indicate to boxer method to use method "q" not "p" here.
				// This allows characters to be left as strings in String.indexOf$I and
				// String.lastIndexOf$I for faster processing.
				isIndexOf = true;
			}
		}

		// have xxxx.,though not for C$ or import static

		// now get the method name

		// record whether this.b$[.....] was used, and if so and it is private,
		// we need to use it again
		String term = ")";
		if (!isSpecialMethod) {
			// TODO: for now we are just returning name$ for all lambda methods
			// note that simpleNameInMethodBinding can return C$.xxxx
			String j2sName = getFinalDotQualifiedNameForMethod(javaQualifier, mBinding, METHOD_ISQUALIFIED);

			String finalMethodNameWith$Params = getFinalMethodNameWith$Params(j2sName, mBinding, null, true,
					METHOD_NOTSPECIAL);

			if (lambdaArity >= 0) {
				// The problem here is that we cannot apply a method from an interface
				// because those methods are not present in JavaScript.
				// Otherwise we would use $$.prototype here. The assumption
				// in using "t.apply" is that t must be non-null.
				// if this does not work, then we can go to ($$.prototype || t)
				//
				boolean classIsTarget = (class_localType == LAMBDA_WRAPPED && ((isStatic
						|| expression instanceof ClassInstanceCreation || isVariableBinding(expression)
						|| expression instanceof ThisExpression
						|| "java.lang.Class".equals(removeBracketsAndFixNullPackageName(declaringClassJavaClassName)) // String.class::cast
				) // BH Added 2019.05.13
						&& lambdaArity == mBinding.getParameterTypes().length));
				String opening = (!classIsTarget ? "t." : isPrivate ? "" : "$$.") + finalMethodNameWith$Params
						+ ".apply(" + (isStatic ? "null" : classIsTarget ? "$$" : "t") + ",[";
				buffer.append(opening);
				buffer.append(getLambdaParamList(mBinding, lambdaArity));
				buffer.append("])");
				return isStatic;
			}
			if (finalMethodNameWith$Params.indexOf('|') >= 0) {
				// cover multiple parameter options to cover older versions of java
				// foo.xx$T$K || $o$.xx$O$O --> ($o$=foo).($o$.xx$T$K ||
				// $o$.xx$O$O)
				doLogMethodCalled = false;
				postFixGeneric$OMethodName(pt, finalMethodNameWith$Params, isPrivateAndNotStatic, privateVar);
				term = "])";
			} else {
				// standard call
				buffer.append(finalMethodNameWith$Params);
			}

			if (doLogMethodCalled) {
				String name = declaringClassJavaClassName + buffer.substring(ptlog);
				logMethodCalled(name);
			}
			if (isPrivateAndNotStatic || bname != null) {
				// A call to a nonprivate outer-class method from an inner class
				// requires using apply on the object, which is either
				// this or this.b$["....."]
				//
				// all private calls are made to var p$x

				buffer.append(".apply(");
				appendFinalMethodQualifier(expression, declaringClass, bname, FINAL_CACHE);
				buffer.append(", [");
				term = "])";
			}
		}
		int pt1 = buffer.length();
		if (term == ")")
			buffer.append("(");
		addMethodParameterList(arguments, mBinding, null, null, isIndexOf ? METHOD_INDEXOF : METHOD_NOTSPECIAL);
		if (isStatic && lambdaArity < 0 && term == ")") {
			checkStaticParams2(pt, pt1, false);
		}
		buffer.append(term);
		return true;
	}

	private boolean isMyClass(String name) {
		return (name + "<").startsWith(class_fullNameBra);
	}

	/**
	 * Write the method expression to the buffer. If the qualifier is a variable,
	 * such as System.out, or an expression, such as (useF? f : g), then we can
	 * simply accept it. Othewise we need to qualify it.
	 * 
	 * @param qualifier      null for "this" or outer-class reference;
	 * 
	 * @param declaringClass
	 * @param bname
	 * @param flags          FINAL_LAMBDA | FINAL_ESCAPE | FINAL_CACHE
	 */
	private void appendFinalMethodQualifier(Expression qualifier, ITypeBinding declaringClass, String bname,
			int flags) {
		if (qualifier == null) {
			if ((flags & FINAL_LAMBDA) != 0) {
				buffer.append(getFinalJ2SClassNameQualifier(null, declaringClass, null, flags));
			} else {
				buffer.append(bname == null ? "this" : bname);
			}
		} else if (qualifier instanceof Name && !isVariableBinding(qualifier)) {
			buffer.append(getFinalJ2SClassNameQualifier((Name) qualifier, declaringClass, null, flags));
		} else if ((flags & FINAL_STATIC) != 0) {
			// ensure even if field.method(), as long as method is static, we use
			// Class.method()
			// otherwise a null value for field will throw an exception.
			buffer.append(getFinalJ2SClassNameQualifier(null, declaringClass, null, flags));
		} else {
			// xxxx.field.foo() -- but only if foo is not static
			// (x ? y : z).foo()
			// xxx.this.foo()
			qualifier.accept(this);
		}
	}

	private static boolean isVariableBinding(Expression qualifier) {
		return qualifier instanceof Name && ((Name) qualifier).resolveBinding() instanceof IVariableBinding;
	}

	public boolean visit(ReturnStatement node) {
		buffer.append("return");
		Expression expression = node.getExpression();
		if (expression != null) {
			buffer.append(' ');

			ASTNode parent = node.getParent();
			while (parent != null && !(parent instanceof MethodDeclaration)) {
				parent = parent.getParent();
			}
			IMethodBinding mBinding = (parent == null ? null : ((MethodDeclaration) parent).resolveBinding());
			ITypeBinding retType = (mBinding == null ? null : mBinding.getReturnType());
			addExpressionAsTargetType(expression, retType, "r", null);
		}
		buffer.append(";\n");
		return false;
	}

	/**
	 * method parameters or catch variables
	 */
	public boolean visit(SingleVariableDeclaration node) {
		acceptPossiblyFinalVar(node.getName());
		return false;
	}

	public boolean visit(SuperConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		if (constructorBinding != null && !isObjectOrNull(constructorBinding.getDeclaringClass())) {
			addSuperConstructor(node, constructorBinding.getMethodDeclaration());
		} else {
			addCallInit();
		}
		return false;
	}

	public boolean visit(SuperMethodInvocation node) {
		boolean isQualified = (node.getQualifier() != null);// for this.: && class_localType != LAMBDA_EXPRESSION) {
		IMethodBinding mBinding = node.resolveMethodBinding();
		String finalMethodNameWith$Params = getFinalMethodNameWith$Params(null, mBinding, null, false,
				METHOD_NOTSPECIAL);
		// BH if this is a call to super.clone() and there is no superclass, or
		// the superclass is Object,
		// then we need to invoke Clazz.clone(this) directly instead of calling
		// C$.superclazz.clone()
		if ("clone$".equals(finalMethodNameWith$Params) && mBinding.getDeclaringClass().getSuperclass() == null) {
			buffer.append("Clazz.clone(this)");
			return false;
		}
		String myThis = "this";

		if (isQualified) {
			node.getQualifier().accept(this);
			if (class_isAnonymousOrLocal) {
				myThis = getSyntheticReference(mBinding.getDeclaringClass().getQualifiedName());
			}
		} else {
			buffer.append("C$");
		}
		buffer.append(".superclazz.prototype." + finalMethodNameWith$Params + ".apply(" + myThis + ", [");
		addMethodParameterList(node.arguments(), mBinding, null, null, METHOD_NOTSPECIAL);
		buffer.append("])");

		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(SwitchStatement node) {
		buffer.append("switch (");
		addNonCharacter(node.getExpression());
		buffer.append(") {\n");
		visitList(node.statements(), "");
		buffer.append("}\n");
		return false;
	}

	public boolean visit(SwitchCase node) {
		if (node.isDefault()) {
			buffer.append("default");
		} else {
			buffer.append("case ");
			addNonCharacter(node.getExpression());
		}
		buffer.append(":\n");
		return false;
	}

	public boolean visit(SynchronizedStatement node) {
		// we could wrap this with a simple if() statement,
		// checking that it is not null, but that seems to me
		// to be unnecessary. When would one ever intentionally
		// produce a null pointer exception from synchronized(...)?

		Expression e = node.getExpression();
		if (!(e instanceof Name || e instanceof TypeLiteral || e instanceof ThisExpression)) {
			buffer.append("/*sync " + e.getClass().getName() + "*/");
			// get actual JavaScript code
			int pt = buffer.length();
			e.accept(this);
			String expr = buffer.substring(pt, buffer.length());
			buffer.setLength(pt);
			// ignore (treeLock())
			if (!(e instanceof MethodInvocation && expr.indexOf(".getTreeLock()") >= 0)) {
				buffer.append("(");
				buffer.append(expr);
				buffer.append(");\n");
			}
		}
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(ThrowStatement node) {
		buffer.append("throw ");
		node.getExpression().accept(this);
		buffer.append(";\n");
		return false;
	}

	@SuppressWarnings({ "unchecked", "null" })
	public boolean visit(TryStatement node) {
		List<CatchClause> catchClauses = node.catchClauses();
		int nCatch = catchClauses.size();
		Block finallyBlock = node.getFinally();
		List<ASTNode> resources = node.resources();

		// try(resourceDefs) {
		// block code
		// } optional catch/finally{}
		// same as
		//
		// try { resourceDefs;
		// try {
		// block code
		// } finally {resourceDefs.close();}
		// } nonOptional catch/finally{}

		// same rules apply in terms of catch

		// Returns the live ordered list of resources for this try statement (added in
		// JLS4 API).
		// [ooh...JSL9 change...]
		// A resource is either a VariableDeclarationExpression or (since JLS9) a Name.
		int pt = -1;
		boolean haveResources = (resources != null && resources.size() > 0);
		boolean haveCatchOrFinal = (nCatch > 0 || finallyBlock != null);
		String closing = "";
		if (haveResources) {
			buffer.append("try {\n");
			for (int i = 0; i < resources.size(); i++) {
				ASTNode resource = resources.get(i);
				pt = buffer.length();
				resource.accept(this);
				buffer.append(";\n");
				closing = getResourceClosing(pt) + closing;
			}
		}
		buffer.append("try ");
		node.getBody().accept(this);
		if (haveResources) {
			pt = buffer.lastIndexOf("}");
			buffer.setLength(pt);
			buffer.append("\n}finally{/*res*/").append(closing).append("}\n}");
		}
		if (nCatch > 0) {
			String catchEName = "e$$";
			if (nCatch == 1) {
				CatchClause element = catchClauses.get(0);
				SimpleName exName = element.getException().getName();
				catchEName = exName.getIdentifier();
			}
			buffer.append(" catch (" + catchEName + ") ");
			boolean scopeAdded = false;
			boolean endedWithThrowable = false;
			for (Iterator<CatchClause> iter = catchClauses.iterator(); iter.hasNext();) {
				CatchClause element = iter.next();
				List<Type> types;
				Type type = element.getException().getType();
				if (type instanceof UnionType) {
					types = ((UnionType) type).types();
				} else {
					(types = new ArrayList<Type>()).add(type);
				}
				boolean haveType = false;
				for (int j = 0; j < types.size(); j++) {
					type = types.get(j);
					if ("java.lang.Throwable".equals(type.resolveBinding().getQualifiedName())) {
						endedWithThrowable = true;
					} else {
						if (!scopeAdded) {
							buffer.append("{\n");
							scopeAdded = true;
						}
						buffer.append(haveType ? " || " : "if (");
						buffer.append("Clazz.exceptionOf(" + catchEName + ",\"");
						buffer.append(getFinalJ2SClassName(getClassJavaNameForType(type), FINAL_RAW));
						buffer.append("\")");
						haveType = true;
					}
				}
				if (haveType)
					buffer.append(")");
				SimpleName exName = element.getException().getName();
				String eName = exName.getIdentifier();
				boolean notEName = false;
				if (!catchEName.equals(eName)) {
					buffer.append("{\nvar " + eName + " = " + catchEName + ";\n");
					notEName = true;
				}
				element.getBody().accept(this);
				if (notEName) {
					buffer.append("\n}");
				}
				if (iter.hasNext()) {
					buffer.append(" else ");
				}
			}
			if (!endedWithThrowable) {
				buffer.append(" else {\nthrow " + catchEName + ";\n}");
			}
			if (scopeAdded) {
				buffer.append("\n}");
			}
		}
		if (finallyBlock != null) {
			buffer.append(" finally ");
			finallyBlock.accept(this);
		} else if (!haveCatchOrFinal) {
			buffer.append("finally{}");
		}
		buffer.append("\n");
		return false;
	}

	private String getResourceClosing(int pt) {
		String name = buffer.substring(pt);
		// Java 9 try(res) or Java 8 try(OutputStream os = ....)
		if ((pt = name.indexOf("=")) >= 0 || (pt = name.indexOf(";")) >= 0) {
			name = name.substring(0, pt);
		}
		if (name.startsWith(varOrLet))
			name = name.substring(4);
		return name + "&&" + name + ".close$&&" + name + ".close$();";
	}

	/**
	 * A class or interface is being declared.
	 * 
	 * 
	 */
	public boolean visit(TypeDeclaration node) {
		setPackage(null);
		// anonymous will never come through here. It will be routed directly to
		// addClassOrInterface
		boolean doExport = (NativeDoc.hasJ2STag(node.getJavadoc(), "@j2sExport"));
		List<?> declarations = node.bodyDeclarations();
		ITypeBinding binding = node.resolveBinding();
		addClassOrInterface(node, binding, declarations,
				node.isInterface() ? 'i' : node.isLocalTypeDeclaration() ? 'l' : 'c', doExport);
		return false;
	}

	/**
	 * <pre>
	 * VariableDeclarationStatement:
	 *    { ExtendedModifier } Type VariableDeclarationFragment
	 *        { <b>,</b> VariableDeclarationFragment } <b>;</b>
	 * </pre>
	 */
	public boolean visit(VariableDeclarationStatement node) {

		@SuppressWarnings("unchecked")
		List<ASTNode> fragments = node.fragments();
		for (Iterator<ASTNode> iter = fragments.iterator(); iter.hasNext();) {
			buffer.append(varOrLet);
			VariableDeclarationFragment next = (VariableDeclarationFragment) iter.next();
			next.accept(this);
			buffer.append(";\n");
		}
		return false;
	}

	public boolean visit(WhileStatement node) {

		buffer.append("while (");
		node.getExpression().accept(this);
		buffer.append(")");
		node.getBody().accept(this);
		buffer.append("\n");
		return false;
	}

	////////// END visit/endVisit ///////////

	private void addAnonymousFunctionWrapper(boolean isOpen) {
		buffer.append(
				isOpen ? (buffer.lastIndexOf(")") >= buffer.length() - 3 ? ";" : "") + "\n(function(){" : "})()\n");
	}

	/**
	 * The call to C$.$init$ from a constructor is made in two cases:
	 * 
	 * a) as the second statement in a constfsructor, when the first line is a
	 * super(...) call
	 * 
	 * b) as the first statement in a constructor that does not call super(...) or
	 * this(...) (because the superclass is Object)
	 * 
	 * Note that it is not called when the first statement is this(...).
	 * 
	 */
	private void addCallInit() {
		buffer.append(";C$.$init$.apply(this);\n");
	}

	private void appendClinit() {
		buffer.append("\nC$.$clinit$=2;\n");
	}

	/**
	 * Add Clazz.newInterface(...) or Clazz.newClass(...) for all classes and
	 * interfaces, including Enum and anonymous.
	 * 
	 * If this is an inner class, then iterate, just adding its definition to the
	 * current staticBuffer;
	 * 
	 * @param node
	 * @param binding
	 * @param type             'a' (anonymous class), 'e' (Enum), 'i' (Interface),
	 *                         'l' (local), 'm' (LambdaExpression), '@'
	 *                         (_at_interface AnnotationType), or 'c' (standard
	 *                         class)
	 * @param exportAll         if true, all public methods will get unqualified names followed by enough "$" to make them unique.
	 * @param BodyDeclarations
	 * @return localName
	 */
	@SuppressWarnings({ "null", "unchecked" })
	private boolean addClassOrInterface(ASTNode node, ITypeBinding binding, List<?> bodyDeclarations, char type,
			boolean exportAll) {
		if (binding == null)
			return false;
		ASTNode parent = node.getParent();
		boolean isEnum = (type == 'e');
		boolean isInterface = (type == 'i');
		boolean isAnnotation = (type == '@');
		boolean isTrulyLocal = (type == 'l');
		boolean isLambda = (type == 'm');
		boolean isAnonymous = (type == 'a' || isLambda);
		boolean isClass = (type == 'c');
		boolean isTopLevel = (!isLambda && binding.isTopLevel());
		boolean isAbstract = ((binding.getModifiers() & Modifier.ABSTRACT) != 0);

		if (!isTopLevel && !isAnonymous && node != innerNode) {
			// inner named class first pass only

			// includes EnumDeclaration

			// We use a temporary visitor to put the code
			// into a temporary buffer, produce the code in the
			// temporary visitor, append it to our TrailingBuffer,
			// and return.

			// get the visitor

			Java2ScriptVisitor tempVisitor = null;
			try {
				tempVisitor = getClass().newInstance().setProject(global_project, global_testing).setInnerGlobals(this,
						node);
			} catch (@SuppressWarnings("unused") Exception e) {
				// impossible
			}

			// set its className and binding

			String className;
			if (parent instanceof TypeDeclarationStatement) {
				String anonClassName = removeBrackets(getUnreplacedJavaClassNameQualified(binding));
				className = anonClassName.substring(anonClassName.lastIndexOf('.') + 1);
				// note - this className is NOT QUALIFIED
			} else {
				className = class_shortName + "." + binding.getName();
			}
			tempVisitor.setClassAndBinding(className, binding);

			// generate the code

			if (isTrulyLocal) {
				tempVisitor.addInnerDeclaration(node, binding, NOT_LAMBDA, true, bodyDeclarations, null);
			} else {
				tempVisitor.addClassOrInterface(node, binding, bodyDeclarations, type, false);

			}
			// append it to our TrailingBuffer
			trailingBuffer.append(tempVisitor.buffer.toString());

			return false;
		}

		// set up key fields and local variables

		if (isTrulyLocal || isClass || isEnum) {
			checkAnnotations((BodyDeclaration) node, CHECK_ANNOTATIONS_ONLY);
		}
		ITypeBinding oldBinding = null;
		String oldShortClassName = null, this$0Name0 = null, finalShortClassName, finalPackageName;
		List<ClassAnnotation> oldAnnotations = null;
		List<IMethodBinding> abstractMethodList = (isInterface || isAbstract ? new ArrayList<IMethodBinding>() : null);
		if (isTopLevel) {
			String javaName = binding.getName();
			appendElementKey(javaName);
			setClassAndBinding(javaName, binding);
			if (isClass) {
				isUserApplet = checkAddApplet(binding);
			}
			if (isClass || isInterface) {
				if (NativeDoc.hasJ2STag(((TypeDeclaration) node).getJavadoc(), "@j2sNoLongExact"))
					setNoLongExact(true);
			}
		}
		if (isAnonymous) {
			oldShortClassName = class_shortName;
			oldBinding = class_typeBinding;
			oldAnnotations = class_annotations;
			class_annotations = null;
			// anonymous classes reference their package, not their outer class in
			// Clazz.newClass, so clazz.$this$0 is not assigned.
			this$0Name0 = this$0Name;
			this$0Name = null;
			finalShortClassName = getFinalJ2SClassName(
					(isLambda ? getMyJavaClassNameLambda(true) : getUnreplacedJavaClassNameQualified(binding)),
					FINAL_P);
			if (finalShortClassName.startsWith("P$.")) {
				// java.lang.x will return x, not P$.x
				finalShortClassName = finalShortClassName.substring(3);
			}
			setClassAndBinding(finalShortClassName, binding);
			if (isLambda) {
				buffer.append("(");

				// problem here 2019.12.07 cifbinary was that $$-wrapped lambda methods must NOT
				// be reused.

			}
			buffer.append("(");
			if (!isLambda || class_localType != LAMBDA_WRAPPED)
				buffer.append("P$." + finalShortClassName + "||");
			finalPackageName = "P$";
		} else {
			// Top or inner named classes are already set.
			// For inner classes, we are just loading up the temporary buffer.
			// The code will end up in the trailing buffer for the parent class.
			int pt1 = class_fullName.lastIndexOf('.');
			finalShortClassName = class_fullName.substring(pt1 + 1);
			finalPackageName = checkPackageP$Name(class_fullName.substring(0, pt1));
		}

		int lc = lambdaCount;

		// add the anonymous wrapper if needed

		if (!isTopLevel) {
			addAnonymousFunctionWrapper(true);
		}

		// begin the class or interface definition

		buffer.append("/*" + type
		// + "=" + class_typeBinding.getKey()
				+ "*/");
		buffer.append("var C$=" + (isInterface ? "Clazz.newInterface(" : "Clazz.newClass("));

		// arg1 is the package name
		// arg2 is the full class name in quotes
		// arg3 is the class definition function, C$, which is called in
		// Clazz.new_().
		// arg4 is the superclass
		// arg5 is the superinterface(s)
		// arg6 is the type: anonymous(1), local(2), or absent

		// Here we go...

		// arg1: package name or null
		// arg2: shortened class name in quotes

		buffer.append(finalPackageName + ", \"" + finalShortClassName + "\"");

		// set up func, superclass, and superInterface

		String func = "null";
		List<?> superInterfaceTypes = null;

		// arg3: class definition function, C$, or null to add the standard
		// function at run time

		boolean hasDependents = isEnum;
		buffer.append(", ");
		List<AbstractTypeDeclaration> innerClasses = new ArrayList<>();
		String innerTypes = "";
		if (isAnonymous) {
			if (!(parent instanceof EnumConstantDeclaration))
				func = "function(){Clazz.newInstance(this, arguments[0],1,C$);}";
			ITypeBinding[] declaredTypes = null;
			if (isLambda) {
				// we just have this one superinterface, which is the lambda binding itself
				declaredTypes = new ITypeBinding[] { binding };
			} else {
				declaredTypes = binding.getInterfaces();
			}
			if (declaredTypes != null && declaredTypes.length > 0) {
				List<ITypeBinding> types = new ArrayList<ITypeBinding>();
				ITypeBinding anonClassImplemented = declaredTypes[0];
				types.add(anonClassImplemented);
				superInterfaceTypes = types;
			}
		} else {
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				BodyDeclaration bd = (BodyDeclaration) iter.next();
				if (bd instanceof AbstractTypeDeclaration) {
					// TypeDeclaration || EnumDeclaration || AnnotationTypeDeclaration)
					ITypeBinding b = ((AbstractTypeDeclaration) bd).resolveBinding();
					String s = j2sNonPrimitiveName(b, false);
					innerTypes += ",['" + s.substring(s.lastIndexOf(".") + 1) + "'," + b.getModifiers() + "]";
					innerClasses.add((AbstractTypeDeclaration) bd);
				}
			}
			if (!isTopLevel || !innerClasses.isEmpty()) {
				func = null;
				buffer.append("function(){\n");

				// add all inner classes iteratively

				for (int i = 0; i < innerClasses.size(); i++)
					innerClasses.get(i).accept(this);

				// continue with Clazz.newClass...
				// add the Clazz.newInstance call, which:
				// (a) adds .valueOf() = function() {return this} for Number
				// subclasses
				// (b) sets objThis.__JSID__ to a unique number
				// (c) handles inner class final variables
				// (d) includes a call to the constructor c$() when called
				// directly by the user using new Foo()
				if (!isInterface) {
					buffer.append("Clazz.newInstance(this, arguments")
							.append(isTopLevel ? ",0" : "[0]," + !isStatic(binding)).append(",C$);\n");
				}
				buffer.append("}");
			}
			if (isEnum) {
				superInterfaceTypes = ((EnumDeclaration) node).superInterfaceTypes();
			} else if (!isAnnotation) {
				superInterfaceTypes = ((TypeDeclaration) node).superInterfaceTypes();
			}

		}

		if (func != null)
			buffer.append(func);

		// arg4: superclass or null

		buffer.append(", ");
		ITypeBinding superclass;
		if (isEnum) {
			buffer.append("'Enum'");
		} else if (isLambda || (superclass = binding.getSuperclass()) == null) {
			buffer.append("null");
		} else {
			hasDependents = true;
			String superclassName = getUnreplacedJavaClassNameQualified(superclass);
			switch (superclassName == null ? "" : superclassName) {
			case "":
			case "java.lang.Object":
				buffer.append("null");
				break;
			case "java.awt.Component":
			case "javax.swing.JComponent":
				if (!class_fullName.startsWith("java.") && !class_fullName.startsWith("javax.")) {
					// Component and Label are not opaque, Panel is, so we choose Label here
					String s = superclassName.replace("Component", "Label");
					log(">>class " + class_fullName + " extended " + superclassName + " now extends " + s);
					superclassName = s;
				}
				//$FALL-THROUGH$
			default:
				if (isAnonymous) {
					buffer.append(getFinalJ2SClassNameQualifier(null, superclass, superclassName, FINAL_ESCAPE));
				} else {
					buffer.append(getFinalInnerClassList(superclass, superclassName));
				}
				break;
			}
		}

		// arg5: superinterface(s) if not null

		if (superInterfaceTypes != null && superInterfaceTypes.size() > 0) {
			hasDependents = true;
			buffer.append(", ");
			String term = "";
			if (superInterfaceTypes.size() > 1) {
				buffer.append("[");
				term = "]";
			}
			String sep = "";

			for (Iterator<?> iter = superInterfaceTypes.iterator(); iter.hasNext();) {
				buffer.append(sep);
				Object iface = iter.next();
				ITypeBinding ibinding = (iface instanceof Type ? ((Type) iface).resolveBinding()
						: (ITypeBinding) iface);
				String term1 = "";
				if (!ibinding.isTopLevel()) {
					if (sep == "" && term == "") {
						buffer.append("[");
						term = "]";
					}
					buffer.append("[");
					term1 = "]";
					ITypeBinding b = ibinding;
					int pt = buffer.length();
					while (!b.isTopLevel()) {
						b = b.getDeclaringClass();
						buffer.insert(pt,
								"'" + getFinalJ2SClassName(getUnreplacedJavaClassNameQualified(b), FINAL_RAW) + "',");
					}
				}
				buffer.append("'");
				buffer.append(getFinalJ2SClassName(getUnreplacedJavaClassNameQualified(ibinding), FINAL_RAW));
				buffer.append("'");
				buffer.append(term1);
				sep = ", ";
			}
			buffer.append(term);
		} else if (isAnnotation) {
			hasDependents = true;
			buffer.append(", 'java.lang.annotation.Annotation'");
		} else {
			buffer.append(", null");
		}

		// arg6: anonymous(1), local(2), or absent

		if (isTrulyLocal) {
			buffer.append(", 2");
		} else if (isAnonymous) {
			buffer.append(", 1");
		} else {
			// remove excessive null parameters
			int i;
			while (", null".equals(buffer.substring(i = buffer.length() - 6)))
				buffer.setLength(i);
		}

		// close the initializer

		buffer.append(");\n");

		if (innerTypes.length() > 0) {
			buffer.append("C$.$classes$=[" + innerTypes.substring(1) + "];\n");
		}

		// add the Java8 compatibility local variable $o$

		// also add the local var p$ short for C$.prototype if we have any
		// private methods

		// add all the methods

		TrailingBuffer oldTrailingBuffer = trailingBuffer;
		trailingBuffer = new TrailingBuffer();

		// for annotations:
		boolean haveFieldMethodAnnotations = false;

		FieldInfo fieldInfoOld = fieldInfo;
		boolean haveFieldInfoOld = haveFields;
		fieldInfo = new FieldInfo();

		/**
		 * the static initializer
		 */
		List<BodyDeclaration> lstStatic = new ArrayList<BodyDeclaration>();
		if (!isLambda) {
			// get the list of static methods and check for annotations
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				BodyDeclaration element = (BodyDeclaration) iter.next();
				boolean isField = element instanceof FieldDeclaration;
				boolean isMethod = element instanceof MethodDeclaration;
				IMethodBinding b = null;
				if (!haveFieldMethodAnnotations && isMethod
						&& (b = ((MethodDeclaration) element).resolveBinding()) != null
						&& b.getAnnotations().length > 0) {
					haveFieldMethodAnnotations = true;
				}
				if (isField || element instanceof Initializer) {
					if ((isInterface || isStatic(element)) && checkAnnotations(element, CHECK_J2S_IGNORE_ONLY)) {
						lstStatic.add(element);
					}
				}
			}
		}

		List<EnumConstantDeclaration> enums = (isEnum ? new ArrayList<>() : null);
		List<FieldDeclaration> fields = (haveFieldMethodAnnotations || isInterface || isLambda || isEnum ? null
				: new ArrayList<>());

		List<IMethodBinding> methods = (haveFieldMethodAnnotations || isAnnotation || fields != null ? new ArrayList<>()
				: null);

		if (hasDependents) {
			// Add the class static initializer C$.$clinit$(), which in SwingJS will trigger
			// loading of all superclasses and interfaces, and set up the prototype
			// correctly. It does not initialize fields.
			//
			// C$.$clinit$ is set to 0 immediately when run so that it is run
			// just once per class. (In contrast, C$.$init$ is run once per instance.)
			// just "$clinit$=1;" now; this will be replaced by SwingJS
			// at runtime with a call to Clazz.load(C$,1)

			// Prior to 3.2.4.10, $clinit$ was also doing static initialization. But that
			// turns out not to be quite right. Static intitialization (now in $static$)
			// for a set of related classes must be done after all are loaded, as otherwise
			// the superclass and interface methods may not be added to the subclass
			// prototype.
			// Only found (to date) only in biojava where the interface Location has a
			// static
			// initializer for one of its implementing classes. Very tricky!

			appendClinit();
		}
		if (lstStatic.size() > 0 || isEnum) {
			// create $static$ (Java's <clinit>)

			// All static fields that have initializers must be introduced first
			// as null if Objects and then finalized in $static$(),
			// even if they are their default values. This is because they might have been
			// modified by other actions between the time they were initially initialized
			// and when $static$ is run. This happens when the static fields in class A
			// reference static fields in class B, which in turn reference static fields
			// in Class A.

			int pt = buffer.length();
			boolean haveDeclarations = isEnum;
			if (isEnum)
				addEnumConstants((EnumDeclaration) node, enums);
			for (int i = lstStatic.size(); --i >= 0;) {
				BodyDeclaration element = lstStatic.remove(0);
				if (element instanceof Initializer) {
					((Initializer) element).getBody().accept(this);
					buffer.append(";\n");
					haveDeclarations = true;
				} else if (addFieldDeclaration((FieldDeclaration) element, true)) {
					haveDeclarations = true;
				}
			}
			if (haveDeclarations) {
				trailingBuffer.staticBlock = buffer.substring(pt);
			}
			buffer.setLength(pt);
		}

		if (isAnonymous) {
			setClassAndBinding(finalShortClassName, binding);
		}

		if (!isInterface) {

			// if this is not an interface, generate $init$ method, which declares nonstatic
			// fields that have initializers and
			// is called just after the call to a superconstructor.

			buffer.append("\nClazz.newMeth(C$, '$init$', function () {\n"); // C$.$load$&&Clazz.load(C$,2);
			// we include all field definitions here and all nonstatic
			// initializers

			if (!isLambda)
				for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
					BodyDeclaration element = (BodyDeclaration) iter.next();
					boolean isField = element instanceof FieldDeclaration;
					if ((isField || element instanceof Initializer) && !isStatic(element)
							&& checkAnnotations(element, CHECK_J2S_IGNORE_AND_ANNOTATIONS)) {
						if (isField) {
							addFieldDeclaration((FieldDeclaration) element, false);
							if (class_annotations != null && fields == null)
								fields = new ArrayList<>();
							if (fields != null && !Modifier.isTransient(((FieldDeclaration) element).getModifiers()))
								fields.add((FieldDeclaration) element);
						} else {
							((Initializer) element).getBody().accept(this);
							buffer.append("\n");
						}
					}
				}
			buffer.append("},1);\n");

		}

		if (haveFields)
			fieldInfo.add$fields$();
		fieldInfo = fieldInfoOld;
		haveFields = haveFieldInfoOld;

		// add all the methods

		StringBuffer defaults = new StringBuffer();

		boolean isStatic = true;
		if (isLambda) {
			isStatic = addLambdaClass(node, binding.getFunctionalInterfaceMethod());
		} else {
			if (isAnnotation) {
				buffer.append("C$.prototype.annotationType = function() { return this.getClass$() };\n");
				trailingBuffer.append("C$.$getMembers$ = function() {" + varOrLet + "a=[];\n");
			}
			HashMap<String, String> exportNames = new HashMap<>();
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof MethodDeclaration) {
					MethodDeclaration mnode = (MethodDeclaration) element;
					IMethodBinding method = mnode.resolveBinding();
					if (method == null || !checkAnnotations(mnode, CHECK_J2S_IGNORE_AND_ANNOTATIONS))
						continue;
					if (methods != null) {
						String mname = method.getName();
						if (xml_annotationType == NOT_JAXB || mname.startsWith("set") || mname.startsWith("get")
								|| mname.startsWith("is"))
							methods.add(method);
					}
					class_defpt = -1;
					if (Modifier.isDefault(method.getModifiers())) {
						// log("default method " + method.getKey());
						class_defpt = buffer.length();
					}
					processMethodDeclaration(mnode, method, mnode.parameters(), mnode.getBody(), mnode.isConstructor(),
							abstractMethodList, NOT_LAMBDA, exportNames, exportAll);
					if (class_defpt >= 0) {
						defaults.append(buffer.substring(class_defpt));
						buffer.setLength(class_defpt);
						class_defpt = -1;
					}
				} else if (element instanceof AnnotationTypeMemberDeclaration) {
					processAnnotationTypeMemberDeclaration((AnnotationTypeMemberDeclaration) element);
				}
			}
			if (isAnnotation) {
				trailingBuffer.append("return a}");
			}
		}

		// add any recently defined static field definitions, assert strings
		// and Enum constants

		if (isInterface) {
			// add synthetic methods to defaults -- interface declaring an override of a
			// generic
			addSyntheticBridges(binding, abstractMethodList, defaults, true);
			if (defaults.length() > 0) {
				buffer.append(defaults.indexOf("C$$") >= 0 ? "var C$$ = C$;" : "")
						.append("C$.$defaults$ = function(C$){\n").append(defaults).append("};");
			}
		} else {
			addSyntheticBridges(binding, abstractMethodList, buffer, false);
		}
		if (class_annotations != null) {
			// lambda expressions may have an enclosing annotation type, but they will not
			// have methods
			ClassAnnotation.addClassAnnotations(this, xml_annotationType, class_annotations, enums, fields, methods,
					innerClasses, trailingBuffer.buf);
			class_annotations = null;
			xml_annotationType = ANNOTATION_TYPE_UNKNOWN;
		}
		buffer.append(trailingBuffer.getString()); // also writes the assert string
		if (isAnonymous) {
			// if anonymous, restore old static def buffer
			trailingBuffer = oldTrailingBuffer;
		} else {
			// otherwise, dump the oldStatic buffer and start a new one
			buffer.append(oldTrailingBuffer.getString());
			trailingBuffer = new TrailingBuffer();
			if (!isInterface)
				addDefaultConstructor();
			if (isEnum) {
				buffer.append(varOrLet + "$vals=[];\n");
				// implicit Enum methods added as trailer
				buffer.append("Clazz.newMeth(C$, 'values$', function() { return $vals }, 1);\n");
				buffer.append("Clazz.newMeth(C$, 'valueOf$S', function(name) { for (" + varOrLet
						+ "val in $vals){ if ($vals[val].name == name) return $vals[val]} return null }, 1);\n");
			}
		}

		getJ2sJavadoc(node, DOC_ADD_POST);

		if (!isTopLevel) {
			addAnonymousFunctionWrapper(false);
			if (isAnonymous) {
				buffer.append(")");
				this$0Name = this$0Name0;
				setClassAndBinding(oldShortClassName, oldBinding);
				class_annotations = oldAnnotations;
			}
		}

		lambdaCount = lc;

		return isStatic;
	}

	/**
	 * for at_interfaces, build the
	 * 
	 * @param node
	 */
	private void processAnnotationTypeMemberDeclaration(AnnotationTypeMemberDeclaration node) {

		Expression def = node.getDefault();
		SimpleName name = node.getName();
		IMethodBinding mbinding = node.resolveBinding();
		ITypeBinding ret = mbinding.getReturnType();
		int pt = buffer.length();
		// note that annotations cannot be generic
		boolean isArray = ret.isArray();
		if (isArray)
			ret = ret.getComponentType();
		String retName = (ret.isPrimitive() ? ret.getName() : j2sNonPrimitiveName(ret, true));
		buffer.append("a.push(['" + name + "','" + retName + (isArray ? "[]" : "") + "',");
		if (def == null) {
			if (!isArray && ret.isPrimitive()) {
				switch (ret.getName()) {
				case "char":
					buffer.append("'\0'");
					break;
				case "boolean":
					buffer.append("false");
					break;
				default:
					buffer.append("0");
					break;
				}
			} else {
				buffer.append("null");
			}
		} else if (!isArray && ret.isAnnotation()) {
			buffer.append("'@"
					+ getFinalJ2SClassName(getUnreplacedJavaClassNameQualified(def.resolveTypeBinding()), FINAL_RAW)
					+ "'");
		} else {
			def.accept(this);
		}
		buffer.append("]);\n");
		trailingBuffer.append(buffer.substring(pt));
		buffer.setLength(pt);
	}

	/**
	 * If there is no Foo() or Foo(xxx... array), then we need to provide our own
	 * constructor.
	 * 
	 */
	private void addDefaultConstructor() {
		if (class_haveDefaultConstructor) {
			class_haveDefaultConstructor = false;
		} else {
			buffer.append("\nClazz.newMeth(C$);\n");
		}
	}

	/**
	 * Add all the Enum constants, and create C$.values$() and Enum.valueOf
	 * 
	 * @param constants
	 */

	private void addEnumConstants(EnumDeclaration e, List<EnumConstantDeclaration> enums) {
		List<?> constants = e.enumConstants();
		buffer.append("$vals=Clazz.array(C$,[0]);\n");
		for (int i = 0; i < constants.size(); i++) {
			EnumConstantDeclaration enumConst = (EnumConstantDeclaration) constants.get(i);
			enums.add(enumConst);
			checkAnnotations(enumConst, CHECK_ANNOTATIONS_ONLY); // for JAXB only
			IMethodBinding binding = enumConst.resolveConstructorBinding();
			AnonymousClassDeclaration anonDeclare = enumConst.getAnonymousClassDeclaration();
			String anonName = null;
			if (anonDeclare != null) {
				ITypeBinding dbinding = anonDeclare.resolveBinding();
				// BH: add the anonymous class definition inline!
				addClassOrInterface(anonDeclare, dbinding, anonDeclare.bodyDeclarations(), 'a', false);
				anonName = getUnreplacedJavaClassNameQualified(dbinding);
				buffer.append("\n");
			}
			buffer.append("Clazz.newEnumConst($vals, ")
					.append(getFinalMethodNameWith$Params("C$.c$", binding, null, false, METHOD_NOTSPECIAL))
					.append(", \"");
			enumConst.getName().accept(this);
			buffer.append("\", " + i);
			addMethodParameterList(enumConst.arguments(), binding, ", [", "]", METHOD_CONSTRUCTOR);
			if (anonName != null)
				buffer.append(", ").append(anonName);
			buffer.append(");\n");
		}
	}

	/**
	 * 
	 * Handle all field declarations without visit(FieldDeclaration).
	 * 
	 * 
	 * @param field    the field being declared
	 * @param isStatic
	 * @return true if anything was written to the buffer
	 */
	@SuppressWarnings("null")
	private boolean addFieldDeclaration(FieldDeclaration field, boolean isStatic) {

		List<?> fragments = field.fragments();
		VariableDeclarationFragment identifier = (VariableDeclarationFragment) fragments.get(0);
		IVariableBinding v = identifier.resolveBinding();
		Type nodeType = (v != null && v.getType().isArray() ? null : field.getType());
		boolean isPrimitive = (nodeType != null && nodeType.isPrimitiveType());
		// have to check here for final Object = "foo", as that must not be ignored.
		boolean checkFinalConstant = ((isPrimitive
				|| v != null && v.getType().getQualifiedName().equals("java.lang.String")) && isStatic
				&& Modifier.isFinal(field.getModifiers()));
		boolean haveAnnotations = (!isStatic && v != null && v.getAnnotations().length > 0);

		addJ2SDoc(field);
		int len0 = buffer.length();
		int tpt = (isPrimitive ? fieldInfo.getPrimitiveDefaultType(((PrimitiveType) nodeType).getPrimitiveTypeCode())
				: -1);
		for (Iterator<?> iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment fragment = (VariableDeclarationFragment) iter.next();
			Expression initializer = fragment.getInitializer();
			IVariableBinding fbinding = fragment.resolveBinding();
			if (fbinding == null) {
				log(">>> null binding for fragment in " + field);
			}
			String name = getFinalFieldName(fbinding);
			if (initializer != null) {
				if (checkFinalConstant && getConstantValue(initializer, false))
					continue;
				String prefix = (isStatic ? "C$." : "this.") + name;
				buffer.append(prefix);
				buffer.append("="); // no space here; will check last char for lambda
				addExpressionAsTargetType(initializer, field.getType(), "v", null);
				buffer.append(";\n");
			}
			fieldInfo.addField(isStatic, name, v, tpt);
			haveFields = true;
		}
		boolean wasAdded = (buffer.length() > len0);
		return wasAdded && (isStatic || haveAnnotations);
	}

	/**
	 * 
	 * generate the Clazz.new_(...) call for an inner class.
	 * 
	 * @param node
	 * @param javaInnerClassName
	 * @param outerClassExpr
	 * @param constructorDeclaration
	 * @param superAnonName          the name of the superclass of the anonymous
	 *                               method, as for example, in MouseAdapter adapter
	 *                               = new MouseAdapter() {....}
	 */
	private boolean addInnerTypeInstance(ASTNode node, ITypeBinding binding, ITypeBinding superAnonOrInnerClass,
			String javaInnerClassName, Expression outerClassExpr, IMethodBinding constructorMethodDeclaration,
			String superAnonName, String anonName) {
		// Clazz.new_(constructor, [args], innerClass)
		// or Clazz.new_([args], constructor, innerClass);
		int pt = openNew(superAnonOrInnerClass == null ? binding : superAnonOrInnerClass,
				(superAnonName == null ? javaInnerClassName : superAnonName), anonName, constructorMethodDeclaration,
				METHOD_NOTSPECIAL);
		int pt1 = buffer.length();
		// add constructor application arguments: [object, parameters]
		buffer.append(",[");

		if (outerClassExpr == null) {
			buffer.append("this");
		} else {
			outerClassExpr.accept(this);
		}
		// add final variable array

		String key = (anonName == null ? binding.getKey() : anonName);
		Set<IVariableBinding> list = package_htClassKeyToVisitedFinalVars.get(key);
		String finals = listFinalVariables(list, package_outerFinalKey);
		buffer.append(", ").append(finals == null ? "null" : finals);

		// add parameters

		if (constructorMethodDeclaration != null) {
			List<?> args = ((ClassInstanceCreation) node).arguments();
			addMethodParameterList(args, constructorMethodDeclaration,
					args.size() > 0 || constructorMethodDeclaration.isVarargs() ? ", " : null, null,
					METHOD_CONSTRUCTOR);
		}
		buffer.append("]");
		checkStaticParams2(pt, pt1, true);

		// an anonymous class will be calling a constructor in another
		// class, so we need to indicate its actual call explicitly with a third
		// parameter

		if (superAnonName != null && javaInnerClassName != null) {
			buffer.append(",").append(getFinalJ2SClassName(javaInnerClassName, FINAL_PC));
		}
		buffer.append(")");
		return (finals != null);
	}

	/**
	 * Add a method parameter list
	 * 
	 * @param arguments
	 * @param methodDeclaration
	 * @param prefix
	 * @param suffix
	 * @param flags
	 */
	private void addMethodParameterList(List<?> arguments, IMethodBinding methodDeclaration, String prefix,
			String suffix, int flags) {
		if (methodDeclaration == null)
			return;

		boolean methodIsVarArgs = methodDeclaration.isVarargs();
		int argCount = arguments.size();
		if ((flags & METHOD_CONSTRUCTOR) != 0 && argCount == 0 && !methodIsVarArgs) {
			// We allow use of a default constructor using new foo().
			// Here we always add a [] argument to a default constructor, as null
			// will indicate that we did not use Clazz.new_ and instead called new foo()
			// directly.
			if (prefix != null) {
				buffer.append(prefix);
				prefix = null;
				if (methodIsVarArgs)
					buffer.append("[]");
			}
		} else {
			ITypeBinding[] parameterTypes = methodDeclaration.getParameterTypes();
			int nparam = parameterTypes.length;
			if (prefix != null && (nparam > 0 || methodIsVarArgs)) {
				buffer.append(prefix);
				prefix = null;
			}
			addMethodArguments(methodDeclaration, parameterTypes, methodIsVarArgs, arguments, flags);
		}
		if (prefix == null && suffix != null)
			buffer.append(suffix);
	}

	private void addSuperConstructor(SuperConstructorInvocation node, IMethodBinding methodDeclaration) {
		if (node == null) {
			// default constructor
			buffer.append("Clazz.super_(C$, this);\n");
			return;
		}

		if (node.getExpression() != null) {
			buffer.append(";Clazz.super_(C$,this,");
			node.getExpression().accept(this);
			buffer.append(")");
		}

		buffer.append(getFinalMethodNameWith$Params(";C$.superclazz.c$", node.resolveConstructorBinding(), null, false,
				METHOD_NOTSPECIAL));
		buffer.append(".apply(this,[");
		addMethodParameterList(node.arguments(), methodDeclaration, null, null, METHOD_CONSTRUCTOR);
		buffer.append("])");
		addCallInit();
	}

	/**
	 * log to sysout - ones we want to keep, not just for debugging
	 * 
	 * @param msg
	 */
	static void log(String msg) {
		System.out.println(msg);
	}

	/**
	 * log to syserr
	 * 
	 * @param msg
	 */
	static void logErr(String msg) {
		System.err.println(msg);
	}

	private static boolean isObjectOrNull(ITypeBinding type) {
		return type == null || "java.lang.Object".equals(type.getQualifiedName());
	}

	/**
	 * holds all static field definitions for insertion at the end of the class def
	 * and allows setting of local typed integer arrays for fast processing of bytes
	 * 
	 */
	protected TrailingBuffer trailingBuffer = new TrailingBuffer();

	private String temp_iref;

	/**
	 * TrailingBuffer holds definitions that need to come after all methods are
	 * defined, with blocks defined just once for any given class.
	 * 
	 * The buffer also provides a very efficient way to do byte, short, and int
	 * operation processing by using the trick that if we have defined
	 * 
	 * var $b$ = new Int8Array(1)
	 * 
	 * then we can use that to "filter" a (necessarily) 32-bit integer JavaScript
	 * variable to reproduce the effect of being a byte or short or int. This is
	 * done as follows:
	 * 
	 * Java:
	 * 
	 * byte b = (byte) 300;
	 * 
	 * JavaScript:
	 * 
	 * var b = ($b$[0] = 300, $b$[0]);
	 * 
	 * This works because Int8Arrays really are bytes, and they can only hold bytes.
	 * So
	 * 
	 * $b$[0] = 300
	 * 
	 * sets $b$[0] to be 44, and ($b$[0] = 300, $b$[0]) then passes that value on to
	 * the receiving variable b (which itself is a 32-bit integer, actually).
	 * 
	 * It was a surprise to me that the "(..., $b$[0])" business was necessary.
	 * However, it turns out that
	 * 
	 * b = $b$[0] = 300;
	 * 
	 * is really short for the two (undesired) independent processes:
	 * 
	 * b = 300; $b$[0] = 300;
	 *
	 * not the (desired) sequential pair
	 * 
	 * $b$[0] = 300; b = $b$[0];
	 * 
	 * But
	 * 
	 * var b = ($b$[0] = 300, $b$[0]);
	 * 
	 * is precisely this second meaning.
	 * 
	 * 
	 * We turn this action off using the field isArray so that these don't get
	 * nested.
	 * 
	 * @author Bob Hanson
	 *
	 */
	class TrailingBuffer {

		StringBuffer buf;
		private String added = "";

		String staticBlock;

		boolean hasAssert;

		TrailingBuffer() {
			buf = new StringBuffer();
		}

		TrailingBuffer append(String s) {
			buf.append(s);
			return this;
		}

		String getStatics() {
			if (hasAssert) {
				if (staticBlock == null)
					staticBlock = "";
				staticBlock = "C$.$_ASSERT_ENABLED_ = ClassLoader.getClassAssertionStatus$(C$);\n" + staticBlock;
			}
			return (staticBlock == null ? "" : "\nC$.$static$=function(){C$.$static$=0;\n" + staticBlock + "};\n");
		}

		public String getString() {
			return getStatics() + added + buf;
		}

		void addType(String name) {
			char a = name.charAt(0);
			// note that this character may not be in the phrase "new Int Array"
			if (added.indexOf(a) >= 0)
				return;
			added += varOrLet + "$" + a + "$";
			switch (a) {
			case 'b': // $b$
				added += " = new Int8Array(1)";
				break;
			case 's': // $s$
				added += " = new Int16Array(1)";
				break;
			case 'i': // $i$ // abandoned - using |0
				added += " = new Int32Array(1)";
				break;
			default:
			case 'p': // $p$ // char temp
			case 'j': // $j$ // [pt++] temp
			case 'k': // $k$ // [3][pt++]
			case 'l': // $l$ // [3][4][pt++]
				break;
			}
			added += ";\n";
		}

		public void insert(int pt, String s) {
			buf.insert(pt, s);
		}
	}

	public boolean visit(ArrayAccess node) {
		node.getArray().accept(this);
		buffer.append('[');
		addNonCharacter(node.getIndex());
		buffer.append(']');
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(ArrayCreation node) {
		// new byte[] {'a', 2, 3, 4, 5};
		ArrayInitializer inode = node.getInitializer();
		if (inode == null) {
			addArrayConstructor(node.resolveTypeBinding(), node.dimensions());
		} else {
			visit(inode);
		}
		return false;
	}

	private void addArrayConstructor(ITypeBinding binding, List<ASTNode> dim) {
		boolean isLambda_C = (dim == null);
		@SuppressWarnings("null")
		int n = (isLambda_C ? 1 : dim.size());
		buffer.append(clazzArray(binding, ARRAY_DIM_ONLY));
		buffer.append(", [");
		if (isLambda_C)
			buffer.append("t.intValue()");
		else
			visitList(dim, ", ");
		for (int i = binding.getDimensions() - n; --i >= 0;)
			buffer.append(", null");
		buffer.append("])");
	}

	public boolean visit(ArrayInitializer node) {
		// as in: public String[] d = {"1", "2"};
		ITypeBinding type = node.resolveTypeBinding();
		buffer.append(clazzArray(type, ARRAY_INITIALIZED));
		buffer.append(", [");
		int toChar = toCharType(type);
		@SuppressWarnings("unchecked")
		List<ASTNode> ex = node.expressions();
		if (toChar == 0) {
			visitList(ex, ", ");
		} else {
			fixCharArrayInit(buffer, ex, toChar);
		}
		buffer.append("])");
		return false;
	}

	private static int toCharType(ITypeBinding type) {
		switch (type == null ? "" : type.getName()) {
		case "char[]":
			return 1;
		case "byte[]":
		case "short[]":
		case "int[]":
		case "long[]":
		case "float[]":
		case "double[]":
			return -1;
		default:
			return 0;
		}
	}

	private void fixCharArrayInit(StringBuffer buffer, List<ASTNode> list, int toChar) {
		for (Iterator<ASTNode> iter = list.iterator(); iter.hasNext();) {
			int pt = buffer.length();
			appendBoxingNode(iter.next(), false, null, false, false);
			if (toChar != 0) {
				String s = buffer.substring(pt);
				// only fix "x" and number
				// not fixed: int[] a = new int[] {"test".charAt(0)}
				try {
					if (pt > 0 && (s.charAt(0) == '"') != (toChar == 1)) {
						buffer.replace(pt, buffer.length(), (toChar == 1 ? "\"" + ((char) Integer.parseInt(s)) + "\""
								: s.length() == 3 ? "" + (byte) s.charAt(1) : s));
					}
				} catch (@SuppressWarnings("unused") Exception e) {
					// ignore
				}
			}
			if (!iter.hasNext())
				return;
			buffer.append(", ");
		}
	}

	public boolean visit(Assignment node) {
		// note that this is not
		// var x = ..... -- that is a visit(VariableDeclaration)
		//
		// includes: =
		// +=, -=, *=, /=, %=
		// &=, |=, ^=
		// <<=
		// >>=
		// >>>=
		// System.out.println("visitassign parent " + (node.getParent() == null ? null :
		// node.getParent().getClass().getName()) + " " + node);
		Expression left = node.getLeftHandSide();
		Expression right = node.getRightHandSide();
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		ITypeBinding rightTypeBinding = right.resolveTypeBinding();
		String rightName = (rightTypeBinding == null ? null : rightTypeBinding.getName());
		String leftName = (leftTypeBinding == null ? null : leftTypeBinding.getName());
		if (leftName == null || rightName == null)
			return false;
		boolean isFieldAccess = (left instanceof FieldAccess && !haveDirectAccess(left));
		boolean wasArray = temp_processingArrayIndex;
		temp_processingArrayIndex = (left instanceof ArrayAccess);
		ArrayAccess leftArray = (temp_processingArrayIndex ? (ArrayAccess) left : null);
		String op = node.getOperator().toString();
		String opType = (op.length() == 1 ? null : op.substring(0, op.length() - 1));
		boolean isProblem = (isLongExact() && (op.equals("+=") || op.equals("-=")) && rightName.equals("long"));
		boolean isExactLong = (isLongExact() && leftName.equals("long"));
		boolean isFromLongExact = (isLongExact() && rightName.equals("long") && "double float".indexOf(leftName) >= 0);
		boolean isParenthesized = (right instanceof ParenthesizedExpression);
		String trailer = "";
		IVariableBinding toBinding = getLeftVariableBinding(left, leftTypeBinding);
		String fieldName = (toBinding == null ? null : toBinding.getName());

		if (isStaticBinding(toBinding)) {
			// Static def new Test_Static().y++;
			if (!haveDirectAccess(left) && !(node.getParent() instanceof Statement)) {
				buffer.append("(");
				trailer = ")";
			}
			addLeftSidePrefixName(left);
		} else {
			toBinding = null;
		}

		if ("boolean".equals(leftName) && "boolean".equals(rightName)) {
			if (("^=".equals(op))) {
				opType = "!=";
			} else if (opType == null) {
				// all boolean should be OK -- no automatic here
				left.accept(this);
				buffer.append("=");
				right.accept(this);
				leftName = null;
			} else {
				// a&=b -> !!(a&(b)) because both must execute
			}
		} else if (opType == null) {
			// = operator is no problem
			left.accept(this);
			buffer.append("=");
			addExpressionAsTargetType(right, leftTypeBinding, "=", null);
			leftName = null;
		}
		if (leftName == null) {
			// we are done
			buffer.append(trailer);
			temp_processingArrayIndex = wasArray;
			return false;
		}

		if (isExactLong) {
			buffer.append("(");
			trailer += ")";
		}
		int ptArray = (temp_processingArrayIndex ? buffer.length() : -1);
		String iref = null;
		if (toBinding == null) {
			// nonstatic field
			// TODO int = (int += long);
			if (isFieldAccess && (isExactLong || isProblem)) {
				// new Test_Long().b++
				fieldName = pushFieldQualifier(left);
				iref = temp_iref;
				temp_iref = fieldName;
			} else {
				left.accept(this);
			}
		} else {
			// static field -- no problem here
			addFieldNameAndBoxExpression(left, toBinding, null, false, isExactLong, false);
		}
		int ptArray2 = (temp_processingArrayIndex ? buffer.length() : -1);
		boolean leftIsString = leftName.equals("String");
		boolean mustBoxAll = !leftIsString && (leftTypeBinding == null || !leftTypeBinding.isPrimitive());
		if ("char".equals(leftName)) {

			// char left op right where op is not just "="

			// could be +=, -=, *=, /=, >>=, etc

			buffer.append(" = String.fromCharCode(");
			if (left instanceof SimpleName || left instanceof QualifiedName) {
				left.accept(this);
			} else {
				buffer.append("(");
				left.accept(this);
				buffer.append(")");
			}
			buffer.append(CHARCODEAT0); // .charCodeAt(0)
			buffer.append(opType);
			buffer.append(' ');
			boolean needCharCode = false;
			if (right instanceof InfixExpression) {
				if (getConstantValue(right, true)) {
					char c = getLastCharInBuffer();
					needCharCode = (c == '\'' || c == '"');
				} else {
					buffer.append("(");
					appendBoxingNode(right, true, null, false, false);
					buffer.append(")");
				}
			} else if ("char".equals(rightName)) {
				Object constValue = getConstant(right);
				if (constValue != null && constValue instanceof Character) {
					buffer.append(((Character) constValue).charValue() + 0);
				} else {
					boolean needParenthesis = !(right instanceof ParenthesizedExpression
							|| right instanceof PrefixExpression || right instanceof PostfixExpression);
					if (needParenthesis) {
						buffer.append("(");
						addJ2SDoc(right);
					}
					needCharCode = appendBoxingNode(right, false, null, false, false);
					if (needParenthesis) {
						buffer.append(")");
					}
				}
			} else {
				appendBoxingNode(right, true, null, false, false);
				needCharCode = false;
			}
			if (needCharCode)
				buffer.append(CHARCODEAT0);
			trailer = ")";
		} else {
			// not a char on the right
			if (isIntegerType(leftName) || "boolean".equals(leftName) || mustBoxAll || isExactLong) {
				// can't just use a |= b because that ends up as 1 or 0, not true or false.
				// byte|short|int|long += ...
				if (!addPrimitiveTypedExpression(left, toBinding, leftName, opType, right, rightName, null, true,
						mustBoxAll ? leftTypeBinding : null))
					ptArray = -1;
			} else {
				ptArray = -1;
				// not char x ....
				// not boolean x....
				// could be int, byte, short, long with =, ==, or !=, +=, -=, etc.
				// could be String x = .....
				buffer.append(op);
				if ("char".equals(rightName)) {
					if (right instanceof CharacterLiteral) {
						// ... = 'c'
						if (leftIsString) {
							getConstantValue(right, true);
						} else {
							if (isParenthesized)
								buffer.append("(");
							addJ2SDoc(right);
							buffer.append(0 + ((CharacterLiteral) right).charValue());
							if (isParenthesized)
								buffer.append(")");
						}
					} else if (leftIsString) {
						// String x = (char)....
						right.accept(this);
					} else {
						// dump ( right ) and check for right being
						// String.charAt(...);
						int pt = buffer.length();
						buffer.append('(');
						right.accept(this);
						buffer.append(")");
						addCharCodeAt(right, pt);
					}
				} else {
					// just add the right operand
					if (isFromLongExact) {
						buffer.append("Long.valueOf$J(");
					}
					addOperandWithJ2SDoc(right, leftIsString);
					if (isFromLongExact) {
						buffer.append(")." + leftName + "Value$()");
					}
				}
			}
		}
		temp_iref = iref;
		buffer.append(trailer);
		return fixAssignArray(leftArray, ptArray, ptArray2, wasArray);
	}

	private String pushFieldQualifier(Expression exp) {
		// new Foo().x++;
		buffer.append("(I$0.push(");
		exp.accept(this);
		int pt = buffer.lastIndexOf(".");
		String name = buffer.substring(pt + 1);
		buffer.insert(pt, "),I$0[I$0.length-1])");
		return name;
	}

	private IVariableBinding getLeftVariableBinding(Expression left, IBinding leftTypeBinding) {
		if (left instanceof Name) {
			if (leftTypeBinding instanceof IVariableBinding) {
				return (IVariableBinding) leftTypeBinding;
			}
		} else if (left instanceof FieldAccess) {
			return ((FieldAccess) left).resolveFieldBinding();
		}
		return null;
	}

	/**
	 * We must fix:
	 * 
	 * this.ctype[low++] = (this.ctype[low++]|(4)|0);
	 * 
	 * to read:
	 * 
	 * this.ctype[$j$=low++] = (this.ctype[$j$]|(4)|0);
	 * 
	 * so that the index does not get operated upon twice.
	 * 
	 * But what if we had this.ctype[i++][3] += .... ? -- for now, not considering
	 * this! Also resets wasArray.
	 * 
	 * @param ptArray
	 * @param ptArray2
	 * @param wasArray
	 * @return
	 */
	private boolean fixAssignArray(ArrayAccess leftArray, int ptArray, int ptArray2, boolean wasArray) {
		if (ptArray >= 0) {

			// dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;

			String left = buffer.substring(ptArray, ptArray2); // zzz[xxx]

			int ptIndex1 = left.indexOf("[");
			int ptIndex2 = left.lastIndexOf("]");
			if (ptIndex2 - ptIndex1 > 3) {
				// at least as long as zzz[i++]
				String right = buffer.substring(ptArray2);
				buffer.setLength(ptArray);
				String name = left.substring(0, ptIndex1);
				if (name.indexOf("(") >= 0) {
					buffer.append("($j$=" + name + ")");
					name = "$j$";
					trailingBuffer.addType("j");
				} else {
					buffer.append(name);
				}
				String newRight = addArrayTemps(leftArray);
				int ptIndex3 = right.indexOf(left);

				buffer.append(right.substring(0, ptIndex3));
				buffer.append(name);
				buffer.append(newRight);
				buffer.append(right.substring(ptIndex3 + left.length()));
			}
		}
		temp_processingArrayIndex = wasArray;
		return false;
	}

	private String addArrayTemps(ArrayAccess leftArray) {
		String right = "";
		char c = 'k';
		String left = "";
		while (leftArray != null) {
			Expression exp = leftArray.getIndex();
			int pt = buffer.length();
			exp.accept(this);
			int len = buffer.length() - pt;
			String index = buffer.substring(pt);
			buffer.setLength(pt);
			if (len < 3) {
				left = "[" + index + "]" + left;
				right = "[" + index + "]" + right;
			} else {
				left = "[$" + c + "$=" + index + "]" + left;
				right = "[$" + c + "$]" + right;
				trailingBuffer.addType("" + c++);
			}
			exp = leftArray.getArray();
			if (!(exp instanceof ArrayAccess))
				break;
			leftArray = (ArrayAccess) exp;
		}
		buffer.append(left);
		return right;
	}

	public boolean visit(BooleanLiteral node) {
		buffer.append(node.booleanValue());
		return false;
	}

	public boolean visit(CastExpression node) {
		Expression expression = node.getExpression();
		ITypeBinding expBinding = expression.resolveTypeBinding();
		Type typeTO = node.getType();
		String fromValue = "";
		String toValue = "";
		// assume that casting is intentional to adjust the integer type
		if (expBinding != null && typeTO.isPrimitiveType()) {
			String nameFROM = expBinding.getName();
			String nameTO = ((PrimitiveType) typeTO).getPrimitiveTypeCode().toString();
			if (!nameTO.equals(nameFROM)) {
				addPrimitiveTypedExpression(null, null, nameTO, null, expression, nameFROM, null, false, null);
				return false;
			}
		}
		buffer.append(fromValue);
		expression.accept(this);
		buffer.append(toValue);
		return false;
	}

	public boolean visit(CatchClause node) {
		buffer.append(" catch (");
		node.getException().accept(this);
		buffer.append(") ");
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(CharacterLiteral node) {
		buffer.append('\'');
		addChar(node.charValue(), buffer);
		buffer.append('\'');
		return false;
	}

	public boolean visit(ConditionalExpression node) {
		// tricky part here is that the overall expression should have a target,
		// not the individual ones.
		ITypeBinding binding = node.resolveTypeBinding();
		Expression expThen = node.getThenExpression();
		Expression expElse = node.getElseExpression();
		Expression exp = node.getExpression();
		exp.accept(this);
		if (exp.resolveUnboxing())
			buffer.append(".booleanValue$()");
		buffer.append(" ? ");
		addExpressionAsTargetType(expThen, binding, "e", null);
		buffer.append(" : ");
		addExpressionAsTargetType(expElse, binding, "e", null);
		return false;
	}

	public boolean visit(FieldAccess node) {
		// Field access expression AST node type.
		// FieldAccess:
		// Expression . Identifier
		//
		//
		// Note that there are several kinds of expressions that resemble field
		// a ccess expressions: qualified names, this expressions, and super
		// field access expressions. The following guidelines help with correct
		// usage:
		// -An expression like "foo.this" can only be represented as a this
		// expression (ThisExpression) containing a simple name. "this" is a
		// keyword, and therefore invalid as an identifier.
		// -An expression like "this.foo" can only be represented as a field
		// access expression (FieldAccess) containing a this expression and a
		// simple name. Again, this is because "this" is a keyword, and
		// therefore invalid as an identifier.
		// -An expression with "super" can only be represented as a super field
		// access expression (SuperFieldAccess). "super" is a also keyword, and
		// therefore invalid as an identifier.
		// -An expression like "foo.bar" can be represented either as a
		// qualified name (QualifiedName) or as a field access expression
		// (FieldAccess) containing simple names. Either is acceptable, and
		// there is no way to choose between them without information about what
		// the names resolve to (ASTParser may return either).
		// -Other expressions ending in an identifier, such as "foo().bar" can
		// only be represented as field access expressions (FieldAccess).

		IVariableBinding varBinding = node.resolveFieldBinding();
		Expression expression = node.getExpression();
		if (isStaticBinding(varBinding)) {
			// e.g. i += 3 + y + ++(new >>Test_Static<<().y);
			buffer.append('(');
		} else {
			varBinding = null;
		}
		expression.accept(this);

		if (varBinding != null) {
			buffer.append(", ");
			addQualifiedNameForBinding(varBinding, false);
			buffer.append(')');
		}
		buffer.append(".");
		node.getName().accept(this);
		return false;
	}

	/**
	 * Infix operators (typesafe enumeration).
	 * 
	 * <pre>
	 * InfixOperator:<code>
	 *    <b>*</b>	TIMES
	 *    <b>/</b>  DIVIDE
	 *    <b>%</b>  REMAINDER
	 *    <b>+</b>  PLUS
	 *    <b>-</b>  MINUS
	 *    <b>&lt;&lt;</b>  LEFT_SHIFT
	 *    <b>&gt;&gt;</b>  RIGHT_SHIFT_SIGNED
	 *    <b>&gt;&gt;&gt;</b>  RIGHT_SHIFT_UNSIGNED
	 *    <b>&lt;</b>  LESS
	 *    <b>&gt;</b>  GREATER
	 *    <b>&lt;=</b>  LESS_EQUALS
	 *    <b>&gt;=</b>  GREATER_EQUALS
	 *    <b>==</b>  EQUALS
	 *    <b>!=</b>  NOT_EQUALS
	 *    <b>^</b>  XOR
	 *    <b>&amp;</b>  AND
	 *    <b>|</b>  OR
	 *    <b>&amp;&amp;</b>  CONDITIONAL_AND
	 *    <b>||</b>  CONDITIONAL_OR</code>
	 * </pre>
	 */

	public boolean visit(InfixExpression node) {
		// includes
		//
		// * / % + -
		// << >> >>>
		// < > <= >= == !=
		// ^ & |
		// && ||
		// ( a == b )
		// (/** j2snative xxxx ||*/ a) == b

		Expression left = node.getLeftOperand();
		Expression right = node.getRightOperand();
		List<?> extendedOperands = node.extendedOperands();
		boolean isExtended = (extendedOperands != null && extendedOperands.size() > 0);
		if (noDocProblem(left) && noDocProblem(right) && getConstantValue(node, true)) {
			return false;
		}
		ITypeBinding expTypeBinding = node.resolveTypeBinding();
		if (expTypeBinding == null)
			return false;
		String expTypeName = expTypeBinding.getName();

		// ?? was ??
		// boolean isToString = (expTypeName.indexOf("String") >= 0);

		boolean isToString = "String".equals(expTypeName);
		boolean isToBoolean = "boolean".equals(expTypeName);
		boolean hasNullLiteral = ((left instanceof NullLiteral) || (right instanceof NullLiteral));

		String op = node.getOperator().toString();

		// boolean isEqualType = (op.equals("==") || op.equals("!="));
		boolean isBitwise = isBitwiseBinaryOperator(node);
		boolean isComparison = (!isBitwise && "!==<=>=".indexOf(op) >= 0);
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		ITypeBinding rightTypeBinding = right.resolveTypeBinding();
		if (leftTypeBinding == null || rightTypeBinding == null)
			return false;
		String leftName = leftTypeBinding.getName();
		String rightName = rightTypeBinding.getName();

		boolean leftIsInt = (leftTypeBinding.isPrimitive()) && isIntegerType(leftName);
		boolean rightIsInt = (rightTypeBinding.isPrimitive()) && isIntegerType(rightName);

		boolean intoLong = (leftName.toLowerCase().equals("long") || rightName.toLowerCase().equals("long"));

		boolean bothBoxedLongs = (leftName.equals("Long") && rightName.equals("Long"));

		boolean isLongCall = (isLongExact()
				&& (expTypeName.equals("long") || isToBoolean && intoLong && !bothBoxedLongs && !hasNullLiteral));

		if ("/".equals(op) && leftIsInt && rightIsInt && !isLongCall) {
			// left and right are one of byte, short, int, or long
			// division must take care of this.
			addPrimitiveTypedExpression(left, null, leftName, op, right, rightName, extendedOperands, false, null);
			return false;
		}

		char pre = ' ';
		char post = ' ';
		if (isBitwise && isToBoolean) {
			// |= for boolean
			pre = '(';
			post = ')';
			buffer.append("!!(");
		}

		if (isLongCall) {
			buffer.append(getExactLongFuncOpening(op));
		}

		boolean isDirect = isBitwise && !isToBoolean && leftIsInt && rightIsInt;
		// string literal comparison check in 3.2.9.v1d
		boolean isStringComparison = (isComparison && !hasNullLiteral
				&& isInternOrLiteral(left) != isInternOrLiteral(right));
		if (isDirect || isComparison && !isStringComparison) {

			// we do not have to do a full conversion
			// possibilities include
			// numeric op numeric
			// char/Character op char/Character
			// String op String
			//
			if (!isDirect) {
				switch (leftName) {
				case "char":
				case "Character":
				case "String":
					switch (rightName) {
					case "char":
					case "Character":
					case "String":
						isDirect = true;
						break;
					default:
						break;
					}
					break;
				default:
					if (isIntegerType(leftName) && isIntegerType(rightName))
						isDirect = true;
					break;
				}
			}
			if (isDirect) {
				appendBoxingNode(left, false, null, false, false);
				buffer.append(' ');
				buffer.append(isLongCall && (!isExtended || intoLong) ? "," : op);
				buffer.append(' ');
				appendBoxingNode(right, false, null, false, false);
				if (isExtended)
					addExtendedOperands(extendedOperands, op, pre, post, isToString, isLongCall);
				if (isLongCall)
					buffer.append(')');
				return false;
			}
		}

		// left
		String trail = null;
		if (!isLongCall && (boxType(left) == UN_BOX || boxType(right) == UN_BOX)) {
			if (expTypeName.toLowerCase().equals("long")) {
				// We must look out for L / L or L / 3 or boxing to Long or Integer
				buffer.append("Clazz.toLong(");
				trail = ")";
			} else if (expTypeName.equals("int") || expTypeName.equals("Integer")) {
				buffer.append("(");
				trail = ")|0";
			}
		}

		addOperandWithJ2SDoc(left, isToString && !isBitwise);

		// op

		if (isLongCall) {
			// TODO LONG l >> 3 also l == m
			buffer.append(!isExtended || intoLong ? "," : op);
		} else {
			buffer.append(' ');
			if (("==".equals(op) || "!=".equals(op)) && !leftTypeBinding.isPrimitive() && !(left instanceof NullLiteral)
					&& !(right instanceof NullLiteral)) {
				op += "=";
			}
			buffer.append(op);
			buffer.append(' ');
		}
		// right
		boolean parenthesize = (right instanceof ParenthesizedExpression
				|| getJ2sJavadoc(right, DOC_CHECK_ONLY) != null);
		if (parenthesize) {
			buffer.append("(");
			addJ2SDoc(right);
			if (right instanceof ParenthesizedExpression)
				right = ((ParenthesizedExpression) right).getExpression();
			addOperand(right, isToString && !isBitwise);
			buffer.append(")");
		} else {
			addOperand(right, isToString && !isBitwise);
		}

		// The extended operands is the preferred way of representing deeply
		// nested expressions of the form L op R op R2 op R3... where the same
		// operator appears between all the operands (the most common case being
		// lengthy string concatenation expressions). Using the extended
		// operands keeps the trees from getting too deep; this decreases the
		// risk is running out of thread stack space at runtime when traversing
		// such trees. ((a + b) + c) + d would be translated to: leftOperand: a
		// rightOperand: b extendedOperands: {c, d} operator: +

		if (isExtended)
			addExtendedOperands(extendedOperands, op, pre, post, isToString, isLongCall);
		if (isToBoolean)
			buffer.append(post);
		if (trail != null)
			buffer.append(trail);
		if (isLongCall)
			buffer.append(")");
		return false;
	}

	private boolean isInternOrLiteral(Expression e) {
		return e instanceof StringLiteral || (e instanceof MethodInvocation)
				&& (((MethodInvocation) e).resolveMethodBinding().getName().equals("intern"));
	}

	private void addOperandWithJ2SDoc(Expression exp, boolean toString) {
		if (exp instanceof ParenthesizedExpression) {
			buffer.append("(");
			addJ2SDoc(exp);
			addOperand(((ParenthesizedExpression) exp).getExpression(), toString);
			buffer.append(")");
		} else {
			addOperand(exp, toString);
		}
	}

	public boolean visit(InstanceofExpression node) {
		Type right = node.getRightOperand();
		ITypeBinding binding = right.resolveBinding();
		if (binding == null)
			return false;
		buffer.append("Clazz.instanceOf(");
		node.getLeftOperand().accept(this);
		buffer.append(", ");
		if (right instanceof ArrayType) {
			buffer.append(clazzArray(binding, ARRAY_CLASS_LITERAL));
		} else {
			buffer.append(
					"\"" + removeBracketsAndFixNullPackageName(getUnreplacedJavaClassNameQualified(binding)) + "\"");
		}
		buffer.append(")");
		return false;
	}

	public boolean visit(Modifier node) {
		return false;
	}

	public boolean visit(NumberLiteral node) {
		buffer.append(getLiteralSafely(node.resolveConstantExpressionValue()));
		return false;
	}

	public boolean visit(NullLiteral node) {
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding != null)
			buffer.append("null");
		return true;
	}

	public boolean visit(ParenthesizedExpression node) {
		buffer.append("(");
		addJ2SDoc(node);
		node.getExpression().accept(this);
		buffer.append(")");
		return false;
	}

	/**
	 * Postfix operators (typesafe enumeration).
	 * 
	 * <pre>
	 * PostfixOperator:
	 *    <b><code>++</code></b>  <code>INCREMENT</code>
	 *    <b><code>--</code></b>  <code>DECREMENT</code>
	 * </pre>
	 */
	public boolean visit(PostfixExpression node) {
		String op = node.getOperator().toString();
		// ++x; and x++; are identical as statements.
		int mode = (node.getParent() instanceof ExpressionStatement ? PREFIX : POSTFIX);
		return addPrePost(node, node.getOperand(), op, mode);
	}

	/**
	 * Prefix operators (typesafe enumeration).
	 * 
	 * <pre>
	 * PrefixOperator:
	 *    <b><code>++</code></b>  <code>INCREMENT</code>
	 *    <b><code>--</code></b>  <code>DECREMENT</code>
	 *    <b><code>+</code></b>  <code>PLUS</code>
	 *    <b><code>-</code></b>  <code>MINUS</code>
	 *    <b><code>~</code></b>  <code>COMPLEMENT</code>
	 *    <b><code>!</code></b>  <code>NOT</code>
	 * </pre>
	 */
	public boolean visit(PrefixExpression node) {
		String op = node.getOperator().toString();
		Expression exp = node.getOperand();
		String name = exp.resolveTypeBinding().getName();
		switch (boxType(exp)) {
		default:
		case NO_BOX:
			if ("~".equals(op) && (!isLongExact() || !name.equals("long"))) {
				buffer.append(op);
				return true;
			}
			return addPrePost(node, exp, node.getOperator().toString(), PREFIX);
		case UN_BOX:
			return addPrePost(node, exp, node.getOperator().toString(), PREFIX);
		case DO_BOX:
			return addPrePost(node, exp, node.getOperator().toString(), PREFIX);
		}
	}

	public boolean visit(QualifiedName node) {
		// page.x =...

		if (getConstantValue(node, true))
			return false;
		IBinding nameBinding = node.resolveBinding();
		IVariableBinding varBinding = (nameBinding instanceof IVariableBinding ? (IVariableBinding) nameBinding : null);
		Name qualifier = node.getQualifier();
		boolean skipQualifier = false;
		if (isStatic(nameBinding) && varBinding != null) {
			addQualifiedNameForBinding(varBinding, true);
			buffer.append('.');
			skipQualifier = true;
		} else if (!isStaticBinding(varBinding) || qualifier.resolveBinding() instanceof ITypeBinding) {
			varBinding = null;
		}
		String className = null;
		ASTNode parent = node.getParent();
		if (!skipQualifier && parent != null && !(parent instanceof QualifiedName)) {
			while (qualifier instanceof QualifiedName) {
				IBinding binding = qualifier.resolveBinding();
				if (binding != null && !(binding instanceof IVariableBinding)) {
					Name xqualifier = ((QualifiedName) qualifier).getQualifier();
					if (xqualifier instanceof QualifiedName) {
						IBinding xbinding = xqualifier.resolveBinding();
						if (xbinding != null && !(xbinding instanceof IVariableBinding)) {
							qualifier = xqualifier;
							continue;
						}
					}
				}
				break;
			}
			IBinding binding = qualifier.resolveBinding();
			if (binding != null && !(binding instanceof IVariableBinding)) {
				ITypeBinding typeBinding = qualifier.resolveTypeBinding();
				if (typeBinding != null) {
					// Compiling inner Class or enum type, like:
					// RadiusData.EnumType e = RadiusData.EnumType.THREE;
					className = getUnreplacedJavaClassNameQualified(typeBinding);
					if (isStatic(nameBinding)) {
						className = getFinalJ2SClassNameQualifier(null, typeBinding, className, FINAL_ESCAPECACHE);
					} else {
						// not possible?
						dumpStack("in visit(QualifiedName) outputting raw javaClassName " + nameBinding);
					}
				}
			}
		}

		if (!skipQualifier) {
			if (varBinding != null) {
				if (qualifier instanceof SimpleName) {
					addQualifiedNameForBinding(varBinding, false);
				} else {
					buffer.append('(');
					if (className == null)
						qualifier.accept(this);
					else
						buffer.append(className);
					buffer.append(", ");
					addQualifiedNameForBinding(varBinding, false);
					buffer.append(')');
				}
			} else if (className == null) {
				node.getQualifier().accept(this);
			} else {
				buffer.append(className);
			}
			buffer.append('.');
		}
		node.getName().accept(this);
		return false;
	}

	public boolean visit(SimpleName node) {
		// var x = ...
		// this.pages ....
		if (!getConstantValue(node, true))
			buffer.append(getFinalNameSimpleQualified(node));
		return false;
	}

	/**
	 * Return a qualifier.name or C$.name
	 * 
	 * Only called by
	 * 
	 * @param node
	 * @param mBinding
	 * @param flags    METHOD_ISQUALIFIED | METHOD_PREQUALIFIED | LAMBDA_METHOD
	 * @return
	 */
	private String getFinalDotQualifiedNameForMethod(SimpleName node, IMethodBinding mBinding, int flags) {
		ITypeBinding declaringClass = mBinding.getMethodDeclaration().getDeclaringClass();
		String name = mBinding.getName();
		ASTNode parent;
		if (node == null) {
			// not possible?
			// lambda::method needs to be qualified here only if it is a functional
			// interface method
			// otherwise it will be qualified in getQualifiedSimpleNameForinvocation
			dumpStack("node is null in simpleNameInMethodBinding " + mBinding);
			return (mBinding.getDeclaringClass().getFunctionalInterfaceMethod() == null ? name : name + "$");
		}
		if ((flags & METHOD_ISQUALIFIED) == 0 && declaringClass != null && class_shortName != null
				&& !isStatic(mBinding) && (parent = node.getParent()) != null && !(parent instanceof FieldAccess)) {
			String classDot = getClassNameAndDot(parent, declaringClass, isPrivate(mBinding));
			if (classDot.length() > 0)
				return getFinalJ2SClassName(classDot + name, FINAL_PC);
		}
		return name;
	}

	public boolean visit(SimpleType node) {
		ITypeBinding binding = node.resolveBinding();
		buffer.append(
				binding == null ? node : getFinalJ2SClassName(getUnreplacedJavaClassNameQualified(binding), FINAL_PC));
		return false;
	}

	public boolean visit(StringLiteral node) {
		String s = node.getEscapedValue();
		if (s.indexOf('\\') < 0) {
			buffer.append(s);
		} else {
			// \1 doesn't work for JavaScript strict mode
			String v = htStringLiteralCache.get(s);
			if (v == null) {
				htStringLiteralCache.put(s, v = !po0.matcher(s).find() ? s : replaceOctal(s));
			}
			buffer.append(v);
		}
		return false;
	}

	// \n, \nn, \nnn octal check -- ok for general JavaScript,
	// but ECMAScript 6 does not accept this, and "use strict" does not, either.
	private Pattern po0 = Pattern.compile("([\\\\])([0-7])");
	private Pattern po00 = Pattern.compile("([\\\\])([0-7][0-7])");
	private Pattern po000 = Pattern.compile("([\\\\])([0-7][0-7][0-7])");

	private String replaceOctal(String s) {
		return po0.matcher(po00.matcher(po000.matcher(s).replaceAll("\\\\u0$2")).replaceAll("\\\\u00$2"))
				.replaceAll("\\\\u000$2");
	}

	/**
	 * SuperFieldAccess:
	 *
	 * [ ClassName . ] super . Identifier
	 *
	 */
	public boolean visit(SuperFieldAccess node) {
		buffer.append("this.");
		buffer.append(getFinalFieldName((IVariableBinding) node.getName().resolveBinding()));
		return false;
	}

	/**
	 * this or ClassName.this - just getting the qualifier here, not the whole
	 * thing?
	 * 
	 * 
	 */
	public boolean visit(ThisExpression node) {
		if (node.getQualifier() == null && class_localType != LAMBDA_EXPRESSION) {
			// not x -> this.what()
			buffer.append("this");
			return false;
		}
		// xxxx.this.x
		// xxxx.this.foo()
		String bthis = getThisRefOrSyntheticReference(node, node.resolveTypeBinding(), "this");
		buffer.append(bthis);
		return false;
	}

	private String getThisRefOrSyntheticReference(ASTNode node, ITypeBinding binding, String ref) {
		ASTNode classNode = (node == null ? null : getAbstractOrAnonymousParentForNode(node));
		if (class_isAnonymousOrLocal || classNode != null && classNode.getParent() != null // CompilationUnit
				&& classNode.getParent().getParent() != null) {
			// not the top level, but "this" refers to this class
			if (!binding.getBinaryName().equals(class_typeBinding.getBinaryName())) {
				// not the top level -- add the synthetic reference.
				// anonymous and local will not have fully qualified names
				ref = getSyntheticReference(getUnreplacedJavaClassNameQualified(binding));
			}
		}
		return ref;
	}

	public boolean visit(TypeLiteral node) {
		// Class x = Foo.class
		Type type = node.getType();
		ITypeBinding binding = type.resolveBinding();
		if (type.isPrimitiveType()) {
			// adds Integer.TYPE, Float.TYPE, etc.
			buffer.append(NameMapper.getPrimitiveTYPE(binding.getName()) + ".TYPE");
		} else if (type instanceof ArrayType) {
			buffer.append(clazzArray(binding, ARRAY_CLASS_LITERAL));
		} else {
			// BH we are creating a new Class object around this class
			// if it is an interface, then we explicitly add .$methodList$
			buffer.append("Clazz.getClass(");
			buffer.append(getFinalJ2SClassNameQualifier(null, binding, getUnreplacedJavaClassNameQualified(binding),
					FINAL_ESCAPECACHE));
			if (binding.isInterface())
				addInterfaceMethodListForLiteral(binding);
			buffer.append(")");
		}
		return false;
	}

	/**
	 * Add the list of methods in the Clazz.getClass call so that we can use them
	 * for reflection.
	 * 
	 * @param binding
	 */
	private void addInterfaceMethodListForLiteral(ITypeBinding binding) {
		buffer.append(",[");
		boolean isAnnotation = binding.isAnnotation();
		IMethodBinding[] methods = binding.getDeclaredMethods();
		for (int i = 0; i < methods.length; i++) {
			if (i > 0)
				buffer.append(",");
			String name = methods[i].getName();
			buffer.append("'").append(
					isAnnotation ? name : getFinalMethodNameWith$Params(null, methods[i], null, false, METHOD_LITERAL))
					.append("'");
		}
		buffer.append("]");
	}

	@SuppressWarnings("unchecked")
	public boolean visit(VariableDeclarationExpression node) {
		buffer.append(varOrLet);
		visitList(node.fragments(), ", ");
		return false;
	}

	public boolean visit(VariableDeclarationFragment node) {

		SimpleName name = node.getName();
		IBinding binding = name.resolveBinding();
		if (binding == null)
			return false;
		acceptPossiblyFinalVar(name); // was 0
		Expression right = node.getInitializer();
		ITypeBinding rightBinding = (right == null ? null : right.resolveTypeBinding());
		if (rightBinding == null)
			return false;
		buffer.append("=");// no space here -- need to check for last char "=" in lambda
		addExpressionAsTargetType(right, name.resolveTypeBinding(), "v", null);
		return false;
	}

	////////// END visit/endVisit ///////////

	/**
	 * fix pre/post business
	 * 
	 * @param node
	 * @param exp
	 * @param pre  (++,--,+,-,~,!) or post (++ or -- only)
	 * @param type PREFIX or POSTFIX
	 * @return
	 */
	@SuppressWarnings({ "null" })
	private boolean addPrePost(Expression node, Expression exp, String op, int prePost) {

		// we need to pass through ((((A[i]))))++ to A[i]++
		Expression e = exp, inner = null;
		while (e instanceof ParenthesizedExpression) {
			e = ((ParenthesizedExpression) e).getExpression();
			if (e instanceof ArrayAccess) {
				inner = e;
				e = null;
			}
		}
		if (inner != null) {
			exp = inner;
		}
		ASTNode parent = node.getParent();

		ITypeBinding expTypeBinding = exp.resolveTypeBinding();
		boolean isPrimitive = (expTypeBinding != null && expTypeBinding.isPrimitive());
		int boxType = boxType(exp);

		IVariableBinding varBinding = getLeftVariableBinding(exp, expTypeBinding);
		String name = (expTypeBinding == null ? null : expTypeBinding.getName());
		boolean isChar = (isPrimitive && "char".equals(name));
		boolean isShortOrByte = ("short".equals(name) || "byte".equals(name));
		boolean isLong = ("long".equals(name));
		boolean toCharCode = (varBinding == null || !"char".equals(varBinding.getName()));
		String term = "";
		if (isStaticBinding(varBinding)) {
			// new Test_Static().y++ where y is static
			if ((isChar || !haveDirectAccess(exp))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression)) {

				buffer.append("(");
				term = ")";
			}
			addLeftSidePrefixName(exp);
		} else {
			varBinding = null;
		}
		if (isLong && isLongExact()) {
			if (op.equals("-"))
				op = "$neg"; // $neg; unary minus
			else if (op.equals("+"))
				op = "$dup"; // $dup; unary plus
			addFieldNameAndBoxExpression(exp, varBinding, op, prePost != PREFIX, true, toCharCode);
			return false;
		}
		switch (prePost) {
		default:
		case PREFIX:
			if (isChar || isShortOrByte) {
				if (varBinding == null)
					buffer.append("(");
				addPrePostfix(exp, (varBinding == null ? parent : null), varBinding, op, true, name.charAt(0));
				if (varBinding == null)
					buffer.append(")");
			} else {
				if (!op.equals("+") && boxType != UN_BOX) {
					buffer.append(op);
				}
				addFieldNameAndBoxExpression(exp, varBinding, (boxType == UN_BOX ? op : null), false, false,
						toCharCode);
			}
			break;
		case POSTFIX:
			if (isChar || isShortOrByte) {
				addPrePostfix(exp, parent, varBinding, op, false, name.charAt(0));
			} else {
				addFieldNameAndBoxExpression(exp, varBinding, (boxType == UN_BOX ? op : null), true, false, false);
				if (boxType != UN_BOX) {
					buffer.append(op);
				}
			}
			break;
		}
		buffer.append(term);
		return false;
	}

	/**
	 * 
	 * @param left
	 * @param parent     null for prefix
	 * @param varBinding
	 * @param op
	 * @param b
	 */
	private void addPrePostfix(Expression left, ASTNode parent, IVariableBinding varBinding, String op,
			boolean isPrefix, char type) {
		boolean isChar = (type == 'c');
		if (isChar)
			type = 'p';
		boolean isStatement = (parent instanceof Statement && !(parent instanceof ReturnStatement));
		boolean addAnonymousWrapper = (!isChar || !isPrefix && !isStatement);
		String key = "$" + type + (isChar ? "$" : "$[0]");
		if (addAnonymousWrapper) {
			buffer.append("(" + key + "=");
			trailingBuffer.addType("" + type);
		}
		if (isChar) {
			if (addAnonymousWrapper) {
				addFieldNameAndBoxExpression(left, varBinding, null, false, false, false);
				buffer.append(",");
			}
			addFieldNameAndBoxExpression(left, varBinding, null, false, false, false);
			buffer.append(isChar ? "=String.fromCharCode(" : "=");
			addFieldNameAndBoxExpression(left, varBinding, null, false, false, false);
			buffer.append(CHARCODEAT0).append("++".equals(op) ? "+1" : "-1");
			buffer.append(")");
		} else {
			// byte or short

			// Key in all cases is to return $b$[0], not just $b$[0]++ or ++$b$[0],
			// as that first converts to an integer, and then applies ++ in JavaScript.
			// In Java, ++ first operates on the byte, then that result is converted to
			// an integer.

			boolean wasArray = temp_processingArrayIndex;
			temp_processingArrayIndex = (left instanceof ArrayAccess);
			if (isPrefix) {
				buffer.append(op);
			}
			int ptArray = (temp_processingArrayIndex ? buffer.length() : -1);
			addFieldNameAndBoxExpression(left, varBinding, null, false, false, false);
			int ptArray2 = (temp_processingArrayIndex ? buffer.length() : -1);
			buffer.append(",");
			addFieldNameAndBoxExpression(left, varBinding, null, false, false, false);
			buffer.append("=");
			if (temp_processingArrayIndex)
				fixAssignArray((ArrayAccess) left, ptArray, ptArray2, wasArray);
			if (isPrefix) {
				// i = ($b$[0]=++b,b=$b$[0]);
				// ($b$[0]=++b,b=$b$[0]);
				buffer.append(key);
			} else {
				// postfix
				// statement: ($b$[0]=b,b=(++$b$[0] ,$b$[0]))
				// nonstatement: i = ($b$[0]=b,b=(++$b$[0] ,$b$[0]),--$b$[0],$b$[0]);
				buffer.append("(");
				buffer.append(op);
				buffer.append(key);
				if (isStatement) {
					key += ")";
				} else {
					buffer.append(",");
					buffer.append(key);
					buffer.append("),");
					buffer.append(op.equals("++") ? "--" : "++");
					buffer.append(key);
				}
			}
		}
		if (addAnonymousWrapper) {
			buffer.append("," + key + ")");
		}
	}

	private final static int NO_BOX = 0;
	private final static int DO_BOX = 1;
	private final static int UN_BOX = 2;
	private final static int PREFIX = 4;
	private final static int POSTFIX = 8;

	private static int boxType(Expression exp) {
		return (exp.resolveBoxing() ? DO_BOX : exp.resolveUnboxing() ? UN_BOX : NO_BOX);
	}

	private boolean isIntegerType(String type) {
		return (type != null && type.length() > 1 && "int long byte short".indexOf(type) >= 0
				&& !(type.equals("long") && isLongExact()));
	}

	static boolean isPrivate(IBinding b) {
		return b != null && Modifier.isPrivate(b.getModifiers());
	}

	static boolean isStatic(IBinding b) {
		return b != null && Modifier.isStatic(b.getModifiers());
	}

	static boolean isTransient(IBinding b) {
		return b != null && Modifier.isTransient(b.getModifiers());
	}

	static boolean isStatic(BodyDeclaration b) {
		return Modifier.isStatic(b.getModifiers());
	}

	/**
	 * new int[5] becomes Clazz.array(Integer.TYPE, [5])
	 */
	private final static int ARRAY_DIM_ONLY = 0;
	/**
	 * new byte[] {'a', 2, 3, 4, 5} becomes Clazz.array(Byte.TYPE, -1, ["a", 2, 3,
	 * 4, 5]);
	 */
	private final static int ARRAY_INITIALIZED = -1;

	/**
	 * int[][].class becomes Clazz.array(Integer.TYPE, -2)
	 */
	private final static int ARRAY_CLASS_LITERAL = 1;

	/**
	 *
	 * @param type
	 * @param dimFlag
	 * @return JavaScript for array creation
	 */
	private String clazzArray(ITypeBinding type, int dimFlag) {
		ITypeBinding ebinding = type.getElementType();
		if (ebinding == null)
			ebinding = type; // creating for Enum
		String params = (ebinding.isPrimitive() ? NameMapper.getPrimitiveTYPE(ebinding.getName()) + ".TYPE"
				: getFinalJ2SClassNameQualifier(null, ebinding, null, FINAL_ESCAPECACHE))
				+ (dimFlag == ARRAY_DIM_ONLY ? "" : ", " + (Math.abs(dimFlag) * type.getDimensions() * -1));
		return "Clazz.array(" + params + (dimFlag > 0 ? ")" : "");
	}

	////////////////////////////////

	/**
	 * check to change charAt to charCodeAt
	 * 
	 * @param right
	 * @param pt
	 */
	private void addCharCodeAt(Expression right, int pt) {
		String charCodeAt0 = CHARCODEAT0;
		if (right instanceof MethodInvocation) {
			// if possible, just replace "charAt" with "charCodeAt"
			MethodInvocation m = (MethodInvocation) right;
			if (m.resolveMethodBinding().getKey().equals("Ljava/lang/String;.charAt(I)C")) {
				if ((pt = buffer.indexOf(".charAt", pt)) >= 0) {
					charCodeAt0 = "Code" + buffer.substring(pt + 5);
					buffer.setLength(pt + 5);
				}
			}
		}
		buffer.append(charCodeAt0);
	}

	/**
	 * Append an expression, coercing to primitive numeric types of the target
	 * parameter if needed. Used for Method arguments and return values, as well as
	 * variable declaration fragments, where we know the target type and no operator
	 * is involved.
	 * 
	 * 
	 * @param exp
	 * @param targetType ITypeBinding or TYPE or string
	 * @param op         just an identifier of the context: = for assignment, r for
	 *                   return statement, v for variable declaration fragment, p
	 *                   for method parameter, q for first parameter of indexOf or
	 *                   lastIndexOf, which are officially ints
	 */
	private void addExpressionAsTargetType(Expression exp, Object targetType, String op, List<?> extendedOperands) {
		if (targetType == null
				|| exp instanceof CastExpression && ((CastExpression) exp).getExpression() instanceof NullLiteral) {
			addJ2SDoc(exp);
			buffer.append("null");
			return;
		}
		ITypeBinding expTypeBinding = exp.resolveTypeBinding();
		if (expTypeBinding == null)
			return;
		// BH: Question: When does typeBinding == null?
		// A: when there is a compilation error, I think.
		// OK, now we have the same situation as any operand.
		String rightName = expTypeBinding.getName();
		if (rightName.equals("char") && op == "q") {
			appendBoxingNode(exp, false, null, false, false);
			return;
		}
		String paramName = (exp.resolveTypeBinding().isArray() ? ";"
				: targetType instanceof ITypeBinding ? ((ITypeBinding) targetType).getName() : targetType.toString());
		boolean isNumeric = isIntegerType(paramName);
		if ((isNumeric || isLongExact() && rightName.equals("long")
				&& (paramName.equals("double") || paramName.equals("float")) || paramName.equals("char"))
				&& boxType(exp) == NO_BOX) {
			// using operator "m" to limit int application of $i$

			addPrimitiveTypedExpression(null, null, paramName, op, exp, rightName, extendedOperands, false, null);
		} else {

			// char f() { return Character }
			// Character f() { return char }
			// int f() { return Character }
			appendBoxingNode(exp, isNumeric, null, false, false);
		}
	}

	private void addExtendedOperands(List<?> extendedOperands, String op, char pre, char post, boolean isToString,
			boolean isLongCall) {
		buffer.append(' ');
		if (isLongCall)
			op = ",";
		for (Iterator<?> iter = extendedOperands.iterator(); iter.hasNext();) {
			Expression exp = (Expression) iter.next();
			buffer.append(op);
			buffer.append(pre);
			addOperand(exp, isToString);
			buffer.append(post);
		}
	}

	private void addFieldNameAndBoxExpression(Expression exp, IVariableBinding qualifier, String op, boolean isPost,
			boolean exactLong, boolean toCharCode) {
		if (qualifier != null) {
			// adds a static initializer for (new XXXX()).staticField = ....
			// but actually this is done elsewhere
			exp = (exp instanceof QualifiedName ? ((QualifiedName) exp).getName()
					: exp instanceof FieldAccess ? ((FieldAccess) exp).getName() : exp);
		}
		appendBoxingNode(exp, toCharCode, op, isPost, exactLong);
	}

	/**
	 * add a reference to the static field prior to defining it.
	 * 
	 * @param left
	 */
	private void addLeftSidePrefixName(Expression left) {
		if (left instanceof QualifiedName) {
			if ((left = ((QualifiedName) left).getQualifier()) instanceof SimpleName)
				return;
		} else if (left instanceof FieldAccess) {
			if ((left = ((FieldAccess) left).getExpression()) instanceof ThisExpression)
				return;
		} else {
			return;
		}
		left.accept(this);
		buffer.append(", ");
	}

	/**
	 * 
	 * @param methodDeclaration
	 * @param parameterTypes
	 * @param methodIsVarArgs
	 * @param arguments
	 * @param flags             METHOD_INDEXOF | 0
	 */
	@SuppressWarnings("null")
	private void addMethodArguments(IMethodBinding methodDeclaration, ITypeBinding[] parameterTypes,
			boolean methodIsVarArgs, List<?> arguments, int flags) {
		String post = ", ";
		int nparam = parameterTypes.length;
		int argCount = arguments.size();
		boolean isIndexOf = ((flags & METHOD_INDEXOF) != 0);
		for (int i = 0; i < nparam; i++) {
			ITypeBinding paramType = parameterTypes[i];
			Expression arg = (i < argCount ? (Expression) arguments.get(i) : null);
			String op = (isIndexOf && i == 0 ? "q" : "p");
			if (i == nparam - 1) {
				// BH: can't just check for an array; it has to be an array with
				// the right component type
				// NOTE: This is still not quite right.
				// It will not pass a true primitive numeric array type --
				// int[]... value will be [1,2,3], not Int32Array(1,2,3)
				// Also, for a generic, we could have a problem if there is only one
				// argument, and it is an array.

				ITypeBinding atype = null;
				if (nparam != argCount // clearly need [ ]
						|| methodIsVarArgs // only one argument - might need [ ]
								&& !(arg instanceof NullLiteral) // unless it's null
								&& (!(atype = arg.resolveTypeBinding()).isArray() // otherwise if it is not an array
										|| !atype.getComponentType()
												.isAssignmentCompatible(paramType.getComponentType().getErasure()))
				// or it is not compatible
				) {
					String close;
					if (NameMapper
							.isPackageOrClassNonqualified(methodDeclaration.getDeclaringClass().getQualifiedName())) {
						// calls to DOMNode.setAttrs(DOMNode node, Object... attr) need not be wrapped
						// by a Java array type
						close = "";
					} else {
						buffer.append(clazzArray(paramType.getComponentType(), ARRAY_DIM_ONLY));
						buffer.append(", -1, ");
						close = ")";
					}

					buffer.append("[");
					for (int j = i; j < argCount; j++) {
						addExpressionAsTargetType((Expression) arguments.get(j), paramType, op, null);
						if (j != argCount - 1) {
							buffer.append(", ");
						}
					}
					buffer.append("]").append(close);
					break;
				}
				post = "";
			}
			addExpressionAsTargetType(arg, paramType, op, null);
			buffer.append(post);
		}
	}

	/**
	 * Do not allow char or Character in a switch or array; instead use int
	 * 
	 * @param exp
	 */
	private void addNonCharacter(Expression exp) {
		String name = exp.resolveTypeBinding().getName();
		switch (name) {
		case "char":
		case "Character":
		case "Byte":
		case "Short":
		case "Integer":
		case "Long":
			addOperand(exp, false);
			break;
		default:
		case "String":
			exp.accept(this);
			break;
		}
	}

	/**
	 * add the operand, checking to see if it needs some adjustment:
	 * 
	 * (a) String + x where x is {double/float} requires boxing
	 * Double/Float(x).toString()
	 * 
	 * (b) String + x where x is {Double/Float} requires added .toString()
	 * 
	 * (c) Character and char to numeric requires addition of .$c()
	 * 
	 * 
	 * 
	 * @param exp
	 * @param isToString
	 */
	private void addOperand(Expression exp, boolean isToString) {

		ITypeBinding binding = exp.resolveTypeBinding();
		String name = binding.getName();
		if (isToString) {
			String prefix = null, suffix = null;
			switch (name) {
			case "double":
				prefix = "new Double(";
				suffix = ").toString()";
				break;
			case "float":
				prefix = "new Float(";
				suffix = ").toString()";
				break;
			case "Double":
			case "Float":
				prefix = "";
				suffix = ".toString()";
				break;
			case "long":
				if (isLongExact()) {
					prefix = getExactLongFuncOpening("$s");
					suffix = ")";
					break;
				}
				//$FALL-THROUGH$
			default:
				exp.accept(this);
				break;
			}
			if (prefix != null) {
				buffer.append(prefix);
				exp.accept(this);
				buffer.append(suffix);
			}
		} else if (!binding.isPrimitive() || !"char".equals(name)) {
			appendBoxingNode(exp, !isToString, null, false, false);
		} else {
			// to numeric only
			// oddly enough, 'c' is considered a simple
			Object constValue = null;
			if (exp instanceof CharacterLiteral) {
				buffer.append(0 + ((CharacterLiteral) exp).charValue());
			} else if ((constValue = getConstant(exp)) != null && constValue instanceof Character) {
				buffer.append(0 + ((Character) constValue).charValue());
			} else if (exp instanceof SimpleName || exp instanceof QualifiedName) {
				int pt = buffer.length();
				appendBoxingNode(exp, false, null, false, false);
				if (pt == buffer.length() - 3 && buffer.charAt(pt) == '\'') {
					char c = buffer.charAt(pt + 1);
					buffer.setLength(pt);
					buffer.append((int) c);
				} else {
					buffer.append(CHARCODEAT0);
				}
			} else if (exp instanceof PrefixExpression || exp instanceof PostfixExpression
					|| exp instanceof ParenthesizedExpression) {
				appendBoxingNode(exp, false, null, false, false);
				buffer.append(CHARCODEAT0);
			} else {
				int pt = buffer.length();
				buffer.append("(");
				appendBoxingNode(exp, false, null, false, false);
				buffer.append(")");
				addCharCodeAt(exp, pt);
			}
		}
	}

	/**
	 * A general method to handle implicit casting.
	 * 
	 * @param left
	 * @param assignmentBinding
	 * @param leftName
	 * @param op
	 * @param right
	 * @param rightName
	 * @param extendedOperands
	 * @param isAssignment      (+=, &=, etc)
	 * @param mustBoxAll        Integer != b
	 * @return true if is an assignment and a = (a op b) was used
	 */
	private boolean addPrimitiveTypedExpression(Expression left, IVariableBinding assignmentBinding, String leftName,
			String op, Expression right, String rightName, List<?> extendedOperands, boolean isAssignment,
			ITypeBinding allBinding) {
		// byte|short|int|long /= ...
		// convert to proper number of bits

		// byte a |= right

		// becomes

		// a = ($b$[0] = a | right, $b$[0])

		// also boolean |= boolean op will be !!|
		String classIntArray = null;
		String more = null, less = null;
		String prefix = (isAssignment ? "=" : "");
		boolean fromChar = "char".equals(rightName);
		boolean fromFloat = ("float double".indexOf(rightName) >= 0);
		// boolean toFloat = ("float double".indexOf(leftName) >= 0);
		boolean fromIntType = ("long int short byte".indexOf(rightName) >= 0);
		boolean toLong = "long".equals(leftName);
		boolean fromLong = "long".equals(rightName);
		boolean isExtended = (extendedOperands != null && extendedOperands.size() > 0);
		boolean isToExactLong = (toLong || leftName.equals("Long")) && isLongExact();
		boolean isExactLong = isToExactLong;
		boolean addParens = (op != "r" || fromChar || right instanceof ParenthesizedExpression);
		boolean isDiv = "/".equals(op);
		boolean toChar = false;
		boolean isBoolean = false;
		switch (leftName) {
		case "double":
			if (fromLong && isLongExact()) {
				less = getExactLongFuncOpening("$dval");
				more = ")";
			}
			break;
		case "float":
			if (fromLong && isLongExact()) {
				less = getExactLongFuncOpening("$fval");
				more = ")";
			}
			break;
		case "Boolean":
			isBoolean = true;
			break;
		case "boolean":
			less = "!!(";
			more = ")";
			addParens = true;
			break;
		case "char":
			if (!fromChar) {
				prefix += "String.fromCharCode(";
				more = ")";
				addParens = false;
			}
			toChar = true;
			break;
		default:
			// boxed
			break;
		case "long":
			if (!isAssignment && (!fromLong && !isExactLong || isExactLong && fromFloat)) {
				less = "Clazz.toLong(";
				more = ")";
				addParens = true;
			} else if (!isLongExact()) {
				left = null;
			}
			break;
		case "int":
			if (!isDiv && (op != null && fromIntType && !fromLong || fromChar
			// in fromIntType || rightName.equals("short") || rightName.equals("byte")
			)) {
				left = null;
			} else if (fromLong && isLongExact()) {
				isExactLong = true;
				less = getExactLongFuncOpening("$ival");
				more = ")";
			} else {
				more = "|0)";
				addParens = true;
			}
			break;
		case "short":
			if (!isDiv && (rightName.equals("short") || rightName.equals("byte"))) {
				left = null;
				break;
			}
			//$FALL-THROUGH$
		case "byte":
			// TODO long check for array processing here
			if (!isDiv && rightName.equals("byte")) {
				left = null;
				break;
			}
			if (temp_processingArrayIndex) {
				more = "|0)";
				addParens = true;
			} else {
				classIntArray = "$" + leftName.charAt(0) + "$[0]"; // $i$, etc.
				trailingBuffer.addType(leftName);
			}
			break;
		}
		boolean wasArray = temp_processingArrayIndex;
		if (isAssignment && left == null) {
			// has to come from setting left = null, above
			buffer.append(op);
		}
		buffer.append(prefix);
		if (classIntArray != null) {
			if (addParens)
				buffer.append("(");
			buffer.append(classIntArray).append(" = ");
			temp_processingArrayIndex = true;
		} else if (less != null) {
			buffer.append(less);
		} else if (more == "|0)") {
			buffer.append("(");
		}
		if (left != null) {

			// a += b

			if (allBinding != null) {
				// Boolean uses Boolean.from(!!(a | b)
				buffer.append(leftName + ".valueOf$" + getJSTypeCode(leftName.toLowerCase()))
						.append(isBoolean ? "(!!(" : "(");
			}
			if (isExactLong) {
				buffer.append(this.getExactLongFuncOpening(op));
				op = ",";
				// oddity if is to int
				more = (isToExactLong ? ")" : "))");
			}
			// No unboxing for exact longs?
			addFieldNameAndBoxExpression(left, assignmentBinding, null, false, false, false);
			buffer.append(op);
			if (isAssignment) {
				if (fromFloat && isExactLong) {
					buffer.append("Clazz.toLong");
				}
				buffer.append("(");
			}
		}
		if (!appendBoxingNode(right, fromChar, null, false, false) && fromChar && !toChar) {
			buffer.append(CHARCODEAT0);
		}
		if (isExtended) {
			addExtendedOperands(extendedOperands, op, ' ', ' ', false, isExactLong);
		}
		if (left != null && isAssignment) {
			buffer.append(")");
		}
		if (allBinding != null)
			buffer.append(isBoolean ? "))" : ")");
		if (classIntArray != null) {
			// this is necessary because in JavaScript,
			// a = new Int8Array(1)
			// (a[0]=3.4) will be 3.4, not 3:
			//
			// (a[0]=3.4)
			// 3.4
			//
			// so we need:
			//
			// (a[0]=3.4, a[0])
			// 3
			buffer.append(", ").append(classIntArray);
			if (addParens)
				buffer.append(")");
			temp_processingArrayIndex = wasArray;
		} else if (more != null) {
			buffer.append(more);
		}
		return (isAssignment && left != null);
	}

	/**
	 * 3.2.10 introduces a 2-word semi-mutable long equivalent in the form of an
	 * array [r,m,s], where r is the lower 16 bits of the long, and m is the high 48
	 * bits. s is a sign bit, (-1, 0, or 1).
	 * 
	 * This works because above 2**52, the double format stores "sparse" integers
	 * that are 2**12 apart. So we could use 12 low bits here. 16 just sounded a bit
	 * better. With that we can use the 53 bits of the integer double plus our low
	 * 16 to put us over the 64-bit size of a long.
	 * 
	 * The idea here is to generate this constant already in its JavaScript form.
	 * 
	 * long modulo 0x10000
	 * 
	 * @param val
	 * @return
	 */
	private String getLiteralSafely(Object val) {
		if (val instanceof Long) {
			long l = ((Long) val).longValue();
			if (l > JAVASCRIPT_MAX_LONG || l < -JAVASCRIPT_MAX_LONG) {
				boolean isNeg = (l < 0);
				if (isNeg) {
					l = -l;
				}
				long r = l & 0xFFFFFF;
				long m = l >>> 24;
				val = "[" + r + "," + m + "," + (isNeg ? -1 : l == 0 ? 0 : 1) + "]";
			}
		}
		return val.toString();
	}

	/**
	 * for example: new Test_Static().y++
	 * 
	 * @param varBinding
	 * @param isStatic
	 */
	private void addQualifiedNameForBinding(IVariableBinding varBinding, boolean isStatic) {
		ITypeBinding declaringClass = varBinding.getDeclaringClass();
		String javaClassName = getUnreplacedJavaClassNameQualified(declaringClass);
		isStatic = isStatic(varBinding);
		String finalQualifiedName = getFinalJ2SClassName(javaClassName, FINAL_PC);
		if (isStatic) {// && (isStatic || finalQualifiedName.length() < 2 ||
						// finalQualifiedName.charAt(1) != '$')) {
			finalQualifiedName = getFinalJ2SClassNameQualifier(null, declaringClass, javaClassName, FINAL_ESCAPECACHE);
		}
		buffer.append(finalQualifiedName);
	}

	/**
	 * Determine the qualifier for a method or variable.
	 * 
	 * In the case of private nonstatic methods, this is "p$<n>".
	 * 
	 * For general fields, this will be "this.".
	 * 
	 * For nonstatic fields in outer classes, we need a synthetic references,
	 * this.b$[className] that points to the outer object, which may be one or more
	 * levels higher than this one.
	 * 
	 * Anonymous inner classes may reference either a superclass method/field or one
	 * in its declaring class stack.
	 * 
	 * @param node                  either a method or field or local variable
	 * @param declaringClass        the class that declares this variable
	 * @param isPrivateAndNotStatic
	 * @return qualifier for method or variable
	 */
	private String getClassNameAndDot(ASTNode node, ITypeBinding declaringClass, boolean isPrivateAndNotStatic) {

		String name = getUnreplacedJavaClassNameQualified(declaringClass);
		String ret = "";
		int superLevel = 0;
		boolean isThis = false;

		// Search parents of this node for an anonymous or abstract class declaration
		while (node != null) {
			boolean isAnonymous = (node instanceof AnonymousClassDeclaration);
			ITypeBinding typeBinding = (isAnonymous ? ((AnonymousClassDeclaration) node).resolveBinding()
					: node instanceof AbstractTypeDeclaration ? ((AbstractTypeDeclaration) node).resolveBinding()
							: null);
			if (typeBinding != null) {
				// is anonymous or abstract class declaration
				superLevel++;
				if (isSuperType(declaringClass, typeBinding)) {
					if (isPrivateAndNotStatic) {
						ret = getPrivateVar(declaringClass, false) + ".";
						isThis = true;
					} else if (superLevel == 1) {
						ret = "this.";
						isThis = (class_localType != LAMBDA_EXPRESSION);
					}
					name = getUnreplacedJavaClassNameQualified(typeBinding);
					break;
				}
			}
			node = node.getParent();
		}
		return (isThis ? ret : getSyntheticReference(name) + ".");
	}

	/**
	 * Get the synthetic reference for inner classes that reference "this" for outer
	 * classes
	 * 
	 * 
	 * @param className
	 * @return "this" + .qualifier
	 */
	private String getSyntheticReference(String className) {
		b$count++;
		return "this" + (className.equals("java.lang.Object") || className.equals("Object") ? ""
				// : className.equals(this$0Name) ? ".this$0"
				: ".b$['" + getFinalJ2SClassName(className, FINAL_RAW) + "']");
	}

	/**
	 * box or unbox as necessary
	 * 
	 * @param element
	 * @param toCharCode true to append .c$(), not .valueOf();
	 * @param op         TODO
	 * @param isPost     TODO
	 * @param exactLong  TODO
	 * @return true if boxing or unboxing
	 */
	private boolean appendBoxingNode(ASTNode element, boolean toCharCode, String op, boolean isPost,
			boolean exactLong) {
		if (!(element instanceof Expression)) {
			element.accept(this);
			return false;
		}

		Expression exp = (Expression) element;
		ITypeBinding typeBinding = exp.resolveTypeBinding();
		if (exactLong) {
			appendBoxFunction(exp, typeBinding, op == null ? "$ival" : op, null, isPost);
			return true;
		}
		if (exp.resolveUnboxing() && !typeBinding.isPrimitive()) {
			appendBoxFunction(exp, typeBinding, op, toCharCode ? ").$c()" : ").valueOf()", isPost);
			return true;
		}

		// Double > x will be unboxed
		// Character == 'c' will be unboxed
		// f$Integer(int) will be boxed

		if (exp.resolveBoxing() && typeBinding.isPrimitive()) {
			// expression is the site of a boxing conversion
			String name = typeBinding.getName();
			String t = getJSTypeCode(name);
			switch (name) {
			case "char":
				name = "Character";
				break;
			case "int":
				name = "Integer";
				break;
			default:
				name = Character.toUpperCase(name.charAt(0)) + name.substring(1);
				break;
			}
			buffer.append(name + ".valueOf$" + t + "(");
			element.accept(this);
			buffer.append(")");
			return true;
		}
		if ((exp instanceof ParenthesizedExpression) || (exp instanceof PrefixExpression)
				|| (exp instanceof InfixExpression) || (exp instanceof PostfixExpression)
				|| !getConstantValue(exp, true)) {
			if (temp_iref == null) {
				element.accept(this);
			} else {
				buffer.append("I$0.pop()." + temp_iref);
				temp_iref = null;
			}

		}
		return false;
	}

	private void appendBoxFunction(Expression exp, ITypeBinding typeBinding, String op, String term, boolean isPost) {
		boolean isLongExact = (term == null);
		String prefix = (isLongExact ? getExactLongFuncOpening(op) : "");
		buffer.append("(");
		int pt = -1;
		int incr = 0;
		if (op != null) {
			switch (op) {
			case "!":
				prefix = "!((";
				term += "))";
				break;
			case "~":
				term = (isLongExact ? "))" : ".$inv$()" + term);
				break;
			case "$dup": // unary plus, longExact only ($dup)
			case "$neg":// unary minus, longExact only ($neg)
			case "-":
				term = (isLongExact ? "))" : ".$neg$()" + term);
				break;
			case "+":
				// unnecessary -- Java will unbox and rebox this
				break;
			case "++":
				incr = 1;
				pt = buffer.length();
				break;
			case "--":
				incr = -1;
				pt = buffer.length();
				break;
			default:
				break;
			}

		}
		if (pt < 0) {
			buffer.append(prefix);
		}
		String iref = temp_iref;
		temp_iref = null;
		String s1 = null;

		// int pt1 = buffer.length();
		if (pt >= 0 && iref == null && (exp instanceof FieldAccess) && !haveDirectAccess(exp)
				&& !isStatic(typeBinding)) {
			iref = pushFieldQualifier(exp);
			s1 = "I$0[I$0.length-1]." + iref;
		} else if (iref == null) {
			exp.accept(this);
		} else {
			buffer.append(pt < 0 ? "I$0.pop()." : "I$0[I$0.length-1].").append(iref);
		}
		if (pt >= 0) {
			// ++L, --L, L++, L--
			String s = buffer.substring(pt);
			buffer.setLength(pt);
			if (s.startsWith("(") && s.endsWith(")")) {
				// (L) ==> L
				// L ==> L=L...
				s = s.substring(1, s.length() - 1);
			}
			if (s1 == null)
				s1 = s;
			String s2 = (iref == null ? s : "I$0.pop()." + iref);
			term = (isLongExact ? "," : ".$incr$(") + incr + ")";

			if (exp instanceof ArrayAccess) {
				String[] a = splitArrayAccess(s);
				// a[0] delivers the array, a[1] the (updated?) array pointer
				// we need this because we need to have access to slot to increment
				buffer.append("Clazz.incrAN(" + a[0] + "," + a[1] + "," + incr + "," + isPost + ")");
				term = ")";
			} else {
				if (isPost) {
					// [L, L=L.xxx()][0]
					buffer.append("[");
					buffer.append(s);
					buffer.append(",");
					buffer.append(s1);
					buffer.append("=");
					buffer.append(prefix);
					buffer.append(s2);
					term += "][0])";
				} else {
					// (L=L.xxx())
					buffer.append(s);
					buffer.append("=");
					buffer.append(prefix);
					buffer.append(s2);
					term += ")";
				}
			}
		}
		if (term != null)
			buffer.append(term);
	}

	private String getExactLongFuncOpening(String op) {
		switch (op == null ? "" : op) {
		case "$s": // toString()
		case "$dval": // f = (float) longValue
		case "$fval": // d = (double) longValue
		case "$ival": // i = (int) longValue
		case "$dup": // j = k
		case "$neg": // j = -k
			break;
		case "++":
		case "--":
			op = "$inc";
			break;
		case "<<":
			op = "$sl";
			break;
		case ">>":
			op = "$sr";
			break;
		case ">>>":
			op = "$usr";
			break;
		case "+":
			op = "$add";
			break;
		case "-":
			op = "$sub";
			break;
		case "*":
			op = "$mul";
			break;
		case "/":
			op = "$div";
			break;
		case "%":
			op = "$mod";
			break;
		case "^":
			op = "$xor";
			break;
		case "&":
			op = "$and";
			break;
		case "|":
			op = "$or";
			break;
		case "~":
			op = "$not";
			break;
		case "==":
			op = "$eq";
			break;
		case "!=":
			op = "$ne";
			break;
		case ">=":
			op = "$ge";
			break;
		case ">":
			op = "$gt";
			break;
		case "<":
			op = "$lt";
			break;
		case "<=":
			op = "$le";
			break;
		default:
			log("J2S Error: exact long operator not found for " + op);
			break;
		}
		return "Long." + op + "(";
	}

	/**
	 * Safely find the last element of an array A[...][...][THIS]
	 * 
	 * @param s
	 * @return ["A[...][...]","THIS"]
	 */
	private String[] splitArrayAccess(String s) {
		int i = s.lastIndexOf(']');
		int n = 1;
		char quote = '\0';
		while (n > 0 && --i >= 0) {
			switch (s.charAt(i)) {
			default:
				break;
			case '\'':
				if (quote == '\'') {
					quote = 0;
				} else if (quote == 0) {
					quote = '\'';
				}
				break;
			case '"':
				if (quote == '"') {
					quote = 0;
				} else if (quote == 0) {
					quote = '"';
				}
				break;
			case '[':
				if (quote == 0)
					n -= 1;
				break;
			case ']':
				if (quote == 0)
					n += 1;
				break;
			}
		}
		return new String[] { s.substring(0, i), s.substring(i + 1, s.length() - 1) };
	}

	private boolean checkSimpleBooleanOperator(String op) {
		return (op.equals("^") || op.equals("|") || op.equals("&"));
	}

	/**
	 * Check to see if we have a static variable.
	 * 
	 * @param varBinding
	 * @return
	 */
	private boolean isStaticBinding(IVariableBinding varBinding) {
		return (isStatic(varBinding) && varBinding.getDeclaringClass() != null);
	}

	/**
	 * Note that this method does not do J2S replacements - that happens later.
	 * 
	 * @param binding
	 * @return
	 */
	String getUnreplacedJavaClassNameQualified(ITypeBinding binding) {
		// about binding.isLocal()
		//
		// Returns whether this type binding represents a local class.
		// A local class is any nested class or enum type not declared as a member of
		// another class or interface. A local class is a subspecies of nested type, and
		// mutually exclusive with member types. For anonymous classes, which are
		// considered a subspecies of local classes, this method returns true.
		// Note: This deviates from JLS3 14.3, which states that anonymous types are not
		// local types since they do not have a name. Also note that interfaces and
		// annotation types cannot be local.
		//
		// about binding.getBinaryName()
		//
		// Note that in some cases, the binary name may be unavailable. This may happen,
		// for example, for a local type declared in unreachable code.
		//
		// about binding.getKey() (not relevant)
		//
		// Note that the key for member value pair bindings is not yet implemented. This
		// method returns null for that kind of bindings.
		//

		if (binding == null) {
			return null;
		}
		if (isTypeOrArrayType(binding))
			return binding.toString();
		binding = binding.getErasure();
		String name = null, bindingKey;
		if ((binding.isAnonymous() || binding.isLocal()) && (name = binding.getBinaryName()) == null
				&& (bindingKey = binding.getKey()) != null)
			name = bindingKey.substring(1, bindingKey.length() - 1).replace('/', '.');
		if (name == null) {
			name = binding.getQualifiedName();
			if (name.length() == 0) {
				name = binding.getBinaryName();
				if (name == null) {
					// no binary name, no qualified name,
					log(">>name null?? " + "bn=" + binding.getBinaryName() + " qn=" + binding.getQualifiedName() + " n="
							+ binding.getName() + " e=" + binding.getErasure().getName() + " k=" + binding.getKey()
							+ " isAnon=" + binding.isAnonymous() + " isLocal=" + binding.isLocal() + " isWild="
							+ binding.isWildcardType() + " isRaw=" + binding.isRawType());

					name = ""; // <? extends Byte>
				}
			}
		}
		return name;
	}

	private static boolean isTypeOrArrayType(ITypeBinding binding) {
		return binding.isTypeVariable() || binding.isArray() && binding.getComponentType().isTypeVariable();
	}

	private String getUnreplacedJavaClassNameSuperNoBrackets(ITypeBinding typeBinding) {
		ITypeBinding superclass = typeBinding.getSuperclass();
		if (superclass == null)
			return null;
		String qualifiedName = removeBracketsAndFixNullPackageName(getUnreplacedJavaClassNameQualified(superclass));
		return ("java.lang.Object".equals(qualifiedName) || "java.lang.Enum".equals(qualifiedName) ? null
				: qualifiedName);
	}

	private int lambdaCount = 0;

	private String getMyJavaClassNameLambda(boolean andIncrement) {
		return package_name + "." + class_shortName.replace('.', '$')
				+ (class_shortName.indexOf("$lambda") >= 0 ? "$" : "$lambda")
				+ (andIncrement ? ++lambdaCount : lambdaCount);
	}

	static String stripJavaLang(String name) {
		// shorten java.lang.XXX.YYY but not java.lang.xxx.YYY
		return (!name.startsWith("java.lang.") || name.equals("java.lang.Object")
				|| name.length() > 10 && !Character.isUpperCase(name.charAt(10)) ? name : name.substring(10));
	}

	/**
	 * From visit(SimpleName) only.
	 * 
	 * @param node
	 * @return
	 */
	private String getFinalNameSimpleQualified(SimpleName node) {
		// xxx.yyy.zzz...
		IBinding binding = node.resolveBinding();
		ASTNode parent = node.getParent();
		if (parent == null) {
			// this does not appear to be reachable
			dumpStack("parent is null in returnFinalNameSimpleQualified");
			return node.toString();
		}
		char leadingChar = getLastCharInBuffer();
		boolean isQualified = (leadingChar == '.');
		// looking for "." or '"' here.
		if (isQualified && parent instanceof QualifiedName) {
			if (binding instanceof IVariableBinding)
				return getFinalFieldName((IVariableBinding) binding);
			// TODO could be a problem here is we have a conversion of a class in .j2s.
			// package or class-qualified:
			// java.lang.Math.xxx "lang" or "Math"
			return node.toString();
		}
		if (parent instanceof ClassInstanceCreation && !(binding instanceof IVariableBinding)) {
			if (binding == null) {
				// not possible?
				dumpStack(" binding null in ClassInstanceCreation");
			}
			return getFinalJ2SClassName(getUnreplacedJavaClassNameQualified(node.resolveTypeBinding()), FINAL_PC);
		}
		if (binding instanceof IVariableBinding)
			return getFinalNameForNode(node, leadingChar, (IVariableBinding) binding);

		if (binding instanceof IMethodBinding) {
// Arises when a lambda expression is used as a method parameter,
// in the one case we have, as a parameter to a constructor in java.util.stream.Collectors:
// In this case, "add" is the name:
//
//		              return new CollectorImpl<>(collectionFactory, 
//			                       Collection<T>::add,
//		                           (r1, r2) -> { r1.addAll(r2); return r1; },
//                                 CH_ID);
//		    }
// ...			
//	        CollectorImpl(
//  			Supplier<A> supplier,
//              BiConsumer<A, T> accumulator,
//              BinaryOperator<A> combiner,
//              Set<Characteristics> characteristics
//          ) {
//              this(supplier, accumulator, combiner, castingIdentity(), characteristics);
//          }			
			return getFinalDotQualifiedNameForMethod(node, (IMethodBinding) binding,
					(isQualified ? METHOD_ISQUALIFIED : METHOD_NOTSPECIAL));
		}

		// a class reference

		// static reference such as explicit "java.lang.Double" in Point2D
		ITypeBinding typeBinding = node.resolveTypeBinding();
		if (typeBinding == null)
			return node.getFullyQualifiedName();
		String name = getFinalJ2SClassName(getUnreplacedJavaClassNameQualified(typeBinding), FINAL_PC);
		return NameMapper.getJavaScriptCollisionIdentifier(name, true);
	}

	/**
	 * Get the final JavaScript name for a local variable, static or nonstatic
	 * field, which may or may not be a method qualifier.
	 * 
	 * Local variables are possibly prefixed with "this.$finals$."
	 * 
	 * @param node
	 * @param lastBufferChar looking for period, single quote, or double quote
	 * @param varBinding
	 * @return a fully qualified variable name
	 */
	private String getFinalNameForNode(SimpleName node, char lastBufferChar, IVariableBinding varBinding) {
		String qualifier = "";
		IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
		ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
		String name = varBinding.getName();
		String j2sName = getFinalFieldOrLocalVariableName(declaringClass, name);
		if (isStatic(varBinding)) {
			// a static field
			if (lastBufferChar != '.' && lastBufferChar != '"' && lastBufferChar != '\'') {
				// an unescaped and not explicitly qualified name
				qualifier = getFinalJ2SClassNameQualifier(null, declaringClass, null, FINAL_ESCAPECACHE) + ".";
			}
		} else if (declaringClass != null) {
			// a nonstatic field
			ASTNode parent = node.getParent();
			if (parent == null) {
				// not possible?
				dumpStack("null parent??");
			}
			if (class_shortName == null) {
				// not possible?
				dumpStack("null class_shortName??");
			}
			if (class_shortName != null && lastBufferChar != '.' && parent != null && !(parent instanceof FieldAccess))
				qualifier = getClassNameAndDot(parent, declaringClass, false);
		} else {
			// declaring class is null -- a local variable or method argument
			IMethodBinding meth;
			if (class_isAnonymousOrLocal && isFinalOrEffectivelyFinal(varBinding)
					&& (meth = varBinding.getDeclaringMethod()) != null // not a field
					&& meth != meth_current
			// testing here -- why this? && meth.getKey().indexOf(".lambda$") < 0
			) {
				qualifier = "this.$finals$.";
				if (!class_visitedFinalVars.contains(varBinding)) {
					class_visitedFinalVars.add(varBinding);
					package_htFinalVarToJ2sName.put(varBinding, j2sName);
				}
			}
		}
		return qualifier + j2sName;
	}

	// different class naming options
	private static final int FINAL_RAW = 0;
	private static final int FINAL_P = 1;
	private static final int FINAL_C = 2;
	private static final int FINAL_NEW = 4;

	private static final int FINAL_ESCAPE = 8;
	private static final int FINAL_CACHE = 16;
	private static final int FINAL_LAMBDA = 32;
	private static final int FINAL_STATIC = 64;
	private static final int FINAL_PC = FINAL_P | FINAL_C;
	private static final int FINAL_ESCAPECACHE = FINAL_ESCAPE | FINAL_CACHE;
	private static final int FINAL_BRACKETS = 128;

	/**
	 * Provide access to C$.$clinit$ when a static method is called or a static
	 * field is accessed.
	 * 
	 * @param methodQualifier        SimpleName qualifier in qualifier.methodName()
	 *                               method invocation
	 * @param declaringJavaClassName the declaring class of the method or variable
	 * @param flags                  or of FINAL_ESCAPE except for static nonprivate
	 *                               field names; FINAL_CACHE generally true, but
	 *                               not for initial class definitions or for some
	 *                               nonstatic references
	 * @return name wrapped if necessary by nested Class.load() calls
	 */
	String getFinalJ2SClassNameQualifier(Name methodQualifier, ITypeBinding declaringJavaClass,
			String declaringJavaClassName, int flags) {
		// BH: The idea here is to load these on demand.
		// It will require synchronous loading,
		// but it will ensure that a class is only
		// loaded when it is really needed.

		if (declaringJavaClassName == null)
			declaringJavaClassName = getUnreplacedJavaClassNameQualified(declaringJavaClass);

		boolean isStatic = ((flags & FINAL_STATIC) == FINAL_STATIC);
		boolean doEscape = isStatic || ((flags & FINAL_ESCAPE) == FINAL_ESCAPE);
		boolean doCache = ((flags & FINAL_CACHE) == FINAL_CACHE);
		String name = removeBracketsAndFixNullPackageName(declaringJavaClassName);
		if (name.equals("_.")) {
// 2020.11.20 -- 3.2.9-v1q  generated by			
//		    static <E> java.util.List<E> of(E e1, E e2, E e3, E e4) {
//		        return new ImmutableCollections.ListN<>(e1, e2, e3, e4);
//		    }

			return "java.lang.Object";
		}
		doEscape &= !NameMapper.isClassKnown(name);
		if (!doEscape) {
			if (methodQualifier != null) {
				// a method invocation with a Name as qualifier expression
				methodQualifier.accept(this);
				return "";
			}
			return stripJavaLang(name);
		}
		if (doCache && name.equals(class_fullName)) {
			return (class_defpt < 0 ? "C$" : "C$$"); // anonymous class will be like this
		}

		// lambda classes will always be defined at this point. No need to cache them
		if (name.indexOf("$lambda") >= 0)
			return getFinalJ2SClassName(name, FINAL_P);
		return getFinalClazzLoadI$Reference(declaringJavaClass, name, doCache, ((flags & FINAL_NEW) == FINAL_NEW));
	}

	/**
	 * Turns "test.Test0.Exc1.Exc2" into "['test.Test0','.Exc1','.Exc2']"
	 * 
	 * For Clazz.newClass we want an array if the superclass is an inner class so
	 * that the outer class is guaranteed to be loaded first. The same goes for I$[]
	 * dynamic class loading and interfaces, (but interfaces are handled
	 * differently).
	 * 
	 * @param packageName   Java package name or "_"
	 * @param javaClassName
	 * @return array listing classes that need to be loaded in order
	 */
	private String getFinalInnerClassList(ITypeBinding javaClass, String javaClassName) {
		IPackageBinding p = javaClass.getPackage();
		String packageName = (p == null ? NULL_PACKAGE : p.getName());
		if (javaClassName == null) {
			javaClassName = getUnreplacedJavaClassNameQualified(javaClass);
		}
		if (javaClassName.indexOf("$lambda") >= 0)
			return "'" + getFinalJ2SClassName(javaClassName, FINAL_RAW) + "'";
		String name = removeBracketsAndFixNullPackageName(javaClassName).substring(packageName.length() + 1);
		String[] parts = name.split("\\.");
		String s = packageName + "." + parts[0];
		int len = parts.length;
		String ret = "'" + stripJavaLang(NameMapper.checkClassReplacement(s)) + "'";
		// add inner classes
		for (int i = 1; i < len; i++)
			ret += ",'." + parts[i] + "'";
		return (ret.indexOf(",") >= 0 ? "[" + ret + "]" : ret);
	}

	/**
	 * Register a qualified static name as an import var I$[n] unless it ends with
	 * "Exception". Create a loading list for inner classes.
	 * 
	 * 'pkg.Foo.Bar', for example, becomes ['pkg.Foo','.Bar'] for Clazz.load().
	 * 
	 * If caching, put into the code $I$(i,n), where
	 * 
	 * i is the index into the I$[] array, starting at 1 ([0] is reserved for the
	 * list of classes we are creating here), and
	 * 
	 * n is 1 if this is a Clazz.new_($I$ call. This flag, if 1, will not run
	 * $static$() i.e. Java's clinit.
	 * 
	 * @param javaClassName
	 * @param doCache
	 * @return the string to include in the buffer
	 */
	private String getFinalClazzLoadI$Reference(ITypeBinding javaClass, String javaClassName, boolean doCache,
			boolean isNew) {
		String s = getFinalInnerClassList(javaClass, javaClassName);
		if (doCache) {
			Integer n = package_htIncludeNames.get(s);
			if (n == null && !s.endsWith("Exception'")) {
				// count starts at 1, because i$[0] is the list
				package_htIncludeNames.put(s, n = new Integer(++package_includeCount[0]));
				package_includes.append(package_includeCount[0] == 1 ? ",I$=[[0," : ",").append(s);
			}
			if (n != null)
				return "$I$(" + n + (isNew ? ",1" : "") + ")";
		}
		return "Clazz.load(" + s + ")";
	}

	/**
	 * Get the final JavaScript class name from a Java class name. Options include
	 * shortening the name with C$. and/or with P$. Brackets are removed. no-package
	 * names are prepended with "_." "java.lang." is removed where appropriate.
	 * 
	 * @param javaClassName
	 * @param flags         FINAL_C to allow C$, FINAL_P to allow P$, FINAL_PC for
	 *                      both of those; FINAL_RAW to just remove brackets, fix
	 *                      null package, and strip java.lang
	 * @return the final JavaScript name
	 */
	String getFinalJ2SClassName(String javaClassName, int flags) {
		if (javaClassName == null)
			return null;
		String name = javaClassName;
		if ((flags & FINAL_BRACKETS) == 0)
			name = removeBracketsAndFixNullPackageName(name);

		if (((flags & FINAL_C) != 0)) {
			String myJavaClassName = class_fullName;
			if (name.equals(myJavaClassName)) {
				return "C$";
			}
			if (name.startsWith(myJavaClassName + ".")) {
				return "C$." + name.substring(myJavaClassName.length() + 1);
			}
		}
		name = stripJavaLang(NameMapper.checkClassReplacement(name));
		return ((flags & FINAL_P) == 0 ? name : checkPackageP$Name(name));
	}

	/**
	 * strips java.lang, removes brackets, may return P$
	 * 
	 * @param thisPackageName null to not allow P$
	 * @param javaName
	 * @return
	 */
	private String checkPackageP$Name(String javaName) {
		return (javaName.startsWith(package_name + ".") ? "P$." + javaName.substring(package_name.length() + 1)
				: javaName.equals(package_name) ? "P$" : javaName);
	}

	/**
	 * exp is xxxx or xxxx.yyyy or className.this but not new XYZ().x
	 * 
	 * @param exp(
	 * @return
	 */
	private boolean haveDirectAccess(Expression exp) {
		Expression f = null;
		if (exp instanceof ParenthesizedExpression && (f = ((ParenthesizedExpression) exp).getExpression()) != exp) {
			return haveDirectAccess(f);
		}
		return exp instanceof SimpleName
				|| (exp instanceof QualifiedName && ((QualifiedName) exp).getQualifier() instanceof SimpleName)
				|| (exp instanceof CastExpression) || (exp instanceof ThisExpression)
				|| (exp instanceof SuperFieldAccess)
				|| (exp instanceof FieldAccess && (((f = ((FieldAccess) exp).getExpression()) instanceof ThisExpression)
						|| f != exp && haveDirectAccess(f)));
	}

	/**
	 * The left operand is primitive boolean. Check to see if the operator is ^, |,
	 * or &, or if the left or right operand is such an expression.
	 * 
	 * If so, we are going to box this all as a Boolean(....).valueOf()
	 * 
	 * @param node
	 * @return
	 */
	private boolean isBitwiseBinaryOperator(InfixExpression node) {
		if (checkSimpleBooleanOperator(node.getOperator().toString())) {
			return true;
		}
		Expression left = node.getLeftOperand();
		if (left instanceof InfixExpression) {
			if (isBitwiseBinaryOperator((InfixExpression) left)) {
				return true;
			}
		}
		Expression right = node.getRightOperand();
		if (right instanceof InfixExpression) {
			if (isBitwiseBinaryOperator((InfixExpression) right)) {
				return true;
			}
		}
		return false;
	}

	private void visitList(List<ASTNode> list, String separator) {
		for (Iterator<ASTNode> iter = list.iterator(); iter.hasNext();) {
			ASTNode node = iter.next();
			appendBoxingNode(node, false, null, false, false);
			if (iter.hasNext()) {
				buffer.append(separator);
			}
		}
	}

	/**
	 * Add needed synthetic methods to either the $static$ block of a class or the
	 * $defaults$ block of an interface
	 * 
	 * @param type
	 * @param abstractMethodList list of methods that MIGHT need synthetic bridges
	 * @param buf
	 * @param isInterface
	 */
	private void addSyntheticBridges(ITypeBinding type, List<IMethodBinding> abstractMethodList, StringBuffer buf,
			boolean isInterface) {
		if (abstractMethodList == null || abstractMethodList.size() == 0)
			return;
		String s = "";
		List<String> overrides = new ArrayList<>();
		for (int i = 0; i < abstractMethodList.size(); i++) {
			IMethodBinding m = abstractMethodList.get(i);
			overrides.clear();
			getOverriddenMethods(type, m, overrides, true);
			if (overrides.size() == 0)
				continue;
			String a = getFinalMethodNameWith$Params(m.getName(), m, null, false, METHOD_NOTSPECIAL);
			for (int j = overrides.size(); --j >= 0;)
				s += "\n/*$synth$*/C$.prototype['" + a + "']=C$.prototype['" + overrides.get(j) + "'];\n";
		}
		if (s.length() == 0)
			return;
		if (isInterface) {
			buf.append(s);
		} else {
			// see java.text.CollationKey, but $synth$ is never called.
			buf.append("\nC$.$synth$=function(){").append(s).append("}\n");
		}
	}

	private static ASTNode getAbstractOrAnonymousParentForNode(ASTNode node) {
		ASTNode parent = node.getParent();
		while (parent != null && !(parent instanceof AbstractTypeDeclaration)
				&& !(parent instanceof AnonymousClassDeclaration)) {
			parent = parent.getParent();
		}
		return parent;
	}

	/**
	 * 
	 * This is the method used to get the name or names to write into the method
	 * declaration Clazz.newMeth(...). Bracketed returns tell Clazz to create
	 * multiple aliases for the same method.
	 * 
	 * @param mBinding
	 * @param isConstructor
	 * @param mode
	 * @param lambdaType
	 * @param alias              name provided using at_j2sAlias
	 * @param exportNames        TODO
	 * @param node
	 * @param abstractMethodList
	 * 
	 * @return j2s-qualified name or an array of j2s-qualified names
	 */
	String getMethodNameWithSyntheticBridgeForDeclaration(IMethodBinding mBinding, boolean isConstructor, int mode,
			int lambdaType, String alias, HashMap<String, String> exportNames, boolean exportAll) {
		List<String> names = new ArrayList<String>();
		String nodeName = mBinding.getName();
		String methodName = (isConstructor ? "c$" : nodeName);
		ITypeBinding methodClass = mBinding.getDeclaringClass();
		int mtype = (lambdaType == LAMBDA_METHOD || lambdaType == LAMBDA_EXPRESSION ? METHOD_LAMBDA_M
				: METHOD_NOTSPECIAL);
		String qname = getFinalMethodNameWith$Params(methodName, mBinding, null, false, METHOD_NOTSPECIAL);
		names.add(qname);
		if (mtype != METHOD_NOTSPECIAL && !qname.endsWith("$")) {
			// $O$O$O for lambda as well
			names.add(getFinalMethodNameWith$Params(methodName, mBinding, null, false, mtype));
		}
		if (alias != null) {
			if (alias.length() == 0) {
				// just "@j2sAlias" with no name given, or public and @j2sExport for the class
				int pt = methodName.indexOf("$");
				if (pt == 0) {
					// just concerned this is possible. Maybe not?
					alias = null;
				} else {
					alias = exportNames.get(methodName);
					if (alias == null) {
						alias = (pt < 0 ? methodName : methodName.substring(0, pt));
					} else {
						// skipping xxxx$ because that could be already xxxx$();
						alias += (alias.endsWith("$") ? "$" : "$$");
					}
					exportNames.put(methodName, alias);
				}
			}
			if (alias != null)
				names.add(alias);
		}
		if ((mode & METHOD_ADD_GENERIC) != 0) {
			// interesting case of this in Test_ClassBase, where different interfaces and
			// the superclass
			// all require synthetic references
			getOverriddenMethods(methodClass, mBinding, names, true);
		}
		if ((mode & METHOD_FULLY_QUALIFIED) == 0)
			names.add(ensureMethod$Name(methodName, mBinding, getUnreplacedJavaClassNameQualified(methodClass)));
		if ((mode & METHOD_$_QUALIFIED) != 0 && !methodName.equals(qname)
				&& !classHasNoParameterMethod(methodClass, methodName)) {
			names.add(methodName + (methodName.indexOf("$") >= 0 ? "" : methodName.equals("c") ? "$$" : "$"));
		}
		if ((mode & METHOD_UNQUALIFIED) != 0) {
			names.add(methodName);
		}
		if (names.size() == 1 || mode == METHOD_FULLY_QUALIFIED_JUST_ONE) {
			return "'" + qname + "'";
		}
		qname = ",'" + qname + "'";
		for (int i = 1; i < names.size(); i++) {
			String next = ",'" + names.get(i) + "'";
			if (qname.indexOf(next) < 0)
				qname += next;
		}
		qname = qname.substring(1);
		return (qname.indexOf(",") >= 0 ? "[" + qname + "]" : qname);
	}

	/**
	 * v 3.2.7 method of getting all overridden method JS signatures; much simpler
	 * (and now correct!).
	 * 
	 * see Test_ClassBase for an example where the return is more than one method.
	 * 
	 * @param binding
	 * @param mBinding
	 * @param list
	 * @param isTop
	 * @return a list of names such as put$O$O
	 */
	private void getOverriddenMethods(ITypeBinding binding, IMethodBinding mBinding, List<String> list, boolean isTop) {
		// get the actual generic binding
		binding = binding.getErasure();
		if (!isTop && binding.getTypeParameters().length > 0) {
			IMethodBinding[] methods = binding.getDeclaredMethods();
			for (int i = methods.length; --i >= 0;) {
				if (mBinding.overrides(methods[i])) {
					ITypeBinding[] types1 = methods[i].getParameterTypes();
					String params1 = getParamsAsString(types1.length, null, types1, false);
					ITypeBinding[] types = mBinding.getParameterTypes();
					if (!params1.equals(getParamsAsString(types.length, null, types, false))) {
						if (!list.contains(params1))
							list.add(mBinding.getName() + params1);
					}
					getOverriddenMethods(binding, methods[i], list, true);
					return;
				}
			}
		}

		// note that a method could override methods in one or more interface or
		// superclass with different signatures.
		// see Test_ClassBase for an example of this.

		if (hasSuperClass(binding)) {
			getOverriddenMethods(binding.getSuperclass(), mBinding, list, false);
		}
		// check all interfaces
		ITypeBinding[] interfaces = binding.getInterfaces();
		for (int i = interfaces.length; --i >= 0;) {
			getOverriddenMethods(interfaces[i], mBinding, list, false);
		}
	}

	private static boolean classHasNoParameterMethod(ITypeBinding methodClass, String methodName) {
		while (methodClass != null) {
			IMethodBinding[] methods = methodClass.getDeclaredMethods();
			for (int i = methods.length; --i >= 0;) {
				IMethodBinding m = methods[i];
				if (m.getName().equals(methodName) && m.getParameterTypes().length == 0 && !isPrivate(m))
					return true;
			}
			methodClass = methodClass.getSuperclass();
		}
		return false;
	}

	/**
	 * Add postfix "$" is the method is:
	 * 
	 * (a) static or not private, and
	 * 
	 * (b) there is no field name that covers it, and
	 * 
	 * (c) it doesn't already have a $ in it after the 3rd character (P$..., C$...
	 * excepted), and
	 * 
	 * (d) the name is not "c$", which is reserved for function(s) { s.charCodeAt(0)
	 * }, and
	 * 
	 * (e) the method is not an explicitly nonqualified method (namely, toString())
	 * or in an explicitly nonqualified class
	 * 
	 * @param j2sName
	 * @param mBinding
	 * @param className
	 * @return
	 */
	private static String ensureMethod$Name(String j2sName, IMethodBinding mBinding, String className) {
		if (isPrivate(mBinding) && !isStatic(mBinding) || NameMapper.fieldNameCoversMethod(j2sName)
				|| j2sName.indexOf("$", 2) >= 0 || j2sName.equals("c$") || className != null
						&& NameMapper.isMethodNonqualified(className, mBinding.getName(), mBinding.getKey()))
			return j2sName;
		// c() must be changed to c$$, not c$, which is the constructor
		return (j2sName.equals("c") ? "c$$" : j2sName + "$");
	}

	/**
	 * finish the generic foo || bar fix
	 * 
	 * @param pt                    start of this method invocation in buffer
	 * @param qname                 qualified name, containing " || "
	 * @param isPrivateAndNotStatic switch $O$ to p$; already using .apply(this)
	 */
	private void postFixGeneric$OMethodName(int pt, String qname, boolean isPrivateAndNotStatic, String privateVar) {
		// this is a Java8-compatibility hack. The class is accessing a
		// type-parameterized method which it might not be overriding
		// and might be nongeneric in Java 6.
		// this.adItem$TE(o) becomes (($o$=this).addItem$TE ||
		// $o$.addItem$O).apply($o$,[o]);
		if (isPrivateAndNotStatic) {
			buffer.insert(pt, "(");
			buffer.append(qname.replace("$o$", privateVar)).append(")");
			return;
		}
		buffer.insert(pt, "(($o$=");
		buffer.append(qname).append(").apply($o$,[");
		buffer.insert(buffer.lastIndexOf(".", buffer.lastIndexOf("|")), ")");
		trailingBuffer.addType("o");
	}

	/**
	 * Construct the method parameter string $B$I$O...
	 * 
	 * @param nParams
	 * @param genericTypes
	 * @param paramTypes
	 * @param toObject
	 * @return
	 */
	private String getParamsAsString(int nParams, String[] genericTypes, ITypeBinding[] paramTypes, boolean toObject) {
		StringBuffer sbParams = new StringBuffer();
		// if this is a method invocation and has generics, then we alias that
		boolean haveGeneric = false;
		for (int i = 0; i < nParams; i++) {
			// I guess erasure is not useful here
			// this is things like Map<String, String> vs Map
			// if (!paramTypes[i].equals(paramTypes[i].getErasure())) {
			// buffer Debug(i + " " + paramTypes[i].getName() + " " +
			// paramTypes[i].getErasure().getName());
			// }
			String type = j2sGetParamCode(paramTypes[i]);
			if (genericTypes != null) {
				String genericType = genericTypes[i];
				if (genericType != null) {
					int pt = genericType.indexOf("|");
					if (genericType.indexOf("|null") < 0) {
						type = genericType.substring(0, pt);
						haveGeneric = true;
					}
				}
			}
			sbParams.append("$").append(type);
		}
		return (toObject && !haveGeneric ? null : sbParams.toString());
	}

	private String j2sGetParamCode(ITypeBinding binding) {
		if (binding == null)
			return null;
		binding = binding.getErasure();
		if (binding.isTypeVariable()) {
			// TK, TV, TXYZ
			return "O";
		}
		String name = removeBrackets(getUnreplacedJavaClassNameQualified(binding));
		if (isTypeOrArrayType(binding)) {
			// TK[]
			int pt = name.indexOf("[");
			name = "O" + (pt < 0 ? "" : name.substring(pt));
		} else if (!binding.isPrimitive()) {
			name = NameMapper.fixPackageName(name);
		}
		String arrays = null;
		int pt = name.indexOf("[");
		if (pt >= 0) {
			arrays = name.substring(pt + (name.indexOf("[L") >= 0 ? 1 : 0));
			name = name.substring(0, pt);
		}
		// NOTE: If any of these are changed, they must be changed in j2sSwingJS
		// as well.
		// NOTE: These are the same as standard Java Spec, with the exception of
		// Short, which is "H" instead of "S"
		name = getJSTypeCode(name);
		if (arrays != null) {
			arrays = arrays.replaceAll("\\[\\]", "A");
			name += arrays;
		}
		return name;
	}

	private String getJSTypeCode(String className) {
		switch (className) {
		case "boolean":
			return "Z";
		case "byte":
			return "B";
		case "character":
		case "char":
			return "C";
		case "double":
			return "D";
		case "float":
			return "F";
		case "integer":
		case "int":
			return "I";
		case "long":
			return "J";
		case "short":
			return "H"; // differs from Java Spec so we can use S for String
		case "java.lang.Object":
		case "Object":
			return "O";
		case "java.lang.String":
			return "S";
		default:
			return stripJavaLang(NameMapper.checkClassReplacement(className)).replace('.', '_');
		}
	}

	/**
	 * Remove <...> in class and method names
	 * 
	 * @param qName
	 * @return
	 */
	static String removeBracketsAndFixNullPackageName(String qName) {
		if (qName == null)
			return null;
		qName = NameMapper.fixPackageName(qName);
		return removeBrackets(qName);
	}

	private static String removeBrackets(String qName) {
		if (qName.indexOf('<') < 0)
			return qName;
		StringBuffer buf = new StringBuffer();
		int ltCount = 0;
		char c;
		for (int i = 0, len = qName.length(); i < len; i++) {
			switch (c = qName.charAt(i)) {
			case '<':
				ltCount++;
				continue;
			case '>':
				ltCount--;
				continue;
			default:
				if (ltCount == 0)
					buf.append(c);
				continue;
			}
		}
		return buf.toString().trim();
	}

	/**
	 * Returns <code>true</code> if the given type is a super type of a candidate.
	 * <code>true</code> is returned if the two type bindings are identical
	 * 
	 * @param possibleSuperType the type to inspect
	 * @param type              the type whose super types are looked at
	 * @return <code>true</code> iff <code>possibleSuperType</code> is a super type
	 *         of <code>type</code> or is equal to it
	 */
	private static boolean isSuperType(ITypeBinding possibleSuperType, ITypeBinding type) {
		if (type.isArray() || type.isPrimitive()) {
			return false;
		}
		String name;
		if (possibleSuperType.isEqualTo(type)
				|| (name = possibleSuperType.getBinaryName()) != null && name.equals(type.getBinaryName()))
			return true;
		ITypeBinding superClass = type.getSuperclass();
		if (superClass != null && isSuperType(possibleSuperType, superClass))

			return true;

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

	private static boolean hasSuperClass(ITypeBinding typeBinding) {
		ITypeBinding superclass = typeBinding.getSuperclass();
		return (superclass != null && !"java.lang.Object".equals(superclass.getQualifiedName()));
	}

	private Object getConstant(Expression exp) {
		return (noDocProblem(exp) ? exp.resolveConstantExpressionValue() : null);
	}

	private boolean noDocProblem(Expression exp) {
		return (getJ2sJavadoc(exp, DOC_CHECK_ONLY) == null
				|| !(exp instanceof PrefixExpression || exp instanceof InfixExpression
						|| exp instanceof PostfixExpression || exp instanceof ParenthesizedExpression));
	}

	/**
	 * If given expression is constant value expression, return its value string; or
	 * character or return null.
	 * 
	 * @param node
	 * @return
	 */
	private boolean getConstantValue(Expression node, boolean andWrite) {
		if (node == null)
			return false;
		Object constValue = getConstant(node);
		if (constValue == null)
			return false;
		StringBuffer sb = null;
		if (constValue instanceof Number) {
			if (!andWrite)
				return true;
			sb = new StringBuffer();
			String s = getLiteralSafely(constValue);
			if (s.startsWith("-") && buffer.charAt(buffer.length() - 1) == '-')
				sb.append(' ');
			sb.append(s);
		} else if (constValue instanceof Character || constValue instanceof Boolean) {
			if (!andWrite)
				return true;
			sb = new StringBuffer();
			if (constValue instanceof Character) {
				sb.append('"');
				addChar(((Character) constValue).charValue(), sb);
				sb.append('"');
			} else {
				sb.append(constValue);
			}
		} else if (constValue instanceof String) {
			if (!andWrite)
				return true;
			sb = new StringBuffer();
			addString((String) constValue, sb);
		}
		if (sb == null)
			return false;
		if (andWrite) {
			// this is just in case we have (/** @j2sNative 1?x:*/y);
			boolean needParen = (node instanceof ParenthesizedExpression);
			if (needParen)
				buffer.append("(");
			addJ2SDoc(node);
			buffer.append(sb);
			if (needParen)
				buffer.append(")");
		}
		return true;
	}

	private void addString(String str, StringBuffer sb) {
		int length = str.length();
		sb.append('"');
		for (int i = 0; i < length; i++)
			addChar(str.charAt(i), sb);
		sb.append('"');
	}

	private static void addChar(char c, StringBuffer buffer) {
		switch (c) {
		case '\\':
		case '\'':
		case '\"':
			buffer.append('\\');
			buffer.append(c);
			break;
		case '\r':
			buffer.append("\\r");
			break;
		case '\n':
			buffer.append("\\n");
			break;
		case '\t':
			buffer.append("\\t");
			break;
		case '\f':
			buffer.append("\\f");
			break;
		default:
			if (c < 32 || c > 127) {
				String hexStr = "0000" + Integer.toHexString(c);
				buffer.append("\\u").append(hexStr.substring(hexStr.length() - 4));
			} else {
				buffer.append(c);
			}
			break;
		}
	}

////////////////////////

	private void setMapJavaDoc(PackageDeclaration node) {
		ASTNode root = node.getRoot();
		package_mapBlockJavadoc = new HashMap<Integer, List<Javadoc>>();

		// gat a list of all @j2s blocks

		List<ASTNode> list = new ArrayList<ASTNode>();
		List<?> commentList = ((CompilationUnit) root).getCommentList();
		for (int i = 0, n = commentList.size(); i < n; i++) {
			Comment comment = (Comment) commentList.get(i);
			if (comment instanceof Javadoc) {
				List<?> tags = ((Javadoc) comment).tags();
				if (tags.size() != 0) {
					for (Iterator<?> itr = tags.iterator(); itr.hasNext();) {
						TagElement tagEl = (TagElement) itr.next();
						String tagName = tagEl.getTagName();
						if (tagName == null || !tagName.startsWith("@j2sNative") && !tagName.startsWith("@j2sIgnore")
								&& !tagName.startsWith("@j2sNoLongExact") && !tagName.startsWith("@j2sAsync")
								&& !tagName.startsWith("@j2sDebug") && !tagName.startsWith("@j2sAlias"))
							continue;
						list.add(comment);
						break;
					}
				}
			}
		}
		if (list.isEmpty())
			return;

		// now add all the associated elements

		try {
			root.accept(new NativeDoc.BlockVisitor(list));
		} catch (@SuppressWarnings("unused") IndexOutOfBoundsException e) {
			// normal termination from item after last j2sjavadoc
		}
		// and link javadoc to its closest block

		for (int i = 0, n = list.size() - 1; i < n;) {
			Javadoc doc = (Javadoc) list.get(i++);
			ASTNode item = list.get(i);
			int factor = 1;
			if (item instanceof Javadoc) {
				logErr("!!Note: @j2s doc ignored because nothing follows it: " + doc.getStartPosition() + "\n" + doc);
			} else {
				if (item == null) {
					factor = -1;
					item = list.get(++i);
				}
				i++;
				Integer pt = Integer.valueOf(item.getStartPosition() * factor);
				List<Javadoc> docs = package_mapBlockJavadoc.get(pt);
				if (docs == null)
					package_mapBlockJavadoc.put(pt, docs = new ArrayList<Javadoc>());
				docs.add(doc);
			}
		}
	}

	private void setNoLongExact(boolean b) {
		log("J2S setting noLongExact for " + class_fullName);
		class_noLongExact = b;
	}

	/**
	 * check any node other than the package node for @j2sNative or @j2sDebug
	 * or @j2sIgnore
	 */
	public boolean preVisit2(ASTNode node) {
		return (node instanceof ParenthesizedExpression || !addJ2SDoc(node) || !(node instanceof Block));
	}

	private final static int DOC_CHECK_ONLY = 0;
	@SuppressWarnings("unused")
	private final static int DOC_ADD_PRE = 1;
	private final static int DOC_ADD_POST = 2;

	/**
	 * 
	 * @param node
	 * @return true if code was added
	 */
	private boolean addJ2SDoc(ASTNode node) {
		List<Javadoc> j2sJavadoc;
		if (package_mapBlockJavadoc == null || node instanceof MethodDeclaration || node instanceof Initializer
				|| (j2sJavadoc = getJ2sJavadoc(node, DOC_CHECK_ONLY)) == null || node instanceof InfixExpression
						&& ((InfixExpression) node).getLeftOperand() instanceof ParenthesizedExpression)
			return false;
		boolean ret = NativeDoc.addJ2sJavadocs(buffer, j2sJavadoc, node instanceof Block);
		j2sJavadoc.clear();
		return ret;
	}

	/**
	 * @param node
	 * @return alias
	 */
	private String getJ2SAliasName(ASTNode node) {
		List<Javadoc> j2sJavadoc;
		if (package_mapBlockJavadoc == null || (j2sJavadoc = getJ2sJavadoc(node, DOC_CHECK_ONLY)) == null)
			return null;
		for (int i = 0; i < j2sJavadoc.size(); i++) {
			Javadoc doc = j2sJavadoc.get(i);
			List<?> tags = doc.tags();
			TagElement tag = null;
			if (tags == null || tags.size() == 0 || (tag = NativeDoc.getTag(tags, "@j2sAlias")) == null)
				continue;
			List<?> fragments = tag.fragments();
			return (fragments == null ? null : fragments.size() == 0 ? "" : fragments.get(0).toString().trim());
		}
		return null;
	}

	private List<Javadoc> getJ2sJavadoc(ASTNode node, int mode) {

		// package_mapBlockJavadoc will be null for a no-package class like VARNA.java,
		// which are not allowed to use @j2sNative

		if (package_mapBlockJavadoc == null)
			return null;
		List<Javadoc> docs;
		if (mode == DOC_ADD_POST) {
			docs = package_mapBlockJavadoc.remove(Integer.valueOf(-1 * node.getStartPosition()));
			if (docs != null)
				NativeDoc.addJ2sJavadocs(buffer, docs, false);
		} else {
			docs = package_mapBlockJavadoc.get(Integer.valueOf(node.getStartPosition()));
		}
		return docs;
	}

	/**
	 * Method with "j2s*" tag.
	 * 
	 * @param node
	 * @return false if we have @j2sIngore for this BodyDeclaration
	 */
	private boolean checkAnnotations(BodyDeclaration node, int mode) {
		if (mode != CHECK_ANNOTATIONS_ONLY) {
			if (NativeDoc.hasJ2STag(node.getJavadoc(), "@j2sIgnore"))
				return false;
		}
		List<?> modifiers = node.modifiers();
		if (modifiers != null && modifiers.size() > 0) {

			for (Iterator<?> iter = modifiers.iterator(); iter.hasNext();) {
				Object obj = iter.next();
				if (obj instanceof Annotation) {
					if (!addAnnotation((Annotation) obj, node, mode))
						return false;
				}
			}
		}
		return true;
	}

	/**
	 * 
	 * @param annotation
	 * @param node
	 * @param mode       one of {CHECK_ANNOTATIONS_ONLY}
	 * @return true if successful
	 */
	private boolean addAnnotation(Annotation annotation, ASTNode node, int mode) {
		String name = annotation.getTypeName().getFullyQualifiedName();
		int idx = name.indexOf("J2S");
		if (idx >= 0) {
			return (mode == CHECK_ANNOTATIONS_ONLY || !name.substring(idx).startsWith("J2SIgnore"));
		}
		if (global_ignoredAnnotations == null || global_ignoredAnnotations.indexOf(";" + name + ";") >= 0) {
			return true;
		}
		String qname = name;
		try {
			qname = getFinalJ2SClassName(annotation.resolveTypeBinding().getQualifiedName(), FINAL_RAW);
		} catch (@SuppressWarnings("unused") NullPointerException e) {
			log("J2S could not resolve annotation " + annotation);
		}
		if (class_annotations == null)
			class_annotations = new ArrayList<ClassAnnotation>();
		class_annotations.add(new ClassAnnotation(qname, annotation, node));
		if (name.startsWith("Xml")) {
			// TODO: superclass inheritance for XmlAccessorType ?
			if ("XmlAccessorType".equals(name)) {
				String s = annotation.toString();
				xml_annotationType = (s.contains("FIELD") ? JAXB_TYPE_FIELD
						: s.contains("PUBLIC") ? JAXB_TYPE_PUBLIC_MEMBER
								: s.contains("PROPERTY") ? JAXB_TYPE_PROPERTY : JAXB_TYPE_NONE);
			} else if (name.startsWith("XmlEnum")) {
				xml_annotationType = JAXB_TYPE_ENUM;
			} else if (xml_annotationType == ANNOTATION_TYPE_UNKNOWN && name.startsWith("Xml")) {
				xml_annotationType = JAXB_TYPE_UNSPECIFIED;
			} else if ("XmlElements".equals(name) && annotation.isSingleMemberAnnotation()) {
				Expression e = ((SingleMemberAnnotation) annotation).getValue();
				if (e instanceof ArrayInitializer) {
					@SuppressWarnings("unchecked")
					List<Expression> expressions = ((ArrayInitializer) e).expressions();
					for (int i = 0; i < expressions.size(); i++) {
						Expression exp = expressions.get(i);
						if (exp instanceof Annotation) {
							qname = getFinalJ2SClassName(((Annotation) exp).resolveTypeBinding().getQualifiedName(),
									FINAL_RAW);
							class_annotations.add(new ClassAnnotation(qname, (Annotation) exp, node));
						}
					}
				}
			}
		}
		return true;
	}

	/////////////////////////////

	public static void setLogging(List<String> lstMethodsDeclared, Map<String, String> htMethodsCalled,
			boolean logAllCalls) {
		global_lstMethodsDeclared = lstMethodsDeclared;
		global_htMethodsCalled = htMethodsCalled;
		global_logAllCalls = logAllCalls;
		if (lstMethodsDeclared != null)
			lstMethodsDeclared.clear();
		if (logAllCalls)
			htMethodsCalled.clear();
	}

	private void logMethodDeclared(String name) {
		if (name.startsWith("[")) {
			String[] names = name.substring(0, name.length() - 1).split(",");
			for (int i = 0; i < names.length; i++)
				logMethodDeclared(names[i]);
			return;
		}
		if (name.startsWith("'"))
			name = name.substring(1, name.length() - 1);
		name = fixLogName(class_fullName) + "." + name;
		if (global_lstMethodsDeclared != null)
			global_lstMethodsDeclared.add(name);
	}

	private void logMethodCalled(String name) {
		name = fixLogName(name);
		String myName = fixLogName(class_fullName);
		if (global_logAllCalls)
			global_htMethodsCalled.put(name + "," + myName, "-");
		else
			global_htMethodsCalled.put(name, myName);
	}

	private String fixLogName(String name) {
		name = NameMapper.checkClassReplacement(name);
		int pt = name.indexOf("<");
		return (pt > 0 ? name.substring(0, pt) : name);
	}

	/**
	 * tracks file byte pointers for @j2sNative, @j2sIgnore
	 */
	private Map<Integer, List<Javadoc>> package_mapBlockJavadoc;

	/**
	 * separates top-level classes found in a source file
	 * 
	 */
	private static final String ELEMENT_KEY = "__@J2S_ELEMENT__";

	/**
	 * Add the top-level class name with the element key.
	 *
	 * @param className
	 */
	private void appendElementKey(String className) {
		buffer.append(ELEMENT_KEY + ("=" + className) + "\n");
	}

	/**
	 * Separate the buffer into a list so that all top-level elements can be in
	 * their own file (as is done in Java). Provide a common include list
	 * 
	 * We do not have to worry about inner classes, as they are never referenced
	 * directly.
	 * 
	 * @return List {elementName, js, elementName, js, ....}
	 */
	public List<String> getElementList() {
		if (xml_annotationType != ANNOTATION_TYPE_UNKNOWN) {
			addDummyClassForPackageOnlyFile();
		}

		String trailer = ";Clazz.setTVer('" + VERSION + "');//Created "
				+ new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + " Java2ScriptVisitor version "
				+ VERSION + " net.sf.j2s.core.jar version " + CorePlugin.VERSION + "\n";
		List<String> elements = new ArrayList<String>();
		String js = buffer.toString();
		String eq = "="; // because we might be operating on this file
		String[] parts = js.split(ELEMENT_KEY + eq);
		String header = parts[0];
		String header_noIncludes = header.replace(",I$=[[]]", "");
		header = header.replace(",I$=[]", privateVarString
				+ (package_includes.length() == 0 ? "" : package_includes.append("]]," + "I$0=I$[0],$I$=function"
				// 3.2.9-v1e:
						+ (package_haveStaticArgsReversal[0] ? "(i,n,m){return m?$I$(i)[n].apply(null,m):"
								: "(i,n){return")
						// 3.2.9-v1a:
						// + "(i,n){return"
						+ "((i=(I$[i]||(I$[i]=Clazz.load(I$0[i]))))" + ",!n&&i.$load$&&Clazz.load(i,2)" + ",i)"
						+ "}")));
		for (int i = 1; i < parts.length; i++) {
			js = parts[i];
			int pt = js.indexOf("\n");
			String name = js.substring(0, pt);
			elements.add(name);
			js = js.substring(pt + 1);
			String head = "(function(){"
					+ (js.indexOf("$I$(") < 0 && js.indexOf("p$") < 0 && js.indexOf("I$0") < 0 ? header_noIncludes
							: header);
			elements.add(head + js + "})();\n" + trailer);
		}
		resetPrivateVars();
		return elements;
	}

	private void addDummyClassForPackageOnlyFile() {
		appendElementKey("_$");
		buffer.append("var C$=Clazz.newClass(\"_$\");");
		appendClinit();
		ClassAnnotation.addClassAnnotations(this, xml_annotationType, class_annotations, null, null, null, null,
				trailingBuffer.buf);
		buffer.append(trailingBuffer.buf);
		addDefaultConstructor();
	}

	public boolean visit(AnnotationTypeDeclaration node) {
		addClassOrInterface(node, node.resolveBinding(), node.bodyDeclarations(), '@', false);
		return false;
	}

	public boolean visit(BlockComment node) {
		return false;
	}

	public boolean visit(ImportDeclaration node) {
		return false;
	}

	public boolean visit(Javadoc node) {
		return false;
	}

	public boolean visit(LineComment node) {
		return false;
	}

	public boolean visit(MarkerAnnotation node) {
		return false;
	}

	public boolean visit(MemberRef node) {
		return false;
	}

	public boolean visit(MemberValuePair node) {
		return false;
	}

	public boolean visit(MethodRef node) {
		return false;
	}

	public boolean visit(MethodRefParameter node) {
		return false;
	}

	public boolean visit(NormalAnnotation node) {
		return false;
	}

	public boolean visit(ParameterizedType node) {
		node.getType().accept(this);
		return false;
	}

	public boolean visit(SingleMemberAnnotation node) {
		return false;
	}

	public boolean visit(TagElement node) {
		return false;
	}

	public boolean visit(TextElement node) {
		return false;
	}

	public boolean visit(TypeParameter node) {
		return false;
	}

	public boolean visit(WildcardType node) {
		return false;
	}

	static String getFinalFieldName(IVariableBinding binding) {
		return getFinalFieldOrLocalVariableName(binding.getDeclaringClass(), binding.getName());
	}

	/**
	 * Prepend a $ to a field name if there is a JavaScript keyword collision, and n
	 * more if there are collisions with higher-level field names.
	 * 
	 * This method no longer checks for field-method collisions.
	 * 
	 * @param classBinding
	 * @param fieldName
	 * @param isPrivate
	 * @return
	 */
	private static String getFinalFieldOrLocalVariableName(ITypeBinding classBinding, String fieldName) {
		String js$ = NameMapper.getJavaScriptCollisionIdentifier(fieldName, false);
		return (isJ2SInheritedFieldName(classBinding, fieldName) ? NameMapper.getJ2S$$InheritedFieldName(classBinding,
				fieldName, NameMapper.newFieldNameBuf(fieldName, new StringBuffer(js$))).toString() : js$ + fieldName);
	}

	/**
	 * Iteratively check whether the given field name is already defined in a stack
	 * of classes or interfaces.
	 * 
	 * The algorithm:
	 * 
	 * 1. Check self (class or interface)
	 * 
	 * 2. Check super class
	 * 
	 * 3. Check interfaces
	 * 
	 * @param binding
	 * @param name
	 * @return
	 */
	static boolean isJ2SInheritedFieldName(ITypeBinding binding, String name) {

		if (binding == null)
			return false;

		if ("serialVersionUID".equals(name)) {
			// ignore
			return false;
		}

		IVariableBinding[] declaredFields;
		ITypeBinding superclass = binding.getSuperclass();
		if (superclass == null) {
			// interface
			declaredFields = binding.getDeclaredFields();
		} else {
			declaredFields = superclass.getDeclaredFields();
		}
		for (int i = 0; i < declaredFields.length; i++) {
			if (name.equals(declaredFields[i].getName())) {
				return true;
			}
		}
		if (superclass != null && isJ2SInheritedFieldName(superclass, name)) {
			return true;
		}
		ITypeBinding[] interfaces = binding.getInterfaces();
		if (interfaces != null) {
			for (int i = 0; i < interfaces.length; i++) {
				if (isJ2SInheritedFieldName(interfaces[i], name)) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * This is the principle method for returning a fully qualified method name. x
	 * Determine the qualified parameter suffix for method names, including
	 * constructors. Now returns name$ for all unparameterized methods not
	 * explicitly excluded.
	 * 
	 * @param j2sName
	 * @param mBinding
	 * @param genericTypes        only in the case of method declarations, where we
	 *                            are trying to match generic methods
	 * @param addCallingOption$O
	 * @param isLiteralOrLambda_C
	 * 
	 * @return a fully j2s-qualified method name
	 */
	private String getFinalMethodNameWith$Params(String j2sName, IMethodBinding mBinding, String[] genericTypes,
			boolean addCallingOption$O, int specialType) {
		// The problem is that System.out and System.err are PrintStreams, and
		// we
		// do not intend to change those. So in the case that we just wrote
		// "System....", we use that instead and do not qualify the name
		// Note: binding can be null if we have errors in the Java and we are
		// compiling
		//
		// mBinding should never be null, but...
		if (mBinding == null)
			return j2sName;
		String methodName = mBinding.getName();
		if (j2sName == null)
			j2sName = methodName;
		if (NameMapper.isMethodNonqualified(getUnreplacedJavaClassNameQualified(mBinding.getDeclaringClass()),
				methodName, mBinding.getKey())) {
			return j2sName;
		}

		// BH: Note in the next statement, that Map.put$K$V is translated to actual
		// values
		// if .getMethodDeclaration() is not used.
		// Without that, it uses the bound parameters such as
		// String, Object instead of the declared ones, such as $TK$TV

		// !isMethodInvoaction and isLiteralOrLambda_C means LambdaC
		ITypeBinding[] paramTypes = (specialType == METHOD_LAMBDA_C ? mBinding.getParameterTypes()
				: mBinding.getMethodDeclaration().getParameterTypes());

		int nParams = paramTypes.length;
		if (genericTypes != null && genericTypes.length != nParams) {
			return null;
		}

		// xxx() adds $ to become xxx$() iff it is NOT
		// - (private and not static)
		// - toString or hashCode
		// - already qualified with $
		// skipping C$.
		if (nParams == 0)
			return ensureMethod$Name(j2sName, mBinding, null);

		// functional interface methods are qualified only by "$", not their parameters.

		if (specialType == METHOD_LAMBDA_M) {
			for (int i = 0; i < nParams; i++)
				j2sName += "$O";
			return j2sName;
		}

		return j2sName + getParamsAsString(nParams, genericTypes, paramTypes, false);
	}

	public static class NameMapper {

		/**
		 * defined already in j2sClazz.js
		 */
		static String[] j2sClazzPackages = { "java.lang", "java.lang.reflect", "java.io", "java.util" };

		static boolean isJ2sClazzPackage(String packageName) {
			for (int i = 0; i < j2sClazzPackages.length; i++)
				if (j2sClazzPackages[i].equals(packageName))
					return true;
			return false;
		}

		static final String primitiveTypeEquivalents = "Boolean,Byte,Character,Short,Integer,Long,Float,Double,Void,";
		static final String noConstructorNames = ",Boolean,Byte,Short,Integer,Long,Float,Double,";

		static String fixPackageName(String name) {
			// trying to avoid "double" or "doubleA" here. Not perfect, but who would
			// ever name a top-level class with a lower-case starting letter?
			// a name can be "" here as for LambdaExpressions
			return (name.length() > 0 && name.indexOf(".") < 0 && !Character.isLowerCase(name.charAt(0))
					? NULL_PACKAGE + "." + name
					: name);
		}

		static boolean isOneOf(String key, String values) {
			return (values.indexOf("," + key + ",") >= 0);
		}

		static String getPrimitiveTYPE(String name) {
			int pt = primitiveTypeEquivalents.indexOf(name.substring(1)) - 1;
			String type = primitiveTypeEquivalents.substring(pt);
			return type.substring(0, type.indexOf(","));
		}

		private final static String[] knownClasses = new String[] { "java.lang.Object", "java.lang.Class",
				"java.lang.String", "java.lang.Number", "java.lang.Byte", "java.lang.Character", "java.lang.Short",
				"java.lang.Long", "java.lang.Integer", "java.lang.Float", "java.lang.Double", "java.lang.Boolean",
				"java.lang.Iterable", "java.lang.CharSequence", "java.lang.Cloneable", "java.lang.Comparable",
				"java.lang.Runnable", "java.lang.System", "java.lang.Throwable", "java.lang.ClassLoader",
				"java.lang.Math", "java.io.Serializable", "java.util.Date" };
		private final static Set<String> knownClassHash = new HashSet<String>();
		static {
			for (int i = knownClasses.length; --i >= 0;)
				knownClassHash.add(knownClasses[i]);
		}

		static boolean isClassKnown(String qualifiedName) {
			return knownClassHash.contains(qualifiedName);
		}

		public static void setClassReplacements(String keyValues) {
			// j2s.class.replacements=org.apache.log4j.*:jalview.jslogger.;
			htClassReplacements = null;
			if (keyValues == null)
				return;
			htClassReplacements = new Hashtable<String, String>();
			lstPackageReplacements = new ArrayList<String>();
			String[] pairs = keyValues.split(";");
			for (int i = pairs.length; --i >= 0;) {
				pairs[i] = pairs[i].trim();
				if (pairs[i].length() == 0)
					continue;
				String[] kv = pairs[i].split("->");
				htClassReplacements.put(kv[0], kv[1]);
				if (kv[0].endsWith("."))
					lstPackageReplacements.add(kv[0]);
				log("class replacement " + kv[0] + " --> " + kv[1]);
			}
		}

		static String checkClassReplacement(String className) {
			if (htClassReplacements != null) {
				String rep = htClassReplacements.get(className);
				if (rep == null && lstPackageReplacements != null) {
					for (int i = lstPackageReplacements.size(); --i >= 0;) {
						rep = lstPackageReplacements.get(i);
						if (className.startsWith(rep)) {
							rep = htClassReplacements.get(rep) + className.substring(rep.length());
							break;
						}
						if (i == 0)
							rep = null;
					}

				}
				if (rep != null) {
					log(className + " -> " + rep);
					return rep;
				}
			}
			return className;
		}

		/**
		 * classes and packages that do not accept $ in their method names
		 * 
		 */
		private final static String defaultNonQualified
		// Math and Date both are minor extensions
		// of JavaScript, so they are not qualified
				= // "java.lang.Math;" +
					// MAYBE NOT! + "java.util.Date;"
					// swingjs.api.js and javajs.api.js contain
					// interfaces to JavaScript methods and so
					// are not parameterized.

				"*.api.js;"
		// netscape.JSObject interface includes 8 methods
		// that do not need to be parameterized.
		// + "netscape.*;"
		;

		private static String[] nonQualifiedPackages;

		/**
		 * Be causious with this flag. Use it only for JavaScript-only classes that will
		 * only be accessed by JavaScript, never Java.
		 *
		 * For Java classes, use .at.j2sAlias on the class in order to indicate that all
		 * the public methods in the class should be aliased without their $ signature
		 * qualifiers.
		 * 
		 * .j2s option j2s.compiler.nonqualified.packages/classes
		 * 
		 * @param names semicolon-separated list. For example,
		 *              org.jmol.api.js;jspecview.api.js
		 */
		public static void setNonQualifiedNamePackages(String names) {
			names = defaultNonQualified + (names == null ? "" : names);
			nonQualifiedPackages = names.replace(";;", ";").trim().split(";");
			for (int i = nonQualifiedPackages.length; --i >= 0;) {
				String s = nonQualifiedPackages[i];
				if (s.length() == 0)
					continue;
				if (s.startsWith("*."))
					s = s.substring(1);
				if (s.endsWith("."))
					s = s.substring(0, s.length() - 1);
				nonQualifiedPackages[i] = (s.endsWith("*") ? s.substring(0, s.length() - 1) : s + ".").trim();
			}
		}

		/**
		 * Check to see if this class is in a package for which we exclude parameter
		 * qualification
		 * 
		 * @param className
		 * @return
		 */
		static boolean isPackageOrClassNonqualified(String className) {
			if (className.indexOf("$") >= 0)
				return false; // inner class
			className += ".";
			for (int i = nonQualifiedPackages.length; --i >= 0;) {
				String s = nonQualifiedPackages[i];
				if (s.length() > 0 && s.startsWith(".") ? className.contains(s) : className.startsWith(s)) {
					return true;
				}
			}
			return false;
		}

		static boolean isMethodNonqualified(String className, String methodName, String key) {
			if (className.equals("java.lang.Math")) {
				switch (methodName) {
				case "ulp":
				case "nextDown":
				case "nextUp":
				case "nextAfter":
				case "getExponent":
					return false;
				default:
					return (key.indexOf("J") < 0);
				}
			}
			return (isPackageOrClassNonqualified(className));
		}

		/**
		 * Check for special direct Clazz method calls, avoiding loading the entire
		 * class.
		 * 
		 * @param javaClassName
		 * @return
		 */
		static String getJ2SFinalMapClazzMethod(String javaClassName, String methodName) {
			switch (methodName) {
			case "forName":
				return (javaClassName.equals("java.lang.Class") ? "Clazz.forName" : null);
			case "newInstance":
				return (javaClassName.equals("java.lang.reflect.Array") ? "Clazz.array" : null);
			default:
				return null;
			}
		}

		/**
		 * Prepend a $ if the name is a JavaScript keyword such as "var" or "for".
		 * 
		 * For example,
		 * 
		 * int var = 3
		 * 
		 * becomes
		 * 
		 * int $var = 3
		 * 
		 * @param identifier
		 * @param addName
		 * @param binding    when null, this is for a field; when not null, this is for
		 *                   a method
		 * @return
		 */
		static String getJavaScriptCollisionIdentifier(String identifier, boolean addName) {
			String s = getJavaScriptKeywordViolationChar(identifier);
			return (!addName ? s : s.length() == 0 ? identifier : s + identifier);
		}

		/*
		 * IE passes the following: public,private,private,static,package,
		 * implements,prototype,false,throws,label
		 * 
		 * Firefox passes the following: public,prototype,false,label
		 * 
		 * The following does not contain all the reserved keywords:
		 * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:
		 * Reserved_Words
		 * 
		 * abstract, boolean, break, byte, case, catch, char, class, const, continue,
		 * debugger, default, delete, do, double, else, enum, export, extends, false,
		 * final, finally, float, for, function, goto, if, implements, import, in,
		 * instanceof, int, interface, long, native, new, null, package, private,
		 * private, public, return, short, static, super, switch, synchronized, this,
		 * throw, throws, transient, true, try, typeof, var, void, volatile, while,
		 * with,
		 * 
		 * 
		 * 
		 */
		private static String[] keywords = new String[] { "class", /* "java", "javax", "sun", */"for", "while", "do",
				"in", "return", "function", "var", "class", "public", "private", "new", "delete", "static", "package",
				"import", "extends", "implements", "instanceof", "typeof", "void", "if", "this", "super", "prototype",
				"else", "break", "true", "false", "try", "catch", "throw", "throws", "continue", "switch", "default",
				"case", "export", "import", "let", "const", /* "label", */"with",
				// BH and a few of our own, based on checking developer console:
				"c$", "apply", "arguments", "bind", "call", "caller", "watch", "unwatch", "valueOf", "isPrototypeOf",
				"isGenerator", "prototype" };

		private static String getJavaScriptKeywordViolationChar(String identifier) {
			if (!Character.isUpperCase(identifier.charAt(0))) {
				String s = identifier.intern();
				for (int i = 0; i < keywords.length; i++) {
					if (keywords[i] == s) {
						return "$";
					}
				}
			}
			return "";
		}

		/**
		 * Prefix field name with as many $ as necessary to make it inheritance-unique
		 * 
		 * @param binding
		 * @param name
		 * @return
		 */
		static StringBuffer getJ2S$$InheritedFieldName(ITypeBinding binding, String name, StringBuffer buf) {
			if (binding != null) {
				ITypeBinding superclass = binding.getSuperclass();
				if (superclass != null) {
					IVariableBinding[] declaredFields = superclass.getDeclaredFields();
					for (int i = 0; i < declaredFields.length; i++) {
						if (name.equals(declaredFields[i].getName())) {
							buf.append("$");
							break;
						}
					}
					return getJ2S$$InheritedFieldName(superclass, name, buf);
				}
			}
			return buf.append(name);
		}

		/**
		 * Initializer for the $$$... buffer that is prepended to all field names that
		 * have conflicts with methods. Currently just toString();
		 * 
		 * @param fieldName
		 * @param buf
		 * @return
		 */
		static StringBuffer newFieldNameBuf(String fieldName, StringBuffer buf) {
			if (buf == null)
				buf = new StringBuffer();
			if (fieldNameCoversMethod(fieldName))
				buf.append("$");
			return buf;
		}

		/**
		 * toString is the only method not qualified. It will be used directly by
		 * JavaScript in s1 + s2. So in this case, we need a field by that name to be
		 * prepended with "$".
		 * 
		 * @param fieldName
		 * @return
		 */
		static boolean fieldNameCoversMethod(String fieldName) {
			return fieldName.equals("toString");
		}

	}

	static class ClassAnnotation {

		protected ASTNode node;
		String qname;
		protected Annotation annotation;

		private static Java2ScriptVisitor visitor;

		protected ClassAnnotation(String qname, Annotation annotation, ASTNode node) {
			this.annotation = annotation;
			this.qname = qname;
			this.node = node;
		}

		@SuppressWarnings({ "unchecked" })
		public static void addClassAnnotations(Java2ScriptVisitor visitor, int accessType,
				List<ClassAnnotation> class_annotations, List<EnumConstantDeclaration> enums,
				List<FieldDeclaration> fields, List<IMethodBinding> methods, List<AbstractTypeDeclaration> innerClasses,
				StringBuffer buf) {
			ClassAnnotation.visitor = visitor;
			boolean isPackage = (fields == null && enums == null);
			int nn = 0, ptBuf = 0, ptBuf1 = 0;
			ASTNode lastNode = null;
			List<?> fragments = null;
			String propOrder = null;
			String lastClassName = null;
			String methodSignature = null;
			for (int i = 0; i < class_annotations.size(); i++) {
				ClassAnnotation a = class_annotations.get(i);
				String str = a.annotation.toString();
				IAnnotationBinding b = a.annotation.resolveAnnotationBinding();
				if (b != null && global_j2sFlag_isDebugging)
					log("annotation " + str);
				// TODO -- make this clearer
				boolean isXML = str.startsWith("@Xml");
				if (a.annotation instanceof NormalAnnotation) {
					// @XmlElement(name="test",type=Integer.class)
					// remove commas, add quotes
					NormalAnnotation na = (NormalAnnotation) a.annotation;
					IMemberValuePairBinding[] pairs = na.resolveAnnotationBinding().getDeclaredMemberValuePairs();
					str = str.substring(0, str.indexOf("(") + 1);
					for (int j = 0; j < pairs.length; j++)
						str += annotationNameValue(pairs[j].getName(), pairs[j].getValue());
					str += ")";
				} else if (a.annotation instanceof SingleMemberAnnotation) {
					// add quotes
					List<ASTNode> expressions = null;
					Expression e = ((SingleMemberAnnotation) a.annotation).getValue();
					if (e instanceof TypeLiteral) {
						expressions = new ArrayList<ASTNode>();
						expressions.add(e);
					} else if (e instanceof ArrayInitializer) {
						expressions = ((ArrayInitializer) e).expressions();
					}
					if (expressions != null) {
						str = str.substring(0, str.indexOf("(") + 1);
						int n = expressions.size();
						String sep = (n > 1 ? "{" : "");
						for (int j = 0; j < n; j++) {
							str += sep + annotationNameValue(null, expressions.get(j));
							sep = ",";
						}
						str += (n > 1 ? "})" : ")");
					}
				}
				if (a.node == lastNode) {
					buf.insert(ptBuf1, ",'" + a.qname + "'");
					ptBuf1 += a.qname.length() + 3;
					buf.append(",");
				} else {
					lastNode = a.node;
					String varName = null;
					ITypeBinding type = null;
					// time to pick up the fragments
					addTrailingFragments(fragments, buf, ptBuf);
					fragments = null;
					if (a.node instanceof EnumDeclaration) {
						type = ((EnumDeclaration) a.node).resolveBinding();
						propOrder = "XX";
					} else if (a.node instanceof TypeDeclaration) {
						type = ((TypeDeclaration) a.node).resolveBinding();
					} else if (a.node instanceof FieldDeclaration) {
						FieldDeclaration field = (FieldDeclaration) a.node;
						if (fields != null)
							fields.remove(field);
						fragments = field.fragments();
						VariableDeclarationFragment identifier = (VariableDeclarationFragment) fragments.get(0);
						IVariableBinding v = identifier.resolveBinding();
						varName = getFinalFieldName(v);
						type = v.getType();
					} else if (a.node instanceof MethodDeclaration) {
						MethodDeclaration method = (MethodDeclaration) a.node;
						IMethodBinding mBinding = method.resolveBinding();
						if (methods != null)
							if (methods.contains(mBinding))
								methods.remove(mBinding);
						if (accessType != NOT_JAXB)
							mBinding = getJAXBGetMethod(accessType, mBinding, methods, false);
						if (mBinding == null)
							continue;
						varName = "M:" + mBinding.getName();
						methodSignature = visitor.getMethodNameWithSyntheticBridgeForDeclaration(mBinding,
								mBinding.isConstructor(), METHOD_FULLY_QUALIFIED, NOT_LAMBDA, null, null, false);
						type = mBinding.getReturnType();
					} else if (a.node instanceof AnnotationTypeMemberDeclaration) {
						MethodDeclaration method = (MethodDeclaration) a.node;
						IMethodBinding m = method.resolveBinding();
						if (methods != null)
							if (methods.contains(m))
								methods.remove(m);
						varName = "M:" + m.getName();
						type = m.getReturnType();
					} else if (a.node instanceof EnumConstantDeclaration) {
						EnumConstantDeclaration con = (EnumConstantDeclaration) a.node;
						if (enums != null)
							enums.remove(con);
						IVariableBinding v = con.resolveVariable();
						varName = v.getName();
						type = v.getType();
					}
					// for XML we need <String, Object>
					String className = (type == null ? null
							: isXML ? visitor.getFinalJ2SClassName(type.getQualifiedName(), FINAL_BRACKETS)
									: type.isTypeVariable() ? type.toString() // could be "<T>"
											: visitor.j2sNonPrimitiveName(type, false));
					if (className != null && className.equals(lastClassName)) {
						className = ".";
					} else {
						lastClassName = className;
					}
					buf.append(nn++ == 0 ? "C$.$getAnn$ = function(){ return [\n[[" : "]],\n  [[");
					buf.append((varName == null ? null : "'" + varName + "'"));
					ptBuf = buf.length();
					buf.append(",'" + className + "'," + methodSignature + ",['" + a.qname + "']],[");
					ptBuf1 = buf.length() - 4;
				}
				str = str.replace("'", "\\'");
				int pt = str.indexOf("(");
				str = (pt >= 0 ? str.substring(pt + 1, str.length() - 1) : "");
				buf.append("'" + str + "'");
				if (propOrder == null && str.indexOf("propOrder=") >= 0)
					propOrder = str;
			}
			if (nn > 0) {
				addTrailingFragments(fragments, buf, ptBuf);
				if (!isPackage && accessType != NOT_JAXB)
					addImplicitJAXBFieldsAndMethods(accessType, buf, enums, fields, methods, innerClasses, propOrder);
				buf.append("]]]}\n");
			}
		}

		private static String annotationNameValue(String name, Object value) {
			String str = (name == null ? "" : name + "=");
			if (value instanceof TypeLiteral) {
				str += "\"" + ((TypeLiteral) value).getType().resolveBinding().getQualifiedName() + ".class\"";
			} else if (value instanceof IVariableBinding) {
				str += "\"" + ((IVariableBinding) value).getType().getQualifiedName() + "."
						+ ((IVariableBinding) value).getName() + "\"";
			} else if (value instanceof Expression) {
				str += "\"" + value + "\"";
			} else if (value instanceof ITypeBinding) {
				str += "\"" + ((ITypeBinding) value).getQualifiedName() + ".class\"";
			} else if (value instanceof Object[]) {
				// propOrder
				Object[] o = (Object[]) value;
				str += "{";
				for (int i = 0; i < o.length; i++)
					str += annotationNameValue(null, o[i]) + " ";
				str += "}";
			} else {
				str += "\"" + value.toString() + "\"";
			}
			str += " ";
			return str;
		}

		private static IMethodBinding getJAXBGetMethod(int accessType, IMethodBinding v, List<IMethodBinding> methods,
				boolean returnVar2) {
			String varName = v.getName();
			// check for matching get/is and set
			if (accessType == ANNOTATION_TYPE_UNKNOWN || varName.startsWith("create")) {
				return v;
			}
			if (varName.startsWith("set")) {
				return getMethodBinding(methods, "g" + varName.substring(1));
			}
			IMethodBinding v2 = getMethodBinding(methods, "set" + varName.substring(varName.startsWith("get") ? 3 : 2));
			return (v2 == null ? null : returnVar2 ? v2 : v);
		}

		/**
		 * Add all implicit fields. Note that we still cannot marshal a class that has
		 * NO JAXB annotations at all. We have to have some.
		 * 
		 * @param accessType
		 * @param trailingBuffer
		 * @param enums
		 * @param fields
		 * @param methods
		 * @param innerClasses
		 * @param propOrder
		 */
		private static void addImplicitJAXBFieldsAndMethods(int accessType, StringBuffer buf,
				List<EnumConstantDeclaration> enums, List<FieldDeclaration> fields, List<IMethodBinding> methods,
				List<AbstractTypeDeclaration> innerClasses, String propOrder) {
			for (int i = 0; i < innerClasses.size(); i++) {
				ITypeBinding type = innerClasses.get(i).resolveBinding();
				if (isStatic(type)) {
					addJAXBAnnotation(null, type, "!XmlInner", buf);
				}
			}

			switch (accessType) {
			case JAXB_TYPE_NONE:
				return;
			case JAXB_TYPE_ENUM:
				for (int j = 0; j < enums.size(); j++) {
					EnumConstantDeclaration con = enums.get(j);
					IVariableBinding v = con.resolveVariable();
					String varName = v.getName();
					ITypeBinding type = v.getType();
					addJAXBAnnotation(varName, type, "@XmlEnumValue", buf);
				}
				return;
			default:
				boolean isUnspecified = (accessType == JAXB_TYPE_UNSPECIFIED);
				boolean publicOnly = (accessType == JAXB_TYPE_PUBLIC_MEMBER);
				if (accessType != JAXB_TYPE_PROPERTY) {
					for (int j = 0; j < fields.size(); j++) {
						FieldDeclaration field = fields.get(j);
						boolean isPublic = Modifier.isPublic(field.getModifiers());
						if (publicOnly && !isPublic)
							continue;
						List<?> fragments = field.fragments();
						for (int i = 0; i < fragments.size(); i++) {
							VariableDeclarationFragment identifier = (VariableDeclarationFragment) fragments.get(i);
							IVariableBinding v = identifier.resolveBinding();
							String varName = v.getName();
							// If propOrder is defined, then we are only allowed to
							// add implicit fields that are in that propOrder
							if (propOrder != null && propOrder.indexOf("\"" + varName + "\"") < 0)
								continue;
							ITypeBinding type = v.getType();
							addJAXBAnnotation(varName, type, "@XmlElement", buf);
							if (isUnspecified)
								addJAXBAnnotation(varName, type, "!XmlPublic(" + isPublic + ")", buf);
						}
					}
				}
				if (accessType != JAXB_TYPE_FIELD) {
					for (int i = 0; i < methods.size(); i++) {
						IMethodBinding m = methods.get(i);
						IMethodBinding m2 = getJAXBGetMethod(-1, m, methods, true);
						if (m2 == null)
							continue;
						boolean isPublic = (Modifier.isPublic(m.getModifiers())
								|| Modifier.isPublic(m2.getModifiers()));
						if (publicOnly && !isPublic)
							continue;
						String varName = m.getName();
						if (varName.startsWith("set"))
							varName = (m = m2).getName();
						ITypeBinding type = m.getReturnType();
						addJAXBAnnotation("M:" + varName, type, "@XmlElement", buf);
						if (isUnspecified)
							addJAXBAnnotation("M:" + varName, type, "!XmlPublic(" + isPublic + ")", buf);
					}
				}
				break;
			}
		}

		private static void addJAXBAnnotation(String varName, ITypeBinding type, String str, StringBuffer buf) {
			String className = visitor.getFinalJ2SClassName(type.getQualifiedName(), FINAL_BRACKETS);
			buf.append("]],\n  [[");
			buf.append("'" + varName + "'");
			buf.append(",'" + className + "'],['" + str + "'");
		}

		private static IMethodBinding getMethodBinding(List<IMethodBinding> methods, String name) {
			for (int i = methods.size(); --i >= 0;) {
				if (name.equals(methods.get(i).getName())) {
					return methods.remove(i);
				}
			}
			return null;
		}

		private static void addTrailingFragments(List<?> fragments, StringBuffer buf, int ptBuf) {
			if (fragments == null || fragments.size() == 0)
				return;
			String line = buf.substring(ptBuf);
			for (int f = 1; f < fragments.size(); f++) {
				VariableDeclarationFragment identifier = (VariableDeclarationFragment) fragments.get(f);
				buf.append("]],\n  [['" + identifier.resolveBinding().getName() + "'");
				buf.append(line);
			}
		}

	}

	static class NativeDoc {

		/**
		 * prepare a list that alternates [javadoc element javadoc element ... ]
		 * associating an element with its javadoc.
		 * 
		 * @author RM
		 *
		 */
		private static class BlockVisitor extends ASTVisitor {

			private int ptrDoc0;
			private List<ASTNode> list;
			private int listPtr;

			BlockVisitor(List<ASTNode> list) {
				this.list = list;
				ptrDoc0 = list.get(listPtr = 0).getStartPosition();
			}

			/**
			 * Just collect blocks after j2s Javadocs. Throws an IndexOfBoundsException when
			 * done with scanning.
			 * 
			 * Note that this no longer requires that the node be a block, because we are
			 * processing these BEFORE the node is visited.
			 * 
			 */

			public void preVisit(ASTNode node) throws IndexOutOfBoundsException {
				checkNode(node, false);
			}

			public void postVisit(ASTNode node) {
				checkNode(node, true);
			}

			private void checkNode(ASTNode node, boolean isPost) {
				int nodept = node.getStartPosition() + (isPost ? node.getLength() : 0);
				boolean checkParens = (!isPost && node instanceof ParenthesizedExpression);
				while (nodept >= ptrDoc0 || checkParens && nodept == ptrDoc0 - 1)
					addNode(node, isPost);
			}

			private void addNode(ASTNode node, boolean isPost) {
				if (isPost)
					list.add(++listPtr, null);
				list.add(++listPtr, node);
				ptrDoc0 = list.get(++listPtr).getStartPosition();
			}

		}

		/**
		 * 
		 * Check for j2sIgnore, j2sDebug, j2sNative, j2sAlias
		 * 
		 * @param javadoc
		 * @param isBlock
		 * @return true if code was added
		 */
		static boolean addJ2sJavadocs(StringBuffer buffer, List<Javadoc> list, boolean isBlock) {
			boolean didAdd = false;
			int n = list.size();
			for (int i = 0; i < n; i++) {
				Javadoc javadoc = list.get(i);
				List<?> tags = javadoc.tags();
				if (tags != null && tags.size() > 0
						&& (isBlock && getTag(tags, "@j2sIgnore") != null
								&& addJ2SSourceForTag(buffer, null, i == 0, i == n - 1, true)
								|| isBlock && global_j2sFlag_isDebugging
										&& addJ2SSourceForTag(buffer, getTag(tags, "@j2sDebug"), i == 0, i == n - 1,
												false)
								|| addJ2SSourceForTag(buffer, getTag(tags, "@j2sNative"), isBlock && i == 0,
										isBlock && i == n - 1, false))) {
					didAdd = true;
				}
			}
			return didAdd;
		}

		public static boolean hasJ2STag(Javadoc javadoc, String j2sKey) {
			return (javadoc != null && getTag(javadoc.tags(), j2sKey) != null);
		}

		static TagElement getTag(List<?> tags, String j2sKey) {
			Iterator<?> iter = tags.iterator();
			while (iter.hasNext()) {
				TagElement tagEl = (TagElement) iter.next();
				if (j2sKey.equals(tagEl.getTagName())) {
					return tagEl;
				}
			}
			return null;
		}

		/**
		 * 
		 * @param buffer
		 * @param tag
		 * @param addPrefix
		 * @param addPostfix
		 * @param isIgnore
		 * @return true to indicate we have written, so this block can be skipped
		 */
		private static boolean addJ2SSourceForTag(StringBuffer buffer, TagElement tag, boolean addPrefix,
				boolean addPostfix, boolean isIgnore) {
			if (isIgnore) {
				buffer.append("\n{}\n");
				return true;
			}
			if (tag == null)
				return false;
			StringBuffer buf = new StringBuffer();
			List<?> fragments = tag.fragments();
			for (Iterator<?> iterator = fragments.iterator(); iterator.hasNext();) {
				TextElement commentEl = (TextElement) iterator.next();
				String text = commentEl.getText().trim();
				buf.append(text);
				if (text.length() != 0) {
					buf.append(text.endsWith(";") || text.indexOf("//") >= 0 ? "\n" : " ");
					// BH note that all line terminators are removed,
					// as this causes problems after source cleaning, which may result
					// in code such as:
					//
					// return
					// x
					//
					// but this still does not fix the problem that we can have
					// x = "
					// "
					// after source cleaning
				}
			}
			String code = buf.toString();
			// /-* comment *-/ becomes /* comment */ and <@> becomes @
			if (code.length() > 0)
				code = Pattern.compile("\\/-\\*(.*)\\*-\\/", Pattern.MULTILINE | Pattern.DOTALL).matcher(code)
						.replaceAll("/*$1*/").replaceAll("<@>", "@").trim();
			// use of inline comment
			// that is, no {...} after it, in the middle of an expression
			// for example: int x = /**@j2sNative 32||*/15;
			// has limitations in that you cannot replace a string by "" or an object by
			// null.
			// end with || to replace Java value; must not be 0, "", or null
			// end with 0 && to replace a number with 0.
			// end with null && to replace anything with null
			// end with 1?xxx: to replace anything with xxx
			// /** @j2sNatve ! */true
			// (/** @j2sNative 1?x: */y)
			// /** @j2sNative true || */()

			boolean isInline = code.endsWith("|") || code.endsWith("&") || code.endsWith(":") || code.endsWith("!");
			buffer.append(isInline ? "" : addPrefix ? "{\n" : "\n");
			buffer.append(code);
			buffer.append(isInline ? "" : addPostfix ? "\n}\n" : "\n");
			return true;
		}

	}

	/**
	 * for debugging -- to System.err.println
	 * 
	 * @param msg
	 */
	public static void dumpStack(String msg) {
		try {
			throw new NullPointerException("Why am I here? " + msg);
		} catch (Exception e) {
			e.printStackTrace(System.out);
		}
	}

	String j2sNonPrimitiveName(ITypeBinding type, boolean typeAsObject) {
		if (type.isTypeVariable()) {
			String n = type.toString();
			if (n.startsWith("<")) {
				return (typeAsObject ? "Object" : n);
			}
		}
		return this.getFinalJ2SClassName(getUnreplacedJavaClassNameQualified(type), FINAL_RAW);
	}

//////////////////JAVA 8 LAMBDA ADDITIONS /////////////////	

	/**
	 * 
	 * Function<Integer, int[]> iaCreator = int[]::new;
	 * 
	 */
	public boolean visit(CreationReference node) {
//		// lambda_C
		ITypeBinding binding = node.resolveTypeBinding();
		processLocalInstance(node, null, binding, null, null, LAMBDA_CREATION, LAMBDA_UNWRAPPED);
		return false;
	}

	/**
	 * s -> b(s)
	 * 
	 */
	public boolean visit(LambdaExpression node) {
		// LambdaExpression:
		// Identifier -> Body
		// ( [ Identifier { , Identifier } ] ) -> Body
		// ( [ FormalParameter { , FormalParameter } ] ) -> Body
		// ==>
		// new runnable() { public xxx singleMethod() { Body })

		// lambda_E
		int pt = buffer.length();
		int localType = class_localType;
		class_localType = LAMBDA_EXPRESSION;
		String anonName = processLocalInstance(node, null, node.resolveTypeBinding(), null, null, LAMBDA_EXPRESSION,
				LAMBDA_EXPRESSION);
		class_localType = localType;
		if (anonName != null) {
			addLambdaReuse(pt, anonName);
		}
		return false;
	}

	/**
	 * System.out::println;
	 * 
	 * new Test()::test2;
	 * 
	 */
	public boolean visit(ExpressionMethodReference node) {
		// lambda_M
		// oddly enough, if we just use visit(MethodReference) it goes
		// somewhere else.
		return addLambdaMethodReference(node, node.getExpression());
	}

	/**
	 * 
	 * super::test2
	 * 
	 */
	public boolean visit(SuperMethodReference node) {
		return addLambdaMethodReference(node, null);
	}

	/**
	 * System.out::println
	 */
	public boolean visit(TypeMethodReference node) {
		return addLambdaMethodReference(node, null);
	}

	/**
	 * Class::method
	 * 
	 * super::method
	 * 
	 * @param node
	 * @param exp
	 * @return false
	 */
	private boolean addLambdaMethodReference(MethodReference node, Expression exp) {
		ITypeBinding binding = node.resolveTypeBinding();
		IMethodBinding mBinding = node.resolveMethodBinding();
		ITypeBinding declaringClass = mBinding.getDeclaringClass();
		int pt = buffer.length();
		buffer.append("(function($$){");
		int localType = class_localType;
		class_localType = LAMBDA_WRAPPED;
		// for the method invocation visitor
		String anonName = processLocalInstance(node, null, binding, null, null, LAMBDA_METHOD, LAMBDA_WRAPPED);
		class_localType = localType;
		buffer.append("})(");
		appendFinalMethodQualifier(exp, declaringClass, null, FINAL_ESCAPECACHE | FINAL_LAMBDA);
		buffer.append(")");
		if (anonName != null) {
			addLambdaReuse(pt, anonName);
		}
		return false;
	}

	/**
	 * allow reuse of Lambda method and expression objects when they are named
	 * 
	 * @param pt
	 * @param anonName
	 */
	private void addLambdaReuse(int pt, String anonName) {
		String tmp = buffer.substring(pt);
		buffer.setLength(pt);
		anonName = getFinalJ2SClassName(anonName, FINAL_P);
		buffer.append("(" + anonName + "$||(" + anonName + "$=(").append(tmp).append(")))");
	}

	private void addLambdaBody(ASTNode body, ITypeBinding retType) {
		if (body instanceof Block) {
			buffer.append("/*block*/");
			body.accept(this);
		} else {
			// there may be no return, but we still want to do this
			buffer.append("{ return ");
			if (body == null)
				return; // handled elsewhere
			buffer.append("(");
			addExpressionAsTargetType((Expression) body, retType, "r", null);
			buffer.append(");}");
		}
	}

	private String getLambdaParamList(IMethodBinding mBinding, int arity0) {
		int n = mBinding.getParameterTypes().length;
		if (arity0 < 0)
			arity0 = n;
		// accept(t,u)......add(u)
		return (n == 0 ? "" : " t,u,v,w,x,y,z".substring(Math.max(0, (arity0 - n) * 2) + 1, arity0 * 2));
	}

	/**
	 * Create the lambda class
	 * 
	 * @param lnode
	 * @param mBinding
	 */
	private boolean addLambdaClass(ASTNode lnode, IMethodBinding mBinding) {
		if (lnode instanceof LambdaExpression) {
			buffer.append("/*lambda_E*/");
			LambdaExpression node = (LambdaExpression) lnode;
			mBinding = node.resolveMethodBinding();
			@SuppressWarnings("unchecked")
			List<ASTNode> params = node.parameters();
			int localType = class_localType;
			class_localType = LAMBDA_EXPRESSION;
			processMethodDeclaration(null, mBinding, params, node.getBody(), false, null, LAMBDA_EXPRESSION, null,
					false);
			class_localType = localType;
			return true;
		}
		if (lnode instanceof CreationReference) {
			buffer.append("/*lambda_C*/");
			processMethodDeclaration(null, mBinding, null, null, false, null, LAMBDA_CREATION, null, false);
			CreationReference node = (CreationReference) lnode;
			Type ctype = node.getType();
			ITypeBinding binding = ctype.resolveBinding();
			if (ctype instanceof ArrayType) {
				// int[]::new;
				addArrayConstructor(binding, null);
			} else {
				// MatchSink::new;
				addConstructor(binding, mBinding, null, mBinding.getParameterTypes().length);
			}
			buffer.append("});\n");
			return true;
		}
		// method of one type or another
		SimpleName identifier;
		Expression exp = null;
		IMethodBinding mBinding1;
		if (lnode instanceof TypeMethodReference) {
			// Collection<T>::add (see java.stream.Collectors)
			buffer.append("/*lambda_T*/");
			TypeMethodReference node = (TypeMethodReference) lnode;
			identifier = node.getName();
			mBinding1 = node.resolveMethodBinding();
		} else if (lnode instanceof SuperMethodReference) {
			// super::test3
			buffer.append("/*lambda_S*/");
			SuperMethodReference node = (SuperMethodReference) lnode;
			identifier = node.getName();
			mBinding1 = node.resolveMethodBinding();
		} else if (lnode instanceof ExpressionMethodReference) {
			// String.out::println
			buffer.append("/*lambda_M*/");
			ExpressionMethodReference node = (ExpressionMethodReference) lnode;
			identifier = node.getName();
			mBinding1 = node.resolveMethodBinding();
			exp = node.getExpression();
		} else {
			buffer.append("/*lambda_?*/");
			log("??? addLambdaMethod " + lnode.getClass().getName());
			return false;
		}
		processMethodDeclaration(null, mBinding, null, null, false, null, LAMBDA_METHOD, null, false);
		boolean isStatic = addMethodInvocation(identifier, null, mBinding1, exp, mBinding.getParameterTypes().length);
		buffer.append("});\n");
		return isStatic;
	}

	/**
	 * SwingJS uses var p$<n> within an anonymous function wrapper ;(function()
	 * {.....})(); to isolate local variables within all classes of all types.
	 * Within this framework, C$ is the raw JavaScript object for the class, p$<n>
	 * is is an associative array containing private methods.
	 * 
	 * This hashtable is reset for each top-level class, indicating which private
	 * var to use for a private method -- p$1, p$2, p$3 etc. -- depending upon the
	 * class being referred to.
	 * 
	 */
	private static Map<String, String> classToPrivateVar = new Hashtable<String, String>();
	private static String privateVarString = "";
	private static int privateClassCount = 0;
	private static int privateVarCount = 0;

	/**
	 * p$1, p$2, etc.
	 * 
	 * Also used to compare two classes for equivalence, because I cannot figure out
	 * how to equate a class being invoked and a class being declared
	 * 
	 * @param binding
	 * @return
	 */
	private String getPrivateVar(IBinding binding, boolean isClassCompare) {
		String key = binding.getKey(), key0 = null, key1 = null;
		if (isClassCompare)
			key = "_" + key;
		String p$ = classToPrivateVar.get(key);
		if (p$ == null) {
			key0 = key;
			p$ = classToPrivateVar.get(key = (isClassCompare ? "_" : "") + getNormalizedKey(binding));
		}
		if (p$ == null && !isClassCompare && key.indexOf("[") >= 0) {
			key1 = key;
			p$ = classToPrivateVar.get(key = key.substring(0, key.indexOf("[") + 1) + "]");
		}
		if (p$ == null) {
			classToPrivateVar.put(key, p$ = "p$" + (isClassCompare ? ++privateClassCount : ++privateVarCount));
			classToPrivateVar.put(key0, p$);
			if (!isClassCompare) {
				if (key1 != null)
					classToPrivateVar.put(key1, p$);
				privateVarString += "," + p$ + "={}";
			}
		}
		return p$;
	}

	/**
	 * Test to see if an invocation is the same as a declaration using cached
	 * normalized keys
	 * 
	 * @param a
	 * @param b
	 * @return
	 */
	private boolean areEqual(IBinding a, IBinding b) {
		return getPrivateVar(a, true).equals(getPrivateVar(b, true));
	}

	private static String getNormalizedKey(IBinding b) {
		return getNormalizedSubKey(b.getKey());
		// e.g.: invocation vs. declaration
		// Ltest/Test_GenericIMV_AB<Ltest/Test_GenericIMV_AB;:TA;Ltest/Test_GenericIMV_AB;:TB;>;
		// becomes test/Test_GenericIMV_AB[TA;TB;];
		// Ljava/util/Hashtable<Ljava/util/Hashtable;:TK;Ljava/util/Hashtable;:TV;>.Enumerator<Ljava/util/Hashtable$Enumerator;:TT;>;
		// becomes java/util/Hashtable[TK;TV;].Enumerator[TT;];
	}

	private static String getNormalizedSubKey(String key) {
		int pt0 = key.lastIndexOf("<"), pt1;
		if (pt0 >= 0)
			return getNormalizedSubKey(key.substring(0, pt0) + "[" + getNormalizedSubKey(
					key.substring(pt0 + 1, (pt1 = key.indexOf(">", pt0))) + "]" + key.substring(pt1 + 1)));
		if (key.indexOf(":") < 0)
			return key;
		int left = -1;
		int pt;
		while ((pt = key.indexOf(":", ++left)) >= 0) {
			// Ltest/Test_GenericIMV_AB;:TA;Ltest/Test_GenericIMV_AB;:TB;
			// ^ ^
			// include ; but not :
			key = key.substring(0, left) + key.substring(pt + 1);
			// TA;Ltest/Test_GenericIMV_AB;:TB;
			// ^
			left = key.indexOf(";", left);
			if (left < 0)
				break;

			// Ljava/util/Hashtable<Ljava/util/Hashtable;:TK;Ljava/util/Hashtable;:TV;>.Enumerator<Ljava/util/Hashtable$Enumerator;:TT;>;
			// Ljava/util/Hashtable<Ljava/util/Hashtable;:TK;Ljava/util/Hashtable;:TV;>.Enumerator[TT;];
			// Ljava/util/Hashtable[TK;TV;].Enumerator[TT;];

		}
		return key;
	}

	private void resetPrivateVars() {
		privateVarCount = privateClassCount = 0;
		privateVarString = "";
		classToPrivateVar.clear();
	}

	///////////////// debugging //////////////////////////

	/**
	 * Add a comment message in the output buffer for debugging. This has proven
	 * exceptionally useful!
	 * 
	 * @param msg
	 */
	void bufferDebug(String msg) {
		buffer.append("/*" + msg + "*/");
	}

//	void debugDumpClass(ITypeBinding binding) {
//		ITypeBinding[] lst = binding.getTypeParameters();
//
//		// Check for <T,V> - these are for the generic class defs themselves
//		for (int i = 0; i < lst.length; i++)
//			log(binding.getKey() + "typeP " + i + lst[i].getName());
//
//		// check for <String,Object> for the implemented classes
//		lst = binding.getTypeArguments();
//		for (int i = 0; i < lst.length; i++)
//			log(binding.getKey() + "typeA " + i + lst[i].getName());
//
//		IMethodBinding[] methods = binding.getDeclaredMethods();
//		for (int i = methods.length; --i >= 0;) {
//			IMethodBinding m = methods[i];
//			log(getFinalMethodNameWith$Params(m.getName(), null, m, null, false, METHOD_NOTSPECIAL));
//			ITypeBinding[] params = m.getParameterTypes();
//			for (int j = 0; j < params.length; j++)
//				log("\t" + params[j].getName());
//
//		}
//	}
//
//	static void debugListAllOverrides(ITypeBinding binding) {
//		IMethodBinding[] jmethods = binding.getDeclaredMethods();
//		for (int j = jmethods.length; --j >= 0;) {
//			IMethodBinding m = jmethods[j];
//			ITypeBinding b = null;
//			while ((b = (b == null ? m.getDeclaringClass() : b.getSuperclass())) != null) {
//				IMethodBinding[] methods = b.getDeclaredMethods();
//				for (int i = methods.length; --i >= 0;)
//					if (m.overrides(methods[i]))
//						log("!! " + m.getKey() + " overrides " + methods[i].getKey());
//			}
//		}
//	}
//
}
