import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

  myInput = React.createRef()
   
  handleSubmit = (e) => {
    // stop the form from submitting
    e.preventDefault()
    // get the text form from that input
    const storeName = this.myInput.current.value
    
    //change the page to store/:storeId 
    this.props.history.push(`/store/${storeName}`)
    
  }

  render() {
    return (
      <React.Fragment>
      <form className="store-selector" onSubmit={this.handleSubmit}>
        <h2>Please Enter A Store</h2>
        <input 
          type="text" 
          required placeholder='Store Name' 
          ref={this.myInput}
          defaultValue={getFunName()}
        />
        <button type='submit'>Visit Store</button>
      </form>
      </React.Fragment>
    )
  }
}

export default StorePicker