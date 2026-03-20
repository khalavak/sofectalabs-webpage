import * as React from 'react';
import dayjs from 'dayjs';
import { getBaseLayoutComponent } from '../../../utils/base-layout';
import { getPageUrl } from '../../../utils/page-utils';

export default function PostFeedLayout(props) {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { title, items = [] } = page;
    const [viewMode, setViewMode] = React.useState('grid');

    React.useEffect(() => {
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
        <BaseLayout page={page} site={site}>
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
                                <li><a href="/blog" className="text-accent">BLOG</a></li>
                            </ul>
                            <a href="/#initiate" className="btn-sofecta header-cta">GET STARTED</a>
                            <button className="mobile-toggle" id="mobileToggle" aria-label="Menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </button>
                        </nav>
                    </div>
                </header>

                <main className="container">
                    <section className="blog-hero" style={{ textAlign: 'left', padding: '10rem 0 4rem' }}>
                        <div className="status-hero-wrapper">
                            <div className="mono-text operational-status" style={{ fontSize: '0.65rem', color: '#27c93f', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '6px', height: '6px', background: '#27c93f', borderRadius: '50%', display: 'inline-block' }}></span>
                                <a href="https://status.sofectalabs.io" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>SYSTEMS OPERATIONAL</a>
                            </div>
                        </div>
                        <span className="section-tag">// BLOG</span>
                        <h1 className="camera-font" style={{ fontSize: '4rem', textAlign: 'left', textTransform: 'none' }} data-sb-field-path="title">
                            Insights & <span className="text-accent" style={{ color: 'hsl(var(--accent-orange))' }}>Signals</span>
                        </h1>
                        <p className="text-muted" style={{ marginTop: '1rem', textAlign: 'left', maxWidth: '800px' }}>
                            From the frontlines of Managed Detection and Response: Relevant insights and actionable research on log analysis, threat intelligence, threat hunting, email security, and the evolving threat landscape. Real-world expertise, decoded.
                        </p>
                    </section>

                    <div className="blog-controls">
                        <div className="view-toggle">
                            <button 
                                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} 
                                onClick={() => setViewMode('grid')}
                            >
                                GRID
                            </button>
                            <button 
                                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} 
                                onClick={() => setViewMode('list')}
                            >
                                LIST
                            </button>
                        </div>
                        <div className="text-muted" style={{ fontFamily: '"Geist Mono", monospace', fontSize: '0.7rem' }}>
                            {items.length} POSTS PUBLISHED
                        </div>
                    </div>

                    <section className={`blog-grid ${viewMode === 'list' ? 'list-view' : ''}`} id="blogContainer">
                        {items.map((post, index) => (
                            <article 
                                key={index} 
                                className="blog-card" 
                                onClick={() => window.location.href = getPageUrl(post)}
                                style={{ cursor: 'pointer' }}
                                data-sb-object-id={post.__metadata?.id}
                            >
                                {post.featuredImage?.url && (
                                    <img src={post.featuredImage.url} alt={post.featuredImage.altText || post.title} data-sb-field-path="featuredImage" />
                                )}
                                <div className="blog-card-content">
                                    <div className="blog-meta">
                                        <span className="blog-category" data-sb-field-path="category">{post.category || 'SECURITY'}</span>
                                        <span data-sb-field-path="date">{dayjs(post.date).format('MMM DD, YYYY').toUpperCase()}</span>
                                    </div>
                                    <h3 data-sb-field-path="title">{post.title}</h3>
                                    {post.excerpt && <p className="text-muted" style={{ fontSize: '0.875rem' }} data-sb-field-path="excerpt">{post.excerpt}</p>}
                                </div>
                            </article>
                        ))}
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
        </BaseLayout>
    );
}
