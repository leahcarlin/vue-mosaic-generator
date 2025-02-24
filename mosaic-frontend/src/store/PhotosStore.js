export class PhotosStore {
  constructor() {
    this.themes = {};
  }

  addPhotos(theme, color, photos) {
    // Create theme if it doesn't exist
    if (!this.themes[theme]) {
      this.themes[theme] = {};
    }
    // Create color array if it doesn't exist
    if (!this.themes[theme][color]) {
      this.themes[theme][color] = [];
    }
    this.themes[theme][color].push(...photos);
  }

  getPhotos(theme, color) {
    // Use standard checks to access properties
    if (this.themes[theme] && this.themes[theme][color]) {
      return this.themes[theme][color];
    }
    return []; // Return an empty array if no photos are found
  }

  getRandomPhoto(theme, color) {
    const photos = this.getPhotos(theme, color);

    if (photos.length === 0) {
      console.warn(`No photos found for theme: "${theme}", color: "${color}"`);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex];
  }
}
