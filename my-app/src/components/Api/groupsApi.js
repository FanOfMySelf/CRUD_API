import React from "react"; 
export var groupList = [];
var errorMsg = '';

      function capFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
      function generateName(){
        var name1 = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished","accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired","adolescent","adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated","agonizing"];
      
        var name2 = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","literature","problem","software","control","knowledge","power","ability","economics","love","internet","television","science","library","nature","fact","product","idea","temperature","investment","area","society","activity","story","industry","media","thing","oven","community","definition","safety","quality","development","language","management","player","variety","video","week","security","country","exam","movie","organization"];
      
        var name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
        return name;   
      }

      export async function findAllGroups(page){
        await fetch(`http://localhost:8080/api/groups?max-per-page=5&page=${page}`)
        .then(res => res.json())
        .then(
          (result) => {
            var strRst = JSON.stringify(result)
            var rcpt = JSON.parse(strRst)
            groupList = rcpt.data
            console.log(groupList)
            // this.setState({
            //   isLoaded: true,
            //   group: groupList
            // });
          },
          (error) => {
            errorMsg = error
            console.log(errorMsg)
            // this.setState({
            //   isLoaded: true,
            //   error
            // });
          }
        )
              
      if (errorMsg) {
        return <div>Error: {errorMsg}</div>;
      } else {
        return (       
          <div>         
            <table className="table table-bordered">  
            <thead>
            <tr>  
                    <th>ID</th>  
                    <th>Name</th>  
                </tr>  
            </thead>
            <tbody>   
                {groupList.map((group, index) => (  
                  <tr  data-index={index}>  
                    <td>{group.groupid}</td>  
                    <td>{group.groupname}</td>  
                  </tr>  
                ))}  
             </tbody>   
            </table>  
        
        </div>  
        
        );
      }
      }

      export async function findOneGroup(groupid){
        await fetch(`http://localhost:8080/api/groups/${groupid}`)
        .then(res => res.json())
        .then(
          (result) => {
            var strRst = JSON.stringify(result)
            var rcpt = JSON.parse(strRst)
            groupList = rcpt.data
            console.log(groupList)
            this.setState({
              isLoaded: true,
              group: groupList
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )

        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (       
            <div>         
              <table className="table table-bordered">  
              <thead>
              <tr>  
                      <th>ID</th>  
                      <th>Name</th>  
                  </tr>  
              </thead>
              <tbody>   
                  {groupList.map((group, index) => (  
                    <tr  data-index={index}>  
                      <td>{group.groupid}</td>  
                      <td>{group.groupname}</td>  
                    </tr>  
                  ))}  
               </tbody>   
              </table>  
          
          </div>  
          
          );
        }
      }

      export async function addNewGroup(groupname){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "groupname": generateName() })
       };
           fetch('http://localhost:8080/api/groups', requestOptions)
          .then(async response => {
              const isJson = response.headers.get('Content-Type')?.includes('application/json');
              const data = isJson && await response.json();
  
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
          })
          .catch(error => {
              this.setState({ error: error.toString() });
              console.error('There was an error!', error);
          }); 
      }

      export async function updateGroup(groupid,groupname){
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({"groupid" :groupid, "groupname":groupname })
       };
           fetch('http://localhost:8080/api/groups', requestOptions)
          .then(async response => {
              const isJson = response.headers.get('Content-Type')?.includes('application/json');
              const data = isJson && await response.json();
  
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
          })
          .catch(error => {
              this.setState({ error: error.toString() });
              console.error('There was an error!', error);
          }); 
      }

      export async function deleteGroup(groupid,groupname){
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({"groupid" :groupid, "groupname":groupname })
       };
           fetch('http://localhost:8080/api/groups', requestOptions)
          .then(async response => {
              const isJson = response.headers.get('Content-Type')?.includes('application/json');
              const data = isJson && await response.json();
  
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
          })
          .catch(error => {
              this.setState({ error: error.toString() });
              console.error('There was an error!', error);
          }); 
      }
      

