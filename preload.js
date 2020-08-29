// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  setTimeout(() => {
    getBuyInfo()
  }, 10000);
  setTimeout(() => {
    location.reload();
  }, 20000);
})

function getBuyInfo () {
  // 判断是否能购买
  const airList = document.querySelectorAll('.flight')
  let canBuy = false
  airList.forEach(element => {
    const type = element.querySelector('.zzjtzd').innerText
    switch (type) {
      case '直达': {
        const buyItem = element.querySelector('.economy .font-size12')
        // console.log(Boolean(buyItem))
        if (buyItem) {
          canBuy = true
        }
      }
    }
  })
  if (canBuy) {
    fetch("http://t.lamp.run/alert?message=" + '机票有剩余', {
      method: 'POST',
      redirect: 'follow'
    })
    console.log('可以购买!')
  } else {
    console.log('不能购买!')
  }
}
