const arr = [3, 1, 4, 5, 9, 2, 6, 8, 7, 0];

/* 选择排序 */
function fn1() {
  /* 选择排序 */
  let temp;

  // 依次选择椅子
  for (let p = 0; p <= arr.length - 2; p++) {
    // 选中第0位 将最小的元素置换到第0位
    let smallest = arr[p];
    let smallestIndex = p;
    for (let i = p; i < arr.length; i++) {
      if (arr[i] < smallest) {
        smallest = arr[i];
        smallestIndex = i;
      }
    }

    temp = arr[p];
    arr[p] = smallest;
    arr[smallestIndex] = temp;
  }
  console.log(arr);
}
// fn1();

/* 冒泡排序 */
function fn2() {
  let temp;

  /* 外层循环由8递减为0 */
  for (let j = arr.length - 2; j >= 0; j--) {
    /* 通过相邻元素元素两两冒泡 将最大元素冒泡到末尾 */
    for (let i = 0; i <= j; i++) {
      if (arr[i] > arr[i + 1]) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  console.log(arr);
}
// fn2();