import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Room from './pages/Room';
import { AuthProvider } from './context/AuthService';
import LoggedInRoute from "./component/LoggedInRoute";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <LoggedInRoute exact path='/' component={Room} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;