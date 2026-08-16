(() => {
  const menuButton = document.querySelector('[data-menu-button]')
  const mobileMenu = document.querySelector('[data-mobile-menu]')
  const header = document.querySelector('[data-header]')

  function closeMenu() {
    if (!menuButton || !mobileMenu) return
    menuButton.setAttribute('aria-expanded', 'false')
    mobileMenu.hidden = true
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
      menuButton.setAttribute('aria-expanded', String(!isOpen))
      mobileMenu.hidden = isOpen
    })

    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))
  }

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 20)
  updateHeader()
  window.addEventListener('scroll', updateHeader, { passive: true })

  // First-party tracking hooks are intentionally passive for now.
  // The existing data-track attributes can later be connected to the
  // dedicated landing analytics endpoint without changing the UI.
  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => {
      document.documentElement.dataset.lastLandingEvent = element.dataset.track || ''
    })
  })
})()
