/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1999, 2006, Oracle and/or its affiliates. All rights reserved.
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

package javax.sound.sampled;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import javajs.util.Rdr;

import javax.sound.sampled.Clip;
import javax.sound.sampled.Mixer;
import javax.sound.sampled.Port;
import javax.sound.sampled.TargetDataLine;

import swingjs.JSAudio;
import swingjs.JSToolkit;

/**
 * 
 * A minimal implementation of AudioSystem for SwingJS
 * 
 * The <code>AudioSystem</code> class acts as the entry point to the
 * sampled-audio system resources. This class lets you query and access the
 * mixers that are installed on the system. <code>AudioSystem</code> includes a
 * number of methods for converting audio data between different formats, and
 * for translating between audio files and streams. It also provides a method
 * for obtaining a <code>{@link Line}</code> directly from the
 * <code>AudioSystem</code> without dealing explicitly with mixers.
 * 
 * <p>
 * Properties can be used to specify the default mixer for specific line types.
 * Both system properties and a properties file are considered. In the Sun
 * reference implementation, the properties file is
 * &quot;lib/sound.properties&quot; in the JRE directory. If a property exists
 * both as a system property and in the properties file, the system property
 * takes precedence. If none is specified, a suitable default is chosen among
 * the available devices. The syntax of the properties file is specified in
 * {@link java.util.Properties#load(InputStream) Properties.load}. The following
 * table lists the available property keys and which methods consider them:
 * 
 * <table border=0>
 * <tr>
 * <th>Property Key</th>
 * <th>Interface</th>
 * <th>Affected Method(s)</th>
 * </tr>
 * <tr>
 * <td><code>javax.sound.sampled.Clip</code></td>
 * <td>{@link Clip}</td>
 * <td>{@link #getLine}, {@link #getClip}</td>
 * </tr>
 * <tr>
 * <td><code>javax.sound.sampled.Port</code></td>
 * <td>{@link Port}</td>
 * <td>{@link #getLine}</td>
 * </tr>
 * <tr>
 * <td><code>javax.sound.sampled.SourceDataLine</code></td>
 * <td>{@link SourceDataLine}</td>
 * <td>{@link #getLine}, {@link #getSourceDataLine}</td>
 * </tr>
 * <tr>
 * <td><code>javax.sound.sampled.TargetDataLine</code></td>
 * <td>{@link TargetDataLine}</td>
 * <td>{@link #getLine}, {@link #getTargetDataLine}</td>
 * </tr>
 * </table>
 * 
 * The property value consists of the provider class name and the mixer name,
 * separated by the hash mark (&quot;#&quot;). The provider class name is the
 * fully-qualified name of a concrete
 * {@link javax.sound.sampled.spi.MixerProvider mixer provider} class. The mixer
 * name is matched against the <code>String</code> returned by the
 * <code>getName</code> method of <code>Mixer.Info</code>. Either the class
 * name, or the mixer name may be omitted. If only the class name is specified,
 * the trailing hash mark is optional.
 * 
 * <p>
 * If the provider class is specified, and it can be successully retrieved from
 * the installed providers, the list of <code>Mixer.Info</code> objects is
 * retrieved from the provider. Otherwise, or when these mixers do not provide a
 * subsequent match, the list is retrieved from {@link #getMixerInfo} to contain
 * all available <code>Mixer.Info</code> objects.
 * 
 * <p>
 * If a mixer name is specified, the resulting list of <code>Mixer.Info</code>
 * objects is searched: the first one with a matching name, and whose
 * <code>Mixer</code> provides the respective line interface, will be returned.
 * If no matching <code>Mixer.Info</code> object is found, or the mixer name is
 * not specified, the first mixer from the resulting list, which provides the
 * respective line interface, will be returned.
 * 
 * For example, the property <code>javax.sound.sampled.Clip</code> with a value
 * <code>&quot;com.sun.media.sound.MixerProvider#SunClip&quot;</code> will have
 * the following consequences when <code>getLine</code> is called requesting a
 * <code>Clip</code> instance: if the class
 * <code>com.sun.media.sound.MixerProvider</code> exists in the list of
 * installed mixer providers, the first <code>Clip</code> from the first mixer
 * with name <code>&quot;SunClip&quot;</code> will be returned. If it cannot be
 * found, the first <code>Clip</code> from the first mixer of the specified
 * provider will be returned, regardless of name. If there is none, the first
 * <code>Clip</code> from the first <code>Mixer</code> with name
 * <code>&quot;SunClip&quot;</code> in the list of all mixers (as returned by
 * <code>getMixerInfo</code>) will be returned, or, if not found, the first
 * <code>Clip</code> of the first <code>Mixer</code>that can be found in the
 * list of all mixers is returned. If that fails, too, an
 * <code>IllegalArgumentException</code> is thrown.
 * 
 * @author Kara Kytle
 * @author Florian Bomers
 * @author Matthias Pfisterer
 * @author Kevin P. Smith
 * 
 * @see AudioFormat
 * @see AudioInputStream
 * @see Mixer
 * @see Line
 * @see Line.Info
 * @since 1.3
 */
public class AudioSystem {

	/**
	 * An integer that stands for an unknown numeric value. This value is
	 * appropriate only for signed quantities that do not normally take negative
	 * values. Examples include file sizes, frame sizes, buffer sizes, and sample
	 * rates. A number of Java Sound constructors accept a value of
	 * <code>NOT_SPECIFIED</code> for such parameters. Other methods may also
	 * accept or return this value, as documented.
	 */
	public static final int NOT_SPECIFIED = -1;

