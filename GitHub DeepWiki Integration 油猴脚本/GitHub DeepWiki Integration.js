// ==UserScript==
// @name         GitHub DeepWiki Integration
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a deepwiki link under the About section on GitHub repository pages
// @author       SeanFan
// @match        https://github.com/*/*
// @exclude      https://github.com/*/packages/*
// @exclude      https://github.com/settings/*
// @exclude      https://github.com/*/settings/*
// @exclude      https://github.com/*/discussions/*
// @exclude      https://github.com/orgs/*
// @grant        none
// @icon         https://raw.githubusercontent.com/askfanxiaojun/img/master/images/2025/04/29/202504291345149.png
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function isRepoPage() {
        return window.location.pathname.split('/').length >= 3 && 
               !window.location.pathname.includes('/packages/') &&
               !window.location.pathname.includes('/settings/') &&
               !window.location.pathname.includes('/discussions/') &&
               !window.location.pathname.includes('/orgs/');
    }

    function getRepoPath() {
        const pathSegments = window.location.pathname.split('/');
        if (pathSegments.length >= 3) {
            return `${pathSegments[1]}/${pathSegments[2]}`;
        }
        return '';
    }

    function createDeepwikiLink() {
        const repoPath = getRepoPath();
        if (!repoPath) return null;

        const deepwikiUrl = `https://deepwiki.com/${repoPath}`;
        
        const container = document.createElement('div');
        container.className = 'mt-2';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        
        const link = document.createElement('a');
        link.href = deepwikiUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'Link--muted d-flex flex-items-center';
        link.title = 'View on DeepWiki';
        
        link.onmouseover = function() {
            this.classList.remove('Link--muted');
        };
        link.onmouseout = function() {
            this.classList.add('Link--muted');
        };

        const icon = document.createElement('img');
        icon.src = 'https://raw.githubusercontent.com/askfanxiaojun/img/master/images/2025/04/29/202504291345149.png';
        icon.alt = 'DeepWiki';
        icon.style.width = '16px';
        icon.style.height = '16px';
        icon.style.marginRight = '8px';

        const text = document.createElement('span');
        text.textContent = 'DeepWiki';
        
        link.appendChild(icon);
        link.appendChild(text);
        container.appendChild(link);
        
        return container;
    }

    function insertDeepwikiLink() {
        if (!isRepoPage()) return;

        // Look for the About section
        const aboutSection = document.querySelector('div[class*="BorderGrid-row"]');
        
        if (aboutSection) {
            const aboutContent = aboutSection.querySelector('div[class*="BorderGrid-cell"]');
            
            if (aboutContent && !aboutContent.querySelector('.deepwiki-link')) {
                const deepwikiLink = createDeepwikiLink();
                if (deepwikiLink) {
                    deepwikiLink.classList.add('deepwiki-link');
                    // Insert after the repository description and tags
                    const tags = aboutContent.querySelector('div[class*="topics-row-container"]');
                    if (tags) {
                        tags.after(deepwikiLink);
                    } else {
                        aboutContent.appendChild(deepwikiLink);
                    }
                }
            }
        }
    }

    function observePageChanges() {
        const observer = new MutationObserver((mutations) => {
            let shouldCheck = false;
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldCheck = true;
                    break;
                }
            }
            if (shouldCheck) {
                insertDeepwikiLink();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    window.addEventListener('load', () => {
        insertDeepwikiLink();
        observePageChanges();
    });

    insertDeepwikiLink();
})();