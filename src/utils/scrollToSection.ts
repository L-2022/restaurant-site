export const scrollToSection = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
        const navbar = document.querySelector('.app__navbar');
        const offset = navbar ? navbar.clientHeight : 0;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
};
