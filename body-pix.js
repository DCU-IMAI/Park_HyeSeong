const bodyPix = require('@tensorflow-models/body-pix');

const img = './image/image.jpeg';

async function loadAndPredict() {

    const net = await bodyPix.load({
        architecture: 'ResNet50',
        outputStride: 32,
        quantBytes: 4
    });
    const segmentation = await net.segmentPerson(img);
    console.log(segmentation);
}
exports.loadAndPredict = loadAndPredict