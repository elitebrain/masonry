import React, { useState, useEffect } from 'react';
import Masonry from './components/Masonry';

function App() {
  const [loadedImgList, setLoadedImgList] = useState([]);
  useEffect(() => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].src) {
        setLoadedImgList(prevState => [...prevState, false]);
      } else {
        setLoadedImgList(prevState => [...prevState, true]);
      }
    }
  }, [list])
  useEffect(() => {
    if (loadedImgList.filter(v => v === false).length === 0) {
      _setPosition();
    }
  }, [loadedImgList]);
  const _setPosition = () => {
    const columnCount = _getColumns();
    for (let i = 0; i < list.length; i++) {
      if (i >= columnCount) {

      }
    }
  }
  let list = [
    // {
    //   id: 0,
    //   src: null,
    //   title: "제목",
    //   contents: `Masonry is a JavaScript grid layout library. It works by placing elements in optimal position based on available vertical space, sort of like a mason fitting stones in a wall. You’ve probably seen it in use all over the Internet.`
    // }
  ];
  const imgId = [1011, 883, 64, 1074, 823, 92, 643, 200, 412, 456, 210, 334];
  imgId.push(0);
  imgId.push(65);
  imgId.push(0);
  imgId.push(839);
  imgId.push(0);
  // imgId.push(314);
  // imgId.push(0);
  // imgId.push(256);
  // imgId.push(0);
  // imgId.push(316);
  // imgId.push(0);
  // imgId.push(400);
  // imgId.push(0);
  // imgId.push(600);
  // imgId.push(0);
  // imgId.push(500);
  for (let i = 0; i < imgId.length; i++) {
    const ih = 200 + Math.floor(Math.random() * 10) * 15;
    if (imgId[i] === 0) {
      list.push({ id: i+1, src: null, title: `제목 ${i}`, contents: `내용\ncontents\nabcdefg\n${Math.random() * 100000000000000000}` });
    } else {
      list.push({ id: i+1, src: "https://unsplash.it/250/" + ih + "?image=" + imgId[i], title: imgId[i], contents: "" });
    }
  }
  list.push({
    id: 9999999,
    src: null,
    title: "제목",
    contents: "내용2"
  })
  const _onLoad = (e, idx) => {
    const { naturalHeight, parentElement } = e.target;
    // console.log(idx, "naturalHeight : ", naturalHeight);
    setLoadedImgList(prevState => {
      const arr = prevState;
      arr[idx] = true;
      return arr;
    });
    // if (idx - _getColumns() < 0) {
    //   return;
    // } else {
    //   const nh1 = document.getElementById(`figure_${idx - _getColumns() - (idx % _getColumns())}`).offsetHeight;
    //   const nh2 = document.getElementById(`figure_${idx - _getColumns() - (idx % _getColumns()) + 1}`).offsetHeight;
    //   const nh3 = document.getElementById(`figure_${idx - _getColumns() - (idx % _getColumns()) + 2}`).offsetHeight;
    //   const nh4 = document.getElementById(`figure_${idx - _getColumns() - (idx % _getColumns()) + 3}`).offsetHeight;
    //   console.log(nh1, nh2, nh3, nh4);
    // }
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
    // return (
    //   breakPoints.reduceRight((p, c, i) => {
    //     return c < w ? p : i;
    //   }, breakPoints.length) + 1
    // );
  };
  const Title = ({ item, idx }) => {
    const { src, title, contents, id } = item;
    return (
      <div className="title">
        {src ? 
          <figure id={`figure_${idx}`}>
            <img id={id} src={src} alt={src.split("?")[1]} onLoad={e => _onLoad(e, idx)} />
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
  console.log("loadedImgList",loadedImgList);
  // 이전 list중에 제일 작은 높이찾기 (같은 열에 2개이상이면 합친거 만들어야됨)
  // let minHeight;
  // const test = n => {
  //   for (let i = 0; i < list.length; i++) {
  //     if (parseInt(list[i].id.split("_")[1], 10) < n) {
  //       if (!minHeight) {
  //         minHeight = list[i].offsetHeight;
  //       } else if (minHeight > list[i].offsetHeight) {
  //         minHeight = list[i].offsetHeight;
  //       }
  //     }
  //   }
  // }
  return (
    <div className="masonry-container">
      <Masonry getColumns={_getColumns}>
        {list.map((item, i) => {
          return <Title item={item} key={item.id} idx={i} />;
        })}
      </Masonry>
    </div>
  );
}

export default App;
