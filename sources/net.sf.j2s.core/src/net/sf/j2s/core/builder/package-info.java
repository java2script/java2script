/*******************************************************************************
 * Copyright (c) 2017 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Udo Borkowski - initial version, based on an email memo by Zhou Renjian
 *
 ******************************************************************************/
 

/**
Generate *.js files while compiling Java sources to *.class files.

<p>This package is a modified copy of the Eclipse package 
'<code>org.eclipse.jdt.internal.core.builder</code>' from 
'<code>org.eclipse.jdt.core/model</code>' 
(<a href="git://git.eclipse.org/gitroot/jdt/eclipse.jdt.core.git">Git</a>).

<p>The major changes (beside the new package name 
<code>net.sf.j2s.core.builder</code>) are in the class {@link JavaBuilder}. 
The changes mainly reference  several new, Java2Script-specific classes, like 
{@link Java2ScriptBatchImageBuilder}, or {@link Java2ScriptIncrementalImageBuilder}. 
The changes in JavaBuilder are marked with '<code>// j2sChange: ...</code>' comments.  

<p>Also notice the new <code>*Proxy</code> classes, like 
{@link ClasspathDirectoryProxy} or {@link CompilationParticipantResultProxy}. 
These <code>*Proxy</code> classes keep the original JDT classes unchanged as 
much as possible and expose necessary inner accesses to the Java2Script builder.

<p><b>Historical Note</b>

<p>In earlier versions of Java2Script the original JDT Core plugin was modified 
to add the extension point. Therefore it was necessary to re-deploy the Eclipse 
JDT Core plugin jars and restart Eclipse after installation. That approach 
caused a lot of inconveniences and was drop.
 */
package net.sf.j2s.core.builder;
 