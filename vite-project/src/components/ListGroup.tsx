import { useState } from "react";

interface Props {
  items: Array<string>;
  heading: string;
  onSelectItem: (item: string) => void;
}

const handleClick = (event: React.MouseEvent) => console.log(event);

function ListGroup({
  items = ["Bogota", "Medellin"],
  heading = "Cities",
  onSelectItem = () => console.log("hi"),
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
