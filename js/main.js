window.addEventListener("load", (_) => {
    const canvas = new Canvas2D(
        document.querySelector('.canvas-container'),
        {width: 300, height: 300}
    );
    const canvas1 = new Canvas2D(
        document.querySelector('.canvas-container'),
        {width: 300, height: 300}
    );
    canvas.drawLine(0,0,50,0)
    canvas.drawLine(0,100,50,100)
    canvas.drawLine(0,0,0,100)
    canvas.drawLine(50,0,50,100)

    canvas1.drawLine(50,50,0.43301270189221935, 0.24999999999999997)
    canvas1.drawLine(100, 86.60254037844387+50, 93.30127018922194+50, 61.60254037844386+50)
    canvas1.drawLine(50,50,143.30127018922194, 111.60254037844386)
    canvas1.drawLine(100, 86.60254037844387+50,0.43301270189221935, 0.24999999999999997)
});
// // class Person {
// //     firstnamez
// //     age
// //     next; // Person
// //     constructor(firstname, age, next) {
// //         this.firstname = firstname
// //         this.age = age
// //         this.next = next
// //     }
// // }

// // const Alisa = new Person("Alisa", 4, null);
// // const Daryna = new Person("Daryna", 12, Alisa);
// // const Kate = new Person("Kate", 34, Daryna);
// // const Oleg = new Person("Oleg", 38, Kate);
// // let person = Oleg
// // while (person != null) {
// //     let age = person.age;
// //     console.log(age)
// //     person = person.next
// // }
// class LinkedList {
//     head;
//     size;
//     // add(val){
//     //     this.head.next = val;
//     //     val.next = null;

//     // }
//     // get(idx){
//     //     let currentValNext = head;
//     //         for(let i = 0; i < idx; i++){

//     //             currentValNext = this.currentValNext.next;
//     //         }
//     //     return currentValNext;
//     // }
//     // size(){
//     //     let currentValNext = head;
//     //     for(let i = 0; currentValNext !=null; i++){
//     //         currentValNext = this.currentValNext.next;
//     //     }
//     //     return i;
//     // }
//     add(val) {
//         const newElement = new Node(val, null);
//         if (!this.head) {
//             this.head = newElement;
//         }
//         let currentElement = this.head;
//         while (currentElement.next) {
//             currentElement = currentElement.next;
//         }
//         currentElement.next = newElement;
//         this.listLength++;
//     }
//     get(idx) {
//         let currentElement = this.head;
//         let currentIdx = 0;
//         while (currentIdx <= idx) {
//             currentElement = currentElement.next;
//             currentIdx++;
//             if (currentIdx = idx)
//                 return currentElement;
//         }
//     }
//     size() {
//         return this.listLength;
//     }

// }
// const list = new LinkedList()
// console.log(list.size);
// class Node {
//     val;
//     next;
//     constructor(val, next) {
//         this.val = val;
//         this.next = next;

//     }
// }
// const a = new LinkedList();
// console.log(a.size());
// console.log(a.add('5'));
// console.log(a.get(1));
// console.log(a.size());
// console.log(a.add('10'));
// console.log(a.get(1));
// console.log(a.get(2));
// console.log(a.size());
// console.log(a.get(1));
class Vector {
    numbers;
    constructor(numbers) {
        this.numbers = numbers;
    }
    times(numberOfTimes) {
        const output = [];
        for (let i = 0; i < this.numbers.length; i++) {
            output.push(this.numbers[i] * numberOfTimes)
        }
        return new Vector(output);
    }
    add(v) {
        const output = [];
        const secondSummand  = v.asArray();
            for (let i = 0; i < this.numbers.length; i++) {
            output.push(this.numbers[i] + secondSummand[i])

        }
        return new Vector(output);
    }
    subtract(subtrahend) {
        return this.add(subtrahend.times(-1))

    }
    asArray() {
        return this.numbers
    }
}


