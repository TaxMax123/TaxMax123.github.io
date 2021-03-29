function cellSelected(e){
    e = e || window.event; 
    let elem = e.target
    if (elem.parentElement.classList.contains("game-cell"))
        if (elem.parentElement.classList.contains("cell-selected"))     elem.parentElement.classList.remove("cell-selected")
        else        elem.parentElement.classList.add("cell-selected")
    else
        if (elem.classList.contains("cell-selected"))       elem.classList.remove("cell-selected")
        else        elem.classList.add("cell-selected")
}

function buttonClickBind(e){
    e = e || window.event;
    let num
    if (e.target.parentElement.classList.contains('cls'))   num = ''
    else    num = e.target.innerHTML
    let elem = document.getElementsByClassName("cell-selected")[0]
    if (elem) elem.getElementsByClassName("cell-value")[0].innerHTML = num
}

function highlightRow(e){
    e = e || window.event; 
    let row
    if (e.target.parentElement.classList.contains("game-cell"))     row = e.target.parentElement.classList[1]
    else        row = e.target.classList[1]
    let elems = document.getElementsByClassName(row)
    Array.prototype.forEach.call(elems, function hR(elems){
        elems.classList.add("cell-highlight")   }   )
}

function highlightCol(e){
    e = e || window.event;
    let col
    if (e.target.parentElement.classList.contains("game-cell"))     col = e.target.parentElement.classList[2]
    else    col = e.target.classList[2]
    let elems = document.getElementsByClassName(col)
    Array.prototype.forEach.call(elems, function hC(elems){
        elems.classList.add("cell-highlight")   }   )
}

function highlightSquare(e){
    e = e || window.event;
    let sqr
    if (e.target.parentElement.classList.contains("game-cell"))     sqr = e.target.parentElement.classList[3]
    else    sqr = e.target.classList[3]
    let elems = document.getElementsByClassName(sqr)
    Array.prototype.forEach.call(elems, function hS(elems){
        elems.classList.add("cell-highlight")   }   )
}

function removeSelectedAndHighlight(){
    let elem = document.getElementsByClassName("game-cell")
    Array.prototype.forEach.call(elem, function rSaH(elem){
        if( elem.classList.contains("cell-selected")){
            elem.classList.remove("cell-selected")
            elem.classList.remove("cell-highlight")
        }
        else if (elem.classList.contains("cell-highlight"))
            elem.classList.remove("cell-highlight")
    })
}

function cellValueClear(){
    let elem = document.getElementsByClassName("cell-value")
    Array.prototype.forEach.call(elem, function cVC(elem){
        elem.innerHTML = '' }   )
}

function preSubmitCheckIfEmpty(){
    let hasValues = 0
    let elem = document.getElementsByClassName("cell-value")
    Array.prototype.forEach.call(elem, function pSCIE(elem){
        if (elem.innerHTML != '') hasValues ++  }   )
    if (hasValues == 0) return false
    return true
}

function preSubmitCheckRows(){
    for (let rowNumber = 1; rowNumber<10; rowNumber++){
        let elem = document.getElementsByClassName("row-"+rowNumber)
        if (hasDuplicateInArray(elem)){
            alert("ERROR: duplicates in row " + rowNumber + "\nSubmit canceled")
            return false
        }
    }    
    return true
}

function preSubmitCheckCols(){
    for (let colNumber = 1; colNumber<10; colNumber++){
        let elem = document.getElementsByClassName("column-"+colNumber)
        if (hasDuplicateInArray(elem)){
            alert("ERROR: duplicates in column " + colNumber + "\nSubmit canceled")
            return false
        }
    } 
    return true
}

function preSubmitCheckSqrs(){
    for (let sqrNumber = 1; sqrNumber<10; sqrNumber++){
        let elem = document.getElementsByClassName("square-"+sqrNumber)
        if (hasDuplicateInArray(elem)){
            alert("ERROR: duplicates in square " + sqrNumber + "\nSubmit canceled")
            return false
        }
    } 
    return true
}

function hasDuplicateInArray(arr) {
    let cpyArr = [];
    let cpyArrSize = 0;
    let duplc = 0
    Array.prototype.forEach.call(arr, function hDIA(arr){
        let elem = arr.getElementsByClassName("cell-value")[0].innerHTML
        for (let i=0; i<cpyArrSize; i++)
            if (cpyArr[i] == elem && elem)
                duplc ++
        cpyArr[cpyArrSize] = elem;
        cpyArrSize ++;
    })
    if (duplc) return true;
    return false
 
}

function generateSudokuCode(){
    let sudokuCode
    let elem = document.getElementsByClassName("cell-value")
    Array.prototype.forEach.call(elem, function gSC(elem){
        if (elem.innerHTML)     sudokuCode = sudokuCode + elem.innerHTML
        else    sudokuCode = sudokuCode + '.'
    })
    return sudokuCode
}

