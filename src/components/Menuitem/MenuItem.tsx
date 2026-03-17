import React from "react";

import "./MenuItem.css";

interface MenuItemProps {
  id: number;
  title: string;
  price: string;
  tags: string;
  selected: boolean;
  onSelect: (title: string) => void;
  notSelect: boolean;
}

const MenuItem = ({ title, price, tags, selected, onSelect}: MenuItemProps) => (


    <div
        className={`app__menuitem ${selected ? "app__menuitem_active" : ""}`}
        onClick={() => onSelect(title)}
    >
      <div className="app__menuitem-head">

        <div className="app__menuitem-name">

          <div className={`app__menuitem-checkbox ${selected ? "checked" : ""}`}>
            {selected && "✔"}
          </div>

          <p className="p__cormorant menuitem-name__title" >
            {title}
          </p>

        </div>

        <div className="app__menuitem-price">
          <p className="p__cormorant">{price}</p>
        </div>

      </div>

      <div className="app__menuitem-sub">
        <p className="p__opensans">
          {tags}
        </p>
      </div>
    </div>
);

export default MenuItem;
