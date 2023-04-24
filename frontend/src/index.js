import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Components/Home/Home';
import Concert from './Components/Concert/Concert';
import Ticket from './Components/Ticket/Ticket';
import Account from './Components/Account/Account';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/concert' element={<Concert />}></Route>
				<Route path='/ticket' element={<Ticket />}></Route>
				<Route path='/account' element={<Account />}></Route>
			</Routes>
		</BrowserRouter>
  	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
