import React from "react"; 
import {findAllGroups,findOneGroup,addNewGroup,updateGroup,deleteGroup} from 'src/components/groupsApi.js'
import {addUserToGroup} from 'src/components/userApi.js'
class GroupButtons extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
      };
    }
  }

const FindAllGroupsBtn = (page) => {
    return (
    <div>
        <button onClick={() => findAllGroups(page)}>Find all</button>
    </div>
    );    
};

const FinOneGroupBtn = (groupid) =>{
    return(
    <div>
        <button onClick={() => findOneGroup(groupid)}>Find one</button>
    </div>
    );  
};

const AddNewGroupBtn = (groupname) =>{
    return(
    <div>
        <button onClick={() => addNewGroup(groupname)}>Add new</button>
    </div>
    );  
};

const UpdateGroupBtn = (groupid,groupname) =>{
    return(
    <div>
        <button onClick={() => updateGroup(groupid, groupname)}>Update</button>
    </div>
    );  
};

const DeleteGroupBtn = (groupid,groupname) =>{
    return(
    <div>
        <button onClick={() => deleteGroup(groupid,groupname)}>Delete</button>
    </div>
    );  
};

const OnUpdateGroupDialogOpen = (groupid , groupname)=>{
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

const OnAddFromGroupDialogOpen = (groupid)=>{
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
 

