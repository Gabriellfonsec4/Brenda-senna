// Coloque aqui:
// 55 + DDD + número
// somente números.
// Exemplo: 5521999999999

const WHATSAPP = '';

const INSTAGRAM =
  'https://www.instagram.com/espacobrendasenna/';


const works = [

  [
    'resultado-01.webp',
    'mega',
    'Ponto americano',
    'Comprimento e movimento'
  ],

  [
    'resultado-02.webp',
    'mega',
    'Cabelo humano',
    'Ondas e acabamento'
  ],

  [
    'resultado-03.webp',
    'trancas',
    'Trança com entrelace',
    'Textura com identidade'
  ],

  [
    'resultado-04.webp',
    'mega',
    'Mega Hair cacheado',
    'Volume e definição'
  ],

  [
    'resultado-05.webp',
    'penteados',
    'Ondas estruturadas',
    'Elegância em cada detalhe'
  ],

  [
    'resultado-06.webp',
    'penteados',
    'Penteado para noiva',
    'Trança e delicadeza'
  ],

  [
    'resultado-07.webp',
    'mega',
    'Ponto americano com biofibra',
    'Comprimento com leveza'
  ],

  [
    'resultado-08.webp',
    'mega',
    'Biofibra cacheada',
    'Cachos com presença'
  ]

];


const gallery =
  document.querySelector('#gallery');

const modal =
  document.querySelector('#lightbox');

const zoom =
  document.querySelector('#zoom-img');

const caption =
  document.querySelector('#zoom-caption');


let visible = works.slice();

let current = 0;

let returnFocus;


const arrow = `
  <svg aria-hidden="true">
    <use href="#arrow"></use>
  </svg>
`;


/* =========================
   GALERIA
========================= */

function render(filter = 'todos') {

  visible = works.filter(work =>
    filter === 'todos' ||
    work[1] === filter
  );


  gallery.innerHTML = visible
    .map((work, index) => {

      return `

        <button
          class="photo"
          data-index="${index}"
          aria-label="Ampliar: ${work[2]}"
        >

          <div class="photo-frame">

            <img
              src="img/${work[0]}"
              alt="${work[2]} — ${work[3]}"
              width="768"
              height="1024"
              loading="lazy"
              decoding="async"
            >

          </div>


          <span class="photo-caption">

            <span>

              <small>
                ${String(index + 1).padStart(2, '0')}
                /
                ${work[3]}
              </small>

              ${work[2]}

            </span>

            ${arrow}

          </span>

        </button>

      `;

    })
    .join('');

}


/* =========================
   LIGHTBOX
========================= */

function showPhoto(index) {

  current =
    (index + visible.length) %
    visible.length;


  const work =
    visible[current];


  zoom.src =
    `img/${work[0]}`;


  zoom.alt =
    `${work[2]} — ${work[3]}`;


  caption.textContent =
    `${String(current + 1).padStart(2, '0')}
    / ${visible.length}
    · ${work[2]}`;

}


gallery.addEventListener(
  'click',
  event => {

    const button =
      event.target.closest('[data-index]');


    if (!button) return;


    returnFocus = button;


    showPhoto(
      Number(button.dataset.index)
    );


    modal.showModal();


    document.body.classList.add(
      'locked'
    );

  }
);


/* =========================
   FILTROS
========================= */

document
  .querySelectorAll('[data-filter]')
  .forEach(button => {

    button.addEventListener(
      'click',
      () => {

        document
          .querySelectorAll('[data-filter]')
          .forEach(item => {

            item.setAttribute(
              'aria-pressed',
              String(item === button)
            );

          });


        render(
          button.dataset.filter
        );

      }
    );

  });


/* =========================
   CONTROLES DO LIGHTBOX
========================= */

modal
  .querySelector('.close')
  .addEventListener(
    'click',
    () => modal.close()
  );


modal
  .querySelector('.prev')
  .addEventListener(
    'click',
    () => showPhoto(current - 1)
  );


modal
  .querySelector('.next')
  .addEventListener(
    'click',
    () => showPhoto(current + 1)
  );


modal.addEventListener(
  'close',
  () => {

    document.body.classList.remove(
      'locked'
    );

    returnFocus?.focus();

  }
);


modal.addEventListener(
  'click',
  event => {

    if (event.target === modal) {
      modal.close();
    }

  }
);


modal.addEventListener(
  'keydown',
  event => {

    if (event.key === 'ArrowRight') {

      event.preventDefault();

      showPhoto(current + 1);

    }


    if (event.key === 'ArrowLeft') {

      event.preventDefault();

      showPhoto(current - 1);

    }

  }
);


/* =========================
   SWIPE NO MOBILE
========================= */

let touchStart;


zoom.addEventListener(
  'touchstart',
  event => {

    touchStart =
      event.changedTouches[0].clientX;

  },
  {
    passive: true
  }
);


