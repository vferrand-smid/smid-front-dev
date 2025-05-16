import { getCanonicalLocale } from '@/utils/getCanonicalLocale';
import { getTranslations } from '@/utils/getTranslations';
import Bloc1 from '../components/Bloc1';
import Bloc11 from '../components/Bloc11';
import Bloc2 from '../components/Bloc2';
import Bloc3_carousel from '../components/Bloc3_carousel';
import Bloc4Temoignages from '../components/Bloc4_temoignages';
import Bloc5Services from '../components/Bloc5_services';
import Bloc6Documents from '../components/Bloc6_documents';
import Bloc7Solution from '../components/Bloc7_solution';
import Bloc8Tuto from '../components/Bloc8_tuto';
import Bloc9Accordeon from '../components/Bloc9_accordeon';

export default async function HomePage({ params }) {
    const canonical = await getCanonicalLocale(params.locale || 'fr-FR'); // ✅ ligne à ajouter
    const translations = await getTranslations(canonical);
    const isArabic = canonical.startsWith('ar');

    console.log('🌍 Locale finale envoyée à getTranslations:', canonical);

    return (
        <div className=''>
            <div className='pageDaccueil'>
                <section className='bloc1'>
                    <Bloc1 translations={translations.Bloc1} isArabic={isArabic} />
                </section>
                <section className='bloc2'>
                    <Bloc2 translations={translations.Bloc2} isArabic={isArabic} />
                </section>
                <section className='bloc3'>
                    <Bloc3_carousel translations={translations.Bloc3} isArabic={isArabic} />
                </section>
                <section className='bloc4'>
                    <Bloc4Temoignages translations={translations.Bloc4} isArabic={isArabic} />
                </section>
                <section className='bloc5'>
                    <Bloc5Services translations={translations.Bloc5} isArabic={isArabic} />
                </section>
                <section className='bloc6'>
                    <Bloc6Documents translations={translations.Bloc6} isArabic={isArabic} />
                </section>
                <section className='bloc7'>
                    <Bloc7Solution translations={translations.Bloc7} isArabic={isArabic} />
                </section>
                <section className='bloc8'>
                    <Bloc8Tuto translations={translations.Bloc8} isArabic={isArabic} />
                </section>
                <section className='bloc9'>
                    <Bloc9Accordeon translations={translations.Bloc9} isArabic={isArabic} />
                </section>
                <section className='bloc11'>
                    <Bloc11 translations={translations.Bloc11} isArabic={isArabic} />
                </section>
            </div>
        </div>
    );
}
