/*******************************************************************************
 * Copyright (c) 2004, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.core.runtime.adaptor;

import java.io.*;
import org.eclipse.osgi.framework.internal.reliablefile.*;

/**
 * This class manages streams for a FileManager.
 * <p>
 * Clients may not extend this class.
 * </p>
 * @since 3.1
 */
public class StreamManager {
	/**
	 * Open mask. Obtain the best data stream available. If the primary data 
	 * contents are invalid (corrupt, missing, etc.), the data for a prior 
	 * version may be used. 
	 * An IOException will be thrown if a valid data content can not be
	 * determined. 
	 * This is mutually exclusive with <code>OPEN_FAIL_ON_PRIMARY</code>.
	 */
	public static final int OPEN_BEST_AVAILABLE = ReliableFile.OPEN_BEST_AVAILABLE;
	/**
	 * Open mask. Obtain only the data stream for the primary file where any other 
	 * version will not be valid. This should be used for data streams that are 
	 * managed as a group as a prior contents may not match the other group data.
	 * If the primary data is not invalid, a IOException will be thrown.
	 * This is mutually exclusive with <code>OPEN_BEST_AVAILABLE</code>.
	 */
	public static final int OPEN_FAIL_ON_PRIMARY = ReliableFile.OPEN_FAIL_ON_PRIMARY;

	private static boolean useReliableFilesDefault = Boolean.valueOf(System.getProperty("osgi.useReliableFiles")).booleanValue(); //$NON-NLS-1$ //$NON-NLS-2$
	private FileManager manager;
	private boolean useReliableFiles;

	private static final int ST_OPEN = 0;
	private static final int ST_CLOSED = 1;

	/**
	 * Constructor creates a new StreamManager using passed FileManager for storage.
	 * 
	 * @param manager FileManager that manages the files
	 */
	public StreamManager(FileManager manager) {
		this.manager = manager;
		useReliableFiles = useReliableFilesDefault;
	}

	/**
	 * Override the default useage of reliable files by this manager.
	 * @param state Whether to use reliable files for Input/Output streams
	 */
	public void setUseReliableFiles(boolean state) {
		useReliableFiles = state;
	}

	/**
	 * Returns a managed <code>InputStream</code> for a filemanager managed file. 
	 * <code>null</code> can be returned if the given target is not managed. 
	 * This call is equivalent to calling <code>getInputStream(target, OPEN_MASK_BEST_AVAILABLE).</code>
	 * 
	 * @param target the base file name of the reliable file to open.
	 * @return an <code>InputStream</code> from the managed target file or 
	 * <code>null</code> if the given target is not managed.
	 * @throws IOException if the file is missing, corrupt or an error occurs.
	 * @see StreamManager#getInputStream(String, int)
	 */
	public InputStream getInputStream(String target) throws IOException {
		return getInputStream(target, OPEN_BEST_AVAILABLE);
	}

	/**
	 * Returns a managed <code>InputStream</code> for a filemanager managed file. 
	 * <code>null</code> can be returned if the given target is not managed. 
	 * The <code>openMask<code> modifies the behavior of obtaining the data stream
	 * and can be ORed together.
	 * 
	 * @param target the base file name of the reliable file to open.
	 * a backup version is not acceptable.
	 * @param openMask mask used to open the input target.
	 * @return an <code>InputStream</code> from the managed target file or 
	 * <code>null</code> if the given target is not managed.
	 * @throws IOException if the file is missing, corrupt or an error occurs.
	 * @see #OPEN_BEST_AVAILABLE
	 * @see #OPEN_FAIL_ON_PRIMARY
	 */
	public InputStream getInputStream(String target, int openMask) throws IOException {

		if (useReliableFiles) {
			int id = manager.getId(target);
			return new ReliableFileInputStream(new File(manager.getBase(), target), id, openMask);
		}
		File lookup = manager.lookup(target, false);
		if (lookup == null)
			return null;
		return new FileInputStream(lookup);
	}

	/**
	 * Returns an <code>OutputStream</code> for a filemanager managed file from a 
	 * given base name. If enabled, the output stream will represent an OutputStream that
	 * will be validated before reading. Closing the ouput stream will update filemanager
	 * with the new target file.
	 * 
	 * @param target the base file name of the file to write.
	 * @return <code>OutputStream</code> of a managed file with name of target.
	 * @throws IOException if an error occurs opening the file.
	 */
	public StreamManagerOutputStream getOutputStream(String target) throws IOException {
		if (useReliableFiles) {
			ReliableFileOutputStream out = new ReliableFileOutputStream(new File(manager.getBase(), target));
			return new StreamManagerOutputStream(out, this, target, null, ST_OPEN);
		}
		File tmpFile = manager.createTempFile(target);
		return new StreamManagerOutputStream(new FileOutputStream(tmpFile), this, target, tmpFile, ST_OPEN);
	}

