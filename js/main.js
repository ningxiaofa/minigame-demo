export default class Main {

  constructor() {
    // 创建画布
    const canvas = wx.createCanvas()

    // 绘制一个矩形
    const context = canvas.getContext('2d') // 创建一个 2d context
    context.fillStyle = 'rgb(253, 203, 110)' // 矩形颜色
    // context.fillRect(0, 0, 100, 100) // 矩形左上角顶点为(0, 0)，右下角顶点为(100, 100)
    // context.fillRect(canvas.width / 2 - 50, 0, 100, 100) // 横向居中

    // 函数封装 --> 为了方便矩形移动逻辑的绘制
    function drawRect(x, y) {
      context.clearRect(0, 0, windowWidth, windowHeight)
      context.fillRect(x, y, 100, 100)
    }

    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    // drawRect(canvas.width / 2 - 50, 0)

    const rectX = canvas.width / 2 - 50
    let rectY = 0
    const timer = setInterval(function () {
      drawRect(rectX, rectY++)

      // 图片加载完毕,  绘制显示.
      if (imgLoad) {
        context.drawImage(image, imgX, imgY)
      }

      // 判断相撞
      if (imgX >= rectX - 100 && imgX <= rectX + 100 && imgY >= rectY - 100 && imgY <= rectY + 100) { // 飞机与矩形发生碰撞
        clearInterval(timer);

        wx.showModal({
          title: '提示',
          content: '发生碰撞，游戏结束！',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          },
          fail(error) {
            console.errors(new Error(error))
          }
        })
      }

      // 打印, 查看定时器的执行过程
      console.log('setInterval....')
    }, 15)

    var image = wx.createImage()
    var imgLoad = false
    var imgX = canvas.width / 2 - 60
    var imgY = 500
    image.onload = function () {
      imgLoad = true
    }
    image.src = 'img/plane.png'

    wx.onTouchMove(function (res) {
      imgX = res.changedTouches[0].clientX // 将飞机x坐标置为当前触摸点x坐标
      imgY = res.changedTouches[0].clientY // 将飞机y坐标置为当前触摸点y坐标
    })
  }
}

