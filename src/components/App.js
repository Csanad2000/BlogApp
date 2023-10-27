import React, {Component} from 'react';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Header from './Header';
import Login from './Login';
import {Route, Routes} from 'react-router-dom';
import './../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<LinkList/>}/>
          <Route path='/create' element={<CreateLink/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    );
  };
};

export default App;
