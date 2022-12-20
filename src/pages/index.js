// import React from "react"; 
import FindAllUsersBtn from 'src/components/Buttons/UserButton.js'
class View extends React.Component {
    render() {
        return (         
                <div>
                    <div>User</div>
                    <div>Group</div><button onclick = {()=> FindAllUsersBtn(1)}></button>
                    <div></div>
                </div>
            
        );  
    }
}


let domContainer = document.querySelector('#Index_page');
ReactDOM.render(<View />, domContainer);    