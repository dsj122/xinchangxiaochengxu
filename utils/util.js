// var host = 'http://118.190.56.21/xc/public/xindex.php/xcxapi/v1.'
// var pdfUrl = 'http://118.190.56.21/xc/public/'
// var TokenUrl = 'http://118.190.56.21/xc/public/xindex.php/xcxapi/v1.token/getWxToken'
var host = 'https://xinchang.gzxiaopao.com/xc/public/xindex.php/xcxapi/v1.'
var pdfUrl = 'https://xinchang.gzxiaopao.com/xc/public/'
var TokenUrl = 'https://xinchang.gzxiaopao.com/xc/public/xindex.php/xcxapi/v1.token/getWxToken'
var hfiveurl = [
  'https://h5.youzan.com/v2/feature/jtR0yvjhgX',
  'https://h5.youzan.com/v2/feature/swgr6XGCCH',
  'https://h5.youzan.com/v2/feature/3XFnJYIQ7U',
  'https://h5.youzan.com/v2/feature/pHqHXMw0s8',
  'https://h5.youzan.com/v2/feature/uB9s5in5UU',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/3M7Sw32F6Z',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/aw9zzFDhHh',
  'https://h5.youzan.com/v2/feature/INuxsh0ezA',
  'https://h5.youzan.com/v2/feature/E46CJnI70G',
  'https://h5.youzan.com/v2/feature/vyV7ChGUsf',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/tyR2XFpRvL',
  'https://h5.youzan.com/v2/feature/yWFR8c5b7u',
  'https://h5.youzan.com/v2/feature/hv6vQZlDwy',
  'https://h5.youzan.com/v2/feature/ztkLY7gEqY',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/Xq8QhQ9ROX',
  'https://h5.youzan.com/v2/feature/83qZ2OSbl2',
  'https://h5.youzan.com/v2/feature/F0c8Q47WMg',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/e2c7cs3hnv',
  'https://h5.youzan.com/v2/feature/2gN4Hiho1l',
  'https://h5.youzan.com/v2/feature/U4YseKhyzQ',
  'https://h5.youzan.com/v2/feature/pifZzct92x',
  'https://h5.youzan.com/v2/feature/o5WQSMVGUz',
  'https://h5.youzan.com/v2/feature/y8574j8iF6',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/CZCdD8GIxB',
  'https://h5.youzan.com/v2/feature/RNOgZlE5Y8',
  'https://h5.youzan.com/v2/feature/UUK3Uj8ajf',
  'https://h5.youzan.com/v2/feature/0UKJVRqxBe',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/I7Zu4p0YmS',
  'https://h5.youzan.com/v2/feature/qM8mjCriBj',
  'https://h5.youzan.com/v2/feature/2VEr27Kq6S',
  'https://h5.youzan.com/v2/feature/kV1cftXbUh',
  'https://h5.youzan.com/v2/feature/jXIWi7tuXy',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/qoEWv6GWRE',
  'https://h5.youzan.com/v2/feature/DWdDN6Za50',
  'https://h5.youzan.com/v2/feature/BwKWZL9z1k',
  'https://h5.youzan.com/v2/feature/1nmvrpzkFW',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/LmYZOMxw7Q',
  'https://h5.youzan.com/v2/feature/Btv2yE2ETR',
  'https://h5.youzan.com/v2/feature/6RNJrmwyDE',
  'https://h5.youzan.com/v2/feature/IMphKN1Ges',
  'https://h5.youzan.com/v2/feature/eyJByUi5rw',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/WKa0NeHhpt',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/KXZh5TOXpG',
  'https://shop41094076.youzan.com/v2/feature/aOWJk4rEDU?reft=1548405079635&spm=f.74891655&oid=52249937',
  'https://h5.youzan.com/v2/feature/Geg2YcZiyF',
  'https://h5.youzan.com/v2/feature/rWVbyalrZ3',
  'https://h5.youzan.com/v2/feature/MGrhyDMKD1',
  'https://h5.youzan.com/v2/feature/ZUsH65m32t',
  'https://h5.youzan.com/v2/feature/u5sZtcUsBX',
  'https://h5.youzan.com/v2/feature/Tab3XDDjAw',
  'https://h5.youzan.com/v2/feature/A5NTomN8ZX',
  'https://h5.youzan.com/v2/feature/AyEBYbY5an',
  'https://h5.youzan.com/v2/feature/aw9zzFDhHh',
  'https://h5.youzan.com/v2/feature/INuxsh0ezA',
  'https://h5.youzan.com/v2/feature/oVj3hXDdKz',
  'https://h5.youzan.com/v2/feature/I2Ts72to56',
  'https://h5.youzan.com/v2/feature/hv6vQZlDwy',
  'https://h5.youzan.com/v2/feature/JIfcgTDfi2',
  'https://h5.youzan.com/v2/feature/aFLamVQ7JY',
  'https://h5.youzan.com/v2/feature/G7R5kX2OaL',
  'https://h5.youzan.com/v2/feature/gM1SzrQEPJ',
  'https://h5.youzan.com/v2/feature/fXkfDyX4EE',
  'https://h5.youzan.com/v2/feature/TGljYCOJ8E',
  'https://h5.youzan.com/v2/feature/p5alVvGjd8',
  'https://h5.youzan.com/v2/feature/7Oq9MPCYgx',
  'https://h5.youzan.com/v2/feature/swgr6XGCCH',
  'https://h5.youzan.com/v2/feature/oVj3hXDdKz',
  'https://h5.youzan.com/v2/feature/I2Ts72to56',
  'https://h5.youzan.com/v2/feature/7Oq9MPCYgx',
  'https://h5.youzan.com/v2/feature/7jrplceyHE',
  'https://h5.youzan.com/v2/feature/N8uolZSTr1',
  'https://h5.youzan.com/v2/feature/6OoDy6f1t7',
  'https://h5.youzan.com/v2/feature/0J3ZpE5SEc',
  'https://h5.youzan.com/v2/feature/ewF5YdGEyd',
  'https://h5.youzan.com/v2/feature/byY8Gs02TF',
  'https://h5.youzan.com/v2/feature/kyMrY7muow',
  'https://h5.youzan.com/v2/feature/RW7n3NdcUv',
  'https://h5.youzan.com/v2/feature/mGlKY1nCUl',
  'https://h5.youzan.com/v2/feature/AB2eWUsoqW',
  'https://h5.youzan.com/v2/feature/njw9Yafucl',
  'https://h5.youzan.com/v2/feature/A0rFeBkNxu',
  'https://h5.youzan.com/v2/feature/cp5Sl0L5wj',
  'https://h5.youzan.com/v2/feature/6HHYt7TNoX',
  'https://h5.youzan.com/v2/feature/6HHYt7TNoX',
  'https://h5.youzan.com/v2/feature/3MYTVTrmds',
  'https://h5.youzan.com/v2/feature/95umKc9n5H',
  'https://h5.youzan.com/v2/feature/zkFzrCSn0x',
  'https://h5.youzan.com/v2/feature/PIiKOkMZ8v',
  'https://h5.youzan.com/v2/feature/GASOFe2vDH',
  'https://h5.youzan.com/v2/feature/zoFgiXv7av',
  'https://h5.youzan.com/v2/feature/QOBeBHIsf5',
  'https://h5.youzan.com/v2/feature/cnjgTQgnY1',
  'https://h5.youzan.com/v2/feature/p9YCugFZ2p',
  'https://h5.youzan.com/v2/feature/2EFGcpEf2v',
  'https://h5.youzan.com/v2/feature/rc1MgisoeH',
  'https://h5.youzan.com/v2/feature/XXAmTH8zYD',
]
var youzanurl=[
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DjtR0yvjhgX%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Dswgr6XGCCH%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D3XFnJYIQ7U%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DpHqHXMw0s8%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DuB9s5in5UU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D3M7Sw32F6Z%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DA5NTomN8ZX%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Daw9zzFDhHh%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DINuxsh0ezA%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DE46CJnI70G%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DvyV7ChGUsf%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DoVj3hXDdKz%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DtyR2XFpRvL%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DyWFR8c5b7u%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Dhv6vQZlDwy%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DztkLY7gEqY%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DRW7n3NdcUv%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DRW7n3NdcUv%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DmGlKY1nCUl%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DmGlKY1nCUl%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D7jrplceyHE%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D7jrplceyHE%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DN8uolZSTr1%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DN8uolZSTr1%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DXq8QhQ9ROX%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D83qZ2OSbl2%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DF0c8Q47WMg%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DC7e3c3AZKS%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D0J3ZpE5SEc%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DewF5YdGEyd%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DewF5YdGEyd%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DbyY8Gs02TF%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DbyY8Gs02TF%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DkyMrY7muow%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DkyMrY7muow%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3De2c7cs3hnv%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D2gN4Hiho1l%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DU4YseKhyzQ%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DpifZzct92x%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Do5WQSMVGUz%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Dy8574j8iF6%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D84jWoJ1z8L%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DCZCdD8GIxB%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DRNOgZlE5Y8%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DUUK3Uj8ajf%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D0UKJVRqxBe%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D6HHYt7TNoX%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DI7Zu4p0YmS%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DqM8mjCriBj%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D2VEr27Kq6S%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DkV1cftXbUh%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DjXIWi7tuXy%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DqoEWv6GWRE%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DDWdDN6Za50%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DBwKWZL9z1k%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D1nmvrpzkFW%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DLmYZOMxw7Q%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DBtv2yE2ETR%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D6RNJrmwyDE%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DIMphKN1Ges%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DeyJByUi5rw%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DWKa0NeHhpt%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DKXZh5TOXpG%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DGeg2YcZiyF%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DrWVbyalrZ3%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DMGrhyDMKD1%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DZUsH65m32t%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Du5sZtcUsBX%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DTab3XDDjAw%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DA5NTomN8ZX%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DAyEBYbY5an%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Daw9zzFDhHh%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DINuxsh0ezA%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaOWJk4rEDU%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DRXPHAl3Zoy%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DJIfcgTDfi2%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DaFLamVQ7JY%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DG7R5kX2OaL%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DgM1SzrQEPJ%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DfXkfDyX4EE%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DTGljYCOJ8E%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Dp5alVvGjd8%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D7Oq9MPCYgx%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Dswgr6XGCCH%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DoVj3hXDdKz%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DI2Ts72to56%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D7Oq9MPCYgx%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D7jrplceyHE%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DN8uolZSTr1%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D6OoDy6f1t7%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D0J3ZpE5SEc%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DewF5YdGEyd%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DbyY8Gs02TF%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DkyMrY7muow%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DRW7n3NdcUv%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DmGlKY1nCUl%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DAB2eWUsoqW%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Dnjw9Yafucl%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DA0rFeBkNxu%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Dcp5Sl0L5wj%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DqS3vPjM5e3%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D6HHYt7TNoX%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D3MYTVTrmds%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D95umKc9n5H%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DzkFzrCSn0x%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DPIiKOkMZ8v%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DGASOFe2vDH%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DzoFgiXv7av%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DQOBeBHIsf5%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DcnjgTQgnY1%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Dp9YCugFZ2p%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3D2EFGcpEf2v%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3Drc1MgisoeH%26kdt_id%3D40901908',
'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Ffeature%2Findex%3Falias%3DXXAmTH8zYD%26kdt_id%3D40901908',
]
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function removeItemByIndex(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1, arr.length))
}


