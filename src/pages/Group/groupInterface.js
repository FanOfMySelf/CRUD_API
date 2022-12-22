import { findAllGroups,groupList,addNewGroup } from 'src/components/groupsApi.js'
import {UpdateGroupBtn,DeleteGroupBtn,OnAddFromGroupDialogOpen} from 'src/components/Buttons/GroupButton.js'
import { userList } from '../../components/userApi';

var pageNum = 1;
class GroupInterface extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        findAllGroups(pageNum);
    }

    render(){
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

    }
}

class GroupPaging extends React.Component
{
    constructor(props) {
        super(props);

    }

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

 ReactDOM.render(<GroupPaging/>, document.querySelector('#GroupPaging'));
 ReactDOM.render(
    <div>
        <GroupInterface/>
        {GroupUpdateDialog}
        {AddUserToGroupFromGroupDialog}
    </div>, 
    document.querySelector('#Group_page'));
