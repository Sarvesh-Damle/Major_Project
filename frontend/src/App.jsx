import { Outlet } from "react-router-dom";
import { Footer, Navbar } from './components';

function App() {
  return (
    <>
    <div className='overflow-hidden'>
      <Navbar />
      <Outlet />
      <Footer />
      </div>
    </>
  )
}

export default App
