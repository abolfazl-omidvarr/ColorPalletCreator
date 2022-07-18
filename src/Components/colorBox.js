import React, { useState } from 'react';
import { ColorBoxDiv } from './Styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';

export default function ColorBox({ color, name, singleColor }) {
  const history = useNavigate();
  const [copied, setCopied] = useState(false);
  const { pathname } = useLocation();

  const luminance = chroma(color).luminance();

  function onCopyHandler() {
    setCopied(true);
    setTimeout(function() {
      setCopied(false);
    }, 1200);
  }
  function moreButtonClickHandler(e) {
    e.stopPropagation();
    history(`/${pathname.split('/')[1]}/${name.split(' ')[0].toLowerCase()}`);
  }
  const moreButton = !singleColor ? (
    <button onClick={e => moreButtonClickHandler(e)} className='more'>
      MORE
    </button>
  ) : null;
  return (
    <CopyToClipboard text={color} onCopy={() => onCopyHandler()}>
      <ColorBoxDiv
        singleColor={singleColor}
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
  );
}
