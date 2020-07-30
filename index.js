const arr = [
    ['*', '*', '*', '*', '*'],
    ['*', '', '*', '', ''],
    ['*', '*', '', '', '*'],
    ['*', '*', '', '', '*'],
    ['*', '', '', '', '*'],
    ['*', '*', '*', '*', '*']
]
const arr_2 = [
    ['*', '*', '*', '*', '*'],
    ['*', '', '*', '', ''],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '', '', '*'],
    ['*', '', '', '', '*'],
    ['*', '*', '*', '*', '*']
]
const arr_3 = [
    ['*', '*', '*', '*', '*'],
    ['*', '', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '', '', '*'],
    ['*', '', '', '', '*'],
    ['*', '*', '*', '*', '*']
]
const arr_4 = [
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*'],
    ['*', '*', '', '', '*'],
    ['*', '', '', '', '*'],
    ['*', '*', '*', '*', '*']
]
const arr_5 = [
    ['*', '*', '*', '*', '*'],
    ['*', '', '', '', ''],
    ['*', '*', '', '', '*'],
    ['*', '*', '*', '', '*'],
    ['*', '', '', '', '*'],
    ['*', '*', '*', '*', '*']
]
const arr_6 = [
    ['', '*', '', '*', ''],
    ['*', '', '*', '', '*'],
    ['', '*', '*', '', '*'],
    ['*', '*', '*', '', '*'],
    ['', '*', '*', '', '*'],
    ['*', '*', '*', '', '*'],
    ['', '', '', '', '*']
]
const testTop = ({ i, j }, flags) => {
    const top = i > 0 ? flags[i - 1][j] : {
        space: false,
        spaceIndex: 0
    }
    return top
}
const testLeft = ({ i, j }, flags) => {
    const left = j > 0 ? flags[i][j - 1] : {
        space: false,
        spaceIndex: 0
    }
    return left
}
const testNeighbor = ({ i, j }, flags) => {
    let top = testTop({ i, j }, flags)
    let left = testLeft({ i, j }, flags)

    const {
        min: minIndex,
        max: maxIndex
    } = compare(top.spaceIndex, left.spaceIndex);
    return {
        minIndex,
        maxIndex,
        has: top.space || left.space
    }
}
const compare = (a, b) => {
    let min, max
    if (a && b) {
        min = a > b ? b : a
        max = a < b ? b : a
    } else {
        min = a || b
        max = a || b
    }
    return {
        min,
        max
    }
}

const countSpace = (arr) => {
    const m = arr.length
    const n = arr[0].length
    const flags = Array(m)
    let total = 0
    for (i = 0; i < m; i++) {
        flags[i] = Array(n)
        for (j = 0; j < n; j++) {
            flags[i][j] = {
                space: false,
                spaceIndex: 0
            }
            if (arr[i][j] !== '*') {
                flags[i][j].space = true;
                const {
                    has,
                    minIndex,
                    maxIndex
                } = testNeighbor({ i, j }, flags)
                if (has) {
                    flags[i][j].spaceIndex = minIndex
                    total = (minIndex !== maxIndex) ? maxIndex - 1 : total
                } else {
                    total++
                    flags[i][j].spaceIndex = total
                }
                // console.log(i, j, total,flags[i][j].spaceIndex)
            }
        }
    }
    console.log(total)
}

countSpace(arr)//2
countSpace(arr_2)//3
countSpace(arr_3)//2
countSpace(arr_4)//1
countSpace(arr_5)//1
countSpace(arr_6)//7

/* 伪代码
if (current.space) {
    if (top.space || left.space) {//有邻近space
        current.spaceIndex = min(top.spaceIndex, left.spaceIndex)//因为合并了，所以当前space的Index取邻居最小
        //如果邻居俩的spaceIndex不一致，才需要重算total，如果一致total保持原样
        if (top.space && left.space && top.spaceIndex !== left.spaceIndex) {
            total = max(top.spaceIndex, left.spaceIndex) - 1//因为合并，所以需要-1，用max减，原因是max可能与min差很多，而当前只抵消了一个
        }
    } else {//没有邻居所以total++，且current.spaceIndex=新的total
        total++
        current.spaceIndex = total
    }
}*/
