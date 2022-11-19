// alert(`Nota: ¡Leer primero el REDME.md!  Éste es un proyecto de desarrollo web: E-commerce, que tiene implementaciones de HTML, CSS, JavaScript y Boostrap 5`);
const userIcon = document.querySelector(`.user-icon-container`);
const asideLogin = document.querySelector(`.aside-login-e`);
const btnCart = document.querySelector(`.button-cart`);
const closeLogin = document.querySelector(`.login-close`);
const closeIconAlert = document.querySelector(`.close-img-container`);
const alertLogin = document.querySelector(`.alert`);

userIcon.addEventListener(`click`, openAsideLogin);
closeLogin.addEventListener(`click`, closeAlideLogin);
closeIconAlert.addEventListener(`click`, closeAlertLogin);

function openAsideLogin() {
  asideLogin.classList.remove(`inactive`);
}

function closeAlideLogin() {
  asideLogin.classList.add(`inactive`);
}

function closeAlertLogin() {
  alertLogin.classList.add(`inactive`);
}
//evento para el menu si iniciar seccion
const tiendaSinSesion = document
  .querySelector("#tiendaSinSesion")
  .addEventListener("click", () =>
    alert(
      "Debes iniciar sesion primero para ver la lista de productos exclusivos"
    )
  );
const ProductoSinSeccion = document
  .querySelector("#ProductoSinSeccion")
  .addEventListener("click", () =>
    alert("Debes iniciar sesion primero para ver Este producto")
  );



  $(window).on("scroll", function() {

    if ($(".navbar").offset().top > 40) {
       $(".navbar").addClass("navbar-fixed");
       $(".go-top").show();
 
    } else {
       $(".navbar").removeClass("navbar-fixed");
       $(".go-top").hide();
 
    }
 })
 
 $(document).ready(function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
       itemSelector: '.portfolio-item'
    });
 
    $('#portfolio-filters li').on('click', function() {
       $("#portfolio-filters li").removeClass('filter-active');
       $(this).addClass('filter-active');
 
       portfolioIsotope.isotope({
          filter: $(this).data('filter')
       });
    });
 
    $('.popup-image').magnificPopup({
       type: 'image',
       closeOnContentClick: true,
       gallery: {
          enabled: true,
          navigateByImgClick: true
       }
    });
 
    $("#navbarNav").on('show.bs.collapse', function() {
 
       $(".navbar").addClass("navbar-fixed");
 
       $('a.nav-link, a.btn-custom').click(function() {
          $("#navbarNav").collapse('hide');
       });
    });
 
 
 });



  