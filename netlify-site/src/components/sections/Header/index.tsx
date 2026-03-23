import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Link, Action } from '../../atoms';
import ImageBlock from '../../blocks/ImageBlock';
import ChevronDownIcon from '../../svgs/chevron-down';
import CloseIcon from '../../svgs/close';
import MenuIcon from '../../svgs/menu';

export default function Header(props) {
    const { colors = 'bg-light-fg-dark', styles = {}, enableAnnotations } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
            document.body.style.overflow = 'unset';
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            <header
                className={classNames(
                    'sb-component',
                    'sb-component-header',
                    colors,
                    'relative',
                    'shadow-header',
                    styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined,
                    styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'py-4',
                    'z-50'
                )}
                {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
            >
                <div className="container">
                    <Link href="#main" className="sr-only">
                        Skip to main content
                    </Link>
                    <HeaderVariants {...props} activePath={router.asPath} setIsMenuOpen={setIsMenuOpen} />
                </div>
            </header>
            <MobileMenuOverlay {...props} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </>
    );
}

function HeaderVariants(props) {
    const { variant = 'logo-left-primary-nav-left', activePath, setIsMenuOpen, ...rest } = props;
    switch (variant) {
        case 'logo-left-primary-nav-centered':
            return <HeaderLogoLeftPrimaryNavCentered {...rest} activePath={activePath} setIsMenuOpen={setIsMenuOpen} />;
        case 'logo-left-primary-nav-right':
            return <HeaderLogoLeftPrimaryRight {...rest} activePath={activePath} setIsMenuOpen={setIsMenuOpen} />;
        case 'logo-centered-primary-nav-left':
            return <HeaderLogoCenteredPrimaryLeft {...rest} activePath={activePath} setIsMenuOpen={setIsMenuOpen} />;
        case 'logo-centered-primary-nav-centered':
            return <HeaderLogoCenteredPrimaryCentered {...rest} activePath={activePath} setIsMenuOpen={setIsMenuOpen} />;
        default:
            return <HeaderLogoLeftPrimaryLeft {...rest} activePath={activePath} setIsMenuOpen={setIsMenuOpen} />;
    }
}

function HeaderLogoLeftPrimaryLeft(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations, setIsMenuOpen } = props;
    return (
        <div className="relative flex items-center">
            {(title || logo?.url) && (
                <div className="mr-10">
                    <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden mr-10 gap-x-10 lg:flex lg:items-center" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} activePath={props.activePath} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden ml-auto gap-x-2.5 lg:flex lg:items-center" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                    <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenuToggle setIsMenuOpen={setIsMenuOpen} />}
        </div>
    );
}

function HeaderLogoLeftPrimaryNavCentered(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations, setIsMenuOpen } = props;
    return (
        <div className="relative flex items-center justify-between">
            {(title || logo?.url) && (
                <div className="flex-shrink-0 mr-8">
                    <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <nav className="flex-grow hidden lg:flex lg:justify-center">
                    <ul
                        className="flex items-center gap-x-6 xl:gap-x-10"
                        {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}
                    >
                        <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} activePath={props.activePath} />
                    </ul>
                </nav>
            )}
            {secondaryLinks.length > 0 && (
                <div className="flex-shrink-0 ml-8">
                    <ul className="hidden lg:flex lg:items-center gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                        <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                    </ul>
                </div>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenuToggle setIsMenuOpen={setIsMenuOpen} />}
        </div>
    );
}

function HeaderLogoLeftPrimaryRight(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations, setIsMenuOpen } = props;
    return (
        <div className="relative flex items-center">
            {(title || logo?.url) && (
                <div className="mr-10">
                    <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden ml-auto lg:flex lg:items-center gap-x-10" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} activePath={props.activePath} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul
                    className={classNames('hidden', 'lg:flex', 'lg:items-center', 'gap-x-2.5', primaryLinks.length > 0 ? 'ml-10' : 'ml-auto')}
                    {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}
                >
                    <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenuToggle setIsMenuOpen={setIsMenuOpen} />}
        </div>
    );
}

