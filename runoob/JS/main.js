// 隐藏置顶按钮
window.onscroll = function () {
    if (document.documentElement.scrollTop + document.body.scrollTop > 80) {
        document.getElementById("top-btn").style.display = "block";
    }
    else {
        document.getElementById("top-btn").style.display = "none";
    }
}

// 置顶滚动动画
const ScrollTop = (number = 0, time) => {
    if (!time) {
        document.body.scrollTop = document.documentElement.scrollTop = number;
        return number;
    }
    const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime; // 计算循环的次数
    let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
    let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
    let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
            spacingInex--;
            ScrollTop(nowTop += everTop);
        } else {
            clearInterval(scrollTimer); // 清除计时器
        }
    }, spacingTime);
};

// 二级菜单显示
function change(myid, mode){
    document.getElementById(myid).style.display = "none";
    if (mode == "block") {
        document.getElementById(myid).style.display = "block";
    }
    else if (mode == "none") {
        document.getElementById(myid).style.display = "none";
    }
}