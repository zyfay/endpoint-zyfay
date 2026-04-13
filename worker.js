export default {
  async fetch(request) {
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

    const url = `https://api.tokovoucher.net/v1/transaksi?${params}`;
    const res = await fetch(url);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
