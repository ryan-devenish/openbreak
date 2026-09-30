import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Persona } from '../data/prototype';

type Status = 'idle' | 'sending' | 'sent' | 'error';
const prompts = {
  surfer: { title: 'Be first at your break.', label: 'Your local break', placeholder: 'Windansea, La Jolla', button: 'Get early access' },
  host: { title: 'Tell us about your view.', label: 'View location', placeholder: 'Break, neighborhood or city', button: 'Offer my view' },
  business: { title: 'Put your business beside the break.', label: 'Business name and location', placeholder: 'Business · neighborhood or city', button: 'Register sponsor interest' },
};
export default function InterestForm({ persona }: { persona: Exclude<Persona, 'default'> }) {
  const request = useRef<AbortController | null>(null);
  const [endpoint, setEndpoint] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const prompt = prompts[persona];
  useEffect(() => {
    const controller = new AbortController();
    fetch('/signup-config.json', { signal: controller.signal }).then(response => response.ok ? response.json() : null).then(config => {
      if (typeof config?.endpoint === 'string' && config.endpoint.startsWith('https://')) setEndpoint(config.endpoint);
    }).catch(() => {});
    return () => controller.abort();
  }, []);
  useEffect(() => {
    request.current?.abort(); request.current = null; setStatus('idle');
    return () => { request.current?.abort(); request.current = null; };
  }, [persona]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint || status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    setStatus('sending');
    try {
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error('Submission failed');
      if (request.current === controller) { setStatus('sent'); form.reset(); }
    } catch { if (request.current === controller && form.isConnected) setStatus('error'); }
    finally { window.clearTimeout(timeout); if (request.current === controller) request.current = null; }
  };
  return <>
    <p className="eyebrow">STAY IN THE LOOP</p><h2 id="signup-title">{prompt.title}</h2><p>Leave your details for OpenBreak launch updates.</p>
    <form onSubmit={submit}>
      <input type="hidden" name="interest" value={persona}/>
      <label htmlFor="signup-name">Name <span>(optional)</span></label><input id="signup-name" name="name" autoComplete="name" maxLength={120}/>
      <label htmlFor="signup-email">Email</label><input id="signup-email" name="email" type="email" autoComplete="email" required maxLength={254}/>
      <label htmlFor="signup-location">{prompt.label}</label><input id="signup-location" name="location" placeholder={prompt.placeholder} maxLength={200}/>
      <label htmlFor="signup-message">Anything else? <span>(optional)</span></label><textarea id="signup-message" name="message" rows={3} maxLength={2000}/>
      <button className="primary-button" type="submit" disabled={!endpoint || status === 'sending' || status === 'sent'}>{status === 'sending' ? 'Sending…' : status === 'sent' ? 'Interest registered' : prompt.button}</button>
      {!endpoint && <p className="form-note">Signups are opening soon. This form is a preview; your details won’t be sent yet.</p>}
      {endpoint && <p className="form-note">By submitting, you agree to receive OpenBreak launch updates by email.</p>}
      <p className="form-status" role="status" aria-live="polite">{status === 'sent' ? 'Thanks. You’re on the list for OpenBreak updates.' : status === 'error' ? 'We couldn’t send your details. Please try again.' : ''}</p>
    </form>
  </>;
}
