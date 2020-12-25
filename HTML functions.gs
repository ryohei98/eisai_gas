function doGet (e) {
  const page = (e.parameter.p || "Top");
  return HtmlService.createTemplateFromFile(page)
  .evaluate()
  .setTitle("英才個別学院板橋校")
  .addMetaTag('viewport', 'width=device-width,initial-scale=1');
};

function getOutputFromStuData () {
  var ssDataTable = SpreadsheetApp.openById("1pxC9cBk9ACqDxSncn-NHVQHoE6QPcTbjmpTVqSWKSFk").getSheetByName("DataTable");
  var ssStuInfo = SpreadsheetApp.openById("1pxC9cBk9ACqDxSncn-NHVQHoE6QPcTbjmpTVqSWKSFk").getSheetByName("StudentInformation");

  var gradeList = ssDataTable.getRange(1,1,13,1).getValues();
  var stuInfo = ssStuInfo.getDataRange().getValues();

  Logger.log("stuInfo:%s",stuInfo);

  var output = HtmlService.createHtmlOutput('<div class = "row">');

  Logger.log(gradeList)

  for(var  i1=0; i1<gradeList.length; i1++){
    output.append('<nav aria-label="breadcrumb">\n<ol class="breadcrumb">\n<li class="breadcrumb-item active" aria-current="page">' + gradeList[i1][0] + "</li>\n</ol>\n</nav>\n");

    for( var i2 =7; i2<stuInfo.length; i2++){

      if(gradeList[i1][0] == stuInfo[i2][0]){
        output.append('<div class="card mb-3">\n<div class="card-body row">');
        for(var i3 in stuInfo[i2]){

          output.append('<dt class="col-sm-3">'+ stuInfo[6.0][i3] + '</dt>\n');
          output.append('<dd class="col-sm-9">' + stuInfo[i2][i3] + '</dd>\n');

          Logger.log("gradeList[6][%s]:%s",i3,stuInfo[6.0][i3]);
          Logger.log("gradeList[%s][%s]:%s",i2,i3,stuInfo[i2][i3]);
        }
           output.append('</div>\n</div>');
      }
    }

  }

  output.append("\n</div>");

  Logger.log(output.getContent());

  return output
}
