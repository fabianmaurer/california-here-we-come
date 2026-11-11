// The itinerary is deliberately data-driven: edit the stops and legs below to refine the trip.
const stops = [
 {id:'lax',date:'25. APR',name:'Ankunft LAX',type:'airport',icon:'✈',coords:[33.9425,-118.4081],detail:'Ankunft in Los Angeles, Mietwagen abholen und nach San Diego fahren. Der Rückflug startet am 10. Mai ebenfalls ab LAX.'},
 {id:'sd',date:'25.–27. APR',name:'San Diego',type:'stay',nights:2,coords:[32.7157,-117.1611],detail:'Zwei Nächte zum Ankommen. Erkundet die Küste, den Balboa Park oder das Gaslamp Quarter.'},
 {id:'joshua',date:'27. APR',name:'Joshua-Tree-Nationalpark',type:'visit',icon:'✳',coords:[33.8734,-115.9010],detail:'Wüstenstopp auf dem Weg nach Las Vegas. Früh starten: Es wird ein langer Fahrtag.'},
 {id:'vegas',date:'27.–29. APR',name:'Las Vegas',type:'stay',nights:2,coords:[36.1699,-115.1398],detail:'Späte Ankunft am 27. April, ein voller Tag in Las Vegas am 28. April und Weiterfahrt ins Death Valley am Morgen des 29. April.'},
 {id:'canyon',date:'28. APR',name:'Grand Canyon · optional',type:'visit',icon:'✳',coords:[36.0544,-112.1401],detail:'Optionale Alternative zum Tag in Las Vegas: Der South Rim liegt rund 900 km hin und zurück entfernt. Rechnet mit etwa 9 bis 10 Stunden Fahrt ohne Pausen.'},
 {id:'death',date:'29. APR',name:'Death-Valley-Nationalpark',type:'visit',icon:'✳',coords:[36.461,-116.866],detail:'Durchfahrt auf dem Weg zur östlichen Sierra. Volltanken, ausreichend Wasser mitnehmen und die Straßenverhältnisse prüfen.'},
 {id:'bishop',date:'29.–30. APR',name:'Bishop',type:'stay',nights:1,coords:[37.3614,-118.3997],detail:'Vorgeschlagener Übernachtungsort nach dem Death Valley und vor der Weiterfahrt auf der US 395. Hotel noch offen.'},
 {id:'mono',date:'30. APR',name:'Mono Lake',type:'visit',icon:'◒',coords:[37.9677,-119.0087],detail:'Stopp bei South Tufa oder am Besucherbereich auf dem Weg nach Norden.'},
 {id:'tahoe',date:'30. APR–1. MAI',name:'Lake Tahoe',type:'stay',nights:1,coords:[38.9399,-119.9772],detail:'Eine Nacht in South Lake Tahoe. Hotel und Stopps am See stehen noch nicht fest.'},
 {id:'trees',date:'1. MAI',name:'Calaveras Big Trees',type:'visit',icon:'♣',coords:[38.2789,-120.3116],detail:'Gewünschte Route über die CA-4 und Bear Valley. Falls der Ebbetts Pass gesperrt ist: über die US 50 und den Echo Summit nach Placerville, dann auf der CA-49 über Jackson und Angels Camp und auf der CA-4 über Arnold zum Park. Danach zurück nach Angels Camp. Straßenlage und Wetter prüfen; auch die US 50 kann gesperrt sein oder Schneeketten erfordern.'},
 {id:'angels',date:'1.–2. MAI',name:'Angels Camp',type:'stay',nights:1,coords:[38.0683,-120.5397],detail:'Vorgeschlagene übernachtung nach Calaveras Big Trees. Die Ausweichroute über die US 50 fährt vor und nach dem Park durch Angels Camp. Eine stornierbare Buchung bietet sich an.'},
 {id:'sac',date:'2. MAI',name:'Sacramento',type:'visit',icon:'◇',coords:[38.5816,-121.4944],detail:'Besichtigung der Hauptstadt vor der Weiterfahrt nach Oakland.'},
 {id:'oakland',date:'2.–4. MAI',name:'Oakland',type:'stay',nights:2,coords:[37.8044,-122.2712],detail:'Zwei Nächte als Ausgangspunkt in der Bay Area, mit einem vollen Tag in San Francisco. Für die BART-Verbindung Fahrpläne und Stationen prüfen.'},
 {id:'sf',date:'3. MAI',name:'San Francisco',type:'visit',icon:'◇',coords:[37.7749,-122.4194],detail:'Tagesausflug mit der BART ab Oakland. Entdeckt die Uferpromenade, die Stadtviertel und die Golden Gate Bridge.'},
 {id:'santacruz',date:'4.–5. MAI',name:'Santa Cruz',type:'stay',nights:1,coords:[36.9741,-122.0308],detail:'Eine Nacht an der Küste. Der Boardwalk und der West Cliff Drive bieten sich für einen Besuch an.'},
 {id:'whales',date:'5. MAI',name:'Wal- und Delfintour in der Monterey Bay',type:'visit',icon:'◒',coords:[36.606,-121.891],detail:'Vorgeschlagene Bootstour am Vormittag ab Monterey vor der Weiterfahrt nach Cambria. Etwa 3 bis 4 Stunden plus Fahrzeit einplanen. Fahrpläne, Wetter und Highway 1 prüfen; Tiersichtungen sind nicht garantiert.'},
 {id:'cambria',date:'5.–6. MAI',name:'Cambria',type:'stay',nights:1,coords:[35.5641,-121.0808],detail:'Eine Nacht in Cambria, bevor es am 6. Mai weiter nach Morro Bay und Santa Barbara geht.'},
 {id:'morro',date:'6. MAI',name:'Seeotter in Morro Bay',type:'visit',icon:'◒',coords:[35.3658,-120.8499],detail:'Im Hafen und an der Flussmündung nach Seeottern Ausschau halten; Sichtungen sind nicht garantiert. Bei einer Sperrung des Highway 1 kann eine Umleitung nötig sein.'},
 {id:'santabarbara',date:'6. MAI',name:'Santa Barbara',type:'visit',icon:'☼',coords:[34.4208,-119.6982],detail:'Mittagessen oder Strandpause an der Küste auf dem Weg nach Los Angeles.'},
 {id:'la',date:'6.–10. MAI',name:'Los Angeles · Flughafen Burbank',type:'stay',nights:4,coords:[34.195,-118.36],detail:'Vier Nächte nahe dem Flughafen Hollywood Burbank. Wegen des Verkehrs genug Zeit einplanen, besonders für Disneyland und die Mietwagenrückgabe am LAX.'},
 {id:'hollywood',date:'7. MAI',name:'Hollywood & Santa Monica',type:'visit',icon:'◇',coords:[34.1016,-118.3402],detail:'Ein Tag für Sehenswürdigkeiten in LA, darunter der Walk of Fame und Santa Monica. Fahrzeit zwischen den Orten einplanen.'},
 {id:'disney',date:'8. MAI',name:'Disneyland',type:'visit',icon:'★',coords:[33.8121,-117.919],detail:'Ein ganzer Tag in Anaheim. Vor der Buchung Ticket- und Reservierungsbedingungen prüfen.'},
 {id:'universal',date:'9. MAI',name:'Universal Studios',type:'visit',icon:'★',coords:[34.1381,-118.3534],detail:'Ein ganzer Tag im Park. Hollywood liegt in der Nähe; weitere Besichtigungen könnten zeitlich knapp werden.'},
 {id:'departure',date:'10. MAI',name:'Abflug LAX',type:'airport',icon:'✈',coords:[33.936,-118.4081],detail:'Mietwagen zurückgeben und ausreichend Zeit bis zum Terminal einplanen.'}
];
// Approximate one-way travel times, without stops; lines are schematic.
const legs=[['lax','sd','2,5h'],['sd','joshua','3,5h'],['joshua','vegas','4h'],['vegas','canyon','4,5h','side'],['vegas','death','2,5h'],['death','bishop','4h'],['bishop','mono','1h'],['mono','tahoe','2,5h'],['tahoe','trees','4,5h'],['trees','angels','0,5h'],['angels','sac','1,5h'],['sac','oakland','1,5h'],['oakland','sf','0,5h','train'],['oakland','santacruz','1,5h'],['santacruz','whales','1h'],['whales','cambria','3h'],['cambria','morro','0,5h'],['morro','santabarbara','2,5h'],['santabarbara','la','2h'],['la','hollywood','0,5h','side'],['la','disney','1h','side'],['la','universal','0,5h','side'],['la','departure','1h']];
const byId=Object.fromEntries(stops.map(s=>[s.id,s]));
const map=L.map('map',{zoomControl:false,scrollWheelZoom:true}).setView([36.5,-119],6);
// Expand the map within the page so this also works on mobile browsers.
const FullscreenControl=L.Control.extend({
 options:{position:'topright'},
 onAdd(){
  const container=L.DomUtil.create('div','leaflet-bar map-fullscreen-control');
  const button=L.DomUtil.create('button','',container);
  button.type='button';
  button.setAttribute('aria-controls','map itinerary');
  button.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const update=expanded=>{
   document.querySelector('.app').classList.toggle('map-expanded',expanded);
   button.setAttribute('aria-pressed',String(expanded));
   button.title=expanded?'Vollbild beenden':'Karte im Vollbild anzeigen';
   button.setAttribute('aria-label',button.title);
   button.querySelector('path').setAttribute('d',expanded?'M3 9h6V3M15 3v6h6M21 15h-6v6M9 21v-6H3':'M9 3H3v6M15 3h6v6M21 15v6h-6M9 21H3v-6');
   requestAnimationFrame(()=>map.invalidateSize({animate:false}));
  };
  L.DomEvent.disableClickPropagation(container);
  L.DomEvent.disableScrollPropagation(container);
  button.addEventListener('click',()=>update(button.getAttribute('aria-pressed')!=='true'));
  document.addEventListener('keydown',event=>{
   if(event.key==='Escape'&&button.getAttribute('aria-pressed')==='true'){update(false);button.focus();}
  });
  update(false);
  return container;
 }
});
new FullscreenControl().addTo(map);
L.control.zoom({position:'topright'}).addTo(map);
// Keep the overview legible on small screens; keep labels legible at each zoom level.
function updateOverview(){document.getElementById('map').classList.toggle('overview',map.getZoom() <= 7);}
map.on('zoomend',updateOverview); updateOverview();
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
const markers={};
const simpleMarkers={};
// Zusammengelegte Gebiete und grobe geografische Ausdehnung in Metern.
const circleGroups={lax:'losangeles',departure:'losangeles',la:'losangeles',hollywood:'losangeles',universal:'losangeles',oakland:'bay',sf:'bay'};
const labelCircles={losangeles:{center:[34.06,-118.36],radius:22000},bay:{center:[37.79,-122.34],radius:16000},canyon:{center:[36.28,-112.31],radius:50000},joshua:{center:[33.90,-115.96],radius:45000},death:{center:[36.50,-116.88],radius:65000},trees:{center:[38.27,-120.30],radius:16000}};
const circleKey=s=>circleGroups[s.id]||s.id;
const circleFor=s=>labelCircles[circleKey(s)]||{center:s.coords,radius:16000};
const groupCircles={};
const detailedLayer=L.layerGroup().addTo(map);
const simpleLayer=L.layerGroup();
for(const s of stops){const icon=L.divIcon({className:'map-marker',html:`<span class="pin ${s.type}">${s.type==='stay'?`<b>${s.nights}N</b>`:s.icon}</span>`,iconSize:[33,33],iconAnchor:[16,16]});const marker=L.marker(s.coords,{icon,title:s.name}).addTo(detailedLayer).bindPopup(`<div class="popup-date">${s.date}${s.nights?` · ${s.nights} ${s.nights>1?'NÄCHTE':'NACHT'}`:''}</div><div class="popup-title">${s.name}</div><div class="popup-desc">${s.detail}</div>`);markers[s.id]=marker;
 // Feste geografische Kreise um die Orte auf der Hintergrundkarte.
 const circle=circleFor(s),key=circleKey(s);
 if(!groupCircles[key]) groupCircles[key]=L.circle(circle.center,{radius:circle.radius,color:'#c34238',weight:2,fill:false}).bindPopup(marker.getPopup().getContent()).addTo(simpleLayer);
 else groupCircles[key].setPopupContent(groupCircles[key].getPopup().getContent()+'<hr>'+marker.getPopup().getContent());
 simpleMarkers[s.id]=groupCircles[key];
}
for(const [a,b,label,kind] of legs){const points=[byId[a].coords,byId[b].coords];const train=kind==='train';const line=L.polyline(points,{color:train?'#66818d':'#b96649',weight:train?2:2.5,opacity:.8,dashArray:train?'5 7':kind==='side'?'3 6':null}).addTo(detailedLayer);line.bindTooltip(label,{permanent:true,direction:'center',className:'distance',opacity:.95});
 const from=circleFor(byId[a]),to=circleFor(byId[b]);
 // Intersect the segment with each circle in map pixel space.
 const p1=map.project(from.center,10),p2=map.project(to.center,10);
 const dx=p2.x-p1.x,dy=p2.y-p1.y, length=Math.hypot(dx,dy);
 const pixelRadius=c=>map.project([c.center[0]+c.radius/111320,c.center[1]],10).distanceTo(map.project(c.center,10));
 const r1=pixelRadius(from),r2=pixelRadius(to);
 if(length>r1+r2){
  const ux=dx/length,uy=dy/length;
  const startPoint=map.unproject([p1.x+ux*r1,p1.y+uy*r1],10);
  const endPoint=map.unproject([p2.x-ux*r2,p2.y-uy*r2],10);
  const simpleLine=L.polyline([startPoint,endPoint],{color:'#c34238',weight:2,opacity:.9,dashArray:kind==='side'?'4 5':null}).addTo(simpleLayer);
  simpleLine.bindTooltip(label,{permanent:true,direction:'center',className:'distance simple-distance',opacity:1});
  const angle=Math.atan2(dy,dx)*180/Math.PI;
  const arrowIcon=rotation=>L.divIcon({className:'arrow-marker',html:`<span style="transform:rotate(${rotation}deg)"></span>`,iconSize:[12,12],iconAnchor:[12,6]});
  L.marker(endPoint,{interactive:false,icon:arrowIcon(angle)}).addTo(simpleLayer);
  if(kind==='side'||kind==='train'){
   L.marker(startPoint,{interactive:false,icon:arrowIcon(angle+180)}).addTo(simpleLayer);
  }
 }

} 
const viewSwitch=document.getElementById('simple-view');
// The food layer stays available in both route views and can be hidden independently.
map.createPane('foodMarkers').style.zIndex=660;
map.createPane('foodTooltips').style.zIndex=670;
const foodLayer=L.layerGroup().addTo(map);
const foodClusters=L.layerGroup().addTo(foodLayer);
let foodLayoutZoom=null;
let foodLayoutSimple=null;
const foodClusterMarkers=new Map();
const foodMarkers={};
const foodList=document.getElementById('food-list');
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const food of foodStops){
 const directions='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(food.name+', '+food.address);
 const logo=food.logo||`assets/chains/${food.id}.png`;
 const icon=L.divIcon({className:'food-marker',html:`<span class="food-pin" aria-hidden="true"><img src="${logo}" alt="" width="20" height="20"></span>`,iconSize:[28,28],iconAnchor:[14,14]});
 const marker=L.marker(food.coords,{icon,title:food.name,alt:food.name,pane:'foodMarkers',riseOnHover:true,zIndexOffset:100});
 marker.bindTooltip(escapeHtml(food.name),{direction:'top',offset:[0,-12],className:'food-tooltip',pane:'foodTooltips'});
 marker.bindPopup(`<div class="popup-date">${escapeHtml(food.area)}</div><div class="popup-title">${escapeHtml(food.name)}</div><div class="popup-desc"><strong>Probieren:</strong> ${escapeHtml(food.try)}<p>${escapeHtml(food.note)}</p><p>${escapeHtml(food.address)}</p></div><div class="food-links"><a href="${directions}" target="_blank" rel="noopener noreferrer">Route öffnen ↗</a><a href="${food.source}" target="_blank" rel="noopener noreferrer">Offizieller Standort ↗</a></div>`,{maxWidth:300});
 foodMarkers[food.id]=marker;
 const button=document.createElement('button');
 button.type='button';
 button.className='food-stop';
 button.innerHTML=`<img class="food-logo" src="${logo}" alt="" width="28" height="28" loading="lazy"><span><strong>${escapeHtml(food.name)}</strong><small>${escapeHtml(food.area)}</small></span><span aria-hidden="true">↗</span>`;
 button.addEventListener('click',()=>{
  document.getElementById('food-visible').checked=true;
  foodLayer.addTo(map);
  map.setView(food.coords,Math.max(map.getZoom(),16),{animate:false});
  layoutFoodMarkers();
  marker.openPopup();
  if(innerWidth<=700)document.querySelector('.map-area').scrollIntoView({behavior:'smooth'});
 });
 foodList.appendChild(button);
}
// Find the closest free center outside the rectangles occupied by map symbols.
// A nearest point lies on an obstacle edge (or at the original coordinate).
function nearestFoodPosition(origin,size,obstacles){
 const blocked=obstacles.map(b=>({left:b.left-size.right-2,right:b.right+size.left+2,top:b.top-size.bottom-2,bottom:b.bottom+size.top+2}));
 const free=p=>!blocked.some(b=>p.x>b.left&&p.x<b.right&&p.y>b.top&&p.y<b.bottom);
 if(free(origin))return origin;
 const xs=[...new Set([origin.x,...blocked.flatMap(b=>[b.left,b.right])])].sort((a,b)=>Math.abs(a-origin.x)-Math.abs(b-origin.x));
 const ys=[...new Set([origin.y,...blocked.flatMap(b=>[b.top,b.bottom])])].sort((a,b)=>Math.abs(a-origin.y)-Math.abs(b-origin.y));
 let best=origin,bestDistance=Infinity;
 for(const x of xs){
  const dx2=(x-origin.x)**2;
  if(dx2>=bestDistance)break;
  for(const y of ys){
   const distance=dx2+(y-origin.y)**2;
   if(distance>=bestDistance)break;
   const point=L.point(x,y);
   if(free(point)){best=point;bestDistance=distance;break;}
  }
 }
 return best;
}
function foodBounds(point,size){return {left:point.x-size.left,right:point.x+size.right,top:point.y-size.top,bottom:point.y+size.bottom};}
function offsetFoodIcon(marker,offset){
 // Change only the visual anchor; the restaurant's actual LatLng stays intact.
 const icon=marker.options.icon;
 icon.options.iconAnchor=L.point(14-offset.x,14-offset.y);
 icon.options.popupAnchor=[offset.x,offset.y];
 icon.options.tooltipAnchor=[offset.x,offset.y];
 const element=marker.getElement();
 if(element){element.style.marginLeft=`${offset.x-14}px`;element.style.marginTop=`${offset.y-14}px`;}
 if(marker.isPopupOpen())marker.getPopup().update();
 if(marker.isTooltipOpen())marker.getTooltip().update();
}
// Merge nearby logos in projected pixel space. Recompute only when zoom changes;
// pan and resize cannot change the distance between branches or route symbols.
function layoutFoodMarkers(){
 // Panning translates every symbol equally. Retain existing DOM, tooltips and
 // focus on pan/resize; recompute placement only for a new zoom or route view.
 if(!map.hasLayer(foodLayer)||(foodLayoutZoom===map.getZoom()&&foodLayoutSimple===viewSwitch.checked))return;
 foodLayoutZoom=map.getZoom();
 foodLayoutSimple=viewSwitch.checked;
 const groups=foodStops.map(food=>({foods:[food],point:map.project(food.coords,foodLayoutZoom)}));
 let merged=true;
 while(merged){
  merged=false;
  outer:for(let i=0;i<groups.length;i++)for(let j=i+1;j<groups.length;j++){
   const a=groups[i],b=groups[j];
   // Match the 28px icon plus its 2px white outline. A group's badge
   // extends only above and to the right, so check those edges separately.
   const bounds=group=>({left:group.point.x-16,right:group.point.x+(group.foods.length>1?19:16),top:group.point.y-(group.foods.length>1?20:16),bottom:group.point.y+16});
   const aBounds=bounds(a),bBounds=bounds(b);
   if(aBounds.right<=bBounds.left||bBounds.right<=aBounds.left||aBounds.bottom<=bBounds.top||bBounds.bottom<=aBounds.top)continue;
   const count=a.foods.length+b.foods.length;
   a.point=L.point((a.point.x*a.foods.length+b.point.x*b.foods.length)/count,(a.point.y*a.foods.length+b.point.y*b.foods.length)/count);
   a.foods.push(...b.foods);groups.splice(j,1);merged=true;break outer;
  }
 }
 // Read visible symbol bounds once, before writing any marker styles. This
 // includes scaled itinerary pins, travel-time labels and simple-view arrows.
 const mapRect=map.getContainer().getBoundingClientRect();
 const origin=map.project(map.containerPointToLatLng([0,0]),foodLayoutZoom);
 const obstacles=[...map.getContainer().querySelectorAll('.map-marker .pin,.arrow-marker span,.distance')].map(element=>{
  const r=element.getBoundingClientRect();
  return {left:r.left-mapRect.left+origin.x,right:r.right-mapRect.left+origin.x,top:r.top-mapRect.top+origin.y,bottom:r.bottom-mapRect.top+origin.y};
 });
 for(const group of groups)group.size={left:16,right:group.foods.length>1?19:16,top:group.foods.length>1?20:16,bottom:16};
 for(let i=0;i<groups.length;i++){
  const group=groups[i];
  // Reserve other food icons too so displacing one cannot create a new overlap.
  const reserved=groups.slice(i+1).map(g=>foodBounds(g.point,g.size));
  const position=nearestFoodPosition(group.point,group.size,obstacles.concat(reserved));
  group.offset=position.subtract(group.point);
  obstacles.push(foodBounds(position,group.size));
 }
 const activeClusters=new Set();
 for(const group of groups){
  if(group.foods.length===1){const marker=foodMarkers[group.foods[0].id];foodLayer.addLayer(marker);offsetFoodIcon(marker,group.offset);continue;}
  group.foods.forEach(food=>foodLayer.removeLayer(foodMarkers[food.id]));
  const key=group.foods.map(food=>food.id).join(',');
  activeClusters.add(key);
  // Reuse unchanged groups across zoom levels, including their DOM and events.
  if(foodClusterMarkers.has(key)){offsetFoodIcon(foodClusterMarkers.get(key),group.offset);continue;}
  const first=group.foods[0],logo=first.logo||`assets/chains/${first.id}.png`;
  const label=`${group.foods.length} Restaurants – zum Vergrößern antippen`;
  const icon=L.divIcon({className:'food-marker food-cluster',html:`<span class="food-pin" aria-hidden="true"><img src="${logo}" alt="" width="20" height="20"><b class="food-cluster-count">${group.foods.length}</b></span>`,iconSize:[28,28],iconAnchor:[14,14]});
  const marker=L.marker(map.unproject(group.point,foodLayoutZoom),{icon,title:label,alt:label,pane:'foodMarkers',riseOnHover:true,zIndexOffset:100}).addTo(foodClusters);
  marker.bindTooltip(group.foods.map(food=>escapeHtml(food.name)).join('<br>'),{direction:'top',offset:[0,-16],className:'food-tooltip',pane:'foodTooltips'});
  marker.on('click',()=>map.fitBounds(L.latLngBounds(group.foods.map(food=>food.coords)),{padding:[60,60],maxZoom:18,animate:false}));
  foodClusterMarkers.set(key,marker);
  offsetFoodIcon(marker,group.offset);
 }
 for(const [key,marker] of foodClusterMarkers){
  if(!activeClusters.has(key)){foodClusters.removeLayer(marker);foodClusterMarkers.delete(key);}
 }
}
map.on('zoomend',layoutFoodMarkers);
layoutFoodMarkers();
// Route-label bounds may change once the web fonts finish loading.
document.fonts.ready.then(()=>{foodLayoutZoom=null;layoutFoodMarkers();});
document.getElementById('food-count').textContent=foodStops.length;
document.getElementById('food-visible').addEventListener('change',event=>{
 if(event.target.checked){foodLayer.addTo(map);layoutFoodMarkers();}else map.removeLayer(foodLayer);
});
viewSwitch.addEventListener('change',()=>{if(viewSwitch.checked){map.removeLayer(detailedLayer);simpleLayer.addTo(map);}else{map.removeLayer(simpleLayer);detailedLayer.addTo(map);}document.querySelector('.map-area').classList.toggle('is-simple',viewSwitch.checked); document.querySelector('.app').classList.toggle('simple-mode',viewSwitch.checked); layoutFoodMarkers(); requestAnimationFrame(()=>map.invalidateSize());});
const list=document.getElementById('itinerary');
for(const s of stops){const row=document.createElement('div');row.className=`day ${s.type==='stay'?'':'visit-row'}`;row.tabIndex=0;row.setAttribute('role','button');row.setAttribute('aria-label',`${s.name} auf der Karte anzeigen`);row.innerHTML=`<div class="date">${s.date}</div><div class="rail"><i></i></div><div><div class="day-title">${s.name}${s.nights?`<span class="night">${s.nights} ${s.nights>1?'NÄCHTE':'NACHT'}</span>`:''}</div><div class="day-sub">${s.type==='stay'?'ÜBERNACHTUNG':s.type==='airport'?'FLUGHAFEN':'BESICHTIGUNG'} ${s.id==='canyon'?' · OPTIONALER TAGESAUSFLUG':s.id==='ames'?' · OPTIONAL':''}</div></div>`;const open=()=>{map.setView(s.coords,Math.max(map.getZoom(),9));(viewSwitch.checked?simpleMarkers:markers)[s.id].openPopup();if(innerWidth<=700)document.querySelector('.map-area').scrollIntoView({behavior:'smooth'});};row.addEventListener('click',open);row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});list.appendChild(row);}
function fit(){map.fitBounds(L.latLngBounds(stops.map(s=>s.coords)),{padding:[45,45]});}document.getElementById('fit').addEventListener('click',fit);fit();



if (location.protocol === 'file:') { document.querySelector('.notice p').innerHTML = '<strong>Für die Karte einen lokalen Webserver verwenden.</strong><br>In diesem Ordner python -m http.server 8000 ausführen und dann http://localhost:8000/ öffnen.'; }
