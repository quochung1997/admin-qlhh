import React, { Component } from 'react'

export default class Discount extends Component {
  constructor() {
    super()

    this.state = {
      Discount: [{
        SaleCodeString: "aksd",
        SaleCodeType: 1,
        SaleCodeValue: 30,
        SaleCodeDescription: "sale",
        FromDate: "10PM 22/12/2019",
        ToDate: "10PM 23/12/2019"
      }],
      isLoaded: false,      
      search: "",
      SaleCodeString: "",
      SaleCodeType: 0,
      SaleCodeValue: 0,
      SaleCodeDescription: "",
      FromDate: "",
      ToDate: ""
    }
  }

  componentDidMount = () => {
    this.setState({isLoaded: true});
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="container">
        
      </div>
    )
  }
}
