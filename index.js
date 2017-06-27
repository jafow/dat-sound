/* global DatArchive */
const yo = require('yo-yo')
const uploadElement = require('upload-element')
const soundTitle = document.getElementById('sound-title')
const soundTag = document.getElementById('sound-tag')
const createDat = document.getElementById('create-dat')
const filePicker = document.getElementById('file-picker')
const pickerTag = document.getElementById('file-picker-tag')
var arch

createDat.addEventListener('click', setupDat)
filePicker.addEventListener('click', clickFilePicker, false)

async function setupDat () {
  arch = await DatArchive.create({
    title: '',
    description: ''
  })
}

async function addAudioFileToDat (err, file) {
  if (err) throw new Error(err)
  var fileName = cleanFileName(file[0].file.name)
  var buf = file[0].target.result

  await arch.writeFile(fileName, buf)
  arch.commit()
  makePlaylist(arch)
}

function clickFilePicker (e) {
  if (filePicker !== null) {
    uploadElement(filePicker, addAudioFileToDat)
  }
}

function cleanFileName (name) {
  // sanitize the file name according to
  // beaker web api
  return 'test' + String(Date.now())
}

async function makePlaylist () {
  var audioFiles = await arch.readdir('/')
  var playlist = document.getElementById('playlist')
  return playlist.appendChild(list(audioFiles))
}

function list (fileNames) {
  return yo`
          <ul>
            ${fileNames.map((file) => yo`<li class="playlist_files">${file}</li>`)}
          </ul>
      </div>
    `
}
