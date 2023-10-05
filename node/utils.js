/*let i=0;
const sayHi=(name)=>
{
    console.log(i++ +` ${name}`);
}
const lodash =require('lodash')

const items =[1,[2,[3]]]
const newItems= lodash.flattenDeep(items)
console.log(items,newItems)
*/
// function join(t, a, s) {
//     function format(m) {
//         let f = new Intl.DateTimeFormat('en', m);
//         return f.format(t);
//     }
//     return a.map(format).join(s);
// }

let offset = new Date().getTimezoneOffset()*60*1000;
let mytime = new Date().getTime()-offset;
export let s=(new Date(mytime).toISOString().split('T')[0]);

//let a = [{year: 'numeric'}, {month: 'numeric'}, {day: 'numeric'}];
//let s = join(new Date, a, '-');
console.log(s);

export function hash (date,password) {
    let time = new Date(date).getTime();
    let i=0;
    // let encoded = (password.charCodeAt(0)+password.charAt(0)+time);
    let f_encript=0;
    for(i;i<password.length;i++)
    {
        let encoded = (password.charCodeAt(i)*(time/(password.length)/100000));
        f_encript=encoded+f_encript;
    }
    let final=(password.charAt(0)+f_encript+password.charAt(password.length/2));
    return(final);
}