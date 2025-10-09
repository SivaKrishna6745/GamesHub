import { useState } from 'react';
import './App.css';
import { Image } from './components/Image';
import { SearchBar } from './components/SearchBar';
import { Switch } from './components/Switch';

function App() {
    const [isDark, setIsDark] = useState(false);
    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div>
            <header className="flex items-center justify-between gap-4">
                <Image src="/src/assets/app-logo.jpg" height={50} width={50} className="rounded-lg" />
                <SearchBar />
                <Switch
                    id="light-dark"
                    label={isDark ? 'Light Mode' : 'Dark Mode'}
                    onToggle={toggleDarkMode}
                    toggled={isDark}
                />
            </header>
            <main></main>
            <footer></footer>
        </div>
    );
}

export default App;
