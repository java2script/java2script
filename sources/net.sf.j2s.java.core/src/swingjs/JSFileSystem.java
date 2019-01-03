package swingjs;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileDescriptor;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
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
import swingjs.JSFileSystem.JSMappedByteBuffer;

/**
 * very rough - not fleshed out.
 * 
 * @author hansonr
 *
 */
public class JSFileSystem extends FileSystem {

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

		// Used by FileInputStream.getChannel() and RandomAccessFile.getChannel()
		public static FileChannel open(FileDescriptor fd, String path, boolean readable, boolean writable,
				Object parent) {
			return new JSFileChannel(fd, path, readable, writable, false, parent);
		}

		// Used by FileOutputStream.getChannel
		public static FileChannel open(FileDescriptor fd, String path, boolean readable, boolean writable,
				boolean append, Object parent) {
			return new JSFileChannel(fd, path, readable, writable, append, parent);
		}

		public JSFileChannel(Path path, Set<? extends OpenOption> options, FileAttribute<?>[] attrs) {
			this.fd = null;
			this.parent = null;
			this.path= (JSPath) path;
			try {
				bc = new JSByteChannel(this.path, options, attrs);
			} catch (FileAlreadyExistsException e) {
			}
		}

		private FileDescriptor fd;
		private Object parent; // possibly a FileOutputStream
		private JSPath path;
		private JSByteChannel bc;

		private JSFileChannel(FileDescriptor fd, String path, boolean readable, boolean writable, boolean append,
				Object parent) {
			this.fd = fd;
			this.parent = parent;
			this.path = (JSPath) new File(path).toPath();

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
				bc = new JSByteChannel(this.path, options, NO_ATTRIBUTES);
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
			path._bytes = bc._bytes;
			JSUtil.cacheFileData(path.name, path._bytes);
		}

		
		@Override
		public long transferTo(long position, long count, WritableByteChannel target) throws IOException {
			long n = bc.transferTo((int) position, ((JSByteChannel) target), ((JSByteChannel) target).pos, (int) count, false);
			return n;
		}

