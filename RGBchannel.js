// Extracts the red channel from an image
function extractRedChannel(img) {
    let redChannel = createImage(img.width, img.height);
    redChannel.loadPixels();
    img.loadPixels();
    
    // Loop through each pixel and set the red channel value while setting green and blue to 0
    for (let i = 0; i < img.pixels.length; i += 4) {
        redChannel.pixels[i] = img.pixels[i];     // Red
        redChannel.pixels[i + 1] = 0;             // Green
        redChannel.pixels[i + 2] = 0;             // Blue
        redChannel.pixels[i + 3] = img.pixels[i + 3]; // Alpha
    }

    redChannel.updatePixels();
    return redChannel;
}

// Extracts the green channel from an image
function extractGreenChannel(img) {
    let greenChannel = createImage(img.width, img.height);
    greenChannel.loadPixels();
    img.loadPixels();
    
    // Loop through each pixel and set the green channel value while setting red and blue to 0
    for (let i = 0; i < img.pixels.length; i += 4) {
        greenChannel.pixels[i] = 0;                     // Red
        greenChannel.pixels[i + 1] = img.pixels[i + 1]; // Green
        greenChannel.pixels[i + 2] = 0;                 // Blue
        greenChannel.pixels[i + 3] = img.pixels[i + 3]; // Alpha
    }

    greenChannel.updatePixels();
    return greenChannel;
}

// Extracts the blue channel from an image
function extractBlueChannel(img) {
    let blueChannel = createImage(img.width, img.height);
    blueChannel.loadPixels();
    img.loadPixels();

    // Loop through each pixel and set the blue channel value while setting red and green to 0
    for (let i = 0; i < img.pixels.length; i += 4) {
        blueChannel.pixels[i] = 0;                     // Red
        blueChannel.pixels[i + 1] = 0;                 // Green
        blueChannel.pixels[i + 2] = img.pixels[i + 2]; // Blue
        blueChannel.pixels[i + 3] = img.pixels[i + 3]; // Alpha
    }

    blueChannel.updatePixels();
    return blueChannel;
}

// Applies a threshold to an image based on a grayscale value
function applyThreshold(channelImage, thresholdValue) {
    let thresholdedImage = createImage(channelImage.width, channelImage.height);
    thresholdedImage.loadPixels();
    channelImage.loadPixels();

    // Loop through each pixel and apply the threshold
    for (let i = 0; i < channelImage.pixels.length; i += 4) {
        // Calculate the grayscale value using the luminance formula
        let grayscale = 0.299 * channelImage.pixels[i] + 0.587 * channelImage.pixels[i + 1] + 0.114 * channelImage.pixels[i + 2];

        // Apply threshold to the grayscale value
        let newValue = grayscale > thresholdValue ? 255 : 0;

        // Set all color channels to the same value for a black and white image
        thresholdedImage.pixels[i] = newValue;     // Red channel
        thresholdedImage.pixels[i + 1] = newValue; // Green channel
        thresholdedImage.pixels[i + 2] = newValue; // Blue channel
        thresholdedImage.pixels[i + 3] = 255;      // Alpha channel
    }

    thresholdedImage.updatePixels();
    return thresholdedImage;
}
