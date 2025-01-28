import React from 'react';
import { Bell, Settings, LogOut, Code2, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
}

export function Header({ isNavOpen, setIsNavOpen }: HeaderProps) {
  return (
    <header className="bg-primary sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">WF:AppSmith</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Bell className="h-5 w-5 text-white hover:text-background-dark cursor-pointer hidden sm:block" />
            <Settings className="h-5 w-5 text-white hover:text-background-dark cursor-pointer hidden sm:block" />
            <div className="flex items-center space-x-3 border-l border-white/20 pl-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-white"
              />
              <span className="text-sm font-medium text-white hidden sm:block">John Developer</span>
              <LogOut className="h-5 w-5 text-white hover:text-background-dark cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}