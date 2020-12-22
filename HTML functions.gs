const doGet = (e) => {
  const page = (e.parameter.p || "Top");
  return htmlOutput = HtmlService.createTemplateFromFile(page)
      .evaluate()
      .setTitle("英才個別学院板橋校")
      .addMetaTag('viewport', 'width=device-width,initial-scale=1');
};

function getOutputFromStuData () {
  var ssDataTable = SpreadsheetApp.openById("1pxC9cBk9ACqDxSncn-NHVQHoE6QPcTbjmpTVqSWKSFk").getSheetByName("DataTable");
  var ssStuInformation = SpreadsheetApp.openById("1pxC9cBk9ACqDxSncn-NHVQHoE6QPcTbjmpTVqSWKSFk").getSheetByName("StudentInformation");

  var gradeList = ssDataTable.getRange(1,1,13,1).getValues();
  var output = HtmlService.createHtmlOutput("<ul>");

  Logger.log(gradeList)

  for(var  i=0; i<gradeList.length; i++){
    Logger.log("gradeList[%s][0]:%s",i,gradeList[i][0]);
    output.append("<li>" + gradeList[i][0] + "</li>");
  }

  output.append("</ul>");

  Logger.log(output.getContent());

  return output
}
