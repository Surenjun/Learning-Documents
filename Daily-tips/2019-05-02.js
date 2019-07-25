//无形装逼 最为致命

//1.日历
[...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));

//2.生成随机ID
Math.random().toString(36).substring(2);

//3.获取URL的查询参数
// ?foo=bar&baz=bing => {foo: bar, baz: bing}
let q = {};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);

//4.随机数组
//(arr) => arr.slice().sort(() => Math.random() - 0.5)

//5.创建特定大小的数组
//[...Array(3).keys()];

//6.返回一个键盘（惊呆了）
/*(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)()*/



