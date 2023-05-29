import React, { useState, useEffect, useRef } from 'react';

const VirtualScroller = ({ get, settings, row }) => {
    const [state, setState] = useState({
        totalHeight: 0,
        toleranceHeight: 0,
        bufferedItems: 0,
        itemHeight: 0,
        minIndex: 0,
        initialPosition: 0,
        viewportHeight: 0,
        topPaddingHeight: 0,
        bottomPaddingHeight: 0,
        data: [],
    });

    const viewportElement = useRef(null);

    useEffect(() => {
        const { itemHeight, minIndex, initialPosition } = settings;
        const initialTopPaddingHeight = Math.max((initialPosition - minIndex) * itemHeight, 0);
        const initialBottomPaddingHeight = Math.max(
          state.totalHeight - initialTopPaddingHeight - state.data.length * itemHeight,
          0
        );
    
        setState(prevState => ({
          ...prevState,
          itemHeight,
          minIndex,
          initialPosition,
          topPaddingHeight: initialTopPaddingHeight,
          bottomPaddingHeight: initialBottomPaddingHeight,
        }));
    
        viewportElement.current.scrollTop = initialPosition || 0;
      }, [settings, state.data.length, state.totalHeight]);
        
      useEffect(() => {
        const { totalHeight, toleranceHeight, bufferedItems } = state;
    
        const runScroller = ({ target: { scrollTop } }) => {
          const index = state.minIndex + Math.floor((scrollTop - toleranceHeight) / state.itemHeight);
          const data = get(index, bufferedItems);
          const topPaddingHeight = Math.max((index - state.minIndex) * state.itemHeight, 0);
          const bottomPaddingHeight = Math.max(
            totalHeight - topPaddingHeight - data.length * state.itemHeight,
            0
          );
    
          setState(prevState => ({
            ...prevState,
            topPaddingHeight,
            bottomPaddingHeight,
            data,
          }));
        };
    
        viewportElement.current.addEventListener('scroll', runScroller);
    
        return () => {
          viewportElement.current.removeEventListener('scroll', runScroller);
        };
      }, [get, state]);

      const { viewportHeight, topPaddingHeight, bottomPaddingHeight, data } = state;
    return (
        <div>
            <h1>VirtualScroller</h1>
            <div
                className="viewport"
                ref={viewportElement}
                style={{ height: viewportHeight }}
            >
                <div style={{ height: topPaddingHeight }} />
                    {data.map(row)}
                <div style={{ height: bottomPaddingHeight }} />
            </div>
        </div>
    )
}

export default VirtualScroller