const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");t.disabled=!0,e.addEventListener("click",(()=>{timer=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(()=>{clearInterval(timer),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.1148c560.js.map
