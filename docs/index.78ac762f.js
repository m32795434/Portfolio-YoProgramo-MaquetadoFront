var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},s=e.parcelRequire4455;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in i){var s=i[e];delete i[e];var r={id:e,exports:{}};return t[e]=r,s.call(r.exports,r,r.exports),r.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},e.parcelRequire4455=s),s("8zFB3");class r{constructor(e){if(!(e&&e instanceof Element))throw new Error("Sldier not found or not an Element");this.slider=e,this.slides=this.slider.querySelector(".slides"),this.play=this.slider.querySelector("#play_pause");const t=this.slider.querySelector("#skip_previous"),i=this.slider.querySelector("#skip_next");this.current=this.slider.querySelector(".current")||this.slides.firstElementChild,this.next=this.current.nextElementSibling||this.slides.firstElementChild,this.prev=this.current.previousElementSibling||this.slides.lastElementChild,this.move=this.move.bind(this),this.playPauseFunction=this.playPauseFunction.bind(this),t.addEventListener("click",(()=>this.move("back"))),i.addEventListener("click",this.move),this.play.addEventListener("click",(e=>this.playPauseFunction(e.target))),this.applyClasses(),this.playPauseFunction(this.play)}applyClasses(){this.current.classList.add("current"),this.prev.classList.add("prev"),this.next.classList.add("next")}move(e=""){const t=["current","prev","next"];[this.current,this.prev,this.next].forEach((e=>{e.classList.remove(...t)})),[this.prev,this.current,this.next]="back"===e?[this.prev.previousElementSibling||this.slides.lastElementChild,this.prev,this.current]:[this.current,this.next,this.next.nextElementSibling||this.slides.firstElementChild],this.applyClasses()}playPauseFunction(e){e.classList.toggle("open1"),e.matches(".open1")?this.running=setInterval((()=>{this.move()}),1e4):clearInterval(this.running)}}var n=s("gYmfZ"),l=s("ekglj"),o=s("agcP6"),a=s("3oEOi");if(document.querySelector(".home-slider")){new r(document.querySelector(".home-slider"))}(0,n.manageLogin)(),(0,l.restoreFromLStorage)(),document.querySelectorAll("[data-type]").forEach(o.write),a.imgClick.forEach((e=>{e.addEventListener("click",l.imgEventHandler),e.addEventListener("keyup",l.imgEventHandler)})),(0,l.checkForToasts)(),(0,l.cleanTooltipsFunct)();
//# sourceMappingURL=index.78ac762f.js.map
