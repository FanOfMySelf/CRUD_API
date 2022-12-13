'use strict';
var userList = [];
const User = ({ id, name, email }) => (
  <div>
    <div>
      <p>{id}</p>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  </div>
);
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/users?max-per-page=5&page=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result.items
          });
          var strRst = JSON.stringify(result)
          var rcpt = JSON.parse(strRst)
          userList = rcpt.data
          console.log(userList)
          alert(userList)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {users?.map(users => (
            <li>
             {users.id} {users.name} {users.email}
            </li>
          ))}
        </ul>
      );
    }
  }
}


//const rootNode = document.getElementById('App');//
//const root = ReactDOM.createRoot(rootNode);
//root.render(React.createElement(<MyComponent/>));

let domContainer = document.querySelector('#App');
ReactDOM.render(<MyComponent />, domContainer);