function GetRequest(urls, data, callback) {
  wx.showNavigationBarLoading();
  let token = wx.getStorageSync('token')
  let url = host + urls
  // let sessionId = wx.getStorageSync('sessionId')
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      // 'wxa-sessionid': sessionId,
      'token': token
    },
    method: 'GET',
    // dataType: 'json',
    // responseType: 'text',
    success: function(res) {
      // wx.hideLoading()
      wx.hideNavigationBarLoading();
      if (res.data.code == 2) { //token失效
        wx.showToast({
          title: '登录过期，请重新授权登录!',
          icon: 'none',
          image: '',
          duration: 1500,
        });
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/auth/auth',
          });
        }, 1500);
      } else if (res.data.code == 200) { //请求成功
        if (typeof callback === 'function') {
          callback(res.data)
        }
      } else {
        let title = res.data.msg ? res.data.msg : '服务器错误'
        callback(res.data);
        getApp().alert(title)
      }
    },
    fail: function(res) {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 2000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    complete: function(res) {},
  })
}

function PostRequest(urls, data, callback) {
  // wx.showLoading({
  //   title: '加载中',
  // })
  wx.showNavigationBarLoading();
  // let originUrl = url
  // url = wx.getStorageSync('url') + url
  let token = wx.getStorageSync('token')
  let url = host + urls
  // let sessionId = wx.getStorageSync('sessionId')
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      // 'wxa-sessionid': sessionId,
      'token': token
    },
    method: 'POST',
    // dataType: 'json',
    // responseType: 'text',
    success: function(res) {
      // wx.hideLoading()
      wx.hideNavigationBarLoading();
      if (res.data.code == 2) { //token失效失效
        wx.showToast({
          title: '登录过期，请重新授权登录!',
          icon: 'none',
          image: '',
          duration: 1500,
        });
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/auth/auth',
          });
        }, 1500);
      } else if (res.data.code == 200) { //请求成功
        if (typeof callback === 'function') {
          callback(res.data)
        }
      } else {
        let title = res.data.msg ? res.data.msg : '服务器错误'
        callback(res.data);
        getApp().alert(title)
      }
    },
    fail: function(res) {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 2000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    complete: function(res) {},
  })
}
//不需要请求头加上token的请求
function Requestnt(urls, data, method, callback) {
  console.log(data, 'data');

  wx.showNavigationBarLoading();
  let url = host + urls
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: method,
    success: function(res) {
      if (res.data.code == 6) { //完善信息
        wx.showToast({
          title: '用户未注册，即将前往注册',
          icon: 'none',
          duration: 1500,
        });
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/perfectInfo/perfectInfo?phone=' + data.phone,
          });
        }, 1500);

      } else if (res.data.code == 200) {
        callback(res.data)
      }
      wx.hideNavigationBarLoading();
    },
    fail: function(res) {
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    },
    complete: function(res) {},
  })
}
// 获取token的请求
function getToken(data, callback) {
  wx.request({
    url: TokenUrl,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'GET',
    success: function(res) {
      if (res.data.code == 5) {
        wx.showToast({
          title: '需要绑定手机号',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
        });
        wx.setStorageSync('openid', res.data.openid);
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/bindPhone/bindPhone',
          });
        }, 1500);
      } else if (res.data.code == 200) {
        callback(res.data)
      }
    },
    fail: function(error) {
      console.log(error);
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    }
  })
}

