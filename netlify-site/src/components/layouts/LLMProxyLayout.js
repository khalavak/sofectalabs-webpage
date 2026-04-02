import React, { useEffect } from 'react';
import Header from '../sections/Header';

export default function LLMProxyLayout(props) {
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

    const modules = [
        { tag: 'LOCAL LLM', head: 'Local Processing Engine', desc: 'Functions as a fast, secure local LLM for immediate processing while retaining complete control over your sensitive data environment.', link: '#', label: 'Explore Processing →' },
        { tag: 'GUARDRAILS', head: 'Configurable Guardrails', desc: 'Define strict rules and guardrails for exactly how and when data should be processed, enabling completely safe usage of public LLM APIs without risk of data leakage.', link: '#', label: 'View Guardrails →' },
        { tag: 'ANONYMIZATION', head: 'Data Anonymization', desc: 'Automatically redact and anonymize sensitive information, PII, and proprietary code before intelligently routing non-sensitive queries to public LLMs.', link: '#', label: 'Learn about Anonymization →' },
        { tag: 'ACCESS CONTROL', head: 'Role-Based Routing', desc: 'Control which users or applications have access to which AI models. Set rate limits and audit every prompt.', link: '#', label: 'See Access Controls →' }
    ];

    return (
        <div className="theme-cyber" data-sb-object-id={page.__metadata?.id}>
            <div className="bg-animations">
                <canvas id="networkCanvas"></canvas>
            </div>

            {props.site.header && <Header {...props.site.header} enableAnnotations={true} />}

            <main className="container">
                <section className="section-padding" style={{ paddingTop: '10rem' }}>
                    <span className="section-tag" data-sb-field-path="title">// SOLUTIONS / LLM PROXY</span>
                    <h1 className="camera-font" style={{ fontSize: '4rem', textAlign: 'left', textTransform: 'none', marginBottom: '2rem' }} data-sb-field-path="heroTitle">
                        Sofecta Labs <br /><span className="text-accent">LLM Proxy</span>
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
                            <span className="section-tag">// DATA SECURITY</span>
                            <h2 className="camera-font" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Absolute Privacy</h2>
                            <p className="text-muted" style={{ lineHeight: 1.8 }}>The LLM Proxy acts as an intelligent intermediary between your organization and public GenAI services. By anonymizing data and enforcing strict boundaries, you harness the full power of modern LLMs (GPT-4, Claude, Gemini) without ever compromising PII, intellectual property, or sensitive internal context.</p>
                        </div>
                        <div className="terminal-card" style={{ padding: '1.5rem' }}>
                            <div className="terminal-header">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <div className="mono-text" style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                                <span style={{ color: '#27c93f' }}>$ llm-proxy --analyze-prompt</span><br />
                                [SUCCESS] Intercepted prompt from user 'dev-env'<br />
                                [INFO] PII Detected: SSN, Email Address<br />
                                [INFO] Anonymizing data payloads...<br />
                                <span style={{ color: '#f5a623' }}>[ACTION] Safely routed to public endpoint.</span>
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
                                <li><a href="/llm-proxy">LLM Proxy</a></li>
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
