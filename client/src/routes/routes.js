import Homepage from '../component/pages/Homepage';
import CartPage from '../component/pages/Cartpage'
import Productpage from '../component/pages/Productpage';
import SigninPage from '../component/pages/SigninPage';
import RegisterPage from '../component/pages/RegisterPage'
import Shippinpage from '../component/pages/Shippinpage';
import PaymentPage from '../component/pages/Paymentpage';
import Placeorderpage from '../component/pages/Placeorderpage';
import ProductsPage from '../component/pages/ProductsPage'


const userRoutes = [
    {path: '/cart/:id?', component: CartPage},
    {path: '/product/:id', component: Productpage},
    {path: '/shipping', component: Shippinpage},
    {path: '/payment', component: PaymentPage},
    {path: '/placeorder', component: Placeorderpage},
    {path: '/products', component: ProductsPage},
    {path: '/', exact: true, component: Homepage}
]

const authRoutes = [
    {path: '/register', component: RegisterPage},
    {path: '/signin', component: SigninPage},
]

export {userRoutes, authRoutes}