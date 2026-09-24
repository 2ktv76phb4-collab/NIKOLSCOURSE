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

    // Upload to Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      return Response.json(
        { error: 'Cloudinary configuration missing' },
        { status: 500 }
      );
    }

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', 'nikol_gallery');

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json();
      return Response.json(
        { error: error.error?.message || 'Cloudinary upload failed' },
        { status: 400 }
      );
    }

    const uploadedImage = await uploadResponse.json();

    // Add new item to gallery data
    const newItem = {
      id: Date.now(),
      title: title || 'Untitled',
      description: description || '',
      category: category || 'Nail Art',
      image: uploadedImage.secure_url,
      cloudinaryId: uploadedImage.public_id
    };

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
