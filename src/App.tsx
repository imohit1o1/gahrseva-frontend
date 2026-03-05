import { Layout } from './layout/Layout';
import { Hero } from './components/hero/Hero';
import { Categories } from './components/categories/Categories';
import { Problems } from './components/problems/Problems';
import { Solution } from './components/solution/Solution';

export default function App() {
  return (
    <Layout>
      <Hero />
      <Categories />
      <Problems />
      <Solution />
    </Layout>
  );
}
