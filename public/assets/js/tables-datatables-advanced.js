/**
 * DataTables Advanced (jquery)
 */

'use strict';

$(function () {
  var dt_ajax_table = $(".datatables-ajax");

  // Ajax Sourced Server-side
  if (dt_ajax_table.length) {
    var dt_ajax = dt_ajax_table.DataTable({
      processing: false,
      serverSide: false,
      ajax: {
        url: "/api/finished-product", // Ganti URL ini dengan endpoint yang sesuai di server
        type: "GET",
        dataSrc: "data",
      },
      columns: [
        { data: "nomor_order" },
        { data: "quantity" },
        { data: "nama_barang" },
        { data: "size" },
      ],
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>><"table-responsive"t><"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    });
  }
});
