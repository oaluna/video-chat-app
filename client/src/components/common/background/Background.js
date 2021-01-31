import React from 'react';
import styled from 'styled-components'

const BackgroundWrapper = styled.div`
  overflow: hidden;
 position: absolute;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
 z-index: -1;
`

const StyledBackground = styled.div`
 position: absolute;
 top: -20vh;
 left: -20vw;
 width: 170vw;
 height: 170vh;
 background-image: url(images/download.png);
 background-size: cover;
 background-position: center;
filter: brightness(0.75);
 filter: url("#turbulence");
`

const Background = () => {
  return (
    <>
      <BackgroundWrapper>
<StyledBackground>
<svg>
  <filter id="turbulence" x="0" y="0" width="100%" height="100%">
    <feTurbulence
                  id="fluid"
                  numOctaves="1"
                  seed="3"
                  baseFrequency="0.001 0.001"
                  type="fractalNoise"
                  ></feTurbulence>
    <feDisplacementMap
                       in2="turbulence"
                       in="SourceGraphic"
                       scale="400"
                       xChannelSelector="R"
                       yChannelSelector="G"
                       ></feDisplacementMap>
    <animate
             href="#fluid"
             attributeName="baseFrequency"
             dur="120s"
             values="0.001 0.001;0.002 0.005;0.005 0.005;0.002 0.001
            ;0.003 0.004;0.001 0.001"
             keySplines="
                         .52 .02 .62 .99;
                         .52 .02 .52 .99;
                         .52 .02 .62 .99;
                         .52 .02 .52 .99;
                         .52 .02 .62 .99"
             keyTimes="
                       0;0.2;0.4;0.6;0.8;1"
             calcMode="spline"
             repeatCount="indefinite"
             />
  </filter>
</svg>
</StyledBackground>
</BackgroundWrapper>
    </>
  )
}

export default Background