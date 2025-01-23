import SideBar from './Sidebar'
import TopNav from './TopNav';
import './Layout.css';


export default function DashboardLayout({children}) {
   
    return (
        <div className="vh-100 overflow-hidden">
          <div className="wrapper h-100">
            <SideBar />
            <div className="main h-100">
              <TopNav />
              <div className="h-100">
                <main className="overflow-auto h-100">{children}</main>
              </div>
            </div>
          </div>
        </div>
      );
}
