document.getElementById('search-btn').addEventListener('click', () => {
    let searchQuery = document.getElementById('search-input').value;
    const searchType = document.getElementById('search-type').value;
    
    const language = document.getElementById('language-select').value;
    if (language) searchQuery += ` language:${language}`;
    
    const stars = document.getElementById('stars-select').value;
    if (stars) searchQuery += ` stars:>${stars}`;
    
    const forks = document.getElementById('forks-select').value;
    if (forks) searchQuery += ` forks:>${forks}`;
    
    const date = document.getElementById('date-select').value;
    if (date) {
        const dateMap = {
            'today': 'created:>=' + new Date().toISOString().split('T')[0],
            'this-week': 'created:>=' + new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            'this-month': 'created:>=' + new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
            'this-year': 'created:>=' + new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
            'last-year': 'created:' + (new Date().getFullYear() - 1)
        };
        searchQuery += ` ${dateMap[date]}`;
    }
    
    const url = `https://github.com/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`;
    chrome.tabs.create({ url });
});