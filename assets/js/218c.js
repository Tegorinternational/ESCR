function copy() {
  let textarea = document.getElementById("output");
  textarea.select();
  document.execCommand("copy");
}