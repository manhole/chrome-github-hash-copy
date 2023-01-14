const createCopyNode = (hashNode, hashText) => {
    const LABEL = '📋';
    const candidateNode = hashNode.nextElementSibling;
    if (candidateNode && candidateNode.dataset.hash === hashText) {
        console.log('already registered', hashNode.href);
        return;
    }
    const copyNode = document.createElement('button');
    copyNode.title = 'copy commit hash';
    copyNode.dataset.hash = hashText;
    copyNode.textContent = LABEL;
    copyNode.classList.add('___copy_hash');
    copyNode.addEventListener('click', async () => {
        await navigator.clipboard.writeText(hashText);
        copyNode.textContent = '✔️';
    });
    copyNode.addEventListener('blur', () => { copyNode.textContent = LABEL; });
    copyNode.addEventListener('mouseleave', () => { copyNode.textContent = LABEL; });

    hashNode.insertAdjacentElement('afterend', copyNode);
}

const mainScript = () => {
    /*
     * コミット一覧に表示される hash 部分。
     *
     * 'code' だけではハッシュ以外も該当してしまうので、notで絞る。
     * GitHub の autolinks 機能によるリンクを除外するため、hrefに /pull/ と /commits/ を持つ要素に絞る。
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
     * コメント本文の hash へのリンク
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
