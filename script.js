console.log("Portfolio Loaded Successfully");
function showProject(project){

    const title = document.getElementById("projectTitle");
    const desc = document.getElementById("projectDescription");
    const github = document.getElementById("projectGithub");

    if(project === "calculator"){

        title.innerText = "Calculator";

        desc.innerText =
        "A responsive calculator built using HTML, CSS and JavaScript. It supports basic arithmetic operations, keyboard input and real-time calculations.";

        github.href =
        "https://github.com/tanuja3259";
    }

    else if(project === "gallery"){

        title.innerText = "Image Gallery";

        desc.innerText =
        "A responsive image gallery featuring hover effects, image filtering, next/previous navigation and lightbox view.";

        github.href =
        "https://github.com/tanuja3259";
    }

    else if(project === "sms"){

        title.innerText = "Student Management System";

        desc.innerText =
        "A Java-based application to manage student records with add, update, delete and search functionalities.";

        github.href =
        "https://github.com/tanuja3259";
    }

    document.getElementById("projectModal").style.display = "block";
}

function closeModal(){
    document.getElementById("projectModal").style.display = "none";
}

window.onclick = function(event){
    const modal = document.getElementById("projectModal");

    if(event.target == modal){
        modal.style.display = "none";
    }
}