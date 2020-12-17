////フォームをアップデートする関数　一時間ごとに実行する
function updateForm() {  
 //GoogleフォームのURLからIDを取得する
 //こういうの "xxxxxxxx-xxxxxxxxxxx-xxxxxx"
 var formId = "14F_KJiRoZklUdcT1iE2cpoJcjk3CeC1vW_FdrE0Ksyo"
 const formFile = FormApp.openById(formId);
 var items = formFile.getItems();

 var sheet = SpreadsheetApp.getActive().getSheetByName("StudentList");
 //そのシートで一番下の行の番号を取得する
　var lastRow = sheet.getLastRow();
 Logger.log(lastRow);

 //１つ目の質問をスプレッドシートの内容と同期させる
 var itemOfName = items[0];
 Logger.log(itemOfName); 
 
   //3行目2列目,1セル取得
  var dropMenuItemsRange = sheet.getRange(2,1,lastRow-1,1).sort({column:1,ascending: true})
 var sitelistNames = dropNullItemFromArray(dropMenuItemsRange.getValues());
 var sitelist = [];
 for ( var i = 0; i<sitelistNames.length; i++ ) {
   sitelist[i] = sitelistNames[i]
 }

 //１つ目の質問を反映させる
 itemOfName.asListItem().setChoiceValues(sitelist).setRequired(true);
 
}

//配列の空配列をいい感じに消す関数
function dropNullItemFromArray(array){
 var new_array = [];
 array.forEach(function(value){
   if(value != null && value != "") {
     new_array.push(value);
   }
 });
 return new_array;
}
