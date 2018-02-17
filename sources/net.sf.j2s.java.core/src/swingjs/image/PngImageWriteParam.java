package swingjs.image;

import java.util.Locale;

import javax.imageio.ImageWriteParam;

public class PngImageWriteParam extends ImageWriteParam {

	public PngImageWriteParam(Locale l) {
		super(l);
		canWriteCompressed = false;
	}

}
