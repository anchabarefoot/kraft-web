// Vercel Serverless Function — crea la preferencia de pago de Mercado Pago
// Variables de entorno en Vercel > Settings > Environment Variables:
//   MP_ACCESS_TOKEN = Access Token de producción de Mercado Pago
//   SITE_URL        = https://kraftkids.com.ar

const { MercadoPagoConfig, Preference } = require('mercadopago');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items, payer, shipping } = req.body || {};

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items requeridos' });
  }
  if (items.some(i => typeof i.price !== 'number' || i.price <= 0)) {
    return res.status(400).json({ error: 'Hay productos sin precio' });
  }

  const site = process.env.SITE_URL || 'https://kraftkids.com.ar';
  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
  const preference = new Preference(client);

  const mpItems = items.map(item => ({
    id: item.id,
    title: `KRAFT ${item.name} · Horma ${item.horma || ''} · ${item.color || ''} · Talle ${item.size}`,
    quantity: item.qty || 1,
    unit_price: item.price,
    currency_id: 'ARS',
  }));
  if (typeof shipping === 'number' && shipping > 0) {
    mpItems.push({ id: 'envio', title: 'Envío', quantity: 1, unit_price: shipping, currency_id: 'ARS' });
  }

  try {
    const result = await preference.create({
      body: {
        items: mpItems,
        payer: payer || {},
        back_urls: {
          success: `${site}/carrito?pago=ok`,
          failure: `${site}/carrito?pago=error`,
          pending: `${site}/carrito?pago=pendiente`,
        },
        auto_return: 'approved',
        statement_descriptor: 'KRAFT',
      },
    });
    return res.status(200).json({ id: result.id, init_point: result.init_point });
  } catch (err) {
    console.error('MP error:', err);
    return res.status(500).json({ error: 'Error al crear preferencia' });
  }
};
