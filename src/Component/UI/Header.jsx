import { Menu,Search } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({toggleSidebar}) => {
    return (
        <header className="flex h-16 items-center bg-gray-50 justify-between px-6 shadow-sm">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative ml-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <LanguageSwitcher/>
          </div>
        </header>
    );
}

export default Header;