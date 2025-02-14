export class PhotosStore {
  constructor() {
    this.black = [];
    this.white = [];
    this.yellow = [];
    this.orange = [];
    this.red = [];
    this.purple = [];
    this.magenta = [];
    this.green = [];
    this.teal = [];
    this.blue = [];
  }

  addPhotos(color, photos) {
    this[color].push(...photos);
    return this;
  }

  getRandomPhotoByColor(color) {
    const photos = this[color];

    // Check if photos exist and have more than 1 item
    if (!photos || photos.length === 0) {
      console.error(`No photos found for color: ${color}`);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex];
  }
}
