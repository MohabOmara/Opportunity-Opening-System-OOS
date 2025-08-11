function get_opens(data){
  var total_opens = 0
  var available_opens = 0
  for (var j = 0 ; j < data.length ; j++){
    if(data[j].status == "live"){
    total_opens += data[j].openings
    available_opens += data[j].available_openings
  }}
  return [total_opens,available_opens]
}



function expa_dates(data){
  if (data.length > 0) {
  for (var i =0 ; i <data.length ; i++){
    if(data[i].status == "live"){
      var min_start_date = new Date(data[i].start_date)
      var max_start_date = new Date(data[i].start_date)
      break
    }
    else{
      var min_start_date = new Date(data[i].start_date)
      var max_start_date = new Date(data[i].start_date)
    }
  }
  for (var i =0 ; i <data.length ; i++){
    if(data[i].status == "live"){
    if ((new Date(data[i].start_date)) < min_start_date){
      min_start_date = new Date(data[i].start_date)
    }
    if ((new Date(data[i].start_date)) > max_start_date){
      max_start_date = new Date(data[i].start_date)
    }
  }}}
  else {
  [min_start_date,max_start_date] = ["N/A","N/A"]
  }
  return [min_start_date,max_start_date]
}



function last_row(dataRange, sheet) {
  // the input range of this function can't have an end row
  // Parse the input range to extract the starting and ending rows
  const [startRange, endRange] = dataRange.split(":");
  const startColumn = startRange.match(/[A-Z]+/)[0]; // Extract start column
  const startRow = parseInt(startRange.match(/\d+/)[0]); // Extract start row
  const endRow = endRange ? parseInt(endRange.match(/\d+/)) : null; // Extract end row if provided

  // Determine the actual end row if not explicitly provided
  const columnData = sheet.getRange(`${startColumn}${startRow}:${startColumn}${endRow || sheet.getLastRow()}`).getValues();

  // Find the last non-empty row in the specified range
  let lastRow = startRow;
  for (let i = columnData.length - 1; i >= 0; i--) {
    if (columnData[i][0] !== "") {
      lastRow = startRow + i;
      break;
    }
  }

  // Construct the final range string
  return lastRow;
}



function slice_data(data,columns) {
    var temp_data = data.map(function(row) {
    return columns.map(function(colIndex) {
      return row[colIndex - 1]; // Directly access and slice the required columns
    });
  });
  return temp_data
}