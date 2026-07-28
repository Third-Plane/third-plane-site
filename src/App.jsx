import useReveal from './useReveal'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
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
        <Ticker />
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
