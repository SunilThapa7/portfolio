$(document).ready(function(){
    // Throttle scroll function for better performance
    let ticking = false;
    $(window).scroll(function(){
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // sticky navbar on scroll script
                if(window.scrollY > 20){
                    $('.navbar').addClass("sticky");
                }else{
                    $('.navbar').removeClass("sticky");
                }
                
                // scroll-up button show/hide script
                if(window.scrollY > 500){
                    $('.scroll-up-btn').addClass("show");
                }else{
                    $('.scroll-up-btn').removeClass("show");
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(e){
        // Close mobile menu when link is clicked
        if($(window).width() <= 947){
            $('.navbar .menu').removeClass("active");
            $('.menu-btn i').removeClass("active");
        }
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Blogger", "Wordpress Designer", "SEO Expert", "Graphics Designer"],
        typeSpeed: 100,
        backSpeed: 70,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Blogger", "Wordpress Designer", "SEO Expert", "Graphics Designer"],
        typeSpeed: 100,
        backSpeed: 70,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

    // Project image slider functionality
    $('.project-card').each(function(){
        var $slider = $(this).find('.image-slider');
        var $images = $slider.find('img');
        var $dots = $(this).find('.dot');
        var $prevBtn = $(this).find('.prev-btn');
        var $nextBtn = $(this).find('.next-btn');
        var currentSlide = 0;
        var totalSlides = $images.length;

        // Function to show slide
        function showSlide(index){
            $images.removeClass('active');
            $dots.removeClass('active');
            $images.eq(index).addClass('active');
            $dots.eq(index).addClass('active');
            currentSlide = index;
        }

        // Next button
        $nextBtn.on('click', function(e){
            e.stopPropagation();
            var next = (currentSlide + 1) % totalSlides;
            showSlide(next);
        });

        // Previous button
        $prevBtn.on('click', function(e){
            e.stopPropagation();
            var prev = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(prev);
        });

        // Dot navigation
        $dots.on('click', function(e){
            e.stopPropagation();
            var slideIndex = $(this).data('slide');
            showSlide(slideIndex);
        });

        // Auto-advance slider (optional - uncomment if you want auto-slide)
        // setInterval(function(){
        //     var next = (currentSlide + 1) % totalSlides;
        //     showSlide(next);
        // }, 4000);
    });

    // Prevent form submission from refreshing page
    $('form').on('submit', function(e){
        e.preventDefault();
        // Here you can add form submission logic (AJAX, etc.)
        alert('Thank you for your message! I will get back to you soon.');
        $(this)[0].reset();
        return false;
    });

    // Prevent anchor links with # from causing jumps
    $('a[href="#"]').on('click', function(e){
        e.preventDefault();
        return false;
    });

    // Dark Mode Toggle Functionality
    const themeToggle = $('.theme-toggle');
    const html = $('html');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the theme
    if (currentTheme === 'dark') {
        html.attr('data-theme', 'dark');
        themeToggle.find('i').removeClass('fa-moon').addClass('fa-sun');
    } else {
        html.attr('data-theme', 'light');
        themeToggle.find('i').removeClass('fa-sun').addClass('fa-moon');
    }
    
    // Theme toggle click handler
    themeToggle.on('click', function(){
        const currentTheme = html.attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        if (newTheme === 'dark') {
            themeToggle.find('i').removeClass('fa-moon').addClass('fa-sun');
        } else {
            themeToggle.find('i').removeClass('fa-sun').addClass('fa-moon');
        }
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e){
        if (!localStorage.getItem('theme')) {
            html.attr('data-theme', e.matches ? 'dark' : 'light');
        }
    });
});