		@Override
		public long transferFrom(ReadableByteChannel src, long position, long count) throws IOException {
			return ((JSByteChannel) src).transferTo(((JSByteChannel) src).pos, bc, (int) position, (int) count, true);
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
			return new JSMappedByteBuffer(bc._bytes, -1, (int) position, (int) size, (int) size, 0, fd);
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

		long tCreate, tMod, tAccess;
		private JSPath path;
		private byte[] _bytes;
		private BufferedInputStream bis;
		protected int pos, len;
		private JSFileAttribute<?>[] attrs;
		private boolean open, append, write, delete;
		private JSFileAttributes fsAttrs;

		public JSByteChannel(JSPath path, Set<? extends OpenOption> options, FileAttribute<?>[] attrs)
				throws FileAlreadyExistsException {
			this.path = path;
			this.attrs = (JSFileAttribute<?>[]) attrs;

			// APPEND, CREATE, CREATE_NEW, DELETE_ON_CLOSE,
			// READ, TRUNCATE_EXISTING, WRITE,

			write = options.contains(StandardOpenOption.WRITE);
			append = options.contains(StandardOpenOption.APPEND);
			delete = options.contains(StandardOpenOption.DELETE_ON_CLOSE);
			boolean truncate = options.contains(StandardOpenOption.TRUNCATE_EXISTING);
			boolean create = options.contains(StandardOpenOption.CREATE);
			boolean createNew = options.contains(StandardOpenOption.CREATE_NEW);
			if (append) {
				write = true;
				pos = len = getBytes().length;
			} else if (write) {
				if (create || createNew) {
					if (createNew) {
						byte[] b = JSUtil.getFileAsBytes(path.name, true);
						if (b != null)
							throw new FileAlreadyExistsException(path.name);
					}
					path._bytes = null;
					JSUtil.cacheFileData(path.name, null);
				} else if (truncate) {
					path._bytes = null;
				}
				if (path._bytes == null) {
					_bytes = new byte[4096];
				} else {
					getBytes();
				}
			}
		}


		@Override
		public boolean isOpen() {
			return open;
		}

		@Override
		public void close() throws IOException {
			open = false;
			if (delete) {
				_bytes = null;
				JSUtil.cacheFileData(path.name, null);
			} else if (write) {
				if (len < _bytes.length)
					_bytes = Arrays.copyOf(_bytes, len);
				path._bytes = _bytes;
				JSUtil.cacheFileData(path.name, _bytes);
				JSUtil.saveFile(path.name, _bytes, null, null);
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
			System.arraycopy(_bytes, pos, dst.array(), dst.arrayOffset() + dst.position(), n);
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
			return _get(src.array(), src.position() + src.arrayOffset(), pos, n, true);
		}

		public long transferTo(int fromPos, JSByteChannel bc, int toPos, int n, boolean updatePos) {
			n = Math.min(len - fromPos, n);
			return bc._get(_bytes, fromPos, toPos, n, updatePos);
		}

		private int _get(byte[] array, int from, int to, int n, boolean updatePos) {
			if (to + n > getBytes().length)
				_bytes = AU.ensureLengthByte(_bytes, (to + n) * 2);
			System.arraycopy(array, from, _bytes, to, n);
			pos += n;
			if (pos > len)
				len = pos;
			if (!updatePos)
				pos -= n;
			return n;
		}


		private byte[] getBytes() {
			if (_bytes == null)
				_bytes = path._bytes;
			if (_bytes == null) {
				_bytes = JSUtil.getFileAsBytes(path.toString());
				len = _bytes.length;
			}
			return _bytes;
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

	public class JSPath implements Path {

		private String name;
		private JSFileSystem fileSystem;

		private String[] nameArray;
		public byte[] _bytes;

		private String[] getNameArray() {
			if (nameArray == null)
				nameArray = (/** @j2sNative name.split('/') || */
				null);
			return nameArray;
		}

		public JSPath(String name, JSFileSystem jsFileSystem) {
			this.name = name;
			this.fileSystem = jsFileSystem;
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
			return name.indexOf(fileSystem.scheme + "://") == 0;
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
			return new JSPath(name.substring(0, Math.max(0, pt)), fileSystem);
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
			String[] c = new String[Math.max(a.length, b.length)];
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
				return new URI(isAbsolute() ? name : "http://./" + name);
			} catch (URISyntaxException e) {
				return null;
			}
		}

		@Override
		public Path toAbsolutePath() {
			Path path = getPath(isAbsolute() ? name : "http://./" + name);
			((JSPath) path)._bytes = _bytes;
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
			f._bytes = _bytes;
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
			return name;
		}

		public void setAttribute(String attribute, Object value) {
			// TODO Auto-generated method stub

		}

	}

	public static class JSFileSystemProvider extends FileSystemProvider {

		private static Map<String, JSFileSystem> fsMap = new Hashtable<>();

		@Override
		public String getScheme() {
			return null;
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
			return getFileSystem(uri).getPath(uri.toString());
		}

		@Override
		public SeekableByteChannel newByteChannel(Path path, Set<? extends OpenOption> options,
				FileAttribute<?>... attrs) throws IOException {
			return new JSByteChannel((JSPath) path, options, attrs);
		}

		@Override
		public FileChannel newFileChannel(Path path, Set<? extends OpenOption> options,
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
			ni();
			throw new IOException();
		}

		@Override
		public void delete(Path path) throws IOException {
			ni();
		}

		@Override
		public void copy(Path source, Path target, CopyOption... options) throws IOException {
			ni();
			throw new IOException();
		}

		@Override
		public void move(Path source, Path target, CopyOption... options) throws IOException {
			ni();
			throw new IOException();
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
			ni();
			return null;
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
		if (more != null)
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
		return new JSFileSystemProvider();
	}

	private static void ni() {
		JSUtil.notImplemented("JSFileSystem");
	}

}
