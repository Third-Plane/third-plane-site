import { useEffect, useState } from 'react'
import useReveal from './useReveal'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Capacity from './components/Capacity'
import Shift from './components/Shift'
import DeskOverview from './components/DeskOverview'
import Deployment from './components/Deployment'
import Company from './components/Company'
import Cta from './components/Cta'
import PlacementDesk from './components/PlacementDesk'
import Footer from './components/Footer'

// Two pages, one bundle: the homepage and the Placement Desk page. Served
// normally, routing is plain pathnames and navigation is a full page load.
// When the bundle runs as a single hosted page (window.__ARTIFACT__, injected
// by the artifact build), routes move into the hash (#/placement-desk) and
// clicks are intercepted, because there is no server to load a second page.
const ARTIFACT = typeof window !== 'undefined' && Boolean(window.__ARTIFACT__)

const getRoute = () => {
  if (ARTIFACT) {
    const match = window.location.hash.match(/^#\/(placement-desk)/)
    return match ? `/${match[1]}` : '/'
  }
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

function Page({ route }) {
  if (route === '/placement-desk') return <PlacementDesk />
  return (
    <>
      <Hero />
      <Capacity />
      <Shift />
      <DeskOverview />
      <Deployment />
      <Company />
      <Cta />
    </>
  )
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  useReveal(route)

  useEffect(() => {
    if (!ARTIFACT) return
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)

    const onClick = (e) => {
      const link = e.target.closest('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (!href.startsWith('/')) return
      e.preventDefault()
      if (href.startsWith('/#')) {
        const id = href.slice(2)
        window.location.hash = '#/'
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
        return
      }
      window.location.hash = href === '/' ? '#/' : `#${href}`
      window.scrollTo(0, 0)
    }
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Page route={route} />
      </main>
      <Footer />
    </>
  )
}