function HeaderLogoCenteredPrimaryLeft(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations, setIsMenuOpen } = props;
    return (
        <div className="relative flex items-center">
            {(title || logo?.url) && (
                <div className="mr-10 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2">
                    <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden lg:flex lg:items-center gap-x-10" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} activePath={props.activePath} />
                </ul>
            )}
            {(secondaryLinks.length > 0) && (
                <ul className="hidden lg:flex lg:items-center ml-auto gap-x-2.5" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                    <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenuToggle setIsMenuOpen={setIsMenuOpen} />}
        </div>
    );
}

function HeaderLogoCenteredPrimaryCentered(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations, setIsMenuOpen } = props;
    return (
        <>
            <div className="relative flex items-center">
                {(title || logo?.url) && (
                    <div className="mr-10 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2">
                        <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                    </div>
                )}
                {secondaryLinks.length > 0 && (
                    <ul className="hidden lg:flex lg:items-center gap-x-2.5 ml-auto" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                        <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                    </ul>
                )}
                {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenuToggle setIsMenuOpen={setIsMenuOpen} />}
            </div>
            {primaryLinks.length > 0 && (
                <ul
                    className="hidden mt-4 lg:flex lg:items-center lg:justify-center gap-x-10"
                    {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}
                >
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} activePath={props.activePath} />
                </ul>
            )}
        </>
    );
}

function MobileMenuToggle({ setIsMenuOpen }) {
    return (
        <div className="ml-auto lg:hidden">
            <button
                aria-label="Open Menu"
                title="Open Menu"
                className="p-2 -mr-1 focus:outline-none"
                onClick={() => {
                    setIsMenuOpen(true);
                    document.body.style.overflow = 'hidden';
                }}
            >
                <span className="sr-only">Open Menu</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#f97316]"
                >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
            </button>
        </div>
    );
}

