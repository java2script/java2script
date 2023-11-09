package j2s;

import org.eclipse.core.runtime.Plugin;
import org.osgi.framework.BundleContext;

/**
 * The main plugin class to be used in the desktop.
 */
public class CorePlugin extends Plugin {

	//The shared instance.
	private static CorePlugin plugin;
	
	/**
	 * Version prerelease -xxx is for runtime use only.
	 * 
	 * the actual "x.y.z" version is specified in plugin.xml.
	 * 
	 * Note that Eclipse must be started with the -clean flag if it is to register
	 * the bundle version properly. So we use VERSION here instead
	 * 
	 * This version should be also placed in MANIFEST.MF for the bundle version
	 * 
	 */
	public static String VERSION = "5.0.1-v1";
	
	// if you change the x.x.x number, be sure to also indicate that in 
	// j2sApplet.js and also (Bob only) update.bat, update-clean.bat

	// BH 2023.11.09 -- 5.0.1-v1 merges Jmol legacy (.j2sjmol) with Java8//11 (.j2s)
	// BH 2023.03.29 -- 3.3.1-v7 fixes outer static method call from within lambda expression. 
	// BH 2023.02.09 -- 3.3.1.v6 fixes j2s.excluded.paths needing /src/xxxx
	// BH 2022.06.27 -- 3.3.1-v5 fixes missing method annotations
	// BH 2022.01.17 -- 3.3.1-v4 fixes default interface methods referencing their own static fields
	// BH 2021.01.14 -- 3.3.1-v3 fixes missing finals for nested () -> {...}
	// BH 2021.01.03 -- 3.3.1-v2 adds @j2sAsync adds async for function - experimental
	// BH 2002.12.31 -- 3.3.1-v1 introduces full primitive 64-bit long support. 
	// BH 2020.12.19 -- 3.2.10-v1a adds .j2s config option j2s.config.altfileproperty
	// BH 2020.12.19 -- 3.2.10-v1 preliminary work for 64-bit long
	// BH 2020.12.14 -- 3.2.9-v1s fix for Boolean |= boolean and related boxing
	// BH 2020.12.06 -- 3.2.9-v1r fix for (long) double using |0 
	// BH 2020.11.20 -- 3.2.9-v1q fix for  new ImmutableCollections.ListN<>(E...) should use Object[] 
	// BH 2020.08.03 -- 3.2.9-v1p fix for boxing boolean should be Boolean.valueOf$, not new Boolean
	// BH 2020.08.01 -- 3.2.9-v1o fix for lambda expressions too static
	// BH 2020.07.08 -- 3.2.9-v1n fix for try with resources and adds option varOrLet
	// BH 2020.07.04 -- 3.2.9.v1m fix for X.super.y() in anonymous class
	// BH 2020.06.22 -- 3.2.9.v1k fix for varargs not proper qualified arrays
	// BH 2020.06.17 -- 3.2.9-v1j fix for functional interface this::privateMethod
	// BH 2020.05.01 -- 3.2.9-v1i fix for nested lambda methods
	// BH 2020.04.26 -- 3.2.9-v1h fix for inner classes of interfaces duplicated; fix for api.js inner class method names unqualified
	// BH 2020.04.15 -- 3.2.9-v1g fix for qualified super() in inner classes using Class.super_ call (Tracker)
	// BH 2020.04.05 -- 3.2.9-v1f (Boolean ? ...) not unboxed
	// BH 2020.03.21 -- 3.2.9-v1e better v1c 
	// BH 2020.03.20 -- 3.2.9-v1d proper check for new String("x") == "x" (should be false), but new integer(3) == 3 (true) 
	// BH 2020.03.20 -- 3.2.9-v1c more efficient static call from 3.2.9-v1a 
	// BH 2020.02.26 -- 3.2.9-v1b allows (byte) = (byte) to not use |0 
	// BH 2020.02.20 -- 3.2.9-v1a reverses c,args order in new_(c,args,...) when both have expressions
	// BH 2020.02.18 -- 3.2.8-v2 fixes import static missing $I$ defs.
	// BH 2020.02.05 -- 3.2.8-v1 reworking of functional interfaces; no longer unqualified
	// BH 2020.01.31 -- 3.2.7-v5 'L' used instead of 'J' in $fields$
	// BH 2020.01.31 -- 3.2.7-v5 java.lang.reflect.* should not be truncated to reflect.* in parameters
	// BH 2020.01.16 -- 3.2.7-v4 replaces extends java.awt.Component and javax.swing.JComponent 
	// BH 2020.01.12 -- 3.2.7-v3 fixes JAXB annotation marshalling for 3.2.7 
	// BH 2020.01.11 -- 3.2.7-v3 corrects and rewrites synthetic bridge creation with much cleaner heap usage 
	// BH 2020.01.09 -- 3.2.7-v2 introduces @j2sAlias as a way of adding a custom method name, as in exports. 
	// BH 2020.01.08 -- 3.2.7-v1 sets generic references to their erasures; adds implicit synthetic default methods to interfaces 
	// BH 2020.01.05 -- 3.2.6-v2 fixes synthetic methods missing for generics
	// BH 2020.01.03 -- 3.2.6-v2 fixes for missing synthetic methods  
	// BH 2020.01.03 -- 3.2.6-v1 fixes for $__T and some synthetic methods missing
	// BH 2020.01.01 -- 3.2.6-v1 fixes for generic varargs with only one parameter
	// BH 2019.12.19 -- 3.2.6-v0 adds C$.$fields$
	// BH 2019.12.15 -- 3.2.5-v4 fix for local class within anonymous class not getting name 
	// BH 2019.12.12 -- 3.2.5-v3 fix for enums == null in annotations
	// BH 2019.12.06 -- 3.2.5-v2 fix for try(resources) not closing those
	// BH 2019.11.12 -- 3.2.5-v0 fix for string literals with \n \nn \nnn octals, but "use strict" does not allow for this.
	// BH 2019.11.13 -- 3.2.5-v0 fixes static initialization timing. See note in Java2ScriptVisitor
	// BH 2019.10.30 -- 3.2.4.09 fixes problem with team...show history...compare having null project.getProject().getLocation()
	// BH 2019.10.27 -- 3.2.4.09 fixes problem with method of name c() becoming c$() -- constructor
	// BH 2019.10.25 -- 3.2.4.09 adds j2s.compiler.java.version (default 8)
	// BH 2019.10.25 -- 3.2.4.09 adds j2s.break.on.error (default false)
	// BH 2019.10.25 -- 3.2.4.09 fixes missing resource copy for git projects
	// BH 2019.10.24 -- 3.2.4.08 support for multiple buildStart
	// TODO/NOTE final static int FOO = (/**@j2sNative 5 || */3) stated but not recognized when used as its new value 
	// BH 2/3/2019 -- 3.2.4.07 fixes "final static Float = (float)" missing definition
	// BH 1/2/2019 -- 3.2.4.06 fixes try(resources) with more than one resource missing semicolon
	// BH 12/13/2018 -- 3.2.4.05 fixes problem with OuterClass.this.foo() not using .apply()
	// BH 11/10/2018 -- 3.2.4.04 additional support for JAXB
	// BH 11/4/2018 -- 3.2.4.02 broad JAXB support
	// BH 10/27/2018 -- 3.2.4.01 support for JAXB FIELD+propOrder and NONE types 
	// BH 9/28/2018 -- 3.2.4.00 adds minimal support for JAXB
	// BH 9/23/2018 -- 3.2.3.00 adds support for java.applet.Applet and java.awt.* controls without use of a2s.*
	// BH 9/16/2018 -- 3.2.2.06 removes "$" in JApplet public method alternative name
	// 3.2.2.04 2018.08.15 fixing Java->JavaScript "getFinal" code for class names.
	// 3.2.2.04 adds support for window-level applets, such as JmolApplet
	// 3.2.2.03 adds Java 8 function and stream
	// 3.2.2.02 adds $-qualified names for all methods
	// BH 8/20/2018 -- fix for return (short)++;
	// BH 8/19/2018 -- refactored to simplify $finals$
	// BH 8/12/2018 -- refactored to simplify naming issues
	// BH 8/6/2018  -- additional Java 8 fixes; enum $valueOf$S to valueOf$S
	// BH 8/1/2018  -- adds interface default methods as C$.$defaults$(C$)
	// BH 7/29/2018 -- java.util.stream.Collectors is returning java.util.Collectionthis.b$['java.util.Collection'].add
	// BH 7/25/2018 -- allows for direct private function calls in inner and anonymous classes using var p$, p$$, p$$$, etc
	// BH 7/22/2018 -- fixes improper use of charCodeAt() to replace charCode().$c() when not java.lang.String.charAt
	// BH 7/20/2018 -- removes qualifications for single-abstract method overrides
	// BH 7/19/2018 -- fixes Enum.Enum
	// BH 7/18/2018 -- addw Java 8 try without catch or finally
	// BH 7/16/2018 -- adds Java 8 :: operator
	// BH 7/15/2018 -- adds Java 8 lambda expressions
	// BH 7/14/2018 -- removes java2scriptbuilder; uses CompilationParticipant instead
	// BH 7/5/2018 -- fixes int | char
	// BH 7/3/2018 -- adds tryWithResource
	// BH 7/3/2018 -- adds effectively final -- FINAL keyword no longer necessary  
	// BH 6/27/2018 -- fix for a[Integer] not becoming a[Integer.valueOf]
	// BH 6/26/2018 -- method logging via j2s.log.methods.called and j2s.log.methods.declared
	// BH 6/24/2018 -- synchronized(a = new Object()) {...} ---> ...; only if an assignment or not a simple function call to Object.getTreeLock()
	// BH 6/23/2018 -- synchronized(a = new Object()) {...} ---> if(!(a = new Object()) {throw new NullPointerException()}else{...}
	// BH 6/21/2018 -- CharSequence.subSequence() should be defined both subSequence$I$I and subSequence
	// BH 6/20/2018 -- fixes for (int var : new int[] {3,4,5}) becoming for var var
	// BH 6/19/2018 -- adds .j2s j2s.class.replacements=org.apache.log4j.->jalview.javascript.log4j.;
	// BH 5/15/2018 -- fix for a[pt++] |= 3  incrementing pt twice and disregarding a[][] (see test/Test_Or.java)
	// BH 3/27/2018 -- fix for anonymous inner classes of inner classes not having this.this$0
	// BH 1/5/2018 --  @j2sKeep removed; refactored into one class
	// BH 12/31/2017 -- competely rewritten for no run-time ambiguities
	// BH 9/10/2017 -- adds full byte, short, and int distinction using class-level local fields $b$, $s$, and $i$, which are IntXArray[1]. (See ASTKeywordVisitor)
	// BH 9/7/2017 -- primitive casting for *=,/=,+=,-=,&=,|=,^=
	// BH 9/7/2017 -- primitive numeric casting -- (byte) was ignored so that (byte)  0xFF remained 0xFF.
	// BH 9/7/2017 -- fixed multiple issues with char and Character
	// BH 9/4/2017 -- java.awt, javax.swing, swingjs code added; additional fixes required
	// BH 8/30/2017 -- all i/o working, including printf and FileOutputStream
	// BH 8/19/2017 -- String must implement CharSequence, so all .length() -> .length$()
	// BH 8/19/2017 -- varargs logic fixed for missing argument
	// BH 8/18/2017 -- array instanceof, reflection, componentType fixes
	// BH 8/16/2017 -- JSE8-UnionType catch (Exception... | Exception...) {...}
	// BH 8/13/2017 -- includes native code calls in System.err
	// BH 7/31/2017 -- extensively reworked for fully qualified method names and no SAEM
	// 3.2.1.01 original SwingJS version through 2017 adds $-signatures for methods
	// 3.1.1 last Zhou Renjian unqualified name version
	
	
	/**
	 * The constructor.
	 */
	public CorePlugin() {
		plugin = this;
	}

	/**
	 * This method is called upon plug-in activation
	 */
	public void start(BundleContext context) throws Exception {
		System.out.println(VERSION + " started");
		super.start(context);
	}

	/**
	 * This method is called when the plug-in is stopped
	 */
	public void stop(BundleContext context) throws Exception {
		System.out.println("J2S 4.2 stopped");
		super.stop(context);
		plugin = null;
	}

	/**
	 * Returns the shared instance.
	 */
	public static CorePlugin getDefault() {
		return plugin;
	}

}
