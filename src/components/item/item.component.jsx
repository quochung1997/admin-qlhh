import React, { Component } from 'react'
import Axios from 'axios'
import API from '../../API/define-api'
import './item.styles.scss';
import ItemDetail from '../item-detail/item-detail.component';

export default class Item extends Component {
  constructor() {
    super()

    this.state = {
      Items: [],
      search: "",
      isLoaded: false,
      isAdding: false,
      isAddingDetail: false,
      ItemName: "",
      ItemCode: "",
      ItemImage: "",
      CategoryID: 0,
      ItemPrice: 0,
      SupplierID: 0,
      CategoriesList: [
        {
          categoryID: 0,
          categoryName: "None"
        },
        {
          categoryID: 1,
          categoryName: "Shirt"
        },
        {
          categoryID: 2,
          categoryName: "Pants"
        },
        {
          categoryID: 3,
          categoryName: "Coat"
        },
      ],
      SuppliersList: [
        {
          supplierID: 0,
          supplierName: "None"
        },
        {
          supplierID: 1,
          supplierName: "Vic"
        },
        {
          supplierID: 2,
          supplierName: "Supreme"
        },
        {
          supplierID: 3,
          supplierName: "H&M"
        },
        {
          supplierID: 4,
          supplierName: "Canifa"
        },
      ],
      ItemDetails: [],
      Size: "",
      Quantity: "",
      ShowCategory: 0,
      warnning: null,
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
    this.setState({ isAdding: true })
  }

  cancelAdding = () => {
    this.setState({ isAdding: false })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  deleteDetail = (Size) => {
    let newListItemDetails = [];

    this.state.ItemDetails.forEach(detail => {
      if (detail.Size != Size)
        newListItemDetails.push(detail);
    })

    console.log(newListItemDetails);

    this.setState({
      ItemDetails: newListItemDetails
    })
  }

  newDetail = () => {
    const { ItemDetails, Size, Quantity } = this.state;
    let check = false;
    let quanNum = parseInt(Quantity);

    if (!quanNum) {
      alert('Quantity must be a numver');
      return;
    }

    let newItemDetail = ItemDetails.map(detail => {
      if (detail.Size == Size) {
        check = true;
        return {
          Size,
          Quantity: detail.Quantity + quanNum
        }
      }

      else return detail;
    })

    if (!check)
      newItemDetail.push({ Size, Quantity: quanNum })

    this.setState({
      ItemDetails: newItemDetail,
      Size: "",
      Quantity: ""
    })
  }

  cancelAddingDetail = () => {
    this.setState({ isAddingDetail: false })
  }

  addItem = (e) => {
    e.preventDefault();
    let { Items, ItemCode, ItemDetails, ItemName, ItemPrice, ItemImage, CategoryID, SupplierID } = this.state;

    if (ItemDetails.length == 0) {
      this.setState({warnning: "You must add at least one item detail"})
      return;
    }

    Items.push({
      itemCode: ItemCode,
      itemName: ItemName,
      itemDetails: ItemDetails,
      itemPrice: ItemPrice,
      categoryID: CategoryID,
      supplierID: SupplierID,
      itemImage: ItemImage
    });

    this.setState({
      isAdding: false,
      ItemName: "",
      ItemCode: "",
      ItemImage: "",
      CategoryID: 0,
      ItemPrice: 0,
      SupplierID: 0,
      ItemDetails: [],
      warnning: null
    })
  }

  render() {
    const { Items, isLoaded, isAdding, CategoriesList, SuppliersList, ItemDetails, warnning } = this.state


    const displayListCategories = CategoriesList.map(cat => (
      <option key={cat.categoryID} label={cat.categoryName} >{cat.categoryID}</option>
    ))

    if (!isLoaded) {
      return <p>Loading...</p>
    }

    if (isAdding) {

      const displayListItemDetails = ItemDetails.map(detail => (
        <ItemDetail key={detail.Size} detail={detail} deleteDetail={this.deleteDetail} />
      ))

      const displayListSuppliers = SuppliersList.map(sup => (
        <option key={sup.supplierID} label={sup.supplierName} >{sup.supplierID}</option>
      ))

      return (
        <div className="container main">
          <form onSubmit={this.addItem}>
            <h5>Add item</h5>
            {warnning ? <p className="warn">{warnning}</p> : null}
            <div className="form-group">
              <label htmlFor="ItemName">Item Name:</label>
              <input
                type="text"
                className="form-control"
                id="ItemName"
                name="ItemName"
                onChange={this.handleChange}
                value={this.state.ItemName}
                required />
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="ItemCode">Item Code:</label>
                <input
                  type="text"
                  className="form-control"
                  id="ItemCode"
                  name="ItemCode"
                  onChange={this.handleChange}
                  value={this.state.ItemCode}
                  required />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="ItemPrice">Item Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="ItemPrice"
                  name="ItemPrice"
                  onChange={this.handleChange}
                  value={this.state.ItemPrice}
                  required />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="CategoryID">Category:</label>
                <select
                  className="form-control"
                  id="CategoryID"
                  name="CategoryID"
                  onChange={this.handleChange}
                  value={this.state.CategoryID}
                >
                  {displayListCategories}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="SuplierID">Supplier:</label>
                <select
                  className="form-control"
                  id="SuplierID"
                  name="SuplierID"
                  onChange={this.handleChange}
                  value={this.state.SupplierID}
                >
                  {displayListSuppliers}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="ItemImage">Item Image:</label>
              <input type="text" className="form-control" id="ItemImage" name="ItemImage" onChange={this.handleChange} required />
            </div>
            <p>Detail</p>
            <div className="row">
              <div className="form-group col-md-5">
                <input
                  type="text"
                  className="form-control"
                  id="Size" name="Size"
                  placeholder="Detail Size"
                  value={this.state.Size}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-md-5">
                <input
                  type="text"
                  className="form-control"
                  id="Quantity"
                  name="Quantity"
                  placeholder="Detail Quantity"
                  value={this.state.Quantity}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-primary add-detail" onClick={this.newDetail}>+</button>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {displayListItemDetails}
              </tbody>
            </table>
            <button type="submit" className="btn btn-primary btn-add">Add</button>
            <button type="button" className="btn btn-danger btn-cancel" onClick={this.cancelAdding}>Cancel</button>
          </form>
        </div>
      )
    }

    const displayList = Items.map(item => (
      <tr key={item.itemID}>
        <td>{item.itemImage}</td>
        <td>{item.itemCode}</td>
        <td>{item.itemName}</td>
        <td>{item.itemPrice}</td>
        <td>{item.categoryID}</td>
        <td>{item.supplierID}</td>
        <td>
          <span className="fix-size"><i className="far fa-edit btn-edit"></i></span>
          <span className="fix-size"><i className="fas fa-trash-alt btn-delete"></i></span>
        </td>
      </tr>
    ))

    return (
      <div className="container main">
        <h4>ITEM MANAGEMENT</h4>
        <br />

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
        <br />

        <div className="form-group">
          <label htmlFor="ShowCategory">Category:</label>
          <select className="form-control" id="ShowCategory" name="ShowCategory" onChange={this.handleChange} >
            {displayListCategories}
          </select>
        </div>

        <h5>List Item</h5>
        <table className="table table-category">
          <thead>
            <tr>
              <th>Image</th>
              <th>Code</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Supplier</th>
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
