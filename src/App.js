import ReactVirtualized from "./components/ReactVirtualized"
import ReactWindow from "./components/ReactWindow"
import VirtualScroller from "./components/VirtualScroller"
import data from "./data.json"

function App() {
  return (
    <div>
      <ReactVirtualized data={data} />
      <ReactWindow data={data} />
      <VirtualScroller 
        get={data} 
        settings={{
          itemHeight: 20,
          amount: 10,
          tolerance: 5,
          minIndex: -9999,
          maxIndex: 100000,
          startIndex: 1
        }} 
        row={item => (
          <div className="item" key={item.index}>
            {item.text}
          </div>
        )} 
      />
    </div>
  );
}

export default App;
