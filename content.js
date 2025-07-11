(function () {
    const match = window.location.href.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/|$)/);
    if (!match) return;

    const owner = match[1];
    const repo = match[2];
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            if (!data.created_at) return;

            const creationDate = new Date(data.created_at).toDateString();
            const target = document.querySelector('.Layout-sidebar p');
            if (!target) return;

            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.gap = '6px';
            container.style.marginTop = '4px';

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '16');
            svg.setAttribute('height', '16');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'var(--fgColor-muted)');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            svg.style.flexShrink = '0';

            const paths = [
                'M8 2v4',
                'M16 2v4',
                'M3 10h18',
                'M8 14h.01',
                'M12 14h.01',
                'M16 14h.01',
                'M8 18h.01',
                'M12 18h.01',
                'M16 18h.01'
            ];

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', '18');
            rect.setAttribute('height', '18');
            rect.setAttribute('x', '3');
            rect.setAttribute('y', '4');
            rect.setAttribute('rx', '2');
            svg.appendChild(rect);

            for (const d of paths) {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', d);
                svg.appendChild(path);
            }

            const text = document.createElement('span');
            text.textContent = creationDate;
            text.style.fontSize = '14px';
            text.style.color = 'var(--fgColor-muted)';

            container.appendChild(svg);
            container.appendChild(text);

            target.insertAdjacentElement('afterend', container);
        });
})();
