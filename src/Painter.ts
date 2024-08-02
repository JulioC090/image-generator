import Point from '@/Point';
import RawImage from '@/RawImage';

export default class Painter {
  private _fillColor: number[] = [0, 0, 0];

  constructor(private image: RawImage) {}

  setFillColor(color: number[]) {
    this._fillColor = color;
  }

  drawPixel(x: number, y: number, color: number[]) {
    this.image.setPixel(x, y, color);
  }

  drawRect(startPoint: Point, width: number, height: number) {
    for (let i = startPoint.y; i < startPoint.y + width; i++) {
      for (let j = startPoint.x; j < startPoint.x + height; j++) {
        this.image.setPixel(i, j, this._fillColor);
      }
    }
  }

  drawCircle(startPoint: Point, radius: number) {
    for (let i = startPoint.x - radius; i <= startPoint.x + radius; i++) {
      for (let j = startPoint.y - radius; j <= startPoint.y + radius; j++) {
        const distance = Math.sqrt(
          Math.pow(startPoint.x - i, 2) + Math.pow(startPoint.y - j, 2),
        );

        if (distance <= radius) {
          const t = 0.02;
          const u = (radius - distance) / radius;

          if (u < t) {
            const transitionColor = [];
            for (let k = 0; k < this._fillColor.length; k++) {
              transitionColor[k] = (this._fillColor[k] * u) / t;
            }
            this.image.setPixel(i, j, transitionColor);
          } else {
            this.image.setPixel(i, j, this._fillColor);
          }
        }
      }
    }
  }

  drawLine(startPoint: Point, endPoint: Point) {
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xInc = dx / steps;
    const yInc = dy / steps;
    let x = startPoint.x;
    let y = startPoint.y;
    for (let i = 0; i <= steps; i++) {
      this.image.setPixel(Math.round(x), Math.round(y), this._fillColor);
      x += xInc;
      y += yInc;
    }
    this.image.setPixel(endPoint.x, endPoint.y, this._fillColor);
    this.image.setPixel(startPoint.x, startPoint.y, this._fillColor);
  }
}
