import React from 'react';
import styles from './assets/css/landing.module.css';
import backgroundImage from './assets/img/background.jpg';

const Landing: React.FC = () => {
  return (
    <div id={styles.main}>
      <div className={styles['framer-tHKXl']}>
        <div className={styles['framer-72rtr7']} style={{ minHeight: '100%', width: 'auto' }}>
          <div className={styles['framer-erum1s']}>
            <div style={{ position: 'absolute', pointerEvents: 'none', userSelect: 'none', borderRadius: 'inherit', top: 0, right: 0, bottom: 0, left: 0 }}>
              <div>
                <img src={backgroundImage} sizes="calc(100vw - 80px)" style={{ pointerEvents: 'none', userSelect: 'none', display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectPosition: 'center', objectFit: 'cover', imageRendering: 'auto' }} alt="Background" />
              </div>
            </div>
            <div className={styles['framer-vn0loq']} style={{ opacity: 1, transform: 'perspective(1200px) translateX(0px) translateY(0px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) translateZ(0px)' }}>
              <div data-framer-component-type="SVG"></div>
            </div>
            <div className={styles['framer-16j9vqo']}>
              <div className={styles['framer-15os4ys']}>
                <div data-framer-component-type="Text" style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, lineHeight: '1px', fontSize: '0px', '--framer-text-alignment': 'center', opacity: 1, transform: 'none' }} className={styles['framer-1avyakb']}>
                  <h1 style={{ fontSize: 0, lineHeight: 0, tabSize: 4, whiteSpace: 'inherit', wordWrap: 'inherit' }}>
                    <span style={{ direction: 'ltr', fontSize: 0 }}>
                      <span style={{}}>Altum Labs.</span>
                      <br />
                    </span>
                  </h1>
                </div>
                <div className={styles['framer-1ob979x']}>
                  <div data-framer-component-type="Text" style={{ outline: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexShrink: 0, lineHeight: '1px', fontSize: '0px', '--framer-text-alignment': 'center', opacity: 1, transform: 'none' }} className={styles['framer-11k8qmz']}>
                    <p>
                      <span>
                        <span>An information foundation for the next generation of healthcare.</span>
                        <br />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles['framer-fsyrsw']}>
                <div className={styles['framer-fdfkzj-container']} style={{ opacity: 1, transform: 'none' }}>
                  <div style={{ width: '100%', position: 'relative', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', '--framer-mailchimp-placeholder-color': 'rgba(0, 0, 0, 0.3)' }}>
                    <form style={{ width: '100%', display: 'grid', gap: '15px', gridTemplateColumns: '1fr max-content', gridTemplateRows: '1fr' }} action="/login" method="GET">
                      <div style={{ position: 'relative' }}>
                        <input type="submit" className={styles.buttonstyle} value="Login" />
                      </div>
                    </form>
                    <form style={{ width: '100%', display: 'grid', gap: '15px', gridTemplateColumns: '1fr max-content', gridTemplateRows: '1fr' }} action="/register" method="GET">
                      <div style={{ position: 'relative' }}>
                        <input type="submit" className={styles.buttonstyle} value="Register" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['framer-1627cz6']} style={{ opacity: 1, transform: 'none' }}></div>
          </div>
        </div>
        <div id={styles.overlay}></div>
      </div>
    </div>
  );
};

export default Landing;
