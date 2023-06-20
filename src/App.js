import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';

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
        <header style={{ backgroundColor: '#F36824', color: '#FFFFFF', padding: '20px', marginBottom: '20px', fontFamily: 'jazzy-font' }}>
          Data Generated from Django
        </header>
        <hr></hr>
        {error ? (
          <div style={{ backgroundColor: '#343A40', color: '#FFFFFF', padding: '10px', marginBottom: '20px' }}>
            {error}
          </div> // Display the error message
        ) : (
          <table className="table custom-table">
            <thead>
              <tr>
                <th style={{ color: '#F36824' }}>Employee</th>
                <th style={{ color: '#F36824' }}>Department</th>
              </tr>
            </thead>
            <tbody>
              {details.map((output, id) => (
                <tr key={id} className={id % 2 === 0 ? 'custom-row-even' : 'custom-row-odd'}>
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
