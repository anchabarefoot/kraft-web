import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import emailjs from '@emailjs/browser';
import { useAuth, googleEnabled } from '../context/AuthContext';
import { escolar, COLORS, HORMAS, SIZES } from '../data/products';
import './Returns.css';

// ─── EmailJS ─────────────────────────────────────────────────────────────────
// Por ahora usa la cuenta de anCHA (llega a viviancha.ar@gmail.com).
// Para un mail propio de KRAFT: crear servicio y plantilla en emailjs.com y
// reemplazar estos tres valores. Variables de la plantilla: {{nombre}}, {{email}},
// {{modelo}}, {{modelo_quiere}}, {{color_tiene}}, {{talle_tiene}}, {{color_quiere}},
// {{talle_quiere}}, {{motivo}}, {{comentario}}, {{diferencia}}, {{solicitud_id}}
const EMAILJS_SERVICE_ID  = 'service_nzpelnk';
const EMAILJS_TEMPLATE_ID = 'template_v27tu8t';
const EMAILJS_PUBLIC_KEY  = '8nHj4qUv_chBr6Qsz';

const MOTIVOS = ['Cambio de talle', 'Cambio de horma', 'Cambio de color', 'Falla', 'Devolución por arrepentimiento'];
const ARREPENTIMIENTO = MOTIVOS[4];

const label = (id, horma) => `KRAFT ${escolar.find(p => p.id === id)?.name || id} · horma ${HORMAS[horma]?.label.toLowerCase() || ''}`;

