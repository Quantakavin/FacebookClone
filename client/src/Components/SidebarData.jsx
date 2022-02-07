import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { IoMdPeople, IoIosTrendingUp } from "react-icons/io"
import { CgProfile, CgLogOut } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";


export const SIdebarData = [
    {
        title: "Home",
        path: "/userhome",
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: "Messages",
        path: "/notifications",
        icon: <TiMessages />,
        cName: 'nav-text'
    },
    {
        title: "Friend Requests",
        path: "/requests",
        icon: <IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: "Trending Posts",
        path: "/viewpost",
        icon: <IoIosTrendingUp />,
        cName: 'nav-text'
    },
    {
        title: "Profile",
        path: "/profile/:id",
        icon: <CgProfile />,
        cName: 'nav-text'
    },
    {
        title: "Logout",
        path: "/",
        icon: <CgLogOut />,
        cName: 'nav-text'
    }
]