import React, { Component } from 'react'
import DateTimePicker from "react-datetime-picker";

export default class Discount extends Component {
  constructor() {
    super()

    this.state = {
      Discounts: [{
        SaleCodeString: "aksd",
        SaleCodeType: 1,
        SaleCodeValue: 30,
        SaleCodeDescription: "sale",
        FromDate: "10PM 22/12/2019",
        ToDate: "10PM 23/12/2019"
      }],
      isLoaded: false,
      isAdding: false,
      search: "",
      SaleCodeString: "",
      SaleCodeType: 1,
      SaleCodeValue: 0,
      SaleCodeDescription: "",
      FromDate: "",
      ToDate: ""
    }
  }

  componentDidMount = () => {
    this.setState({ isLoaded: true });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeFromDate = (e) => {
    console.log(e);
  }

  showAdding = () => {
    this.setState({ isAdding: true })
  }

  cancelAdding = () => {
    this.setState({ isAdding: false })
  }

  addDiscount = (e) => {
    e.preventDefault();
  }

  search = (e) => {
    e.preventDefault();
  }

  render() {
    const { isAdding, Discounts, isLoaded } = this.state;

    const displayList = Discounts.map(discount =>  (
        <tr key={discount.SaleCodeString}>
          <td>{discount.SaleCodeString}</td>
          <td>{discount.SaleCodeType}</td>
          <td>{discount.SaleCodeValue}</td>
          <td>{discount.SaleCodeDescription}</td>
          <td>{discount.FromDate}</td>
          <td>{discount.ToDate}</td>
          <td>
            <span className="fix-size"><i className="far fa-edit btn-edit"></i></span>
            <span className="fix-size"><i className="fas fa-trash-alt btn-delete"></i></span>
          </td>
        </tr>
      ))

    return (
      <div className="container main">
        <h4>DISCOUNT MANAGE</h4>
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
            <form onSubmit={this.addDiscount}>
              <h5>Add discount</h5>
              <div className="form-group">
                <label htmlFor="SaleCodeString">Sale Code String:</label>
                <input type="text" className="form-control" id="SaleCodeString" name="SaleCodeString" onChange={this.handleChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="SaleCodeType">Sale Code Type:</label>
                <select className="form-control" id="SaleCodeType" name="SaleCodeType" onChange={this.handleChange} >
                  <option label="Discount Percent">1</option>
                  <option label="Discount Cash">2</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="SaleCodeValue">Sale Code Value:</label>
                <input type="text" className="form-control" id="SaleCodeValue" name="SaleCodeValue" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="SaleCodeDescription">Sale Code Description:</label>
                <input type="text" className="form-control" id="SaleCodeDescription" name="SaleCodeDescription" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="FromDate">From Date:</label>
                <DateTimePicker
                  onChange={this.handleChangeFromDate}
                  className="form-control"
                  id="FromDate"
                  name="FromDate"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ToDate">To Date:</label>
                <DateTimePicker
                  onChange={this.handleChangeFromDate}
                  className="form-control"
                  id="ToDate"
                  name="ToDate"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-add">Add</button>
              <button className="btn btn-danger btn-cancel" onClick={this.cancelAdding}>Cancel</button>
            </form>
          ) : null
        }

        <br />
        <h5>List Discounts</h5>
        <table className="table table-category">
          <thead>
            <tr>
              <th>Sale Code String</th>
              <th>Sale Code Type</th>
              <th>Sale Code Value</th>
              <th>Sale Code Description</th>
              <th>From Date</th>
              <th>To Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayList}
          </tbody>
        </table>
      </div>
    )
  }
}
