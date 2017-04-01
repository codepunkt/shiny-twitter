const save_options = () => {
  const removeAds = document.getElementById('ads').checked
  chrome.storage.sync.set({
    removeAds
  }, () => {
    const status = document.getElementById('status')
    status.textContent = 'Options saved.'
    setTimeout(() => {
      status.textContent = ''
    }, 750)
  })
}

const restore_options = () => {
  chrome.storage.sync.get({
    removeAds: true
  }, items => {
    document.getElementById('ads').checked = items.removeAds
  })
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)