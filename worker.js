export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Cek status transaksi
    if (path === '/status') {
      const body = await request.json();
      const params = new URLSearchParams({
        ref_id: body.ref_id,
        member_code: body.member_code,
        signature: body.signature,
      });
      const res = await fetch(`https://api.tokovoucher.net/v1/transaksi/status?${params}`);
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Buat transaksi (default)
    if (request.method !== 'POST') {
      return new Response('TV Proxy OK', { status: 200 });
    }

    const body = await request.json();
    const params = new URLSearchParams({
      ref_id: body.ref_id,
      produk: body.produk,
      tujuan: body.tujuan,
      server_id: body.server_id || '',
      secret: body.secret,
      member_code: body.member_code,
    });

    const res = await fetch(`https://api.tokovoucher.net/v1/transaksi?${params}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
