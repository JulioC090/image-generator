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

  drawRect(x: number, y: number, width: number, height: number) {
    for (let i = y; i < y + width; i++) {
      for (let j = x; j < x + height; j++) {
        this.image.setPixel(i, j, this._fillColor);
      }
    }
  }

  drawCircle(x: number, y: number, radius: number) {
    for (let i = x - radius; i <= x + radius; i++) {
      for (let j = y - radius; j <= y + radius; j++) {
        const distance = Math.sqrt(Math.pow(x - i, 2) + Math.pow(y - j, 2));

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

  drawLine(x0: number, y0: number, x1: number, y1: number) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xInc = dx / steps;
    const yInc = dy / steps;
    let x = x0;
    let y = y0;
    for (let i = 0; i <= steps; i++) {
      this.image.setPixel(Math.round(x), Math.round(y), this._fillColor);
      x += xInc;
      y += yInc;
    }
    this.image.setPixel(x1, y1, this._fillColor);
    this.image.setPixel(x0, y0, this._fillColor);
  }
}
