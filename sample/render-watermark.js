const { chromium } = require('playwright');
(async()=>{
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file:///home/user/karina/sample/sample.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  await p.addStyleTag({content:`
    .wm{position:absolute;inset:0;z-index:50;pointer-events:none;overflow:hidden}
    .wm .rows{position:absolute;left:50%;top:50%;width:0;height:0;transform:rotate(-35deg)}
    .wm .r{position:absolute;left:-5.5in;white-space:nowrap;font:400 20pt/1 'Anton',sans-serif;letter-spacing:.18em;
      color:rgba(40,40,40,.13);text-transform:uppercase}
    
    .wm .main{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-35deg);
      font:400 46pt/1 'Anton',sans-serif;letter-spacing:.08em;white-space:nowrap;
      color:transparent;-webkit-text-stroke:1.2px rgba(30,30,30,.30)}`});
  await p.evaluate(()=>document.querySelectorAll('.page').forEach(pg=>{
    const w=document.createElement('div');w.className='wm';
    
    w.innerHTML=`<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="wm" width="300" height="78" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
        <text x="0" y="30" font-family="Anton" font-size="21" letter-spacing="3.5" fill="rgba(40,40,40,.13)">ELITE PUBLISHING ·</text>
        <text x="-150" y="69" font-family="Anton" font-size="21" letter-spacing="3.5" fill="rgba(40,40,40,.13)">ELITE PUBLISHING ·</text>
        <text x="150" y="69" font-family="Anton" font-size="21" letter-spacing="3.5" fill="rgba(40,40,40,.13)">ELITE PUBLISHING ·</text>
      </pattern></defs><rect width="100%" height="100%" fill="url(#wm)"/></svg><div class="main">ELITE PUBLISHING</div>`;
    pg.appendChild(w);}));
  await p.pdf({path:'/home/user/karina/sample/The-5-Step-Book-Launch_Interior-Sample_WATERMARK.pdf',width:'6in',height:'9in',printBackground:true,preferCSSPageSize:true});
  await b.close();})();
