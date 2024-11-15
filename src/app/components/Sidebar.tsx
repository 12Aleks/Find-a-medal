import Link from 'next/link';
import React from 'react';
import {Home} from "@mui/icons-material";

const Sidebar = () => {
    return (
        <section className="bg-white dark:bg-zinc-900 w-64 h-full overflow-auto p-4 border-r-1 border-r-stone-700">
            <div className="grid gap-4 text-slate-700 hover:text-slate-800 cursor-pointer">
                <div className="flex items-center gap-4">
                    <Home className="w-6 h-6" />
                    <Link className="text-base font-semibold" href="/">Home</Link>
                </div>
                <div className="flex items-center gap-4">

                    <p className="text-base font-semibold">Shop</p>
                </div>
                <div className="flex items-center gap-4">

                    <p className="text-base font-semibold">Settings</p>
                </div>
                <div className="flex items-center gap-4">

                    <p className="text-base font-semibold">Help</p>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;