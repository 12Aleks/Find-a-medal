"use client"
import {useState} from 'react';
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem,  Button} from "@nextui-org/react";
import Link from "next/link";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-gray-500"
        >
            <NavbarContent className="sm:hidden shadow-md" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <Link href="/">
                    {/*<AcmeLogo />*/}
                    <p className="font-bold text-inherit tracking-wider">Find a Medal</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarBrand>
                    <Link href="/">
                    {/*<AcmeLogo />*/}
                    <p className="font-bold text-inherit tracking-wider">Find a Medal</p>
                    </Link>
                </NavbarBrand>
                <NavbarItem  >
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#" className="tracking-widest">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="default" href="#" variant="flat" className="text-white tracking-widest">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {/*{menuItems.map((item, index) => (*/}
                {/*    <NavbarMenuItem key={`${item}-${index}`}>*/}
                {/*        <Link*/}
                {/*            className="w-full"*/}
                {/*            color={*/}
                {/*                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"*/}
                {/*            }*/}
                {/*            href="#"*/}
                {/*            size="lg"*/}
                {/*        >*/}
                {/*            {item}*/}
                {/*        </Link>*/}
                {/*    </NavbarMenuItem>*/}
                {/*))}*/}
            </NavbarMenu>
        </Navbar>
    );
};

export default Header;