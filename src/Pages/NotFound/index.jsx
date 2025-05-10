// Pages/NotFound/index.jsx
import { Link } from 'react-router-dom'
import animationData from '../../assets/Erro404.json'
import Layout from '../../Components/Layout'
import LottieAnimation from '../../Components/LottieAnimation'

function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="max-w-md w-full">
          <LottieAnimation animationData={animationData} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">¡Ups! Página no encontrada</h2>
        <p className="text-gray-600 mb-6 text-center">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link 
          to="/"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </Layout>
  )
}

export default NotFound