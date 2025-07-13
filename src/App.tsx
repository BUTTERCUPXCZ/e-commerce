import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Homepage } from '@/pages/homepage'
import { ProductCatalog } from '@/pages/products'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/products':
        return <ProductCatalog />
      default:
        return <Homepage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header navigate={navigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App
