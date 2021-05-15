import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
const SignIn = lazy(() => import('./pages/Auth0/SignIn'));
const SignUp = lazy(() => import('./pages/Auth0/SignUp'));
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MainPage = lazy(() => import('./pages/Main/MainPage'));

const App = () => {
	const data = useSelector((state) => state.auth);
	const { loading, error, users } = data;

	function PrivateRoute({ children, ...rest }) {
		// let auth = useAuth();
		return (
			<Route
				{...rest}
				render={({ location }) =>
					users ? (
						children
					) : (
						<Redirect
							to={{
								pathname: "/signin",
								state: { from: location }
							}}
						/>
					)
				}
			/>
		);
	}

	return (
		<div>

			<Router>
				<div>
					<Suspense fallback={<div>Loading...</div>}>
						{/* <Redirect
				to={{
					pathname: "/main",
					state: { from: location }
				}}
			/> */}
						{/* <Header/> */}
						<Switch>
							<Route path="/" exact={true}>
								<SignIn />
							</Route>
							<Route path="/signin" >
								<SignIn />
							</Route>
							<PrivateRoute path="/main">
								<MainPage />
							</PrivateRoute>

							{/* <Route path="/main" exact={true}>
								<MainPage />
							</Route> */}
							<Route path="/signup" >
								<SignUp />
							</Route>
							<Route path="*">
								<SignIn />
							</Route>
						</Switch>
					</Suspense>
				</div>

			</Router>
		</div>
	);
};
export default App;
