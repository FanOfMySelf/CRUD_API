import { findAllGroups,groupList } from 'src/components/groupsApi.js'
var groupList = [];
var pageNum = 1;
class GroupInterface extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        findAllGroups(pageNum);
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

 ReactDOM.render(<GroupPaging/>, document.querySelector('#GroupPaging'));
 ReactDOM.render(
    <div>
        <GroupInterface/>
    </div>, 
    document.querySelector('#Group_page'));
