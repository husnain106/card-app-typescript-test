import { useGlobalContext } from '../utilities/globalContext';

export default function SettingsDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { darkMode, toggleDarkMode } = useGlobalContext();
    if (!isOpen) return null;
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-1/3" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-black dark:text-white">Settings</h2>
        <div className="mt-4">
            <label className="flex items-center space-x-3">
            <span className="text-black dark:text-white">Dark Mode</span>
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="w-5 h-5"/>
            </label>
        </div>
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Close</button>
        </div>
    </div>
    );
}
