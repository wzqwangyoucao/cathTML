const request = require('request')
const cheerio = require('cheerio')
// const fs = require('fs')

const url = 'http://www.beibei.com/'

request(url, function (error, response, body) {
  const html = body;
  const $ = cheerio.load(html);
  
  const myA = $('a');//所有a链接

  const ObjListA = findMyAList(myA);//a链接对应的a链接价格
  const fliterNullL = fliterNull(ObjListA);//所有有价格的a链接
  const priceA = fitlterPri(fliterNullL);//>100元的链接
  const sortPri = sortA(priceA)//价格排序
  const avgPri = findAvgPri(sortPri)//平均价格
  console.log(avgPri)


  /**
   * 拿到不同的链接，已经链接的价格
   */
  function findMyAList(myA){
    const myALength = myA.length
    let myaListArr = []
    for(let i=0;i<myALength;i++){
      const regexp = /(¥[0-9]*\.?[0-9]*)/g
      let val =  $(myA[i]).text().match(regexp)
      let _obj = {}
      _obj[$(myA[i]).attr('href')] = val

      myaListArr.push(_obj)
    }
    return myaListArr
  }

  /**
   *过滤里面的为空的值
   */
  function fliterNull(list){
    let _list = []
    list.map(i => {
      for(item in i){
        if(i[item] != null){
          _list.push(i)
        }
      }
    })
    return _list;
  }

  /**
   *
   * 根据过滤出价格>100的产品
   */
  function fitlterPri(list){
    let _list = []
    list.map(i => {
      for(item in i){
        i[item].map(v => {
          let a = v.match(/([0-9]+\.?[0-9]*)/);
          if(+a[0]>100){
            _list.push(+a[0]);
          }
        })
      }
    })
    return _list
  }

  /**
   *
   *进行价格排序
   */
  function sortA(list){
    list.sort(function(a,b){
      return a-b;
    });
    return list;
  }

  /**
   *
   *求价格的平均
   */
  function findAvgPri(list){
    const myaLength = list.length
    let sum = 0;
    list.map(v => {
      sum += v;
    })
    return avg = sum/myaLength;
  }
});