zoom.addEventListener(
  'touchend',
  event => {

    if (touchStart === undefined) {
      return;
    }


    const delta =
      event.changedTouches[0].clientX
      - touchStart;


    if (Math.abs(delta) > 60) {

      showPhoto(
        current +
        (delta < 0 ? 1 : -1)
      );

    }


    touchStart = undefined;

  },
  {
    passive: true
  }
);


/* =========================
   MENU MOBILE
========================= */

const menu =
  document.querySelector('.menu');

const nav =
  document.querySelector('#nav');


function closeMenu() {

  nav.classList.remove('open');

  menu.setAttribute(
    'aria-expanded',
    'false'
  );

  menu.setAttribute(
    'aria-label',
    'Abrir menu'
  );

}


menu.addEventListener(
  'click',
  () => {

    const open =
      nav.classList.toggle('open');


    menu.setAttribute(
      'aria-expanded',
      String(open)
    );


    menu.setAttribute(
      'aria-label',
      open
        ? 'Fechar menu'
        : 'Abrir menu'
    );

  }
);


nav
  .querySelectorAll('a')
  .forEach(link => {

    link.addEventListener(
      'click',
      closeMenu
    );

  });


document.addEventListener(
  'keydown',
  event => {

    if (event.key === 'Escape') {
      closeMenu();
    }

  }
);


window.addEventListener(
  'resize',
  () => {

    if (window.innerWidth > 680) {
      closeMenu();
    }

  }
);


/* =========================
   EXPERIÊNCIA INTERATIVA
========================= */

const options = {

  comprimento: [

    'Comprimento com presença',

    'Explore as possibilidades do Mega Hair e converse sobre o efeito que deseja, o material e os cuidados necessários.',

    'Mega Hair'

  ],


  textura: [

    'Textura que conta sua história',

    'Inspire-se nas tranças e no entrelace. Leve sua referência para conversar sobre a composição do seu próximo visual.',

    'Tranças'

  ],


  ocasiao: [

    'Um visual para lembrar',

    'Ondas estruturadas, tranças e detalhes delicados: compartilhe a ocasião e suas referências para planejar seu penteado.',

    'Penteado'

  ]

};


/* =========================
   WHATSAPP
========================= */

function contactURL(service = '') {

  if (/^55\d{10,11}$/.test(WHATSAPP)) {

    const message =

      `Olá, Brenda! Vim pelo site e gostaria de saber mais sobre ${
        service ||
        'os serviços e horários disponíveis'
      }.`;


    return (
      `https://wa.me/${WHATSAPP}` +
      `?text=${encodeURIComponent(message)}`
    );

  }


  /*
    Enquanto o número não estiver
    preenchido, o site direciona
    para o Instagram.
  */

  return INSTAGRAM;

}


/* =========================
   BOTÕES DA INTERAÇÃO
========================= */

document
  .querySelectorAll('[data-choice]')
  .forEach(button => {

    button.addEventListener(
      'click',
      () => {

        document
          .querySelectorAll('[data-choice]')
          .forEach(item => {

            item.setAttribute(
              'aria-pressed',
              String(item === button)
            );

          });


        const [
          title,
          text,
          service
        ] =
          options[
            button.dataset.choice
          ];


        document
          .querySelector('#choice-title')
          .textContent =
            title;


        document
          .querySelector('#choice-text')
          .textContent =
            text;


        document
          .querySelector('#choice-link')
          .href =
            contactURL(service);

      }
    );

  });


/* =========================
   BOTÕES WHATSAPP
========================= */

document
  .querySelectorAll('[data-whatsapp]')
  .forEach(link => {

    link.href =
      contactURL();

  });


document
  .querySelectorAll('[data-service]')
  .forEach(link => {

    link.href =
      contactURL(
        link.dataset.service
      );


    link.target =
      '_blank';


    link.rel =
      'noopener noreferrer';

  });


const choiceLink =
  document.querySelector('#choice-link');


choiceLink.href =
  contactURL('Mega Hair');


choiceLink.target =
  '_blank';


choiceLink.rel =
  'noopener noreferrer';


/*
  Se o número ainda não tiver
  sido colocado, o botão principal
  vira Instagram automaticamente.
*/

if (!WHATSAPP) {

  document
    .querySelectorAll(
      '[data-whatsapp] use'
    )
    .forEach(icon => {

      icon.setAttribute(
        'href',
        '#arrow'
      );

    });


  document
    .querySelector(
      '[data-contact-label]'
    )
    .textContent =
      'Conversar pelo Instagram';

}


/* =========================
   ANO AUTOMÁTICO
========================= */

document
  .querySelector('#year')
  .textContent =
    new Date().getFullYear();


/* =========================
   INICIALIZA GALERIA
========================= */

render();