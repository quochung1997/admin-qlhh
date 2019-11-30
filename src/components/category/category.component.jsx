import React, { Component } from 'react'
import './category.styles.scss'
import Axios from 'axios'
import API from '../../API/define-api'
import { Link } from "react-router-dom";

export default class Category extends Component {
  constructor() {
    super()

    this.state = {
      Categories: [
        {
          name: "Shirt",
          code: "SH",
          group: 1,
          id: "231"
        }
      ],
      isLoaded: false,
      search: "",
      CategoryName: "",
      CategoryCode: "",
      CategoryGroup: "1",
      isAdding: false
    }
  }

  componentDidMount = () => {
    Axios.get(API.category).then(res => {
      if (res.data) {
        this.setState({
          Categories: res.data
        })
      }

      this.setState({
        isLoaded: true
      })
    })
  }

  showAddItem = () => {
    this.setState({
      isAdding: !this.state.isAdding
    })
  }

  addCategory = (e) => {
    e.preventDefault();

    const {CategoryGroup, CategoryName, CategoryCode} = this.state;

    const data = {
      CategoryCode,
      CategoryGroup,
      CategoryName
    }

    console.log(data)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  cancelAdding = (e) => {
    this.setState({
      isAdding: false
    })
  }

  render() {

    const { Categories, isAdding } = this.state;

    const displayListCategories = this.state.isLoaded ? (<p>Loading...</p>) :
      Categories.map(category => (
        <tr key={category.id}>
          <td>{category.code}</td>
          <td>{category.group}</td>
          <td>{category.name}</td>
          <td>
            <span className="fix-size"><i className="far fa-edit btn-edit"></i></span>
            <span className="fix-size"><i className="fas fa-trash-alt btn-delete"></i></span>
          </td>
        </tr>
      ))

    return (
      <div className="container main">
        <h4>CATEGORY MANAGE</h4>
        <div className="row">
          <form className="input-group mb-3 col-sm-11" onSubmit={this.search}>
            <input type="text" className="form-control" name="search" placeholder="Search" onChange={this.handleChange} />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">Go</button>
            </div>
          </form>
          <div className="input-group mb-3 col-sm-1">
            <button className="btn btn-primary add" onClick={this.showAddItem}>+</button>
          </div>
        </div>

        {
          isAdding ? (
            <form onSubmit={this.addCategory}>
              <h5>Add category</h5>
              <div className="row">

              </div>
              <div className="form-group">
                <label htmlFor="type">Category Code:</label>
                <input type="text" className="form-control" id="type" name="CategoryCode" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="name">Category Name:</label>
                <input type="text" className="form-control" id="name" name="CategoryName" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="type">Category Type:</label>
                <select className="form-control" id="group" name="CategoryGroup" onChange={this.handleChange} >
                  <option label="Shirt">1</option>
                  <option label="Pants">2</option>
                  <option label="Dress">3</option>
                  <option label="Coat">4</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-add">Add</button>
              <button className="btn btn-danger btn-cancel" onClick={this.cancelAdding}>Cancel</button>
            </form>
          ) : null
        }

        <br />
        <h5>List Categories</h5>
        <table className="table table-category">
          <thead>
            <tr>
              <th>Category Code</th>
              <th>Category Name</th>
              <th>Category Group</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayListCategories}
          </tbody>
        </table>
      </div>
    )
  }
}
