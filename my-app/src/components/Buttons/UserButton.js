import React from "react"; 
import ReactDOM from 'react-dom/client';
import $ from "jquery"
import {findAllUsers,findOneUser,addNewUser,updateUser,deleteUser,addUserToGroup} from '../Api/userApi'

class UserButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }
}
export const FindAllUsersBtn = (page) => {
    return (
    <div>
        <button onClick={() => findAllUsers(page)}>Find all</button>
    </div>
    );    
};

export const FinOneUserBtn = userid =>{
    return(
    <div>
        <button onClick={() => findOneUser(userid)}>Find one</button>
    </div>
    );  
};

export const AddNewUserBtn = (username,email) =>{
    return(
    <div>
        <button onClick={() => addNewUser(username,email)}>Add new</button>
    </div>
    );  
};

export const UpdateUserBtn = (userid , username, email) =>{
    return(
    <div>
        <button onClick={() => updateUser(userid , username, email)}>Update</button>
    </div>
    );  
};

export const DeleteUserBtn = (userid , username, email) =>{
    return(
    <div>
        <button onClick={()=>deleteUser(userid , username, email)}>Delete</button>
    </div>
    );  
};

export const AddUserToGroupBtn = (userid, groupid) =>{
    return(
    <div>
        <button onClick={()=>addUserToGroup(userid, groupid)}>Add to group</button>
    </div>
    );  
};


export const OnUpdateUserDialogOpen = (userid , username, email)=>{
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

export const OnAddUserToGroupDialogOpen = (userid)=>{
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