	/**
	 * Returns an array of <code>OutputStream</code> for a set of managed file names.
	 * If enabled, the output streams will represent OutputStreams that can be 
	 * validated before reading. When all OutputStreams have been closed, filemanager
	 * will be updated with the new target files. Aborting any one of the streams will
	 * cause the entire set to abort and be discarded.
	 * 
	 * @param targets list of base file names to write.
	 * @return an array of managed output streams respectively of targets.
	 * @throws IOException if an error occurs opening the files.
	 * @see StreamManagerOutputStream#close()
	 * @see StreamManagerOutputStream#abort()
	 */
	public StreamManagerOutputStream[] getOutputStreamSet(String[] targets) throws IOException {
		int count = targets.length;
		StreamManagerOutputStream[] streams = new StreamManagerOutputStream[count];
		int idx = 0;
		try {
			for (; idx < count; idx++) {
				StreamManagerOutputStream newStream = getOutputStream(targets[idx]);
				newStream.setStreamSet(streams);
				streams[idx] = newStream;
			}
		} catch (IOException e) {
			// cleanup
			for (int jdx = 0; jdx < idx; jdx++)
				streams[jdx].abort();
			throw e;
		}
		return streams;
	}

	/**
	 * Instructs this manager to abort and discard a stream manager provided output stream(s).
	 * This method should be used if any errors occur after opening a filemanager
	 * output stream where the contents should not be saved. This method should
	 * be used instead of closing the <code>OutputStream</code>.
	 * If this output stream is part of a set, all other output streams in this set
	 * will also be closed and aborted.
	 * @param out the filemanager provided <code>OutputStream</code>.
	 * @see #getOutputStream(String)
	 * @see #getOutputStreamSet(String[])
	 */
	void abortOutputStream(StreamManagerOutputStream out) {
		StreamManagerOutputStream[] set = out.getStreamSet();
		if (set == null) {
			set = new StreamManagerOutputStream[] {out};
		}
		synchronized (set) {
			for (int idx = 0; idx < set.length; idx++) {
				out = set[idx];
				if (out.getOutputFile() == null) {
					// this is a ReliableFileOutpuStream
					ReliableFileOutputStream rfos = (ReliableFileOutputStream) out.getOutputStream();
					rfos.abort();
				} else {
					// plain FileOutputStream();
					if (out.getState() == ST_OPEN) {
						try {
							out.getOutputStream().close();
						} catch (IOException e) {/*do nothing*/
						}
					}
					out.getOutputFile().delete();
				}
				out.setState(ST_CLOSED);
			}
		}
	}

	/**
	 * Close the filemanager <code>OutputStream</code> and update the new file to  
	 * filemanager. If this output stream is part of a set, only after closing
	 * all output streams will filemanager be updated.
	 * 
	 * @param smos the output stream.
	 * @throws IOException if an errors occur.
	 * @see #getOutputStream(String)
	 * @see #getOutputStreamSet(String[])
	 */
	void closeOutputStream(StreamManagerOutputStream smos) throws IOException {
		if (smos.getState() != ST_OPEN)
			return;
		StreamManagerOutputStream[] streamSet = smos.getStreamSet();
		if (smos.getOutputFile() == null) {
			// this is a ReliableFileOutputStream
			ReliableFileOutputStream rfos = (ReliableFileOutputStream) smos.getOutputStream();
			// FileManager manage file deletes
			File file = rfos.closeIntermediateFile();
			smos.setState(ST_CLOSED);
			String target = smos.getTarget();
			if (streamSet == null) {
				manager.add(target, FileManager.FILETYPE_RELIABLEFILE);
				manager.update(new String[] {smos.getTarget()}, new String[] {file.getName()});
				ReliableFile.fileUpdated(new File(manager.getBase(), smos.getTarget()));
			}
		} else {
			// this is a plain old file output steam
			OutputStream out = smos.getOutputStream();
			out.flush();
			try {
				((FileOutputStream) out).getFD().sync();
			} catch (SyncFailedException e) {/*ignore*/
			}
			out.close();
			smos.setState(ST_CLOSED);
			String target = smos.getTarget();
			if (streamSet == null) {
				manager.add(target, FileManager.FILETYPE_STANDARD);
				manager.update(new String[] {target}, new String[] {smos.getOutputFile().getName()});
			}
		}

		if (streamSet != null) {
			synchronized (streamSet) {
				//check all the streams to see if there are any left open....
				for (int idx = 0; idx < streamSet.length; idx++) {
					if (streamSet[idx].getState() == ST_OPEN)
						return; //done
				}
				//all streams are closed, we need to update fileManager
				String[] targets = new String[streamSet.length];
				String[] sources = new String[streamSet.length];
				for (int idx = 0; idx < streamSet.length; idx++) {
					smos = streamSet[idx];
					targets[idx] = smos.getTarget();
					File outputFile = smos.getOutputFile();
					if (outputFile == null) {
						// this is a ReliableFile 
						manager.add(smos.getTarget(), FileManager.FILETYPE_RELIABLEFILE);
						ReliableFileOutputStream rfos = (ReliableFileOutputStream) smos.getOutputStream();
						File file = rfos.closeIntermediateFile(); //multiple calls to close() ok
						sources[idx] = file.getName();
						ReliableFile.fileUpdated(new File(manager.getBase(), smos.getTarget()));
					} else {
						manager.add(smos.getTarget(), FileManager.FILETYPE_STANDARD);
						sources[idx] = outputFile.getName();
					}
				}
				manager.update(targets, sources);
			}
		}
	}

	/**
	 * Get the FileManager used by this stream manager.
	 * @return the file manager being used by this stream manager.
	 * @see FileManager
	 */
	public FileManager getFileManager() {
		return manager;
	}
}
