'use strict';
const labels = {tecnologia:'Tecnología',aspiradoras:'Aspiradoras',cocina:'Robots de cocina'};
const drawings = {phone:'assets/phone.svg',headphones:'assets/headphones.svg',vacuum:'assets/vacuum.svg',robot:'assets/robot.svg',cooker:'assets/cooker.svg'};
let offers = [];
let category = 'all';
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const budget = document.querySelector('#budget');
const cards = document.querySelector('#cards');
const results = document.querySelector('#results');
const empty = document.querySelector('#empty');
const dialog = document.querySelector('#detail');
const currency = new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',minimumFractionDigits:2,maximumFractionDigits:2});
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
function filterOffers(items, query, selected, order, maximum = Infinity) {
 const words = normalize(query).split(/\s+/).filter(Boolean);
 const filtered = items.filter(item => item.price <= maximum && (selected === 'all' || item.category === selected) && words.every(word => normalize(item.name+' '+labels[item.category]+' '+item.description).includes(word)));
 if(order === 'price-asc') filtered.sort((a,b)=>a.price-b.price);
 if(order === 'price-desc') filtered.sort((a,b)=>b.price-a.price);
 return filtered;
}
function render(){
 const maximum = budget.value === '' || !budget.validity.valid ? Infinity : budget.valueAsNumber;
 document.querySelector('#budget-summary').textContent=maximum===Infinity?'Sin límite':currency.format(maximum);
 document.querySelector('.filter-panel').classList.toggle('has-budget',maximum!==Infinity);
 const visible = filterOffers(offers,search.value,category,sort.value,maximum);
 // Category counts describe the same search and budget as the displayed catalogue.
 const scoped = filterOffers(offers,search.value,'all','featured',maximum);
 document.querySelectorAll('[data-category]').forEach(button=>{
  const count = scoped.filter(item=>button.dataset.category==='all'||item.category===button.dataset.category).length;
  button.querySelector('.filter-count').textContent=count;
  button.querySelector('.filter-count').setAttribute('aria-label',count+' '+(count===1?'producto':'productos'));
 });
 cards.replaceChildren();
 results.textContent = visible.length+' de '+offers.length+' ejemplos';
 empty.hidden = visible.length !== 0;
 for(const item of visible){
  const card = document.createElement('article'); card.className='card';
  card.innerHTML='<div class="product-art"><img width="360" height="220" alt="" decoding="async"></div><div class="card-body"><span class="category"></span><h3></h3><ul class="features" aria-label="Características del ejemplo"></ul><div class="card-pricing"><span class="price"></span><span class="price-caption">Precio ficticio</span></div><div class="card-bottom"><span>Ejemplo demo</span><button type="button">Ver detalle <span aria-hidden="true">↗</span></button></div></div>';
  const image=card.querySelector('img');image.src=drawings[item.kind];image.loading=cards.childElementCount<3?'eager':'lazy';
  card.querySelector('.category').textContent=labels[item.category];
  card.querySelector('h3').textContent=item.name;
  for(const feature of item.features){
   const li=document.createElement('li');li.textContent=feature;card.querySelector('.features').append(li);
  }
  card.querySelector('.price').append(document.createTextNode(currency.format(item.price)+' '));
  const button=card.querySelector('button');button.setAttribute('aria-label','Ver ejemplo: '+item.name);
  button.addEventListener('click',()=>{
   document.querySelector('#detail-title').textContent=item.name;
   document.querySelector('#detail-description').textContent=item.description;
   document.querySelector('#detail-price').textContent=currency.format(item.price);
   const caption=document.createElement('small');caption.textContent='Precio ficticio';
   document.querySelector('#detail-price').append(caption);
   const image=document.createElement('img');image.src=drawings[item.kind];image.alt='';image.width=360;image.height=220;
   document.querySelector('#detail-art').replaceChildren(image);
   dialog.showModal();
  });
  cards.append(card);
 }
}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{
 category=button.dataset.category;
 document.querySelectorAll('[data-category]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));render();
}));
search.addEventListener('input',render);sort.addEventListener('change',render);budget.addEventListener('input',render);
function resetFilters(){
 search.value='';budget.value='';sort.value='featured';
 document.querySelector('[data-category="all"]').click();
 search.focus();
}
document.querySelector('#reset').addEventListener('click',resetFilters);
document.querySelector('#empty-reset').addEventListener('click',resetFilters);
document.querySelector('#retry').addEventListener('click',load);
// A native disclosure keeps the budget optional and usable without custom widgets.
const filterPanel=document.querySelector('.filter-panel');
document.addEventListener('click',event=>{
 if(!filterPanel.contains(event.target))filterPanel.open=false;
});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&filterPanel.open){filterPanel.open=false;filterPanel.querySelector('summary').focus();}
});
// Closing a native dialog restores focus to the product that opened it.
dialog.addEventListener('click',event=>{
 if(event.target!==dialog)return;
 const bounds=dialog.getBoundingClientRect();
 if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();
});
async function load(){
 document.querySelector('#load-error').hidden=true;
 results.textContent='Cargando ejemplos…';
 cards.setAttribute('aria-busy','true');
 search.disabled=true;sort.disabled=true;budget.disabled=true;
 document.querySelectorAll('[data-category]').forEach(button=>button.disabled=true);
 try{
  const response=await fetch('data/offers.json');
  if(!response.ok) throw new Error('Data unavailable');
  const data=await response.json();
  if(data.mode!=='demo'||!Array.isArray(data.offers)||!data.offers.every(item=>typeof item.name==='string'&&typeof item.description==='string'&&Array.isArray(item.features)&&item.features.length===2&&item.features.every(feature=>typeof feature==='string'&&feature.length>0&&feature.length<=60)&&Object.hasOwn(labels,item.category)&&Object.hasOwn(drawings,item.kind)&&Number.isFinite(item.price)&&item.price>=0)) throw new Error('Invalid demo data');
  offers=data.offers;
  search.disabled=false;sort.disabled=false;budget.disabled=false;
  document.querySelectorAll('[data-category]').forEach(button=>button.disabled=false);
  render();
 }catch{
  results.textContent='Catálogo no disponible';
  cards.replaceChildren();empty.hidden=true;
  document.querySelector('#load-error').hidden=false;
  document.querySelectorAll('.filter-count').forEach(count=>count.textContent='–');
 }finally{
  cards.setAttribute('aria-busy','false');
 }
}
load();
