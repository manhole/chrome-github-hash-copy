const LABEL = '📋';

// 'code' だけではハッシュ以外も該当してしまうので、notで絞る。
const hashes = document.querySelectorAll('code a:not(.markdown-title)');
console.log({hashes});
hashes.forEach(hashNode => {
    const hashText = hashNode.textContent;
    const copyNode = document.createElement('button');
    copyNode.title = 'コピー';
    copyNode.textContent = LABEL;
    copyNode.classList.add('___copy_node');
    hashNode.parentNode.appendChild(copyNode);
    copyNode.addEventListener('click', async () => {
        await navigator.clipboard.writeText(hashText);
        copyNode.textContent = '✔️';
    });
    copyNode.addEventListener('blur', () => { copyNode.textContent = LABEL; });
    copyNode.addEventListener('mouseleave', () => { copyNode.textContent = LABEL; });
});
