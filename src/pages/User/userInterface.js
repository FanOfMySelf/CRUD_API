import {findAllUsers,userList,addNewUser} from 'src/components/userApi.js'
import {UpdateUserBtn,DeleteUserBtn} from 'src/components/Buttons/UserButton.js'

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
    <button onClick={()=>addNewUser()}>Add user</button>
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

  ReactDOM.render(<UserPaging/>, document.querySelector('#UserPaging'));
  ReactDOM.render(
    <div>
      <UserList/>
      {UserUpdateDialog}
    </div>, 
    document.querySelector('#User_page'));
