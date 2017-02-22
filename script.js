/* global document */

/**
 * Modeled after Terrill Thompson's example in jQuery
 * http: //staff.washington.edu/tft/tests/menus/simplyaccessible/index.html
 *
 * et all aria labels from JavaScript because in a real-world-scenario, the
 *  listitems are unknown and rendered dynamically
 */

(function() {
  const config = {
    activeClass: 'show-menu',
  };

  const keyCodeMap = {
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 59: ';',
    65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l',
    77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z',
    96: '0', 97: '1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9'
  };

  // Add ARIA role to menubar and menuitems
  document.querySelectorAll('[aria-role="menubar"] li').forEach(listItem => listItem.setAttribute('role', 'menuitem'));

  // Set tabindex of submenu's to -1 so that links can't receive focus until menu is open
  document.querySelectorAll('[aria-role="menubar"] ul').forEach(submenu => {
    submenu.setAttribute('aria-hidden', 'true');
    submenu.setAttribute('role', 'menu');
    submenu.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', - 1));
  });

  // Toplevel menu items
  document.querySelectorAll('[aria-role="menubar"] > li > a').forEach(topLevelMenuItem => {
    const childUl = topLevelMenuItem.parentNode.querySelector('ul');

    // Add aria-haspopup for appropriate items
    if(childUl) {
      topLevelMenuItem.setAttribute('aria-haspopup', 'true');
    }

    // Add hover event listener which modifies class and aria state to active
    topLevelMenuItem.addEventListener('mouseover', function() {
      allListItemsInactive();
      if(childUl) listItemActive(childUl);
    });

    // Add focus event listener which modifies class and aria state to active
    topLevelMenuItem.addEventListener('focus', function() {
      allListItemsInactive();
      if(childUl) listItemActive(childUl);
    });
  });

  function listItemActive(childUl) {
    childUl.setAttribute('aria-hidden', 'false');
    childUl.classList.add(config.activeClass);
    childUl.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', 0));
  }

  function allListItemsInactive() {
    document.querySelectorAll(`.${config.activeClass}`).forEach(activeMenu => {
      activeMenu.setAttribute('aria-hidden', 'true');
      activeMenu.classList.remove(config.activeClass);
      activeMenu.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', -1));
    });
  }
})();
