document.documentElement.classList.add('js');
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
// typing roles
const roles=['Full Stack Developer','Embedded Systems Builder','Co-Founder & CTO','AI Enthusiast'],t=document.getElementById('type');
let r=0,c=0,del=false;
(function type(){const w=roles[r];t.textContent=w.slice(0,c);
 if(!del&&c<w.length)c++;else if(del&&c>0)c--;else{del=!del;if(!del)r=(r+1)%roles.length;}
 setTimeout(type,still?2000:(!del&&c===w.length)?1600:del?40:80)})();
// reveal, counters, skill bars
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;el.classList.add('in');
 el.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%');
 el.querySelectorAll('.num').forEach(n=>{const end=+n.dataset.n;let v=0;const s=setInterval(()=>{v++;n.textContent=v;if(v>=end)clearInterval(s)},end>9?70:250)});
 io.unobserve(el)}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// cursor glow
const g=document.getElementById('glow');
addEventListener('pointermove',e=>{g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
// particle network
const cv=document.getElementById('bg'),x=cv.getContext('2d');let W,H,P=[];
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;const n=Math.min(70,Math.floor(W*H/18000));
 P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))}
size();addEventListener('resize',size);
(function draw(){x.clearRect(0,0,W,H);
 for(let i=0;i<P.length;i++){const a=P[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
  x.fillStyle='rgba(255,255,255,.6)';x.beginPath();x.arc(a.x,a.y,1.4,0,7);x.fill();
  for(let j=i+1;j<P.length;j++){const b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);
   if(d<120){x.strokeStyle='rgba(255,255,255,'+(.18*(1-d/120))+')';x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}}
 if(!still)requestAnimationFrame(draw)})();

// mobile menu
const navBar=document.querySelector('nav'),menuBtn=document.getElementById('menu');
menuBtn.addEventListener('click',()=>{const o=navBar.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o)});
navBar.querySelectorAll('ul a').forEach(a=>a.addEventListener('click',()=>{navBar.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));
