let titles = document.querySelectorAll("section > h2");
Array.from(titles).forEach(element => {
    element.setAttribute("data-aos", "fade-right");
    element.setAttribute("data-aos-delay", "600");
    element.setAttribute("data-aos-duration", "1000");
});