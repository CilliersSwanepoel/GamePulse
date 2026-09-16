import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/pages/Home/Home';
import Browse from './components/pages/Browse/Browse';

function Router() {
    // Is the menu open or closed? This lives here (not inside NavBar)
    // because two different things need to know about it:
    // - NavBar, so it can animate the hamburger + menu
    // - <main> below, so it can slide down out of the way
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <BrowserRouter>
            <NavBar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

            <main className={isMenuOpen ? 'Main Main--pushed' : 'Main'}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/browse" element={<Browse />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default Router;
