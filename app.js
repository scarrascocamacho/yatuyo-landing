
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
