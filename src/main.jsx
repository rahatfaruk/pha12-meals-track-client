import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css';
// pages & comps
import App from './App'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthProvider from './context/AuthProvider'
import ThemeProvider from './context/ThemeProvider'
import MealDetails from './pages/MealDetails';
import Meals from './pages/Meals';
import UpcomingMeals from './pages/UpcomingMeals';
import Checkout from './pages/Checkout';
import PrivateRoute from './comps/PrivateRoute';
import DashboardUser from './dashboardUser';
import MyProfile from './dashboardUser/MyProfile';
import RequestedMeals from './dashboardUser/RequestedMeals';

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} errorElement={<ErrorPage/>} >
      <Route index element={ <Home/> } />
      <Route path='login' element={ <Login/> } />
      <Route path='register' element={ <Register/> } />
      <Route path='meal/:id' element={ <MealDetails/> } />
      <Route path='meals' element={ <Meals/> } />
      <Route path='upcoming-meals' element={ <UpcomingMeals/> } />
      <Route path='checkout/:badge' element={ <PrivateRoute> <Checkout/> </PrivateRoute> } />
      {/* user dashboard */}
      <Route path='dashboard-user' element={ <PrivateRoute> <DashboardUser/> </PrivateRoute> } >
        <Route path='my-profile' element={ <MyProfile /> } />
        <Route path='requested-meals' element={ <RequestedMeals /> } />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </AuthProvider>
)
