const strtTimeBtn = document.getElementById('start-time-btn');
const pausTiemBtn = document.getElementById('pause-time-btn');

strtTimeBtn.addEventListener("mouseenter", () => {
    strtTimeBtn.textContent = '▶︎';
})
strtTimeBtn.addEventListener("mouseleave", () => {
    strtTimeBtn.textContent = 'Junbi dekita?';
})
strtTimeBtn.addEventListener("click", () => {
    strtTimeBtn.style.display = 'none';
    pausTiemBtn.style.display = 'block';
})



pausTiemBtn.addEventListener("mouseenter", () => {
    pausTiemBtn.textContent = '||';
})
pausTiemBtn.addEventListener("mouseleave", () => {
    pausTiemBtn.textContent = 'Ganbare!';
})
pausTiemBtn.addEventListener("click", () => {
    strtTimeBtn.style.display = 'block';
    pausTiemBtn.style.display = 'none';
})