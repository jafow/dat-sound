/* global DatArchive, FileReader */
const yo = require('yo-yo')
const uploadElement = require('upload-element')
const soundTitle = document.getElementById('sound-title')
const soundTag = document.getElementById('sound-tag')
const addSoud = document.getElementById('add-sound')
const reader = new FileReader()
const filePicker = document.getElementById('file-picker')
const pickerTag = document.getElementById('file-picker-tag')
var arch

reader.addEventListener('loadend', setupDat)
addSoud.addEventListener('click', makePlaylist)
pickerTag.addEventListener('click', clickFilePicker, false)

async function setupDat (err, blob) {
  if (err) throw err
  arch = await DatArchive.create({
    title: soundTitle.value || 'my dat sound',
    description: soundTag.value || 'my nice dat sounds'
  })

  await arch.writeFile(soundTitle.value, reader.result)
  arch.commit()
  makePlaylist(arch)
}

function clickFilePicker (e) {
  if (filePicker !== null) {
    filePicker.click()
  }
  e.preventDefault()
}

function handleFiles (fileList) {
  reader.readAsArrayBuffer(fileList[0])
}

async function makePlaylist () {
  var audioFiles = await arch.readdir('/')
  // var audioFiles = await archive.readdir('/')
  var playlist = document.getElementById('playlist')
  return playlist.appendChild(list(audioFiles))
}

function list (fileNames) {
  return yo`
      <div>
        <h3>List of Audio Files</h3>
          <ul>
            ${fileNames.map((file) => yo`<li class="playlist_files">${file}</li>`)}
          </ul>
      </div>
    `
}
