function login() {
    window.location.href = "http://127.0.0.1:8000/login";
}


(() => {
    // Create a new Date object
    const currentDate = new Date();
    // Get the current year
    const currentYear = currentDate.getFullYear();
    document.getElementById('year').innerHTML = currentYear;


    const screenWidth = window.innerWidth;
    if (screenWidth > 625) {
        const navElement = document.querySelector('nav');
        const navWidth = navElement.offsetWidth;


        const navbar = document.querySelector('ul.navbar-nav');
        const navbarWidth = navbar.offsetWidth;


        const brand = document.querySelector('img.avatar');
        const brandWidth = brand.offsetWidth;

        const loginBtn = document.querySelector('#login-nav-item');
        loginBtn.innerHTML = '  <button class="btn" id="login-btn" onclick="login()"> تسجيل الدخول </button > '
        const loginWidth = loginBtn.offsetWidth;
        const rightValue = navWidth - loginWidth * 2 - navbarWidth - brandWidth;
        loginBtn.style.right = rightValue + 'px';
        loginBtn.style.position = 'relative';

    } else {
        const loginBtn = document.querySelector('#login-nav-item');
        loginBtn.innerHTML = '  <button class="btn" id="login-btn" onclick="login()"> تسجيل الدخول </button > '

    }
    fadeInOut();



})();



function fadeInOut() {
    // const fadeSections = document.querySelectorAll(".fadeSection");
    window.addEventListener("scroll", () => {
        const i_O = document.querySelectorAll(".fade_in_out");

        function fade_in(io) {
            io.style.cssText = "opacity: 1; transform: translateX(0);";
        }

        function fade_out(io) {
            const value = io.dataset.fade;
            io.style.cssText = "opacity: 0; transform: translateX(" + value + "%);";
        }
        const trigger = window.innerHeight / 6 * 4;
        i_O.forEach(io => {

            const top = io.getBoundingClientRect().top;
            const bottom = io.getBoundingClientRect().bottom;
            if (trigger + 170 > top) {
                fade_in(io);
                if (trigger - 340 > bottom)
                    fade_out(io);
            } else {
                fade_out(io);
            }


        });
        // });
    });

}


