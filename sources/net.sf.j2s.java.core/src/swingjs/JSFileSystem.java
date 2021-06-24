package swingjs;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileDescriptor;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;
import java.nio.channels.ReadableByteChannel;
import java.nio.channels.SeekableByteChannel;
import java.nio.channels.WritableByteChannel;
import java.nio.file.AccessMode;
import java.nio.file.CopyOption;
import java.nio.file.DirectoryStream;
import java.nio.file.DirectoryStream.Filter;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.FileStore;
import java.nio.file.FileSystem;
import java.nio.file.LinkOption;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.PathMatcher;
import java.nio.file.StandardOpenOption;
import java.nio.file.WatchEvent.Kind;
import java.nio.file.WatchEvent.Modifier;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.nio.file.attribute.BasicFileAttributeView;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileAttribute;
import java.nio.file.attribute.FileAttributeView;
import java.nio.file.attribute.FileStoreAttributeView;
import java.nio.file.attribute.FileTime;
import java.nio.file.attribute.UserPrincipalLookupService;
import java.nio.file.spi.FileSystemProvider;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javajs.util.AU;

/**
 * very rough - not fleshed out.
 * 
 * @author hansonr
 *
 */
public class JSFileSystem extends FileSystem {

	public static class JSFileStore extends FileStore {

		@Override
		public String name() {
			return "JSFileSystem";
		}

		@Override
		public String type() {
			return "java.util.Hashtable";
		}

		@Override
		public boolean isReadOnly() {
			return false;
		}

		@Override
		public long getTotalSpace() throws IOException {
			return Integer.MAX_VALUE * 256;
		}

		@Override
		public long getUsableSpace() throws IOException {
			return Integer.MAX_VALUE * 256;
		}

		@Override
		public long getUnallocatedSpace() throws IOException {
			return Integer.MAX_VALUE * 256;
		}

		@Override
		public boolean supportsFileAttributeView(Class<? extends FileAttributeView> type) {
			return false;
		}

		@Override
		public boolean supportsFileAttributeView(String name) {
			return false;
		}

		@Override
		public <V extends FileStoreAttributeView> V getFileStoreAttributeView(Class<V> type) {
			return null;
		}

		@Override
		public Object getAttribute(String attribute) throws IOException {
			return null;
		}

	}

	public static class JSMappedByteBuffer extends MappedByteBuffer {

		public JSMappedByteBuffer(byte[] hb, int mark, int pos, int lim, int cap, int off, FileDescriptor fd) {
			super(hb, mark, pos, lim, cap, off, fd);
		}

	}

	public static class JSFileLock extends FileLock {

		protected JSFileLock(AsynchronousFileChannel channel, long position, long size, boolean shared) {
			super(channel, position, size, shared);
		}

		protected JSFileLock(FileChannel channel, long position, long size, boolean shared) {
			super(channel, position, size, shared);
		}

		@Override
		public boolean isValid() {
			return true;
		}

		@Override
		public void release() throws IOException {
		}

	}

	public static class JSFileChannel extends FileChannel {

		private FileDescriptor fd;
		private Object parent; // possibly a FileOutputStream
		private JSPath path;
		private JSByteChannel bc;

		public static JSFileChannel open(FileDescriptor fd, String path, boolean readable, boolean writable,
				Object parent) throws IOException {
			// Used by FileInputStream.getChannel() and RandomAccessFile.getChannel()
			return open(fd, path, readable, writable, false, parent);
		}

		public static JSFileChannel open(FileDescriptor fd, String path, boolean readable, boolean writable,
				boolean append, Object parent) throws IOException {
			// Used by FileOutputStream.getChannel
			return new JSFileChannel(fd, path, readable, writable, append, parent);
		}

