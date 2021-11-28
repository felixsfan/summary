(function() {
  var pageID;

  function setContext(id) {
    pageID = id;
  }

  const idRegExp = /^\/download\/attachments\/(\d*)/i;
  const versionRegExp = /^version=\d*$/i;

  const transformUrl = url => {
    const urlID = idRegExp.exec(url)[1];

    if (urlID === pageID) {
      return url;
    }

    let result = "";

    const splitUrl = url.split("?");

    if (!splitUrl[0]) {
      return url;
    }

    const path = splitUrl[0].split("/");

    path[3] = pageID;

    result = path.join("/");

    if (splitUrl[1]) {
      const newSearch = splitUrl[1]
      .split("&")
      .filter(function(pair) { return !versionRegExp.test(pair); })
      .join("&");

      result += "?" + newSearch;
    }

    return result;
  }

  const attachmentUrlRegExp = /^\/download\/attachments\/\d+/i;

  function transform(src) {
    if (!pageID) {
      return src;
    }

    if (attachmentUrlRegExp.test(src)) {
      return transformUrl(src);
    }

    return src;
  }

  window.cherryAttachment = {
    setContext: setContext,
    transform: transform,
  };
})();
