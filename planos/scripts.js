document.addEventListener("DOMContentLoaded", function () {
  // ==================== Menu Lateral ====================
  const menuButton = document.getElementById("menuButton");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenu = document.getElementById("closeMenu");

  function toggleMenu() {
    sideMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

    // Fechar a pesquisa se estiver aberta
    if (searchContainer.classList.contains("active")) {
      toggleSearch();
    }
  }

  if (menuButton) menuButton.addEventListener("click", toggleMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", toggleMenu);
  if (closeMenu) closeMenu.addEventListener("click", toggleMenu);

  // ==================== Barra de Pesquisa ====================
  const searchButton = document.getElementById("searchButton");
  const searchContainer = document.getElementById("searchContainer");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearch = document.getElementById("closeSearch");

  function toggleSearch() {
    searchContainer.classList.toggle("active");
    searchOverlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

    // Fechar o menu se estiver aberto
    if (sideMenu.classList.contains("active")) {
      toggleMenu();
    }

    // Focar no input quando abrir
    if (searchContainer.classList.contains("active")) {
      const searchInput = document.getElementById("searchInput");
      if (searchInput) searchInput.focus();
    }
  }

  if (searchButton) searchButton.addEventListener("click", toggleSearch);
  if (searchOverlay) searchOverlay.addEventListener("click", toggleSearch);
  if (closeSearch) closeSearch.addEventListener("click", toggleSearch);

  // ==================== Fechar ao clicar fora ou redimensionar ====================
  function closeAll() {
    if (sideMenu) sideMenu.classList.remove("active");
    if (menuOverlay) menuOverlay.classList.remove("active");
    if (searchContainer) searchContainer.classList.remove("active");
    if (searchOverlay) searchOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  // Fechar ao redimensionar para desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeAll();
    }
  });

  // ==================== Ativar item do menu atual ====================
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    const itemHref = item.getAttribute("href");
    if (itemHref === currentPage) {
      item.classList.add("active");
    }
  });

  // ==================== Simulação de busca ====================
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (searchInput && searchResults) {
    searchInput.addEventListener("input", function () {
      if (this.value.length > 2) {
        // Simular resultados de busca
        const query = this.value.toLowerCase();
        let resultsHTML = "";

        // Resultados para FIIs
        if (
          query.includes("fii") ||
          query.includes("fund") ||
          query.includes("imob")
        ) {
          resultsHTML += `
                        <div class="result-item">
                            <a href="fiis.html">Fundos Imobiliários (FIIs)</a>
                            <p>Todos os seus fundos imobiliários</p>
                        </div>
                        <div class="result-item">
                            <a href="fiis.html?search=${query}">Buscar FIIs</a>
                            <p>Pesquisar fundos imobiliários</p>
                        </div>`;
        }

        // Resultados para CDBs
        if (
          query.includes("cdb") ||
          query.includes("certif") ||
          query.includes("banc")
        ) {
          resultsHTML += `
                        <div class="result-item">
                            <a href="cdbs.html">Certificados de Depósito Bancário (CDBs)</a>
                            <p>Todos os seus CDBs</p>
                        </div>
                        <div class="result-item">
                            <a href="cdbs.html?search=${query}">Buscar CDBs</a>
                            <p>Pesquisar certificados de depósito</p>
                        </div>`;
        }

        // Resultados gerais
        resultsHTML += `
                    <div class="result-item">
                        <a href="perfil.html">Meu Perfil</a>
                        <p>Configurações do seu perfil de investidor</p>
                    </div>
                    <div class="result-item">
                        <a href="configuracoes.html">Configurações</a>
                        <p>Ajustes da conta e preferências</p>
                    </div>
                    <div class="result-item">
                        <a href="ajuda.html">Ajuda/FAQ</a>
                        <p>Dúvidas frequentes e suporte</p>
                    </div>`;

        searchResults.innerHTML =
          resultsHTML ||
          '<div class="result-item">Nenhum resultado encontrado</div>';
      } else {
        searchResults.innerHTML =
          '<div class="result-item">Digite pelo menos 3 caracteres</div>';
      }
    });
  }

  // ==================== Botão de Deletar Usuário ====================
  const deleteButton = document.querySelector(".settings-list .danger");
  if (deleteButton) {
    deleteButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (
        confirm(
          "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita."
        )
      ) {
        alert(
          "Conta marcada para exclusão. Você receberá um e-mail de confirmação."
        );
        // Aqui iria a lógica real para deletar a conta
      }
    });
  }

  // ==================== Botão de Sair ====================
  const logoutButton = document.querySelector(
    ".settings-list button:not(.danger)"
  );
  if (logoutButton && !logoutButton.classList.contains("danger")) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Deseja realmente sair da sua conta?")) {
        alert("Redirecionando para a página de login...");
        // Aqui iria a lógica real para logout
        // window.location.href = 'logout.html';
      }
    });
  }

  // ==================== Upload de Foto de Perfil ====================
  const editPicButton = document.querySelector(".edit-pic");
  const fileInput = document.querySelector('input[type="file"]');

  if (editPicButton && fileInput) {
    editPicButton.addEventListener("click", function (e) {
      e.preventDefault();
      fileInput.click();
    });

    fileInput.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        const profilePic = document.querySelector(".profile-pic img");

        reader.onload = function (e) {
          profilePic.src = e.target.result;
        };

        reader.readAsDataURL(this.files[0]);
        alert("Foto atualizada com sucesso!");
      }
    });
  }

  // ==================== Animações ao rolar a página ====================
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".investment-card, .action-card, .faq-item"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Adiciona estilos iniciais para animação
  const animatedElements = document.querySelectorAll(
    ".investment-card, .action-card, .faq-item"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.5s ease";
  });

  // Executa ao carregar e ao rolar
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
});
