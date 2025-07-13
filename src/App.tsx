import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Homepage } from '@/pages/homepage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Homepage />
      </main>
      <Footer />
    </div>
  )
}

export default App
