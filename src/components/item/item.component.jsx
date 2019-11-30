import React, { Component } from 'react'
import Axios from 'axios'
import API from '../../API/define-api'
import './item.styles.scss';

export default class Item extends Component {
  constructor() {
    super()

    this.state = {
      Items: [],
      search: "",
      isLoaded: false,
      isAdding: false,
      ItemName: "",
      ItemCategory: "",
      ItemPrice: 0,
      ItemNumber: 0,
      ItemBrand: ""
    }
  }

  componentDidMount = () => {
    Axios.get(API.listitem).then(res => {
      if (res.data) {
        this.setState({
          Items: res.data
        })
      }
    });
    this.setState({
      isLoaded: true
    })
  }

  showAdding = () => {
    this.setState({isAdding: true})
  }

  render() {
    const {Items, isLoaded, isAdding} = this.state

    if (!isLoaded) {
      return <p>Loading...</p>
    }

    const displayItems = Items.map(item => (
      <tr key={item.id}>
        <td>{Item.name}</td>
        <td>{Item.price}</td>
        <td>{Item.number}</td>
        <td>{Item.category}</td>
        <td>{Item.brand}</td>
        <td>
          <span className="fix-size"><i className="far fa-edit btn-edit"></i></span>
          <span className="fix-size"><i className="fas fa-trash-alt btn-delete"></i></span>
        </td>
      </tr>
    ))

    return (
      <div className="container main">
        <h4>ITEM MANAGEMENT</h4>
        
        <div className="row">
          <form className="input-group mb-3 col-sm-11" onSubmit={this.search}>
            <input type="text" className="form-control" name="search" placeholder="Search" onChange={this.handleChange} />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">Go</button>
            </div>
          </form>
          <div className="input-group mb-3 col-sm-1">
            <button className="btn btn-primary add" onClick={this.showAdding}>+</button>
          </div>
        </div>

        {
          isAdding ? (
            <form onSubmit={this.addItem}>
              <h5>Add item</h5>
              <div className="form-group">
                <label htmlFor="ItemName">Item Name:</label>
                <input type="text" className="form-control" id="ItemName" name="ItemName" onChange={this.handleChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="ItemPrice">Item Price:</label>
                <input type="text" className="form-control" id="ItemPrice" name="ItemPrice" onChange={this.handleChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="ItemNumber">Item Number:</label>
                <input type="text" className="form-control" id="ItemNumber" name="ItemNumber" onChange={this.handleChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="ItemCategory">Item Category:</label>
                <select className="form-control" id="ItemCategory" name="ItemCategory" onChange={this.handleChange} >
                  <option label="Discount Percent">1</option>
                  <option label="Discount Cash">2</option>
                </select>
              </div>
            </form>
          ) : null
        }

      </div>
    )
  }
}
