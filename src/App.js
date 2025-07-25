import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import ModelNumber from './components/dashboard/ModelNumber';

import Register from './components/auth/Register';
import Payment from './components/auth/Payment';
import Login from './components/auth/Login';
import Userdashboard from './components/user/Userdashboard';
import Adpanel from './components/user/Admin-panel';
import UserTable from './components/user/Usertable';
import Status from './components/user/Status';
import Report from './components/user/Report';
import FAQ from './components/layout/FAQ';
import Terms from './components/layout/Terms';
import Privacy from './components/layout/Privacy';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/model_number' element={<ModelNumber />} />
          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/privacy' element={<Privacy />} />

          <Route path='/userdashboard' element={<PrivateRoute><Userdashboard /></PrivateRoute>} />
          <Route path='/admin/panel' element={<PrivateRoute><Adpanel /></PrivateRoute>} />
          <Route path='/admin/table' element={<PrivateRoute><UserTable /></PrivateRoute>} />
          <Route path='/user/status' element={<PrivateRoute><Status /></PrivateRoute>} />
          <Route path='/admin/report' element={<PrivateRoute><Report /></PrivateRoute>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