// const rotatedX = Math.cos(Math.asin(Math.sqrt(Math.pow(x,2)+ Math.pow(y,2))*(1/x))) * Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
// const rotatedY = Math.sin(Math.asin(Math.sqrt(Math.pow(x,2)+ Math.pow(y,2))*(1/x))) * Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
console.log("("+rotate(0,-1,30).x+", "+rotate(0,-1,30).y+")")
console.log("("+rotate(0.5,-1,30).x+", "+rotate(0.5,-1,30).y+")")
console.log("("+rotate(0.5,0,30).x+", "+rotate(0.5,0,30).y+")")
// console.log(rotate(0.5,1,30))
// console.log(rotate(0.5,0,30))
function rotate(x, y, angle){
    const a = Math.pow(x, 2);
    const b = Math.pow(y, 2);
    const c = Math.sqrt(a + b);
    const rotatedX = Math.cos(Math.asin(y/c) + degreesToRadians(angle)) * c;
    const rotatedY =  Math.sin(Math.asin(y/c) + degreesToRadians(angle)) * c;
    return {x:rotatedX, y:rotatedY}
}

// class Matrix {
//     vectors;
//     constructor(vectors){
//         this.vectors = vectors;
//     }
//     add(a){
//         const translated = [];
//         for (let i = 0; i < this.vectors.length; i++) {
//             translated.push(this.vectors[i].add(a))
//         }
//         return new Matrix(translated);
//     }
//     asArray(){
//         return this.vectors
//     }
// }

// const b = new Matrix([new Vector([1,2]), new Vector(3,4)])
// const c = [5,5]
// console.log(b.add(c))
//console.assert(isArraysEqual(b.add(c).asArray,) "Expected 6,7")
// const v1 = new Vector([])
// const v2 = new Vector([1, 1])
// const actualV = v2.times(3).asArray();
// // console.assert(isArraysEqual([3, 3], actualV), "Expected [3,3] after multiplication");

// const i1 = new Vector([1, 2]);
// const i2 = new Vector([2, 0]);
// const actualI = i1.add(i2).asArray();
// // console.assert(isArraysEqual([3,2], actualI), "Expected [3,2] after addition");
// const s1 = new Vector([1, 2]);
// const s2 = new Vector([10,1]);
// const actualS = s1.subtract(s2).asArray();
// // console.assert(isArraysEqual([-9, 1], actualS), "Expected [3,2] after subtraction");

// const center = new Vector([0.5,1])
// const a0 = new Vector([0,0])
// const a1 = new Vector([0.5, 1])
// const a2 = new Vector([1, 0])
// const a3 = new Vector([0.25, 0.5])
// const a4 = new Vector([0.75, 0.5])

// const b0 = a0.subtract(center).asArray();
// const b1 = a1.subtract(center).asArray();
// const b2 = a2.subtract(center).asArray();
// const b3 = a3.subtract(center).asArray();
// const b4 = a4.subtract(center).asArray();

// const a = Math.sqrt(Math.pow(0.25,2) + Math.pow(0.5,2));
// const b = Math.sqrt(Math.pow(0.5,2) + Math.pow(1,2));
// const c = degreesToRadians(67.5+180+80);
// const c0 = new Vector([0.9429403022397213, -0.6007192242737562])
// const c1 = new Vector([0,0]);
// const c2 = new Vector([1.0936022636345566, 0.23245233699271345]);
// const c3 = new Vector([0.4714701511198606, -0.3003596121368781]);
// const c4 = new Vector([0.5468011318172783, 0.11622616849635672]);

// const d0 = c0.add(center).asArray();
// const d1 = c1.add(center).asArray();
// const d2 = c2.add(center).asArray();
// const d3 = c3.add(center).asArray();
// const d4 = c4.add(center).asArray();

// console.log(d0);
// console.log(d1);
// console.log(d2);
// console.log(d3);
// console.log(d4);
function degreesToRadians(degree) {
    return degree * Math.PI / 180;
}
function isArraysEqual(arr1, arr2) {
    if (arr1 === arr2)
        return true;
    if (arr1.length !== arr2.length)
        return false;
    for (let i = 0; i < arr1.length; i++)
        if (arr1[i] !== arr2[i])
            return false
    return true;
}