
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const id=a.getAttribute('href'); if(id && id.length>1){const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}}
}));
const form=document.getElementById('waitlist');
if(form){form.addEventListener('submit',e=>{
  e.preventDefault();
  const s=document.getElementById('wait-status');
  s.textContent='Gracias por tu interés. El registro de la lista de espera estará disponible próximamente.';
  form.reset();
});}
