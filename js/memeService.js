'use strict'

var gSelectedImg;
var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] }
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: -1,
    lines: []
}
//Delete
function deleteLine() {
    gMeme.lines.splice (gMeme.lines[gMeme.selectedLineIdx], 1);
    // _saveMemeToStorage();
}

function moveLine(diff){
    gMeme.lines[gMeme.selectedLineIdx].txtPositionY -= diff; 
 }

function fontSizeChange(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

// READ
function getImgById(imgId) {
    var ImgObj = gImgs.find(function (ImgObj) {
        return imgId === ImgObj.id;
    })
    return ImgObj;
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function switchMode(mode) {

    var ElImageGallery = document.querySelector('.images-gallery');
    var ElEditor = document.querySelector('.editor');

    if (mode === 'editor') {
        ElImageGallery.style.display = "none";
        ElEditor.style.display = "flex";        
    } else {            
        ElImageGallery.style.display = "flex";
        ElEditor.style.display = "none";
    }
}

function insertTextLine(txt) {
    var yPos;
    switch (gMeme.selectedLineIdx) {
        case -1:
            yPos = 63;
            break;
        case 0:
            yPos = 488;
            break;
        default:
            yPos = 275;
    }
    createNewTextLine(txt, yPos);
}

function createNewTextLine(txt, yPos) {
    gMeme.selectedLineIdx++;
    gMeme.lines.push(
        {
            txt: txt,
            txtPositionX: 270,
            txtPositionY: yPos,
            font: 'impact',
            size: 38,
            align: 'left',
            color: 'white'
        });
    // _saveMemeToStorage();
}

function switchLine(){
    if (gMeme.selectedLineIdx === -1) return;
    gMeme.selectedLineIdx++;
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx % gMeme.lines.length);
}