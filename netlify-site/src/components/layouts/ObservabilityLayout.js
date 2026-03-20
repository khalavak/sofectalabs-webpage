import React, { useEffect } from 'react';

export default function ObservabilityLayout(props) {
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

    const modules = [
        { tag: 'DATA ENGINE', head: 'Elastic Stack', desc: 'Harness the power of 350+ integrations to ingest data from any source, providing a unified view of your infrastructure\'s health and security posture.', link: 'https://www.elastic.co/integrations/data-integrations', label: 'Elastic Integrations →' },
        { tag: 'LOG ANALYTICS', head: 'Log Analytics', desc: 'Petabytes of logs. Instant clarity. In seconds. Search logs with Discover, visualize with prebuilt dashboards, and run ad hoc queries with ES|QL.', link: 'https://www.elastic.co/observability/log-monitoring', label: 'Analyze your logs →' },
        { tag: 'PERFORMANCE', head: 'Application Performance', desc: 'Production-grade pure OTel. Stream native OTel without proprietary agents, and gain broad language support with intelligent sampling.', link: 'https://www.elastic.co/observability/application-performance-monitoring', label: 'Dive into APM →' },
        { tag: 'INFRASTRUCTURE', head: 'Infrastructure Monitoring', desc: 'From bare metal to the cloud. Gain visibility across cloud, on-prem, Kubernetes, serverless, and hosts with 400+ Omit OOTB integrations.', link: 'https://www.elastic.co/observability/infrastructure-monitoring', label: 'View your infrastructure →' },
        { tag: 'INTELLIGENCE', head: 'AIOps', desc: 'Zero-config, always-on analysis that keeps you ahead. Instantly surface anomalies, patterns, correlations, and root causes across silos.', link: 'https://www.elastic.co/observability/aiops', label: 'Get AI-powered insights →' },
        { tag: 'GENAI', head: 'LLM Observability', desc: 'Remove blind spots for GenAI apps. Track latency, errors, prompts, responses, usage, and costs for all major LLM services.', link: 'https://www.elastic.co/observability/llm-monitoring', label: 'Get LLM visibility →' },
        { tag: 'EXPERIENCE', head: 'Digital Experience', desc: 'Every click. Every path. Improve user experience with real user monitoring (RUM), synthetic testing, and uptime monitoring.', link: 'https://www.elastic.co/observability/digital-experience-monitoring', label: 'Get ahead of user issues →' }
    ];

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
                            <li><a href="/request-analysis">REQUEST ANALYSIS</a></li>
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
                    <span className="section-tag" data-sb-field-path="title">// SOLUTIONS / OBSERVABILITY</span>
                    <h1 className="camera-font" style={{ fontSize: '4rem', textAlign: 'left', textTransform: 'none', marginBottom: '2rem' }} data-sb-field-path="heroTitle">
                        Managed <br /><span className="text-accent">Observability</span>
                    </h1>
                    <p className="text-muted" style={{ maxWidth: '800px', fontSize: '1.25rem', marginBottom: '5rem' }} data-sb-field-path="heroSubtitle">
                        {page.heroSubtitle}
                    </p>

                    <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {modules.map((m, idx) => (
                            <div key={idx} className="module-card">
                                <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ {m.tag} ]</span>
                                <h3 style={{ marginBottom: '1rem' }}>{m.head}</h3>
                                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>{m.desc}</p>
                                <a href={m.link} className="cyber-badge" style={{ textDecoration: 'none', display: 'inline-block' }} target="_blank" rel="noreferrer">{m.label}</a>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <span className="section-tag">// PERFORMANCE METRICS</span>
                            <h2 className="camera-font" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Total Visibility</h2>
                            <p className="text-muted" style={{ lineHeight: 1.8 }}>Our managed approach eliminates silos. By combining tracing and profiling with traditional logging, we provide the deep context required to troubleshoot complex microservices and distributed applications.</p>
                        </div>
                        <div className="terminal-card" style={{ padding: '1.5rem' }}>
                            <div className="terminal-header">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <div className="mono-text" style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                                <span style={{ color: '#27c93f' }}>$ observability --analyze-traces</span><br />
                                [SUCCESS] Unified traces mapped: 142<br />
                                [INFO] Anomaly detected in &apos;billing-svc&apos;<br />
                                [INFO] Latency spike correlated to DB query #882<br />
                                <span style={{ color: '#f5a623' }}>[ACTION] Auto-scaling triggered...</span>
                            </div>
                        </div>
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
                </div>
            </footer>
        </div>
    );
}
