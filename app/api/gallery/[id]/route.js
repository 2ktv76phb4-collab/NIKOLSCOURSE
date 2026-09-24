import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const password = request.headers.get('x-password');

    if (password !== 'NIKOL123456789') {
      return Response.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Get the item to get cloudinary_id for deletion
    const { data: item } = await supabase
      .from('gallery_items')
      .select('cloudinary_id')
      .eq('id', id)
      .single();

    if (item?.cloudinary_id) {
      // Delete from Cloudinary
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      const timestamp = Math.floor(Date.now() / 1000);
      const signatureString = `public_id=${item.cloudinary_id}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

      await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          public_id: item.cloudinary_id,
          api_key: apiKey,
          timestamp,
          signature
        })
      });
    }

    // Delete from Supabase
    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, category, password } = body;

    if (password !== 'NIKOL123456789') {
      return Response.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from('gallery_items')
      .update({
        title: title || 'Untitled',
        description: description || '',
        category: category || 'Nail Art'
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return Response.json({ success: true, item: data }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}
