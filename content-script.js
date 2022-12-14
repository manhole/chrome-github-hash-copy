const createCopyNode = (hashNode, hashText) => {
    const LABEL = 'ð';
    if (0 < hashNode.parentNode.querySelectorAll('button.___copy_hash').length) {
        console.log('already registered', hashNode.href);
        return;
    }
    const copyNode = document.createElement('button');
    copyNode.title = 'copy commit hash';
    copyNode.textContent = LABEL;
    copyNode.classList.add('___copy_hash');
    hashNode.insertAdjacentElement('afterend', copyNode);
    copyNode.addEventListener('click', async () => {
        await navigator.clipboard.writeText(hashText);
        copyNode.textContent = 'âï¸';
    });
    copyNode.addEventListener('blur', () => { copyNode.textContent = LABEL; });
    copyNode.addEventListener('mouseleave', () => { copyNode.textContent = LABEL; });
}

const mainScript = () => {
    /*
     * ã³ãããä¸è¦§ã«è¡¨ç¤ºããã hash é¨åã
     *
     * 'code' ã ãã§ã¯ããã·ã¥ä»¥å¤ãè©²å½ãã¦ãã¾ãã®ã§ãnotã§çµãã
     * GitHub ã® autolinks æ©è½ã«ãããªã³ã¯ãé¤å¤ãããããhrefã« /pull/ ã¨ /commits/ ãæã¤è¦ç´ ã«çµãã
     */
    {
        const hashes = document.querySelectorAll('code a:not(.markdown-title)[href*="/pull/"][href*="/commits/"]');
        console.log(1, { hashes });
        hashes.forEach(hashNode => {
            const found = hashNode.href.match(/\/commits\/(\w{8})\w{32}/);
            const hashText = found[1];
            createCopyNode(hashNode, hashText);
        });
    }

    /*
     * ã³ã¡ã³ãæ¬æã® hash ã¸ã®ãªã³ã¯
     */
    {
        const hashes = document.querySelectorAll('a:not(.markdown-title)[href*="/commit/"]');
        console.log(2, { hashes });
        hashes.forEach(hashNode => {
            const found = hashNode.href.match(/\/commit\/(\w{8})\w{32}/);
            const hashText = found[1];
            createCopyNode(hashNode, hashText);
        });
    }
};

mainScript();

const observer = new MutationObserver((mutationList, observer) => {
    console.log('mutation observer');
    mainScript();
});
observer.observe(document.body, { subtree: true, childList: true, attributes: true });
