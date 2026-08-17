import useReveal from './useReveal'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Product from './components/Product'
import Alpine from './components/Alpine'
import Proof from './components/Proof'
import Evidence from './components/Evidence'
import Engage from './components/Engage'
import Cta from './components/Cta'
import Footer from './components/Footer'

export default function App() {
  useReveal()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Product />
        <Alpine />
        <Proof />
        <Evidence />
        <Engage />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
