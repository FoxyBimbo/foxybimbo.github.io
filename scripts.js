// Function to parse a given file and return the desired number of results
function parseFile(file, count) {
    Papa.parse(file, {
        download: true,
        header: true,         // CSV file includes a header row.
        skipEmptyLines: true, // Skip empty lines.
        complete: function(results) {
        var data = results.data;
        // Ensure there are at least 3 rows.
        if (data.length < count) {
            alert("CSV does not have enough data rows!");
            return;
        }
        // Randomly select 3 distinct rows.
        var randomRows = [];
        var copyData = data.slice(); // Create a copy to preserve original data.
        for (var i = 0; i < count; i++) {
            var randomIndex = Math.floor(Math.random() * copyData.length);
            randomRows.push(copyData[randomIndex]);
            copyData.splice(randomIndex, 1); // Remove the selected row.
        }
        // Build and display the table.
        displayTable(randomRows, results.meta.fields);
        },
        error: function(err) {
        console.error("Error parsing CSV: ", err);
        }
    });
}

    
// Function to generate and display the table along with DataTables integration.
function displayTable(rows, columns) {
    // Use a flexbox container for wrapping and mobile friendliness
    var tableHtml = '<div id="csvFlexTable" style="display:flex;flex-direction:column;gap:12px;width:100%;">';
    rows.forEach(function(row, rowIdx) {
        // Alternate background color for every other entry
        var bg = rowIdx % 2 === 0 ? '#f8f9fa' : '#e9ecef';
        tableHtml += '<div class="csv-flex-row" style="display:flex;flex-wrap:wrap;background:' + bg + ';padding:10px;border-radius:8px;">';
        columns.forEach(function(col) {
            tableHtml += '<div style="flex:1 1 150px;min-width:120px;margin:4px 8px 4px 0;word-break:break-word;"><strong>' + col + ':</strong> ' + row[col] + '</div>';
        });
        tableHtml += '</div>';
    });
    tableHtml += '</div>';

    // Remove any DataTable instance if present
    if (window.jQuery && $.fn.DataTable && $.fn.DataTable.isDataTable('#csvTable')) {
        $('#csvTable').DataTable().destroy();
    }
    // Render the flexbox table
    $('#tableContainer').html(tableHtml);
}