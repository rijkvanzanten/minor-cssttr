/* global window, document */

/*

 ============================================
 License for Application
 ============================================

 This license is governed by United States copyright law, and with respect to matters
 of tort, contract, and other causes of action it is governed by North Carolina law,
 without regard to North Carolina choice of law provisions.  The forum for any dispute
 resolution shall be in Wake County, North Carolina.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list
 of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this
 list of conditions and the following disclaimer in the documentation and/or other
 materials provided with the distribution.

 3. The name of the author may not be used to endorse or promote products derived from
 this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
 AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */

(function() {
  /**
   * Accessible modal window based on Greg Kraus' accessible-modal-dialog
   * https://github.com/gdkraus/accessible-modal-dialog
   */

  // querySelector formatted string for focusable items
  const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

  // Store item that has focus before opening modal window
  let focusedElementBeforeModal;

  window.addEventListener('hashchange', () => {
    if(window.location.hash === '#login') {
      showModal(document.querySelector('#login'));
    }
  });

  function setFocusToFirstItemInModal(el) {
    // Set focus to first keyboard focusable item
    el.querySelector(focusableElementsString).focus();
  }

  function showModal(el) {
    // Disable main page
    document.querySelector('.main-page').setAttribute('aria-hidden', true);

    // Enable modal
    document.querySelector('#login').setAttribute('aria-hidden', false);

    // Save last focussed element
    focusedElementBeforeModal = document.activeElement;

    // Attach a listener to redirect the tab to the modal window if the user somehow gets out of the modal window
    document.querySelector('.main-page').addEventListener('focusin', () => setFocusToFirstItemInModal(el));

    setFocusToFirstItemInModal(el);
  }

}());
