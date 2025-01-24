// import SideBar from './Sidebar'
// import TopNav from './TopNav';
// import './Layout.css';


// export default function DashboardLayout({children}) {
   
//     return (
//         <div className="vh-100 overflow-hidden">
//           <div className="wrapper h-100">
//             <SideBar />
//             <div className="main h-100">
//               <TopNav />
//               <div className="">
//                 <main className="">{children}</main>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
// }
import SideBar from './Sidebar';
import TopNav from './TopNav';
import './Layout.css';
export default function DashboardLayout({ children }) {
    return (
        <div className="vh-100 overflow-hidden d-flex flex-column">
            <div className="wrapper h-100 d-flex">
                <SideBar />
                <div className="main h-100 flex-grow-1 d-flex flex-column">
                    <TopNav />
                    <div className="content flex-grow-1 overflow-auto">
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </div>
    );
}
