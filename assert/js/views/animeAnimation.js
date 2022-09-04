
anime({
    targets: document.querySelector("#welcome-div h1"),
    scale: ['1', '1.1', '1'],
    delay: "2500"
})

setInterval(() => {
    anime({
        targets: Array.from(document.getElementById("responsive-nav").children),
        translateX: ['0', '20px'],
        duration: '1000',
        delay: anime.stagger(100),
        direction: 'alternate'
    })
}, 5000);