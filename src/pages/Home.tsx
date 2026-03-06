import { Hero } from '../components/landing/hero/Hero';
import { Categories } from '../components/landing/categories/Categories';
import { HowItWorks } from '../components/landing/how-it-works/HowItWorks';
import { FeaturedProviders } from '../components/landing/featured-providers/FeaturedProviders';
import { Testimonials } from '../components/landing/testimonials/Testimonials';
import { FAQ } from '../components/landing/faq/FAQ';
import { FinalCTA } from '../components/landing/final-cta/FinalCTA';

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <Categories />
            <FeaturedProviders />
            <HowItWorks />
            <Testimonials />
            <FAQ />
            <FinalCTA />
        </div>
    );
}