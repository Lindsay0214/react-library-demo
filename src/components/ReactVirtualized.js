import React from 'react';
import { List } from 'react-virtualized';

const ReactVirtualized = ({ data }) => {
    const rowRenderer = ({ index, key, style }) => {
        // console.log(index)
        const item = data[index];
        return (
            <div key={key} style={style}>
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
        <h1>React-Virtualized</h1>
        <List
          width={300} // 列表寬度
          height={500} // 列表高度
          rowCount={data.length} // 列表項目數量
          rowHeight={90} // 列表項目高度
          rowRenderer={rowRenderer}
        />
    </div>
  );
};

export default ReactVirtualized;

// ! => height, rowHeight, data, renderRow