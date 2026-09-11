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

  // Keep the page locked until the invitation is actually opened.
  document.body.classList.add('locked');

  // Space-travel particles. They originate around the center and move outward.
  for (let i = 0; i < 140; i++) {
    const star = document.createElement('span');
    const angle = Math.random() * Math.PI * 2;
    const distance = 145 + Math.random() * Math.max(window.innerWidth, window.innerHeight) * .8;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    star.style.left = '50%';
    star.style.top = '50%';
    star.style.transform = `translate(${x}px, ${y}px)`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    star.style.animationDuration = `${1.4 + Math.random() * 1.9}s`;
    particles.appendChild(star);
  }

  krishnaImage.addEventListener('load', () => {
    krishnaFallback.style.display = 'none';
  });
  krishnaImage.addEventListener('error', () => {
    krishnaImage.style.display = 'none';
    krishnaFallback.style.display = 'flex';
  });

  // After the space journey, show the opening card.
  window.setTimeout(() => {
    intro.classList.add('hide');
    opening.style.opacity = '1';
    opening.style.visibility = 'visible';
  }, 5200);

  function startMusic() {
    music.volume = 0.24;
    const promise = music.play();
    if (promise && typeof promise.then === 'function') {
      promise.then(() => {
        playing = true;
        musicButton.textContent = '♫';
      }).catch(() => {});
    }
  }

  function openCard(event) {
    if (event) event.preventDefault();
    if (opened) return;
    opened = true;

    // Make the interaction unmistakable.
    opening.classList.add('card-opening');
    card.disabled = true;
    startMusic();

    // Reveal the real invitation behind the card.
    window.setTimeout(() => {
      document.body.classList.add('invitation-open');
      document.body.classList.remove('locked');
      opening.classList.add('hide');
      window.scrollTo(0, 0);

      // Trigger the scroll-in animations after the main page becomes visible.
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('show');
      });
    }, 500);
  }

  // click works on desktop; pointerup makes the interaction reliable on phones/tablets.
  card.addEventListener('click', openCard);
  card.addEventListener('pointerup', (event) => {
    if (event.pointerType === 'touch') openCard(event);
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') openCard(event);
  });

  card.addEventListener('mousemove', event => {
    if (opened || window.innerWidth < 700) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1200px) rotateX(${y * -5}deg) rotateY(${x * 6}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    if (!opened) card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  });

  musicButton.addEventListener('click', () => {
    if (playing) {
      music.pause();
      playing = false;
      musicButton.textContent = '♪';
    } else {
      startMusic();
    }
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
});
