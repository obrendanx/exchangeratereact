import React, { Component } from 'react'

export default class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base: [],
      fromCurrState: 'USD',
      toCurrState: 'EUR',
      currAmountState: 100,
      convertedCurr: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.swapCurrency = this.swapCurrency.bind(this);
  }

    handleChange(event, field) {    
      this.setState({ [field]: event.target.value});   
    }
    async handleSubmit(e) {
      e.preventDefault();
      var convert_url = 'https://api.exchangerate.host/convert?from=' + this.state.fromCurrState + '&to=' + this.state.toCurrState + '&amount=' + this.state.currAmountState;
      var convert = await fetch(convert_url);
      var convert_data = await convert.json();
      this.setState({convertedCurr: convert_data.result});
      console.log(this.state.fromCurrState);
      console.log(this.state.toCurrState);
      console.log(this.state.convertedCurr);
      console.log(convert_data);
    }


    async componentDidMount() {
        //to grab currency names
        var url_two = 'https://api.exchangerate.host/symbols';
        var response_two = await fetch(url_two);
        var data_two = await response_two.json();
        //to convert the currency
        var convert_url = 'https://api.exchangerate.host/convert?from=' + this.state.fromCurrState + '&to=' + this.state.toCurrState + '&amount=' + this.state.currAmountState;
        var convert = await fetch(convert_url);
        var convert_data = await convert.json();
        //updating state values with json values
        this.setState({base: data_two.symbols, convertedCurr: convert_data.result});
        //testing to make sure values are being loaded
    }

     swapCurrency() {
      var tempCurr = this.state.toCurrState;
      var toCurr = this.state.fromCurrState;
      var fromCurr = tempCurr;
      this.setState({toCurrState: toCurr});
      this.setState({fromCurrState: fromCurr});
    }

  render() {
    //currency rates for each code
    const base = Object.values(this.state.base);
    const currency = [];

    //mapping currency codes
    base.map((items, index) => {
      Object.keys(items).map((key) => {
        items[key].length > 3 ? delete items[key] : currency.push(items[key]);
      })
    })
  

    return (
      <div className="currency_wrapper">
      <h1 className="mainHead">Converter</h1>

      <button className="switchCurr" onClick={this.swapCurrency}>SWAP</button>

      <form onSubmit={this.handleSubmit} className="converterForm">
              <select value={this.state.fromCurrState} onChange={(event)=>this.handleChange(event, "fromCurrState")} className="currSelector">           
                {currency.map((option) => (
                  <option value={option.value}>{option}</option>
                ))}
              </select>
              <input type="text" onChange={(event)=>this.handleChange(event, "currAmountState")} placeholder={this.state.currAmountState} className="amountInput"></input>
              <select value={this.state.toCurrState} onChange={(event)=>this.handleChange(event, "toCurrState")} className="currSelector">
                {currency.map((option) => (
                  <option value={option.value}>{option}</option>
                ))}
              </select>
          <input type="submit" value="CONVERT" className="submitBtn" />
      </form>
      <h1 className="convertedHeader">{this.state.convertedCurr}</h1>

      </div>
    )
  }
}
