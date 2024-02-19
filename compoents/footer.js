// properActivation = 1

document.querySelector('#footer').innerHTML = `<div class="navigator">
<a href="index.html" class="nav-item ${ properActivation == 0 ? 'activate' : ''}">
    <div class="nav-icon">
        <img src="./assets/svg/首页.svg" alt="Home">
    </div>
    <div class="nav-title">主页</div>
</a>
<a href="mem.html" class="nav-item ${ properActivation == 1 ? 'activate' : ''}">
    <div class="nav-icon">
        <img src="./assets/svg/商品.svg" alt="Home">
    </div>
    <div class="nav-title">摩斯</div>
</a>
<a href="settings.html" class="nav-item ${ properActivation == 2 ? 'activate' : ''}">
    <div class="nav-icon">
        <img src="./assets/svg/设置.svg" alt="Home">
    </div>
    <div class="nav-title">设置</div>
</a>
</div>`;