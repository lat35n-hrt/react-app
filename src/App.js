import axios from 'axios';
import React from 'react';

class App extends React.Component {

  state = {details: [],}

  componentDidMount(){

    let data;
    axios.get('http://localhost:8000')
      .then(res => {
        data = res.data;
        this.setState({
          details: data
        });
      })

      .catch(err => {
        console.error('Error fetching data:', err);
      })
    
  }

  render() {

    // Destructure details from state 
    const { details } = this.state;

    // Log employee details to the console
    details.forEach((output) => {
      console.log(output.employee);
    });

    return (
      <div>
        <header> Data Generated from Django </header>
        <hr></hr>
        {this.state.details.map((output, id) => (
          <div key={id}>
            <div>
              <h2>{output.employee}</h2>
              <h3>{output.department}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }
}


export default App;
