import React, { Component } from 'react'
import Axios from 'axios'
import API from '../../API/define-api'
import { Link } from "react-router-dom";
import './item.styles.scss';

export default class Item extends Component {
  constructor() {
    super()

    this.state = {
      Items: [],
      Search: ""
    }
  }

  componentDidMount = () => {
    Axios.get(API.listitem).then(res => {
      if (res.data) {
        this.setState({
          Items: res.data
        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    // const { Items } = this.state;
    const Items = [
      {
        name: 'Iphone 11',
        price: 1000,
        number: 10,
        category: 'Phone',
        brand: 'Apple'
      }
    ]

    if (Items.length == 0) {
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
          <Link className="col-sm-4" to={`/iteminfo/${item.id}`}>Detail</Link>          
          <Link className="col-sm-4" to={`/edit_item/${item._id}`}>Edit</Link> 
          <Link className="col-sm-4" to={`/delete_item/${item._id}`}>Delete</Link>
        </td>
      </tr>
    ))

    return (
      <div className="container main">
        <h3>List Item</h3>
        <div className="row">
          <div className="col-sm-2">
            <Link to="/add_item" className="btn btn-primary">Add Item</Link>
          </div>
          <div className="col-sm-10">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  value={this.state.search} 
                  onChange={this.handleChange} 
                  placeholder="Search"
                  id="search"
                />

                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
