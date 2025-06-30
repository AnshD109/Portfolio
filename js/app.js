// Register the plugin
gsap.registerPlugin(ScrollTrigger);

// Animate the title
gsap.to(".animated-title", {
    // The animation properties
    transform: "translateY(0)",
    opacity: 1,
    duration: 1,
    ease: "power2.out",

    // The ScrollTrigger properties
    scrollTrigger: {
        trigger: ".section-two", // What element triggers the animation
        start: "top 80%", // When the top of the trigger hits 80% of the viewport height
        // markers: true, // Uncomment this to see the start and end points
    }
});