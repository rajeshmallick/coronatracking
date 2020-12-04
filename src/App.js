import React,{Component} from 'react';
import './App.css';
import loading from './loader.gif';
class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state=({
      isLoaded:false,
      items:[],
      newConfirmed:'',
      totalConfirmed:'',
      newDeaths:'',
      totalDeaths:'',
      totalRecovered:'',
      currentDate:''
    })
  }
  componentDidMount()
  {
    fetch('https://api.covid19api.com/summary')
    .then(res => res.json())
    .then(json => {
      // console.log(typeof(json));
      console.log(json.Date);
     
      this.setState({
       isLoaded:true,
       items:json.Countries,
       newConfirmed: json && json.Global && json.Global.NewConfirmed? json.Global.NewConfirmed : 0,
       totalConfirmed:json.Global.TotalConfirmed,
       newDeaths:json.Global.NewDeaths,
       totalDeaths:json.Global.TotalDeaths,
       totalRecovered:json.Global.TotalRecovered,
       currentDate:json.Date,
      })
     
    })
  }
  gettableData = () => {
    console.log(this.state.items,'myitem')
    return(
      this.state.items.map(item => {
        return(
          <tr key={item.Country}>
        <td>{item.Country ? item.Country: 'NA' }</td>
        <td>{item.NewConfirmed}</td>
        <td>{item.TotalConfirmed}</td>
        <td>{item.NewDeaths}</td>
        <td style={{color:'red',fontWeight:'bold'}}>{item.TotalDeaths}</td>
        <td style={{color:'green',fontWeight:'bold'}}>{item.TotalRecovered}</td>
        </tr>
        )
        
      })
    )

  }
  render()
  {
    var apiDate = new Date(this.state.currentDate).toDateString();
    return(
      
      <div className="App">
        {this.state.isLoaded ? 
      <div className="container">
        <div className='heading'>COVID-19 Corona Tracker</div>
        <div className="short_summary">

            <div className="box">
            <h2>New Confirmed</h2>
    <div className='count'>{this.state.newConfirmed}</div>
            <div className="date">{apiDate}</div>
            </div>

            <div className="box">
            <h2>Total Confirmed</h2>
            <div className='count'>{this.state.totalConfirmed}</div>
            <div className="date">{apiDate}</div>
            </div>

            <div className="box">
            <h2>New Deaths</h2>
            <div className='count'>{this.state.newDeaths}</div>
            <div className="date">{apiDate}</div>
            </div>

            <div className="box total_death">
            <h2>Total Deaths</h2>
            <div className='count'>{this.state.totalDeaths}</div>
            <div className="date">{apiDate}</div>
            </div>

            <div className="box total_recovered">
            <h2>Total Recovered</h2>
            <div className='count'>{this.state.totalRecovered}</div>
            <div className="date">{apiDate}</div>
            </div>

        </div>

<div className='heading-2'>Country wise data</div>

<div className="table_div">
        <table className="summary_table">
          <thead>
              <tr>
                <th>Country</th>
                <th>New Confirmed</th>
                <th>Total Confirmed</th>
                <th>New Deaths</th>
                <th>Total Deaths</th>
                <th>Total Recovered</th>
                </tr>
                </thead>

               <tbody>
               {this.gettableData()}
                </tbody>

              </table>
              </div>
              
      </div>
      :<div className="loading text-center"><img src={loading} alt="loading"/></div> 
  }
        </div>
    );
  }
}

export default App;