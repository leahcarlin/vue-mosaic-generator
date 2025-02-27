const API_URL = "https://photo-mosaic-backend-600fdfdca1b7.herokuapp.com";

export async function getPhotos(query, color) {
  try {
    const response = await fetch(
      `${API_URL}/photos?query=${query}&color=${color}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