		public JSFileChannel(Path path, Set<? extends OpenOption> options, FileAttribute<?>[] attrs) throws IOException {
			// from JSFileSystemProvider
			this.fd = null;
			this.parent = null;
			this.path= (JSPath) path;
//			try {
				bc = new JSByteChannel(null, this.path, options, attrs);
//			} catch (FileAlreadyExistsException e) {
//			}
		}

		private JSFileChannel(FileDescriptor fd, String path, boolean readable, boolean writable, boolean append,
				Object parent) throws IOException {
			this.fd = fd;
			this.parent = parent;
			this.path = (JSPath) new File(path).toPath();
			if (fd != null && (readable || append))
				this.path.秘bytes = fd._getBytes(true);
			this.path.setIsTempFile(fd._isTempFile());
			Set<StandardOpenOption> options = new HashSet<>();
			if (readable)
				options.add(StandardOpenOption.READ);
			if (writable) {
				options.add(StandardOpenOption.WRITE);
				options.add(StandardOpenOption.CREATE);
			}
			if (append)
				options.add(StandardOpenOption.APPEND);
			try {
				bc = new JSByteChannel(fd, this.path, options, NO_ATTRIBUTES);
			} catch (FileAlreadyExistsException e) {
			}
			// this.nd = new FileDispatcherImpl(append);
		}

		@Override
		public int read(ByteBuffer dst) throws IOException {
			return bc.read(dst);
		}

		@Override
		public long read(ByteBuffer[] dsts, int offset, int length) throws IOException {
			int ntotal = 0;
			for (int n0 = length, i = offset; i < dsts.length && ntotal < n0; i++) {
				int n = bc.read(dsts[i], length, bc.pos, true);
				if (n < 0)
					break;
				ntotal += n;
				length -= n;
			}
			return ntotal;
		}

		@Override
		public int write(ByteBuffer src) throws IOException {
			return bc.write(src);
		}

		@Override
		public long write(ByteBuffer[] srcs, int offset, int length) throws IOException {
			int ntotal = 0;
			for (int n0 = length, i = offset; i < srcs.length && ntotal < n0; i++) {
				int n = bc.write(srcs[i], Math.min(length, srcs[i].remaining()));
				ntotal += n;
				length -= n;
			}
			return ntotal;
		}

		@Override
		public long position() throws IOException {
			return bc.position();
		}

		@Override
		public FileChannel position(long newPosition) throws IOException {
			bc.position(newPosition);
			return this;
		}

		@Override
		public long size() throws IOException {
			return bc.size();
		}

		@Override
		public FileChannel truncate(long size) throws IOException {
			bc.len = (int) size;
			return this;
		}

		@Override
		public void force(boolean metaData) throws IOException {
			if (bc.len < bc.秘bytes.length) {
				path.秘bytes = Arrays.copyOf(bc.秘bytes,  bc.len);
			} else {
				path.秘bytes = bc.秘bytes;
			}
			JSUtil.cacheFileData(path.name, path.秘bytes);
		}
		
		@Override
		public long transferTo(long position, long count, WritableByteChannel target) throws IOException {
			long n = bc.transferTo((int) position, ((JSByteChannel) target), ((JSByteChannel) target).pos, (int) count, false);
			return n;
		}

		@Override
		public long transferFrom(ReadableByteChannel src, long position, long count) throws IOException {
			long n = ((JSByteChannel) src).transferTo(((JSByteChannel) src).pos, bc, position, count, true);
			force(false);
			return n;
		}

		@Override
		public int read(ByteBuffer dst, long position) throws IOException {
			return bc.read(dst, dst.position(), (int) position, false);
		}

		@Override
		public int write(ByteBuffer src, long position) throws IOException {
			return bc._get(src.array(), src.arrayOffset() + src.position(), (int) position, src.remaining(), false);
		}

		@Override
		public MappedByteBuffer map(MapMode mode, long position, long size) throws IOException {
			ni();
			return new JSMappedByteBuffer(bc.秘bytes, -1, (int) position, (int) size, (int) size, 0, fd);
		}