function submit(){
    let ltrs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    let sudokuCode = generateSudokuCode()
    sudokuCode = solve(sudokuCode)
    for (let i=0; i<9; i++)
        for (let j=1; j<10; j++){
            let elem = document.getElementById(ltrs[i]+j)
            elem.getElementsByClassName("cell-value")[0].innerHTML = sudokuCode[ltrs[i]+j]   
        }
}

function keybordNumberBinding(e){
    let keys = {
        49: 1, 50: 2, 51: 3, 52: 4,  53: 5,  54: 6,  55: 7,  56: 8,  57: 9,  // 0-9
        97: 1, 98: 2, 99: 3, 100: 4, 101: 5, 102: 6, 103: 7, 104: 8, 105: 9, // num0 - num9
        8: '', 13: preSubmitCheck, 27: cellValueClear                         // backspace, enter, escape 
    }
    e = e || window.event;
    if (keys[e.keyCode] || e.keyCode == 8){
        let num
        if (e.keyCode == 13){
            keys[e.keyCode]()
            return 
        }
        else if (e.keyCode == 27){
            keys[e.keyCode]()
            return
        }
        else
            num = keys[e.keyCode]
        let elem = document.getElementsByClassName("cell-selected")[0]
        if (elem) elem.getElementsByClassName("cell-value")[0].innerHTML = num
    }
}

function keyboardArrowBinfing(e){
    let keys = {    37: arrowLeft,  38: arrowUp,    39: arrowRight,     40: arrowDown   }
    e = e || window.event;
    if (keys[e.keyCode]){
        let cS = document.getElementsByClassName("cell-selected")
        if (cS.length != 0) keys[e.keyCode](cS[0].classList)        
    }
}

function arrowLeft(cS){
    let newRow
    if (cS[2] == 'column-1') newRow = 'column-9'
    else newRow = 'column-'+(parseInt(cS[2].split('-')[1], 10)-1)
    cellSelectById(document.getElementsByClassName(cS[1] +' '+ newRow)[0].id)
}

function arrowUp(cS){
    let newCol
    if (cS[1] == 'row-1') newCol = 'row-9'
    else newCol = 'row-'+(parseInt(cS[1].split('-')[1], 10)-1)
    cellSelectById(document.getElementsByClassName(cS[2] +' '+ newCol)[0].id)
}
        
function arrowRight(cS){
    let newRow
    if (cS[2] == 'column-9') newRow = 'column-1'
    else newRow = 'column-'+(parseInt(cS[2].split('-')[1], 10)+1)
    cellSelectById(document.getElementsByClassName(cS[1] +' '+ newRow)[0].id)
}
        
function arrowDown(cS){
    let newCol
    if (cS[1] == 'row-9') newCol = 'row-1'
    else newCol = 'row-'+(parseInt(cS[1].split('-')[1], 10)+1)
    cellSelectById(document.getElementsByClassName(cS[2] +' '+ newCol)[0].id)
}

function cellSelectById(id){
    removeSelectedAndHighlight()
    let elem = document.getElementById(id)
    elem.classList.add('cell-selected')
    let elems = document.getElementsByClassName(elem.classList[1])
    Array.prototype.forEach.call(elems, function hR(elems){
        elems.classList.add("cell-highlight")   }   )
    elems = document.getElementsByClassName(elem.classList[2])
    Array.prototype.forEach.call(elems, function hC(elems){
        elems.classList.add("cell-highlight")   }   )
    elems = document.getElementsByClassName(elem.classList[3])
    Array.prototype.forEach.call(elems, function hS(elems){
        elems.classList.add("cell-highlight")   }   )
    
}

function elementBind(){
    let elem 
    elem = document.getElementsByClassName("item-btn")
    Array.prototype.forEach.call(elem, function adel(elem)  {
        elem.addEventListener("click", onClickButtonBind, false)    }   )
    elem = document.getElementsByClassName("game-cell")
    Array.prototype.forEach.call(elem, function oCCB(elem)  {
        elem.addEventListener("click", onClickCellBind, false)  }   )
    document.getElementsByClassName("cancel")[0].addEventListener("click", cellValueClear, false)
    document.getElementsByClassName("submit")[0].addEventListener("click", preSubmitCheck, false)
    document.addEventListener("keydown", documentBind, false)
}

function onClickCellBind(){
    removeSelectedAndHighlight()
    cellSelected()
    highlightRow()
    highlightCol()
    highlightSquare()
}

function onClickButtonBind(){
    buttonClickBind()
}

function preSubmitCheck(){
    if (preSubmitCheckIfEmpty())
        if (preSubmitCheckRows())
            if (preSubmitCheckCols())
                if (preSubmitCheckSqrs())
                    submit()
}

function documentBind(){
    keybordNumberBinding()
    keyboardArrowBinfing()
}

window.onload = init()
function init(){
    elementBind()
}