function updateLog(element) {
    let _width = window.innerWidth;
    let _mention = 'None';

    if (_width >= 1400) _mention = 'xxl (Extra extra large)';
    else if (_width >= 1200) _mention = 'xl (Extra large)';
    else if (_width >= 992) _mention = 'lg (Large)';
    else if (_width >= 768) _mention = 'md (Medium)';
    else if (_width >= 576) _mention = 'sm (Small)';

    element.innerText = `${window.innerWidth}px - ${_mention}`;
}

let logdiv = document.createElement('div');
logdiv.style = 'background-color: black; color: white; margin: 0; padding: 0; text-align: center';
document.body.prepend(logdiv)
updateLog(logdiv);	

window.addEventListener('resize', () => {updateLog(logdiv)});