		@Override
		public FileLock lock(long position, long size, boolean shared) throws IOException {
			ni();
			return new JSFileLock(this, position, size, shared);
		}

		@Override
		public FileLock tryLock(long position, long size, boolean shared) throws IOException {
			ni();
			return new JSFileLock(this, position, size, shared);
		}

		@Override
		protected void implCloseChannel() throws IOException {
			bc.close();
		}

	    // From RandomAccessFile
		public void seek(long pos) {
			bc.seek(pos);
		}

		public int read() {
			return bc.read();
		}

		public int readBytes(byte[] b, int off, int len) {
			return bc.readBytes(b, off, len);
		}

		public void write(int b) {
			bc.write(b);
		}

		public void writeBytes(byte[] b, int off, int length) {
			if (length > 0)
				bc.writeBytes(b, off, length);
		}

		public void setLength(long newLength) {
			bc.setLength(newLength);
		}

		public void doSave() {
			// From RandomAccessFile
			bc.doSave = true;
		}

		public int available() {
			return (int) (bc.len - bc.pos);
		}

		public long skip(long n) {
			bc.seek(bc.pos + n);
			return bc.pos;
		}

	}

	public static class JSFileAttributes implements BasicFileAttributes {

		FileTime lastModified;
		FileTime lastAccessed;
		FileTime created;

		private JSByteChannel channel;

		JSFileAttributes() {
		}

		public JSFileAttributes(JSByteChannel channel) {
			this.channel = channel;
		}

		@Override
		public FileTime lastModifiedTime() {
			return (lastModified == null ? FileTime.fromMillis(channel.tMod) : lastModified);
		}

		@Override
		public FileTime lastAccessTime() {
			return (lastAccessed == null ? FileTime.fromMillis(channel.tAccess) : lastAccessed);
		}

		@Override
		public FileTime creationTime() {
			return (created == null ? FileTime.fromMillis(channel.tCreate) : created);
		}

		@Override
		public boolean isRegularFile() {
			return true;
		}

		@Override
		public boolean isDirectory() {
			return false;
		}

		@Override
		public boolean isSymbolicLink() {
			return false;
		}

		@Override
		public boolean isOther() {
			return false;
		}

		@Override
		public long size() {
			try {
				return channel.size();
			} catch (IOException e) {
				return 0;
			}
		}

		@Override
		public Object fileKey() {
			return channel.path.name;
		}

	}

	public static class JSFileAttribute<T> implements FileAttribute {

		String name;
		T value;

		public JSFileAttribute(String name, T value) {
			this.name = name;
			this.value = value;
		}

		@Override
		public String name() {
			return name;
		}

		@Override
		public T value() {
			return value;
		}

	}

