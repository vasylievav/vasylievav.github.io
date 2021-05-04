//List of comparison attributes. Add new attributeds here , where nameonUI - name , that will be shown on Dashboard UI; nameinAPIResponce - how ir it represented in a framework API responce
const comparisonAttributesList =[
  { id:1,  
    nameonUI:"Open Issues Count",
    nameinAPIResponce: "open_issues_count"
  },
  { id:2, 
    nameonUI:"Stars",
    nameinAPIResponce: "stargazers_count"
  },
  { id:3,  
    nameonUI:"Forks Count",
    nameinAPIResponce:"forks_count"
  }
]

export default comparisonAttributesList