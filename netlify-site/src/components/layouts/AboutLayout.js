import React, { useEffect } from 'react';

export default function AboutLayout(props) {
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

    const team = [
        { name: 'Kim Halavakoski', role: 'MDR Operations & Consulting', bio: '25+ years of experience across finance, maritime, telecommunications, and manufacturing sectors. Expert in scaling security operations and strategic consulting.', img: '/assets/team-kim.png' },
        { name: 'Samipetri Maijanen', role: 'SaaS Environments & IT', bio: 'Creator of the XDR SaaS and a premier Elasticsearch expert. With 25+ years in tech, he engineers the core infrastructure of our detection engine.', img: '/assets/team-samppa.png' },
        { name: 'Jakob Lundberg', role: 'Solutions & Development', bio: 'Specialist in system, network, and software development. Jakob focuses on the integration and automation of advanced security tools.', img: '/assets/team-jakob.png' },
        { name: 'Marko Nenonen', role: 'Chief Executive Officer', bio: 'Solution and business professional focusing on sales, partnerships, and management. Marko brings 25+ years of IT leadership to the team.', img: '/assets/team-marko.png' }
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
                    <span className="section-tag" data-sb-field-path="title">// MISSION</span>
                    <h1 className="camera-font" style={{ fontSize: '4rem', textAlign: 'left', textTransform: 'none', marginBottom: '2rem' }} data-sb-field-path="heroTitle">
                        Built by <span className="text-accent">Professionals</span>
                    </h1>
                    <p className="text-muted" style={{ maxWidth: '800px', fontSize: '1.25rem', marginBottom: '5rem' }} data-sb-field-path="heroSubtitle">
                        {page.heroSubtitle}
                    </p>

                    <span className="section-tag">// LEADERSHIP</span>
                    <div className="team-grid">
                        {team.map((member, idx) => (
                            <div key={idx} className="team-card">
                                <img src={member.img} alt={member.name} className="team-img" />
                                <h3>{member.name}</h3>
                                <span className="team-role">{member.role}</span>
                                <p className="team-bio">{member.bio}</p>
                            </div>
                        ))}
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
