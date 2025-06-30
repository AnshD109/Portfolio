// This is the most important line! It registers the ScrollTrigger plugin with GSAP.
// You have to do this before you can use ScrollTrigger.
gsap.registerPlugin(ScrollTrigger);


// --- HERO SECTION ANIMATION ---
// Animate the main headlines and subtitle when the page loads.
gsap.from(".main-title", {
    duration: 1, // Animation lasts 1 second
    y: 50,       // Start 50 pixels down
    opacity: 0,  // Start completely transparent
    stagger: 0.2, // Animate each ".main-title" 0.2 seconds after the previous one
    ease: "power3.out" // A smooth easing function
});

gsap.from(".hero-subtitle", {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.5, // Start this animation 0.5 seconds after the page loads
    ease: "power3.out"
});


// --- ANIMATE SECTIONS ON SCROLL ---
// We select all elements with the class "section-title"
const sectionTitles = gsap.utils.toArray('.section-title');

sectionTitles.forEach(title => {
    gsap.from(title, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        // ScrollTrigger makes the animation happen when you scroll to the element
        scrollTrigger: {
            trigger: title, // The element that triggers the animation
            start: "top 85%", // Start when the top of the title is 85% down the viewport
        }
    });
});


// --- PROJECT CARDS ANIMATION ---
// This is a more advanced technique to make each card appear one after another.
const projectCards = gsap.utils.toArray('.project-card');

projectCards.forEach(card => {
    gsap.from(card, {
        duration: 0.8,
        y: 100,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
        }
    });
});


// --- ABOUT SECTION & FOOTER ---
// Animate other elements as they scroll into view.
const aboutSection = document.querySelector('.about-section p');
gsap.from(aboutSection, {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
    }
});

const footer = document.querySelector('.main-footer');
gsap.from(footer, {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".main-footer",
        start: "top 95%",
    }
});