import React, { useEffect, useState } from 'react';
import Header from '../sections/Header';

export default function SofectaHome(props) {
    const { page } = props;
    const [statusData, setStatusData] = useState({ text: 'SYSTEMS OPERATIONAL', color: '#27c93f' });

    useEffect(() => {
        // Load canvas script
        const script = document.createElement('script');
        script.src = '/canvas.js';
        script.async = true;
        document.body.appendChild(script);


        // Status Fetching
        async function fetchSystemStatus() {
            try {
                const response = await fetch('https://status.sofectalabs.io/');
                if (response.ok) {
                    const html = await response.text();
                    if (html.includes('All services are online')) {
                        setStatusData({ text: 'ALL SYSTEMS OPERATIONAL', color: '#27c93f' });
                    } else if (html.includes('Partial outage') || html.includes('Degraded performance')) {
                        setStatusData({ text: 'SYSTEMS DEGRADED', color: '#ffcc00' });
                    } else if (html.includes('Major outage')) {
                        setStatusData({ text: 'CRITICAL SYSTEM OUTAGE', color: '#ff5f56' });
                    }
                }
            } catch (error) {
                console.log('Status fetch blocked by CORS or network, using default.');
            }
        }
        fetchSystemStatus();

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const btn = document.getElementById('reqSubmitBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'TRANSMITTING...';
        btn.disabled = true;

        const payload = {
            name: document.getElementById('reqName').value,
            email: document.getElementById('reqEmail').value,
            organization: document.getElementById('reqOrg').value,
            message: document.getElementById('reqMessage').value
        };

        try {
            await fetch('https://sofectalabs.tines.com/webhook/website-contact-request/3e1e3e80ad25d65088da47cebb749e7e', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(payload)
            });

            btn.innerHTML = 'TRANSMISSION SUCCESSFUL';
            btn.style.color = '#27c93f';
            btn.style.borderColor = '#27c93f';
            document.getElementById('requestAnalysisForm').reset();
        } catch (error) {
            console.error('Error:', error);
            btn.innerHTML = 'TRANSMISSION FAILED';
            btn.style.color = '#ff5f56';
            btn.style.borderColor = '#ff5f56';
        } finally {
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.color = '';
                btn.style.borderColor = '';
                btn.disabled = false;
            }, 3000);
        }
    };

    return (
        <div data-sb-object-id={page.__metadata?.id}>
            <div className="bg-animations">
                <canvas id="networkCanvas"></canvas>
            </div>

            {props.site.header && <Header {...props.site.header} enableAnnotations={true} />}

            <main>
                <section className="hero container">
                    <h1 className="camera-font" style={{ textTransform: 'none' }} data-sb-field-path="title">
                        <span style={{ color: '#fff' }} data-sb-field-path="heroTitle1">{page.heroTitle1}</span><br />
                        <span style={{ color: 'hsl(var(--accent-orange))' }} data-sb-field-path="heroTitle2">{page.heroTitle2}</span>
                    </h1>
                    <p className="text-muted" style={{ maxWidth: '650px', marginTop: '1rem', fontSize: '1.125rem' }} data-sb-field-path="heroDescription">{page.heroDescription}</p>
                    <div className="hero-btns">
                        <a href={page.heroPrimaryButtonUrl} className="btn-sofecta" data-sb-field-path="heroPrimaryButtonText">{page.heroPrimaryButtonText}</a>
                        <a href={page.heroSecondaryButtonUrl} className="btn-sofecta secondary" data-sb-field-path="heroSecondaryButtonText">{page.heroSecondaryButtonText}</a>
                    </div>
                </section>

                <section className="metrics-bar">
                    <div className="container">
                        <div className="status-hero-wrapper" style={{ justifyContent: 'center', marginBottom: '3.5rem' }}>
                            <div className="mono-text operational-status" style={{ fontSize: '0.9rem', color: statusData.color, letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span id="systemStatusDot" style={{ width: '8px', height: '8px', background: statusData.color, borderRadius: '50%', display: 'inline-block', boxShadow: `0 0 10px ${statusData.color}` }}></span>
                                <a href="https://status.sofectalabs.io" id="systemStatusLink" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{statusData.text}</a>
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', flexWrap: 'wrap', gap: '3rem' }}>
                            <div className="metric-item">
                                <div className="metric-value">&lt; 4.2 min</div>
                                <div className="metric-label">Time to Detect</div>
                            </div>
                            <div className="metric-item">
                                <div className="metric-value">2.4M+</div>
                                <div className="metric-label">Signals / Day</div>
                            </div>
                            <div className="metric-item">
                                <div className="metric-value">99.98%</div>
                                <div className="metric-label">Uptime</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="logo-carousel">
                    <div className="logo-track">
                        <div className="logo-slide"><img src="/assets/logos/be-group.png" alt="BE Group" /></div>
                        <div className="logo-slide"><img src="/assets/logos/algol.png" alt="Algol" /></div>
                        <div className="logo-slide"><img src="/assets/logos/borenius.svg" alt="Borenius" /></div>
                        <div className="logo-slide"><img src="/assets/logos/mipro.png" alt="Mipro" /></div>
                        <div className="logo-slide"><img src="/assets/logos/mediconsult.webp" alt="Mediconsult" /></div>
                        <div className="logo-slide"><img src="/assets/logos/omsen.png" alt="Omsen Försäkringar" /></div>
                        <div className="logo-slide"><img src="/assets/logos/granlund.svg" alt="Granlund" /></div>
                        <div className="logo-slide"><img src="/assets/logos/mariehamns.png" alt="Mariehamns Energi" /></div>

                        <div className="logo-slide"><img src="/assets/logos/be-group.png" alt="BE Group" /></div>
                        <div className="logo-slide"><img src="/assets/logos/algol.png" alt="Algol" /></div>
                        <div className="logo-slide"><img src="/assets/logos/borenius.svg" alt="Borenius" /></div>
                        <div className="logo-slide"><img src="/assets/logos/mipro.png" alt="Mipro" /></div>
                        <div className="logo-slide"><img src="/assets/logos/mediconsult.webp" alt="Mediconsult" /></div>
                        <div className="logo-slide"><img src="/assets/logos/omsen.png" alt="Omsen Försäkringar" /></div>
                        <div className="logo-slide"><img src="/assets/logos/granlund.svg" alt="Granlund" /></div>
                        <div className="logo-slide"><img src="/assets/logos/mariehamns.png" alt="Mariehamns Energi" /></div>
                    </div>
                </section>

                <section id="engine" className="container section-padding">
                    <span className="section-tag">// THE ENGINE</span>
                    <h2 className="camera-font" style={{ fontSize: '3rem', marginBottom: '1.5rem', textTransform: 'none' }}>The Stack</h2>
                    <p className="text-muted" style={{ maxWidth: '600px', marginBottom: '4rem' }}>Three integrated modules. Zero blind spots. Every signal ingested, correlated, and acted upon.</p>
                    
                    <div className="card-grid">
                        <a href="/mdr" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card">
                                <span className="section-tag">THE BRAIN</span>
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: '"Public Sans", sans-serif' }}>Elastic SIEM</h4>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Centralized log aggregation and real-time threat detection across your entire infrastructure. Protocol-agnostic ingestion with custom detection rules.</p>
                                <ul className="module-list">
                                    <li>Custom Detection Rules</li>
                                    <li>Real-time Correlation</li>
                                    <li>Threat Intelligence Feeds</li>
                                </ul>
                            </div>
                        </a>
                        <a href="/mdr" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card">
                                <span className="section-tag">THE PERIMETER</span>
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: '"Public Sans", sans-serif' }}>Sublime Security</h4>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>AI-powered email security that stops phishing, BEC, and social engineering attacks before they reach your inbox.</p>
                                <ul className="module-list">
                                    <li>BEC Protection</li>
                                    <li>Phishing Detection</li>
                                    <li>Supply Chain Defense</li>
                                </ul>
                            </div>
                        </a>
                        <a href="/mdr" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card">
                                <span className="section-tag">THE PULSE</span>
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: '"Public Sans", sans-serif' }}>Extended Detection</h4>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Unified visibility across endpoints, networks, and cloud workloads. Automated response playbooks reduce response times.</p>
                                <ul className="module-list">
                                    <li>Endpoint Telemetry</li>
                                    <li>Automated Response</li>
                                    <li>Cloud Workload Protection</li>
                                </ul>
                            </div>
                        </a>
                        <a href="/observability" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card">
                                <span className="section-tag">THE INFRASTRUCTURE</span>
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: '"Public Sans", sans-serif' }}>Observability</h4>
                                <p className="text-muted" style={{ fontSize: '0.875rem' }}>Full-stack visibility across multi-cloud environments. Unify metrics, logs, and traces into actionable intelligence with AI-driven insights.</p>
                                <ul className="module-list">
                                    <li>Continuous Profiling</li>
                                    <li>AIOps & Root Cause</li>
                                    <li>400+ OOTB Integrations</li>
                                </ul>
                            </div>
                        </a>
                    </div>

                    <div style={{ marginTop: '4rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                        <a href="/mdr" className="cyber-badge" style={{ textDecoration: 'none' }}>MDR</a>
                        <a href="/observability" className="cyber-badge" style={{ textDecoration: 'none' }}>OBSERVABILITY</a>
                    </div>
                </section>

                <section id="protocol" className="container section-padding">
                    <span className="section-tag">// METHODOLOGY</span>
                    <h2 className="camera-font" style={{ fontSize: '3rem', marginBottom: '1.5rem', textTransform: 'none' }}>How We Work</h2>
                    <p className="text-muted" style={{ maxWidth: '600px', marginBottom: '5rem' }}>A repeatable, transparent process. No black boxes.</p>
                    
                    <div className="methodology-timeline">
                        <div className="timeline-item">
                            <div className="timeline-num">01</div>
                            <div className="timeline-content">
                                <h3>INGEST</h3>
                                <p className="text-muted">Protocol-agnostic data collection from endpoints, networks, cloud, and email.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-num">02</div>
                            <div className="timeline-content">
                                <h3>ANALYZE</h3>
                                <p className="text-muted">AI-assisted correlation with custom detection logic tuned to your threat landscape.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-num">03</div>
                            <div className="timeline-content">
                                <h3>REMEDIATE</h3>
                                <p className="text-muted">Automated containment and manual response within minutes, not hours.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-num">04</div>
                            <div className="timeline-content">
                                <h3>CONSULT</h3>
                                <p className="text-muted">Post-incident analysis, hardening recommendations, and continuous tuning.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="lab" className="container section-padding">
                    <span className="section-tag">// CONSULTING</span>
                    <h2 className="camera-font" style={{ fontSize: '3rem', marginBottom: '1.5rem', textTransform: 'none' }}>Professional Capabilities</h2>
                    <p className="text-muted" style={{ maxWidth: '600px', marginBottom: '4rem' }}>Beyond detection. Sofecta Labs helps you build, test, and harden your entire security posture.</p>
                    
                    <div className="card-grid">
                        <a href="/consulting" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card">
                                <div className="module-tag">[ LEADERSHIP ]</div>
                                <h3>vCISO Services</h3>
                                <p className="text-muted">Strategic security leadership on demand to guide your roadmap and risk posture. Executive risk reporting and policy development.</p>
                                <ul className="module-list">
                                    <li>Executive Risk Reporting</li>
                                    <li>Policy Development</li>
                                    <li>Budget & Roadmap Planning</li>
                                </ul>
                            </div>
                        </a>
                        <a href="/consulting" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card">
                                <div className="module-tag">[ COMPLIANCE ]</div>
                                <h3>Compliance & Audit</h3>
                                <p className="text-muted">Our platform automates evidence collection and continuous auditing for ISO 27001, NIS2, DORA, and GDPR readiness.</p>
                                <ul className="module-list">
                                    <li>ISO 27001</li>
                                    <li>NIS2, DORA, GDPR</li>
                                    <li>Gap Analysis & Remediation</li>
                                </ul>
                            </div>
                        </a>
                        <a href="/consulting" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card">
                                <div className="module-tag">[ RESPONSE ]</div>
                                <h3>Incident Response</h3>
                                <p className="text-muted">Rapid breach containment, digital forensics, and post-incident recovery to ensure organizational resilience.</p>
                                <ul className="module-list">
                                    <li>Emergency Incident Handling</li>
                                    <li>Digital Forensics</li>
                                    <li>Post-Incident Recovery</li>
                                </ul>
                            </div>
                        </a>
                        <a href="/consulting" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                            <div className="module-card">
                                <div className="module-tag">[ DESIGN ]</div>
                                <h3>Security Architecture</h3>
                                <p className="text-muted">Modern Zero Trust blueprints, cloud hardening, and infrastructure-as-code audits for scalable security design.</p>
                                <ul className="module-list">
                                    <li>Zero Trust Implementation</li>
                                    <li>Cloud Security Hardening</li>
                                    <li>Infrastructure-as-Code Audits</li>
                                </ul>
                            </div>
                        </a>
                    </div>
                </section>

                <section id="initiate" className="container section-padding">
                    <span className="section-tag">// INITIATE</span>
                    <h2 className="camera-font" style={{ fontSize: '3rem', marginBottom: '1.5rem', textTransform: 'none' }}>Initiate Contact</h2>
                    <p className="text-muted" style={{ maxWidth: '600px', marginBottom: '4rem' }}>Tell us about your requirements and security needs. We'll respond within 24 hours.</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
                        <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                            <ul className="module-list">
                                <li>No commitment required</li>
                                <li>Response within 24 hours</li>
                                <li>Custom threat assessment included</li>
                            </ul>
                        </div>
                        
                        <div className="terminal-card">
                            <div className="terminal-header">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <form id="requestAnalysisForm" onSubmit={handleFormSubmit}>
                                <div className="terminal-line">
                                    <span className="prompt">$ initiate --contact</span>
                                </div>
                                <div className="terminal-line">
                                    <span className="prompt">NAME:</span>
                                    <input type="text" id="reqName" className="terminal-input" placeholder="Enter name..." required />
                                </div>
                                <div className="terminal-line">
                                    <span className="prompt">EMAIL:</span>
                                    <input type="email" id="reqEmail" className="terminal-input" placeholder="Enter email..." required />
                                </div>
                                <div className="terminal-line">
                                    <span className="prompt">ORG:</span>
                                    <input type="text" id="reqOrg" className="terminal-input" placeholder="Organization name..." required />
                                </div>
                                <div className="terminal-line" style={{ display: 'block' }}>
                                    <span className="prompt">MESSAGE:</span>
                                    <textarea id="reqMessage" className="terminal-textarea" placeholder="Describe your requirements and security needs..." required></textarea>
                                </div>
                                <button type="submit" id="reqSubmitBtn" className="transmit-btn">TRANSMIT →</button>
                            </form>
                        </div>
                    </div>
                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <a href="/request-analysis" className="btn-sofecta">DETAILED ANALYSIS REQUEST →</a>
                    </div>
                </section>
            </main>

            <footer>
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
