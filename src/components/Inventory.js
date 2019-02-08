import React, { Component } from 'react';
import Login from './Login'
import PropTypes from 'prop-types'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import base, {firebaseApp}  from "../base";
import firebase from "firebase";

class Inventory extends Component {

  state = {
    uid: null, 
    owner: null
  }
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSamples: PropTypes.func,
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({user})
      }
    })
  }
  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, {context: this})
    console.log(store)
    if (!store.owner) { 
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
    console.log(authData)
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }

  logOut = async() => {
    console.log('log out')
    await firebase.auth().signOut()
    this.setState({
      uid: null
    })
  }

  render() {
    const logOut = <button onClick={this.logOut}>Log Out!</button>
    //check if they're logged in
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    //check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner</p>
          {logOut}
        </div>
      )
    }
    // they must the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logOut}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm 
              key={key} 
              index={key} 
              fish={this.props.fishes[key]} 
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
          />))}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Fish Samples</button>
      </div>
    )
  }
}

export default Inventory