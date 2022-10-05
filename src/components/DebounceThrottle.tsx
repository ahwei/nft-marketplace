import type { NextPage } from "next";
import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";

/**
 * 
 * 
 * 
  debounce(防抖): 從最後一次觸發開始，在 t秒後執行函數。因為是最後一次觸發，所以會把中間的觸發蓋掉。
  throttle(節流): 從最初一次觸發開始，在 t秒後執行函數。中間無論觸發多少次都不會執行。
 * 
 */

//debounce 最後才處發（間隔幾秒內沒有觸發才處發 適合寫在搜尋）
/**
 * function debounce(func, delay) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args)
    }, delay);
  }
}
 * 
 */
// 對於事件觸發頻繁的場景，只有最後由程式控制的事件是有效的。

//throttle 間隔每t秒處發
/**
 * function throttle(func, threshhold) {
  var last, timer;
  if (threshhold) threshhold = 250;
  return function () {
    var context = this
    var args = arguments
    var now = +new Date()
    if (last && now < last + threshhold) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        func.apply(context, args)
      }, threshhold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
 * 
 * 
 */

const timeout = 1000;

const DebounceThrottle: React.FC<{}> = () => {
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [value3, setValue3] = useState<string>("");

  const [arr, setArr] = useState<string[]>([]);

  useEffect(() => {}, []);

  const handeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log("nothing:", e.target.value);
    setArr((pre) => [...pre, e.target.value]);
  };

  const debounceHandleChange = useCallback(
    _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Debounce:", e.target.value);
      setArr((pre) => [...pre, e.target.value]);
    }, timeout),
    []
  );
  const throttleHandleChange = useCallback(
    _.throttle((e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Throttle:", e.target.value);
      setArr((pre) => [...pre, e.target.value]);
    }, timeout),
    []
  );

  return (
    <div className="main-app">
      nothing
      <input
        value={value1}
        onChange={(e) => {
          setValue1(e.target.value);
          console.log("nothing:", e.target.value);
          setArr((pre) => [...pre, e.target.value]);
        }}
      />
      <br />
      Debounce
      <input
        value={value2}
        onChange={(e) => {
          setValue2(e.target.value);
          debounceHandleChange(e);
        }}
      />
      <br />
      Throttle
      <input
        value={value3}
        onChange={(e) => {
          setValue3(e.target.value);
          throttleHandleChange(e);
        }}
      />
      <br />
      <button
        onClick={() => {
          setArr([]);
        }}
      >
        clear
      </button>
      <h2>show arr</h2>
      {arr.map((item, i) => {
        return <div key={i}>{item}</div>;
      })}
    </div>
  );
};

export default DebounceThrottle;
