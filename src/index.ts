import ImageWriter from '@/ImageWriter';
import Painter from '@/Painter';
import RawImage from '@/RawImage';

const image = new RawImage(128, 128);
const painter = new Painter(image);

painter.setFillColor([128, 128, 0]);
painter.drawCircle(64, 64, 63);

painter.setFillColor([0, 0, 0]);
painter.drawCircle(32, 76, 12);
painter.drawCircle(96, 76, 12);
painter.drawLine(32, 32, 96, 32);

ImageWriter.toP3(image);
ImageWriter.toP6(image);
