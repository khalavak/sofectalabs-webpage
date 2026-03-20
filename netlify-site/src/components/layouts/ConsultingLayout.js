import React, { useEffect } from 'react';

export default function ConsultingLayout(props) {
    const { page } = props;

    useEffect(() => {
        // Load canvas script
        const script = document.createElement('script');
        script.src = '/canvas.js';
        script.async = true;
        document.body.appendChild(script);

        // Mobile Menu
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        if (mobileToggle && navLinks) {
            const toggleHandler = () => navLinks.classList.toggle('active');
            mobileToggle.addEventListener('click', toggleHandler);
            return () => mobileToggle.removeEventListener('click', toggleHandler);
        }

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

            <header>
                <div className="container">
                    <nav>
                        <div className="logo">
                            <a href="/"><img src="/assets/logo-horizontal.png" alt="SOFECTA LABS" /></a>
                        </div>
                        <ul className="nav-links" id="navLinks">
                            <li><a href="/#engine">THE ENGINE</a></li>
                            <li><a href="/#protocol">METHODOLOGY</a></li>
                            <li><a href="/#lab">CONSULTING</a></li>
                            <li><a href="/#initiate">INITIATE</a></li>
                            <li><a href="/request-analysis" style={{ textDecoration: 'none', color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', fontFamily: '"Geist Mono", monospace' }}>REQUEST ANALYSIS</a></li>
                            <li><a href="/blog">BLOG</a></li>
                        </ul>
                        <a href="/#initiate" className="btn-sofecta header-cta">GET STARTED</a>
                        <button className="mobile-toggle" id="mobileToggle" aria-label="Menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </button>
                    </nav>
                </div>
            </header>

            <main className="container">
                <section className="section-padding" style={{ paddingTop: '10rem' }}>
                    <span className="section-tag" data-sb-field-path="title">// SOLUTIONS / CONSULTING</span>
                    <h1 className="camera-font" style={{ fontSize: '4rem', textAlign: 'left', textTransform: 'none', marginBottom: '2rem' }} data-sb-field-path="heroTitle">
                        Strategic <br />Security <span className="text-accent">Consulting</span>
                    </h1>
                    <p className="text-muted" style={{ maxWidth: '800px', fontSize: '1.25rem', marginBottom: '5rem' }} data-sb-field-path="heroSubtitle">
                        {page.heroSubtitle}
                    </p>

                    <div className="card-grid">
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ LEADERSHIP ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>vCISO Services</h3>
                            <p className="text-muted">Strategic security leadership on demand to guide your roadmap and risk posture. Executive risk reporting and policy development.</p>
                        </div>
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ COMPLIANCE ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>Compliance & Audit</h3>
                            <p className="text-muted">Our platform automates evidence collection and continuous auditing for ISO 27001, NIS2, DORA, and GDPR readiness.</p>
                        </div>
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ RESPONSE ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>Incident Response</h3>
                            <p className="text-muted">Rapid breach containment, digital forensics, and post-incident recovery to ensure organizational resilience.</p>
                        </div>
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ DESIGN ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>Security Architecture</h3>
                            <p className="text-muted">Modern Zero Trust blueprints, cloud hardening, and infrastructure-as-code audits for scalable security design.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '8rem' }}>
                        <span className="section-tag">// FRAMEWORKS COVERED</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2rem' }}>
                            <div className="cyber-badge">ISO 27001</div>
                            <div className="cyber-badge">NIS2</div>
                            <div className="cyber-badge">DORA</div>
                            <div className="cyber-badge">GDPR</div>
                            <div className="cyber-badge">SOC2</div>
                            <div className="cyber-badge">ISMS</div>
                        </div>
                    </div>
                </section>

                <section className="section-padding" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
                    <span className="section-tag">// MANAGED SERVICES</span>
                    <h2 className="camera-font" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textTransform: 'none', maxWidth: '800px' }}>Enhance your security posture with seamlessly integrated services</h2>
                    <p className="text-muted" style={{ maxWidth: '800px', marginBottom: '4rem' }}>Supercharge your business growth and expertise with our turn-key managed services. Unlock scalable and cost-effective solutions, all supported by our team of seasoned experts dedicated to your success.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                        <a href="/mdr" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Managed Detection and Response</h3>
                                <p className="text-muted" style={{ flexGrow: 1, marginBottom: '2rem' }}>Sofecta Labs' Managed Detection and Response (MDR) offers a comprehensive cybersecurity solution, designed to detect, respond to, and mitigate threats in real-time. Our MDR includes technologies such as endpoint protection, SIEM, AI-assisted analysis, threat intelligence feeds, behavioral analytics, Threat Hunting, and more. The service includes fully managed and scalable provisions for environment, storage, licenses, and maintenance.</p>
                                <div>
                                    <span className="btn-sofecta" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', borderColor: 'rgba(255,255,255,0.2)' }}>LEARN MORE →</span>
                                </div>
                            </div>
                        </a>
                        <a href="/observability" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Managed Observability</h3>
                                <p className="text-muted" style={{ flexGrow: 1, marginBottom: '2rem' }}>Sofecta Labs Managed Observability service offers real-time monitoring of metrics and automatically detects anomalies, allowing you to identify and address issues before they impact your operations. By leveraging ML-driven insights, you can optimize your system's performance, enhance resource utilization, and deliver exceptional user experiences.</p>
                                <div>
                                    <span className="btn-sofecta" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', borderColor: 'rgba(255,255,255,0.2)' }}>LEARN MORE →</span>
                                </div>
                            </div>
                        </a>
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
                        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
                            <li><a href="#" style={{ textDecoration: 'none', color: 'hsl(var(--muted-foreground))', fontSize: '0.7rem', fontFamily: '"Geist Mono", monospace' }}>PRIVACY</a></li>
                            <li><a href="#" style={{ textDecoration: 'none', color: 'hsl(var(--muted-foreground))', fontSize: '0.7rem', fontFamily: '"Geist Mono", monospace' }}>TERMS</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
