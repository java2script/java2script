/*
 * Copyright (c) 2007, 2013, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
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
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package java.nio.file;

import java.nio.file.spi.FileSystemProvider;
import java.net.URI;
import java.io.IOException;
import java.util.*;

import swingjs.JSFileSystem;

/**
 * Factory methods for file systems. This class defines the {@link #getDefault
 * getDefault} method to get the default file system and factory methods to
 * construct other types of file systems.
 *
 * <p>
 * The first invocation of any of the methods defined by this class causes the
 * default {@link FileSystemProvider provider} to be loaded. The default
 * provider, identified by the URI scheme "file", creates the {@link FileSystem}
 * that provides access to the file systems accessible to the Java virtual
 * machine. If the process of loading or initializing the default provider fails
 * then an unspecified error is thrown.
 *
 * <p>
 * The first invocation of the {@link FileSystemProvider#installedProviders
 * installedProviders} method, by way of invoking any of the {@code
 * newFileSystem} methods defined by this class, locates and loads all installed
 * file system providers. Installed providers are loaded using the
 * service-provider loading facility defined by the {@link ServiceLoader} class.
 * Installed providers are loaded using the system class loader. If the system
 * class loader cannot be found then the extension class loader is used; if
 * there is no extension class loader then the bootstrap class loader is used.
 * Providers are typically installed by placing them in a JAR file on the
 * application class path or in the extension directory, the JAR file contains a
 * provider-configuration file named
 * {@code java.nio.file.spi.FileSystemProvider} in the resource directory
 * {@code META-INF/services}, and the file lists one or more fully-qualified
 * names of concrete subclass of {@link FileSystemProvider} that have a zero
 * argument constructor. The ordering that installed providers are located is
 * implementation specific. If a provider is instantiated and its
 * {@link FileSystemProvider#getScheme() getScheme} returns the same URI scheme
 * of a provider that was previously instantiated then the most recently
 * instantiated duplicate is discarded. URI schemes are compared without regard
 * to case. During construction a provider may safely access files associated
 * with the default provider but care needs to be taken to avoid circular
 * loading of other installed providers. If circular loading of installed
 * providers is detected then an unspecified error is thrown.
 *
 * <p>
 * This class also defines factory methods that allow a {@link ClassLoader} to
 * be specified when locating a provider. As with installed providers, the
 * provider classes are identified by placing the provider configuration file in
 * the resource directory {@code META-INF/services}.
 *
 * <p>
 * If a thread initiates the loading of the installed file system providers and
 * another thread invokes a method that also attempts to load the providers then
 * the method will block until the loading completes.
 *
 * @since 1.7
 */

public final class FileSystems {
	private FileSystems() {
	}

	static final FileSystem defaultFileSystem = defaultFileSystem();

	private static FileSystem defaultFileSystem() {
		return getDefaultProvider().getFileSystem(URI.create("file:///"));
	}

	private static FileSystemProvider getDefaultProvider() {
		return new JSFileSystem.JSFileSystemProvider("file");
	}

	public static FileSystem getDefault() {
		return defaultFileSystem;
	}

	public static FileSystem getFileSystem(URI uri) {
		return getDefaultProvider().getFileSystem(uri);
	}

	public static FileSystem newFileSystem(URI uri, Map<String, ?> env) throws IOException {
		return newFileSystem(uri, env, null);
	}

	public static FileSystem newFileSystem(URI uri, Map<String, ?> env, ClassLoader loader) throws IOException {
		return getDefaultProvider().getFileSystem(uri);
	}

	public static FileSystem newFileSystem(Path path, ClassLoader loader) throws IOException {
		if (path == null)
			throw new NullPointerException();
		Map<String, ?> env = Collections.emptyMap();
		return getDefaultProvider().newFileSystem(path, env);
	}
}
