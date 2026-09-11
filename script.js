document.addEventListener('DOMContentLoaded', () => {

    const intro = document.getElementById('galaxyIntro');
    const opening = document.getElementById('opening');
    const card = document.getElementById('cosmicCard');
    const particles = document.getElementById('travelParticles');

    const music = document.getElementById('bgMusic');
    const musicButton = document.getElementById('musicButton');

    const krishnaImage = document.getElementById('krishnaImage');
    const krishnaFallback = document.getElementById('krishnaFallback');

    let opened = false;
    let playing = false;

    /* =========================================
       INITIAL STATE
       ========================================= */

    document.body.classList.add('locked');

    /* Galaxy must NOT show on page load */
    intro.classList.remove('journey-start');
    intro.classList.add('hide');

    /* =========================================
       CREATE SPACE PARTICLES
       ========================================= */

    for (let i = 0; i < 140; i++) {

        const star = document.createElement('span');

        const angle = Math.random() * Math.PI * 2;

        const distance =
            145 +
            Math.random() *
            Math.max(
                window.innerWidth,
                window.innerHeight
            ) * .8;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        star.style.left = '50%';
        star.style.top = '50%';

        star.style.transform =
            `translate(${x}px, ${y}px)`;

        star.style.animationDelay =
            `${Math.random() * 2}s`;

        star.style.animationDuration =
            `${1.4 + Math.random() * 1.9}s`;

        particles.appendChild(star);
    }

    /* =========================================
       KRISHNA IMAGE
       ========================================= */

    krishnaImage.addEventListener('load', () => {
        if (krishnaFallback) {
            krishnaFallback.style.display = 'none';
        }
    });

    krishnaImage.addEventListener('error', () => {

        krishnaImage.style.display = 'none';

        if (krishnaFallback) {
            krishnaFallback.style.display = 'flex';
        }
    });

    /* =========================================
       MUSIC
       ========================================= */

    function startMusic() {

        music.volume = 0.24;

        const promise = music.play();

        if (promise && typeof promise.then === 'function') {

            promise.then(() => {

                playing = true;

                musicButton.textContent = '♫';

            }).catch(() => {
                console.log('Music playback was blocked.');
            });
        }
    }


    function openCard(event) {

    if (event) event.preventDefault();
    if (opened) return;

    opened = true;
    card.disabled = true;

    // MUSIC STARTS WITH USER TAP
    startMusic();

    // CARD DOOR OPENING
    opening.classList.add('card-opening');

    // Wait for the door-opening animation
    setTimeout(() => {

        // Hide the card
        opening.classList.add('hide');

        // SHOW GALAXY
        intro.classList.remove('hide');

        // Force animation restart
        void intro.offsetWidth;

        // START DIVINE JOURNEY
        intro.classList.add('journey-start');

        // Let Krishna come forward
        setTimeout(() => {

            intro.classList.remove('journey-start');
            intro.classList.add('hide');

            // SHOW MAIN INVITATION
            document.body.classList.add('invitation-open');
            document.body.classList.remove('locked');

            window.scrollTo(0, 0);

            document
                .querySelectorAll('.reveal')
                .forEach(el => {
                    el.classList.add('show');
                });

        }, 5200);

    }, 1100);
}

    /* =========================================
       OPEN CARD
       ========================================= */

    // function openCard(event) {

    //     if (event) {
    //         event.preventDefault();
    //     }

    //     if (opened) return;

    //     opened = true;

    //     card.disabled = true;

    //     /* -------------------------------------
    //        1. MUSIC STARTS IMMEDIATELY
    //        ------------------------------------- */

    //     startMusic();

    //     /* -------------------------------------
    //        2. CARD OPENING ANIMATION
    //        ------------------------------------- */

    //     opening.classList.add('card-opening');

    //     /* -------------------------------------
    //        3. WAIT FOR CARD BLAST
    //        ------------------------------------- */

    //     setTimeout(() => {

    //         /* Hide card */
    //         opening.classList.add('hide');

    //         /* ---------------------------------
    //            4. START GALAXY JOURNEY
    //            --------------------------------- */

    //         intro.classList.remove('hide');

    //         /* Force animation restart */
    //         void intro.offsetWidth;

    //         intro.classList.add('journey-start');

    //         /* ---------------------------------
    //            5. LET GALAXY ANIMATION PLAY
    //            --------------------------------- */

    //         setTimeout(() => {

    //             /* ---------------------------------
    //                6. FINISH GALAXY JOURNEY
    //                --------------------------------- */

    //             intro.classList.remove('journey-start');

    //             intro.classList.add('hide');

    //             /* ---------------------------------
    //                7. SHOW MAIN INVITATION
    //                --------------------------------- */

    //             document.body.classList.add(
    //                 'invitation-open'
    //             );

    //             document.body.classList.remove(
    //                 'locked'
    //             );

    //             window.scrollTo(0, 0);

    //             /* ---------------------------------
    //                8. REVEAL INVITATION ELEMENTS
    //                --------------------------------- */

    //             document
    //                 .querySelectorAll('.reveal')
    //                 .forEach(el => {
    //                     el.classList.add('show');
    //                 });

    //         }, 5200);

    //     }, 900);
    // }

    /* =========================================
       CARD INTERACTIONS
       ========================================= */

    card.addEventListener(
        'click',
        openCard
    );

    card.addEventListener(
        'pointerup',
        event => {

            if (
                event.pointerType === 'touch'
            ) {
                openCard(event);
            }

        }
    );

    card.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Enter' ||
                event.key === ' '
            ) {
                openCard(event);
            }

        }
    );

    /* =========================================
       CARD 3D MOVEMENT
       ========================================= */

    card.addEventListener(
        'mousemove',
        event => {

            if (
                opened ||
                window.innerWidth < 700
            ) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - .5;

            const y =
                (event.clientY - rect.top) /
                rect.height - .5;

            card.style.transform =
                `perspective(1200px)
                 rotateX(${y * -5}deg)
                 rotateY(${x * 6}deg)`;
        }
    );

    card.addEventListener(
        'mouseleave',
        () => {

            if (!opened) {

                card.style.transform =
                    'perspective(1200px) rotateX(0deg) rotateY(0deg)';
            }

        }
    );

    /* =========================================
       MUSIC BUTTON
       ========================================= */

    musicButton.addEventListener(
        'click',
        () => {

            if (playing) {

                music.pause();

                playing = false;

                musicButton.textContent = '♪';

            } else {

                startMusic();

            }

        }
    );

    /* =========================================
       SCROLL REVEAL
       ========================================= */

    const reveals =
        document.querySelectorAll('.reveal');

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            'show'
                        );
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    reveals.forEach(el => {
        observer.observe(el);
    });

});