export default function Returns() {
  const { user, loginWithGoogle } = useAuth();
  const [params] = useSearchParams();
  const [manual, setManual] = useState({ nombre: '', email: '' });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
  const [form, setForm] = useState({
    pedido: '', modelo: 'acordonado', horma: 'clasica', color: 'negro', talle: '',
    motivo: params.get('arrepentimiento') ? ARREPENTIMIENTO : 'Cambio de talle',
    hormaQuiere: 'clasica', colorQuiere: 'negro', talleQuiere: '', comentario: '',
  });
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const modelo = escolar.find(p => p.id === form.modelo);
  const nombre = user?.name || manual.nombre.trim();
  const email = user?.email || manual.email.trim();
  const devuelve = form.motivo === ARREPENTIMIENTO || form.motivo === 'Falla';
  const valid = nombre && /\S+@\S+\.\S+/.test(email) && form.pedido.trim() && form.talle &&
    (devuelve || form.talleQuiere);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!valid) return;
    setSending(true);
    setError('');
    const id = `KRF-${Math.floor(10000 + Math.random() * 90000)}`;
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        nombre, email,
        modelo: `${label(form.modelo, form.horma)} · pedido ${form.pedido}`,
        modelo_quiere: devuelve ? '—' : label(form.modelo, form.hormaQuiere),
        color_tiene: COLORS[form.color]?.label,
        talle_tiene: form.talle,
        color_quiere: devuelve ? '—' : COLORS[form.colorQuiere]?.label,
        talle_quiere: devuelve ? '—' : form.talleQuiere,
        motivo: form.motivo,
        comentario: form.comentario,
        diferencia: 'Sin diferencia',
        solicitud_id: id,
      }, EMAILJS_PUBLIC_KEY);
      setDone(id);
    } catch {
      setError('No se pudo enviar. Escribinos por Instagram a @kraftescolar con tu número de pedido.');
    } finally {
      setSending(false);
    }
  };

  if (done) return (
    <div className="ret-done container">
      <div className="ret-done__icon">✓</div>
      <p className="eyebrow">Solicitud recibida</p>
      <h1>¡Listo, {nombre.split(' ')[0]}!</h1>
      <p>En 24 a 48 hs hábiles te escribimos a <strong>{email}</strong> con los pasos para mandarnos el par.</p>
      <p className="ret-done__id">N.º de solicitud: <strong>{done}</strong></p>
      <Link to="/" className="btn btn--yellow">Volver al inicio</Link>
    </div>
  );

  return (
    <div className="ret">
      <section className="ret__hero">
        <div className="container">
          <p className="eyebrow">Cambios y devoluciones</p>
          <h1>¿No le quedó? Lo cambiamos.</h1>
          <ol className="ret__steps">
            <li><b>1</b><span>Completá el pedido de cambio.</span></li>
            <li><b>2</b><span>Te escribimos con los datos para el envío.</span></li>
            <li><b>3</b><span>Cuando llega el par, despachamos el nuevo.</span></li>
          </ol>
        </div>
      </section>

      <div className="ret__body container">
        <form className="ret__form" onSubmit={handleSubmit} noValidate>
          {user ? (
            <div className="ret__user">
              {user.picture && <img src={user.picture} alt="" referrerPolicy="no-referrer" />}
              <span>{user.name} · {user.email}</span>
            </div>
          ) : (
            <>
              {googleEnabled && (
                <div className="ret__google">
                  <GoogleLogin onSuccess={loginWithGoogle} text="continue_with" shape="pill" locale="es" />
                  <span>o completá tus datos</span>
                </div>
              )}
              <div className="ret__two">
                <Field id="r-nombre" label="Nombre y apellido">
                  <input id="r-nombre" value={manual.nombre} onChange={e => setManual(m => ({ ...m, nombre: e.target.value }))} autoComplete="name" />
                </Field>
                <Field id="r-email" label="Mail">
                  <input id="r-email" type="email" value={manual.email} onChange={e => setManual(m => ({ ...m, email: e.target.value }))} autoComplete="email" />
                </Field>
              </div>
            </>
          )}

          <div className="ret__two">
            <Field id="r-pedido" label="N.º de pedido">
              <input id="r-pedido" value={form.pedido} onChange={e => f('pedido', e.target.value)} placeholder="Está en el mail de compra" />
            </Field>
            <Field id="r-motivo" label="Motivo">
              <select id="r-motivo" value={form.motivo} onChange={e => f('motivo', e.target.value)}>
                {MOTIVOS.map(m => <option key={m}>{m}</option>)}
              </select>
            </Field>
          </div>

          <fieldset className="ret__set">
            <legend>Lo que recibiste</legend>
            <div className="ret__two">
              <Field id="r-modelo" label="Modelo">
                <select id="r-modelo" value={form.modelo} onChange={e => f('modelo', e.target.value)}>
                  {escolar.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </Field>
              <Field id="r-horma" label="Horma">
                <select id="r-horma" value={form.horma} onChange={e => f('horma', e.target.value)}>
                  {modelo.hormas.map(h => <option key={h} value={h}>{HORMAS[h].label}</option>)}
                </select>
              </Field>
              <Field id="r-color" label="Color">
                <select id="r-color" value={form.color} onChange={e => f('color', e.target.value)}>
                  {modelo.colors.map(c => <option key={c} value={c}>{COLORS[c].label}</option>)}
                </select>
              </Field>
              <Field id="r-talle" label="Talle">
                <select id="r-talle" value={form.talle} onChange={e => f('talle', e.target.value)}>
                  <option value="">Elegí</option>
                  {SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
          </fieldset>

          {!devuelve && (
            <fieldset className="ret__set ret__set--want">
              <legend>Lo que necesitás</legend>
              <div className="ret__two">
                <Field id="r-hq" label="Horma">
                  <select id="r-hq" value={form.hormaQuiere} onChange={e => f('hormaQuiere', e.target.value)}>
                    {modelo.hormas.map(h => <option key={h} value={h}>{HORMAS[h].label}</option>)}
                  </select>
                </Field>
                <Field id="r-cq" label="Color">
                  <select id="r-cq" value={form.colorQuiere} onChange={e => f('colorQuiere', e.target.value)}>
                    {modelo.colors.map(c => <option key={c} value={c}>{COLORS[c].label}</option>)}
                  </select>
                </Field>
                <Field id="r-tq" label="Talle">
                  <select id="r-tq" value={form.talleQuiere} onChange={e => f('talleQuiere', e.target.value)}>
                    <option value="">Elegí</option>
                    {SIZES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <p className="ret__hint">¿Dudás del talle? <Link to="/talles">Medí el pie acá</Link>.</p>
            </fieldset>
          )}

          <Field id="r-com" label="Comentario (opcional)">
            <textarea id="r-com" rows={3} value={form.comentario} onChange={e => f('comentario', e.target.value)}
              placeholder={form.motivo === 'Falla' ? 'Contanos qué pasó. Te vamos a pedir una foto por mail.' : ''} />
          </Field>

          {error && <p className="ret__error">{error}</p>}
          <button type="submit" className="btn btn--black ret__send" disabled={sending || !valid}>
            {sending ? 'Enviando…' : 'Enviar solicitud'}
          </button>
        </form>

        <aside className="ret__info">
          <div>
            <h3>Política de cambios</h3>
            <ul>
              <li>30 días desde que recibís la compra.</li>
              <li>El calzado tiene que estar sin uso y en su caja.</li>
              <li>El primer cambio de talle tiene envío sin cargo.</li>
            </ul>
            <p className="draft-note">Plazo y envío a confirmar.</p>
          </div>
          <div id="arrepentimiento">
            <h3>Botón de arrepentimiento</h3>
            <p>Por compras online tenés 10 días corridos desde que recibís el producto para devolverlo sin dar motivo (Ley 24.240, art. 34).</p>
            <button type="button" className="btn ret__regret" onClick={() => { f('motivo', ARREPENTIMIENTO); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Quiero devolver mi compra
            </button>
          </div>
          <div>
            <h3>¿Dudas?</h3>
            <p>Escribinos por Instagram a <a href="https://instagram.com/kraftescolar" target="_blank" rel="noreferrer">@kraftescolar</a>.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ id, label, children }) {
  return <div className="ret__field"><label htmlFor={id}>{label}</label>{children}</div>;
}
