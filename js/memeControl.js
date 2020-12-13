'use strict'
var gCanvas;
var gCtx;
console.log('hello');

function init() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    createGalary();
}

function onSwitchLine() {
    switchLine();
    renderMeme();
}

function onChooseImg(imgId) {
    gMeme.selectedImgId = +imgId;
    switchMode('editor');
    renderMeme();
}

function renderMeme() {
    drawImg(gMeme.selectedImgId);
}

function drawImg(selectedImgId) {
    var img = new Image();
    var selectedImg = getImgById(selectedImgId);
    img.src = selectedImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
        renderTexts();
    }
}

function renderTexts() {

    if (gMeme.selectedLineIdx === -1) return;

    for (let lineIdx = 0; lineIdx < gMeme.lines.length; lineIdx++) {
        var xOffset = gMeme.lines[lineIdx].txtPositionX;
        var yOffset = gMeme.lines[lineIdx].txtPositionY;
        drawText(lineIdx, xOffset, yOffset);
    }

    var x = gMeme.lines[gMeme.selectedLineIdx].txtPositionX - 245;
    var y = gMeme.lines[gMeme.selectedLineIdx].txtPositionY - 42;
    drawRect(x, y);
}

function drawText(lineIdx, x, y) {
    gCtx.font = `${gMeme.lines[lineIdx].size}px ${gMeme.lines[lineIdx].font}`;
    gCtx.textAlign = `${gMeme.lines[gMeme.selectedLineIdx].align}`;
    gCtx.fillStyle = `${gMeme.lines[lineIdx].color}`;
    var text = `${gMeme.lines[lineIdx].txt}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(text, x, y);
}

function onChangeFont(selectedFont) {
    gMeme.lines[gMeme.selectedLineIdx].font = `${selectedFont}`;
    renderMeme();

}

function onModifyFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    renderMeme();

}

function onAlignText(alignTo) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignTo;
    renderMeme();
}

function onInsertTextLine(word) {
    insertTextLine(word);
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    renderMeme();
    gMeme.selectedLineIdx--;
}

function onMoveLine(diff) {
    moveLine(diff);
    renderMeme();
}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'blue'
    gCtx.rect(x, y, 490, 65) // x,y,width,height
    gCtx.stroke()
}

function createGalary() {
    var strHtmls = gImgs.map(function (imgObj) {
        return `<img src="${imgObj.url}" onclick="onChooseImg('${imgObj.id}')">`
    })
    document.querySelector('.images-gallery').innerHTML = strHtmls.join('');
}

function onOpenGalary() {
    switchMode('galary');
}

function onFontSizeChange(diff) {
    fontSizeChange(diff);
    renderMeme();
}

