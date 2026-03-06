import { Hero } from '../components/landing/hero/Hero';
import { Categories } from '../components/landing/categories/Categories';
import { Problems } from '../components/landing/problems/Problems';
import { Solution } from '../components/landing/solution/Solution';
import { FeaturedProviders } from '../components/landing/featured-providers/FeaturedProviders';

export default function Home() {
    return (
        <div className="flex flex-col pb-16">
            <Hero />
            <Categories />
            <FeaturedProviders />
            <Problems />
            <Solution />
        </div>
    );
}