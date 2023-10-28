import React, {Component} from 'react';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Header from './Header';
import Login from './Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import './../styles/App.css';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<Navigate replace to='/new/1'/>}/>
          <Route path='/create' element={<CreateLink/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/top' element={<LinkList/>}/>
          <Route path='/new/:page' element={<LinkList/>}/>
        </Routes>
      </div>
    );
  };
};

export default App;
