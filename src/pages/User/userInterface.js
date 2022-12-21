import {findAllUsers,userList,addNewUser} from 'src/components/userApi.js'
import {UpdateUserBtn,DeleteUserBtn,AddUserToGroupBtn,OnUpdateUserDialogOpen,OnAddUserToGroupDialogOpen} from 'src/components/Buttons/UserButton.js'
import {groupList} from  'src/components/groupsApi.js'

var pageNum = 1;
class UserList extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    findAllUsers(pageNum);
    pageNum = 1;

  }
  render(){
    <div>
    <div className="container">         
            <table className="table table-bordered">  
            <thead>
            <tr>  
                    <th>ID</th>  
                    <th>Name</th>  
                    <th>Email</th>  
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>  
            </thead>
            <tbody>   
                {userList.map((user, index) => (  
                  <tr data-index={index}>  
                    <td>{user.user_id}</td>  
                    <td>{user.username}</td>  
                    <td>{user.email}</td>  
                    <td>
                        <button onClick={()=>OnUpdateUserDialogOpen(user.user_id,user.username,user.email)}>Update</button>
                    </td>
                    <td>
                        <button onClick={()=>DeleteUserBtn(user.user_id,user.username,user.email)}>Delete</button>
                    </td>
                    <td>
                         <button onClick={()=>OnAddUserToGroupDialogOpen(user.user_id)}>Update</button>
                    </td>
                  </tr>  
                ))}  
             </tbody>   
            </table>  
        
        </div>  
    <button onClick={()=>addNewUser()}>Add user</button>
    </div>
  }
}

function changePageNum(newNum) {
  pageNum = newNum+1;
  console.log(pageNum);
  window.location.reload(true)
} 

class UserPaging extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
        return Array.from(
            { length: userList.length },
            (_, i) => (
                
                <span>
                <span><button href="" onClick={()=>changePageNum(i)} >{i+1}</button></span>  
                <span>...</span>
                </span>       
                
            )
        );
    }
  }

var UserUpdateDialog =  React.createElement("div",{
      id: "dialog_update_user", title:"Update User",style:{display :"none"}},
     <div>
     <h1>UPDATE USER</h1>
      <table>
      <tbody>
        <tr>
          <td>USERID</td>
          <td><input readOnly="true" id="txtUpdateUserId" type="text"></input></td>
        </tr>
        <tr>
          <td>USERNAME</td>
          <td><input id="txtUpdateUserName" type="text"></input></td>
        </tr>
        <tr>
          <td>EMAIL</td>
          <td><input id="txtUpdateUserEmail" type="text"></input></td>
        </tr>
        </tbody>
      </table>
      <button onClick={()=>UpdateUserBtn(document.getElementById("txtUpdateUserId").value,document.getElementById("txtUpdateUserId").value,document.getElementById("txtUpdateUserId").value)}
>Update</button>
      </div>
  )

function AddUserToGroupFromUser (){
    var checkboxes = document.getElementsByName('addUserToGroupFromUser');

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {                   
        AddUserToGroupBtn(document.getElementById("txtAddUserToGroupFromUser").value, checkboxes[i].value)
      }
      
    }

}

  var AddUserToGroupFromUserDialog =  React.createElement("div",{
    id: "dialog_add_user_to_group_from_user", title:"AddUserToGroup",style:{display :"none"}},
   <div>
   <h1>Add User <input readOnly="true" id="txtAddUserToGroupFromUser" type="text"/> to Groups</h1>
        <table className="table table-bordered">  
  <thead>
    <tr>  
          <th>ID</th>
          <th>Name</th>  
          <th></th>
    </tr>  
  </thead>
    <tbody>
            {groupList.map((group, index) => (  
        <tr  data-index={index}>  
          <td>{group.groupid}</td>  
          <td>{group.groupname}</td>  
          <td>
            <input type="checkbox" id={group.groupid} name="addUserToGroupFromUser" value={group.groupid}/>
          </td>
        </tr>   
      ))}  
      </tbody>
    </table>
    <button onClick={()=>AddUserToGroupFromUser()}>Add OK</button>
    </div>
)

  ReactDOM.render(<UserPaging/>, document.querySelector('#UserPaging'));
  ReactDOM.render(
    <div>
      <UserList/>
      {UserUpdateDialog}
      {AddUserToGroupFromUserDialog}
    </div>, 
    document.querySelector('#User_page'));
