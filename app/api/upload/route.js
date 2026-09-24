import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const password = formData.get('password');

    // Verify password
    if (password !== process.env.ADMIN_PASSWORD && password !== 'NIKOL123456789') {
      return Response.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create images directory if it doesn't exist
    const imagesDir = join(process.cwd(), 'public/images');
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `gallery-${timestamp}-${file.name}`;
    const filepath = join(imagesDir, filename);

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // Read existing gallery data
    const dataFile = join(process.cwd(), 'public/gallery-data.json');
    let galleryData = [];

    if (existsSync(dataFile)) {
      try {
        const data = await readFile(dataFile, 'utf-8');
        galleryData = JSON.parse(data);
      } catch (e) {
        galleryData = [];
      }
    }

    // Add new item
    const newItem = {
      id: Date.now(),
      title: title || 'Untitled',
      description: description || '',
      category: category || 'Nail Art',
      image: `/images/${filename}`
    };

    galleryData.push(newItem);

    // Save updated gallery data
    await writeFile(dataFile, JSON.stringify(galleryData, null, 2));

    return Response.json(
      { success: true, item: newItem },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
