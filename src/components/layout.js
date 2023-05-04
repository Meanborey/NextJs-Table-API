import Footer from "./footer"
import Navbar from "./navbar"
function Layout ({children}){
    return (
        <>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
        </>
    )
}
export default Layout;