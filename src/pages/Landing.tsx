import Header from '../landing/Header'
import Hero from '../landing/Hero'
import LogoCloud from '../landing/LogoCloud'
import HowItWorks from '../landing/HowItWorks'
import Capabilities from '../landing/Capabilities'
import Stats from '../landing/Stats'
import Faq from '../landing/Faq'
import FinalCta from '../landing/FinalCta'
import Footer from '../landing/Footer'

export default function Landing() {
  return (
    <div className="max-w-full overflow-x-hidden">
      <Header />
      <main id="top">
        <Hero />
        <LogoCloud />
        <HowItWorks />
        <Capabilities />
        <Stats />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