function authorizeImage() {
  wx.getSetting({
    success: function(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}

function Request(urls, data, method, callback) {
  wx.showNavigationBarLoading();
  let token = wx.getStorageSync('token')
  let url = host + urls
  // let sessionId = wx.getStorageSync('sessionId')
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      // 'wxa-sessionid': sessionId,
      'token': token
    },
    method: method,
    // dataType: 'json',
    // responseType: 'text',
    success: function(res) {
      // wx.hideLoading()
      wx.hideNavigationBarLoading();
      if (res.data.code != 200) { //服务端session失效

      } else if (res.data.code == 200) { //请求成功
        if (typeof callback === 'function') {
          callback(res)
        }
      } else {
        let title = res.data.msg ? res.data.msg : '服务器错误'
        callback(res);
        getApp().alert(title)
      }
    },
    fail: function(res) {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 2000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    complete: function(res) {},
  })
}
//多个input（使用双数组）判空
function judgeInput(array) {
  for (let params of array) {
    if (!this.showNullToast(...params))
      return false
  }
  return true
}

//判input
function showNullToast(param, tip, reg = '') {
  //判断是否为undefined
  if (typeof param === 'undefined') {
    console.error('判断参数为undefined（未定义）--- from app.js -> showNullToast()')
    return
  }
  //先去掉首尾空格
  if (param !== null)
    param = param.toString().replace(/(^\s*)|(\s*$)/g, "")


  //如有正则，就判断正则
  if (reg && !reg.test(param)) {
    wx.showToast({
      title: tip,
      icon: 'none',
    })
    return false
  }
  //判空
  if (param === null || param === '') {
    console.log(233)
    wx.showToast({
      title: tip,
      icon: 'none',
    })
    return false
  }
  //都通过则输出true
  return true
}

module.exports = {
  formatTime: formatTime,
  Request: Request,
  removeItemByIndex,
  judgeInput: judgeInput,
  showNullToast: showNullToast,
  getToken: getToken,
  Requestnt: Requestnt,
  GetRequest: GetRequest,
  PostRequest: PostRequest,
  host: host,
  pdfUrl: pdfUrl,
  hfiveurl: hfiveurl,
  youzanurl: youzanurl,
}