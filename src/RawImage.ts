export default class RawImage {
  private _data: Uint8Array;

  constructor(
    private _width: number,
    private _height: number,
    private _channels: number = 3,
  ) {
    this._data = new Uint8Array(_width * _height * _channels);
  }

  public get data(): Uint8Array {
    return this._data;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public get channels(): number {
    return this._channels;
  }

  public setPixel(x: number, y: number, color: number[]) {
    if (x >= this._width || y >= this._height) {
      throw new Error('Out of bounds');
    }

    if (color.length > this._channels) {
      throw new Error('Invalid color length');
    }

    const index = (this._width * (this._height - y - 1) + x) * this._channels;
    color.forEach((value, i) => {
      this._data[index + i] = value;
    });
  }
}
