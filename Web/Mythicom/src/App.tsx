import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './global_components/Footer'
import Header from './global_components/Header/Header'
import IconButton from './global_components/IconButton'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './toastify.css'

function App() {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 150) {
      setVisible(true)
    }
    else if (scrolled <= 150) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div className="bg-light-silver">
      <Header />
      <div id="detail">
        <ToastContainer style={{ fontFamily: 'Itim, cursive' }} />
        <Outlet />
      </div>
      <Footer />
      <IconButton icon={faArrowUp}
        className={`z-10 fixed ${visible ? 'inline' : 'hidden'} rounded-full border border-dark-grey
          right-8 bottom-[12vh] sm:bottom-[10vh] md:bottom-[6vh] bg-teal w-14 h-14 `}
        onClick={scrollToTop}
        iconClass="text-white my-3 mx-4 text-3xl"
      />
    </div>
  )
}

export default App
