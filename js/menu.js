const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

// Verificar que los elementos existen antes de agregar los event listeners
if (openMenu && closeMenu && aside) {
    openMenu.addEventListener("click", () => {
        aside.classList.add("aside-visible");
        closeMenu.focus(); // Enfocar el botón de cerrar al abrir el menú
    });

    closeMenu.addEventListener("click", () => {
        aside.classList.remove("aside-visible");
        openMenu.focus(); // Enfocar el botón de abrir al cerrar el menú
    });

    // Cerrar el menú con la tecla "Escape"
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && aside.classList.contains("aside-visible")) {
            aside.classList.remove("aside-visible");
            openMenu.focus();
        }
    });
}
