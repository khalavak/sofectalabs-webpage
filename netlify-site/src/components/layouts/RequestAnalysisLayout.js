import React, { useEffect } from 'react';
import Header from '../sections/Header';

export default function RequestAnalysisLayout(props) {
    const { page } = props;

    useEffect(() => {
        // Load canvas script
        const script = document.createElement('script');
        script.src = '/canvas.js';
        script.async = true;
        document.body.appendChild(script);


        // Form handling
        const form = document.getElementById('detailedAnalysisForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('reqSubmitBtn');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'ANALYZING ENVIRONMENT...';
                btn.disabled = true;

                const cloudValues = Array.from(document.querySelectorAll('input[name="cloud"]:checked')).map(cb => cb.value);

                const payload = {
                    source: 'detailed-page-v2',
                    timestamp: new Date().toISOString(),
                    identity: {
                        name: document.getElementById('reqName').value,
                        email: document.getElementById('reqEmail').value,
                        organization: document.getElementById('reqOrg').value,
                        industry: document.getElementById('reqIndustry').value,
                        website: document.getElementById('reqUrl').value
                    },
                    landscape: {
                        os: {
                            windows: document.getElementById('osWin').value,
                            linux: document.getElementById('osLin').value,
                            macos: document.getElementById('osMac').value
                        },
                        cloud_services: cloudValues,
                        scale: {
                            endpoints: document.getElementById('reqEndpoints').value,
                            servers: document.getElementById('reqServers').value
                        }
                    },
                    infrastructure: {
                        firewalls: document.getElementById('reqFirewalls').value,
                        identity: document.getElementById('reqIdentity').value,
                        network: document.getElementById('reqNetwork').value,
                        security_stack: document.getElementById('reqStack').value
                    },
                    message: document.getElementById('reqMessage').value,
                    mdr_drivers: document.getElementById('reqDrivers').value
                };

                try {
                    await fetch('https://sofectalabs.tines.com/webhook/website-analysis-request/3e1e3e80ad25d65088da47cebb749e7e', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'text/plain' },
                        body: JSON.stringify(payload)
                    });
                    btn.innerHTML = 'ANALYSIS REQUESTED SUCCESSFULLY';
                    btn.style.color = '#27c93f';
                    btn.style.borderColor = '#27c93f';
                    form.reset();
                } catch (error) {
                    btn.innerHTML = 'TRANSMISSION FAILED';
                    btn.style.color = '#ff5f56';
                } finally {
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.color = '';
                        btn.style.borderColor = '';
                        btn.disabled = false;
                    }, 4000);
                }
            });
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

            {props.site.header && <Header {...props.site.header} enableAnnotations={true} />}

            <main className="container">
                <section className="section-padding" style={{ paddingTop: '10rem' }}>
                    <div className="status-hero-wrapper">
                        <div className="mono-text operational-status" style={{ fontSize: '0.65rem', color: '#27c93f', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: '6px', height: '6px', background: '#27c93f', borderRadius: '50%', display: 'inline-block' }}></span>
                            <a href="https://status.sofectalabs.io" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>SYSTEMS OPERATIONAL</a>
                        </div>
                    </div>
                    <span className="section-tag">// DETAILED ANALYSIS</span>
                    <h1 className="camera-font" style={{ fontSize: '4rem', textAlign: 'left', textTransform: 'none', marginBottom: '2rem' }} data-sb-field-path="heroTitle">
                        Request <span className="text-accent">Analysis</span>
                    </h1>
                    <p className="text-muted" style={{ maxWidth: '800px', marginBottom: '4rem' }} data-sb-field-path="heroSubtitle">
                        {page.heroSubtitle}
                    </p>

                    <div className="terminal-card" style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '6rem' }}>
                        <div className="terminal-header">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                        </div>
                        <form id="detailedAnalysisForm">
                            <div className="terminal-line">
                                <span className="prompt">$ initiate --identity --priority=high</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
                                <div className="terminal-line">
                                    <span className="prompt">NAME:</span>
                                    <input type="text" id="reqName" className="terminal-input" placeholder="Expert Name" required />
                                </div>
                                <div className="terminal-line">
                                    <span className="prompt">EMAIL:</span>
                                    <input type="email" id="reqEmail" className="terminal-input" placeholder="contact@org.com" required />
                                </div>
                                <div className="terminal-line">
                                    <span className="prompt">ORG:</span>
                                    <input type="text" id="reqOrg" className="terminal-input" placeholder="Organization" required />
                                </div>
                                <div className="terminal-line">
                                    <span className="prompt">URL:</span>
                                    <input type="url" id="reqUrl" className="terminal-input" placeholder="https://..." required />
                                </div>
                            </div>
                            <div className="terminal-line">
                                <span className="prompt">INDUSTRY:</span>
                                <input type="text" id="reqIndustry" className="terminal-input" placeholder="e.g. FinTech, SaaS, Healthcare" required />
                            </div>

                            <div className="terminal-line" style={{ marginTop: '2rem', borderTop: '1px dashed rgba(39, 201, 63, 0.2)', paddingTop: '1rem' }}>
                                <span className="prompt">$ scan --infrastructure --detect-os</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                <div className="terminal-line">
                                    <span className="prompt">WIN%:</span>
                                    <input type="number" id="osWin" className="terminal-input" placeholder="0" min="0" max="100" />
                                </div>
                                <div className="terminal-line">
                                    <span className="prompt">LIN%:</span>
                                    <input type="number" id="osLin" className="terminal-input" placeholder="0" min="0" max="100" />
                                </div>
                                <div className="terminal-line">
                                    <span className="prompt">MAC%:</span>
                                    <input type="number" id="osMac" className="terminal-input" placeholder="0" min="0" max="100" />
                                </div>
                            </div>

                            <div className="terminal-line" style={{ marginTop: '1.5rem' }}>
                                <span className="prompt">$ fetch --cloud-services --saas</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0.5rem 1rem' }}>
                                {['M365', 'Workspace', 'Azure', 'AWS', 'GCP', 'OnPremAD'].map((val) => (
                                    <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#27c93f', fontFamily: '"Geist Mono", monospace', fontSize: '0.8rem', cursor: 'pointer' }}>
                                        <input type="checkbox" name="cloud" value={val} style={{ accentColor: '#27c93f' }} /> {val === 'M365' ? 'Microsoft 365' : val === 'Workspace' ? 'Google Workspace' : val === 'Azure' ? 'Microsoft Azure' : val === 'OnPremAD' ? 'On-Prem AD' : val}
                                    </label>
                                ))}
                            </div>

                            <div className="terminal-line" style={{ marginTop: '2rem', borderTop: '1px dashed rgba(39, 201, 63, 0.2)', paddingTop: '1rem' }}>
                                <span className="prompt">$ audit --network-stack --security-tools</span>
                            </div>
                            <div className="terminal-line">
                                <span className="prompt">FIREWALLS:</span>
                                <input type="text" id="reqFirewalls" className="terminal-input" placeholder="e.g. Fortinet, Palo Alto, WAF details..." />
                            </div>
                            <div className="terminal-line">
                                <span className="prompt">IDENTITY:</span>
                                <input type="text" id="reqIdentity" className="terminal-input" placeholder="e.g. Okta, Entra ID, Ping..." />
                            </div>
                            <div className="terminal-line">
                                <span className="prompt">EQUIPMENT:</span>
                                <input type="text" id="reqNetwork" className="terminal-input" placeholder="Network equipment / Switch vendors..." />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="terminal-line">
                                    <span className="prompt">ENDPOINTS:</span>
                                    <input type="number" id="reqEndpoints" className="terminal-input" placeholder="Estimated count" />
                                </div>
                                <div className="terminal-line">
                                    <span className="prompt">SERVERS:</span>
                                    <input type="number" id="reqServers" className="terminal-input" placeholder="Estimated count" />
                                </div>
                            </div>

                            <div className="terminal-line" style={{ display: 'block', marginTop: '1rem' }}>
                                <span className="prompt">SECURITY_STACK (EDR/SIEM/MDR):</span>
                                <textarea id="reqStack" className="terminal-textarea" placeholder="List your current security tools and versions..." style={{ height: '80px' }}></textarea>
                            </div>

                            <div className="terminal-line" style={{ display: 'block', marginTop: '1rem' }}>
                                <span className="prompt">ADDITIONAL CONTEXT:</span>
                                <textarea id="reqMessage" className="terminal-textarea" placeholder="Describe specific threats or compliance goals..." required></textarea>
                            </div>

                            <div className="terminal-line" style={{ display: 'block', marginTop: '1rem' }}>
                                <span className="prompt">MDR DRIVERS / SECURITY INITIATIVES:</span>
                                <textarea id="reqDrivers" className="terminal-textarea" placeholder="Describe the primary security concerns or strategic initiatives driving your MDR evaluation..." style={{ height: '80px' }}></textarea>
                            </div>
                            
                            <button type="submit" id="reqSubmitBtn" className="transmit-btn">TRANSMIT COMPREHENSIVE ANALYSIS →</button>
                        </form>
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
