import React from 'react';
import ReactDOM from 'react-dom/client';
import { findAllGroups,groupList,addNewGroup } from '../../components/Api/groupsApi'
import { UpdateGroupBtn,DeleteGroupBtn,OnAddFromGroupDialogOpen,OnUpdateGroupDialogOpen,AddUserToGroupBtn } from '../../components/Buttons/GroupButton'
import { userList } from '../../components/Api/userApi';

var pageNum = 1;
export default class GroupInterface extends React.Component {
    componentDidMount() {
        findAllGroups(pageNum);
    }

    render(){
        return(
          <div>         
        <table className="table table-bordered">  
        <thead>
        <tr>  
                <th>ID</th>  
                <th>Name</th>  
                <th></th>
                <th></th>
                <th></th>
            </tr>  
        </thead>
        <tbody>   
            {groupList.map((group, index) => (  
              <tr  data-index={index}>  
                <td>{group.groupid}</td>  
                <td>{group.groupname}</td>  
                <td>
                  <button onClick={()=>OnUpdateGroupDialogOpen(group.groupid,group.groupname)}>Update</button>
                </td>
                <td>
                  <button onClick={()=>DeleteGroupBtn(group.groupid,group.groupname)}>Delete</button>
                </td>
                <td>
                  <button onClick={()=>OnAddFromGroupDialogOpen(group.groupid)}>Add user to group</button>
                </td>
              </tr>  
            ))}  
         </tbody>   
        </table> 
        <button onClick={()=>addNewGroup()}>Add group</button>           
    </div>  

        );
        
    }
}

class GroupPaging extends React.Component {
    render(){
        return Array.from(
            { length: groupList.length },
            (_, i) => (
                
                <span>
                <span><button href="" onClick={()=>changePageNum(i)} >{i+1}</button></span>  
                <span>...</span>
                </span>    
                
            )
        );
    }
}

function changePageNum(newNum) {
    pageNum = newNum+1;
    console.log(pageNum);
    window.location.reload(true)
 } 

 var GroupUpdateDialog =  React.createElement("div",{
    id: "dialog_update_group", title:"Update Group",style:{display :"none"}},
   <div>
   <h1>UPDATE GROUP</h1>
    <table>
    <tbody>
      <tr>
        <td>GROUPID</td>
        <td><input readOnly="true" id="txtUpdateGroupId" type="text"></input></td>
      </tr>
      <tr>
        <td>GROUPNAME</td>
        <td><input id="txtUpdateGroupName" type="text"></input></td>
      </tr>
      </tbody>
    </table>
    <button onClick={()=>UpdateGroupBtn(document.getElementById("txtUpdateGroupId").value,document.getElementById("txtUpdateGroupName").value)}
>Update</button>
    </div>
)

function AddUserToGroupFromGroup (){
  var checkboxes = document.getElementsByName('addUserToGroupFromGroup');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {                   
      AddUserToGroupBtn(document.getElementById("txtAddUserToGroupFromGroup").value, checkboxes[i].value)
    }    
  }
}

var AddUserToGroupFromGroupDialog =  React.createElement("div",{
  id: "dialog_add_user_to_group_from_group", title:"AddUserToGroup",style:{display :"none"}},
 <div>
 <h1>Add User <input readOnly="true" id="txtAddUserToGroupFromGroup" type="text"/> to Groups</h1>
      <table className="table table-bordered">  
<thead>
  <tr>  
        <th>ID</th>
        <th>Name</th>  
        <th>Email</th> 
        <th></th>
  </tr>  
</thead>
<tbody>
  {userList.map((user, index) => (  
    <tr  data-index={index}>  
      <td>{user.user_id}</td>  
      <td>{user.username}</td>  
      <td>{user.email}</td> 
      <td>
          <input type="checkbox" id={user.user_id} name="addUserToGroupFromGroup" value={user.user_id}/>
      </td>
      </tr>   
    ))}  
    </tbody>
  </table>
  <button onClick={()=>AddUserToGroupFromGroup()}>Add OK</button>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GroupInterface />
  </React.StrictMode>
);

const rootFooter = ReactDOM.createRoot(document.getElementById('UserPaging'));
rootFooter.render(
  <div>
  <GroupPaging/>
  {GroupUpdateDialog}
  {AddUserToGroupFromGroupDialog}
</div>
);