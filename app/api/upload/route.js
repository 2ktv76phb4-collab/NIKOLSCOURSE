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

    // Get Cloudinary config
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      return Response.json(
        { error: 'Cloudinary cloud name not configured' },
        { status: 500 }
      );
    }

    // Prepare Cloudinary upload
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', 'nikol_gallery');

    // Upload to Cloudinary
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: uploadFormData,
    });

    const responseData = await uploadResponse.json();

    if (!uploadResponse.ok) {
      console.error('Cloudinary error:', responseData);
      return Response.json(
        { error: responseData.error?.message || 'Cloudinary upload failed' },
        { status: 400 }
      );
    }

    // Return success with image data
    const newItem = {
      id: Date.now(),
      title: title || 'Untitled',
      description: description || '',
      category: category || 'Nail Art',
      image: responseData.secure_url,
      cloudinaryId: responseData.public_id
    };

    return Response.json(
      { success: true, item: newItem },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
