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
    var tableHtml = '<table id="csvTable" class="table table-striped table-bordered">';
    tableHtml += '<thead><tr>';
    // Create table headers.
    columns.forEach(function(col) {
        tableHtml += '<th>' + col + '</th>';
    });
    tableHtml += '</tr></thead>';
    tableHtml += '<tbody>';

    // Create table rows.
    rows.forEach(function(row) {
        tableHtml += '<tr>';
        columns.forEach(function(col) {
        tableHtml += '<td>' + row[col] + '</td>';
        });
        tableHtml += '</tr>';
    });

    tableHtml += '</tbody></table>';

    // If a DataTable instance already exists, destroy it first.
    if ($.fn.DataTable.isDataTable('#csvTable')) {
        $('#csvTable').DataTable().destroy();
    }
    $('#tableContainer').html(tableHtml);

    // Initialize DataTables to enable sorting and more.
    $('#csvTable').DataTable({
        paging: false,       // Disable pagination.
        searching: false,    // Disable search box.
        info: false,         // Disable additional info text.
        order: []            // No initial ordering.
    });
}