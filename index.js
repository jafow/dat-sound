
const addSound = document.getElementById('add-sound')
const soundTitle = document.getElementById('sound-title')
const soundTag = document.getElementById('sound-tag')
const soundFile = document.getElementById('sound-file')
const reader = new FileReader()


reader.addEventListener('loadend', setupDat)

async function setupDat(blob) {
  var arch = await DatArchive.create({
    title: soundTitle.value || 'my dat sound',
    description: soundTag.value || 'my nice dat sounds'
  })

  await arch.writeFile(soundTitle.value, reader.result)
  arch.commit()
}

async function writeFileBlobXXX (blob) {
  console.log('after reading ', reader.result.toString())
}

async function handleFile(fileList) {
  reader.readAsArrayBuffer(fileList[0])
}

