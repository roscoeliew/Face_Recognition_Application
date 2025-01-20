// Converts an RGB image to CMY
function RGBtoCMY(img) {
    let cmyImage = createImage(img.width, img.height);
    cmyImage.loadPixels();
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];

        // CMY values are the inverse of RGB values, on a scale from 0 to 1
        let c = 1 - (r / 255);
        let m = 1 - (g / 255);
        let y = 1 - (b / 255);

        // Convert the CMY values back to the 0-255 scale
        cmyImage.pixels[i] = c * 255;
        cmyImage.pixels[i + 1] = m * 255;
        cmyImage.pixels[i + 2] = y * 255;
        cmyImage.pixels[i + 3] = img.pixels[i + 3]; // Alpha channel
    }

    cmyImage.updatePixels();
    return cmyImage;
}

// Converts an RGB image to HSV
function RGBtoHSV(img) {
  let hsvImage = createImage(img.width, img.height);
  hsvImage.loadPixels();
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i] / 255;
    let g = img.pixels[i + 1] / 255;
    let b = img.pixels[i + 2] / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    // Convert the HSV values to a scale of 0-255
    h = Math.round(h * 255);
    s = Math.round(s * 255);
    v = Math.round(v * 255);

    // Set the pixels to the new HSV values
    hsvImage.pixels[i] = h;     // Hue
    hsvImage.pixels[i + 1] = s; // Saturation
    hsvImage.pixels[i + 2] = v; // Value
    hsvImage.pixels[i + 3] = 255; // Alpha
  }

  hsvImage.updatePixels();
  return hsvImage;
}

// Applies a threshold to an image based on CMY values
function applyThresholdToCMY(img, thresholdValue) {
    let thresholdedImage = createImage(img.width, img.height);
    thresholdedImage.loadPixels();
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        // Calculate the average of the CMY channels
        let avg = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;

        // Apply threshold to the average value
        let newValue = avg > thresholdValue ? 255 : 0;

        // Set all color channels to the same value for a black and white image
        thresholdedImage.pixels[i] = newValue;     // Red channel
        thresholdedImage.pixels[i + 1] = newValue; // Green channel
        thresholdedImage.pixels[i + 2] = newValue; // Blue channel
        thresholdedImage.pixels[i + 3] = 255;      // Alpha channel
    }

    thresholdedImage.updatePixels();
    return thresholdedImage;
}

// Applies a threshold to an image based on HSV values
function applyThresholdToHSV(img, thresholdValue) {
    let thresholdedImage = createImage(img.width, img.height);
    thresholdedImage.loadPixels();
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        // Apply threshold based on the Value channel
        let newValue = img.pixels[i + 2] > thresholdValue ? 255 : 0;

        // Set all color channels to the same value for a black and white image
        thresholdedImage.pixels[i] = newValue;     // Red channel
        thresholdedImage.pixels[i + 1] = newValue; // Green channel
        thresholdedImage.pixels[i + 2] = newValue; // Blue channel
        thresholdedImage.pixels[i + 3] = 255;      // Alpha channel
    }

    thresholdedImage.updatePixels();
    return thresholdedImage;
}