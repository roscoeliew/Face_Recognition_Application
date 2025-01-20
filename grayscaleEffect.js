// Grayscale and Brighten image by 20% effect
function convertToGrayscaleAndBrighten(img) {
    img.loadPixels(); // Load pixel data of the image

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let index = (x + y * img.width) * 4; // Calculate the index of the pixel
            let r = img.pixels[index];     // Red value
            let g = img.pixels[index + 1]; // Green value
            let b = img.pixels[index + 2]; // Blue value

            // Convert to grayscale using luminance formula
            let gray = 0.299 * r + 0.587 * g + 0.114 * b;

            // Increase brightness by 20%
            gray = gray * 1.2; // Increase by 20%
            gray = constrain(gray, 0, 255); // Make sure the value is within 0-255

            // Set the pixels to the new grayscale value
            img.pixels[index] = gray;
            img.pixels[index + 1] = gray;
            img.pixels[index + 2] = gray;
        }
    }

    img.updatePixels(); // Update pixel data with changes
    return img;
}