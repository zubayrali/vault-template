async function youtube (tp) {
  const url = await tp.system.clipboard()
  const response = await fetch(`https://youtube.com/oembed?url=${url}&format=json`)
  const data = await response.json()
  const title = data.title.replaceAll("", "").replaceAll('"', '').replaceAll("\\", "").replaceAll("/", "").replaceAll("<", "").replaceAll(">", "").replaceAll(":", "").replaceAll("|", "").replaceAll("?", "")
  tp.file.rename(title)
  const regex = /v=(.*)/gm;
  const m = regex.exec(url)
  return m[1]
}

module.exports = youtube;
