import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

const ShoppingCart = ({ mobileView }) => {
  const context = useContext(ShoppingCartContext)

  const openCheckoutSideMenu = () => {
    context.openCheckout()
    context.closeProductDetail()
    if (mobileView) mobileView()
  }

  return (
    <button 
      onClick={() => openCheckoutSideMenu()}
      className="group -m-2 p-2 flex items-center hover:bg-gray-50 rounded-full transition-colors"
    >
      <ShoppingBagIcon
        className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-indigo-600 transition-colors"
        aria-hidden="true"
      />
      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
        {context.cartProducts.length}
      </span>
      <span className="sr-only">items in cart, view bag</span>
    </button>
  )
}

export default ShoppingCart