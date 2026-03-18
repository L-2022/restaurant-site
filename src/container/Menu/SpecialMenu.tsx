import React, { useState, useRef, useContext, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

import { MenuItem } from '../../components';
import data from '../../constants/data';
import MenuContext from '../../context/MenuContext';

import './SpecialMenu.css';

const easeSmooth = [0.65, 0, 0.35, 1] as const;

const SpecialMenu = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    const { state, dispatch } = useContext(MenuContext);
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    const selectedItems = state.selectedItems;

    useEffect(() => {
        if (state.isSelectedOpen) {
            setOpenCategories(prev => ({
                ...prev,
                selected: true
            }));
        }
    }, [state.isSelectedOpen]);

    const handleSelectItem = (title: string) => {
        dispatch({
            type: 'TOGGLE_ITEM',
            payload: title,
        });
    };

    const allDataItems = Object.values(data).flat();

    const menuCategories = Object.entries(data).map(([key, items]) => ({
        category: key,
        displayName: key.replace(/([A-Z])/g, ' $1').trim(),
        items: items as any[],
    }));

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => {
            const isNowOpen = !prev[category];
            if (category === 'selected') {
                dispatch({ type: 'SET_SELECTED_OPEN', payload: isNowOpen });
            }

            return {
                ...prev,
                [category]: isNowOpen
            };
        });
    };

    return (
        <div ref={ref} className="app__specialMenu section__padding" id="menu">
            <motion.div
                className="app__specialMenu-title"
                initial={{ opacity: 0, y: -32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: easeSmooth }}
            >
                <h1 className="head__text">Menu</h1>
            </motion.div>

            <div className="app__specialMenu-menu">
                {menuCategories.map(({ category, displayName, items }) => {
                    const isOpen = openCategories[category] || false;

                    return (
                        <motion.div
                            key={category}
                            className="app__specialMenu-menu_category"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: easeSmooth }}
                        >
                            <p
                                className="app__specialMenu-menu_heading view-more"
                                onClick={() => toggleCategory(category)}
                            >
                                {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
                            </p>

                            <div className={`app__specialMenu_menu_items ${isOpen ? 'open' : ''}`}>
                                {items.map((item) => (
                                    <MenuItem
                                        key={item.id}
                                        title={item.title}
                                        price={item.price}
                                        tags={item.tags}
                                        selected={selectedItems.includes(item.title)}
                                        onSelect={handleSelectItem}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    );
                })}

                <motion.div
                    id="selected-menu"
                    className="app__specialMenu-menu_selected"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: easeSmooth }}
                >
                    <p
                        className="app__specialMenu-menu_heading view-more view-more__golden"
                        onClick={() => toggleCategory('selected')}
                    >
                        Selected {selectedItems.length > 0 && `(${selectedItems.length})`}
                    </p>

                    <div className={`app__specialMenu_menu_items ${openCategories.selected ? 'open ' : ''}`}>
                        {selectedItems.length === 0 ? (
                            <p className="p__opensans" style={{ textAlign: 'center', opacity: 0.5 }}>
                                No items selected yet.
                            </p>
                        ) : (
                            selectedItems.map((title) => {
                                const item = allDataItems.find((i: any) => i.title === title);
                                if (!item) return null;

                                return (
                                    <MenuItem
                                        key={item.id}
                                        title={item.title}
                                        price={item.price}
                                        tags={item.tags}
                                        selected
                                        onSelect={handleSelectItem}
                                    />
                                );
                            })
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SpecialMenu;
