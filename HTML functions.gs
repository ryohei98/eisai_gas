const doGet = (e) => {
  const page = (e.parameter.p || "index");
  return htmlOutput = HtmlService.createTemplateFromFile(page)
      .evaluate()
      .setTitle("ページ遷移")
      .addMetaTag('viewport', 'width=device-width,initial-scale=1');
};
