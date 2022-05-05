import React, { Component } from 'react'
import axios from 'axios'


export default class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: [],
      base: [],
      loading: true,
      fromCurrState: 'USD',
      toCurrState: 'EUR',
      currAmountState: 100,
      convertedCurr: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange = this.handleChangeTwo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(e) {    
      this.setState({fromCurr: e.target.value, toCurr: e.target.value});  
      console.log(this.state.toCurrState);
    }
    handleSubmit(e) {
      alert(this.state.convertedCurr);
      e.preventDefault();
    }


    async componentDidMount() {
        //grab values from state
        var fromCurr = this.state.fromCurrState;
        var toCurr = this.state.toCurrState;
        var currAmount = this.state.currAmountState;
        //to grab currency values
        var url = 'https://api.exchangerate.host/latest';
        var response = await fetch(url);
        var data = await response.json();
        //to grab currency names
        var url_two = 'https://api.exchangerate.host/symbols';
        var response_two = await fetch(url_two);
        var data_two = await response_two.json();
        //to convert the currency
        var convert_url = 'https://api.exchangerate.host/convert?from=' + fromCurr + '&to=' + toCurr + '&amount=' + currAmount;
        var convert = await fetch(convert_url);
        var convert_data = await convert.json();
        //updating state values with json values
        this.setState({rates: data.rates, loading: false, base: data_two.symbols, convertedCurr: convert_data.result});
        //testing to make sure values are being loaded
        console.log(data.rates)
        console.log(this.state.rates);
        console.log(this.state.base);
        console.log(convert_data);

    }

  render() {
    //to convert the currenc

    //currency rates for each code
    const data = Object.values(this.state.rates);
    const base = Object.values(this.state.base);
    const base_values = Object.entries(base);
    const currency = [];
    console.log(data);
    console.log(base);
    console.log(base_values);

    //mapping currency codes
    base.map((items, index) => {
      Object.keys(items).map((key) => {
        items[key].length > 3 ? delete items[key] : currency.push(items[key]);
      })
    })
    

    return (
      <div>
          <h1>Converter</h1>

      <form onSubmit={this.handleSubmit}>
            <select value="USD" onChange={this.handleChange}>           
              {currency.map((option) => (
                <option value={option.value}>{option}</option>
              ))}
            </select>

            <select value="EUR" onChange={this.handleChange}>
            {currency.map((option) => (
              <option value={option.value}>{option}</option>
            ))}
          </select>
          <input type="submit" value="Submit" />
      </form>
      <h1>{this.state.toCurr}</h1>
      <h1>{this.state.fromCurr}</h1>
      <h1>{this.state.convertedCurr}</h1>
      </div>
    )
  }
}
