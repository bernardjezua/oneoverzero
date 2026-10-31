import Services from '../components/services/Services.jsx'
import EGov from '../components/egov/EGov.jsx'
import CtaBand from '../components/cta/CtaBand.jsx'

export default function ServicesPage() {
  return (
    <>
      <Services page />
      <EGov>
        <CtaBand />
      </EGov>
    </>
  )
}
