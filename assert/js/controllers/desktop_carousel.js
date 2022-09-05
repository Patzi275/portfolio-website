
class CaroItem {
    constructor(background_url, height = "10vw", width="20vw") {
        let a = document.createElement("a");
        let div = document.createElement("div");
        this.a = a;
        this.div = div; 
        a.appendChild(div);

        this.init_css();
        if (background_url)
            this.background_url = background_url;
    }

    init_css() {
        this.div.style.backgroundPosition = "center center";
        this.div.style.backgroundSize = "cover";
    }

    fade_in(from_up = true) {
        anime({
            targets: this.node,
            translateY: from_up ? ['-50px', '0px'] : ['50px', '0px'],
            opacity: ['20%', '70%'],
            duration: '500',
        })
    }

    fade_out(from_up = true) {
        anime({
            targets: this.node,
            translateY: from_up ? ['-50px', '0px'] : ['50px', '0px'],
            opacity: ['70%', '20%'],
            duration: '500',
        })
    }

    grow_more(from_up = true) {
        anime({
            targets: this.node,
            translateY: from_up ? ['-80px', '0px'] : ['80px', '0px'],
            scale: ['1', '1.5'],
            opacity: ['70%', '100%'],
            duration: '500',
            zIndex: ['1', '1']
        })
    }

    grow_less(from_up = true) {
        anime({
            targets: this.node,
            scale: ['1.5', '1'],
            translateY: from_up ? ['-50px', '0px'] : ['50px', '0px'],
            duration: '500',
            opacity: ['100%', '70%']
        })
    }

    set background_url(name) {this.div.style.backgroundImage = 'url("' + name +'")';}
    get background_url() {return this.div.style.backgroundImage;}
    get node() {return this.a;}
    from(element) {
        let converted = new CaroItem();
        converted.a = element;
        converted.div = element.firstElementChild;
        converted.init_css();
        return converted;
    }
}


let caro_container = {
    node: document.getElementsByClassName("caro-container")[0],
    children: [],
    images_url: [
        "assert/img/base1.png",
        "assert/img/base2.png",
        "assert/img/base3.png",

        "assert/img/base1.png",
        "assert/img/base2.png",
    ],
    top_id: 0,
    init: function() {
        this.children = Array.from(caro_container.node.children).reduce(function(array, x) {
            array.push((new CaroItem()).from(x)); return array;
        }, []); 
        for(let i = 0; i < 3; i++) {
            this.children[i].background_url = this.images_url[i]
            //this.node.appendChild(this.children[i].node);
        }
        this.children[0].node.style.opacity = "70%";
        this.children[1].node.style.transform = "scale(1.5)";
        this.children[1].node.style.zIndex = "1";
        this.children[2].node.style.opacity = "70%";
    },
    reload: function() {
        let id = this.top_id;
        for(let i = 0; i < 3; i++) {
            this.children[i].background_url = this.images_url[id + i];
        }
    },
    scrollDown: function() {
        this.top_id += 1;
        if (this.top_id == this.images_url.length - 2)
            this.top_id = 0;
        
        this.reload();
        this.children[2].fade_in(false);
        this.children[1].grow_more(false);
        this.children[0].grow_less(false);
    },
    scrollUp: function() {
        this.top_id -= 1;
        if (this.top_id < 0)
        this.top_id = this.images_url.length - 3;
        
        this.reload();
        this.children[2].grow_less();
        this.children[1].grow_more();
        this.children[0].fade_in();
        
    }
}

function loadProject(index) {
    let title = document.querySelector("#project-description-div h3");
    let shot_description = document.getElementById("project-shot-description");
    let description = document.getElementById("project-description");
    let skills = document.getElementById("project-skills");
    let info = projects_data[index];
    
    title.innerText = info.title;
    shot_description.innerText = info.shot_description;
    description.innerText = info.description;

    anime({
        targets: [title, shot_description, description, skills],
        translateX:  ['-50px', '0px'],
        opacity: ['20%', '100%'],
        duration: '1000',
        delay: anime.stagger(100),
        easing: 'easeOutElastic'
    });
}


caro_container.init();
let caro_buttons = Array.from(document.querySelectorAll("#desktop-carousel div:last-of-type input"));
let projects_data = [
    {
        title: "Titre 1",
        shot_description: "First project shot description",
        description: "Harum neque eum laboriosam dolorem perspiciatis molestiae animi rerum. Ut natus et esse corporis suscipit dolore ex quam. Eveniet nostrum molestiae temporibus fugiat itaque aut blanditiis nemo. Quae neque nesciunt praesentium et aut ullam.",
        Skills: []
    },
    {
        title: "Titre 2",
        shot_description: "Second project shot description",
        description: "Architecto est aliquam laborum consectetur voluptas unde assumenda. Eum iure nobis praesentium dignissimos optio inventore deleniti et. Consequuntur qui animi laborum.",
        Skills: []
    },
    {
        title: "Titre 3",
        shot_description: "Third project shot description",
        description: "Accusantium itaque velit expedita. Ipsam nihil eos nemo veritatis. Suscipit vitae repellat doloribus iure. Hic voluptatem incidunt quo dolor culpa expedita.",
        Skills: []
    },
]
let nb_images = caro_container.images_url.length

caro_buttons[0].onclick = () => {
    caro_container.scrollUp();
    loadProject((caro_container.top_id + 1) % 3);
};

caro_buttons[1].onclick = () => {
    caro_container.scrollDown();
    loadProject((caro_container.top_id + 1) % 3);
};
