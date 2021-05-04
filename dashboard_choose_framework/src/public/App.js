import React, { Component } from 'react';
import './App.css';
import frameworkList from "./framework_list"
import comparisonAttributesList from "./comparison_attributes_list"

class App extends Component {

  constructor() {
    super()
    this.state = {
      dataToShow: [],
      sort: {
        fieldToSortBy: undefined,
        order: 0
      }
    }
    this.fetchDataFromAPI = this.fetchDataFromAPI.bind(this)
    this.sortBy = this.sortBy.bind(this)
    this.sortingAsc = this.sortingAsc.bind(this)
    this.sortingDesc = this.sortingDesc.bind(this)
  }

   componentDidMount (){
     //refreshes data from APIs every 2s 
    setInterval(this.fetchDataFromAPI,2000)
  }
  
  async fetchDataFromAPI () {
    try {
      const dataToShow = [] 
      for (const framework of frameworkList) {
        const retrievedFromAPIS = await fetch (framework)
        const dataToJson = await retrievedFromAPIS.json()
        dataToShow.push(dataToJson)
      }
      this.setState({dataToShow})
    } catch (error){
      console.log(error)
    }
  }
  
//sorting helpers
  sortingAsc(key) {
    return function(a, b) {
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    }
  }
  sortingDesc(key) {
    return function(a, b) {
      if (a[key] < b[key]) return 1
      if (a[key] > b[key]) return -1
      return 0
    }
  }

  sortTableData () {
    const { fieldToSortBy, order } = this.state.sort

    if (fieldToSortBy && (order!==0)) {
        if (order===1){
          return [...this.state.dataToShow].sort(this.sortingAsc(fieldToSortBy))
      } else if (order===2){
        return [...this.state.dataToShow].sort(this.sortingDesc(fieldToSortBy))
      }
    }
    return this.state.dataToShow
  }

  sortBy (columnName) {
      if (this.state.sort.fieldToSortBy===columnName){
        this.setState({sort:  { fieldToSortBy:columnName,
                                order:(this.state.sort.order+1)%3
                              }
                    })
      } else {
        this.setState({sort: {fieldToSortBy:columnName,
                              order:1}})
      }
  }

  render() {
    return (
      <div className="App">
        <h1>Dashboard</h1>
        <table>
          <thead>
            <tr className="table-header">
              <th>Framework Name</th>
              {comparisonAttributesList.map(attribute =>{
                return (
                  <th key={attribute.id} onClick={()=>this.sortBy(`${attribute.nameinAPIResponce}`)}>{attribute.nameonUI}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {this.sortTableData().map(framework =>{
              return(
                <tr key={framework.id}>
                  <td>{framework.name}</td>
                  <td>{framework.open_issues_count}</td>
                  <td>{framework.stargazers_count}</td>
                  <td>{framework.forks_count}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
