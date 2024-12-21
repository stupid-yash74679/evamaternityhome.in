document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const section = document.querySelector("#infent-animation-section");
    const images = document.querySelectorAll(".appoach-img img");

    // Set initial state for images (hidden and positioned absolutely)
    gsap.set(images, { opacity: 0, width: '50vh', position: "absolute"});

    // Create a master timeline for all animations
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: section, // Pin the entire section
            start: "top 5%", // Start when the top of the section reaches the top of the viewport
            end: () => `+=${images.length * 400}`, // Adjust the end based on the number of images
            scrub: true, // Smooth scroll
            pin: true, // Pin the entire section
            anticipatePin: 1,
        }
    });

    // Animate each image into view and hide the previous one
    images.forEach((img, i) => {
        tl.to(img, {
            opacity: 1,
            rotation: i * 30, // Rotate each image 30 degrees more than the previous
            duration: 0,
            onStart: () => {
                if (i > 0) {
                    gsap.to(images[i - 1], { opacity: 0, duration: 0.5, rotate: 20 });
                }
            }
        }, i * 1); // Space the animations evenly
    });

    // Optionally, add a pause at the end before releasing the scroll
    tl.to({}, { duration: 1 });
    // Function to create a scroll-triggered animation with rotation and scaling
    function createScrollAnimation(target, fromX, toX, rotate = 0, scale = 1) {
        gsap.fromTo(target,
            {
                x: fromX, // Start position outside the window
                opacity: 0, // Start fully transparent
                rotate: 0, // Start with rotation
                scale: scale, // Start with scaling
            },
            {
                x: toX, // End position at its original place
                opacity: 1, // Fully opaque
                rotate: 0, // Rotate to normal
                scale: 1, // Scale to normal
                ease: 'expo.out(1, 0.5)', // Funky elastic easing
                scrollTrigger: {
                    trigger: target, // Element to trigger the animation
                    start: "top 85%", // Start the animation when the element reaches 85% of the viewport height
                    end: "top 45%", // End the animation when the element reaches 45% of the viewport height
                    scrub: true, // Smoothly animate in sync with the scroll position
                }
            }
        );
    }

    // Function to animate section titles and subtitles with funky effects
    function animateSectionTitles(section, subTextStart, titleStart, descStart) {
        gsap.fromTo(`${section} .sec-title .sub-text`,
            { y: 100, opacity: 0, scale: 0.8, rotate: -15 },
            {
                y: 0, opacity: 1, scale: 1, rotate: 0,
                ease: "back.out(1.7)", // Funky easing
                scrollTrigger: {
                    trigger: section,
                    start: subTextStart,
                    end: "top 40%",
                    scrub: true,
                }
            }
        );

        gsap.fromTo(`${section} .sec-title .title2`,
            { x: -200, opacity: 0, scale: 0.8, rotate: 15 },
            {
                x: 0, opacity: 1, scale: 1, rotate: 0,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: section,
                    start: titleStart,
                    end: "top 35%",
                    scrub: true,
                }
            }
        );

        if (descStart) {
            gsap.fromTo(`${section} .sec-title .desc`,
                { x: 200, opacity: 0, scale: 0.8, rotate: -15 },
                {
                    x: 0, opacity: 1, scale: 1, rotate: 0,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: section,
                        start: descStart,
                        end: "top 35%",
                        scrub: true,
                    }
                }
            );
        }
    }

    // Function to animate section items with motion path
    function animateSectionItems(selector, trigger, start, end) {
        gsap.utils.toArray(selector).forEach((item, i) => {
            gsap.fromTo(item,
                {
                    opacity: 0,
                    motionPath: {
                        path: [{x: -100, y: 50}, {x: 0, y: 0}],
                        curviness: 1.25,
                        autoRotate: true
                    },
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    motionPath: {
                        path: [{x: 0, y: 0}],
                        curviness: 1.25,
                        autoRotate: true
                    },
                    scale: 1,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: trigger || item,
                        start: start,
                        end: end || "top 50%",
                        scrub: true,
                    }
                }
            );
        });
    }
    // Function to create a looping border-radius animation
    function animateBannerBoxRadius(selector) {
        gsap.to(selector, {
            borderRadius: "20% 30% 20% 30%", // Start with uniform initial values
            duration: 10, // Long duration for smooth, gradual changes
            ease: "none", // Linear easing for seamless looping
            repeat: -1, // Infinite loop
            keyframes: {
                "0%":   { borderRadius: "20% 30% 20% 30%" }, // Initial state
                "25%":  { borderRadius: "30% 20% 30% 20%" }, // Intermediate state
                "50%":  { borderRadius: "20% 30% 20% 30%" }, // Back to initial state but flipped
                "75%":  { borderRadius: "30% 20% 30% 20%" }, // Another intermediate state
                "100%": { borderRadius: "20% 30% 20% 30%" }  // Final state, matches the initial state
            }
        });
    }
    // Initialize the border-radius animation for the banner-box
    animateBannerBoxRadius("#homepage-hero-banner-box");
    // Create scroll animations for sliding elements with rotation and scaling
    createScrollAnimation(".anm-scroll-from-right", '100%', '0%', 45, 0.5); // Right to center with rotation and scaling
    createScrollAnimation(".anm-scroll-from-left", '-100%', '0%', -45, 0.5); // Left to center with rotation and scaling

    // Animate "Our Services" section
    animateSectionTitles(".rs-services", "top 80%", "top 75%", "top 75%");
    animateSectionItems(".rs-services-slider", null, "top 90%");

    // Animate "Our Approach" section with motion paths
    animateSectionTitles(".rs-about", "top 80%", "top 75%", "top 75%");
    animateSectionItems(".rs-about .check-lists li", ".rs-about .check-lists", "top 80%");
    animateSectionItems(".rs-about .services-wrap", ".rs-about .services-wrap", "top 75%", "top 35%");
    animateSectionItems(".rs-about .btn-part", ".rs-about .btn-part", "top 75%", "top 35%");

    // Animate "Case Studies" section with funky motion paths
    animateSectionTitles(".rs-project", "top 80%", "top 75%");
    animateSectionItems(".project-item", null, "top 90%");

    // Animate "Our Clients" section with scaling logos
    animateSectionTitles(".rs-team", "top 80%", "top 75%");
    animateSectionItems(".team-item", null, "top 85%", "top 45%");

    // Animate "Careers" section with funky rotations and scaling
    animateSectionTitles(".rs-cta", "top 80%", "top 75%");
    animateSectionItems(".rs-cta .btn-part", ".rs-cta", "top 75%", "top 35%");

    // Animate "Testimonials" section with a creative approach
    animateSectionTitles("#rs-testimonial", "top 80%", "top 75%");
    // You can add specific animations for testimonial items using a similar approach

    // Animate "News & Blog" section with motion paths
    animateSectionTitles("#rs-blog", "top 80%", "top 75%");
    animateSectionItems("#rs-blog .blog-item, #rs-blog .blog-horizontal .blog-item-wrap", null, "top 90%");

    gsap.to('.background-layered-image.image2', {
        y: '-20px',   // Move the sun up by 20px
        x: '20px',
        duration: 3,  // Duration of the animation (in seconds)
        ease: 'power1.inOut', // Easing function
        yoyo: true,  // Make the animation reverse direction
        repeat: -1   // Repeat the animation infinitely
    });
    // Set the initial position off-screen (below the bottom)
    gsap.set('#hero-women', {
        y: '100%',  // 100% means the element starts completely off-screen
        opacity: 0  // Start with opacity at 0 for a fade-in effect
    });

    // Animate the element into position
    gsap.to('#hero-women', {
        y: '0%',   // Bring the element back to its original position
        opacity: 1, // Fade in
        duration: 3,  // Duration of the animation (in seconds)
        ease: 'power3.out',  // Easing function for a smooth effect
    });
    gsap.to("#baby-element", {
        opacity:1,
        motionPath: {
            path: "#motionPath",
            align: "#motionPath",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },
        scrollTrigger: {
            trigger: "#rs-about",
            start: "top 20%", // Start the animation when the element reaches 85% of the viewport height
            end: "top -80%", // End the animation when the element reaches 45% of the viewport height
            scrub: true
        },
        stagger: {
            each: 0.01, // Adjust this value for more or less spacing between elements
            from: "start" // Animates each element in order (start, end, center, etc.)
        }
    });
    // Create a GSAP timeline for the wiggle effect
    const wiggleTimeline = gsap.timeline({ repeat: -1, yoyo: true, ease: "power1.inOut" });

    wiggleTimeline.to(".about-img", {
        rotation: 3, // Rotate slightly to the right
        x: 2, // Move slightly to the right
        duration: 2, // Duration of this part of the wiggle
    }).to(".about-img", {
        rotation: -3, // Rotate slightly to the left
        x: -2, // Move slightly to the left
        duration: 2, // Duration of this part of the wiggle
    }).to(".about-img", {
        rotation: 2, // Rotate back to the right
        x: 1, // Move slightly to the right
        duration: 2, // Duration of this part of the wiggle
    }).to(".about-img", {
        rotation: 0, // Return to the initial rotation
        x: 0, // Return to the initial position
        duration: 2, // Duration to return to the initial state
    });
});
