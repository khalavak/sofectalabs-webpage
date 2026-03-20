import * as React from 'react';
import dayjs from 'dayjs';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import { getComponent } from '../../components-registry';

export default function PostLayout(props) {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { enableAnnotations = true } = site;
    const { title, date, author, category, featuredImage, markdown_content, bottomSections = [] } = page;
    const formattedDate = dayjs(date).format('MMM DD, YYYY').toUpperCase();

    React.useEffect(() => {
        // Load canvas script for background
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
        <BaseLayout page={page} site={{ ...site, footer: null }}>
            <div className="theme-cyber" data-sb-object-id={page.__metadata?.id}>
                <div className="bg-animations">
                    <canvas id="networkCanvas"></canvas>
                </div>


                <main className="container">
                    <article className="post-header" style={{ textAlign: 'left', padding: '10rem 0 4rem' }}>
                        <div className="status-hero-wrapper">
                            <div className="mono-text operational-status" style={{ fontSize: '0.65rem', color: '#27c93f', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ width: '6px', height: '6px', background: '#27c93f', borderRadius: '50%', display: 'inline-block' }}></span>
                                <a href="https://status.sofectalabs.io" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>SYSTEMS OPERATIONAL</a>
                            </div>
                        </div>
                        <div className="blog-meta" style={{ marginBottom: '2rem' }}>
                            <span className="blog-category" data-sb-field-path="category">{category || 'SECURITY'}</span>
                            <span className="mx-2" style={{ opacity: 0.3 }}>|</span>
                            {author && (
                                <>
                                    <span className="blog-author" style={{ color: 'hsl(var(--muted-foreground))', opacity: 0.8 }} data-sb-field-path="author">
                                        BY {author.name?.toUpperCase() || 'SOFECTA LABS'}
                                    </span>
                                    <span className="mx-2" style={{ opacity: 0.3 }}>|</span>
                                </>
                            )}
                            <span data-sb-field-path="date">{formattedDate}</span>
                        </div>
                        <h1 className="camera-font" style={{ fontSize: '3.5rem', textAlign: 'left', textTransform: 'none', lineHeight: 1.1 }} data-sb-field-path="title">
                            {title}
                        </h1>
                        {page.excerpt && (
                            <p className="text-muted" style={{ marginTop: '1.5rem', fontSize: '1.25rem', maxWidth: '700px' }} data-sb-field-path="excerpt">
                                {page.excerpt}
                            </p>
                        )}
                    </article>

                    <section className="post-content">
                        {featuredImage && (
                            <img 
                                src={featuredImage.url} 
                                alt={featuredImage.altText || title} 
                                className="post-hero-img" 
                                data-sb-field-path="featuredImage"
                            />
                        )}
                        
                        {markdown_content && (
                            <div 
                                className="sb-markdown"
                                dangerouslySetInnerHTML={{ __html: markdown_content }}
                                {...(enableAnnotations && { 'data-sb-field-path': 'markdown_content' })}
                            />
                        )}
                    </section>

                    <section style={{ marginTop: '8rem', paddingTop: '4rem', borderTop: '1px solid hsl(var(--border-glass))' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 className="camera-font" style={{ textTransform: 'none' }}>Related Insights</h3>
                            <a href="/blog" className="mono-text" style={{ color: 'hsl(var(--primary))', textDecoration: 'none', fontSize: '0.8rem' }}>BACK TO BLOG →</a>
                        </div>
                    </section>

                    {bottomSections.length > 0 && (
                        <div {...(enableAnnotations && { 'data-sb-field-path': 'bottomSections' })}>
                            {bottomSections.map((section, index) => {
                                const Component = getComponent(section.__metadata.modelName);
                                if (!Component) {
                                    throw new Error(`no component matching the page section's model name: ${section.__metadata.modelName}`);
                                }
                                return (
                                    <Component
                                        key={index}
                                        {...section}
                                        enableAnnotations={enableAnnotations}
                                        {...(enableAnnotations && { 'data-sb-field-path': `bottomSections.${index}` })}
                                    />
                                );
                            })}
                        </div>
                    )}
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
        </BaseLayout>
    );
}
