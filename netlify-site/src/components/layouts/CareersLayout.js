import React, { useEffect } from 'react';
import Header from '../sections/Header';

export default function CareersLayout(props) {
    const { page } = props;

    useEffect(() => {
        // Load canvas script
        const script = document.createElement('script');
        script.src = '/canvas.js';
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
                <section className="section-padding" style={{ paddingTop: '10rem' }}>
                    <span className="section-tag" data-sb-field-path="title">// JOIN THE LAB</span>
                    <h1 className="camera-font" style={{ fontSize: '4rem', textAlign: 'left', textTransform: 'none', marginBottom: '2rem' }} data-sb-field-path="heroTitle">
                        Build the Future of <span className="text-accent">Defense</span>
                    </h1>
                    <p className="text-muted" style={{ maxWidth: '800px', fontSize: '1.25rem', marginBottom: '5rem' }} data-sb-field-path="heroSubtitle">
                        {page.heroSubtitle}
                    </p>

                    <div className="job-listing">
                        <div className="job-header">
                            <h3 className="job-title">Virtual Chief Information Security Officer (vCISO)</h3>
                            <a href="/request-analysis" className="btn-sofecta" style={{ fontSize: '0.75rem' }}>APPLY NOW →</a>
                        </div>
                        <div className="job-tags">
                            <span className="job-tag">MANAGEMENT</span>
                            <span className="job-tag">REMOTE-FIRST</span>
                            <span className="job-tag">CYBERSECURITY</span>
                        </div>
                        <div className="text-muted" style={{ lineHeight: 1.8, maxWidth: '900px' }}>
                            <p style={{ marginBottom: '1.5rem' }}>Join us in a pivotal leadership role as a vCISO, overseeing information security programs for our diverse customer base. You will be responsible for defining cybersecurity strategies, performing risk assessments, and ensuring regulatory compliance across multiple jurisdictions.</p>
                            
                            <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem' }}>KEY RESPONSIBILITIES:</h4>
                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem' }}>
                                <li>Develop and implement tailored cybersecurity frameworks (ISO27001, NIS2, DORA).</li>
                                <li>Lead vulnerability analyses and incident response readiness.</li>
                                <li>Advise c-level executives on risk mitigation and security investment.</li>
                            </ul>

                            <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem' }}>CRITICAL REQUIREMENTS:</h4>
                            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem' }}>
                                <li>Extensive experience as a CISO or senior security manager.</li>
                                <li>Deep expertise in AWS, Azure, and Google Cloud security models.</li>
                                <li>Finnish citizenship (required for government-facing projects).</li>
                                <li>CISSP, CISM, or CISA certification preferred.</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginTop: '5rem', padding: '4rem', background: 'hsla(var(--surface-glass) / 0.2)', border: '1px dashed hsl(var(--border-glass))', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        <h3 className="camera-font" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Don&apos;t see a perfect match?</h3>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>We are constantly looking for talent in detection engineering, software development, and threat hunting.</p>
                        <a href="/#initiate" className="btn-sofecta">SEND AN OPEN APPLICATION →</a>
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
                        <div className="footer-col">
                            <h4>SOLUTIONS</h4>
                            <ul>
                                <li><a href="/mdr">MDR</a></li>
                                <li><a href="/observability">Observability</a></li>
                                <li><a href="/consulting">Consulting</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>COMPANY</h4>
                            <ul>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/careers">Careers</a></li>
                                <li><a href="/#initiate">Contact</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>RESOURCES</h4>
                            <ul>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="https://status.sofectalabs.io" target="_blank" rel="noreferrer">System Status</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>CONNECT</h4>
                            <ul style={{ display: 'flex', gap: '1rem' }}>
                                <li><a href="https://www.linkedin.com/company/sofecta/" target="_blank" rel="noreferrer" aria-label="LinkedIn">LN</a></li>
                                <li><a href="https://x.com/sofectalabs" target="_blank" rel="noreferrer" aria-label="X">X</a></li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <p className="mono-text" style={{ fontSize: '0.7rem', color: 'hsl(var(--muted-foreground))', opacity: '0.6' }}>© 2024 SOFECTA LABS. ALL SYSTEMS OPERATIONAL.</p>
                        <ul className="footer-legal">
                            <li><a href="#" style={{ textDecoration: 'none', color: 'hsl(var(--muted-foreground))', fontSize: '0.7rem', fontFamily: '"Geist Mono", monospace' }}>PRIVACY</a></li>
                            <li><a href="#" style={{ textDecoration: 'none', color: 'hsl(var(--muted-foreground))', fontSize: '0.7rem', fontFamily: '"Geist Mono", monospace' }}>TERMS</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
