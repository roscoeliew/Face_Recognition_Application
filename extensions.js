////////CARTOON EFFECT////////
function applyCartoonEffect() {
    if (capturedImage) {
        let cartoonImage = createCartoonEffect(capturedImage);
        cells[12] = cartoonImage; // Update cell 12 with the cartoon effect image
    }
}

// Creates a cartoon effect by simplifying colors and adding edges
function createCartoonEffect(img) {
  let cartoonImg = img.get();

  // Simplify the color palette by reducing the number of colors
  cartoonImg.loadPixels();
  for (let i = 0; i < cartoonImg.pixels.length; i += 4) {
    cartoonImg.pixels[i] = floor(cartoonImg.pixels[i] / 64) * 64;
    cartoonImg.pixels[i + 1] = floor(cartoonImg.pixels[i + 1] / 64) * 64;
    cartoonImg.pixels[i + 2] = floor(cartoonImg.pixels[i + 2] / 64) * 64;
  }
  cartoonImg.updatePixels();

  // Apply an edge detection filter
  let edgeImg = createEdgeMask(cartoonImg);

  // Combine the edge image with the simplified color image
  cartoonImg.loadPixels();
  edgeImg.loadPixels();
  for (let i = 0; i < cartoonImg.pixels.length; i += 4) {
    // If the edge pixel is bright, it means an edge was detected there
    if (brightness(edgeImg.pixels[i], edgeImg.pixels[i + 1], edgeImg.pixels[i + 2]) > 128) {
      // Set the color to black for edges
      cartoonImg.pixels[i] = 0;
      cartoonImg.pixels[i + 1] = 0;
      cartoonImg.pixels[i + 2] = 0;
    }
  }
  cartoonImg.updatePixels();

  return cartoonImg;
}

// Calculates the perceived brightness of a color
function brightness(r, g, b) {
    // Using the luminance formula for perceived brightness
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Creates an edge mask using Sobel edge detection
function createEdgeMask(img) {
    let edgeImg = createImage(img.width, img.height);
    edgeImg.loadPixels();
    img.loadPixels();

    // This loop should go over all pixels except for the border pixels
    for (let y = 1; y < img.height - 1; y++) {
        for (let x = 1; x < img.width - 1; x++) {
            let index = (x + y * img.width) * 4;
            let sumX = 0; // Sum for kernelX
            let sumY = 0; // Sum for kernelY

            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    let pos = ((x + kx) + (y + ky) * img.width) * 4;
                    let val = (img.pixels[pos] + img.pixels[pos + 1] + img.pixels[pos + 2]) / 3; // Use grayscale for edge detection

                    sumX += val * kernelX[kx + 1][ky + 1];
                    sumY += val * kernelY[kx + 1][ky + 1];
                }
            }

            let edgeValue = Math.sqrt(sumX * sumX + sumY * sumY);
            edgeValue = constrain(edgeValue, 0, 255); // Constrain the magnitude

            edgeImg.pixels[index] = edgeValue;
            edgeImg.pixels[index + 1] = edgeValue;
            edgeImg.pixels[index + 2] = edgeValue;
            edgeImg.pixels[index + 3] = 255; // fully opaque
        }
    }

    edgeImg.updatePixels();
    return edgeImg;
}

// Sobel edge detection kernels
const kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];

const kernelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
];

//////COLOURBLIND EFFECT//////////
function simulateProtanopia(r, g, b) {
    return {
        r: 0.567 * r + 0.433 * g + 0 * b,
        g: 0.558 * r + 0.442 * g + 0 * b,
        b: 0 * r + 0.242 * g + 0.758 * b
    };
}

// Creates a Protanopia effect by adjusting the color channels
function createProtanopiaEffect(img) {
    let ProtanopiaImg = img.get();
    ProtanopiaImg.loadPixels();
    for (let i = 0; i < ProtanopiaImg.pixels.length; i += 4) {
        let r = ProtanopiaImg.pixels[i];
        let g = ProtanopiaImg.pixels[i + 1];
        let b = ProtanopiaImg.pixels[i + 2];
        let adjustedColor = simulateProtanopia(r, g, b);
        ProtanopiaImg.pixels[i] = adjustedColor.r;
        ProtanopiaImg.pixels[i + 1] = adjustedColor.g;
        ProtanopiaImg.pixels[i + 2] = adjustedColor.b;
    }
    ProtanopiaImg.updatePixels();
    return ProtanopiaImg;
}

// Applies the Protanopia effect to the captured image
function applyProtanopiaEffect() {
    if (capturedImage) {
        let ProtanopiaImage = createProtanopiaEffect(capturedImage);
        cells[12] = ProtanopiaImage; // Update cell 12 with the Protanopia effect image
    }
}

// Simulates the Tritanopia type of color blindness
function simulateTritanopia(r, g, b) {
    return {
        r: 0.95 * r + 0.05 * g,
        g: 0 * r + 0.433 * g + 0.567 * b,
        b: 0 * r + 0.475 * g + 0.525 * b
    };
}

// Creates a Tritanopia effect by adjusting the color channels
function createTritanopiaEffect(img) {
    let tritanopiaImage = img.get(); // Changed from tritanopiaImg to tritanopiaImage
    tritanopiaImage.loadPixels();
    for (let i = 0; i < tritanopiaImage.pixels.length; i += 4) {
        let r = tritanopiaImage.pixels[i];
        let g = tritanopiaImage.pixels[i + 1];
        let b = tritanopiaImage.pixels[i + 2];
        let adjustedColor = simulateTritanopia(r, g, b);
        tritanopiaImage.pixels[i] = adjustedColor.r;
        tritanopiaImage.pixels[i + 1] = adjustedColor.g;
        tritanopiaImage.pixels[i + 2] = adjustedColor.b;
    }
    tritanopiaImage.updatePixels();
    return tritanopiaImage;
}

// Applies the Tritanopia effect to the captured image
function applyTritanopiaEffect() {
    if (capturedImage) {
        let tritanopiaImage = createTritanopiaEffect(capturedImage);
        cells[12] = tritanopiaImage; // Update cell 12 with the Tritanopia effect image
    }
}