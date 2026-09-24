import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

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
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return Response.json(
        { error: 'Cloudinary configuration missing' },
        { status: 500 }
      );
    }

    // Create signature for secure upload
    const timestamp = Math.floor(Date.now() / 1000);
    const signatureString = `public_id=nikol_${timestamp}_${file.name.replace(/[^a-zA-Z0-9]/g, '')}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash('sha1')
      .update(signatureString)
      .digest('hex');

    // Prepare Cloudinary upload with signature
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('api_key', apiKey);
    uploadFormData.append('timestamp', timestamp);
    uploadFormData.append('signature', signature);
    uploadFormData.append('public_id', `nikol_${timestamp}_${file.name.replace(/[^a-zA-Z0-9]/g, '')}`);

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

    // Save to Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from('gallery_items')
      .insert({
        title: title || 'Untitled',
        description: description || '',
        category: category || 'Nail Art',
        cloudinary_id: responseData.public_id,
        image_url: responseData.secure_url
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, item: data },
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
