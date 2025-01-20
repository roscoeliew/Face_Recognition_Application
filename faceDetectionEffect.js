// Detects faces in the captured image using the ML5 face detector
function detectFacesInCapturedImage() {
    faceDetector.detect(capturedImage, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        detectedFaces = results;
    });
}

// Applies a grayscale effect to the detected face area
function applyGrayscaleEffect() {
    if (detectedFaces.length > 0) {
        let face = detectedFaces[0].alignedRect._box;
        let faceImg = capturedImage.get(face.x, face.y, face.width, face.height);
        faceImg.filter(GRAY);

        // Create a copy of the captured image to overlay the processed face
        let imgCopy = capturedImage.get();
        imgCopy.copy(faceImg, 0, 0, faceImg.width, faceImg.height, face.x, face.y, face.width, face.height);

        // Update the cell with the image that has the processed face overlay
        cells[12] = imgCopy;
    }
}

// Applies a blur effect to the detected face area
function applyBlurEffect() {
    if (detectedFaces.length > 0) {
        let face = detectedFaces[0].alignedRect._box;
        let faceImg = capturedImage.get(face.x, face.y, face.width, face.height);
        faceImg.filter(BLUR, 5);  // Apply a blur effect with a radius of 5

        // Create a copy of the captured image to overlay the processed face
        let imgCopy = capturedImage.get();
        imgCopy.copy(faceImg, 0, 0, faceImg.width, faceImg.height, face.x, face.y, face.width, face.height);

        // Update the cell with the image that has the processed face overlay
        cells[12] = imgCopy;
    }
}

// Applies a color conversion effect (e.g., RGB to CMY) to the detected face area
function applyColorConversionEffect() {
    if (detectedFaces.length > 0) {
        let face = detectedFaces[0].alignedRect._box;
        let faceImg = capturedImage.get(face.x, face.y, face.width, face.height);
        
        // Apply a color conversion effect (e.g., RGB to CMY)
        let convertedFaceImg = RGBtoCMY(faceImg);

        // Create a copy of the captured image to overlay the processed face
        let imgCopy = capturedImage.get();
        imgCopy.copy(convertedFaceImg, 0, 0, convertedFaceImg.width, convertedFaceImg.height, face.x, face.y, face.width, face.height);

        // Update the cell with the image that has the processed face overlay
        cells[12] = imgCopy;
    }
}

// Applies a pixelation effect to the detected face area
function applyPixelationEffect() {
    if (detectedFaces.length > 0) {
        let face = detectedFaces[0].alignedRect._box;

        // Calculate block size for the pixelation effect
        let blockSize = Math.min(Math.floor(face.width / 5), Math.floor(face.height / 5));
        let adjustedWidth = blockSize * 5; // Ensure dimensions are divisible by 5
        let adjustedHeight = blockSize * 5;
        let faceImg = capturedImage.get(face.x, face.y, adjustedWidth, adjustedHeight);
        faceImg.filter(GRAY);

        faceImg.loadPixels();
        for (let y = 0; y < adjustedHeight; y += blockSize) {
            for (let x = 0; x < adjustedWidth; x += blockSize) {
                let totalR = 0, totalG = 0, totalB = 0;
                let count = 0;

                // Calculate the average color of the block for each channel
                for (let dy = 0; dy < blockSize; dy++) {
                    for (let dx = 0; dx < blockSize; dx++) {
                        let idx = ((x + dx) + (y + dy) * adjustedWidth) * 4;
                        totalR += faceImg.pixels[idx];
                        totalG += faceImg.pixels[idx + 1];
                        totalB += faceImg.pixels[idx + 2];
                        count++;
                    }
                }

                // Determine the average color for the block
                let avgR = totalR / count;
                let avgG = totalG / count;
                let avgB = totalB / count;

                // Apply the average color to each pixel in the block
                for (let dy = 0; dy < blockSize; dy++) {
                    for (let dx = 0; dx < blockSize; dx++) {
                        let idx = ((x + dx) + (y + dy) * adjustedWidth) * 4;
                        faceImg.pixels[idx] = avgR;
                        faceImg.pixels[idx + 1] = avgG;
                        faceImg.pixels[idx + 2] = avgB;
                    }
                }
            }
        }
        faceImg.updatePixels();

        // Overlay the pixelated face on the original captured image
        let imgCopy = capturedImage.get();
        imgCopy.copy(faceImg, 0, 0, adjustedWidth, adjustedHeight, face.x, face.y, adjustedWidth, adjustedHeight);
        cells[12] = imgCopy; // Update cell 12 with the new image
    }
}
