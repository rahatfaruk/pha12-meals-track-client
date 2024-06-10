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
import MyReviews from './dashboardUser/MyReviews';
import PaymentHistory from './dashboardUser/PaymentHistory';
import DashboardAdmin from './dashboardAdmin';
import AdminRoute from './comps/AdminRoute';
import AdminProfile from './dashboardAdmin/AdminProfile';
import ManageUsers from './dashboardAdmin/ManageUsers';
import AllMeals from './dashboardAdmin/AllMeals';
import AddMeal from './dashboardAdmin/AddMeal';
import AllReviews from './dashboardAdmin/AllReviews';
import ServeMeals from './dashboardAdmin/ServeMeals';

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
        <Route path='my-reviews' element={ <MyReviews /> } />
        <Route path='payment-history' element={ <PaymentHistory /> } />
      </Route>
      {/* admin dashboard */}
      <Route path='dashboard-admin' element={ <AdminRoute> <DashboardAdmin/> </AdminRoute> } >
        <Route path='admin-profile' element={ <AdminProfile /> } />
        <Route path='manage-users' element={ <ManageUsers /> } />
        <Route path='all-meals' element={ <AllMeals /> } />
        <Route path='add-meal' element={ <AddMeal /> } />
        <Route path='all-reviews' element={ <AllReviews /> } />
        <Route path='serve-meals' element={ <ServeMeals /> } />
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
