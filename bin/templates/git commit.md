<%* 
tp.user.git_add({file: tp.file.path()}) 
const msg = await tp.system.prompt("Commit message", "", true)
if (msg != "") {
  tp.user.git_commit({message: msg})
}
-%>