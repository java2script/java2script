package swingjs.image;

import java.util.Locale;

import javax.imageio.ImageWriteParam;

import com.sun.imageio.plugins.jpeg.JPEG;

public class JpgImageWriteParam extends ImageWriteParam {

	JpgImageWriteParam(Locale l) {
		super(l);
		canWriteCompressed = true;
		compressionTypes = new String[] { "JPEG" };
		compressionMode = MODE_COPY_FROM_METADATA;
		compressionType = "JPEG";
		compressionQuality = 0.75f;
	}
	
    public void unsetCompression() {
        if (getCompressionMode() != MODE_EXPLICIT) {
            throw new IllegalStateException
                ("Compression mode not MODE_EXPLICIT!");
        }
        this.compressionQuality = 0.75f;
    }

}
