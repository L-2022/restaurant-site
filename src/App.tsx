import React from 'react';
import { AboutUs, Chef, Header, Intro, Awards, SpecialMenu } from './container';
import { Navbar, FloatingMenuButton, Footer } from './components';
import { MenuProvider } from "./context/MenuContext";
import './App.css';
import BookTable from "./container/BookTable/BookTable";

const App: React.FC = () => (
    <MenuProvider>
      <div>
        <Navbar />
        <Header />
        <AboutUs />
        <Awards />
        <SpecialMenu />
        <Chef />
        <Intro />
        <BookTable/>
        <FloatingMenuButton />
        <Footer />
      </div>
    </MenuProvider>
);

export default App;
