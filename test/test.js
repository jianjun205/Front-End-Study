// 
function reverse(arr) {
    var temp = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        temp.push(i);
    }
    return temp;
}
// //冒泡排序
function sort(arr) {
    for (i = 0; i < arr.length - 1; i++) {
        var flag = true;
        for (j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = false;
            }
        }
        if (flag) {
            break;
        }
    }
    return arr;
}
Array.prototype.unique = function () {
    var obj = {}
    var res = []
    for (var i = 0; i < this.length; i++) {
        if (!obj[this[i]]) {
            res.push(this[i])
            obj[this[i]] = 1
        }
    }
    return res;
}
    // var length = 10;
    // function fn() {
    //     console.log(this.length);
    // }
    // var obj = {
    //     length: 5,
    //     method: function (f) {
    //          f();

    //         // arguments[0]();
    //         // arguments[0].call(this);
    //     }
    // }
    // obj.method(fn);

    // function name(x,y){
    //     console.log(x+y)
    // }
    // var name=(x,y)=>x+y;
    // console.log(name(1,2))

    // var str = "123456";
    // console.log(str.split("").reverse().join(""))

    // console.log([...str].reverse().join(""));

    // var arr =[{id:2,name:"wokao"},{id:6,name:"sb"}]
    // // let str
    // // var ids=[]
    // // arr.forEach((item)=>{
    // //     ids.push(item.id)
    // // })
    // // console.log(str=ids.join(","))
    // arr.splice(0,1)
    // console.log(arr)

    //  var arr1 = [1, 2, 3, 4, 5];
    //  var arr2 = [1, 2, 5, 7, 9];
    //  var res = []
    //  var obj = {}
    // arr1.concat(arr2).forEach(function (p) {
    //     if (!obj[p]) {
    //         obj[p] = 1
    //     }else{
    //         res.push(p)
    //     }
    // })
    //  console.log(res) ;

    
    (function () {
        var i = 0;
        return function () {
            i++
            console.log(i)
        }()
    }())
