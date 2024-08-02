import RawImage from '@/RawImage';
import fs from 'node:fs';

export default class ImageWriter {
  static toP3(image: RawImage) {
    let p3image = `P3 ${image.width} ${image.height} 255 `;

    for (let i = 0; i < image.height; i++) {
      for (let j = 0; j < image.width; j++) {
        for (let k = 0; k < image.channels; k++) {
          p3image +=
            image.data[(image.width * i + j) * image.channels + k] + ' ';
        }
      }
    }

    fs.writeFile('./imgs/test.ppm', p3image, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  static toP6(image: RawImage) {
    const header = `P6 ${image.width} ${image.height} 255\n`;
    const headerEncode = new TextEncoder().encode(header);

    const fileBytes = new Uint8Array(header.length + image.data.length);
    fileBytes.set(headerEncode, 0);
    fileBytes.set(new Uint8Array(image.data), headerEncode.length);

    fs.writeFile('./imgs/test1.ppm', fileBytes, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}
