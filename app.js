'use strict';
const labels = {tecnologia:'Tecnología',aspiradoras:'Aspiradoras',cocina:'Robots de cocina'};
const drawings = {
 phone:'<rect x="49" y="7" width="62" height="108" rx="12" fill="#263d36"/><rect x="54" y="13" width="52" height="94" rx="8" fill="#c0d7b1"/><path d="M54 75 Q80 20 106 55V100Q80 70 54 100Z" fill="#759d77"/><rect x="69" y="16" width="22" height="5" rx="3" fill="#263d36"/>',
 headphones:'<path d="M38 69V51a42 42 0 0 1 84 0v18" fill="none" stroke="#314a44" stroke-width="13"/><rect x="27" y="56" width="28" height="48" rx="12" fill="#6b8c80"/><rect x="105" y="56" width="28" height="48" rx="12" fill="#6b8c80"/><path d="M38 35q42-40 84 0" stroke="#a1b5a6" stroke-width="5" fill="none"/>',
 vacuum:'<path d="M83 40L65 103" stroke="#8d9d97" stroke-width="8"/><path d="M81 15h22v32H79z" fill="#376451"/><path d="M103 18h12v18h-12" fill="none" stroke="#263d36" stroke-width="7"/><rect x="72" y="39" width="23" height="22" rx="6" fill="#abc5a7"/><path d="M46 99h45l8 15H37z" fill="#263d36"/>',
 robot:'<ellipse cx="80" cy="78" rx="59" ry="34" fill="#2b4039"/><ellipse cx="80" cy="68" rx="59" ry="34" fill="#d2dbcd"/><ellipse cx="80" cy="65" rx="50" ry="28" fill="#e8ece3" stroke="#b3c2ac"/><ellipse cx="81" cy="52" rx="15" ry="9" fill="#799a79"/><circle cx="103" cy="70" r="4" fill="#376451"/><path d="M28 86l12 7m92-7-12 7" stroke="#91aa8f" stroke-width="3"/>',
 cooker:'<path d="M43 58h76l-8 43H49z" fill="#e1e6da" stroke="#abbda6"/><path d="M53 33h54l-5 48H58z" fill="#9cafa1"/><path d="M53 35h54M66 25h29" stroke="#263d36" stroke-width="9" stroke-linecap="round"/><path d="M108 42h15v25h-18" fill="none" stroke="#344d40" stroke-width="7"/><path d="M46 89h69l8 24H38z" fill="#314d41"/><rect x="64" y="94" width="32" height="13" rx="3" fill="#d6f28a"/>'
};
let offers = [];
let category = 'all';
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const cards = document.querySelector('#cards');
const results = document.querySelector('#results');
const empty = document.querySelector('#empty');
const dialog = document.querySelector('#detail');
const currency = new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0});
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
function filterOffers(items, query, selected, order) {
 const words = normalize(query).split(/\s+/).filter(Boolean);
 const filtered = items.filter(item => (selected === 'all' || item.category === selected) && words.every(word => normalize(item.name+' '+labels[item.category]+' '+item.description).includes(word)));
 if(order === 'price-asc') filtered.sort((a,b)=>a.price-b.price);
 if(order === 'price-desc') filtered.sort((a,b)=>b.price-a.price);
 return filtered;
}
function render(){
 const visible = filterOffers(offers,search.value,category,sort.value);
 cards.replaceChildren();
 results.textContent = visible.length+' de '+offers.length+' ejemplos · Precios ficticios';
 empty.hidden = visible.length !== 0;
 for(const item of visible){
  const card = document.createElement('article'); card.className='card';
  card.innerHTML='<div class="product-art"><span class="pill">DEMO · NO ES UNA OFERTA REAL</span><svg viewBox="0 0 160 125" aria-hidden="true">'+drawings[item.kind]+'</svg></div><div class="card-body"><span class="category"></span><h3></h3><p></p><div class="price"></div><div class="card-bottom"><span>Sin tienda asociada</span><button type="button">Ver ejemplo →</button></div></div>';
  card.querySelector('.category').textContent=labels[item.category];
  card.querySelector('h3').textContent=item.name;
  card.querySelector('p').textContent=item.description;
  card.querySelector('.price').append(document.createTextNode(currency.format(item.price)+' '));
  const caption=document.createElement('small');caption.textContent='precio ficticio';card.querySelector('.price').append(caption);
  const button=card.querySelector('button');button.setAttribute('aria-label','Ver ejemplo: '+item.name);
  button.addEventListener('click',()=>{
   document.querySelector('#detail-title').textContent=item.name;
   document.querySelector('#detail-description').textContent=item.description;
   document.querySelector('#detail-price').textContent=currency.format(item.price)+' · Precio ficticio';
   dialog.showModal();
  });
  cards.append(card);
 }
}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{
 category=button.dataset.category;
 document.querySelectorAll('[data-category]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));render();
}));
search.addEventListener('input',render);sort.addEventListener('change',render);
document.querySelector('#reset').addEventListener('click',()=>{search.value='';sort.value='featured';document.querySelector('[data-category="all"]').click();search.focus();});
async function load(){
 try{
  const response=await fetch('data/offers.json');
  if(!response.ok) throw new Error('Data unavailable');
  const data=await response.json();
  if(data.mode!=='demo'||!Array.isArray(data.offers)||!data.offers.every(item=>typeof item.name==='string'&&typeof item.description==='string'&&Object.hasOwn(labels,item.category)&&Object.hasOwn(drawings,item.kind)&&Number.isFinite(item.price)&&item.price>=0)) throw new Error('Invalid demo data');
  offers=data.offers;render();
 }catch{
  results.textContent='No se han podido cargar los ejemplos. Recarga la página para intentarlo de nuevo.';
  cards.replaceChildren();empty.hidden=true;
  search.disabled=true;sort.disabled=true;document.querySelectorAll('[data-category]').forEach(button=>button.disabled=true);
 }
}
load();
