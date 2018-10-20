const request = require('request')
const cheerio = require('cheerio')
// const fs = require('fs')

const url = 'http://www.beibei.com/'

request(url, function (error, response, body) {
  const html = body;
  const $ = cheerio.load(html);
  
  const mya = $('a');

  const ObjListA = myaList(mya);
  const fliterNulll = fliterNull(ObjListA);
  const priceA = fitlterPri(fliterNulll);
  const sortPri = sortA(priceA)
  const avgpri = avgPri(sortPri)
  console.log(avgpri)


  /**
   * 拿到不同的链接，已经链接的价格
   */
  function myaList(mya){
    const myaLength = mya.length
    let myaListArr = []
    for(let i=0;i<myaLength;i++){
      const regexp = /(¥[0-9]*\.?[0-9]*)/g
      let val =  $(mya[i]).text().match(regexp)
      let _obj = {}
      _obj[$(mya[i]).attr('href')] = val

      myaListArr.push(_obj)
    }
    return myaListArr
  }

  /**
   *过滤里面的为空的值
   */
  function fliterNull(list){
    const listLength = list.length
    let _list = []
    for(let i=0;i<listLength;i++){
      for(item in list[i]){
        if(list[i][item] != null){
          _list.push(list[i])
        }
      }
    }
    return _list
  }

  /**
   *
   * 根据过滤出价格>100的产品
   */
  function fitlterPri(list){
    const myaLength = list.length
    let _list = []
    for(let i=0;i<myaLength;i++){
      for(item in list[i]){
        for(let ind=0;ind<list[i][item].length;ind++){
        let _a = list[i][item][ind].match(/([0-9]+\.?[0-9]*)/)
          if(_a[0]-0>100){
            _list.push(_a[0])
          }
        }
      }
    }
    return _list
  }

  /**
   *
   *进行价格排序
   */
  function sortA(list){
    let _list=[];
    _list = list.sort();
    return _list
  }

  /**
   *
   *求价格的平均
   */
  function avgPri(list){
    const myaLength = list.length
    // console.log(list)
    let sum = 0;
    let avg = 0;
    for(let i=0;i<myaLength;i++){
      let num = list[i]-0
      sum = sum + num
    }
    avg = sum/myaLength
    return avg
  }
});