	public static class JSByteChannel
			implements SeekableByteChannel, WritableByteChannel, ReadableByteChannel, BasicFileAttributeView {

		/**
		 * flag to indicate that a RAF has opened a file that already has bytes for
		 * writing but never written anything.
		 */
		boolean doSave = false;

		long tCreate, tMod, tAccess;
		private JSPath path;
		private byte[] 秘bytes;
		private BufferedInputStream bis;
		protected int pos, len;
		private JSFileAttribute<?>[] attrs;
		private boolean open, append, write, read, delete;
		private JSFileAttributes fsAttrs;

		public JSByteChannel(FileDescriptor fd, JSPath path, Set<? extends OpenOption> options, FileAttribute<?>[] attrs)
				throws IOException {
			this.path = path;
			this.attrs = (JSFileAttribute<?>[]) attrs;

			// APPEND, CREATE, CREATE_NEW, DELETE_ON_CLOSE,
			// READ, TRUNCATE_EXISTING, WRITE,
			read = options.contains(StandardOpenOption.READ);
			write = options.contains(StandardOpenOption.WRITE);
			append = options.contains(StandardOpenOption.APPEND);
			delete = options.contains(StandardOpenOption.DELETE_ON_CLOSE);
			boolean truncate = options.contains(StandardOpenOption.TRUNCATE_EXISTING);
			boolean create = options.contains(StandardOpenOption.CREATE);
			boolean createNew = options.contains(StandardOpenOption.CREATE_NEW);
			if ((read ||append)  && path.秘bytes == null && fd != null) {
				path.秘bytes = fd._getBytes(true);
			}

			if (read && write) {
				秘bytes = getBytes();
				if (秘bytes == null) {
					秘bytes = new byte[len = 0];
				}
			}
			if (append) {
				write = true;
				pos = len = getBytes().length;
			} else if (write) {
				if (create || createNew) {
					if (createNew) {
						byte[] b = JSUtil.getFileAsBytes(new File(path.name), true);
						if (b != null)
							throw new FileAlreadyExistsException(path.name);
					}
					path.秘bytes = (read ? getBytes() : null);
					// from FileOutputStream
					setPosLen(fd);
					JSUtil.cacheFileData(path.name, path.秘bytes);
				} else if (truncate) {
					path.秘bytes = null;
				}
				if (path.秘bytes == null) {
					秘bytes = new byte[4096];
				} else {
					getBytes();
				}
			} else {
				// readonly
				if (getBytes() == null)
					throw new FileNotFoundException();
				// from FileInputStream
				setPosLen(fd);
			}
			open = true;
		}

		// for RandomAccessFile

		public JSByteChannel(InputStream in) {
			// for Channels.ReadableByteChannelImpl
			try {
				this.秘bytes = in.readAllBytes();
				this.len = this.秘bytes.length;
				open = true;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		private void setPosLen(FileDescriptor fd) {
			if (fd != null) {
				pos = fd._getPos();
				len = fd._getLen();
			}
		}
		
		public void setLength(long newLength) {
			if (len == newLength)
				return;
			len = (int) newLength;
			ensureLength(len);
			if (pos > len)
				pos = len;
		}

		private void ensureLength(int len) {
			秘bytes = Arrays.copyOf(秘bytes, len);
		}

		public void seek(long pos) {
			this.pos = (int) pos;
		}

		public int read() {
			return (pos >= len ? -1 : 秘bytes[pos++]);
		}

		public int readBytes(byte[] b, int off, int len) {
			if (len == 0)
				return 0;
			len = Math.min(this.len - pos, len);
			if (len < 0)
				return -1;
			System.arraycopy(秘bytes, pos, b, off, len);
			return len;
		}

		public void write(int b) {
			if (pos >= len) {
				ensureLength(len + 8192);
				len++;
			}
				秘bytes[pos++] = (byte) b;
		}


		public void writeBytes(byte[] b, int off, int length) {
			if (pos + length >= len) {
				ensureLength(pos + Math.max(length << 1, 8192));
				len = pos + length;
			}
			System.arraycopy(b, off, 秘bytes, pos, length);
			pos += length;
		}


		@Override
		public boolean isOpen() {
			return open;
		}

		@Override
		public void close() throws IOException {
			if (!open)
				return;
			open = false;
			if (delete) {
				秘bytes = null;
				JSUtil.cacheFileData(path.name, null);
			} else if (write) {
				if (!doSave && !path.秘isTempFile)
					return;
				if (len < 秘bytes.length)
					秘bytes = Arrays.copyOf(秘bytes, len);
				path.秘bytes = 秘bytes;
				JSUtil.cacheFileData(path.name, 秘bytes);
				if (!path.秘isTempFile)
					JSUtil.saveFile(path.name, 秘bytes, null, null);
			}
		}

		@Override
		public int read(ByteBuffer dst) throws IOException {
			return read(dst, dst.remaining(), pos, true);
		}

		int read(ByteBuffer dst, int n, int pos, boolean updatePos) {
			n = Math.min(dst.remaining(), Math.min(len - pos, n));
			if (n <= 0)
				return -1;
			System.arraycopy(秘bytes, pos, dst.array(), dst.arrayOffset() + dst.position(), n);
			dst.position(dst.position() + n);
			if (updatePos)
				this.pos += n;
			return n;
		}

		@Override
		public int write(ByteBuffer src) throws IOException {
			return write(src, src.remaining());
		}

		private int write(ByteBuffer src, int n) {
			int srcPos = src.position();
			src.position(srcPos + n);
			return _get(src.array(), srcPos + src.arrayOffset(), pos, n, true);
		}

		public long transferTo(int fromPos, JSByteChannel bc, long toPos, long n, boolean updatePos) {
			n = Math.min(len - fromPos, n);
			return bc._get(秘bytes, (int) fromPos, (int) toPos, (int) n, updatePos);
		}

		private int _get(byte[] array, int from, int to, int n, boolean updatePos) {
			if (to + n > getBytes().length)
				秘bytes = AU.ensureLengthByte(秘bytes, (to + n) * 2);
			System.arraycopy(array, from, 秘bytes, to, n);
			pos += n;
			if (pos > len)
				len = pos;
			if (!updatePos)
				pos -= n;
			return n;
		}


		private byte[] getBytes() {
			if (秘bytes == null) {
				秘bytes = path.秘bytes;
				if (秘bytes == null) {
					秘bytes = JSUtil.getFileAsBytes(path.toJSName());
				}
				if (秘bytes != null)
					len = 秘bytes.length;
			}
			return 秘bytes;
		}

		@Override
		public long size() throws IOException {
			return len;
		}

		public InputStream getInputStream() {
			return (bis == null ? (bis = new BufferedInputStream(new ByteArrayInputStream(getBytes()))) : bis);
		}

		@Override
		public SeekableByteChannel truncate(long size) throws IOException {
			ni();
			return null;
		}

		@Override
		public long position() throws IOException {
			return pos;
		}

		@Override
		public SeekableByteChannel position(long newPosition) throws IOException {
			pos = (int) newPosition;
			return this;
		}

		@Override
		public String name() {
			return "basic";
		}

		@Override
		public BasicFileAttributes readAttributes() throws IOException {
			return getFileAttrs();
		}

		@Override
		public void setTimes(FileTime lastModifiedTime, FileTime lastAccessTime, FileTime createTime)
				throws IOException {
			getFileAttrs();
			fsAttrs.lastModified = lastModifiedTime;
			fsAttrs.lastAccessed = lastAccessTime;
			fsAttrs.created = createTime;
		}

		private JSFileAttributes getFileAttrs() {
			return (fsAttrs == null ? (fsAttrs = new JSFileAttributes(this)) : fsAttrs);
		}

	}

	public class JSPathIterator implements Iterator<Path> {

		private int index;
		private String[] array;

		public JSPathIterator(JSPath jsPath) {
			this.index = (jsPath.isAbsolute() ? 2 : 0);
			this.array = jsPath.getNameArray();
		}

		@Override
		public boolean hasNext() {
			return index < array.length;
		}

		@Override
		public Path next() {
			return getPath(array[index++]);
		}

	}
	
    public String[] list(File f) {
    	return new String[0];
    }

	public class JSPath implements Path {

		private String name;
		private JSFileSystem fileSystem;

		private String[] nameArray;
		public byte[] 秘bytes;
		private boolean 秘isTempFile;
		
		public boolean isTempFile() {
			return 秘isTempFile;
		}

		public void setIsTempFile(boolean isTempFile) {
			this.秘isTempFile = isTempFile;
		}

		private String[] getNameArray() {
			if (nameArray == null)
				nameArray = (/** @j2sNative name.split('/') || */
				null);
			return nameArray;
		}

		public JSPath(String name, JSFileSystem jsFileSystem) {
			this.fileSystem = jsFileSystem;
			while (name.startsWith("././"))
				name = name.substring(2);
			if (name.startsWith(File.temporaryDirectory)
				|| name.startsWith(fileSystem.scheme + ":/" + File.temporaryDirectory))
				setIsTempFile(true);
			this.name = name;
			if (isAbsolute() && !name.startsWith(fileSystem.scheme + "://")) {
				name = fileSystem.scheme + "://" + name.substring(name.indexOf("/") + 1);
			}
			this.name = name;
		}

		public JSPath(Path jsPath) {
			this.name = ((JSPath) jsPath).name;
			this.fileSystem = ((JSPath) jsPath).fileSystem;
			this.nameArray = ((JSPath) jsPath).nameArray;
		}

		@Override
		public FileSystem getFileSystem() {
			return fileSystem;
		}

		@Override
		public boolean isAbsolute() {
			return name.indexOf(fileSystem.scheme + ":/") == 0;
		}

		@Override
		public Path getRoot() {
			if (!isAbsolute())
				return null;
			return new JSPath(fileSystem.scheme + "://", fileSystem);
		}

		@Override
		public Path getFileName() {
			return new JSPath(name.substring(name.lastIndexOf('/') + 1), fileSystem);
		}

		@Override
		public Path getParent() {
			int pt = name.lastIndexOf('/');
			return (pt < 0 ? null : new JSPath(name.substring(0, pt), fileSystem));
		}

		@Override
		public int getNameCount() {
			return getNameArray().length - (isAbsolute() ? 2 : 0);
		}

		@Override
		public Path getName(int index) {
			return new JSPath(getNameArray()[adjustIndex(index)], fileSystem);
		}

		private int adjustIndex(int index) {
			int len = getNameArray().length;
			if (index < 0 || index >= len)
				throw new ArrayIndexOutOfBoundsException();
			return isAbsolute() ? index + 2 : index;
		}

		@Override
		public Path subpath(int beginIndex, int endIndex) {
			return subpath(null, beginIndex, endIndex);
		}

		private Path subpath(String pre, int beginIndex, int endIndex) {
			return getPath(pre, Arrays.copyOfRange(getNameArray(), adjustIndex(beginIndex), adjustIndex(endIndex)));
		}

		@Override
		public boolean startsWith(Path other) {
			return (name.startsWith(((JSPath) other).name));
		}

		@Override
		public boolean startsWith(String other) {
			return name.startsWith(other);
		}

		@Override
		public boolean endsWith(Path other) {
			return name.endsWith(((JSPath) other).name);
		}

		@Override
		public boolean endsWith(String other) {
			return name.endsWith(other);
		}

		@Override
		public Path normalize() {
			return new JSPath(this);
		}

		@Override
		public Path resolve(Path other) {
			if (other.isAbsolute())
				return new JSPath(other);
			return new JSPath(name + "/" + ((JSPath) other).name, fileSystem);
		}

		@Override
		public Path resolve(String other) {
			return resolve(new JSPath(other, fileSystem));
		}

		@Override
		public Path resolveSibling(Path other) {
			return getParent().resolve(other);
		}

		@Override
		public Path resolveSibling(String other) {
			return getParent().resolve(other);
		}

		@Override
		public Path relativize(Path other) {
			if (this.equals(other))
				return new JSPath("", fileSystem);
			if (this.isAbsolute() != other.isAbsolute())
				return null;
			String oname = ((JSPath) other).name;
			if (oname.startsWith(name + "/"))
				return new JSPath("." + oname.substring(name.length()), fileSystem);

			String[] a = ((JSPath) getParent()).getNameArray();
			String[] b = ((JSPath) other.getParent()).getNameArray();
//			String[] c = new String[Math.max(a.length, b.length)];
			int min = Math.min(a.length, b.length);
			int firstDiff = 0;
			for (; firstDiff < min; firstDiff++) {
				if (a[firstDiff] != b[firstDiff])
					break;
			}
			String s;
			if (firstDiff == min && a.length <= b.length) {
				// a/b/c/..../other
				// a/b/c/me
				s = "/.";
			} else {
				// a/b/c/e/me
				// a/b/d/other diff = 2, a.length = 4
				s = "";
				for (int i = a.length - firstDiff; --i >= 0;)
					s += "/..";
			}
			return getPath(s.substring(1), ((JSPath) other.subpath(firstDiff, other.getNameCount())).nameArray);
		}

		@Override
		public URI toUri() {
			try {
				return new URI(toString());
			} catch (URISyntaxException e) {
				return null;
			}
		}

		@Override
		public Path toAbsolutePath() {
			Path path = getPath(toString());
			((JSPath) path).秘bytes = 秘bytes;
			return path;
		}

		@Override
		public Path toRealPath(LinkOption... options) throws IOException {
			// ignoring symbolic link options
			return this;
		}

		@Override
		public File toFile() {
			File f = new File(name);
			f.秘bytes = 秘bytes;
			return f;
		}

		@Override
		public WatchKey register(WatchService watcher, Kind<?>[] events, Modifier... modifiers) throws IOException {
			ni();
			return null;
		}

		@Override
		public WatchKey register(WatchService watcher, Kind<?>... events) throws IOException {
			ni();
			return null;
		}

		@Override
		public Iterator<Path> iterator() {
			return new JSPathIterator(this);
		}

		@Override
		public int compareTo(Path other) {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public String toString() {
			String prefix = fileSystem.scheme;
			if (isAbsolute() || prefix == "file") {
				return name;
			}
//			if (prefix == "file")
//				prefix = "http";
			prefix = (name.startsWith("/") ? "" : prefix + "://./");
			return (name.startsWith(prefix) ? name : prefix + name);
		}

		public void setAttribute(String attribute, Object value) {
			// TODO Auto-generated method stub

		}

		public void set(byte[] bytes, File file) {
            	秘bytes = bytes;
            	setIsTempFile(file.秘isTempFile);
		}

		public String toJSName() {
			if (fileSystem.scheme != "file")
				return toString();
			return (name.startsWith("file:") ? name : "file:/" + name);
		}

	}

	public static class JSFileSystemProvider extends FileSystemProvider {

		private static Map<String, JSFileSystem> fsMap = new Hashtable<>();
		private static Map<String, JSFileSystemProvider> fspMap = new Hashtable<>();
		
		/** Could be "file" or "jar" or "http" or "https"
		 */
		private String scheme;

		public JSFileSystemProvider(String scheme) {
			this.scheme = scheme;
		}

		@Override
		public String getScheme() {
			return scheme;
		}

		@Override
		public FileSystem newFileSystem(URI uri, Map<String, ?> env) throws IOException {
			String scheme = uri.getScheme();
			JSFileSystem fs = fsMap.get(scheme);
			if (fs == null)
				fsMap.put(scheme, fs = new JSFileSystem(scheme));
			return fs;
		}

		@Override
		public FileSystem getFileSystem(URI uri) {
			try {
				return newFileSystem(uri, null);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		}

		@Override
		public Path getPath(URI uri) {
			JSPath p = (JSPath) getFileSystem(uri).getPath(uri.toString());
			p.秘bytes = uri.秘bytes;
			return p;
		}

		@Override
		public SeekableByteChannel newByteChannel(Path path, Set<? extends OpenOption> options,
				FileAttribute<?>... attrs) throws IOException {
			return new JSByteChannel(null, (JSPath) path, options, attrs);
		}

		@Override
		public JSFileChannel newFileChannel(Path path, Set<? extends OpenOption> options,
				FileAttribute<?>... attrs) throws IOException {
			return new JSFileChannel((JSPath) path, options, attrs);
		}

		@Override
		public DirectoryStream<Path> newDirectoryStream(Path dir, Filter<? super Path> filter) throws IOException {
			ni();
			return null;
		}

		@Override
		public void createDirectory(Path dir, FileAttribute<?>... attrs) throws IOException {
//			ni();
//			throw new IOException();
		}

		@Override
		public void delete(Path path) throws IOException {
			JSUtil.removeCachedFileData(((JSPath) path).toJSName());
		}

		@Override
		public void copy(Path source, Path target, CopyOption... options) throws IOException {
			byte[] bytes = ((JSPath) source).秘bytes;
			if (bytes == null || bytes.length == 0) {
				bytes = JSUtil.getFileAsBytes(source.toString());
			}
			if (bytes == null)
				throw new IOException("JSFileSystem " + source + " has no bytes");
			JSUtil.setFileBytesStatic(source, bytes);
			JSUtil.cacheFileData(target.toString(), ((JSPath) target).秘bytes = bytes);
		}

		@Override
		public void move(Path source, Path target, CopyOption... options) throws IOException {
			copy(source, target, options);
			JSUtil.removeCachedFileData(source.toString());
		}

		@Override
		public boolean isSameFile(Path path, Path path2) throws IOException {
			return (path.toString() == path2.toString());
		}

		@Override
		public boolean isHidden(Path path) throws IOException {
			return false;
		}

		@Override
		public FileStore getFileStore(Path path) throws IOException {
			return new JSFileSystem.JSFileStore();
		}

		@Override
		public void checkAccess(Path path, AccessMode... modes) throws IOException {
			ni();
		}

		@Override
		public <V extends FileAttributeView> V getFileAttributeView(Path path, Class<V> type, LinkOption... options) {
			ni();
			return null;
		}

		@Override
		public <A extends BasicFileAttributes> A readAttributes(Path path, Class<A> type, LinkOption... options)
				throws IOException {
			ni();
			throw new IOException();
		}

		@Override
		public Map<String, Object> readAttributes(Path path, String attributes, LinkOption... options)
				throws IOException {
			ni();
			throw new IOException();
		}

		@Override
		public void setAttribute(Path path, String attribute, Object value, LinkOption... options) throws IOException {
			((JSPath) path).setAttribute(attribute, value);
		}

		public static FileSystemProvider getProvider(String scheme) {
			JSFileSystemProvider p = fspMap.get(scheme);
			if (p == null)
				fspMap.put(scheme,  p =  new JSFileSystemProvider(scheme));
			return p;
		}

	}

	private String scheme;

	public JSFileSystem(String scheme) {
		this.scheme = scheme;
	}

	@Override
	public void close() throws IOException {
		// ignore in SwingJS
	}

	@Override
	public boolean isOpen() {
		return true;
	}

	@Override
	public boolean isReadOnly() {
		return false;
	}

	@Override
	public String getSeparator() {
		return "/";
	}

	@Override
	public Iterable<Path> getRootDirectories() {
		ni();
		return null;
	}

	@Override
	public Iterable<FileStore> getFileStores() {
		ni();
		return null;
	}

	private static Set<String> views;

	@Override
	public Set<String> supportedFileAttributeViews() {
		if (views == null) {
			views = new HashSet<>();
			views.add("basic");
		}
		return views;
	}

	@Override
	public Path getPath(String first, String... more) {
		if (more != null && more.length > 0)
			first = (first == null ? "" : first + "/") + (/** @j2sNative more.join("/")|| */
			"");
		return new JSPath(first, this);
	}

	@Override
	public PathMatcher getPathMatcher(String syntaxAndPattern) {
		ni();
		return null;
	}

	@Override
	public UserPrincipalLookupService getUserPrincipalLookupService() {
		ni();
		return null;
	}

	@Override
	public WatchService newWatchService() throws IOException {
		ni();
		return null;
	}
	
	@Override
	public FileSystemProvider provider() {
		return JSFileSystemProvider.getProvider(scheme);
	}

	private static void ni() {
		JSUtil.notImplemented("JSFileSystem");
	}

}
