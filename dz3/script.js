var str = "'aaaa' 'bbbb  ' 'cccc' 'dddd ffff hhhh' 'gggg's kkkk'"
var str1 = str.replace(/\'/gi, '"');
console.log('По первому заданию выражение выглядит, как ' +str1);
//var str2 = str.replace(/(\'\s|\s\')/g, '"');
//console.log('str2= ' +str2);
//var str3 = str2.replace( /\s\'/g, '"');
//console.log('str3= ' +str3);
//var str3 = str.replace(/\w[a-z]'\s/gi || /\s'\w/gi || /\s'\s/, '"');
//console.log('str3= ' +str3);/\s\'/gi ||/^'/g || (\'\s | \s\')/g*/

