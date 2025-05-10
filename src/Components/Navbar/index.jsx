import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowRightOnRectangleIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/solid'
import { useContext, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/carrito.ico'
import { ShoppingCartContext } from '../../Context'
import ShoppingCart from '../ShoppingCart'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation() // Added useLocation hook

  const hiddenRoutes = ['/sign-in', '/not-found', '/*'] // Define routes to hide Navbar
  if (hiddenRoutes.includes(location.pathname)) {
    return null // Hide Navbar on specified routes
  }

  const activeStyle = 'text-indigo-600 font-medium'
  const inactiveStyle = 'text-gray-700 hover:text-indigo-500 transition-colors'

  // Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut
  
  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  // Don't render navbar if user is not authenticated
  if (isUserSignOut || !hasUserAnAccount) {
    return null
  }

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(true)
    setMobileMenuOpen(false)
  }

  const renderDesktopView = () => {
    return (
      <>
        <li className="flex items-center gap-1">
          <UserIcon className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600">{parsedAccount?.email}</span>
        </li>
        <li>
          <NavLink
            to='/my-orders'
            className={({ isActive }) => 
              `flex items-center gap-1 ${isActive ? activeStyle : inactiveStyle}`
            }>
            <ShoppingBagIcon className="h-5 w-5" />
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/my-account'
            className={({ isActive }) => 
              `flex items-center gap-1 ${isActive ? activeStyle : inactiveStyle}`
            }>
            <UserIcon className="h-5 w-5" />
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/sign-in'
            className={`flex items-center gap-1 ${inactiveStyle}`}
            onClick={() => handleSignOut()}>
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Sign out
          </NavLink>
        </li>
      </>
    )
  }

  const renderMobileView = () => {
    return (
      <>
        <li className="flex items-center gap-3 py-3 border-b border-gray-200">
          <UserIcon className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600">{parsedAccount?.email}</span>
        </li>
        <li className="py-3 border-b border-gray-200">
          <NavLink
            to='/my-orders'
            className={({ isActive }) => 
              `flex items-center gap-3 ${isActive ? activeStyle : inactiveStyle}`
            }
            onClick={() => setMobileMenuOpen(false)}>
            <ShoppingBagIcon className="h-5 w-5" />
            My Orders
          </NavLink>
        </li>
        <li className="py-3 border-b border-gray-200">
          <NavLink
            to='/my-account'
            className={({ isActive }) => 
              `flex items-center gap-3 ${isActive ? activeStyle : inactiveStyle}`
            }
            onClick={() => setMobileMenuOpen(false)}>
            <UserIcon className="h-5 w-5" />
            My Account
          </NavLink>
        </li>
        <li className="py-3">
          <NavLink
            to='/sign-in'
            className={`flex items-center gap-3 ${inactiveStyle}`}
            onClick={() => {
              handleSignOut()
              setMobileMenuOpen(false)
            }}>
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Sign out
          </NavLink>
        </li>
      </>
    )
  }

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="flex-shrink-0 flex items-center"
            >
              <img
                className="h-8 w-auto"
                src={logo}
                alt="Shopi Logo"
              />
              <span className="ml-2 text-xl font-bold text-indigo-600 hidden sm:block">Shopi</span>
            </NavLink>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink
                to='/'
                onClick={() => context.setSearchByCategory()}
                className={({ isActive }) => 
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`
                }>
                All
              </NavLink>
              <NavLink
                to='/clothes'
                onClick={() => context.setSearchByCategory('clothes')}
                className={({ isActive }) => 
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`
                }>
                Clothes
              </NavLink>
              <NavLink
                to='/electronics'
                onClick={() => context.setSearchByCategory('electronics')}
                className={({ isActive }) => 
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`
                }>
                Electronics
              </NavLink>
              <NavLink
                to='/furnitures'
                onClick={() => context.setSearchByCategory('furnitures')}
                className={({ isActive }) => 
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive 
                      ? 'border-indigo-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`
                }>
                Furnitures
              </NavLink>
            </div>
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center">
            <ul className="flex items-center space-x-4">
              {renderDesktopView()}
              <li className="ml-4">
                <ShoppingCart />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <div className="flex justify-between items-center px-4 pt-2 pb-3 border-b border-gray-200">
            <NavLink 
              to="/" 
              className="flex-shrink-0 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                className="h-8 w-auto"
                src={logo}
                alt="Shopi Logo"
              />
              <span className="ml-2 text-xl font-bold text-indigo-600">Shopi</span>
            </NavLink>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to='/'
              onClick={() => {
                context.setSearchByCategory()
                setMobileMenuOpen(false)
              }}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-500'
                }`
              }>
              All
            </NavLink>
            <NavLink
              to='/clothes'
              onClick={() => {
                context.setSearchByCategory('clothes')
                setMobileMenuOpen(false)
              }}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-500'
                }`
              }>
              Clothes
            </NavLink>
            <NavLink
              to='/electronics'
              onClick={() => {
                context.setSearchByCategory('electronics')
                setMobileMenuOpen(false)
              }}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-500'
                }`
              }>
              Electronics
            </NavLink>
            <NavLink
              to='/furnitures'
              onClick={() => {
                context.setSearchByCategory('furnitures')
                setMobileMenuOpen(false)
              }}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-500'
                }`
              }>
              Furnitures
            </NavLink>
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200 px-4">
            <ul className="space-y-2">
              {renderMobileView()}
              <li className="pt-3">
                <ShoppingCart mobileView={() => setMobileMenuOpen(false)} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar