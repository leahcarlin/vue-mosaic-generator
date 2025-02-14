export async function getPhotos(query, color) {
  try {
    const response = await fetch(
      `http://localhost:5000/photos?query=${query}&color=${color}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
