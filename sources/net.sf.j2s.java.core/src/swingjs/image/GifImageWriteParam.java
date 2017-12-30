package swingjs.image;

import java.util.Locale;

import javax.imageio.ImageWriteParam;

public class GifImageWriteParam extends ImageWriteParam {
	
	GifImageWriteParam(Locale l) {
		super(l);
		canWriteCompressed = true;
		compressionTypes = new String[] { "LZW", "lzw" };
		compressionMode = MODE_COPY_FROM_METADATA;
		compressionType = "LZW";
		compressionQuality = 1f;
	}

}
