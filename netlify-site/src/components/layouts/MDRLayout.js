import React, { useEffect, useState } from 'react';
import Header from '../sections/Header';

export default function MDRLayout(props) {
    const { page } = props;
    const [filter, setFilter] = useState('all');

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

    const integrations = [
        { name: 'Sublime Security', cats: ['Email Security', 'Security'], desc: 'Programmable, AI-powered cloud email security for M365 and Google Workspace. Blocks phishing, BEC, and malware via automated triage.', tag: 'EMAIL SECURITY' },
        { name: 'Swimlane', cats: ['SOAR', 'Automation'], desc: 'SOAR connector for Elastic, enabling low-code security orchestration and streamlined incident response workflows.', tag: 'AUTOMATION' },
        { name: 'Tines', cats: ['SOAR', 'Automation'], desc: 'Direct integration with the Tines SOAR platform for flexible, no-code automation of repetitive security tasks.', tag: 'AUTOMATION' },
        { name: 'Packet Capture', cats: ['Network', 'Endpoint Protection'], desc: 'Real-time packet sniffing and protocol dissection for deep observability into transaction fields and application layer traffic.', tag: 'NETWORK' },
        { name: 'Active Directory', cats: ['Identity Management'], desc: 'AD LDAP look-ups for User Entity analytics, enabling risk-scoring and User Behavior Analytics (UBA) scenarios.', tag: 'IDENTITY' },
        { name: 'LotL Detection', cats: ['Security'], desc: "ML-driven 'ProblemChild' model to detect Living off the Land (LotL) activity and suspicious native tool usage.", tag: 'ATTACK DETECTION' },
        { name: 'Movement Monitor', cats: ['Security'], desc: 'Detects lateral movement based on file transfer activity and Windows RDP events across the enterprise estate.', tag: 'LATERAL MOVEMENT' },
        { name: 'Kubernetes', cats: ['Containers'], desc: 'Unified log and metric collection for automating deployment, scaling, and management of containerized clusters.', tag: 'VIRTUALIZATION' },
        { name: 'Docker', cats: ['Containers'], desc: 'Native metric and log ingestion from Docker instances using the lightweight Elastic Agent.', tag: 'VIRTUALIZATION' },
        { name: 'Security Lake', cats: ['Security', 'Cloud Computing', 'Cloud Security'], desc: 'Analyze security data at scale for a complete understanding of your cloud security posture across the organization.', tag: 'AWS CLOUD' },
        { name: 'Amazon S3', cats: ['Security', 'Cloud Computing', 'Cloud Security'], desc: 'Monitoring of Amazon S3 buckets through access logs, storage metrics, and request lifecycle tracking.', tag: 'AWS CLOUD' },
        { name: 'Amazon EC2', cats: ['Cloud Computing'], desc: 'Log and metric collection for Elastic Compute Cloud (EC2) instances to ensure compute visibility.', tag: 'AWS CLOUD' },
        { name: 'AWS WAF', cats: ['Security', 'Firewall', 'Cloud Computing', 'Cloud Security'], desc: 'Monitoring of Web Application Firewall (WAF) logs to protect against common web exploits and vulnerabilities.', tag: 'AWS CLOUD' },
        { name: 'AWS Security Hub', cats: ['Security', 'Cloud Computing', 'Cloud Security'], desc: 'Systematic collection and parsing of security results from various AWS REST APIs.', tag: 'AWS CLOUD' },
        { name: 'CloudTrail', cats: ['Security', 'Cloud Computing', 'Cloud Security'], desc: 'Continuous monitoring of AWS account activity and API usage across your entire infrastructure.', tag: 'AWS CLOUD' },
        { name: 'GuardDuty', cats: ['Network', 'Security', 'Firewall', 'Cloud Computing', 'Cloud Security'], desc: 'Intelligent threat detection for cloud workloads using GuardDuty findings and REST API integration.', tag: 'AWS CLOUD' },
        { name: 'Defender for Endpoint', cats: ['Endpoint Protection'], desc: 'Unified pre- and post-breach suite coordinating response across endpoints, identities, and email.', tag: 'ENDPOINT' },
        { name: 'Atlassian Suite', cats: ['Collaboration and Productivity Tools'], desc: 'Log collection from Jira, Confluence, and other project management tools for software teams.', tag: 'COLLABORATION' },
        { name: 'GCP & Workspace', cats: ['Cloud Computing', 'Cloud Security'], desc: 'Native log ingestion from Google Workplace and Cloud Platform via Elastic Agent.', tag: 'GOOGLE' },
        { name: 'M365 & Azure', cats: ['Cloud Computing', 'Cloud Security'], desc: 'Comprehensive activity logging for Azure Cloud and Microsoft 365 environments.', tag: 'MICROSOFT' },
        { name: 'FortinetEDR', cats: ['Security', 'Endpoint Protection'], desc: 'Integration for Fortinet FortiEDR logs sent over syslog for unified security analysis.', tag: 'SYSLOG' },
        { name: 'CrowdStrike Logs', cats: ['Security', 'Endpoint Protection'], desc: 'Onboarding of CrowdStrike Falcon alerts and telemetry for incident response and UBA.', tag: 'EDR' },
        { name: 'Google Cloud Firewall', cats: ['Network', 'Security', 'Firewall'], desc: 'Dataset collection from firewall rules within your Virtual Private Cloud (VPC) networks.', tag: 'NETWORK' },
        { name: 'AWS Network Firewall', cats: ['Network', 'Security', 'Firewall', 'Cloud Computing', 'Cloud Security'], desc: 'Fetches logs and metrics for VPC network protection using AWS native firewall services.', tag: 'NETWORK' },
        { name: 'Azure Firewall', cats: ['Network', 'Security', 'Firewall'], desc: 'Visibility into network and application rule events for Azure cloud-native security appliances.', tag: 'NETWORK' },
        { name: 'Cisco Meraki', cats: ['Network', 'Security', 'Firewall'], desc: 'Cloud management logs for MX Appliances and Access Points via the Meraki API.', tag: 'NETWORK' },
        { name: 'Check Point', cats: ['Network', 'Security', 'Firewall'], desc: 'Continuous monitoring of Check Point Firewall logs from appliances running Management services.', tag: 'NETWORK' },
        { name: 'Sophos Logs', cats: ['Network', 'Security', 'Firewall'], desc: 'Collection and parsing of Sophos security appliance logs using the Elastic Agent.', tag: 'NETWORK' },
        { name: 'SonicWall', cats: ['Network', 'Security', 'Firewall'], desc: 'Unified log collection and analysis for SonicWall network security appliances.', tag: 'NETWORK' },
        { name: 'Fortinet FortiGate', cats: ['Network', 'Security', 'Firewall'], desc: 'Native FortiGate log ingestion for advanced traffic correlation and security monitoring.', tag: 'NETWORK' },
        { name: 'ThreatQuotient', cats: ['Threat Intelligence'], desc: 'Continuous ingestion of high-fidelity threat intelligence indicators from ThreatQuotient.', tag: 'INTEL' },
        { name: 'Recorded Future', cats: ['Threat Intelligence'], desc: 'Integration of threat risk lists and adversaries indicators for proactive blocking.', tag: 'INTEL' },
        { name: 'OpenCTI', cats: ['Threat Intelligence'], desc: 'Management and ingestion of massive threat intelligence datasets from OpenCTI.', tag: 'INTEL' },
        { name: 'MISP Feed', cats: ['Threat Intelligence'], desc: 'Open-source threat sharing platform integration for collaborative indicator correlation.', tag: 'INTEL' },
        { name: 'AbuseCH', cats: ['Threat Intelligence'], desc: 'Indicators from URL Haus, Malware Bazaar, and Threat Fox feeds for malware defense.', tag: 'INTEL' },
        { name: 'AlienVault OTX', cats: ['Threat Intelligence'], desc: 'Ingestion of public community-sourced Pulse indicators from the AlienVault exchange.', tag: 'INTEL' },
        { name: 'Anomali Feed', cats: ['Threat Intelligence'], desc: 'Continuous syncing of threat intelligence from the Anomali platform ecosystem.', tag: 'INTEL' },
        { name: 'CIF v3', cats: ['Threat Intelligence'], desc: 'Ingest threat indicators from a Collective Intelligence Framework instance for analysis.', tag: 'INTEL' },
        { name: 'Cybersixgill', cats: ['Threat Intelligence'], desc: 'Ingestion of dark web insights and indicators for advanced adversary monitoring.', tag: 'INTEL' },
        { name: 'EclecticIQ', cats: ['Threat Intelligence'], desc: 'Advanced threat intelligence management and indicator ingestion from the EclecticIQ hub.', tag: 'INTEL' },
        { name: 'Maltiverse', cats: ['Threat Intelligence'], desc: 'High-fidelity threat intelligence feed collection for unified indicator defense.', tag: 'INTEL' },
        { name: 'Abuse Monitoring', cats: ['Endpoint Protection', 'Threat Intelligence'], desc: 'Dedicated abuse tracking and monitoring for endpoint protection and threat modeling.', tag: 'MONITORING' },
        { name: 'Mandiant', cats: ['Threat Intelligence'], desc: 'Continuous collection of industry-leading threat intelligence from the Mandiant Advantage platform.', tag: 'INTEL' },
        { name: 'GreyNoise', cats: ['Threat Intelligence'], desc: 'Identify internet-wide scanners and common crawlers to de-noise security alerts.', tag: 'INTEL' },
        { name: 'VirusTotal', cats: ['Threat Intelligence'], desc: 'Multi-engine scan data for file, domain, and URL reputation enrichment at scale.', tag: 'INTEL' },
        { name: 'IBM X-Force', cats: ['Threat Intelligence'], desc: 'Actionable intelligence from IBM\'s global security research and adversary tracking.', tag: 'INTEL' },
        { name: 'ThreatConnect', cats: ['Threat Intelligence'], desc: 'Intelligence platform designed to centralize and operationalize massive datasets.', tag: 'INTEL' },
        { name: 'CrowdStrike Intel', cats: ['Threat Intelligence'], desc: 'Adversary-driven intelligence and indicators from the CrowdStrike Falcon platform.', tag: 'INTEL' }
    ];

    const filterTags = [
        'all', 'Email Security', 'Identity Management', 'Containers', 'SOAR', 'Automation', 
        'Threat Intelligence', 'Network', 'Security', 'Firewall', 'Endpoint Protection', 
        'Cloud Computing', 'Cloud Security', 'Collaboration and Productivity Tools', 'Endpoint Management'
    ];

    const filteredIntegrations = integrations.filter(item => filter === 'all' || item.cats.includes(filter));

    return (
        <div className="theme-cyber" data-sb-object-id={page.__metadata?.id}>
            <div className="bg-animations">
                <canvas id="networkCanvas"></canvas>
            </div>

            {props.site.header && <Header {...props.site.header} enableAnnotations={true} />}

            <main className="container">
                <section className="section-padding" style={{ paddingTop: '10rem' }}>
                    <span className="section-tag" data-sb-field-path="title">// SOLUTIONS / MDR</span>
                    <h1 className="camera-font" style={{ fontSize: '4rem', textAlign: 'left', textTransform: 'none', marginBottom: '2rem' }} data-sb-field-path="heroTitle">
                        Managed Detection <br />& <span className="text-accent">Response</span>
                    </h1>
                    <p className="text-muted" style={{ maxWidth: '800px', fontSize: '1.25rem', marginBottom: '5rem' }} data-sb-field-path="heroSubtitle">
                        {page.heroSubtitle}
                    </p>

                    <div className="card-grid">
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ CORE HUB ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>ThreatCTRL</h3>
                            <p className="text-muted">Our centralized command center that orchestrates detection and response across your entire digital estate, providing a single pane of glass for absolute visibility.</p>
                        </div>
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ REMEDIATION ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>Autonomous SOAR</h3>
                            <p className="text-muted">Automated playbooks that trigger near-instant remediation, isolating infected endpoints and blocking malicious traffic without manual intervention.</p>
                        </div>
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ AGENTIC AI ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>Proactive Hunting</h3>
                            <p className="text-muted">Our analysts leverage advanced AI agents to perform hypothesis-driven threat hunting, identifying dormant attackers and pre-exploit signals.</p>
                        </div>
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ COMMUNICATION ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>Email Security</h3>
                            <p className="text-muted">Advanced shield against malware, ransomware, BEC, and phishing. Automates user reporting and reduces attack surface through proactive pattern matching and domain blocking.</p>
                        </div>
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ RISK CONTROL ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>Vulnerability Management</h3>
                            <p className="text-muted">Continuous scanning and automated assessments of networks, systems, and applications. Provides exhaustive reporting for compliance and proactive risk mitigation.</p>
                        </div>
                        <div className="feature-card">
                            <span className="mono-text" style={{ color: '#27c93f', fontSize: '0.7rem', marginBottom: '1rem', display: 'block' }}>[ INVENTORY ]</span>
                            <h3 style={{ marginBottom: '1rem' }}>Asset Management</h3>
                            <p className="text-muted">Comprehensive real-time visibility into all hardware, software, and network devices. Maintains a dynamic inventory to identify unauthorized assets and security gaps.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '8rem' }}>
                        <span className="section-tag">// ENGAGEMENT MODELS</span>
                        <div className="card-grid">
                            <div className="module-card">
                                <h3>Holistic MDR</h3>
                                <p className="text-muted">A full-stack implementation where we deploy and manage our optimized XDR/SOAR engine as your primary security foundation.</p>
                            </div>
                            <div className="module-card">
                                <h3>Integrated Sync</h3>
                                <p className="text-muted">We synchronize our detection capabilities with your existing tools (Microsoft Defender, Elastic, etc.), enhancing them with our proprietary intelligence.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '8rem', textAlign: 'center', padding: '4rem', border: '1px solid hsl(var(--border-glass))', borderRadius: 'var(--radius)', background: 'hsl(var(--surface-glass))', backdropFilter: 'blur(12px)' }}>
                        <h2 className="camera-font" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Secure your perimeter today</h2>
                        <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '600px', marginInline: 'auto' }}>Ready to upgrade your detection capabilities? Request a baseline analysis of your environment.</p>
                        <a href="/request-analysis" className="btn-sofecta">START MDR ASSESSMENT →</a>
                    </div>

                    <div id="integrations" style={{ marginTop: '8rem' }}>
                        <span className="section-tag">// INTEGRATIONS</span>
                        <h2 className="camera-font" style={{ fontSize: '3rem', marginBottom: '1.5rem', textTransform: 'none' }}>Solution Stack</h2>
                        <p className="text-muted" style={{ maxWidth: '600px', marginBottom: '3rem' }}>Experience seamless connectivity to our solution stack. Filter by category to explore our native integrations.</p>

                        <div id="filterBar" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '4rem' }}>
                            {filterTags.map(tag => (
                                <button 
                                    key={tag}
                                    className={`cyber-badge filter-tag ${filter === tag ? 'active' : ''}`}
                                    onClick={() => setFilter(tag)}
                                >
                                    {tag.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        <div id="integrationGrid" className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                            {filteredIntegrations.map((item, idx) => (
                                <div key={idx} className="module-card integration-card">
                                    <div className="mono-text" style={{ color: '#27c93f', fontSize: '0.6rem', marginBottom: '1rem' }}>[{item.tag}]</div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{item.name}</h3>
                                    <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>{item.desc}</p>
                                </div>
                            ))}
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
