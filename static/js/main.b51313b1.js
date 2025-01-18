/*! For license information please see main.b51313b1.js.LICENSE.txt */
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,SX=BX`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,QX=BX`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,_X=Fl("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),FX=Fl(xX,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${DX.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${kX};
    animation-duration: ${550}ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
  }

  &.${DX.ripplePulsate} {
    animation-duration: ${e=>{let{theme:t}=e;return t.transitions.duration.shorter}}ms;
  }

  & .${DX.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${DX.childLeaving} {
    opacity: 0;
    animation-name: ${SX};
    animation-duration: ${550}ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
  }

  & .${DX.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${QX};
    animation-duration: 2500ms;
    animation-timing-function: ${e=>{let{theme:t}=e;return t.transitions.easing.easeInOut}};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
//# sourceMappingURL=main.b51313b1.js.map