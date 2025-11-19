 <!-- jequery plugins -->
 <script src="{{ asset('web/assets/js/jquery.js') }}"></script>
 <script src="{{ asset('web/assets/js/bootstrap.min.js') }}"></script>
 <script src="{{ asset('web/assets/js/owl.js') }}"></script>
 <script src="{{ asset('web/assets/js/wow.js') }}"></script>
 <script src="{{ asset('web/assets/js/validation.js') }}"></script>
 <script src="{{ asset('web/assets/js/jquery.fancybox.js') }}"></script>
 <script src="{{ asset('web/assets/js/appear.js') }}"></script>
 <script src="{{ asset('web/assets/js/isotope.js') }}"></script>
 <script src="{{ asset('web/assets/js/parallax-scroll.js') }}"></script>
 {{-- <script src="{{ asset('web/assets/js/jquery.nice-select.min.js') }}"></script> --}}
 <script src="{{ asset('web/assets/js/scrolltop.min.js') }}"></script>
 <script src="{{ asset('web/assets/js/gsap.js') }}"></script>
 <script src="{{ asset('web/assets/js/ScrollTrigger.js') }}"></script>
 <script src="{{ asset('web/assets/js/SplitText.js') }}"></script>
 <script src="{{ asset('web/assets/js/language.js') }}"></script>
 <script src="{{ asset('web/assets/js/jquery-ui.js') }}"></script>
 <script src="{{ asset('web/assets/js/lenis.min.js') }}"></script>
 <script src="{{ asset('web/assets/js/odometer.js') }}"></script>
 <script src="{{ asset('web/assets/js/jquery.lettering.min.js') }}"></script>
 <script src="{{ asset('web/assets/js/jquery.circleType.js') }}"></script>

 <!-- main-js -->
 <script src="{{ asset('web/assets/js/script.js') }}"></script>

 <script src='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/intlTelInput-jquery.min.js'></script>
 <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

 <script>
     document.addEventListener('DOMContentLoaded', function() {
         const toggles = document.querySelectorAll('.read-more-toggle');

         function toggleReadMore() {
             const shortMessage = this.previousElementSibling.previousElementSibling;
             const fullMessage = this.previousElementSibling;

             if (fullMessage.style.display === "none") {
                 fullMessage.style.display = "inline";
                 shortMessage.style.display = "none";
                 this.textContent = "Read Less";
             } else {
                 fullMessage.style.display = "none";
                 shortMessage.style.display = "inline";
                 this.textContent = "Read More";
             }
         }

         function initReadMoreToggles() {
             const toggles = document.querySelectorAll('.read-more-toggle');

             toggles.forEach(function(toggle) {
                 toggle.removeEventListener('click', toggleReadMore);
                 toggle.addEventListener('click', toggleReadMore);
             });
         }

         if ($('.three-item-carousel').length) {
             $('.three-item-carousel').owlCarousel({
                 loop: true,
                 margin: 30,
                 nav: true,
                 smartSpeed: 500,
                 autoplay: 1000,
                 navText: ['<span class="icon-34"></span>', '<span class="icon-35"></span>'],
                 on: {
                     slideChange: function() {
                         initReadMoreToggles();
                     }
                 },
                 responsive: {
                     0: {
                         items: 1
                     },
                     480: {
                         items: 1
                     },
                     600: {
                         items: 2
                     },
                     800: {
                         items: 2
                     },
                     1200: {
                         items: 3
                     }

                 }
             });
         }

         initReadMoreToggles();
     });

     document.addEventListener('DOMContentLoaded', function() {
         document.body.style.paddingRight = '0';
     });
     document.querySelectorAll('[data-scroll-target]').forEach(button => {
         button.addEventListener('click', function(event) {
             event.preventDefault();
             const targetId = this.getAttribute('data-scroll-target');
             const element = document.getElementById(targetId);
             const headerOffset = 150;
             const elementPosition = element.getBoundingClientRect().top;
             const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

             window.scrollTo({
                 top: offsetPosition,
                 behavior: "smooth"
             });
         });
     });

     $.ajaxSetup({
         headers: {
             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         }
     });

     $(document).ready(function() {

         @if (session('success'))
             Swal.fire({
                 icon: 'success',
                 // showCancelButton: true,
                 // showCloseButton: true,
                 title: '{{ session('success') }}'
             });
         @endif

         @if (session('error'))
             Swal.fire({
                 icon: 'error',
                 title: '{{ session('error') }}'
             });
         @endif
     });
 </script>
