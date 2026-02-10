import { Link } from 'react-router-dom';
import logoWhite from '../assets/logos/logo-white.png';
import { useLanguage } from '../context/LanguageContext';

const FooterLink = ({ href, children }) => (
    <a
        href={href}
        className="text-sm text-slate-500 hover:text-white transition-colors duration-300 block mb-3"
    >
        {children}
    </a>
);

export default function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="relative w-full border-t border-white/5 bg-[#030303] pt-20 pb-10 px-6 md:px-20 z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                {/* BRAND COLUMN */}
                <div className="md:col-span-1">
                    <Link to="/" className="inline-block mb-6">
                        <img src={logoWhite} alt="WEC" className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        {t('footer_brand_desc')}
                    </p>
                    <div className="flex gap-4">
                        {/* Social Placeholders */}
                        {['twitter', 'linkedin', 'instagram'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-300"
                                aria-label={social}
                            >
                                <span className="w-4 h-4 bg-current rounded-sm opacity-50" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* LINKS COLUMNS */}
                <div>
                    <h4 className="text-white font-bold mb-6">{t('footer_col_product')}</h4>
                    <FooterLink href="/ecosystem">{t('footer_link_ecosystem')}</FooterLink>
                    <FooterLink href="#">Marketplace</FooterLink>
                    <FooterLink href="#">Find Capital</FooterLink>
                    <FooterLink href="#">Pricing</FooterLink>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">{t('footer_col_company')}</h4>
                    <FooterLink href="/manifesto">{t('footer_link_manifesto')}</FooterLink>
                    <FooterLink href="#">{t('footer_link_about')}</FooterLink>
                    <FooterLink href="#">{t('footer_link_careers')}</FooterLink>
                    <FooterLink href="#">Blog</FooterLink>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6">{t('footer_col_legal')}</h4>
                    <FooterLink href="#">{t('footer_terms')}</FooterLink>
                    <FooterLink href="#">{t('footer_privacy')}</FooterLink>
                    <FooterLink href="#">{t('footer_link_cookies')}</FooterLink>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
                <p>&copy; {new Date().getFullYear()} World Entrepreneurs Centre. {t('footer_rights')}</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-slate-400 transition-colors">{t('footer_bottom_privacy')}</a>
                    <a href="#" className="hover:text-slate-400 transition-colors">{t('footer_bottom_terms')}</a>
                </div>
            </div>
        </footer>
    );
}
