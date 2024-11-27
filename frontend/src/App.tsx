import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import NavBar from './components/NavBar';
import AllEntries from './routes/AllEntries';
import EditEntry from './routes/EditEntry';
import NewEntry from './routes/NewEntry';
import { EntryProvider } from './utilities/globalContext';

export default function App() {
  return (
    <section className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white min-h-screen">
  <Router>
    <EntryProvider>
    <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<AllEntries/>}>
        </Route>
        <Route path="create" element={<NewEntry/>}>
        </Route>
        <Route path="edit/:id" element={<EditEntry/>}>
        </Route>
      </Routes>
    </EntryProvider>
    </Router>
    </section>
    
  );
}