	/**
	 * Obtains a line that matches the description in the specified
	 * <code>Line.Info</code> object.
	 * 
	 * <p>
	 * If a <code>DataLine</code> is requested, and <code>info</code> is an
	 * instance of <code>DataLine.Info</code> specifying at least one fully
	 * qualified audio format, the last one will be used as the default format of
	 * the returned <code>DataLine</code>.
	 * 
	 * <p>
	 * If system properties <code>javax.sound.sampled.Clip</code>,
	 * <code>javax.sound.sampled.Port</code>,
	 * <code>javax.sound.sampled.SourceDataLine</code> and
	 * <code>javax.sound.sampled.TargetDataLine</code> are defined or they are
	 * defined in the file &quot;sound.properties&quot;, they are used to retrieve
	 * default lines. For details, refer to the {@link AudioSystem class
	 * description}.
	 * 
	 * If the respective property is not set, or the mixer requested in the
	 * property is not installed or does not provide the requested line, all
	 * installed mixers are queried for the requested line type. A Line will be
	 * returned from the first mixer providing the requested line type.
	 * 
	 * @param info
	 *          a <code>Line.Info</code> object describing the desired kind of
	 *          line
	 * @return a line of the requested kind
	 * 
	 * @throws LineUnavailableException
	 *           if a matching line is not available due to resource restrictions
	 * @throws SecurityException
	 *           if a matching line is not available due to security restrictions
	 * @throws IllegalArgumentException
	 *           if the system does not support at least one line matching the
	 *           specified <code>Line.Info</code> object through any installed
	 *           mixer
	 */

	public static javax.sound.sampled.Line getLine(
			javax.sound.sampled.Line.Info info) throws LineUnavailableException {
		javax.sound.sampled.Line line = JSToolkit.getAudioLine(info);
		if (line != null)
			return line;

		// otherwise, the requested line was not supported, so throw
		// an Illegal argument exception
		throw new IllegalArgumentException("No line matching " + info.toString()
				+ " is supported.");
	}

	public static javax.sound.sampled.AudioInputStream getAudioInputStream(
			ByteArrayInputStream stream)
			throws javax.sound.sampled.UnsupportedAudioFileException {
		return JSAudio.getAudioInputStream(stream);
	}

  /**
   * Obtains the audio file format of the specified URL.  The URL must
   * point to valid audio file data.
   * @param url the URL from which file format information should be
   * extracted
   * @return an <code>AudioFileFormat</code> object describing the audio file format
   * @throws UnsupportedAudioFileException if the URL does not point to valid audio
   * file data recognized by the system
   * @throws IOException if an input/output exception occurs
   */
  public static javax.sound.sampled.AudioFileFormat getAudioFileFormat(URL url)
      throws javax.sound.sampled.UnsupportedAudioFileException, IOException {

  	javax.sound.sampled.AudioInputStream ais = getAudioInputStream(url);
  	
    javax.sound.sampled.AudioFormat format = (javax.sound.sampled.AudioFormat) (Object) (ais == null ? null : ais.getFormat());

      if( format==null )
          throw new javax.sound.sampled.UnsupportedAudioFileException("file is not a supported file type");
     
      return new AudioFileFormat(AudioFileFormat.Type.getType(format), format, AudioSystem.NOT_SPECIFIED);
    
  }

  /**
   * Obtains an audio input stream from the provided input stream.  The stream must
   * point to valid audio file data.  The implementation of this method may
   * require multiple parsers to
   * examine the stream to determine whether they support it.  These parsers must
   * be able to mark the stream, read enough data to determine whether they
   * support the stream, and, if not, reset the stream's read pointer to its original
   * position.  If the input stream does not support these operation, this method may fail
   * with an <code>IOException</code>.
   * @param stream the input stream from which the <code>AudioInputStream</code> should be
   * constructed
   * @return an <code>AudioInputStream</code> object based on the audio file data contained
   * in the input stream.
   * @throws UnsupportedAudioFileException if the stream does not point to valid audio
   * file data recognized by the system
   * @throws IOException if an I/O exception occurs
   * @throws javax.sound.sampled.UnsupportedAudioFileException 
   * @see InputStream#markSupported
   * @see InputStream#mark
   */
  public static javax.sound.sampled.AudioInputStream getAudioInputStream(InputStream stream)
      throws javax.sound.sampled.UnsupportedAudioFileException, IOException, javax.sound.sampled.UnsupportedAudioFileException {

  	if (stream instanceof ByteArrayInputStream) 
  		return getAudioInputStream((ByteArrayInputStream) stream);
  	
  	return getAudioInputStream(new ByteArrayInputStream(Rdr.getLimitedStreamBytes(stream, -1)));

  }

	/**
	 * Obtains an audio input stream from the URL provided. The URL must point to
	 * valid audio file data.
	 * 
	 * @param url
	 *          the URL for which the <code>AudioInputStream</code> should be
	 *          constructed
	 * @return an <code>AudioInputStream</code> object based on the audio file
	 *         data pointed to by the URL
	 * @throws UnsupportedAudioFileException
	 *           if the URL does not point to valid audio file data recognized by
	 *           the system
	 * @throws IOException
	 *           if an I/O exception occurs
	 */
	public static javax.sound.sampled.AudioInputStream getAudioInputStream(URL url)
			throws javax.sound.sampled.UnsupportedAudioFileException, IOException {
		return getAudioInputStream(JSToolkit.getURLInputStream(url, false));
	}

}
