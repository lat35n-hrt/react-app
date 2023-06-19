import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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
      <div className="container">
        <header className="mt-3 mb-4"> 
          <h1>Data Generated from Django</h1> 
        </header>
        <hr></hr>
        {error ? (
          <div>{error}</div> // Display the error message
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {details.map((output, id) => (
                <tr key={id}>
                  <td>{output.employee}</td>
                  <td>{output.department}</td>
                </tr>
              ))}
            </tbody>
          </table>

        )}
      </div>
    );
  }
}


export default App;
