'use client';

import Image from 'next/image';
import Link from 'next/link';

import { navLinks } from '@/constants'; // Import navigation links from constants file
import { usePathname } from 'next/navigation'; // Get current pathname from Next.js
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'; // Import Clerk components
import { Button } from '../ui/button'; // Import Button component from UI folder

const Sidebar = () => {
  const pathname = usePathname(); // Get current pathname

  return (
    <aside className='sidebar'>
      <div className='flex size-full flex-col gap-4 h-full'>
        
        {/* Sidebar Logo */}
        <Link href='/' className='sidebar-logo justify-center'>
          <Image src='/assets/images/logo-text.svg' alt='logo' width={180} height={28}/>
        </Link>

        <nav className='h-full flex flex-col justify-between'>
         
         {/* Navigation Elements */}
          <SignedIn>
            <ul className='sidebar-nav_elements'>
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname; // Check if link is active
                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                    <Link className='sidebar-link' href={link.route}>
                      <Image src={link.icon} alt='logo' width={24} height={24} className={`${isActive && 'brightness-200'}`} /> {/* Highlight active icon */}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SignedIn>

          {/* Additional Links (Visible only when signed in)*/}
          <SignedIn>
            <ul className='sidebar-nav_elements '>
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                    <Link className='sidebar-link' href={link.route}>
                      <Image src={link.icon} alt='logo' width={24} height={24} className={`${isActive && 'brightness-200'}`} /> {/* Highlight active icon */}
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              <li className='flex-center cursor-pointer gap-2 p-4'>
                <UserButton afterSignOutUrl='/' showName /> {/* User button with sign out functionality */}
              </li>
            </ul>
          </SignedIn>

          {/* Sign In Button (Visible only when signed out) */}
          <SignedOut>
            <Button asChild className='bg-purple-gradient bg-cover'>
              <Link href='/sign-in'>SignIn</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar