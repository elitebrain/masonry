import React, { useState, useRef, useEffect } from "react";

const breakPoints = [350, 500, 750];

const Masonry = (props) => {
  const { children, getColumns } = props;
  const [columns, setColumns] = useState(1);
  const masonryRef = useRef();

  useEffect(() => {
    _onResize();
    window.addEventListener("resize", _onResize);
  }, []);
  // const _getColumns = (w) => {
  //   const iw = window.innerWidth;
  //   let column;
  //   if (iw < 576) {
  //     column = 1;
  //   } else if (iw < 768) {
  //     column = 2;
  //   } else if (iw < 992) {
  //     column = 3;
  //   } else if (iw < 1200) {
  //     column = 4;
  //   } else {
  //     column = 6;
  //   }
  //   return column;
  //   // return (
  //   //   breakPoints.reduceRight((p, c, i) => {
  //   //     return c < w ? p : i;
  //   //   }, breakPoints.length) + 1
  //   // );
  // };
  const _onResize = () => {
    const _columns = getColumns(masonryRef.current.offsetWidth);
    if (_columns !== columns) {
      setColumns(_columns);
    }
  };
  const _mapChildren = () => {
    let col = [];
    const numC = columns;
    for (let i = 0; i < numC; i++) {
      col.push([]);
    }
    console.log("children", children)
    return children.reduce((p, c, i) => {
      p[i % numC].push(c);
      return p;
    }, col);
  };
  return (
    <div className="masonry" ref={masonryRef}>
      {_mapChildren().map((col, ci) => {
        return (
          <div className="column col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={ci}>
          {/* <div className="column" key={ci}> */}
            {col.map((child, i) => {
              return <div key={i}>{child}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;