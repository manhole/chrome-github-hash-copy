const mainScript = () => {
    const LABEL = '📋';

    // 'code' だけではハッシュ以外も該当してしまうので、notで絞る。
    const hashes = document.querySelectorAll('code a:not(.markdown-title)');
    console.log({hashes});
    hashes.forEach(hashNode => {
        const hashText = hashNode.textContent;
        const id = `___copy_hash_id_${hashText}`
        if (document.getElementById(id)) {
            console.log('already registered', id);
            return;
        }
        const copyNode = document.createElement('button');
        copyNode.id = id;
        copyNode.title = 'copy commit hash';
        copyNode.textContent = LABEL;
        copyNode.classList.add('___copy_hash');
        hashNode.insertAdjacentElement('afterend', copyNode);
        copyNode.addEventListener('click', async () => {
            await navigator.clipboard.writeText(hashText);
            copyNode.textContent = '✔️';
        });
        copyNode.addEventListener('blur', () => { copyNode.textContent = LABEL; });
        copyNode.addEventListener('mouseleave', () => { copyNode.textContent = LABEL; });
    });
};

mainScript();

const observer = new MutationObserver((mutationList, observer) => {
    console.log('mutation observer');
    mainScript();
});
observer.observe(document.body, { subtree: true, childList:true, attributes: true });
