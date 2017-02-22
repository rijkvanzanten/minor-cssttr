/* global document */

/**
 * Modeled after Terrill Thompson's example in jQuery
 * http: //staff.washington.edu/tft/tests/menus/simplyaccessible/index.html
 */

(function() {
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

  // Add aria-haspopup for appropriate items
  document.querySelectorAll('[aria-role="menubar"] > li').forEach(topLevelMenuItem => {
    if(topLevelMenuItem.querySelectorAll('ul').length) {
      topLevelMenuItem.setAttribute('aria-haspopup', 'true');
    }
  });
})();
