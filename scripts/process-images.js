/**
 * Script to convert photos to WebP (640/1280/2000 px), strip GPS/EXIF, and build the gallery list.
 * Run with: node scripts/process-images.js [input_folder] [output_folder]
 */

import fs from 'fs';
import path from 'path';

async function processImages() {
  const inputDir = process.argv[2] || path.resolve(process.cwd(), 'raw_photos');
  const outputDir = process.argv[3] || path.resolve(process.cwd(), 'public/gallery');

  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
    console.log(`Created input folder at: ${inputDir}`);
    console.log(`Drop your pre-wedding photos into "${inputDir}" and run this script again.`);
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let sharp;
  try {
    const sharpModule = await import('sharp');
    sharp = sharpModule.default;
  } catch (err) {
    console.log('Note: "sharp" is not installed. To run high-performance batch image conversion, run: npm i -D sharp');
    return;
  }

  const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));
  if (files.length === 0) {
    console.log(`No images found in ${inputDir}`);
    return;
  }

  const sizes = [640, 1280, 2000];
  const galleryList = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    console.log(`Processing [${i + 1}/${files.length}]: ${file}`);

    const metadata = await sharp(inputPath).metadata();
    const isTall = (metadata.height || 0) > (metadata.width || 0);

    const item = {
      id: i + 1,
      titleKm: `អនុស្សាវរីយ៍ ${i + 1}`,
      aspect: isTall ? 'tall' : 'wide',
      sources: {}
    };

    for (const size of sizes) {
      const outFileName = `${baseName}-${size}.webp`;
      const outFilePath = path.join(outputDir, outFileName);

      // Convert to WebP, resize maintaining aspect ratio, strip EXIF & GPS metadata
      await sharp(inputPath)
        .rotate() // Auto-orient based on EXIF before stripping
        .resize({ width: size, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .withMetadata(false) // Strip all EXIF / GPS metadata
        .toFile(outFilePath);

      item.sources[size] = `/gallery/${outFileName}`;
    }

    item.url = item.sources[1280] || item.sources[640];
    galleryList.push(item);
  }

  const listPath = path.resolve(process.cwd(), 'src/data/gallery-generated.json');
  fs.writeFileSync(listPath, JSON.stringify(galleryList, null, 2));
  console.log(`\nSuccessfully processed ${files.length} images into WebP format!`);
  console.log(`Gallery list generated at: ${listPath}`);
}

processImages().catch(console.error);