function MobileMenuOverlay(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], styles = {}, enableAnnotations, isMenuOpen, setIsMenuOpen } = props;
    const router = useRouter();

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <div className={classNames('!bg-[#0a0a0b] text-white', 'fixed', 'inset-0', styles?.self?.padding ?? 'p-4', 'overflow-y-auto', 'z-[10000]', isMenuOpen ? 'block' : 'hidden')}>
            <div className="flex flex-col min-h-full">
                <div className="flex items-center justify-between mb-10">
                    {(title || logo?.url) && <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />}
                    <button aria-label="Close Menu" title="Close Menu" className="p-2 -mr-1 focus:outline-none" onClick={closeMobileMenu}>
                        <CloseIcon className="w-6 h-6 fill-current" />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-start flex-grow pt-8 text-center">
                    {primaryLinks.length > 0 && (
                        <ul className="w-full mb-4" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                            <ListOfLinks links={primaryLinks} enableAnnotations={enableAnnotations} inMobileMenu activePath={router.asPath} />
                        </ul>
                    )}
                    {secondaryLinks.length > 0 && (
                        <ul className="w-full" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                            <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} inMobileMenu />
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

function SiteLogoLink({ title, logo, enableAnnotations }) {
    return (
        <Link href="/" className="flex items-center logo">
            {logo && <ImageBlock {...logo} {...(enableAnnotations && { 'data-sb-field-path': 'logo' })} />}
            {title && (
                <span className="h4" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>
                    {title}
                </span>
            )}
        </Link>
    );
}

function ListOfLinks(props) {
    const { links = [], colors, enableAnnotations, inMobileMenu = false, activePath } = props;

    return (
        <>
            {links.map((link, index) => {
                const modelName = link.__metadata?.modelName || link.type;
                if (modelName === 'Separator') {
                    return (
                        <li key={index} className="hidden lg:block py-2 opacity-20 select-none px-2" aria-hidden="true">
                            |
                        </li>
                    );
                }
                if (modelName === 'SubNav') {
                    return (
                        <LinkWithSubnav
                            key={index}
                            link={link}
                            inMobileMenu={inMobileMenu}
                            colors={colors}
                            {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                        />
                    );
                } else {
                    return (
                        <li
                            key={index}
                            className={classNames(inMobileMenu ? 'py-1.5' : 'py-2', {
                                'py-4': inMobileMenu && link.__metadata?.modelName === 'Button'
                            })}
                        >
                            <Action
                                {...link}
                                className={classNames('whitespace-nowrap transition-colors duration-200', inMobileMenu ? 'w-full text-lg' : 'text-sm', {
                                    'justify-center py-3': inMobileMenu && modelName === 'Link',
                                    'text-white/60 hover:text-white': inMobileMenu && modelName === 'Link',
                                    'text-white/90 hover:text-[#f97316]': !inMobileMenu && modelName === 'Link',
                                    'btn-sofecta header-cta': modelName === 'Button'
                                })}
                                {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                            />
                        </li>
                    );
                }
            })}
        </>
    );
}

function LinkWithSubnav(props) {
    const { link, colors, inMobileMenu = false } = props;
    const [isSubNavOpen, setIsSubNavOpen] = useState(false);
    const router = useRouter();
    const fieldPath = props['data-sb-field-path'];

    useEffect(() => {
        const handleRouteChange = () => {
            setIsSubNavOpen(false);
            document.body.style.overflow = 'unset';
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <li
            className={classNames('relative', inMobileMenu ? 'py-1.5' : 'py-2 group')}
            onMouseLeave={
                !process.env.stackbitPreview && !inMobileMenu
                    ? () => {
                          setIsSubNavOpen(false);
                      }
                    : undefined
            }
            data-sb-field-path={fieldPath}
        >
            <button
                aria-expanded={isSubNavOpen ? 'true' : 'false'}
                onMouseOver={
                    !process.env.stackbitPreview && !inMobileMenu
                        ? () => {
                              setIsSubNavOpen(true);
                          }
                        : undefined
                }
                onClick={() => setIsSubNavOpen((prev) => !prev)}
                className={classNames(
                    'sb-component',
                    'sb-component-block',
                    'sb-component-link',
                    'inline-flex',
                    'items-center',
                    inMobileMenu ? 'w-full' : 'text-sm transition-colors duration-200',
                    'text-white/90 hover:text-[#f97316]'
                )}
            >
                <span {...(fieldPath && { 'data-sb-field-path': '.label' })}>{link.label}</span>
                <ChevronDownIcon
                    className={classNames('fill-current', 'shrink-0', 'h-4', 'w-4 transition-transform duration-200', isSubNavOpen && 'rotate-180', inMobileMenu ? 'ml-auto' : 'ml-1')}
                />
            </button>
            {(link.links ?? []).length > 0 && (
                <ul
                    className={classNames(
                        colors,
                        'transition-all duration-200',
                        inMobileMenu ? 'p-4 space-y-3' : 'absolute top-full left-0 w-44 border-t-2 border-[#f97316] shadow-xl z-50 px-6 pt-5 pb-6 space-y-4 bg-[#0a0a0a]',
                        isSubNavOpen ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'
                    )}
                    {...(fieldPath && { 'data-sb-field-path': '.links' })}
                >
                    <ListOfSubNavLinks links={link.links} hasAnnotations={!!fieldPath} inMobileMenu={inMobileMenu} />
                </ul>
            )}
        </li>
    );
}

function ListOfSubNavLinks({ links = [], hasAnnotations, inMobileMenu = false }) {
    return (
        <>
            {links.map((link, index) => (
                <li key={index}>
                    <Action
                        {...link}
                        className={classNames(inMobileMenu ? 'w-full justify-center text-sm text-white/40 hover:text-white' : 'text-sm')}
                        {...(hasAnnotations && { 'data-sb-field-path': `.${index}` })}
                    />
                </li>
            ))}
        </>
    );
}
