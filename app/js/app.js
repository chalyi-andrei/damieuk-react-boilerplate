import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return (
            <main className="row">
                <h1 className="text-center">Hello world</h1>
            </main>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));