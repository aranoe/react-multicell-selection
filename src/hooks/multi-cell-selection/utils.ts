export const convert2DArrayToPastableString = (arr: string[][]) =>
  arr.map(lines => lines.join("\t")).join("\n");

// source: https://stackoverflow.com/questions/60698115/how-to-copy-a-javascript-2d-array-to-clipboard-to-paste-it-in-excel
export const fallbackCopyTextToClipboard = (text: string) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    // console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
};
export const copyTextToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function() {
      // console.log('Async: Copying to clipboard was successful!');
    },
    function(err) {
      console.error("Could not copy text: ", err);
    }
  );
};

export const convertStringTo2DArrayOfStrings = (text: string) => {
  const rows = text.trim().split("\n");

  // console.log("text", text);
  return (
    rows
      // .filter((row, i) => i !== rows.length - 1)
      .map(row => row.split("\t"))
  );
};
