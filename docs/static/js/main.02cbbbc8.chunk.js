(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{54:function(e,t,a){},55:function(e,t,a){},63:function(e,t){},64:function(e,t,a){"use strict";a.r(t);var n=a(15),c=a(18),r=a.n(c),o=a(33),l=a.n(o),u=(a(54),a(17)),s=(a(55),a(2)),i=a(66),b=a(29),v=a.n(b);var j=["-","+","/","*"],p=[{value:"%",role:"special"},{value:"\u03c0",role:"special"},{value:"e",role:"special"},{value:"/",role:"operation"},{value:"7",role:"number"},{value:"8",role:"number"},{value:"9",role:"number"},{value:"x",role:"operation"},{value:"4",role:"number"},{value:"5",role:"number"},{value:"6",role:"number"},{value:"-",role:"operation"},{value:"1",role:"number"},{value:"2",role:"number"},{value:"3",role:"number"},{value:"+",role:"operation"},{value:"0",role:"number",long:!0},{value:".",role:"punctuation"},{value:"\u232b",role:"erase"},{value:"C",role:"abort",long:!0},{value:"=",role:"res"}],f=function(e){var t=e.btn,a=e.onClick,c="x"===t.value?"*":t.value,r=v()(t.role,{button:!0,long:t.long});return Object(n.jsx)("button",{className:r,onClick:function(){return a(c,t.role)},children:t.value})},m=function(){var e=Object(c.useState)(0),t=Object(u.a)(e,2),a=t[0],r=t[1],o=Object(c.useState)(""),l=Object(u.a)(o,2),b=l[0],m=l[1],O=Object(c.useState)(!1),d=Object(u.a)(O,2),h=d[0],g=d[1],k=Object(c.useState)("number"),N=Object(u.a)(k,2),x=N[0],y=N[1],S=Object(c.useState)(!1),C=Object(u.a)(S,2),D=C[0],T=C[1],w=function(e){e.preventDefault();var t=e.key;"Enter"===t&&F(t,"res"),/\d/.test(t)?(e.preventDefault(),F(parseInt(t,10),"number")):j.includes(t)?(e.preventDefault(),F(t,"operation")):"."===t?(e.preventDefault(),F(t,"punctuation")):"%"===t?(e.preventDefault(),F(t,"special")):"Backspace"===t?(e.preventDefault(),F(t,"erase")):"Clear"===t&&(e.preventDefault(),F(t,"abort"))};Object(c.useEffect)((function(){return document.addEventListener("keydown",w),function(){document.removeEventListener("keydown",w)}}));var E=function(e){var t=e.toString().split("."),a=e;if(t[1]&&t[1].length>6){a=Object(s.oc)(a,6);var n=b.split(" "),c=Number(n[n.length-1]);n[n.length-1]=Object(s.oc)(c,6),m(n.join(" "))}a>1e7&&(g("This number is too big for a handy calculator :("),a=a.toString().substr(0,8)),r(a)},F=function(e,t){switch(T(!1),t){case"number":h&&g(!1),a>1e7?g("This number is too big for a handy calculator :("):(m("0"!==b?b+=e:e),E(Object(i.a)(b))),y(t);break;case"operation":if(h&&g(!1),"operation"===x){var n=b.slice(0,-2);m(n+=" ".concat(e," "))}else m(b+=" ".concat(e," "));y(t);break;case"punctuation":if("number"!==x)return;var c=b.split(" ");isNaN("".concat(c[c.length-1]).concat(e))?g("This is not a number"):(m(b+=e),E(Object(i.a)(b))),y(t);break;case"special":if("%"===e){var o=b.split(" ");if(o.length<2){var l=Object(s.oc)(Object(i.a)("0.01 * ".concat(a)),6);E(l),m(l)}else{var u=~~o[0]/100*o[2],v=Object(i.a)("".concat(o[0]).concat(o[1]).concat(u));E(v),m("".concat(o[0]," ").concat(o[1]," ").concat(u))}y(t)}else"\u03c0"===e?isNaN("".concat(a,"3.14159"))?g("This is not a number"):(m(b+="3.14159"),E(Object(i.a)(b))):isNaN("".concat(a,"2.71828"))?g("This is not a number"):(m(b+="2.71828"),E(Object(i.a)(b)));break;case"res":T(!0),setTimeout((function(){m(a),r("0")}),250);break;case"abort":m(""),r("0"),g(!1);break;case"erase":var p;if(g(!1)," "===b[b.length-1]||j.includes(b[b.length-1]))p=b.slice(0,-3),m(p),E(Object(i.a)(p)),y("number");else{(p=b.toString().slice(0,-1))?m(p):(E(0),m(""));try{E(Object(i.a)(p))}catch(f){}}}};return Object(n.jsxs)("div",{className:"calc__body",children:[Object(n.jsxs)("div",{className:"panel",children:[Object(n.jsx)("div",{className:v()({formula:!0,fadeOutUp:D}),children:b}),Object(n.jsx)("div",{className:v()("result",{fadeOutUp:D}),children:a}),h&&Object(n.jsx)("p",{className:"error",children:h})]}),Object(n.jsx)("div",{className:"buttons",children:p.map((function(e){return Object(n.jsx)(f,{btn:e,onClick:function(e,t){return F(e,t)}},e.value)}))})]})},O=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,67)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;a(e),n(e),c(e),r(e),o(e)}))};l.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(m,{})}),document.getElementById("root")),O()}},[[64,1,2]]]);
//# sourceMappingURL=main.02cbbbc8.chunk.js.map