package swingjs.image;

import java.io.IOException;

import javax.imageio.IIOImage;
import javax.imageio.ImageReader;
import javax.imageio.ImageWriteParam;
import javax.imageio.metadata.IIOMetadata;

/**
 * SwingJS implementation using output channels (javajs.util.OC)
 * to create PNG, GIF, JPG, or JPG64 image data. 
 *
 * @see ImageReader
 * @see ImageWriteParam
 * @see javax.imageio.spi.IIORegistry
 * @see javax.imageio.spi.ImageWriterSpi
 *
 */
public class PngImageWriter extends JSImageWriter {
	public PngImageWriter() {
		super();
		params.put("type", "PNG");
	}

	@Override
	public void write(IIOMetadata streamMetadata, IIOImage image, ImageWriteParam param) throws IOException {
		setMetaData(streamMetadata);
		if (param == null)
			param = getDefaultWriteParam();
		write(image);
	}

	@Override
	public ImageWriteParam getDefaultWriteParam() {
		return new PngImageWriteParam(null);
	}


}
