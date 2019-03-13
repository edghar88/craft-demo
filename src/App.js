import React, { Component } from 'react';
import FieldBuilder from './components/fieldBuilder'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './assets/styles/App.css';

library.add(faPlus, faTrashAlt);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Welcome to the Field Builder Tool!
        </header>
        <FieldBuilder />
      </div>
    );
  }
}

export default App;
