import React, { useState, useEffect } from 'react';

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    _setPosition();
    window.addEventListener("resize", _setPosition);
    let _list = [];
    const imgId = [1011, 883, 64, 1074, 823, 92, 643, 200, 412, 456, 210, 334];
    imgId.push(0);
    imgId.push(65);
    imgId.push(0);
    imgId.push(839);
    imgId.push(0);
    for (let i = 0; i < imgId.length; i++) {
      const ih = 200 + Math.floor(Math.random() * 10) * 15;
      if (imgId[i] === 0) {
        _list.push({ id: i, src: null, title: `제목 ${i}`, contents: `내용\ncontents\nabcdefg\n${Math.random() * 100000000000000000}` });
      } else {
        _list.push({ id: i, src: "https://unsplash.it/250/" + ih + "?image=" + imgId[i], title: imgId[i], contents: "" });
      }
    };
    setList(_list);
  }, [])
  const _setPosition =  async () => {
    const columnCount = _getColumns();
    const columnList = document.querySelectorAll(".masonry > .column");
    const sumColHeight = [];
    for (let i = 0; i < columnCount; i++) {
      sumColHeight.push(0);
    }
    for (let i = 0; i < columnList.length; i++) {
      if (i < columnCount) {
        columnList[i].style.top = "0";
        columnList[i].style.left = `calc(${i / columnCount} * 100%)`;
        sumColHeight[i] += await columnList[i].offsetHeight;
      } else {
        const minHeight = Math.min.apply(null, sumColHeight);
        columnList[i].style.top = `${minHeight}px`;
        const _idx = sumColHeight.indexOf(minHeight);
        columnList[i].style.left = `calc(${_idx / columnCount} * 100%)`;
        sumColHeight[_idx] += await columnList[i].offsetHeight;
      }
    }
    const maxHeight = Math.max.apply(null, sumColHeight);
    document.querySelector(".masonry").style.height = `${maxHeight}px`;
  }
  const _moreList = () => {
    const _id = list.length;
    const _list = [];
    for (let i = 0; i < 10; i++) {
      const rnd = Math.ceil(Math.random() * 1000);
      const ih = 200 + Math.floor(Math.random() * 10) * 15;
      _list.push({ id: _id + i, src: "https://unsplash.it/250/" + ih + "?image=" + rnd, title: rnd, contents: "" });
    };
    setList(prevState => prevState.concat(_list));
  }
  const _getColumns = (w) => {
    const iw = window.innerWidth;
    let column;
    if (iw < 576) {
      column = 1;
    } else if (iw < 768) {
      column = 2;
    } else if (iw < 992) {
      column = 3;
    } else if (iw < 1200) {
      column = 4;
    } else {
      column = 6;
    }
    return column;
  };
  const Title = ({ item }) => {
    const { src, title, contents, id } = item;
    return (
      <div className="title">
        {src ? 
          <figure onClick={() => window.open(src)}>
            <img id={id} src={src} alt={src.split("?")[1]} onLoad={_setPosition} />
            <figcaption>{id}</figcaption>
          </figure>
        :
          <div className="card">
            <h4>{title}</h4>
            <p>{contents}</p>
          </div>
        }
      </div>
    );
  };
  return (
    <div className="masonry-container">
      <div className="masonry">
        {list.map((item) => (
          <div className="column col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={item.id}>
            <Title item={item} />
          </div>
        ))}
        <button className="btn_circle" onClick={() => _moreList()}>more</button>
      </div>
    </div>
  );
}

export default App;
