document.addEventListener("DOMContentLoaded", preparePageElements);

// read/view more clicks
document
    .querySelectorAll(".read-more, .project-button")
    .forEach(registerLinkClickHandler);

function redirectOnClick(e) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    window.location.href = href;
}

function registerLinkClickHandler(link) {
    link.addEventListener("click", redirectOnClick);
}

function setupNavigation() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", toggleNav);
    navLinks.forEach(addAnimationToNavLink);

    return;

    // *******************************
    //  FUNCTIONS
    // *******************************
    function toggleNav() {
        nav.classList.toggle("nav-active");
        navLinks.forEach(animateLink);
        burger.classList.toggle("toggle");
    }

    function animateLink(link, index) {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    }

    function addAnimationToNavLink(link) {
        link.addEventListener("click", () => {
            if (nav.classList.contains("nav-active")) {
                toggleNav();
            }
        });
    }
}

function setupTypingEffect() {
    const typingText = document.querySelector(".typing-text");
    const textToType = "pwd {root}";

    let index = 0;
    typeText();

    return;

    // *******************************
    //  FUNCTIONS
    // *******************************
    function typeText() {
        if (index < textToType.length) {
            typingText.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeText, 150);
        } else {
            setTimeout(beep, 1000);
        }
    }

    function beep() {
        typingText.innerHTML = "";
        index = 0;
        typeText();
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(registerSmoothScroll);
    return;

    // *******************************
    //  FUNCTIONS
    // *******************************
    function setSmoothScroll(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    }

    function registerSmoothScroll(anchor) {
        anchor.addEventListener("click", setSmoothScroll);
    }
}

function setupBlogAndProjectHandlers() {
    const blogContent = document.getElementById("blog-content");
    const projectContent = document.getElementById("project-content");
    const blogTitle = document.getElementById("blog-title");
    const blogFullContent = document.getElementById("blog-full-content");
    const projectTitle = document.getElementById("project-title");
    const projectFullContent = document.getElementById("project-full-content");

    document
        .querySelectorAll(".read-more, .project-button")
        .forEach(linkClickHandler);

    document
        .querySelectorAll(".back-button")
        .forEach(registerDefaultViewButton);

    return;

    // *******************************
    //  FUNCTIONS
    // *******************************
    function changeLocation(e) {
        e.preventDefault();
        const href = e.target.getAttribute("href");
        window.location.href = href;
    }

    function linkClickHandler(link) {
        link.addEventListener("click", changeLocation);
    }

    function showDefaultView(e) {
        e.preventDefault();
        blogContent.style.display = "none";
        projectContent.style.display = "none";
        document.getElementById("blog").style.display = "block";
        document.getElementById("projects").style.display = "block";
    }

    function registerDefaultViewButton(button) {
        button.addEventListener("click", showDefaultView);
    }
}

async function getBlogContent(blogId) {
    try {
        const response = await fetch(`blogs/${blogId}/index.html`);
        return await response.text();
    } catch (error) {
        console.error("Error loading blog content:", error);
        return "<p>Blog content not found.</p>";
    }
}

async function getProjectContent(projectId) {
    try {
        const response = await fetch(`projects/${projectId}/index.html`);
        return await response.text();
    } catch (error) {
        console.error("Error loading project content:", error);
        return "<p>Project content not found.</p>";
    }
}

function preparePageElements() {
    setupNavigation();
    setupTypingEffect();
    setupSmoothScrolling();
    setupBlogAndProjectHandlers();
}
