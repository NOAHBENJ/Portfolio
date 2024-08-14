function openWindow(id) {
    closeAllWindows();
    
    const win = createWindow(id);
    document.body.appendChild(win);
    positionWindow(win);
}

function createWindow(id) {
    const win = document.createElement('div');
    win.className = 'window';
    win.id = id + '-window';
    var nid;
    if (id == "Macintosh HD") {
        nid = "macintoshhd";
        win.innerHTML = `
            <div class="window-title"><span class="close-btn" onclick="closeWindow('${id}-window')">×</span>${id.charAt(0).toUpperCase() + id.slice(1)}</div>
            <style>
                .inner-icon-bar {
                    position: absolute;
                    left: 20px;
                    top: 40px;
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                }
                .inner-icon {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 80px;
                    margin: 0 30px 10px 0;
                    cursor: pointer;
                }
                .inner-icon-img {
                    width: 50px;
                    height: 50px;
                    background-color: #CCCCCC;
                    border: 1px solid #000;
                    margin-bottom: 5px;
                }
                .inner-icon-text {
                    text-align: center;
                    word-wrap: break-word;
                    max-width: 100%;
                    font-size: 12px;
                }
            </style>
            <div class="inner-icon-bar">
                <div class="inner-icon" onclick="openWindow('portfolio')">
                    <img src="/root/static/media/images/file.png" alt="Portfolio" class="inner-icon-img">
                    <div class="inner-icon-text">Portfolio</div>
                </div>
            </div>
        `; 
    }
    else { 
        nid = id.toLowerCase();
        win.innerHTML = `
            <div class="window-title"><span class="close-btn" onclick="closeWindow('${id}-window')">×</span>${id.charAt(0).toUpperCase() + id.slice(1)}</div>
            <iframe id="${nid}-frame" src="about:blank"></iframe>
        `;
        
        // Load content into iframe after it's added to the DOM
        setTimeout(() => {
            fetch(`/root/html/${nid}.html`)
            .then((res) => res.text())
            .then((text) => {
                const frame = document.getElementById(`${nid}-frame`);
                frame.contentDocument.open();
                frame.contentDocument.write(text);
                frame.contentDocument.close();
            })
            .catch((e) => console.error(e));
        }, 0);
    }
    return win;
}

function positionWindow(win) {
    const windows = document.querySelectorAll('.window');
    win.style.left = `${50 + windows.length * 20}px`;
    win.style.top = `${50 + windows.length * 20}px`;
    win.style.display = 'block';
    win.style.backgroundColor = 'white';
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.remove();
    }
}

function closeAllWindows() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(win => win.remove());
}

// Make windows draggable
document.addEventListener('mousedown', function(e) {
    if (e.target.className === 'window-title') {
        const win = e.target.parentElement;
        const startX = e.clientX - win.offsetLeft;
        const startY = e.clientY - win.offsetTop;

        function moveWindow(e) {
            win.style.left = `${e.clientX - startX}px`;
            win.style.top = `${e.clientY - startY}px`;
        }

        document.addEventListener('mousemove', moveWindow);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moveWindow);
        }, { once: true });
    }
});