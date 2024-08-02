import ImageWriter from '@/ImageWriter';
import Painter from '@/Painter';
import Point from '@/Point';
import RawImage from '@/RawImage';

const image = new RawImage(128, 128);
const painter = new Painter(image);

painter.setFillColor([128, 128, 0]);
painter.drawCircle(new Point(64, 64), 63);

painter.setFillColor([0, 0, 0]);
painter.drawCircle(new Point(32, 76), 12);
painter.drawCircle(new Point(96, 76), 12);
painter.drawLine(new Point(32, 32), new Point(96, 32));

ImageWriter.toPPM(image);
