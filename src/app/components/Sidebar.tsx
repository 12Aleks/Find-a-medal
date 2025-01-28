"use client"
import Link from 'next/link';
import {usePathname} from "next/navigation";
import {AccountBox, Edit, Home, LibraryBooks, ListAlt, MilitaryTech, SwitchAccount} from "@mui/icons-material";


const sidebarMenu = [
    {
        title: 'Home',
        link: "/",
        icon: Home,
    },
    {
        title: 'Profile',
        link: "/user/profile",
        icon: AccountBox,
    },
    {
        title: 'Edit profile',
        link: "/user/profile/edit",
        icon: Edit,
    }, {
        title: 'Your publication',
        link: "/user/publication",
        icon: ListAlt,
    },{
        title: 'Users list',
        link: "/list/users",
        icon: SwitchAccount,
    },{
        title: 'Regiments list',
        link: "/list/regiments",
        icon: LibraryBooks,
    },{
        title: 'Medals list',
        link: "/list/medals",
        icon: MilitaryTech,
    },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section
            className="bg-white dark:bg-zinc-900 w-64 h-full overflow-auto pt-4 pb-4 border-r-1 border-r-stone-700">
            <div className="grid text-slate-700 hover:text-slate-800 cursor-pointer">
                {
                    sidebarMenu.map((item) => {

                        const isActive = pathname === item.link;

                        return (
                            <div
                                className={`flex items-center pl-3 pr-3 pt-4 pb-4 ${isActive ? 'text-white bg-slate-700 hover:bg-slate-800' : 'bd-white hover:bg-slate-300'}`}
                                key={item.title}
                            >
                                <item.icon className="w-6 h-6 mr-2"/>
                                <Link className="w-full text-base font-semibold" href={item.link}>{item.title}</Link>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
};

export default Sidebar;
