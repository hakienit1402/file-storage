import React from 'react';
import './App.css';
import MainPage from './pages/Main/MainPage';
import {
	BrowserRouter as Router, Route, Switch
  } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Auth0/Login';
import Register from './pages/Auth0/Register';

const App = () => {
		return (
		  <div>
			 <Router>
			 <div>
				{/* <Header/> */}
			   <Switch>
			   <Route path="/" exact={true}>
				 <HomePage />
			   </Route>
			   <Route path="/login" >
				 <Login />
			   </Route>
			   <Route path="/main" >
				 <MainPage />
			   </Route>
			   <Route path="/register" >
				 <Register />
			   </Route>
			   </Switch>
			 </div>
		   </Router>
			
		  </div>
		);
	  }
	  export default App;