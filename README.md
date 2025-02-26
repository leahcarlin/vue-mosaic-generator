# Photo Mosaic Generator

## What is a Photo Mosaic?

A photo mosaic is a digital image composed of many smaller images arranged in a grid to recreate a larger picture. Each tile in the mosaic contributes to the overall image, resulting in a visually striking effect.

## About the Photo Mosaic Generator

The **Photo Mosaic Generator** is a web application that transforms an uploaded image into a stunning mosaic using images sourced from the [**Unsplash API**](https://unsplash.com/developers)—the largest open collection of high-quality photos.

### Features & Technologies

This project showcases a range of modern development skills, including:

- **File Upload & Processing**: Users can upload an image, which is then analyzed pixel by pixel.
- **Color Analysis & Image Matching**: The app identifies the primary color of each pixel group, then searches the **Unsplash API** for images matching that color.
- **Dynamic Image Replacement**: Selected images are used to reconstruct the original photo as a mosaic.
- **File Download**: Users can download their generated photo mosaic masterpiece.
- **Custom & Reusable Components**: Built with modular components for scalability and maintainability.
- **User Experience (UX) & User Interface (UI)**: Designed with an intuitive and visually appealing interface.
- **State Management with Object-Oriented Programming (OOP)**: Ensures smooth handling of image processing and user interactions.

## Running the Application

The Photo Mosaic Generator consists of two parts: a **frontend** and a **backend**.

### Prerequisites

- Node.js installed on your machine
- An API key from Unsplash

### Running the Frontend & Backend

Each part of the application must be run separately.

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-repo/photo-mosaic-generator.git
   cd photo-mosaic-generator
   ```

2. **Start the frontend**

```sh
  cd mosaic-frontend
  npm install
  npm run start
```

3. **Start the backend**

```sh
  cd mosaic-backend
  npm install
  npm run start
```
