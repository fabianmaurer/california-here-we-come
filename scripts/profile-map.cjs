// Run against a dedicated Chromium debugging instance (port 9222) and local server (8000).
// Requires Node 22+. See README.md for setup and interpretation.
const fs = require('node:fs');
const sleep = ms => new Promise(r=>setTimeout(r,ms));
const timeout=setTimeout(()=>{console.error('Browser profiling timed out');process.exit(1);},60000);
(async()=>{
 const pages=await (await fetch('http://127.0.0.1:9222/json')).json();
 const page=pages.find(page=>page.type==='page');if(!page)throw Error('No browser page on debugging port 9222');
 const ws=new WebSocket(page.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
 let seq=0; const pending=new Map(); const events={};
 ws.onmessage=e=>{const m=JSON.parse(e.data); if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}else (events[m.method]||[]).forEach(f=>f(m.params));};
 const cdp=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 await cdp('Page.enable'); await cdp('Runtime.enable');
 await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:3,mobile:true});
 await cdp('Emulation.setTouchEmulationEnabled',{enabled:true});
 await cdp('Emulation.setCPUThrottlingRate',{rate:4});
 await cdp('Network.enable');await cdp('Network.setCacheDisabled',{cacheDisabled:true}); const loaded=new Promise(r=>events['Page.loadEventFired']=[r]);await cdp('Page.navigate',{url:'http://127.0.0.1:8000/'});await loaded;
 for(let i=0;i<100;i++){await sleep(100);if(await evaluate("typeof map !== 'undefined' && typeof layoutFoodMarkers === 'function'"))break;}
 await sleep(2000);
 console.log('ready',await evaluate("({zoom:map.getZoom(),size:map.getSize(),food:foodStops.length})"));
 await evaluate(`window.perfStats={calls:0,ms:0,added:0,removed:0,frames:[]}; const originalLayout=layoutFoodMarkers; layoutFoodMarkers=function(){const t=performance.now();const result=originalLayout();perfStats.calls++;perfStats.ms+=performance.now()-t;return result;}; for(const name of ['zoomend','moveend','resize'])for(const handler of map._events[name]||[])if(handler.fn===originalLayout)handler.fn=layoutFoodMarkers;map.on('layeradd',()=>perfStats.added++);map.on('layerremove',()=>perfStats.removed++);void 0;`);
 await cdp('Performance.enable');
 const before=await cdp('Performance.getMetrics');
 let trace=[];events['Tracing.dataCollected']=[p=>trace.push(...p.value)];
 await cdp('Tracing.start',{categories:'devtools.timeline,blink.user_timing',transferMode:'ReportEvents'});
 await evaluate(`window.collectFrames=true;let last=performance.now();function frame(t){perfStats.frames.push(t-last);last=t;if(collectFrames)requestAnimationFrame(frame);}requestAnimationFrame(frame);`);
 for (let i=0;i<6;i++){
  await evaluate(`map.setZoom(${i%2===0?5:6},{animate:true});void 0`);await sleep(450);
  await evaluate(`map.panBy([${i%2===0?45:-45},20],{animate:true,duration:.25});void 0`);await sleep(400);
 }
 await evaluate('collectFrames=false');
 const after=await cdp('Performance.getMetrics');
 const stats=await evaluate('perfStats');
 const traced=new Promise(r=>events['Tracing.tracingComplete']=[r]);await cdp('Tracing.end');await traced;
 const totals={};for(const e of trace)if(e.ph==='X'&&e.dur)totals[e.name]=(totals[e.name]||0)+e.dur/1000;
 const a=Object.fromEntries(after.metrics.map(m=>[m.name,m.value])),b=Object.fromEntries(before.metrics.map(m=>[m.name,m.value]));
 const frames=stats.frames.filter(x=>x>0).sort((a,b)=>a-b);delete stats.frames;
 const result={...stats,frames:frames.length,frameP95:frames[Math.floor(frames.length*.95)],framesOver50:frames.filter(x=>x>50).length,metrics:Object.fromEntries(['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration','LayoutCount','RecalcStyleCount'].map(k=>[k,a[k]-b[k]])),trace: Object.fromEntries(Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,25))};
 console.log(JSON.stringify(result,null,2));if(process.argv[2])fs.writeFileSync(process.argv[2],JSON.stringify(result,null,2));
 const checks=await evaluate(`(async()=>{
  const passed=[];const check=(condition,name)=>{if(!condition)throw Error(name);passed.push(name);};
  const coverage=()=>{const ids=foodLayer.getLayers().filter(layer=>layer!==foodClusters).map(marker=>foodStops.find(food=>foodMarkers[food.id]===marker).id);for(const key of foodClusterMarkers.keys())ids.push(...key.split(','));return ids.length===foodStops.length&&new Set(ids).size===foodStops.length;};
  map.setZoom(5,{animate:false});check(coverage(),'Every restaurant represented exactly once');
  const elements=foodClusters.getLayers().map(marker=>marker.getElement());const adds=perfStats.added,removes=perfStats.removed,calls=perfStats.calls;
  map.panBy([80,-30],{animate:false});map.invalidateSize();
  check(perfStats.added===adds&&perfStats.removed===removes&&perfStats.calls===calls,'Pan and resize cause no cluster work or layer changes');
  check(foodClusters.getLayers().every((marker,i)=>marker.getElement()===elements[i]),'Pan preserves cluster DOM');
  const toggle=document.getElementById('food-visible');toggle.checked=false;toggle.dispatchEvent(new Event('change'));map.setZoom(9,{animate:false});toggle.checked=true;toggle.dispatchEvent(new Event('change'));check(coverage(),'Food toggle refreshes after hidden zoom');
  document.querySelector('.food-stop').click();check(map.getZoom()>=16&&foodMarkers[foodStops[0].id].isPopupOpen(),'Food list opens individual restaurant popup');map.closePopup();
  map.setZoom(5,{animate:false});const zoom=map.getZoom();foodClusters.getLayers()[0].fire('click');check(map.getZoom()>zoom&&coverage(),'Cluster click zooms and preserves coverage');
  for(const simple of [true,false]){viewSwitch.checked=simple;viewSwitch.dispatchEvent(new Event('change'));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));check(map.hasLayer(simple?simpleLayer:detailedLayer)&&coverage(),simple?'Simple view works':'Detailed view works');}
  const rect=element=>{const r=element.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom};};
  const overlaps=(a,b)=>a.left<b.right-.1&&a.right>b.left+.1&&a.top<b.bottom-.1&&a.bottom>b.top+.1;
  for(const simple of [false,true]){
   viewSwitch.checked=simple;viewSwitch.dispatchEvent(new Event('change'));
   for(const zoom of [3,5,6,8,12,16]){
    map.setZoom(zoom,{animate:false});await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const route=[...map.getContainer().querySelectorAll('.map-marker .pin,.arrow-marker span,.distance')].map(rect);
    const food=[...map.getContainer().querySelectorAll('.food-pin')].map(element=>{const box=rect(element);box.left-=2;box.right+=2;box.top-=2;box.bottom+=2;const badge=element.querySelector('b');if(badge){const b=rect(badge);box.left=Math.min(box.left,b.left);box.right=Math.max(box.right,b.right);box.top=Math.min(box.top,b.top);box.bottom=Math.max(box.bottom,b.bottom);}return box;});
    check(food.every((a,i)=>route.every(b=>!overlaps(a,b))&&food.slice(i+1).every(b=>!overlaps(a,b))),'No food overlap at zoom '+zoom+(simple?' (simple)':' (detailed)'));
    check(foodStops.every(food=>foodMarkers[food.id].getLatLng().equals(L.latLng(food.coords))),'Actual restaurant coordinates retained at zoom '+zoom);
   }
  }
  const origin=L.point(0,0),size={left:1,right:1,top:1,bottom:1};
  check(nearestFoodPosition(origin,size,[]).equals(origin),'Unobstructed icon stays in place');
  check(nearestFoodPosition(origin,size,[{left:-5,right:5,top:-5,bottom:5}]).distanceTo(origin)===8,'Overlapping icon moves the minimum distance');
  viewSwitch.checked=false;viewSwitch.dispatchEvent(new Event('change'));map.setZoom(5,{animate:false});return passed;
 })()`);
 console.log('Browser checks:',JSON.stringify(checks));
 clearTimeout(timeout);ws.close();
})().catch(e=>{console.error(e);process.exit(1)});
