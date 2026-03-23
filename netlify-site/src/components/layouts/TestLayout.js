import React, { useEffect, useState } from 'react';
import Header from '../sections/Header';

export default function TestLayout(props) {
    const { page } = props;

    useEffect(() => {
        // Load the specialized test canvas script
        const script = document.createElement('script');
        script.src = '/canvas-test.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="theme-cyber" data-sb-object-id={page.__metadata?.id}>
            <div className="bg-animations">
                <canvas id="networkCanvas"></canvas>
            </div>

            {props.site.header && <Header {...props.site.header} enableAnnotations={true} />}

            <main className="container">
                <section className="section-padding" style={{ paddingTop: '10rem', minHeight: '100vh' }}>
                    <span className="section-tag" data-sb-field-path="title">// EXPERIMENTAL / ANIMATION_TEST</span>
                    <h1 className="camera-font" style={{ fontSize: '4rem', textAlign: 'left', textTransform: 'none', marginBottom: '2rem' }} data-sb-field-path="heroTitle">
                        Fluctuating <br />Wave <span className="text-accent">Dynamics</span>
                    </h1>
                    <p className="text-muted" style={{ maxWidth: '800px', fontSize: '1.25rem', marginBottom: '5rem' }} data-sb-field-path="heroSubtitle">
                        {page.heroSubtitle || "Testing fluctuating wave amplitudes and orange intersection highlights for enhanced visual depth."}
                    </p>

                    <div style={{ marginTop: '8rem', textAlign: 'center', padding: '4rem', border: '1px solid hsl(var(--border-glass))', borderRadius: 'var(--radius)', background: 'hsl(var(--surface-glass))', backdropFilter: 'blur(12px)' }}>
                        <h2 className="camera-font" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Animation Parameters</h2>
                        <ul className="text-muted" style={{ textAlign: 'left', display: 'inline-block' }}>
                            <li>• 3 Parallel Sine Waves</li>
                            <li>• Amplitude Modulation (Fluctuation)</li>
                            <li>• Angled Scanning Lines</li>
                            <li>• Orange Intersection Highlights (#f97316)</li>
                        </ul>
                    </div>
                </section>
            </main>

            <footer style={{ padding: '6rem 0', borderTop: '1px solid hsl(var(--border-glass))' }}>
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col" style={{ gridColumn: 'span 1' }}>
                            <div className="logo" style={{ marginBottom: '1.5rem' }}>
                                <img src="/assets/logo-horizontal.png" alt="SOFECTA LABS" style={{ height: '40px' }} />
                            </div>
                            <p className="mono-text" style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>Precision engineered detection and response for the modern enterprise.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
