// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('img');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-question img');
                otherAnswer.style.display = 'none';
                otherIcon.style.transform = 'rotate(0deg)';
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
            });
            
            // Toggle current item
            if (!isOpen) {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(-180deg)';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
    
    
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = newsletterForm.querySelector('input');
    const newsletterButton = newsletterForm.querySelector('button');
    
    newsletterButton.addEventListener('click', function(e) {
        e.preventDefault();
        const email = newsletterInput.value.trim();
        
        if (email && email.includes('@')) {
            newsletterButton.textContent = 'Subscribed!';
            newsletterButton.style.background = '#4a5d23';
            newsletterInput.value = '';
            
            setTimeout(() => {
                newsletterButton.textContent = 'Subscribe';
                newsletterButton.style.background = '#4a5d23';
            }, 2000);
        } else {
            alert('Please enter a valid email address');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Search functionality
    // const searchInput = document.querySelector('.search-box input');
    // const searchIcon = document.querySelector('.search-box i');
    
    // searchIcon.addEventListener('click', function() {
    //     const searchTerm = searchInput.value.trim();
    //     if (searchTerm) {
    //         alert(`Searching for: ${searchTerm}`);
    //         // In a real application, this would trigger a search
    //     }
    // });
    
    // searchInput.addEventListener('keypress', function(e) {
    //     if (e.key === 'Enter') {
    //         const searchTerm = searchInput.value.trim();
    //         if (searchTerm) {
    //             alert(`Searching for: ${searchTerm}`);
    //             // In a real application, this would trigger a search
    //         }
    //     }
    // });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Category item click effects
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            alert(`Browsing ${categoryName} category`);
            // In a real application, this would navigate to the category page
        });
    });
});


// var swiper = new Swiper(".banner-slider", {
//     spaceBetween: 30,
//     centeredSlides: true,
//     loop: true,
//     autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// });



// get all elements here now
const navMenuClose = document.getElementById("menu-close");
const sideMenuClose = document.getElementById("sidebar-close");
const links = document.querySelector("header .navbar .navbar-links");
const menuLi = document.querySelectorAll(
  "header .navbar .navbar-links .links > li"
);
const submenu = document.querySelectorAll(
  "header .navbar .navbar-links .links li ul > li"
);

navMenuClose.addEventListener("click", () => {
  links.style.left = "0";
});

sideMenuClose.addEventListener("click", () => {
  links.style.left = "-100%";
});

document.addEventListener("click", (event) => {
  if (!links.contains(event.target) && !navMenuClose.contains(event.target)) {
    links.style.left = "-100%";
  }
});

menuLi.forEach((item) => {
  item.addEventListener("click", (e) => {
    menuLi.forEach((li) => {
      li.classList.remove("active");
    });

    e.currentTarget.classList.toggle("active");
  });
});

submenu.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("show-menu");
  });
});

// const navbar = document.querySelector("header");
// const topMenu = document.querySelector(".top-menu");

// window.addEventListener("scroll", () => {
//   const scrollHeight = window.scrollY;
//   const navbarHeight = navbar.getBoundingClientRect().height;

//   if (scrollHeight > navbarHeight) {
//     navbar.classList.add("nav-fix");
//   } else {
//     navbar.classList.remove("nav-fix");
//   }

//   console.log(scrollHeight);

//   if (scrollHeight > 200) {
//     topMenu.classList.add("show-btn");
//   } else {
//     topMenu.classList.remove("show-btn");
//   }
// });

// topMenu.addEventListener("click", () => {
//   document.documentElement.scrollTop = 0;
// });
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("header");
  const topMenu = document.querySelector(".top-menu");

  if (!navbar || !topMenu) {
    console.error("Navbar or TopMenu element not found in DOM");
    return;
  }

  window.addEventListener("scroll", () => {
    const scrollHeight = window.scrollY;
    const navbarHeight = navbar.getBoundingClientRect().height;

    if (scrollHeight > navbarHeight) {
      navbar.classList.add("nav-fix");
    } else {
      navbar.classList.remove("nav-fix");
    }

    if (scrollHeight > 200) {
      topMenu.classList.add("show-btn");
    } else {
      topMenu.classList.remove("show-btn");
    }
  });

  // Smooth scroll to top
  topMenu.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// HERO SLIDER
var menu = [];
jQuery('.swiper-slide').each( function(index){
    menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
});
var interleaveOffset = 0.5;
var swiperOptions = {
    loop: true,
    speed: 1000,
    parallax: true,
    autoplay: {
        //delay: 6500,
        delay: 20000,
        disableOnInteraction: false,
    },
    //autoplay: false,
    watchSlidesProgress: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    on: {
        progress: function() {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = swiper.width * interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slide-inner").style.transform =
                "translate3d(" + innerTranslate + "px, 0, 0)";
            }      
        },

        touchStart: function() {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },

        setTransition: function(speed) {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slide-inner").style.transition =
                speed + "ms";
            }
        }
    }
};

var swiper = new Swiper(".swiper-container", swiperOptions);

// DATA BACKGROUND IMAGE
var sliderBgSetting = $(".slide-bg-image");
sliderBgSetting.each(function(indx){
    if ($(this).attr("data-background")){
        $(this).css("background-image", "url(" + $(this).data("background") + ")");
    }
});

//Product Slider
const swiperThumbs = new Swiper(".mySwiperThumbs", {
  loop: false,
  spaceBetween: 0,
  slidesPerView: 6,
  // freeMode: true,
  // centeredSlides: true,
  // watchSlidesProgress: true,
  freeMode: true,
      watchSlidesProgress: true
});
const swiperMain = new Swiper(".mySwiperMain", {
  loop: false,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiperThumbs,
  },
});