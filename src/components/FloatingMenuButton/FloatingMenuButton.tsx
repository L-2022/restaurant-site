import React, { useContext } from "react";
import MenuContext from "../../context/MenuContext";
import { scrollToSection } from "../../utils/scrollToSection";
import "./FloatingMenuButton.css";

const FloatingMenuButton = () => {
    const { state, dispatch } = useContext(MenuContext);

    if (state.selectedItems.length === 0) return null;

    const handleClick = () => {
        dispatch({ type: 'SET_SELECTED_OPEN', payload: true });
        setTimeout(() => {
            scrollToSection("selected-menu");
        }, 50);
    };

    return (
        <button className="floating_menu_button" onClick={handleClick}>
            Selected ({state.selectedItems.length})
        </button>
    );
};

export default FloatingMenuButton;
