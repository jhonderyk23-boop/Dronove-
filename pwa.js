(() => {
'use strict';
let installPrompt=null;
const button=document.createElement('button');
button.type='button';button.textContent='Instalar aplicativo';
button.setAttribute('aria-label','Instalar aplicativo Studio Dronov');
button.style.cssText='position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:1000;display:none;padding:12px 17px;border:1px solid #c8a96b;border-radius:999px;background:#c8a96b;color:#17140d;font:700 12px Arial,sans-serif;box-shadow:0 8px 28px #0008;cursor:pointer';
document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(button));
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;button.style.display='block'});
button.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;button.style.display='none'});
window.addEventListener('appinstalled',()=>{installPrompt=null;button.style.display='none'});
if('serviceWorker'in navigator&&location.protocol==='https:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(error=>console.warn('Falha ao ativar recursos instaláveis:',error)));
})();