import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const Login = lazy(() => import('./pages/Auth0/Login'));
const Register = lazy(() => import('./pages/Auth0/Register'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MainPage = lazy(() => import('./pages/Main/MainPage'));

const App = () => {
	
	// function PrivateRoute({ children, ...rest }) {
	// 	let user = true;
	// 	// let auth = useAuth();
	// 	return (
	// 	  <Route
	// 		{...rest}
	// 		render={({ location }) =>
	// 		  user ? (
	// 			children
	// 		  ) : (
	// 			<Redirect
	// 			  to={{
	// 				pathname: "/login",
	// 				state: { from: location }
	// 			  }}
	// 			/>
	// 		  )
	// 		}
	// 	  />
	// 	);
	//   }
	return (
		<div>
			<Router>
				<div>
					<Suspense fallback={<div>Loading...</div>}>
						{/* <Header/> */}
						<Switch>
							<Route path="/" exact={true}>
								<HomePage />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							{/* <PrivateRoute path="/main">
								<MainPage />
							</PrivateRoute> */}
							<Route path="/main">
								<MainPage />
							</Route>
							<Route path="/register">
								<Register />
							</Route>
						</Switch>
					</Suspense>
				</div>
			</Router>
		</div>
	);
};
export default App;
