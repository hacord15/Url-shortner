import { Outlet } from "react-router-dom"
import Header from "../components/ui/header"


const AppLayout = () => {
  return (
    <div>
      <main className=" min-h-screen container ">
      <Header/>
      <Outlet />
      </main>

     

      <div className="p-10 text-center bg-gray-800 mt-10 text-white">
        Made with love by abhi
      </div>
    </div>
  )
}

export default AppLayout
