import axios from 'axios';
import React from 'react';

class App extends React.Component {

  state = {
    details: [],
    error: null // Add error state to store the error message
  };

  componentDidMount(){

    let data;
    axios.get('http://localhost:8000')
      .then(res => {
        data = res.data;
        this.setState({
          details: data,
          error: null // Clear the error state if the request is successful
        });
      })

      .catch(err => {
        console.error('Error fetching data:', err);
        this.setState({
          details: [],
          error: 'Error fetching data. Please make sure the Django server is running.' // Set the error message
        });
      })      
  }

  render() {

    // Destructure details from state 
    const { details, error } = this.state;

    // Log employee details to the console
    details.forEach((output) => {
      console.log(output.employee);
    });

    return (
      <div>
        <header> Data Generated from Django </header>
        <hr></hr>
        {error ? (
          <div>{error}</div> // Display the error message
        ) : (
          details.map((output, id) => (
            <div key={id}>
              <div>
                <h2>{output.employee}</h2>
                <h3>{output.department}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}


export default App;
