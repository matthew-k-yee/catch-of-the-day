import React from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'

class App extends React.Component {
  state = {
    fishes: {}, 
    order: {}
  };

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
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish}
                   loadSamples={this.loadSamples}
        />
      </div>
    )
  }
}

export default App