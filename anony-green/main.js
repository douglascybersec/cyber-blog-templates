document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupTypingEffect();
    setupSmoothScrolling();
    setupBlogAndProjectHandlers();
});

function setupNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    const toggleNav = () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    };

    burger.addEventListener('click', toggleNav);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                toggleNav();
            }
        });
    });
}

function setupTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const textToType = "pwd {root}";
    let index = 0;

    function typeText() {
        if (index < textToType.length) {
            typingText.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeText, 150);
        } else {
            setTimeout(() => {
                typingText.innerHTML = '';
                index = 0;
                typeText();
            }, 1000);
        }
    }

    typeText();
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setupBlogAndProjectHandlers() {
    const blogContent = document.getElementById('blog-content');
    const projectContent = document.getElementById('project-content');
    const blogTitle = document.getElementById('blog-title');
    const blogFullContent = document.getElementById('blog-full-content');
    const projectTitle = document.getElementById('project-title');
    const projectFullContent = document.getElementById('project-full-content');

    document.querySelectorAll('.read-more, .project-button').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            window.location.href = href;
        });
    });

    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            blogContent.style.display = 'none';
            projectContent.style.display = 'none';
            document.getElementById('blog').style.display = 'block';
            document.getElementById('projects').style.display = 'block';
        });
    });
}

async function getBlogContent(blogId) {
    try {
        const response = await fetch(`blogs/${blogId}/index.html`);
        return await response.text();
    } catch (error) {
        console.error('Error loading blog content:', error);
        return '<p>Blog content not found.</p>';
    }
}

async function getProjectContent(projectId) {
    try {
        const response = await fetch(`projects/${projectId}/index.html`);
        return await response.text();
    } catch (error) {
        console.error('Error loading project content:', error);
        return '<p>Project content not found.</p>';
    }
}


// read/view more clicks
document.querySelectorAll('.read-more, .project-button').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        window.location.href = href;
    });
});
