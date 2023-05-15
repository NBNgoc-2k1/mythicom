import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import AuthDialog from './global_components/AuthDialog/AuthDialog'
import CategoryPage from './pages/category/screens/CategoryPage'
import DetailPage from './pages/detail/screens/DetailPage'
import ErrorPage from './pages/error/screens/ErrorPage'
import Homepage from './pages/home/screens/Homepage'
import Provider from './provider'
import './tailwind.css'
import './index.css'
import CartPage from './pages/cart/screens/CartPage'
import CheckoutPage from './pages/checkout/screens/CheckoutPage'
import Account from './pages/account/screens/Account'
import OrderDetail from './pages/order_detail/screens/OrderDetail'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Homepage />,
				errorElement: <ErrorPage />
			},
			{
				path: '/cart',
				element: <CartPage />,
				errorElement: <ErrorPage />
			},
			{
				path: '/checkout',
				element: <CheckoutPage />,
				errorElement: <ErrorPage />
			},
			{
				path: '/account/:param',
				element: <Account />,
				errorElement: <ErrorPage />
			},
			{
				path: '/order/:id',
				element: <OrderDetail />,
				errorElement: <ErrorPage />
			},
			{
				path: '/product/:id',
				element: <DetailPage />,
				errorElement: <ErrorPage />
			},
			{
				path: '/:param1/:param2',
				element: <CategoryPage />,
				errorElement: <ErrorPage />
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider>
			<RouterProvider router={router} />
			<AuthDialog />
		</Provider>
	</React.StrictMode>,
)
