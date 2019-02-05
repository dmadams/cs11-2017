// Takes an element, style name, and desired value. If the current value of the
// style has not been set, sets the style to the value passed in. Otherwise,
// disables the style.
function toggleStyle(element, styleName, value) {
    if (element[styleName]) {
        element[styleName] = '';
    }
    else {
        element[styleName] = value;
    }
}

// Called when form is submitted. Takes the value in the 2 input boxes and 
// concatenates them with a space inbetween. Output is shown as response. 
function onFormSubmit(event) {
    event.preventDefault();
    var form = event.target;

    response.innerText = form.foo.value + ' ' + form.bar.value;
}

// Called on click of button labeled "Or Click Me!". Takes the value in the 2 
// input boxes and provides a window alert using the alert() method of the
// values contained in the input boxes.
function formAlert(event) {
    var form = event.target.form;
    alert('foo: ' + form.foo.value + '\nbar: ' + form.bar.value);
}

// Called on click of button labeled "Button 1". Toggles whether or not the box
// is visible.
function toggleBox(event) {
    var box = document.getElementById("box");
    toggleStyle(box.style, 'display', 'none');
}

// Called on click of button labeled "Button 2". Rotates the color of the box
// from red to blue to green.
function rotateColors(event) {
    var box = document.getElementById("box");
    if (box.style.backgroundColor === 'red') {
        box.style.backgroundColor = 'blue';
    }
    else if (box.style.backgroundColor === 'blue') {
        box.style.backgroundColor = 'green';
    }
    else if (box.style.backgroundColor === 'green') {
        box.style.backgroundColor = 'red';
    }
}

// Called when any of the buttons with HTML tags as labels are clicked. Toggles
// varying styles from default of the corresponding tags in the div that
// immediately follows the buttons.
// Clicking the "<b> tags" button will toggle the text color of all <b> tags to 
// red. 
// Clicking the "<i> tags" button will toggle the background color of all <i>
// tags to gray. 
// Clicking the "<u> tags" button will toggle the border of all <u> tags to a
// 1px thick, solid blue border. 
function onTagButtonClick(event) {
    var element = event.target;
    var tagsEl = document.getElementById("tags");
    var children = tagsEl.children;
    if (element.id === 'bold-btn') {
        for (var i = 0; i < children.length; i ++){
            if (children[i].localName === 'b') {
                toggleStyle(children[i].style, 'color', 'red');
            }
        }
    }
    else if (element.id === 'italic-btn') {
        for (var i = 0; i < children.length; i ++){
            if (children[i].localName === 'i') {
                toggleStyle(children[i].style, 'background-color', 'gray');
            }
        }
    }
    else if (element.id === 'underline-btn') {
        for (var i = 0; i < children.length; i ++){
            if (children[i].localName === 'u') {
                toggleStyle(children[i].style, 'border', '1px solid blue');
            }
        }
    }
}

// Initializes a canvas.
function initCanvas() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = '#ddd';
    ctx.clearRect(0,0,600,300)
    ctx.fillRect(0,0,600,300);
}

// Generates a random color.
function randomColor() {
    var r = (Math.random() * 256 | 0).toString(16);
    var g = (Math.random() * 256 | 0).toString(16);
    var b = (Math.random() * 256 | 0).toString(16);
    return "#" + r + g + b;
}

// Draws a random box where you click on the canvas. Box will have a random
// color, a width between 50px and 200px, and a height between 50px and 100px.
function drawBox(e) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    // Firefox doesn't set offsetX/offsetY.
    if(!e.hasOwnProperty('offsetX')) {
    e.offsetX = e.layerX - e.currentTarget.offsetLeft;
    e.offsetY = e.layerY - e.currentTarget.offsetTop;
    }
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    ctx.fillStyle = randomColor();
    ctx.fillRect(mouseX, mouseY, Math.floor(Math.random()*150)+50, Math.floor(Math.random()*50)+50);
}
