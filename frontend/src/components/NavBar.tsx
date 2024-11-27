import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../utilities/globalContext';

export default function NavBar(){
  const {darkMode, toggleDarkMode} = useGlobalContext();
    return(
      <nav className="flex justify-center gap-5">
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
        <button onClick={toggleDarkMode} className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"> {darkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </nav>
    )
}