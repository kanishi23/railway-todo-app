import React, { useState, useEffect, useCallback } from 'react';
import '../asset/test.scss';

export default function Test() {
  const [tabState, setTabState] = useState('tab-1');
  const [panelState, setPanelState] = useState('panel-1');

  const test = () => {
    console.log('button click');
  };
  const testFocusOn = () => {
    const tab = document.activeElement.getAttribute('id');
    const panel = document.activeElement.getAttribute('aria-controls');
    setTabState(tab);
    setPanelState(panel);
    document.getElementById(tab).setAttribute('aria-selected', 'true');
    document.getElementById(panel).setAttribute('aria-hidden', 'false');
  };

  const testOnBlur = () => {
    document.getElementById(tabState).setAttribute('aria-selected', 'false');
    document.getElementById(panelState).setAttribute('aria-hidden', 'true');
  };

  const chnageFocus1 = () => {
    document.getElementById('tab-3').focus();
  };
  const chnageFocus2 = () => {
    document.getElementById('tab-1').focus();
  };

  const escFunction = useCallback((event) => {
    console.log('evernt', event);
  });
  useEffect(() => {
    const triger = document.getElementById('tab-2');
    triger.addEventListener('keydown', escFunction, false);
  }, []);

  return (
    <>
      <div className="tabs">
        <div role="tablist" aria-label="Sample Tabs">
          <span tabIndex="1" onFocus={chnageFocus1}></span>
          <button
            onClick={test}
            onFocus={testFocusOn}
            onBlur={testOnBlur}
            role="tab"
            aria-selected="true"
            aria-controls="panel-1"
            id="tab-1"
            className="test autofocus1"
            tabIndex="2"
            autoFocus
          >
            First Tab
          </button>
          <button
            onClick={test}
            onFocus={testFocusOn}
            onBlur={testOnBlur}
            role="tab"
            aria-selected="false"
            aria-controls="panel-2"
            id="tab-2"
            className="test"
            tabIndex="3"
          >
            Second Tab
          </button>
          <button
            onClick={test}
            onFocus={testFocusOn}
            onBlur={testOnBlur}
            role="tab"
            aria-selected="false"
            aria-controls="panel-3"
            className="test autofocus2"
            id="tab-3"
            tabIndex="4"
          >
            Third Tab
          </button>
          <span tabIndex="5" onFocus={chnageFocus2}></span>
        </div>
        <div id="panel-1" role="tabpanel" tabIndex="0" aria-labelledby="tab-1" aria-hidden="false">
          <p>Content for the first panel</p>
        </div>
        <div id="panel-2" role="tabpanel" tabIndex="0" aria-labelledby="tab-2" aria-hidden="true">
          <p>Content for the second panel</p>
        </div>
        <div id="panel-3" role="tabpanel" tabIndex="0" aria-labelledby="tab-3" aria-hidden="true">
          <p>Content for the third panel</p>
        </div>
      </div>
    </>
  );
}
