// Skills Data Array
const skillsData = [
    { name: "HTML5", category: "web", icon: "fab fa-html5" },
    { name: "CSS3", category: "web", icon: "fab fa-css3-alt" },
    { name: "JavaScript", category: "web", icon: "fab fa-js" },
    { name: "PHP", category: "web", icon: "fab fa-php" },
    { name: "MySQL", category: "web", icon: "fas fa-database" },
    { name: "Frontend Dev", category: "web", icon: "fas fa-code" },
    { name: "Backend Dev", category: "web", icon: "fas fa-server" },
    
    { name: "Python", category: "prog", icon: "fab fa-python" },
    { name: "Java", category: "prog", icon: "fab fa-java" },
    { name: "C++", category: "prog", icon: "fas fa-cubes" },
    
    { name: "Linux", category: "it", icon: "fab fa-linux" },
    { name: "Networking", category: "it", icon: "fas fa-network-wired" },
    { name: "Cybersecurity Basics", category: "it", icon: "fas fa-shield-alt" },
    { name: "Git & GitHub", category: "it", icon: "fab fa-github" },
    
    { name: "Problem Solving", category: "soft", icon: "fas fa-lightbulb" },
    { name: "Teamwork", category: "soft", icon: "fas fa-users" },
    { name: "Communication", category: "soft", icon: "fas fa-comments" },
    { name: "Time Management", category: "soft", icon: "fas fa-clock" },
    { name: "Critical Thinking", category: "soft", icon: "fas fa-brain" },
    { name: "Continuous Learning", category: "soft", icon: "fas fa-book-reader" }
];

// Roles for Typewriter animation
const roles = ["Software Developer", "Web Developer", "Full-Stack Developer", "IT Specialist"];

document.addEventListener("DOMContentLoaded", () => {
    initTypewriter();
    renderSkills("all");
    initSkillsFilter();
    initImageUpload();
    initMobileMenu();
    initParticleCanvas();
});

// Typewriter Effect
function initTypewriter() {
    const element = document.getElementById("typewriter");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Render Skills Filter
function renderSkills(filter) {
    const container = document.getElementById("skills-container");
    container.innerHTML = "";

    const filtered = filter === "all" ? skillsData : skillsData.filter(s => s.category === filter);

    filtered.forEach(skill => {
        const card = document.createElement("div");
        card.className = "skill-card";
        card.innerHTML = `
            <i class="${skill.icon}"></i>
            <span>${skill.name}</span>
        `;
        container.appendChild(card);
    });
}

function initSkillsFilter() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderSkills(btn.dataset.filter);
        });
    });
}

// Image Change Listener
function initImageUpload() {
    const fileInput = document.getElementById("image-upload");
    const profileImg = document.getElementById("profile-img");

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                profileImg.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Mobile Navbar Toggle
function initMobileMenu() {
    const toggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Copy Email Utility
function copyEmail() {
    const emailText = document.getElementById("email-text").innerText;
    navigator.clipboard.writeText(emailText).then(() => {
        alert("Email copied to clipboard!");
    });
}

// Golden Particle Background Effect
function initParticleCanvas() {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = rgba(255, 215, 0, ${this.opacity});
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}
// Contact Form Submission Handler
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault(); // منع الانتقال إلى صفحة Formspree الخارجية
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("تم إرسال رسالتك بنجاح!");
        contactForm.reset();
      } else {
        alert("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.");
      }
    } catch (error) {
      alert("تعذر الاتصال بالخادم.");
    }
  });
}
