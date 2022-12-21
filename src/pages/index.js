import { parse } from 'node-html-parser';
parse = require('node-html-parser');
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {Home} from 'src/components/Buttons/UserButton.js'
class View extends React.Component {
    render() {
        return (         
                <div>
                    <div>User</div>
                    <div>Group</div>
                </div>
            
        );  
    }
}

// export default function App() {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route path="homes" element={<Home />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     );
//   }


let domContainer = document.querySelector('#Index_page');
ReactDOM.render(<View />, domContainer);    