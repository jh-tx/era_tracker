import Link from "next/link";
import styles from "./links.module.css"

const Links = () =>{
    const links = [
        {
            title: "Home",
            path:"/",
        },
        {
            title: "Search",
            path:"/search",
        },
        {
            title: "Login",
            path:"/login",
        },
    ];
    
    return(
        <div className = {styles.links}>
            {links.map((link=>(
                <Link href={link.path} key={link.title}>{link.title}</Link>
            )))}
        </div>
    )
}

export default Links;