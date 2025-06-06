document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // Use ScrollTrigger.matchMedia() for responsive animations
    ScrollTrigger.matchMedia({

        // Desktop animations (screens wider than 768px)
        "(min-width: 768px)": function() {
            const section = document.querySelector("#infent-animation-section");
            if (!section) return; // Exit if the section doesn't exist
            const images = section.querySelectorAll(".appoach-img img");

            // Set initial state for images
            gsap.set(images, {
                opacity: 0,
                width: '50vh', // Keep larger size for desktop
                position: "absolute",
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50
            });

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 5%",
                    end: () => `+=${images.length * 400}`, // Longer scroll for desktop
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            images.forEach((img, i) => {
                tl.to(img, {
                    opacity: 1,
                    rotation: i * 30, // Full rotation effect
                    duration: 0.5,
                }, i * 1);
                // Hide the previous image more smoothly
                if (i > 0) {
                   tl.to(images[i - 1], { opacity: 0, duration: 0.5 }, (i * 1) + 0.5);
                }
            });

            tl.to({}, { duration: 1 }); // Final pause
        },

        // Mobile animations (screens 767px or narrower)
        "(max-width: 767px)": function() {
            const section = document.querySelector("#infent-animation-section");
            if (!section) return; // Exit if section doesn't exist
            const images = section.querySelectorAll(".appoach-img img");

            // Set initial state for mobile images
            gsap.set(images, {
                opacity: 0,
                width: '80vw', // Use viewport width for better mobile scaling
                position: "absolute",
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50
            });

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 15%", // Adjust start position for mobile
                    end: () => `+=${images.length * 250}`, // Shorter scroll duration
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                }
            });

             images.forEach((img, i) => {
                tl.to(img, {
                    opacity: 1,
                    rotation: i * 15, // Reduce rotation for a subtler effect
                    duration: 0.5,
                }, i * 1);
                if (i > 0) {
                   tl.to(images[i - 1], { opacity: 0, duration: 0.5 }, (i * 1) + 0.5);
                }
            });
            tl.to({}, { duration: 0.5 }); // Shorter pause
        }
    });


    // --- Generic Animations (can be left outside matchMedia if they work on all sizes) ---
    // Note: For complex animations, it's better to also place them inside matchMedia
    // to adjust values like x, y, start/end triggers per breakpoint.

    // Function to create a scroll-triggered animation
    function createScrollAnimation(target, fromX, toX, rotate = 0, scale = 1) {
        gsap.fromTo(target, { x: fromX, opacity: 0, rotate: rotate, scale: scale }, {
            x: toX, opacity: 1, rotate: 0, scale: 1,
            ease: 'expo.out(1, 0.5)',
            scrollTrigger: {
                trigger: target,
                start: "top 90%", // Start later on the screen
                end: "top 50%",
                scrub: true,
            }
        });
    }

    // Animate section titles
    function animateSectionTitles(section, subTextStart, titleStart, descStart) {
        const trigger = section;
        gsap.fromTo(`${section} .sec-title .sub-text`,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, ease: "back.out(1.7)", scrollTrigger: { trigger, start: subTextStart || "top 85%", end: "top 60%", scrub: true } }
        );
        gsap.fromTo(`${section} .sec-title .title2`,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, ease: "back.out(1.7)", scrollTrigger: { trigger, start: titleStart || "top 80%", end: "top 55%", scrub: true } }
        );
        if (descStart) {
            gsap.fromTo(`${section} .sec-title .desc`,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, ease: "back.out(1.7)", scrollTrigger: { trigger, start: descStart || "top 80%", end: "top 55%", scrub: true } }
            );
        }
    }

    // Simplified item animation for better performance
    function animateSectionItems(selector, trigger, start, end) {
        gsap.utils.toArray(selector).forEach(item => {
            gsap.from(item, {
                opacity: 0,
                y: 50, // Simpler upward movement instead of motion path
                scale: 0.9,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: trigger || item,
                    start: start || "top 90%",
                    end: end || "top 60%",
                    scrub: true,
                }
            });
        });
    }

    function animateBannerBoxRadius(selector) {
        gsap.to(selector, {
            borderRadius: "20% 30% 20% 30%",
            duration: 10,
            ease: "none",
            repeat: -1,
            yoyo: true, // yoyo simplifies the keyframes
            keyframes: [
                { borderRadius: "20% 30% 20% 30%" },
                { borderRadius: "30% 20% 30% 20%" },
                { borderRadius: "20% 30% 20% 30%" }
            ]
        });
    }

    // --- Initialize all animations ---

    animateBannerBoxRadius("#homepage-hero-banner-box");
    createScrollAnimation(".anm-scroll-from-right", '100%', '0%', 25, 0.8);
    createScrollAnimation(".anm-scroll-from-left", '-100%', '0%', -25, 0.8);

    animateSectionTitles(".rs-services");
    animateSectionItems(".rs-services-slider");

    animateSectionTitles(".rs-about");
    animateSectionItems(".rs-about .check-lists li", ".rs-about .check-lists");
    animateSectionItems(".rs-about .services-wrap, .rs-about .btn-part", ".rs-about .services-wrap");

    animateSectionTitles(".rs-project");
    animateSectionItems(".project-item");

    animateSectionTitles(".rs-team");
    animateSectionItems(".team-item");

    animateSectionTitles(".rs-cta");
    animateSectionItems(".rs-cta .btn-part", ".rs-cta");

    animateSectionTitles("#rs-testimonial");
    animateSectionTitles("#rs-blog");
    animateSectionItems("#rs-blog .blog-item, #rs-blog .blog-horizontal .blog-item-wrap");

    gsap.to('.background-layered-image.image2', {
        y: '-20px',
        x: '20px',
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
    });

    gsap.fromTo('#hero-women', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 2, ease: 'power3.out' });

    // Baby element on motion path - ensure the path is scalable (e.g., SVG)
    if (document.querySelector("#motionPath")) {
         gsap.to("#baby-element", {
            opacity: 1,
            motionPath: {
                path: "#motionPath",
                align: "#motionPath",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            },
            scrollTrigger: {
                trigger: "#rs-about",
                start: "top 20%",
                end: "top -80%",
                scrub: true
            },
        });
    }

    const wiggleTimeline = gsap.timeline({ repeat: -1, yoyo: true, ease: "power1.inOut" });
    wiggleTimeline.to(".about-img", { rotation: 2, x: 2, duration: 2 })
                  .to(".about-img", { rotation: -2, x: -2, duration: 2 });
});
