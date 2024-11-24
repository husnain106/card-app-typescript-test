import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Entry, EntryContextType } from '../@types/context';

type GlobalContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode') || 'false')
  );

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark'); // Adds 'dark' class to <html>
      } else {
        document.documentElement.classList.remove('dark'); // Removes 'dark' class from <html>
      }
      return newMode;
    });
  };

  return (
    <GlobalContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export const EntryContext = createContext<EntryContextType | null>(null);

export const EntryProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [entries, setEntries] = useState<Entry[]>([]);

    const initState = async () => {
        const data = await axios.get<Entry[]>('http://localhost:3001/get/')
        const initialStateBody = data.data
        setEntries(initialStateBody)
    }

    useEffect(() => {
        initState()
      }, []);

    const saveEntry = async (entry: Entry) => {
        const requestData = await axios.post<Entry>('http://localhost:3001/create/', entry)
        const newEntry = requestData.data
        setEntries([...entries, newEntry])
      }

    const updateEntry = async (id: string, entry: Entry) => {
        await axios.put<Entry>(`http://localhost:3001/update/${id}`, entry)
        setEntries(entries => {
          const entryIndex = entries.findIndex((obj => obj.id == id))
          entries[entryIndex] = entry
          console.log(entries)
          return entries
        })
    }
    const deleteEntry = async (id: string) => {
        await axios.delete<Entry>(`http://localhost:3001/delete/${id}`)
        setEntries(e => e.filter(entry => entry.id != id))
    }
    return (
        <EntryContext.Provider value={{ entries, saveEntry, updateEntry, deleteEntry }}>
          {children}
        </EntryContext.Provider>
      )
}

