const fs = require('fs');
const Jimp = require('jimp');

async function removeWhiteBackground(inputPath, outputPath) {
    try {
        const image = await Jimp.read(inputPath);

        // Define what is "white" (threshold)
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // If pixel is close to white, make it transparent
            if (red > 240 && green > 240 && blue > 240) {
                this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
            }
        });

        await image.writeAsync(outputPath);
        console.log(`Successfully created transparent image at ${outputPath}`);
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

const input = process.argv[2];
const output = process.argv[3];

if (input && output) {
    removeWhiteBackground(input, output);
} else {
    console.error('Usage: node remove_bg.js <input_path> <output_path>');
}
