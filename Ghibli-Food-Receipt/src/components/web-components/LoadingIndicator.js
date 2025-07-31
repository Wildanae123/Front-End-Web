// src/components/web-components/LoadingIndicator.js

class LoadingIndicator extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .loader {
                    border: 8px solid #f3f3f3;
                    border-top: 8px solid #8b0000; /* accent-maroon */
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: spin 2s linear infinite;
                    margin: 2rem auto;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
            <div class="loader"></div>
        `;
    }
}

customElements.define('loading-indicator', LoadingIndicator);