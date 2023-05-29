import React from 'react'
import { FixedSizeList } from 'react-window';

const ReactWindow = ({ data }) => {
    const Row = ({ index, style }) => {
        // console.log(index)
        const item = data[index];
        return (
          <div style={style}>
            <div>
              <strong>Name:</strong> {item.name}
            </div>
            <div>
              <strong>Gender:</strong> {item.gender}
            </div>
            <div>
              <strong>Location:</strong> {item.location}
            </div>
          </div>
        );
    };
    
  return (
    <div>
        <h1>React-Window</h1>
        <FixedSizeList
            width={300} // 列表寬度
            height={500} // 列表高度
            itemCount={data.length} // 列表項目數量
            itemSize={90} // 列表項目高度
        >
            {Row}
        </FixedSizeList>
    </div>
  )
}

export default ReactWindow