import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {}, 
    order: {}
  };

  componentDidMount() {
    //reinstate local storage
    const localStorageRef = localStorage.getItem(this.props.match.params.storeId)
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
    const {params} = this.props.match 
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this, 
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = (fish) => {
    // take a copy of the existing state 
    const fishes = {...this.state.fishes }
    //add new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes: fishes 
    })
    console.log(fishes)
  }

  updateFish = (key, updateFish) => {
    const fishes = {...this.state.fishes}
    fishes[key] = updateFish
    this.setState({
      fishes: fishes
    })
  }

  deleteFish = (key) => {
    const fishes = {...this.state.fishes} 
    fishes[key] = null;
    this.setState({
      fishes: fishes
    })
  }

  removeFromOrder = key => {
    const order = {...this.state.order}
    delete order[key]
    this.setState({
      order: order
    })
  }
  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = (key) => {
    // take a copy of state
    const order = {...this.state.order}
    // either add to order or update number in order 
    order[key] = order[key] + 1 || 1
    // call setState to update state object
    this.setState({
      order: order
    })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish}
                   loadSamples={this.loadSamples}
                   fishes={this.state.fishes}
                   updateFish={this.updateFish}
                   deleteFish={this.deleteFish}
        />
      </div>
    )
  }
}

export default App