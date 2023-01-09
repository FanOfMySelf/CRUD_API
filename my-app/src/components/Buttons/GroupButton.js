import React from "react";
import ReactDOM from 'react-dom/client'; 
import $ from 'jquery';
import {findAllGroups,findOneGroup,addNewGroup,updateGroup,deleteGroup} from '../Api/groupsApi'
import {addUserToGroup} from '../Api/userApi'
class GroupButtons extends React.Component {
 constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
      };
    }
  }

export const FindAllGroupsBtn = (page) => {
    return (
    <div>
        <button onClick={() => findAllGroups(page)}>Find all</button>
    </div>
    );    
};

export const FinOneGroupBtn = (groupid) =>{
    return(
    <div>
        <button onClick={() => findOneGroup(groupid)}>Find one</button>
    </div>
    );  
};

export const AddNewGroupBtn = (groupname) =>{
    return(
    <div>
        <button onClick={() => addNewGroup(groupname)}>Add new</button>
    </div>
    );  
};

export const UpdateGroupBtn = (groupid,groupname) =>{
    return(
    <div>
        <button onClick={() => updateGroup(groupid, groupname)}>Update</button>
    </div>
    );  
};

export const DeleteGroupBtn = (groupid,groupname) =>{
    return(
    <div>
        <button onClick={() => deleteGroup(groupid,groupname)}>Delete</button>
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

export const OnUpdateGroupDialogOpen = (groupid , groupname)=>{
    return(
        <div>
            {
                $("#dialog_update_group").dialog({
                    resizable :false,
                    width: 800,
                    modal:true,
                    position:{
                        my:'center',
                        at:'center'
                    }

                })
            }
            {document.getElementById("txtUpdateGroupId").value = groupid}
            {document.getElementById("txtUpdateGroupName").value = groupname}
        </div>
    );
};

export const OnAddFromGroupDialogOpen = (groupid)=>{
    return(
        <div>
            {
                $("#dialog_add_user_to_group_from_group").dialog({
                    resizable :false,
                    width: 800,
                    modal:true,
                    position:{
                        my:'center',
                        at:'center'
                    }

                })
            }
            {document.getElementById("txtAddUserToGroupFromGroup").value = groupid}
        </div>
    );
};
 

