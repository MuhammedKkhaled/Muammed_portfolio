  /* filepath: c:\laragon\www\dump_project\resources\views\pages\home.blade.php */
        // Add this inside your existing <script> tag
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Simple scroll behavior for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Form submission handler
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });



        class TypeWriter {
            constructor(txtElement, words, wait = 3000) {
                this.txtElement = txtElement;
                this.words = words;
                this.txt = '';
                this.wordIndex = 0;
                this.wait = parseInt(wait, 10);
                this.type();
                this.isDeleting = false;
            }

            type() {
                const current = this.wordIndex % this.words.length;
                const fullTxt = this.words[current];

                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }

                this.txtElement.innerHTML = this.txt;

                let typeSpeed = 100;

                if (this.isDeleting) {
                    typeSpeed /= 2;
                }

                if (!this.isDeleting && this.txt === fullTxt) {
                    typeSpeed = this.wait;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    this.wordIndex++;
                    typeSpeed = 500;
                }

                setTimeout(() => this.type(), typeSpeed);
            }
        }

        // Init On DOM Load
        document.addEventListener('DOMContentLoaded', init);

        // Init App
        function init() {
            const txtElement = document.querySelector('.typed-text');
            const words = [
                'Mohamed Khaled',
                'Full Stack Developer',
                'Laravel Developer',
                'TALL Stack Developer',
                'Software Engineer',
            ];
            const wait = 2000;

            new TypeWriter(txtElement, words, wait);
        }
