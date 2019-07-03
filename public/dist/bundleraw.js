!function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t);const i={elemscoreid:"score",elemsinstrid:"instructions",elemplayagainid:"play-again",elemgameoverid:"game-over",elemgameoverlayid:"game-over-overlay",elemlifebarid:"lifebar",elemwrapperid:"wrapper",elemcanvasid:"canvas"};class n{static init(e){null==window.instances&&(window.instances={}),null==window.instances[e]&&(window.instances[e]=[])}static add(e,t){let s=window.instances[e];return s.push(t),s.length-1}static get(e,t){let s=window.instances[e];return-1==t?s[s.length-1]:s[t]}constructor(e){n.init(e),this.index=n.add(e,this)}}var r=n;class a extends r{static IDENT(){return"rsrc"}constructor(){super(a.IDENT()),this.resourceCache={},this.readyCallbacks=[]}get(e){return this.resourceCache[e]}setup(e){const t=this;e instanceof Array?e.forEach(function(e){t.load(e)}):this.load(e)}onReady(e){this.readyCallbacks.push(e)}load(e){if(this.resourceCache[e])return this.resourceCache[e];{const t=this,s=new Image;s.onload=function(){t.resourceCache[e]=s,t.isReady()&&t.readyCallbacks.forEach(function(e){e()})},this.resourceCache[e]=!1,s.src=e}}isReady(){let e=!0;for(let t in this.resourceCache)this.resourceCache.hasOwnProperty(t)&&!this.resourceCache[t]&&(e=!1);return e}}var l=a;class h extends r{static IDENT(){return"input"}static SPACE(){return"SPACE"}static LEFT(){return"LEFT"}static UP(){return"UP"}static RIGHT(){return"RIGHT"}static DOWN(){return"DOWN"}static CLICK(){return"CLICK"}constructor(){super(h.IDENT()),this.pressedKeys={},this.mousing=!1}setUp(e){const t=document.getElementById(e),s=this;t.addEventListener("touchstart",e=>{s.touched(e,!0)}),t.addEventListener("touchmove",e=>{s.touched(e,!0)}),t.addEventListener("mousedown",e=>{s.moused(e,!0),s.mousing=!0}),t.addEventListener("mousemove",e=>{!0===s.mousing?s.moused(e,!0):s.pressedKeys={}}),document.addEventListener("keydown",e=>{s.keyed(e,!0)}),t.addEventListener("touchend",e=>{s.touched(e,!1)}),t.addEventListener("mouseup",e=>{s.moused(e,!1),s.mousing=!1}),document.addEventListener("keyup",e=>{s.keyed(e,!1)}),window.addEventListener("blur",e=>{s.keyed(e,!1)})}isSelected(e){return this.pressedKeys[e.toUpperCase()]}keyed(e,t){if(!0===r.get(c.IDENT(),this.index).isGameOver)return void(this.pressedKeys={});const s=e.keyCode;let i;switch(s){case 32:i=h.SPACE();break;case 37:i=h.LEFT();break;case 38:i=h.UP();break;case 39:i=h.RIGHT();break;case 40:i=h.DOWN();break;default:i=String.fromCharCode(s)}this.pressedKeys[i]=t,e.returnValue=!1}moused(e,t){if(!0===r.get(c.IDENT(),this.index).isGameOver)return void(this.pressedKeys={});let s=null;if(1==t){let t=r.get(u.IDENT(),this.index).canvas.getBoundingClientRect(),i=document.documentElement;s={X:e.clientX-t.left-i.scrollLeft,Y:e.clientY-t.top}}let i=h.CLICK();this.pressedKeys[i]=s,e.returnValue=!1}touched(e,t){if(!0===r.get(c.IDENT(),this.index).isGameOver)return void(this.pressedKeys={});let s=null;if(1==t){let t=r.get(u.IDENT(),this.index).canvas.getBoundingClientRect(),i=document.documentElement;s={X:parseInt(e.changedTouches[0].clientX)-t.left-i.scrollLeft,Y:parseInt(e.changedTouches[0].clientY)-t.top}}let i=h.CLICK();this.pressedKeys[i]=s,e.returnValue=!1}}var o=h;class d extends r{static IDENT(){return"engine"}constructor(e,t){if(new.target===d)throw new TypeError("Cannot construct AEngine instance directly");super(d.IDENT()),this.incrPlayer=e.incrPlayer,this.incrBullet=e.incrBullet,this.incrEnemy=e.incrEnemy,this.incrScore=e.incrScore,this.threshFire=e.threshFire,this.init(),this.create(e,t)}create(e,t){new l;const s=[e.width,e.height];new u(s,t),new o,r.get(o.IDENT(),this.index).setUp(t)}init(){this.player={},this.bullets=[],this.enemies=[],this.explosions=[];const e=Date.now();this.lastFire=e,this.lastTime=e,this.enemyTime=0,this.life=100,this.score=0,this.isGameOver=!1,this.isPageOver=!1}reset(){this.init(),this.begin(),this.addPlayer(),this.updatelife()}execute(e){try{const t=(e-this.lastTime)/1e3;this.updatelife(),this.updateEntities(t);const s=this.handleInput(t);if(!0===this.isGameOver)return;!0===s&&(this.addShot(),this.lastFire=e),this.enemyTime+=t,this.addEnemy(),this.checkPlayerBounds(),this.checkEnemyCollisions()}catch(e){this.end()}finally{this.updatescore(),this.lastTime=e}}handleInput(e){let t=!1;const s=r.get(o.IDENT(),this.index),i=s.isSelected(o.CLICK());return null!=i?(this.player.pos[0]<i.X&&(this.player.pos[0]+=this.incrPlayer*e),this.player.pos[0]>i.X&&(this.player.pos[0]-=this.incrPlayer*e),this.player.pos[1]<i.Y&&(this.player.pos[1]+=this.incrPlayer*e),this.player.pos[1]>i.Y&&(this.player.pos[1]-=this.incrPlayer*e),t=Date.now()-this.lastFire>this.threshFire):((s.isSelected(o.LEFT())||s.isSelected("a"))&&(this.player.pos[0]-=this.incrPlayer*e),(s.isSelected(o.RIGHT())||s.isSelected("d"))&&(this.player.pos[0]+=this.incrPlayer*e),(s.isSelected(o.DOWN())||s.isSelected("s"))&&(this.player.pos[1]+=this.incrPlayer*e),(s.isSelected(o.UP())||s.isSelected("w"))&&(this.player.pos[1]-=this.incrPlayer*e),s.isSelected(o.SPACE())&&(t=Date.now()-this.lastFire>this.threshFire)),t}updateEntities(e){this.player.sprite.update(e);for(let t=0;t<this.bullets.length;t++){const s=this.bullets[t];switch(s.dir){case"up":s.pos[1]-=this.incrBullet*e;break;case"down":s.pos[1]+=this.incrBullet*e;break;default:s.pos[0]+=this.incrBullet*e}s.sprite.update(e);const i=r.get(u.IDENT(),this.index);(s.pos[1]<0||s.pos[1]>i.canvas.height||s.pos[0]>i.canvas.width)&&(this.bullets.splice(t,1),t--)}for(let t=0;t<this.enemies.length;t++){const s=this.enemies[t];if(s.pos[0]-=this.incrEnemy*e,s.sprite.update(e),s.pos[0]+s.sprite.size[0]<0&&(this.enemies.splice(t,1),t--,this.life=this.life-20,0>=this.life))return void this.end()}for(let t=0;t<this.explosions.length;t++){const s=this.explosions[t];s.sprite.update(e),s.sprite.done&&(this.explosions.splice(t,1),t--)}}checkPlayerBounds(){const e=r.get(u.IDENT(),this.index);this.player.pos[0]<0?this.player.pos[0]=0:this.player.pos[0]>e.canvas.width-this.player.sprite.size[0]&&(this.player.pos[0]=e.canvas.width-this.player.sprite.size[0]),this.player.pos[1]<0?this.player.pos[1]=0:this.player.pos[1]>e.canvas.height-this.player.sprite.size[1]&&(this.player.pos[1]=e.canvas.height-this.player.sprite.size[1])}checkEnemyCollisions(){for(let e=0;e<this.enemies.length;e++){const t=this.enemies[e],s=t.pos,i=t.sprite.size;for(let t=0;t<this.bullets.length;t++){const n=this.bullets[t],r=n.pos,a=n.sprite.size;if(this.boxCollides(s,i,r,a)){e=this.endEnemy(e,t,s),e--,this.score+=this.incrScore,100>this.life&&(this.life=this.life+1);break}}const n=this.player.pos,r=this.player.sprite.size;if(this.boxCollides(s,i,n,r)){e=this.endEnemy(e,-1,s),this.end();break}}}boxCollides(e,t,s,i){return!(e[0]+t[0]<=s[0]||e[0]>s[0]+i[0]||e[1]+t[1]<=s[1]||e[1]>s[1]+i[1])}setup(e){}begin(){}end(){}updatescore(){}updatelife(){}addPlayer(){}endPlayer(){}addEnemy(){}endEnemy(e,t,s){}addShot(){}endShot(e){}}var c=d;class p extends r{static IDENT(){return"render"}constructor(e,t){super(p.IDENT()),null!=t?this.canvas=document.getElementById(t):(this.canvas=document.createElement("canvas"),document.body.appendChild(this.canvas)),this.canvas.width=e[0],this.canvas.height=e[1],this.ctx=this.canvas.getContext("2d")}setup(e){this.background_prepare(e)}update(){this.background_draw();const e=r.get(c.IDENT(),this.index);e.isGameOver||this.entities_drawone(e.player),this.entities_drawall(e.bullets),this.entities_drawall(e.enemies),this.entities_drawall(e.explosions)}background_prepare(e){const t=r.get(l.IDENT(),this.index);this.image=t.get(e),this.velocity=100,this.distance=this.image.width,this.lastFrameRepaintTime=window.performance.now()}background_calcOffset(e){var t=e-this.lastFrameRepaintTime;return this.lastFrameRepaintTime=e,this.velocity*(t/1e3)}background_draw(){try{this.ctx.save();const e=window.performance.now();this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.distance-=this.background_calcOffset(e),this.distance<=0&&(this.distance=this.image.width),this.ctx.translate(this.distance,0),this.ctx.drawImage(this.image,0,0),this.ctx.drawImage(this.image,1-this.image.width,0)}finally{this.ctx.restore()}}entities_drawall(e){e.forEach((e,t)=>{this.entities_drawone(e)})}entities_drawone(e){try{this.ctx.save(),this.ctx.translate(e.pos[0],e.pos[1]);let t=e.sprite,s=t.render();if(null==s)return void this.ctx.restore();this.ctx.drawImage(t.image,s[0],s[1],t.size[0],t.size[1],0,0,t.size[0],t.size[1])}finally{this.ctx.restore()}}}var u=p;var m=function(e,t){let s=!0;function i(){!0!==t.isPageOver&&(!0===s?(t.end(),s=!1):t.execute(Date.now()),r.get(u.IDENT(),t.index).update(),n(i))}let n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};const a=r.get(l.IDENT(),t.index);a.setup(e),a.onReady(function(){t.setup(e[0]),t.reset(),r.get(u.IDENT(),t.index).setup(e[1]),i()})};var y=class{constructor(e,t,s,i,n,r,a){this.image=e,this.pos=t,this.size=s,this.speed="number"==typeof i?i:0,this.frames=n,this.dir=r||"horizontal",this.once=a,this.index=0,this.done=!1}update(e){this.index+=this.speed*e}render(){let e=0;if(this.speed>0){const t=Math.floor(this.index),s=this.frames.length;if(e=this.frames[t%s],this.once&&t>=s)return this.done=!0,null}let t=this.pos[0],s=this.pos[1];return"vertical"===this.dir?s+=e*this.size[1]:t+=e*this.size[0],[t,s]}};class g extends r{static IDENT(){return"factory"}constructor(e){super(g.IDENT()),this.sprites=null,this.speedPlayer=e.speedPlayer,this.speedEnemy=e.speedEnemy,this.speedExplosion=e.speedExplosion}setup(e){const t=r.get(l.IDENT(),this.index);this.sprites=t.get(e)}getplayersprite(){return new y(this.sprites,[0,0],[39,39],this.speedPlayer,[0,1])}getbulletssprites(){return[new y(this.sprites,[0,39],[18,8]),new y(this.sprites,[0,50],[9,5]),new y(this.sprites,[0,60],[9,5])]}getenemysprite(){return new y(this.sprites,[0,78],[80,39],this.speedEnemy,[0,1,2,3,2,1])}getexplosionsprite(){return new y(this.sprites,[0,117],[39,39],this.speedExplosion,[0,1,2,3,4,5,6,7,8,9,10,11,12],null,!0)}}var f=g;class E extends c{static PLAYERXSTART(){return 50}constructor(e,t,s){super(e,s),this.elemscoreid=t.elemscoreid,this.elemplayagainid=t.elemplayagainid,this.elemgameoverid=t.elemgameoverid,this.elemgameoverlayid=t.elemgameoverlayid,this.elemlifebarid=t.elemlifebarid,new f(e)}setup(e){r.get(f.IDENT(),this.index).setup(e);const t=this;let s=document.getElementById(this.elemplayagainid+this.index);null!=s&&s.addEventListener("click",()=>{t.reset()})}begin(){let e=null;null!=(e=document.getElementById(this.elemgameoverid+this.index))&&(e.style.display="none",null!=(e=document.getElementById(this.elemgameoverlayid+this.index))&&(e.style.display="none"))}end(){let e=null;null!=(e=document.getElementById(this.elemgameoverid+this.index))&&(e.style.display="block",null!=(e=document.getElementById(this.elemgameoverlayid+this.index))&&(e.style.display="block",this.life=0,this.isGameOver=!0))}updatescore(){let e=document.getElementById(this.elemscoreid+this.index);null!=e&&(e.innerHTML=this.score)}updatelife(){let e=null;null!=(e=document.getElementById(this.elemlifebarid+this.index))&&(e.style.width=this.life+"%",50>=this.life?(e=document.getElementById(this.elemlifebarid+this.index)).style.backgroundColor="red":(document.getElementById(this.elemlifebarid+this.index),e.style.backgroundColor="#68B4FF"))}addPlayer(){const e=r.get(u.IDENT(),this.index),t=E.PLAYERXSTART(),s=e.canvas.height/2,i=r.get(f.IDENT(),this.index).getplayersprite();this.player={pos:[t,s],sprite:i}}endPlayer(){this.endShot(this.player.pos)}addEnemy(){if(Math.random()>=1-Math.pow(.993,this.enemyTime))return;const e=r.get(u.IDENT(),this.index),t=e.canvas.width,s=Math.random()*(e.canvas.height-39),i=r.get(f.IDENT(),this.index).getenemysprite();this.enemies.push({pos:[t,s],sprite:i})}endEnemy(e,t,s){this.enemies.splice(e,1),-1!==t?(this.bullets.splice(t,1),this.endShot(s)):this.endPlayer()}addShot(){const e=this.player.pos[0]+this.player.sprite.size[0]/2,t=this.player.pos[1]+this.player.sprite.size[1]/2,s=r.get(f.IDENT(),this.index).getbulletssprites();this.bullets.push({pos:[e,t],dir:"forward",sprite:s[0]}),this.bullets.push({pos:[e,t],dir:"up",sprite:s[1]}),this.bullets.push({pos:[e,t],dir:"down",sprite:s[2]})}endShot(e){const t=r.get(f.IDENT(),this.index).getexplosionsprite();this.explosions.push({pos:e,sprite:t})}}var w=E;new w({width:800,height:400,speedPlayer:16,speedEnemy:6,speedExplosion:6,incrPlayer:200,incrBullet:500,incrEnemy:150,incrScore:100,threshFire:100},i,i.elemcanvasid+0),m(["/rsrc/images/sprites.png","/rsrc/images/terrain.png"],r.get(w.IDENT(),-1))}]);