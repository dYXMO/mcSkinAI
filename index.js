const fs = require('fs');
const { parse } = require('path');
const sharp = require('sharp')
//创建缓存目录
const date = new Date();
const timedata=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
const dirname = `tmp/${timedata}`;
const dirnamef=dirname+'/'
if (!fs.existsSync(dirname)){
    fs.mkdirSync(dirname);
}
//end 创建缓存目录
function getimg(folder) {//随机模型
    const files = fs.readdirSync(`./model/${folder}`);
    const randomIndex = Math.floor(Math.random() * files.length);
    return `./model/${folder}/${files[randomIndex]}`;
  }
function getrandcolor(){//随机16进制颜色
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  

console.log(getimg('底图'))
sharp(getimg('底图'))
  .toFile(`${dirname}/底图.png`, (err, info) => {
    if (err) throw err;
    console.log(info);
  });
/**************************************** */
console.log(getimg('头发'))
sharp(getimg('头发'))
.modulate({
    brightness: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
    saturation: Number((Math.random()).toFixed(2))
  })
  .tint(getrandcolor())
  .toFile(`${dirname}/头发.png`, (err, info) => {
    if (err) throw err;
    console.log(info);
  });
  console.log(getimg('头发'))
/**************************************** */
sharp(getimg('眼睛'))
  .tint(getrandcolor())
  /*.modulate({
    saturation: 0.7 + Math.random() * (1.9 - 0.7),
    brightness: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
    saturation: Number((Math.random() * 1).toFixed(2))
  })*/
  .toFile(`${dirname}/眼睛.png`, (err, info) => {
    if (err) throw err;
    console.log(info);
  });
/**************************************** */
sharp(getimg('衣服'))
    .tint(getrandcolor())
    .toFile(`${dirname}/衣服.png`, (err, info) => {
        if (err) throw err;
        console.log(info);
    });
/**************************************** */
sharp(getimg('裤子'))
    .modulate({
        brightness: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
        saturation: Number((Math.random()).toFixed(2))
    })
    .tint(getrandcolor())
    .toFile(`${dirname}/裤子.png`, (err, info) => {
        if (err) throw err;
        console.log(info);
    });

/*叠加图层函数*/
function diejia(t, b, n, callback) {
    sharp(dirnamef + b + '.png')
      .composite([{ input: dirnamef + t + '.png', top: 0, left: 0 }])
      .toFile(dirnamef + n + '.png', (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('图像叠加了喵:', info);
          callback();
        }
      });
  }
/*********************** */
//等一会再执行
setTimeout(() => {
diejia('眼睛','底图','tmp1',function() {
    diejia('衣服', 'tmp1', 'tmp2', function () {
        diejia('裤子', 'tmp2', 'tmp3', function () {
            diejia('头发', 'tmp3', 'tmp_f', function () {
                /* 改名 */
                const sourcePath = dirnamef + 'tmp_f.png';
                const targetPath = `output/${timedata}.png`;
                fs.rename(sourcePath, targetPath, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Done:好耶 完成了');
                    }
                });

            })//1
        })//2
    })//3
})//4

},500);
