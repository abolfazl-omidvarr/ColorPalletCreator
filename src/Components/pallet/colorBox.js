import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { ColorBoxDiv } from './style';

export default function ColorBox({ color, name, colorShades }) {
  const history = useNavigate();
  const [copied, setCopied] = useState(false); //show and hide COPIED screen state hook
  const { pathname } = useLocation();

  const luminance = chroma(color).luminance(); //extract color lightness

  //show and hide COPIED screen
  function onCopyHandler() {
    setCopied(true);
    setTimeout(function() {
      setCopied(false);
    }, 800);
  }

  //navigate to shades component of clicked color
  function moreButtonClickHandler(e) {
    e.stopPropagation();
    const address = `/${pathname.split('/')[1]}/${name
      .split(' ')[0]
      .toLowerCase()}`;
    history(address);
  }
  //if in colorShades Component ? show more button : hide show button
  const moreButton = !colorShades ? (
    <button onClick={e => moreButtonClickHandler(e)} className='more'>
      MORE
    </button>
  ) : null;
  return (
    <CopyToClipboard text={color} onCopy={() => onCopyHandler()}>
      <ColorBoxDiv
        colorShades={colorShades}
        bgColor={color}
        lum={luminance > 0.2 ? '#000' : '#fff'}
      >
        <div
          className={`copy-overlay ${copied ? 'copy-overlay-active' : ''}`}
          style={{ backgroundColor: color }}
        ></div>
        <div
          className={`copy-msg-container ${
            copied ? 'copy-msg-container-active' : ''
          }`}
        >
          <h1 className='copy-msg-text'>Copied</h1>
          <p className='copy-msg-colorCode'>{color}</p>
        </div>
        <div className='colorBox-content'>
          <span className='name'>{name}</span>
          {moreButton}
        </div>

        <button className='copy'>Copy</button>
      </ColorBoxDiv>
    </CopyToClipboard>
  ); //end of return
} //end of function
