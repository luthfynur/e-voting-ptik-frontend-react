import React from 'react';
import Dashboard from './components/Dashboard';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Logout from './pages/Logout';
import LogoutAdmin from './pages/LogoutAdmin';
import AdminDashboard from './pages/AdminDashboard';
import Utama from './pages/Utama'
import VoteProfil from './pages/VoterProfil'
import HasilVoting from './pages/HasilVoting'
import { Provider } from 'react-redux'
import store from './app/store'
import { listen } from './app/listener'
import GuestOnlyRoute from './components/GuestOnlyRoute'
import GuardRoute from './components/GuardRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  React.useEffect(() => {
    listen();
  },[])

  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/login">
            <GuestOnlyRoute>
              <Login />
            </GuestOnlyRoute>
          </Route>
          <Route path="/profil">
            <GuardRoute>
              <VoteProfil />
            </GuardRoute>
          </Route>
          <Route path="/hasil">
              <HasilVoting />
          </Route>
          <Route path="/admin/login">
            <GuestOnlyRoute>
              <LoginAdmin />
            </GuestOnlyRoute>
          </Route>
          <Route path="/logout">
              <Logout />
          </Route>
          <Route path="/admin/logout">
            <AdminRoute>
              <LogoutAdmin />
            </AdminRoute>
          </Route>
          <Route path="/admin/home">
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </Route>
          <Route path="/admin/voters">
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </Route>
          <Route path="/admin/kandidat">
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </Route>
          <Route path="/admin/vote">
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </Route>
          <Route path="/">
            <Utama />
          </Route>  
        </Switch> 
  </HashRouter>
  </Provider>
  );
}

export default App;
