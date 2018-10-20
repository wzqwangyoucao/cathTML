const request = require('request')
const cheerio = require('cheerio')
// const fs = require('fs')

const url = 'http://www.beibei.com/'

request(url, function (error, response, body) {
  const html = body;
  const $ = cheerio.load(html);
  let myaListArr = [];

  const mya = $('a');

  myaList(mya);

  /**
   * 拿到不同的链接，已经链接的价格
   */
  function myaList(mya){
    const myaLength = mya.length
    for(let i=0;i<myaLength;i++){
      /**
       * 进行正则匹配  拿到价格
       */
      const regexp = /(￥[0-9]*\.[0-9]*)/
      let val =  $(mya[i]).text().match(regexp)//这里val为空   不知道为什么不能匹配  并且有的a链接中两个价格

      /**
       *进行增加obj项目 
       */
      let _obj = {}
      _obj[$(mya[i]).attr('href')] = $(mya[i]).text()

      myaListArr.push(_obj)
    }
  }


  // fs.writeFile('outputa.html', mya, function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('ok.');
  //   }
  // });

  // fs.writeFile('output.html', html, function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('ok.');
  //   }
  // });
});