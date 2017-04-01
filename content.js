const loadOptions = (done) =>
    chrome.storage.sync.get({ removeAds: true }, done)

const removePromotedTweet = node =>
    node && node.parentNode && node.parentNode.removeChild(node)

const removePromotedTweets = (parent = document) =>
    parent.querySelectorAll('.promoted-tweet').forEach(removePromotedTweet)

const handleMutation = ({ removeAds }, records) => {
    removeAds && records
        .reduce((acc, rec) => [ ...acc, ...(rec.addedNodes || []) ], [])
        .filter(node => !!node.querySelectorAll)
        .forEach(removePromotedTweets)
}

loadOptions(options => {
    const observer = new MutationObserver(handleMutation.bind(null, options))
    observer.observe(document.documentElement, { childList: true, subtree: true })
})