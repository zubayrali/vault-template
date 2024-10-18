function new_title(tp) {
  filename = tp.file.title;
  str = filename.toString();
  clean_title = str.split(".").pop();
  return clean_title.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
}

module.exports = new_title;
