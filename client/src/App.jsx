import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Layout from "./pages/admin/Layout"
import Dashboard from "./pages/admin/Dashboard"
import AddBlog from "./pages/admin/AddBlog"
import ListBlog from "./pages/admin/ListBlog"
import Comments from "./pages/admin/Comments"
import Login from "./components/admin/Login"
import "quill/dist/quill.snow.css"
import {Toaster} from "react-hot-toast"
import { useAppContext } from "./context/AppContext"
import { useEffect, useRef } from "react"
const App = () => {

  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  // Reference for custom cursor position tracking
  const mouse = useRef({x:0 , y:0})
  const position = useRef({x:0 , y:0})

  useEffect (()=>{
    const handleMouseMove = (e) =>{
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

    }
    document.addEventListener('mousemove',handleMouseMove)
    const animate = () =>{
      position.current.x += (mouse.current.x - position.current.x) * 0.1
      position.current.y += (mouse.current.y - position.current.y) * 0.1

      if(dotRef.current && outlineRef.current){
        dotRef.current.style.transform = `translate3D(${mouse.current.x - 6}px, ${mouse.current.y - 6}px,0)`
        outlineRef.current.style.transform = `translate3D(${position.current.x - 20}px, ${position.current.y - 20}px, 0)`
      }
      requestAnimationFrame(animate)
    }
    animate()

    return () =>{
      document.removeEventListener('mousemove',handleMouseMove)
    }
  },[])

  const {token} = useAppContext()

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blog/:id" element={<Blog/>} />
        <Route path="/admin" element={token ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>} />
          <Route path="addBlog" element={<AddBlog/>} />
          <Route path="listBlog" element={<ListBlog/>} />
          <Route path="comments" element={<Comments/>} />
        </Route>
      </Routes>

      {/* Custom Server Ring */}
      <div ref={outlineRef} className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-[999]"></div>

      {/* Custom cursor dot */}
      <div ref={dotRef} className="fixed top-0 left-0 h-3  w-3 rounded-full bg-primary pointer-events-none z-[999]"></div>
    </div>
  )
}

export default App


