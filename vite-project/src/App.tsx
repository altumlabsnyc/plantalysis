import ListGroup from "./components/ListGroup";

function App() {
  const items = ["Bogota", "Lima", "Quito", "Caracas"];
  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={(item: string) => console.log(item)}
      ></ListGroup>
    </div>
  );
}

export default App;
