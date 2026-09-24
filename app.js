
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const id=a.getAttribute('href'); if(id && id.length>1){const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}}
}));

const form = document.getElementById('waitlist');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = 'Enviando...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error('Subscription failed');
      }

      form.innerHTML = `
        <div class="waitlist-success">
          <strong>¡Casi listo!</strong>
          <span>
            Revisa tu correo y confirma tu dirección para unirte
            a la lista de espera de YaTuyo.
          </span>
        </div>
      `;

    } catch (error) {
      button.disabled = false;
      button.textContent = originalText;

      let status = document.getElementById('wait-status');

      if (!status) {
        status = document.createElement('p');
        status.id = 'wait-status';
        status.className = 'status';
        form.after(status);
      }

      status.textContent =
        'No hemos podido procesar tu solicitud. Inténtalo de nuevo en unos minutos.';
    }
  });
}

const flow=document.querySelector('.flow-devices');
const dots=[...document.querySelectorAll('.flow-dots button')];
if(flow&&dots.length){
 const figures=[...flow.querySelectorAll('figure')];
 const updateDots=()=>{
  const center=flow.scrollLeft+flow.clientWidth/2;
  let best=0,dist=Infinity;
  figures.forEach((f,i)=>{const c=f.offsetLeft+f.offsetWidth/2;const d=Math.abs(c-center);if(d<dist){dist=d;best=i;}});
  dots.forEach((d,i)=>d.classList.toggle('active',i===best));
 };
 flow.addEventListener('scroll',()=>requestAnimationFrame(updateDots),{passive:true});
 dots.forEach((d,i)=>d.addEventListener('click',()=>figures[i].scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'})));
 updateDots();
}
