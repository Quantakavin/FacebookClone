import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { IoMdPeople, IoIosTrendingUp } from "react-icons/io"
import { CgProfile, CgLogOut } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";


export const SIdebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: "Messages",
        path: "/reports",
        icon: <TiMessages />,
        cName: 'nav-text'
    },
    {
        title: "Friend Requests",
        path: "/product",
        icon: <IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: "Trending Posts",
        path: "/team",
        icon: <IoIosTrendingUp />,
        cName: 'nav-text'
    },
    {
        title: "Profile",
        path: "/message",
        icon: <CgProfile />,
        cName: 'nav-text'
    },
    {
        title: "Logout",
        path: "/support",
        icon: <CgLogOut />,
        cName: 'nav-text'
    }
]