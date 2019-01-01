package swingjs;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.ByteBuffer;
import java.nio.channels.SeekableByteChannel;
import java.nio.file.AccessMode;
import java.nio.file.CopyOption;
import java.nio.file.DirectoryStream;
import java.nio.file.DirectoryStream.Filter;
import java.nio.file.FileStore;
import java.nio.file.FileSystem;
import java.nio.file.LinkOption;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.PathMatcher;
import java.nio.file.WatchEvent.Kind;
import java.nio.file.WatchEvent.Modifier;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileAttribute;
import java.nio.file.attribute.FileAttributeView;
import java.nio.file.attribute.UserPrincipalLookupService;
import java.nio.file.spi.FileSystemProvider;
import java.util.Arrays;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javajs.util.AU;
import javajs.util.Rdr;
import swingjs.JSFileSystem.JSSeekableByteChannel;

/**
 * very rough - not fleshed out.
 * 
 * @author hansonr
 *
 */
public class JSFileSystem extends FileSystem {

	public static class JSSeekableByteChannel implements SeekableByteChannel {

		private JSPath path;
		private byte[] _bytes;
		private BufferedInputStream bis;
		private int pos;
		private boolean writing;

		
		public JSSeekableByteChannel(JSPath path) {
			this.path = path;
		}

		@Override
		public boolean isOpen() {
			return true;
		}

		@Override
		public void close() throws IOException {
		}

		@Override
		public int read(ByteBuffer dst) throws IOException {
			int len = dst.remaining();
			_bytes = AU.ensureLengthByte(getBytes(), pos + len);
			byte[] a = dst.array();
			System.arraycopy(_bytes, pos, a, dst.position(), len);
			pos += len;
			return len;
		}

		private byte[] getBytes() {
			if (_bytes == null) {
				if (writing)
					_bytes = new byte[4096];
				else
					_bytes = JSUtil.getFileAsBytes(path.toString());
				
			}
			return _bytes;
		}

		@Override
		public long size() throws IOException {
			return getBytes().length;
		}

		public InputStream getInputStream() {
			return (bis == null ? (bis = Rdr.getBIS(getBytes())) : bis);
		}

		@Override
		public SeekableByteChannel truncate(long size) throws IOException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public int write(ByteBuffer src) throws IOException {
			writing = true;			
			int len = Math.min(src.remaining(), getBytes().length);
			byte[] a = src.array();
			System.arraycopy(a, src.position(), _bytes, pos, len);
			pos += len;
			return len;
		}

		@Override
		public long position() throws IOException {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public SeekableByteChannel position(long newPosition) throws IOException {
			// TODO Auto-generated method stub
			return null;
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
				nameArray = (/** @j2sNative name.split('/') || */null);
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
			return (name.startsWith(((JSPath)other).name));
		}

		@Override
		public boolean startsWith(String other) {
			return name.startsWith(other);
		}

		@Override
		public boolean endsWith(Path other) {
			return name.endsWith(((JSPath)other).name);
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
			return new JSSeekableByteChannel((JSPath)path);
		}

		@Override
		public DirectoryStream<Path> newDirectoryStream(Path dir, Filter<? super Path> filter) throws IOException {
			return null;
		}

		@Override
		public void createDirectory(Path dir, FileAttribute<?>... attrs) throws IOException {
			throw new IOException();
		}

		@Override
		public void delete(Path path) throws IOException {
		}

		@Override
		public void copy(Path source, Path target, CopyOption... options) throws IOException {
			throw new IOException();
		}

		@Override
		public void move(Path source, Path target, CopyOption... options) throws IOException {
			throw new IOException();
		}

		@Override
		public boolean isSameFile(Path path, Path path2) throws IOException {
			throw new IOException();
		}

		@Override
		public boolean isHidden(Path path) throws IOException {
			throw new IOException();
		}

		@Override
		public FileStore getFileStore(Path path) throws IOException {
			throw new IOException();
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
		}

	}

	private String scheme;

	public JSFileSystem(String scheme) {
		this.scheme = scheme;
	}

	@Override
	public void close() throws IOException {
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

	@Override
	public Set<String> supportedFileAttributeViews() {
		ni();
		return null;
	}

	@Override
	public Path getPath(String first, String... more) {
		if (more != null)
			first = (first == null ? "" : first + "/") + (/** @j2sNative more.join("/")||*/""); 
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
