import React, { Component } from 'react'
import axios from 'axios'


export default class Converter extends Component {
    state = {
        rates: [],
        base: [],
        loading: true
    }

    async componentDidMount() {
        var url = 'https://api.exchangerate.host/latest';
        var response = await fetch(url);
        var data = await response.json();
        var url_two = 'https://api.exchangerate.host/symbols';
        var response_two = await fetch(url_two);
        var data_two = await response_two.json();
        this.setState({rates: data.rates, loading: false, base: data_two.symbols});
        console.log(data.rates)
        console.log(this.state.rates);
        console.log(this.state.base);
    }

  render() {
    var makeItem = function(x) {
        <option>{(x)}</option>
    }

    const data = Object.values(this.state.rates);
    const base = Object.values(this.state.base);
    const base_values = Object.entries(base);
    const currency = ['AED','AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BZD'];
    console.log(data);
    console.log(base);
    console.log(base_values);
    

    return (
      <div>
          <h1>Converter</h1>
          {this.state.loading ? <div>Loading ...</div> : <select></select>}
          <h1>{data[0]}</h1>
          {base.map((items, index) => {
            return (
                <ul key={index}>
                {Object.keys(items).map((key) => {
                return (
                    <div>
                    <option key={key + index}>{items[key].toString()}</option>
                    </div>
                )
                })} 
                </ul>
            )
            })}
      </div>
    )
  }
}
