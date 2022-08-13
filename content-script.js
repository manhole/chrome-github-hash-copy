// 'code' だけではハッシュ以外も該当してしまうので、notで絞る。
const hashes = document.querySelectorAll('code a:not(.markdown-title)');
console.log({hashes});
hashes.forEach(hashNode => {
    const hashText = hashNode.textContent;
    const child = document.createElement('span');
    child.textContent = '📋';
    hashNode.parentNode.appendChild(child);
    child.addEventListener('click', async () => {
        navigator.clipboard.writeText(hashText);
    });
});
