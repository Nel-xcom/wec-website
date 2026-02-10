import React, { createContext, useState, useContext } from 'react';
import EarlyAccessForm from '../components/EarlyAccessForm';

const EarlyAccessContext = createContext();

export const EarlyAccessProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    return (
        <EarlyAccessContext.Provider value={{ openForm, closeForm }}>
            {children}
            <EarlyAccessForm isOpen={isOpen} onClose={closeForm} />
        </EarlyAccessContext.Provider>
    );
};

export const useEarlyAccess = () => {
    const context = useContext(EarlyAccessContext);
    if (!context) {
        throw new Error('useEarlyAccess must be used within an EarlyAccessProvider');
    }
    return context;
};
