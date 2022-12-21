import React from "react"; 
import {findAllUsers,findOneUser,addNewUser,updateUser,deleteUser,addUserToGroup} from 'src/components/userApi.js'

class UserButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }
}
const FindAllUsersBtn = (page) => {
    return (
    <div>
        <button onClick={() => findAllUsers(page)}>Find all</button>
    </div>
    );    
};

const FinOneUserBtn = userid =>{
    return(
    <div>
        <button onClick={() => findOneUser(userid)}>Find one</button>
    </div>
    );  
};

const AddNewUserBtn = (username,email) =>{
    return(
    <div>
        <button onClick={() => addNewUser(username,email)}>Add new</button>
    </div>
    );  
};

const UpdateUserBtn = (userid , username, email) =>{
    return(
    <div>
        <button onClick={() => updateUser(userid , username, email)}>Update</button>
    </div>
    );  
};

const DeleteUserBtn = (userid , username, email) =>{
    return(
    <div>
        <button onClick={()=>deleteUser(userid , username, email)}>Delete</button>
    </div>
    );  
};

const AddUserToGroupBtn = (userid, groupid) =>{
    return(
    <div>
        <button onClick={()=>addUserToGroup(userid, groupid)}>Add to group</button>
    </div>
    );  
};


const OnUpdateUserDialogOpen = (userid , username, email)=>{
    return(
        <div>
            {
                $("#dialog_update_user").dialog({
                    resizable :false,
                    width: 800,
                    modal:true,
                    position:{
                        my:'center',
                        at:'center'
                    }

                })
            }
            {document.getElementById("txtUpdateUserId").value = userid}
            {document.getElementById("txtUpdateUserId").value = username}
            {document.getElementById("txtUpdateUserId").value = email}
        </div>
    );
};

const OnAddUserToGroupDialogOpen = (userid)=>{
    return(
        <div>
            {
                $("#dialog_add_user_to_group_from_user").dialog({
                    resizable :false,
                    width: 800,
                    modal:true,
                    position:{
                        my:'center',
                        at:'center'
                    }

                })
            }
            {document.getElementById("txtAddUserToGroupFromUser").value = userid}
        </div>
    );
};

const Home = () => {
    return <h1>Home</h1>;
  };
  
  export default Home;


